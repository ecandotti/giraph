const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html, ts, tsx}', './src/**/*'],
  theme: {
    fontFamily: {
      monderatRegular: ['"Moderat-Regular"', 'sans-serif'],
      monderatBold: ['"Moderat-Bold"', 'sans-serif']
    },
    extend: {
      colors: {
        searchBlue: '#d9d9d959'
      }
    }
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme('fontSize.2xl') },
        h2: { fontSize: theme('fontSize.xl') },
        h3: { fontSize: theme('fontSize.lg') }
      })
    })
  ]
}
