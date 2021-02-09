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
}
