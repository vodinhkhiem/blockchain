/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "teal-primary": "#1a7f7e",
        "teal-light": "#88D8C0",
      },
    },
  },
  plugins: [],
};
