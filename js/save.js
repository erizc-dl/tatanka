// localStorage save/load. Single slot. Versioned.
const Save = (() => {
  const KEY = "tatanka_save_v1";
  const EXPECTED_VERSION = 1;

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Save failed:", e);
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed.saveVersion !== EXPECTED_VERSION) return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function wipe() {
    localStorage.removeItem(KEY);
  }

  function hasSave() {
    return load() !== null;
  }

  return { save, load, wipe, hasSave };
})();
