export default function ({ $axios, app, store }) {
  $axios.onRequest((config) => {
    config.headers = {
      'Content-Language': store.state.settings.lang || app.i18n.locale,
    }
  })

  $axios.onError((error) => {
    console.log(error)
  })
}
