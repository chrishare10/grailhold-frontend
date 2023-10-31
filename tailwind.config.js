/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors : {
        gold: "#F2AE30",
        blue: "#024959",
        brown: {
          DEFAULT: "#6F4F73",
          light: "#A64F03"
        },
        purple: "#6F4F73"
      },
      minHeight: {
        'screenh': '100svh',
      },
      spacing: {
        'screenh': '100svh',
      } 
    },
    
  },
  plugins: [],
}

