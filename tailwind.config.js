/** @type {import('tailwindcss').Config} */

module.exports = {
  content: {
    files: ["./src/**/*.{js,jsx,ts,tsx}"],
  },
  theme: {
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px'
    },
    fontFamily: {
      default: ['Kantumruy Pro', 'sans-serif']
    },
    colors: {
      'red': '#EE291B',
      'pink': '#FAD0C3',
      'black': '#0A0908',
      'tan': '#F8F3E4',
      'green': '#5B9279',
      transparent: 'transparent'
    },
    extend: {}
  },
  plugins: [],
}
