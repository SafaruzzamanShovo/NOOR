// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        quran: ['"Amiri"', 'serif'],
        indoPak: ['"Scheherazade New"', 'serif'],
        lateef: ['"Lateef"', 'serif'],
      }
    }
  },
  plugins: [],
};
