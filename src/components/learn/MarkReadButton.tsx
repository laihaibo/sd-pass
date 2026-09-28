'use client'

// 「我学会了」标记按钮：写进度 store；已学状态时呈现为绿色完成徽章

import { useProgressStore } from '@/lib/stores/progress'
import { useHasMounted } from '@/lib/hooks'
import { CheckIcon } from '@/components/icons'

export default function MarkReadButton({ chapterId }: { chapterId: string }) {
  const mounted = useHasMounted()
  const isRead = useProgressStore((s) => !!s.chapters[chapterId]?.read)
  const markRead = useProgressStore((s) => s.markRead)

  if (!mounted) {
    return (
      <button className="btn btn-success" disabled>
        <CheckIcon size={16} /> 我学会了，标记完成
      </button>
    )
  }

  if (isRead) {
    return (
      <span className="badge badge-green" style={{ padding: '8px 18px', fontSize: '14px' }}>
        <CheckIcon size={15} /> 本章已学会
      </span>
    )
  }

  return (
    <button className="btn btn-success" onClick={() => markRead(chapterId)}>
      <CheckIcon size={16} /> 我学会了，标记完成
    </button>
  )
}
