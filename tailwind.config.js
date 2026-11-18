/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#06090e',
          900: '#0a0f18',
          850: '#0f1726',
          800: '#141f33',
          700: '#1c2b45',
        },
        sky: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        }
      },
      fontFamily: {
        sans: ['"Orenza Bold"', '"Orenza"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Orenza Bold"', '"Orenza"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Orenza Bold"', '"Orenza"', '"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
