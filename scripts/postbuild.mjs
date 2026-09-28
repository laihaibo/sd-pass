// 构建收尾：确保 out/ 里有 .nojekyll —— GitHub Pages 默认跑 Jekyll，
// 会忽略下划线开头的 _next/ 静态资源目录，没有这个文件站点会裸奔无样式。

import { existsSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'out')
if (existsSync(outDir)) {
  writeFileSync(resolve(outDir, '.nojekyll'), '')
  console.log('[postbuild] out/.nojekyll 已就绪')
} else {
  console.warn('[postbuild] 未找到 out/ 目录，跳过（build 是否成功？）')
}
