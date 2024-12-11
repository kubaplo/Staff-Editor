// Mapping of note pitches to frequencies (in Hz)

class AudioPlayer {
	private audioContext: AudioContext;
	private masterGainNode: GainNode;
	private compressor: DynamicsCompressorNode;

	constructor() {
		this.audioContext = new AudioContext();
		this.masterGainNode = this.audioContext.createGain();
		this.compressor = this.audioContext.createDynamicsCompressor();

		// Compressor settings
		this.compressor.threshold.value = -20;
		this.compressor.knee.value = 20;
		this.compressor.ratio.value = 8;
		this.compressor.attack.value = 0.002;
		this.compressor.release.value = 0.2;

		this.compressor.connect(this.masterGainNode);
		this.masterGainNode.connect(this.audioContext.destination);
	}

	playNote(pitch: string, duration: number) {
		const oscillator = this.audioContext.createOscillator();
		const gainNode = this.audioContext.createGain();
		const filter = this.audioContext.createBiquadFilter();

		// Higher filter settings for a clearer sound
		filter.type = "lowpass";
		filter.frequency.value = 3000;
		filter.Q.value = 1;

		// Oscillator settings
		oscillator.type = "sine";
		oscillator.frequency.value = this.getPitchFrequency(pitch);

		// Connecting elements
		oscillator.connect(gainNode);
		gainNode.connect(filter);
		filter.connect(this.compressor);

		// Envelope with higher amplitude
		const now = this.audioContext.currentTime;
		gainNode.gain.setValueAtTime(0, now);
		gainNode.gain.linearRampToValueAtTime(0.7, now + 0.01);
		gainNode.gain.setValueAtTime(0.7, now + duration - 0.05);
		gainNode.gain.linearRampToValueAtTime(0, now + duration);

		oscillator.start(now);
		oscillator.stop(now + duration);
	}

	setVolume(volume: number) {
		this.masterGainNode.gain.value = volume;
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
