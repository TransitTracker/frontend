import Vue from 'vue'

export const state = () => ({
  custom: [],
  data: {},
  times: {},
})

export const mutations = {
  add(state, agency) {
    Vue.set(state.data, agency.slug, agency)
  },
  addCustom(state, slug) {
    state.custom.push(slug)
  },
  setTime(state, { agency, timestamp = null }) {
    Vue.set(state.times, agency, timestamp)
  },
  removeTime(state, agency) {
    Vue.delete(state.times, agency)
  },
}
