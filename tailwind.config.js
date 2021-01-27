module.exports = {
  purge: {
    enabled: true,
    content: ["./public/*.html", "./public/*.js"],
    options: {
      safelist: ["border-8"],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
