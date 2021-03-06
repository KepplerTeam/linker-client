/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
      './context/**/*.{js,jsx,ts,tsx}',
    ],
    // defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
  darkMode: 'media', // 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    backgroundImage: (theme) => ({
      'landing-background': "url('../public/landing-background.png')",
      'login-background': "url('../public/login-background.png')",
    }),

    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    extend: {
      colors: {
        primary: {
          // VERDE PRINCIPAL
          100: '#0ACF83',

          // GRISES
          200: '#5E5E5E',
          300: '#454545',
          400: '#2B2B2B',
          500: '#121212',

          // VERDES
          600: '#07b572',
          700: '#08a367',
        },
        secondary: {
          100: '#DCFEEA',
          200: '#AAFDCD',
          300: '#79FCAF',
          400: '#47FA92',
          500: '#15F974',
        },
      },
    },
  },
  variants: {
    extend: {
      textColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar-hide'),
  ],
};
