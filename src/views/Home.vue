<script setup>
import { computed } from 'vue'
import { useProgressStore } from '../stores/progress'
import { useRecordsStore } from '../stores/records'
import { useWrongbookStore } from '../stores/wrongbook'
import { chapters, questions, subjectives } from '../data'

const progress = useProgressStore()
const records = useRecordsStore()
const wrongbook = useWrongbookStore()

const modules = [
  {
    to: '/learn',
    icon: '📖',
    title: '知识学习',
    desc: `${chapters.length} 章考纲知识，零基础深入浅出，配图解与考点归纳`
  },
  {
    to: '/practice',
    icon: '✏️',
    title: '刷题练习',
    desc: `${questions.length} 道客观题 · 章节练习 / 模拟考试 / 错题重练`
  },
  {
    to: '/subjective',
    icon: '📝',
    title: '主观题精析',
    desc: `${subjectives.length} 道下午卷例题，五段式拆解，教你快速得分`
  },
  {
    to: '/progress',
    icon: '📈',
    title: '进度与计划',
    desc: '备考倒计时 · 正确率分析 · 做题记录备份迁移'
  }
]

const daysText = computed(() => {
  const d = progress.daysLeft
  if (d > 0) return `距离考试还有 ${d} 天`
  if (d === 0) return '今天就是考试日，稳住！'
  return '考试日期已过，请到进度页更新'
})
</script>

<template>
  <div class="container">
    <section class="hero card">
      <div class="hero-left">
        <span class="badge badge-orange">2026 下半年 · 中级资格</span>
        <h1>软件设计师备考一站通</h1>
        <p class="hero-sub">
          非科班友好：从基础讲起，图文并茂；上午卷刷题 + 下午卷得分技巧，一个网站全搞定。
        </p>
        <div class="hero-cta flex-gap mt-16">
          <RouterLink class="btn btn-primary" to="/learn">开始学习</RouterLink>
          <RouterLink class="btn btn-outline" to="/practice">直接刷题</RouterLink>
        </div>
      </div>
      <div class="hero-right">
        <div class="countdown">
          <div class="countdown-num">{{ progress.daysLeft > 0 ? progress.daysLeft : 0 }}</div>
          <div class="countdown-label">{{ daysText }}</div>
          <div class="countdown-date">考试日期：{{ progress.examDate }}</div>
        </div>
      </div>
    </section>

    <section class="mt-24">
      <div class="grid grid-4">
        <div class="card stat-card">
          <div class="stat-value">{{ progress.readCount }}/{{ chapters.length }}</div>
          <div class="stat-label">已学章节</div>
        </div>
        <div class="card stat-card">
          <div class="stat-value">{{ records.doneCount }}</div>
          <div class="stat-label">累计做题</div>
        </div>
        <div class="card stat-card">
          <div class="stat-value">{{ records.correctRate }}%</div>
          <div class="stat-label">正确率</div>
        </div>
        <div class="card stat-card">
          <div class="stat-value">{{ wrongbook.ids.length }}</div>
          <div class="stat-label">错题待攻克</div>
        </div>
      </div>
    </section>

    <section class="mt-24">
      <h2 class="section-title">四大备考模块</h2>
      <div class="grid grid-2">
        <RouterLink v-for="m in modules" :key="m.to" :to="m.to" class="card module-card">
          <div class="module-icon">{{ m.icon }}</div>
          <div>
            <h3>{{ m.title }}</h3>
            <p>{{ m.desc }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="card mt-24 callout-blue callout">
      <strong>备考路线建议：</strong>先按章节「学一章 → 练一章题」打基础，再用模拟考试检验整卷节奏，
      最后集中攻克错题本与下午卷主观题的得分套路。
    </section>
  </div>
</template>

<style scoped>
.hero {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #eff6ff, #ffffff 55%);
  flex-wrap: wrap;
}

.hero h1 {
  font-size: 30px;
  margin: 12px 0 8px;
}

.hero-sub {
  color: var(--text-light);
  max-width: 520px;
}

.countdown {
  text-align: center;
  padding: 18px 30px;
  background: var(--card);
  border: 1.5px solid var(--primary-light);
  border-radius: 16px;
}

.countdown-num {
  font-size: 52px;
  font-weight: 800;
  color: var(--primary);
  line-height: 1.1;
}

.countdown-label {
  font-size: 14px;
  color: var(--text);
  font-weight: 600;
}

.countdown-date {
  font-size: 12.5px;
  color: var(--text-light);
  margin-top: 4px;
}

.module-card {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  color: var(--text);
  transition: all 0.15s;
}

.module-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.module-icon {
  font-size: 34px;
  flex: none;
}

.module-card h3 {
  font-size: 17px;
  margin-bottom: 4px;
}

.module-card p {
  font-size: 13.5px;
  color: var(--text-light);
}
</style>
