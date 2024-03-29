import axios from 'axios'
import { version } from './package.json'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  ssr: false,
  modern: 'client',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Transit Tracker',
    title: 'Transit Tracker',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.bunny.net' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.bunny.net/css?family=figtree:700|inter:400,500,600&display=swap',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/main.scss', '@/assets/css/tailwind.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios.client.js',
    '~/plugins/i18n.client.js',
    '~/plugins/settings.client.js',
    '~/plugins/socket.client.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxt/postcss8',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-i18n',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: `${process.env.BACKEND_HOST}/v2` || 'http://backend.test/v2',
    credentials: true,
  },

  // i18n module configuration
  i18n: {
    locales: [
      { code: 'en', iso: 'en-CA', file: 'en.js' },
      { code: 'fr', iso: 'fr-CA', file: 'fr.js' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: '~/i18n',
    detectBrowserLanguage: {
      fallbackLocale: 'en',
      onlyOnRoot: true,
      useCookie: false,
    },
    vueI18nLoader: true,
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    optionsPath: './vuetify.options.js',
    defaultAssets: {
      font: false,
      icons: false,
    },
    customVariables: ['~/assets/variables.scss'],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  generate: {
    fallback: true,
    routes(callback) {
      // Auto generate routes based on current regions (fetch from API)
      axios.get(`${process.env.BACKEND_HOST}/v2/regions`).then(({ data }) => {
        const routes = []

        data.data.forEach(({ slug }) => {
          routes.push(
            `/regions/${slug}`,
            `/fr/regions/${slug}`,
            `/regions/${slug}/map`,
            `/fr/regions/${slug}/map`,
            `/regions/${slug}/table`,
            `/fr/regions/${slug}/table`
          )
        })

        callback(null, routes)
      })
    },
  },

  loading: '~/components/Loading.vue',
  loadingIndicator: {
    name: '~/assets/loading.html',
  },

  env: {
    version,
    mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
    mabboxStyleDark: process.env.MAPBOX_STYLE_DARK,
    mabboxStyleLight: process.env.MAPBOX_STYLE_LIGHT,
    backendHost: process.env.BACKEND_HOST,
    wsKey: process.env.WS_KEY || 'tt-ws',
    wsHost: process.env.WS_HOST || 'localhost',
    wsPort: process.env.WS_PORT || 6001,
    wsTls: process.env.WS_TLS || true,
    imageKit: process.env.IMAGE_KIT,
    commitHash: process.env.COMMIT_REF,
    vapidKey: process.env.VAPID_KEY,
    reportEn: process.env.REPORT_EN,
    reportFr: process.env.REPORT_FR,
  },

  pwa: {
    icon: {
      source: '/static/icon-beta.png',
    },
    manifest: {
      name: 'Transit Tracker',
      short_name: 'Transit T.',
      description: 'An Overview of Public Transit for Several Canadian Cities',
      display: 'standalone',
      background_color: '#2374ab',
    },
    meta: {
      appleStatusBarStyle: 'black-translucent',
      name: 'Transit Tracker',
      theme_color: '#00497b',
      twitterCard: 'summary_large_image',
    },
    workbox: {
      importScripts: ['sw-push.js'],
    },
  },
}
