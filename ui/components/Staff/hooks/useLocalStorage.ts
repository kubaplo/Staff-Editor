import { useState, useEffect } from "react";
import { NoteType } from "@/ui/components/Staff/utils/types";

//do zapisu do pliku wystarczy savedNotes, do midi i wav tez
const STORAGE_KEY = "savedNotes";

export function useLocalStorage() {
	const [notes, setNotes] = useState<NoteType[]>([]);
	const [isInitialized, setIsInitialized] = useState(false);

	//Initializing state from localStorage
	useEffect(() => {
		try {
			const savedNotes = localStorage.getItem(STORAGE_KEY);
			if (savedNotes) {
				const parsedNotes = JSON.parse(savedNotes);
				if (Array.isArray(parsedNotes)) {
					setNotes(parsedNotes);
				}
			}
		} catch (error) {
			console.error("Error loading notes from localStorage:", error);
		}
		setIsInitialized(true);
	}, []);

	//Saving notes to localStorage whenever they change
	useEffect(() => {
		if (!isInitialized) return;

		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
		} catch (error) {
			console.error("Error saving notes to localStorage:", error);
		}
	}, [notes, isInitialized]);

	const clearNotes = () => {
		setNotes([]);
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch (error) {
			console.error("Error clearing notes from localStorage:", error);
		}
	};

	return { notes, setNotes, clearNotes, isInitialized };
}
//dla elizy [{"id":"note-1733957103659","x":140,"y":81.75,"type":"notes","category":"Notes","variant":"quarter","flipped":true,"pitch":"E5","row":0},{"id":"note-1733957110292","x":200,"y":99.25,"type":"notes","category":"Notes","variant":"quarter","flipped":true,"pitch":"D5","row":0},{"id":"note-1733957128025","x":260,"y":81.75,"type":"notes","category":"Notes","variant":"quarter","flipped":true,"pitch":"E5","row":0},{"id":"note-1733957133609","x":320,"y":99.25,"type":"notes","category":"Notes","variant":"quarter","flipped":true,"pitch":"D5","row":0},{"id":"note-1733957139243","x":380,"y":81.75,"type":"notes","category":"Notes","variant":"quarter","flipped":true,"pitch":"E5","row":0},{"id":"note-1733957145261","x":440,"y":67.75,"type":"notes","category":"Notes","variant":"quarter","flipped":false,"pitch":"B4","row":0},{"id":"note-1733957310977","x":500,"y":99.25,"type":"notes","category":"Notes","variant":"quarter","flipped":true,"pitch":"D5","row":0},{"id":"note-1733957316892","x":560,"y":116.75,"type":"notes","category":"Notes","variant":"quarter","flipped":true,"pitch":"C5","row":0},{"id":"note-1733957327241","x":620,"y":85.25,"type":"notes","category":"Notes","variant":"quarter","flipped":false,"pitch":"A4","row":0},{"id":"note-1733957338111","x":680,"y":125.5,"type":"rests","category":"Rests","variant":"eighth","flipped":false,"pitch":"A4","row":0},{"id":"note-1733957342258","x":820,"y":155.25,"type":"notes","category":"Notes","variant":"quarter","flipped":false,"pitch":"D4","row":0},{"id":"note-1733957346208","x":880,"y":137.75,"type":"notes","category":"Notes","variant":"quarter","flipped":false,"pitch":"E4","row":0},{"id":"note-1733957352992","x":940,"y":85.25,"type":"notes","category":"Notes","variant":"quarter","flipped":false,"pitch":"A4","row":0},{"id":"note-1733957370624","x":1000,"y":67.75,"type":"notes","category":"Notes","variant":"quarter","flipped":false,"pitch":"B4","row":0},{"id":"note-1733957467808","x":1060,"y":90.5,"type":"rests","category":"Rests","variant":"eighth","flipped":true,"pitch":"C5","row":0},{"id":"note-1733957479243","x":120,"y":136,"type":"notes","category":"Notes","variant":"eighth","flipped":false,"pitch":"E4","row":1},{"id":"note-1733957491842","x":180,"y":102.75,"type":"notes","category":"Notes","variant":"quarter","flipped":false,"pitch":"G4","row":1},{"id":"note-1733957499076","x":240,"y":67.75,"type":"notes","category":"Notes","variant":"quarter","flipped":false,"pitch":"B4","row":1},{"id":"note-1733957507195","x":300,"y":116.75,"type":"notes","category":"Notes","variant":"quarter","flipped":true,"pitch":"C5","row":1},{"id":"note-1733957517991","x":360,"y":90.5,"type":"rests","category":"Rests","variant":"eighth","flipped":true,"pitch":"C5","row":1},{"id":"note-1733957533544","x":500,"y":136,"type":"notes","category":"Notes","variant":"eighth","flipped":false,"pitch":"E4","row":1},{"id":"note-1733957544242","x":560,"y":81.75,"type":"notes","category":"Notes","variant":"quarter","flipped":true,"pitch":"E5","row":1},{"id":"note-1733957549175","x":620,"y":99.25,"type":"notes","category":"Notes","variant":"quarter","flipped":true,"pitch":"D5","row":1},{"id":"note-1733957553942","x":680,"y":81.75,"type":"notes","category":"Notes","variant":"quarter","flipped":true,"pitch":"E5","row":1},{"id":"note-1733957559825","x":740,"y":99.25,"type":"notes","category":"Notes","variant":"quarter","flipped":true,"pitch":"D5","row":1},{"id":"note-1733957565307","x":800,"y":67.75,"type":"notes","category":"Notes","variant":"quarter","flipped":false,"pitch":"B4","row":1},{"id":"note-1733957582558","x":860,"y":99.25,"type":"notes","category":"Notes","variant":"quarter","flipped":true,"pitch":"D5","row":1},{"id":"note-1733957590425","x":920,"y":116.75,"type":"notes","category":"Notes","variant":"quarter","flipped":true,"pitch":"C5","row":1},{"id":"note-1733957601058","x":980,"y":85.25,"type":"notes","category":"Notes","variant":"quarter","flipped":false,"pitch":"A4","row":1}]
