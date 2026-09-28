# 软考通关 · 中级软件设计师备考网站

面向非计算机专业考生的软考中级软件设计师备考助手（纯前端静态站，零后端、零外部依赖、离线可用）。

技术栈：**Next.js 16（App Router · 静态导出）+ React 19 + TypeScript + zustand**，视觉为 Apple 风格液态玻璃（Liquid Glass）设计系统，浅色 / 深色双主题。

## 功能

- 📖 **知识学习**：官方考纲 14 章 + 零基础前传全覆盖，深入浅出讲解 + 高频考点清单 + 图解 + 应试技巧
- ✏️ **刷题练习**：700+ 道客观题（章节练习 / 模拟考试 75 题 150 分钟 / 错题重练），作答即时判分并显示解析
  - 模拟考试**断点续答**：中途退出或刷新页面后进度自动保存，可继续作答
  - **键盘快捷键**：`1-4` / `A-D` 选择选项，`Enter` 提交 / 下一题
- 📝 **主观题精析**：下午卷 5 大题型 15 道例题，按「原题 → 解题思路 → 得分点拆解 → 参考答案 → 快速得分技巧」五段式拆解
- 📈 **进度与计划**：章节进度、正确率分析、考试倒计时、三段式备考计划、做题记录 JSON 备份/迁移
- 📋 **一键复制求助**：题目卡片一键复制题干/选项/我的答案/正确答案/解析
- 🌗 **深色模式**：跟随系统 + 导航栏手动切换，偏好记忆在本地

## 本地开发

```bash
pnpm install
pnpm dev        # 开发（自动跑 predev 生成 src/data/generated/meta.json）
pnpm build      # 静态导出到 out/
pnpm validate   # 校验数据字段合法性
pnpm lint       # ESLint
```

要求 Node 22+。包管理器 pnpm（版本锁定在 `packageManager` 字段）。

## 部署到 GitHub Pages

仓库已内置 `.github/workflows/deploy.yml`：

1. 代码推送到 GitHub 仓库 `main` 分支
2. 仓库 Settings → Pages → Source 选择 **GitHub Actions**
3. push 后 CI（Node 22）自动 `pnpm validate` + `pnpm build` 并部署

CI 会用 `BASE_PATH=/<仓库名>` 构建以适配 `https://<用户名>.github.io/<仓库名>/` 子路径。若仓库改名无需改配置；本地构建想模拟子路径可执行 `BASE_PATH=/sd-pass pnpm build`。

构建产物含 `out/.nojekyll`（postbuild 脚本保证），避免 GitHub Pages 的 Jekyll 忽略 `_next/` 资源目录。

## 架构与优化要点

- **静态导出**：`output: 'export'` + `trailingSlash`，38 个页面全部构建期预渲染，无任何服务端
- **内容按需分包**：学习/主观题页面按章/按题独立静态化（每页只携带本章内容）；题库按章动态 `import()`，章节练习只下载单章题库，模拟考/错题重练才并行加载全部
- **轻量元数据**：客户端组件只依赖构建期生成的 `src/data/generated/meta.json`（约 1KB：章节标题/题数统计），避免把 900KB 内容打进客户端包（由 `scripts/gen-meta.mjs` 在 predev/prebuild 时从数据聚合模块生成）
- **RSC 优先**：章节阅读页、主观题详情为服务端组件静态 HTML，仅「标记完成」「掌握」等按钮注水
- **状态持久化**：zustand store + localStorage（键 `sd-progress` / `sd-records` / `sd-wrongbook` 与旧版一致；备份 JSON 格式 `app: 'sd-pass', version: 1` 兼容旧版，可互导）
- **旧链接兼容**：旧版 hash 路由（`/#/learn?ch=ch03`）与 `/learn?ch=` 深链自动重定向到新地址

## 数据说明

- 全部学习内容内置打包在站点内（`src/data/`），运行期不发起任何网络请求
- 做题记录、错题本、学习进度保存在浏览器 localStorage；「进度与计划」页支持导出/导入 JSON 备份跨浏览器迁移
- 数据 schema 与校验见 `CLAUDE.md`；改数据后跑 `pnpm validate` + `pnpm build`
