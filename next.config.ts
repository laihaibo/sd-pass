import type { NextConfig } from 'next'

// GitHub Pages 项目页部署在 /<仓库名>/ 子路径下，CI 通过 BASE_PATH 环境变量注入；
// 本地开发不设置该变量，即为根路径
const basePath = process.env.BASE_PATH || ''

const nextConfig: NextConfig = {
  // 纯静态导出到 out/，零后端，直接部署 GitHub Pages
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
}

export default nextConfig
