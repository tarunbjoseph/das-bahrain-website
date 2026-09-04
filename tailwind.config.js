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
        leaf: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        brand: {
          green: '#16a34a',
          lightgreen: '#22c55e',
          leaf: '#16a34a',
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
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-slow': 'marquee 50s linear infinite',
        'ken-burns': 'kenBurns 10s ease-out forwards',
        'float': 'floatSlow 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -4px rgba(0, 0, 0, 0.07)',
        'elevated': '0 12px 35px -8px rgba(0, 0, 0, 0.12)',
        'leaf': '0 10px 30px -5px rgba(22, 163, 74, 0.25)',
      }
    },
  },
  plugins: [],
}
