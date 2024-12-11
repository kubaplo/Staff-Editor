"use client";

// Icons
import Beginning from "@/ui/svg/Playback/Beginning";
import Play from "@/ui/svg/Playback/Play";
import Pause from "@/ui/svg/Playback/Pause";
import Stop from "@/ui/svg/Playback/Stop";

type PlaybackProps = {
	onPlaybackChange: (playing: boolean, shouldReset: boolean) => void;
	onSpeedChange: (speed: number) => void;
	speed: number;
	isPlaying: boolean;
	volume: number;
	onVolumeChange: (volume: number) => void;
};

export default function Playback({
	onPlaybackChange,
	onSpeedChange,
	speed,
	isPlaying,
	volume = 100,
	onVolumeChange,
}: PlaybackProps) {
	const handlePlayPause = () => {
		const newState = !isPlaying;
		onPlaybackChange(newState, false);
	};

	const handleStop = () => {
		onPlaybackChange(false, true);
	};

	const handleBeginning = () => {
		onPlaybackChange(false, true);
	};

	const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onSpeedChange(Number(e.target.value));
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseInt(e.target.value);
		if (onVolumeChange) {
			onVolumeChange(newVolume);
		}
	};

	return (
		<div className="flex flex-col items-center gap-y-5">
			<label className="text-2xl text-center font-bold">Playback control</label>
			<div className="flex flex-col items-center gap-y-4">
				<div className="flex justify-center items-center gap-x-10">
					<button
						onClick={handleBeginning}
						className="flex justify-center items-center size-10"
					>
						<Beginning className="size-full fill-dark hover:fill-secondary transition-all" />
					</button>
					<button
						onClick={handlePlayPause}
						className="flex justify-center items-center size-10"
					>
						{isPlaying ? (
							<Pause className="size-full fill-dark hover:fill-secondary transition-all" />
						) : (
							<Play className="size-full fill-dark hover:fill-secondary transition-all" />
						)}
					</button>
					<button
						onClick={handleStop}
						className="flex justify-center items-center size-12"
					>
						<Stop className="size-full fill-dark hover:fill-secondary transition-all" />
					</button>
				</div>
				<div className="flex items-center gap-x-3">
					<label className="text-sm font-medium">Speed:</label>
					<select
						value={speed}
						onChange={handleSpeedChange}
						className="px-3 py-1 rounded border-2 border-dark bg-white text-sm"
					>
						<option value={0.5}>0.5x</option>
						<option value={1}>1x</option>
						<option value={1.5}>1.5x</option>
						<option value={2}>2x</option>
					</select>
				</div>
				<div className="flex items-center gap-x-3">
					<label className="text-sm font-medium">Volume: {volume}%</label>
					<input
						type="range"
						min="0"
						max="100"
						value={volume}
						onChange={handleVolumeChange}
						className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
					/>
				</div>
			</div>
		</div>
	);
}
