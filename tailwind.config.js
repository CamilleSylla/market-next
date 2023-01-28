/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "5px 5px 0px 0px #06517F",
        "custom-effect":
          "0px 0px 0px 0px #06517F",
      },
      colors: {
        "primary-color":
          "var(--primary-color)",
        "secondary-color":
          "var(--secondary-color)",
        "third-color": "var(--third-color)",
        "main-white": "var(--white)",
      },
    },
  },
  plugins: [],
};
