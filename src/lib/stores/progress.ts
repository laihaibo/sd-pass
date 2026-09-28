'use client'

// 章节学习进度 + 主观题掌握 + 考试日期
// localStorage 键与数据结构与旧版 Vue 站点完全一致（sd-progress），老用户数据无缝延续

import { create } from 'zustand'
import { loadLocal, saveLocal } from '@/lib/persist'

const KEY = 'sd-progress'

interface ChapterFlag {
  read?: boolean
}

interface ProgressData {
  chapters: Record<string, ChapterFlag>
  subjectiveRead: Record<string, boolean>
  examDate: string
}

interface ProgressActions {
  markRead: (chapterId: string) => void
  markSubjective: (id: string) => void
  setExamDate: (date: string) => void
  restore: (state: Partial<ProgressData>) => void
}

export type ProgressStore = ProgressData & ProgressActions

const defaults: ProgressData = {
  chapters: {},
  subjectiveRead: {},
  examDate: '2026-11-07', // 2026 下半年软考预计日期，可在进度页修改
}

export const useProgressStore = create<ProgressStore>()((set, get) => ({
  ...loadLocal<ProgressData>(KEY, defaults),
  markRead: (chapterId) => {
    set((s) => ({ chapters: { ...s.chapters, [chapterId]: { ...s.chapters[chapterId], read: true } } }))
    saveLocal(KEY, {
      chapters: get().chapters,
      subjectiveRead: get().subjectiveRead,
      examDate: get().examDate,
    })
  },
  markSubjective: (id) => {
    set((s) => ({ subjectiveRead: { ...s.subjectiveRead, [id]: true } }))
    saveLocal(KEY, {
      chapters: get().chapters,
      subjectiveRead: get().subjectiveRead,
      examDate: get().examDate,
    })
  },
  setExamDate: (date) => {
    if (!date) return
    set({ examDate: date })
    saveLocal(KEY, {
      chapters: get().chapters,
      subjectiveRead: get().subjectiveRead,
      examDate: get().examDate,
    })
  },
  restore: (state) => {
    set({
      chapters: state.chapters ?? {},
      subjectiveRead: state.subjectiveRead ?? {},
      examDate: state.examDate || defaults.examDate,
    })
    saveLocal(KEY, {
      chapters: get().chapters,
      subjectiveRead: get().subjectiveRead,
      examDate: get().examDate,
    })
  },
}))

export function readCount(chapters: Record<string, ChapterFlag>): number {
  return Object.values(chapters).filter((c) => c && c.read).length
}

export function daysLeftOf(examDate: string): number {
  const target = new Date(examDate + 'T00:00:00')
  const today = new Date(new Date().toDateString())
  return Math.ceil((target.getTime() - today.getTime()) / 86400000)
}
