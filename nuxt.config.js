import VuetifyEn from 'vuetify/es5/locale/en'
import VuetifyFr from 'vuetify/es5/locale/fr'
import { version } from './package.json'
import en from './i18n/en'
import fr from './i18n/fr'

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
      {
        href: 'https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css',
        rel: 'stylesheet',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/byod.js',
    '~/plugins/database.client.js',
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
    baseURL: process.env.API_BASE_URL || 'http://backend.test/v2',
  },

  // i18n module configuration
  i18n: {
    useCookie: false,
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: { ...en, $vuetify: VuetifyEn },
        fr: { ...fr, $vuetify: VuetifyFr },
      },
    },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    optionsPath: './vuetify.options.js',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  generate: {
    fallback: true,
    routes: [
      '/regions/montreal/',
      '/regions/montreal/map',
      '/regions/montreal/table',
      '/regions/toronto/',
      '/regions/toronto/map',
      '/regions/toronto/table',
      '/regions/sherbrooke/',
      '/regions/sherbrooke/map',
      '/regions/sherbrooke/table',
      '/regions/quebec/',
      '/regions/quebec/map',
      '/regions/quebec/table',
      '/regions/outaouais/',
      '/regions/outaouais/map',
      '/regions/outaouais/table',
    ],
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
    shapesEndpoint: process.env.SHAPES_BASE_URL,
    wsKey: process.env.WS_KEY || 'tt-ws',
    wsHost: process.env.WS_HOST || 'localhost',
    wsPort: process.env.WS_PORT || 6001,
    wsTls: process.env.WS_TLS || true,
  },

  pwa: {
    icon: {
      source: '[srcDir]/[staticDir]/icon-beta.png',
    },
    manifest: {
      name: 'Transit Tracker',
      short_name: 'Transit T',
      description: 'Realtime transit overview for Canadian cities',
      display: 'minimal-ui',
    },
    meta: {
      appleStatusBarStyle: 'black-translucent',
      name: 'Transit Tracker',
      description: 'Realtime transit overview for Canadian cities',
      theme_color: '#00497b',
      lang: 'en',
    },
  },
}
