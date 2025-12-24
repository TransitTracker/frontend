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
  async get({ commit, state }, id) {
    if (id in state.data) {
      return state.data[id]
    }

    const alert = await this.$axios.get(`/links/${id}`, {
      cacheId: `link-${id}`,
    })
    commit('add', alert.data.data)

    return alert.data.data
  },
  async getAll({ commit }) {
    const links = await this.$axios.get('/links', { cacheId: 'links' })

    links.data.data.forEach((link) => {
      commit('add', link)
    })
  },
}
