/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          100: '#C75B7A',
          200: '#921A40',
          300: '#D9ABAB',
          400: '#F4D9D0',
        },
      },
    },
  },
  plugins: [],
};