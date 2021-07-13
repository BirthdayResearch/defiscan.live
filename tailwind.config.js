module.exports = {
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#ff00af',
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
