<script setup>
defineProps({
  chapter: { type: Object, required: true },
  index: { type: Number, default: 1 },
  read: { type: Boolean, default: false },
  questionCount: { type: Number, default: 0 }
})

defineEmits(['open'])
</script>

<template>
  <div class="card chapter-card" :class="{ done: read }" @click="$emit('open', chapter)">
    <div class="flex-between">
      <span class="ch-no">第 {{ index }} 章</span>
      <span v-if="read" class="badge badge-green">已学</span>
      <span v-else class="badge badge-gray">未学</span>
    </div>
    <h3 class="ch-title">{{ chapter.title }}</h3>
    <p class="ch-desc">{{ chapter.syllabus || chapter.intro }}</p>
    <div class="ch-meta text-light">📝 配套 {{ questionCount }} 道练习题</div>
  </div>
</template>

<style scoped>
.chapter-card {
  cursor: pointer;
  transition: all 0.15s;
}

.chapter-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.chapter-card.done {
  border-color: var(--success);
}

.ch-no {
  font-size: 12.5px;
  color: var(--text-light);
  font-weight: 600;
}

.ch-title {
  font-size: 16.5px;
  margin: 8px 0 6px;
}

.ch-desc {
  font-size: 13.5px;
  color: var(--text-light);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 40px;
}

.ch-meta {
  margin-top: 10px;
  font-size: 12.5px;
}
</style>
