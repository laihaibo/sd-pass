<script setup>
defineProps({
  items: {
    type: Array, // [{ label, value(0-100), detail }]
    default: () => []
  }
})
</script>

<template>
  <div class="progress-chart">
    <div v-for="(item, i) in items" :key="i" class="pc-row">
      <div class="pc-label" :title="item.label">{{ item.label }}</div>
      <div class="pc-track">
        <div class="pc-bar" :style="{ width: Math.max(item.value, 2) + '%' }"></div>
      </div>
      <div class="pc-value">{{ item.detail || item.value + '%' }}</div>
    </div>
  </div>
</template>

<style scoped>
.pc-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
}

.pc-label {
  flex: none;
  width: 150px;
  font-size: 13px;
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pc-track {
  flex: 1;
  height: 12px;
  background: #eef2f7;
  border-radius: 999px;
  overflow: hidden;
}

.pc-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), #60a5fa);
  border-radius: 999px;
  transition: width 0.4s;
}

.pc-value {
  flex: none;
  width: 110px;
  text-align: right;
  font-size: 12.5px;
  color: var(--text-light);
}

@media (max-width: 560px) {
  .pc-label {
    width: 90px;
  }
  .pc-value {
    width: 80px;
  }
}
</style>
