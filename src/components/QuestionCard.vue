<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  question: { type: Object, required: true },
  num: { type: Number, default: 1 }
})

const emit = defineEmits(['answered'])

const letters = ['A', 'B', 'C', 'D', 'E', 'F']
const selected = ref(null)
const submitted = ref(false)
const copied = ref(false)

// 题目切换时重置作答状态
watch(
  () => props.question?.id,
  () => {
    selected.value = null
    submitted.value = false
    copied.value = false
  }
)

// 生成求助文本：题干 + 选项 + 我的作答 + 正确答案与解析
function buildHelpText() {
  const q = props.question
  const optLines = q.options.map((o, i) => `${letters[i]}. ${o}`).join('\n')
  const my = selected.value === null ? '我还没做出来，求讲解' : `我的作答：${letters[selected.value]}`
  const answerPart = submitted.value
    ? `\n正确答案：${letters[q.answer]}\n解析：${q.explanation}`
    : ''
  return `【软件设计师备考求助】\n题目：${q.stem}\n${optLines}\n${my}${answerPart}`
}

async function copyHelp() {
  const text = buildHelpText()
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    window.alert('复制失败，请手动选择文字复制')
  }
}

const isCorrect = computed(() => selected.value === props.question.answer)

function choose(i) {
  if (!submitted.value) selected.value = i
}

function submit() {
  if (selected.value === null || submitted.value) return
  submitted.value = true
  emit('answered', {
    question: props.question,
    chosen: selected.value,
    correct: isCorrect.value
  })
}

function optionClass(i) {
  if (!submitted.value) return selected.value === i ? 'selected' : ''
  if (i === props.question.answer) return 'correct'
  if (i === selected.value) return 'wrong'
  return 'dim'
}
</script>

<template>
  <div class="question-card card">
    <div class="q-head flex-between">
      <span class="badge badge-blue">第 {{ num }} 题</span>
      <span v-if="question.tag" class="badge badge-gray">{{ question.tag }}</span>
    </div>

    <p class="q-stem">{{ question.stem }}</p>

    <div class="q-options">
      <div
        v-for="(opt, i) in question.options"
        :key="i"
        class="q-option"
        :class="optionClass(i)"
        @click="choose(i)"
      >
        <span class="q-letter">{{ letters[i] }}</span>
        <span class="q-opt-text">{{ opt }}</span>
        <span v-if="submitted && i === question.answer" class="q-mark">✓</span>
        <span v-else-if="submitted && i === selected && !isCorrect" class="q-mark">✗</span>
      </div>
    </div>

    <div v-if="!submitted" class="mt-16 flex-gap">
      <button class="btn btn-primary" :disabled="selected === null" @click="submit">
        提交答案
      </button>
      <button class="btn btn-outline" @click="copyHelp">
        {{ copied ? '已复制 ✓ 快去问人吧' : '📋 一键复制求助' }}
      </button>
    </div>

    <div v-else class="q-result" :class="isCorrect ? 'q-right' : 'q-wrong'">
      <p>
        <strong>{{
          isCorrect ? '✓ 回答正确！' : `✗ 回答错误，正确答案是 ${letters[question.answer]}`
        }}</strong>
      </p>
      <p class="q-explain"><strong>解析：</strong>{{ question.explanation }}</p>
      <div class="mt-8">
        <button class="btn btn-outline" @click="copyHelp">
          {{ copied ? '已复制 ✓ 快去问人吧' : '📋 复制本题求助（含题目/我的答案/正确答案）' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.q-head {
  margin-bottom: 12px;
}

.q-stem {
  font-size: 15.5px;
  font-weight: 500;
  margin-bottom: 16px;
  white-space: pre-wrap;
}

.q-options {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.q-option {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 11px 14px;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.12s;
  font-size: 14.5px;
}

.q-option:hover {
  border-color: var(--primary);
}

.q-option.selected {
  border-color: var(--primary);
  background: var(--primary-light);
}

.q-option.correct {
  border-color: var(--success);
  background: var(--success-light);
}

.q-option.wrong {
  border-color: var(--danger);
  background: var(--danger-light);
}

.q-option.dim {
  opacity: 0.65;
}

.q-letter {
  flex: none;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;
}

.q-option.selected .q-letter {
  background: var(--primary);
  color: #fff;
}

.q-option.correct .q-letter {
  background: var(--success);
  color: #fff;
}

.q-option.wrong .q-letter {
  background: var(--danger);
  color: #fff;
}

.q-mark {
  margin-left: auto;
  font-weight: 700;
}

.q-result {
  margin-top: 16px;
  border-radius: 10px;
  padding: 14px 16px;
  font-size: 14.5px;
}

.q-right {
  background: var(--success-light);
}

.q-wrong {
  background: var(--danger-light);
}

.q-explain {
  margin-top: 8px;
  color: var(--text);
  white-space: pre-wrap;
}
</style>
