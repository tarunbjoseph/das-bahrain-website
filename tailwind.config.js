/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        das: {
          950: '#070a0e',
          900: '#0d131a',
          850: '#121a24',
          800: '#182230',
          700: '#233042',
          600: '#33445c',
        },
        brand: {
          green: '#22c55e',
          lightgreen: '#4ade80',
          lime: '#84cc16',
          emerald: '#10b981',
          gold: '#eab308',
          red: '#e11d48',
          blue: '#2563eb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        arabic: ['Cairo', 'Noto Sans Arabic', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
