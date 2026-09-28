// 图例渲染器：4 种 diagram 规格（layers / flow / tree / svg）
// 纯展示组件，服务端与客户端均可渲染（无状态、无浏览器 API）

import type { Diagram } from '@/lib/types'
import styles from './DiagramRenderer.module.css'

type TreeNode = { label: string; note?: string; children?: TreeNode[] }

function flattenTree(node: TreeNode, depth = 0, out: { label: string; note?: string; depth: number }[] = []) {
  if (!node) return out
  out.push({ label: node.label, note: node.note, depth })
  for (const child of node.children || []) flattenTree(child, depth + 1, out)
  return out
}

export default function DiagramRenderer({ diagram }: { diagram?: Diagram }) {
  if (!diagram) return null

  return (
    <figure className={styles.wrap}>
      {diagram.type === 'layers' && (
        <div className={styles.layers}>
          {diagram.spec.items.map((item, i) => (
            <div key={i} className={styles.layer} data-even={(i + 1) % 2 === 0 ? '' : undefined}>
              <strong>{item.label}</strong>
              {item.note && <span>{item.note}</span>}
            </div>
          ))}
        </div>
      )}

      {diagram.type === 'flow' && (
        <div
          className={`${styles.flow} ${diagram.spec.direction === 'vertical' ? styles.flowVertical : ''}`}
        >
          {diagram.spec.steps.map((step, i) => (
            <div key={i} className={styles.flowItem}>
              <div className={styles.step}>
                <strong>{step.label}</strong>
                {step.note && <span>{step.note}</span>}
              </div>
              {i < diagram.spec.steps.length - 1 && (
                <div className={styles.arrow}>{diagram.spec.direction === 'vertical' ? '↓' : '→'}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {diagram.type === 'tree' && (
        <div className={styles.tree}>
          {flattenTree(diagram.spec as TreeNode).map((row, i) => (
            <div key={i} className={styles.treeRow}>
              <span className={styles.treeIndent} style={{ width: row.depth * 26 }} />
              {row.depth > 0 && <span className={styles.treeBranch}>└─</span>}
              <span className={styles.treeNode}>
                <strong>{row.label}</strong>
                {row.note && <span>{row.note}</span>}
              </span>
            </div>
          ))}
        </div>
      )}

      {diagram.type === 'svg' && (
        <div
          className={styles.svg}
          dangerouslySetInnerHTML={{
            __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${
              diagram.spec.viewBox || '0 0 480 240'
            }" style="max-width:100%;height:auto">${diagram.spec.content || ''}</svg>`,
          }}
        />
      )}

      {diagram.caption && <figcaption className={styles.caption}>▲ {diagram.caption}</figcaption>}
    </figure>
  )
}
