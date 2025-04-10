import Vue, { set } from 'vue'

export const state = () => ({
  features: {},
  selection: {},
  warning: null,
})

export const getters = {
  counts(state) {
    const counts = {}
    Object.keys(state.features).forEach((agency) => {
      counts[agency] = state.features[agency].features.length
    })

    return counts
  },
  getVehicleById:
    (state) =>
    ({ agencySlug, vehicleId }) => {
      return state.features[agencySlug].features.find(
        (vehicle) => vehicle.id === vehicleId
      )
    },
}

export const mutations = {
  set(state, { agency, features }) {
    set(state.features, agency.slug, features)
  },
  setSelection(state, selection) {
    state.selection = selection
    state.warning = null
  },
  setWarning(state, warning) {
    state.warning = warning
  },
  emptyData(state, agency) {
    Vue.delete(state.features, agency.slug)
  },
}

export const actions = {
  async load({ commit, state }, agency) {
    // Do not load archived agencies
    if (agency.isArchived) {
      return
    }

    const response = await this.$axios.get(
      `/agencies/${agency.slug}/vehicles.geojson`
    )
    commit('set', {
      agency,
      features: response.data,
    })

    // Commit timestamp
    commit(
      'agencies/setTime',
      { agency, timestamp: response.data.lastRefreshAt },
      { root: true }
    )

    // If selected vehicle is from this agency, replace it or erase it
    // TODO: agencySlug is not available anymore in selection
    if (state.selection.agency === agency.slug) {
      const vehicle = response.data.features.find(
        ({ id }) => id === state.selection.id
      )
      if (vehicle) commit('setSelection', vehicle)
      else commit('setSelection', {})
    }
  },
  setSelectionWithId(
    { commit, rootState, dispatch, state },
    { agencySlug, vehicleId }
  ) {
    const vehicle = state.features[agencySlug]?.features?.find(
      (vehicle) => vehicle.id === vehicleId
    )

    if (!vehicle) {
      return {}
    }

    if (vehicle.properties.agencyId !== rootState.agencies.selection?.id) {
      dispatch('agencies/setSelectionById', vehicle.properties.agencyId, {
        root: true,
      })
    }

    commit('setSelection', vehicle)
  },
  setSelectionAndAgency({ commit, rootState, dispatch }, vehicleSelection) {
    if (
      vehicleSelection.properties.agencyId !== rootState.agencies.selection?.id
    ) {
      dispatch(
        'agencies/setSelectionById',
        vehicleSelection.properties.agencyId,
        { root: true }
      )
    }

    commit('setSelection', vehicleSelection)
  },
}
