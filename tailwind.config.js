/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,vue,ts}'],
  theme: {
    extend: {
      fontFamily: {
        tech: ['"Share Tech"', 'monospace', 'sans-serif'],
        roboto: ['"Roboto Condensed"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
