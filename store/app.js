export const state = () => ({
  dataIsLoaded: false,
})

export const mutations = {
  setDataAsLoaded(state) {
    state.dataIsLoaded = true
  },
}

export const actions = {
  async loadData({ commit, dispatch, rootState }, regionSlug) {
    await dispatch('regions/loadAll', null, { root: true })

    // Check if region exists
    if (!(regionSlug in rootState.regions.data)) {
      return false
    }

    // Make an array of all selected agencies
    const activeAgencies = rootState.regions.data[regionSlug].agencies.filter(
      (agency) => {
        return rootState.settings.activeAgencies.includes(agency.slug)
      }
    )

    // For each selected agency, load vehicles
    activeAgencies.forEach((agency) => {
      dispatch('vehicles/load', agency, { root: true })
    })

    // Load alerts for this region
    dispatch('alerts/load', regionSlug, { root: true })

    commit('setDataAsLoaded')
    return true
  },
}
