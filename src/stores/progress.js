import { defineStore } from 'pinia'
import { load, save } from '../utils/persist'

const KEY = 'sd-progress'

export const useProgressStore = defineStore('progress', {
  state: () =>
    load(KEY, {
      chapters: {}, // { ch01: { read: true } }
      subjectiveRead: {}, // { sub_dfd_01: true }
      examDate: '2026-11-07' // 2026 下半年软考预计日期，可在进度页修改
    }),
  getters: {
    readCount: (s) => Object.values(s.chapters).filter((c) => c && c.read).length,
    subjectiveCount: (s) => Object.keys(s.subjectiveRead).length,
    daysLeft: (s) => {
      const target = new Date(s.examDate + 'T00:00:00')
      const today = new Date(new Date().toDateString())
      return Math.ceil((target - today) / 86400000)
    }
  },
  actions: {
    markRead(chapterId) {
      this.chapters[chapterId] = { ...(this.chapters[chapterId] || {}), read: true }
      this._persist()
    },
    markSubjective(id) {
      this.subjectiveRead[id] = true
      this._persist()
    },
    setExamDate(date) {
      if (date) {
        this.examDate = date
        this._persist()
      }
    },
    restore(state) {
      this.$patch(state)
      this._persist()
    },
    _persist() {
      save(KEY, this.$state)
    }
  }
})
