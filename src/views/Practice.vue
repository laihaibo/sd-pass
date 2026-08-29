<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { chapters, questions } from '../data'
import { useRecordsStore } from '../stores/records'
import { useWrongbookStore } from '../stores/wrongbook'
import QuestionCard from '../components/QuestionCard.vue'

const route = useRoute()
const records = useRecordsStore()
const wrongbook = useWrongbookStore()

const selectedChapter = ref(chapters[0]?.id || '')
const session = ref(null) // { list, index, correct }
const mode = ref('')
const finished = ref(false)
const answeredNow = ref(false)
const timeLeft = ref(0)
let timer = null

// 从「去练本章题」跳转过来时自动选中该章节
if (route.query.chapter) selectedChapter.value = String(route.query.chapter)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function beginSession(list, m) {
  if (!list.length) return
  session.value = { list, index: 0, correct: 0 }
  mode.value = m
  finished.value = false
  answeredNow.value = false
}

function startChapter() {
  const list = shuffle(questions.filter((q) => q.chapterId === selectedChapter.value))
  beginSession(list, 'chapter')
}

function startMock() {
  const list = shuffle(questions).slice(0, 75)
  beginSession(list, 'mock')
  timeLeft.value = 150 * 60
  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) finish()
  }, 1000)
}

function startWrong() {
  const ids = new Set(wrongbook.ids)
  beginSession(shuffle(questions.filter((q) => ids.has(q.id))), 'wrong')
}

function onAnswered({ question, chosen, correct }) {
  records.addRecord({
    qid: question.id,
    chapterId: question.chapterId,
    chosen,
    correct,
    mode: mode.value
  })
  answeredNow.value = true
  if (correct) {
    session.value.correct++
    wrongbook.remove(question.id)
  } else {
    wrongbook.add(question.id)
  }
}

function next() {
  const s = session.value
  if (s.index < s.list.length - 1) {
    s.index++
    answeredNow.value = false
  } else {
    finish()
  }
}

function finish() {
  finished.value = true
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function resetAll() {
  session.value = null
  finished.value = false
  mode.value = ''
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const currentQ = computed(() => session.value?.list[session.value.index])
const mockClock = computed(() => {
  const m = Math.floor(timeLeft.value / 60)
  const s = timeLeft.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})
const chapterQCount = computed(
  () => questions.filter((q) => q.chapterId === selectedChapter.value).length
)
</script>

<template>
  <div class="container">
    <!-- 模式选择 -->
    <template v-if="!session">
      <h2 class="section-title">刷题练习</h2>
      <p class="section-sub">作答后即时判分并显示解析；做错的题自动进入错题本，答对后自动移出。</p>

      <div class="grid grid-3">
        <div class="card">
          <h3>📚 章节练习</h3>
          <p class="mode-desc">学完一章练一章，趁热打铁。</p>
          <select v-model="selectedChapter" class="mt-8">
            <option v-for="ch in chapters" :key="ch.id" :value="ch.id">
              {{ ch.title }}
            </option>
          </select>
          <div class="mt-16 flex-between">
            <span class="text-light" style="font-size: 13px">共 {{ chapterQCount }} 题</span>
            <button class="btn btn-primary" :disabled="!chapterQCount" @click="startChapter">
              开始
            </button>
          </div>
        </div>

        <div class="card">
          <h3>⏱️ 模拟考试</h3>
          <p class="mode-desc">随机抽 75 题，150 分钟倒计时，还原上午卷真实节奏。</p>
          <div class="mt-16 flex-between">
            <span class="text-light" style="font-size: 13px">题库共 {{ questions.length }} 题</span>
            <button class="btn btn-primary" :disabled="questions.length < 75" @click="startMock">
              开始
            </button>
          </div>
        </div>

        <div class="card">
          <h3>🔁 错题重练</h3>
          <p class="mode-desc">只练错题本里的题，答对自动移出错题本。</p>
          <div class="mt-16 flex-between">
            <span class="text-light" style="font-size: 13px">
              错题本 {{ wrongbook.ids.length }} 题
            </span>
            <button class="btn btn-primary" :disabled="!wrongbook.ids.length" @click="startWrong">
              开始
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- 作答中 -->
    <template v-else-if="!finished">
      <div class="flex-between mb-16">
        <div class="flex-gap">
          <span class="badge badge-blue">
            {{ mode === 'mock' ? '模拟考试' : mode === 'wrong' ? '错题重练' : '章节练习' }}
          </span>
          <span class="text-light" style="font-size: 13px">
            第 {{ session.index + 1 }} / {{ session.list.length }} 题 · 已对 {{ session.correct }} 题
          </span>
        </div>
        <div class="flex-gap">
          <span v-if="mode === 'mock'" class="badge badge-orange">⏱ {{ mockClock }}</span>
          <button class="btn btn-ghost" @click="resetAll">退出</button>
        </div>
      </div>

      <div class="session-progress mb-16">
        <div
          class="session-progress-bar"
          :style="{ width: ((session.index + 1) / session.list.length) * 100 + '%' }"
        ></div>
      </div>

      <QuestionCard
        :key="currentQ.id"
        :question="currentQ"
        :num="session.index + 1"
        @answered="onAnswered"
      />

      <div v-if="answeredNow" class="mt-16 text-center">
        <button class="btn btn-primary" @click="next">
          {{ session.index < session.list.length - 1 ? '下一题 →' : '查看结果' }}
        </button>
      </div>
    </template>

    <!-- 结果汇总 -->
    <template v-else>
      <div class="card summary">
        <h2 class="text-center">🎉 本轮完成</h2>
        <div class="grid grid-3 mt-24">
          <div class="stat-card">
            <div class="stat-value">{{ session.list.length }}</div>
            <div class="stat-label">总题数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ session.correct }}</div>
            <div class="stat-label">答对</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">
              {{ Math.round((session.correct / session.list.length) * 100) }}%
            </div>
            <div class="stat-label">正确率</div>
          </div>
        </div>
        <div class="callout mt-24" :class="session.correct / session.list.length >= 0.6 ? 'callout-green' : 'callout-orange'">
          {{
            session.correct / session.list.length >= 0.6
              ? '正确率不错！上午卷 45 分及格线（75 题对 45 题）在望，继续保持。'
              : '别灰心，错题已自动收进错题本，反复重练是提分最快的路径。'
          }}
        </div>
        <div class="flex-gap mt-24" style="justify-content: center">
          <button class="btn btn-primary" @click="resetAll">返回练习模式</button>
          <RouterLink class="btn btn-outline" to="/progress">查看整体进度</RouterLink>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.mode-desc {
  color: var(--text-light);
  font-size: 13.5px;
  margin: 6px 0 12px;
  min-height: 42px;
}

select {
  width: 100%;
}

.session-progress {
  height: 8px;
  background: #eef2f7;
  border-radius: 999px;
  overflow: hidden;
}

.session-progress-bar {
  height: 100%;
  background: var(--primary);
  border-radius: 999px;
  transition: width 0.3s;
}

.summary {
  max-width: 640px;
  margin: 40px auto;
}
</style>
