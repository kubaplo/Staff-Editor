import { useState } from "react";

interface TrashContainerProps {
	onDrop: (noteId: string) => void;
	isNoteDragging: boolean;
}

export default function TrashContainer({
	onDrop,
	isNoteDragging,
}: TrashContainerProps) {
	const [isDragOver, setIsDragOver] = useState(false);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = () => {
		setIsDragOver(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);

		try {
			const data = JSON.parse(e.dataTransfer.getData("application/json"));
			if (data.type === "existing-note" && data.noteId) {
				onDrop(data.noteId);
			}
		} catch (error) {
			console.error("Error handling drop in trash:", error);
		}
	};

	return (
		<div
			title="Delete note/rest"
			className={`w-32 h-16 border-2 rounded-lg flex items-center justify-center transition-all duration-200 ${
				isDragOver
					? "border-red-500 bg-red-100 scale-110"
					: isNoteDragging
					? "border-red-200 bg-red-50"
					: "border-gray-300 hover:border-gray-400"
			}`}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className={`w-8 h-8 transition-colors duration-200 ${
					isDragOver
						? "text-red-500"
						: isNoteDragging
						? "text-red-300"
						: "text-gray-400"
				}`}
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
				/>
			</svg>
		</div>
	);
}
