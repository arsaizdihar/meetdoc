const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    content: ["./public/**/*.html", "./src/**/*.jsx"],
    options: {
      safelist: ["z-20"],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: colors.sky,
        teal: colors.teal,
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
