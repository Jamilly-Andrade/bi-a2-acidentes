/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif'],
      },
      colors: {
        blood: {
          950: '#1a0303',
          900: '#330505',
          800: '#5a0a0a',
          700: '#8b0e0e',
          600: '#c51616',
          500: '#e52b2b',
        }
      }
    },
  },
  plugins: [],
}
