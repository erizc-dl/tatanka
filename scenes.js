// Scene graph. All Act 1 scenes implemented. Acts 2–3 added in prompts 3–5.
const Scenes = {

  // ── Special ───────────────────────────────────────────────────────────────

  character_creation: {
    id: "character_creation",
    act: 1, age: 10, date: "1855",
    background: null, ambient: null,
    body: [], choices: []
    // Handled entirely by engine.showCharacterCreation()
  }, 

  _stub: {
    id: "_stub",
    act: 3, age: 30, date: "",
    background: null, ambient: null,
    body: [
      "Act 3 — The Long Pursuit — is coming in the next build."
    ],
    choices: [{ text: "Return to title screen.", next: "__title__", effects: {} }]
  },

  // ── ACT 1 — The Old Way (1855–1865) ──────────────────────────────────────

  act1_opening: {
    id: "act1_opening",
    act: 1, age: 10,
    date: "Summer 1855 — Hunkpapa camp on the Cannonball River",
    background: "tepee_interior_dawn",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "You are ten years old.",
      "You wake to the sound of your mother — Iná (mother) — outside the tepee, feeding the fire with cottonwood.",
      "The air smells of meat and sweetgrass. Your little brother Misúŋ (younger brother) is still asleep beside you, his fist in his mouth.",
      "Horses snort. A woman laughs across the way. Your father — Atéwaye (father) — left before dawn to hunt with the men. He will be back by midday.",
      "The whole tiyóšpaye (camp / extended family) moves today. The Tȟatȟáŋka (buffalo) are northeast."
    ],
    choices: [
      { text: "Help Iná build the fire and ready the camp.", next: "act1_help_mother", effects: {} },
      { text: "Wake Misúŋ. The older boys are racing horses on the flat.", next: "act1_horse_race", effects: {} },
      { text: "Slip past Iná and find Old Hawk Feather at the elders' lodge.", next: "act1_elder_lodge", effects: {} }
    ]
  },

  act1_help_mother: {
    id: "act1_help_mother",
    act: 1, age: 10,
    date: "Summer 1855 — outside the tepee, morning",
    background: "tepee_exterior_morning",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "Iná smiles. She hands you the end of a rawhide rope and shows you the knot that holds the tepee-pole bundle to the travois.",
      '"A good husband knows the work," she says. "A good husband does not stand around like a tree."',
      "By high sun, three other tepees are down. Iná lets you tie the last knot yourself."
    ],
    choices: [
      { text: "Continue with the camp.", next: "act1_camp_moves", effects: { spirit: 5, culturalIntegrity: 5, family: 5 } }
    ]
  },

  act1_horse_race: {
    id: "act1_horse_race",
    act: 1, age: 10,
    date: "Summer 1855 — open flat east of camp",
    background: "prairie_flat_morning",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "You ride your father's second pony — a sturdy paint with a white blaze. Misúŋ runs alongside, screaming.",
      "You finish strong. The oldest boy claps your shoulder. Misúŋ runs to you breathless."
    ],
    choices: [
      { text: "Walk back to camp with Misúŋ.", next: "act1_camp_moves", effects: { health: 3, standing: 5, hunting: 5 } }
    ]
  },

  act1_elder_lodge: {
    id: "act1_elder_lodge",
    act: 1, age: 10,
    date: "Summer 1855 — elders' lodge",
    background: "elder_lodge_interior",
    ambient: "amb_camp_evening.ogg",
    body: [
      '"Come in."',
      "Old Hawk Feather passes you a piece of jerky. You sit.",
      'After a long silence: "Before the horse, we walked. Our dogs carried the loads. The buffalo were harder to catch. It is good to remember what we were before we were what we are."',
      "He lets you hold the čhaŋnúŋpa (sacred pipe) — not to smoke, only to feel its weight.",
      '"The White Buffalo Calf Woman gave us this pipe. When she left, she became a black buffalo, then a red one, then a yellow one, then a white one, and was gone into the clouds."',
      "Outside, Iná waits with crossed arms. Not angry. Proud."
    ],
    choices: [
      { text: "Return to camp.", next: "act1_camp_moves", effects: { spirit: 10, standing: 3 } }
    ]
  },

  act1_camp_moves: {
    id: "act1_camp_moves",
    act: 1, age: 10,
    date: "Summer 1855 — on the trail",
    background: "prairie_trail_moving",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "The camp moves like a river. Hunters scout the flanks. Women and dogs and children fill the middle. Travois trail in the grass, piled with rolled hides, parfleches of pemmican, sleeping robes, tepee poles.",
      "You carry Iná's medicine bag for an hour. It smells of sage and bear root.",
      "By evening you reach the new camp on a creek. Atéwaye returns at sunset with a buffalo calf — small, but enough.",
      'Before you sleep, Old Hawk Feather presses a small pipe into your hand. "You will go up on the butte three winters from now," he says. "Take this."',
      "Your belly is full."
    ],
    choices: [
      { text: "Years pass…", next: "act1_vision_quest", effects: { food: 20, family: 5, spirit: 5 } }
    ]
  },

  act1_vision_quest: {
    id: "act1_vision_quest",
    act: 1, age: 13,
    date: "Summer 1858 — a high butte overlooking the prairie",
    background: "vision_quest_butte",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "Three days and three nights on this butte. No food. No water. Only a buffalo robe and the pipe Old Hawk Feather gave you. This is haŋbléčheya — crying for a dream.",
      "The first day you were proud. The second day, hungry. The third day, the wind sounded like voices and you were afraid.",
      "The morning of the fourth day. Your body is light. The sky is enormous.",
      "A presence at the edge of your sight."
    ],
    choices: [
      { text: "Sit still. Watch the western horizon.", next: "act1_vq_wolf", effects: {} },
      { text: "Look up at the sky.", next: "act1_vq_eagle", effects: {} },
      { text: "Listen to the earth.", next: "act1_vq_bear", effects: {} }
    ]
  },

  act1_vq_wolf: {
    id: "act1_vq_wolf",
    act: 1, age: 13,
    date: "Summer 1858 — the butte",
    background: "vision_quest_butte",
    ambient: "amb_prairie_summer.ogg",
    onEnter: (state) => { state.spiritAnimal = "wolf"; },
    body: [
      "A grey wolf walks out of the long grass and sits beside you. Not afraid. Not threatening. His eyes are the eyes of a hunter who has not eaten in many days but is not worried, because he knows he will eat.",
      "The wolf rises and trots west. You watch until he is a dot, then nothing.",
      'When the elders come, you tell them. "Šuŋgmánitu Tȟáŋka," the eldest says. The wolf nation. "You will be a hunter."'
    ],
    choices: [
      { text: "Return to camp.", next: "act1_first_hunt", effects: { hunting: 20, standing: 5 } }
    ]
  },

  act1_vq_eagle: {
    id: "act1_vq_eagle",
    act: 1, age: 13,
    date: "Summer 1858 — the butte",
    background: "vision_quest_butte",
    ambient: "amb_prairie_summer.ogg",
    onEnter: (state) => { state.spiritAnimal = "eagle"; },
    body: [
      "A spotted eagle circles three times above you. So high you can barely see the bar of his tail. On the third circle he calls — a thin, high cry — and dives east toward the rising sun and is gone.",
      'When the elders come, they nod. "Wáŋblí oyáte," they say. The eagle nation. "You will see far. You will be a dreamer of the people."'
    ],
    choices: [
      { text: "Return to camp.", next: "act1_first_hunt", effects: { spirit: 20, hope: 5 } }
    ]
  },

  act1_vq_bear: {
    id: "act1_vq_bear",
    act: 1, age: 13,
    date: "Summer 1858 — the butte",
    background: "vision_quest_butte",
    ambient: "amb_prairie_summer.ogg",
    onEnter: (state) => { state.spiritAnimal = "bear"; },
    body: [
      "The ground hums beneath you. You press your ear to the earth and a great heartbeat answers. When you sit up, a black bear is at the base of the butte, watching. He stands on his hind legs once — taller than two men. Then he drops down and ambles into the brush.",
      '"Matȟó," they say. The bear. "You will be strong. You will also be alone sometimes. The bear walks alone."'
    ],
    choices: [
      { text: "Return to camp.", next: "act1_first_hunt", effects: { health: 20, standing: 5 } }
    ]
  },

  act1_first_hunt: {
    id: "act1_first_hunt",
    act: 1, age: 16,
    date: "Spring 1861 — rolling prairie",
    background: "prairie_hunt_morning",
    ambient: "amb_prairie_summer.ogg",
    minigame: "buffaloHunt",
    results: {
      success: "act1_hunt_success",
      modest:  "act1_hunt_modest",
      injury:  "act1_hunt_injury"
    },
    body: [
      "Sixteen years old. Today you ride with the men.",
      "The hunt leader, Stands-In-The-Water, gives the signal. The line of horsemen comes down off the ridge at a long trot, then a gallop.",
      "Atéwaye is to your left. Misúŋ, ten now and too young to hunt, watches from the ridge biting his knuckles."
    ],
    choices: [
      { text: "Begin the hunt.", action: "minigame", effects: {} }
    ]
  },

  act1_hunt_success: {
    id: "act1_hunt_success",
    act: 1, age: 16,
    date: "Spring 1861 — the hunt",
    background: "prairie_hunt_morning",
    ambient: "amb_prairie_summer.ogg",
    onEnter: (state) => { state.firstHuntOutcome = "success"; },
    body: [
      "Three buffalo down. One yours — a young cow, clean through the lungs.",
      "Stands-In-The-Water cuts a piece of raw liver and hands it to you. The right of the hunter who made the kill. You eat it. It is warm and good.",
      "Atéwaye says one word: \"Háu.\"",
      "That night the camp eats well. Iná sits you at her right hand. Misúŋ touches your bow like it is sacred."
    ],
    choices: [
      { text: "Continue.", next: "act1_butchering", effects: { food: 30, hunting: 15, standing: 20, family: 2 } }
    ]
  },

  act1_hunt_modest: {
    id: "act1_hunt_modest",
    act: 1, age: 16,
    date: "Spring 1861 — the hunt",
    background: "prairie_hunt_morning",
    ambient: "amb_prairie_summer.ogg",
    onEnter: (state) => { state.firstHuntOutcome = "modest"; },
    body: [
      "One yearling. Not bad for a first hunt. The men nod. Atéwaye shows you how to bleed it clean and how to thank Tȟatȟáŋka for giving its life."
    ],
    choices: [
      { text: "Continue.", next: "act1_butchering", effects: { food: 15, hunting: 8, standing: 8, family: 1 } }
    ]
  },

  act1_hunt_injury: {
    id: "act1_hunt_injury",
    act: 1, age: 16,
    date: "Spring 1861 — the hunt",
    background: "prairie_hunt_morning",
    ambient: "amb_prairie_summer.ogg",
    onEnter: (state) => { state.firstHuntOutcome = "injury"; },
    body: [
      "A bull cuts across your line. Your pony shies. You hit the grass hard and your shoulder pops.",
      "Atéwaye gets you onto another horse. He does not speak. Misúŋ runs down from the ridge.",
      "Iná sets your shoulder that night with a strip of rawhide. It will heal, but it will remember the hunt forever."
    ],
    choices: [
      { text: "Continue.", next: "act1_butchering", effects: { health: -20, standing: -10, hunting: 3 } }
    ]
  },

  act1_butchering: {
    id: "act1_butchering",
    act: 1, age: 16,
    date: "Spring 1861 — camp at dusk",
    background: "butchering_camp_dusk",
    ambient: "amb_camp_evening.ogg",
    body: [
      "Iná butchers fast. The meat goes to the drying racks. The hide is scraped with a bone tool. The sinew is rolled into thread. The bones for tools, the horns for spoons, the bladder for water-skin, the stomach as a pot. Nothing is wasted.",
      '"The men kill it," she says. "The women turn it into a life."',
      "You sit beside Misúŋ at the fire."
    ],
    choices: [
      { text: "A summer later…", next: "act1_sun_dance", effects: { culturalIntegrity: 5 } }
    ]
  },

  act1_sun_dance: {
    id: "act1_sun_dance",
    act: 1, age: 17,
    date: "Summer 1862 — the great Sun Dance arbor",
    background: "sun_dance_arbor",
    ambient: "amb_drum_sun_dance.ogg",
    body: [
      "Seventeen years old. The seven Lakota bands have come together for Wiwáŋyaŋg Wačhípi — the Sun Dance.",
      "The drum has not stopped for three days.",
      "This year, you have a choice."
    ],
    choices: [
      { text: "Dance the piercing. Offer your flesh. (Highest offering. Wound takes weeks to heal.)", next: "act1_sd_pierce", effects: {} },
      { text: "Join the drum circle. Sing the songs.", next: "act1_sd_drum", effects: {} },
      { text: "Watch from the people.", next: "act1_sd_observe", effects: {} }
    ]
  },

  act1_sd_pierce: {
    id: "act1_sd_pierce",
    act: 1, age: 17,
    date: "Summer 1862 — Sun Dance",
    background: "sun_dance_arbor",
    ambient: "amb_drum_sun_dance.ogg",
    body: [
      "The medicine man's knife is sharp. You do not feel it at first. The pegs go in. The rope is tied. You dance.",
      "You dance through the heat. The drum is your second heartbeat. Your eyes blur. You think of Iná. You think of Misúŋ. You think of {{hunt_memory}}. You think of {{spirit_memory}}. You think of Atéwaye.",
      "At the end, you throw your weight back. The flesh tears. You fall. The medicine man catches you. The blood is bright on your chest.",
      "You have made your offering. The scars will remain."
    ],
    choices: [
      { text: "Rest. Heal.", next: "act1_raid_or_trade", effects: { health: -20, spirit: 30, standing: 25, culturalIntegrity: 10 } }
    ]
  },

  act1_sd_drum: {
    id: "act1_sd_drum",
    act: 1, age: 17,
    date: "Summer 1862 — Sun Dance",
    background: "sun_dance_arbor",
    ambient: "amb_drum_sun_dance.ogg",
    body: [
      "You join the drum circle. The hide is hot under your hand. You learn three of the old songs by the second day. By the third, you sing them without thinking. When the dancers come down off the rope, you are still drumming."
    ],
    choices: [
      { text: "Continue.", next: "act1_raid_or_trade", effects: { spirit: 15, standing: 8, culturalIntegrity: 8 } }
    ]
  },

  act1_sd_observe: {
    id: "act1_sd_observe",
    act: 1, age: 17,
    date: "Summer 1862 — Sun Dance",
    background: "sun_dance_arbor",
    ambient: "amb_drum_sun_dance.ogg",
    body: [
      "You stand among the people. You see Iná with her hand on Misúŋ's shoulder. You see Atéwaye, who pierced when he was your age, watching with a face you cannot read.",
      "You feel the moment but do not enter it."
    ],
    choices: [
      { text: "Continue.", next: "act1_raid_or_trade", effects: { spirit: 5 } }
    ]
  },

  act1_raid_or_trade: {
    id: "act1_raid_or_trade",
    act: 1, age: 18,
    date: "Summer 1863 — council tepee",
    background: "council_tepee_interior",
    ambient: "amb_camp_evening.ogg",
    body: [
      "A Crow war party has been seen two days west. Twenty riders. Scouting our horses.",
      "The council debates. Some want to ride out. Some want to send a man with tobacco to talk first. Some say leave them — the buffalo are good this year.",
      "You are eighteen. You can ride."
    ],
    choices: [
      { text: "Ride with the war party.", next: "act1_raid_warpath", effects: { resistanceScore: 1 } },
      { text: "Carry trade tobacco.", next: "act1_raid_diplomacy", effects: {} },
      { text: "Hunt the south flats instead.", next: "act1_raid_hunt", effects: {} }
    ]
  },

  act1_raid_warpath: {
    id: "act1_raid_warpath",
    act: 1, age: 18,
    date: "Summer 1863",
    background: "prairie_flat_morning",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "You paint your face. Atéwaye lends you his second-best war club. Six of you ride out at dawn.",
      "The fight is short, ugly, confusing. A Crow rider rushes you and you swing the club and he goes down. You take his horse and his bow. You also take a cut across your forearm.",
      "You are alive. Three of your party are not.",
      "Iná holds your face in her hands a long time."
    ],
    choices: [
      { text: "Continue.", next: "act1_marriage", effects: { standing: 25, health: -10, hunting: 5, resistanceScore: 1 } }
    ]
  },

  act1_raid_diplomacy: {
    id: "act1_raid_diplomacy",
    act: 1, age: 18,
    date: "Summer 1863",
    background: "prairie_flat_morning",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "You ride with Old Stands-Against. He carries the pipe wrapped in red cloth.",
      "The Crow camp is wary but accepts the pipe. There is laughter at the bad translations. A peace is made: they will not raid our horses, we will not raid theirs.",
      "You ride home with a Crow knife given to you by a young man who said his name was Two Belly. You will remember the name."
    ],
    choices: [
      { text: "Continue.", next: "act1_marriage", effects: { standing: 15, food: 10, culturalIntegrity: 10 } }
    ]
  },

  act1_raid_hunt: {
    id: "act1_raid_hunt",
    act: 1, age: 18,
    date: "Summer 1863",
    background: "prairie_flat_morning",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "You and four others ride south. You bring back three buffalo and a deer. The camp is grateful. Some men whisper that you avoided the raid. Most do not care. The meat is good."
    ],
    choices: [
      { text: "Continue.", next: "act1_marriage", effects: { food: 25, hunting: 10, standing: 5 } }
    ]
  },

  act1_marriage: {
    id: "act1_marriage",
    act: 1, age: 19,
    date: "Autumn 1864 — dusk, a small fire outside a tepee",
    background: "marriage_fire_dusk",
    ambient: "amb_camp_evening.ogg",
    onEnter: (state) => {
      state.wifeBand = state.band === "hunkpapa" ? "oglala" : "hunkpapa";
    },
    body: [
      "You met her at the Sun Dance. Her uncle accepts Atéwaye's gift of seven horses. She accepts your blanket around her shoulders.",
      "She is from the {{wife_band}} band.",
      "Choose her name."
    ],
    choices: [
      {
        text: "Wíŋyaŋ Wašté — Good Woman.",
        next: "act1_marriage_continued",
        effects: {},
        onSelect: (state) => { state.wifeName = "Wíŋyaŋ Wašté"; }
      },
      {
        text: "Tȟašína Lúta — Red Robe.",
        next: "act1_marriage_continued",
        effects: {},
        onSelect: (state) => { state.wifeName = "Tȟašína Lúta"; }
      },
      {
        text: "Wakíŋyela — Dove.",
        next: "act1_marriage_continued",
        effects: {},
        onSelect: (state) => { state.wifeName = "Wakíŋyela"; }
      }
    ]
  },

  act1_marriage_continued: {
    id: "act1_marriage_continued",
    act: 1, age: 19,
    date: "Autumn 1864",
    background: "marriage_fire_dusk",
    ambient: "amb_camp_evening.ogg",
    onEnter: (state) => {
      // Add wife and son to family roster
      if (!state.familyNames.find(m => m.role === "wife")) {
        state.familyNames.push({ name: state.wifeName || "Wíŋyaŋ Wašté", role: "wife", alive: true });
      }
      if (!state.familyNames.find(m => m.role === "son")) {
        state.familyNames.push({ name: "Hokšíla Wakȟáŋ", role: "son", alive: true });
      }
    },
    body: [
      "The marriage is quiet. Iná cries. Misúŋ, fourteen and almost a man himself, will not stop grinning.",
      "You build a tepee together. {{wife}} brings her own buffalo robe and her own beadwork. The tepee is hers.",
      "A year later, a son. You name him Hokšíla Wakȟáŋ (Sacred Boy)."
    ],
    choices: [
      { text: "Years pass…", next: "act1_finale", effects: { family: 2, spirit: 10, hope: 10, standing: 10 } }
    ]
  },

  act1_finale: {
    id: "act1_finale",
    act: 1, age: 20,
    date: "Late Summer 1865",
    background: "camp_evening_fire",
    ambient: "amb_camp_evening.ogg",
    body: [
      "Twenty years old. A wife. A son. A tepee of your own. The buffalo still everywhere on the horizon — in places, the herds so thick the ground looks like a dark sea.",
      "A rider comes in from the south just before dark. He has been gone two months. He eats, then speaks.",
      '"White hunters. South of the Powder. They are killing the buffalo with long guns. They take the hide and leave the meat. They are killing thousands."',
      "The fire pops. {{wife}} shifts the baby on her shoulder. Iná does not look up.",
      '"Thousands?" Atéwaye says.',
      '"Thousands."',
      "A long silence."
    ],
    choices: [
      { text: "They cannot kill them all.", next: "act2_timeskip", effects: {} },
      { text: "Then we ride south and meet them.", next: "act2_timeskip", effects: { resistanceScore: 1 } },
      { text: "Hold the baby tighter.", next: "act2_timeskip", effects: { family: 5 } }
    ]
  },

  // ── ACT 2 — The Vanishing (1870–1876) ────────────────────────────────────

  act2_timeskip: {
    id: "act2_timeskip",
    act: 2, age: 25,
    date: "Summer 1870 — Powder River country",
    background: "prairie_flat_morning",
    ambient: "amb_prairie_summer.ogg",
    onEnter: (state) => { state.currentAct = 2; },
    body: [
      "Five years.",
      "The rider's words from 1865 proved true. White hunters — men who called themselves buffalo runners — moved through the southern ranges like a fire that does not go out. The Kiowa, the Comanche, the Cheyenne say the same thing from the south: empty grass where the herds used to darken the earth.",
      "In your camp, the talk is cautious. The northern herds are still here. The Hunkpapa and Oglala hold the Powder River country. Sitting Bull speaks at every council, and more men listen each year.",
      "{{wife}} is twenty-four. Your son Hokšíla Wakȟáŋ is five years old. He already holds a small bow.",
      "Misúŋ, nineteen and lean, is one of the best young riders in camp. He makes you proud and sometimes afraid — he rides toward danger the way you used to.",
      "Old Hawk Feather is slower than he was. Some mornings he does not come out of his lodge.",
      "This summer, you ride with the hunters."
    ],
    choices: [
      { text: "Ride out.", next: "act2_hunt", effects: { hope: -5 } }
    ]
  },

  act2_hunt: {
    id: "act2_hunt",
    act: 2, age: 25,
    date: "Summer 1870 — Powder River hunting grounds",
    background: "prairie_hunt_morning",
    ambient: "amb_prairie_summer.ogg",
    minigame: "buffaloHunt",
    config: { herdSize: 3, scrollSpeed: 1.2, thresholds: { ok: 2, poor: 0 } },
    results: { ok: "act2_hunt_ok", poor: "act2_hunt_poor" },
    body: [
      "The valley where there used to be thousands.",
      "Today, a few dozen on the far ridge. Maybe a hundred in the draw below.",
      "Misúŋ rides up beside you. \"Three years ago,\" he says, \"you could not see the ground from here.\"",
      "The hunt leader gives the signal."
    ],
    choices: [
      { text: "Begin the hunt.", action: "minigame", effects: {} }
    ]
  },

  act2_hunt_ok: {
    id: "act2_hunt_ok",
    act: 2, age: 25,
    date: "Summer 1870",
    background: "prairie_hunt_morning",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "Enough. Two buffalo from a small herd. The camp will not go hungry, but the women work quieter than they used to. There is less to preserve.",
      "Misúŋ made his first kill cleanly. He is not celebrating.",
      "That evening you ride east to look at the valley. It is empty. Last year, there were tracks everywhere. This year, only grass."
    ],
    choices: [
      { text: "Continue.", next: "act2_bone_field", effects: { food: 20, hunting: 5, hope: -5 } }
    ]
  },

  act2_hunt_poor: {
    id: "act2_hunt_poor",
    act: 2, age: 25,
    date: "Summer 1870",
    background: "prairie_hunt_morning",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "The herd scattered before you reached them. A bad angle, a nervous horse — you do not know which. One buffalo from the whole party.",
      "The camp divides the meat in small portions.",
      "Iná does not say anything. That is worse than if she had."
    ],
    choices: [
      { text: "Continue.", next: "act2_bone_field", effects: { food: 5, hunting: 3, hope: -15 } }
    ]
  },

  act2_bone_field: {
    id: "act2_bone_field",
    act: 2, age: 25,
    date: "Late Summer 1870 — south of the Powder River",
    background: "bone_field_afternoon",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "You find it by accident, riding south to scout. A valley — a full valley — covered in bone.",
      "Not new. The hides have been gone for months. The skulls are bleached white. There are thousands of them, stacked and scattered, as far as you can see.",
      "A single crow walks among them. The wind makes no sound you recognize.",
      "This is where the herd was."
    ],
    choices: [
      { text: "Ride to the hide hunters' camp. Say something to their faces.", next: "act2_hunter_encounter", effects: { resistanceScore: 1, spirit: -5 } },
      { text: "Count the bones. Mark the valley in your memory. Bring word to the council.", next: "act2_council_warning", effects: { culturalIntegrity: 5, spirit: -10 } },
      { text: "Turn your horse away. You cannot stay here.", next: "act2_council_warning", effects: { spirit: -15, hope: -10 } }
    ]
  },

  act2_hunter_encounter: {
    id: "act2_hunter_encounter",
    act: 2, age: 25,
    date: "Late Summer 1870 — a hide hunters' camp",
    background: "prairie_flat_morning",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "Their camp smells of blood and grease and rotting meat. Six men. Long rifles. A mule-drawn wagon piled with fresh hides.",
      "One stands. Tall, sunburned, not afraid of you.",
      '"Injun," he says. Not a greeting.',
      "You speak enough English — from years of trade — to say what you mean. You tell them this valley belongs to the Lakota people. That what they have done is killing your winter.",
      "The tall man squints. \"Government says different,\" he says. \"Got a permit.\" He holds up a paper.",
      "You do not know if it is real. You suspect it does not matter.",
      "You ride home with his face in your mind."
    ],
    choices: [
      { text: "Bring this to the council.", next: "act2_council_warning", effects: { resistanceScore: 2, standing: 10, spirit: -10 } }
    ]
  },

  act2_council_warning: {
    id: "act2_council_warning",
    act: 2, age: 26,
    date: "Autumn 1870 — the council lodge",
    background: "council_tepee_interior",
    ambient: "amb_camp_evening.ogg",
    body: [
      "Sitting Bull speaks last, as he often does now.",
      "He is forty years old. His face is a face that has decided many things and regrets few of them.",
      '"What treaty that the whites have kept has the red man broke? Not one. What treaty that the white man ever made with us have they kept? Not one."',
      "He says this quietly. Not angry. The way you say something you have known for a long time.",
      '"The Black Hills are the heart of everything that is. We must hold what is ours."',
      "The council is silent. Outside, children are laughing at something. A dog barks. The ordinary world continues."
    ],
    choices: [
      { text: "Listen. Remember these words.", next: "act2_sheridan_news", effects: { spirit: 10, culturalIntegrity: 5, resistanceScore: 1 } }
    ]
  },

  act2_sheridan_news: {
    id: "act2_sheridan_news",
    act: 2, age: 26,
    date: "Spring 1871 — trading post on the Missouri",
    background: "camp_evening_fire",
    ambient: "amb_camp_evening.ogg",
    body: [
      "A Métis trader brings news from the south. He repeats what he heard at a fort in Indian Territory.",
      "A Comanche chief introduced himself to General Philip Sheridan — the officer who commands the Army across the plains — as a good Indian. Sheridan looked at him and said:",
      '"The only good Indians I ever saw were dead."',
      "The officers around him laughed.",
      "You sit with this a moment. {{spirit_memory}}",
      "You know what kind of country you are living in now."
    ],
    choices: [
      { text: "Ride home. Say nothing to the children.", next: "act2_iron_horse", effects: { hope: -15, spirit: -5, resistanceScore: 1 } }
    ]
  },

  act2_iron_horse: {
    id: "act2_iron_horse",
    act: 2, age: 27,
    date: "Summer 1872 — Yellowstone River valley",
    background: "railroad_grade_summer",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "They come with chains, measuring instruments, and a cavalry escort. Survey crews for the Northern Pacific Railroad — an iron wagon road from the Great Lakes to the Pacific Ocean.",
      "It will pass through the Powder River country. Through the hunting grounds the Fort Laramie Treaty of 1868 reserved exclusively for the Lakota.",
      "Sitting Bull sends scouts to count them. There are hundreds. The cavalry escort has two Gatling guns.",
      "What do you do?"
    ],
    choices: [
      { text: "Ride with the warriors who turn the surveyors back across the Yellowstone.", next: "act2_hungry_winter", effects: { resistanceScore: 2, standing: 10, health: -5 } },
      { text: "Watch from the ridge. Count their numbers. Bring back what you learn.", next: "act2_hungry_winter", effects: { hunting: 5, spirit: -5 } },
      { text: "Approach the lead engineer. Ask him where the iron road will run.", next: "act2_hungry_winter", effects: { standing: 5, hope: -10 } }
    ]
  },

  act2_hungry_winter: {
    id: "act2_hungry_winter",
    act: 2, age: 28,
    date: "Winter 1873–74 — the Powder River camp",
    background: "winter_camp_hungry",
    ambient: "amb_camp_evening.ogg",
    body: [
      "The worst winter anyone can remember.",
      "The hunting grounds are narrower than they were five years ago. The buffalo have not come to the usual valleys. Some say the railroad frightened them north. Some say they are simply fewer. Both may be true.",
      "{{wife}} has kept the food stores carefully, but by February they are nearly gone. Hokšíla Wakȟáŋ, eight years old, asks you in the morning if there will be something to eat. You tell him yes.",
      "You have four choices."
    ],
    choices: [
      { text: "Go to the agency at Standing Rock. Accept government rations.", next: "act2_winter_agency", effects: {} },
      { text: "Trade with the Arikara at their village on the Missouri — dried corn for buffalo hides.", next: "act2_winter_outcome", effects: { food: 20, standing: 5 } },
      { text: "Hunt the south flats. Thin pickings, but safe.", next: "act2_winter_outcome", effects: { food: 10, hunting: 5, health: -5 } },
      { text: "Misúŋ says he knows a valley past the Crow boundary where the herd winters. It is dangerous. He wants to go with you.", next: "act2_winter_hunt_danger", effects: {} }
    ]
  },

  act2_winter_hunt_danger: {
    id: "act2_winter_hunt_danger",
    act: 2, age: 28,
    date: "Winter 1874 — beyond the Crow boundary",
    background: "blizzard_plains",
    ambient: "amb_camp_evening.ogg",
    body: [
      "Three days out, a blizzard comes down from the north.",
      "Misúŋ's valley is real — you found the herd, took two buffalo, loaded the pack horses. The wind started while you were breaking camp.",
      "The temperature drops fast. The horses are tired. Misúŋ's horse stumbles on an ice-covered creek crossing and throws him.",
      "He gets up. He is limping. The light is going."
    ],
    choices: [
      {
        text: "Push through. You know this country.",
        next: (state) => (state.standing >= 60 && state.hunting >= 50) ? "act2_winter_hunt_danger_survival" : "act2_winter_hunt_danger_death",
        effects: { health: -10 }
      }
    ]
  },

  act2_winter_hunt_danger_death: {
    id: "act2_winter_hunt_danger_death",
    act: 2, age: 28,
    date: "Winter 1874",
    background: "blizzard_plains",
    ambient: "amb_camp_evening.ogg",
    onEnter: (state) => {
      Stats.killFamilyMember(state, "brother");
      state.misunState = "dead_act2";
    },
    body: [
      "You find shelter in a cutbank. It is not enough.",
      "Misúŋ stops shaking sometime in the night. You do not know exactly when — you were drifting yourself.",
      "In the morning you dig him out of the snow and put him on the pack horse. You ride home.",
      "You bring the buffalo meat. It feeds the camp for a week.",
      "You do not tell {{wife}} the details. She does not ask.",
      "You carry his name inside you from that day forward, in the place where you used to carry hope."
    ],
    choices: [
      { text: "Spring will come.", next: "act2_winter_outcome", effects: { hope: -25, spirit: -20, health: -15 } }
    ]
  },

  act2_winter_hunt_danger_survival: {
    id: "act2_winter_hunt_danger_survival",
    act: 2, age: 28,
    date: "Winter 1874",
    background: "blizzard_plains",
    ambient: "amb_camp_evening.ogg",
    body: [
      "You find a deep cutbank and pack snow against the horses for a windbreak. You know how to wait out the cold.",
      "Misúŋ's ankle is swollen but not broken. He sits against your back through the night for warmth and does not complain.",
      "By morning the storm has passed. The world is white and silent and very bright.",
      "You ride home in two days. Misúŋ walks with a limp for a month. He never talks about the cold.",
      "The buffalo meat feeds the camp for two weeks."
    ],
    choices: [
      { text: "Rest. Spring is coming.", next: "act2_winter_outcome", effects: { food: 15, health: -15, hope: -5 } }
    ]
  },

  act2_winter_agency: {
    id: "act2_winter_agency",
    act: 2, age: 28,
    date: "Winter 1874 — Standing Rock Agency",
    background: "winter_creek_camp",
    ambient: "amb_camp_evening.ogg",
    body: [
      "The agency is a wooden building on a flat. A government man in a wool suit gives you a number written on a paper.",
      "The rations: salt pork, hardtack, a small bag of cornmeal. One week's food for four people.",
      "The salt pork smells wrong. You eat it anyway.",
      "A man from your camp — a man you have known since childhood — is working here as an agency policeman. He does not meet your eyes.",
      "Hokšíla Wakȟáŋ asks if the hardtack is cake. You say yes."
    ],
    choices: [
      { text: "Return to camp.", next: "act2_winter_outcome", effects: { food: 25, standing: -15, culturalIntegrity: -10, hope: -15 } }
    ]
  },

  act2_winter_outcome: {
    id: "act2_winter_outcome",
    act: 2, age: 29,
    date: "Spring 1874 — Powder River camp",
    background: "camp_evening_fire",
    ambient: "amb_camp_evening.ogg",
    body: [
      "Spring comes, but the camp is smaller. Old Hawk Feather did not survive the cold. He died alone in his lodge in February, before anyone noticed. He was very old. He had been ready for a long time.",
      "You go to his lodge and find the pipe he gave you twenty years ago on the butte. You take it.",
      "In June, a rider comes from the south with news: the Army sent an expedition into Pahá Sápa — the Black Hills. A general named Custer. A thousand soldiers and a hundred wagons, and scientists, and a newspaper reporter.",
      "They found gold."
    ],
    choices: [
      { text: "The Black Hills are ours.", next: "act2_black_hills", effects: { spirit: -10, hope: -10, health: 5 } }
    ]
  },

  act2_black_hills: {
    id: "act2_black_hills",
    act: 2, age: 29,
    date: "Summer 1874 — Powder River country",
    background: "prairie_flat_morning",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "The Fort Laramie Treaty of 1868 guarantees Pahá Sápa — the Black Hills — to the Lakota forever. The Army knows this. The prospectors come anyway.",
      "Red Cloud, who fought the Army to a standstill along the Bozeman Trail and forced that treaty, speaks now from his agency at Pine Ridge:",
      '"They made us many promises, more than I can remember. But they never kept but one. They promised to take our land, and they took it."',
      "The government sends commissioners to buy the Black Hills. Sitting Bull will not meet with them. Others will.",
      "What do you believe?"
    ],
    choices: [
      { text: '"We cannot fight the armies that will come. There are too many of them."', next: "act2_ultimatum", effects: { hope: -10, resistanceScore: -1 } },
      { text: '"The Black Hills are ours by treaty and by blood. We hold."', next: "act2_ultimatum", effects: { resistanceScore: 2, standing: 10, spirit: 10 } },
      { text: '"Send word to Red Cloud and Spotted Tail. Let the chiefs speak together."', next: "act2_ultimatum", effects: { standing: 5, spirit: 5, culturalIntegrity: 5 } }
    ]
  },

  act2_ultimatum: {
    id: "act2_ultimatum",
    act: 2, age: 30,
    date: "Winter 1875–76 — the Powder River camp",
    background: "winter_camp_hungry",
    ambient: "amb_camp_evening.ogg",
    body: [
      "The commissioners failed to buy the Black Hills. The government changes its answer.",
      "On December 6, 1875, the Commissioner of Indian Affairs orders all bands living off the reservation to report to their assigned agencies by January 31, 1876. Any Indian not on a reservation after that date will be treated as hostile.",
      "January 31 is seven weeks away. It is the middle of winter. The Powder River country is snowbound.",
      "A messenger reads the order aloud in the council lodge. No one speaks for a long time.",
      "{{wife}} is looking at you from across the fire. Hokšíla Wakȟáŋ is asleep against her side."
    ],
    choices: [
      { text: "Comply. Load the horses. Ride to Standing Rock before the deadline.", next: "act3b_pine_ridge", effects: { path_taken: "B", hope: -20, standing: -10, culturalIntegrity: -10 } },
      { text: "Resist. Ride north. Join Sitting Bull's camp on the Powder River.", next: "act3a_greasy_grass_camp", effects: { path_taken: "A", resistanceScore: 2, standing: 10, hope: 5 } }
    ]
  },

  // ── ACT 3 PATH A — Resistance (1876–1877) ────────────────────────────────

  act3a_greasy_grass_camp: {
    id: "act3a_greasy_grass_camp",
    act: 3, age: 31,
    date: "June 1876 — Greasy Grass camp (Little Bighorn River)",
    background: "greasy_grass_camp",
    ambient: "amb_drum_sun_dance.ogg",
    onEnter: (state) => {
      state.currentAct = 3;
      if (!state.familyNames.find(f => f.role === "daughter")) {
        state.familyNames.push({ name: "Wíčhápi", role: "daughter", alive: true });
      }
    },
    body: [
      "The largest gathering anyone has ever seen. Thirty thousand people, some say. Every Lakota band. Northern Cheyenne. The camp circles run for three miles along the Greasy Grass — the white men call it the Little Bighorn.",
      "The Army's January deadline came and went. Many bands refused to report. The Army declared all of them hostile. They are coming now.",
      "Before they arrived: the Sun Dance. Sitting Bull danced for thirty-six hours. He offered one hundred pieces of his flesh, fifty from each arm. At the end, he had a vision:",
      '"I looked up and saw soldiers falling like grasshoppers, with their heads down and their hats falling off. They were falling right into our camp."',
      "Crazy Horse moved through the camp yesterday. His eyes did not settle on anything for long.",
      "{{wife}} took your hand that morning and has not let go."
    ],
    choices: [
      { text: "Be ready.", next: "act3a_greasy_grass_attack", effects: { spirit: 10, resistanceScore: 1 } }
    ]
  },

  act3a_greasy_grass_attack: {
    id: "act3a_greasy_grass_attack",
    act: 3, age: 31,
    date: "June 25, 1876 — early afternoon",
    background: "battle_smoke",
    ambient: "amb_drum_sun_dance.ogg",
    body: [
      "They come from the south first. Major Reno, with three companies. He charges the end of the village at a long gallop.",
      "The warning cry goes through the camp. Women strike the tepee poles. Children run toward the river.",
      "Crazy Horse rides through the dust, his face painted half red, half yellow. \"Hokahey! It is a good day to die!\"",
      "There is a second column to the north — guidons on a long ridge above the river. Custer. You have minutes to decide."
    ],
    choices: [
      { text: "Ride with the warriors charging out to meet Reno's column.", next: "act3a_battle_glory", effects: { resistanceScore: 1 } },
      { text: "Stay. Hold the line in front of the women's camp.", next: "act3a_battle_protect", effects: {} },
      { text: "Ride north. Cut Custer off from the river ford.", next: "act3a_battle_custer", effects: { resistanceScore: 1 } }
    ]
  },

  act3a_battle_glory: {
    id: "act3a_battle_glory",
    act: 3, age: 31,
    date: "June 25, 1876 — the charge",
    background: "battle_smoke",
    ambient: "amb_drum_sun_dance.ogg",
    body: [
      "Crazy Horse rides in wide circles through the gunsmoke, drawing fire, shouting, burning off fear. You follow the warriors east and then north, circling Reno's position.",
      "Reno's men break. They run for the river. You chase them into the water — the current chest-deep and fast.",
      "A soldier fires from the far bank. The shot takes you across the ribs — a graze, but deep. You stay in the saddle.",
      "By the time Reno's men reach the bluffs on the other side, you have pulled back. Your horse is spent. Your side bleeds into your shirt.",
      "To the north, on a long ridge above the river — the sound of heavy, concentrated fire."
    ],
    choices: [
      {
        text: "Ride north. The main battle is on the ridge.",
        next: (state) => state.health <= 0 ? "ending_little_bighorn_died" : "act3a_battle_custer",
        effects: { health: -25, standing: 15 }
      }
    ]
  },

  act3a_battle_protect: {
    id: "act3a_battle_protect",
    act: 3, age: 31,
    date: "June 25, 1876 — the south end of camp",
    background: "battle_smoke",
    ambient: "amb_drum_sun_dance.ogg",
    body: [
      "Reno's cavalry reaches the camp's edge. You are there with twenty other men, between the soldiers and the tepees where the women and children are running.",
      "A trooper's horse comes through the smoke. You bring the rider down from the saddle. He is not dead. You leave him and move.",
      "{{wife}} and Wíčhápi are fifty yards behind you. The firing goes on for an hour. Then it stops.",
      "Reno is falling back. The warriors push him to the river and hold. The south end of the camp is safe.",
      "To the north — a long ridge — the sound of concentrated fire. Something is happening up there."
    ],
    choices: [
      { text: "Ride north to the ridge.", next: "act3a_battle_custer", effects: { health: -10, standing: 10 } }
    ]
  },

  act3a_battle_custer: {
    id: "act3a_battle_custer",
    act: 3, age: 31,
    date: "June 25, 1876 — Battle Ridge",
    background: "battle_smoke",
    ambient: "amb_drum_sun_dance.ogg",
    body: [
      "You reach the ridge from the west as Crazy Horse comes over from the north. The soldiers are pinned in a half-circle on the high ground. Their horses are down, shot for barricades.",
      "There are hundreds of warriors around them. The firing goes on a long time.",
      "Then it is over.",
      "Two hundred and sixty-eight soldiers and scouts. None left standing.",
      "You do not feel what you expected to feel.",
      "Crazy Horse rides slowly through the dead. He does not speak."
    ],
    choices: [
      { text: "Return to camp.", next: "act3a_battle_aftermath", effects: { spirit: -5, culturalIntegrity: 5 } }
    ]
  },

  act3a_battle_aftermath: {
    id: "act3a_battle_aftermath",
    act: 3, age: 31,
    date: "June 26, 1876 — the Greasy Grass camp",
    background: "camp_evening_fire",
    ambient: "amb_camp_evening.ogg",
    body: [
      "The celebration is real but quieter than you expected. The women keen for their dead. There are Lakota dead too — thirty or more.",
      "Sitting Bull moves through the camp slowly. He stops beside a group of elders and says:",
      '"Today we won a great battle. But I am not happy. Those soldiers died bravely. And now the whites will come with ten times as many. They will not stop until they have everything."',
      "He is right. Everyone who listens knows he is right.",
      "The camp breaks and moves the next day. Reno's survivors still hold the bluffs above the river. They watch you go.",
      "Summer 1876. The last free summer."
    ],
    choices: [
      { text: "Move north. Stay free as long as possible.", next: "act3a_long_pursuit", effects: { spirit: 5, hope: -15 } }
    ]
  },

  act3a_long_pursuit: {
    id: "act3a_long_pursuit",
    act: 3, age: 32,
    date: "Winter 1876–77 — the Powder River country",
    background: "blizzard_plains",
    ambient: "amb_camp_evening.ogg",
    onEnter: (state) => {
      Stats.killFamilyMember(state, "daughter");
      Stats.killFamilyMember(state, "father");
      if (!(state.misunState || "").startsWith("dead")) {
        Stats.killFamilyMember(state, "brother");
        state.misunState = "dead_act3";
      }
    },
    body: [
      "The Army does not rest.",
      "General Miles finds your camp in the Wolf Mountains in January. The temperature is forty below. He attacks anyway.",
      "You move. They follow. You move again. They follow again.",
      "Wíčhápi, your daughter, dies in February during a forced march across a frozen creek. She was nine years old. You wrapped her in a robe and left her in a tree because the ground was frozen and you could not stop moving.",
      "{{misun_long_pursuit}}",
      "Atéwaye made his last charge in March — against a Miles column in a coulee east of the Bighorn. He was fifty-one. He died well. You were not there.",
      "By April, your camp has thirty people. There were three hundred after Greasy Grass.",
      "Crazy Horse is in talks with the Army at Red Cloud Agency. Sitting Bull has crossed into Canada. Hundreds of others have surrendered.",
      "It is May 1877. You are exhausted. {{wife}} has not slept a full night since January. Hokšíla Wakȟáŋ, twelve years old, is a man now. His face is a man's face."
    ],
    choices: [
      { text: '"What do we do?" He is asking you.', next: "act3a_fork", effects: { health: -20, food: -20, hope: -20 } }
    ]
  },

  act3a_fork: {
    id: "act3a_fork",
    act: 3, age: 32,
    date: "May 1877 — east of the Bighorn Mountains",
    background: "prairie_flat_morning",
    ambient: "amb_prairie_summer.ogg",
    body: [
      "Crazy Horse surrendered yesterday at Red Cloud Agency. He rode in with eight hundred people — emaciated horses, women and children and old men who could barely walk. The soldiers counted their rifles.",
      "Sitting Bull is across the Milk River in Canada, in the Grandmother's country, with four thousand people. The buffalo are still there, for now.",
      "The remnant of your band — thirty people — waits for your word.",
      "It is a clear spring morning. The grass is coming up green."
    ],
    choices: [
      { text: "Surrender. Ride to Red Cloud Agency.", next: "act3a_crazy_horse_death", effects: {} },
      { text: "Cross the Milk River. Follow Sitting Bull to Canada.", next: "act3a_canada", effects: {} },
      { text: "Fight. Keep fighting until you cannot.", next: "act3a_last_fight", effects: { resistanceScore: 2 } }
    ]
  },

  act3a_crazy_horse_death: {
    id: "act3a_crazy_horse_death",
    act: 3, age: 32,
    date: "September 5, 1877 — Fort Robinson, Nebraska",
    background: "agency_interior",
    ambient: "amb_camp_evening.ogg",
    body: [
      "You surrendered in May. The agency is a strange country — buildings of wood, fences, numbers instead of names.",
      "In September, the agent orders Crazy Horse arrested. There is a rumor: he plans to escape, to rejoin Sitting Bull in Canada.",
      "They bring him to the guardhouse. Agency police hold his arms. A soldier — an infantryman — drives a bayonet into his side.",
      "They carry him outside and lay him on the ground. His father is kneeling with him.",
      "He says: \"Let me go, my friends. You have got me hurt enough.\"",
      "He dies at midnight. He is thirty-five years old.",
      "You stand in the dark outside the guardhouse for a long time. There is nothing to do. There is nothing to say.",
      "The agency is the country now."
    ],
    choices: [
      { text: "Stay. There is nowhere else to go.", next: "act3b_pine_ridge_path_a_join", effects: { hope: -20, spirit: -15, culturalIntegrity: 5 } }
    ]
  },

  act3a_canada: {
    id: "act3a_canada",
    act: 3, age: 32,
    date: "1877–81 — the Grandmother's Country (Canada)",
    background: "prairie_flat_morning",
    ambient: "amb_prairie_summer.ogg",
    onEnter: (state) => { Stats.killFamilyMember(state, "mother"); },
    body: [
      "Four years in Canada. The buffalo thin and then are gone. The Canadian government will not feed Lakota refugees — they want you to return south.",
      "Sitting Bull holds out. He is the last chief who will not bend.",
      "Iná dies in the third winter, crossing back over the border to visit a relative. She lay down in the snow and did not rise. You were not with her.",
      "In July 1881, Sitting Bull leads his last people to Fort Buford. One hundred and eighty-seven people.",
      "He surrenders his rifle to his young son to carry — so it is a boy, not a warrior, who hands it to the soldiers. The boy is recorded as Crow Foot, age five.",
      "Sitting Bull says to the officer:",
      '"I wish it to be remembered that I was the last man of my tribe to surrender my rifle."',
      "The officer writes nothing down.",
      "You hand over your weapons. You are given a number. Your name is not asked."
    ],
    choices: [
      { text: "This is not the end.", next: "ending_canada_exile", effects: { hope: -30, standing: -10 } }
    ]
  },

  act3a_last_fight: {
    id: "act3a_last_fight",
    act: 3, age: 32,
    date: "Autumn 1877 — Powder River country",
    background: "blizzard_plains",
    ambient: "amb_camp_evening.ogg",
    body: [
      "Seven of you. That is all that remains.",
      "The Army finds your camp near the Bighorn in October. Three days of running through the hills, hit-and-run. The soldiers do not sleep. They never seem to sleep.",
      "You sent {{wife}} and Hokšíla Wakȟáŋ ahead with two horses and pointed them toward the agency. You do not know if they made it.",
      "On the fourth day, in a narrow ravine, you cannot run further.",
      "{{spirit_memory}}",
      "Above the walls of the ravine: the sky, very wide and very blue.",
      "And then silence."
    ],
    choices: [
      { text: "No surrender.", next: "ending_died_fighting", effects: { health: -100, resistanceScore: 2 } }
    ]
  },

  // ── ACT 3 PATH B — Reservation (1876–1890) ───────────────────────────────

  act3b_pine_ridge: {
    id: "act3b_pine_ridge",
    act: 3, age: 30,
    date: "Winter 1876 — Pine Ridge Agency",
    background: "winter_creek_camp",
    ambient: "amb_camp_evening.ogg",
    onEnter: (state) => { state.currentAct = 3; },
    body: [
      "You ride in on a January morning. The snow is deep. The agency buildings sit two miles from the creek.",
      "A man in a wool coat counts you and gives you a paper tag with a number stamped on it. Number 412.",
      "{{atewaye_pine_ridge}}",
      "{{misun_pine_ridge}}",
      "{{wife}} keeps her eyes straight ahead.",
      "The tepees go up in rows, not circles. The rows are the agent's idea. He says rows make counting easier.",
      "They take the horses. Most of them. They leave you two."
    ],
    choices: [
      { text: "Begin again.", next: "act3b_ration_line", effects: { hope: -20, culturalIntegrity: -10, food: 10 } }
    ]
  },

  act3b_pine_ridge_path_a_join: {
    id: "act3b_pine_ridge_path_a_join",
    act: 3, age: 32,
    date: "Late 1877 — Pine Ridge Agency",
    background: "winter_creek_camp",
    ambient: "amb_camp_evening.ogg",
    body: [
      "The agency in winter. The same rows of tepees. Iná is already here — she came in spring with the first wave who surrendered. She does not ask what you saw at Fort Robinson.",
      "{{wife}} builds the fire without speaking for a long time. Then she says: \"You are here.\"",
      "That is all. It is enough.",
      "Hokšíla Wakȟáŋ is thirteen. He watches you with a boy's eyes trying to be a man's eyes.",
      "They give you a number. Number 1044."
    ],
    choices: [
      { text: "This is the country now.", next: "act3b_ration_line", effects: { hope: -15, culturalIntegrity: -5 } }
    ]
  },

  act3b_ration_line: {
    id: "act3b_ration_line",
    act: 3, age: 31,
    date: "Ration day — the agency",
    background: "agency_interior",
    ambient: "amb_camp_evening.ogg",
    body: [
      "Every other Thursday. The agency issues rations to those enrolled. You hold your paper tag.",
      "The line begins at dawn. By the time the building opens, it stretches three hundred yards."
    ],
    choices: [
      { text: "Take your place in the line.", action: "ration", next: "act3b_years_pass", effects: {} }
    ]
  },

  act3b_years_pass: {
    id: "act3b_years_pass",
    act: 3, age: 40,
    date: "1880–1890 — Pine Ridge Reservation",
    background: "camp_evening_fire",
    ambient: "amb_camp_evening.ogg",
    onEnter: (state) => {
      // Track who dies during these years (flags must be set BEFORE killing, for token rendering)
      state._atewayeDiedInReservation = !!state.atewayeAlive;
      state._misunDiedInReservation = !(state.misunState || "").startsWith("dead");
      // Kill Iná (winter 1880), Atéwaye if alive (winter 1883), Misúŋ if alive (spring 1885)
      Stats.killFamilyMember(state, "mother");
      if (state._atewayeDiedInReservation) Stats.killFamilyMember(state, "father");
      if (state._misunDiedInReservation) {
        Stats.killFamilyMember(state, "brother");
        state.misunState = "dead_reservation";
      }
      // Grandson born 1881
      if (!state.familyNames.find(f => f.role === "grandson")) {
        state.familyNames.push({ name: "Čhantéwašté", role: "grandson", alive: true });
      }
    },
    body: [
      "Ten years on the reservation.",
      "Iná dies in the winter of 1880, in her sleep. She was sixty years old.",
      "{{atewaye_years_pass}}",
      "{{misun_years_pass}}",
      "Hokšíla Wakȟáŋ married a woman named Pȟežúta Wíŋ (Medicine Woman). In 1881, their first child — a boy — is born. You name him Čhantéwašté (Good Heart). He is your grandson.",
      "You are a grandfather. The word sits strangely in your mouth at first, then it does not.",
      "The reservation shrinks twice in ten years. Each time the government takes more land. Too much land, they say. Not enough land, the settlers say.",
      "It is 1890. Hokšíla Wakȟáŋ is twenty-five. Čhantéwašté is nine."
    ],
    choices: [
      { text: "Continue.", next: "act3b_dawes", effects: { hope: -10, spirit: -5 } }
    ]
  },

  act3b_dawes: {
    id: "act3b_dawes",
    act: 3, age: 42,
    date: "1887 — Pine Ridge Reservation",
    background: "agency_interior",
    ambient: "amb_camp_evening.ogg",
    body: [
      "The Dawes Severalty Act passes in Washington. Every Indian family receives an allotment — 160 acres for a household. The rest — millions of acres — becomes \"surplus\" and is opened to white settlement.",
      "Hokšíla Wakȟáŋ, twenty-two, stands next to you with the allotment paper. It says the land is yours and you must farm it.",
      "The allotment agent is waiting. He wants your mark."
    ],
    choices: [
      { text: "Sign. Take the land while it is still offered.", next: "act3b_boarding_school", effects: { culturalIntegrity: -10, hope: -5 } },
      { text: "Refuse. This land belongs to the people, not to one family.", next: "act3b_boarding_school", effects: { standing: 5, resistanceScore: 1, culturalIntegrity: 5 } }
    ]
  },

  act3b_boarding_school: {
    id: "act3b_boarding_school",
    act: 3, age: 44,
    date: "1889 — Pine Ridge Agency",
    background: "agency_interior",
    ambient: "amb_camp_evening.ogg",
    body: [
      "A government letter arrives at Hokšíla Wakȟáŋ's door. Čhantéwašté, age eight, has been selected to attend the Indian Industrial School at Carlisle, Pennsylvania. The school's founder, Captain Richard Henry Pratt, has written:",
      '"A great general has said that the only good Indian is a dead one. I agree with the sentiment, but only in this: that all the Indian there is in the race should be dead. Kill the Indian in him, and save the man."',
      "Hokšíla Wakȟáŋ, twenty-four, brings the letter to you. You are his father. He is asking what to do.",
      "Čhantéwašté is asleep in the next room."
    ],
    choices: [
      { text: "Send him. Compliance is survival.", next: "act3b_ghost_dance", effects: { child_at_carlisle: true, culturalIntegrity: -15, hope: -10 } },
      { text: "Hide him. Keep him away until the enrollment agents move on.", next: "act3b_ghost_dance", effects: { culturalIntegrity: 5, hope: 5 } },
      { text: "Move the family to your cousin's allotment on the far end of the reservation.", next: "act3b_ghost_dance", effects: { health: -5, culturalIntegrity: 5 } }
    ]
  },

  act3b_ghost_dance: {
    id: "act3b_ghost_dance",
    act: 3, age: 45,
    date: "Autumn 1890 — Pine Ridge Reservation",
    background: "camp_evening_fire",
    ambient: "amb_drum_sun_dance.ogg",
    body: [
      "A new religion comes from the west. A Paiute prophet named Wovoka has received a vision: the Creator will intervene. The dead will return. The buffalo will come back. The white settlers will be swallowed by the earth. The Lakota who wear Ghost Shirts — white muslin painted with stars and moons — will not be harmed by soldiers' bullets.",
      "The dance spreads like fire through all the reservations. Hundreds dancing every night, faces turned up toward the stars.",
      "The agent is afraid. He has sent for soldiers."
    ],
    choices: [
      { text: "Join the dance. The people need something to hold onto.", next: "act3b_sitting_bull_dec15", effects: { joined_ghost_dance: true, spirit: 15, culturalIntegrity: 5, hope: 10 } },
      { text: "Watch but do not dance. You have seen too many promises end this way.", next: "act3b_sitting_bull_dec15", effects: { spirit: 5 } },
      { text: "Report the ghost dance gathering to the agent. It will bring soldiers, and soldiers bring death.", next: "act3b_sitting_bull_dec15", effects: { tribal_police: true, standing: -15, culturalIntegrity: -20 } }
    ]
  },

  act3b_sitting_bull_dec15: {
    id: "act3b_sitting_bull_dec15",
    act: 3, age: 45,
    date: "December 15, 1890 — Standing Rock Agency",
    background: "winter_creek_camp",
    ambient: "amb_camp_evening.ogg",
    body: [
      "Before dawn, forty-three Indian police arrive at Sitting Bull's cabin. Sent by Agent McLaughlin to arrest him.",
      "Sitting Bull, sixty years old, agrees to go. His followers begin to gather outside.",
      "His son, Crow Foot — fourteen years old — shouts at him from the doorway: \"You always called yourself a brave chief. Now you allow yourself to be taken by the metal breasts.\"",
      "Sitting Bull stops.",
      "The shouting outside turns to shooting. A follower fires. Lieutenant Bull Head, wounded, fires back at Sitting Bull. Red Tomahawk fires from behind.",
      "Sitting Bull falls. In the melee, six policemen and eight followers are killed. Crow Foot is found hiding and is shot.",
      "You hear this from a rider three days later, sitting at your fire."
    ],
    choices: [
      { text: "Continue.",
        visible: (state) => !!state.tribalPolice,
        next: "ending_tribal_policeman",
        effects: {} },
      { text: "Stay. Keep the family together on the allotment.",
        visible: (state) => !state.tribalPolice,
        next: "act3b_after_sitting_bull",
        effects: { hope: -15 } },
      { text: "Slip away north. Find Big Foot's band. The dance is still alive.",
        visible: (state) => !state.tribalPolice,
        next: "act3b_wounded_knee_lead_in",
        effects: { with_big_foot: true, resistanceScore: 1 } }
    ]
  },

  act3b_after_sitting_bull: {
    id: "act3b_after_sitting_bull",
    act: 3, age: 45,
    date: "Late December 1890 — Pine Ridge Reservation",
    background: "winter_creek_camp",
    ambient: "amb_camp_evening.ogg",
    body: [
      "The reservation is in panic. Thousands of ghost dancers are fleeing into the Badlands. Soldiers are everywhere — the 7th Cavalry, Custer's old regiment, is back.",
      "Big Foot's band — Miniconjou Lakota, two hundred and fifty people — is moving south from the Cheyenne River. They carry a white flag. Big Foot himself has pneumonia and rides in a wagon.",
      "You stay on your allotment. You keep the fire going. You keep Hokšíla Wakȟáŋ's family close.",
      "On December 28th, word comes that the 7th Cavalry has intercepted Big Foot's band at Wounded Knee Creek."
    ],
    choices: [
      { text: "Continue.", next: "act3b_wounded_knee_lead_in", effects: { hope: -10 } }
    ]
  },

  act3b_wounded_knee_lead_in: {
    id: "act3b_wounded_knee_lead_in",
    act: 3, age: 45,
    date: "December 28–29, 1890 — Wounded Knee Creek",
    background: "winter_creek_camp",
    ambient: "amb_camp_evening.ogg",
    body: [
      "The 7th Cavalry has intercepted Big Foot's band on Wounded Knee Creek, twenty miles northeast of Pine Ridge. Four Hotchkiss mountain guns are placed on the ridges surrounding the camp. Five hundred soldiers. Three hundred and fifty men, women, and children.",
      "December 29th. The soldiers demand the guns be surrendered.",
      "A shot fires. No one will ever agree on who fired first."
    ],
    choices: [
      {
        text: "Continue.",
        next: (state) => {
          if (state.joinedGhostDance || state.withBigFoot || state.resistanceScore >= 6) {
            return "act3b_wounded_knee_inside";
          }
          return "act3b_wounded_knee_outside";
        },
        effects: {}
      }
    ]
  },

  act3b_wounded_knee_inside: {
    id: "act3b_wounded_knee_inside",
    act: 3, age: 45,
    date: "December 29, 1890 — Wounded Knee",
    background: "blizzard_plains",
    ambient: null,
    type: "scrolling_finale",
    body: [
      "You are in the camp when the shooting begins.",
      "The Hotchkiss guns fire two-pound explosive shells at fifty rounds per minute.",
      "The camp becomes smoke and screaming and fire."
    ],
    victims: [
      "Spotted Elk — Big Foot, the chief. Found frozen, arms raised toward the sky.",
      "Yellow Bird — the ghost dance leader. Still dancing when the soldiers fired.",
      "Black Coyote — deaf. He did not understand the order to disarm.",
      "A boy of nine.",
      "A boy of seven.",
      "A girl of thirteen — hiding under a wagon.",
      "An infant, eight months old.",
      "A grandmother who was running.",
      "A grandfather who was not running.",
      "A mother and her three children.",
      "A young man and his wife.",
      "..."
    ],
    closingProse: [
      "By the end of December 29, between 250 and 300 Lakota are dead. At least 200 are women and children.",
      "The Army recovers its dead — 25 soldiers — and buries them at the fort. The Lakota dead are buried in a mass grave on the hill where the Hotchkiss guns stood.",
      "The temperature falls to forty below that night.",
      "It is the last large-scale armed conflict between the United States government and the Lakota people."
    ]
  },

  act3b_wounded_knee_outside: {
    id: "act3b_wounded_knee_outside",
    act: 3, age: 45,
    date: "December 29, 1890 — twelve miles from Wounded Knee",
    background: "prairie_flat_morning",
    ambient: "amb_camp_evening.ogg",
    body: [
      "You are twelve miles from Wounded Knee Creek when you hear the guns.",
      "The Hotchkiss cannon carry that far on a still morning. Four of them, firing fast. The sound goes on longer than you would have thought possible.",
      "Then silence.",
      "A rider comes at dusk. His horse is blown. He cannot speak for a while.",
      "When he speaks, you learn the number. Two hundred and fifty, perhaps three hundred. Women, children, old men. Big Foot, frozen where he fell. A girl found alive under her dead mother, three days later.",
      "You sit with this all night. You do not sleep."
    ],
    choices: [
      {
        text: "Continue.",
        next: (state) => {
          if (state.culturalIntegrity >= 60) return "ending_keeper_of_the_pipe";
          if (state.childAtCarlisle) return "ending_carlisle_father";
          if (state.health <= 20 || state.food <= 10) return "ending_starvation";
          return "ending_survived_wounded_knee";
        },
        effects: { hope: -30, spirit: -20 }
      }
    ]
  },

  // ── ENDINGS ───────────────────────────────────────────────────────────────

  ending_little_bighorn_died: {
    id: "ending_little_bighorn_died", act: 3, age: 31,
    type: "ending",
    date: "June 25, 1876", background: null, ambient: null,
    body: [
      "You died on June 25, 1876, at the Greasy Grass.",
      "You were thirty-one years old. {{wife}} buried what she could find of you on a hillside above the river. Your son grew up without you.",
      "The victory you died for was real. It lasted only a summer.",
      "Between 1876 and 1881, the U.S. Army pursued every free band of Lakota across the northern plains. By 1881, all of them were on the reservation."
    ],
    photo: {
      src: "endings/ending_little_bighorn_died.png",
      caption: "Archival image of the Little Bighorn battlefield, marble grave markers in the grass."
    },
    sourceNote: null,
    choices: [
      { text: "Return to Title", next: "_title" },
      { text: "View Historical Notes", action: "open_historical_notes" }
    ]
  },

  ending_died_fighting: {
    id: "ending_died_fighting", act: 3, age: 32,
    type: "ending",
    date: "Autumn 1877", background: null, ambient: null,
    body: [
      "You died in a ravine in autumn 1877. You were a warrior to the last breath.",
      "{{wife}} and your son made it to the reservation. They survived. Your name was spoken at the fire by your grandchildren who never met you.",
      "That was not nothing."
    ],
    photo: {
      src: "endings/ending_died_fighting.png",
      caption: "Lakota warriors, c. 1870s."
    },
    sourceNote: null,
    choices: [
      { text: "Return to Title", next: "_title" },
      { text: "View Historical Notes", action: "open_historical_notes" }
    ]
  },

  ending_canada_exile: {
    id: "ending_canada_exile", act: 3, age: 36,
    type: "ending",
    date: "1881 — Fort Buford", background: null, ambient: null,
    body: [
      "You returned from Canada with Sitting Bull in 1881. You spent the rest of your life at Standing Rock.",
      "You saw the Ghost Dance. You saw Sitting Bull murdered on a December morning in 1890. You heard the news from Wounded Knee.",
      "You died of old age in 1908. You were sixty-three. You held on to the language. You taught your grandchildren the names of the stars.",
      "Sitting Bull's bones were exhumed and reburied in 1953 in Mobridge, South Dakota. The Lakota dispute the exact location of his remains to this day."
    ],
    photo: {
      src: "endings/ending_canada_exile.png",
      caption: "Sitting Bull photographed by D. F. Barry, 1885."
    },
    sourceNote: null,
    choices: [
      { text: "Return to Title", next: "_title" },
      { text: "View Historical Notes", action: "open_historical_notes" }
    ]
  },

  ending_died_at_wounded_knee: {
    id: "ending_died_at_wounded_knee", act: 3, age: 45,
    type: "ending",
    date: "December 29, 1890", background: null, ambient: null,
    body: [
      "You died at Wounded Knee Creek on December 29, 1890.",
      "{{wife}} died beside you. Your son survived. He was not at the creek that morning.",
      "Your name is one of the names on the list.",
      "The mass grave on the ridge above the creek is marked today by a single chain-link fence and a hand-painted sign. The Lakota people have asked for the massacre to be officially recognized for over a century. The Army's twenty Medals of Honor for Wounded Knee have not been rescinded."
    ],
    photo: {
      src: "endings/ending_died_at_wounded_knee.png",
      caption: "The mass grave at Wounded Knee, January 1891."
    },
    sourceNote: null,
    choices: [
      { text: "Return to Title", next: "_title" },
      { text: "View Historical Notes", action: "open_historical_notes" }
    ]
  },

  ending_survived_wounded_knee: {
    id: "ending_survived_wounded_knee", act: 3, age: 45,
    type: "ending",
    date: "December 29, 1890", background: null, ambient: null,
    body: [
      "You survived Wounded Knee.",
      "You buried what you could bury. You went home. You lived another forty years on the reservation.",
      "In 1930, when you were eighty-five, a young writer named John Neihardt came to interview a holy man named Black Elk on Pine Ridge. Black Elk had survived Wounded Knee as a young man.",
      "When the book came out in 1932, you read what Black Elk said:",
      "\"I did not know then how much was ended. When I look back now from this high hill of my old age, I can still see the butchered women and children lying heaped and scattered all along the crooked gulch as plain as when I saw them with eyes still young. And I can see that something else died there in the bloody mud, and was buried in the blizzard. A people's dream died there. It was a beautiful dream.\"",
      "You closed the book and you wept for an hour.",
      "You died in 1933. You were eighty-eight."
    ],
    photo: {
      src: "endings/ending_survived_wounded_knee.png",
      caption: "Black Elk in old age, c. 1930."
    },
    sourceNote: "Black Elk’s quote is verbatim from Black Elk Speaks (Neihardt, 1932).",
    choices: [
      { text: "Return to Title", next: "_title" },
      { text: "View Historical Notes", action: "open_historical_notes" }
    ]
  },

  ending_keeper_of_the_pipe: {
    id: "ending_keeper_of_the_pipe", act: 3, age: 45,
    type: "ending",
    date: "December 29, 1890", background: null, ambient: null,
    body: [
      "You did not dance at Wounded Knee. You were not at the creek that morning. You lived.",
      "But you kept something else.",
      "When the agent banned the Sun Dance, you and three other men held a small one in secret in a draw eight miles from the agency. When they banned the čhaŋnúŋpa, you wrapped Atéwaye’s pipe in deer hide and buried it under the floor of your cabin. When they tried to take your grandson’s language, you spoke Lakota to him every night, in whispers, after the missionaries left.",
      "When you died in 1924, your grandson took the pipe out from under the floor. He smoked it for the first time at your funeral. He taught it to his son. His son taught it to him.",
      "Today there are over 170,000 Lakota people. The language, the Sun Dance, and the čhaŋnúŋpa are all alive. Not because they were never taken. Because some people refused to let them stay gone."
    ],
    photo: {
      src: "endings/ending_keeper_of_the_pipe.png",
      caption: "A contemporary Sun Dance ceremony (with permission / public-domain image)."
    },
    sourceNote: null,
    choices: [
      { text: "Return to Title", next: "_title" },
      { text: "View Historical Notes", action: "open_historical_notes" }
    ]
  },

  ending_carlisle_father: {
    id: "ending_carlisle_father", act: 3, age: 45,
    type: "ending",
    date: "December 29, 1890", background: null, ambient: null,
    body: [
      "You sent Čhantéwašté to Carlisle.",
      "You did not see him for four years. When he came home he was twelve. His hair was short. He answered to James. He did not remember the word for father in Lakota. He flinched when you tried to speak to him.",
      "He grew up. He married a white woman from Sioux Falls. He moved off the reservation. He named his son Robert.",
      "You kept {{wife}}’s beadwork in a cedar box. You looked at it sometimes in the evenings.",
      "You died in 1919. Robert came to the funeral. He was nine years old. He did not know any Lakota at all.",
      "Between 1879 and 1918, over 10,000 Native children were sent through the Carlisle Indian Industrial School. The school’s motto was “Kill the Indian, Save the Man.”"
    ],
    photo: {
      src: "endings/ending_carlisle_father.png",
      caption: "Tom Torlino, a Diné student at Carlisle, 1882 vs. 1885."
    },
    sourceNote: null,
    choices: [
      { text: "Return to Title", next: "_title" },
      { text: "View Historical Notes", action: "open_historical_notes" }
    ]
  },

  ending_tribal_policeman: {
    id: "ending_tribal_policeman", act: 3, age: 45,
    type: "ending",
    date: "December 1890", background: null, ambient: null,
    body: [
      "You did not pull the trigger. But you stood in the line that morning at Sitting Bull’s cabin. You wore the metal star the agent gave you. You ate the steady ration his ledger gave you.",
      "After Sitting Bull was buried, the people did not look at you the same way. Not {{wife}}. Not your son. Not yourself, in the small piece of mirror over the wash basin.",
      "You lived another twenty-three years. You did not see your son after he left for railroad work in Montana in 1898.",
      "When you died in 1913, only {{wife}} came to the burial. She did not say your name."
    ],
    photo: {
      src: "endings/ending_tribal_policeman.png",
      caption: "Lakota Indian policemen at Standing Rock, c. 1890."
    },
    sourceNote: null,
    choices: [
      { text: "Return to Title", next: "_title" },
      { text: "View Historical Notes", action: "open_historical_notes" }
    ]
  },

  ending_starvation: {
    id: "ending_starvation", act: 3, age: 45,
    type: "ending",
    date: "December 1890", background: null, ambient: null,
    body: [
      "You did not survive the winter of 1890.",
      "You died at the agency, in your own bed, of a sickness the doctors called pneumonia and the people called the grief.",
      "Your wife held your hand. Your son was at the door.",
      "Outside, the snow was very deep.",
      "Between 1890 and 1900, the Lakota population on the reservations fell by more than a third — primarily from tuberculosis, malnutrition, and despair."
    ],
    photo: {
      src: "endings/ending_starvation.png",
      caption: "A Pine Ridge tepee camp in winter, c. 1891."
    },
    sourceNote: null,
    choices: [
      { text: "Return to Title", next: "_title" },
      { text: "View Historical Notes", action: "open_historical_notes" }
    ]
  }

};

