export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pine: {
          950: '#041d18',
          900: '#08332c',
          850: '#0c3d35',
          800: '#104b40',
          700: '#186355',
          600: '#237e6e',
          500: '#329d8b',
          400: '#4dbda9',
          300: '#7bd9c7',
          200: '#adf0e3',
          100: '#d7faf2',
          50: '#f0fdf9',
        },
        sage: {
          50: '#f6f8f6',
          100: '#edf2ed',
          200: '#d9eedf',
          300: '#c5e2cc',
          400: '#9ecbb0',
          500: '#6ea884',
        },
        aqi: {
          good: '#00b050',
          satisfactory: '#92d050',
          moderate: '#ffff00',
          poor: '#ff9900',
          verypoor: '#ff0000',
          severe: '#7030a0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
