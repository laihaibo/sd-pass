'use client'

// 考试倒计时卡：数据来自进度 store（localStorage），mounted 后渲染避免水合不一致

import { useProgressStore, daysLeftOf } from '@/lib/stores/progress'
import { useHasMounted } from '@/lib/hooks'
import { CalendarIcon } from '@/components/icons'
import styles from './CountdownCard.module.css'

export default function CountdownCard() {
  const mounted = useHasMounted()
  const examDate = useProgressStore((s) => s.examDate)
  const days = daysLeftOf(examDate)

  const daysText =
    days > 0 ? '距离考试还有 ' + days + ' 天' : days === 0 ? '今天就是考试日，稳住！' : '考试日期已过，请到进度页更新'

  return (
    <div className={`${styles.card} glass`}>
      <div className={styles.head}>
        <CalendarIcon size={15} />
        <span>考试倒计时</span>
      </div>
      <div className={styles.num}>{mounted ? Math.max(days, 0) : '—'}</div>
      <div className={styles.label}>{mounted ? daysText : ''}</div>
      <div className={styles.date}>考试日期：{examDate}</div>
    </div>
  )
}
