import { NoteType } from "@/ui/components/Staff/utils/types";
import MidiWriter from 'midi-writer-js';
import * as Tone from 'tone';

export class MusicExporter {
    private durationMap: Record<string, string> = {
        '1': '1n',
        '1/2': '2n',
        '1/4': '4n',
        '1/8': '8n',
        '1/16': '16n',
        '1/32': '32n',
        '1/64': '64n',
    };

    private convertNoteToMIDINote(note: NoteType): { pitch?: string; duration: string } {
        return {
            pitch: note.type === 'notes' ? note.pitch || 'C4' : undefined,
            duration: this.durationMap[note.variant] || '4n',
        };
    }

    exportToMIDI(notes: NoteType[]): Blob {
        const track = new MidiWriter.Track();

        notes.forEach(note => {
            const { pitch, duration } = this.convertNoteToMIDINote(note);
            if (note.type === 'notes' && pitch) {
                track.addEvent(new MidiWriter.NoteEvent({ pitch: [pitch], duration }));
            } else if (note.type === 'rest') {
                track.addEvent({ wait: duration }); // Pauza w MIDI
            }
        });

        const write = new MidiWriter.Writer([track]);
        return new Blob([write.buildFile()], { type: 'audio/midi' });
    }

    async exportToWAV(notes: NoteType[]): Promise<Blob> {
        const synth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: 'sine' },
        }).toDestination();
        const recorder = new Tone.Recorder();
        synth.connect(recorder);

        const sequence = notes.map(note => this.convertNoteToMIDINote(note));
        
        await Tone.start(); // Uruchomienie Tone.js
        recorder.start();

        for (const seq of sequence) {
            if (seq.pitch) {
                synth.triggerAttackRelease(seq.pitch, seq.duration);
            }
            await new Promise(resolve => setTimeout(resolve, Tone.Time(seq.duration).toMilliseconds()));
        }

        setTimeout(() => Tone.Transport.stop(), 100); // Zatrzymanie Transport po wszystkich nutach
        const wavBlob = await recorder.stop();
        return wavBlob;
    }
}

export const musicExporter = new MusicExporter();