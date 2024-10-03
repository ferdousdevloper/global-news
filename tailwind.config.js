/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 50s linear infinite',
      },
      colors: {
        colorPrimary: '#02AA08',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
