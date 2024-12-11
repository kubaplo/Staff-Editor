import { STAFF_CONSTANTS } from "@/ui/components/Staff/utils/constants";
import { PITCH_MAP } from "@/ui/components/Staff/utils/constants";
import { StaffProps } from "@/ui/components/Staff/utils/types";

export function getClosestPosition(y: number) {
	const baseY = (STAFF_CONSTANTS.HEIGHT - STAFF_CONSTANTS.LINE_SPACING * 4) / 2;
	const positions = [
		// Pozycja nad górną linią
		{
			y: baseY - STAFF_CONSTANTS.LINE_SPACING / 2,
			pitch: PITCH_MAP[0],
		},
		// Standardowe pozycje pięciolinii
		...Array.from({ length: 9 }, (_, i) => ({
			y: baseY + (i * STAFF_CONSTANTS.LINE_SPACING) / 2,
			pitch: PITCH_MAP[i + 1],
		})),
		// Pozycja pod dolną linią
		{
			y: baseY + (9 * STAFF_CONSTANTS.LINE_SPACING) / 2,
			pitch: PITCH_MAP[10],
		},
	];

	return positions.reduce((prev, curr) => {
		return Math.abs(curr.y - y) < Math.abs(prev.y - y) ? curr : prev;
	});
}

export function createIconsMap(
	noteIcons: StaffProps["notes"],
	restIcons: StaffProps["rests"]
) {
	return {
		Notes: Object.fromEntries(
			noteIcons.map((note) => [
				note.name.split(" ")[0].toLowerCase(),
				note.icon,
			])
		),
		Rests: Object.fromEntries(
			restIcons.map((rest) => [
				rest.name.split(" ")[0].toLowerCase(),
				rest.icon,
			])
		),
	};
}
