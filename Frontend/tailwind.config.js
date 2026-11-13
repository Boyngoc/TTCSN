/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pitch: {
          50: '#f0fdf4',
          100: '#dcfce7',
          300: '#86efac',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
        },
      },
      boxShadow: {
        card: '0 16px 48px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
