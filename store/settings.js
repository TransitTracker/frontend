// TODO: remove default values
export const state = () => ({
  activeAgencies: ['stm'],
  autoRefresh: false,
  configurationDone: false,
  readAlerts: [],
  currentRegion: 'mtl',
  launch: '/',
  lang: 'en',
  theme: 'system',
})

export const getters = {
  getActiveAgencies: (state) => {
    return state.activeAgencies
  },
}

export const mutations = {
  set(state, { setting, value }) {
    state[setting] = value
  },
}
