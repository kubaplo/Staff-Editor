// Add type definition for webkit prefix
declare global {
	interface Window {
		webkitAudioContext: typeof AudioContext;
	}
}

// Mapping of note pitches to frequencies (in Hz)

class AudioPlayer {
	private audioContext: AudioContext | null = null;
	private masterGainNode: GainNode | null = null;
	private compressor: DynamicsCompressorNode | null = null;
	private reverb: ConvolverNode | null = null;
	private chorus: DelayNode[] | null = null;

	constructor() {
		if (typeof window !== "undefined") {
			// Only initialize audio context in browser environment
			this.audioContext = new (window.AudioContext ||
				window.webkitAudioContext)();
			this.masterGainNode = this.audioContext.createGain();
			this.compressor = this.audioContext.createDynamicsCompressor();
			this.reverb = this.audioContext.createConvolver();

			// Inicjalizacja chorus effectu (3 linie opóźniające)
			this.chorus = Array(3)
				.fill(null)
				.map(() => {
					const delay = this.audioContext.createDelay();
					delay.delayTime.value = 0.02 + Math.random() * 0.01; // 20-30ms delay
					return delay;
				});

			// Tworzymy impuls reverbu z dłuższym czasem
			const reverbTime = 2.5; // Wydłużony pogłos
			const sampleRate = this.audioContext.sampleRate;
			const length = sampleRate * reverbTime;
			const impulse = this.audioContext.createBuffer(2, length, sampleRate);

			for (let channel = 0; channel < 2; channel++) {
				const channelData = impulse.getChannelData(channel);
				for (let i = 0; i < length; i++) {
					// Bardziej złożona krzywa zanikania dla bogatszego pogłosu
					channelData[i] =
						(Math.random() * 2 - 1) *
						Math.exp(-i / (sampleRate * 0.5)) *
						(1 + Math.sin(i / 1000));
				}
			}

			this.reverb.buffer = impulse;

			// Podłączamy efekty
			this.chorus.forEach((delay) => {
				this.compressor?.connect(delay);
				delay.connect(this.reverb!);
			});
			this.reverb.connect(this.masterGainNode);
			this.masterGainNode.connect(this.audioContext.destination);

			// Compressor settings
			this.compressor.threshold.value = -20;
			this.compressor.knee.value = 20;
			this.compressor.ratio.value = 8;
			this.compressor.attack.value = 0.002;
			this.compressor.release.value = 0.2;
		}
	}

	playNote(pitch: string, duration: number) {
		const ctx = this.audioContext;
		const masterGain = this.masterGainNode;
		const comp = this.compressor;

		if (!ctx || !masterGain || !comp) return;

		// Tworzymy kilka oscylatorów dla bogatszego brzmienia
		const oscillators = [];
		const gainNodes = [];

		// Podstawowy dźwięk
		const baseOsc = ctx.createOscillator();
		const baseGain = ctx.createGain();
		baseOsc.type = "sine";
		baseOsc.frequency.value = this.getPitchFrequency(pitch);
		baseGain.gain.value = 0.4; // Zmniejszona głośność podstawowa
		oscillators.push(baseOsc);
		gainNodes.push(baseGain);

		// Rozszerzone harmoniczne dla bogatszego brzmienia
		const harmonics = [
			{ mult: 2, gain: 0.2, type: "sine" }, // Oktawa
			{ mult: 3, gain: 0.1, type: "sine" }, // Kwinta
			{ mult: 4, gain: 0.15, type: "sine" }, // Druga oktawa
			{ mult: 5, gain: 0.05, type: "sine" }, // Tercja
			{ mult: 8, gain: 0.05, type: "square" }, // Trzecia oktawa z lekką ostrością
		];

		harmonics.forEach(({ mult, gain, type }) => {
			const osc = ctx.createOscillator();
			const gainNode = ctx.createGain();
			osc.type = type as OscillatorType;
			osc.frequency.value = this.getPitchFrequency(pitch) * mult;
			gainNode.gain.value = gain;
			oscillators.push(osc);
			gainNodes.push(gainNode);
		});

		// Filtr dla cieplejszego brzmienia
		const filter = ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.value = 6000; // Zwiększona częstotliwość odcięcia
		filter.Q.value = 1.5;

		// Łączymy wszystkie oscylatory
		oscillators.forEach((osc, index) => {
			osc.connect(gainNodes[index]);
			gainNodes[index].connect(filter);
		});
		filter.connect(comp);

		// Modyfikujemy timing dla krótkich nut
		const now = ctx.currentTime;
		const minDuration = 0.1; // Minimalna długość nuty
		const actualDuration = Math.max(duration, minDuration);
		const releaseTime = Math.min(0.3, actualDuration / 2); // Dynamiczny czas release

		gainNodes.forEach((gainNode) => {
			gainNode.gain.cancelScheduledValues(now);
			gainNode.gain.setValueAtTime(0, now);
			gainNode.gain.linearRampToValueAtTime(gainNode.gain.value, now + 0.02); // Szybszy atak
			gainNode.gain.setValueAtTime(
				gainNode.gain.value,
				now + actualDuration - releaseTime
			);
			gainNode.gain.linearRampToValueAtTime(0, now + actualDuration);
		});

		oscillators.forEach((osc) => {
			osc.start(now);
			osc.stop(now + actualDuration + 0.1); // Dodajemy małą rezerwę czasową
		});
	}

	setVolume(volume: number) {
		if (this.masterGainNode) {
			this.masterGainNode.gain.value = volume;
		}
	}

	private getPitchFrequency(pitch: string): number {
		const notes = [
			"C",
			"C#",
			"D",
			"D#",
			"E",
			"F",
			"F#",
			"G",
			"G#",
			"A",
			"A#",
			"B",
		];
		const octave = parseInt(pitch.slice(-1));
		const note = pitch.slice(0, -1);
		const semitones = notes.indexOf(note);

		return 440 * Math.pow(2, (semitones - 9) / 12 + (octave - 4));
	}
}

export const audioPlayer = new AudioPlayer();
