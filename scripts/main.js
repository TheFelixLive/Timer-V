import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"

const version_info = {
  name: "Timer V",
  version: "v.5.0.0 A4",
  unix: 1742821543946
}

const timer_modes = [
  {
    label: "Stopwatch", 
    icon: "textures/items/clock_item", 
    show_if: true
  },
  {
    label: "Timer", 
    icon: "textures/ui/timer", 
    show_if: true
  },
  {
    label: "World-time", 
    icon: "textures/ui/world_glyph_color", 
    show_if: (save_data) => !save_data[0].is_global
  },
  {
    label: "Day-time", 
    icon: "textures/environment/sun", 
    show_if: (save_data, player_sd_index) => {
      return !save_data[0].is_global && save_data[player_sd_index].show_td_as_mode;
    }
  }
];

const goal_event = [
  {
    name: "Raid",
    icon: "textures/items/clock_item",
    condition: () => false
  },
  {
    name: "Time Goal",
    icon: "textures/items/clock_item",
    condition: (data) => data[0].time?.timer > 0 && data[0].counting_type === 1
  }
]

const goal_entity = [
  // The attribute "icons" can also be used here and would replace the spawn egg
  {
    "name": "Ender Dragon",
    "id": "ender_dragon"
  },
  {
    "name": "Wither",
    "id": "wither"
  },
  {
    "name": "Warden",
    "id": "warden"
  },
  {
    "name": "Allay",
    "id": "allay"
  },
  {
    "name": "Armadillo",
    "id": "armadillo"
  },
  {
    "name": "Axolotl",
    "id": "axolotl"
  },
  {
    "name": "Bat",
    "id": "bat"
  },
  {
    "name": "Bee",
    "id": "bee"
  },
  {
    "name": "Blaze",
    "id": "blaze"
  },
  {
    "name": "Camel",
    "id": "camel"
  },
  {
    "name": "Cat",
    "id": "cat"
  },
  {
    "name": "Cave Spider",
    "id": "cave_spider"
  },
  {
    "name": "Chicken",
    "id": "chicken"
  },
  {
    "name": "Cod",
    "id": "cod"
  },
  {
    "name": "Cow",
    "id": "cow"
  },
  {
    "name": "Creeper",
    "id": "creeper"
  },
  {
    "name": "Dolphin",
    "id": "dolphin"
  },
  {
    "name": "Donkey",
    "id": "donkey"
  },
  {
    "name": "Drowned",
    "id": "drowned"
  },
  {
    "name": "Elder Guardian",
    "id": "elder_guardian"
  },
  {
    "name": "Enderman",
    "id": "enderman"
  },
  {
    "name": "Endermite",
    "id": "endermite"
  },
  {
    "name": "Evoker",
    "id": "evoker"
  },
  {
    "name": "Fox",
    "id": "fox"
  },
  {
    "name": "Frog",
    "id": "frog"
  },
  {
    "name": "Ghast",
    "id": "ghast"
  },
  {
    "name": "Glow Squid",
    "id": "glow_squid"
  },
  {
    "name": "Goat",
    "id": "goat"
  },
  {
    "name": "Guardian",
    "id": "guardian"
  },
  {
    "name": "Hoglin",
    "id": "hoglin"
  },
  {
    "name": "Horse",
    "id": "horse"
  },
  {
    "name": "Husk",
    "id": "husk"
  },
  {
    "name": "Iron Golem",
    "id": "iron_golem"
  },
  {
    "name": "Llama",
    "id": "llama"
  },
  {
    "name": "Magma Cube",
    "id": "magma_cube"
  },
  {
    "name": "Mooshroom",
    "id": "mooshroom"
  },
  {
    "name": "Mule",
    "id": "mule"
  },
  {
    "name": "Ocelot",
    "id": "ocelot"
  },
  {
    "name": "Panda",
    "id": "panda"
  },
  {
    "name": "Parrot",
    "id": "parrot"
  },
  {
    "name": "Phantom",
    "id": "phantom"
  },
  {
    "name": "Pig",
    "id": "pig"
  },
  {
    "name": "Piglin",
    "id": "piglin"
  },
  {
    "name": "Piglin Brute",
    "id": "piglin_brute"
  },
  {
    "name": "Pillager",
    "id": "pillager"
  },
  {
    "name": "Polar Bear",
    "id": "polar_bear"
  },
  {
    "name": "Pufferfish",
    "id": "pufferfish"
  },
  {
    "name": "Rabbit",
    "id": "rabbit"
  },
  {
    "name": "Ravager",
    "id": "ravager"
  },
  {
    "name": "Salmon",
    "id": "salmon"
  },
  {
    "name": "Sheep",
    "id": "sheep"
  },
  {
    "name": "Shulker",
    "id": "shulker"
  },
  {
    "name": "Skeleton",
    "id": "skeleton"
  },
  {
    "name": "Skeleton Horse",
    "id": "skeleton_horse"
  },
  {
    "name": "Slime",
    "id": "slime"
  },
  {
    "name": "Sniffer",
    "id": "sniffer"
  },
  {
    "name": "Tadpole",
    "id": "tadpole"
  },
  {
    "name": "Snow Golem",
    "id": "snow_golem"
  },
  {
    "name": "Squid",
    "id": "squid"
  },
  {
    "name": "Stray",
    "id": "stray"
  },
  {
    "name": "Strider",
    "id": "strider"
  },
  {
    "name": "Trader Llama",
    "id": "trader_llama"
  },
  {
    "name": "Tropical Fish",
    "id": "tropicalfish"
  },
  {
    "name": "Turtle",
    "id": "turtle"
  },
  {
    "name": "Vex",
    "id": "vex"
  },
  {
    "name": "Villager",
    "id": "villager"
  },
  {
    "name": "Wandering Trader",
    "id": "wandering_trader"
  },
  {
    "name": "Witch",
    "id": "witch"
  },
  {
    "name": "Wither Skeleton",
    "id": "wither_skeleton"
  },
  {
    "name": "Wolf",
    "id": "wolf"
  },
  {
    "name": "Zoglin",
    "id": "zoglin"
  },
  {
    "name": "Zombie",
    "id": "zombie"
  },
  {
    "name": "Zombie Pigman",
    "id": "zombified_piglin"
  },
  {
    "name": "Zombie Villager",
    "id": "zombie_villager"
  }
  
];

