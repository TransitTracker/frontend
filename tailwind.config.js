/** @type {import('tailwindcss').Config} */

const m3 = require('tailwind-m3-colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class', "[class~='theme--dark']"],
  prefix: 'tw-',
  content: [`components/tw/**/*.vue`, `components/VehicleSheet/**/*.vue`],
  theme: {
    extend: {
      keyframes: {
        navbar: {
          '0%': { width: '50%' },
          '100%': { width: '100%' },
        },
      },
      opacity: {
        8: '.08',
        12: '.12',
        16: '.16',
      },
    },
    fontFamily: {
      sans: ['Figtree', ...defaultTheme.fontFamily.sans],
    },
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
