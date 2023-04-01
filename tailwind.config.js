/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontSize: {
        "5xl": ["3rem", { lineHeight: "3rem" }],
        "6xl": ["3.75rem", { lineHeight: "3.75rem" }],
        "7xl": ["4.5rem", { lineHeight: "4.5rem" }],
        "8xl": ["6rem", { lineHeight: "6rem" }],
        "9xl": ["8rem", { lineHeight: "8rem" }],
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