const design_template = [
  {
    // The "ms" marker isn't used here, but it works perfectly. Simply because I don't like it.
    name: "Default design",
    content: [
      { type: "normal", blocks: [
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: "y", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
      { type: "paused", blocks: [
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: "y", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } },
          { type: "text", text: " §o§7(paused)" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time ->\n§l§7" },
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: { singular: " year, ", plural: " years, " }, separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      // Same goes for here: the "s" marker isn't used here, but it works perfectly.
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§lTimer §tV" }
      ]}
    ]
  },
  
  {
    // ripped from version 3.6 and below
    name: "Legacy design",
    content: [
      { type: "normal", blocks: [
          { type: "text", text: "§b§l" },
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: { singular: " year, ", plural: " years, " }, separator: { enabled: false } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§bTimer V§r is paused\n§l" },
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: { singular: " year, ", plural: " years, " }, separator: { enabled: false } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
          { type: "text", text: " <-" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§bTimer V§r is paused\n§l" },
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: { singular: " year, ", plural: " years, " }, separator: { enabled: false } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
          { type: "text", text: " <-" }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
        { type: "marker", marker: "h", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
        { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§b§lTimer V" }
      ]}
    ]
  },  
  {
    name: "Custom design",
    content: undefined
  }
]

/*------------------------
  Hidden Fetures
-------------------------*/


system.afterEvents.scriptEventReceive.subscribe(event=> {
  if (event.id === "timerv:debug") {
    let save_data = load_save_data();
    let player_sd_index = save_data.findIndex(entry => entry.id === event.sourceEntity.id);
  
    let debugValue = event.message.toLowerCase() === "true";
  
    if (save_data[player_sd_index].op) {
      save_data[0].debug = debugValue;
      console.log("debug mode is now: " + save_data[0].debug);
      update_save_data(save_data);
    } else {
      console.log("Debug mode could not be changed because you do not have permission!");
    }
  }
  
  if (event.id === "timerv:show_td_as_mode") {
    let save_data = load_save_data();
    let player_sd_index = save_data.findIndex(entry => entry.id === event.sourceEntity.id);
  
    // Konvertiere event.message in Boolean
    let showTdAsModeValue = event.message.toLowerCase() === "true";
  
    save_data[player_sd_index].show_td_as_mode = showTdAsModeValue;
    console.log("show_td_as_mode is now: " + save_data[player_sd_index].show_td_as_mode);
    update_save_data(save_data);
  }
  
  if (event.id === "timerv:allow_unnecessary_inputs") {
    let save_data = load_save_data();
    let player_sd_index = save_data.findIndex(entry => entry.id === event.sourceEntity.id);
  
    let allowInputsValue = event.message.toLowerCase() === "true";
  
    save_data[player_sd_index].allow_unnecessary_inputs = allowInputsValue;
    console.log("allow_unnecessary_inputs is now: " + save_data[player_sd_index].allow_unnecessary_inputs);
    update_save_data(save_data);
  }
  
  
});

/*------------------------
 Save Data
-------------------------*/

// Creates Save Data if not present
let save_data = load_save_data()  
if (!save_data) {
    console.log("Creating save_data...");
    save_data = [
        {time: {stopwatch: 0, timer: 0, do_count: false}, counting_type: 0, is_challenge: false, challenge_progress: 0, goal: {pointer: 0, entity_pos: 0, event_pos: 0}, is_global: false, difficulty: 0, sync_day_time: 0, utc: 0, debug: true, update_message_unix: (version_info.unix + 15762816)  }
    ]

    update_save_data(save_data)
}


// Load & Save Save data
function load_save_data() {
    let rawData = world.getDynamicProperty("timerv:save_data");

    if (!rawData) {
        return;
    }

    return JSON.parse(rawData);
}


function update_save_data(input) {
    world.setDynamicProperty("timerv:save_data", JSON.stringify(input))
};

function delete_player_save_data(player) {
  let save_data = load_save_data();

  let updated_save_data = save_data.filter(entry => entry.id !== player.id);
  update_save_data(updated_save_data);
}



// Add player if not present
function create_player_save_data (playerId, playerName) {
  let save_data = load_save_data();
  let player_save_data = save_data.find(entry => entry.id === playerId);

  if (player_save_data == undefined) {
      let shout_be_op = true;
  
      for (let entry of save_data) {
          if (entry.op === true) {
              shout_be_op = false;
              break;
          }
      }
  
      if (shout_be_op) {
          console.log(`Player ${playerName} (${playerId}) added with op=true!`);
      } else {
          console.log(`Player ${playerName} (${playerId}) added with op=false!`);
      }

      save_data.push({
          id: playerId,
          show_td_as_mode: false,
          time: {stopwatch: 0, timer: 0, do_count: false},
          counting_type: 0,
          time_day_actionsbar: false,
          allow_unnecessary_inputs: false,
          time_source: 0,
          name: playerName,
          op: shout_be_op,
          visibility: true,
          lang: 0,
          design: 0,
          setup: shout_be_op ? 2 : 1,
      });
  } else if (player_save_data.name !== playerName) {
      player_save_data.name = playerName;
  }

  update_save_data(save_data);
}

world.afterEvents.playerJoin.subscribe(({ playerId, playerName }) => {
  create_player_save_data(playerId, playerName);
});

/*------------------------
 Startup popups
-------------------------*/

world.afterEvents.playerSpawn.subscribe(async ({ player }) => {
  let save_data = load_save_data();
  let player_save_data = save_data[save_data.findIndex(entry => entry.id === player.id)];

  // Setup popup
  if (player_save_data.setup == 2) {
    let form = new ActionFormData();
    form.title("Setup guide");
    form.body("Wellcome!\nAs you may recall, in previous versions you had the option to choose between Survival and Creative modes. These functions are now native and across the timer, making them less distinguishable. However, you can use these templates here in the setup to access the same functions as before!\n\n§7Best regards, TheFelixLive (the developer)");
    form.button("Survival mode");
    form.button("Creative mode");
    form.button("");

    const showForm = async () => {
      form.show(player).then((response) => {
        if (response.canceled && response.cancelationReason === "UserBusy") {
          showForm()
        } else {
          // Response
          player_save_data.setup = 0
          // Survival
          if (response.selection === 0) {
            save_data[0].is_global = true
            save_data[0].is_challenge = true
          }

          if (response.selection >= 0) {
            update_save_data(save_data);
            main_menu(player)
          }

        }
      });
    };
    showForm();
  }

  // Welcome screen
  if (player_save_data.setup == 1) {
    let form = new ActionFormData();
    form.title("Setup guide");
    form.body("Wellcome!\n comming soon");
    form.button("");

    const showForm = async () => {
      form.show(player).then((response) => {
        if (response.canceled && response.cancelationReason === "UserBusy") {
          showForm()
        } else {
          // Response

          // Survival
          if (response.selection === 0) {
            main_menu(player)
          }

        }
      });
    };
    showForm();
  }

  // Update popup
  if (player_save_data.op && Date.now() > save_data[0].update_message_unix) {
    let form = new ActionFormData();
    form.title("Update time!");
    form.body("Your current version (" + version_info.version + ") is older than 6 months.\nThere MIGHT be a newer version out. Feel free to update to enjoy the latest features!\n\nCheck out: §7github.com/TheFelixLive/Timer-Ultimate");
    form.button("Mute");

    const showForm = async () => {
      form.show(player).then((response) => {
        if (response.canceled && response.cancelationReason === "UserBusy") {
          showForm()
        } else if (response.selection === 1) {
            save_data[0].update_message_unix = Date.now() + 15762816;
            update_save_data(save_data);
        }
      });
    };
    showForm();
  }
});




/*------------------------
Actionbar
-------------------------*/

function apply_design(design, time) {
  let timeValues;
  const units = ["y", "d", "h", "m", "s", "ms"];
  if (design.type === "day") {
    const T = 24000, M = 86400000, O = 6 * 3600000;
    let rm = ((time / T) * M + O) % M;
    timeValues = { y: 0, d: 0, h: Math.floor(rm / 3600000), m: Math.floor((rm % 3600000) / 60000), s: Math.floor((rm % 60000) / 1000), ms: Math.floor((rm % 1000) / 10) };
  } else {
    timeValues = {
      y: String(Math.floor(Math.floor(Math.floor(Math.floor(time / 20) / 60) / 60) / 24 / 365)),
      d: String(Math.floor(Math.floor(Math.floor(Math.floor(time / 20) / 60) / 60) / 24) % 365),
      h: String(Math.floor(Math.floor(Math.floor(time / 20) / 60) / 60) % 24),
      m: String(Math.floor(Math.floor(time / 20) / 60) % 60),
      s: String(Math.floor(time / 20) % 60),
      ms: String((time % 20) * 5)
    };
  }
  const conv = { y: 365, d: 24, h: 60, m: 60, s: 100 };
  let used = new Set();
  if (design.blocks) design.blocks.forEach(b => { if (b.type === "marker" && b.marker) used.add(b.marker); });
  for (let i = 0; i < units.length - 1; i++) {
    let u = units[i];
    if (timeValues[u] !== undefined && Number(timeValues[u]) !== 0 && !used.has(u)) {
      let mult = 1, target = null;
      for (let j = i + 1; j < units.length; j++) {
        mult *= conv[units[j - 1]];
        if (units[j] === "ms" && !used.has("ms")) { target = null; break; }
        if (used.has(units[j])) { target = units[j]; break; }
      }
      if (target) timeValues[target] = (timeValues[target] !== undefined ? Number(timeValues[target]) : 0) + Number(timeValues[u]) * mult;
      timeValues[u] = 0;
    }
  }
  let result = "";
  let proc = design.blocks.map(b => {
    if (b.type === "marker") {
      let raw = timeValues[b.marker] !== undefined ? String(timeValues[b.marker]) : "0";
      let val = b.padZero && raw.length === 1 ? "0" + raw : raw;
      let num = Number(val), show, candidate = false;
      if (num !== 0) show = true;
      else if (b.alwaysShow === true || b.alwaysShow === "always") show = true;
      else if (b.alwaysShow === "ifAllZero") { show = false; candidate = true; }
      else show = false;
      return { ...b, value: val, show, ifAllZeroCandidate: candidate };
    }
    return b;
  });  
  let allZero = true;
  for (let b of proc)
    if(b.type === "marker" && Number(b.value) !== 0) { allZero = false; break; }
  if(allZero)
    proc = proc.map(b => (b.type==="marker" && b.ifAllZeroCandidate) ? { ...b, show: true } : b);
  for (let i = 0; i < proc.length; i++) {
    let b = proc[i];
    if (b.type === "text") result += b.text;
    else if (b.type === "marker" && b.show) {
      if (b.separator && b.separator.enabled && (b.separator.position === "before" || b.separator.position === "both")) {
        let prev = false;
        for (let j = i - 1; j >= 0; j--) {
          if (proc[j].type === "marker" && proc[j].show) { prev = true; break; }
          if (proc[j].type === "text") break;
        }
        if (prev) result += b.separator.value;
      }
      let suffix = "";
      if (typeof b.suffix === "string") {
        suffix = b.suffix;
      }
      else if (typeof b.suffix === "object") {
        const sing = b.suffix.singular;
        const plu  = b.suffix.plural;
        suffix = (Number(b.value) === 1
          ? (sing != null ? sing : plu)
          : (plu  != null ? plu  : sing)
        ) || "";
      }
      
      result += b.value + suffix;

      if (b.separator && b.separator.enabled && (b.separator.position === "after" || b.separator.position === "both")) {
        let next = false;
        for (let j = i + 1; j < proc.length; j++) {
          if (proc[j].type === "marker" && proc[j].show) { next = true; break; }
          if (proc[j].type === "text") break;
        }
        if (next) result += b.separator.value;
      }
    }
  }
  if (design.type === "day" && design.colorConfig && design.colorConfig.length >= 3) {
    let h = Number(timeValues.h), m = Number(timeValues.m), tot = h * 60 + m;
    let color = tot < (4 * 60 + 30) || h >= 19 ? design.colorConfig[0]
      : ((tot >= (4 * 60 + 30) && tot < (6 * 60)) || (h >= 17 && h < 19)) ? design.colorConfig[1]
      : design.colorConfig[2];
    result = color + result;
  }
  return result;
}



/*------------------------
 Menu: main
-------------------------*/

function main_menu_actions(player, form) {
  let actions = []
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)

  let timedata;
  if (save_data[0].is_global) {
    timedata = save_data[0]
  } else {
    timedata = save_data[player_sd_index]
  }

  if (!save_data[0].is_global || save_data[0].is_global && save_data[player_sd_index].op) {
    if (timedata.counting_type == 0 || timedata.counting_type == 1) {

      if ((timedata.counting_type == 0 || (timedata.counting_type == 1 & timedata.time.timer > 0)) && !timedata.is_challenge) {
        if(form){form.button("Condition\n" + (timedata.time.do_count === true ? "§aresumed" : "§cpaused"), (timedata.time.do_count === true ? "textures/ui/toggle_on" : "textures/ui/toggle_off"))}
        actions.push(() => {
          if (timedata.time.do_count === false) {
            timedata.time.do_count = true;
          } else {
            timedata.time.do_count = false;
          }
          update_save_data(save_data);
        });
      }
  
      if (timedata.time[timedata.counting_type ? "timer" : "stopwatch"] > 0 && !timedata.is_challenge) {
        if(form){form.button("§cReset "+(timedata.counting_type ? "timer" : "stopwatch"), "textures/ui/recap_glyph_color_2x")}
        actions.push(() => {
          timedata.time[timedata.counting_type ? "timer" : "stopwatch"] = 0;
          timedata.time.do_count = false;
    
          update_save_data(save_data);
          main_menu(player);
        });
      }

      /*------------------------
        Only Challenge mode
      -------------------------*/
      if (save_data[player_sd_index].op && timedata.is_challenge) {
        if (form) form.button(
          "§dGoal§9\n" +
            (save_data[0].goal.pointer === 2
              ? goal_event[save_data[0].goal.event_pos].name
              : save_data[0].goal.pointer === 0
              ? "§bR§ga§an§6d§4o§fm"
              : "Defeat: " + goal_entity[save_data[0].goal.entity_pos].name),
          "textures/ui/trophy"
        );
        actions.push(() => {
          settings_goals_main(player);
        });
      }

  
      if (save_data[player_sd_index].op && !timedata.is_challenge) {
        if(form){form.button("Synchronized timer", timedata.is_global ? "textures/ui/toggle_on" : "textures/ui/toggle_off")};
        actions.push(() => {
          splash_globalmode(player);
        });
      }
  
      // "Change / add time" button
      if (!((save_data[player_sd_index].time_day_actionsbar == true || (timedata.time[timedata.counting_type ? "timer" : "stopwatch"] > 0 && save_data[player_sd_index].op)) && timedata.counting_type == 0)) {
        let design = save_data[player_sd_index].design
        if (typeof design == "number") {
          design = design_template[save_data[player_sd_index].design].content
        }
        design = design.find(d => d.type === "normal");
        if(form){form.button((save_data[0].is_challenge? "Start time\n" : "Change time\n") + (apply_design(design, timedata.time[timedata.counting_type ? "timer" : "stopwatch"])), "textures/ui/color_plus")};
        actions.push(() => {
          settings_start_time(player);
        });
      }
  
    }
  }



  if (save_data[player_sd_index].time_day_actionsbar == true || timedata.counting_type == 3) {
    if (save_data[player_sd_index].time_source === 1 && save_data[player_sd_index].op) {
      if(form){form.button("Clone real time\n" + (save_data[0].sync_day_time === 1 ? "§aon" : "§coff"), (save_data[0].sync_day_time === 1 ? "textures/ui/toggle_on" : "textures/ui/toggle_off"))};
      actions.push(() => {
        if (save_data[0].sync_day_time === 0) {
          save_data[0].sync_day_time = 1;
        } else {
          save_data[0].sync_day_time = 0;
        }
        update_save_data(save_data);
        main_menu(player);
      });
    }
  }

  if (save_data[player_sd_index].op && timedata.is_global) {
    if(form){form.button("Challenge mode", timedata.is_challenge ? "textures/ui/toggle_on" : "textures/ui/toggle_off")};
    actions.push(() => {
      splash_challengemode(player);
    });
  }

  // Button: Settings
  if(form){form.button("Settings\nShow more!", "textures/ui/automation_glyph_color")}
  actions.push(() => {
    settings_main(player);
  });

  return actions
}

function main_menu(player) {
  let form = new ActionFormData();
  form.title("Main menu");
  form.body("Select an option!");

  let actions = main_menu_actions(player, form);

  if (actions.length == 1) return settings_main(player);

  // Das Formular anzeigen und anhand des Indexes der sichtbaren Buttons die jeweilige Aktion ausführen
  form.show(player).then((response) => {
    if (response.selection !== undefined && actions[response.selection]) {
      actions[response.selection]();
    }
  });
}

/*------------------------
 splash screens
-------------------------*/


function splash_challengemode(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();

  form.title("Challenge mode");
  form.body(
    (!save_data[0].is_challenge
      ? "In this mode, the timer shifts from a supporting role to the main one. First, you set the guidelines and then plunge into the adventure of the survival mode!"
      : "If this function is deactivated, the timer will operate more in the background and will no longer have any influence on the game mode.")
    + "\n\n§7This setting will change the timer significantly.\n\n"
  );
  
  form.button(!save_data[0].is_challenge ? "§aEnable": "§cDisable");
  form.button("");


  form.show(player).then((response) => {
    // Todo: have to be ported to setup!
    if (response.selection == 0) {
      save_data[0].time[save_data[0].counting_type ? "timer" : "stopwatch"] = 0;
      save_data[0].time.do_count = false;
      enable_gamerules()
      save_data[0].is_challenge = save_data[0].is_challenge ? false : true,
      update_save_data(save_data);
    }


    if (response.selection >= 0) {
      return main_menu(player)
    }


    
  });
}



function splash_globalmode(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)

  form.title("Synchronized timer");
  form.body("The synchronized timer feature creates an additional timer that is enforced on all players. Only admins can control it.\n\n§7Required for challenge mode.\n\n");

  if (save_data[0].is_global) {
    form.button("§cDisable");
  } else {
    form.button("§gEnable without cloning");
    form.button("§aEnable & clone your timer");
  }

  form.button("");


  form.show(player).then((response) => {
    if (save_data[0].is_global) {
      if (response.selection == 0) {
        save_data[0].is_global = false;
        update_save_data(save_data);
      }
      
      if (response.selection >= 0) {
        return main_menu(player);
      }

    } else {
      if (response.selection == 1) {
        save_data[0].is_global = true;
        save_data[0].time.timer = save_data[player_sd_index].time.timer;
        save_data[0].time.stopwatch = save_data[player_sd_index].time.stopwatch;
        save_data[0].counting_type = save_data[player_sd_index].counting_type;
        update_save_data(save_data);
      }
  
      if (response.selection == 0) {
        save_data[0].is_global = true;
        update_save_data(save_data);
      }
    }
  
    if (response.selection >= 0) {
      return main_menu(player);
    }
  });
  
}


/*------------------------
 Settings
-------------------------*/

function settings_start_time(player) {
  let form = new ModalFormData();
  form.title("Start time");
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)

  let ms = save_data[save_data[0].is_global ? 0 : player_sd_index].time[save_data[player_sd_index].counting_type ? "timer" : "stopwatch"] * 5;
  let y = Math.floor(ms / (100 * 60 * 60 * 24 * 365));
  let d = Math.floor(ms % (100 * 60 * 60 * 24 * 365) / (100 * 60 * 60 * 24));
  let h = Math.floor(ms % (100 * 60 * 60 * 24) / (100 * 60 * 60));
  let m = Math.floor(ms % (100 * 60 * 60) / (100 * 60));
  let s = Math.floor(ms % (100 * 60) / 100);
  ms = ms % 100;

  if (save_data[player_sd_index].allow_unnecessary_inputs) {
    form.slider("Years", 0, 9, 1, y);
    form.slider("Days", 0, 355, 1, d);
  } else {
    form.slider("Days", 0, 30, 1, d);
  }

  form.slider("Hours", 0, 23, 1, h);
  form.slider("Minutes", 0, 59, 1, m);
  form.slider("Seconds", 0, 59, 1, s);

  if (save_data[player_sd_index].allow_unnecessary_inputs) {
    form.slider("Milliseconds", 0, 999, 50, ms);
  }
  form.submitButton("Set & count down!")

  form.show(player).then((response) => {
    if (save_data[player_sd_index].allow_unnecessary_inputs) {
      y = response.formValues[0]
      d = response.formValues[1]
      h = response.formValues[2]
      m = response.formValues[3]
      s = response.formValues[4]
      ms = response.formValues[5] / 10
    } else {
      d = response.formValues[0]
      h = response.formValues[1]
      m = response.formValues[2]
      s = response.formValues[3]
      ms = 0
    }

    const totalMilliseconds = 
    (y * 365 * 24 * 60 * 60 * 100) +
    (d * 24 * 60 * 60 * 100) +
    (h * 60 * 60 * 100) +
    (m * 60 * 100) +
    (s * 100) +
    ms;

    save_data[save_data[0].is_global ? 0 : player_sd_index].time.timer = Math.floor(totalMilliseconds / 5)
    save_data[save_data[0].is_global ? 0 : player_sd_index].counting_type = 1;
    update_save_data(save_data);
    return main_menu(player)
  });
}

function settings_goals_main(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  const pointer = save_data[0].goal.pointer;

  form.title("Goal");
  form.body("Select a type!");

  form.button(
    "Entity\nDefeat a specific creature",
    pointer === 1 ? "textures/ui/realms_slot_check" : undefined
  );

  form.button(
    "Event\nTrigger a specific event",
    pointer === 2 ? "textures/ui/realms_slot_check" : undefined
  );

  form.button(
    "Random\nCould be anything",
    pointer === 0 ? "textures/ui/realms_slot_check" : undefined
  );

  form.button("");

  form.show(player).then((response) => {
    if (response.selection === 0) return settings_goals_select(player, "entity");
    if (response.selection === 1) return settings_goals_select(player, "event");
    if (response.selection === 2) {
      save_data[0].goal.pointer = 0;
      update_save_data(save_data);
      return settings_goals_main(player);
    }
    if (response.selection === 3) return main_menu(player);
  });
}



function settings_goals_select(player, type) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  const isEvent = type === "event";
  const pointerValue = isEvent ? 2 : 1;
  const goalArray = isEvent ? goal_event : goal_entity;
  const currentGoal = save_data[0].goal.pointer === pointerValue
    ? (isEvent ? save_data[0].goal.event_pos : save_data[0].goal.entity_pos)
    : undefined;

  form.title(`Goal - ${isEvent ? "Event" : "Entity"}`);
  form.body("Select your goal!");

  let visibleGoals = isEvent ? goalArray.filter(goal => goal.condition(save_data)) : [...goalArray];

  let selectedGoal = undefined;
  if (currentGoal !== undefined) {
    const goal = goalArray[currentGoal];
    if (visibleGoals.includes(goal)) {
      selectedGoal = goal;
      visibleGoals = visibleGoals.filter(g => g !== goal);
    }
  }

  visibleGoals.sort((a, b) => a.name.localeCompare(b.name));

  if (selectedGoal) {
    visibleGoals.unshift(selectedGoal);
  }

  visibleGoals.forEach(goal => {
    const realIndex = goalArray.findIndex(g => g.name === goal.name);
    const label = goal.name + (currentGoal === realIndex ? "\n§2(selected)" : "");
    const icon = goal.icon
    ? goal.icon
    : (isEvent
       ? undefined
       : `textures/items/spawn_eggs/spawn_egg_${goal.id}`);
    form.button(label, icon);
  });

  form.button("");

  form.show(player).then((response) => {
    if (response.selection < visibleGoals.length) {
      const selectedName = visibleGoals[response.selection].name;
      const realIndex = goalArray.findIndex(goal => goal.name === selectedName);
      if (isEvent) {
        save_data[0].goal.event_pos = realIndex;
      } else {
        save_data[0].goal.entity_pos = realIndex;
      }
      save_data[0].goal.pointer = pointerValue;

      update_save_data(save_data);
    }

    if (response.selection >= 0) {
      return settings_goals_main(player);
    }
  });
}





