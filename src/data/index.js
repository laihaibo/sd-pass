// 数据聚合入口：静态导入全部内置学习数据（构建期打包，运行期零网络请求）
import ch01 from './chapters/ch01.js'
import ch02 from './chapters/ch02.js'
import ch03 from './chapters/ch03.js'
import ch04 from './chapters/ch04.js'
import ch05 from './chapters/ch05.js'
import ch06 from './chapters/ch06.js'
import ch07 from './chapters/ch07.js'
import ch08 from './chapters/ch08.js'
import ch09 from './chapters/ch09.js'
import ch10 from './chapters/ch10.js'
import ch11 from './chapters/ch11.js'
import ch12 from './chapters/ch12.js'
import ch13 from './chapters/ch13.js'
import ch14 from './chapters/ch14.js'

export const chapters = [ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08, ch09, ch10, ch11, ch12, ch13, ch14]

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

import type1_dfd from './subjective/type1_dfd.js'
import type2_db from './subjective/type2_db.js'
import type3_uml from './subjective/type3_uml.js'
import type4_algo from './subjective/type4_algo.js'
import type5_java from './subjective/type5_java.js'

export const subjectives = [...type1_dfd, ...type2_db, ...type3_uml, ...type4_algo, ...type5_java]

export const subjectiveTypes = [
  { id: 'dfd', name: '数据流图分析' },
  { id: 'db', name: '数据库设计' },
  { id: 'uml', name: 'UML建模' },
  { id: 'algo', name: '算法与数据结构应用' },
  { id: 'java', name: 'Java面向对象程序设计' }
]
