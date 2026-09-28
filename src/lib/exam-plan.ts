// 三段式备考计划：根据剩余天数自动生成（逻辑与旧版一致）

export interface PlanPhase {
  name: string
  days: string
  tasks: string[]
}

export function buildStudyPlan(daysLeft: number): PlanPhase[] | null {
  if (daysLeft <= 0) return null
  const p1 = Math.max(Math.ceil(daysLeft * 0.5), 7)
  const p2 = Math.max(Math.ceil(daysLeft * 0.3), 5)
  const p3 = Math.max(daysLeft - p1 - p2, 3)
  return [
    {
      name: '第一阶段 · 基础夯实',
      days: `约 ${p1} 天`,
      tasks: [
        '每天学 1 章知识（看讲解 + 记考点清单）',
        '学完立刻做本章配套题，错题进错题本',
        '非科班重点章：数据结构、操作系统、数据库要多花时间',
      ],
    },
    {
      name: '第二阶段 · 题海强化',
      days: `约 ${p2} 天`,
      tasks: [
        '每天 1-2 轮章节练习或错题重练',
        '隔天做 1 套模拟卷（75 题/150 分钟）练节奏',
        '精析下午卷主观题，每天 2-3 道例题',
      ],
    },
    {
      name: '第三阶段 · 考前冲刺',
      days: `约 ${p3} 天`,
      tasks: [
        '只做错题本 + 高频考点清单回顾',
        '重读主观题「快速得分技巧」部分',
        '考前一天只看考点提纲，不做新题',
      ],
    },
  ]
}
