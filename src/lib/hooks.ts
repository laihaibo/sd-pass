'use client'

import { useSyncExternalStore } from 'react'

const subscribeNoop = () => () => {}

// localStorage 相关状态在服务端渲染时只能取默认值，直接渲染会产生水合不一致；
// 用 useSyncExternalStore 做 mounted 门控：水合期间取 server snapshot（false），挂载后为 true
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  )
}
