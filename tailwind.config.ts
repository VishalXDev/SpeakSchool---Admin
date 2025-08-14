
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9ecff',
          200: '#bde0ff',
          300: '#91cdff',
          400: '#5fb0ff',
          500: '#2b90ff',
          600: '#1670e6',
          700: '#1158b4',
          800: '#0e478f',
          900: '#0c3b75'
        }
      },
      boxShadow: {
        soft: '0 10px 25px -10px rgba(0,0,0,0.15)'
      },
      borderRadius: {
        '2xl': '1rem'
      }
    }
  },
  plugins: []
} satisfies Config
