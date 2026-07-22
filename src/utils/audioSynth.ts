/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Bulletproof audio unlocker for Android, iOS (iPhone/iPad), macOS, Windows, etc.
if (typeof window !== "undefined") {
  const unlock = () => {
    try {
      const ctx = getAudioContext();
      if (ctx) {
        // Create and play a 1-millisecond silent buffer to wake up browser's audio hardware
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);

        // Resume AudioContext if suspended
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        // Once successfully running, clean up all unlock event listeners
        if (ctx.state === "running") {
          window.removeEventListener("click", unlock, true);
          window.removeEventListener("touchstart", unlock, true);
          window.removeEventListener("touchend", unlock, true);
        }
      }
    } catch (e) {
      console.warn("Failed to unlock audio context:", e);
    }
  };

  // Bind to native user gesture events in the capture phase (true)
  // This guarantees context is unlocked BEFORE React synthetic click handlers run
  window.addEventListener("click", unlock, true);
  window.addEventListener("touchstart", unlock, true);
  window.addEventListener("touchend", unlock, true);
}

/**
 * Synthesizes a soft blowing wind sound for extinguishing candles
 */
export function playBlowSound() {
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 0.35; // 0.35 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    // Bandpass filter to sculpt the white noise into a "whoosh" breath sound
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.35);
    filter.Q.value = 2.0;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.55, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start();
  } catch (e) {
    console.warn("Web Audio API not supported or blocked:", e);
  }
}

/**
 * Synthesizes a cute cartoonish spring-like "jiggle" (tưng tưng) sound
 */
export function playJiggleSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const playBounce = (startTime: number, startFreq: number, endFreq: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "triangle"; // Soft retro tone
      osc.frequency.setValueAtTime(startFreq, startTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);
      
      gain.gain.setValueAtTime(0.32, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    // First low bounce
    playBounce(now, 160, 320, 0.12);
    // Second higher bounce slightly offset to make it "tưng tưng"
    playBounce(now + 0.08, 220, 440, 0.15);
  } catch (e) {
    console.warn("Web Audio API error:", e);
  }
}

/**
 * Synthesizes a premium magical upward arpeggio chime for box opening
 */
export function playOpenSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Sparkly chime arpeggio: C5 -> E5 -> G5 -> C6
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    
    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const time = now + index * 0.06;
      
      osc.type = "sine"; // Pure tone
      osc.frequency.setValueAtTime(freq, time);
      
      // Fast attack, slow decay for a crystalline bell-like sound
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.28, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.005, time + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(time);
      osc.stop(time + 0.4);
    });
  } catch (e) {
    console.warn("Web Audio API error:", e);
  }
}

/**
 * Synthesizes a soft, clean "miss click" bloop sound
 */
export function playMissSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const playPluck = (startTime: number, freq: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine"; // Clean, sweet tone like a drop of water or music box pluck
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.15, startTime + duration); // Gentle slide up
      
      gain.gain.setValueAtTime(0.22, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    // Play two quick, gentle plucks offset slightly for a soft "tính tính / tưng tưng" sound
    playPluck(now, 440, 0.08); // Note A4
    playPluck(now + 0.05, 554.37, 0.09); // Note C#5
  } catch (e) {
    console.warn("Web Audio API error:", e);
  }
}
