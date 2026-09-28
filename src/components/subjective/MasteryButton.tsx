'use client'

// 「我掌握了」按钮：写进度 store 的 subjectiveRead

import { useProgressStore } from '@/lib/stores/progress'
import { useHasMounted } from '@/lib/hooks'
import { CheckIcon } from '@/components/icons'

export default function MasteryButton({ itemId }: { itemId: string }) {
  const mounted = useHasMounted()
  const mastered = useProgressStore((s) => !!s.subjectiveRead[itemId])
  const markSubjective = useProgressStore((s) => s.markSubjective)

  if (!mounted) {
    return (
      <button className="btn btn-success" disabled>
        <CheckIcon size={16} /> 我掌握了这道题
      </button>
    )
  }

  if (mastered) {
    return (
      <span className="badge badge-green" style={{ padding: '8px 18px', fontSize: '14px' }}>
        <CheckIcon size={15} /> 已掌握
      </span>
    )
  }

  return (
    <button className="btn btn-success" onClick={() => markSubjective(itemId)}>
      <CheckIcon size={16} /> 我掌握了这道题
    </button>
  )
}
