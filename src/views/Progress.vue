<script setup>
import { ref, computed } from 'vue'
import { chapters, questions, subjectives } from '../data'
import { useProgressStore } from '../stores/progress'
import { useRecordsStore } from '../stores/records'
import { useWrongbookStore } from '../stores/wrongbook'
import { exportBackup, importBackup } from '../utils/backup'
import ProgressChart from '../components/ProgressChart.vue'

const progress = useProgressStore()
const records = useRecordsStore()
const wrongbook = useWrongbookStore()

const msg = ref('')
const msgType = ref('ok')

const chartData = computed(() =>
  chapters.map((ch) => {
    const st = records.perChapter[ch.id]
    return {
      label: ch.title,
      value: st && st.done ? Math.round((st.correct / st.done) * 100) : 0,
      detail: st && st.done ? `做 ${st.done} 题 · 对 ${st.correct}` : '未开始'
    }
  })
)

// 根据剩余天数动态生成三段式备考计划
const plan = computed(() => {
  const days = progress.daysLeft
  if (days <= 0) return null
  const p1 = Math.max(Math.ceil(days * 0.5), 7)
  const p2 = Math.max(Math.ceil(days * 0.3), 5)
  const p3 = Math.max(days - p1 - p2, 3)
  return [
    {
      name: '第一阶段 · 基础夯实',
      days: `约 ${p1} 天`,
      tasks: ['每天学 1 章知识（看讲解 + 记考点清单）', '学完立刻做本章配套题，错题进错题本', '非科班重点章：数据结构、操作系统、数据库要多花时间']
    },
    {
      name: '第二阶段 · 题海强化',
      days: `约 ${p2} 天`,
      tasks: ['每天 1-2 轮章节练习或错题重练', '隔天做 1 套模拟卷（75 题/150 分钟）练节奏', '精析下午卷主观题，每天 2-3 道例题']
    },
    {
      name: '第三阶段 · 考前冲刺',
      days: `约 ${p3} 天`,
      tasks: ['只做错题本 + 高频考点清单回顾', '重读主观题「快速得分技巧」部分', '考前一天只看考点提纲，不做新题']
    }
  ]
})

function onExport() {
  exportBackup()
  msg.value = '已导出备份文件，请妥善保存；在新浏览器导入即可恢复全部做题记录。'
  msgType.value = 'ok'
}

async function onImport(e) {
  const file = e.target.files?.[0]
  if (!file) return
  try {
    await importBackup(file)
    msg.value = '恢复成功！做题记录、错题本与学习进度已还原。'
    msgType.value = 'ok'
  } catch (err) {
    msg.value = '恢复失败：' + err.message
    msgType.value = 'err'
  }
  e.target.value = ''
}
</script>

<template>
  <div class="container">
    <h2 class="section-title">进度与备考计划</h2>

    <!-- 总览 -->
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
        <div class="stat-label">总正确率</div>
      </div>
      <div class="card stat-card">
        <div class="stat-value">{{ progress.subjectiveCount }}/{{ subjectives.length }}</div>
        <div class="stat-label">主观题已精析</div>
      </div>
    </div>

    <div class="grid grid-2 mt-24">
      <!-- 各章正确率 -->
      <div class="card">
        <h3 class="mb-16">📊 各章做题正确率</h3>
        <ProgressChart :items="chartData" />
        <p class="text-light mt-8" style="font-size: 12.5px">
          正确率低于 60% 的章节建议回到「知识学习」重看讲解后再刷题。
        </p>
      </div>

      <!-- 考试设置 + 备份 -->
      <div class="card">
        <h3 class="mb-8">⏰ 考试倒计时</h3>
        <div class="flex-gap">
          <label class="text-light" style="font-size: 13.5px">考试日期</label>
          <input type="date" :value="progress.examDate" @change="progress.setExamDate($event.target.value)" />
          <span class="badge badge-blue">
            {{ progress.daysLeft > 0 ? `剩 ${progress.daysLeft} 天` : '日期已过' }}
          </span>
        </div>

        <h3 class="mt-24 mb-8">💾 做题记录备份与迁移</h3>
        <p class="text-light" style="font-size: 13.5px">
          学习数据保存在本浏览器。换设备/换浏览器时：先「导出备份」，再到新环境「导入备份」即可完整还原做题记录、错题本与进度。
        </p>
        <div class="flex-gap mt-16">
          <button class="btn btn-primary" @click="onExport">导出备份 JSON</button>
          <label class="btn btn-outline">
            导入备份
            <input type="file" accept=".json,application/json" style="display: none" @change="onImport" />
          </label>
        </div>
        <p v-if="msg" class="mt-8" :style="{ color: msgType === 'ok' ? 'var(--success)' : 'var(--danger)', fontSize: '13.5px' }">
          {{ msg }}
        </p>
      </div>
    </div>

    <!-- 备考计划 -->
    <div class="card mt-24" v-if="plan">
      <h3 class="mb-16">🗓️ 三段式备考计划（按剩余 {{ progress.daysLeft }} 天自动生成）</h3>
      <div class="grid grid-3">
        <div v-for="(p, i) in plan" :key="i" class="plan-card">
          <div class="plan-name">{{ p.name }}</div>
          <div class="badge badge-orange">{{ p.days }}</div>
          <ul class="plan-tasks">
            <li v-for="(t, j) in p.tasks" :key="j">{{ t }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card mt-24 callout callout-blue">
      <strong>及格线提醒：</strong>上午卷 75 题满分 75 分，45 分及格；下午卷 6 大题满分 75 分，45 分及格。
      两科都过线才能拿证。当前错题 {{ wrongbook.ids.length }} 道，记得定期重练！
    </div>
  </div>
</template>

<style scoped>
.plan-card {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  background: #fafbfc;
}

.plan-name {
  font-weight: 700;
  margin-bottom: 8px;
}

.plan-tasks {
  margin-top: 10px;
  padding-left: 20px;
  font-size: 13.5px;
  color: var(--text-light);
}

.plan-tasks li {
  margin: 6px 0;
}
</style>
