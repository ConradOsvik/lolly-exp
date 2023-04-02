/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "focus-ring": "0 0 0 3px rgba(32, 114, 175, 0.5)",
      },
    },
  },
  plugins: [],
};
