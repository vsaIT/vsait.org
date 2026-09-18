import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sniglet)', 'sans-serif'],
      },
      colors: {
        gray: '#464646',
        brown: '#2C221C',
        brownlight: '#3B2E26',
        cream: '#FDF8F0',
        primary: '#D5564D',
        light: '#FE6151',
        dark: '#CC2222',
        darker: '#841818',
        secondary: '#F2CF76',
        tertiary: '#000',
        placeholder: '#9ca3af',
      },
      spacing: {
        128: '32rem',
        144: '40rem',
      },
      maxWidth: {
        'screen-sm': '40rem',
        'screen-md': '48rem',
        'screen-lg': '64rem',
        'screen-xl': '80rem',
        'screen-2xl': '96rem',
      },
      gridTemplateColumns: {
        layout: '25rem 0.75rem 1fr',
        eventdetail: 'minmax(18.75rem, 1fr) 2fr',
        event: '1.875rem 1fr',
        sideNavigationButton: '1.25rem minmax(7.5rem, 1fr)',
      },
      gridTemplateRows: {
        organizationfocus: '1fr 9.375rem',
      },
      brightness: {
        80: '.80',
        85: '.85',
      },
      opacity: {
        10: '.10',
        20: '.20',
      },
      transitionDuration: {
        1200: '1200ms',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-0.75rem)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1.25rem)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
