/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'laptop': '1024px',
            ...defaultTheme.screens,
        },
        extend: {
            colors: {
                'primary': '#facc15',
                'secondary': '#fcd34d',
                'dark': '#161d31',
                'dark-muted': '#283046',
                'violet': '#facc15'
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: false,
        rtl: false,
        prefix: "",
        darkTheme: "dark",
    },
}