function settings_time_zone(player) {
  let form = new ModalFormData();
  form.title("Time zone settings");
  let save_data = load_save_data();

  form.slider("Time zone (UTC)", -13, 13, 1, save_data[0].utc);


  form.show(player).then((response) => {

    save_data[0].utc = response.formValues[0]

    update_save_data(save_data);
    return settings_main(player)
  });
}

function settings_main(player) {
  let form = new ActionFormData();
  let actions = [];
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  form.title("Settings");
  form.body("Select an option!");

  // Button 0: Type
  if (!save_data[0].is_global || (save_data[0].is_global && save_data[player_sd_index].op)) {
    form.button("Type\n§9" + timer_modes[save_data[save_data[0].is_global ? 0 : player_sd_index].counting_type].label, timer_modes[save_data[save_data[0].is_global ? 0 : player_sd_index].counting_type].icon);
    actions.push(() => settings_type(player));
  }


  // Button 1: Permission
  if (save_data[player_sd_index].op) {
    form.button("Permission\n" + (() => {
      const players = world.getAllPlayers();
      const ids = players.map(p => p.id);
      const names = save_data.slice(1).sort((a, b) =>
        ids.includes(a.id) && !ids.includes(b.id) ? -1 :
        ids.includes(b.id) && !ids.includes(a.id) ? 1 : 0
      ).map(e => e.name);
      return names.length > 1 ? names.slice(0, -1).join(", ") + " u. " + names[names.length - 1] : names.join(", ");
    })(), "textures/ui/op");
    actions.push(() => settings_rights_main(player));  
  }

  // Button 2: Actionsbar
  form.button("Actionsbar\n" + render_live_actionbar(save_data[player_sd_index], false), "textures/ui/brewing_fuel_bar_empty");
  actions.push(() => settings_actionbar(player));

  // Button 3: Time zone
  if (save_data[player_sd_index].op == true) {
    if(form){form.button("Time zone\n§9UTC" + (save_data[0].utc > -1 ? "+" : "") + save_data[0].utc, "textures/ui/world_glyph_color_2x")};
    actions.push(() => {
      settings_time_zone(player);
    });
  }

  // Button 3: Debug
  if (save_data[0].debug && save_data[player_sd_index].op) {
    form.button("Debug\n", "textures/ui/ui_debug_glyph_color");
    actions.push(() => debug_main(player));
  }

  // Back to main menu

  if (main_menu_actions(player).length > 1) {
    form.button("");
    actions.push(() => main_menu(player));
  }

  // Formular anzeigen und anhand der Antwort den entsprechenden Action ausführen
  form.show(player).then((response) => {
    if (response.selection !== undefined && actions[response.selection]) {
      actions[response.selection]();
    }
  });
}


