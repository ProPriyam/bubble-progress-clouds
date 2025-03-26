import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
				bubble: {
					light: "rgba(255, 255, 255, 0.6)",
					medium: "rgba(255, 255, 255, 0.4)",
					dark: "rgba(230, 230, 230, 0.7)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-20px)" },
				},
				"pulse-light": {
					"0%, 100%": { opacity: "0.8" },
					"50%": { opacity: "1" },
				},
				"scale-in": {
					"0%": { transform: "scale(0.9)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				"scale-out": {
					"0%": { transform: "scale(1)", opacity: "1" },
					"100%": { transform: "scale(1.1)", opacity: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"fade-out": {
					"0%": { opacity: "1" },
					"100%": { opacity: "0" },
				},
				"progress-fill": {
					"0%": { width: "0%" },
					"100%": { width: "var(--progress-value)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				float: "float 6s ease-in-out infinite",
				"float-slow": "float 8s ease-in-out infinite",
				"float-slower": "float 10s ease-in-out infinite",
				"pulse-light": "pulse-light 4s ease-in-out infinite",
				"scale-in": "scale-in 0.5s ease-out",
				"scale-out": "scale-out 0.5s ease-out",
				"fade-in": "fade-in 0.5s ease-out",
				"fade-out": "fade-out 0.5s ease-out",
				"progress-fill": "progress-fill 1s ease-out forwards",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
