export default function ({ app }) {
  return {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        dark: {
          primary: '#00497b',
          'primary-dark': '#00224e',
          secondary: '#009a8d',
          'secondary-dark': '#006b60',
        },
        light: {
          primary: '#2374ab',
          'primary-dark': '#00497b',
          secondary: '#4dccbd',
          'secondary-dark': '#009a8d',
        },
      },
    },
    lang: {
      t: (key, ...params) => app.i18n.t(key, params),
    },
  }
}
