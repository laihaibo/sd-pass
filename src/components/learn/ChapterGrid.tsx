'use client'

// 章节网格：已学状态来自进度 store（仅注水这一小块，章节内容本体由 RSC 静态渲染）

import Link from 'next/link'
import { useProgressStore } from '@/lib/stores/progress'
import { useHasMounted } from '@/lib/hooks'
import { CheckIcon, ChevronRightIcon, PencilIcon } from '@/components/icons'
import styles from './ChapterGrid.module.css'

export interface ChapterCardItem {
  id: string
  index: number
  title: string
  excerpt: string
  qCount: number
}

export default function ChapterGrid({ items }: { items: ChapterCardItem[] }) {
  const mounted = useHasMounted()
  const chapters = useProgressStore((s) => s.chapters)

  return (
    <div className={`grid grid-3 ${styles.grid}`}>
      {items.map((item) => {
        const isRead = mounted && !!chapters[item.id]?.read
        return (
          <Link key={item.id} href={`/learn/${item.id}`} className={`${styles.card} card card-hover`}>
            <div className={styles.top}>
              <span className={styles.no}>{item.index === 0 ? '前传' : item.index}</span>
              {isRead && (
                <span className={styles.readBadge}>
                  <CheckIcon size={12} /> 已学
                </span>
              )}
            </div>
            <h2 className={styles.title}>{item.title}</h2>
            <p className={styles.excerpt}>{item.excerpt}</p>
            <div className={styles.footer}>
              <span className={styles.qCount}>
                {item.qCount > 0 ? (
                  <>
                    <PencilIcon size={13} /> {item.qCount} 道配套题
                  </>
                ) : (
                  '无配套题 · 考前热身'
                )}
              </span>
              <span className={styles.go}>
                阅读 <ChevronRightIcon size={14} />
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
