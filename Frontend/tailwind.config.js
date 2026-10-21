/** @type {import('tailwindcss').Config} */

// Bảng màu xanh cỏ dùng chung cho toàn bộ giao diện.
const turf = {
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
};

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        turf,
        // Bí danh của turf: FieldCard và FieldsPage đang dùng tên pitch-*
        pitch: turf,
      },
      boxShadow: {
        card: '0 10px 30px -12px rgb(15 23 42 / 0.25)',
      },
    },
  },
  plugins: [],
}
