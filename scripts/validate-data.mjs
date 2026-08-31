// 数据合法性校验：改完 src/data/ 下的数据文件后运行 `pnpm validate`
// 检查 id 唯一性、字段完整性、答案取值范围等，防止"构建通过但题目是坏的"
import { chapters } from '../src/data/chapters.js'
import { questions } from '../src/data/questions.js'
import { subjectives } from '../src/data/subjectives.js'

const errors = []

function fail(where, msg) {
  errors.push(`[${where}] ${msg}`)
}

// ---- 章节 ----
const chapterIds = new Set()
chapters.forEach((ch, i) => {
  const where = `chapters[${i}] ${ch.id || '(无id)'}`
  if (!ch.id) fail(where, '缺少 id')
  else if (chapterIds.has(ch.id)) fail(where, `id 重复：${ch.id}`)
  else chapterIds.add(ch.id)

  for (const field of ['title', 'syllabus', 'intro']) {
    if (!ch[field]) fail(where, `缺少字段 ${field}`)
  }
  if (!Array.isArray(ch.sections) || !ch.sections.length) fail(where, 'sections 为空或不是数组')
  ch.sections?.forEach((sec, j) => {
    if (!sec.h) fail(`${where} sections[${j}]`, '缺少标题 h')
    if (!sec.p) fail(`${where} sections[${j}]`, '缺少正文 p')
  })
  if (!Array.isArray(ch.keyPoints) || !ch.keyPoints.length) fail(where, 'keyPoints 为空或不是数组')
  if (!Array.isArray(ch.tips) || !ch.tips.length) fail(where, 'tips 为空或不是数组')
})

// ---- 客观题 ----
const questionIds = new Set()
const answerDist = [0, 0, 0, 0]
questions.forEach((q, i) => {
  const where = `questions[${i}] ${q.id || '(无id)'}`
  if (!q.id) fail(where, '缺少 id')
  else if (questionIds.has(q.id)) fail(where, `id 重复：${q.id}`)
  else questionIds.add(q.id)

  if (!q.chapterId || !chapterIds.has(q.chapterId)) fail(where, `chapterId 无效：${q.chapterId}`)
  if (!q.stem) fail(where, '缺少题干 stem')
  if (!Array.isArray(q.options) || q.options.length !== 4) fail(where, `options 必须是 4 个选项，实际 ${q.options?.length}`)
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) fail(where, `answer 必须是 0~3 的整数，实际：${q.answer}`)
  else answerDist[q.answer]++
  if (!q.explanation) fail(where, '缺少解析 explanation')
  if (!q.tag) fail(where, '缺少标签 tag')
})

// ---- 主观题 ----
const validTypes = ['dfd', 'db', 'uml', 'algo', 'java']
const subjectiveIds = new Set()
subjectives.forEach((s, i) => {
  const where = `subjectives[${i}] ${s.id || '(无id)'}`
  if (!s.id) fail(where, '缺少 id')
  else if (subjectiveIds.has(s.id)) fail(where, `id 重复：${s.id}`)
  else subjectiveIds.add(s.id)

  if (!validTypes.includes(s.type)) fail(where, `type 无效：${s.type}（应为 ${validTypes.join('/')}）`)
  for (const field of ['typeName', 'title', 'stem', 'approach', 'referenceAnswer', 'quickScoringTip']) {
    if (!s[field]) fail(where, `缺少字段 ${field}`)
  }
  if (!Array.isArray(s.scorePoints) || !s.scorePoints.length) fail(where, 'scorePoints 为空或不是数组')
})

// ---- 汇总 ----
console.log(`章节 ${chapters.length} 章 · 客观题 ${questions.length} 题 · 主观题 ${subjectives.length} 题`)
console.log(`答案分布 A:${answerDist[0]} B:${answerDist[1]} C:${answerDist[2]} D:${answerDist[3]}`)

if (errors.length) {
  console.error(`\n发现 ${errors.length} 个问题：`)
  errors.forEach((e) => console.error('  ✗ ' + e))
  process.exit(1)
}
console.log('✓ 数据校验全部通过')
