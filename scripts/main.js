import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"

const version_info = {
  name: "Timer V",
  version: "v.5.0.0 A4",
  unix: 1747135586
}

// These lists are NOT customizable

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
    show_if: (save_data) => !save_data[0].global.status
  },
  {
    label: "Day-time", 
    icon: "textures/environment/sun", 
    show_if: (save_data, player_sd_index) => {
      return !save_data[0].global.status && save_data[player_sd_index].show_td_as_mode;
    }
  }
];

const difficulty = [
  {
    name: "§aEasy",
    icon: "textures/ui/poison_heart",
    is_hardcore: false
  },
  {
    name: "§fNormal",
    icon: "textures/ui/heart",
    is_hardcore: false
  },
  {
    name: "§4Hard§ccore",
    icon: "textures/ui/hardcore/heart",
    is_hardcore: true
  },
  {
    name: "§cUltra §4Hardcore",
    icon: "textures/ui/hardcore/freeze_heart",
    is_hardcore: true
  },
    {
    name: "§5Infinity",
    icon: "textures/ui/hardcore/wither_heart",
    is_hardcore: true
  }
]

const goal_event = [
  {
    name: "Time Goal",
    icon: "textures/items/clock_item",
    condition: (data) => data[0].time?.timer > 0 && data[0].counting_type === 1
  },
  {
    name: "Raid",
    icon: "textures/items/clock_item",
    condition: () => false
  }
]

// These lists ARE customizable

const timezone_list = [
  { name: "Baker Island Time", utc: -12, short: "BIT", location: ["Baker Island"] },
  { name: "Niue Time", utc: -11, short: "NUT", location: ["Niue", "American Samoa"] },
  { name: "Hawaii-Aleutian Standard Time", utc: -10, short: "HAST", location: ["Hawaii", "Honolulu"] },
  { name: "Marquesas Time", utc: -9.5, short: "MART", location: ["Marquesas Islands"] },
  { name: "Alaska Standard Time", utc: -9, short: "AKST", location: ["Anchorage"] },
  { name: "Pacific Standard Time", utc: -8, short: "PST", location: ["Los Angeles (Winter)", "Vancouver (Winter)"] },
  { name: "Pacific Daylight / Mountain Standard Time", utc: -7, short: "PDT / MST", location: ["Los Angeles (Summer)", "Vancouver (Summer)", "Denver (Winter)", "Phoenix"] },
  { name: "Mountain Daylight / Central Standard Time", utc: -6, short: "MDT / CST", location: ["Denver (Summer)", "Chicago (Winter)", "Mexico City (Winter)"] },
  { name: "Central Daylight / Eastern Standard Time", utc: -5, short: "CDT / EST", location: ["Chicago (Summer)", "New York (Winter)", "Toronto (Winter)"] },
  { name: "Atlantic Standard / Eastern Daylight Time", utc: -4, short: "AST / EDT", location: ["Santiago (Winter)", "Caracas (Winter)", "New York (Summer)", "Toronto (Summer)"] },
  { name: "Atlantic Daylight / Argentina Time", utc: -3, short: "ADT / ART", location: ["Santiago (Summer)", "Buenos Aires", "São Paulo"] },
  { name: "Newfoundland Standard Time", utc: -3.5, short: "NST", location: ["St. John's (Winter)"] },
  { name: "Newfoundland Daylight Time", utc: -2.5, short: "NDT", location: ["St. John's (Summer)"] },
  { name: "South Georgia Time", utc: -2, short: "GST", location: ["South Georgia"] },
  { name: "Azores Standard Time", utc: -1, short: "AZOT", location: ["Azores (Winter)"] },
  { name: "Greenwich Mean Time / Azores Summer Time", utc: 0, short: "GMT / AZOST", location: ["London (Winter)", "Reykjavík", "Azores (Summer)"] },
  { name: "Central European Time / British Summer Time", utc: 1, short: "CET / BST", location: ["Berlin (Winter)", "Paris (Winter)", "Rome (Winter)", "London (Summer)"] },
  { name: "Central European Summer / Eastern European Time", utc: 2, short: "CEST / EET", location: ["Berlin (Summer)", "Paris (Summer)", "Rome (Summer)", "Athens (Winter)", "Cairo (Winter)", "Helsinki (Winter)"] },
  { name: "Eastern European Summer / Moscow Time", utc: 3, short: "EEST / MSK", location: ["Athens (Summer)", "Cairo (Summer)", "Moscow", "Istanbul"] },
  { name: "Iran Standard Time", utc: 3.5, short: "IRST", location: ["Tehran (Winter)"] },
  { name: "Iran Daylight Time / Gulf Standard Time", utc: 4, short: "IRDT / GST", location: ["Tehran (Summer)", "Dubai", "Abu Dhabi"] },
  { name: "Afghanistan Time", utc: 4.5, short: "AFT", location: ["Kabul"] },
  { name: "Pakistan Standard Time", utc: 5, short: "PKT", location: ["Karachi", "Islamabad"] },
  { name: "India Standard Time", utc: 5.5, short: "IST", location: ["New Delhi", "Mumbai", "Colombo"] },
  { name: "Nepal Time", utc: 5.75, short: "NPT", location: ["Kathmandu"] },
  { name: "Bangladesh Time", utc: 6, short: "BST", location: ["Dhaka"] },
  { name: "Cocos Islands Time", utc: 6.5, short: "CCT", location: ["Cocos Islands"] },
  { name: "Indochina Time", utc: 7, short: "ICT", location: ["Bangkok", "Hanoi", "Jakarta"] },
  { name: "China Standard Time", utc: 8, short: "CST", location: ["Beijing", "Shanghai", "Singapore"] },
  { name: "Australian Central Western Time", utc: 8.75, short: "ACWST", location: ["Eucla"] },
  { name: "Japan Standard Time", utc: 9, short: "JST", location: ["Tokyo", "Seoul"] },
  { name: "Australian Central Standard Time", utc: 9.5, short: "ACST", location: ["Adelaide", "Darwin"] },
  { name: "Australian Eastern Standard Time", utc: 10, short: "AEST", location: ["Brisbane", "Melbourne", "Sydney"] },
  { name: "Lord Howe Standard Time", utc: 10.5, short: "LHST", location: ["Lord Howe Island"] },
  { name: "Solomon Islands Time", utc: 11, short: "SBT", location: ["Honiara", "New Caledonia"] },
  { name: "New Zealand Standard Time", utc: 12, short: "NZST", location: ["Wellington", "Auckland"] },
  { name: "Chatham Islands Standard Time", utc: 12.75, short: "CHAST", location: ["Chatham Islands"] },
  { name: "Tonga Time", utc: 13, short: "TOT", location: ["Tonga", "Tokelau"] },
  { name: "Line Islands Time", utc: 14, short: "LINT", location: ["Kiritimati", "Line Islands"] }
];

var goal_entity = [
  {
    "id": "ender_dragon"
  },
  {
    "id": "wither"
  },
  {
    "id": "warden"
  },
  {
    "id": "allay"
  },
  {
    "id": "armadillo"
  },
  {
    "id": "axolotl"
  },
  {
    "id": "bat"
  },
  {
    "id": "bee"
  },
  {
    "id": "blaze"
  },
  {
    "id": "camel"
  },
  {
    "id": "cat"
  },
  {
    "id": "cave_spider"
  },
  {
    "id": "chicken"
  },
  {
    "id": "cod"
  },
  {
    "id": "cow"
  },
  {
    "id": "creeper"
  },
  {
    "id": "dolphin"
  },
  {
    "id": "donkey"
  },
  {
    "id": "drowned"
  },
  {
    "id": "elder_guardian"
  },
  {
    "id": "enderman"
  },
  {
    "id": "endermite"
  },
  {
    "id": "evocation_illager",
    "icon": "textures/items/spawn_eggs/spawn_egg_evoker"
  },
  {
    "id": "fox"
  },
  {
    "id": "frog"
  },
  {
    "id": "ghast"
  },
  {
    "id": "glow_squid"
  },
  {
    "id": "goat"
  },
  {
    "id": "guardian"
  },
  {
    "id": "hoglin"
  },
  {
    "id": "horse"
  },
  {
    "id": "husk"
  },
  {
    "id": "iron_golem"
  },
  {
    "id": "llama"
  },
  {
    "id": "magma_cube"
  },
  {
    "id": "mooshroom"
  },
  {
    "id": "mule"
  },
  {
    "id": "ocelot"
  },
  {
    "id": "panda"
  },
  {
    "id": "parrot"
  },
  {
    "id": "phantom"
  },
  {
    "id": "pig"
  },
  {
    "id": "piglin"
  },
  {
    "id": "piglin_brute"
  },
  {
    "id": "pillager"
  },
  {
    "id": "polar_bear"
  },
  {
    "id": "pufferfish"
  },
  {
    "id": "rabbit"
  },
  {
    "id": "ravager"
  },
  {
    "id": "salmon"
  },
  {
    "id": "sheep"
  },
  {
    "id": "shulker"
  },
  {
    "id": "skeleton"
  },
  {
    "id": "skeleton_horse"
  },
  {
    "id": "slime"
  },
  {
    "id": "sniffer"
  },
  {
    "id": "tadpole"
  },
  {
    "id": "snow_golem"
  },
  {
    "id": "squid"
  },
  {
    "id": "stray"
  },
  {
    "id": "strider"
  },
  {
    "id": "trader_llama"
  },
  {
    "id": "tropicalfish"
  },
  {
    "id": "turtle"
  },
  {
    "id": "vex"
  },
  {
    "id": "villager"
  },
  {
    "id": "wandering_trader"
  },
  {
    "id": "witch"
  },
  {
    "id": "wither_skeleton"
  },
  {
    "id": "wolf"
  },
  {
    "id": "zoglin"
  },
  {
    "id": "zombie"
  },
  {
    "id": "zombie_pigman",
    "icon": "textures/items/spawn_eggs/spawn_egg_zombified_piglin"
  },
  {
    "id": "zombie_villager"
  }
];

