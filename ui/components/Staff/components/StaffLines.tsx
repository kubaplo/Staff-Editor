import { memo } from "react";
import { STAFF_CONSTANTS } from "@/ui/components/Staff/utils/constants";

export function StaffLines() {
	return (
		<>
			{[...Array(5)].map((_, i) => (
				<div
					key={i}
					className="absolute w-[calc(100%-120px)] h-[2px] bg-dark left-[60px]"
					style={{
						top: `${
							i * STAFF_CONSTANTS.LINE_SPACING +
							(STAFF_CONSTANTS.HEIGHT - STAFF_CONSTANTS.LINE_SPACING * 4) / 2
						}px`,
					}}
				/>
			))}
		</>
	);
}

export default memo(StaffLines);
