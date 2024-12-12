"use client";

import { useState } from "react";
import { useLocalStorage } from "@/ui/components/Staff/hooks/useLocalStorage";
import TrashContainer from "@/ui/components/Staff/components/TrashContainer";

// Components
import Header from "@/ui/components/Header/Header";
import SelectionBox from "@/ui/components/SelectionBox/SelectionBox";
import Playback from "@/ui/components/Playback/Playback";
import Staff from "@/ui/components/Staff/Staff";
import { NoteType } from "@/ui/components/Staff/utils/types";
import Footer from "@/ui/components/Footer/Footer";
import CookiesPopup from "@/ui/components/CookiesPopup/CookiesPopup";

// Constants
import { NOTES, RESTS } from "@/ui/components/Staff/utils/constants";

//do usuniecia, na test tylko
const loadFurElise = (setNotes: (notes: NoteType[]) => void) => {
	const furEliseNotes = [
		{
			id: "note-1733957103659",
			x: 140,
			y: 81.75,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: true,
			pitch: "E5",
			row: 0,
		},
		{
			id: "note-1733957110292",
			x: 200,
			y: 99.25,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: true,
			pitch: "D5",
			row: 0,
		},
		{
			id: "note-1733957128025",
			x: 260,
			y: 81.75,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: true,
			pitch: "E5",
			row: 0,
		},
		{
			id: "note-1733957133609",
			x: 320,
			y: 99.25,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: true,
			pitch: "D5",
			row: 0,
		},
		{
			id: "note-1733957139243",
			x: 380,
			y: 81.75,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: true,
			pitch: "E5",
			row: 0,
		},
		{
			id: "note-1733957145261",
			x: 440,
			y: 67.75,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: false,
			pitch: "B4",
			row: 0,
		},
		{
			id: "note-1733957310977",
			x: 500,
			y: 99.25,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: true,
			pitch: "D5",
			row: 0,
		},
		{
			id: "note-1733957316892",
			x: 560,
			y: 116.75,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: true,
			pitch: "C5",
			row: 0,
		},
		{
			id: "note-1733957327241",
			x: 620,
			y: 85.25,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: false,
			pitch: "A4",
			row: 0,
		},
		{
			id: "note-1733957338111",
			x: 680,
			y: 125.5,
			type: "rests",
			category: "Rests",
			variant: "eighth",
			flipped: false,
			pitch: "A4",
			row: 0,
		},
		{
			id: "note-1733957342258",
			x: 820,
			y: 155.25,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: false,
			pitch: "D4",
			row: 0,
		},
		{
			id: "note-1733957346208",
			x: 880,
			y: 137.75,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: false,
			pitch: "E4",
			row: 0,
		},
		{
			id: "note-1733957352992",
			x: 940,
			y: 85.25,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: false,
			pitch: "A4",
			row: 0,
		},
		{
			id: "note-1733957370624",
			x: 1000,
			y: 67.75,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: false,
			pitch: "B4",
			row: 0,
		},
		{
			id: "note-1733957467808",
			x: 1060,
			y: 90.5,
			type: "rests",
			category: "Rests",
			variant: "eighth",
			flipped: true,
			pitch: "C5",
			row: 0,
		},
		{
			id: "note-1733957479243",
			x: 120,
			y: 136,
			type: "notes",
			category: "Notes",
			variant: "eighth",
			flipped: false,
			pitch: "E4",
			row: 1,
		},
		{
			id: "note-1733957491842",
			x: 180,
			y: 102.75,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: false,
			pitch: "G4",
			row: 1,
		},
		{
			id: "note-1733957499076",
			x: 240,
			y: 67.75,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: false,
			pitch: "B4",
			row: 1,
		},
		{
			id: "note-1733957507195",
			x: 300,
			y: 116.75,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: true,
			pitch: "C5",
			row: 1,
		},
		{
			id: "note-1733957517991",
			x: 360,
			y: 90.5,
			type: "rests",
			category: "Rests",
			variant: "eighth",
			flipped: true,
			pitch: "C5",
			row: 1,
		},
		{
			id: "note-1733957533544",
			x: 500,
			y: 136,
			type: "notes",
			category: "Notes",
			variant: "eighth",
			flipped: false,
			pitch: "E4",
			row: 1,
		},
		{
			id: "note-1733957544242",
			x: 560,
			y: 81.75,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: true,
			pitch: "E5",
			row: 1,
		},
		{
			id: "note-1733957549175",
			x: 620,
			y: 99.25,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: true,
			pitch: "D5",
			row: 1,
		},
		{
			id: "note-1733957553942",
			x: 680,
			y: 81.75,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: true,
			pitch: "E5",
			row: 1,
		},
		{
			id: "note-1733957559825",
			x: 740,
			y: 99.25,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: true,
			pitch: "D5",
			row: 1,
		},
		{
			id: "note-1733957565307",
			x: 800,
			y: 67.75,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: false,
			pitch: "B4",
			row: 1,
		},
		{
			id: "note-1733957582558",
			x: 860,
			y: 99.25,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: true,
			pitch: "D5",
			row: 1,
		},
		{
			id: "note-1733957590425",
			x: 920,
			y: 116.75,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: true,
			pitch: "C5",
			row: 1,
		},
		{
			id: "note-1733957601058",
			x: 980,
			y: 85.25,
			type: "notes",
			category: "Notes",
			variant: "quarter",
			flipped: false,
			pitch: "A4",
			row: 1,
		},
	];
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
			<Header />

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
					className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl"
				>
					Load &quot;Dla Elizy&quot; (na test, do usuniecia pozniej)
				</button>
				<CookiesPopup />
				<Footer />
			</main>
		</>
	);
}