function debug_main(player) {
  let form = new ActionFormData();

  form.button("Edit save data");
  form.button("§aAdd player (save data)");
  form.button("§cRemove \"save_data\"");
  form.button("§cClose Server");
  form.button("");

  form.show(player).then((response) => {
    if (response.selection == 0) return debug_sd_select(player);
    if (response.selection == 1) return debug_add_fake_player(player);
      if (response.selection == 2) {world.setDynamicProperty("timerv:save_data", undefined);}
      if (response.selection == 3) {close_world()}
      if (response.selection == 4) return settings_main(player);
  });
}






function debug_add_fake_player(player) {
  let form = new ModalFormData();

  form.textField("Player name", player.name);
  form.textField("Player id", player.id);
  form.submitButton("Add player")

  form.show(player).then((response) => {
    create_player_save_data(response.formValues[1], response.formValues[0])
    return debug_main(player)
  });
}

function settings_rights_main(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();

  form.title("Permissions");
  form.body("Select a player!");


  const players = world.getAllPlayers();
  const playerIds = players.map(player => player.id);
  
  // Erstelle eine neue Liste aus "save_data", wobei der erste Eintrag ausgelassen wird
  let newList = save_data.slice(1);
  
  // Sortiere "newList" so, dass alle Einträge, deren "id" in playerIds vorkommt, nach oben rutschen
  newList.sort((a, b) => {
    const aInPlayers = playerIds.includes(a.id);
    const bInPlayers = playerIds.includes(b.id);
  
    // Falls a in den Spieler-IDs ist und b nicht, kommt a vor b
    if (aInPlayers && !bInPlayers) return -1;
    // Falls b in den Spieler-IDs ist und a nicht, kommt b vor a
    if (bInPlayers && !aInPlayers) return 1;
    // Wenn beide den gleichen Status haben, bleibt die Reihenfolge unverändert
    return 0;
  });
  
  // Führe für jeden Eintrag in der sortierten Liste form.button mit dem Parameter "name" aus
  newList.forEach(entry => {
    if (entry.op) {
      form.button(entry.name, "textures/ui/op");
    } else {
      form.button(entry.name, "textures/ui/permissions_member_star");
    }
    
  });

  form.button("");
  

  form.show(player).then((response) => {
    if (response.selection === newList.length) {
      return settings_main(player);

    } else if (response.selection !== undefined) {
      return settings_rights_data(player, newList[response.selection]);
    }
  });
}

