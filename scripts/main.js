import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"

const version_info = {
  name: "Timer V",
  version: "v.5.0.0",
  build: "A005",
  release_type: 2, // 0 = Development version (with debug); 1 = Beta version (with adds); 2 = Stable version
  unix: 1748467278,
  update_message_period_unix: 15897600, // Normally 6 months = 15897600
  changelog: {
    // new_features
    new_features: [
      "Survival and creativ are no longer separate",
      "An entire overhaul of the menu",
      "Over 80 new Goals have been added in addition to the existing Goals",
      "Taking advantage of the hardcore mode",
      "The actionbar can now completely changed with different designs",
      "The day time (realtime / gametime) can be displayed in the actionbar",
      "Player storage data (such as rights) can now be partially viewed, changed and deleted by admins even when that Player is offline"
    ],
    // general_changes
    general_changes: [
      "Added years & milisecounds as Time units (not all units have to be used from a design)",
      "Removed all §l/function§r commands",
      "The menu can opened with the sneak-jump (or in spectator with the nod) gesture, with a stick or §l/scriptevent timerv:menu§r",
      "The menu is now more stable and no longer prone to errors while opening",
      "The menu can now be used by multiple players at the same time",
      "The menu woun't change your gamemode as well as the condition",
      "You now get a summary in the menu what you setuped in challenge mode",
      "The menu music loops and fade into each other",
      "The Fulbright modification is now native, but can be adjusted individually for each player",
      "Custom Sound (formerly known as Custom Music) can be customized for each player and uses a new syntax (the old syntax is still available but not fully supported)",
      "Intelligent condition (formerly known as AFK Modification) now better detects whether you are AFK and is only available when you use your own timer",
      "Each player can now create their own \"timer\" to count down",
      "Native sound effects and menu music have been changed",
      "Shared timers can now be replaced or deactivated by other admins even if the original player is offline",
      "All Hardcore difficulties are now only available in Hardcore worlds",
      "Ultra Hardcore now disables all ways to regenerate hearts",
      "The timer can now convert old save data from v.4.1.0 or newer",
      "An update notification has been added",
      "Removed speedrun & dimension"
    ],
    // bug_fixes
    bug_fixes: [
      "Fixed a bug that allowed players to cheat by changing certain scoreboard entries",
      "Fixed a bug that allowed players to gain unwanted admin rights",
      "Fixed a bug that allowed players to drain all damage by quickly opening the menu",
      "Fixed a bug that caused a softlock if the menu doesn't close correctly",
      "Fixed a bug that caused the in game music to overlap with the music from the menu",
      "Fixed a bug that make totem of undying useless against infinity",
      "Fixed a bug that caused lost hearts to regenerate when pausing the timer in Hardcore",
      "Fixed a bug that makes the timer disappearing after pausing it in Hardcore",
      "Fixed a bug where the sound would not play when completing or losing a challenge"
    ]
  }
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
    icon: "textures/ui/raid_omen_effect",
    condition: () => true
  }
]

// These lists ARE customizable
const soundkeys = {

  // Music
  "music.menu.main": {
    extern: "timer.music.menu.main",
    extern_l: "timeru.music.menu_0",
    native: "music.menu",

    global: {
      extern: "timer.music.menu.main.global",
      extern_l: "timeru.music.menu_0",
      native: "music.overworld.cherry_grove"
    },

    challenge_progress_0: {
      extern: "timer.music.menu.main.challenge_progress_0",
      extern_l: "timeru.music.menu_0",
      native: "record.far"
    },

    challenge_progress_1: {
      extern: "timer.music.menu.main.challenge_progress_1",
      extern_l: "timeru.music.menu_1",
      native: "record.wait"
    },

    challenge_progress_2: {
      extern: "timer.music.menu.main.challenge_progress_2",
      extern_l: "timeru.music.menu_3",
      native: "record.otherside"
    }
    
  },
  "music.menu.difficulty": {
    extern: "timer.music.menu.difficulty",
    extern_l: "timeru.music.menu.difficulty",
    native: "record.cat",

    hardcore: {
      extern: "timer.music.menu.difficulty.hardcore",
      extern_l: "timeru.music.menu.difficulty",
      native: "music.game.nether"
    }
  },
  "music.menu.goal": {
    extern: "timer.music.menu.goal",
    extern_l: "timeru.music.menu.goal",
    native: "record.ward"
  },
  "music.menu.time": {
    extern: "timer.music.menu.time",
    extern_l: "timeru.music.menu.time",
    native: "record.creator"
  },
  "music.menu.dictionary": {
    extern: "timer.music.menu.dictionary",
    extern_l: "timeru.music.menu.help",
    native: "music.menu"
  },
  "music.menu.settings": {
    extern: "timer.music.menu.settings",
    native: "record.strad"
  },
  "music.menu.settings.debug": {
    extern: "timer.music.menu.settings.debug",
    native: "record.relic"
  },
  "music.menu.settings.time_zone": {
    extern: "timer.music.menu.settings.time_zone",
    native: "music.game.snowy_slopes"
  },
  "music.menu.settings.rights": {
    extern: "timer.music.menu.settings.rights",
    extern_l: "timeru.music.menu.permission",
    native: "music.overworld.snowy_slopes"
},
  "music.menu.settings.actionbar": {
    extern: "timer.music.menu.settings.actionbar",
    native: "music.menu"
  },
  "music.menu.settings.actionbar.design": {
    extern: "timer.music.menu.settings.actionbar.design",
    native: "music.overworld.grove"
  },

  // Soundeffects
  "menu.open": {
    extern: "timer.menu.open",
    extern_l: "timeru.menu.pop",
    native: "random.pop2"
  },
  "menu.close": {
    extern: "timer.menu.close",
    native: "" // When e.g. a Condition change occurs, the external audio is played in full and only after that the condition one plays. This is not available when the native version is used.
  },
  "condition.resumed": {
    extern: "timer.condition.resumed",
    extern_l: "timeru.continue",
    native: "step.amethyst_block"
  },
  "condition.paused": {
    extern: "timer.condition.paused",
    extern_l: "timeru.frozen",
    native: "resonate.amethyst_block"
  },
  "condition.expired": {
    extern: "timer.condition.expired",
    extern_l: "timeru.frozen",
    native: "resonate.amethyst_block"
  },
  "challenge.starts": {
    extern: "timer.condition.starts",
    extern_l: "timeru.reset_true",
    native: "random.levelup"
  },
  "challenge.end.good": {
    extern: "timer.challenge.end.good",
    extern_l: "timeru.win",
    native: "random.toast"
  },
  "challenge.end.bad": {
    extern: "timer.challenge.end.bad",
    extern_l: "timeru.type_death.target",
    native: "horn.call.7"
  },
  "message.beta.feedback": {
    extern: "timer.message.beta.feedback",
    native: "random.orb"
  },
};

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
    "id": "elder_guardian"
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
    name: version_info.version,
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
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: { singular: " year, ", plural: " years, " }, separator: { enabled: false } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
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
    name: "v.4.1.0 - v.4.2.2 (Speedrun)",
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ".", position: "after" } },
        { type: "marker", marker: "ms", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§l" },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ".", position: "after" } },
        { type: "marker", marker: "ms", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "paused", blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ".", position: "after" } },
          { type: "marker", marker: "ms", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
          { type: "text", text: " §7§o(frozen)" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time ->\n§l§7" },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ".", position: "after" } },
          { type: "marker", marker: "ms", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§lTimer §7V§r §f§oby TheFelixLive" }
      ]}
    ]
  },
  {
    name: "v.4.1.0 - v.4.2.2 (Hardcore)",
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§c" },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
          
      ]},
      { type: "paused", blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } },
          { type: "text", text: " §7§o(frozen)" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time ->\n§l§7" },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§lTimer §7V§r §f§oby TheFelixLive" }
      ]}
    ]
  },

  {
    name: "v.4.1.0 - v.4.2.2 (Enchant)",
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§9" },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
          
      ]},
      { type: "paused", blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } },
          { type: "text", text: " §7§o(frozen)" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time ->\n§l§7" },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§lTimer §7V§r §f§oby TheFelixLive" }
      ]}
    ]
  },
  {
    name: "v.4.1.0 - v.4.2.2 (Default)",
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
          
      ]},
      { type: "paused", blocks: [
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } },
          { type: "text", text: " §7§o(frozen)" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time ->\n§l§7" },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§lTimer §7V§r §f§oby TheFelixLive" }
      ]}
    ]
  },

  {
    name: "v.4.0.0 - v.4.0.1",
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "w", padZero: false, alwaysShow: false, suffix: "w", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§e" },
        { type: "marker", marker: "w", padZero: false, alwaysShow: false, suffix: "w", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
          
      ]},
      { type: "paused", blocks: [
          { type: "marker", marker: "w", padZero: false, alwaysShow: false, suffix: "w", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } },
          { type: "text", text: " §o§7(frozen)" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time ->\n§l§7" },
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: { singular: " year, ", plural: " years, " }, separator: { enabled: false } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§p§lTimer V §r§h§oLite§r" }
      ]}
    ]
  },
  {
    name: "v.3.3.0 - v.3.6.1",
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§b" },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
          
      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§7" },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } },
          { type: "text", text: " §f§o(frozen)" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time: §l§b" },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§b§lTimer V §o§3by TheFelixLive" }
      ]}
    ]
  },
  
  {
    name: "v.3.0.0 - v.3.2.2",
    content: [
      { type: "ui", blocks: [
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
          { type: "text", text: "§b§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§bTimer V§r is paused\n§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
          { type: "text", text: " <-" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§bTimer V§r is paused\n§l" },
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
          { type: "text", text: "§b§lTimer V §o§3by TheFelixLive" }
      ]}
    ]
  },
  /* // Work in progress!
  {
    name: "v.2.0.0 - v.2.2.0",
    content: [
      { type: "ui", blocks: [
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "marker", marker: "w", padZero: false, alwaysShow: false, suffix: { singular: " §eWeek§r ", plural: " §eWeeks§r " }, separator: { enabled: false }},

        { type: "marker", marker: "d", padZero: false, alwaysShow: "ifAllZero", suffix: { singular: " §eDay§r ", plural: " §eDays§r " }, separator: { enabled: false }},
        { type: "marker", marker: "d", padZero: false, alwaysShow: { condition: "ifGreater", units: ["w"] }, suffix: "§ed§r", separator: { enabled: true, value: " ", position: "after" } },

        { type: "marker", marker: "h", padZero: false, alwaysShow: "ifAllZero", suffix: { singular: " §eHour§r ", plural: " §eHours§r " }, separator: { enabled: false }},
        { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["w", "d"] }, suffix: "§eh§r", separator: { enabled: true, value: " ", position: "after" } },

        { type: "marker", marker: "m", padZero: false, alwaysShow: "ifAllZero", suffix: { singular: " §eMinute§r ", plural: " §eMinutes§r " }, separator: { enabled: false }},
        { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["w", "d", "h"] }, suffix: "§em§r", separator: { enabled: true, value: " ", position: "after" } },


        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: { singular: " §eSecond§r", plural: " §eSeconds§r" }, separator: { enabled: false }},
        { type: "marker", marker: "s", padZero: false, alwaysShow: { condition: "ifGreater", units: ["w", "d", "h", "m"] }, suffix: "§es§r", separator: { enabled: false }}
      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§bTimer V§r is paused\n§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
          { type: "text", text: " <-" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§bTimer V§r is paused\n§l" },
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
          { type: "text", text: "§3Waiting for instructions..." }
      ]}
    ]
  },
  */
  {
    name: "v.1.0.0",
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "§eh", separator: { enabled: true, value: "§r ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: true, suffix: "§em", separator: { enabled: true, value: "§r ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "§es", separator: { enabled: false } }
          
      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§o<§k____§r§o Timer paused §k____§r>" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time ->\n§l§7" },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§o<§k____§r§o Timer paused §k____§r>" }
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

let independent = true

system.afterEvents.scriptEventReceive.subscribe(event=> {
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === event.sourceEntity.id);

  if (event.id == "timerv:universel_updater") return universel_updater(event.sourceEntity, uu_find_gen())

  if (["timerv:reset"].includes(event.id)) {
    const notAvailableMsg = id => `§l§7[§f` + (independent? "System" : version_info.name) + `§7]§r ${id} is not available in stable releases!`;
    const noPermissionMsg = id => `§l§7[§f` + (independent? "System" : version_info.name) + `§7]§r ${id} could not be changed because you do not have permission!`;

    if (!save_data[player_sd_index].op) {
      player.sendMessage(noPermissionMsg(event.id));
      return;
    }

    if (version_info.release_type === 2) {
      player.sendMessage(notAvailableMsg(event.id));
      return;
    }
  }


/*------------------------
 Open the menu
-------------------------*/

  if (event.id === "timerv:menu") {
    event.sourceEntity.playSound(translate_soundkeys("menu.open", event.sourceEntity));
    event.sourceEntity.playMusic(translate_soundkeys("music.menu.main", event.sourceEntity), { fade: 0.3, loop: true });
    return main_menu(event.sourceEntity)
  }

  if (event.id === "timerv:api_menu") {
    let save_data = load_save_data()
    independent = false
    update_save_data(save_data)
    event.sourceEntity.playMusic(translate_soundkeys("music.menu.main", event.sourceEntity), { fade: 0.3, loop: true });
    return main_menu(event.sourceEntity)
  }

  if (event.id === "timerv:sd") {
    let save_data = load_save_data()
    console.log(JSON.stringify(save_data))
  }

  if (event.id === "timerv:menu_soundkey") {
    let version;
    if (event.message == "v1") {
      version = 1
    }
    if (event.message == "v2") {
      version = 2
    }
    event.sourceEntity.playSound(translate_soundkeys("menu.open", event.sourceEntity));
    event.sourceEntity.queueMusic(translate_soundkeys("music.menu.settings.debug", event.sourceEntity), { fade: 0.3, loop: true });
    return soundkey_test(event.sourceEntity, version)
  }
  
  
});


// via. item
world.beforeEvents.itemUse.subscribe(event => {
  let save_data = load_save_data()
	if (event.itemStack.typeId === "minecraft:stick" && independent) {
      system.run(() => {
        event.source.playSound(translate_soundkeys("menu.open", event.source));
        event.source.playMusic(translate_soundkeys("music.menu.main", event.source));
	      return main_menu(event.source)
      });
	}
});

// via. jump gesture
const gestureCooldowns = new Map();

async function gesture_jump() {
  const now = Date.now();

  for (const player of world.getAllPlayers()) {
    const lastUsed = gestureCooldowns.get(player.id) || 0;

    if (player.isSneaking && player.isJumping) {
      if (now - lastUsed >= 100) { // 2 Sekunden Cooldown
        if (independent) {
          player.playSound(translate_soundkeys("menu.open", player));
          player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
          main_menu(player);
        }
        gestureCooldowns.set(player.id, now);
        await system.waitTicks(10)
      }
    }
  }
}



// via. gesture
const playerHeadMovement = new Map();

async function gesture_nod() {
  const now = Date.now();
  let save_data = load_save_data()

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
      if (independent) {
        player.playSound(translate_soundkeys("menu.open", player));
        player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
        main_menu(player);
      }

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
    save_data = [
        {time: {stopwatch: 0, timer: 0, last_value_timer: 0, do_count: false},
        counting_type: 0,
        challenge: {active: world.isHardcore? true : false, progress: 0, rating: 0, goal: {pointer: 1, entity_pos: 0, event_pos: 0}, difficulty: world.isHardcore? 2 : 1},
        global: {status: world.isHardcore? true : false, last_player_id: undefined},
        sync_day_time: false,
        utc: 0,
        update_message_unix: (version_info.unix + version_info.update_message_period_unix)  }
    ]
    
    if (save_data.debug) {
      console.log("Creating save_data...");
    }

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

  save_data = save_data.filter(entry => entry.id !== player.id);
  update_save_data(save_data);
}



// Add player if not present
function create_player_save_data (playerId, playerName, modifier) {
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

      if (version_info.release_type === 0) {
        console.log(`Player ${playerName} (${playerId}) added with op=${shout_be_op}!`);
      }

      save_data.push({
          id: playerId,
          show_td_as_mode: false,
          time: {stopwatch: 0, timer: 0, last_value_timer: 0, do_count: false},
          custom_sounds: 0,
          afk: false,
          counting_type: 0,
          time_day_actionbar: false,
          allow_unnecessary_inputs: false,
          time_source: 0,
          name: playerName,
          op: shout_be_op,
          visibility: true,
          fullbright: false,
          lang: 0,
          design: 0,
          setup: shout_be_op ? 2 : 1,
          last_unix: Math.floor(Date.now() / 1000),
          health: 20, // is used to save the heart level only in hardcore mode e.g. during a break 
      });
  } else if (save_data[player_sd_index].name !== playerName) {
      save_data[player_sd_index].name = playerName;
  }

  const player_data = save_data[player_sd_index === -1 ? save_data.length - 1 : player_sd_index];
  
  for (let key in modifier) {
    if (player_data.hasOwnProperty(key)) {
      player_data[key] = modifier[key];
    }
  }

  update_save_data(save_data);
}


