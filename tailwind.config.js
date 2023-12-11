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
        purple: "#540032",
        gColorOne: "#F0433A",
        gColorTwo: "#8C4A62",
        gColorThree: "#005C53"
      },
      minHeight: {
        'screenh': '100svh',
      },
      maxWidth: {
        'wickedSmall': '13rem',
      },
      spacing: {
        'screenh': '100svh',
      },
      animation: {
        'pulse-once': 'pulse 1s linear',
      }

    },
    
  },
  plugins: [],
}

