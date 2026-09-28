'use client'

// 主题切换：light / dark 两态，记忆在 localStorage 'sd-theme'
// 无 React 状态：图标由 CSS 依 [data-theme] 显隐，彻底避免水合不一致
// 首帧由 layout 内联脚本解析（系统偏好 → data-theme）

import { MoonIcon, SunIcon } from '@/components/icons'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('sd-theme', next)
    } catch {
      // 忽略
    }
  }

  return (
    <button
      className={styles.btn}
      onClick={toggle}
      aria-label="切换深色/浅色模式"
      title="切换深色/浅色模式"
    >
      <span className={styles.iconLight}>
        <MoonIcon size={17} />
      </span>
      <span className={styles.iconDark}>
        <SunIcon size={17} />
      </span>
    </button>
  )
}