function getBestPlayerName(save_data) {
  const playerIds = world.getAllPlayers().map(player => player.id);
  const candidates = save_data.filter(entry => entry.op === true);

  const exactMatches = candidates.filter(entry => playerIds.includes(entry.id));
  if (exactMatches.length > 0) {
    return exactMatches[0].name;
  }

  const now = Date.now();
  let best = candidates[0];
  let bestDiff = Math.abs(best.last_unix * 1000 - now);

  for (let i = 1; i < candidates.length; i++) {
    const entry = candidates[i];
    const diff = Math.abs(entry.last_unix * 1000 - now);
    if (diff < bestDiff) {
      best = entry;
      bestDiff = diff;
    }
  }

  return best.name;
}

/*------------------------
Startup popups
-------------------------*/

world.afterEvents.playerJoin.subscribe(async({ playerId, playerName }) => {
  create_player_save_data(playerId, playerName);


  let save_data = load_save_data()
  let player;
  while (!player) {
    player = world.getAllPlayers().find(player => player.id == playerId)
    await system.waitTicks(20);
  }
  // I don't know why but in single player, the server is active about 60 ticks before the player of the server is reachable via getAllPlayers

  // Resets AFK
  let player_sd_index = save_data.findIndex(entry => entry.id === playerId);
  if (!save_data[0].global.status && save_data[player_sd_index].afk && (!save_data[player_sd_index].time.do_count && save_data[player_sd_index].time[save_data[player_sd_index].counting_type == 1 ? "timer" : "stopwatch"] > 0)) {
    save_data[player_sd_index].time.do_count = true;
    update_save_data(save_data)
  }

  if (version_info.release_type !== 2) {
    player.sendMessage("§l§7[§f" + (independent? "System" : version_info.name) + "§7]§r "+ save_data[player_sd_index].name +" how is your experiences with "+ version_info.version +"? Does it meet your expectations? Would you like to change something and if so, what? Do you have a suggestion for a new feature? Share it at §lgithub.com/TheFelixLive/Timer-Ultimate")
    player.playSound(translate_soundkeys("message.beta.feedback", player))
  }

  // Help reminder: how to open the menu
  if (save_data[player_sd_index].last_unix > (Math.floor(Date.now() / 1000) + 604800)) {
    player.sendMessage("§l§6[§eHelp§6]§r You can always open the menu with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick")
  }

  let gen = uu_find_gen()

  if (typeof(gen) === 'number' && save_data[player_sd_index].op) {
    return universel_updater(player, gen)
  }

  startup_popups(player)

});

