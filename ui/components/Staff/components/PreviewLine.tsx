import { motion } from "framer-motion";
import { PreviewLineType } from "@/ui/components/Staff/utils/types";
import { STAFF_CONSTANTS } from "@/ui/components/Staff/utils/constants";
import { memo } from "react";

interface PreviewLineProps {
	preview: PreviewLineType;
	row: number;
	currentRow: number;
}

function PreviewLine({ preview, row }: PreviewLineProps) {
	if (!preview || preview.row !== row) return null;

	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className={`absolute w-[calc(100%-120px)] h-[3px] left-[60px] transition-colors duration-200 ${
					preview.isValid
						? "preview-line-gradient"
						: "preview-line-gradient-invalid"
				}`}
				style={{
					top: `${preview.y}px`,
				}}
			/>
			{!preview.isValid && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="absolute pointer-events-none"
					style={{
						left: `${preview.mouseX - STAFF_CONSTANTS.MIN_NOTE_SPACING / 2}px`,
						top: `${preview.mouseY - 45}px`,
						width: `${STAFF_CONSTANTS.MIN_NOTE_SPACING}px`,
						height: "90px",
					}}
				>
					<div className="relative w-full h-full">
						<div className="absolute inset-y-0 left-0 w-[2px] boundary-line-gradient" />
						<div className="absolute inset-y-0 right-0 w-[2px] boundary-line-gradient" />
					</div>
					<motion.div
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className="absolute"
						style={{
							left: `calc(50% - 100px)`,
							top: "calc(100% + 50px)",
							width: "200px",
						}}
					>
						<div
							className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 
                          border-l-[8px] border-l-transparent 
                          border-r-[8px] border-r-transparent 
                          border-b-[8px] border-b-dark"
						/>
						<span className="whitespace-nowrap text-sm font-medium bg-dark text-white px-4 py-2 rounded-lg shadow-lg block text-center">
							Minimum spacing required
						</span>
					</motion.div>
				</motion.div>
			)}
		</>
	);
}

export default memo(PreviewLine);
