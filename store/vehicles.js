import Vue from 'vue'

export const state = () => ({
  data: {},
  features: {},
  selection: {},
})

export const getters = {
  counts(state) {
    const counts = []
    Object.keys(state.data).forEach((agency) => {
      counts[agency] = state.data[agency].length
    })

    return counts
  },
}

export const mutations = {
  set(state, { agency, vehicles, features }) {
    Vue.set(state.data, agency, vehicles)
    Vue.set(state.features, agency, features)
  },
  setSelection(state, selection) {
    state.selection = selection
  },
  emptyData(state, agency) {
    Vue.set(state.data, agency, [])
    Vue.set(state.features, agency, [])
  },
}

export const actions = {
  async load({ commit }, agency) {
    const response = await this.$axios.get(`/agencies/${agency}/vehicles`)
    commit('set', {
      agency,
      vehicles: response.data.data,
      features: response.data.geojson,
    })

    // Commit timestamp
    commit(
      'agencies/setTime',
      { agency, timestamp: response.data.timestamp },
      { root: true }
    )
  },
  setSelectionById({ commit, state }, { id, agencySlug }) {
    const vehicle = state.data[agencySlug].find((vehicle) => vehicle.id === id)
    commit('setSelection', vehicle)
    return vehicle
  },
}
