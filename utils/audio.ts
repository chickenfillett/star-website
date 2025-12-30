import { SOUND_SYNC } from '@/constants/animation';

type SoundType = 
  | 'buttonClick'
  | 'pageLoad'
  | 'easterEgg'
  | 'audioControl'
  | 'contentInteraction'
  | 'permissionUnlock'
  | 'hover'
  | 'scroll'
  | 'notification'
  | 'success'
  | 'error'
  | 'typing';

type WaveType = 'sine' | 'square' | 'sawtooth' | 'triangle';

interface SoundConfig {
  type: WaveType;
  frequency: number;
  duration: number;
  volume: number;
  attack?: number;
  decay?: number;
  sustain?: number;
  release?: number;
  filter?: {
    type: 'lowpass' | 'highpass' | 'bandpass' | 'notch';
    frequency: number;
    Q?: number;
  };
  effects?: {
    reverb?: boolean;
    delay?: boolean;
    distortion?: number;
  };
}

class SoundManager {
  private audioContext: AudioContext | null = null;
  private lastPlayTime: Map<SoundType, number> = new Map();
  private isInitialized: boolean = false;
  private masterGain: GainNode | null = null;
  private reverbNode: ConvolverNode | null = null;
  private delayNode: DelayNode | null = null;
  private masterVolume: number = 0.5;
  private isMuted: boolean = false;

  initialize(): void {
    if (this.isInitialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = this.masterVolume;
      
      this.createReverb();
      this.createDelay();
      
      this.isInitialized = true;
    } catch (error) {
      console.warn('AudioContext initialization failed:', error);
    }
  }

  private createReverb(): void {
    if (!this.audioContext) return;
    
    try {
      const convolver = this.audioContext.createConvolver();
      const rate = this.audioContext.sampleRate;
      const length = rate * 2;
      const impulse = this.audioContext.createBuffer(2, length, rate);
      
      for (let channel = 0; channel < 2; channel++) {
        const channelData = impulse.getChannelData(channel);
        for (let i = 0; i < length; i++) {
          channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
        }
      }
      
      convolver.buffer = impulse;
      this.reverbNode = convolver;
    } catch (error) {
      console.warn('Reverb creation failed:', error);
    }
  }

  private createDelay(): void {
    if (!this.audioContext) return;
    
    try {
      this.delayNode = this.audioContext.createDelay(5);
      this.delayNode.delayTime.value = 0.3;
    } catch (error) {
      console.warn('Delay creation failed:', error);
    }
  }

  play(type: SoundType, volume?: number): void {
    if (!this.audioContext) {
      this.initialize();
      if (!this.audioContext) return;
    }

    if (this.isMuted) return;

    const now = Date.now();
    const lastPlay = this.lastPlayTime.get(type) || 0;
    const minInterval = 50;

    if (now - lastPlay < minInterval) {
      return;
    }

    this.lastPlayTime.set(type, now);

    const actualVolume = volume ?? SOUND_SYNC.volume[type] ?? 0.3;
    const duration = SOUND_SYNC.duration[type] ?? 0.2;

    this.generateSound(type, actualVolume, duration);
  }

  setVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : this.masterVolume;
    }
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : this.masterVolume;
    }
  }

  getVolume(): number {
    return this.masterVolume;
  }

  getIsMuted(): boolean {
    return this.isMuted;
  }

  private getSoundConfig(type: SoundType): SoundConfig {
    const configs: Record<SoundType, SoundConfig> = {
      buttonClick: {
        type: 'sine',
        frequency: 1200,
        duration: 0.15,
        volume: 0.3,
        attack: 0.005,
        decay: 0.05,
        sustain: 0.02,
        release: 0.07,
        filter: { type: 'lowpass', frequency: 3000, Q: 1 },
      },
      pageLoad: {
        type: 'sine',
        frequency: 150,
        duration: 2.5,
        volume: 0.2,
        attack: 0.5,
        decay: 0.5,
        sustain: 1,
        release: 0.5,
        filter: { type: 'lowpass', frequency: 500, Q: 2 },
        effects: { reverb: true },
      },
      easterEgg: {
        type: 'triangle',
        frequency: 880,
        duration: 0.12,
        volume: 0.4,
        attack: 0.01,
        decay: 0.03,
        sustain: 0.05,
        release: 0.03,
        filter: { type: 'highpass', frequency: 800, Q: 1 },
      },
      audioControl: {
        type: 'sine',
        frequency: 700,
        duration: 0.08,
        volume: 0.2,
        attack: 0.01,
        decay: 0.02,
        sustain: 0.03,
        release: 0.02,
        filter: { type: 'lowpass', frequency: 1500, Q: 1 },
      },
      contentInteraction: {
        type: 'sine',
        frequency: 900,
        duration: 0.1,
        volume: 0.15,
        attack: 0.005,
        decay: 0.02,
        sustain: 0.04,
        release: 0.035,
        filter: { type: 'bandpass', frequency: 1000, Q: 2 },
      },
      permissionUnlock: {
        type: 'triangle',
        frequency: 880,
        duration: 0.18,
        volume: 0.35,
        attack: 0.005,
        decay: 0.05,
        sustain: 0.08,
        release: 0.045,
        filter: { type: 'lowpass', frequency: 3000, Q: 1 },
        effects: { reverb: true, delay: true },
      },
      hover: {
        type: 'sine',
        frequency: 600,
        duration: 0.05,
        volume: 0.1,
        attack: 0.01,
        decay: 0.02,
        sustain: 0.01,
        release: 0.02,
        filter: { type: 'lowpass', frequency: 1200, Q: 1 },
      },
      scroll: {
        type: 'sine',
        frequency: 400,
        duration: 0.03,
        volume: 0.08,
        attack: 0.005,
        decay: 0.01,
        sustain: 0.01,
        release: 0.005,
        filter: { type: 'lowpass', frequency: 800, Q: 2 },
      },
      notification: {
        type: 'sine',
        frequency: 523.25,
        duration: 0.3,
        volume: 0.3,
        attack: 0.01,
        decay: 0.1,
        sustain: 0.15,
        release: 0.04,
        filter: { type: 'lowpass', frequency: 2000, Q: 1 },
        effects: { reverb: true },
      },
      success: {
        type: 'triangle',
        frequency: 659.25,
        duration: 0.25,
        volume: 0.3,
        attack: 0.005,
        decay: 0.05,
        sustain: 0.15,
        release: 0.045,
        filter: { type: 'lowpass', frequency: 2500, Q: 1 },
        effects: { reverb: true },
      },
      error: {
        type: 'sawtooth',
        frequency: 200,
        duration: 0.2,
        volume: 0.25,
        attack: 0.01,
        decay: 0.05,
        sustain: 0.1,
        release: 0.04,
        filter: { type: 'lowpass', frequency: 500, Q: 2 },
      },
      typing: {
        type: 'sine',
        frequency: 800 + Math.random() * 200,
        duration: 0.04,
        volume: 0.12,
        attack: 0.005,
        decay: 0.01,
        sustain: 0.02,
        release: 0.005,
        filter: { type: 'lowpass', frequency: 2000, Q: 1 },
      },
    };

    return configs[type];
  }

  private generateSound(type: SoundType, volume: number, duration: number): void {
    if (!this.audioContext || !this.masterGain) return;

    const config = this.getSoundConfig(type);
    const now = this.audioContext.currentTime;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();

    oscillator.type = config.type;
    oscillator.frequency.setValueAtTime(config.frequency, now);

    if (config.filter) {
      filterNode.type = config.filter.type;
      filterNode.frequency.setValueAtTime(config.filter.frequency, now);
      if (config.filter.Q) {
        filterNode.Q.value = config.filter.Q;
      }
    }

    const attack = config.attack || 0.01;
    const decay = config.decay || 0.1;
    const sustain = config.sustain || 0.5;
    const release = config.release || 0.3;
    
    const totalDuration = attack + decay + sustain + release;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + attack);
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.7, now + attack + decay);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + totalDuration);

    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(this.masterGain);

    if (config.effects?.reverb && this.reverbNode) {
      const reverbGain = this.audioContext.createGain();
      reverbGain.gain.value = 0.3;
      gainNode.disconnect();
      gainNode.connect(this.masterGain);
      gainNode.connect(reverbGain);
      reverbGain.connect(this.reverbNode);
      this.reverbNode.connect(this.masterGain);
    }

    if (config.effects?.delay && this.delayNode) {
      const delayGain = this.audioContext.createGain();
      delayGain.gain.value = 0.2;
      gainNode.connect(delayGain);
      delayGain.connect(this.delayNode);
      this.delayNode.connect(this.masterGain);
    }

    oscillator.start(now);
    oscillator.stop(now + totalDuration + 0.1);
  }

  isNightTime(): boolean {
    const hour = new Date().getHours();
    return hour >= 23 || hour < 5;
  }
}

export const soundManager = new SoundManager();