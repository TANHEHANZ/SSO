/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'arciform': ['Arciform', 'sans-serif'],
      },
      colors: {
        primary: {
          neumo: "#e0e5ec",
          theme_orage: {
            DEFAULT: "#F9B100",    // 1365 C - c:0 m:35 y:73 k:0
            light: "#F9A84C"       // 1495 C - c:0 m:56 y:91 k:0
          },
          theme_maguenta: {
            DEFAULT: "#EA547C",    // 184 C - c:0 m:79 y:28 k:0
            dark: "#C41E3A"        // 215 C - c:23 m:98 y:36 k:15
          },
          theme_purple: {
            DEFAULT: "#482778",    // 2665 C - c:68 m:72 y:0 k:0
            dark: "#4B0082"        // Medium Purple C - c:90 m:100 y:11 k:3
          },
          theme_cian: {
            DEFAULT: "#4AC1E0",    // 2665 C - c:64 m:0 y:11 k:0
            light: "#00B7EB"       // 638 C - c:81 m:2 y:11 k:0
          },
          theme_mint_green: {
            DEFAULT: "#4FB9A8",    // 2665 C - c:66 m:0 y:42 k:0
            dark: "#00A087"        // 3278 C - c:98 m:2 y:65 k:0
          },
          backgraund: "#F6F6F8",
          black: {
            DEFAULT: "#2C2C2C",    // k:90
            light: "#4D4D4D"       // k:70
          }
        }
      }

    },
  },
  plugins: [],
}