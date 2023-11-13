/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'coolveticaLt': ['Coolvetica Light'],
        'coolveticaEl': ['Coolvetica Extra Light'],
        'coolveticaRg': ['Coolvetica'],
        'coolveticaBd': ['Coolvetica Bold'],
        'coolveticaHv': ['Coolvetica Heavy'],
        'caustenLt': ['Causten Light'],
        'caustenRg': ['Causten Regular'],
        'caustenBd': ['Causten Bold'],
        'caustenBl': ['Causten Medium'],
        'caustenEb': ['Causten Extra Bold'],
      },
    },
  },
  plugins: [],
}