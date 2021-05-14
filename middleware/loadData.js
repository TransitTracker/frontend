export default async ({ error, route, store, params }) => {
  // User has never loaded app
  if (!store.state.app.dataIsLoaded) {
    await store.dispatch('app/loadData', params.region)
  }

  // Check if region is valid
  if (!(params.region in store.state.regions.data)) {
    return error({
      message: 'Wrong region / Mauvaise région',
      statusCode: 404,
    })
  }

  // User has loaded app and continues with the same region
  if (store.state.settings.currentRegion === params.region) return

  // User has loaded app but is changing region
  store.dispatch(
    'settings/changeRegion',
    store.state.regions.data[params.region]
  )
  store.commit('settings/set', {
    setting: 'currentRegion',
    value: params.region,
  })
}
