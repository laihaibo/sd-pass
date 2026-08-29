<script setup>
import { ref, computed } from 'vue'
import { subjectives, subjectiveTypes } from '../data'
import { useProgressStore } from '../stores/progress'
import DiagramRenderer from '../components/DiagramRenderer.vue'

const progress = useProgressStore()

const activeType = ref(subjectiveTypes[0]?.id || '')
const current = ref(null)

const list = computed(() => subjectives.filter((s) => s.type === activeType.value))
const isMastered = (id) => !!progress.subjectiveRead[id]
const typeName = computed(
  () => subjectiveTypes.find((t) => t.id === activeType.value)?.name || ''
)

function pickType(id) {
  activeType.value = id
  current.value = null
}

function splitParas(text) {
  return String(text || '').split('\n').filter((s) => s.trim())
}
</script>

<template>
  <div class="container">
    <h2 class="section-title">下午卷 · 主观题精析</h2>
    <p class="section-sub">
      下午卷共 6 大题（前 4 题必做 + C++/Java 二选一），每题 15 分。
      每道例题按「原题 → 解题思路 → 得分点拆解 → 参考答案 → 快速得分技巧」五段拆解，帮你掌握得分套路。
    </p>

    <div class="type-tabs flex-gap mb-16">
      <button
        v-for="t in subjectiveTypes"
        :key="t.id"
        class="type-tab"
        :class="{ active: t.id === activeType }"
        @click="pickType(t.id)"
      >
        {{ t.name }}
      </button>
    </div>

    <!-- 例题列表 -->
    <template v-if="!current">
      <div v-if="!list.length" class="card text-center text-light">该题型例题整理中…</div>
      <div class="grid grid-3">
        <div
          v-for="(item, i) in list"
          :key="item.id"
          class="card sub-card"
          @click="current = item"
        >
          <div class="flex-between">
            <span class="badge badge-blue">例题 {{ i + 1 }}</span>
            <span v-if="isMastered(item.id)" class="badge badge-green">已掌握</span>
          </div>
          <h3 class="sub-title">{{ item.title }}</h3>
          <p class="sub-desc">{{ (item.approach || '').slice(0, 60) }}…</p>
        </div>
      </div>
    </template>

    <!-- 例题详情：五段式 -->
    <template v-else>
      <button class="btn btn-ghost mb-16" @click="current = null">← 返回例题列表</button>

      <article class="card">
        <div class="flex-between">
          <h2>{{ current.title }}</h2>
          <span class="badge badge-orange">{{ typeName }}</span>
        </div>

        <section class="sub-sec">
          <h3 class="stage">① 原题</h3>
          <p v-for="(para, i) in splitParas(current.stem)" :key="i" class="sec-p">{{ para }}</p>
          <DiagramRenderer :diagram="current.diagram" />
        </section>

        <section class="sub-sec">
          <h3 class="stage">② 解题思路</h3>
          <p v-for="(para, i) in splitParas(current.approach)" :key="i" class="sec-p">{{ para }}</p>
        </section>

        <section class="sub-sec">
          <h3 class="stage">③ 得分点拆解</h3>
          <ol class="score-list">
            <li v-for="(sp, i) in current.scorePoints" :key="i">{{ sp }}</li>
          </ol>
        </section>

        <section class="sub-sec">
          <h3 class="stage">④ 参考答案</h3>
          <div class="answer-box">{{ current.referenceAnswer }}</div>
        </section>

        <section class="sub-sec">
          <h3 class="stage">⑤ 快速得分技巧</h3>
          <div class="callout callout-orange">
            <p v-for="(para, i) in splitParas(current.quickScoringTip)" :key="i">{{ para }}</p>
          </div>
        </section>

        <div class="mt-24">
          <button
            class="btn btn-success"
            :disabled="isMastered(current.id)"
            @click="progress.markSubjective(current.id)"
          >
            {{ isMastered(current.id) ? '已掌握 ✓' : '✓ 我掌握了这道题' }}
          </button>
        </div>
      </article>
    </template>
  </div>
</template>

<style scoped>
.type-tab {
  padding: 8px 16px;
  border: 1.5px solid var(--border);
  background: var(--card);
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-light);
}

.type-tab.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.sub-card {
  cursor: pointer;
  transition: all 0.15s;
}

.sub-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.sub-title {
  font-size: 15.5px;
  margin: 10px 0 6px;
}

.sub-desc {
  font-size: 13px;
  color: var(--text-light);
}

.sub-sec {
  margin-top: 26px;
}

.stage {
  font-size: 16.5px;
  color: var(--primary-dark);
  background: var(--primary-light);
  display: inline-block;
  padding: 4px 14px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.sec-p {
  margin: 8px 0;
  font-size: 14.5px;
}

.score-list {
  padding-left: 24px;
  font-size: 14.5px;
}

.score-list li {
  margin: 7px 0;
}

.answer-box {
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  font-size: 14px;
  white-space: pre-wrap;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  line-height: 1.8;
  overflow-x: auto;
}

.callout p + p {
  margin-top: 8px;
}
</style>
