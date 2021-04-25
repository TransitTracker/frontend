export default function ({ app }) {
  return {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        dark: {
          anchor: '#ffffff',
          primary: '#00497b',
          'primary-dark': '#00224e',
          secondary: '#009a8d',
          'secondary-dark': '#006b60',
          info: null,
          success: '#059669',
          warning: '#a16207',
        },
        light: {
          primary: '#2374ab',
          'primary-dark': '#00497b',
          secondary: '#4dccbd',
          'secondary-dark': '#009a8d',
          info: null,
          success: '#10b981',
          warning: '#facc15',
        },
      },
      options: {
        variations: false,
      },
    },
    lang: {
      t: (key, ...params) => app.i18n.t(key, params),
    },
    icons: {
      iconfont: 'mdiSvg',
    },
  }
}
