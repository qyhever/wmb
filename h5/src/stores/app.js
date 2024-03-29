import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    collapse: false
  }),
  getters: {
    expand: state => !state.collapse
  },
  actions: {
    toggleCollapse () {
      this.collapse = !this.collapse
    }
  }
})
