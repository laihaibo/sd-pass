'use client'

// 错题本：localStorage 键 sd-wrongbook 与旧版一致，新错题插到最前

import { create } from 'zustand'
import { loadLocal, saveLocal } from '@/lib/persist'

const KEY = 'sd-wrongbook'

interface WrongbookData {
  ids: string[]
}

interface WrongbookActions {
  add: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  restore: (state: Partial<WrongbookData>) => void
}

export type WrongbookStore = WrongbookData & WrongbookActions

export const useWrongbookStore = create<WrongbookStore>()((set, get) => ({
  ...loadLocal<WrongbookData>(KEY, { ids: [] }),
  add: (id) => {
    if (get().ids.includes(id)) return
    set((s) => ({ ids: [id, ...s.ids] }))
    saveLocal(KEY, { ids: get().ids })
  },
  remove: (id) => {
    set((s) => ({ ids: s.ids.filter((x) => x !== id) }))
    saveLocal(KEY, { ids: get().ids })
  },
  clear: () => {
    set({ ids: [] })
    saveLocal(KEY, { ids: [] })
  },
  restore: (state) => {
    set({ ids: Array.isArray(state?.ids) ? state.ids : [] })
    saveLocal(KEY, { ids: get().ids })
  },
}))
