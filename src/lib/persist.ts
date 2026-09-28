// localStorage 读写封装：与服务端安全（SSR 时静默返回默认值），
// 读取时把存储 JSON 合并到默认值之上，与旧版 Vue 站点的 persist.js 行为一致

export function loadLocal<T>(key: string, defaults: T): T {
  const clone = <V>(v: V): V => JSON.parse(JSON.stringify(v)) as V
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return clone(defaults)
    return { ...clone(defaults), ...JSON.parse(raw) }
  } catch {
    return clone(defaults)
  }
}

export function saveLocal(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage 不可用（如隐私模式）时静默降级为纯内存
  }
}

export function readLocal(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function removeLocal(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // 忽略
  }
}
