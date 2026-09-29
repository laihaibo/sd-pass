<div align="center">

# 🎓 SD-Pass · 软考通关

**面向非计算机专业考生的「中级软件设计师」备考网站**

纯前端静态站 · 零后端 · 零运行期网络请求 · 离线可用 · 数据 100% 存本地

**[🚀 在线体验](https://laihaibo.github.io/sd-pass/)**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-087EA4?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Build & Deploy](https://github.com/laihaibo/sd-pass/actions/workflows/deploy.yml/badge.svg)](https://github.com/laihaibo/sd-pass/actions/workflows/deploy.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-参与贡献)

*技术栈：Next.js 16（App Router · 静态导出）+ React 19 + TypeScript + zustand，Apple 液态玻璃（Liquid Glass）设计系统，浅色 / 深色双主题。*

</div>

---

## ✨ 核心特性

- 📖 **系统化知识学习** — 官方考纲 14 章 + 零基础前传共 15 章全覆盖，深入浅出的讲解、高频考点清单、图解与应试技巧
- ✏️ **728 道客观题刷题** — 章节练习 / 模拟考试（75 题 · 150 分钟）/ 错题重练三种模式，作答即时判分并显示解析
  - 模拟考试支持**断点续答**：中途退出或刷新页面后进度自动保存，可接着作答
  - **键盘快捷键**：`1-4` / `A-D` 选择选项，`Enter` 提交 / 下一题
- 📝 **主观题精析** — 下午卷 5 大题型 15 道例题，按「原题 → 解题思路 → 得分点拆解 → 参考答案 → 快速得分技巧」五段式拆解
- 📈 **进度与备考计划** — 章节进度追踪、正确率分析、考试倒计时、三段式备考计划，做题记录支持 JSON 备份 / 迁移
- 📋 **一键复制求助** — 题目卡片一键复制题干 / 选项 / 我的答案 / 正确答案 / 解析
- 🌗 **液态玻璃视觉 · 深浅双主题** — 跟随系统 + 导航栏手动切换，偏好记忆在本地，无闪烁初始化

## 📊 内容一览

| 📖 章节讲解 | ✏️ 客观题 | 📝 主观题题型 | 🧩 下午卷例题 | 🗺️ 预渲染页面 |
|:---:|:---:|:---:|:---:|:---:|
| 15 章 | 728 道 | 5 大类 | 15 道 | 38 个 |

## 🚀 快速开始

前置要求：**Node.js 22+**，包管理器为 pnpm（版本锁定在 `package.json` 的 `packageManager` 字段）。

```bash
git clone https://github.com/laihaibo/sd-pass.git
cd sd-pass
pnpm install
pnpm dev        # 启动开发服务器（自动生成 src/data/generated/meta.json）
```

浏览器打开 `http://localhost:3000` 即可开始。

### 可用脚本

| 脚本 | 说明 |
|---|---|
| `pnpm dev` | 启动开发服务器（predev 自动生成元数据） |
| `pnpm build` | 静态导出到 `out/` |
| `pnpm validate` | 校验数据字段合法性 |
| `pnpm lint` | ESLint 检查（flat config） |
| `pnpm preview` | 本地预览构建产物 |

## 🏗️ 项目结构

```text
sd-pass/
├── .github/
│   └── workflows/          # GitHub Pages 自动部署流水线（Node 22）
├── scripts/                # 构建脚本：元数据生成、数据校验、导出后处理
├── src/
│   ├── app/                # Next.js App Router 页面（全部构建期预渲染）
│   ├── components/         # UI 组件：刷题引擎、图例渲染、主题切换等
│   ├── data/               # 📚 全部学习内容：章节 / 题库 / 主观题（纯静态 JS 数据）
│   │   └── generated/      # 构建期生成的轻量元数据 meta.json（勿手改）
│   └── lib/                # zustand 状态管理、题库按章懒加载、备份迁移
├── next.config.ts
└── package.json
```

## ⚙️ 架构设计

- **纯静态导出**：`output: 'export'` + `trailingSlash`，38 个页面全部构建期预渲染，无任何服务端
- **内容按需分包**：学习 / 主观题页面按章、按题独立静态化（每页只携带本章内容）；题库按章动态 `import()`——章节练习只下载单章题库，模拟考 / 错题重练才并行加载全部
- **轻量元数据**：客户端组件只依赖构建期生成的 `src/data/generated/meta.json`（约 1KB：章节标题 / 题数统计），避免把约 900KB 的内容打进客户端包（由 `scripts/gen-meta.mjs` 在 predev / prebuild 时生成）
- **RSC 优先**：章节阅读页、主观题详情为服务端组件静态 HTML，仅「标记完成」「掌握」等按钮注水
- **状态持久化**：zustand store + localStorage（键 `sd-progress` / `sd-records` / `sd-wrongbook`），备份 JSON 格式（`app: 'sd-pass', version: 1`）与旧版互导兼容
- **旧链接兼容**：旧版 hash 路由（`/#/learn?ch=ch03`）与 `/learn?ch=` 深链自动重定向到新地址

## 🔒 数据与隐私

- 全部学习内容内置打包在站点内（`src/data/`），**运行期不发起任何网络请求**，离线可用
- 做题记录、错题本、学习进度仅保存在浏览器 localStorage，**不上传任何服务器**
- 「进度与计划」页支持导出 / 导入 JSON 备份，跨浏览器、跨设备迁移

## ☁️ 部署到 GitHub Pages

仓库已内置 `.github/workflows/deploy.yml`：

1. 代码推送到 GitHub 仓库 `main` 分支
2. 仓库 Settings → Pages → Source 选择 **GitHub Actions**
3. push 后 CI（Node 22）自动 `pnpm validate` + `pnpm build` 并部署

CI 会用 `BASE_PATH=/<仓库名>` 构建以适配 `https://<用户名>.github.io/<仓库名>/` 子路径，仓库改名无需改配置；本地想模拟子路径构建可执行 `BASE_PATH=/sd-pass pnpm build`。

构建产物含 `out/.nojekyll`（postbuild 脚本保证），避免 GitHub Pages 的 Jekyll 忽略 `_next/` 资源目录。

## 🤝 参与贡献

欢迎通过 [Issue](https://github.com/laihaibo/sd-pass/issues) 反馈内容勘误、功能建议，或直接提交 Pull Request！

修改 `src/data/` 下的学习内容时，请先阅读 `CLAUDE.md` 了解数据 schema，改完跑一遍 `pnpm validate` + `pnpm build` 确认校验与构建通过。

## ⚠️ 免责声明

本项目是个人学习备考工具，与工业和信息化部教育与考试中心等官方考试机构无关；题目与解析内容仅供学习参考，请以官方教材和考纲为准。
