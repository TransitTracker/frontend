import Vue from 'vue'

export const state = () => ({
  requests: {},
  etags: {},
})

export const mutations = {
  set(state, { cacheId, data, etag }) {
    Vue.set(state.requests, cacheId, data)
    Vue.set(state.etags, cacheId, etag)
  },
}
