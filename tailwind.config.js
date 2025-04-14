/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif']
      },
      colors: {
        // Define tus colores personalizados para modo claro y oscuro
        primary: {
          theme_orage:"#FF6900",
          theme_purple:"#7B00F7",
          theme_maguenta:"#AE1857",
          theme_cian:"#1976D2",
          theme_mint_green:"#B4DAD1",
          theme_light: '#4F46E5', // color para modo claro
          theme_dark: '#6366F1'   // color para modo oscuro
        }
      }

    },
  },
  plugins: [],
}