const design_template = [
  {
    // The "ms" marker isn't used here, but it works perfectly. Simply because I don't like it.
    name: "Default design",
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: "y", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
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
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      // Same goes for here: the "s" marker isn't used here, but it works perfectly.
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
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
      { type: "ui", blocks: [
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: { singular: " year, ", plural: " years, " }, separator: { enabled: false } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
          { type: "text", text: "§b§l" },
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: { singular: " year, ", plural: " years, " }, separator: { enabled: false } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§bTimer V§r is paused\n§l" },
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: { singular: " year, ", plural: " years, " }, separator: { enabled: false } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
          { type: "text", text: " <-" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§bTimer V§r is paused\n§l" },
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: { singular: " year, ", plural: " years, " }, separator: { enabled: false } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
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

  if (event.id === "timerv:reset") {
    world.setDynamicProperty("timerv:save_data", undefined);
    close_world()
  }

/*------------------------
 Open the menu
-------------------------*/

  if (event.id === "timerv:menu") {
    return main_menu(event.sourceEntity)
  }
  
  
});


// via. item
world.beforeEvents.itemUse.subscribe(event => {
	if (event.itemStack.typeId === "minecraft:stick") {
      system.run(() => {
        event.source.playSound("random.pop2")
	      main_menu(event.source)
      });
	}
});

// via. jump gesture
const gestureCooldowns = new Map();

function gesture_jump() {
  const now = Date.now();

  for (const player of world.getAllPlayers()) {
    const lastUsed = gestureCooldowns.get(player.name) || 0;

    if (player.isSneaking && player.isJumping) {
      if (now - lastUsed >= 100) { // 2 Sekunden Cooldown
        player.playSound("random.pop2");
        main_menu(player);
        gestureCooldowns.set(player.name, now);
      }
    }
  }
}



// via. gesture
const playerHeadMovement = new Map();

function gesture_nod() {
  const now = Date.now();

  for (const player of world.getAllPlayers()) {
    if (player.getGameMode() !== "spectator") continue;

    const { x: pitch } = player.getRotation();

    const prev = playerHeadMovement.get(player.id) || {
      state: "idle",
      timestamp: now,
    };
    let { state, timestamp: lastTime } = prev;

    if (state === "idle" && pitch < -13) {
      state = "lookingUp";
      lastTime = now;
    }
    else if (state === "lookingUp" && pitch > 13) {
      player.playSound("random.pop2");
      main_menu(player);

      state = "idle";
      lastTime = now;
    }
    else if (state === "lookingUp" && now - lastTime > 1000) {
      state = "idle";
      lastTime = now;
    }

    playerHeadMovement.set(player.id, { state, timestamp: lastTime });
  }
}




/*------------------------
 Save Data
-------------------------*/

// Creates Save Data if not present
let save_data = load_save_data()  
if (!save_data) {
    console.log("Creating save_data...");
    save_data = [
        {time: {stopwatch: 0, timer: 0, last_value_timer: 0, do_count: false}, counting_type: 0, challenge: {active: world.isHardcore? true : false, progress: 0, rating: 0, goal: {pointer: 0, entity_pos: 0, event_pos: 0}, difficulty: world.isHardcore? 2 : 1}, global: {status: world.isHardcore? true : false, last_player_id: undefined}, sync_day_time: false, utc: 0, debug: true, update_message_unix: (version_info.unix + 15897600)  }
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
async function create_player_save_data (playerId, playerName) {
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === playerId);

  if (save_data[player_sd_index] == undefined) {
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
          time: {stopwatch: 0, timer: 0, last_value_timer: 0, do_count: false},
          afk: false,
          counting_type: 0,
          time_day_actionsbar: false,
          allow_unnecessary_inputs: false,
          time_source: 0,
          name: playerName,
          op: shout_be_op,
          visibility: true,
          fullbright: false,
          lang: 0,
          design: 0,
          setup: shout_be_op ? 2 : 1
      });
  } else if (save_data[player_sd_index].name !== playerName) {
      save_data[player_sd_index].name = playerName;
  }

  update_save_data(save_data);
  

  let player;
  while (!player) {
    player = world.getAllPlayers().find(player => player.id == playerId)
    await system.waitTicks(20);
  }
  // I don't know why but in single player, the server is active about 60 ticks before the player of the server is reachable via getAllPlayers

  // Resets AFK
  player_sd_index = save_data.findIndex(entry => entry.id === playerId);
  if (!save_data[0].global.status && save_data[player_sd_index].afk && (!save_data[player_sd_index].time.do_count && save_data[player_sd_index].time[save_data[player_sd_index].counting_type ? "timer" : "stopwatch"] > 0)) {
    save_data[player_sd_index].time.do_count = true;
    update_save_data(save_data)
  }

  // Setup popup
  if (save_data[player_sd_index].setup == 2) {
    let form = new ActionFormData();
    form.title("Setup guide");
    form.body("Wellcome!\nAs you may recall, in previous versions you had the option to choose between Survival and Creative modes. These functions are now native and across the timer, making them less distinguishable. However, you can use these templates here in the setup to access the same functions as before!\n\n§7Best regards, TheFelixLive (the developer)");
    if (world.isHardcore) {
      form.button("Try Hardcore!");
    } else {
      form.button("Survival mode");
      form.button("Creative mode");
      form.button("");
    }


    const showForm = async () => {
      form.show(player).then((response) => {
        if (response.canceled && response.cancelationReason === "UserBusy") {
          showForm()
        } else {
          if (!world.isHardcore) {
            // Response
            save_data[player_sd_index].setup = 0
            // Survival
            if (response.selection === 0) {
              save_data[0].global.status = true
              save_data[0].challenge.active = true
              save_data[0].global.last_player_id = player.id
              world.setTimeOfDay(0);
              world.getDimension("overworld").setWeather("Clear");
            }

            update_save_data(save_data);
            if (response.selection >= 0) {
              main_menu(player)
            }
          } else {
            save_data[player_sd_index].setup = 0
            update_save_data(save_data);
            main_menu(player)
          }
        }
      });
    };
    showForm();
  }

  // Welcome screen
  if (save_data[player_sd_index].setup == 1) {
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
          save_data[player_sd_index].setup = 0
          update_save_data(save_data);
          if (response.selection === 0) {
            main_menu(player)
          }
          
        }
      });
    };
    showForm();
  }

  // Update popup
  if (save_data[player_sd_index].op && (Date.now()/ 1000) > save_data[0].update_message_unix) {
    let form = new ActionFormData();
    form.title("Update time!");
    form.body("Your current version (" + version_info.version + ") is older than 6 months.\nThere MIGHT be a newer version out. Feel free to update to enjoy the latest features!\n\nCheck out: §7github.com/TheFelixLive/Timer-Ultimate");
    form.button("Mute");

    const showForm = async () => {
      form.show(player).then((response) => {
        if (response.canceled && response.cancelationReason === "UserBusy") {
          showForm()
        } else {
          if (response.selection === 1) {
            save_data[0].update_message_unix = (Date.now()/ 1000) + 15897600;
            update_save_data(save_data);
          }
        }
      });
    };
    showForm();
  }
}

world.afterEvents.playerJoin.subscribe(({ playerId, playerName }) => {
  create_player_save_data(playerId, playerName);
});

/*------------------------
 general helper functions
-------------------------*/

// This function does not need a player (which also contains the position) but his ID
function convert_local_to_global(player_id) {
  let save_data = load_save_data();
  let player_save_data = save_data.findIndex(entry => entry.id === player_id);

  save_data[0].global.last_player_id = save_data[player_save_data].id

  save_data[0].counting_type = save_data[player_save_data].counting_type
  save_data[0].time.do_count = save_data[player_save_data].time.do_count
  save_data[0].time.timer = save_data[player_save_data].time.timer
  save_data[0].time.stopwatch = save_data[player_save_data].time.stopwatch

  save_data[0].global.status = true
  update_save_data(save_data)
}

