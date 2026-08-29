<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner">
      <RouterLink to="/" class="brand">软考通关 <span class="brand-sub">· 软件设计师</span></RouterLink>
      <nav class="nav-links">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/learn">知识学习</RouterLink>
        <RouterLink to="/practice">刷题练习</RouterLink>
        <RouterLink to="/subjective">主观题</RouterLink>
        <RouterLink to="/progress">进度计划</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <footer class="footer">
    软考中级软件设计师备考助手 · 学习数据保存在本浏览器，可在「进度计划」页导出备份
  </footer>
</template>