function settings_rights_data(viewing_player, selected_save_data) {
  let selected_player = world.getAllPlayers().find(player => player.id == selected_save_data.id);
  let online_text = "Online: no"

  if (selected_player) {
    let memory_text;
    switch (selected_player.clientSystemInfo.memoryTier) {
        case 0:
            memory_text = "Client Total Memory: Under 1.5 GB (Super Low)"
            break;

        case 1:
          memory_text = "Client Total Memory: 1.5 - 2.0 GB (Low)";
            break;

        case 2:
            memory_text = "Client Total Memory: 2.0 - 4.0 GB (Mid)"
            break;

        case 3:
            memory_text = "Client Total Memory: 4.0 - 8.0 GB (High)"
            break;

        case 4:
            memory_text = "Client Total Memory: Over 8.0 GB (Super High)"
            break;

        default:
            break;
    }
    let input_text;
    switch (selected_player.inputInfo.lastInputModeUsed) {
        case "Gamepad":
          input_text = "Input: Gamepad";
            break;

        case "KeyboardAndMouse":
          input_text = "Input: Mouse & Keyboard";
            break;

        case "MotionController":
          input_text = "Input: Motion controller"
            break;

        case "Touch":
          input_text = "Input: Touch"
            break;

        default:
            break;
    }
    if (load_save_data()[0].debug) {
      online_text = "Online: yes\nPlatform: "+ selected_player.clientSystemInfo.platformType +"\n"+memory_text+"\n"+input_text
    } else {
      online_text = "Online: yes"
    }
    
  }

  let form = new ActionFormData();
  let actions = [];
  form.title("Edit "+ selected_save_data.name +"'s permission");

  form.body("Name: "+ selected_save_data.name +" (id: "+ selected_save_data.id +")\nLanguage: "+ ["English" /* Placeholder! */][selected_save_data.lang]+ "\n" + online_text + "\nLive actionbar: "+ render_live_actionbar(selected_save_data, false));

  if (selected_save_data.name !== viewing_player.name) {
    if (selected_save_data.op) {
      
      form.button("§cMake deop");
      actions.push(() => {
        let save_data = load_save_data();
        let player_sd_index = save_data.findIndex(entry => entry.id === selected_save_data.id)
        save_data[player_sd_index].op = false
        update_save_data(save_data);
        return settings_rights_data(viewing_player, save_data[player_sd_index])
      });

    } else {

      form.button("§aMake op");
      actions.push(() => {
        form = new MessageFormData();
        form.title("Op advantages");
        form.body("Your are trying to add op advantages to "+selected_save_data.name+". With them he would be able to:\n\n-Mange other and your OP status\n-Mange Timer modes\n-Mange save data\n-Could delete the timer!\n\nAre you sure you want to add them?\n ");
        form.button1("");
        form.button2("§aMake op");
        form.show(viewing_player).then((response) => {
          if (response.selection == 1) {
            let save_data = load_save_data();
            let player_sd_index = save_data.findIndex(entry => entry.id === selected_save_data.id)
            save_data[player_sd_index].op = true
            selected_save_data = save_data[player_sd_index]
            update_save_data(save_data);
          }

          if (response.selection !== undefined) {
            return settings_rights_data(viewing_player, selected_save_data)
          }
        });
      });

    }
  }

  
  form.button("Manage save data");
  actions.push(() => {
    settings_rights_manage_sd(viewing_player, selected_save_data);
  });
  
  form.button("");
  actions.push(() => {
    settings_rights_main(viewing_player);
  });

  form.show(viewing_player).then((response) => {
    if (response.selection !== undefined && actions[response.selection]) {
      actions[response.selection]();
    }
  });
}

