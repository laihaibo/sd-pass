// 数据聚合总入口：re-export 三大聚合模块，保持统一导入路径（如备份/校验等场景）。
// 视图请直接从 chapters.js / questions.js / subjectives.js 导入，
// 便于构建工具按需分包，避免单页连带加载全部数据。
export { chapters } from './chapters.js'
export { questions } from './questions.js'
export { subjectives, subjectiveTypes } from './subjectives.js'
