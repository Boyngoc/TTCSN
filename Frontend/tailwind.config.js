/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pitch: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac', // Xanh lá cây nhạt tươi tắn
          400: '#4ade80', // Xanh lá sáng nổi bật
          500: '#22c55e', // Xanh thể thao năng động
          600: '#16a34a', // Xanh chính cho nút bấm và tiêu đề
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
      },
      boxShadow: {
        card: '0 16px 48px rgba(34, 197, 94, 0.09)',
      },
    },
  },
  plugins: [],
}
