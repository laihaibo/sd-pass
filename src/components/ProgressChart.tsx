'use client'

// 纯 CSS 横向条形图：各章正确率（与旧版一致的展示口径）

import styles from './ProgressChart.module.css'

export interface ChartItem {
  label: string
  value: number // 0-100
  detail: string
}

export default function ProgressChart({ items }: { items: ChartItem[] }) {
  return (
    <div className={styles.wrap}>
      {items.map((item, i) => (
        <div key={i} className={styles.row}>
          <div className={styles.label} title={item.label}>
            {item.label}
          </div>
          <div className={styles.track}>
            <div
              className={styles.bar}
              style={{ width: Math.max(item.value, item.value === 0 ? 0 : 2) + '%' }}
            />
          </div>
          <div className={styles.value}>{item.detail}</div>
        </div>
      ))}
    </div>
  )
}
