/** @type {import('tailwindcss').Config} */

const m3 = require('tailwind-m3-colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class', "[class~='theme--dark']"],
  prefix: 'tw-',
  content: [
    `components/tw/**/*.vue`,
    `components/VehicleSheet/**/*.vue`,
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Figtree', ...defaultTheme.fontFamily.sans],
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
