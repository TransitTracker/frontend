export default function ({ $axios, app }) {
  $axios.onRequest((config) => {
    config.headers = {
      'Content-Language': app.i18n.locale,
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    console.log(code)
  })
}
