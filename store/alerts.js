import Vue from 'vue'

export const state = () => ({
  data: [],
})

export const mutations = {
  add(state, alert) {
    Vue.set(state.data, alert.id, alert)
  },
}

export const actions = {
  async load({ commit }, region) {
    const alerts = await this.$axios.get(`/regions/${region}/alerts`)
    alerts.data.data.forEach((alert) => {
      commit('add', alert)
    })
  },
}
