// Icons
import WholeNote from "@/ui/svg/Notes/WholeNote";
import HalfNote from "@/ui/svg/Notes/HalfNote";
import QuarterNote from "@/ui/svg/Notes/QuarterNote";
import EighthNote from "@/ui/svg/Notes/EighthNote";
import SixteenthNote from "@/ui/svg/Notes/SixteenthNote";
import ThirtySecondNote from "@/ui/svg/Notes/ThirtySecondNote";
import SixtyFourthNote from "@/ui/svg/Notes/SixtyFourthNote";
import WholeRest from "@/ui/svg/Rests/WholeRest";
import HalfRest from "@/ui/svg/Rests/HalfRest";
import QuarterRest from "@/ui/svg/Rests/QuarterRest";
import EighthRest from "@/ui/svg/Rests/EighthRest";
import SixteenthRest from "@/ui/svg/Rests/SixteenthRest";
import ThirtySecondRest from "@/ui/svg/Rests/ThirtySecondRest";
import SixtyFourthRest from "@/ui/svg/Rests/SixtyFourthRest";

//ogarnac trzeba wymiary nutek bo niektóre są wieksze od innych, pózniej dostosowac offsety
export const NOTES = [
	{
		name: "whole note",
		icon: WholeNote,
		offsets: {
			normal: 2.3,
			flipped: 0.4,
		},
	},
	{
		name: "half note",
		icon: HalfNote,
		offsets: {
			normal: 2.3,
			flipped: 0.5,
		},
	},
	{
		name: "quarter note",
		icon: QuarterNote,
		offsets: {
			normal: 2.35,
			flipped: 0.45,
		},
	},
	{
		name: "eighth note",
		icon: EighthNote,
		offsets: {
			normal: 2.4,
			flipped: 0.35,
		},
	},
	{
		name: "sixteenth note",
		icon: SixteenthNote,
		offsets: {
			normal: 2.4,
			flipped: 0.35,
		},
	},
	{
		name: "thirty-second note",
		icon: ThirtySecondNote,
		offsets: {
			normal: 2.4,
			flipped: 0.35,
		},
	},
	{
		name: "sixty-fourth note",
		icon: SixtyFourthNote,
		offsets: {
			normal: 2.4,
			flipped: 0.35,
		},
	},
];

export const RESTS = [
	{
		name: "whole rest",
		icon: WholeRest,
		offset: 2.2,
	},
	{
		name: "half rest",
		icon: HalfRest,
		offset: 2.2,
	},
	{ name: "quarter rest", icon: QuarterRest, offset: 1.5 },
	{ name: "eighth rest", icon: EighthRest, offset: 1.2 },
	{ name: "sixteenth rest", icon: SixteenthRest, offset: 1.2 },
	{ name: "thirty-second rest", icon: ThirtySecondRest, offset: 1.2 },
	{ name: "sixty-fourth rest", icon: SixtyFourthRest, offset: 1.2 },
];

export const PITCH_MAP = [
	"G5",
	"F5",
	"E5",
	"D5",
	"C5",
	"B4",
	"A4",
	"G4",
	"F4",
	"E4",
	"D4",
];

export const NOTE_DURATIONS: { [key: string]: number } = {
	whole: 2.0, // cała nuta
	half: 1.0, // półnuta
	quarter: 0.5, // ćwierćnuta
	eighth: 0.25, // ósemka
	sixteenth: 0.125, // szesnastka
};

// Minimalna odległość po pauzie przed następną nutą
export const REST_SPACING: { [key: string]: number } = {
	whole: 180,
	half: 150,
	quarter: 120,
	eighth: 80,
	sixteenth: 60,
	"thirty-second": 40,
	"sixty-fourth": 20,
};

export const STAFF_CONSTANTS = {
	HEIGHT: 300,
	LINE_SPACING: 35,
	WIDTH: 1200,
	PADDING: 60,
	MIN_NOTE_SPACING: 60,
	PLAYBACK_LINE_SPACING: 20,
	NOTE_DRAG_OFFSET: {
		normal: 30,
		flipped: 28,
	},
};
