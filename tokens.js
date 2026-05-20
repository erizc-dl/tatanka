// Template token resolver. Replaces {{token}} placeholders in scene prose.
const Tokens = (() => {
  const SPIRIT_MEMORY = {
    wolf:  "The wolf who sat beside you on the butte — patient, unhurried — is with you still.",
    eagle: "The eagle who called above you and dove east toward the sunrise — you have not forgotten that cry.",
    bear:  "The bear who moved through the earth-sound below you on the butte — steady, enduring — you carry that weight."
  };

  const HUNT_MEMORY = {
    success: "Your first hunt was clean. Three arrows, three strikes. The elders said nothing, which was everything.",
    modest:  "Your first hunt — one arrow struck, one missed, one grazed. Enough meat for the family. Enough to try again.",
    injury:  "Your first hunt ended when the horse stumbled and threw you. The bruise healed. The humility remained."
  };

  function resolveTokens(text, state) {
    if (!text) return text;

    return text
      .replace(/\{\{wife\}\}/g, state.wifeName || "Wíŋyaŋ Wašté")
      .replace(/\{\{wife_band\}\}/g, () => {
        if (!state.wifeBand) return "";
        return state.wifeBand === "hunkpapa" ? "Hunkpapa" : "Oglala";
      })
      .replace(/\{\{spirit_memory\}\}/g, () => {
        return state.spiritAnimal ? SPIRIT_MEMORY[state.spiritAnimal] : "";
      })
      .replace(/\{\{hunt_memory\}\}/g, () => {
        return state.firstHuntOutcome ? HUNT_MEMORY[state.firstHuntOutcome] : "";
      })
      .replace(/\{\{misun_pine_ridge\}\}/g, () => {
        if (!state.misunState || state.misunState.startsWith("dead")) return "";
        if (state.pathTaken === "B") return "Misúŋ rides at the back of the small line. He does not speak.";
        return "";
      })
      .replace(/\{\{atewaye_pine_ridge\}\}/g, () => {
        if (!state.atewayeAlive) return "";
        if (state.pathTaken === "B") return "Atéwaye walks beside Iná, slower than he once was. He keeps his eyes on the ground.";
        return "";
      })
      .replace(/\{\{misun_years_pass\}\}/g, () => {
        // Fires when Misúŋ survived to the reservation and died here (flag set in act3b_years_pass onEnter)
        if (!state._misunDiedInReservation) return "";
        return "Misúŋ died in the spring of 1885 — a fall from a cutbank above the creek, hunting alone near Wakpá Wašté. He was thirty-four. You were not with him.";
      })
      .replace(/\{\{atewaye_years_pass\}\}/g, () => {
        // Fires when Atéwaye survived to reservation and died here (flag set in act3b_years_pass onEnter)
        if (!state._atewayeDiedInReservation) return "";
        return "Atéwaye died in the winter of 1883. He sat with the old pipe for a long time, then lay down in his blankets. In the morning he was gone. He was sixty years old.";
      })
      .replace(/\{\{misun_long_pursuit\}\}/g, () => {
        if (state.misunState !== "dead_act3") return "";
        return "Misúŋ fell in the Long Pursuit — in the mountains, in winter. You buried him under rocks because the ground was too frozen to dig.";
      })
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  return { resolveTokens };
})();
