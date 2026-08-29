import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Learn from '../views/Learn.vue'
import Practice from '../views/Practice.vue'
import Subjective from '../views/Subjective.vue'
import Progress from '../views/Progress.vue'

// GitHub Pages 为纯静态托管，使用 hash 路由避免刷新 404
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/learn', name: 'learn', component: Learn },
    { path: '/practice', name: 'practice', component: Practice },
    { path: '/subjective', name: 'subjective', component: Subjective },
    { path: '/progress', name: 'progress', component: Progress }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
