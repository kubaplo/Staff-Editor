import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./ui/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--primary)",
				secondary: "var(--secondary)",
				dark: "var(--dark)",
				inactive: "var(--inactive)",
				hover: "var(--hover)",
				"playback-line": "var(--playback-line)",
				"playback-glow": "var(--playback-glow)",
				"note-hover": "var(--note-hover)",
				"note-playing": "var(--note-playing)",
				"preview-valid": "var(--preview-valid)",
				"preview-invalid": "var(--preview-invalid)",
			},

			boxShadow: {
				header: "3px 3px 15px 5px rgba(0, 0, 0, 0.3)",
			},

			zIndex: {
				"20": "20",
				"30": "30",
			},

			height: {
				"18": "4.5rem",
			},
		},
	},
	plugins: [],
};

export default config;
