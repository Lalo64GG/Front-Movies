const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
   "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#8E0000',
        customDarkRed: '#340A0B',
      },
      backgroundImage: theme => ({
        'custom-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
      })
    },
  },
    darkMode: "class",
  plugins: [nextui()],
}