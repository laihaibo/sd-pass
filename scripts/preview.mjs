// 零依赖静态预览服务器：serve out/ 产物（pnpm preview）
// 支持：目录索引（trailingSlash）、常见 MIME、404 回退到 404.html

import { createServer } from 'node:http'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'out')
const port = Number(process.env.PORT || 4173)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
}

if (!existsSync(root)) {
  console.error('未找到 out/ 目录，请先执行 pnpm build')
  process.exit(1)
}

const server = createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    let filePath = join(root, normalize(urlPath).replace(/^(\.\.[/\\])+/, ''))

    if (!filePath.startsWith(root)) {
      res.writeHead(403).end()
      return
    }
    if (statSync(filePath, { throwIfNoEntry: false })?.isDirectory()) {
      filePath = join(filePath, 'index.html')
    }
    if (!existsSync(filePath)) {
      const notFound = join(root, '404.html')
      res.writeHead(404, { 'Content-Type': MIME['.html'] })
      res.end(readFileSync(notFound))
      return
    }
    const type = MIME[extname(filePath)] ?? 'application/octet-stream'
    res.writeHead(200, { 'Content-Type': type })
    res.end(readFileSync(filePath))
  } catch {
    res.writeHead(500).end()
  }
})

server.listen(port, () => {
  console.log(`预览 out/ → http://localhost:${port}/`)
})
