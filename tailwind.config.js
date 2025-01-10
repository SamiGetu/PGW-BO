/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#F58634",
        secondary: "#3E4095",
      },
      textColor: {
        primary: "#F58634",
        secondary: "#3E4095",
      },
      borderColor: {
        primary: "#F58634",
        secondary: "#3E4095",
      },
    },
  },
  plugins: [],
};
