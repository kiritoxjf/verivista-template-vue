/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      blue: '#0874FF',
      'blue-dark': '#173e67',
      white: '#fff',
      'gray-light': '#f0f2f6',
      gray: '#cfdee5',
      red: '#ED3A3A',
      yellow: '#F9CA04'
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
}
