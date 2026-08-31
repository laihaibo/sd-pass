// 客观题数据聚合：静态导入全部题库（约 728 题，站内体积最大的一块）
import q_ch01 from './questions/q_ch01.js'
import q_ch02 from './questions/q_ch02.js'
import q_ch03 from './questions/q_ch03.js'
import q_ch04 from './questions/q_ch04.js'
import q_ch05 from './questions/q_ch05.js'
import q_ch06 from './questions/q_ch06.js'
import q_ch07 from './questions/q_ch07.js'
import q_ch08 from './questions/q_ch08.js'
import q_ch09 from './questions/q_ch09.js'
import q_ch10 from './questions/q_ch10.js'
import q_ch11 from './questions/q_ch11.js'
import q_ch12 from './questions/q_ch12.js'
import q_ch13 from './questions/q_ch13.js'
import q_ch14 from './questions/q_ch14.js'

export const questions = [
  ...q_ch01, ...q_ch02, ...q_ch03, ...q_ch04, ...q_ch05, ...q_ch06, ...q_ch07,
  ...q_ch08, ...q_ch09, ...q_ch10, ...q_ch11, ...q_ch12, ...q_ch13, ...q_ch14
]