function startup_popups(player) {
  let save_data = load_save_data()
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  // Update popup
  if (save_data[player_sd_index].op && (Math.floor(Date.now() / 1000)) > save_data[0].update_message_unix) {
    let form = new ActionFormData();
    form.title("Update time!");
    form.body("Your current version (" + version_info.version + ") is now "+ getRelativeTime(Math.floor(Date.now() / 1000) - version_info.unix) +" old.\nThere MIGHT be a newer version out. Feel free to update to enjoy the latest features!\n\nCheck out: §7github.com/TheFelixLive/Timer-Ultimate");
    form.button("Mute");

    const showForm = async () => {
      form.show(player).then((response) => {
        if (response.canceled && response.cancelationReason === "UserBusy") {
          showForm()
        } else {
          if (response.selection === 0) {
            save_data[0].update_message_unix = (Math.floor(Date.now() / 1000)) + version_info.update_message_period_unix;
            update_save_data(save_data);
          }
        }
      });
    };
    showForm();
  }

  if (save_data[player_sd_index].setup == 2) {
    if (independent) {
      let form = new ActionFormData();
      form.title("Initial setup");
      if (world.isHardcore) {
        form.body("Wellcome "+ save_data[player_sd_index].name + "!\n\This looks like your next hardcore adventure.\nBe aware that some features may work differently or may simply not be availablen\n§7Best regards, TheFelixLive (the developer)");
        form.button("Try Hardcore!");
        form.button("");
      } else {
        form.body("Wellcome "+ save_data[player_sd_index].name + "!\nAs you may recall, in previous versions you had the option to choose between Survival and Creative modes. These functions are now native and across the timer, making them less distinguishable.\nHowever, you can use these templates here in the setup to access the same functions as before!\n\n§7Best regards, TheFelixLive (the developer)");
        form.button("Survival mode");
        form.button("Creative mode");
        form.button("");
      }


      const showForm = async () => {
        form.show(player).then((response) => {
          if (response.canceled && response.cancelationReason === "UserBusy") {
            showForm()
          } else if (!response.canceled) {
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
              if (response.selection >= 0 && !Math.floor(Date.now() / 1000) > save_data[0].update_message_unix) {
                main_menu(player)
              }
            } else {
              save_data[player_sd_index].setup = 0
              update_save_data(save_data);
              if (!(Math.floor(Date.now() / 1000) > save_data[0].update_message_unix)) {
                main_menu(player)
              }
            }
          }
        });
      };
      showForm();
    } else {
      save_data[player_sd_index].setup = 0
      update_save_data(save_data);
    }
  }

  // Welcome screen
  if (save_data[player_sd_index].setup == 1) {
    if (independent) {
      let form = new ActionFormData();
      form.title("Initial setup");
      form.body("Wellcome "+ save_data[player_sd_index].name + "!\nDo you also think that this would be a good time to briefly introduce Timer V?\n\nWell, the timer should be pretty intuitive to use. That's why my recommendation is to try it rather than study it, just explore it yourself.\n\nIf this sounds a bit overwhelming, you can also ask "+ getBestPlayerName(save_data) +" or check out the guide at github.com/TheFelixLive/Timer-Ultimate");
      form.button("");

      player.sendMessage("§l§6[§eHelp§6]§r You can always open the menu with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick\n§l§8[§7Note§8]§r If you want to look at the guide but have forgotten the website, you can find it via §oMenu > (Settings >) About > Contact")

      const showForm = async () => {
        form.show(player).then((response) => {
          if (response.canceled && response.cancelationReason === "UserBusy") {
            showForm()
          } else if (!response.canceled) {
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
    } else {
      save_data[player_sd_index].setup = 0
      update_save_data(save_data);
    }
  }
}

world.afterEvents.playerLeave.subscribe(({ playerId, playerName }) => {
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === playerId);

  // When a player's sd gets removed he will kick out of the game triggering this...
  if (player_sd_index) {
    save_data[player_sd_index].last_unix = Math.floor(Date.now() / 1000)
    update_save_data(save_data);
  }
});

/*------------------------
  Universel Updater
-------------------------*/

function uu_find_gen() {
  let gen;
  if (world.scoreboard.getObjective("timer_settings")) {
    gen = 0
  }
  if (world.scoreboard.getObjective("timer_custom_music")) {
    gen = 1
  }
  return gen
}



function universel_updater(player, gen) {

  let gen_list = [
    "v.4.1.0 - v.4.2.2", // gen 0 (s)
    "v.4.1.0", // gen 1 (c)
  ]

  let form = new ActionFormData();
  form.title("Convert");
  form.body("It looks like you've used the timer before.\nDo you want to update your save data from "+ gen_list[gen] +" to "+ version_info.version +"?\n\n§7Note: Once you update your save data to a newer version, you can no longer use it with the older version!");
  form.button("§9Update");
  form.button("");
  form.show(player).then((response) => {
    if (response.selection == 1) {
      startup_popups(player)
    }
    if (response.selection == 0) {
      uu_apply_gen(gen, player)
    }
  })
}

// is something to improve
function uu_apply_gen(gen, player) {
  let note_message;

  // gen 0
  if (gen == 0) {

    const getScoreSafe = (objective, scoreName, defaultValue = 0) => {
      try {
        return objective.getScore(scoreName) || defaultValue;
      } catch (error) {
        console.error(`Error getting '${scoreName}' from '${objective}': `, error);
        return defaultValue;
      }
    };

    let settings = world.scoreboard.getObjective("timer_settings");
    let time = world.scoreboard.getObjective("timer_time");
    let old_goal = getScoreSafe(settings, "goal", 1);

    let stopwatchTime = getScoreSafe(settings, "shoud_count_down") === 0 
      ? (getScoreSafe(time, "ms") / 5 + getScoreSafe(time, "sec") * 20 + getScoreSafe(time, "min") * 20 * 60 + getScoreSafe(time, "h") * 20 * 60 * 60)
      : 0;

    let timerTime = getScoreSafe(settings, "shoud_count_down") === 1 
      ? (getScoreSafe(time, "ms") / 5 + getScoreSafe(time, "sec") * 20 + getScoreSafe(time, "min") * 20 * 60 + getScoreSafe(time, "h") * 20 * 60 * 60)
      : 0;

    let save_data = [{
      time: { stopwatch: stopwatchTime, timer: timerTime, last_value_timer: timerTime, do_count: getScoreSafe(settings, "do_count") === 1 },
      counting_type: getScoreSafe(settings, "shoud_count_down") === 1 ? 1 : 0,
      challenge: {
        active: true,
        progress: getScoreSafe(settings, "mode"),
        rating: getScoreSafe(settings, "reset_type") === 2 ? 1 : 0,
        goal: { pointer: old_goal === 8 ? 0 : old_goal < 5 ? 1 : 2, entity_pos: old_goal - 1, event_pos: old_goal === 5 ? 1 : 0 },
        difficulty: getScoreSafe(settings, "difficulty"),
      },
      global: { status: true, last_player_id: player.id },
      sync_day_time: false,
      utc: 0,
      update_message_unix: (version_info.unix + version_info.update_message_period_unix)
    }];

    try {
      update_save_data(save_data);
    } catch (error) {
      console.error("Error updating save data: ", error);
    }

    world.getAllPlayers().forEach(player => {
      try {
        create_player_save_data(player.id, player.name, {
          setup: 0,
          op: player.hasTag("trust_player_control"),
          custom_sounds: getScoreSafe(settings, "custom_music") === 1 ? 2 : 0,
          fullbright: getScoreSafe(settings, "night_vision") === 1
        });
        if (player.hasTag("trust_player_control")) player.removeTag("trust_player_control");
      } catch (error) {
        console.error(`Error processing player data for player ${player.name}: `, error);
      }
    });


    const objectives = [
      "timer_settings", 
      "timer_time", 
      "timer_menu", 
      "timer_addon", 
      "timer_actionbar_time", 
      "timer_show_actionbar"
    ];

    objectives.forEach(obj => {
      try {
        world.scoreboard.removeObjective(obj);
      } catch (error) {
        console.error("Error removing objective", obj, ": ", error);
      }
    });
    uu_gen_successfull(player, note_message)
  }

  if (gen == 1) {
    let totalPlayers = 0;
    let onlinePlayers = 0;

    world.scoreboard.getObjective("timer_time_ms").getParticipants().forEach(o => {
      if (o.type == "Player") {
        totalPlayers++;
        try {
          let entity = o.getEntity();
          if (entity && entity.id) {
            onlinePlayers++;
          }
        } catch (error) {
          // Entity nicht verfügbar – zählt nicht als online
        }
      }
    });

    let dataLossPercent = totalPlayers > 0
      ? Math.floor(((totalPlayers - onlinePlayers) / totalPlayers) * 100)
      : 0;

    if (dataLossPercent > 0) {
      let form = new ActionFormData();
      form.title("Convert");
      form.body(`This version contains save data for a total of ${totalPlayers} players, ${onlinePlayers} of which are online.\nOnly save data from players who are online can be transferred. This would result in a data loss of ${dataLossPercent} Percent!`);
      form.button("§9Update");
      form.button("");
      form.show(player).then((response) => {
        if (response.selection == 1) {
          startup_popups(player);
        }
        if (response.selection == 0) {
          gen_1();
        }
      });
    } else {
      gen_1();
    }

    function gen_1() {
      let afk = world.scoreboard.getObjective("timer_afk");
      let night_vision = world.scoreboard.getObjective("timer_night_vision");
      let custom_sounds = world.scoreboard.getObjective("timer_custom_music");
      let old_global = world.scoreboard.getObjective("timer_menu").getScore("host_mode");
      let do_count = world.scoreboard.getObjective("timer_do_count");
      let shoud_count_down = world.scoreboard.getObjective("timer_shoud_count_down").getScore("host");

      let time_ms = world.scoreboard.getObjective("timer_time_ms");
      let time_sec = world.scoreboard.getObjective("timer_time_sec");
      let time_min = world.scoreboard.getObjective("timer_time_min");
      let time_h = world.scoreboard.getObjective("timer_time_h");
      let time_d = world.scoreboard.getObjective("timer_time_d");

      let save_data = [{
        time: { stopwatch: shoud_count_down? 0 : (time_ms.getScore("host") / 5 + time_sec.getScore("host") * 20 + time_min.getScore("host") * 20 * 60 + time_h.getScore("host") * 20 * 60 * 60 + time_d.getScore("host") * 20 * 60 * 60 * 24), timer: shoud_count_down? (time_ms.getScore("host") / 5 + time_sec.getScore("host") * 20 + time_min.getScore("host") * 20 * 60 + time_h.getScore("host") * 20 * 60 * 60 + time_d.getScore("host") * 20 * 60 * 60 * 24) : 0, last_value_timer: shoud_count_down? (time_ms.getScore("host") / 5 + time_sec.getScore("host") * 20 + time_min.getScore("host") * 20 * 60 + time_h.getScore("host") * 20 * 60 * 60 + time_d.getScore("host") * 20 * 60 * 60 * 24) : 0, do_count: old_global == 1? do_count.getScore("host") == 1? true : false : false },
        counting_type: shoud_count_down? 1 : 0,
        global: { status: old_global == 1? true : false, last_player_id: world.getAllPlayers().find(player => {player.hasTag("target_host")})?.id || player.id},

        challenge: {active: false, progress: 0, rating: 0, goal: {pointer: 1, entity_pos: 0, event_pos: 0}, difficulty: world.isHardcore? 2 : 1},
        sync_day_time: false,
        utc: 0,
        update_message_unix: (version_info.unix + version_info.update_message_period_unix)
      }];

      try {
        update_save_data(save_data);
      } catch (error) {
        console.error("Error updating save data: ", error);
      }

      for (const player of world.getAllPlayers()) {
        try {
          create_player_save_data(player.id, player.name, {
            time: {do_count: do_count.getScore(player) == 1? true : false, timer: 0, last_value_timer: 0, stopwatch: (time_ms.getScore(player) / 5 + time_sec.getScore(player) * 20 + time_min.getScore(player) * 20 * 60 + time_h.getScore(player) * 20 * 60 * 60 + time_d.getScore(player) * 20 * 60 * 60 * 24)},
            counting_type: old_global == 2? 2 : 0,
            setup: 0,
            afk: afk.getScore(player) === 1 ? true : false,
            op: player.hasTag("trust_player_control")? true : false,
            custom_sounds: custom_sounds.getScore(player) === 1 ? 2 : 0,
            fullbright: night_vision.getScore(player) === 1 ? true : false,
          });
          if (player.hasTag("trust_player_control")) player.removeTag("trust_player_control");
        } catch (error) {
          console.error(`Error processing player data for player ${player.name}: `, error);
        }
      };


      const objectives = [
        "timer_night_vision",
        "timer_custom_music",
        "timer_afk", 
        "timer_menu",
        "timer_do_count",
        "timer_shoud_count_down", 
        "timer_time_ms",
        "timer_time_sec", 
        "timer_time_min",
        "timer_time_h", 
        "timer_time_d", 
        "timer_actionbar_time", 
        "timer_show_actionbar"
      ];

      objectives.forEach(obj => {
        try {
          world.scoreboard.removeObjective(obj);
        } catch (error) {
          console.error("Error removing objective", obj, ": ", error);
        }
      });
      uu_gen_successfull(player, note_message)
    }
  }

}

function uu_gen_successfull(player, note_message) {
  let form = new ActionFormData();
  form.title("Convert");
  form.body("It's done!\nYou can now enjoy the new "+ version_info.name + (note_message? "\n\n§7Note: " + note_message : ""));
  form.button("§9Changelog");
  form.button("");
  form.show(player).then((response) => {
    if (response.selection == 0) {
      player.playMusic(translate_soundkeys("music.menu.dictionary", player), { fade: 0.3, loop: true });
      return dictionary_about_version_changelog(player, convertUnixToDate(version_info.unix, save_data[0].utc))
    }
    if (response.selection == 1) {
      player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
      return main_menu(player)
    }
  })
}


/*------------------------
 general helper functions
-------------------------*/

function getRelativeTime(diff) {
  let seconds = diff;
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let months = Math.floor(days / 30);
  let years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''}`;
  }
  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''}`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  return `a few seconds`;
}

function translate_soundkeys(key, player) {
  const entry = soundkeys[key];
  if (!entry) return undefined;


  const save_data = load_save_data()
  const idx = save_data[save_data.findIndex(e => e.id === player.id)];
  let mode;

  if (idx.custom_sounds == 1) {
    mode = "extern"
  } else if (idx.custom_sounds == 2 && entry["extern_l"]) {
    mode = "extern_l"
  } else {
    mode = "native";
  }

  if (world.isHardcore && entry.hardcore) {
    return entry.hardcore[mode];
  }

  if (save_data[0].global.status && entry.global && !save_data[0].challenge.active) {
    return entry.global[mode];
  }

  if (save_data[0].challenge.active && save_data[0].challenge.progress == 0 && entry.challenge_progress_0) {
    return entry.challenge_progress_0[mode];
  }

  if (save_data[0].challenge.active && save_data[0].challenge.progress == 1 && entry.challenge_progress_1) {
    return entry.challenge_progress_1[mode];
  }

  if (save_data[0].challenge.active && save_data[0].challenge.progress == 2 && entry.challenge_progress_2) {
    return entry.challenge_progress_2[mode];
  }

  return entry[mode];
}
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
    t.playSound(translate_soundkeys("challenge.starts", t));
  });

  update_save_data(save_data);
  world.sendMessage("§l§7[§f"+ (independent? "System" : version_info.name) + "§7]§r The Challenge starts now!")
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
    t.playSound(translate_soundkeys(rating == 1? "challenge.end.good" : "challenge.end.bad", t));
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
    let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
    const health = player.getComponent("health");

    if (configuration == "infinity") {
      if (save_data[0].challenge.difficulty == 4) {
        player.applyDamage(health.currentValue - 1)
      }

      if (save_data[0].challenge.difficulty == 3) {
        player.applyDamage(health.currentValue - save_data[player_sd_index].health)
        save_data[player_sd_index].health = health.currentValue
      }
    } else if (configuration == "resistance" && health.currentValue > 0) {
      health.resetToMaxValue();
    }
    update_save_data(save_data)
  }

}

