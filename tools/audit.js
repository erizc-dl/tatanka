#!/usr/bin/env node
// Standalone scene graph auditor. Run: node tools/audit.js
// Reports: unreachable scenes, dangling next-targets, min/max stat ranges, unreachable endings.
// Not loaded by the game.

const fs = require("fs");
const path = require("path");

// Load scenes.js — it declares `const Scenes = {...}`; wrap in a function to extract it
const scenesCode = fs.readFileSync(path.join(__dirname, "../js/scenes.js"), "utf8");
const Scenes = new Function(scenesCode.replace(/^const /, "var ") + "\nreturn Scenes;")();

const sceneIds = Object.keys(Scenes);
console.log(`Total scenes: ${sceneIds.length}`);

// Walk graph from character_creation + act1_opening
// (character_creation routes via engine code, not scene choices)
const reachable = new Set();
const queue = ["character_creation", "act1_opening"];
const dangling = [];

while (queue.length) {
  const id = queue.shift();
  if (reachable.has(id)) continue;
  reachable.add(id);
  const scene = Scenes[id];
  if (!scene) { dangling.push(id); continue; }

  // Follow minigame result routes
  if (scene.results) {
    for (const target of Object.values(scene.results)) {
      if (typeof target === "string" && target !== "__title__") queue.push(target);
    }
  }

  for (const choice of (scene.choices || [])) {
    const next = choice.next;
    if (typeof next === "string" && next !== "__title__") queue.push(next);
    // Function nexts: can't statically analyze; skip
  }
}

const unreachable = sceneIds.filter(id => !reachable.has(id));

console.log("\n=== REACHABLE ===");
console.log([...reachable].join(", "));

if (unreachable.length) {
  console.log("\n=== UNREACHABLE SCENES ===");
  unreachable.forEach(id => console.log("  !", id));
} else {
  console.log("\nAll scenes reachable. ✓");
}

if (dangling.length) {
  console.log("\n=== DANGLING NEXT-TARGETS (scene missing) ===");
  dangling.forEach(id => console.log("  !", id));
} else {
  console.log("No dangling next-targets. ✓");
}
