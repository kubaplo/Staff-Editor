'use client';

// Components
import Header from "@/ui/components/Header/Header";
import SelectionBox from "@/ui/components/SelectionBox/SelectionBox";

// Icons
import WholeNote from "@/ui/svg/Notes/WholeNote";
import HalfNote from "@/ui/svg/Notes/HalfNote";
import QuarterNote from "@/ui/svg/Notes/QuarterNote";
import EighthNote from "@/ui/svg/Notes/EighthNote";
import SixteenthNote from "@/ui/svg/Notes/SixteenthNote";
import ThirtySecondNote from "@/ui/svg/Notes/ThirtySecondNote";
import SixtyFourthNote from "@/ui/svg/Notes/SixtyFourthNote";

const NOTES = [
  {name: 'whole note', icon: WholeNote},
  {name: 'half note', icon: HalfNote},
  {name: 'quarter note', icon: QuarterNote},
  {name: 'eighth note', icon: EighthNote},
  {name: 'sixteenth note', icon: SixteenthNote},
  {name: 'thirty second note', icon: ThirtySecondNote},
  {name: 'sixty fourth note', icon: SixtyFourthNote},
];

export default function Home() {
  return (
    <>
    <Header />
    <main className="w-full h-screen bg-primary pt-32">
      <SelectionBox title="Notes" items={NOTES} />
    </main>
    </>
  );
}