// 数据类型定义：与 src/data/ 下各 JS 数据模块的字段严格对应

export interface DiagramLayers {
  type: 'layers'
  caption?: string
  spec: { items: { label: string; note?: string }[] }
}

export interface DiagramFlow {
  type: 'flow'
  caption?: string
  spec: { direction?: 'horizontal' | 'vertical'; steps: { label: string; note?: string }[] }
}

export interface DiagramTree {
  type: 'tree'
  caption?: string
  spec: { label: string; note?: string; children?: Omit<DiagramTree['spec'], 'children'>[] }
}

export interface DiagramSvg {
  type: 'svg'
  caption?: string
  spec: { viewBox?: string; content: string }
}

export type Diagram = DiagramLayers | DiagramFlow | DiagramTree | DiagramSvg

export interface ChapterSection {
  h: string
  /** 支持 \n 分段 */
  p: string
  diagram?: Diagram
}

export interface Chapter {
  id: string
  title: string
  syllabus: string
  intro: string
  sections: ChapterSection[]
  keyPoints: string[]
  tips: string[]
}

export interface Question {
  id: string
  chapterId: string
  stem: string
  options: string[]
  /** 0~3 对应 A~D */
  answer: number
  explanation: string
  tag: string
}

export interface SubjectiveItem {
  id: string
  type: 'dfd' | 'db' | 'uml' | 'algo' | 'java'
  typeName: string
  title: string
  stem: string
  diagram?: Diagram
  approach: string
  scorePoints: string[]
  referenceAnswer: string
  quickScoringTip: string
}

export interface SubjectiveType {
  id: string
  name: string
}

export type QuizMode = 'chapter' | 'mock' | 'wrong'

export interface AnswerRecord {
  qid: string
  chapterId: string
  chosen: number
  correct: boolean
  mode: QuizMode
  ts: number
}
