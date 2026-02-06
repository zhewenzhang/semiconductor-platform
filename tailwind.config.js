/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#d9e4ff',
          200: '#adc8ff',
          300: '#85a5ff',
          400: '#5976ff',
          500: '#3646fc',
          600: '#2b35cf',
          700: '#2229a3',
          800: '#1e217c',
          900: '#1c1f5e',
        },
        dark: {
          100: '#1a1a2e',
          200: '#16162a',
          300: '#12121f',
          400: '#0e0e16',
          500: '#0a0a0f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
