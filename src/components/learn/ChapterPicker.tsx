'use client'

// 章节快速跳转选择器（阅读页顶栏）

import { useRouter } from 'next/navigation'
import styles from './ChapterPicker.module.css'

export default function ChapterPicker({
  currentId,
  items,
}: {
  currentId: string
  items: { id: string; title: string }[]
}) {
  const router = useRouter()

  return (
    <div className={styles.wrap}>
      <select
        className={`select ${styles.select}`}
        value={currentId}
        aria-label="跳转到其他章节"
        onChange={(e) => router.push(`/learn/${e.target.value}`)}
      >
        {items.map((it, i) => (
          <option key={it.id} value={it.id}>
            {i === 0 ? it.title : `${i}. ${it.title}`}
          </option>
        ))}
      </select>
    </div>
  )
}
