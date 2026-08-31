// 章节数据聚合：静态导入全部章节，供 Learn/Practice/Progress 等视图消费
// ch00 为零基础前传（不配题），排在正式章节之前
import ch00 from './chapters/ch00.js'
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

export const chapters = [ch00, ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08, ch09, ch10, ch11, ch12, ch13, ch14]
