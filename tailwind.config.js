/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: '#464646',
        primary: '#D5564D',
        light: '#FE6151',
        dark: '#CC2222',
        secondary: '#F2CF76',
      },
      spacing: {
        128: '32rem',
        144: '40rem',
      },
    },
  },
  plugins: [],
};
