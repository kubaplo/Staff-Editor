"use client";

// React
import { useRef } from 'react';

// Custom Hooks
import { musicExporter } from "@/ui/components/Staff/hooks/musicExporter";
import { useLocalStorage } from "@/ui/components/Staff/hooks/useLocalStorage";

// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

// Icons
import Close from "@/ui/svg/Close";
import CreateFile from "@/ui/svg/CreateFile";
import LoadFile from "@/ui/svg/LoadFile";
import ExportMidi from "@/ui/svg/ExportMidi";
import ExportWav from "@/ui/svg/ExportWav";

// Types:
import { NoteType } from '@/ui/components/Staff/utils/types';


type SideMenuProps = {
	isOpen: boolean;
	onClose: () => void;
	notes: NoteType[];
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
  clearNotes: () => void;
};

export default function SideMenu({ isOpen, onClose, notes, setNotes, clearNotes }: SideMenuProps) {
	const localCopyUpload = useRef<HTMLInputElement | null>(null);

	// Zapis układu pięciolinii do pliku w formacie JSON:
	function handleSaveLocal() {
		console.log(notes);
		const file = new File([JSON.stringify(notes)], "staff.json");
		const url = URL.createObjectURL(file);
		
		const a = document.createElement("a");
		a.href = url;
		a.download = "staff.json";
		a.click();
		URL.revokeObjectURL(url);
	}

	// Otwórz okno dialogowe do wczytania pliku:
	function handleLoadLocal() {
		if (localCopyUpload.current) {
			localCopyUpload.current.click();
		}
	}

	// Wczytanie układu pięciolinii z pliku w formacie JSON:
	async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const rawText = await e.target.files?.[0].text();
		if (rawText) {
			const loadedNotes: NoteType[] =  JSON.parse(rawText) as NoteType[];
			setNotes(loadedNotes);
		}
	}
	
	// Funkcja eksportu MIDI
	const handleExportMIDI = () => {
		const midiBlob = musicExporter.exportToMIDI(notes);

		// Tworzymy link do pobrania pliku
		const url = URL.createObjectURL(midiBlob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "composition.mid";
		a.click();
		URL.revokeObjectURL(url);
	};

	// Funkcja eksportu WAV
	const handleExportWAV = async () => {
		const wavBlob = await musicExporter.exportToWAV(notes);

		// Tworzymy link do pobrania pliku
		const url = URL.createObjectURL(wavBlob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "composition.wav";
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.5 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 bg-dark z-20"
					/>
					<motion.div
						initial={{ x: "-100%" }}
						animate={{ x: 0 }}
						exit={{ x: "-100%" }}
						transition={{ type: "tween", duration: 0.3 }}
						className="fixed top-0 left-0 w-96 h-full font-bold bg-secondary shadow-lg z-30 flex flex-col"
						role="dialog"
						aria-label="Settings menu"
						aria-modal="true"
					>
						<div className="relative p-6 flex-shrink-0">
							<button
								onClick={onClose}
								className="absolute top-4 right-4 size-10 flex items-center justify-center rounded-md hover:bg-secondary/20 transition-colors"
								aria-label="Close settings menu"
							>
								<Close className="size-8 fill-dark" />
							</button>

							<div className="relative mt-16 mb-28 text-center">
								<h2 className="text-5xl">Settings</h2>
								<motion.div
									initial={{ width: 0, opacity: 0 }}
									animate={{ width: "12rem", opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 rounded-full gradient-fade"
								/>
							</div>
						</div>

						<div className="flex-1 overflow-y-auto px-6">
							<div className="mb-24">
								<h3 className="text-2xl mb-10 text-center">
									Arranging Notes on Staff
								</h3>
								<div className="flex flex-col items-center gap-4">
									<button
										onClick={handleSaveLocal}
										className="w-72 h-18 px-6 bg-dark text-white rounded-xl hover:bg-hover transition-colors flex items-center gap-3"
										aria-label="Create new XML file"
									>
										<div className="w-12 flex justify-center">
											<CreateFile className="w-10 h-10 fill-white" />
										</div>
										<span className="flex-1 text-center ">
											Create a Local Copy
										</span>
									</button>
									<button
										onClick={handleLoadLocal}
										className="w-72 h-18 px-6 bg-dark text-white rounded-xl hover:bg-hover transition-colors flex items-center gap-3"
										aria-label="Load XML file"
									>
										<input ref={localCopyUpload} onChange={handleFileUpload} name="localcopy-upload" type="file" accept=".json" className="absolute top-0 left-0 w-px h-px opacity-0" />
										<div className="w-12 flex justify-center">
											<LoadFile className="w-10 h-10 fill-white" />
										</div>
										<span className="flex-1 text-center">
											Load a Local Copy
										</span>
									</button>
								</div>
							</div>

							<div>
								<h3 className="text-2xl mb-10 text-center">Export Data</h3>
								<div className="flex flex-col items-center gap-4">
									<button
										onClick={handleExportMIDI}
										className="w-72 h-18 px-6 bg-dark text-white rounded-xl hover:bg-hover transition-colors flex items-center gap-3"
										aria-label="Export to MIDI format"
									>
										<div className="w-12 flex justify-center">
											<ExportMidi className="w-8 h-8 fill-white" />
										</div>
										<span className="flex-1 text-center">Export to .MIDI</span>
									</button>
									<button
										onClick={handleExportWAV}
										className="w-72 h-18 px-6 bg-dark text-white rounded-xl hover:bg-hover transition-colors flex items-center gap-3"
										aria-label="Export to WAV format"
									>
										<div className="w-12 flex justify-center">
											<ExportWav className="w-8 h-8 fill-white" />
										</div>
										<span className="flex-1 text-center">Export to .WAV</span>
									</button>
								</div>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}