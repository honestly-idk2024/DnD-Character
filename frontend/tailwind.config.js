/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#1e3e62',
        'secondary': '#168aad',
        'accent':'#52b69a',
      }
  },
  plugins: [],
}
}
