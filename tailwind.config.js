/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: '#464646',
        primary: '#D5564D',
        light: '#FE6151',
        dark: '#CC2222',
        darker: '#841818',
        secondary: '#F2CF76',
        placeholder: '#9ca3af',
      },
      spacing: {
        128: '32rem',
        144: '40rem',
      },
      gridTemplateColumns: {
        layout: '400px 0.75rem 1fr',
        eventdetail: 'minmax(300px, 1fr) 2fr',
        event: '30px 1fr',
        sideNavigationButton: '1.25rem minmax(100px, 1fr)',
      },
      gridTemplateRows: {
        organizationfocus: '1fr 150px',
      },
      brightness: {
        80: '.80',
        85: '.85',
      },
      opacity: {
        10: '.10',
        20: '.20',
      },
    },
  },
  plugins: [],
};
