export default function ({ $axios, app, error, store }) {
  $axios.defaults.withCredentials = true

  $axios.onRequest((config) => {
    const currentLang = store.state.settings.lang || app.i18n.locale

    config.headers = {
      ...config.headers,
      'Content-Language': currentLang,
    }

    // Ask the server if the saved request is the same
    if (config.cacheId) {
      // Append language to cacheId to differentiate requests
      config.cacheId = `${config.cacheId}.${currentLang}`

      const existingEtag = store.state.cachedRequests.etags[config.cacheId]

      if (existingEtag) {
        config.headers['If-None-Match'] = existingEtag
      }

      // Consider 304 as successfull and not error
      config.validateStatus = (status) =>
        (status >= 200 && status < 300) || status === 304
    }
  })

  $axios.onResponse((response) => {
    const cacheId = response.config.cacheId
    if (!cacheId) return

    if (response.status === 304) {
      const existingData = store.state.cachedRequests.requests[cacheId]

      // Inject previously cached data
      if (existingData) {
        response.data = existingData
      }

      return
    }

    const etag = response.headers.etag
    if (etag) {
      store.commit('cachedRequests/set', {
        cacheId,
        etag,
        data: response.data,
      })
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
}
