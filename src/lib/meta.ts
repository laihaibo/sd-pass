// 构建期生成的轻量站点元数据（见 scripts/gen-meta.mjs）。
// 客户端组件只允许从这里取章节数/题数等统计，禁止直接 import 内容数据模块

import rawMeta from '@/data/generated/meta.json'

export interface SiteMeta {
  chapters: { id: string; title: string }[]
  chapterCounts: Record<string, number>
  questionTotal: number
  subjectiveTotal: number
  subjectiveTypes: { id: string; name: string }[]
}

export const siteMeta: SiteMeta = rawMeta as unknown as SiteMeta
