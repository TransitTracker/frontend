import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'transit-tracker-settings',
    paths: ['settings'],
  })(store)
}
