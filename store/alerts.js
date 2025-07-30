import Vue from 'vue'

export const state = () => ({
  data: [],
})

export const getters = {
  getCurrentAlert: (state, getters, rootState) => {
    const result = state.data.filter((alert) => {
      return !rootState.settings.readAlerts.includes(alert.id)
    })

    if (!result.length) return null

    return result[0]
  },
}

export const mutations = {
  add(state, alert) {
    Vue.set(state.data, alert.id, alert)
  },
}

export const actions = {
  async load({ commit }, region) {
    const alerts = await this.$axios.get(`/regions/${region}/alerts`, {
      cacheId: `alerts-${region}`,
    })
    alerts.data.data.forEach((alert) => {
      commit('add', alert)
    })
  },
}
