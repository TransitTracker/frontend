export default async ({ error, store, route }) => {
  if (store.state.app.dataIsLoaded) return

  if (route.name.includes('regions')) {
    const shouldRedirect = await store.dispatch(
      'app/loadData',
      route.params.region
    )
    if (shouldRedirect) return

    return error({
      message: 'Wrong region / Mauvaise région',
      statusCode: 404,
    })
  }
}
