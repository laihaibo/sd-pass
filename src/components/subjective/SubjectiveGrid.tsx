'use client'

// 主观题首页：iOS 分段控件切换题型 + 例题卡片；已掌握状态来自进度 store

import { useState } from 'react'
import Link from 'next/link'
import { useProgressStore } from '@/lib/stores/progress'
import { useHasMounted } from '@/lib/hooks'
import SegmentedControl from '@/components/subjective/SegmentedControl'
import { CheckIcon, ChevronRightIcon } from '@/components/icons'
import type { SubjectiveType } from '@/lib/types'
import styles from './SubjectiveGrid.module.css'

interface ItemMeta {
  id: string
  type: string
  no: number
  title: string
  excerpt: string
}

export default function SubjectiveGrid({
  types,
  items,
}: {
  types: SubjectiveType[]
  items: ItemMeta[]
}) {
  const [activeType, setActiveType] = useState(types[0]?.id ?? '')
  const mounted = useHasMounted()
  const subjectiveRead = useProgressStore((s) => s.subjectiveRead)

  const list = items.filter((it) => it.type === activeType)
  const typeName = types.find((t) => t.id === activeType)?.name ?? ''

  return (
    <div>
      <div className={styles.tabs}>
        <SegmentedControl
          items={types.map((t) => ({ id: t.id, label: t.name }))}
          value={activeType}
          onChange={setActiveType}
          ariaLabel="题型"
        />
      </div>

      <div className={`grid grid-3 ${styles.grid}`}>
        {list.map((it) => {
          const mastered = mounted && !!subjectiveRead[it.id]
          return (
            <Link key={it.id} href={`/subjective/${it.id}`} className={`${styles.card} card card-hover`}>
              <div className={styles.head}>
                <span className="badge badge-blue">例题 {it.no}</span>
                {mastered && (
                  <span className={styles.mastered}>
                    <CheckIcon size={12} /> 已掌握
                  </span>
                )}
              </div>
              <h2 className={styles.title}>{it.title}</h2>
              <p className={styles.excerpt}>{it.excerpt}</p>
              <span className={styles.go}>
                开始精析 <ChevronRightIcon size={14} />
              </span>
            </Link>
          )
        })}
      </div>

      {list.length === 0 && (
        <div className="card text-center text-light">该题型例题整理中…</div>
      )}

      <p className={styles.typeHint}>{typeName} · 每题 15 分，五段式拆解</p>
    </div>
  )
}
