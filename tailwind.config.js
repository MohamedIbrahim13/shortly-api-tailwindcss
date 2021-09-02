module.exports = {
  mode: "jit",
  purge: ["./*.html","./*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
		fontFamily: {
			sans: ["Poppins"],
      },
	},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
