/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        navy: "#081B33",
        bluebrand: "#176BFF",
        greenbrand: "#18B26B",
        ink: "#102033"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(8, 27, 51, 0.11)"
      }
    }
  },
  plugins: []
};
