import { createRouter, createWebHashHistory } from 'vue-router'

// GitHub Pages 为纯静态托管，使用 hash 路由避免刷新 404
// 视图全部懒加载：首屏只加载首页代码，各模块（连同其依赖的数据）按需加载
const routes = [
  { path: '/', name: 'home', component: () => import('../views/Home.vue') },
  { path: '/learn', name: 'learn', component: () => import('../views/Learn.vue') },
  { path: '/practice', name: 'practice', component: () => import('../views/Practice.vue') },
  { path: '/subjective', name: 'subjective', component: () => import('../views/Subjective.vue') },
  { path: '/progress', name: 'progress', component: () => import('../views/Progress.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
