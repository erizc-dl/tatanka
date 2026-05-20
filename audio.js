// Audio: ambient crossfade + one-shot SFX. Gracefully degrades if files are missing.
const Audio = (() => {
  const MUTE_KEY = "tatanka_audio_mute";
  const BASE_PATH = "assets/audio/";
  const FADE_MS = 800;
  const MASTER_VOLUME = 0.6;

  let currentAmbient = null;
  let muted = localStorage.getItem(MUTE_KEY) === "true";
  let paused = false;
  let pendingAmbientName = null;

  function isMuted() { return muted; }

  function setMuted(bool) {
    muted = bool;
    localStorage.setItem(MUTE_KEY, String(bool));
    if (currentAmbient) {
      currentAmbient.muted = bool;
    }
  }

  // Strips any existing extension, tries .ogg first, falls back to .wav on error.
  function withFallback(el, name, onReady) {
    const base = BASE_PATH + name.replace(/\.(ogg|wav)$/i, "");
    el.src = base + ".ogg";
    const origError = el.onerror;
    el.onerror = () => {
      if (!el.src.endsWith(".wav")) {
        el.onerror = origError;
        el.src = base + ".wav";
        el.load();
      } else if (origError) {
        origError();
      }
    };
  }

  function makeAudio(name) {
    const el = document.createElement('audio');
    el.src = BASE_PATH + name;
    el.volume = 0;
    el.muted = muted;
    return el;
  }

  function fadeOut(el, ms) {
    if (!el) return;
    const start = el.volume;
    const step = start / (ms / 50);
    const timer = setInterval(() => {
      el.volume = Math.max(0, el.volume - step);
      if (el.volume <= 0) {
        clearInterval(timer);
        el.pause();
        el.src = "";
      }
    }, 50);
  }

  function fadeIn(el, ms) {
    const target = MASTER_VOLUME;
    const step = target / (ms / 50);
    const timer = setInterval(() => {
      el.volume = Math.min(target, el.volume + step);
      if (el.volume >= target) clearInterval(timer);
    }, 50);
  }

  function playAmbient(name) {
    if (!name) return;
    pendingAmbientName = name;

    const el = document.createElement('audio');
    el.loop = true;
    el.volume = 0;
    el.muted = muted;

    el.onerror = () => {};  // final fallback: file missing in both formats, silently skip

    el.oncanplaythrough = () => {
      if (pendingAmbientName !== name) return; // superseded
      const old = currentAmbient;
      currentAmbient = el;
      if (!paused) {
        el.play().catch(() => {});
        fadeIn(el, FADE_MS);
      }
      if (old) fadeOut(old, FADE_MS);
    };

    withFallback(el, name);
    el.load();
  }

  function playSfx(name) {
    if (!name || muted) return;
    const el = document.createElement('audio');
    el.volume = MASTER_VOLUME;
    el.muted = muted;

    el.onerror = () => {};
    el.oncanplaythrough = () => {
      el.play().catch(() => {});
    };
    withFallback(el, name);
    el.load();
  }

  function pauseAmbient() {
    paused = true;
    if (currentAmbient) currentAmbient.pause();
  }

  function resumeAmbient() {
    paused = false;
    if (currentAmbient) currentAmbient.play().catch(() => {});
  }

  return { playAmbient, playSfx, setMuted, isMuted, pauseAmbient, resumeAmbient };
})();
