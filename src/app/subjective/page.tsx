import type { Metadata } from 'next'
import { subjectives, subjectiveTypes } from '@/lib/subjective-content'
import SubjectiveGrid from '@/components/subjective/SubjectiveGrid'

export const metadata: Metadata = {
  title: '主观题精析',
  description: '软考软件设计师下午卷主观题精析：数据流图、数据库设计、UML、算法、Java 五大题型，五段式拆解得分套路。',
}

export default function SubjectivePage() {
  const items = subjectives.map((s, i) => ({
    id: s.id,
    type: s.type,
    no: (i % 3) + 1,
    title: s.title,
    excerpt: s.approach.replace(/\s+/g, ' ').trim().slice(0, 60) + '…',
  }))

  return (
    <div className="container">
      <div className="page-head">
        <h1 className="section-title">下午卷 · 主观题精析</h1>
        <p className="section-sub">
          下午卷共 6 大题（前 4 题必做 + C++/Java 二选一），每题 15
          分。每道例题按「原题 → 解题思路 → 得分点拆解 → 参考答案 → 快速得分技巧」五段拆解，帮你掌握得分套路。
        </p>
      </div>
      <SubjectiveGrid
        types={subjectiveTypes}
        items={items}
      />
    </div>
  )
}
