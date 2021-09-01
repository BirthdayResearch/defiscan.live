module.exports = {
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"IBM Plex Sans"', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#ff00af',
      },
      minWidth: {
        '24':'6rem',
        '56': '14rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ]
}
