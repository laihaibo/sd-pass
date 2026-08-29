import { defineStore } from 'pinia'
import { load, save } from '../utils/persist'

const KEY = 'sd-records'

export const useRecordsStore = defineStore('records', {
  state: () => load(KEY, { list: [] }),
  getters: {
    doneCount: (s) => s.list.length,
    correctCount: (s) => s.list.filter((r) => r.correct).length,
    correctRate() {
      return this.doneCount ? Math.round((this.correctCount / this.doneCount) * 100) : 0
    },
    perChapter: (s) => {
      const map = {}
      for (const r of s.list) {
        const cid = r.chapterId
        if (!cid) continue
        if (!map[cid]) map[cid] = { done: 0, correct: 0 }
        map[cid].done++
        if (r.correct) map[cid].correct++
      }
      return map
    }
  },
  actions: {
    addRecord({ qid, chapterId, chosen, correct, mode }) {
      this.list.push({ qid, chapterId, chosen, correct, mode, ts: Date.now() })
      this._persist()
    },
    restore(state) {
      this.$patch({ list: Array.isArray(state?.list) ? state.list : [] })
      this._persist()
    },
    _persist() {
      save(KEY, this.$state)
    }
  }
})
