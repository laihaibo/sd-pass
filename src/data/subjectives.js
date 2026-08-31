// 主观题数据聚合：下午卷 5 大题型例题 + 题型清单
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
