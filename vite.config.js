import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base 用相对路径 './'，兼容 GitHub Pages 任意仓库名/用户站点，配合 hash 路由无需服务端重写
export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // 框架代码单独成包：内容更新时用户浏览器可继续缓存这部分（框架几乎不变）
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia']
        }
      }
    }
  }
})
