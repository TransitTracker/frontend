import Vue from 'vue'

export const state = () => ({
  data: {},
  times: {},
  selection: {},
})

export const mutations = {
  add(state, agency) {
    Vue.set(state.data, agency.slug, agency)
  },
  setTime(state, { agency, timestamp = null }) {
    Vue.set(state.times, agency.slug, timestamp)
  },
  setSelection(state, agency) {
    state.selection = agency
  },
  remove(state, agency) {
    Vue.delete(state.data, agency.slug)
  },
  removeTime(state, agency) {
    Vue.delete(state.times, agency.slug)
  },
}

export const actions = {
  setSelectionById({ commit, state }, agencyId) {
    const agency = Object.values(state.data).find(({ id }) => id === agencyId)

    if (!agency) {
      return {}
    }

    commit('setSelection', agency)
    return agency
  },
}
