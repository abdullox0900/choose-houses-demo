import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				blue_10: '#3889F2',
			},
			screens: {
				'max-desktop-m': { raw: '(max-width: 1280px)' },
				'max-tablet': { raw: '(max-width: 1024px)' },
				'max-tablet-m': { raw: '(max-width: 765px)' },
				'max-mobile-550': { raw: '(max-width: 550px)' },
				'max-mobile-l': { raw: '(max-width: 430px)' },
				'max-mobile-m': { raw: '(max-width: 375px)' },
			},
			borderRadius: {
				sm: '5px',
				md: '10px',
				'md-2': '15px',
				// 'xl': '1rem',
				// '2xl': '2rem',
				// '3xl': '3rem',
				// 'full': '9999px',
			},
			keyframes: {
				'bounce-slow': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20%)' },
				},
			},
			animation: {
				'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
			},
			variants: {
				extend: {
					backgroundColor: ['hover', 'active'],
					textColor: ['hover', 'active'],
					borderColor: ['hover', 'active', 'focus'],
					ringColor: ['hover', 'active', 'focus'],
					ringOpacity: ['hover', 'active', 'focus'],
					animation: ['hover', 'group-hover'],
				},
			},
		},
	},
	plugins: [],
}
export default config
