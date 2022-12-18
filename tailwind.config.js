/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#2C4CC9",
        secondary: "#0B0E16",
        lightmain: "rgba(67, 105, 253, 0.2)",
        verylightmain: "rgba(67, 105, 253, 0.05)",
      },
    },
  },
  plugins: [],
};
