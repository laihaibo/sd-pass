'use client'

// 旧版 Vue 站点使用 hash 路由（如 /#/learn?ch=ch03）。
// 迁移到真路径后，此组件在挂载时把旧 hash 链接与 /learn?ch= 深链重定向到新地址。

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LegacyRedirect() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#/')) {
      // #/learn?ch=ch03 → /learn?ch=ch03
      const target = hash.slice(1)
      window.history.replaceState(null, '', target)
      router.replace(target)
      return
    }

    const params = new URLSearchParams(window.location.search)
    const ch = params.get('ch')
    if (window.location.pathname.replace(/\/$/, '') === '/learn' && ch && /^ch\d+$/.test(ch)) {
      router.replace(`/learn/${ch}`)
    }
  }, [router])

  return null
}
