"use client";

import { useState } from "react";
import { useLocalStorage } from "@/ui/components/Staff/hooks/useLocalStorage";
import TrashContainer from "@/ui/components/Staff/components/TrashContainer";
import { musicExporter } from "@/ui/components/Staff/hooks/musicExporter";

// Components
import Header from "@/ui/components/Header/Header";
import SelectionBox from "@/ui/components/SelectionBox/SelectionBox";
import Playback from "@/ui/components/Playback/Playback";
import Staff from "@/ui/components/Staff/Staff";
import { NoteType } from "@/ui/components/Staff/utils/types";
import Footer from "@/ui/components/Footer/Footer";
import CookiesPopup from "@/ui/components/CookiesPopup/CookiesPopup";
import ExportMidi from "@/ui/svg/ExportMidi";
import ExportWav from "@/ui/svg/ExportWav";

// Constants
import {
	NOTES,
	RESTS,
	furEliseNotes,
} from "@/ui/components/Staff/utils/constants";

//do usuniecia, na test tylko
const loadFurElise = (setNotes: (notes: NoteType[]) => void) => {
	localStorage.setItem("savedNotes", JSON.stringify(furEliseNotes));
	setNotes(furEliseNotes as NoteType[]);
};

export default function Home() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [playbackSpeed, setPlaybackSpeed] = useState(1);
	const [shouldResetPlayback, setShouldResetPlayback] = useState(false);
	const [volume, setVolume] = useState(100);
	const { notes, setNotes, clearNotes } = useLocalStorage();
	const [draggedNote, setDraggedNote] = useState<string | null>(null);

	const handlePlaybackChange = (
		playing: boolean,
		shouldReset: boolean = false
	) => {
		setIsPlaying(playing);
		setShouldResetPlayback(shouldReset);
	};

	const handleNoteDelete = (noteId: string) => {
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
		setDraggedNote(null);
	};

	const handleClearNotes = () => {
		clearNotes();
		if (isPlaying) {
			handlePlaybackChange(false, true);
		}
	};

	return (
		<>
			<Header notes={notes} setNotes={setNotes} clearNotes={clearNotes} />

			{/* Trzbea dodac to tlo svg  */}
			<main className="flex flex-col items-center gap-y-20 w-full min-h-screen bg-primary pt-32">
				<div className="sticky top-24 z-10 w-full bg-primary ">
					<div className="flex flex-col items-center gap-6">
						<div className="flex justify-center items-center gap-10">
							<SelectionBox title="Notes" items={NOTES} />
							<div className="flex flex-col items-center gap-4">
								<button
									onClick={handleClearNotes}
									className="h-16 w-32 bg-dark text-white rounded-lg hover:bg-secondary font-bold transition-colors"
								>
									Clear whole staff
								</button>
								<TrashContainer
									onDrop={handleNoteDelete}
									isNoteDragging={draggedNote !== null}
								/>
							</div>
							<SelectionBox title="Rests" items={RESTS} />
						</div>
					</div>
				</div>
				<Staff
					notes={NOTES}
					rests={RESTS}
					isPlaying={isPlaying}
					speed={playbackSpeed}
					onPlaybackChange={handlePlaybackChange}
					shouldReset={shouldResetPlayback}
					volume={volume}
					savedNotes={notes}
					onNotesChange={setNotes}
					onDraggedNoteChange={setDraggedNote}
				/>
				<div className="flex justify-center items-center">
					<Playback
						onPlaybackChange={handlePlaybackChange}
						onSpeedChange={setPlaybackSpeed}
						speed={playbackSpeed}
						isPlaying={isPlaying}
						volume={volume}
						onVolumeChange={setVolume}
					/>
				</div>
				<button
					onClick={() => loadFurElise(setNotes)}
					className="bg-dark hover:bg-hover text-white font-bold py-2 px-4 rounded-xl"
				>
					Load &quot;Für Elise&quot; song
				</button>
				<CookiesPopup />
				<Footer />
			</main>
		</>
	);
}
