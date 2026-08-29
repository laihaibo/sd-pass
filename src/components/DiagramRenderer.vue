<script setup>
import { computed } from 'vue'

const props = defineProps({
  diagram: { type: Object, default: null }
})

// 把树形结构压平成带层级的行，避免递归组件的复杂度
function flattenTree(node, depth = 0, out = []) {
  if (!node) return out
  out.push({ label: node.label, note: node.note, depth })
  for (const child of node.children || []) flattenTree(child, depth + 1, out)
  return out
}

const treeRows = computed(() =>
  props.diagram?.type === 'tree' ? flattenTree(props.diagram.spec) : []
)

const svgHtml = computed(() => {
  if (props.diagram?.type !== 'svg') return ''
  const spec = props.diagram.spec || {}
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${spec.viewBox || '0 0 480 240'}" style="max-width:100%;height:auto">${spec.content || ''}</svg>`
})
</script>

<template>
  <div v-if="diagram" class="diagram">
    <!-- 层叠图：如 OSI 七层、存储器层次 -->
    <div v-if="diagram.type === 'layers'" class="d-layers">
      <div v-for="(item, i) in diagram.spec.items" :key="i" class="d-layer">
        <strong>{{ item.label }}</strong>
        <span v-if="item.note">{{ item.note }}</span>
      </div>
    </div>

    <!-- 流程图：如进程状态转换、排序过程 -->
    <div
      v-else-if="diagram.type === 'flow'"
      class="d-flow"
      :class="diagram.spec.direction === 'vertical' ? 'd-flow-vertical' : ''"
    >
      <template v-for="(step, i) in diagram.spec.steps" :key="i">
        <div class="d-step">
          <strong>{{ step.label }}</strong>
          <span v-if="step.note">{{ step.note }}</span>
        </div>
        <div v-if="i < diagram.spec.steps.length - 1" class="d-arrow">
          {{ diagram.spec.direction === 'vertical' ? '↓' : '→' }}
        </div>
      </template>
    </div>

    <!-- 树形图：如数据结构、分类体系 -->
    <div v-else-if="diagram.type === 'tree'" class="d-tree">
      <div v-for="(row, i) in treeRows" :key="i" class="d-tree-row">
        <span class="d-tree-indent" :style="{ width: row.depth * 26 + 'px' }"></span>
        <span v-if="row.depth > 0" class="d-tree-branch">└─</span>
        <span class="d-tree-node">
          <strong>{{ row.label }}</strong>
          <span v-if="row.note">{{ row.note }}</span>
        </span>
      </div>
    </div>

    <!-- 原始 SVG：任意自绘图（数据流图、UML、ER 图等） -->
    <div v-else-if="diagram.type === 'svg'" class="d-svg" v-html="svgHtml"></div>

    <p v-if="diagram.caption" class="d-caption">▲ {{ diagram.caption }}</p>
  </div>
</template>

<style scoped>
.diagram {
  margin: 18px 0;
  padding: 18px;
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow-x: auto;
}

.d-layers {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 560px;
  margin: 0 auto;
}

.d-layer {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 16px;
  border-radius: 8px;
  font-size: 14px;
}

.d-layer:nth-child(odd) {
  background: var(--primary-light);
}

.d-layer:nth-child(even) {
  background: #fef3c7;
}

.d-layer span {
  color: var(--text-light);
  font-weight: 400;
}

.d-flow {
  display: flex;
  align-items: stretch;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
}

.d-flow-vertical {
  flex-direction: column;
  align-items: center;
}

.d-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 10px 16px;
  background: var(--primary-light);
  border: 1.5px solid var(--primary);
  border-radius: 10px;
  font-size: 13.5px;
  text-align: center;
  min-width: 90px;
}

.d-step span {
  color: var(--text-light);
  font-size: 12px;
  font-weight: 400;
}

.d-arrow {
  align-self: center;
  font-size: 20px;
  color: var(--primary);
  font-weight: 700;
}

.d-tree {
  font-size: 14px;
}

.d-tree-row {
  display: flex;
  align-items: center;
  padding: 3px 0;
}

.d-tree-branch {
  color: var(--text-light);
  margin-right: 4px;
}

.d-tree-node strong {
  background: var(--primary-light);
  padding: 2px 10px;
  border-radius: 6px;
}

.d-tree-node span {
  color: var(--text-light);
  margin-left: 8px;
  font-size: 13px;
}

.d-svg {
  text-align: center;
}

.d-caption {
  text-align: center;
  color: var(--text-light);
  font-size: 13px;
  margin-top: 10px;
}
</style>
