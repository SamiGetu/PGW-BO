/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"], // Add your font stack here
      },
      colors: {
        primary: "#F58634", // Define primary color
        secondary: "#3E4095", // Define secondary color
      },
    },
  },
  plugins: [require("daisyui")],
};
