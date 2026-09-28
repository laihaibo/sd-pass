import type { Metadata } from 'next'
import { Suspense } from 'react'
import ProgressClient from '@/components/progress/ProgressClient'

export const metadata: Metadata = {
  title: '进度与计划',
  description: '备考进度总览、各章正确率分析、考试倒计时设置、做题记录 JSON 备份与迁移。',
}

export default function ProgressPage() {
  return (
    <Suspense fallback={<div className="container" />}>
      <ProgressClient />
    </Suspense>
  )
}