function render_task_list() {
  let save_data = load_save_data();
  const lines = [];

  // difficulty
  if (save_data[0].challenge.difficulty === 2) {
    lines.push({ text: "- §4Hard§ccore§f is active\n" });
  }
  if (save_data[0].challenge.difficulty === 3) {
    lines.push({ text: "- §cUltra §4Hardcore§f: A heart is lost forever\n" });
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
    lines.push({ text: "- §aSurvive:§f " + getRelativeTime(save_data[0].time.timer / 20) + "\n" });
  } else {
    // time available
    if (save_data[0].counting_type === 1) {
      lines.push({ text: "- §aTime available:§f " + getRelativeTime(save_data[0].time.timer / 20) + "§r§f\n" });
    }
    // goal event
    if (save_data[0].challenge.goal.pointer === 2) {
      lines.push({ text: "- §5Goal:§f " + goal_event[save_data[0].challenge.goal.event_pos].name + "§r§f\n" });
    }
  }

  return lines;
}

function enable_gamerules(doDayLightCycle) {
  world.gameRules.doDayLightCycle = doDayLightCycle;
  world.gameRules.playerssleepingpercentage = doDayLightCycle? 101 : 100;
  world.gameRules.doEntityDrops = true;
  world.gameRules.doFireTick = true;
  world.gameRules.doWeatherCycle = true;
  world.gameRules.doMobSpawning = true;
}

function disable_gamerules() {
  world.gameRules.doDayLightCycle = false;
  world.gameRules.playerssleepingpercentage = 101;
  world.gameRules.doEntityDrops = false;
  world.gameRules.doFireTick = false;
  world.gameRules.doWeatherCycle = false;
  world.gameRules.doMobSpawning = false;
}

world.afterEvents.dataDrivenEntityTrigger.subscribe((eventData) => {
    const entity = eventData.entity;
    const triggerId = eventData.eventId;

    let save_data = load_save_data()
    
    if (entity.typeId === "minecraft:villager_v2" && triggerId === "minecraft:start_celebrating" && save_data[0].challenge.progress == 1 && save_data[0].time.do_count && save_data[0].challenge.goal.pointer == 2 && save_data[0].challenge.goal.event_pos == 1) {
      finished_cm_timer(1, [{text: "You did it! You prevented the Raid and protected the village like a hero. Good Game!"}])
    }
});

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
  let timeValues = {};
  const allUnits = ["y","w","d","h","m","s","ms"];

  // 1) Zeit in Einheiten zerlegen
  if (design.type === "day") {
    // Tages-Modus bleibt unverändert
    const T = 24000, M = 86400000, O = 6 * 3600000;
    let rm = ((time / T) * M + O) % M;
    timeValues = {
      y: 0, w: 0, d: 0,
      h: Math.floor(rm / 3600000),
      m: Math.floor((rm % 3600000) / 60000),
      s: Math.floor((rm % 60000) / 1000),
      ms: Math.floor((rm % 1000) / 10)
    };
  } else {
    // Normale Zeit-Umrechnung über Millisekunden
    let remainingMs = (time / 20) * 1000;

    // Definition der Millisekunden pro Einheit
    const msPer = {
      y: 365.25 * 24 * 3600 * 1000,
      w:          7 * 24 * 3600 * 1000,
      d:              24 * 3600 * 1000,
      h:                   3600 * 1000,
      m:                        60 * 1000,
      s:                             1000,
      ms:                             10   // wir interpretieren ms-Wert als 10 ms-Einheit
    };

    // Welche Marker sind im Design definiert?
    const used = new Set();
    (design.blocks || []).forEach(b => {
      if (b.type === "marker" && allUnits.includes(b.marker)) {
        used.add(b.marker);
      }
    });

    // Jede Einheit von groß nach klein
    allUnits.forEach(u => {
      if (used.has(u)) {
        const val = Math.floor(remainingMs / msPer[u]);
        timeValues[u] = val;
        remainingMs -= val * msPer[u];
      } else {
        timeValues[u] = 0;
      }
    });
  }

  // 2) Marker-Logik: Werte zu Blocks mappen
  const proc = (design.blocks || []).map(b => {
    if (b.type === "marker") {
      const raw = String(timeValues[b.marker] || 0);
      const val = (b.padZero && raw.length === 1) ? "0" + raw : raw;
      const num = Number(val);
      let show = false, candidate = false;

      if (num !== 0) show = true;
      else if (b.alwaysShow === true || b.alwaysShow === "always") show = true;
      else if (b.alwaysShow === "ifAllZero") candidate = true;
      else if (typeof b.alwaysShow === "object" && b.alwaysShow.condition === "ifGreater") {
        const anyGreater = (b.alwaysShow.units || []).some(u => (timeValues[u] || 0) > 0);
        show = anyGreater;
      }

      return { ...b, value: val, show, ifAllZeroCandidate: candidate };
    }
    return b;
  });

  // 3) ifAllZero-Fallback: falls alle Marker 0 und some haben ifAllZero
  const allZero = !proc.some(b => b.type === "marker" && Number(b.value) !== 0);
  if (allZero) {
    proc.forEach((b, i) => {
      if (b.type === "marker" && b.ifAllZeroCandidate) proc[i].show = true;
    });
  }

  // 4) String-Zusammenbau
  let result = "";
  for (let i = 0; i < proc.length; i++) {
    const b = proc[i];
    if (b.type === "text") {
      result += b.text;
    }
    else if (b.type === "marker" && b.show) {
      // Separator „before“
      if (b.separator?.enabled && ["before","both"].includes(b.separator.position)) {
        const prev = proc.slice(0,i).some(x => x.type==="marker" && x.show);
        if (prev) result += b.separator.value;
      }
      // Wert + Suffix
      let suffix = "";
      if (typeof b.suffix === "string") {
        suffix = b.suffix;
      } else if (typeof b.suffix === "object") {
        const { singular, plural } = b.suffix;
        suffix = (Number(b.value) === 1 ? (singular || "") : (plural || ""));
      }
      result += b.value + suffix;
      // Separator „after“
      if (b.separator?.enabled && ["after","both"].includes(b.separator.position)) {
        const next = proc.slice(i+1).some(x => x.type==="marker" && x.show);
        if (next) result += b.separator.value;
      }
    }
  }

  // 5) Tages-Farblogik (nur bei type==="day")
  if (design.type === "day" && Array.isArray(design.colorConfig) && design.colorConfig.length >= 3) {
    const h = Number(timeValues.h), m = Number(timeValues.m);
    const tot = h * 60 + m;
    const color = tot < (4*60+30) || h >= 19
                ? design.colorConfig[0]
                : ((tot >= (4*60+30) && tot < (6*60)) || (h >= 17 && h < 19))
                ? design.colorConfig[1]
                : design.colorConfig[2];
    result = color + result;
  }

  return result;
}









/*------------------------
 Menus
-------------------------*/

