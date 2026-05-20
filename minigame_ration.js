// Ration Line narrative minigame.
// Engine calls: MinigameRation.run(state) → Promise<void>
// Renders 4 sub-scenes inside .scene-content; applies stat effects; resolves when done.
const MinigameRation = (() => {

  const SUBSCENES = [
    {
      label: "1 of 4",
      body: "An elderly woman shuffles in front of you in the line. She moves slowly, head down. The people behind you stir.",
      choices: [
        { text: "Stay silent. Let it pass.",            effects: { culturalIntegrity: 5 } },
        { text: "Speak up — you were here first.",      effects: { standing: 3, hope: -5 } },
        { text: "Let her pass. Say a kind word to her.", effects: { culturalIntegrity: 5, hope: 3 } }
      ]
    },
    {
      label: "2 of 4",
      body: "The issue clerk weighs your cut of beef. The scale reads 3.2 pounds. Your enrollment paper says 4. He writes 4.0 in the ledger and wraps 3.2.",
      choices: [
        { text: "Argue. Point to the scale.",                        effects: { standing: 5, hope: -5 },       flag: "rationTroublemaker" },
        { text: "Take it without a word.",                           effects: { culturalIntegrity: -5, hope: -5, food: 3 } },
        { text: "Speak to him quietly in English. Ask him to check.", effects: { standing: 3, hope: 3, food: 3 }, flag: "rationSpeaker"      }
      ]
    },
    {
      label: "3 of 4",
      body: "An old man reaches the window. He has no tag — lost it, or it was taken. The clerk shakes his head. The man stands there. He is very thin.",
      choices: [
        { text: "Do nothing. You cannot help everyone.",                              effects: { spirit: -5, hope: -5 } },
        { text: "Speak for him. Tell the clerk you'll vouch for his number.",         effects: { standing: 3, culturalIntegrity: 5 },     flag: "rationSpeaker" },
        { text: "Give him your tag. You'll come back on the next issue day.",         effects: { spirit: 5, standing: 5, food: -10 } }
      ]
    },
    {
      label: "4 of 4",
      body: "A small girl stands at the edge of the line, watching. Her dress is thin for the cold. She is staring at the sugar packet in your hand.",
      choices: [
        { text: "Give her your sugar.",        effects: { spirit: 5, hope: 5, food: -3 } },
        { text: "Pocket it. Your family needs it.", effects: { spirit: -3 } },
        { text: "Give her half.",              effects: { spirit: 3, hope: 3, food: -2 } }
      ]
    }
  ];

  function run(state) {
    return new Promise(resolve => {
      let current = 0;

      function showSubscene() {
        if (current >= SUBSCENES.length) { resolve(); return; }

        const sub = SUBSCENES[current];
        const content = document.querySelector(".scene-content");
        if (!content) { resolve(); return; }

        content.innerHTML = "";

        const dateEl = document.createElement("div");
        dateEl.className = "scene-date";
        dateEl.textContent = `Ration day — ${sub.label}`;
        content.appendChild(dateEl);

        const bodyEl = document.createElement("div");
        bodyEl.className = "scene-body";
        const p = document.createElement("p");
        p.className = "body-line visible";
        p.textContent = sub.body;
        bodyEl.appendChild(p);
        content.appendChild(bodyEl);

        const choicesEl = document.createElement("div");
        choicesEl.className = "scene-choices";
        choicesEl.style.display = "";

        sub.choices.forEach((choice, i) => {
          const btn = document.createElement("button");
          btn.className = "choice-btn";
          btn.innerHTML = `<span class="choice-num">${i + 1}</span> ${choice.text}`;
          btn.addEventListener("click", () => {
            Stats.applyEffects(state, choice.effects);
            if (choice.flag) state[choice.flag] = true;
            current++;
            showSubscene();
          });
          choicesEl.appendChild(btn);
        });

        // Keyboard 1-3 support
        function keyHandler(e) {
          const n = parseInt(e.key);
          if (n >= 1 && n <= sub.choices.length) {
            document.removeEventListener("keydown", keyHandler);
            Stats.applyEffects(state, sub.choices[n - 1].effects);
            if (sub.choices[n - 1].flag) state[sub.choices[n - 1].flag] = true;
            current++;
            showSubscene();
          }
        }
        document.addEventListener("keydown", keyHandler);
        // Clean up if choice button clicked
        choicesEl.querySelectorAll && setTimeout(() => {
          choicesEl.querySelectorAll(".choice-btn").forEach(btn => {
            btn.addEventListener("click", () => document.removeEventListener("keydown", keyHandler), { once: true });
          });
        }, 0);

        content.appendChild(choicesEl);
      }

      showSubscene();
    });
  }

  return { run };
})();
