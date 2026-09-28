// 构建期从 src/data 聚合模块生成轻量元数据 meta.json（约 1KB）：
// 客户端组件只依赖它获取章节数/题数等统计，从而避免把 900KB 内容打进客户端包。
// predev / prebuild 时自动运行，产物同时提交入库方便直接 dev。

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const { chapters } = await import(pathToFileURL(resolve(root, 'src/data/chapters.js')).href)
const { questions } = await import(pathToFileURL(resolve(root, 'src/data/questions.js')).href)
const { subjectives, subjectiveTypes } = await import(
  pathToFileURL(resolve(root, 'src/data/subjectives.js')).href
)

const chapterCounts = {}
for (const q of questions) {
  chapterCounts[q.chapterId] = (chapterCounts[q.chapterId] || 0) + 1
}

const meta = {
  chapters: chapters.map((c) => ({ id: c.id, title: c.title })),
  chapterCounts,
  questionTotal: questions.length,
  subjectiveTotal: subjectives.length,
  subjectiveTypes,
}

const outFile = resolve(root, 'src/data/generated/meta.json')
mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, JSON.stringify(meta, null, 2) + '\n')
console.log(
  `[gen-meta] meta.json 已生成：${chapters.length} 章 / ${questions.length} 题 / ${subjectives.length} 道主观题`
)
