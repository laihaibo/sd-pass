'use client'

// 做题记录：localStorage 键 sd-records 与旧版一致

import { create } from 'zustand'
import { loadLocal, saveLocal } from '@/lib/persist'
import type { AnswerRecord, QuizMode } from '@/lib/types'

const KEY = 'sd-records'

interface RecordsData {
  list: AnswerRecord[]
}

interface RecordsActions {
  addRecord: (r: { qid: string; chapterId: string; chosen: number; correct: boolean; mode: QuizMode }) => void
  restore: (state: Partial<RecordsData>) => void
}

export type RecordsStore = RecordsData & RecordsActions

export const useRecordsStore = create<RecordsStore>()((set, get) => ({
  ...loadLocal<RecordsData>(KEY, { list: [] }),
  addRecord: (r) => {
    set((s) => ({ list: [...s.list, { ...r, ts: Date.now() }] }))
    saveLocal(KEY, { list: get().list })
  },
  restore: (state) => {
    set({ list: Array.isArray(state?.list) ? state.list : [] })
    saveLocal(KEY, { list: get().list })
  },
}))

export function recordsStats(list: AnswerRecord[]) {
  const done = list.length
  const correct = list.filter((r) => r.correct).length
  const perChapter: Record<string, { done: number; correct: number }> = {}
  for (const r of list) {
    if (!r.chapterId) continue
    if (!perChapter[r.chapterId]) perChapter[r.chapterId] = { done: 0, correct: 0 }
    perChapter[r.chapterId].done++
    if (r.correct) perChapter[r.chapterId].correct++
  }
  return {
    done,
    correct,
    rate: done ? Math.round((correct / done) * 100) : 0,
    perChapter,
  }
}