function soundkey_test(player, version) {
  let form = new ActionFormData();
  let save_data = load_save_data()
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let actions = []
  form.title("soundkey_test")

  if (version == 1 || version == 2) {
    form.body("Select an sound you want to play!")
    for (const key in soundkeys) {
      const sound = soundkeys[key];
      
      if (version == 2 ? sound.extern : sound.extern_l) {
        form.button(version == 2 ? sound.extern : sound.extern_l, "textures/ui/sound_glyph_color_2x");
        actions.push(() => {
          player.playMusic(version == 2 ? sound.extern : sound.extern_l, { fade: 0.3});
          player.queueMusic(translate_soundkeys("music.menu.settings.debug", player), { fade: 0.3, loop: true });
          soundkey_test(player, version);
        });
      }

      for (const subKey in sound) {
        const subsound = sound[subKey];

        if (version == 2 ? subsound.extern : subsound.extern_l) {
          form.button(version == 2 ? subsound.extern : subsound.extern_l, "textures/ui/sound_glyph_color_2x");
          actions.push(() => {
            player.playMusic(version == 2 ? subsound.extern : subsound.extern_l, { fade: 0.3 });
            player.queueMusic(translate_soundkeys("music.menu.settings.debug", player), { fade: 0.3, loop: true });
            soundkey_test(player, version);
          });
        }
      }
    }
    form.button("");
    actions.push(() => {
      soundkey_test(player, undefined);
    });
  } else {
    form.body("Choose an interpret!")
    form.button("V2 (latest)");
    form.button("V1 (legacy)");

    actions.push(() => {
      soundkey_test(player, 2);
    });

    actions.push(() => {
      soundkey_test(player, 1);
    });

    if (version_info.release_type === 0 && save_data[player_sd_index].op) {
      form.button("");
      actions.push(() => {
        debug_main(player);
      });
    }
  }


  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (actions[response.selection]) {
      actions[response.selection]();
    }
  })

}

function main_menu_actions(player, form) {
  let actions = []
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)

  if (form) {
    if (save_data[0].challenge.active && save_data[0].challenge.progress == 1) {
      form.body({rawtext:[
        { text: "Here's a brief overview, what you have setup:\n" },
        ...render_task_list(),
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

      if (((timedata.counting_type == 0 || (timedata.counting_type == 1 & timedata.time.timer > 0)) && (!save_data[player_sd_index].afk || save_data[0].global.status || timedata.time[timedata.counting_type == 1 ? "timer" : "stopwatch"] == 0) &&  !save_data[0].challenge.active)  || (save_data[0].challenge.active && save_data[0].challenge.progress == 1 && (!world.isHardcore || world.isHardcore && save_data[player_sd_index].allow_unnecessary_inputs))) {
        if(form){form.button("Condition" + (world.isHardcore? " §o(experimental)§r\n" : "\n") + (timedata.time.do_count === true ? "§aresumed" : "§cpaused"), (timedata.time.do_count === true ? "textures/ui/toggle_on" : "textures/ui/toggle_off"))}
        actions.push(() => {
          player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
          if (timedata.time.do_count === false) {
            timedata.time.do_count = true;

            (save_data[0].global.status ? world.getAllPlayers() : [player]).forEach(t => {
              t.sendMessage("§l§2[§aCondition§2]§r The timer will resume!");
              if (t.id == player.id && save_data[player_sd_index].custom_sounds > 0) {
                player.queueMusic(translate_soundkeys("condition.resumed", t))
              } else {
                t.playSound(translate_soundkeys("condition.resumed", t));
              }

              if (world.isHardcore) {
                player.applyDamage(20 - save_data[player_sd_index].health)
              }
            });
          } else {
            timedata.time.do_count = false;

            (save_data[0].global.status ? world.getAllPlayers() : [player]).forEach(t => {
              t.sendMessage("§l§4[§cCondition§4]§r The timer is stopped!");
              if (t.id == player.id && save_data[player_sd_index].custom_sounds > 0) {
                player.queueMusic(translate_soundkeys("condition.paused", t))
              } else {
                t.playSound(translate_soundkeys("condition.paused", t));
              }

              if (world.isHardcore) {
                save_data[player_sd_index].health = player.getComponent("health").currentValue
              }
            });
          }
          update_save_data(save_data);
        });
      }
  
      if (timedata.time[timedata.counting_type == 1 ? "timer" : "stopwatch"] > 0 && !save_data[0].challenge.active) {
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

        if(form){form.button("§cReset "+(timedata.counting_type == 1 ? "timer" : "stopwatch"), "textures/ui/recap_glyph_color_2x")}
        actions.push(() => {
          timedata.time[timedata.counting_type == 1 ? "timer" : "stopwatch"] = 0;
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
        splash_end_challenge(player)
      });
    }

    if (challenge.progress === 2 && (isHardcore && challenge.rating === 1 || !isHardcore)) {
      if (form) form.button("§aStart over!", "textures/ui/recap_glyph_color_2x");

      actions.push(() => {
        if (challenge.rating === 1) {
          challenge.goal.pointer = 0;
        } else {
          save_data[0].time[timedata.counting_type == 1 ? "timer" : "stopwatch"] = 0;
          world.setTimeOfDay(0);
          world.getDimension("overworld").setWeather("Clear");
        }

        challenge.progress = 0;
        update_save_data(save_data);
        player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3 , loop: true});
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
        player.playMusic(translate_soundkeys("music.menu.goal", player), { fade: 0.3 , loop: true});
        settings_goals_main(player);
      });

      if (form) form.button("§cDifficulty\n" + difficulty[challenge.difficulty].name + "", difficulty[challenge.difficulty].icon);
      actions.push(() => {
        player.playMusic(translate_soundkeys("music.menu.difficulty", player), { fade: 0.3 , loop: true});
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
            timedata.time[timedata.counting_type == 1 ? "timer" : "stopwatch"]
          ),
          "textures/ui/color_plus"
        );
      }
      actions.push(() => {
        player.playMusic(translate_soundkeys("music.menu.time", player), { fade: 0.3, loop: true });
        settings_start_time(player);
      });
    }
  }


  if ((save_data[player_sd_index].time_day_actionbar == true || timedata.counting_type == 3) && save_data[0].challenge.progress !== 2) {
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

  if (save_data[player_sd_index].op && save_data[0].global.status && save_data[0].challenge.progress == 0 && !world.isHardcore && independent) {
    if(form){form.button("Challenge mode\n" + (save_data[0].challenge.active ? "§aon" : "§coff"), save_data[0].challenge.active ? "textures/ui/toggle_on" : "textures/ui/toggle_off")};
    actions.push(() => {
      splash_challengemode(player);
    });
  }

  // Button: Settings
  if(form){form.button("Settings\nShow more!", "textures/ui/automation_glyph_color")}
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
    settings_main(player);
  });

  // Button: Settings
  if (!independent) {
    if(form){form.button("")}
    actions.push(() => {
      player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      player.runCommand("/scriptevent timerv:api_menu_parent")
    });
  }


  return actions
}

function main_menu(player) {
  let form = new ActionFormData();
  let save_data = load_save_data()
  form.title("Main menu");

  let actions = main_menu_actions(player, form);

  if (actions.length == 1 && !save_data[0].challenge.active || (actions.length == 1 && save_data[0].challenge.active && save_data[0].challenge.progress !== 1)) return actions[0]();

  // Das Formular anzeigen und anhand des Indexes der sichtbaren Buttons die jeweilige Aktion ausführen
  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (actions[response.selection]) {
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
    if (response.canceled) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

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
      player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
    }
    return main_menu(player)
  });
}

function splash_start_challenge(player) {
  let form = new MessageFormData();

  form.title("Warning!");
  form.body({rawtext:[{text: "You are trying to start a challenge. Once a challenge is started, many settings are no longer available.\n\nHere's a brief overview:\n"}, ...render_task_list(), {text: "\n\n"}]});

  form.button2("§aStart");
  form.button1("");

  form.show(player).then((response) => {
    if (response.selection == 1) {
      player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      return start_cm_timer()
    }

    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }


    if (response.selection == 0) return main_menu(player);
  });
}

function splash_end_challenge(player) {
  let form = new MessageFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)

  form.title("Warning!");
  form.body({rawtext:[{text: "You are about to end a challenge.\nIf you complete the challenge this way, you will §llose all your progress" + (world.isHardcore? " and this World!§r" : "§r.")}]});

  form.button2("§cGive up");
  form.button1("");

  form.show(player).then((response) => {
    if (response.selection == 1) {
        player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
        finished_cm_timer(0, [{text:"The challenge is over. Time invested: "+ apply_design(
          (
            typeof save_data[player_sd_index].design === "number"
              ? design_template[save_data[player_sd_index].design].content
              : save_data[player_sd_index].design
          ).find(item => item.type === "ui"),
          (save_data[0].counting_type == 0? save_data[0].time.stopwatch : save_data[0].time.last_value_timer - save_data[0].time.timer)
        ) +" Thanks for playing."}])
    }

    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }


    if (response.selection == 0) return main_menu(player);
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
    (save_data[0].global.status ? save_data[0].global.last_player_id !== player.id ? save_data.find(e => e.id === save_data[0].global.last_player_id)?.name + " is currently sharing his timer. You can §cstop§f this or §ereplace§f it with your own time ("+ apply_design(design, save_data[player_sd_index].time[save_data[player_sd_index].counting_type == 1 ? "timer" : "stopwatch"]) + "§r§f)." : "" :
    
    "\nOnly admins can control it.") + "\n\n§7Required for challenge mode.\n\n");

  if (save_data[0].global.status) {
    if (save_data[0].global.last_player_id !== player.id) {
      form.button("§eShare yours instead");
      actions.push(() => {
        convert_global_to_local(true);
        convert_local_to_global(player.id);
        player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
      });
    }

    form.button("§cDisable");
    actions.push(() => {
      convert_global_to_local(true);
      player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
    });



  } else {
    form.button("§aEnable");
    actions.push(() => {
      convert_local_to_global(player.id)
      player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
    });
  }

  form.button("");
  actions.push(() => {});


  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (actions[response.selection]) {
      actions[response.selection]();
      main_menu(player);
    }
  });
  
}


/*------------------------
 Settings
-------------------------*/

