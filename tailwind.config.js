/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors : {
        gold: "#FFBD33",
        oceanDark: "#2C6491"
      } 
    },
    
  },
  plugins: [],
}

