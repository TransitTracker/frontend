/** @type {import('tailwindcss').Config} */

const m3 = require('tailwind-m3-colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class', "[class~='theme--dark']"],
  prefix: 'tw-',
  content: [`components/tw/**/*.vue`, `components/VehicleSheet/**/*.vue`, `pages/regions/_region/index.vue`],
  theme: {
    extend: {
      transitionTimingFunction: {
        'emphasized': '	cubic-bezier(0.2, 0.0, 0, 1.0)',
        'emphasized-decelerate': 'cubic-bezier(0.05, 0.7, 0.1, 1.0)',
        'emphasized-accelerate': 'cubic-bezier(0.3, 0.0, 0.8, 0.15)', 
        'standard': '	cubic-bezier(0.2, 0.0, 0, 1.0)',
        'standard-decelerate': 'cubic-bezier(0, 0, 0, 1)',
        'standard-accelerate': 'cubic-bezier(0.3, 0, 1, 1)', 
      },
      opacity: {
        8: '.08',
        12: '.12',
        16: '.16',
      },
    },
    fontFamily: {
      // TODO: Add good fonts
      sans: ['Figtree', ...defaultTheme.fontFamily.sans],
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    m3('#2374ab', '#009a8d', '', {
      /* default
    generateTones: true,
    stepTonesBy10: false,
    inverseSteps: true,
    generateShortcut: false,
    extendExistingColors: true, */
      stepTonesBy10: true,
      inverseSteps: false,
    }),
  ],
}
