/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold:        '#D8A444',
          'gold-dark': '#B4952E',
          dark:        '#1A1A1A',
          charcoal:    '#2C2C2C',
          stone:       '#F5F0E8',
        }
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
