'use client';

// React
import { useState } from 'react';

// Components
import SideMenu from "@/ui/components/SideMenu/SideMenu";

// Icons
import Logo from "@/ui/svg/Logo";
import Settings from "@/ui/svg/Settings";
import { NoteType } from '@/ui/components/Staff/utils/types';


type HeaderPropsType = {
  notes: NoteType[],
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>,
  clearNotes: () => void
};

export default function Header({notes, setNotes, clearNotes}: HeaderPropsType) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 flex justify-center items-center py-4 px-5 w-full h-24 bg-secondary shadow-header z-10">
        <button  
          title="Settings"
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="absolute top-1/2 -translate-y-1/2 left-5 flex justify-center items-center"
          aria-label="Open settings"
        >
          <Settings className="h-14 w-auto fill-dark" />
        </button>
        <div className="flex justify-center items-center gap-x-8 h-full">
          <Logo className="h-full w-auto fill-dark" />
          <label className="text-4xl text-center font-bold whitespace-nowrap">Staff Editor</label>
        </div>
      </header>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} notes={notes} setNotes={setNotes} clearNotes={clearNotes} />
    </>
  );
}