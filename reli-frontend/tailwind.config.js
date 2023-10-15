/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'primary': '#3f1f69',
      'secondary': '#0099bc',
      'grey' : '#505061',
      'fall' : '#C24B29',
      'white' : '#e2e1db'
    },
    fontFamily : {
      'sans' : ['Roboto', 'sans-serif'],
      'serif' : ['Roboto Slab', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '.125rem',
        DEFAULT: '.25rem',
        'lg': '.5rem',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}

