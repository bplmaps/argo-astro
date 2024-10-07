/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1440px',
		},
		colors: {
			inherit: 'inherit',
			current: 'currentcolor',
			transparent: 'transparent',
			black: '#000000',
			white: '#ffffff',
			gray: {
				50: '#fcfcfc',
				100: '#e7e7e7',
				200: '#d1d1d1',
				300: '#b0b0b0',
				400: '#888888',
				500: '#707070',
				600: '#5d5d5d',
				700: '#4f4f4f',
				800: '#454545',
				900: '#3d3d3d',
				950: '#262626',
			},
			bismark: {
				50: '#f3f7f8',
				100: '#dfe9ee',
				200: '#c3d6de',
				300: '#9ab9c6',
				400: '#6994a7',
				500: '#4e798d',
				600: '#436477',
				700: '#3b5363',
				800: '#364854',
				900: '#313e48',
				950: '#1d272f',
			},
			clementine: {
				50: '#fff9ec',
				100: '#fff1d3',
				200: '#ffdfa6',
				300: '#ffc76d',
				400: '#ffa333',
				500: '#ff860b',
				600: '#ea6501',
				700: '#cb4e03',
				800: '#a13e0b',
				900: '#81340d',
				950: '#461804',
			},
			crimson: {
				50: '#fff0f3',
				100: '#ffdde4',
				200: '#ffc1ce',
				300: '#ff95ac',
				400: '#ff597d',
				500: '#ff2655',
				600: '#fc063c',
				700: '#d8002f',
				800: '#af052a',
				900: '#900c29',
				950: '#500011',
			},
		},
		fontFamily: {
			sans: [
				'basic-sans',
				'ui-sans-serif',
				'system-ui',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
				'"Noto Color Emoji"',
			],
			heading: [
				'mokoko-variable',
				'ui-sans-serif',
				'system-ui',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
				'"Noto Color Emoji"',
			],
			mono: [
				...defaultTheme.fontFamily.mono
			]
		},
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						a: {
							color: theme('colors.bismark.600'),
							"text-decoration-color": theme('colors.bismark.200'),
							"text-decoration-thickness": "2px"
						}
					}
				}
			})
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
