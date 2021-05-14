import Vue from 'vue'

export const state = () => ({
  data: {},
})

export const mutations = {
  add(state, region) {
    Vue.set(state.data, region.slug, region)
  },
}

export const actions = {
  async loadAll({ commit }) {
    // Get all regions and agencies, commit it to the store
    const response = await this.$axios.get('/regions')
    response.data.data.forEach((region) => {
      commit('add', region)
      region.agencies.forEach((agency) => {
        commit('agencies/add', agency, { root: true })
      })
    })

    // Return regions slugs with agencies slugs
    const slugs = response.data.data.map((region) => {
      return region.slug
    })

    return slugs
  },
  connectToAutoRefresh({ rootState, dispatch }, region) {
    // Remove any existing channels
    Object.keys(this.$echo.connector?.channels).forEach((channel) => {
      this.$echo.leave(channel)
    })

    // Add the new channel
    this.$echo.channel(region.slug).listen('VehiclesUpdated', (event) => {
      // Check if autoRefresh is enabled and if agency is selected in settings
      if (!rootState.settings.autoRefresh) return false
      if (!rootState.settings.activeAgencies.includes(event.slug)) {
        return false
      }

      // Find agency
      const agency = rootState.agencies.data[event.slug]

      // If dosen't exist, don't proceed
      if (!agency) return false

      dispatch('vehicles/load', agency, { root: true })
    })
  },
}
