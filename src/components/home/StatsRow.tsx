'use client'

// 首页个人统计：已学章节 / 累计做题 / 正确率 / 错题数

import meta from '@/data/generated/meta.json'
import { useProgressStore, readCount } from '@/lib/stores/progress'
import { recordsStats, useRecordsStore } from '@/lib/stores/records'
import { useWrongbookStore } from '@/lib/stores/wrongbook'
import { useHasMounted } from '@/lib/hooks'
import styles from './StatsRow.module.css'

export default function StatsRow() {
  const mounted = useHasMounted()
  const chapters = useProgressStore((s) => s.chapters)
  const records = useRecordsStore((s) => s.list)
  const wrongIds = useWrongbookStore((s) => s.ids)

  const stats = recordsStats(records)
  const read = readCount(chapters)

  const items = [
    { value: mounted ? `${read}/${meta.chapters.length}` : '—', label: '已学章节' },
    { value: mounted ? String(stats.done) : '—', label: '累计做题' },
    { value: mounted ? `${stats.rate}%` : '—', label: '正确率' },
    { value: mounted ? String(wrongIds.length) : '—', label: '错题待攻克' },
  ]

  return (
    <div className={`grid grid-4 ${styles.row}`}>
      {items.map((it) => (
        <div key={it.label} className={`card ${styles.cell}`}>
          <div className="stat-value">{it.value}</div>
          <div className="stat-label">{it.label}</div>
        </div>
      ))}
    </div>
  )
}
