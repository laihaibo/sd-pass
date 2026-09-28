// 主观题内容注册表：仅服务端组件（RSC）使用（同 chapter-content.ts 的约束）

import type { SubjectiveItem, SubjectiveType } from '@/lib/types'
import type1 from '@/data/subjective/type1_dfd'
import type2 from '@/data/subjective/type2_db'
import type3 from '@/data/subjective/type3_uml'
import type4 from '@/data/subjective/type4_algo'
import type5 from '@/data/subjective/type5_java'

export const subjectives: SubjectiveItem[] = [
  ...(type1 as SubjectiveItem[]),
  ...(type2 as SubjectiveItem[]),
  ...(type3 as SubjectiveItem[]),
  ...(type4 as SubjectiveItem[]),
  ...(type5 as SubjectiveItem[]),
]

export const subjectiveTypes: SubjectiveType[] = [
  { id: 'dfd', name: '数据流图分析' },
  { id: 'db', name: '数据库设计' },
  { id: 'uml', name: 'UML建模' },
  { id: 'algo', name: '算法与数据结构应用' },
  { id: 'java', name: 'Java面向对象程序设计' },
]

export function getSubjective(id: string): SubjectiveItem | undefined {
  return subjectives.find((s) => s.id === id)
}

/** 同题型内的前后例题（用于上一题/下一题导航） */
export function subjectiveNeighbors(id: string): { prev?: SubjectiveItem; next?: SubjectiveItem } {
  const list = subjectives.filter((s) => s.type === getSubjective(id)?.type)
  const i = list.findIndex((s) => s.id === id)
  return { prev: list[i - 1], next: list[i + 1] }
}
