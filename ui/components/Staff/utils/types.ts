import { IconPropsType } from "@/lib/types/IconPropsType";

type NoteType = {
	id: string;
	x: number;
	y: number;
	type: string;
	category: "Notes" | "Rests";
	variant: string;
	flipped: boolean;
	pitch?: string;
	row: number;
};

type PreviewLineType = {
	y: number;
	isValid: boolean;
	mouseX: number;
	mouseY: number;
	row?: number;
} | null;

type StaffProps = {
	notes: {
		name: string;
		icon: React.ElementType<IconPropsType>;
		offsets?: {
			normal: number;
			flipped: number;
		};
		offset?: number;
	}[];
	rests: {
		name: string;
		icon: React.ElementType<IconPropsType>;
		offset?: number;
	}[];
	isPlaying: boolean;
	onPlaybackChange: (playing: boolean, shouldReset?: boolean) => void;
	speed?: number;
	shouldReset: boolean;
	volume?: number;
	savedNotes: NoteType[];
	onNotesChange: React.Dispatch<React.SetStateAction<NoteType[]>>;
	onDraggedNoteChange: (noteId: string | null) => void;
};

export interface ExistingNoteDragData {
	type: "existing-note";
	noteId: string;
}

export interface NewNoteDragData {
	type: string;
	category: "Notes" | "Rests";
	name: string;
	variant: string;
	offsets?: {
		normal: number;
		flipped: number;
	};
	offset?: number;
}

export type DragData = ExistingNoteDragData | NewNoteDragData;
export type { NoteType, PreviewLineType, StaffProps };
