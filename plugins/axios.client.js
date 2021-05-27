export default function ({ $axios, app, error, redirect, store }) {
  $axios.onRequest((config) => {
    config.headers = {
      'Content-Language': store.state.settings.lang || app.i18n.locale,
    }
  })

  $axios.onError((axiosError) => {
    const code = parseInt(axiosError.response && axiosError.response.status)

    if (code === 419) {
      return Promise.resolve(false)
    } else if (code === 500) {
      redirect(app.localePath('/maintenance'), { code: 500 })
      return Promise.resolve(false)
    } else if (code === 503) {
      redirect(app.localePath('/maintenance'), { code: 503 })
      return Promise.resolve(false)
    }
  })
}
