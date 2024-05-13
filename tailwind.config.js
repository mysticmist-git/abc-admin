/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          /* Primary: Kentucky Bluegrass */
          100: '#F2FAFF',
          200: '#C0EBFE',
          300: '#8CDCF7',
          400: '#55C9E4',
          500: '#22AABF',
          600: '#0C8E99',
          700: '#037173',
          800: '#004D49',
          900: '#002622',
        },
        accent: {
          100: '#F4FFF2',
          200: '#C7FEBA',
          300: '#9DF77F',
          400: '#76E544',
          500: '#51C210',
          600: '#459B05',
          700: '#397401',
          800: '#2A4D00',
          900: '#172600',
        },
        neutral: {
          100: '#FAFBFC',
          200: '#E8ECEE',
          300: '#D7DDDF',
          400: '#C7CED0',
          500: '#B6C0C2',
          600: '#909A9B',
          700: '#6B7474',
          800: '#464D4D',
          900: '#222626',
        },
        fontFamily: {
          manrope: ['Manrope', 'sans-serif'],
        },
      },
    },
    plugins: [],
  },
};
