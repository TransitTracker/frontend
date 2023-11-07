import Axios from 'axios'

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

  // AxiosCache (basically v2b)
  // TODO: change this to default client and remove other client
  // TODO: add error handling like previous
  const instance = Axios.create({
    baseURL: `${process.env.backendHost}/v2b`,
  })

  instance.interceptors.request.use((config) => {
    const lang = store.state.settings.lang || app.i18n.locale
    config.headers['Content-Language'] = lang

    if (config.cacheId) {
      // Adding language to cacheId
      config.cacheId = `${config.cacheId}-${lang}`

      const cache = localStorage.getItem(`cache:${config.cacheId}`)

      if (!cache) {
        return config
      }

      console.log(`cache:${config.cacheId}: adding IfNoneMatch`)

      config.headers['If-None-Match'] = JSON.parse(cache).etag
      config.validateStatus = (status) => status === 200 || status === 304
    }

    return config
  })

  instance.interceptors.response.use((response) => {
    const cacheId = response.config.cacheId

    const newResponse = response

    if (cacheId && 'etag' in response.headers && response.status === 200) {
      console.log(`cache:${cacheId}: saving response data`)
      localStorage.setItem(
        `cache:${cacheId}`,
        JSON.stringify({
          data: response.data,
          etag: response.headers.etag,
        })
      )
    }

    if (response.status === 304) {
      const previousData = JSON.parse(
        localStorage.getItem(`cache:${cacheId}`)
      ).data

      console.log(
        `cache:${cacheId}: 304, using previous response`,
        previousData
      )

      newResponse.data = previousData
    }

    return newResponse
  })

  inject('axiosCache', instance)
}
