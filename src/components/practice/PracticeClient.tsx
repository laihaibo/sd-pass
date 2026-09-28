'use client'

// 刷题引擎：章节练习 / 模拟考试 / 错题重练 三模式
// - useReducer 状态机，作答状态集中管理（支持键盘快捷键驱动）
// - 题库按章动态 import（chapter 模式只加载单章 chunk；mock/wrong 才全量加载）
// - 模拟考试进度自动存 localStorage（sd-mock-session），刷新后可断点续答

import { useCallback, useEffect, useReducer, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { siteMeta } from '@/lib/meta'
import type { Question, QuizMode } from '@/lib/types'
import { loadAllQuestions, loadChapterQuestions, shuffle } from '@/lib/question-banks'
import { useRecordsStore } from '@/lib/stores/records'
import { useWrongbookStore } from '@/lib/stores/wrongbook'
import {
  clearSavedMock,
  readSavedMock,
  subscribeSavedMock,
  writeSavedMock,
  type SavedMock,
} from '@/lib/stores/mock-session'
import { useHasMounted } from '@/lib/hooks'
import QuestionCard from '@/components/practice/QuestionCard'
import {
  BookIcon,
  ClockIcon,
  RepeatIcon,
  ChevronRightIcon,
  XmarkIcon,
} from '@/components/icons'
import styles from './practice.module.css'

const MOCK_SIZE = 75
const MOCK_SECONDS = 150 * 60

interface Session {
  mode: QuizMode
  list: Question[]
  index: number
  correct: number
  selected: number | null
  answered: boolean
  finished: boolean
  remaining: number | null // 仅模拟考试
}

type Action =
  | { type: 'BEGIN'; mode: QuizMode; list: Question[]; remaining?: number }
  | { type: 'RESUME'; list: Question[]; saved: SavedMock }
  | { type: 'CHOOSE'; i: number }
  | { type: 'SUBMIT' }
  | { type: 'NEXT' }
  | { type: 'TICK' }
  | { type: 'EXIT' }

function reducer(state: Session | null, action: Action): Session | null {
  switch (action.type) {
    case 'BEGIN':
      return {
        mode: action.mode,
        list: action.list,
        index: 0,
        correct: 0,
        selected: null,
        answered: false,
        finished: false,
        remaining: action.remaining ?? null,
      }
    case 'RESUME':
      return {
        mode: 'mock',
        list: action.list,
        index: Math.min(action.saved.index, action.list.length - 1),
        correct: action.saved.correct,
        selected: null,
        answered: false,
        finished: false,
        remaining: action.saved.remaining,
      }
    case 'CHOOSE':
      return state && !state.answered ? { ...state, selected: action.i } : state
    case 'SUBMIT': {
      if (!state || state.answered || state.selected === null) return state
      const q = state.list[state.index]
      const right = state.selected === q.answer
      return { ...state, answered: true, correct: state.correct + (right ? 1 : 0) }
    }
    case 'NEXT': {
      if (!state) return state
      if (state.index < state.list.length - 1) {
        return { ...state, index: state.index + 1, selected: null, answered: false }
      }
      return { ...state, finished: true }
    }
    case 'TICK': {
      if (!state || state.remaining === null || state.finished) return state
      if (state.remaining <= 1) return { ...state, remaining: 0, finished: true }
      return { ...state, remaining: state.remaining - 1 }
    }
    case 'EXIT':
      return null
  }
}

function fmtClock(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function PracticeClient() {
  const mounted = useHasMounted()
  const searchParams = useSearchParams()
  const records = useRecordsStore((s) => s.addRecord)
  const wrongAdd = useWrongbookStore((s) => s.add)
  const wrongRemove = useWrongbookStore((s) => s.remove)
  const wrongIds = useWrongbookStore((s) => s.ids)

  const [session, dispatch] = useReducer(reducer, null)
  const [pickedChapter, setPickedChapter] = useState('ch01')
  const [starting, setStarting] = useState(false)
  const [resumeLoading, setResumeLoading] = useState(false)
  const lastSaveRef = useRef(0)

  const practiceChapters = siteMeta.chapters.filter((c) => (siteMeta.chapterCounts[c.id] ?? 0) > 0)

  // 深链 /practice?chapter=ch03（来自阅读页「去练本章题」）：渲染期派生，无副作用
  const paramChapter = searchParams.get('chapter')
  const selectedChapter =
    paramChapter && practiceChapters.some((c) => c.id === paramChapter)
      ? paramChapter
      : pickedChapter

  // 可续答的模拟考试（外部存储：写入/清除即时反映）
  const resumeSaved = useSyncExternalStore(subscribeSavedMock, readSavedMock, () => null)

  // 模拟考试计时器
  useEffect(() => {
    if (!session || session.mode !== 'mock' || session.finished) return
    const timer = setInterval(() => dispatch({ type: 'TICK' }), 1000)
    return () => clearInterval(timer)
  }, [session?.mode, session?.finished]) // eslint-disable-line react-hooks/exhaustive-deps

  // 模拟考试进度持久化：完成时清除，进行中节流保存
  useEffect(() => {
    if (session?.mode !== 'mock') return
    if (session.finished) {
      clearSavedMock()
      return
    }
    const now = Date.now()
    if (session.answered || now - lastSaveRef.current > 5000) {
      lastSaveRef.current = now
      writeSavedMock({
        qids: session.list.map((q) => q.id),
        index: session.index,
        correct: session.correct,
        remaining: session.remaining ?? 0,
        savedAt: now,
      })
    }
  }, [session])

  const currentQ = session?.list[session.index]

  // 提交：写做题记录 + 错题本，再进状态机
  const handleSubmit = useCallback(() => {
    if (!session || session.answered || session.selected === null) return
    const q = session.list[session.index]
    const correct = session.selected === q.answer
    records({
      qid: q.id,
      chapterId: q.chapterId,
      chosen: session.selected,
      correct,
      mode: session.mode,
    })
    if (correct) wrongRemove(q.id)
    else wrongAdd(q.id)
    dispatch({ type: 'SUBMIT' })
  }, [session, records, wrongAdd, wrongRemove])

  const handleNext = useCallback(() => {
    dispatch({ type: 'NEXT' })
  }, [])

  // 键盘快捷键：1-4 / A-D 选择，Enter 提交或下一题
  useEffect(() => {
    if (!session || session.finished || !currentQ) return
    const s = session
    const q = currentQ
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key.toLowerCase()
      const digitMap: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3 }
      const letterMap: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 }
      const idx = digitMap[k] ?? letterMap[k]
      if (idx !== undefined && idx < q.options.length) {
        e.preventDefault()
        dispatch({ type: 'CHOOSE', i: idx })
      } else if (k === 'enter') {
        e.preventDefault()
        if (s.answered) handleNext()
        else handleSubmit()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [session, currentQ, handleSubmit, handleNext])

  async function startChapter() {
    setStarting(true)
    const list = shuffle(await loadChapterQuestions(selectedChapter))
    if (list.length) dispatch({ type: 'BEGIN', mode: 'chapter', list })
    setStarting(false)
  }

  async function startMock() {
    setStarting(true)
    const all = await loadAllQuestions()
    const list = shuffle(all).slice(0, MOCK_SIZE)
    if (list.length === MOCK_SIZE) dispatch({ type: 'BEGIN', mode: 'mock', list, remaining: MOCK_SECONDS })
    setStarting(false)
  }

  async function startWrong() {
    setStarting(true)
    const ids = new Set(wrongIds)
    const all = await loadAllQuestions()
    const list = shuffle(all.filter((q) => ids.has(q.id)))
    if (list.length) dispatch({ type: 'BEGIN', mode: 'wrong', list })
    setStarting(false)
  }

  async function resumeMock() {
    if (!resumeSaved) return
    setResumeLoading(true)
    const all = await loadAllQuestions()
    const byId = new Map(all.map((q) => [q.id, q]))
    const list = resumeSaved.qids.map((id) => byId.get(id)).filter((q): q is Question => !!q)
    if (list.length) dispatch({ type: 'RESUME', list, saved: resumeSaved })
    setResumeLoading(false)
  }

  function discardMock() {
    clearSavedMock()
  }

  const chapterQCount = siteMeta.chapterCounts[selectedChapter] ?? 0

  /* ---------- 模式选择 ---------- */
  if (!session) {
    return (
      <div className="container">
        <div className="page-head">
          <h1 className="section-title">刷题练习</h1>
          <p className="section-sub">
            作答后即时判分并显示解析；做错的题自动进入错题本，答对后自动移出。
          </p>
        </div>

        {resumeSaved && (
          <div className={`${styles.resumeCard} glass`}>
            <div className={styles.resumeInfo}>
              <span className="badge badge-orange">
                <ClockIcon size={13} /> 未完成的模拟考试
              </span>
              <p>
                进行到第 {resumeSaved.index + 1} / {resumeSaved.qids.length} 题 · 已对{' '}
                {resumeSaved.correct} 题 · 剩余 {fmtClock(resumeSaved.remaining)}
              </p>
              <p className={styles.resumeMeta}>
                保存于 {new Date(resumeSaved.savedAt).toLocaleString('zh-CN', { hour12: false })}
              </p>
            </div>
            <div className="flex-gap">
              <button className="btn btn-primary" onClick={resumeMock} disabled={resumeLoading}>
                {resumeLoading ? '正在恢复…' : '继续考试'}
              </button>
              <button className="btn btn-quiet" onClick={discardMock}>
                <XmarkIcon size={14} /> 放弃
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-3">
          <div className="card card-hover">
            <span className={`${styles.modeIcon} ${styles.tintBlue}`}>
              <BookIcon size={21} />
            </span>
            <h2 className={styles.modeTitle}>章节练习</h2>
            <p className={styles.modeDesc}>学完一章练一章，趁热打铁。</p>
            <select
              className={`select ${styles.chapterSelect}`}
              value={selectedChapter}
              onChange={(e) => setPickedChapter(e.target.value)}
              aria-label="选择章节"
            >
              {practiceChapters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id === 'ch00' ? c.title : c.title}
                </option>
              ))}
            </select>
            <div className={`flex-between ${styles.modeFoot}`}>
              <span className={styles.modeCount}>共 {chapterQCount} 题</span>
              <button className="btn btn-primary" disabled={!chapterQCount || starting} onClick={startChapter}>
                {starting ? '抽题中…' : '开始'} <ChevronRightIcon size={15} />
              </button>
            </div>
          </div>

          <div className="card card-hover">
            <span className={`${styles.modeIcon} ${styles.tintPurple}`}>
              <ClockIcon size={21} />
            </span>
            <h2 className={styles.modeTitle}>模拟考试</h2>
            <p className={styles.modeDesc}>随机抽 75 题，150 分钟倒计时，还原上午卷真实节奏。</p>
            <div className={styles.modeSpacer} />
            <div className={`flex-between ${styles.modeFoot}`}>
                <span className={styles.modeCount}>题库共 {siteMeta.questionTotal} 题</span>
              <button
                className="btn btn-primary"
                disabled={siteMeta.questionTotal < MOCK_SIZE || starting}
                onClick={startMock}
              >
                {starting ? '抽题中…' : '开始'} <ChevronRightIcon size={15} />
              </button>
            </div>
          </div>

          <div className="card card-hover">
            <span className={`${styles.modeIcon} ${styles.tintGreen}`}>
              <RepeatIcon size={21} />
            </span>
            <h2 className={styles.modeTitle}>错题重练</h2>
            <p className={styles.modeDesc}>只练错题本里的题，答对自动移出错题本。</p>
            <div className={styles.modeSpacer} />
            <div className={`flex-between ${styles.modeFoot}`}>
              <span className={styles.modeCount}>错题本 {mounted ? wrongIds.length : 0} 题</span>
              <button
                className="btn btn-primary"
                disabled={!mounted || !wrongIds.length || starting}
                onClick={startWrong}
              >
                {starting ? '抽题中…' : '开始'} <ChevronRightIcon size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ---------- 结果汇总 ---------- */
  if (session.finished) {
    const total = session.list.length
    const rate = Math.round((session.correct / total) * 100)
    const passed = session.correct / total >= 0.6
    return (
      <div className="container">
        <div className={`card ${styles.summary}`}>
          <h1 className="text-center section-title">本轮完成</h1>
          <div className="grid grid-3 mt-24">
            <div className={`card ${styles.resultStat}`}>
              <div className="stat-value">{total}</div>
              <div className="stat-label">总题数</div>
            </div>
            <div className={`card ${styles.resultStat}`}>
              <div className="stat-value">{session.correct}</div>
              <div className="stat-label">答对{session.mode === 'mock' ? '（得分）' : ''}</div>
            </div>
            <div className={`card ${styles.resultStat}`}>
              <div className="stat-value">{rate}%</div>
              <div className="stat-label">正确率</div>
            </div>
          </div>
          <div className={`callout mt-24 ${passed ? 'callout-green' : 'callout-orange'}`}>
            {passed
              ? '正确率不错！上午卷 45 分及格线（75 题对 45 题）在望，继续保持。'
              : '别灰心，错题已自动收进错题本，反复重练是提分最快的路径。'}
          </div>
          <div className={`flex-gap ${styles.summaryActions}`}>
            <button className="btn btn-primary" onClick={() => dispatch({ type: 'EXIT' })}>
              返回练习模式
            </button>
            <Link href="/progress" className="btn btn-ghost">
              查看整体进度
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ---------- 作答中 ---------- */
  const clock = session.remaining ?? 0
  const modeLabel = session.mode === 'mock' ? '模拟考试' : session.mode === 'wrong' ? '错题重练' : '章节练习'

  return (
    <div className="container">
      <div className={styles.quizHead}>
        <div className="flex-gap">
          <span className="badge badge-blue">{modeLabel}</span>
          <span className={styles.quizMeta}>
            第 {session.index + 1} / {session.list.length} 题 · 已对 {session.correct} 题
          </span>
        </div>
        <div className="flex-gap">
          {session.mode === 'mock' && (
            <span className={`badge ${clock < 300 ? 'badge-red' : 'badge-orange'} ${styles.clock}`}>
              <ClockIcon size={13} /> {fmtClock(clock)}
            </span>
          )}
          <button className="btn btn-quiet" onClick={() => dispatch({ type: 'EXIT' })}>
            {session.mode === 'mock' ? '保存并退出' : '退出'}
          </button>
        </div>
      </div>

      <div className={styles.sessionProgress}>
        <div
          className={styles.sessionProgressBar}
          style={{ width: ((session.index + 1) / session.list.length) * 100 + '%' }}
        />
      </div>

      {currentQ && (
        <QuestionCard
          key={currentQ.id}
          stem={currentQ.stem}
          options={currentQ.options}
          answer={currentQ.answer}
          explanation={currentQ.explanation}
          tag={currentQ.tag}
          num={session.index + 1}
          selected={session.selected}
          answered={session.answered}
          onChoose={(i) => dispatch({ type: 'CHOOSE', i })}
          onSubmit={handleSubmit}
        />
      )}

      {session.answered && (
        <div className={styles.nextRow}>
          <button className="btn btn-primary" onClick={handleNext}>
            {session.index < session.list.length - 1 ? '下一题' : '查看结果'} <ChevronRightIcon size={15} />
          </button>
        </div>
      )}
    </div>
  )
}
