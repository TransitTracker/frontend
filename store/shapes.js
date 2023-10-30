import Vue from 'vue'

export const state = () => ({
  data: {},
})

export const mutations = {
  add(state, { shape, uniqueIdentifier }) {
    Vue.set(state.data, uniqueIdentifier, shape)
  },
}

export const actions = {
  async get({ commit, state }, { agencySlug, shapeId }) {
    const uniqueIdentifier = `${agencySlug}|${shapeId}`

    if (uniqueIdentifier in state.data) {
      return state.data[uniqueIdentifier]
    }

    const shape = await this.$axios.get(
      `/agencies/${agencySlug}/shapes/${shapeId}`
    )

    commit('add', { shape: shape.data, uniqueIdentifier })

    return shape.data
  },
}
