'use client'

// 模拟考试断点续答的持久化会话（localStorage 键 sd-mock-session）。
// 用 useSyncExternalStore 消费：同一标签页写入时派发自定义事件，跨标签页由 storage 事件驱动。

import { readLocal, removeLocal } from '@/lib/persist'

const KEY = 'sd-mock-session'
const CHANGE_EVENT = 'sd-mock-change'

export interface SavedMock {
  qids: string[]
  index: number
  correct: number
  remaining: number
  savedAt: number
}

function parse(raw: string | null): SavedMock | null {
  if (!raw) return null
  try {
    const saved = JSON.parse(raw) as SavedMock
    if (saved && Array.isArray(saved.qids) && saved.qids.length > 0 && saved.remaining > 0) {
      return saved
    }
    return null
  } catch {
    return null
  }
}

let rawCache: string | null | undefined
let valueCache: SavedMock | null

/** 供 useSyncExternalStore 的 getSnapshot 使用（按原始串缓存，保证引用稳定） */
export function readSavedMock(): SavedMock | null {
  const raw = readLocal(KEY)
  if (rawCache !== raw) {
    rawCache = raw
    valueCache = parse(raw)
  }
  return valueCache
}

export function writeSavedMock(saved: SavedMock): void {
  const raw = JSON.stringify(saved)
  rawCache = raw
  valueCache = saved
  try {
    localStorage.setItem(KEY, raw)
  } catch {
    // 忽略
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function clearSavedMock(): void {
  rawCache = null
  valueCache = null
  removeLocal(KEY)
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function subscribeSavedMock(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}
