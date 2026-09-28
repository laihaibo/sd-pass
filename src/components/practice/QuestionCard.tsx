'use client'

// 题目卡片：纯展示 + 复制求助；作答状态由 Practice 引擎统一持有（键盘快捷键也能驱动）

import { useRef, useState } from 'react'
import { CheckIcon, CopyIcon, XmarkIcon } from '@/components/icons'
import styles from './QuestionCard.module.css'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

interface Props {
  stem: string
  options: string[]
  answer: number
  explanation: string
  tag?: string
  num: number
  selected: number | null
  answered: boolean
  onChoose: (i: number) => void
  onSubmit: () => void
}

export default function QuestionCard({
  stem,
  options,
  answer,
  explanation,
  tag,
  num,
  selected,
  answered,
  onChoose,
  onSubmit,
}: Props) {
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isCorrect = selected === answer

  function optionClass(i: number): string {
    if (!answered) return selected === i ? styles.selected : ''
    if (i === answer) return styles.correct
    if (i === selected) return styles.wrong
    return styles.dim
  }

  // 求助文本：题干 + 选项 + 我的作答 + （已提交时）正确答案与解析
  async function copyHelp() {
    const optLines = options.map((o, i) => `${LETTERS[i]}. ${o}`).join('\n')
    const my = selected === null ? '我还没做出来，求讲解' : `我的作答：${LETTERS[selected]}`
    const answerPart = answered ? `\n正确答案：${LETTERS[answer]}\n解析：${explanation}` : ''
    const text = `【软件设计师备考求助】\n题目：${stem}\n${optLines}\n${my}${answerPart}`

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        ta.remove()
      }
      setCopied(true)
      if (copyTimer.current) clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      window.alert('复制失败，请手动选择文字复制')
    }
  }

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.head}>
        <span className="badge badge-blue">第 {num} 题</span>
        {tag && <span className="badge badge-gray">{tag}</span>}
      </div>

      <p className={styles.stem}>{stem}</p>

      <div className={styles.options} role="listbox" aria-label="选项">
        {options.map((opt, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.option} ${optionClass(i)}`}
            disabled={answered}
            onClick={() => onChoose(i)}
          >
            <span className={styles.letter}>{LETTERS[i]}</span>
            <span className={styles.optText}>{opt}</span>
            {answered && i === answer && (
              <span className={`${styles.mark} ${styles.markRight}`}>
                <CheckIcon size={16} />
              </span>
            )}
            {answered && i === selected && !isCorrect && (
              <span className={`${styles.mark} ${styles.markWrong}`}>
                <XmarkIcon size={15} />
              </span>
            )}
          </button>
        ))}
      </div>

      {!answered ? (
        <div className={`flex-gap ${styles.actions}`}>
          <button className="btn btn-primary" disabled={selected === null} onClick={onSubmit}>
            提交答案
          </button>
          <button className="btn btn-ghost" onClick={copyHelp}>
            {copied ? '已复制 ✓ 快去问人吧' : (
              <>
                <CopyIcon size={15} /> 一键复制求助
              </>
            )}
          </button>
          <span className={styles.kbdHint}>
            快捷键：<kbd>1-4</kbd> 选择 · <kbd>Enter</kbd> 提交
          </span>
        </div>
      ) : (
        <div className={`${styles.result} ${isCorrect ? styles.resultRight : styles.resultWrong}`}>
          <p className={styles.verdict}>
            {isCorrect ? (
              <>
                <CheckIcon size={16} /> 回答正确！
              </>
            ) : (
              <>
                <XmarkIcon size={15} /> 回答错误，正确答案是 {LETTERS[answer]}
              </>
            )}
          </p>
          <p className={styles.explain}>
            <strong>解析：</strong>
            {explanation}
          </p>
          <div className="mt-8">
            <button className="btn btn-quiet" onClick={copyHelp}>
              {copied ? '已复制 ✓ 快去问人吧' : (
                <>
                  <CopyIcon size={14} /> 复制本题求助（含题目/我的答案/正确答案/解析）
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
