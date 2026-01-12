/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          primary: '#90AB8B', // Primary green
          secondary: '#5A7863', // Secondary dark green
          dark: '#3B4953', // Dark slate
        }
      }
    },
  },
  plugins: [],
}
