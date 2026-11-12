/**
 * Drishta Meditative Soundscape Engine (Web Audio API)
 * Audible, warm acoustic harmonics routed through a dynamics compressor limiter.
 */

const CHIME_SCALE = [
  440.0,   // A4
  523.25,  // C5
  587.33,  // D5
  659.25,  // E5
  783.99,  // G5
  880.0,   // A5
  1046.5,  // C6
  1174.66, // D6
  1318.51, // E6
];

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private droneGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private chimeTimer: number | null = null;
  private active = false;

  private initContext() {
    if (this.ctx) return;

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
    this.compressor.knee.setValueAtTime(10, this.ctx.currentTime);
    this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
    this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    this.masterGain.connect(this.compressor);
    this.compressor.connect(this.ctx.destination);

    // Warm resonant low-pass drone (A2 + E3)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(270, this.ctx.currentTime);

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(110.0, this.ctx.currentTime);

    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.setValueAtTime(164.81, this.ctx.currentTime);

    this.droneOsc1.connect(filter);
    this.droneOsc2.connect(filter);
    filter.connect(this.droneGain);
    this.droneGain.connect(this.masterGain);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  private playBellVoice(freq: number, delay = 0, peak = 0.34) {
    if (!this.ctx || !this.masterGain || !this.active) return;

    const startTime = this.ctx.currentTime + delay;

    let panner: StereoPannerNode | null = null;
    if (this.ctx.createStereoPanner) {
      panner = this.ctx.createStereoPanner();
      panner.pan.setValueAtTime(Math.random() * 1.1 - 0.55, startTime);
    }

    const destination: AudioNode = panner ?? this.masterGain;
    if (panner) {
      panner.connect(this.masterGain);
    }

    // 1. Fundamental tone
    const oscFund = this.ctx.createOscillator();
    const gainFund = this.ctx.createGain();
    oscFund.type = 'sine';
    oscFund.frequency.setValueAtTime(freq, startTime);
    gainFund.gain.setValueAtTime(0.0001, startTime);
    gainFund.gain.linearRampToValueAtTime(peak, startTime + 0.02);
    gainFund.gain.exponentialRampToValueAtTime(0.0001, startTime + 5.6);
    oscFund.connect(gainFund);
    gainFund.connect(destination);

    // 2. Bronze bell overtone (~2.76x)
    const oscHarm = this.ctx.createOscillator();
    const gainHarm = this.ctx.createGain();
    oscHarm.type = 'sine';
    oscHarm.frequency.setValueAtTime(freq * 2.76, startTime);
    gainHarm.gain.setValueAtTime(0.0001, startTime);
    gainHarm.gain.linearRampToValueAtTime(peak * 0.45, startTime + 0.014);
    gainHarm.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.9);
    oscHarm.connect(gainHarm);
    gainHarm.connect(destination);

    // 3. Crystalline shimmer (~5.4x)
    const oscShimmer = this.ctx.createOscillator();
    const gainShimmer = this.ctx.createGain();
    oscShimmer.type = 'triangle';
    oscShimmer.frequency.setValueAtTime(freq * 5.4, startTime);
    gainShimmer.gain.setValueAtTime(0.0001, startTime);
    gainShimmer.gain.linearRampToValueAtTime(peak * 0.18, startTime + 0.01);
    gainShimmer.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.3);
    oscShimmer.connect(gainShimmer);
    gainShimmer.connect(destination);

    oscFund.start(startTime);
    oscHarm.start(startTime);
    oscShimmer.start(startTime);

    oscFund.stop(startTime + 5.8);
    oscHarm.stop(startTime + 3.1);
    oscShimmer.stop(startTime + 1.5);
  }

  private scheduleNextCluster = () => {
    if (!this.active) return;

    const note1 = CHIME_SCALE[Math.floor(Math.random() * CHIME_SCALE.length)];
    this.playBellVoice(note1, 0, 0.34);

    if (Math.random() > 0.3) {
      const rest = CHIME_SCALE.filter((n) => n !== note1);
      const note2 = rest[Math.floor(Math.random() * rest.length)];
      this.playBellVoice(note2, 0.28 + Math.random() * 0.45, 0.26);
    }

    const delayMs = 3100 + Math.random() * 1700;
    this.chimeTimer = window.setTimeout(this.scheduleNextCluster, delayMs);
  };

  public toggle(): boolean {
    this.initContext();
    if (!this.ctx || !this.masterGain || !this.droneGain) return false;

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    this.active = !this.active;
    const now = this.ctx.currentTime;

    if (this.active) {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(Math.max(0.001, this.masterGain.gain.value), now);
      this.masterGain.gain.linearRampToValueAtTime(0.38, now + 0.9);

      this.droneGain.gain.cancelScheduledValues(now);
      this.droneGain.gain.linearRampToValueAtTime(0.08, now + 1.4);

      // Welcoming triad
      this.playBellVoice(523.25, 0.06, 0.34);
      this.playBellVoice(783.99, 0.34, 0.3);
      this.playBellVoice(1046.5, 0.65, 0.28);

      this.chimeTimer = window.setTimeout(this.scheduleNextCluster, 3400);
    } else {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.75);

      this.droneGain.gain.cancelScheduledValues(now);
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.75);

      if (this.chimeTimer !== null) {
        window.clearTimeout(this.chimeTimer);
        this.chimeTimer = null;
      }
    }

    return this.active;
  }

  public playInteractionChime(index = 0) {
    if (!this.active) return;
    const freq = CHIME_SCALE[(index + 2) % CHIME_SCALE.length];
    this.playBellVoice(freq, 0, 0.25);
  }

  public destroy() {
    if (this.chimeTimer !== null) {
      window.clearTimeout(this.chimeTimer);
      this.chimeTimer = null;
    }
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
  }
}

export const soundscape = new SoundscapeEngine();

