/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        'custom-beige': {
          DEFAULT: '#E5DCC3',
          light: '#F2EAD3',
          dark: '#D8CFB6'
        }
      }
    },
  },
  plugins: [],
};