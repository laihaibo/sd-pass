'use client'

// 进度与备考计划：总览统计 / 各章正确率 / 考试日期 / 备份迁移 / 三段式计划

import { useRef, useState } from 'react'
import { siteMeta } from '@/lib/meta'
import { useProgressStore, daysLeftOf, readCount } from '@/lib/stores/progress'
import { recordsStats, useRecordsStore } from '@/lib/stores/records'
import { useWrongbookStore } from '@/lib/stores/wrongbook'
import { buildStudyPlan } from '@/lib/exam-plan'
import { exportBackup, importBackup } from '@/lib/backup'
import { useHasMounted } from '@/lib/hooks'
import ProgressChart, { type ChartItem } from '@/components/ProgressChart'
import { CalendarIcon, ChartIcon, DownloadIcon, FlagIcon, UploadIcon } from '@/components/icons'
import styles from './ProgressClient.module.css'

export default function ProgressClient() {
  const mounted = useHasMounted()
  const chaptersMap = useProgressStore((s) => s.chapters)
  const subjectiveRead = useProgressStore((s) => s.subjectiveRead)
  const examDate = useProgressStore((s) => s.examDate)
  const setExamDate = useProgressStore((s) => s.setExamDate)
  const records = useRecordsStore((s) => s.list)
  const wrongIds = useWrongbookStore((s) => s.ids)

  const [msg, setMsg] = useState('')
  const [msgOk, setMsgOk] = useState(true)
  const fileRef = useRef<HTMLInputElement>(null)

  const stats = recordsStats(records)
  const days = daysLeftOf(examDate)
  const plan = buildStudyPlan(days)

  const chartData: ChartItem[] = siteMeta.chapters.map((ch) => {
    const st = stats.perChapter[ch.id]
    return {
      label: ch.title,
      value: st && st.done ? Math.round((st.correct / st.done) * 100) : 0,
      detail: st && st.done ? `做 ${st.done} 题 · 对 ${st.correct}` : '未开始',
    }
  })

  function onExport() {
    exportBackup()
    setMsg('已导出备份文件，请妥善保存；在新浏览器导入即可恢复全部做题记录。')
    setMsgOk(true)
  }

  async function onImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      await importBackup(file)
      setMsg('恢复成功！做题记录、错题本与学习进度已还原。')
      setMsgOk(true)
    } catch (err) {
      setMsg('恢复失败：' + (err instanceof Error ? err.message : String(err)))
      setMsgOk(false)
    }
    e.target.value = ''
  }

  const overview = [
    { value: mounted ? `${readCount(chaptersMap)}/${siteMeta.chapters.length}` : '—', label: '已学章节', icon: <ChartIcon size={15} /> },
    { value: mounted ? String(stats.done) : '—', label: '累计做题', icon: null },
    { value: mounted ? `${stats.rate}%` : '—', label: '总正确率', icon: null },
    { value: mounted ? `${Object.keys(subjectiveRead).length}/${siteMeta.subjectiveTotal}` : '—', label: '主观题已精析', icon: null },
  ]

  return (
    <div className="container">
      <div className="page-head">
        <h1 className="section-title">进度与备考计划</h1>
      </div>

      {/* 总览 */}
      <div className="grid grid-4">
        {overview.map((it) => (
          <div key={it.label} className={`card ${styles.statCard}`}>
            <div className="stat-value">{it.value}</div>
            <div className="stat-label">{it.label}</div>
          </div>
        ))}
      </div>

      <div className={`grid grid-2 ${styles.midGrid}`}>
        {/* 各章正确率 */}
        <div className="card">
          <h2 className={styles.panelTitle}>
            <ChartIcon size={17} /> 各章做题正确率
          </h2>
          <ProgressChart items={chartData} />
          <p className={`muted mt-8 ${styles.panelNote}`}>
            正确率低于 60% 的章节建议回到「知识学习」重看讲解后再刷题。
          </p>
        </div>

        {/* 考试设置 + 备份 */}
        <div className="card">
          <h2 className={styles.panelTitle}>
            <CalendarIcon size={17} /> 考试倒计时
          </h2>
          <div className={`flex-gap ${styles.examRow}`}>
            <label className={styles.examLabel} htmlFor="exam-date">
              考试日期
            </label>
            <input
              id="exam-date"
              type="date"
              className="input-date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
            />
            {mounted && (
              <span className={`badge ${days > 0 ? 'badge-blue' : 'badge-gray'}`}>
                {days > 0 ? `剩 ${days} 天` : '日期已过'}
              </span>
            )}
          </div>

          <h2 className={`${styles.panelTitle} ${styles.backupTitle}`}>
            <DownloadIcon size={17} /> 做题记录备份与迁移
          </h2>
          <p className={styles.panelNote}>
            学习数据保存在本浏览器。换设备/换浏览器时：先「导出备份」，再到新环境「导入备份」即可完整还原做题记录、错题本与进度。
          </p>
          <div className={`flex-gap ${styles.backupRow}`}>
            <button className="btn btn-primary" onClick={onExport}>
              <DownloadIcon size={15} /> 导出备份 JSON
            </button>
            <button className="btn btn-ghost" onClick={() => fileRef.current?.click()}>
              <UploadIcon size={15} /> 导入备份
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".json,application/json"
              style={{ display: 'none' }}
              onChange={onImport}
            />
          </div>
          {msg && (
            <p className={styles.msg} data-ok={msgOk ? '' : undefined}>
              {msg}
            </p>
          )}
        </div>
      </div>

      {/* 备考计划 */}
      {plan && (
        <div className="card mt-24">
          <h2 className={styles.panelTitle}>
            <FlagIcon size={17} /> 三段式备考计划（按剩余 {days} 天自动生成）
          </h2>
          <div className="grid grid-3">
            {plan.map((p, i) => (
              <div key={i} className={styles.planCard}>
                <div className={styles.planName}>{p.name}</div>
                <span className="badge badge-orange">{p.days}</span>
                <ul className={styles.planTasks}>
                  {p.tasks.map((t, j) => (
                    <li key={j}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="callout callout-blue mt-24">
        <strong>及格线提醒：</strong>
        上午卷 75 题满分 75 分，45 分及格；下午卷 6 大题满分 75 分，45 分及格。两科都过线才能拿证。
        当前错题 {mounted ? wrongIds.length : 0} 道，记得定期重练！
      </div>
    </div>
  )
}
