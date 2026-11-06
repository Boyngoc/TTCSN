/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pitch: {
          50: '#eef8f1',
          100: '#d9efdf',
          300: '#7ec49a',
          500: '#16834a',
          600: '#116b3b',
          700: '#0d5631',
          900: '#102c20',
        },
      },
      boxShadow: {
        card: '0 16px 48px rgba(16, 44, 32, 0.08)',
      },
    },
  },
  plugins: [],
}
