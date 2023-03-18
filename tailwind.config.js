/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nanumgothic: ["nanumgothic", "sans-serif"],
        "nanumgothic-bold": ["nanumgothic-bold", "sans-serif"],
      },

      width: {
        content: "1080px",
      },
    },
  },
  plugins: [],
};
