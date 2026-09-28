import type { Metadata, Viewport } from 'next'
import NavBar from '@/components/NavBar'
import LegacyRedirect from '@/components/LegacyRedirect'
import './globals.css'
import './footer.css'

export const metadata: Metadata = {
  title: {
    default: '软考通关 · 软件设计师',
    template: '%s · 软考通关',
  },
  description:
    '软考中级软件设计师备考站：14 章考纲精讲、700+ 道客观题刷题、下午卷主观题五段式精析、备考进度与计划。非科班友好，离线可用。',
  applicationName: '软考通关',
  keywords: ['软考', '软件设计师', '软件设计师考试', '软考中级', '备考'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f5f7' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0e' },
  ],
}

// 主题无闪烁初始化：优先读用户手动选择（sd-theme），否则跟随系统
const themeInit = `(function(){try{var t=localStorage.getItem('sd-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <div className="bg-mesh" aria-hidden="true" />
        <LegacyRedirect />
        <NavBar />
        <main className="page">{children}</main>
        <footer className="footer">
          <div className="container">
            <p>软考通关 · 软件设计师备考助手</p>
            <p className="muted">
              学习进度与做题记录仅保存在你的浏览器本地，可用「进度页 → 导出备份」迁移。
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