function settings_rights_manage_sd(viewing_player, selected_save_data) {
  let form = new ActionFormData();
  form.title(selected_save_data.name +"'s save data");
form.body("Select an option!");
  form.button("§dReset save data");
  form.button("§cDelete save data");

  form.button("");

  let selected_player = world.getAllPlayers().find(player => player.id == selected_save_data.id);

  form.show(viewing_player).then((response) => {
    // Reset data
    if (response.selection == 0) {
      delete_player_save_data(selected_save_data);
      create_player_save_data(selected_save_data.id, selected_save_data.name);
      return settings_rights_main(viewing_player)
    }

    // Delete data
    if (response.selection == 1) {
      // Online
      if (selected_player) {
        form = new MessageFormData();
        form.title("Online player information");
        form.body("Are you sure you want to remove the save data of "+selected_player.name+"?\nIn oder to do so, he has to disconnect from the world!");
        form.button1("");
        form.button2("§cKick & Delete");
        form.show(viewing_player).then((response) => {
          // Kicking player
            if (response.selection == 1) {
              if (world.getDimension("overworld").runCommand("kick "+selected_player.name).successCount == 0) {
                form = new MessageFormData();
                form.title("Host player information");
                form.body("It looks like "+selected_player.name+" is the host of this world.\nIn oder to remove his save data, the server has to shutdown!");
                form.button1("");
                form.button2("§cShutdown & Delete");
                form.show(viewing_player).then((response) => {
                  if (response.selection == 1) {
                    delete_player_save_data(selected_save_data);
                    return close_world();
                  }

                  if (response.selection == 0) {
                    return settings_rights_manage_sd(viewing_player, selected_save_data)
                  }
                });
              } else {
                delete_player_save_data(selected_save_data);
                return settings_rights_main(viewing_player)
              }
            }

            if (response.selection == 0) {
              return settings_rights_manage_sd(viewing_player, selected_save_data)
            }
        });

      } else /* Offline */ {
        delete_player_save_data(selected_save_data);
        return settings_rights_main(viewing_player)
      }
    }

    if (response.selection == 2) {
      return settings_rights_data(viewing_player, selected_save_data)
    }
    
  });
}

