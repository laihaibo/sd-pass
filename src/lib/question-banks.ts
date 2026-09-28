'use client'

// 客观题题库：按章动态 import，每章独立 chunk。
// 章节练习只加载所选章节（约 30KB），模拟考/错题重练才并行加载全部题库，
// 这是相比旧版整包打包（约 900KB 一次加载）最大的体积优化点。

import type { Question } from '@/lib/types'

type BankLoader = () => Promise<{ default: Question[] }>

/** 有配套题的章节（ch00 前传无题） */
export const bankChapterIds = [
  'ch01', 'ch02', 'ch03', 'ch04', 'ch05', 'ch06', 'ch07',
  'ch08', 'ch09', 'ch10', 'ch11', 'ch12', 'ch13', 'ch14',
] as const

const bankLoaders: Record<string, BankLoader> = {
  ch01: () => import('@/data/questions/q_ch01'),
  ch02: () => import('@/data/questions/q_ch02'),
  ch03: () => import('@/data/questions/q_ch03'),
  ch04: () => import('@/data/questions/q_ch04'),
  ch05: () => import('@/data/questions/q_ch05'),
  ch06: () => import('@/data/questions/q_ch06'),
  ch07: () => import('@/data/questions/q_ch07'),
  ch08: () => import('@/data/questions/q_ch08'),
  ch09: () => import('@/data/questions/q_ch09'),
  ch10: () => import('@/data/questions/q_ch10'),
  ch11: () => import('@/data/questions/q_ch11'),
  ch12: () => import('@/data/questions/q_ch12'),
  ch13: () => import('@/data/questions/q_ch13'),
  ch14: () => import('@/data/questions/q_ch14'),
}

export async function loadChapterQuestions(chapterId: string): Promise<Question[]> {
  const loader = bankLoaders[chapterId]
  if (!loader) return []
  return (await loader()).default
}

export async function loadAllQuestions(): Promise<Question[]> {
  const mods = await Promise.all(bankChapterIds.map((id) => bankLoaders[id]()))
  return mods.flatMap((m) => m.default)
}

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