function settings_start_time(player) {
  const save = load_save_data();
  const form = new ModalFormData().title(save[0].challenge.active ? "Start time" : "Change time");
  const idx  = save.findIndex(e => e.id === player.id);
  const sd   = save[save[0].global.status ? 0 : idx];
  const allow = save[idx].allow_unnecessary_inputs;

  const MS = {
    year:   365.25 * 24 * 60 * 60 * 1000,
    day:         24 * 60 * 60 * 1000,
    hour:             60 * 60 * 1000,
    minute:                60 * 1000,
    second:                     1000
  };

  let totalMs = sd.time[sd.counting_type == 1 ? "timer" : "stopwatch"] * 50;

  function decomp(ms) {
    let y = Math.floor(ms / MS.year); ms %= MS.year;
    let dTot = Math.floor(ms / MS.day); ms %= MS.day;
    let w = Math.floor(dTot / 7), d = dTot % 7;
    let h = Math.floor(ms / MS.hour); ms %= MS.hour;
    let m = Math.floor(ms / MS.minute); ms %= MS.minute;
    let s = Math.floor(ms / MS.second); ms %= MS.second;
    return { y, w, d, h, m, s, ms };
  }

  let time = decomp(totalMs);
  if (allow && totalMs > MS.year * 9) {
    let rem = totalMs - MS.year * 9;
    const weeks = Math.floor(rem / (7 * MS.day));
    rem -= weeks * 7 * MS.day;

    const days = Math.floor(rem / MS.day);
    rem -= days * MS.day;

    const hours = Math.floor(rem / MS.hour);
    rem -= hours * MS.hour;

    const minutes = Math.floor(rem / MS.minute);
    rem -= minutes * MS.minute;

    const seconds = Math.floor(rem / MS.second);
    rem -= seconds * MS.second;

    const ms = rem;

    if (ms < 951) {
      time = { y: 9, w: weeks, d: days, h: hours, m: minutes, s: seconds, ms };
    }
  }

  if (!allow) {
    const extraDays = Math.floor(time.y * 365.25) + time.w * 7;
    time.d += extraDays;
  }

  // Slider bauen
  if (allow) {
    form.slider("Years",        0,  9,   1, time.y);
    form.slider("Weeks",        0, 52,   1, time.w);
    form.slider("Days",         0,  6,   1, time.d);
  } else {
    form.slider("Days",         0, 30,   1, time.d);
  }
  form.slider("Hours",        0, 23,   1, time.h);
  form.slider("Minutes",      0, 59,   1, time.m);
  form.slider("Seconds",      0, 59,   1, time.s);
  if (allow) form.slider("Milliseconds",0,950,  50, time.ms);
  form.submitButton("Set & count down!");

  form.show(player).then(res => {
    if (res.canceled) return player.playMusic(translate_soundkeys("menu.close", player),{fade:0.3});
    let i=0, y=0, w=0, d=0;
    if (allow) { y=res.formValues[i++]; w=res.formValues[i++]; d=res.formValues[i++]; }
    else d=res.formValues[i++];
    const h=res.formValues[i++], m=res.formValues[i++], s=res.formValues[i++],
          ms=allow?res.formValues[i++]:0;
    const recomb = y*MS.year + w*7*MS.day + d*MS.day + h*MS.hour + m*MS.minute + s*MS.second + ms;
    const ticks = Math.floor(recomb/50);
    sd.time.timer = sd.time.last_value_timer = ticks;
    sd.counting_type = ticks>0?1:0;
    if (ticks===0 && save[0].challenge.active && save[0].challenge.goal.pointer===2 && save[0].challenge.goal.event_pos===0) {
      save[0].challenge.goal.pointer = 0;
    }
    update_save_data(save);
    player.playMusic(translate_soundkeys("music.menu.main", player),{fade:0.3,loop:true});
    return main_menu(player);
  });
}










function settings_difficulty(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)

  form.title("Difficulty");
  form.body("Select your difficulty!" + 
  (save_data[player_sd_index].allow_unnecessary_inputs? "" : "\n§7Note: " + (!world.isHardcore
    ? "Hardcore difficulties are only available if the world was started in hardcore."
    : "Easier difficulty levels are only available if you start the world normally.")));


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

  form.button("");

  form.show(player).then((response) => {
    if (response.canceled) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (response.selection >= 0 && response.selection < visibleDifficulties.length) {
      let selected = visibleDifficulties[response.selection];
      save_data[0].challenge.difficulty = selected.index;
      update_save_data(save_data);
    }

    player.playMusic(translate_soundkeys("music.menu.main", player), {fade: 0.3});
    return main_menu(player);
  });
}



async function settings_cs_setup(player) {
  const saveData = load_save_data();
  const idx = saveData.findIndex(e => e.id === player.id);

  const HEADER = "The setup process is now complete.";
  const tests = [
    {
      soundKey: "timer.test",
      saveValue: 1,
      resultMsg: `${HEADER}\nThe timer will now use custom sounds from the resource pack.`
    },
    {
      soundKey: "timeru.test",
      saveValue: 2,
      resultMsg: `${HEADER}\nYour resources pack only supports legacy custom music, so not all timer sounds can be replaced.`
    }
  ];

  let heard = false;
  let finalMsg = `${HEADER}\nUnder current conditions, custom sounds cannot be played.\n\n§7Check your resource pack compatibility and in-game music volume.`;

  for (const { soundKey, saveValue, resultMsg } of tests) {
    player.playMusic(soundKey, { fade: 0.5 });
    const resp = await new MessageFormData()
      .title("Custom Sounds - Setup")
      .body("Do you hear a test sound" + (saveValue == 2? " now" : "") + "?")
      .button2("§2Yes, there is a sound")
      .button1("§4No, silence")
      .show(player);

    if (resp.canceled) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (resp.selection === 1) {
      saveData[idx].custom_sounds = saveValue;
      update_save_data(saveData);
      finalMsg = resultMsg;
      heard = true;
      break;
    }
  }

  if (!heard) {
    saveData[idx].custom_sounds = 0;
    update_save_data(saveData);
  }

  player.playMusic(translate_soundkeys("music.menu.settings", player), {
    fade: 0.3,
    loop: true
  });
  await new ActionFormData()
    .title("Custom Sounds - Setup")
    .body(finalMsg)
    .button("")
    .show(player)
    .then((response) => {
      if (response.canceled) {
        return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      }
      settings_main(player);
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
    if (response.canceled) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection === 0) return settings_goals_select(player, "entity");
    if (response.selection === 1) return settings_goals_select(player, "event");
    if (response.selection === 2) {
      save_data[0].challenge.goal.pointer = 0;
      update_save_data(save_data);
      return settings_goals_main(player);
    }
    if (response.selection === 3) {
      player.playMusic(translate_soundkeys("music.menu.main", player), {fade: 0.3});
      return main_menu(player);
    } 
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
            isEvent? { text: goal.name } : {
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
    if (response.canceled) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
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
        player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
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
          player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
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
          player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
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
        player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
        settings_main(player);
      });
    });
  }




  // go back to settings
  form.button("");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
    settings_main(player);
});

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (actions[response.selection]) {
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
  if ((!save_data[0].global.status || (save_data[0].global.status && save_data[player_sd_index].op)) && ((save_data[0].challenge.active && save_data[0].challenge.progress == 0) || !save_data[0].challenge.active)) {
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
    actions.push(() => {
      settings_rights_main(player, true)
      player.playMusic(translate_soundkeys("music.menu.settings.rights", player), { fade: 0.3 , loop: true})
    });  
  }

  // Button 2: Actionbar
  form.button("Actionbar\n" + render_live_actionbar(save_data[player_sd_index], false), "textures/ui/brewing_fuel_bar_empty");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings.actionbar", player), { fade: 0.3 , loop: true})
    settings_actionbar(player)
  });

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
      player.playMusic(translate_soundkeys("music.menu.settings.time_zone", player), { fade: 0.3 , loop: true})
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
    settings_main(player);
  });


  // Button 5: Custom Sounds
  form.button("Custom Sounds\n" + (save_data[player_sd_index].custom_sounds > 0 ? save_data[player_sd_index].custom_sounds == 1 ? "§aon" : "§aon (legacy)" : "§coff"), save_data[player_sd_index].custom_sounds > 0 ? "textures/ui/toggle_on" : "textures/ui/toggle_off");
  actions.push(() => {
    if (save_data[player_sd_index].custom_sounds > 0) {
      save_data[player_sd_index].custom_sounds = 0
      update_save_data(save_data)
      player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3 , loop: true});
      settings_main(player)
    } else {
      settings_cs_setup(player)
    }
  });

  // Button 6: Experimental features
  if (version_info.release_type !== 2) {
    form.button("Experimental features\n" + (save_data[player_sd_index].allow_unnecessary_inputs ? "§aon" : "§coff"), "textures/ui/Add-Ons_Nav_Icon36x36");
    actions.push(() => {
      if (!save_data[player_sd_index].allow_unnecessary_inputs) {
        save_data[player_sd_index].allow_unnecessary_inputs = true;
      } else {
        save_data[player_sd_index].allow_unnecessary_inputs = false;
      }
      update_save_data(save_data);
      settings_main(player);
    });
  }

  // Button 7: Debug
  if (version_info.release_type === 0 && save_data[player_sd_index].op) {
    form.button("Debug\n", "textures/ui/ui_debug_glyph_color");
    actions.push(() => {
      debug_main(player);
      player.playMusic(translate_soundkeys("music.menu.settings.debug", player), { fade: 0.3 , loop: true})
    });
  }

  // Button 8: Dictionary
  form.button("About\n", "textures/ui/infobulb");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.dictionary", player), { fade: 0.3, loop: true });
    dictionary_about_version(player)
  });

  // Back to main menu

  if (main_menu_actions(player).length > 1) {
    form.button("");
    actions.push(() => {
      player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
      main_menu(player)
    });
  }

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (response.selection !== undefined && actions[response.selection]) {
      actions[response.selection]();
    }
  });
}

/*------------------------
 Dictionary
-------------------------*/

function convertUnixToDate(unixSeconds, utcOffset) {
  const date = new Date(unixSeconds*1000);
  const localDate = new Date(date.getTime() + utcOffset * 60 * 60 * 1000);

  // Format the date (YYYY-MM-DD HH:MM:SS)
  const year = localDate.getUTCFullYear();
  const month = String(localDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(localDate.getUTCDate()).padStart(2, '0');
  const hours = String(localDate.getUTCHours()).padStart(2, '0');
  const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(localDate.getUTCSeconds()).padStart(2, '0');
  
  return {
    day: day,
    month: month,
    year: year,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    utcOffset: utcOffset
  };
}

function dictionary_about_version(player) {
  let save_data = load_save_data()
  let form = new ActionFormData()
  let actions = []
  let build_date = convertUnixToDate(version_info.unix, save_data[0].utc);
  form.title("About")
  form.body(
    "Name: " + version_info.name + "\n" +
    "Version: " + version_info.version + ((Math.floor(Date.now() / 1000)) > (version_info.update_message_period_unix + version_info.unix)? " §a(update time)§r" : " (" + version_info.build + ")") + "\n" +
    "Release type: " + ["dev", "preview", "stable"][version_info.release_type] + "\n" +
    "Build date: " + `${build_date.day}.${build_date.month}.${build_date.year} ${build_date.hours}:${build_date.minutes}:${build_date.seconds} (UTC${build_date.utcOffset >= 0 ? '+' : ''}${build_date.utcOffset})` +

    "\n\n§7© 2022-"+ build_date.year + " TheFelixLive. All rights reserved."
  )

  if (version_info.changelog.new_features.length > 0 || version_info.changelog.general_changes.length > 0 || version_info.changelog.bug_fixes.length > 0) {
    form.button("§9Changelog");
    actions.push(() => {
      dictionary_about_version_changelog(player, build_date)
    });
  }

  form.button("§3Contact");
  actions.push(() => {
    dictionary_contact(player, build_date)
  });

  form.button("");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
    return settings_main(player);
  });

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection !== undefined && actions[response.selection]) {
      actions[response.selection]();
    }
  });
}

