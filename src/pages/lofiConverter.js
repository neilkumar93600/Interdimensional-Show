import * as Tone from 'tone';

export class LoFiProcessor {
  constructor() {
    this.player = new Tone.Player();

    // Effects
    this.filter = new Tone.Filter({
      frequency: 2000,
      type: "lowpass",
      rolloff: -24
    });

    this.reverb = new Tone.Reverb({
      decay: 3,
      wet: 0.3
    });

    this.bitCrusher = new Tone.BitCrusher({
      bits: 8
    });

    this.noise = new Tone.Noise({
      type: "pink",
      volume: -20
    });

    this.noiseFilter = new Tone.Filter({
      frequency: 1000,
      type: "lowpass"
    });

    this.compressor = new Tone.Compressor({
      threshold: -20,
      ratio: 6
    });

    // New Effects: Chorus and Vibrato
    this.chorus = new Tone.Chorus({
      frequency: 4,
      delayTime: 2.5,
      depth: 0.5
    }).start();

    this.vibrato = new Tone.Vibrato({
      frequency: 5,
      depth: 0.1
    });

    // Chain the effects
    this.player.chain(
      this.filter,
      this.bitCrusher,
      this.reverb,
      this.chorus,
      this.vibrato,
      this.compressor,
      Tone.Destination
    );
    this.noise.connect(this.noiseFilter);
    this.noiseFilter.connect(this.compressor);
  }

  async loadFile(file) {
    const buffer = await this.fileToArrayBuffer(file);
    await this.player.load(buffer);
    return true;
  }

  fileToArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  updateSettings(presetName) {
    const PRESETS = {
      classic: {
        filterFreq: 2000,
        reverbMix: 0.3,
        bitDepth: 8,
        vinylNoise: -20
      },
      modern: {
        filterFreq: 3000,
        reverbMix: 0.2,
        bitDepth: 12,
        vinylNoise: -30
      }
    };

    const settings = PRESETS[presetName] || {};
    this.filter.frequency.value = settings.filterFreq || 2000;
    this.reverb.wet.value = settings.reverbMix || 0.3;
    this.bitCrusher.bits = settings.bitDepth || 8;
    this.noise.volume.value = settings.vinylNoise || -20;
  }

  async start() {
    await Tone.start();
    this.noise.start();
    this.player.start();
  }

  stop() {
    this.player.stop();
    this.noise.stop();
  }

  dispose() {
    this.player.dispose();
    this.filter.dispose();
    this.reverb.dispose();
    this.bitCrusher.dispose();
    this.noise.dispose();
    this.noiseFilter.dispose();
    this.compressor.dispose();
    this.chorus.dispose();
    this.vibrato.dispose();
  }
}
