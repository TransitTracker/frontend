import Vue from 'vue'

export const state = () => ({
  data: {},
  features: {},
  selection: {},
})

export const getters = {
  counts(state) {
    const counts = {}
    Object.keys(state.data).forEach((agency) => {
      counts[agency] = state.data[agency].length
    })

    return counts
  },
}

export const mutations = {
  set(state, { agency, vehicles, features }) {
    Vue.set(state.data, agency.slug, vehicles)
    Vue.set(state.features, agency.slug, features)
  },
  setSelection(state, selection) {
    state.selection = selection
  },
  emptyData(state, agency) {
    Vue.set(state.data, agency.slug, [])
    Vue.set(state.features, agency.slug, [])
  },
}

export const actions = {
  async load({ commit }, agency) {
    const response = await this.$axios.get(`/agencies/${agency.slug}/vehicles`)
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
  setSelectionById({ commit, state }, { id, agency }) {
    const vehicle = state.data[agency.slug].find((vehicle) => vehicle.id === id)

    if (!vehicle) {
      return {}
    }

    commit('setSelection', vehicle)
    return vehicle
  },
}
