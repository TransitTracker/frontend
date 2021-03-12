// TODO: remove default values
export const state = () => ({
  activeAgencies: ['stm'],
  autoRefresh: false,
  configurationDone: false,
  readAlerts: [],
  currentRegion: 'montreal',
  launch: '/',
  lang: 'en',
  theme: 'system',
  activateByod: false,
})

export const mutations = {
  set(state, { setting, value }) {
    state[setting] = value
  },
}
