import Vue from 'vue'

export const state = () => ({
  firstLoad: true,
  dataIsLoaded: false,
  canInstall: false,
  installPrompt: null,
  installOutcome: null,
  updateAvailable: false,
  openNotificationsCentre: false,
  openRegionSwitcher: false,
  openSettingsDrawer: false,
  openDownloadAssistant: false,
  updatePending: false,
  notificationsCentre: false,
  filters: {},
})

export const mutations = {
  setDataAsLoaded(state) {
    state.dataIsLoaded = true
  },
  set(state, { key, value }) {
    state[key] = value
  },
  setFilter(state, { column, value }) {
    Vue.set(state.filters, column, value)

    // Delete the filter if it's empty
    if (value === '') {
      Vue.delete(state.filters, column)
    }
  },
  removeFilter(state, column) {
    Vue.delete(state.filters, column)
  },
}

export const actions = {
  async loadData({ commit, dispatch, rootState }, regionSlug) {
    await dispatch('regions/loadAll', null, { root: true })

    // Check if region exists
    if (!(regionSlug in rootState.regions.data)) {
      return false
    }

    await commit(
      'settings/set',
      { setting: 'currentRegion', value: regionSlug },
      { root: true }
    )

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

    // Connect to auto refresh
    dispatch(
      'regions/connectToAutoRefresh',
      { slug: regionSlug },
      { root: true }
    )

    return true
  },
  promptInstaller({ commit, state }) {
    commit('set', { key: 'canInstall', value: false })

    state.installPrompt.prompt()
    state.installPromot.userChoise.then((choice) => {
      console.log(choice)

      commit('set', {
        key: 'installOutcome',
        value: choice.outcome,
      })

      commit('set', { key: 'installPrompt', value: null })
    })
  },
}
