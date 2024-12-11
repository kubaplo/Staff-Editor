import { useState } from "react";
import {
	NoteType,
	PreviewLineType,
	StaffProps,
	ExistingNoteDragData,
	NewNoteDragData,
} from "@/ui/components/Staff/utils/types";
import {
	STAFF_CONSTANTS,
	REST_SPACING,
} from "@/ui/components/Staff/utils/constants";
import { getClosestPosition } from "@/ui/components/Staff/utils/utils";

export function useStaffDragAndDrop(
	notes: NoteType[],
	setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>,
	playbackPosition: number,
	noteIcons: StaffProps["notes"],
	restIcons: StaffProps["rests"],
	currentRow: number
) {
	const [previewLine, setPreviewLine] = useState<PreviewLineType>(null);
	const [draggedNote, setDraggedNote] = useState<string | null>(null);

	const handleDragEnd = () => {
		setDraggedNote(null);
		setPreviewLine(null);
	};

	const isPositionValid = (
		x: number,
		row: number,
		noteId: string | null = null
	) => {
		if (
			row === currentRow &&
			x < playbackPosition + STAFF_CONSTANTS.PLAYBACK_LINE_SPACING
		) {
			return false;
		}

		return !notes.some((note) => {
			if (note.id === noteId) return false;
			if (note.row !== row) return false;

			if (note.category === "Rests") {
				const restSpacing = REST_SPACING[note.variant] || REST_SPACING.quarter;
				const restEnd = note.x + restSpacing;
				return x >= note.x - STAFF_CONSTANTS.MIN_NOTE_SPACING && x <= restEnd;
			} else {
				return Math.abs(note.x - x) < STAFF_CONSTANTS.MIN_NOTE_SPACING;
			}
		});
	};

	const findFirstValidPosition = (
		row: number,
		noteId: string | null = null
	) => {
		const minPosition = Math.max(
			120,
			row === currentRow
				? playbackPosition + STAFF_CONSTANTS.PLAYBACK_LINE_SPACING
				: 120
		);

		const rowElements = notes
			.filter((note) => note.row === row && note.id !== noteId)
			.sort((a, b) => a.x - b.x);

		let currentX = minPosition;
		let lastElementEnd = minPosition;

		for (const element of rowElements) {
			// If there's enough space between the last element and current element, we can use it
			if (element.x - lastElementEnd >= STAFF_CONSTANTS.MIN_NOTE_SPACING) {
				return currentX;
			}

			if (element.category === "Rests") {
				const restSpacing =
					REST_SPACING[element.variant] || REST_SPACING.quarter;
				lastElementEnd =
					element.x + restSpacing + STAFF_CONSTANTS.MIN_NOTE_SPACING;
				currentX = lastElementEnd;
			} else {
				lastElementEnd = element.x + STAFF_CONSTANTS.MIN_NOTE_SPACING;
				currentX = lastElementEnd;
			}
		}

		return Math.min(currentX, STAFF_CONSTANTS.WIDTH - STAFF_CONSTANTS.PADDING);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		let row = parseInt((e.currentTarget as HTMLElement).dataset.row || "0", 10);
		const y = e.clientY - rect.top;

		if (y < 0 || y > rect.height) {
			setPreviewLine(null);
			return;
		}

		// Check if we need to switch to second row
		if (row === 0 && x >= STAFF_CONSTANTS.WIDTH - STAFF_CONSTANTS.PADDING * 2) {
			row = 1;
			const newX = findFirstValidPosition(1, draggedNote);

			const closestPosition = getClosestPosition(y);

			// When changing row, always show the line as valid
			const isValid = true;

			setPreviewLine({
				y: closestPosition.y,
				isValid,
				mouseX: newX,
				mouseY: y,
				row,
			});
			return;
		}

		// Normal drag over handling
		const closestPosition = getClosestPosition(y);
		const middleLineY =
			(STAFF_CONSTANTS.HEIGHT - STAFF_CONSTANTS.LINE_SPACING * 4) / 2 +
			STAFF_CONSTANTS.LINE_SPACING * 2;
		const shouldFlip = closestPosition.y < middleLineY;

		const adjustedX =
			x -
			(shouldFlip
				? STAFF_CONSTANTS.NOTE_DRAG_OFFSET.flipped
				: STAFF_CONSTANTS.NOTE_DRAG_OFFSET.normal);

		// For existing notes, always show the line as valid
		const isValid = draggedNote
			? true
			: isPositionValid(adjustedX, row, draggedNote) &&
			  x >= STAFF_CONSTANTS.PADDING &&
			  x <= STAFF_CONSTANTS.WIDTH - STAFF_CONSTANTS.PADDING;

		setPreviewLine({
			y: closestPosition.y,
			isValid,
			mouseX: x,
			mouseY: y,
			row,
		});
	};

	const handleDragLeave = (e: React.DragEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX;
		const y = e.clientY;

		if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
			setPreviewLine(null);
		}
	};

	const handleNoteDragStart = (e: React.DragEvent, noteId: string) => {
		e.stopPropagation();
		setDraggedNote(noteId);

		const originalSvg = e.currentTarget.querySelector("svg");
		const dragIcon = originalSvg?.cloneNode(true) as SVGElement;

		if (dragIcon) {
			dragIcon.style.position = "fixed";
			dragIcon.style.top = "0";
			dragIcon.style.left = "0";
			dragIcon.style.width = "40px";
			dragIcon.style.height = "auto";
			dragIcon.style.pointerEvents = "none";
			dragIcon.style.zIndex = "1000";

			document.body.appendChild(dragIcon);
			e.dataTransfer.setDragImage(dragIcon, 18, 70);

			requestAnimationFrame(() => {
				document.body.removeChild(dragIcon);
			});
		}

		e.dataTransfer.setData(
			"application/json",
			JSON.stringify({
				type: "existing-note",
				noteId: noteId,
			})
		);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();

		try {
			const data = JSON.parse(e.dataTransfer.getData("application/json"));
			const rect = e.currentTarget.getBoundingClientRect();
			const x = e.clientX - rect.left;
			let row = parseInt(
				(e.currentTarget as HTMLElement).dataset.row || "0",
				10
			);
			const y = e.clientY - rect.top;

			if (y < 0 || y > rect.height) {
				return;
			}

			// Check if we're trying to place a note too far to the right on the first row
			if (
				row === 0 &&
				x >= STAFF_CONSTANTS.WIDTH - STAFF_CONSTANTS.PADDING * 2
			) {
				// Automatically switch to second row
				row = 1;
				// Set x position to the beginning of the second row
				const newX = findFirstValidPosition(1, draggedNote);

				const closestPosition = getClosestPosition(y);
				const middleLineY =
					(STAFF_CONSTANTS.HEIGHT - STAFF_CONSTANTS.LINE_SPACING * 4) / 2 +
					STAFF_CONSTANTS.LINE_SPACING * 2;
				const shouldFlip = closestPosition.y < middleLineY;

				if (data.type === "existing-note" && draggedNote) {
					handleExistingNoteDrop(data, newX, closestPosition, shouldFlip, row);
				} else {
					handleNewNoteDrop(data, newX, closestPosition, shouldFlip, row);
				}
			} else {
				// Normal drop handling
				const closestPosition = getClosestPosition(y);
				const middleLineY =
					(STAFF_CONSTANTS.HEIGHT - STAFF_CONSTANTS.LINE_SPACING * 4) / 2 +
					STAFF_CONSTANTS.LINE_SPACING * 2;
				const shouldFlip = closestPosition.y < middleLineY;

				const newX = findFirstValidPosition(row, draggedNote);

				if (data.type === "existing-note" && draggedNote) {
					handleExistingNoteDrop(data, newX, closestPosition, shouldFlip, row);
				} else {
					handleNewNoteDrop(data, newX, closestPosition, shouldFlip, row);
				}
			}
		} catch (error) {
			console.error("Error handling drop:", error);
		} finally {
			setDraggedNote(null);
			setPreviewLine(null);
		}
	};

	const handleExistingNoteDrop = (
		data: ExistingNoteDragData,
		newX: number,
		closestPosition: ReturnType<typeof getClosestPosition>,
		shouldFlip: boolean,
		row: number
	) => {
		const isValidPosition = notes
			.filter((note) => note.id !== draggedNote && note.row === row)
			.every(
				(note) => Math.abs(note.x - newX) >= STAFF_CONSTANTS.MIN_NOTE_SPACING
			);

		if (!isValidPosition) return;

		setNotes((prev) =>
			prev.map((note) => {
				if (note.id === draggedNote) {
					const yOffset = calculateYOffset(
						note,
						shouldFlip,
						noteIcons,
						restIcons
					);

					return {
						...note,
						x: newX,
						y: closestPosition.y - yOffset * STAFF_CONSTANTS.LINE_SPACING,
						flipped: shouldFlip,
						pitch: closestPosition.pitch,
						row,
					};
				}
				return note;
			})
		);
	};

	const handleNewNoteDrop = (
		data: NewNoteDragData,
		newX: number,
		closestPosition: ReturnType<typeof getClosestPosition>,
		shouldFlip: boolean,
		row: number
	) => {
		const yOffset =
			data.category === "Notes"
				? shouldFlip
					? (data.offsets?.flipped ?? 0) * STAFF_CONSTANTS.LINE_SPACING
					: (data.offsets?.normal ?? 0) * STAFF_CONSTANTS.LINE_SPACING
				: (data.offset ?? 0) * STAFF_CONSTANTS.LINE_SPACING;

		if (
			!notes
				.filter((note) => note.row === row)
				.every(
					(note) => Math.abs(note.x - newX) >= STAFF_CONSTANTS.MIN_NOTE_SPACING
				)
		) {
			return;
		}

		const newNote: NoteType = {
			id: `note-${Date.now()}`,
			x: newX,
			y: closestPosition.y - yOffset,
			type: data.type,
			category: data.category,
			variant: data.variant,
			flipped: shouldFlip,
			pitch: closestPosition.pitch,
			row,
		};

		setNotes((prev) => [...prev, newNote]);
	};

	const calculateYOffset = (
		note: NoteType,
		shouldFlip: boolean,
		noteIcons: StaffProps["notes"],
		restIcons: StaffProps["rests"]
	) => {
		if (note.category === "Notes") {
			const noteIcon = noteIcons.find(
				(n) => n.name.split(" ")[0].toLowerCase() === note.variant
			);
			return shouldFlip
				? noteIcon?.offsets?.flipped ?? 0
				: noteIcon?.offsets?.normal ?? 0;
		} else {
			const restIcon = restIcons.find(
				(r) => r.name.split(" ")[0].toLowerCase() === note.variant
			);
			return restIcon?.offset ?? 0;
		}
	};

	return {
		previewLine,
		draggedNote,
		handlers: {
			handleDragOver,
			handleDragLeave,
			handleNoteDragStart,
			handleDrop,
			handleDragEnd,
		},
	};
}
