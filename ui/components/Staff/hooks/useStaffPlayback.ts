import { useState, useEffect, useCallback } from "react";
import { NoteType } from "@/ui/components/Staff/utils/types";
import {
	STAFF_CONSTANTS,
	NOTE_DURATIONS,
} from "@/ui/components/Staff/utils/constants";
import { audioPlayer } from "@/ui/components/Staff/utils/audio";

export function useStaffPlayback(
	isPlaying: boolean,
	notes: NoteType[],
	speed: number,
	onPlaybackChange: (playing: boolean, shouldReset?: boolean) => void,
	shouldReset: boolean
) {
	const [playbackPosition, setPlaybackPosition] = useState<number>(
		STAFF_CONSTANTS.PADDING
	);
	const [currentRow, setCurrentRow] = useState<number>(0);
	const [, setPlayedNotes] = useState<Set<string>>(new Set());
	const [currentlyPlayingNotes, setCurrentlyPlayingNotes] = useState<
		Set<string>
	>(new Set());

	const handlePlayback = useCallback(
		(playing: boolean, shouldReset: boolean = false) => {
			if (onPlaybackChange) {
				onPlaybackChange(playing, shouldReset);
			}

			if (shouldReset) {
				setPlaybackPosition(STAFF_CONSTANTS.PADDING);
				setCurrentRow(0);
				setPlayedNotes(new Set());
			}
		},
		[onPlaybackChange]
	);

	useEffect(() => {
		if (shouldReset) {
			setPlaybackPosition(STAFF_CONSTANTS.PADDING);
			setCurrentRow(0);
			setPlayedNotes(new Set());
		}
	}, [shouldReset]);

	useEffect(() => {
		if (!isPlaying) {
			return;
		}

		const playedNotesRef = new Set<string>();
		const startTime = performance.now();
		const startPosition = playbackPosition;
		let animationFrameId: number;

		const animate = () => {
			const elapsed = performance.now() - startTime;
			const PIXELS_PER_SECOND = 200 * speed;
			const newPosition = startPosition + (elapsed / 1000) * PIXELS_PER_SECOND;

			if (newPosition >= STAFF_CONSTANTS.WIDTH - STAFF_CONSTANTS.PADDING * 2) {
				if (currentRow === 0) {
					// Move to second row
					setCurrentRow(1);
					setPlaybackPosition(STAFF_CONSTANTS.PADDING);
				} else {
					// End of second row - stop playback and reset
					handlePlayback(false, true);
				}
				return;
			}

			const currentRowNotes = notes.filter((note) => note.row === currentRow);
			currentRowNotes.forEach((note) => {
				if (
					!playedNotesRef.has(note.id) &&
					note.x <= newPosition &&
					note.x > newPosition - PIXELS_PER_SECOND / 60
				) {
					// Get note duration based on variant
					const duration =
						NOTE_DURATIONS[note.variant] || NOTE_DURATIONS.quarter;

					if (note.category === "Notes" && note.pitch) {
						// Play the note sound with appropriate duration
						audioPlayer.playNote(note.pitch, duration / speed);
					}

					console.log(`${note.category} to play:`, {
						type: note.category,
						variant: note.variant,
						name: `${note.variant} ${note.category}`,
						pitch: note.pitch,
						row: note.row,
						duration: duration,
					});

					playedNotesRef.add(note.id);

					// Add note or rest to currently playing items
					setCurrentlyPlayingNotes((prev) => {
						const newSet = new Set(prev);
						newSet.add(note.id);
						return newSet;
					});

					// Calculate visual duration for both notes and rests
					const visualDuration = (duration * 1000) / speed;

					// Remove note/rest from playing items after its duration
					setTimeout(() => {
						setCurrentlyPlayingNotes((prev) => {
							const newSet = new Set(prev);
							newSet.delete(note.id);
							return newSet;
						});
					}, visualDuration);
				}
			});

			setPlaybackPosition(newPosition);
			animationFrameId = requestAnimationFrame(animate);
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
		};
	}, [isPlaying, notes, handlePlayback, speed, playbackPosition, currentRow]);

	return {
		playbackPosition,
		currentlyPlayingNotes,
		currentRow,
		handlePlayback,
	};
}
