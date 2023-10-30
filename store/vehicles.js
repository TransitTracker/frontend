import { set } from 'vue'

export const state = () => ({
  data: {},
  selection: {},
  warning: null,
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
  set(state, { agency, vehicles }) {
    set(state.data, agency.slug, vehicles)
  },
  setSelection(state, selection) {
    state.selection = selection
    state.warning = null
  },
  setWarning(state, warning) {
    state.warning = warning
  },
  emptyData(state, agency) {
    set(state.data, agency.slug, [])
  },
}

export const actions = {
  async load({ commit, state }, agency) {
    const response = await this.$axios.get(
      `${process.env.backendHost}/v2b/agencies/${agency.slug}/vehicles`
    )
    commit('set', {
      agency,
      vehicles: response.data,
    })

    // Commit timestamp
    commit(
      'agencies/setTime',
      { agency, timestamp: response.data.lastRefreshAt },
      { root: true }
    )

    // If selected vehicle is from this agency, replace it or erase it
    if (state.selection.agency === agency.slug) {
      const vehicle = response.data.data.find(
        ({ id }) => id === state.selection.id
      )
      if (vehicle) commit('setSelection', vehicle)
      else commit('setSelection', {})
    }
  },
  setSelectionById({ commit, state }, { id, agency }) {
    const vehicle = state.data[agency.slug].features?.find(
      (vehicle) => vehicle.id === id
    )

    if (!vehicle) {
      return {}
    }

    commit('setSelection', vehicle)
    return vehicle
  },
}