function settings_type(player) {
  let form = new ActionFormData();
  form.title("Timer types");
  form.body("Select an option!");
  let save_data = load_save_data();

  let player_sd_index;

  if (save_data[0].is_global) {
    player_sd_index = 0;
  } else {
    player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  }

  // Durchlaufe alle Timer-Modi und prüfe, ob diese angezeigt werden sollen
  let validSelections = [];
  timer_modes.forEach((button, index) => {
    if (typeof button.show_if === 'function'
      ? button.show_if(save_data, player_sd_index)
      : button.show_if) {
      validSelections.push(index);
      if (save_data[player_sd_index].counting_type === index) {
        form.button(button.label + "\n§2(selected)", button.icon);
      } else {
        form.button(button.label, button.icon);
      }
    }
  });

  // Rückkehr-Button hinzufügen
  form.button("");

  form.show(player).then((response) => {
    if (response.selection === undefined) return -1;

    let selectedIndex = validSelections[response.selection];
    if (selectedIndex === undefined) {
      return settings_main(player);
    }

    // Wenn aktuell der Modus 0 oder 1 aktiv ist und die Zeit läuft, aber ein anderer Modus gewählt wird,
    // rufe zusätzliche Information ab
    if ((save_data[player_sd_index].counting_type === 0 || save_data[player_sd_index].counting_type === 1) &&
        save_data[player_sd_index].time.do_count && 
        save_data[player_sd_index].counting_type !== selectedIndex) {
      return settings_type_info(player, response);
    }

    // Setze den neuen Modus
    save_data[player_sd_index].counting_type = selectedIndex;
    // Falls sich der Modus ändert, stoppe den Zählvorgang
    if (save_data[player_sd_index].counting_type !== selectedIndex) {
      save_data[player_sd_index].time.do_count = false;
    }

    update_save_data(save_data);
    return settings_main(player);
  });
}


function settings_type_info(player, response) {
  let form = new MessageFormData();
  let save_data = load_save_data();

  let player_sd_index;

  if (save_data[0].is_global) {
    player_sd_index = 0;
  } else {
    player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  }

  form.title("Information");
  form.body("Your "+ (save_data[player_sd_index].counting_type ? "timer" : "stopwatch") +" is not paused! If you change now the mode to "+ (timer_modes[response.selection].label) +" it will be paused!");
  form.button1("");
  form.button2("Change to: "+timer_modes[response.selection].label);

  form.show(player).then((response_2) => {
    if (response_2.selection == 1) {
      save_data[player_sd_index].counting_type = response.selection;
      save_data[player_sd_index].time.do_count = false;
      
      update_save_data(save_data);
      return settings_main(player);
    }
    if (response_2.selection == 0) {
      return settings_type(player)
    }
  });
}

function settings_actionbar(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  let actions = [];

  form.title("Actionsbar");
  form.body("Select an option!");

  // 1. Button: Look
  form.button(
    "Change the look!\n" + render_live_actionbar(save_data[player_sd_index], false),
    "textures/ui/mashup_PaintBrush"
  );
  actions.push(() => {
    design_template_ui(player);
  });

  // 2. Button: Actionsbar
  form.button(
    "Use actionsbar\n" + (save_data[player_sd_index].visibility ? "§aon" : "§coff"),
    save_data[player_sd_index].visibility ? "textures/ui/toggle_on" : "textures/ui/toggle_off"
  );
  actions.push(() => {
    save_data[player_sd_index].visibility = !save_data[player_sd_index].visibility;
    update_save_data(save_data);
    settings_actionbar(player);
  });

  // 3. Button: Day-Time Anzeige
  if (save_data[player_sd_index].counting_type !== 3) {
    form.button(
      "Show day time\n" + (save_data[player_sd_index].time_day_actionsbar ? "§aon" : "§coff"),
      save_data[player_sd_index].time_day_actionsbar ? "textures/ui/toggle_on" : "textures/ui/toggle_off"
    );
    actions.push(() => {
      save_data[player_sd_index].time_day_actionsbar = !save_data[player_sd_index].time_day_actionsbar;
      update_save_data(save_data);
      settings_actionbar(player);
    });
  }

  // 4. Button: Time Source
  if (save_data[player_sd_index].time_day_actionsbar || save_data[player_sd_index].counting_type == 3) {
    if (save_data[0].sync_day_time === 0) {
      if(form){form.button("Time Source\n§9" + (save_data[player_sd_index].time_source === 0 ? "Minecraft" : "Real Life"), "textures/ui/share_microsoft")};
      actions.push(() => {
        if (save_data[player_sd_index].time_source === 0) {
          save_data[player_sd_index].time_source = 1;
        } else {
          save_data[player_sd_index].time_source = 0;
        }
        update_save_data(save_data);
        settings_actionbar(player);
      });
    } else {
      save_data[player_sd_index].time_source = 1
      update_save_data(save_data);
    }
  }

  // 5. back-Button
  form.button("");
  actions.push(() => {
    settings_main(player);
  });

  form.show(player).then(response => {
    const idx = response.selection;
    if (typeof actions[idx] === "function") {
      actions[idx]();
    }
  });
}


function design_template_ui(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  form.title("Design actionsbar");
  form.body("Select a template or create your own custom design!");

  var currentDesign = save_data[player_sd_index].design;
  
  if (typeof save_data[player_sd_index].design == "number") {
    currentDesign = design_template[save_data[player_sd_index].design].content
  }

  let sortedDesigns = design_template
    .filter(design => design.content !== undefined)
    .sort((a, b) => (b.content === currentDesign) - (a.content === currentDesign));

  let hasMatchingDesign = sortedDesigns.some(design => JSON.stringify(design.content) === JSON.stringify(currentDesign));

  sortedDesigns.forEach((design) => {
    let buttonText = design.name;
    if (JSON.stringify(design.content) === JSON.stringify(currentDesign) || (!hasMatchingDesign && design.content === undefined)) {
      buttonText += "\n§2(selected)";
    }
    form.button(buttonText);
  });

  // Rück-Button hinzufügen
  form.button("");

  form.show(player).then((response) => {

    if (response.selection === sortedDesigns.length) {
      return settings_actionbar(player);

    } else if (response.selection !== undefined) {
      let selectedDesign = sortedDesigns[response.selection];

      if (selectedDesign.content === undefined) {
        return settings_actionbar(player);
      } else {
        return design_preview(player, selectedDesign.content, false);
      }
    }
    
  });
}




