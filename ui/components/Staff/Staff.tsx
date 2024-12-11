"use client";

import { useEffect } from "react";
import TrebleClef from "@/ui/svg/Rests/TrebleClef";
import { StaffProps } from "@/ui/components/Staff/utils/types";
import { useStaffDragAndDrop } from "@/ui/components/Staff/hooks/useStaffDragAndDrop";
import { useStaffPlayback } from "@/ui/components/Staff/hooks/useStaffPlayback";
import { createIconsMap } from "@/ui/components/Staff/utils/utils";
import { audioPlayer } from "@/ui/components/Staff/utils/audio";

// Components
import StaffLines from "@/ui/components/Staff/components/StaffLines";
import PlaybackLine from "@/ui/components/Staff/components/PlaybackLine";
import PreviewLine from "@/ui/components/Staff/components/PreviewLine";
import Note from "@/ui/components/Staff/components/Note";

export default function Staff({
	notes: noteIcons,
	rests: restIcons,
	isPlaying,
	onPlaybackChange,
	speed = 1,
	shouldReset,
	volume = 100,
	savedNotes,
	onNotesChange,
	onDraggedNoteChange,
}: StaffProps) {
	const ICONS = createIconsMap(noteIcons, restIcons);

	const { playbackPosition, currentlyPlayingNotes, currentRow } =
		useStaffPlayback(
			isPlaying,
			savedNotes,
			speed,
			onPlaybackChange,
			shouldReset
		);

	const {
		previewLine,
		draggedNote,
		handlers: {
			handleDragOver,
			handleDragLeave,
			handleNoteDragStart,
			handleDrop,
			handleDragEnd,
		},
	} = useStaffDragAndDrop(
		savedNotes,
		onNotesChange,
		playbackPosition,
		noteIcons,
		restIcons,
		currentRow
	);

	// Update parent's draggedNote state
	useEffect(() => {
		onDraggedNoteChange(draggedNote);
	}, [draggedNote, onDraggedNoteChange]);

	// Update audio volume when prop changes
	useEffect(() => {
		if (typeof volume === "number") {
			audioPlayer.setVolume(volume / 100);
		}
	}, [volume]);

	return (
		<div className="flex flex-col items-center gap-4">
			<div className="flex flex-col gap-8">
				{/* First Row */}
				<div className="relative w-[1200px] h-[300px] p-10">
					<TrebleClef className="absolute h-[240px] w-auto fill-dark left-[15px] top-1/2 -translate-y-1/2" />
					<StaffLines />
					<PreviewLine preview={previewLine} row={0} currentRow={currentRow} />
					<PlaybackLine
						position={playbackPosition}
						isPlaying={isPlaying}
						row={0}
						currentRow={currentRow}
					/>

					{/* Drop area for first row */}
					<div
						className="absolute inset-0"
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						data-row="0"
					>
						{savedNotes
							.filter((note) => note.row === 0)
							.map((note) => {
								const Icon =
									ICONS[note.category as keyof typeof ICONS][
										note.variant as keyof (typeof ICONS)["Notes"]
									];

								return (
									<Note
										key={note.id}
										note={note}
										Icon={Icon}
										isPlaying={currentlyPlayingNotes.has(note.id)}
										onDragStart={handleNoteDragStart}
										onDragEnd={handleDragEnd}
									/>
								);
							})}
					</div>
				</div>

				{/* Second Row */}
				<div className="relative w-[1200px] h-[300px] p-10">
					<StaffLines />
					<PreviewLine preview={previewLine} row={1} currentRow={currentRow} />
					<PlaybackLine
						position={playbackPosition}
						isPlaying={isPlaying}
						row={1}
						currentRow={currentRow}
					/>

					{/* Drop area for second row */}
					<div
						className="absolute inset-0"
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						data-row="1"
					>
						{savedNotes
							.filter((note) => note.row === 1)
							.map((note) => {
								const Icon =
									ICONS[note.category as keyof typeof ICONS][
										note.variant as keyof (typeof ICONS)["Notes"]
									];

								return (
									<Note
										key={note.id}
										note={note}
										Icon={Icon}
										isPlaying={currentlyPlayingNotes.has(note.id)}
										onDragStart={handleNoteDragStart}
										onDragEnd={handleDragEnd}
									/>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
}
