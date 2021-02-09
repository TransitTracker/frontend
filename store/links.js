import Vue from 'vue'

export const state = () => ({
  data: [],
})

export const mutations = {
  add(state, link) {
    Vue.set(state.data, link.id, link)
  },
}

export const actions = {
  async getOne({ commit, state }, id) {
    if (id in state.data) {
      return state.data[id]
    }

    const alert = await this.$axios.get(`/alerts/${id}`)
    commit('add', alert.data.data)

    return alert
  },
}
