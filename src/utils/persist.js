export function load(key, defaults) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return JSON.parse(JSON.stringify(defaults))
    return { ...JSON.parse(JSON.stringify(defaults)), ...JSON.parse(raw) }
  } catch {
    return JSON.parse(JSON.stringify(defaults))
  }
}

export function save(key, state) {
  try {
    localStorage.setItem(key, JSON.stringify(state))
  } catch {
    // localStorage 不可用（如隐私模式）时静默降级为纯内存
  }
}
