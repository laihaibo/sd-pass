'use client'

// iOS 风格分段控件：等宽分段 + 滑动白色拇指

import { useId } from 'react'
import styles from './SegmentedControl.module.css'

interface Props {
  items: { id: string; label: string }[]
  value: string
  onChange: (id: string) => void
  ariaLabel?: string
}

export default function SegmentedControl({ items, value, onChange, ariaLabel }: Props) {
  const baseId = useId()
  const activeIndex = Math.max(
    items.findIndex((it) => it.id === value),
    0
  )

  return (
    <div className={styles.wrap} role="tablist" aria-label={ariaLabel}>
      <div
        className={styles.thumb}
        style={{
          width: `calc((100% - 8px) / ${items.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
        aria-hidden="true"
      />
      {items.map((it) => (
        <button
          key={it.id}
          id={`${baseId}-${it.id}`}
          role="tab"
          aria-selected={it.id === value}
          className={`${styles.seg} ${it.id === value ? styles.segActive : ''}`}
          onClick={() => onChange(it.id)}
        >
          {it.label}
        </button>
      ))}
    </div>
  )
}
