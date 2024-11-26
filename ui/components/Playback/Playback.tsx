'use client';

// React
import { useState } from 'react';

// Icons
import Beginning from "@/ui/svg/Playback/Beginning";
import Play from "@/ui/svg/Playback/Play";
import Pause from "@/ui/svg/Playback/Pause";
import Stop from "@/ui/svg/Playback/Stop";


export default function Playback() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="flex flex-col items-center gap-y-5">
            <label className="text-2xl text-center font-bold">Playback control</label>
            <div className="flex justify-center items-center gap-x-10">
                <button className="flex justify-center items-center size-10">
                    <Beginning className="size-full fill-dark hover:fill-secondary transition-all" />
                </button>
                <button onClick={() => setIsPlaying(p => !p)} className="flex justify-center items-center size-10">
                    {
                        (isPlaying) ? 
                        <Pause className="size-full fill-dark hover:fill-secondary transition-all" /> :
                        <Play className="size-full fill-dark hover:fill-secondary transition-all" />
                    }
                    
                </button>
                <button className="flex justify-center items-center size-12">
                    <Stop className="size-full fill-dark hover:fill-secondary transition-all" />
                </button>
            </div>
        </div>
        
    );
}