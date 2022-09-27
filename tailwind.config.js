/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:"jit",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        body:["Mulish", "sans-serif"]
      },
      gridTemplateColumns: {
        // added new 4 column grid as new4
        'grid5': 'repeat(5, min(420px))',
        'list20': 'repeat(20, 1fr)'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')
  ],
}
