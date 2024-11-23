"use client";

// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

// Icons
import Close from "@/ui/svg/Close";
import CreateFile from "@/ui/svg/CreateFile";
import LoadFile from "@/ui/svg/LoadFile";
import ExportMidi from "@/ui/svg/ExportMidi";
import ExportWav from "@/ui/svg/ExportWav";

type SideMenuProps = {
	isOpen: boolean;
	onClose: () => void;
};

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
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
						className="fixed top-0 left-0 w-96 h-full font-bold bg-secondary shadow-lg z-30"
						role="dialog"
						aria-label="Settings menu"
						aria-modal="true"
					>
						<div className="relative p-6">
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

							<div className="mb-24">
								<h3 className="text-3xl mb-10 text-center">
									Arranging Notes on Staff
								</h3>
								<div className="flex flex-col items-center gap-4">
									<button 
										className="w-64 h-18 px-6 bg-dark text-white rounded-xl hover:bg-hover transition-colors flex items-center gap-3"
										aria-label="Create new XML file"
									>
										<div className="w-12 flex justify-center">
											<CreateFile className="w-10 h-10 fill-white" />
										</div>
										<span className="flex-1 text-center ">Create a Local File (.xml)</span>
									</button>
									<button 
										className="w-64 h-18 px-6 bg-dark text-white rounded-xl hover:bg-hover transition-colors flex items-center gap-3"
										aria-label="Load XML file"
									>
										<div className="w-12 flex justify-center">
											<LoadFile className="w-10 h-10 fill-white" />
										</div>
											<span className="flex-1 text-center">Load a Local File (.xml)</span>
									</button>
								</div>
							</div>

							<div>
								<h3 className="text-3xl mb-10 text-center">Export Data</h3>
								<div className="flex flex-col items-center gap-4">
									<button 
										className="w-64 h-18 px-6 bg-dark text-white rounded-xl hover:bg-hover transition-colors flex items-center gap-3"
										aria-label="Export to MIDI format"
									>
										<div className="w-12 flex justify-center">
											<ExportMidi className="w-8 h-8 fill-white" />
										</div>
										<span className="flex-1 text-center">Export to .MIDI</span>
									</button>
									<button 
										className="w-64 h-18 px-6 bg-dark text-white rounded-xl hover:bg-hover transition-colors flex items-center gap-3"
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
