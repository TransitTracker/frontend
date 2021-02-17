import { version } from './package.json'
import en from './i18n/en'
import fr from './i18n/fr'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  ssr: false,

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
    '~/plugins/axios',
    '~/plugins/database',
    '~/plugins/settings.client.js',
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
    baseURL: process.env.API_BASE_URL || 'http://tt-backend.test/v2',
  },

  // i18n module configuration
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: { en, fr },
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
      '/app/montreal/',
      '/app/montreal/map',
      '/app/montreal/table',
      '/app/toronto/',
      '/app/toronto/map',
      '/app/toronto/table',
      '/app/sherbrooke/',
      '/app/sherbrooke/map',
      '/app/sherbrooke/table',
      '/app/quebec/',
      '/app/quebec/map',
      '/app/quebec/table',
      '/app/outaouais/',
      '/app/outaouais/map',
      '/app/outaouais/table',
    ],
  },

  loading: '~/components/Loading.vue',

  env: {
    version,
    mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
    mabboxStyleDark: process.env.MAPBOX_STYLE_DARK,
    mabboxStyleLight: process.env.MAPBOX_STYLE_LIGHT,
  },

  pwa: {
    name: 'Transit Tracker',
    short_name: 'Transit T',
    description: 'Realtime transit overview for Canadian cities',
    theme_color: '#2374ab',
  },
}
