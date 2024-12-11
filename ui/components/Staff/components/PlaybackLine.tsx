import { memo } from "react";

interface PlaybackLineProps {
	position: number;
	isPlaying: boolean;
	row: number;
	currentRow: number;
}

function PlaybackLine({
	position,
	isPlaying,
	row,
	currentRow,
}: PlaybackLineProps) {
	const isActiveRow = row === currentRow;

	return (
		<div
			className={`absolute h-[calc(100%-60px)] transition-opacity duration-300 ${
				isPlaying && isActiveRow ? "opacity-100" : "opacity-0"
			}`}
			style={{
				transform: `translateX(${position}px)`,
				willChange: "transform",
				zIndex: 2,
				width: "3px",
				background:
					"linear-gradient(to bottom, transparent 0%, var(--playback-line) 20%, var(--playback-line) 80%, transparent 100%)",
				boxShadow: "0 0 8px var(--playback-glow)",
			}}
		/>
	);
}

export default memo(PlaybackLine);
