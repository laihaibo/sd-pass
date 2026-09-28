import type { Metadata } from 'next'
import { Suspense } from 'react'
import PracticeClient from '@/components/practice/PracticeClient'

export const metadata: Metadata = {
  title: '刷题练习',
  description: '软考软件设计师 700+ 道客观题：章节练习、模拟考试（75 题 150 分钟）、错题重练，即时判分显示解析。',
}

export default function PracticePage() {
  // useSearchParams 需要在静态导出时有 Suspense 边界
  return (
    <Suspense fallback={<div className="container" />}>
      <PracticeClient />
    </Suspense>
  )
}
