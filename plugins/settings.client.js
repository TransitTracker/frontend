import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'transit-tracker-settings',
    paths: ['settings'],
  })(store)

  createPersistedState({
    key: 'transit-tracker-cache',
    paths: ['cachedRequests'],
  })(store)
}
