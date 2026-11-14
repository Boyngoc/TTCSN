/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pitch: {
          50: '#edf9f1',
          100: '#d5f3e0',
          200: '#ace6c4',
          300: '#73d49f',
          400: '#3cbe7a',
          500: '#1da15f',
          600: '#0e8a4a', // Màu xanh sân cỏ tươi sáng chuẩn theo thiết kế mới
          700: '#0c723d',
          800: '#0b5c32',
          900: '#084827',
        },
      },
      boxShadow: {
        card: '0 16px 48px rgba(14, 138, 74, 0.08)',
      },
    },
  },
  plugins: [],
}
