import { memo } from "react";
import { NoteType } from "@/ui/components/Staff/utils/types";
import { IconPropsType } from "@/lib/types/IconPropsType";

interface NoteProps {
	note: NoteType;
	Icon: React.ElementType<IconPropsType>;
	isPlaying: boolean;
	onDragStart: (e: React.DragEvent, noteId: string) => void;
	onDragEnd: () => void;
}

function Note({ note, Icon, isPlaying, onDragStart, onDragEnd }: NoteProps) {
	const shouldFlip = note.category === "Notes" ? note.flipped : false;

	return (
		<div
			title={`${note.variant} ${note.type.slice(0, note.type.length - 1)}`}
			className="absolute"
			style={{
				left: note.x,
				top: note.y,
			}}
		>
			<div
				className={`transition-all duration-500 ${
					isPlaying ? "scale-110" : ""
				}`}
				style={{
					transform: shouldFlip ? "rotate(180deg)" : "none",
				}}
			>
				<div
					draggable
					onDragStart={(e) => onDragStart(e, note.id)}
					onDragEnd={onDragEnd}
					className="cursor-move"
				>
					<Icon
						className={`h-[100px] w-auto transition-colors duration-500 ${
							isPlaying
								? "fill-note-playing"
								: "fill-dark hover:fill-note-hover"
						}`}
					/>
				</div>
			</div>
		</div>
	);
}

export default memo(Note);