function design_preview(player, design, is_custom) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  form.title("Design actionsbar");

  

  let normal_preview = apply_design(design.find(d => d.type === "normal"), 634396901)
  let paused_preview = apply_design(design.find(d => d.type === "paused"), 634396901)

  let finished_preview = apply_design(design.find(d => d.type === "finished"), 634396901)
  let day_preview = apply_design(design.find(d => d.type === "day"), 19395.9)

  let screen_saver_preview = apply_design(design.find(d => d.type === "screen_saver"), 0)

  form.body("Here is a preview of your selected design. It shows all possible variable at ones.\n\nScreen saver:\n"+screen_saver_preview+"§r§f\n\nNormal:\n"+ normal_preview + "§r§f\n\nPaused:\n"+paused_preview+ "§r§f\n\nFinshied (CM only):\n" +finished_preview+ "§r§f\n\nDay-Time:\n" +day_preview+ "§r§f\n\nDo you like it?");

  form.button("§aApply!");
  

  // Rück-Button hinzufügen
  form.button("");

  form.show(player).then((response) => {
    if (response.selection == 0) {

      if (is_custom) {
        save_data[player_sd_index].design = design
      } else {
        save_data[player_sd_index].design = design_template.findIndex(d => d.content === design)
      }

      update_save_data(save_data);
      return settings_actionbar(player);
    }

    if (response.selection == 1) {
      if (is_custom) {
        return //design_maker(player)
      } else {
        return design_template_ui(player)
      }
    };
  });
}




















// Open the menu
world.beforeEvents.itemUse.subscribe(event => {
	if (event.itemStack.typeId === "minecraft:stick") {
        system.run(() => {
	    main_menu(event.source)
        });
	}
});


/*------------------------
 Update loop
-------------------------*/

function close_world() {
  world.sendMessage("Closing World! Auto Save is disabled! Please wait...");
  while (true) {}
}

function render_live_actionbar(selected_save_data, do_update) {
  function calcAB(update, id, dayFormat) {
    const data = load_save_data();
    const idx = data.findIndex(e => e.id === id);
    let counting_type, timevalue, timedata;

    if (data[0].is_global) {
      counting_type = data[0].counting_type
      timedata = data[0].time
    } else {
      counting_type = data[idx].counting_type
      timedata = data[idx].time
    }
    


    if (counting_type === 2) {
      timevalue = { value: system.currentTick, do_count: true };
    }
    
    
    if (counting_type === 0 || counting_type === 1) {
        let val = timedata[counting_type === 0 ? "stopwatch" : "timer"];
        if (update && timedata.do_count) {
          if (counting_type === 1) {
            timedata.timer = Math.max(timedata.timer - 1, 0);
            timedata.do_count = timedata.timer !== 0;
          } else {
            timedata.stopwatch++;
          }
          update_save_data(data);
        }
        timevalue = { value: val, do_count: timedata.do_count };
    }

    if (counting_type === 3 || dayFormat) {
      const TICKS = 24000, MILLIS_DAY = 86400000, START_OFFSET = 6 * 3600000;
      if (data[idx].time_source === 1 || data[0].sync_day_time === 1) {
        let now = new Date(),
            total = (now.getHours() + data[0].utc) * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000 + Math.floor(now.getMilliseconds() / 10) * 10,
            adj = total - START_OFFSET < 0 ? total - START_OFFSET + MILLIS_DAY : total - START_OFFSET,
            ticks = (adj / MILLIS_DAY) * TICKS;
            timevalue = { value: ticks, do_count: true };

            if (data[0].sync_day_time === 1 && do_update && (!data[0].is_challenge || (data[0].challenge_progress === 1 && data[0].time.do_count))) {
              world.getDimension("overworld").runCommand(`time set ${Math.floor(ticks)}`);
            }
            
      } else {
        timevalue = { value: world.getTimeOfDay(), do_count: true };
      }
    }
    return timevalue;
  }

  let tv = calcAB(do_update, selected_save_data.id, false);
  if (typeof selected_save_data.design === "number")
    selected_save_data.design = design_template[selected_save_data.design].content;
  
  let d0, d1;
  if (selected_save_data.counting_type !== 3) {
    d0 = tv.do_count 
      ? selected_save_data.design.find(d => d.type === "normal")
      : (tv.value === 0 
          ? selected_save_data.design.find(d => d.type === "screen_saver")
          : selected_save_data.design.find(d => d.type === "paused"));
    if (selected_save_data.time_day_actionsbar)
      d1 = selected_save_data.design.find(d => d.type === "day");
  } else {
    d0 = selected_save_data.design.find(d => d.type === "day");
  }
  
  return d1 
    ? apply_design(d0, tv.value) + " §r§f| " + apply_design(d1, calcAB(false, selected_save_data.id, true).value)
    : apply_design(d0, tv.value);
}


async function update_loop() {
    while (true) {

      //console.log(JSON.stringify(load_save_data()));

      let save_data = load_save_data();

      if (save_data[0].is_global) {
        render_live_actionbar(save_data[1], true)
      }

      if (save_data[0].sync_day_time) {
        world.gameRules.doDayLightCycle = false;
      } else {
        world.gameRules.doDayLightCycle = true;
      }

      // Todo: pausing shout also pause the time, wheaser, etc
      if (save_data[0].challenge_progress == 1 ) {
        enable_gamerules()
      } else if (save_data[0].is_challenge) {
        disable_gamerules()
      }

      // actionsbar
      for (const player of world.getAllPlayers()) {
        save_data = load_save_data();
        let player_sd_index = save_data.findIndex(entry => entry.id === player.id);


        if (save_data[player_sd_index].visibility == true) {
          player.onScreenDisplay.setActionBar(render_live_actionbar(save_data[player_sd_index], save_data[0].is_global ? false : true));
        }
        
      }


      await system.waitTicks(1);
    }
}

function enable_gamerules() {
  world.gameRules.doDayLightCycle = true;
  world.gameRules.doEntityDrops = true;
  world.gameRules.doFireTick = true;
  world.gameRules.doWeatherCycle = true;
  world.gameRules.doMobSpawning = true;
}

function disable_gamerules() {
  world.gameRules.doDayLightCycle = false;
  world.gameRules.doEntityDrops = false;
  world.gameRules.doFireTick = false;
  world.gameRules.doWeatherCycle = false;
  world.gameRules.doMobSpawning = false;
}

update_loop();