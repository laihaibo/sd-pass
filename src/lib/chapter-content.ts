// 章节内容注册表：仅服务端组件（RSC）使用，静态导入全部章节参与构建期预渲染。
// 客户端组件禁止 import 本文件——客户端请使用 src/data/generated/meta.json 轻量元数据

import type { Chapter } from '@/lib/types'
import ch00 from '@/data/chapters/ch00'
import ch01 from '@/data/chapters/ch01'
import ch02 from '@/data/chapters/ch02'
import ch03 from '@/data/chapters/ch03'
import ch04 from '@/data/chapters/ch04'
import ch05 from '@/data/chapters/ch05'
import ch06 from '@/data/chapters/ch06'
import ch07 from '@/data/chapters/ch07'
import ch08 from '@/data/chapters/ch08'
import ch09 from '@/data/chapters/ch09'
import ch10 from '@/data/chapters/ch10'
import ch11 from '@/data/chapters/ch11'
import ch12 from '@/data/chapters/ch12'
import ch13 from '@/data/chapters/ch13'
import ch14 from '@/data/chapters/ch14'

export const chapters: Chapter[] = [
  ch00, ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08,
  ch09, ch10, ch11, ch12, ch13, ch14,
] as Chapter[]

export function getChapter(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id)
}

export function chapterIndex(id: string): number {
  return chapters.findIndex((c) => c.id === id)
}

/** 章节卡片摘要：取导读前 ~64 字 */
export function chapterExcerpt(c: Chapter): string {
  const text = c.intro.replace(/\s+/g, ' ').trim()
  return text.length > 64 ? text.slice(0, 64) + '…' : text
}
