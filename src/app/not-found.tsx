import Link from 'next/link'
import { HouseIcon } from '@/components/icons'

export default function NotFound() {
  return (
    <div className="container" style={{ minHeight: '52vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card text-center" style={{ maxWidth: 460, padding: '44px 36px' }}>
        <p style={{ fontSize: 52, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--blue)', lineHeight: 1.1 }}>
          404
        </p>
        <h1 style={{ fontSize: 20, margin: '10px 0 8px' }}>页面走丢了</h1>
        <p className="text-light" style={{ fontSize: 14, marginBottom: 22 }}>
          你访问的页面不存在。如果你是从旧版书签（#/ 开头的链接）跳转过来的，站点已自动为你转到新地址。
        </p>
        <Link href="/" className="btn btn-primary">
          <HouseIcon size={16} /> 返回首页
        </Link>
      </div>
    </div>
  )
}