function convert_global_to_local(disable_global) {
  let save_data = load_save_data();
  let player_save_data = save_data.findIndex(entry => entry.id === save_data[0].global.last_player_id);

  if (player_save_data) {
    save_data[player_save_data].counting_type = save_data[0].counting_type
    save_data[player_save_data].time.do_count = save_data[0].time.do_count
    save_data[player_save_data].time.timer = save_data[0].time.timer
    save_data[player_save_data].time.stopwatch = save_data[0].time.stopwatch
  } else {
    world.sendMessage("§l§4[§cError§4]§r The time could not be synchronized with the player profile ("+ save_data[0].global.last_player_id +") and got deleted!")
  }

  if (disable_global) {
    save_data[0].global.status = false
  } else {
    save_data[0].global.last_player_id = save_data[player_save_data].id
  }

  update_save_data(save_data)
}

function start_cm_timer() {
  let save_data = load_save_data();
  save_data[0].challenge.progress = 1
  save_data[0].time.do_count = true

  if(save_data[0].challenge.goal.pointer == 0) {
    const availableEntities = goal_entity;
    const availableEvents   = goal_event.filter(g => g.condition(save_data));

    const totalEntities = availableEntities.length;
    const totalEvents   = availableEvents.length;
    const totalOptions  = totalEntities + totalEvents;

    const r = Math.floor(Math.random() * totalOptions);

    if (r < totalEntities) {
      const chosenEntity = availableEntities[r];
      const realIndex    = goal_entity.findIndex(g => g.id === chosenEntity.id);

      save_data[0].challenge.goal.pointer     = 1;
      save_data[0].challenge.goal.entity_pos  = realIndex;
    } else {
      const idxInEvents = r - totalEntities;
      const chosenEvent = availableEvents[idxInEvents];
      const realIndex   = goal_event.findIndex(g => g.name === chosenEvent.name);

      save_data[0].challenge.goal.pointer    = 2;
      save_data[0].challenge.goal.event_pos  = realIndex;
    }

    // Realtalk: Raw Text to the hell! It took me around 4 hours to implement it for this shitty "translate"
    const parts =
      save_data[0].challenge.goal.pointer === 1
        ? [
            { text: "Defeat the " },
            { translate: "entity." + goal_entity[save_data[0].challenge.goal.entity_pos].id + ".name" },
            { text: "\n" },
          ]
      : save_data[0].challenge.goal.pointer === 2 && save_data[0].challenge.goal.event_pos === 0
        ? [
            { text: "Survive: " + apply_design(design, save_data[0].time.timer) + "\n" }
          ]
        : [
            { text: "Complete the following event: " + goal_event[save_data[0].challenge.goal.event_pos].name + "\n" }
          ];

    world.sendMessage({
      rawtext: [
        { text: "§l§5[§dGoal§5]§r§f " },
        ...parts
      ]
    });
  }

  world.getAllPlayers().forEach(t => {
    t.playSound("random.levelup");
  });

  update_save_data(save_data);
  world.sendMessage("§l§7[§fSystem§7]§r The Challenge starts now!")
}

function finished_cm_timer(rating, message) {
  let save_data = load_save_data()
  save_data[0].challenge.progress = 2

  save_data[0].challenge.rating = rating
  save_data[0].time.do_count = false

  // Have to be rawtext!
  const prefix = {
    text: rating === 1
      ? "§l§2[§aGoal§2]§r "
      : "§l§4[§cEnd§4]§r "
  };

  const rawArray = [ prefix, ...message ];

  world.sendMessage({ rawtext: rawArray });

  world.getAllPlayers().forEach(t => {
    t.playSound(rating == 1? "random.toast" : "horn.call.7");
    t.onScreenDisplay.setTitle(rating == 1? "§aYou Won!" : "§4Challenge has ended!");
  });

  update_save_data(save_data);
}

function check_player_gamemode(player) {
  const { challenge, time } = load_save_data()[0];
  const gm = player.getGameMode();

  if (challenge.progress === 0 && !world.isHardcore) {
    const target = "creative";
    if (gm !== target) player.setGameMode(target);
  }

  if (challenge.progress === 1 && !world.isHardcore) {
    const target = time.do_count ? "survival" : "spectator";
    if (gm !== target) player.setGameMode(target);
  }

  if (challenge.progress === 2) {
    let target;
    if (challenge.rating === 1) {
      target = "creative";
    } else {
      target = "spectator";
    }
    if (gm !== target) player.setGameMode(target);
  }
}


function check_difficulty() {
  let save_data = load_save_data();

  if (world.getDifficulty() !== "Easy" && save_data[0].challenge.difficulty == 0) {
    world.setDifficulty("Easy")
  }

  if (world.getDifficulty() !== "Normal" && save_data[0].challenge.difficulty == 1) {
    world.setDifficulty("Normal")
  }
  // It's somehow unnecessary because hardcore is always "hard" but whatever :)
  if (world.getDifficulty() !== "Hard" && save_data[0].challenge.difficulty > 1) {
    world.setDifficulty("Hard")
  }
}

function check_health(configuration) {
  let save_data = load_save_data();


  for (const player of world.getPlayers()) {
    const health = player.getComponent("health");
    if (configuration == "infinity") {
      if (save_data[0].challenge.difficulty == 4) {
          player.applyDamage(health.currentValue - 1)
      }
    } else if (configuration == "resistance") {
      health.resetToMaxValue();
    }
  }

}

function render_task_list(player) {
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)
  let design = (typeof save_data[player_sd_index].design === "number"? design_template[save_data[player_sd_index].design].content : save_data[player_sd_index].design).find(item => item.type === "ui");
  const lines = [];

  // difficulty
  if (save_data[0].challenge.difficulty === 2) {
    lines.push({ text: "- §4Hard§ccore§f is active\n" });
  }
  if (save_data[0].challenge.difficulty === 3) {
    lines.push({ text: "- §cUltra §4Hardcore§f: no regeneration\n" });
  }
  if (save_data[0].challenge.difficulty === 4) {
    lines.push({ text: "- §5Infinity§f: no damage\n" });
  }

  // goals pointer 0 = random
  if (save_data[0].challenge.goal.pointer === 0) {
    lines.push({ text: "- §5Goal§f is random\n" });
  }

  // goals pointer 1 = defeat specific entity
  if (save_data[0].challenge.goal.pointer === 1) {
    lines.push({ text: "- §5Goal:§f Defeat: " });
    lines.push({translate: "entity." + goal_entity[save_data[0].challenge.goal.entity_pos].id + ".name"});
    lines.push({ text: "\n" });
  }

  // goals pointer 2 = event/time-based
  if (save_data[0].challenge.goal.pointer === 2 && save_data[0].challenge.goal.event_pos === 0) {
    // survive timer only
    lines.push({ text: "- §aSurvive:§f " + apply_design(design, save_data[0].time.timer) + "\n" });
  } else {
    // time available
    if (save_data[0].counting_type === 1) {
      lines.push({ text: "- §aTime available:§f " + apply_design(design, save_data[0].time.timer) + "§r§f\n" });
    }
    // goal event
    if (save_data[0].challenge.goal.pointer === 2) {
      lines.push({ text: "- §5Goal:§f " + goal_event[save_data[0].challenge.goal.event_pos].name + "§r§f\n" });
    }
  }

  return lines;
}

function enable_gamerules(doDayLightCycle) {
  let save_data = load_save_data()
  world.gameRules.doDayLightCycle = doDayLightCycle;
  world.gameRules.doEntityDrops = true;
  world.gameRules.doFireTick = true;
  world.gameRules.doWeatherCycle = true;
  world.gameRules.doMobSpawning = true;
  if (save_data[0].challenge.active) {
    if (save_data[0].challenge.difficulty > 2) {
      world.gameRules.naturalRegeneration = false;
    } else {
      world.gameRules.naturalRegeneration = true;
    }
  }
}

function disable_gamerules() {
  world.gameRules.doDayLightCycle = false;
  world.gameRules.doEntityDrops = false;
  world.gameRules.doFireTick = false;
  world.gameRules.doWeatherCycle = false;
  world.gameRules.doMobSpawning = false;
}

/*------------------------
 Startup popups
-------------------------*/

