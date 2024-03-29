/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gyeonggi: ["gyeonggi", "sans-serif"],
        "gyeonggi-bold": ["gyeonggi-bold", "sans-serif"],
      },

      width: {
        content: "1080px",
      },
    },
  },
  plugins: [],
};
