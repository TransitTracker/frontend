import {
  setupCache,
  buildWebStorage,
} from 'axios-cache-interceptor/dist/index.cjs'

export default function ({ $axios, app, error, store }, inject) {
  $axios.defaults.withCredentials = true

  $axios.onRequest((config) => {
    config.headers = {
      'Content-Language': store.state.settings.lang || app.i18n.locale,
    }
  })

  $axios.onError((axiosError) => {
    const code = parseInt(axiosError.response && axiosError.response.status)

    if (code === 419) {
      return Promise.resolve(false)
    }

    if (code === 503) {
      error({ statusCode: 503, message: 'Maintenance' })
      return Promise.resolve(false)
    }
  })

  const axiosCache = setupCache($axios, {
    storage: buildWebStorage(localStorage, 'axios-cache:'),
    debug: console.log,
  })

  inject('axiosCache', axiosCache)
}