function dictionary_contact(player, build_date) {
  let form = new ActionFormData()
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  // Yes, that's right, you're not dumping the full "save_data". The player names are removed here for data protection reasons
  save_data = save_data.map(entry => {
    if ("name" in entry) {
      return { ...entry, name: "" };
    }
    return entry;
  });
  // and this adds information about the dump date and version to ensure whether a dump matches a bug
  save_data.push({ dump_unix:Math.floor(Date.now() / 1000), name:version_info.name, version:version_info.version, build:version_info.build });

  let actions = []
  form.title("Contact")
  form.body("If you need want to report a bug, need help, or have suggestions to improvements to the project, you can reach me via these platforms:\n\n§l§5Github:§r github.com/TheFelixLive/Timer-Ultimate/issues\n\n§8Curseforge:§r curseforge.com/projects/1259478");

  if (save_data[player_sd_index].op) {
    form.button("Dump SD" + (version_info.release_type !== 2? "\nvia. privat chat" : ""));
    actions.push(() => {
      player.sendMessage("§l§7[§f"+ (independent? "System" : version_info.name) + "§7]§r SD Dump:\n"+JSON.stringify(save_data))
      player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    });

    if (version_info.release_type !== 2) {
      form.button("Dump SD\nvia. server console");
      actions.push(() => {
        console.log(JSON.stringify(save_data))
        player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      });
    }
  }

  form.button("");
  actions.push(() => {
    dictionary_about_version(player, build_date)
  });

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection !== undefined && actions[response.selection]) {
      actions[response.selection]();
    }
  });
}

function dictionary_about_version_changelog(player, build_date) {
  let form = new ActionFormData()
  form.title("Changelog - "+version_info.version)
  let bodyText = "";
  if (version_info.changelog.new_features.length > 0) {
    bodyText += "§l§bNew Features§r\n\n";
    version_info.changelog.new_features.forEach(feature => {
      bodyText += `- ${feature}\n\n`;
    });
  }

  if (version_info.changelog.general_changes.length > 0) {
    bodyText += "§l§aGeneral Changes§r\n\n";
    version_info.changelog.general_changes.forEach(change => {
      bodyText += `- ${change}\n\n`;
    });
  }

  if (version_info.changelog.bug_fixes.length > 0) {
    bodyText += "§l§cBug fixes§r\n\n";
    version_info.changelog.bug_fixes.forEach(fix => {
      bodyText += `- ${fix}\n\n`;
    });
  }

  bodyText += `§7As of ${build_date.day}.${build_date.month}.${build_date.year} (`+ getRelativeTime(Math.floor(Date.now() / 1000) - version_info.unix) + " ago)";

  form.body(bodyText);
  form.button("");

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection == 0) {
      dictionary_about_version(player)
    }
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
  form.button("soundkey_test");
  form.button("");

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection == 0) return debug_sd_editor(player, () => debug_main(player), []);
    if (response.selection == 1) return debug_add_fake_player(player);
    if (response.selection == 2) {world.setDynamicProperty("timerv:save_data", undefined); close_world()}
    if (response.selection == 3) {close_world()}
    if (response.selection == 4) {return soundkey_test(player, undefined)};
    if (response.selection == 5) {
      player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
      return settings_main(player)
    };
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
      if (res.selection == undefined ) {
        return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      }
      // 1. Back-Button?
      if (res.selection === keys.length) {
        return onBack();
      }

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
            player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
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
            player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
          }
        );

      } else {
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
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    create_player_save_data(response.formValues[1], response.formValues[0])
    return debug_main(player)
  });
}

function settings_rights_main(player, came_from_settings) {
  let form = new ActionFormData();
  let save_data = load_save_data();

  form.title("Permissions");
  form.body("Select a player!");


  const players = world.getAllPlayers();
  const playerIds = players.map(player => player.id);
  
  let newList = save_data.slice(1);
  
  newList.sort((a, b) => {
    const now = Math.floor(Date.now() / 1000);

    const aOnline = playerIds.includes(a.id);
    const bOnline = playerIds.includes(b.id);

    const aOp = a.op;
    const bOp = b.op;

    const aLastSeen = now - a.last_unix;
    const bLastSeen = now - b.last_unix;

    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();

    if (aOnline && !bOnline) return -1;
    if (!aOnline && bOnline) return 1;

    if (aOnline && bOnline) {
      if (aOp && !bOp) return -1;
      if (!aOp && bOp) return 1;

      return aName.localeCompare(bName);
    }
    return aLastSeen - bLastSeen;
  });

  
  newList.forEach(entry => {
    const isOnline = playerIds.includes(entry.id);
    let displayName = entry.name;

    if (isOnline) {
      displayName += "\n§a(online)§r";
    } else {
      displayName += "\n§o(last seen " + getRelativeTime(Math.floor(Date.now() / 1000) - entry.last_unix) + " ago)§r";
    }

    if (entry.op) {
      form.button(displayName, "textures/ui/op");
    } else {
      form.button(displayName, "textures/ui/permissions_member_star");
    }
  });

  form.button("");

  if (newList.length == 1) {
    if (came_from_settings) {
      return settings_rights_data(player, newList[0]);
    } else {
      player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
      return settings_main(player);
    }
  }
  

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection === newList.length) {
      player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
      return settings_main(player);
    } else {
      return settings_rights_data(player, newList[response.selection]);
    }
  });
}

