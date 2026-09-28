import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSubjective, subjectiveNeighbors, subjectives } from '@/lib/subjective-content'
import DiagramRenderer from '@/components/DiagramRenderer'
import MasteryButton from '@/components/subjective/MasteryButton'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'
import styles from './detail.module.css'

export function generateStaticParams() {
  return subjectives.map((s) => ({ id: s.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const item = getSubjective(id)
  if (!item) return { title: '例题不存在' }
  return { title: item.title, description: item.approach.slice(0, 80) }
}

function splitParas(text: string): string[] {
  return String(text || '')
    .split('\n')
    .filter((s) => s.trim())
}

export default async function SubjectiveDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = getSubjective(id)
  if (!item) notFound()

  const { prev, next } = subjectiveNeighbors(item.id)

  return (
    <div className={`container ${styles.layout}`}>
      <div className={styles.toolbar}>
        <Link href="/subjective" className="btn btn-quiet">
          <ChevronLeftIcon size={15} /> 返回例题列表
        </Link>
        <span className="badge badge-orange">{item.typeName}</span>
      </div>

      <article className={`card ${styles.article}`}>
        <h1 className={styles.title}>{item.title}</h1>

        <section className={styles.stage}>
          <h2 className={styles.stageHead}>
            <span className={styles.stageNo}>壹</span> 原题
          </h2>
          {splitParas(item.stem).map((p, i) => (
            <p key={i} className={styles.para}>
              {p}
            </p>
          ))}
          <DiagramRenderer diagram={item.diagram} />
        </section>

        <section className={styles.stage}>
          <h2 className={styles.stageHead}>
            <span className={styles.stageNo}>贰</span> 解题思路
          </h2>
          {splitParas(item.approach).map((p, i) => (
            <p key={i} className={styles.para}>
              {p}
            </p>
          ))}
        </section>

        <section className={styles.stage}>
          <h2 className={styles.stageHead}>
            <span className={styles.stageNo}>叁</span> 得分点拆解
          </h2>
          <ol className={styles.scoreList}>
            {item.scorePoints.map((sp, i) => (
              <li key={i}>{sp}</li>
            ))}
          </ol>
        </section>

        <section className={styles.stage}>
          <h2 className={styles.stageHead}>
            <span className={styles.stageNo}>肆</span> 参考答案
          </h2>
          <div className={styles.answerBox}>{item.referenceAnswer}</div>
        </section>

        <section className={styles.stage}>
          <h2 className={styles.stageHead}>
            <span className={styles.stageNo}>伍</span> 快速得分技巧
          </h2>
          <div className="callout callout-orange">
            {splitParas(item.quickScoringTip).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <div className={styles.actions}>
          <MasteryButton itemId={item.id} />
        </div>
      </article>

      <nav className={styles.pager}>
        {prev ? (
          <Link href={`/subjective/${prev.id}`} className={`${styles.pagerBtn} glass card-hover`}>
            <ChevronLeftIcon size={16} />
            <span>
              <small>上一题</small>
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/subjective/${next.id}`}
            className={`${styles.pagerBtn} ${styles.pagerNext} glass card-hover`}
          >
            <span>
              <small>下一题</small>
              {next.title}
            </span>
            <ChevronRightIcon size={16} />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}
