import Vue from 'vue'

export const state = () => ({
  data: {},
  times: {},
})

export const mutations = {
  add(state, agency) {
    Vue.set(state.data, agency.slug, agency)
  },
  setTime(state, { agency, timestamp = null }) {
    Vue.set(state.times, agency.slug, timestamp)
  },
  remove(state, agency) {
    Vue.delete(state.data, agency.slug)
  },
  removeTime(state, agency) {
    Vue.delete(state.times, agency.slug)
  },
}
