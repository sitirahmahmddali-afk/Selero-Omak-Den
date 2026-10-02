/**
 * Procedural Web Audio API soundscape generator for "Selero Omak Den / Suasana Nogori"
 * Synthesizes vibrant, festive, traditional Negeri Sembilan celebration music & rhythms
 * with compressor limiter, rich percussion, interlocking caklempong, and gong cadence.
 */

export interface SoundTrack {
  id: string;
  name: string;
  category: string;
  description: string;
  dialectTag: string;
}

export const SOUND_TRACKS: SoundTrack[] = [
  {
    id: 'caklempong-kenduri',
    name: 'Rentak Caklempong & Gendang Kenduri',
    category: 'Muzik Tradisional',
    description: 'Paluan rancak caklempong beriring pukulan gendang anak-ibu dan gong perayaan kenduri.',
    dialectTag: 'Meriah Khenduri Rewang di Laman!',
  },
  {
    id: 'dendang-pesta',
    name: 'Dendang Pesta Adat & Saluang Melodi',
    category: 'Gubahan Tradisi',
    description: 'Melodi seruling saluang ceria berpadu rentak kompang & canang minang bergema.',
    dialectTag: 'Rancak Berdendang Menyambut Tetamu',
  },
  {
    id: 'gendang-silat',
    name: 'Paluan Gendang Silat & Gong Agung',
    category: 'Seni Paluan',
    description: 'Irama paluan gendang silat sembilan luak bersemangat tinggi dan bergema kuat.',
    dialectTag: 'Semangat Pendekar Luak Beradat',
  },
  {
    id: 'dapur-rewang',
    name: 'Suasana Riuh Rewang Kawah Kampung',
    category: 'Suasana Dapur',
    description: 'Desiran kawah mendidih, ketukan senduk kayu kawah kenduri, dan kemeriahan dapur kampung.',
    dialectTag: 'Bau Gulai Kawah Naik Satu Kampung',
  },
];

class NogoriAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTrackId = 'caklempong-kenduri';
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private activeTimers: number[] = [];
  private volume = 0.9; // Louder, vibrant default

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Dynamics Compressor to boost volume cleanly without digital clipping
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(8, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1.2, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.04);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): string {
    return this.currentTrackId;
  }

  public play(trackId?: string) {
    this.initContext();
    if (trackId && trackId !== this.currentTrackId) {
      this.stop();
      this.currentTrackId = trackId;
    }
    this.stopAudioNodes();
    this.isPlaying = true;

    if (!this.ctx || !this.masterGain) return;

    if (this.currentTrackId === 'caklempong-kenduri') {
      this.startCaklempongKenduri();
    } else if (this.currentTrackId === 'dendang-pesta') {
      this.startDendangPesta();
    } else if (this.currentTrackId === 'gendang-silat') {
      this.startGendangSilat();
    } else {
      this.startDapurRewang();
    }
  }

  public pause() {
    this.stopAudioNodes();
    this.isPlaying = false;
  }

  public stop() {
    this.stopAudioNodes();
    this.isPlaying = false;
  }

  private stopAudioNodes() {
    this.activeTimers.forEach((timer) => {
      window.clearInterval(timer);
      window.clearTimeout(timer);
    });
    this.activeTimers = [];
  }

  // --- SYNTHESIZED INSTRUMENTS HELPERS ---

  // 1. Caklempong Gong Chime Bell
  private triggerCaklempongBell(freq: number, velocity = 0.45) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Fundamental metallic bell frequency
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic overtone for metallic gong rim ping
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.76, now);

    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(velocity * 0.35, now);
    osc2Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    gain.gain.setValueAtTime(velocity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc1.connect(gain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.7);
    osc2.stop(now + 0.7);
  }

  // 2. Gendang Ibu (Low resonant drum thump)
  private triggerGendangIbu(velocity = 0.75) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.16);

    gain.gain.setValueAtTime(velocity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // 3. Gendang Anak / Tak (High snappy rim slap)
  private triggerGendangAnak(velocity = 0.5) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    // Fast noise snap
    const bufferSize = this.ctx.sampleRate * 0.08;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.Q.setValueAtTime(3, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(velocity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
  }

  // 4. Gong Agung (Deep bass ceremonial boom)
  private triggerGongAgung(velocity = 0.8) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(82.4, now); // Low E
    osc.frequency.linearRampToValueAtTime(78.0, now + 1.2);

    gain.gain.setValueAtTime(velocity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 3.0);
  }

  // --- LIVELY TRACK 1: Rentak Caklempong & Gendang Kenduri ---
  private startCaklempongKenduri() {
    // 16-step upbeat traditional Minang/Nogori groove
    // Pentatonic scale notes (G3, A3, C4, D4, E4, G4, A4)
    const scale = [392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0];
    const melodyPattern = [
      scale[2], scale[3], scale[4], scale[3],
      scale[4], scale[5], scale[4], scale[2],
      scale[3], scale[4], scale[5], scale[6],
      scale[5], scale[4], scale[3], scale[2],
    ];

    let step = 0;
    const stepDurationMs = 170; // ~176 BPM lively sixteenth-note groove

    const loop = () => {
      if (!this.isPlaying) return;

      // 1. Caklempong Melody & Counterpoint
      const note = melodyPattern[step % melodyPattern.length];
      this.triggerCaklempongBell(note, 0.48);

      // Harmony note on downbeats
      if (step % 4 === 0) {
        this.triggerCaklempongBell(note * 0.75, 0.35);
      }

      // 2. Gendang Beat (Upbeat Rentak Inang / Joget)
      // Beats 0 & 8: Bass Ibu (Dung)
      if (step % 8 === 0) {
        this.triggerGendangIbu(0.8);
      }
      // Beats 4 & 12: Snappy Anak (Tak)
      if (step % 4 === 2 || step % 8 === 6) {
        this.triggerGendangAnak(0.55);
      }
      // Syncopated double hit
      if (step % 16 === 14) {
        this.triggerGendangAnak(0.4);
      }

      // 3. Gong Agung on the 16th cycle
      if (step % 16 === 0) {
        this.triggerGongAgung(0.85);
      }

      step++;
    };

    loop();
    const timer = window.setInterval(loop, stepDurationMs);
    this.activeTimers.push(timer);
  }

  // --- LIVELY TRACK 2: Dendang Pesta Adat & Saluang ---
  private startDendangPesta() {
    const scale = [329.63, 369.99, 415.3, 493.88, 554.37, 659.25];
    let step = 0;
    const stepDurationMs = 210;

    const loop = () => {
      if (!this.isPlaying) return;

      // Saluang ornamental lead
      if (step % 2 === 0) {
        const note = scale[Math.floor(Math.random() * scale.length)];
        this.triggerCaklempongBell(note, 0.42);
      }

      // Kompang / Perkusi pattern
      if (step % 4 === 0) {
        this.triggerGendangIbu(0.7);
      } else {
        this.triggerGendangAnak(0.4);
      }

      if (step % 8 === 0) {
        this.triggerGongAgung(0.7);
      }

      step++;
    };

    loop();
    const timer = window.setInterval(loop, stepDurationMs);
    this.activeTimers.push(timer);
  }

  // --- LIVELY TRACK 3: Paluan Gendang Silat & Gong ---
  private startGendangSilat() {
    let step = 0;
    const stepDurationMs = 180;

    const loop = () => {
      if (!this.isPlaying) return;

      // High-energy syncopated silat cadence
      if (step % 8 === 0 || step % 8 === 3) {
        this.triggerGendangIbu(0.85);
      }
      if (step % 8 === 2 || step % 8 === 5 || step % 8 === 7) {
        this.triggerGendangAnak(0.6);
      }
      if (step % 8 === 1) {
        this.triggerCaklempongBell(523.25, 0.38); // metallic accent ring
      }
      if (step % 16 === 0) {
        this.triggerGongAgung(0.9);
      }

      step++;
    };

    loop();
    const timer = window.setInterval(loop, stepDurationMs);
    this.activeTimers.push(timer);
  }

  // --- LIVELY TRACK 4: Suasana Riuh Rewang Kawah Dapur ---
  private startDapurRewang() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const master = this.masterGain;

    // 1. Sizzling warm hearth crackle
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.12;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    whiteNoise.start();

    // 2. Rhythmic wooden spoon stirs & pot taps
    let step = 0;
    const loop = () => {
      if (!this.isPlaying) return;
      if (step % 4 === 0) {
        this.triggerGendangAnak(0.35); // wood tap
      }
      if (step % 8 === 0) {
        this.triggerCaklempongBell(440, 0.25); // pot chime
      }
      step++;
    };

    const timer = window.setInterval(loop, 240);
    this.activeTimers.push(timer);
  }
}

export const nogoriAudio = new NogoriAudioEngine();