function settings_rights_data(viewing_player, selected_save_data) {
  let save_data = load_save_data()
  let selected_player = world.getAllPlayers().find(player => player.id == selected_save_data.id);
  let form = new ActionFormData();

  let body_text = "";

  body_text += "Name: " + selected_save_data.name + " (id: " + selected_save_data.id + ")\n";
  if (version_info.release_type === 0) {
    body_text += "Language: " + ["English" /* Placeholder! */][selected_save_data.lang] + "\n";
  }

  if (selected_player) {
      if (version_info.release_type === 0) {
          let memory_text = "";
          switch (selected_player.clientSystemInfo.memoryTier) {
              case 0:
                  memory_text = "Client Total Memory: Under 1.5 GB (Super Low)";
                  break;
              case 1:
                  memory_text = "Client Total Memory: 1.5 - 2.0 GB (Low)";
                  break;
              case 2:
                  memory_text = "Client Total Memory: 2.0 - 4.0 GB (Mid)";
                  break;
              case 3:
                  memory_text = "Client Total Memory: 4.0 - 8.0 GB (High)";
                  break;
              case 4:
                  memory_text = "Client Total Memory: Over 8.0 GB (Super High)";
                  break;
          }

          let input_text = "";
          switch (selected_player.inputInfo.lastInputModeUsed) {
              case "Gamepad":
                  input_text = "Input: Gamepad";
                  break;
              case "KeyboardAndMouse":
                  input_text = "Input: Mouse & Keyboard";
                  break;
              case "MotionController":
                  input_text = "Input: Motion controller";
                  break;
              case "Touch":
                  input_text = "Input: Touch";
                  break;
          }

          body_text += "Online: yes\n";
          body_text += "Platform: " + selected_player.clientSystemInfo.platformType + "\n";
          body_text += memory_text + "\n";
          body_text += input_text + "\n";

      } else {
          body_text += "Online: yes\n";
      }

  } else {
      body_text += "Online: no §7(last seen " + getRelativeTime(Math.floor(Date.now() / 1000) - selected_save_data.last_unix) + " ago)§r\n";
  }

  body_text += "Live actionbar: " + render_live_actionbar(selected_save_data, false);

  if (selected_save_data.id == save_data[0].global.last_player_id && save_data[0].challenge.active) {
      body_text += "§r§f\n\n§7Note: This save data cannot be managed because it is needed by the system due to the Challenge Mode.\n\n";
  } else {
      body_text += "\n\n";
  }

  form.body(body_text);
  let actions = [];

  if (selected_save_data.id !== viewing_player.id) {
    form.title("Edit "+ selected_save_data.name +"'s permission");
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
        form.body("Your are trying to add op advantages to "+selected_save_data.name+". With them he would be able to:\n\n- Mange other and your OP status\n- Mange Timer modes\n- Mange save data\n- Could delete the timer!\n\nAre you sure you want to add them?\n ");
        form.button1("");
        form.button2("§aMake op");
        form.show(viewing_player).then((response) => {
          if (response.selection == undefined ) {
            return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
          }
          if (response.selection == 1) {
            let player_sd_index = save_data.findIndex(entry => entry.id === selected_save_data.id)
            save_data[player_sd_index].op = true
            selected_save_data = save_data[player_sd_index]
            update_save_data(save_data);
          }

          return settings_rights_data(viewing_player, selected_save_data)
        });
      });

    }
  } else {
    form.title("Edit your permission");
  }
  
  if (!(selected_save_data.id == save_data[0].global.last_player_id && save_data[0].challenge.active)) {
    form.button("Manage save data");
    actions.push(() => {
      settings_rights_manage_sd(viewing_player, selected_save_data);
    });
  }
  
  form.button("");
  actions.push(() => {
    settings_rights_main(viewing_player, false);
  });

  form.show(viewing_player).then((response) => {
    if (response.selection == undefined ) {
      return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
    }
    if (actions[response.selection]) {
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
    if (response.selection == undefined ) {
      return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
    }

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
            save_data[player_sd_index].counting_type == 1 ? "timer" : "stopwatch"
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
          if (global_response.selection == undefined ) {
            return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
          }

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
    return settings_rights_main(viewing_player, false);
  }

  if (is_delete) {
    if (selected_player) {
      const confirm_form = new MessageFormData()
        .title("Online player information")
        .body(`Are you sure you want to remove ${selected_player.name}'s save data?\nThey must disconnect from the world!`)
        .button1("")
        .button2("§cKick & Delete");

      confirm_form.show(viewing_player).then(confirm => {
        if (confirm.selection == undefined ) {
          return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
        }
        if (confirm.selection === 1) {
          if (!world.getDimension("overworld").runCommand(`kick ${selected_player.name}`).successCount) {
            const host_form = new MessageFormData()
              .title("Host player information")
              .body(`${selected_player.name} is the host. To delete their data, the server must shut down. This usually takes 5 seconds`)
              .button1("")
              .button2("§cShutdown & Delete");

            host_form.show(viewing_player).then(host => {
              if (host.selection == undefined ) {
                return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
              }
              if (host.selection === 1) {
                delete_player_save_data(selected_save_data);
                return close_world();
              } else {
                settings_rights_manage_sd(viewing_player, selected_save_data);
              }
            });
          } else {
            delete_player_save_data(selected_save_data);
            settings_rights_main(viewing_player, false);
          }
        } else {
          settings_rights_manage_sd(viewing_player, selected_save_data);
        }
      });

    } else {
      delete_player_save_data(selected_save_data);
      settings_rights_main(viewing_player, false);
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

  form.button("");

  form.show(player).then((response) => {
    if (response.selection === undefined) return -1;

    let selectedIndex = validSelections[response.selection];
    if (selectedIndex === undefined) {
      return settings_main(player);
    }

    if ((save_data[player_sd_index].counting_type === 0 || save_data[player_sd_index].counting_type === 1) &&
        save_data[player_sd_index].time.do_count && 
        save_data[player_sd_index].counting_type !== selectedIndex) {
      return settings_type_info(player, response);
    }

    save_data[player_sd_index].counting_type = selectedIndex;
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
  form.body("Your "+ (save_data[player_sd_index].counting_type == 1 ? "timer" : "stopwatch") +" is not paused! If you change now the mode to "+ (timer_modes[response.selection].label) +" it will be paused!");
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

  form.title("Actionbar");
  form.body("Select an option!");

  form.button(
    "Change the look!\n" + render_live_actionbar(save_data[player_sd_index], false),
    "textures/ui/mashup_PaintBrush"
  );
  actions.push(() => {
    design_template_ui(player);
    player.playMusic(translate_soundkeys("music.menu.settings.actionbar.design", player), { fade: 0.3, loop: true });
  });

  form.button(
    "Use actionbar\n" + (save_data[player_sd_index].visibility ? "§aon" : "§coff"),
    save_data[player_sd_index].visibility ? "textures/ui/toggle_on" : "textures/ui/toggle_off"
  );
  actions.push(() => {
    save_data[player_sd_index].visibility = !save_data[player_sd_index].visibility;
    update_save_data(save_data);
    settings_actionbar(player);
  });

  if (save_data[player_sd_index].counting_type !== 3) {
    form.button(
      "Show day time\n" + (save_data[player_sd_index].time_day_actionbar ? "§aon" : "§coff"),
      save_data[player_sd_index].time_day_actionbar ? "textures/ui/toggle_on" : "textures/ui/toggle_off"
    );
    actions.push(() => {
      save_data[player_sd_index].time_day_actionbar = !save_data[player_sd_index].time_day_actionbar;
      update_save_data(save_data);
      settings_actionbar(player);
    });
  }

  if (save_data[player_sd_index].time_day_actionbar || save_data[player_sd_index].counting_type == 3) {
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
    player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
    settings_main(player);
  });

  form.show(player).then(response => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
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

  form.title("Design actionbar");
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
    let buttonText = design.name + "\n" // + (apply_design(design.content.find(d => d.type === "screen_saver"), 0)+ " "); // Looks a bit off
    if (JSON.stringify(design.content) === JSON.stringify(currentDesign) || (!hasMatchingDesign && design.content === undefined)) {
      buttonText += "§r§2(selected)";
    }
    form.button(buttonText);
  });

  form.button("");

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection === sortedDesigns.length) {
      player.playMusic(translate_soundkeys("music.menu.settings.actionbar", player), { fade: 0.3, loop: true });
      return settings_actionbar(player);

    } else {
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

  form.title("Design actionbar");

  let ui_preview = apply_design(design.find(d => d.type === "ui"), 660822121.4)
  let normal_preview = apply_design(design.find(d => d.type === "normal"), 660822121.4)
  let paused_preview = apply_design(design.find(d => d.type === "paused"), 660822121.4)

  let finished_preview = apply_design(design.find(d => d.type === "finished"), 660822121.4)
  let day_preview = apply_design(design.find(d => d.type === "day"), 19395.9)

  let screen_saver_preview = apply_design(design.find(d => d.type === "screen_saver"), 0)

  form.body("Here is a preview of your selected design. It shows all possible variable at ones.\n\nScreen saver:\n"+screen_saver_preview+"§r§f\n\nIn the menu:\n" + ui_preview + "§r§f\n\nNormal:\n" + normal_preview + "§r§f\n\nPaused:\n"+paused_preview+ "§r§f\n\nFinshied (CM only):\n" +finished_preview+ "§r§f\n\nDay-Time:\n" +day_preview+ "§r§f\n\nDo you like it?");

  form.button("§aApply!");
  

  form.button("");

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (response.selection == 0) {

      if (is_custom) {
        save_data[player_sd_index].design = design
      } else {
        save_data[player_sd_index].design = design_template.findIndex(d => d.content === design)
      }

      update_save_data(save_data);
      player.playMusic(translate_soundkeys("music.menu.settings.actionbar", player), { fade: 0.3, loop: true });
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
const lastActivity   = new Map();
const lastPosition   = new Map();
const lastRotation   = new Map();
const isCurrentlyAFK = new Map();

function updateActivity(player) {
  lastActivity.set(player.id, Date.now());
}

function initPlayer(player) {
  updateActivity(player);
  lastPosition.set(player.id, {
    x: player.location.x,
    y: player.location.y,
    z: player.location.z
  });
  const rot = player.getRotation();
  lastRotation.set(player.id, {
    yaw: rot.y,
    pitch: rot.x
  });
  isCurrentlyAFK.set(player.id, false);
}

function checkAFKStatus(player) {
  const last = lastActivity.get(player.id) ?? Date.now();
  return (Date.now() - last) > AFK_THRESHOLD_MS;
}

system.runTimeout(() => {
  for (const player of world.getAllPlayers()) {
    initPlayer(player);
  }
}, 60);


world.afterEvents.playerSpawn.subscribe(evt => {
  initPlayer(evt.player);
});

world.afterEvents.itemUse  .subscribe(evt => updateActivity(evt.source));
world.afterEvents.itemUseOn.subscribe(evt => updateActivity(evt.source));

system.runInterval(() => {
  for (const player of world.getAllPlayers()) {
    const name    = player.id;
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
    if (selected_save_data.time_day_actionbar)
      d1 = selected_save_data.design.find(d => d.type === "day");
  } else {
    d0 = selected_save_data.design.find(d => d.type === "day");
  }
  
  return d1 
    ? apply_design(d0, tv.value) + " §r§f| " + apply_design(d1, calcAB(true, selected_save_data.id, true).value)
    : apply_design(d0, tv.value);
}

function calcAB(update, id, dayFormat) {
  const data = load_save_data();
  let idx = data.findIndex(e => e.id === id);
  let counting_type, timevalue, timedata;

  if (data[0].global.status) {
    counting_type = data[0].counting_type
    timedata = data[0].time
    // Prevent conting on dedicated server if no player is online
    if (!world.getAllPlayers()) {
      update = false
    }
  } else {
    counting_type = data[idx].counting_type
    timedata = data[idx].time
  }
  


  if (counting_type === 2) {
    timevalue = { value: system.currentTick, do_count: true };
  }
  
  
  if (counting_type === 0 || counting_type === 1) {
      let val = timedata[counting_type === 0 ? "stopwatch" : "timer"];
      if (update && timedata.do_count && !dayFormat) {
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
              if (data[0].global.status) {
                world.getAllPlayers().forEach(player => {
                  idx = data.findIndex(e => e.id === player.id);
                  player.sendMessage("§l§4[§cCondition§4]§r The timer expired after "+ apply_design((typeof data[idx].design === "number" ? design_template[data[idx].design].content : data[idx].design).find(item => item.type === "ui"), timedata.last_value_timer - timedata.timer) + " and has been paused")

                  player.onScreenDisplay.setTitle("§4Timer expired")
                  player.playSound(translate_soundkeys("condition.expired", player))
                });
              } else {
                let player = world.getAllPlayers().find(player => player.id == id)
                player.sendMessage("§l§4[§cCondition§4]§r The timer expired after "+ apply_design((typeof data[idx].design === "number" ? design_template[data[idx].design].content : data[idx].design).find(item => item.type === "ui"), timedata.last_value_timer - timedata.timer) + " and has been paused")
                player.onScreenDisplay.setTitle("§4Timer expired")
                player.playSound(translate_soundkeys("condition.expired", player))
              }
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

      if (data[0].sync_day_time && update && (!data[0].challenge.active || (data[0].challenge.progress === 1 && data[0].time.do_count))) {
        world.setTimeOfDay(Math.floor(ticks));
      }
          
    } else {
      timevalue = { value: world.getTimeOfDay(), do_count: true };
    }
  }
  return timevalue;
}




async function update_loop() {
    while (true) {
      let save_data = load_save_data();
      gesture_nod()
      gesture_jump()

      if (save_data[0].global.status) {
        calcAB(true, undefined, false)
      }

      if (save_data[0].sync_day_time) {
        world.gameRules.doDayLightCycle = false;
        world.gameRules.playerssleepingpercentage = 101;
      } else {
        world.gameRules.doDayLightCycle = true;
        world.gameRules.playerssleepingpercentage = 100;
      }


      if (save_data[0].challenge.progress == 1 && save_data[0].time.do_count) {
        enable_gamerules(!save_data[0].sync_day_time); 
        check_health("infinity")
      } else if (save_data[0].challenge.active) {
        disable_gamerules()
        if (world.isHardcore) {
          check_health("resistance")
        }
      }

      if (save_data[0].challenge.active) {
        check_difficulty()
      }




      for (const player of world.getAllPlayers()) {
        save_data = load_save_data();
        let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

        // AFK
        const wasAFK = isCurrentlyAFK.get(player.id) || false;
        const nowAFK = checkAFKStatus(player);

        if (!wasAFK && nowAFK) {
          // Went afk
          if (!save_data[0].global.status && save_data[player_sd_index].afk && save_data[player_sd_index].time.do_count) {
            save_data[player_sd_index].time.do_count = false;

            let key = save_data[player_sd_index].counting_type == 1 ? "timer" : "stopwatch";
            let delta = save_data[player_sd_index].counting_type ? 15 * 20 : -15 * 20;

            save_data[player_sd_index].time[key] += delta;

            if (save_data[player_sd_index].time[key] < 0) {
                save_data[player_sd_index].time[key] = 0;
            }

            update_save_data(save_data)
          }
          isCurrentlyAFK.set(player.id, true);
        } else if (wasAFK && !nowAFK) {
          // Came back
          if (!save_data[0].global.status && save_data[player_sd_index].afk && (!save_data[player_sd_index].time.do_count && save_data[player_sd_index].time[save_data[player_sd_index].counting_type == 1 ? "timer" : "stopwatch"] > 0)) {
            save_data[player_sd_index].time.do_count = true;
            update_save_data(save_data)
          }
          isCurrentlyAFK.set(player.id, false);
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