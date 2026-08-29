# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目定位

软考中级软件设计师备考网站。**纯前端静态站**：Vite + Vue 3（Composition API、`<script setup>`）+ vue-router + Pinia。无后端、无运行期网络请求、离线可用，通过 GitHub Actions（Node 22）部署到 GitHub Pages。

## 常用命令

```bash
npm install    # 安装依赖（CI 也用 npm install，无需 lockfile 同步）
npm run dev    # 本地开发
npm run build  # 构建到 dist/（验证一切改动必须走这一步）
npm run preview -- --port 4179  # 本地预览产物（默认 4173 可能被别的项目占用）
```

无 lint/测试框架。改动验证流程：`npm run build` 通过 + `node node_modules/esbuild/bin/esbuild <数据文件> --outfile=nul` 逐个检查数据文件语法。

## 架构：数据驱动的纯静态站

**核心心智模型：所有学习内容是 `src/data/` 下的静态 JS 数组，被视图消费；状态（进度/错题/记录）存在 localStorage。**

- `src/data/index.js` 是**唯一聚合入口**，静态 import 全部 33 个数据文件并导出 `chapters`（14 章）、`questions`（728 题）、`subjectives`（15 题）、`subjectiveTypes`（5 题型）。**新增第 N 章/新数据文件必须同步改这里的 import 与导出。**
- 数据 schema（添加内容时必须严格遵守字段名）：
  - 章节 `src/data/chapters/chXX.js`：`{ id:'ch01', title, syllabus, intro, sections:[{h, p, diagram}], keyPoints[], tips[] }`，`p` 支持 `\n` 分段
  - 客观题 `src/data/questions/q_chXX.js`：`[{ id:'q_chXX_NNN', chapterId, stem, options:[4], answer:0~3, explanation, tag }]`，答案按 A/B/C/D 尽量均匀分布
  - 主观题 `src/data/subjective/typeN_xxx.js`：`[{ id, type:'dfd|db|uml|algo|java', typeName, title, stem, diagram, approach, scorePoints[], referenceAnswer, quickScoringTip }]`
- **⚠️ 静态 JS 数据的语法坑（高频踩坑）：** 数据文件全部用单引号字符串，内容里出现英文撇号/引号片段（如 `LIKE '_A%'`、`'0'~'9'`）必须转义为 `\'` 或改用双引号串，否则 `npm run build` 报 `Expected ',', got ...`。改完数据务必跑 build 验证。`.omc/fix-quotes.mjs` 是本地辅助修复脚本（gitignored，只存在于本机）。
- 配套说明见 `README.md`（含部署步骤）。

## 关键实现约束（改动时不要破坏）

- **路由**：`src/router/index.js` 用 `createWebHashHistory`（GitHub Pages 无服务端重写，hash 模式是唯一安全选择）。
- **vite `base: './'`**（`vite.config.js`）：相对路径产物兼容任意 GitHub Pages 仓库名。不要改成绝对路径，除非确认仓库名（如 `/sd-pass/`）。
- **图例组件** `src/components/DiagramRenderer.vue` 支持 4 种 `diagram` 规格：`layers`（`{items:[{label,note}]}`）、`flow`（`{direction:'horizontal'|'vertical', steps:[{label,note}]}`）、`tree`（递归 `{label,note,children[]}`）、`svg`（`spec:{viewBox, content:'<rect/><text/>...'}`，仅简单图形）。内容生成器配图一律用它。
- **状态持久化**：`src/utils/persist.js`（load/save 封装 localStorage）；三个 Pinia store（`stores/progress.js` 章节进度+考试日期+倒计时 getter、`stores/wrongbook.js` 错题本、`stores/records.js` 做题记录+正确率计算），每个 store 有 `_persist()` 与 `restore()`（供导入备份用）。备份迁移逻辑在 `src/utils/backup.js`（要求备份 JSON 含 `app:'sd-pass'`、`progress` 字段）。
- **做题交互流**：`src/components/QuestionCard.vue` 通过 `watch(question.id)` 重置作答状态、`@answered` 事件上报；`Practice.vue` 负责会话（章节练习/模拟考试 75 题 150 分钟计时/错题重练），错答自动入错题本、答对移出；题目卡片内置「一键复制求助」（`src/utils/clipboard` 逻辑内联在组件中，使用 `navigator.clipboard` + textarea 回退）。
- **首页统计**：Home.vue 数据（章节数/题数/例题数）直接从 `data/index.js` 导出读取，数据变化自动反映，无需改视图。

## 部署

`.github/workflows/deploy.yml`：push main → setup-node 22 → `npm install` + `npm run build` → actions/deploy-pages。仓库需在 Settings → Pages 选「GitHub Actions」。考试日期默认值 `2026-11-07` 在 `stores/progress.js`，用户可在进度页修改（后端不依赖它）。
