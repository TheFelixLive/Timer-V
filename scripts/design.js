import { load_save_data, update_save_data } from "./helper_function.js";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"
import { version_info } from "./version.js";
import { translate_soundkeys } from "./sound";
import { translate_textkeys } from "./lang.js";
import { settings_main } from "./menu.js";
import { render_live_actionbar } from "./main.js";


/*------------------------
  Design Template
-------------------------*/

export const design_template = [
  {
    // The "ms" marker isn't used here, but it works perfectly. Simply because I don't like it.
    name: version_info.version,
    id: 0,
    edition: [0],
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
    id: 1,
    edition: [0],
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
    id: 2,
    edition: [0],
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
          { type: "text", text: "§lTimer §7V §4[§cHardcore Mode§4]§r §f§oby TheFelixLive" }
      ]}
    ]
  },

  {
    name: "v.4.1.0 - v.4.2.2 (Enchant)",
    id: 3,
    edition: [0],
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
          { type: "text", text: "§9Timer V §b§oby TheFelixLive" }
      ]}
    ]
  },
  {
    name: "v.4.1.0 - v.4.2.2 (Default)",
    id: 4,
    edition: [0],
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
    id: 5,
    edition: [0],
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
    id: 6,
    edition: [0],
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
    id: 7,
    edition: [0],
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
  {
    name: "v.2.0.0 - v.2.2.0",
    id: 8,
    edition: [0],
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "w", largest: true, padZero: false, suffixFull: { singular: " week ",  plural: " weeks "  }, suffixAbbr: "w "},
        { type: "marker", marker: "d", largest: true, padZero: false, suffixFull: { singular: " day ",   plural: " days "   }, suffixAbbr: "d "},
        { type: "marker", marker: "h", largest: true, padZero: false, suffixFull: { singular: " hour ",  plural: " hours "  }, suffixAbbr: "h "},
        { type: "marker", marker: "m", largest: true, padZero: false, suffixFull: { singular: " minute ", plural: " minutes "}, suffixAbbr: "m "},
        { type: "marker", marker: "s", largest: true, padZero: false, suffixFull: { singular: " second", plural: " seconds"}, suffixAbbr: "s "}

      ]},
      { type: "normal", blocks: [
        { type: "text", text: "Playtime: ", showIfUnitsZero: true },
        { type: "marker", marker: "w", largest: true, padZero: false, suffixFull: { singular: " §eweek§r ",  plural: " §eweeks§r "  }, suffixAbbr: "§ew§r "},
        { type: "marker", marker: "d", largest: true, padZero: false, suffixFull: { singular: " §eday§r ",   plural: " §edays§r "   }, suffixAbbr: "§ed§r "},
        { type: "marker", marker: "h", largest: true, padZero: false, suffixFull: { singular: " §ehour§r ",  plural: " §ehours§r "  }, suffixAbbr: "§eh§r "},
        { type: "marker", marker: "m", largest: true, padZero: false, suffixFull: { singular: " §eminute§r ", plural: " §eminutes§r "},suffixAbbr: "§em§r "},
        { type: "marker", marker: "s", largest: true, padZero: false, suffixFull: { singular: " §esecond§r", plural: " §eseconds§r"},suffixAbbr: "§es§r"}
      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§3§oTimer paused at §r" },
          { type: "marker", marker: "w", largest: true, padZero: false, suffixFull: { singular: " §eweek§r ",  plural: " §eweeks§r "  }, suffixAbbr: "§ew§r "},
          { type: "marker", marker: "d", largest: true, padZero: false, suffixFull: { singular: " §eday§r ",   plural: " §edays§r "   }, suffixAbbr: "§ed§r "},
          { type: "marker", marker: "h", largest: true, padZero: false, suffixFull: { singular: " §ehour§r ",  plural: " §ehours§r "  }, suffixAbbr: "§eh§r "},
          { type: "marker", marker: "m", largest: true, padZero: false, suffixFull: { singular: " §eminute§r ", plural: " §eminutes§r "},suffixAbbr: "§em§r "},
          { type: "marker", marker: "s", largest: true, padZero: false, suffixFull: { singular: " §esecond§r", plural: " §eseconds§r"},suffixAbbr: "§es§r"}
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

  {
    name: "v.1.0.0",
    id: 9,
    edition: [0],
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
    id: 10,
    edition: [0],
    content: undefined
  },
  // BastiGHG
  {
    name: "Zick Zack V5 (2M)",
    id: 11,
    edition: [1],
    content: [
      { type: "ui", blocks: [
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§4§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§4§l§oDer Timer ist pausiert" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§4§l§oDer Timer ist pausiert" }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "" }
      ]}
    ]
  },
  {
    name: "Zick Zack V5",
    id: 12,
    edition: [1],
    content: [
      { type: "ui", blocks: [
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§a§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§a§l§oDer Timer ist pausiert" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§a§l§oDer Timer ist pausiert" }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "" }
      ]}
    ]
  },
  {
    name: "Zick Zack V4 (1,5M)",
    id: 13,
    edition: [1],
    content: [
      { type: "ui", blocks: [
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§7§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§7§l§oDer Timer ist pausiert" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§7§l§oDer Timer ist pausiert" }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "" }
      ]}
    ]
  },
  {
    name: "Zick Zack V4 (dual)",
    id: 14,
    edition: [1],
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " Tag, ", plural: " Tage, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§d§l" },
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " Tag, ", plural: " Tage, " }, separator: { enabled: false } },
        { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§d§l§oDer Timer ist pausiert" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§d§l§oDer Timer ist pausiert" }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "" }
      ]}
    ]
  },
  {
    name: "Zick Zack V4",
    id: 15,
    edition: [1],
    content: [
      { type: "ui", blocks: [
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§d§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§d§l§oDer Timer ist pausiert" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§d§l§oDer Timer ist pausiert" }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "" }
      ]}
    ]
  },
  {
    name: "Standard (dual)",
    id: 16,
    edition: [1],
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " Tag, ", plural: " Tage, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§6§l" },
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " Tag, ", plural: " Tage, " }, separator: { enabled: false } },
        { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§6§oDer Timer ist pausiert." }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§6§oDer Timer ist pausiert." }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "" }
      ]}
    ]
  },
  {
    name: "Standard",
    id: 17,
    edition: [1],
    content: [
      { type: "ui", blocks: [
          { type: "marker", marker: "d", largest: true, padZero: false, alwaysShow: false, suffixFull: { singular: "d", plural: "d"}, suffixAbbr: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffixFull: { singular: "h", plural: "h"}, suffixAbbr: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffixFull: { singular: "m", plural: "m"}, suffixAbbr: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", largest: true, padZero: false, suffixFull: { singular: " Sekunde", plural: " Sekunden"}, suffixAbbr: "s"}
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§e§l" },
          { type: "marker", marker: "d", largest: true, padZero: false, alwaysShow: false, suffixFull: { singular: "d", plural: "d"}, suffixAbbr: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffixFull: { singular: "h", plural: "h"}, suffixAbbr: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffixFull: { singular: "m", plural: "m"}, suffixAbbr: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", largest: true, padZero: false, suffixFull: { singular: " Sekunde", plural: " Sekunden"}, suffixAbbr: "s"}

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§o§b" },
          { type: "marker", marker: "d", largest: true, padZero: false, alwaysShow: false, suffixFull: { singular: "d", plural: "d"}, suffixAbbr: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffixFull: { singular: "h", plural: "h"}, suffixAbbr: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffixFull: { singular: "m", plural: "m"}, suffixAbbr: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", largest: true, padZero: false, suffixFull: { singular: " Sekunde", plural: " Sekunden"}, suffixAbbr: "s"}
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§o§b" },
          { type: "marker", marker: "d", largest: true, padZero: false, alwaysShow: false, suffixFull: { singular: "d", plural: "d"}, suffixAbbr: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffixFull: { singular: "h", plural: "h"}, suffixAbbr: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffixFull: { singular: "m", plural: "m"}, suffixAbbr: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", largest: true, padZero: false, suffixFull: { singular: " Sekunde", plural: " Sekunden"}, suffixAbbr: "s"}
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "" }
      ]}
    ]
  },
]


/*------------------------
  Apply Design Function
   - It applies the design to a given time value.
-------------------------*/

export function apply_design(design, time) {
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
    // Normal- & Playtime-Modus: Zeit in ms und nur für vorhandene Marker zerlegen
    let remainingMs = (time / 20) * 1000;
    const msPer = {
      y: 365.25 * 24 * 3600 * 1000,
      w:          7 * 24 * 3600 * 1000,
      d:              24 * 3600 * 1000,
      h:                   3600 * 1000,
      m:                        60 * 1000,
      s:                             1000,
      ms:                             10
    };
    // Welche Einheiten sind im Design überhaupt vorhanden?
    const used = new Set(
      (design.blocks || [])
        .filter(b => b.type === "marker" && allUnits.includes(b.marker))
        .map(b => b.marker)
    );
    // Für jede Einheit: wenn verwendet, extrahieren, sonst 0 lassen und ms im Rest belassen
    for (let u of allUnits) {
      if (used.has(u)) {
        const val = Math.floor(remainingMs / msPer[u]);
        timeValues[u] = val;
        remainingMs -= val * msPer[u];
      } else {
        timeValues[u] = 0;
      }
    }
  }

  // 2) Basis-Verarbeitung der Blöcke
  const blocks = (design.blocks || []).map(b => ({
    ...b,
    valueNum: b.type === "marker" ? (timeValues[b.marker] || 0) : undefined,
    show:      false,
    _useFull:  false,
    _useAbbr:  false,
    ifAllZeroCandidate: false
  }));

  // 3) Prüfen auf Playtime‑Modus (largest-Flag)
  const playMode = blocks.some(b => b.type==="marker" && b.largest);

  if (playMode) {
    // Playtime: größte Unit + alle folgenden anzeigen (auch wenn 0)
    const markers = blocks.filter(b => b.type==="marker");
    let hit = false;
    for (let b of markers) {
      if (!hit && b.valueNum > 0) {
        b.show = true; b._useFull = true; hit = true;
      } else if (hit) {
        b.show = true; b._useAbbr = true;
      } else {
        b.show = false;
      }
    }
    // Sonderfall: alles 0 → Sekunden voll anzeigen
    if (!hit) {
      const sec = markers.find(b => b.marker==="s");
      if (sec) { sec.show = true; sec._useFull = true; }
    }
  } else {
    // Alter Modus: alwaysShow-/ifAllZero‑Logik
    for (let b of blocks) {
      if (b.type !== "marker") continue;
      const v = b.valueNum;
      if (v !== 0) b.show = true;
      else if (b.alwaysShow === true || b.alwaysShow === "always") b.show = true;
      else if (b.alwaysShow === "ifAllZero") b.ifAllZeroCandidate = true;
      else if (typeof b.alwaysShow === "object" && b.alwaysShow.condition === "ifGreater") {
        const anyGreater = b.alwaysShow.units.some(u => (timeValues[u] || 0) > 0);
        if (anyGreater) b.show = true;
      }
    }
    // ifAllZero-Fallback
    const any = blocks.some(b => b.type==="marker" && b.show);
    if (!any) {
      blocks.forEach(b => {
        if (b.type==="marker" && b.ifAllZeroCandidate) b.show = true;
      });
    }
  }

  // 4) String-Zusammenbau
  let result = "";
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];

    // → Text‑Block: evtl. nur show, wenn w,d,h==0
    if (b.type === "text") {
      if (b.showIfUnitsZero) {
        if (timeValues.w===0 && timeValues.d===0 && timeValues.h===0) {
          result += b.text;
        }
      } else {
        result += b.text;
      }
      continue;
    }

    // → Marker-Block
    if (b.type === "marker" && b.show) {
      // Separator before
      if (b.separator?.enabled && ["before","both"].includes(b.separator.position)) {
        const prev = blocks.slice(0,i).some(x => x.type==="marker" && x.show);
        if (prev) result += b.separator.value;
      }
      // Wert mit Padding
      const raw = String(b.valueNum);
      const val = b.padZero && raw.length===1 ? "0"+raw : raw;
      result += val;
      // Suffix wählen
      if (b._useFull) {
        const { singular, plural } = b.suffixFull;
        result += (b.valueNum===1 ? singular : plural);
      } else if (b._useAbbr) {
        result += b.suffixAbbr || "";
      } else {
        if (typeof b.suffix === "string") result += b.suffix;
        else if (typeof b.suffix === "object") {
          const { singular, plural } = b.suffix;
          result += (b.valueNum===1 ? singular : plural);
        }
      }
      // Separator after
      if (b.separator?.enabled && ["after","both"].includes(b.separator.position)) {
        const next = blocks.slice(i+1).some(x => x.type==="marker" && x.show);
        if (next) result += b.separator.value;
      }
    }
  }

  // 5) Tages‑Farblogik (unverändert)
  if (design.type==="day" && Array.isArray(design.colorConfig) && design.colorConfig.length>=3) {
    const h = Number(timeValues.h), m = Number(timeValues.m);
    const tot = h*60 + m;
    const color = tot<(4*60+30)||h>=19
                ? design.colorConfig[0]
                : ((tot>=(4*60+30)&&tot<(6*60))||(h>=17&&h<19))
                ? design.colorConfig[1]
                : design.colorConfig[2];
    result = color + result;
  }

  return result;
}


