/**
 * Professional Realistic Diwali Cracker & Sky Shot Sound Engine
 * Synthesizes authentic multi-phase aerial fireworks using procedural Web Audio API:
 * 1. Mortar launch thump & screaming turbulent rocket whistle
 * 2. Supersonic initial crack & deep chest-thumping sub-bass explosion with saturation
 * 3. Titanium salute micro-crackles & golden willow sizzling echo
 * 4. Ambient night atmosphere
 */

class RealisticCrackerSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private distortionCurve: Float32Array | null = null;
  private isPlayingMusic: boolean = false;
  private ambientMusicInterval: number | null = null;

  public initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Limiter / Compressor to give real acoustic punch without clipping
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-12, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(8, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(6, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.002, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);

      // Pre-compute soft-clipping saturation curve for realistic explosive impact
      this.distortionCurve = this.makeDistortionCurve(18);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft-clipping saturation curve (models high acoustic air pressure)
  private makeDistortionCurve(amount: number = 20): Float32Array {
    const k = amount;
    const nSamples = 44100;
    const curve = new Float32Array(nSamples);
    const deg = Math.PI / 180;
    for (let i = 0; i < nSamples; ++i) {
      const x = (i * 2) / nSamples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  // Auto-unlock on first user interaction
  public unlockAndEnableAudio() {
    this.initContext();
    this.isMuted = false;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0.85, this.ctx.currentTime, 0.05);
    }
    if (!this.isPlayingMusic) {
      this.startAmbientMusic();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.85, this.ctx.currentTime, 0.05);
    }
    if (!this.isMuted && !this.isPlayingMusic) {
      this.startAmbientMusic();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // =========================================================================
  // 1. REALISTIC SKY SHOT ROCKET LAUNCH
  // Initial mortar tube "THWACK" + Screaming ascending propellant whistle & gas hiss
  // =========================================================================
  public playRocketLaunch() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;

    // A. Initial Mortar Tube Launch Pop / Thump on the ground
    const popOsc = this.ctx.createOscillator();
    const popGain = this.ctx.createGain();
    popOsc.type = 'triangle';
    popOsc.frequency.setValueAtTime(260, now);
    popOsc.frequency.exponentialRampToValueAtTime(60, now + 0.12);

    popGain.gain.setValueAtTime(0.35, now);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    popOsc.connect(popGain);
    popGain.connect(this.masterGain);
    popOsc.start(now);
    popOsc.stop(now + 0.15);

    // B. High-Pressure Screaming Rocket Whistle (Dual detuned sweep)
    const whistleOsc1 = this.ctx.createOscillator();
    const whistleOsc2 = this.ctx.createOscillator();
    const whistleGain = this.ctx.createGain();

    whistleOsc1.type = 'sawtooth';
    whistleOsc2.type = 'triangle';

    const startFreq = 240 + Math.random() * 40;
    const endFreq = 1400 + Math.random() * 300;

    whistleOsc1.frequency.setValueAtTime(startFreq, now);
    whistleOsc1.frequency.exponentialRampToValueAtTime(endFreq, now + 0.55);

    whistleOsc2.frequency.setValueAtTime(startFreq * 1.02, now);
    whistleOsc2.frequency.exponentialRampToValueAtTime(endFreq * 1.01, now + 0.55);

    // Resonant bandpass filter to give realistic aerodynamic whistling pipe sound
    const whistleFilter = this.ctx.createBiquadFilter();
    whistleFilter.type = 'bandpass';
    whistleFilter.frequency.setValueAtTime(startFreq, now);
    whistleFilter.frequency.exponentialRampToValueAtTime(endFreq, now + 0.55);
    whistleFilter.Q.setValueAtTime(5.5, now);

    whistleGain.gain.setValueAtTime(0.001, now);
    whistleGain.gain.linearRampToValueAtTime(0.22, now + 0.12);
    whistleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);

    whistleOsc1.connect(whistleFilter);
    whistleOsc2.connect(whistleFilter);
    whistleFilter.connect(whistleGain);
    whistleGain.connect(this.masterGain);

    whistleOsc1.start(now);
    whistleOsc2.start(now);
    whistleOsc1.stop(now + 0.65);
    whistleOsc2.stop(now + 0.65);

    // C. Propellant Exhaust Gas Hiss (Turbulent white noise)
    const hissBuffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.65), this.ctx.sampleRate);
    const hissData = hissBuffer.getChannelData(0);
    for (let i = 0; i < hissData.length; i++) {
      hissData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.45));
    }
    const hissSource = this.ctx.createBufferSource();
    hissSource.buffer = hissBuffer;

    const hissFilter = this.ctx.createBiquadFilter();
    hissFilter.type = 'highpass';
    hissFilter.frequency.setValueAtTime(1800, now);
    hissFilter.frequency.linearRampToValueAtTime(3500, now + 0.55);

    const hissGain = this.ctx.createGain();
    hissGain.gain.setValueAtTime(0.12, now);
    hissGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    hissSource.connect(hissFilter);
    hissFilter.connect(hissGain);
    hissGain.connect(this.masterGain);
    hissSource.start(now);
    hissSource.stop(now + 0.62);
  }

  // =========================================================================
  // 2. REALISTIC SKY SHOT CRACKER EXPLOSION
  // Supersonic initial crack + Deep heavy sub-bass impact + Fireball body +
  // Multi-phase titanium crackles ("Pataaka" sizzle) + Rolling sky rumble
  // =========================================================================
  public playFireworkExplosion() {
    this.initContext();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;

    // --- PHASE 1: SUPERSONIC INITIAL "CRACK" (The sharp high-pressure transient) ---
    const crackBuffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.08), this.ctx.sampleRate);
    const crackData = crackBuffer.getChannelData(0);
    for (let i = 0; i < crackData.length; i++) {
      crackData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.015));
    }
    const crackSource = this.ctx.createBufferSource();
    crackSource.buffer = crackBuffer;

    const crackFilter = this.ctx.createBiquadFilter();
    crackFilter.type = 'bandpass';
    crackFilter.frequency.setValueAtTime(3200, now);
    crackFilter.Q.setValueAtTime(1.8, now);

    const crackGain = this.ctx.createGain();
    crackGain.gain.setValueAtTime(0.7, now);
    crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    crackSource.connect(crackFilter);
    crackFilter.connect(crackGain);
    crackGain.connect(this.masterGain);
    crackSource.start(now);
    crackSource.stop(now + 0.09);

    // --- PHASE 2: CHEST-THUMPING DEEP SUB-BASS BOOM (With WaveShaper Saturation) ---
    const subOsc1 = this.ctx.createOscillator();
    const subOsc2 = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();

    subOsc1.type = 'sine';
    subOsc2.type = 'triangle';

    // Sudden downward frequency dive (high-explosive decompression)
    subOsc1.frequency.setValueAtTime(160, now);
    subOsc1.frequency.exponentialRampToValueAtTime(35, now + 0.45);

    subOsc2.frequency.setValueAtTime(95, now);
    subOsc2.frequency.exponentialRampToValueAtTime(26, now + 0.55);

    subGain.gain.setValueAtTime(0.85, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    // Apply soft saturation to simulate air distortion
    if (this.distortionCurve) {
      const shaper = this.ctx.createWaveShaper();
      shaper.curve = this.distortionCurve as Float32Array<ArrayBuffer>;
      shaper.oversample = '2x';
      subOsc1.connect(shaper);
      subOsc2.connect(shaper);
      shaper.connect(subGain);
    } else {
      subOsc1.connect(subGain);
      subOsc2.connect(subGain);
    }

    subGain.connect(this.masterGain);
    subOsc1.start(now);
    subOsc2.start(now);
    subOsc1.stop(now + 0.75);
    subOsc2.stop(now + 0.75);

    // --- PHASE 3: MID-FREQUENCY EXPLOSIVE FIREBALL BODY ---
    const bodyBuffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.55), this.ctx.sampleRate);
    const bodyData = bodyBuffer.getChannelData(0);
    for (let i = 0; i < bodyData.length; i++) {
      bodyData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.12));
    }
    const bodySource = this.ctx.createBufferSource();
    bodySource.buffer = bodyBuffer;

    const bodyFilter = this.ctx.createBiquadFilter();
    bodyFilter.type = 'lowpass';
    bodyFilter.frequency.setValueAtTime(950, now);
    bodyFilter.frequency.linearRampToValueAtTime(180, now + 0.5);

    const bodyGain = this.ctx.createGain();
    bodyGain.gain.setValueAtTime(0.55, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    bodySource.connect(bodyFilter);
    bodyFilter.connect(bodyGain);
    bodyGain.connect(this.masterGain);
    bodySource.start(now);
    bodySource.stop(now + 0.6);

    // --- PHASE 4: TITANIUM SALUTE MICRO-CRACKLES ("Pataaka" / Sizzling Embers) ---
    // Multiple randomized rapid pops scattering across 0.3s to 1.1s
    const crackleCount = 18 + Math.floor(Math.random() * 10);
    for (let c = 0; c < crackleCount; c++) {
      const delay = 0.08 + Math.pow(Math.random(), 1.4) * 0.95; // Randomized cluster
      const popTime = now + delay;

      const microBuffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.025), this.ctx.sampleRate);
      const microData = microBuffer.getChannelData(0);
      for (let j = 0; j < microData.length; j++) {
        microData[j] = (Math.random() * 2 - 1) * Math.exp(-j / (this.ctx.sampleRate * 0.005));
      }
      const microSource = this.ctx.createBufferSource();
      microSource.buffer = microBuffer;

      const microFilter = this.ctx.createBiquadFilter();
      microFilter.type = 'highpass';
      microFilter.frequency.setValueAtTime(1800 + Math.random() * 2400, popTime);

      const microGain = this.ctx.createGain();
      const popVol = (0.15 + Math.random() * 0.22) * Math.exp(-delay * 1.5);
      microGain.gain.setValueAtTime(popVol, popTime);
      microGain.gain.exponentialRampToValueAtTime(0.0001, popTime + 0.025);

      microSource.connect(microFilter);
      microFilter.connect(microGain);
      microGain.connect(this.masterGain);

      microSource.start(popTime);
      microSource.stop(popTime + 0.03);
    }

    // --- PHASE 5: DISTANT ATMOSPHERIC SKY ROLLING RUMBLE ---
    const rumbleBuffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 1.4), this.ctx.sampleRate);
    const rumbleData = rumbleBuffer.getChannelData(0);
    for (let i = 0; i < rumbleData.length; i++) {
      rumbleData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.45));
    }
    const rumbleSource = this.ctx.createBufferSource();
    rumbleSource.buffer = rumbleBuffer;

    const rumbleFilter = this.ctx.createBiquadFilter();
    rumbleFilter.type = 'lowpass';
    rumbleFilter.frequency.setValueAtTime(140, now);
    rumbleFilter.frequency.linearRampToValueAtTime(55, now + 1.2);

    const rumbleGain = this.ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.3, now + 0.08);
    rumbleGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.35);

    rumbleSource.connect(rumbleFilter);
    rumbleFilter.connect(rumbleGain);
    rumbleGain.connect(this.masterGain);
    rumbleSource.start(now + 0.08);
    rumbleSource.stop(now + 1.4);
  }

  // Romantic harmonic shimmer
  public playRomanticKissShimmer() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const chord = [329.63, 440.0, 554.37, 659.25, 880.0];
    const now = this.ctx.currentTime;

    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.001, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.05 + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 2.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 2.3);
    });
  }

  // Button click sparkling chime
  public playSparkle(freq: number = 880, delay: number = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.3);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  public playChimeArpeggio() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      this.playSparkle(freq, idx * 0.07);
    });
  }

  // Soft Indian Raag Pentatonic Ambient Melody
  public startAmbientMusic() {
    if (this.isPlayingMusic) return;
    this.initContext();
    this.isPlayingMusic = true;

    const romanticScale = [
      220.00, 246.94, 277.18, 329.63, 369.99, 440.00, 493.88, 554.37, 659.25
    ];

    let noteIndex = 0;
    const playNextNote = () => {
      if (this.isMuted || !this.isPlayingMusic || !this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const baseFreq = romanticScale[noteIndex % romanticScale.length];
      noteIndex = (noteIndex + Math.floor(Math.random() * 3) + 1) % romanticScale.length;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);

      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      vibrato.frequency.setValueAtTime(4.5, now);
      vibratoGain.gain.setValueAtTime(2.5, now);
      vibrato.connect(osc.frequency);
      vibrato.start(now + 0.3);
      vibrato.stop(now + 2.8);

      const duration = 2.4 + Math.random() * 0.8;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    };

    playNextNote();
    this.ambientMusicInterval = window.setInterval(playNextNote, 2800);
  }

  public stopAmbientMusic() {
    this.isPlayingMusic = false;
    if (this.ambientMusicInterval !== null) {
      clearInterval(this.ambientMusicInterval);
      this.ambientMusicInterval = null;
    }
  }
}

export const soundEngine = new RealisticCrackerSoundEngine();
