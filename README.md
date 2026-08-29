# 软考通关 · 中级软件设计师备考网站

面向非计算机专业考生的软考中级软件设计师备考助手（纯前端静态站，零后端、零外部依赖、离线可用）。

## 功能

- 📖 **知识学习**：官方考纲 14 章全覆盖，零基础深入浅出讲解 + 高频考点清单 + 图解 + 应试技巧
- ✏️ **刷题练习**：700+ 道客观题（章节练习 / 模拟考试 75 题 150 分钟 / 错题重练），作答即时判分并显示解析
- 📝 **主观题精析**：下午卷 5 大题型 15 道例题，按「原题 → 解题思路 → 得分点拆解 → 参考答案 → 快速得分技巧」五段式拆解
- 📈 **进度与计划**：章节进度、正确率分析、考试倒计时、三段式备考计划、做题记录 JSON 备份/迁移
- 📋 **一键复制求助**：题目卡片一键复制题干/选项/我的答案/正确答案/解析，方便向别人请教

## 本地开发

```bash
npm install
npm run dev      # 本地开发
npm run build    # 产物输出到 dist/
npm run preview  # 本地预览产物
```

## 部署到 GitHub Pages

仓库已内置 `.github/workflows/deploy.yml`：

1. 将代码推送到 GitHub 仓库 `main` 分支（首次需手动 `npm install && npm run build` 生成 package-lock.json，或者直接推送后由 Actions 执行 `npm install`）
2. 仓库 Settings → Pages → Source 选择 **GitHub Actions**
3. push 到 main 后 GitHub Actions（Node 22）自动构建并部署，访问 `https://<用户名>.github.io/sd-pass/`

> vite `base` 配置为相对路径 `./`，任何仓库名/用户主页路径均可直接使用，无需修改配置。

## 数据说明

- 全部学习内容内置打包在站点内，运行期不发起任何网络请求
- 做题记录、错题本、学习进度保存在浏览器 localStorage；页面「进度与计划」支持导出/导入 JSON 备份以跨浏览器迁移
