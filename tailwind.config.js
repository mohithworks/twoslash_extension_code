/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/pages/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
		colors: {
			indigo: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a" },
			orange: { "50": "#eff6ff", "100": "#F9CF9A", "600": "#F58F0F", "800": "#D57C0E" },
		},
		fontFamily: {
			'body': [
				'DMSans', 
			],
			'sans': [
				'DMSans', 
			]
		}
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

