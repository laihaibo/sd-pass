<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { chapters, questions } from '../data'
import { useProgressStore } from '../stores/progress'
import DiagramRenderer from '../components/DiagramRenderer.vue'

const route = useRoute()
const router = useRouter()
const progress = useProgressStore()

const current = ref(chapters.find((c) => c.id === route.query.ch) || chapters[0])

const qCount = (id) => questions.filter((q) => q.chapterId === id).length
const isRead = computed(() => !!progress.chapters[current.value.id]?.read)

function select(ch) {
  current.value = ch
  router.replace({ query: { ch: ch.id } })
}

function markLearned() {
  progress.markRead(current.value.id)
}

function goPractice() {
  router.push({ path: '/practice', query: { chapter: current.value.id } })
}

function splitParas(text) {
  return String(text || '').split('\n').filter((s) => s.trim())
}
</script>

<template>
  <div class="container learn-layout">
    <aside class="card learn-side">
      <h3 class="mb-8">考纲章节</h3>
      <div class="ch-list">
        <button
          v-for="(ch, i) in chapters"
          :key="ch.id"
          class="ch-item"
          :class="{ active: ch.id === current.id }"
          @click="select(ch)"
        >
          <span class="ch-item-no">{{ i + 1 }}</span>
          <span class="ch-item-title">{{ ch.title }}</span>
          <span v-if="progress.chapters[ch.id]?.read" class="ch-item-check">✓</span>
        </button>
      </div>
    </aside>

    <section class="learn-main">
      <article class="card">
        <div class="flex-between">
          <h2>{{ current.title }}</h2>
          <span v-if="isRead" class="badge badge-green">已学会</span>
        </div>
        <p class="text-light mt-8">{{ current.syllabus }}</p>

        <div class="callout callout-blue mt-16">
          <strong>导读：</strong>{{ current.intro }}
        </div>

        <template v-for="(sec, i) in current.sections" :key="i">
          <h3 class="sec-h">{{ sec.h }}</h3>
          <p v-for="(para, j) in splitParas(sec.p)" :key="j" class="sec-p">{{ para }}</p>
          <DiagramRenderer :diagram="sec.diagram" />
        </template>

        <div v-if="current.keyPoints?.length" class="mt-24">
          <h3 class="sec-h">🎯 高频考点清单</h3>
          <ul class="kp-list">
            <li v-for="(kp, i) in current.keyPoints" :key="i">{{ kp }}</li>
          </ul>
        </div>

        <div v-if="current.tips?.length" class="callout callout-orange mt-16">
          <strong>💡 记忆与应试技巧：</strong>
          <ul class="tip-list">
            <li v-for="(t, i) in current.tips" :key="i">{{ t }}</li>
          </ul>
        </div>

        <div class="flex-gap mt-24">
          <button class="btn btn-success" :disabled="isRead" @click="markLearned">
            {{ isRead ? '本章已学会' : '✓ 我学会了，标记完成' }}
          </button>
          <button class="btn btn-primary" @click="goPractice">
            去练本章题（{{ qCount(current.id) }} 道）
          </button>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.learn-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
  align-items: start;
}

@media (max-width: 860px) {
  .learn-layout {
    grid-template-columns: 1fr;
  }
}

.learn-side {
  position: sticky;
  top: 76px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.ch-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ch-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: none;
  background: transparent;
  border-radius: 8px;
  text-align: left;
  font-size: 13.5px;
  color: var(--text);
}

.ch-item:hover {
  background: var(--primary-light);
}

.ch-item.active {
  background: var(--primary);
  color: #fff;
}

.ch-item.active .ch-item-no {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}

.ch-item-no {
  flex: none;
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  color: var(--text-light);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
}

.ch-item-title {
  flex: 1;
}

.ch-item-check {
  color: var(--success);
  font-weight: 700;
}

.ch-item.active .ch-item-check {
  color: #bbf7d0;
}

.sec-h {
  font-size: 18px;
  margin: 26px 0 10px;
  padding-left: 10px;
  border-left: 4px solid var(--primary);
}

.sec-p {
  margin: 10px 0;
  font-size: 14.5px;
}

.kp-list,
.tip-list {
  padding-left: 22px;
  font-size: 14.5px;
}

.kp-list li,
.tip-list li {
  margin: 6px 0;
}
</style>
