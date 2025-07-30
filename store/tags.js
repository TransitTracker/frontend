import Vue from 'vue'

export const state = () => ({
  data: {},
})

export const mutations = {
  add(state, tag) {
    Vue.set(state.data, tag.id, tag)
  },
  set(state, tags) {
    state.data = tags
  },
}

export const actions = {
  get({ state }, id) {
    if (id in state.data) {
      return state.data[id]
    }

    return {}
  },
  async getAll({ commit }) {
    const tags = await this.$axios.get('/tags', { cacheId: 'tags' })

    tags.data.data.forEach((tag) => {
      commit('add', tag)
    })
  },
}