// Per-scene background overrides.
// Add this immediately after the main scenes object is defined.
// This changes ONLY the background field for these specific scenes.

const PER_SCENE_BACKGROUNDS = {
  act1_vq_wolf: "vision_quest_wolf",
  act1_vq_eagle: "vision_quest_eagle",
  act1_vq_bear: "vision_quest_bear",

  act1_hunt_success: "hunt_success",
  act1_hunt_injury: "hunt_injury",

  act1_sd_pierce: "sun_dance_pierce",
  act1_sd_drum: "sun_dance_drum",

  act3a_battle_glory: "battle_glory",
  act3a_battle_protect: "battle_protect",
  act3a_battle_custer: "battle_custer",
  act3a_long_pursuit: "long_pursuit_winter",
  act3a_crazy_horse_death: "fort_robinson_parade",

  act2_ultimatum: "ultimatum_messenger",

  act3b_sitting_bull_dec15: "sitting_bull_cabin_dawn",
  act3b_wounded_knee_inside: "wounded_knee_camp_morning",
  act3b_wounded_knee_outside: "wounded_knee_ridge_view",
  act3b_ration_line: "ration_line_interior",
  act3b_boarding_school: "boarding_school_office",
  act3b_dawes: "dawes_act_office",
  act3b_ghost_dance: "ghost_dance_clearing"
};

for (const [sceneId, background] of Object.entries(PER_SCENE_BACKGROUNDS)) {
  if (Scenes[sceneId]) {
    Scenes[sceneId].background = background;
  } else {
    console.warn(`Missing scene for background override: ${sceneId}`);
  }
}
