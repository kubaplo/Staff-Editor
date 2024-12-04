'use client';

// Components
import Header from "@/ui/components/Header/Header";
import SelectionBox from "@/ui/components/SelectionBox/SelectionBox";
import Playback from "@/ui/components/Playback/Playback";

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


const NOTES = [
  {name: 'whole note', icon: WholeNote},
  {name: 'half note', icon: HalfNote},
  {name: 'quarter note', icon: QuarterNote},
  {name: 'eighth note', icon: EighthNote},
  {name: 'sixteenth note', icon: SixteenthNote},
  {name: 'thirty-second note', icon: ThirtySecondNote},
  {name: 'sixty-fourth note', icon: SixtyFourthNote},
];

const RESTS = [
  {name: 'whole rest', icon: WholeRest},
  {name: 'half rest', icon: HalfRest},
  {name: 'quarter rest', icon: QuarterRest},
  {name: 'eighth rest', icon: EighthRest},
  {name: 'sixteenth rest', icon: SixteenthRest},
  {name: 'thirty-second rest', icon: ThirtySecondRest},
  {name: 'sixty-fourth rest', icon: SixtyFourthRest},
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center gap-y-20 w-full h-screen bg-primary bg-[url('/background_image.svg')] bg-cover bg-center pt-32">
        <div className="flex justify-center items-center gap-10">
          <SelectionBox title="Notes" items={NOTES} />
          <SelectionBox title="Rests" items={RESTS} />
        </div>
        <div className="flex justify-center items-center">
          <Playback />
        </div>
      </main>
    </>
  );
}