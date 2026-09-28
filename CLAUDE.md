# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目定位

软考中级软件设计师备考网站。**纯前端静态站**：Next.js 16（App Router，`output: 'export'` 静态导出）+ React 19 + TypeScript + zustand。无后端、无运行期网络请求、离线可用，通过 GitHub Actions（Node 22）部署到 GitHub Pages。视觉为 Apple 风格液态玻璃设计系统（`src/app/globals.css` 设计令牌 + CSS Modules），浅色/深色双主题（`data-theme` + localStorage `sd-theme`，layout 内联脚本无闪烁初始化）。

## 常用命令

```bash
pnpm install   # 安装依赖（CI 用 pnpm install --frozen-lockfile，lockfile 必须提交）
pnpm dev       # 开发（predev 自动生成 meta.json）
pnpm build     # 静态导出到 out/（prebuild 生成 meta.json，postbuild 补 .nojekyll）
pnpm validate  # 校验数据字段合法性
pnpm lint      # ESLint（flat config，eslint.config.mjs）
```

包管理器为 pnpm（版本锁定在 package.json 的 `packageManager` 字段）。TypeScript 锁 5.9.x（TS 7 与 Next 16 的类型检查尚未完全兼容，升级前先验证）。验证流程：`pnpm validate` + `pnpm build` 通过。

## 架构：数据驱动的纯静态站

**核心心智模型：所有学习内容是 `src/data/` 下的静态 JS 数组；RSC 页面构建期消费内容并预渲染，客户端组件只拿轻量元数据；状态（进度/错题/记录）存 localStorage。**

### 数据层（勿破坏）

- `src/data/` 三个聚合模块：`chapters.js`（15 章：ch00 前传 + ch01~ch14）、`questions.js`（728 题）、`subjectives.js`（15 题 + 5 题型）。`index.js` 仅 re-export（供校验脚本用）。
- **新增第 N 章/新数据文件必须同步改对应聚合模块的 import 与导出。**
- 数据 schema（字段名严格）：
  - 章节：`{ id, title, syllabus, intro, sections:[{h, p(\n 分段), diagram?}], keyPoints[], tips[] }`
  - 客观题：`[{ id:'q_chXX_NNN', chapterId, stem, options:[4 个字符串], answer:0~3, explanation, tag }]`（options 必须是字符串，出现数字会挂 TS 检查）
  - 主观题：`[{ id, type:'dfd|db|uml|algo|java', typeName, title, stem, diagram?, approach, scorePoints[], referenceAnswer, quickScoringTip }]`
- **⚠️ 静态 JS 数据的语法坑（高频踩坑）：** 数据文件全部单引号字符串，内容里的英文撇号/引号必须转义（`\'`）或改双引号，否则 build 报错。改完数据务必跑 `pnpm build`。
- **生成的元数据** `src/data/generated/meta.json`（勿手改）：由 `scripts/gen-meta.mjs` 在 predev/prebuild 生成（章节 id/标题、各章题数、总题数、题型）。已提交入库；改数据后重跑脚本即更新。

### 分包策略（性能关键，改动勿破坏）

- **RSC 页面**（`learn/[chapterId]`、`subjective/[id]` 等）可 import `src/lib/chapter-content.ts` / `src/lib/subjective-content.ts`（静态 import 全部内容，构建期预渲染，每页 flight payload 只含本章/本题内容）。
- **客户端组件禁止 import 内容聚合模块或上述注册表**——客户端只允许 `src/lib/meta.ts`（包装生成的 meta.json，约 1KB）。
- 题库按章懒加载：`src/lib/question-banks.ts` 的 loader 映射（每章独立 chunk）。章节练习单章加载；模拟考/错题重练 `loadAllQuestions()` 并行加载。

### 页面与路由

- 静态导出 + `trailingSlash`，全部页面 SSG：`/`、`/learn`、`/learn/[chapterId]`（15 页）、`/practice`、`/subjective`、`/subjective/[id]`（15 页）、`/progress`、`not-found`。
- `useSearchParams` 的页面必须包 `<Suspense>`（practice、progress 已包）。
- 旧版 Vue 站 hash 路由兼容：`src/components/LegacyRedirect.tsx` 在挂载时把 `#/learn?ch=ch03` 与 `/learn?ch=` 重定向到 `/learn/ch03`。

### 状态与持久化

- zustand store（`src/lib/stores/`）：progress（键 `sd-progress`：章节已读+主观题掌握+考试日期，默认 `2026-11-07`）、records（`sd-records`：做题记录）、wrongbook（`sd-wrongbook`：错题 id）。**键名与数据结构与旧版一致，备份 JSON（`app:'sd-pass', version:1`，`src/lib/backup.ts`）与旧版互导兼容。**
- 所有读 localStorage 的 UI 必须经 `useHasMounted()`（`src/lib/hooks.ts`）门控，避免 SSR 水合不一致；每个 mutation 后显式 `saveLocal`。
- 模拟考试断点续答：引擎把 `{qids, index, correct, remaining, savedAt}` 节流写入 `sd-mock-session`（`PracticeClient.tsx`），完成/放弃时清除。

### 刷题引擎

`src/components/practice/PracticeClient.tsx`：useReducer 状态机（BEGIN/RESUME/CHOOSE/SUBMIT/NEXT/TICK/EXIT），作答状态集中管理；键盘快捷键（1-4/A-D 选择、Enter 提交/下一题）在 window keydown 监听（注意用箭头函数捕获已收窄的 session/currentQ，函数声明提升会让 TS 收窄失效）；records/wrongbook 副作用在 submit 处理器里做（reducer 保持纯函数）。

### 视觉系统

- 设计令牌与玻璃材质在 `src/app/globals.css`（`.glass`、`.card`、`.btn-*`、`.badge-*`、`.callout-*`、mesh 背景动画）；组件级样式用 CSS Modules。
- 深色模式只改 CSS 变量（`[data-theme='dark']`）；新增颜色一律用令牌，不要写死。
- 图例组件 `src/components/DiagramRenderer.tsx` 支持 4 种 diagram：`layers`/`flow`/`tree`/`svg`。**SVG 内容是硬编码浅色配色的自绘图，深色模式下靠 `.svg` 的白色图版承载**（勿给 SVG 做颜色反转）。
- 图标用 `src/components/icons.tsx` 的内联 SF Symbols 风格 SVG（stroke 1.8），不要引入图标库或 emoji。

## 部署

`.github/workflows/deploy.yml`：push main → pnpm/action-setup（读 `packageManager`）+ setup-node 22 → `pnpm install --frozen-lockfile` → `pnpm validate` → `pnpm build`（env `BASE_PATH=/<仓库名>` 注入 Next basePath）→ 上传 `out/`。仓库需在 Settings → Pages 选「GitHub Actions」。`public/.nojekyll` + postbuild 双保险，防 Jekyll 吞 `_next/`。
