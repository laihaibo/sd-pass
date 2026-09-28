'use client'

// 顶部悬浮玻璃胶囊导航（桌面）+ 底部 iOS 式玻璃 TabBar（移动端）

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import {
  BookIcon,
  ChartIcon,
  DocIcon,
  GraduationIcon,
  HouseIcon,
  PencilIcon,
} from '@/components/icons'
import ThemeToggle from '@/components/ThemeToggle'
import styles from './NavBar.module.css'

const NAV_ITEMS: { href: string; label: string; icon: ReactNode }[] = [
  { href: '/', label: '首页', icon: <HouseIcon size={18} /> },
  { href: '/learn', label: '知识学习', icon: <BookIcon size={18} /> },
  { href: '/practice', label: '刷题练习', icon: <PencilIcon size={18} /> },
  { href: '/subjective', label: '主观题', icon: <DocIcon size={18} /> },
  { href: '/progress', label: '进度', icon: <ChartIcon size={18} /> },
]

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export default function NavBar() {
  const pathname = usePathname()

  return (
    <>
      {/* 桌面：顶部悬浮胶囊 */}
      <div className={styles.topWrap}>
        <nav className={`${styles.nav} glass`} aria-label="主导航">
          <Link href="/" className={styles.brand}>
            <span className={styles.brandIcon}>
              <GraduationIcon size={17} />
            </span>
            <span className={styles.brandText}>软考通关</span>
          </Link>
          <div className={styles.links}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${isActive(pathname, item.href) ? styles.active : ''}`}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </nav>
      </div>

      {/* 移动端：底部玻璃 TabBar */}
      <nav className={`${styles.tabbar} glass`} aria-label="主导航">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.tabItem} ${isActive(pathname, item.href) ? styles.tabActive : ''}`}
            aria-current={isActive(pathname, item.href) ? 'page' : undefined}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* 移动端：右上角悬浮主题切换 */}
      <div className={styles.mobileTheme}>
        <ThemeToggle />
      </div>
    </>
  )
}
