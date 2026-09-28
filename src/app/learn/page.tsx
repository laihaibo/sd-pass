import type { Metadata } from 'next'
import { siteMeta } from '@/lib/meta'
import { chapters, chapterExcerpt } from '@/lib/chapter-content'
import ChapterGrid from '@/components/learn/ChapterGrid'

export const metadata: Metadata = {
  title: '知识学习',
  description: '软考软件设计师 14 章考纲知识精讲：零基础深入浅出、图解、高频考点与应试技巧。',
}

export default function LearnPage() {
  const items = chapters.map((c, i) => ({
    id: c.id,
    index: i,
    title: c.title,
    excerpt: chapterExcerpt(c),
    qCount: siteMeta.chapterCounts[c.id] ?? 0,
  }))

  return (
    <div className="container">
      <div className="page-head">
        <h1 className="section-title">知识学习</h1>
        <p className="section-sub">
          共 {siteMeta.chapters.length} 章：一章「零基础前传」补常识地基，14 章覆盖官方考纲全部考点。
          读完一章就标记完成，并顺手做本章配套题。
        </p>
      </div>
      <ChapterGrid items={items} />
    </div>
  )
}
