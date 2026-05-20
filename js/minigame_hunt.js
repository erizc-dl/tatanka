// Buffalo Hunt canvas minigame.
// Engine calls: MinigameHunt.run(state, canvas, config?) → Promise<"success"|"modest"|"injury"|"ok"|"poor">
// All graphics drawn with canvas 2D API, Plains Dusk palette only. No external assets.
const MinigameHunt = (() => {
  // ── Palette ───────────────────────────────────────────────────────────────
  const C = {
    bgVoid:     "#0e0a08",
    shadowDeep: "#1a1410",
    earthDark:  "#2e211a",
    bark:       "#4a3424",
    hide:       "#6b4a32",
    ochre:      "#8a6843",
    grassDry:   "#a98554",
    dust:       "#c4a571",
    bone:       "#ddc798",
    bloodDried: "#4a1f1a",
    bannerRed:  "#7a2e22",
    sage:       "#4a5a40"
  };

  // ── Entry point ───────────────────────────────────────────────────────────
  function run(state, canvas, cfg) {
    return new Promise(resolve => {
      const ctx   = canvas.getContext("2d");
      const W     = canvas.width;
      const H     = canvas.height;
      // Scale factor: game designed for 480-wide native
      const SC    = W / 480;

      // ── Config ────────────────────────────────────────────────────────────
      const config = Object.assign({
        herdSize: 5,
        scrollSpeed: 1.0,
        thresholds: { success: 3, modest: 1 }
      }, cfg || {});

      const TOTAL_ARROWS = 3;
      const SESSION_MS   = 30000;
      const BOW_DRAW_MS  = 700;
      const GALLOP_FPS   = 8;

      // Accuracy spread (vertical drift in native px)
      const spiritBonus = state.spiritAnimal === "wolf"  ? 15
                        : state.spiritAnimal === "eagle" ? 5 : 0;
      const effectiveHunting = Math.min(100, (state.hunting || 30) + spiritBonus);
      const aimSpread = (1 - effectiveHunting / 100) * 80; // 0 = perfect, 80 = very poor

      // ── Game state ────────────────────────────────────────────────────────
      let arrowsFired   = 0;
      let hits          = 0;
      let gameOver      = false;
      let endQueued     = false;
      let horseFell     = false;
      let isDrawing     = false;
      let bowDrawStart  = null;
      let arrow         = null;  // { x, y, vx, vy } in native coords
      let gallop        = 0;
      let gallopMs      = 0;
      let scrollX       = 0;
      let isStumbling   = false;
      let stumbleMs     = 0;
      const RIDER_X     = 110;
      const RIDER_Y     = 152;

      // Buffalo objects — spread evenly, speed scaled by scrollSpeed
      const herd = [];
      const herdSpread = 480 / config.herdSize;
      for (let i = 0; i < config.herdSize; i++) {
        herd.push({
          x:        320 + i * herdSpread + Math.random() * 30,
          y:        136 + (Math.random() * 8 - 4),
          speed:    (0.55 + Math.random() * 0.45) * config.scrollSpeed,
          legFrame: i % 2,
          legMs:    Math.random() * 200,
          hit:      false,
          hitMs:    0
        });
      }

      // 5% horse-fall trigger
      if (Math.random() < 0.05) {
        setTimeout(() => { if (!gameOver) { horseFell = true; isStumbling = true; } },
          1800 + Math.random() * 2000);
      }

      // ── Input ─────────────────────────────────────────────────────────────
      function onMouseDown()  { startDraw(); }
      function onMouseUp()    { releaseDraw(); }
      function onKeyDown(e)   { if (e.code === "Space") { e.preventDefault(); startDraw(); } }
      function onKeyUp(e)     { if (e.code === "Space") { e.preventDefault(); releaseDraw(); } }
      function onTouchStart(e){ e.preventDefault(); startDraw(); }
      function onTouchEnd(e)  { e.preventDefault(); releaseDraw(); }

      canvas.addEventListener("mousedown",  onMouseDown);
      canvas.addEventListener("mouseup",    onMouseUp);
      canvas.addEventListener("touchstart", onTouchStart, { passive: false });
      canvas.addEventListener("touchend",   onTouchEnd,   { passive: false });
      document.addEventListener("keydown",  onKeyDown);
      document.addEventListener("keyup",    onKeyUp);

      function cleanup() {
        canvas.removeEventListener("mousedown",  onMouseDown);
        canvas.removeEventListener("mouseup",    onMouseUp);
        canvas.removeEventListener("touchstart", onTouchStart);
        canvas.removeEventListener("touchend",   onTouchEnd);
        document.removeEventListener("keydown",  onKeyDown);
        document.removeEventListener("keyup",    onKeyUp);
        cancelAnimationFrame(rafId);
      }

      // ── Game actions ──────────────────────────────────────────────────────
      function startDraw() {
        if (gameOver || horseFell || arrowsFired >= TOTAL_ARROWS || arrow || isDrawing) return;
        isDrawing    = true;
        bowDrawStart = performance.now();
      }

      function releaseDraw() {
        if (!isDrawing) return;
        isDrawing = false;
        if (gameOver || horseFell || arrowsFired >= TOTAL_ARROWS || arrow) return;
        arrowsFired++;

        const held  = Math.min(performance.now() - bowDrawStart, BOW_DRAW_MS);
        const power = held / BOW_DRAW_MS;          // 0–1
        // Vertical drift: sign random, magnitude scaled by (spread × inverse-power)
        const sign  = Math.random() < 0.5 ? 1 : -1;
        const drift = sign * aimSpread * (1.1 - power * 0.8) * Math.random();

        arrow = {
          x:  RIDER_X + 22,
          y:  RIDER_Y - 18 + drift * 0.1,
          vx: 4.5 + power * 2,
          vy: drift * 0.04
        };
      }

      function endGame() {
        if (gameOver) return;
        gameOver = true;
        cleanup();

        let result;
        if ("ok" in config.thresholds) {
          // Act 2 two-outcome mode
          result = (!horseFell && hits >= config.thresholds.ok) ? "ok" : "poor";
        } else {
          const t = config.thresholds;
          result = horseFell        ? "injury"
                 : hits >= t.success ? "success"
                 : hits >= t.modest  ? "modest"
                 :                     "injury";
        }

        setTimeout(() => resolve(result), 1400);
      }

      // ── Drawing helpers (all coords in native-480 space × SC) ─────────────
      function px(n)  { return n * SC; }
      function pxH(n) { return H - (270 - n) * SC; } // map native 270-space Y to canvas Y

      function drawBg() {
        // Sky bands — 4 rows dithered
        const bands = [
          [0,   38,  C.bone     ],
          [38,  32,  C.dust     ],
          [70,  28,  C.grassDry ],
          [98,  22,  C.ochre    ]
        ];
        bands.forEach(([y, h, col]) => {
          ctx.fillStyle = col;
          ctx.fillRect(0, px(y), W, px(h));
        });

        // Flat ground
        ctx.fillStyle = C.ochre;
        ctx.fillRect(0, px(120), W, H - px(120));

        // Thin horizon line
        ctx.fillStyle = C.grassDry;
        ctx.fillRect(0, px(119), W, px(4));

        // Scrolling grass tufts
        scrollX = (scrollX + 1.1 * config.scrollSpeed) % 48;
        ctx.fillStyle = C.sage;
        for (let gx = -(48 - scrollX % 48); gx < 480; gx += 22) {
          ctx.fillRect(px(gx),      px(121), px(3), px(4));
          ctx.fillRect(px(gx + 5),  px(120), px(2), px(5));
          ctx.fillRect(px(gx + 10), px(122), px(3), px(3));
          ctx.fillRect(px(gx + 15), px(121), px(2), px(4));
        }
      }

      function drawHorse(x, y, frame, stumble) {
        ctx.save();
        if (stumble) {
          ctx.translate(px(x + 10), px(y + 5));
          ctx.rotate(-0.3);
          ctx.translate(-px(x + 10), -px(y + 5));
        }

        // Body
        ctx.fillStyle = C.earthDark;
        ctx.beginPath();
        ctx.ellipse(px(x), px(y), px(22), px(10), 0.1, 0, Math.PI * 2);
        ctx.fill();

        // Neck
        ctx.beginPath();
        ctx.ellipse(px(x - 15), px(y - 9), px(6), px(10), -0.25, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.ellipse(px(x - 21), px(y - 14), px(7), px(5), 0.1, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        ctx.beginPath();
        ctx.ellipse(px(x - 26), px(y - 12), px(4), px(3), 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Mane
        ctx.fillStyle = C.bark;
        ctx.beginPath();
        ctx.ellipse(px(x - 13), px(y - 17), px(5), px(3), -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Tail
        ctx.strokeStyle = C.bark;
        ctx.lineWidth   = px(2.5);
        ctx.lineCap     = "round";
        ctx.beginPath();
        ctx.moveTo(px(x + 21), px(y - 3));
        ctx.quadraticCurveTo(px(x + 32), px(y - 12), px(x + 29), px(y + 6));
        ctx.stroke();

        // Legs — 4-frame gallop
        const legSets = [
          [[-12, 0], [-3, 0], [6, 0], [15, 0]],  // frame 0: all down
          [[-14, -2], [-3, 2], [5, -2], [14, 2]], // frame 1: alternating
          [[-10, -4], [-2, -3], [7, -4], [16, -3]], // frame 2: collected
          [[-13, -1], [-3, 1], [6, -1], [15, 1]]  // frame 3: extending
        ];
        ctx.fillStyle = C.earthDark;
        legSets[frame].forEach(([lx, ldy]) => {
          ctx.fillRect(px(x + lx - 1.5), px(y + 9 + ldy), px(3), px(13));
        });
        // Hooves
        ctx.fillStyle = C.bark;
        legSets[frame].forEach(([lx, ldy]) => {
          ctx.fillRect(px(x + lx - 2), px(y + 20 + ldy), px(4), px(3));
        });

        ctx.restore();
      }

      function drawRider(x, y, drawing) {
        const bx = x - 4;
        const by = y - 20;

        // Torso
        ctx.fillStyle = C.earthDark;
        ctx.beginPath();
        ctx.ellipse(px(bx), px(by), px(7), px(10), -0.1, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.arc(px(bx - 2), px(by - 13), px(5.5), 0, Math.PI * 2);
        ctx.fill();

        // Feather
        ctx.fillStyle = C.bark;
        ctx.beginPath();
        ctx.moveTo(px(bx - 2), px(by - 18));
        ctx.lineTo(px(bx + 4), px(by - 25));
        ctx.lineTo(px(bx - 5), px(by - 17));
        ctx.fill();

        // Bow / arm
        if (drawing) {
          const pct = Math.min(1, (performance.now() - bowDrawStart) / BOW_DRAW_MS);
          // Arm extending
          ctx.strokeStyle = C.bark;
          ctx.lineWidth   = px(2);
          ctx.beginPath();
          ctx.moveTo(px(bx), px(by - 2));
          ctx.lineTo(px(bx + 14), px(by - 10));
          ctx.stroke();
          // Bow arc
          ctx.strokeStyle = C.grassDry;
          ctx.lineWidth   = px(2);
          ctx.beginPath();
          ctx.arc(px(bx + 16), px(by - 10), px(7), -0.9, 0.9);
          ctx.stroke();
          // Bowstring
          ctx.strokeStyle = C.bone;
          ctx.lineWidth   = px(0.8);
          ctx.beginPath();
          ctx.moveTo(px(bx + 9), px(by - 17));
          ctx.lineTo(px(bx + 3), px(by - 10));
          ctx.lineTo(px(bx + 9), px(by - 3));
          ctx.stroke();
          // Draw progress bar
          ctx.fillStyle = C.shadowDeep;
          ctx.fillRect(px(bx - 10), px(by - 28), px(40), px(4));
          ctx.fillStyle = pct > 0.75 ? C.bannerRed : C.grassDry;
          ctx.fillRect(px(bx - 10), px(by - 28), px(40 * pct), px(4));
        } else {
          // Resting arm
          ctx.strokeStyle = C.bark;
          ctx.lineWidth   = px(2);
          ctx.beginPath();
          ctx.moveTo(px(bx), px(by - 2));
          ctx.lineTo(px(bx + 10), px(by + 2));
          ctx.stroke();
          // Bow at rest
          ctx.strokeStyle = C.grassDry;
          ctx.lineWidth   = px(2);
          ctx.beginPath();
          ctx.arc(px(bx + 12), px(by + 2), px(6), -0.7, 0.7);
          ctx.stroke();
        }
      }

      function drawArrow(a) {
        const angle = Math.atan2(a.vy, a.vx);
        ctx.save();
        ctx.translate(px(a.x), px(a.y));
        ctx.rotate(angle);
        // Shaft
        ctx.fillStyle = C.bark;
        ctx.fillRect(0, px(-1), px(13), px(2));
        // Head
        ctx.fillStyle = C.bloodDried;
        ctx.beginPath();
        ctx.moveTo(px(13), 0);
        ctx.lineTo(px(17), px(-2));
        ctx.lineTo(px(17), px(2));
        ctx.fill();
        // Fletching
        ctx.fillStyle = C.earthDark;
        ctx.fillRect(px(-4), px(-2.5), px(5), px(2));
        ctx.fillRect(px(-4), px(0.5),  px(5), px(2));
        ctx.restore();
      }

      function drawBufalo(b) {
        ctx.save();
        ctx.translate(px(b.x), px(b.y));

        const body = b.hit ? C.bloodDried : C.hide;

        // Body
        ctx.fillStyle = body;
        ctx.beginPath();
        ctx.ellipse(0, 0, px(17), px(9), 0, 0, Math.PI * 2);
        ctx.fill();

        // Hump
        ctx.beginPath();
        ctx.ellipse(px(-10), px(-7), px(10), px(8), 0, 0, Math.PI * 2);
        ctx.fill();

        // Head (darker)
        ctx.fillStyle = C.bark;
        ctx.beginPath();
        ctx.ellipse(px(-21), px(-2), px(8), px(6), 0.1, 0, Math.PI * 2);
        ctx.fill();

        // Beard
        ctx.fillStyle = body;
        ctx.beginPath();
        ctx.ellipse(px(-23), px(5), px(3), px(5), 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs 2-frame walk
        ctx.fillStyle = C.earthDark;
        const legs = b.legFrame === 0
          ? [[-14, 8], [-6, 8], [4, 8], [12, 8]]
          : [[-15, 6], [-7, 10], [3, 6], [11, 10]];
        legs.forEach(([lx, ly]) => {
          ctx.fillRect(px(lx - 1.5), px(ly), px(3), px(11));
        });

        // Hooves
        ctx.fillStyle = C.bark;
        legs.forEach(([lx, ly]) => {
          ctx.fillRect(px(lx - 2), px(ly + 10), px(4), px(3));
        });

        // Tail
        ctx.strokeStyle = C.bark;
        ctx.lineWidth   = px(1.5);
        ctx.lineCap     = "round";
        ctx.beginPath();
        ctx.moveTo(px(17), px(-2));
        ctx.quadraticCurveTo(px(24), px(-8), px(22), px(5));
        ctx.stroke();

        // Hit flash
        if (b.hit) {
          ctx.fillStyle   = C.bannerRed;
          ctx.globalAlpha = 0.45;
          ctx.beginPath();
          ctx.ellipse(0, 0, px(17), px(9), 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        ctx.restore();
      }

      function drawHUD(elapsed) {
        const remaining = Math.max(0, TOTAL_ARROWS - arrowsFired);
        const timeLeft  = Math.max(0, SESSION_MS - elapsed);
        const secs      = Math.ceil(timeLeft / 1000);

        // HUD background
        ctx.fillStyle   = C.shadowDeep;
        ctx.globalAlpha = 0.8;
        ctx.fillRect(W - px(115), 0, px(115), px(30));
        ctx.globalAlpha = 1;

        // Font alias
        const uiFont = (size) => `${px(size)}px "Press Start 2P", monospace`;

        // Arrow count
        ctx.fillStyle  = C.bone;
        ctx.font       = uiFont(5.5);
        ctx.textAlign  = "right";
        ctx.fillText(`ARROWS: ${remaining}/${TOTAL_ARROWS}`, W - px(6), px(12));

        // Arrow icons
        for (let i = 0; i < TOTAL_ARROWS; i++) {
          const fired = i >= remaining;
          ctx.fillStyle = fired ? C.earthDark : C.grassDry;
          ctx.fillRect(W - px(18 + i * 11), px(16), px(9), px(3));
          ctx.fillStyle = fired ? C.earthDark : C.bloodDried;
          ctx.beginPath();
          ctx.moveTo(W - px(9 + i * 11), px(17.5));
          ctx.lineTo(W - px(7 + i * 11), px(15));
          ctx.lineTo(W - px(7 + i * 11), px(20));
          ctx.fill();
        }

        // Timer
        ctx.fillStyle  = secs <= 5 ? C.bannerRed : C.dust;
        ctx.font       = uiFont(5);
        ctx.fillText(`${secs}s`, W - px(6), px(26));

        ctx.textAlign  = "left";

        // Hit count
        if (hits > 0) {
          ctx.fillStyle = C.bone;
          ctx.font      = uiFont(5.5);
          ctx.fillText(`HITS: ${hits}`, px(6), px(14));
        }

        // Control hint
        if (!isDrawing && !gameOver && !horseFell && arrowsFired < TOTAL_ARROWS) {
          ctx.fillStyle = C.dust;
          ctx.font      = uiFont(4.5);
          ctx.fillText("HOLD SPACE/CLICK TO DRAW BOW", px(6), px(26));
        }

        // End / stumble messages
        if (horseFell && isStumbling) {
          ctx.fillStyle = C.bannerRed;
          ctx.font      = uiFont(7);
          ctx.textAlign = "center";
          const fellMsg = ("ok" in config.thresholds) ? "THIN HUNT." : "YOUR HORSE FELL.";
          ctx.fillText(fellMsg, W / 2, H / 2);
          ctx.textAlign = "left";
        } else if (gameOver && !horseFell) {
          ctx.fillStyle = C.bone;
          ctx.font      = uiFont(6.5);
          ctx.textAlign = "center";
          let msg;
          if ("ok" in config.thresholds) {
            msg = hits >= config.thresholds.ok ? "ENOUGH MEAT." : "THIN HUNT.";
          } else {
            const t = config.thresholds;
            msg = hits >= t.success ? "CLEAN HUNT." : hits >= t.modest ? "MODEST HUNT." : "NO KILLS.";
          }
          ctx.fillText(msg, W / 2, H / 2);
          ctx.textAlign = "left";
        }
      }

      // ── Main loop ─────────────────────────────────────────────────────────
      let lastTime = performance.now();
      let rafId;

      function tick(now) {
        const dt      = now - lastTime;
        lastTime      = now;
        const elapsed = now - startTime;
        const startTime_ = startTime; // closure

        if (!gameOver) {
          // Session timeout
          if (elapsed >= SESSION_MS && !endQueued) {
            endQueued = true;
            endGame();
            return;
          }

          // All arrows spent
          if (arrowsFired >= TOTAL_ARROWS && !arrow && !endQueued) {
            endQueued = true;
            setTimeout(endGame, 900);
          }

          // Gallop
          gallopMs += dt;
          if (gallopMs >= 1000 / GALLOP_FPS) {
            gallopMs -= 1000 / GALLOP_FPS;
            gallop = (gallop + 1) % 4;
          }

          // Stumble timer → end game
          if (isStumbling) {
            stumbleMs += dt;
            if (stumbleMs > 1200 && !endQueued) {
              endQueued = true;
              endGame();
              return;
            }
          }

          // Arrow update
          if (arrow) {
            arrow.x += arrow.vx;
            arrow.y += arrow.vy;

            // Hit detection (native coords)
            let arrowKilled = false;
            for (const b of herd) {
              if (b.hit) continue;
              if (Math.abs(arrow.x - b.x) < 20 && Math.abs(arrow.y - b.y) < 12) {
                b.hit = true;
                b.hitMs = 0;
                hits++;
                arrow = null;
                arrowKilled = true;
                break;
              }
            }
            // Off-screen
            if (!arrowKilled && arrow && arrow.x > 495) arrow = null;
          }

          // Buffalo movement & animation
          herd.forEach(b => {
            if (!b.hit) {
              b.x -= b.speed;
              if (b.x < -45) {
                b.x = 490 + Math.random() * 60;
                b.y = 136 + (Math.random() * 8 - 4);
              }
              b.legMs += dt;
              if (b.legMs > 280) {
                b.legMs = 0;
                b.legFrame = 1 - b.legFrame;
              }
            } else {
              b.hitMs += dt;
            }
          });
        }

        // ── Draw ──────────────────────────────────────────────────────────
        ctx.clearRect(0, 0, W, H);
        drawBg();

        // Buffalo (behind rider)
        herd.forEach(b => {
          if (!b.hit || b.hitMs < 700) drawBufalo(b);
        });

        // Rider
        drawHorse(RIDER_X, RIDER_Y, gallop, isStumbling);
        drawRider(RIDER_X, RIDER_Y, isDrawing);

        // Arrow in flight
        if (arrow) drawArrow(arrow);

        drawHUD(elapsed);

        rafId = requestAnimationFrame(tick);
      }

      const startTime = performance.now();
      rafId = requestAnimationFrame(tick);
    });
  }

  return { run };
})();
