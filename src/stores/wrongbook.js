import { defineStore } from 'pinia'
import { load, save } from '../utils/persist'

const KEY = 'sd-wrongbook'

export const useWrongbookStore = defineStore('wrongbook', {
  state: () => load(KEY, { ids: [] }),
  actions: {
    add(id) {
      if (!this.ids.includes(id)) {
        this.ids.unshift(id)
        this._persist()
      }
    },
    remove(id) {
      this.ids = this.ids.filter((x) => x !== id)
      this._persist()
    },
    clear() {
      this.ids = []
      this._persist()
    },
    restore(state) {
      this.$patch({ ids: Array.isArray(state?.ids) ? state.ids : [] })
      this._persist()
    },
    _persist() {
      save(KEY, this.$state)
    }
  }
})
