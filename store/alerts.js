import Vue from 'vue'
import { alertStatus } from '~/utils/enums'

export const state = () => ({
  activeAlerts: [],
  allAlerts: {},
  allIsLoaded: false,
})

export const getters = {
  getCurrentAlert: (state, getters, rootState) => {
    const result = state.activeAlerts.filter(({ id, status }) => {
      return (
        !rootState.settings.readAlerts.includes(id) &&
        alertStatus[status]?.showOnTopBar
      )
    })

    if (!result.length) return null

    return result[0]
  },
}

export const mutations = {
  insertActive(state, alerts) {
    alerts.forEach((alert) => {
      Vue.set(state.activeAlerts, alert.id, alert)
    })
  },
  insertAll(state, alerts) {
    alerts.forEach((alert) => {
      Vue.set(state.allAlerts, alert.id, alert)
    })
  },
  clearAll(state) {
    state.activeAlerts = []
  },
  setAsLoaded() {
    state.allIsLoaded = true
  },
}

export const actions = {
  // Load all active alerts that are shown in one region
  async loadForOneRegion({ commit }, region) {
    const alerts = await this.$axios.get(`/regions/${region}/alerts`, {
      cacheId: `alerts-${region}`,
    })
    commit('insertActive', alerts.data.data)
  },

  // Load all alerts, including archive (not specific to one region)
  async loadAll({ commit, dispatch }, url = '/alerts') {
    const response = await this.$axios.get(url)

    commit('insertAll', response.data.data)

    if (response.data.links?.next) {
      await dispatch('loadAll', response.data.links.next)
    } else {
      commit('setAsLoaded')
    }
  },
}
