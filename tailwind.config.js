/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        'fade-pink': '#CF8C96',
        'light-pink': '#f7eef0',
        'light-blue': '#4292FD',
        'light-yellow': '#F4E1C5',
        'light-skyblue': '#B9D4F8',
        'light-purple': '#B895BB',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif']
      },
      backgroundImage: {
        journal: 'url(./src/assets/images/glass-effect.png)'
      }
  },
  },
  plugins: [],
}