/*------------------------
 Menus
-------------------------*/

export function settings_actionbar(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang

  let actions = [];

  form.title(translate_textkeys("menu.settings.actionbar.title", lang));
  form.body(translate_textkeys("menu.general.description", lang));

  form.button(
    translate_textkeys("menu.settings.actionbar.design.button", lang)+"\n" + render_live_actionbar(save_data[player_sd_index], false),
    "textures/ui/mashup_PaintBrush"
  );
  actions.push(() => {
    design_template_ui(player);
    player.playMusic(translate_soundkeys("music.menu.settings.actionbar.design", player), { fade: 0.3, loop: true });
  });

  form.button(
    translate_textkeys("menu.settings.actionbar.using", lang)+ "\n" + (save_data[player_sd_index].visibility_setting ? save_data[player_sd_index].absolute_visibility !== save_data[player_sd_index].visibility_setting? translate_textkeys("menu.toggle_dynamic", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)),
    save_data[player_sd_index].visibility_setting ? save_data[player_sd_index].absolute_visibility !== save_data[player_sd_index].visibility_setting ? "textures/ui/automation_glyph_color" : "textures/ui/toggle_on" : "textures/ui/toggle_off"

  );
  actions.push(() => {
    save_data[player_sd_index].visibility_setting = !save_data[player_sd_index].visibility_setting;
    update_save_data(save_data);
    settings_actionbar(player);
  });

  if (save_data[player_sd_index].counting_type !== 3) {
    form.button(
      translate_textkeys("menu.settings.actionbar.day_time", lang)+"\n" + (save_data[player_sd_index].time_day_actionbar ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)),
      save_data[player_sd_index].time_day_actionbar ? "textures/ui/toggle_on" : "textures/ui/toggle_off"
    );
    actions.push(() => {
      save_data[player_sd_index].time_day_actionbar = !save_data[player_sd_index].time_day_actionbar;
      update_save_data(save_data);
      settings_actionbar(player);
    });
  }

  if (save_data[player_sd_index].time_day_actionbar || save_data[player_sd_index].counting_type == 3) {
    if (!save_data[0].sync_day_time && save_data[0].utc !== undefined) {
      if(form){form.button(translate_textkeys("menu.settings.actionbar.time_source", save_data[player_sd_index].lang)+"\n§9" + (save_data[player_sd_index].time_source === 0 ? translate_textkeys("menu.settings.actionbar.time_source.in_game", save_data[player_sd_index].lang) : translate_textkeys("menu.settings.actionbar.time_source.real_life", save_data[player_sd_index].lang)), "textures/ui/share_microsoft")};
      actions.push(() => {
        if (save_data[player_sd_index].time_source === 0) {
          save_data[player_sd_index].time_source = 1;
        } else {
          save_data[player_sd_index].time_source = 0;
        }
        update_save_data(save_data);
        settings_actionbar(player);
      });
    } else if (save_data[0].utc !== undefined) {
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



  form.title(translate_textkeys("menu.settings.actionbar.design.title", save_data[player_sd_index].lang));
  form.body(translate_textkeys("menu.settings.actionbar.design.description", save_data[player_sd_index].lang));

  var currentDesign = save_data[player_sd_index].design;

  if (typeof save_data[player_sd_index].design == "number") {
    currentDesign = design_template.find(t => t.id == save_data[player_sd_index].design).content
  }

  let sortedDesigns = design_template
    .filter(design => {
      return (save_data[player_sd_index].allow_unnecessary_inputs || design.content !== undefined) && design.edition.includes(version_info.edition);
    })
    .sort((a, b) => (b.content === currentDesign) - (a.content === currentDesign));


  let hasMatchingDesign = sortedDesigns.some(design => JSON.stringify(design.content) === JSON.stringify(currentDesign));

  sortedDesigns.forEach((design) => {
    let buttonText = design.name + "\n" // + (apply_design(design.content.find(d => d.type === "screen_saver"), 0)+ " "); // Looks a bit off
    if (JSON.stringify(design.content) === JSON.stringify(currentDesign) || (!hasMatchingDesign && design.content === undefined)) {
      buttonText += "§r"+translate_textkeys("menu.item_selected", save_data[player_sd_index].lang);
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
        return //design_maker(player)
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

  form.title(translate_textkeys("menu.settings.actionbar.design.title", save_data[player_sd_index].lang));

  let ui_preview = apply_design(design.find(d => d.type === "ui"), 660822121.4)
  let normal_preview = apply_design(design.find(d => d.type === "normal"), 660822121.4)
  let paused_preview = apply_design(design.find(d => d.type === "paused"), 660822121.4)

  let finished_preview = apply_design(design.find(d => d.type === "finished"), 660822121.4)
  let day_preview = apply_design(design.find(d => d.type === "day"), 19395.9)

  let screen_saver_preview = apply_design(design.find(d => d.type === "screen_saver"), 0)

  form.body(translate_textkeys(
    "menu.settings.actionbar.design.preview",
    save_data[player_sd_index].lang,
    {
      screen_saver: screen_saver_preview,
      ui: ui_preview,
      normal: normal_preview,
      paused: paused_preview,
      finished: finished_preview,
      day: day_preview
    }
  ));


  form.button(translate_textkeys("menu.settings.actionbar.design.preview.apply", save_data[player_sd_index].lang));


  form.button("");

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (response.selection == 0) {

      if (is_custom) {
        save_data[player_sd_index].design = design
      } else {
        save_data[player_sd_index].design = design_template.find(d => d.content === design).id
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