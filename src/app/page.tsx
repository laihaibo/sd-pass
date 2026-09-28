import Link from 'next/link'
import { siteMeta } from '@/lib/meta'
import { ArrowRightIcon, BookIcon, ChartIcon, DocIcon, PencilIcon } from '@/components/icons'
import CountdownCard from '@/components/home/CountdownCard'
import StatsRow from '@/components/home/StatsRow'
import styles from './home.module.css'

const MODULES = [
  {
    href: '/learn',
    icon: <BookIcon size={22} />,
    tint: 'blue',
    title: '知识学习',
    desc: `${siteMeta.chapters.length} 章考纲知识，零基础深入浅出，配图解与考点归纳`,
  },
  {
    href: '/practice',
    icon: <PencilIcon size={22} />,
    tint: 'purple',
    title: '刷题练习',
    desc: `${siteMeta.questionTotal} 道客观题 · 章节练习 / 模拟考试 / 错题重练`,
  },
  {
    href: '/subjective',
    icon: <DocIcon size={22} />,
    tint: 'orange',
    title: '主观题精析',
    desc: `${siteMeta.subjectiveTotal} 道下午卷例题，五段式拆解，教你快速得分`,
  },
  {
    href: '/progress',
    icon: <ChartIcon size={22} />,
    tint: 'green',
    title: '进度与计划',
    desc: '备考倒计时 · 正确率分析 · 做题记录备份迁移',
  },
]

export default function HomePage() {
  return (
    <div className="container">
      {/* Hero */}
      <section className={`${styles.hero} card`}>
        <div className={styles.heroLeft}>
          <span className="badge badge-blue">2026 下半年 · 中级资格</span>
          <h1 className={styles.heroTitle}>
            软件设计师备考
            <br />
            <span className={styles.heroAccent}>一站通关。</span>
          </h1>
          <p className={styles.heroSub}>
            非科班友好：从基础讲起，图文并茂；上午卷刷题 + 下午卷得分技巧，一个网站全搞定。
          </p>
          <div className={`flex-gap ${styles.cta}`}>
            <Link href="/learn" className="btn btn-primary">
              开始学习 <ArrowRightIcon size={16} />
            </Link>
            <Link href="/practice" className="btn btn-ghost">
              直接刷题
            </Link>
          </div>
        </div>
        <div className={styles.heroRight}>
          <CountdownCard />
        </div>
      </section>

      {/* 个人统计 */}
      <section className="mt-16">
        <StatsRow />
      </section>

      {/* 四大模块 */}
      <section className="mt-24">
        <div className="page-head">
          <h2 className="section-title">四大备考模块</h2>
        </div>
        <div className="grid grid-2">
          {MODULES.map((m) => (
            <Link key={m.href} href={m.href} className={`${styles.module} card card-hover`}>
              <span className={`${styles.moduleIcon} ${styles['tint-' + m.tint]}`}>{m.icon}</span>
              <span className={styles.moduleBody}>
                <span className={styles.moduleTitle}>{m.title}</span>
                <span className={styles.moduleDesc}>{m.desc}</span>
              </span>
              <span className={styles.moduleChevron}>
                <ArrowRightIcon size={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 备考路线 */}
      <section className="mt-24">
        <div className="callout callout-blue">
          <strong>备考路线建议：</strong>
          先按章节「学一章 → 练一章题」打基础，再用模拟考试检验整卷节奏，最后集中攻克错题本与下午卷主观题的得分套路。
        </div>
      </section>
    </div>
  )
}
