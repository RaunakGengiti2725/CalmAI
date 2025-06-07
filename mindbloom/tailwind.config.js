/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lavender: '#E6E6FA',
        peach: '#FFDAB9',
        green: '#C8E6C9',
      },
      fontFamily: {
        rounded: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

