/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: '#2B3241',
        secondary: '#171A1F',
        accent: '#2462C5',
        blueGray: {
          200: '#D7DFE9',
        },
        coolGray: {
          800: '#243642',
        },
      },
    },
  },
  plugins: [],
};
