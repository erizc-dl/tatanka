// Core engine: scene transitions, typewriter, character creation, pause, menus.
const Engine = (() => {
  let state = null;
  let typewriterTimer = null;
  let typewriterDone = false;
  let choicesRevealed = false;
  let isPaused = false;
  let isInOverlay = false;
  let titleMenuIndex = 0;
  let titleMenuItems = [];

  // ── DOM helpers ──────────────────────────────────────────────────────────

  const app = () => document.getElementById("app");

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  // ── Init ─────────────────────────────────────────────────────────────────

  function init() {
    document.addEventListener("keydown", globalKeyHandler);
    showTitleScreen();
  }

  // ── Title screen ─────────────────────────────────────────────────────────

  function showTitleScreen() {
    isPaused = false;
    isInOverlay = false;
    titleMenuIndex = 0;

    const hasSave = Save.hasSave();
    titleMenuItems = [
      { label: "NEW GAME",          action: newGame          },
      hasSave ? { label: "CONTINUE", action: continueGame } : null,
      { label: "HISTORICAL NOTES",  action: openHistoricalNotes },
      { label: "CREDITS",           action: showCredits      }
    ].filter(Boolean);

    app().innerHTML = "";
    app().className = "screen-title";

    const wrap = el("div", "title-wrap");

    // Buffalo pixel art
    const svgWrap = document.createElement("img");
    svgWrap.className = "title-buffalo";
    svgWrap.src = "assets/art/ui/buffalo_title_image.png";
    svgWrap.alt = "Buffalo silhouette";

    const titleText = el("h1", "title-main", "TATANKA");
    const subtitle  = el("p",  "title-sub",  "a Lakota history");

    const menuEl = el("nav", "title-menu");
    menuEl.setAttribute("role", "menu");

    titleMenuItems.forEach((item, i) => {
      const btn = el("button", "title-menu-item", "&#9658; " + item.label);
      btn.dataset.index = i;
      btn.addEventListener("click", () => { titleMenuIndex = i; activateTitleItem(); });
      btn.addEventListener("mouseenter", () => { titleMenuIndex = i; renderTitleFocus(); });
      menuEl.appendChild(btn);
    });

    wrap.append(svgWrap, titleText, subtitle, menuEl);
    app().appendChild(wrap);

    // Prairie silhouette bar at bottom
    const prairie = el("div", "title-prairie");
    app().appendChild(prairie);

    renderTitleFocus();

    requestAnimationFrame(() => wrap.classList.add("fade-in"));
  }

  function renderTitleFocus() {
    document.querySelectorAll(".title-menu-item").forEach((btn, i) => {
      btn.classList.toggle("active", i === titleMenuIndex);
    });
  }

  function activateTitleItem() {
    const item = titleMenuItems[titleMenuIndex];
    if (item) item.action();
  }

  // ── Character creation ────────────────────────────────────────────────────

  function newGame() {
    Save.wipe();
    state = Stats.initialState();
    showCharacterCreation();
  }

  function showCharacterCreation() {
    app().innerHTML = "";
    app().className = "screen-charcreate";

    const overlay = el("div", "charcreate-overlay");
    const box = el("div", "charcreate-box");

    box.innerHTML = `
      <h2 class="charcreate-title">WHO ARE YOU?</h2>

      <label class="charcreate-label" for="cc-name">YOUR NAME</label>
      <input id="cc-name" class="charcreate-input" type="text" maxlength="32"
             placeholder="Enter your name..." autocomplete="off">

      <div class="charcreate-label">YOUR BAND</div>
      <div class="charcreate-radios" id="cc-band">
        <label class="charcreate-radio">
          <input type="radio" name="band" value="hunkpapa">
          <span>HUNKPAPA</span>
          <span class="charcreate-radio-sub">Sitting Bull's people. The Cannonball River country.</span>
        </label>
        <label class="charcreate-radio">
          <input type="radio" name="band" value="oglala">
          <span>OGLALA</span>
          <span class="charcreate-radio-sub">Crazy Horse's people. The Black Hills country.</span>
        </label>
      </div>

      <div class="charcreate-label">YOUR GIFT</div>
      <div class="charcreate-radios" id="cc-trait">
        <label class="charcreate-radio">
          <input type="radio" name="trait" value="hunter">
          <span>HUNTER</span>
          <span class="charcreate-radio-sub">+20 Hunting, +10 Food. You read the land.</span>
        </label>
        <label class="charcreate-radio">
          <input type="radio" name="trait" value="warrior">
          <span>WARRIOR</span>
          <span class="charcreate-radio-sub">+15 Standing, +10 Health. You stand in front.</span>
        </label>
        <label class="charcreate-radio">
          <input type="radio" name="trait" value="dreamer">
          <span>DREAMER</span>
          <span class="charcreate-radio-sub">+20 Spirit, +10 Hope. You listen to the night.</span>
        </label>
      </div>

      <button id="cc-confirm" class="charcreate-confirm" disabled>BEGIN</button>
    `;

    overlay.appendChild(box);
    app().appendChild(overlay);

    const nameInput = document.getElementById("cc-name");
    const confirmBtn = document.getElementById("cc-confirm");

    function checkReady() {
      const name = nameInput.value.trim();
      const band = document.querySelector('input[name="band"]:checked');
      const trait = document.querySelector('input[name="trait"]:checked');
      confirmBtn.disabled = !(name && band && trait);
    }

    nameInput.addEventListener("input", checkReady);
    document.querySelectorAll('input[name="band"]').forEach(r => r.addEventListener("change", checkReady));
    document.querySelectorAll('input[name="trait"]').forEach(r => r.addEventListener("change", checkReady));

    confirmBtn.addEventListener("click", () => {
      const name  = nameInput.value.trim();
      const band  = document.querySelector('input[name="band"]:checked').value;
      const trait = document.querySelector('input[name="trait"]:checked').value;

      state.playerName   = name;
      state.band         = band;
      state.startingTrait = trait;

      const bonuses = {
        hunter:  { hunting: 20, food: 10 },
        warrior: { standing: 15, health: 10 },
        dreamer: { spirit: 20, hope: 10 }
      };
      Stats.applyEffects(state, bonuses[trait]);

      goToScene("act1_opening");
    });
  }

  // ── Continue ──────────────────────────────────────────────────────────────

  function continueGame() {
    const saved = Save.load();
    if (!saved) { showTitleScreen(); return; }
    state = saved;
    goToScene(state.currentSceneId);
  }

  // ── Scene transition ──────────────────────────────────────────────────────

  function goToScene(sceneId) {
    // Restore scroll lock when leaving an ending screen
    document.documentElement.style.overflowY = "";
    document.body.style.overflowY = "";
    document.body.style.height = "";

    if (sceneId === "__title__") { showTitleScreen(); return; }

    const scene = Scenes[sceneId];
    if (!scene) {
      console.error("Unknown scene:", sceneId);
      showTitleScreen();
      return;
    }

    // Update engine state
    state.currentSceneId = sceneId;
    state.currentAct     = scene.act || state.currentAct;
    if (scene.age) state.playerAge = scene.age;
    if (sceneId !== "character_creation") state.sceneHistory.push(sceneId);

    // Run onEnter hook
    if (scene.onEnter) scene.onEnter(state);

    // Auto-save
    if (sceneId !== "character_creation") Save.save(state);

    // Audio
    if (scene.ambient) Audio.playAmbient(scene.ambient);
    if (scene.sfx)     Audio.playSfx(scene.sfx);

    // Render
    if (scene.type === "scrolling_finale") {
      renderScrollingFinale(scene);
    } else if (scene.type === "ending") {
      renderEndingScene(scene);
    } else {
      renderScene(scene);
    }
  }

  function renderScene(scene) {
    typewriterDone = false;
    choicesRevealed = false;
    clearTypewriter();

    app().innerHTML = "";
    app().className = "screen-game";

    // Status bar
    app().appendChild(buildStatusBar());

    // Illustration band
    const imgBand = el("div", "scene-illustration");
    const bg = buildBackground(scene);
    imgBand.appendChild(bg);
    app().appendChild(imgBand);

    // Content band
    const content = el("div", "scene-content");

    if (scene.date) {
      const dateEl = el("div", "scene-date", scene.date);
      content.appendChild(dateEl);
    }

    const bodyEl = el("div", "scene-body");
    content.appendChild(bodyEl);

    const choicesEl = el("div", "scene-choices");
    choicesEl.style.display = "none";
    content.appendChild(choicesEl);

    // Skip hint
    const skipHint = el("div", "typewriter-skip-hint", "[ space to skip ]");
    content.appendChild(skipHint);

    app().appendChild(content);

    // Resolve body text tokens
    const lines = (scene.body || []).map(line => Tokens.resolveTokens(line, state));

    // Skip typewriter on click/space
    function skipTypewriter() {
      if (typewriterDone) return;
      clearTypewriter();
      typewriterDone = true;
      skipHint.classList.remove("visible");
      bodyEl.innerHTML = "";
      lines.forEach(line => {
        const p = el("p", "body-line visible", line);
        bodyEl.appendChild(p);
      });
      revealChoices(scene, choicesEl);
    }

    app().addEventListener("click", function onSkip(e) {
      if (e.target.closest(".scene-choices")) return;
      if (!typewriterDone) { skipTypewriter(); }
    }, { once: false });

    // Typewriter reveal
    setTimeout(() => skipHint.classList.add("visible"), 400);
    typewriterReveal(lines, bodyEl, () => {
      typewriterDone = true;
      skipHint.classList.remove("visible");
      revealChoices(scene, choicesEl);
    });
  }

  function typewriterReveal(lines, container, onDone, lineDelay) {
    const delay = lineDelay !== undefined ? lineDelay : 120;
    let i = 0;
    function showNext() {
      if (i >= lines.length) { onDone(); return; }
      const p = el("p", "body-line");
      container.appendChild(p);
      p.textContent = lines[i];
      requestAnimationFrame(() => p.classList.add("visible"));
      i++;
      typewriterTimer = setTimeout(showNext, delay);
    }
    showNext();
  }

  function clearTypewriter() {
    if (typewriterTimer) { clearTimeout(typewriterTimer); typewriterTimer = null; }
  }

  // ── Wounded Knee scrolling-finale renderer ────────────────────────────────

  function renderScrollingFinale(scene) {
    typewriterDone = false;
    choicesRevealed = false;
    clearTypewriter();

    app().innerHTML = "";
    app().className = "screen-game";
    app().appendChild(buildStatusBar());

    // Illustration band — black from the start
    const imgBand = el("div", "scene-illustration");
    imgBand.style.background = "var(--bg-void)";
    app().appendChild(imgBand);

    // Content band for intro body text
    const content = el("div", "scene-content");
    if (scene.date) content.appendChild(el("div", "scene-date", scene.date));
    const bodyEl = el("div", "scene-body");
    content.appendChild(bodyEl);
    app().appendChild(content);

    const bodyLines = (scene.body || []).map(l => Tokens.resolveTokens(l, state));

    typewriterReveal(bodyLines, bodyEl, () => {
      typewriterDone = true;
      setTimeout(() => _startVictimScroll(scene, imgBand), 1500);
    });
  }

  function _startVictimScroll(scene, imgBand) {
    imgBand.innerHTML = "";
    const victimArea = el("div", "victim-scroll-area");
    imgBand.appendChild(victimArea);

    // Cannon SFX at irregular intervals
    const cannonFires = [0, 6800, 14300, 21000, 28500, 35000];
    cannonFires.forEach(ms => setTimeout(() => Audio.playSfx("sfx_cannon_distant.ogg"), ms));

    const victims = scene.victims || [];
    let i = 0;

    function showNext() {
      if (i >= victims.length) {
        setTimeout(() => _showWoundedKneeClose(scene, imgBand), 2000);
        return;
      }
      const line = el("p", "body-line");
      line.textContent = victims[i];
      victimArea.appendChild(line);
      requestAnimationFrame(() => line.classList.add("visible"));
      i++;
      setTimeout(showNext, 1500);
    }
    showNext();
  }

  function _showWoundedKneeClose(scene, imgBand) {
    imgBand.innerHTML = "";
    const closeEl = el("div", "scene-body victim-close-body");
    imgBand.appendChild(closeEl);

    const lines = (scene.closingProse || []).map(l => Tokens.resolveTokens(l, state));
    typewriterReveal(lines, closeEl, () => {
      const prompt = el("p", "scene-continue-prompt", "[ press any key ]");
      imgBand.appendChild(prompt);
      requestAnimationFrame(() => prompt.classList.add("visible"));

      function advance() {
        document.removeEventListener("keydown", advance);
        imgBand.removeEventListener("click", advance);
        _resolveWoundedKnee();
      }
      setTimeout(() => {
        document.addEventListener("keydown", advance, { once: true });
        imgBand.addEventListener("click", advance, { once: true });
      }, 600);
    });
  }

  function _resolveWoundedKnee() {
    let endingId;
    if (state.health < 30) {
      endingId = "ending_died_at_wounded_knee";
    } else if (state.culturalIntegrity >= 60) {
      endingId = "ending_keeper_of_the_pipe";
    } else {
      endingId = "ending_survived_wounded_knee";
    }
    transitionToScene(endingId);
  }

  // ── Ending epilogue renderer ──────────────────────────────────────────────

  function renderEndingScene(scene) {
    typewriterDone = false;
    choicesRevealed = false;
    clearTypewriter();

    // Unlock html/body overflow so the long ending can scroll natively
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";
    document.body.style.height = "auto";

    app().innerHTML = "";
    app().className = "screen-ending";

    const content = el("div", "ending-content");

    if (scene.date) content.appendChild(el("div", "scene-date ending-date", scene.date));

    const bodyEl = el("div", "scene-body");
    content.appendChild(bodyEl);

    // Photo placeholder (swapped for real images in prompt #6)
    if (scene.photo) {
      const fig = document.createElement("figure");
      fig.className = "ending-photo-placeholder";
      const img = new Image();
      img.src = `assets/art/${scene.photo.src}`;
      img.alt = scene.photo.caption;
      img.onload = () => { fig.innerHTML = ""; fig.appendChild(img); if (scene.photo.caption) { const cap = document.createElement("figcaption"); cap.textContent = scene.photo.caption; fig.appendChild(cap); } };
      img.onerror = () => { /* leave placeholder intact */ };
      const placeholder = el("div", "ending-photo-inner", "Photo coming soon");
      fig.appendChild(placeholder);
      if (scene.photo.caption) {
        const cap = el("figcaption", "", scene.photo.caption);
        fig.appendChild(cap);
      }
      content.appendChild(fig);
    }

    if (scene.sourceNote) {
      content.appendChild(el("p", "ending-source-note", scene.sourceNote));
    }

    const choicesEl = el("div", "ending-choices");
    choicesEl.style.display = "none";
    content.appendChild(choicesEl);

    app().appendChild(content);

    const lines = (scene.body || []).map(line => Tokens.resolveTokens(line, state));

    typewriterReveal(lines, bodyEl, () => {
      typewriterDone = true;
      setTimeout(() => revealEndingChoices(scene, choicesEl), 800);
    }, 200);
  }

  function revealEndingChoices(scene, choicesEl) {
    if (choicesRevealed) return;
    choicesRevealed = true;
    choicesEl.style.display = "";

    (scene.choices || []).forEach((choice, i) => {
      const btn = el("button", "ending-choice-btn");
      btn.innerHTML = `<span class="ending-arrow">→</span> ${Tokens.resolveTokens(choice.text, state)}`;
      btn.dataset.index = i;
      btn.addEventListener("click", () => selectChoice(i, scene));
      choicesEl.appendChild(btn);
    });
  }

  function revealChoices(scene, choicesEl) {
    if (choicesRevealed) return;
    choicesRevealed = true;
    choicesEl.style.display = "";

    const visible = (scene.choices || []).filter(c => !c.visible || c.visible(state));

    visible.forEach((choice, i) => {
      const btn = el("button", "choice-btn");
      btn.innerHTML = `<span class="choice-num">${i + 1}</span> ${Tokens.resolveTokens(choice.text, state)}`;
      btn.dataset.index = i;
      btn.addEventListener("click", () => selectChoice(i, scene));
      choicesEl.appendChild(btn);
    });

    // Keyboard 1-4
    function keyChoiceHandler(e) {
      const n = parseInt(e.key);
      if (n >= 1 && n <= visible.length) {
        document.removeEventListener("keydown", keyChoiceHandler);
        selectChoice(n - 1, scene);
      }
    }
    document.addEventListener("keydown", keyChoiceHandler);
    // Store ref for cleanup
    app()._choiceKeyHandler = keyChoiceHandler;
  }

  function selectChoice(index, scene) {
    const visible = (scene.choices || []).filter(c => !c.visible || c.visible(state));
    const choice = visible[index];
    if (!choice) return;

    // Cleanup choice key handler
    if (app()._choiceKeyHandler) {
      document.removeEventListener("keydown", app()._choiceKeyHandler);
    }

    Audio.playSfx("sfx_click_choice.ogg");

    // Apply effects and flash changed stats
    const changed = Stats.applyEffects(state, choice.effects);
    if (changed && Object.keys(changed).length > 0) {
      flashStats(changed);
    }

    if (choice.onSelect) choice.onSelect(state);

    // Flash the selected choice button
    const btns = document.querySelectorAll(".choice-btn");
    if (btns[index]) btns[index].classList.add("selected");

    // Historical notes overlay — stay on ending
    if (choice.action === "open_historical_notes") {
      openHistoricalNotes();
      return;
    }

    // Minigame action — launch minigame instead of routing
    if (choice.action === "minigame") {
      setTimeout(() => launchMinigame(scene), 350);
      return;
    }

    // Ration line narrative minigame
    if (choice.action === "ration") {
      const nextId = typeof choice.next === "function" ? choice.next(state) : choice.next;
      setTimeout(() => launchRationLine(nextId), 350);
      return;
    }

    // Resolve next scene
    const next = typeof choice.next === "function" ? choice.next(state) : choice.next;

    // Wipe save and return to title from endings
    if (next === "_title") {
      setTimeout(() => {
        document.documentElement.style.overflowY = "";
        document.body.style.overflowY = "";
        document.body.style.height = "";
        Save.wipe();
        showTitleScreen();
      }, 350);
      return;
    }

    // Transition after brief delay
    setTimeout(() => transitionToScene(next), 350);
  }

  function launchMinigame(scene) {
    // Replace illustration band content with canvas
    const illus = document.querySelector(".scene-illustration");
    const content = document.querySelector(".scene-content");
    if (!illus) return;

    illus.innerHTML = "";
    if (content) content.style.display = "none";

    const canvas = document.createElement("canvas");
    canvas.id = "minigame-canvas";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.imageRendering = "pixelated";
    illus.appendChild(canvas);
    canvas.width  = illus.offsetWidth  || 480;
    canvas.height = illus.offsetHeight || 270;

    // Update status bar while minigame runs
    const statusBar = document.querySelector(".status-bar");
    if (statusBar) statusBar.replaceWith(buildStatusBar());

    Audio.pauseAmbient();

    MinigameHunt.run(state, canvas, scene.config).then(result => {
      Audio.resumeAmbient();
      const nextScene = scene.results && scene.results[result];
      if (nextScene) {
        transitionToScene(nextScene);
      } else {
        console.error("Minigame result not mapped:", result);
        showTitleScreen();
      }
    });
  }

  function launchRationLine(nextSceneId) {
    Audio.pauseAmbient();
    MinigameRation.run(state).then(() => {
      Audio.resumeAmbient();
      transitionToScene(nextSceneId);
    });
  }

  function transitionToScene(sceneId) {
    const overlay = el("div", "transition-overlay");
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("active"));
    setTimeout(() => {
      goToScene(sceneId);
      overlay.classList.remove("active");
      setTimeout(() => overlay.remove(), 400);
    }, 400);
  }

  // ── Background builder ────────────────────────────────────────────────────

  function buildBackground(scene) {
    const img = document.createElement("img");
    img.className = "scene-bg-img";
    img.alt = "";

    const fallbackColors = {
      1: "var(--ochre)",
      2: "var(--dust)",
      3: "var(--snow-shadow)"
    };

    if (scene.background) {
      img.src = `assets/art/bg/${scene.background}.png`;
      img.onerror = () => {
        img.style.display = "none";
        img.parentElement.style.background = fallbackColors[scene.act] || fallbackColors[1];
      };
    } else {
      img.style.display = "none";
      setTimeout(() => {
        if (img.parentElement) {
          img.parentElement.style.background = fallbackColors[scene.act] || fallbackColors[1];
        }
      }, 0);
    }

    return img;
  }

  // ── Status bar ────────────────────────────────────────────────────────────

  function buildStatusBar() {
    const bar = el("div", "status-bar");
    const stats = Stats.getStatList(state);

    stats.forEach(stat => {
      const slot = el("div", "stat-slot");
      slot.dataset.key = stat.key;
      const label = el("span", "stat-label", stat.name);
      const value = el("span", "stat-value", String(stat.value));
      slot.append(label, value);

      if (stat.key === "family") {
        const living = (state.familyNames || []).filter(m => m.alive).map(m => m.name);
        if (living.length) {
          slot.title = "Living family: " + living.join(", ");
          slot.setAttribute("aria-label", "Family: " + living.join(", "));
        }
      }
      bar.appendChild(slot);
    });

    const muteBtn = el("button", "mute-btn", Audio.isMuted() ? "♪ OFF" : "♪ ON");
    muteBtn.addEventListener("click", () => {
      Audio.setMuted(!Audio.isMuted());
      muteBtn.textContent = Audio.isMuted() ? "♪ OFF" : "♪ ON";
    });
    bar.appendChild(muteBtn);

    return bar;
  }

  function flashStats(changed) {
    for (const [key, delta] of Object.entries(changed)) {
      const slot = document.querySelector(`.stat-slot[data-key="${key}"]`);
      if (!slot) continue;
      slot.classList.remove("flash-up", "flash-down");
      void slot.offsetWidth;
      slot.classList.add(delta > 0 ? "flash-up" : "flash-down");
      setTimeout(() => slot.classList.remove("flash-up", "flash-down"), 600);

      const valueEl = slot.querySelector(".stat-value");
      if (valueEl) {
        const newVal = state[key];
        valueEl.textContent = String(newVal !== undefined ? newVal : "");
      }
    }
  }

  // ── Pause menu ────────────────────────────────────────────────────────────

  function pause() {
    if (isPaused || isInOverlay) return;
    isPaused = true;
    Audio.pauseAmbient();
    clearTypewriter();

    const overlay = el("div", "pause-overlay");
    const modal = el("div", "pause-modal");

    modal.innerHTML = `<h2 class="pause-title">PAUSED</h2>`;

    const items = [
      { label: "RESUME",           action: resume               },
      { label: "HISTORICAL NOTES", action: () => { resume(); openHistoricalNotes(); } },
      { label: "MAIN MENU",        action: () => { resume(); showTitleScreen(); }     },
      { label: "MUTE: " + (Audio.isMuted() ? "OFF" : "ON"), action: toggleMute }
    ];

    let firstBtn = null;
    items.forEach(item => {
      const btn = el("button", "pause-btn", item.label);
      btn.addEventListener("click", item.action);
      modal.appendChild(btn);
      if (!firstBtn) firstBtn = btn;
    });

    overlay.appendChild(modal);
    overlay.id = "pause-overlay";
    overlay.addEventListener("click", (e) => { if (e.target === overlay) resume(); });
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      overlay.classList.add("active");
      if (firstBtn) firstBtn.focus();
    });
  }

  function resume() {
    if (!isPaused) return;
    isPaused = false;
    Audio.resumeAmbient();
    const overlay = document.getElementById("pause-overlay");
    if (overlay) overlay.remove();
  }

  function toggleMute() {
    Audio.setMuted(!Audio.isMuted());
    const btn = document.querySelector(".pause-btn");
    // Re-open pause so label updates
    const overlay = document.getElementById("pause-overlay");
    if (overlay) overlay.remove();
    isPaused = false;
    pause();
  }

  // ── Historical Notes ──────────────────────────────────────────────────────

  function openHistoricalNotes() {
    isInOverlay = true;

    const overlay = el("div", "hn-overlay");
    overlay.id = "hn-overlay";

    const modal = el("div", "hn-modal");

    const header = el("div", "hn-header");
    header.innerHTML = `<span class="hn-title">HISTORICAL NOTES</span>`;
    const closeBtn = el("button", "hn-close", "✕");
    closeBtn.addEventListener("click", closeHistoricalNotes);
    header.appendChild(closeBtn);
    modal.appendChild(header);

    const body = el("div", "hn-body");

    function makeSection(title, htmlContent) {
      const section = el("details", "hn-section");
      section.setAttribute("open", "");
      const summary = el("summary", "hn-summary", title);
      const content = el("div", "hn-section-content");
      content.innerHTML = htmlContent;
      section.append(summary, content);
      return section;
    }

    body.appendChild(makeSection("Primary Sources", HistoricalNotes.primarySources));
    body.appendChild(makeSection("Secondary Sources", HistoricalNotes.secondarySources));
    body.appendChild(makeSection("Documented vs. Fictionalized", HistoricalNotes.documentedVsFictionalized));

    const footer = el("p", "hn-footer", "Press ESC or click ✕ to return.");
    body.appendChild(footer);

    modal.appendChild(body);
    overlay.appendChild(modal);

    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeHistoricalNotes(); });
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("active"));
  }

  function closeHistoricalNotes() {
    isInOverlay = false;
    const overlay = document.getElementById("hn-overlay");
    if (overlay) overlay.remove();
  }

  // ── Credits ───────────────────────────────────────────────────────────────

  function showCredits() {
    isInOverlay = true;

    const overlay = el("div", "hn-overlay");
    overlay.id = "credits-overlay";

    const modal = el("div", "hn-modal");
    modal.innerHTML = `
      <div class="hn-header">
        <span class="hn-title">CREDITS</span>
        <button class="hn-close" id="credits-close">&#10005;</button>
      </div>
      <div class="hn-body">
        <div class="hn-section-content credits-content">
          <p><strong>TATANKA</strong></p>
          <p>A Lakota History Game</p>
          <p>8th Grade U.S. History Final Project</p>
          <br>
          <p><strong>Story &amp; Design</strong><br>Eric Zhang &amp; Will Xu</p>
          <br>
          <p><strong>Typography</strong><br>Press Start 2P — CodeMan38<br>VT323 — Peter Hull</p>
          <br>
          <p><strong>Primary Source</strong><br>
          Black Elk Speaks — John G. Neihardt, 1932</p>
          <br>
          <p>The Lakota people have inhabited the northern Great Plains for centuries. Their history
          is not over. There are over 170,000 enrolled Lakota people today.</p>
          <br>
          <p><em>Mit&#225;kuye Oy&#225;s&#699;i&#331; — All Are Related.</em></p>
        </div>
        <p class="hn-footer">Press ESC or click &#10005; to return.</p>
      </div>
    `;

    function closeCredits() { isInOverlay = false; overlay.remove(); }

    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeCredits(); });
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelector("#credits-close").addEventListener("click", closeCredits);

    requestAnimationFrame(() => overlay.classList.add("active"));
  }

  // ── Global keyboard handler ───────────────────────────────────────────────

  function globalKeyHandler(e) {
    // ESC
    if (e.key === "Escape") {
      if (isInOverlay) {
        const creditsOverlay = document.getElementById("credits-overlay");
        if (creditsOverlay) { isInOverlay = false; creditsOverlay.remove(); return; }
        closeHistoricalNotes();
        return;
      }
      if (isPaused) { resume(); return; }
      if (app().classList.contains("screen-game") && !app().classList.contains("screen-ending")) { pause(); return; }
    }

    // Title screen navigation
    if (app().classList.contains("screen-title")) {
      if (e.key === "ArrowDown") {
        titleMenuIndex = (titleMenuIndex + 1) % titleMenuItems.length;
        renderTitleFocus();
      } else if (e.key === "ArrowUp") {
        titleMenuIndex = (titleMenuIndex - 1 + titleMenuItems.length) % titleMenuItems.length;
        renderTitleFocus();
      } else if (e.key === "Enter" || e.key === " ") {
        activateTitleItem();
      }
    }

    // SPACE skips typewriter during gameplay (handled by click listener, also catch here)
    if (e.key === " " && app().classList.contains("screen-game")) {
      if (!typewriterDone) {
        e.preventDefault();
        // Dispatch a synthetic click to trigger skip
        app().click();
      }
    }
  }

  return {
    init,
    newGame,
    continueGame,
    goToScene,
    selectChoice,
    pause,
    resume,
    openHistoricalNotes,
    closeHistoricalNotes,
    showTitleScreen
  };
})();

document.addEventListener("DOMContentLoaded", Engine.init);
