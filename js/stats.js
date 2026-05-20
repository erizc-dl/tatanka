// Stats management: state factory, effect application, stat list for UI.
const Stats = (() => {
  function initialState() {
    return {
      health: 80,
      family: 3,
      food: 70,
      hunting: 30,
      spirit: 60,
      standing: 40,
      culturalIntegrity: 90,
      hope: 70,

      resistanceScore: 0,
      spiritAnimal: null,
      firstHuntOutcome: null,
      misunState: "alive",
      familyNames: [
        { name: "Iná", role: "mother", alive: true },
        { name: "Atéwaye", role: "father", alive: true },
        { name: "Misúŋ", role: "brother", alive: true }
      ],
      inaAlive: true,
      atewayeAlive: true,
      wifeAlive: true,
      sonAlive: true,
      daughterAlive: true,
      childAtCarlisle: false,
      tribalPolice: false,
      joinedGhostDance: false,
      withBigFoot: false,

      playerName: "",
      band: null,
      startingTrait: null,
      pathTaken: null,
      wifeName: null,

      currentSceneId: "character_creation",
      currentAct: 1,
      playerAge: 10,
      sceneHistory: [],
      saveVersion: 1
    };
  }

  // Kill a family member: marks them dead in familyNames, syncs boolean flags, decrements family.
  // Caller must separately set state.misunState for role "brother".
  // Safe to call if already dead — returns early without double-decrementing.
  function killFamilyMember(state, role) {
    const m = state.familyNames.find(f => f.role === role);
    if (!m || !m.alive) return;
    m.alive = false;
    state.family = Math.max(0, (state.family || 0) - 1);
    if (role === "mother")   state.inaAlive     = false;
    if (role === "father")   state.atewayeAlive = false;
    if (role === "wife")     state.wifeAlive    = false;
    if (role === "son")      state.sonAlive     = false;
    if (role === "daughter") state.daughterAlive = false;
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function applyEffects(state, effects) {
    if (!effects) return;
    const changed = {};

    for (const [key, delta] of Object.entries(effects)) {
      if (key === "spirit_animal") { state.spiritAnimal = delta; continue; }
      if (key === "misun_state") { state.misunState = delta; continue; }
      if (key === "path_taken") { state.pathTaken = delta; continue; }
      if (key === "child_at_carlisle") { state.childAtCarlisle = delta; continue; }
      if (key === "tribal_police") { state.tribalPolice = delta; continue; }
      if (key === "joined_ghost_dance") { state.joinedGhostDance = delta; continue; }
      if (key === "with_big_foot") { state.withBigFoot = delta; continue; }

      if (typeof delta !== "number") { state[key] = delta; continue; }

      const prev = state[key] ?? 0;
      let next = prev + delta;

      if (key === "family") next = clamp(next, 0, 5);
      else if (key === "resistanceScore") next = clamp(next, 0, 10);
      else next = clamp(next, 0, 100);

      if (next !== prev) changed[key] = delta;
      state[key] = next;
    }

    return changed;
  }

  function getStatList(state) {
    return [
      { key: "health",           name: "HP",    value: state.health,           max: 100 },
      { key: "family",           name: "FAM",   value: state.family,           max: 5   },
      { key: "food",             name: "FOOD",  value: state.food,             max: 100 },
      { key: "hunting",          name: "HUNT",  value: state.hunting,          max: 100 },
      { key: "spirit",           name: "SPRT",  value: state.spirit,           max: 100 },
      { key: "standing",         name: "STND",  value: state.standing,         max: 100 },
      { key: "culturalIntegrity",name: "CULT",  value: state.culturalIntegrity,max: 100 },
      { key: "hope",             name: "HOPE",  value: state.hope,             max: 100 }
    ];
  }

  return { initialState, applyEffects, getStatList, killFamilyMember };
})();
