<script>
export default {
  asyncData({ store, params, query, redirect }) {
    store.commit('app/set', { key: 'alertsView', value: `show/${params.id}` })

    if (query.region) {
      redirect(`/regions/${query.region}`)
    } else {
      redirect(`/regions/${store.state.settings.currentRegion}`)
    }
  },
}
</script>
