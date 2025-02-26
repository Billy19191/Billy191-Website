import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	keyframes: {
  		'accordion-down': {
  			from: {
  				height: '0'
  			},
  			to: {
  				height: 'var(--radix-accordion-content-height)'
  			}
  		},
  		'accordion-up': {
  			from: {
  				height: 'var(--radix-accordion-content-height)'
  			},
  			to: {
  				height: '0'
  			}
  		},
  		slowfade: {
  			from: {
  				opacity: '0'
  			},
  			to: {
  				opacity: '1'
  			}
  		},
  		slideup: {
  			from: {
  				opacity: '0',
  				transform: 'translateY(25%)'
  			},
  			to: {
  				opacity: '1',
  				transform: 'none'
  			}
  		},
  		slidedown: {
  			from: {
  				opacity: '0',
  				transform: 'translateY(-25%)'
  			},
  			to: {
  				opacity: '1',
  				transform: 'none'
  			}
  		},
  		slideleft: {
  			from: {
  				opacity: '0',
  				transform: 'translateX(-20%)'
  			},
  			to: {
  				opacity: '1',
  				transform: 'translateX(0)'
  			}
  		},
  		slideright: {
  			from: {
  				opacity: '0',
  				transform: 'translateX(20%)'
  			},
  			to: {
  				opacity: '1',
  				transform: 'translateX(0)'
  			}
  		},
  		wave: {
  			'0%': {
  				transform: 'scale(0)'
  			},
  			'50%': {
  				transform: 'scale(1)'
  			},
  			'100%': {
  				transform: 'scale(0)'
  			}
  		}
  	},
  	animation: {
  		'accordion-down': 'accordion-down 0.2s ease-out',
  		'accordion-up': 'accordion-up 0.2s ease-out',
  		slideup: 'slideup 0.5s ease-in-out',
  		slidedown: 'slidedown 0.5s ease-in-out',
  		slideleft: 'slideleft 0.5s ease-in-out',
  		slideright: 'slideright 0.5s ease-in-out',
  		wave: 'wave 0.5s linear infinite',
  		slowfade: 'slowfade 0.5s ease-in-out'
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