world.afterEvents.entityDie.subscribe(event => {
  const save_data = load_save_data();

  if (event.deadEntity?.typeId === "minecraft:player") {
    const player = event.deadEntity;
    const player_sd_index = save_data.findIndex(entry => entry.id === player.id);

    if (save_data[0].challenge.difficulty > 0 && save_data[0].challenge.progress == 1 && save_data[0].time.do_count) {
      finished_cm_timer(0, [{text:"The challenge is over. Time invested: "+ apply_design(
            (
              typeof save_data[player_sd_index].design === "number"
                ? design_template[save_data[player_sd_index].design].content
                : save_data[player_sd_index].design
            ).find(item => item.type === "ui"),
            (save_data[0].counting_type == 0? save_data[0].time.stopwatch : save_data[0].time.last_value_timer - save_data[0].time.timer)
          ) +" Thanks for playing."}])
    }
  }

  if (save_data[0].challenge.progress == 1 && save_data[0].time.do_count && save_data[0].challenge.goal.pointer == 1 && event.deadEntity?.typeId === ("minecraft:" + goal_entity[save_data[0].challenge.goal.entity_pos].id)) {
    finished_cm_timer(1, [{text: "You did it! You defeated the "}, {translate: ("entity."+goal_entity[save_data[0].challenge.goal.entity_pos].id+".name")}, {text: " in an epic battle! Good Game!"}])
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
      else if (typeof b.alwaysShow === "object" && b.alwaysShow.condition === "ifGreater") {
        const checks = b.alwaysShow.units || [];
        const anyGreater = checks.some(u => Number(timeValues[u] ?? 0) > 0);
        show = anyGreater;
      }
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

  if (form) {
    if (save_data[0].challenge.active && save_data[0].challenge.progress == 1) {
      form.body({rawtext:[
        { text: "Here's a brief overview, what you have setup:\n" },
        ...render_task_list(player),
        { text: "\n" }
      ]});

    } else {
    form.body("Select an option!");
    }
  }

  let timedata;
  if (save_data[0].global.status) {
    timedata = save_data[0]
  } else {
    timedata = save_data[player_sd_index]
  }

  if (!save_data[0].global.status || save_data[0].global.status && save_data[player_sd_index].op) {
    if (timedata.counting_type == 0 || timedata.counting_type == 1) {

      if (((timedata.counting_type == 0 || (timedata.counting_type == 1 & timedata.time.timer > 0)) && (!save_data[player_sd_index].afk || save_data[0].global.status) &&  !save_data[0].challenge.active)  || (save_data[0].challenge.active && save_data[0].challenge.progress == 1)) {
        if(form){form.button("Condition\n" + (timedata.time.do_count === true ? "§aresumed" : "§cpaused"), (timedata.time.do_count === true ? "textures/ui/toggle_on" : "textures/ui/toggle_off"))}
        actions.push(() => {
          if (timedata.time.do_count === false) {
            timedata.time.do_count = true;

            (save_data[0].global.status ? world.getAllPlayers() : [player]).forEach(t => {
              t.sendMessage("§l§2[§aCondition§2]§r The timer will resume!");
              t.playSound("step.amethyst_block");
            });
          } else {
            timedata.time.do_count = false;

            (save_data[0].global.status ? world.getAllPlayers() : [player]).forEach(t => {
              t.sendMessage("§l§4[§cCondition§4]§r The timer is stopped!");
              t.playSound("trial_spawner.close_shutter");
            });
          }
          update_save_data(save_data);
        });
      }
  
      if (timedata.time[timedata.counting_type ? "timer" : "stopwatch"] > 0 && !save_data[0].challenge.active) {
        if (!save_data[0].global.status) {
          if(form){form.button("Intelligent condition\n" + (save_data[player_sd_index].afk === true ? "§aon" : "§coff"), (save_data[player_sd_index].afk === true ? "textures/ui/toggle_on" : "textures/ui/toggle_off"))}
          actions.push(() => {
            if (save_data[player_sd_index].afk) {
              save_data[player_sd_index].afk = false
            } else {
              save_data[player_sd_index].afk = true
            }
      
            update_save_data(save_data);
            main_menu(player);
          });
        }

        if(form){form.button("§cReset "+(timedata.counting_type ? "timer" : "stopwatch"), "textures/ui/recap_glyph_color_2x")}
        actions.push(() => {
          timedata.time[timedata.counting_type ? "timer" : "stopwatch"] = 0;
          timedata.time.do_count = false;
          save_data[player_sd_index].afk = false
    
          update_save_data(save_data);
          main_menu(player);
        });
      }
    }

    /*------------------------
      Only Challenge mode
    -------------------------*/

    const challenge = save_data[0].challenge;
    const isHardcore = difficulty[challenge.difficulty].is_hardcore;

    if (challenge.progress === 1) {
      if (form) form.button("§cGive up!", "textures/blocks/barrier");

      actions.push(() => {
        finished_cm_timer(0, [{text:"The challenge is over. Time invested: "+ apply_design(
          (
            typeof save_data[player_sd_index].design === "number"
              ? design_template[save_data[player_sd_index].design].content
              : save_data[player_sd_index].design
          ).find(item => item.type === "ui"),
          (save_data[0].counting_type == 0? save_data[0].time.stopwatch : save_data[0].time.last_value_timer - save_data[0].time.timer)
        ) +" Thanks for playing."}])
      });
    }

    if (challenge.progress === 2 && (isHardcore && challenge.rating === 1 || !isHardcore)) {
      if (form) form.button("§aStart over!", "textures/ui/recap_glyph_color_2x");

      actions.push(() => {
        if (challenge.rating === 1) {
          challenge.goal.pointer = 0;
        } else {
          save_data[0].time[timedata.counting_type ? "timer" : "stopwatch"] = 0;
          world.setTimeOfDay(0);
          world.getDimension("overworld").setWeather("Clear");
        }

        challenge.progress = 0;
        update_save_data(save_data);
        main_menu(player);
      });
    }


    if (challenge.active && challenge.progress == 0) {
      if (timedata.counting_type == 0 || (timedata.counting_type == 1 & timedata.time.timer > 0)) {
        if (form) form.button("§2Start Challenge\n", "textures/gui/controls/right");
        actions.push(() => {
          splash_start_challenge(player);
        });
      }

      if (form) form.button({rawtext:
        [
          { text: "§5Goal§9\n" },
          challenge.goal.pointer === 2
            ? { text: goal_event[challenge.goal.event_pos].name }
            : challenge.goal.pointer === 0
            ? { text: "§bR§ga§an§6d§4o§fm" }
            : ({ text: "Defeat: " },
              { translate: "entity." + goal_entity[challenge.goal.entity_pos].id + ".name" })
        ]},
        "textures/items/elytra"
      );

      actions.push(() => {
        settings_goals_main(player);
      });

      if (form) form.button("§cDifficulty\n" + difficulty[challenge.difficulty].name + "", difficulty[challenge.difficulty].icon);
      actions.push(() => {
        settings_difficulty(player);
      });
    }


    if (save_data[player_sd_index].op && !challenge.active && timedata.counting_type !== 2) {
      if(form){form.button("Shared timer\n§9" + (save_data[0].global.status ? "by "+ save_data.find(e => e.id === save_data[0].global.last_player_id)?.name : "off"), "textures/ui/FriendsIcon")};
      actions.push(() => {
        splash_globalmode(player);
      });
    }

    // "Change / add time" button
    if (!(challenge.active && challenge.progress > 0) && timedata.counting_type !== 2) {
      if (form) {
        form.button(
          (challenge.active ? "Start time\n" : "Change time\n") +
          apply_design(
            (
              typeof save_data[player_sd_index].design === "number"
                ? design_template[save_data[player_sd_index].design].content
                : save_data[player_sd_index].design
            ).find(item => item.type === "ui"),
            timedata.time[timedata.counting_type ? "timer" : "stopwatch"]
          ),
          "textures/ui/color_plus"
        );
      }
      actions.push(() => {
        settings_start_time(player);
      });
    }
  }


  if ((save_data[player_sd_index].time_day_actionsbar == true || timedata.counting_type == 3) && save_data[0].challenge.progress !== 2) {
    if (save_data[player_sd_index].time_source === 1 && save_data[player_sd_index].op) {
      if(form){form.button("Clone real time\n" + (save_data[0].sync_day_time ? "§aon" : "§coff"), (save_data[0].sync_day_time ? "textures/ui/toggle_on" : "textures/ui/toggle_off"))};
      actions.push(() => {
        if (!save_data[0].sync_day_time) {
          save_data[0].sync_day_time = true;
        } else {
          save_data[0].sync_day_time = false;
        }
        update_save_data(save_data);
        main_menu(player);
      });
    }
  }

  if (save_data[player_sd_index].op && save_data[0].global.status && save_data[0].challenge.progress == 0 && !world.isHardcore) {
    if(form){form.button("Challenge mode", save_data[0].challenge.active ? "textures/ui/toggle_on" : "textures/ui/toggle_off")};
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
    (!save_data[0].challenge.active
      ? "In this mode, the timer shifts from a supporting role to the main one. First, you set the guidelines and then plunge into the adventure of the survival mode!"
      : "If this function is deactivated, the timer will operate more in the background and will no longer have any influence on the game mode.")
    + "\n\n§7This setting will change the timer significantly.\n\n"
  );
  
  form.button(!save_data[0].challenge.active ? "§aEnable": "§cDisable");
  form.button("");


  form.show(player).then((response) => {
    if (response.selection == 0) {
      // Disable
      if (save_data[0].challenge.active) {
        convert_local_to_global(save_data[0].global.last_player_id);
        save_data = load_save_data()

      } /* Enable */ else {
        convert_global_to_local(false);
        save_data = load_save_data()
        save_data[0].time.do_count = false
        save_data[0].time.timer = 0
        save_data[0].time.stopwatch = 0
        world.setTimeOfDay(0);
        world.getDimension("overworld").setWeather("Clear");

        if (save_data[0].counting_type == 0 && save_data[0].challenge.goal.pointer == 2 && save_data[0].challenge.goal.event_pos == 0) {
          save_data[0].challenge.goal.pointer = 0
        }
      }
      

      
      save_data[0].challenge.active = save_data[0].challenge.active ? false : true,
      update_save_data(save_data);
    }


    if (response.selection >= 0) {
      return main_menu(player)
    }


    
  });
}

function splash_start_challenge(player) {
  let form = new ActionFormData();

  form.title("Warning!");
  form.body({rawtext:[{text: "You are trying to start a challenge. Once a challenge is started, many settings are no longer available.\n\nHere's a brief overview:\n"}, ...render_task_list(player), {text: "\n\n"}]});

  form.button("§aStart");
  form.button("");

  form.show(player).then((response) => {
    if (response.selection == 0) {
      return start_cm_timer()
    }


    if (response.selection == 1) return main_menu(player);
  });
}



function splash_globalmode(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)
  let design = (typeof save_data[player_sd_index].design === "number"? design_template[save_data[player_sd_index].design].content : save_data[player_sd_index].design).find(item => item.type === "ui");
  let actions = [];

  form.title("Shared timer");
  form.body("The shared timer feature coppies your timer to an additional timer that is enforced on all players." +
    (save_data[0].global.status ? save_data[0].global.last_player_id !== player.id ? save_data.find(e => e.id === save_data[0].global.last_player_id)?.name + " is currently sharing his timer. You can §cstop§f this or §ereplace§f it with your own time ("+ apply_design(design, save_data[player_sd_index].time[save_data[player_sd_index].counting_type ? "timer" : "stopwatch"]) + "§r§f)." : "" :
    
    "\nOnly admins can control it.") + "\n\n§7Required for challenge mode.\n\n");

  if (save_data[0].global.status) {
    if (save_data[0].global.last_player_id !== player.id) {
      form.button("§eShare yours instead");
      actions.push(() => {
        convert_global_to_local(true);
        convert_local_to_global(player.id);
      });
    }

    form.button("§cDisable");
    actions.push(() => {
      convert_global_to_local(true);
    });



  } else {
    form.button("§aEnable");
    actions.push(() => {
      convert_local_to_global(player.id)
    });
  }

  form.button("");
  actions.push(() => {});


  form.show(player).then((response) => {
    if (response.selection !== undefined && actions[response.selection]) {
      actions[response.selection]();
      main_menu(player);
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

  let ms = save_data[save_data[0].global.status ? 0 : player_sd_index].time[save_data[save_data[0].global.status ? 0 : player_sd_index].counting_type ? "timer" : "stopwatch"] * 5;
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

    save_data[save_data[0].global.status ? 0 : player_sd_index].time.timer = Math.floor(totalMilliseconds / 5)
    save_data[save_data[0].global.status ? 0 : player_sd_index].time.last_value_timer = Math.floor(totalMilliseconds / 5);
    if (totalMilliseconds/5 > 0) {
      save_data[save_data[0].global.status ? 0 : player_sd_index].counting_type = 1;
    } else {
      save_data[save_data[0].global.status ? 0 : player_sd_index].counting_type = 0;
      if (save_data[0].challenge.active && save_data[0].challenge.goal.pointer == 2 && save_data[0].challenge.goal.event_pos == 0) {
        save_data[0].challenge.goal.pointer = 0
      }
    }
    update_save_data(save_data);
    return main_menu(player)
  });
}



function settings_difficulty(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)

  form.title("Difficulty");
  form.body("Select your difficulty!\n§7Note: " + 
  (!world.isHardcore
    ? "Hardcore difficulties are only available if the world was started in hardcore."
    : "Easier difficulty levels are only available if you start the world normally."));


  let visibleDifficulties = [];

  difficulty.forEach((diff, index) => {
    if (diff.is_hardcore == world.isHardcore || save_data[player_sd_index].allow_unnecessary_inputs) {
      let name = diff.name;
      if (save_data[0].challenge.difficulty === index) {
        name += "\n§2(selected)";
      }
      form.button(name, diff.icon);
      visibleDifficulties.push({ diff, index });
    }
  });

  form.button(""); // Rück- oder Trenner-Button

  form.show(player).then((response) => {
    if (response.selection >= 0 && response.selection < visibleDifficulties.length) {
      let selected = visibleDifficulties[response.selection];
      save_data[0].challenge.difficulty = selected.index; // Originalindex speichern
      update_save_data(save_data);
    }

    if (response.selection >= 0) return main_menu(player);
  });
}



function settings_goals_main(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  const pointer = save_data[0].challenge.goal.pointer;

  form.title("Goal");
  form.body("Select a type!");

  form.button({
    rawtext: [
      { text: "Entity\nDefeat" },
      ...(pointer === 1
        ? [
            { text: ": " },
            { translate: "entity." + goal_entity[save_data[0].challenge.goal.entity_pos].id + ".name" }
          ]
        : [{ text: " a specific creature" }]
      )
    ]
  },
  pointer === 1 ? "textures/ui/realms_slot_check" : undefined);



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
      save_data[0].challenge.goal.pointer = 0;
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
  const currentGoal = save_data[0].challenge.goal.pointer === pointerValue
    ? (isEvent ? save_data[0].challenge.goal.event_pos : save_data[0].challenge.goal.entity_pos)
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

  visibleGoals.sort((a, b) => {
    const aKey = isEvent ? a.name : `entity.${a.id}.name`;
    const bKey = isEvent ? b.name : `entity.${b.id}.name`;
    return aKey.localeCompare(bKey);
  });

  if (selectedGoal) {
    visibleGoals.unshift(selectedGoal);
  }

  visibleGoals.forEach(goal => {
    const realIndex = goalArray.findIndex(g =>
      isEvent ? g.name === goal.name : g.id === goal.id
    );
    const labelText = { 
        rawtext: [
            {
                translate: ("entity."+goal.id+".name"),
            },
            { text: currentGoal === realIndex ? "\n§2(selected)" : "" },
        ],
    };
    const icon = goal.icon
      ? goal.icon
      : (isEvent
          ? undefined
          : `textures/items/spawn_eggs/spawn_egg_${goal.id}`);
    form.button(labelText, icon);
  });

  form.button("");

  form.show(player).then((response) => {
    if (response.selection < visibleGoals.length) {
      const selectedGoal = visibleGoals[response.selection];
      const realIndex = goalArray.findIndex(goal =>
        isEvent ? goal.name === selectedGoal.name : goal.id === selectedGoal.id
      );

      if (isEvent) {
        save_data[0].challenge.goal.event_pos = realIndex;
      } else {
        save_data[0].challenge.goal.entity_pos = realIndex;
      }
      save_data[0].challenge.goal.pointer = pointerValue;

      update_save_data(save_data);
    }
    if (response.selection >= 0) return settings_goals_main(player);
  });
}






function settings_time_zone(player, viewing_mode) {
  let form = new ActionFormData();
  let actions = [];
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  form.title("Time zone settings");
  form.body("Select your current time zone!");

  const TICKS = 24000, MILLIS_DAY = 86400000, START_OFFSET = 6 * 3600000;
  let now = new Date()

  let current_zone_index = timezone_list.findIndex(zone => zone.utc === save_data[0].utc);

  if (current_zone_index === -1) {
    let closestDiff = Infinity;
    current_zone_index = 0;

    timezone_list.forEach((zone, index) => {
      const diff = Math.abs(zone.utc - save_data[0].utc);
      if (diff < closestDiff) {
        closestDiff = diff;
        current_zone_index = index;
      }
    });
  }

  // 5 clostes time zones
  if (viewing_mode == 0) {
    let start = current_zone_index - 2;
    let end = current_zone_index + 2;

    if (start < 0) {
      end += -start;
      start = 0;
    }
    if (end >= timezone_list.length) {
      start -= (end - timezone_list.length + 1);
      end = timezone_list.length - 1;
    }
    if (start < 0) start = 0;

    // Show previous time zones button
    if (start > 0) {
      form.button("Show previous time zones", "textures/ui/up_arrow");
      actions.push(() => {
        settings_time_zone(player, 1);
      });
    }

    for (let index = start; index <= end; index++) {
      const zone = timezone_list[index];
      let total = (now.getHours() + zone.utc) * 3600000 +
                  now.getMinutes() * 60000 +
                  now.getSeconds() * 1000 +
                  Math.floor(now.getMilliseconds() / 10) * 10;
      let adj = total - START_OFFSET < 0 ? total - START_OFFSET + MILLIS_DAY : total - START_OFFSET;
      let ticks = (adj / MILLIS_DAY) * TICKS;

      form.button(
        (zone.name.length > 30 ? zone.short : zone.name) + "\n" +
        apply_design(
          (typeof save_data[player_sd_index].design === "number"
            ? design_template[save_data[player_sd_index].design].content
            : save_data[player_sd_index].design
          ).find(item => item.type === "day"),
          ticks
        ),
        index === current_zone_index ? "textures/ui/realms_slot_check" : ""
      );

      actions.push(() => {
        save_data[0].utc = zone.utc;
        update_save_data(save_data);
        settings_main(player);
      });
    }

    // Show later time zones button
    if (end < timezone_list.length - 1) {
      form.button("Show later time zones", "textures/ui/down_arrow");
      actions.push(() => {
        settings_time_zone(player, 2);
      });
    }
  }


  // all previous time zones
  if (viewing_mode == 1) {
    timezone_list.forEach((zone, index) => {
      if (current_zone_index >= index) {
        let total = (now.getHours() + zone.utc) * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000 + Math.floor(now.getMilliseconds() / 10) * 10,
        adj = total - START_OFFSET < 0 ? total - START_OFFSET + MILLIS_DAY : total - START_OFFSET,
        ticks = (adj / MILLIS_DAY) * TICKS;

        form.button((zone.name.length > 30 ? zone.short : zone.name) + "\n" + apply_design((typeof save_data[player_sd_index].design === "number" ? design_template[save_data[player_sd_index].design].content : save_data[player_sd_index].design).find(item => item.type === "day"), ticks), index == current_zone_index? "textures/ui/realms_slot_check" : "");
        actions.push(() => {
          save_data[0].utc = zone.utc
          update_save_data(save_data);
          settings_main(player);
        });
      }
    });
    form.button("Show later time zones", "textures/ui/down_arrow");
    actions.push(() => {
      settings_time_zone(player, 3)
    });
  }

  // all later time zones
  if (viewing_mode == 2) {
    form.button("Show previous time zones", "textures/ui/up_arrow");
    actions.push(() => {
      settings_time_zone(player, 3)
    });

    timezone_list.forEach((zone, index) => {
      if (current_zone_index <= index) {
        let total = (now.getHours() + zone.utc) * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000 + Math.floor(now.getMilliseconds() / 10) * 10,
        adj = total - START_OFFSET < 0 ? total - START_OFFSET + MILLIS_DAY : total - START_OFFSET,
        ticks = (adj / MILLIS_DAY) * TICKS;

        form.button((zone.name.length > 30 ? zone.short : zone.name) + "\n" + apply_design((typeof save_data[player_sd_index].design === "number" ? design_template[save_data[player_sd_index].design].content : save_data[player_sd_index].design).find(item => item.type === "day"), ticks), index == current_zone_index? "textures/ui/realms_slot_check" : "");
        actions.push(() => {
          save_data[0].utc = zone.utc
          update_save_data(save_data);
          settings_main(player);
        });
      }
    });
  }

  // all time zones
  if (viewing_mode == 3) {
    timezone_list.forEach((zone, index) => {
      let total = (now.getHours() + zone.utc) * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000 + Math.floor(now.getMilliseconds() / 10) * 10,
      adj = total - START_OFFSET < 0 ? total - START_OFFSET + MILLIS_DAY : total - START_OFFSET,
      ticks = (adj / MILLIS_DAY) * TICKS;

      form.button((zone.name.length > 30 ? zone.short : zone.name) + "\n" + apply_design((typeof save_data[player_sd_index].design === "number" ? design_template[save_data[player_sd_index].design].content : save_data[player_sd_index].design).find(item => item.type === "day"), ticks), index == current_zone_index? "textures/ui/realms_slot_check" : "");
      actions.push(() => {
        save_data[0].utc = zone.utc
        update_save_data(save_data);
        settings_main(player);
      });
    });
  }




  // go back to settings
  form.button("");
  actions.push(() => settings_main(player));

  form.show(player).then((response) => {
    if (response.selection !== undefined && actions[response.selection]) {
      actions[response.selection]();
    }
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
  if (!save_data[0].global.status || ((save_data[0].global.status && save_data[player_sd_index].op) && (save_data[0].challenge.active && save_data[0].challenge.progress == 0))) {
    form.button("Type\n§9" + timer_modes[save_data[save_data[0].global.status ? 0 : player_sd_index].counting_type].label, timer_modes[save_data[save_data[0].global.status ? 0 : player_sd_index].counting_type].icon);
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
    if(form) {
      let zone = timezone_list.find(zone => zone.utc === save_data[0].utc), zone_text;

      if (!zone) {
        zone = timezone_list.reduce((closest, current) => {
          const currentDiff = Math.abs(current.utc - save_data[0].utc);
          const closestDiff = Math.abs(closest.utc - save_data[0].utc);
          return currentDiff < closestDiff ? current : closest;
        });
         zone_text = "Prob. " + ("Prob. "+ zone.name.length > 30 ? zone.short : zone.name)
      } else {
         zone_text = zone.name.length > 30 ? zone.short : zone.name
      }

      form.button("Time zone\n§9"+zone_text, "textures/ui/world_glyph_color_2x")
    };
    actions.push(() => {
      settings_time_zone(player, 0);
    });
  }

  // Button 4: Fullbright
  form.button("Fullbright\n" + (save_data[player_sd_index].fullbright ? "§aon" : "§coff"), (save_data[player_sd_index].fullbright ? "textures/items/potion_bottle_nightVision" : "textures/items/potion_bottle_empty"));
  actions.push(() => {
    if (!save_data[player_sd_index].fullbright) {
      save_data[player_sd_index].fullbright = true;
    } else {
      player.removeEffect("night_vision");
      save_data[player_sd_index].fullbright = false;
    }
    update_save_data(save_data);
  });

  // Button 5: Debug
  if (save_data[0].debug && save_data[player_sd_index].op) {
    form.button("Debug\n", "textures/ui/ui_debug_glyph_color");
    actions.push(() => debug_main(player));
  }

  // Button 6: Dictionary
  form.button("About\n", "textures/ui/infobulb");
  actions.push(() => dictionary_about_version(player));

  // Back to main menu

  if (main_menu_actions(player).length > 1) {
    form.button("");
    actions.push(() => main_menu(player));
  }

  form.show(player).then((response) => {
    if (response.selection !== undefined && actions[response.selection]) {
      actions[response.selection]();
    }
  });
}

/*------------------------
 Dictionary
-------------------------*/

function convertUnixToDate(unixSeconds, utcOffset) {
  const date = new Date(unixSeconds * 1000);
  const localDate = new Date(date.getTime() + utcOffset * 60 * 60 * 1000);

  // Format the date (YYYY-MM-DD HH:MM:SS)
  const year = localDate.getUTCFullYear();
  const month = String(localDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(localDate.getUTCDate()).padStart(2, '0');
  const hours = String(localDate.getUTCHours()).padStart(2, '0');
  const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(localDate.getUTCSeconds()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds} (UTC${utcOffset >= 0 ? '+' : ''}${utcOffset})`;
}

function dictionary_about_version(player) {
  let save_data = load_save_data()
  let form = new ActionFormData()
  var year = new Date().getFullYear()
  form.title("About")
  form.body(
    "Name: " + version_info.name + "\n" +
    "Version: " + version_info.version + "\n" +
    "Build date: " + convertUnixToDate(version_info.unix, save_data[0].utc) +

    "\n\n§7© 2022-"+ (year > 2024? year : "2025") + " TheFelixLive. All rights reserved."
  )
  form.button("");

  form.show(player).then((response) => {
    if (response.selection == 0) return settings_main(player);
  });
}




/*------------------------
 Debug
-------------------------*/

function debug_main(player) {
  let form = new ActionFormData()

  form.body("DynamicPropertyTotalByteCount: "+world.getDynamicPropertyTotalByteCount() +" of 32767 bytes used")
  form.button("§e\"save_data\" Editor");
  form.button("§aAdd player (save data)");
  form.button("§cRemove \"save_data\"");
  form.button("§cClose Server");
  form.button("");

  form.show(player).then((response) => {
    if (response.selection == 0) return debug_sd_editor(player, () => debug_main(player), []);
    if (response.selection == 1) return debug_add_fake_player(player);
    if (response.selection == 2) {world.setDynamicProperty("timerv:save_data", undefined); close_world()}
    if (response.selection == 3) {close_world()}
    if (response.selection == 4) return settings_main(player);
  });
}



function debug_sd_editor(player, onBack, path = []) {
  const save_data = load_save_data();

  let current = save_data;
  for (const key of path) {
    current = current[key];
  }

  const returnToCurrentMenu = () => debug_sd_editor(player, onBack, path);

  if (Array.isArray(current)) {
    const form = new ActionFormData()
      .title("Debug Editor v.1.0")
      .body(`Path: §7save_data/`);

    current.forEach((entry, idx) => {
      const label = idx === 0
        ? `Server [${idx}]`
        : `${entry.name ?? `Player ${idx}`} [${entry.id ?? idx}]`;
      form.button(label, "textures/ui/storageIconColor");
    });

    form.button(""); // Back

    form.show(player).then(res => {
      if (res.canceled) return;
      if (res.selection === current.length) {
        return onBack();
      }
      debug_sd_editor(
        player,
        returnToCurrentMenu,
        [...path, res.selection]
      );
    });

  // === B) Object-Branch ===
  } else if (current && typeof current === "object") {
    const keys = Object.keys(current);
    const displaySegments = path.map((seg, idx) => {
      if (idx === 0) {
        return seg === 0 ? "server" : save_data[Number(seg)]?.id ?? seg;
      }
      return seg;
    });
  const displayPath = `save_data/${displaySegments.join("/")}`;
    const form = new ActionFormData()
      .title("Debug Editor v.1.0")
      .body(`Path: §7${displayPath}`);

    keys.forEach(key => {
      const val = current[key];
      if (typeof val === "boolean") {
        form.button(
          `${key}\n${val ? "§aON" : "§cOFF"}`,
          val ? "textures/ui/toggle_on" : "textures/ui/toggle_off"
        );
      } else if (typeof val === "number") {
        form.button(`${key}: ${val}§r\n§9type: number`, "textures/ui/editIcon");
      } else if (typeof val === "string") {
        form.button(`${key}: ${val}§r\n§9type: string`, "textures/ui/editIcon");
      } else {
        form.button(`${key}`, "textures/ui/storageIconColor"); // verschachteltes Objekt/Array
      }
    });

    form.button(""); // Back

    form.show(player).then(res => {
      if (res.canceled) return;
      // 1. Back-Button?
      if (res.selection === keys.length) {
        return onBack();
      }

      // 2. Auswahl verarbeiten
      const key = keys[res.selection];
      const nextPath = [...path, key];
      const fresh = load_save_data();
      let target = fresh;
      for (const k of nextPath.slice(0, -1)) {
        target = target[k];
      }
      const val = target[key];
      if (typeof val === "boolean") {
        // Boolean-Toggle
        target[key] = !val;
        update_save_data(fresh);
        returnToCurrentMenu();

      } else if (typeof val === "number") {
        // Number-Editor
        openNumberEditor(
          player,
          val,
          nextPath,
          newVal => {
            target[key] = newVal;
            update_save_data(fresh);
            returnToCurrentMenu();
          },
          () => {
            console.log(`Number edit for ${key} canceled`);
          }
        );

      } else if (typeof val === "string") {
        // Text-Editor
        openTextEditor(
          player,
          val,
          nextPath,
          newText => {
            target[key] = newText;
            update_save_data(fresh);
            returnToCurrentMenu();
          },
          () => {
            console.log(`Text edit for ${key} canceled`);
          }
        );

      } else {
        // Tiefer verschachtelt → rekursiver Aufruf mit neuem onBack
        debug_sd_editor(player, returnToCurrentMenu, nextPath);
      }
    });
  }
}





function openNumberEditor(player, current, path, onSave, onCancel) {
  const displaySegments = path.map((seg, idx) => {
    if (idx === 0) {
      return seg === 0 ? "server" : save_data[Number(seg)]?.id ?? seg;
    }
    return seg;
  });
  const fullPath = `save_data/${displaySegments.join("/")}`;
  const form = new ModalFormData();
  form.title("Edit Number");
  form.slider(`Path: §7${fullPath} > Value`, 0, 100, 1, current);
  form.submitButton("Save");
  form.show(player).then(res => {
    if (res.canceled) {
      return onCancel();
    }
    onSave(res.formValues[0]);
  });
}

function openTextEditor(player, current, path, onSave, onCancel) {
  const displaySegments = path.map((seg, idx) => {
    if (idx === 0) {
      return seg === 0 ? "server" : save_data[Number(seg)]?.id ?? seg;
    }
    return seg;
  });
  const fullPath = `save_data/${displaySegments.join("/")}`;
  const form = new ModalFormData();
  form.title("Edit Text");
  form.textField(`Path: ${fullPath} > Value:`, "Enter text...", current);
  form.submitButton("Save");
  form.show(player).then(res => {
    if (res.canceled) {
      return onCancel();
    }
    onSave(res.formValues[0]);
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
  
  let newList = save_data.slice(1);
  
  newList.sort((a, b) => {
    const aInPlayers = playerIds.includes(a.id);
    const bInPlayers = playerIds.includes(b.id);
  
    if (aInPlayers && !bInPlayers) return -1;
    if (bInPlayers && !aInPlayers) return 1;
    return 0;
  });
  
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
  let save_data = load_save_data()
  form.title("Edit "+ selected_save_data.name +"'s permission");

  form.body("Name: " + selected_save_data.name + " (id: " + selected_save_data.id + ")\n" + "Language: " + ["English" /* Placeholder! */][selected_save_data.lang] + "\n" + online_text + "\n" + "Live actionbar: " + render_live_actionbar(selected_save_data, false) + ((selected_save_data.id == save_data[0].global.last_player_id && save_data[0].challenge.active) ? "§r§f\n\n§7Note: This save data cannot be managed because it is needed by the system due to the Challenge Mode.\n\n" : "\n\n")
  );

  if (selected_save_data.name !== viewing_player.name) {
    if (selected_save_data.op) {
      
      form.button("§cMake deop");
      actions.push(() => {
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
  
  if (!(selected_save_data.id == save_data[0].global.last_player_id && save_data[0].challenge.active)) {
    form.button("Manage save data");
    actions.push(() => {
      settings_rights_manage_sd(viewing_player, selected_save_data);
    });
  }
  
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
  let save_data = load_save_data();
  const form = new ActionFormData()
    .title(`${selected_save_data.name}'s save data`)
    .body("Select an option!")
    .button("§dReset save data")
    .button("§cDelete save data")
    .button("");

  form.show(viewing_player).then(response => {
    if (response.canceled) return -1;

    const is_reset = response.selection === 0;
    const is_delete = response.selection === 1;

    const is_global = response.selection < 2 &&
                      save_data[0].global.last_player_id === selected_save_data.id &&
                      save_data[0].global.status;

    if (is_global) {
      const player_sd_index = save_data.findIndex(entry => entry.id === viewing_player.id);

        const design_data = typeof save_data[player_sd_index].design === "number"
          ? design_template[save_data[player_sd_index].design].content
          : save_data[player_sd_index].design;
        const design = design_data.find(item => item.type === "ui");

        const own_time = apply_design(
          design,
          save_data[player_sd_index].time[
            save_data[player_sd_index].counting_type ? "timer" : "stopwatch"
          ]
        );

        const shared_form = new ActionFormData()
          .title("Shared timer")
          .body(
            `${selected_save_data.name} is currently sharing their timer. You must §cstop§f it${
              save_data[0].global.last_player_id !== viewing_player.id
                ? ` or §ereplace§f it with your own time (${own_time}§r§f)`
                : ""
            } to ${is_reset ? "reset" : "delete"} the save data.\n\n§7Required for challenge mode.\n\n`
          );

        const isSharing = (save_data[0].global.last_player_id === viewing_player.id);
        if (!isSharing) {
          shared_form.button("§eShare yours instead");
        }
        shared_form.button("§cDisable");
        shared_form.button("")

        shared_form.show(viewing_player).then(global_response => {
          if (global_response.canceled) return;

          const sel = global_response.selection;
          const reload = () => {
            save_data = load_save_data();
            selected_save_data = save_data.find(e => e.id === selected_save_data.id);
            handle_data_action(is_reset, is_delete, viewing_player, selected_save_data);
          };

          const shareIndex   = isSharing ? -1 : 0;
          const disableIndex = isSharing ? 0  : 1;
          const settingsIndex = disableIndex + 1;

          if (sel === shareIndex) {
            convert_local_to_global(viewing_player.id);
            reload();

          } else if (sel === disableIndex) {
            convert_global_to_local(true);
            reload();

          } else if (sel === settingsIndex) {
            settings_rights_manage_sd(viewing_player, selected_save_data);
          }
        });



    } else {
      handle_data_action(is_reset, is_delete, viewing_player, selected_save_data);
    }

    if (response.selection === 2) {
      settings_rights_data(viewing_player, selected_save_data);
    }
  });
}

function handle_data_action(is_reset, is_delete, viewing_player, selected_save_data) {
  const selected_player = world.getAllPlayers().find(p => p.id === selected_save_data.id);
  if (is_reset) {
    delete_player_save_data(selected_save_data);
    create_player_save_data(selected_save_data.id, selected_save_data.name);
    return settings_rights_main(viewing_player);
  }

  if (is_delete) {
    if (selected_player) {
      const confirm_form = new MessageFormData()
        .title("Online player information")
        .body(`Are you sure you want to remove ${selected_player.name}'s save data?\nThey must disconnect from the world!`)
        .button1("")
        .button2("§cKick & Delete");

      confirm_form.show(viewing_player).then(confirm => {
        if (confirm.selection === 1) {
          if (!world.getDimension("overworld").runCommand(`kick ${selected_player.name}`).successCount) {
            const host_form = new MessageFormData()
              .title("Host player information")
              .body(`${selected_player.name} is the host. To delete their data, the server must shut down.`)
              .button1("")
              .button2("§cShutdown & Delete");

            host_form.show(viewing_player).then(host => {
              if (host.selection === 1) {
                delete_player_save_data(selected_save_data);
                return close_world();
              } else {
                settings_rights_manage_sd(viewing_player, selected_save_data);
              }
            });
          } else {
            delete_player_save_data(selected_save_data);
            settings_rights_main(viewing_player);
          }
        } else {
          settings_rights_manage_sd(viewing_player, selected_save_data);
        }
      });

    } else {
      delete_player_save_data(selected_save_data);
      settings_rights_main(viewing_player);
    }
  }
}

function settings_type(player) {
  let form = new ActionFormData();
  form.title("Timer types");
  form.body("Select an option!");
  let save_data = load_save_data();

  let player_sd_index;

  if (save_data[0].global.status) {
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

  if (save_data[0].global.status) {
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

  form.button(
    "Change the look!\n" + render_live_actionbar(save_data[player_sd_index], false),
    "textures/ui/mashup_PaintBrush"
  );
  actions.push(() => {
    design_template_ui(player);
  });

  form.button(
    "Use actionsbar\n" + (save_data[player_sd_index].visibility ? "§aon" : "§coff"),
    save_data[player_sd_index].visibility ? "textures/ui/toggle_on" : "textures/ui/toggle_off"
  );
  actions.push(() => {
    save_data[player_sd_index].visibility = !save_data[player_sd_index].visibility;
    update_save_data(save_data);
    settings_actionbar(player);
  });

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

  if (save_data[player_sd_index].time_day_actionsbar || save_data[player_sd_index].counting_type == 3) {
    if (!save_data[0].sync_day_time) {
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

  
  let ui_preview = apply_design(design.find(d => d.type === "ui"), 634396901)
  let normal_preview = apply_design(design.find(d => d.type === "normal"), 634396901)
  let paused_preview = apply_design(design.find(d => d.type === "paused"), 634396901)

  let finished_preview = apply_design(design.find(d => d.type === "finished"), 634396901)
  let day_preview = apply_design(design.find(d => d.type === "day"), 19395.9)

  let screen_saver_preview = apply_design(design.find(d => d.type === "screen_saver"), 0)

  form.body("Here is a preview of your selected design. It shows all possible variable at ones.\n\nScreen saver:\n"+screen_saver_preview+"§r§f\n\nIn the menu:\n" + ui_preview + "§r§f\n\nNormal:\n" + normal_preview + "§r§f\n\nPaused:\n"+paused_preview+ "§r§f\n\nFinshied (CM only):\n" +finished_preview+ "§r§f\n\nDay-Time:\n" +day_preview+ "§r§f\n\nDo you like it?");

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

/*------------------------
 AFK
-------------------------*/

const AFK_THRESHOLD_MS = 15 * 1000;

// Speicher-Maps
const lastActivity   = new Map(); // timestamp der letzten Aktivität
const lastPosition   = new Map(); // letzte Position
const lastRotation   = new Map(); // letzte Rotation (yaw/pitch)
const isCurrentlyAFK = new Map(); // aktueller AFK-Status

/** Aktualisiert den Aktivitätszeitpunkt eines Spielers. */
function updateActivity(player) {
  lastActivity.set(player.name, Date.now());
}

/** Initialisiert Position, Rotation und Status eines Spielers. */
function initPlayer(player) {
  updateActivity(player);
  lastPosition.set(player.name, {
    x: player.location.x,
    y: player.location.y,
    z: player.location.z
  });
  // getRotation liefert { x: pitch, y: yaw }
  const rot = player.getRotation();
  lastRotation.set(player.name, {
    yaw: rot.y,
    pitch: rot.x
  });
  isCurrentlyAFK.set(player.name, false);
}

/** Prüft, ob ein Spieler AFK ist. */
function checkAFKStatus(player) {
  const last = lastActivity.get(player.name) ?? Date.now();
  return (Date.now() - last) > AFK_THRESHOLD_MS;
}

// 1) **Einmalige Initialisierung nach 60 Ticks**, um SP-Delay zu umgehen
system.runTimeout(() => {
  for (const player of world.getAllPlayers()) {
    initPlayer(player);
  }
}, 60);


// 3) **Respawn**: nur Initialisierung, keine Begrüßung
world.afterEvents.playerSpawn.subscribe(evt => {
  initPlayer(evt.player);
});

// 4) **Interaktionen** als Aktivität zählen
world.afterEvents.itemUse  .subscribe(evt => updateActivity(evt.source));
world.afterEvents.itemUseOn.subscribe(evt => updateActivity(evt.source));

// 5) **Bewegung & Drehung** pro Tick erfassen
system.runInterval(() => {
  for (const player of world.getAllPlayers()) {
    const name    = player.name;
    const currPos = player.location;
    const currRotRaw = player.getRotation();
    const currRot = { yaw: currRotRaw.y, pitch: currRotRaw.x };

    const prevPos = lastPosition.get(name);
    const moved = !prevPos
      || prevPos.x !== currPos.x
      || prevPos.y !== currPos.y
      || prevPos.z !== currPos.z;

    const prevRot = lastRotation.get(name);
    const rotated = !prevRot
      || prevRot.yaw   !== currRot.yaw
      || prevRot.pitch !== currRot.pitch;

    if (moved || rotated) {
      updateActivity(player);
      lastPosition.set(name, { x: currPos.x, y: currPos.y, z: currPos.z });
      lastRotation.set(name, currRot);
    }
  }
}, 1); // 1 Tick = 1/20 Sekunde

/*------------------------
 Update loop
-------------------------*/

function close_world() {
  world.sendMessage("Closing World! Auto Save is disabled! Please wait...");
  while (true) {}
}

function render_live_actionbar(selected_save_data, do_update) {
  const data = load_save_data();
  function calcAB(update, id, dayFormat) {
    const idx = data.findIndex(e => e.id === id);
    let counting_type, timevalue, timedata;

    if (data[0].global.status) {
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
            if (timedata.timer == 0) {
              if (data[0].challenge.progress == 1) {
                if (data[0].challenge.goal.pointer == 2 && data[0].challenge.goal.event_pos == 0) {
                  finished_cm_timer(1, [{text:"You did it! You persevered through the whole time and reached your goal!"}])
                } else {
                  finished_cm_timer(0, [{text:"The challenge is over because you went out of time. Thanks for playing."}])
                }
                return -1;
              } else {
                timedata.do_count = false;
              }
            }
          } else {
            timedata.stopwatch++;
          }
          update_save_data(data);
        }
        timevalue = { value: val, do_count: timedata.do_count };
    }

    if (counting_type === 3 || dayFormat) {
      if (data[idx].time_source === 1 || data[0].sync_day_time) {
        const TICKS = 24000, MILLIS_DAY = 86400000, START_OFFSET = 6 * 3600000;
        let now = new Date(),
        total = (now.getHours() + data[0].utc) * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000 + Math.floor(now.getMilliseconds() / 10) * 10,
        adj = total - START_OFFSET < 0 ? total - START_OFFSET + MILLIS_DAY : total - START_OFFSET,
        ticks = (adj / MILLIS_DAY) * TICKS;
        timevalue = { value: ticks, do_count: true };

        if (data[0].sync_day_time && do_update && (!data[0].challenge.active || (data[0].challenge.progress === 1 && data[0].time.do_count))) {
          world.setTimeOfDay(Math.floor(ticks));
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
    if (data[0].challenge.progress == 2) {
      d0 = selected_save_data.design.find(d => d.type === "finished")
    } else {
      d0 = tv.do_count 
        ? selected_save_data.design.find(d => d.type === "normal")
        : (tv.value === 0 
            ? selected_save_data.design.find(d => d.type === "screen_saver")
            : selected_save_data.design.find(d => d.type === "paused"));
  }
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
      let save_data = load_save_data();
      gesture_nod()
      gesture_jump()

      if (save_data[0].global.status) {
        render_live_actionbar(save_data[1], true)
      }

      if (save_data[0].sync_day_time) {
        world.gameRules.doDayLightCycle = false;
      } else {
        world.gameRules.doDayLightCycle = true;
      }


      if (save_data[0].challenge.progress == 1 && save_data[0].time.do_count) {
        enable_gamerules(!save_data[0].sync_day_time); 
        check_health("infinity")
      } else if (save_data[0].challenge.active) {
        disable_gamerules()
        check_health("resistance")
      }

      if (save_data[0].challenge.active) {
        check_difficulty()
      }




      for (const player of world.getAllPlayers()) {
        save_data = load_save_data();
        let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

        // AFK
        const wasAFK = isCurrentlyAFK.get(player.name) || false;
        const nowAFK = checkAFKStatus(player);

        if (!wasAFK && nowAFK) {
          // Went afk
          if (!save_data[0].global.status && save_data[player_sd_index].afk && save_data[player_sd_index].time.do_count) {
            save_data[player_sd_index].time.do_count = false;

            let key = save_data[player_sd_index].counting_type ? "timer" : "stopwatch";
            let delta = save_data[player_sd_index].counting_type ? 15 * 20 : -15 * 20;

            save_data[player_sd_index].time[key] += delta;

            if (save_data[player_sd_index].time[key] < 0) {
                save_data[player_sd_index].time[key] = 0;
            }

            update_save_data(save_data)
          }
          isCurrentlyAFK.set(player.name, true);
        } else if (wasAFK && !nowAFK) {
          // Came back
          if (!save_data[0].global.status && save_data[player_sd_index].afk && (!save_data[player_sd_index].time.do_count && save_data[player_sd_index].time[save_data[player_sd_index].counting_type ? "timer" : "stopwatch"] > 0)) {
            save_data[player_sd_index].time.do_count = true;
            update_save_data(save_data)
          }
          isCurrentlyAFK.set(player.name, false);
        }

        // Forceing gamemode (cm)
        if (save_data[0].challenge.active) {
          check_player_gamemode(player)
        }

        // Fullbrighe
        const nightVision = player.getEffect("night_vision");

        if (save_data[player_sd_index].fullbright &&(!nightVision || nightVision.duration < 205)) {
          player.addEffect("night_vision", 250, { showParticles: false });
        }



        if (save_data[player_sd_index].visibility == true) {
          player.onScreenDisplay.setActionBar(render_live_actionbar(save_data[player_sd_index], save_data[0].global.status ? false : true));
        }
        
      }


      await system.waitTicks(1);
    }
}

update_loop();