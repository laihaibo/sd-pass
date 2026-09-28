import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { siteMeta } from '@/lib/meta'
import { chapters, chapterIndex, getChapter } from '@/lib/chapter-content'
import DiagramRenderer from '@/components/DiagramRenderer'
import MarkReadButton from '@/components/learn/MarkReadButton'
import ChapterPicker from '@/components/learn/ChapterPicker'
import {
  ArrowRightIcon,
  BookIcon,
  BulbIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TargetIcon,
} from '@/components/icons'
import styles from './reader.module.css'

export function generateStaticParams() {
  return chapters.map((c) => ({ chapterId: c.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterId: string }>
}): Promise<Metadata> {
  const { chapterId } = await params
  const chapter = getChapter(chapterId)
  if (!chapter) return { title: '章节不存在' }
  return { title: chapter.title, description: chapter.intro.slice(0, 80) }
}

function splitParas(text: string): string[] {
  return String(text || '')
    .split('\n')
    .filter((s) => s.trim())
}

export default async function ChapterReaderPage({
  params,
}: {
  params: Promise<{ chapterId: string }>
}) {
  const { chapterId } = await params
  const chapter = getChapter(chapterId)
  if (!chapter) notFound()

  const i = chapterIndex(chapter.id)
  const prev = chapters[i - 1]
  const next = chapters[i + 1]
  const qCount = siteMeta.chapterCounts[chapter.id] ?? 0

  return (
    <div className={`container ${styles.layout}`}>
      {/* 顶部：章节选择器 + 位置 */}
      <div className={styles.toolbar}>
        <ChapterPicker currentId={chapter.id} items={chapters.map((c) => ({ id: c.id, title: c.title }))} />
        <span className={styles.pos}>
          {i === 0 ? '前传' : `第 ${i} 章`} / 共 {chapters.length - 1} 章
        </span>
      </div>

      <article className={`card ${styles.article}`}>
        <div className="flex-between">
          <h1 className={styles.title}>{chapter.title}</h1>
        </div>
        <p className={styles.syllabus}>{chapter.syllabus}</p>

        <div className="callout callout-blue mt-16">
          <strong>导读：</strong>
          {chapter.intro}
        </div>

        {chapter.sections.map((sec, si) => (
          <section key={si}>
            <h2 className={styles.secH}>{sec.h}</h2>
            {splitParas(sec.p).map((para, pi) => (
              <p key={pi} className={styles.secP}>
                {para}
              </p>
            ))}
            <DiagramRenderer diagram={sec.diagram} />
          </section>
        ))}

        {chapter.keyPoints.length > 0 && (
          <section className="mt-24">
            <h2 className={styles.secH}>
              <TargetIcon size={19} className={styles.secIcon} /> 高频考点清单
            </h2>
            <ul className={styles.kpList}>
              {chapter.keyPoints.map((kp, ki) => (
                <li key={ki}>
                  <CheckIcon size={14} className={styles.kpCheck} />
                  <span>{kp}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {chapter.tips.length > 0 && (
          <div className="callout callout-orange mt-16">
            <strong className={styles.tipHead}>
              <BulbIcon size={16} /> 记忆与应试技巧
            </strong>
            <ul className={styles.tipList}>
              {chapter.tips.map((t, ti) => (
                <li key={ti}>{t}</li>
              ))}
            </ul>
          </div>
        )}

        <div className={`flex-gap mt-24 ${styles.actions}`}>
          <MarkReadButton chapterId={chapter.id} />
          {qCount > 0 && (
            <Link href={`/practice?chapter=${chapter.id}`} className="btn btn-primary">
              去练本章题（{qCount} 道）<ArrowRightIcon size={16} />
            </Link>
          )}
        </div>
      </article>

      {/* 底部：上一章 / 下一章 */}
      <nav className={styles.pager}>
        {prev ? (
          <Link href={`/learn/${prev.id}`} className={`${styles.pagerBtn} glass card-hover`}>
            <ChevronLeftIcon size={17} />
            <span>
              <small>{i - 1 === 0 ? '前传' : `第 ${i - 1} 章`}</small>
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/${next.id}`} className={`${styles.pagerBtn} ${styles.pagerNext} glass card-hover`}>
            <span>
              <small>{i + 1 === 0 ? '前传' : `第 ${i + 1} 章`}</small>
              {next.title}
            </span>
            <ChevronRightIcon size={17} />
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <div className={styles.backToAll}>
        <Link href="/learn" className="btn btn-quiet">
          <BookIcon size={15} /> 返回章节目录
        </Link>
      </div>
    </div>
  )
}
