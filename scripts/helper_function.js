import { world, system } from "@minecraft/server";
import { version_info } from "./version.js";
import { goal_event, goal_entity_list, goal_entity_blocklist } from "./goal.js";
import { translate_soundkeys } from "./sound.js";
import { apply_design, design_template  } from "./design.js";
import { standallone } from "./communication_system.js";
import { translate_textkeys } from "./lang.js";

/*------------------------
 Save Data
-------------------------*/

export function default_save_data_structure() {
  return {
    time: { stopwatch: 0, timer: 0, last_value_timer: 0, do_count: false },
    counting_type: 0,
    challenge: {
      active: (world.isHardcore || version_info.edition == 1),
      progress: 0,
      rating: 0,
      goal: { pointer: 1, entity_id: "minecraft:ender_dragon", event_pos: 0 },
      difficulty: world.isHardcore ? 2 : 1
    },
    global: {
      status: (world.isHardcore || version_info.edition == 1),
      last_player_id: undefined
    },
    sync_day_time: false,
    use_setup: version_info.edition == 1 ? false : true,
    utc: version_info.edition == 1 ? 2 : undefined,
    update_message_unix: version_info.unix + version_info.update_message_period_unix
  };
}

export function update_save_data(input) {
  world.setDynamicProperty("timerv:save_data", JSON.stringify(input));
}


export function load_save_data() {
  let rawData = world.getDynamicProperty("timerv:save_data");
  return (rawData ? JSON.parse(rawData) : undefined);
}

export function create_player_save_data(playerId, playerName, modifier) {
  let save_data = load_save_data();

  // Define the default structure for a new player's save data
  const default_player_save_data_structure = (is_op_initial) => ({
    id: playerId,
    show_td_as_mode: false,
    time: { stopwatch: 0, timer: 0, last_value_timer: 0, do_count: false },
    custom_sounds: 0,
    afk: false,
    counting_type: 0,
    time_day_actionbar: false,
    allow_unnecessary_inputs: false,
    time_source: 0,
    name: playerName,
    op: is_op_initial, // This will be determined when the player is first added
    visibility_setting: true,
    absolute_visibility: true,
    fullbright: false,
    lang: version_info.edition == 1? "de_de" : "en_us",
    design: version_info.edition == 1? 12:0,
    setup: 0, // Setup compleation: 0%
    last_unix: Math.floor(Date.now() / 1000),
    gesture: { emote: false, sneak: true, nod: true, stick: true, command: true },
    health: 20, // is used to save the heart level only in hardcore mode e.g. during a break
    openend_menu_via_command: false,
  });

  let player_sd_index = save_data.findIndex(entry => entry.id === playerId);
  let player_data;

  // Helper function to recursively merge default values
  const merge_defaults = (target, defaults) => {
      for (const key in defaults) {
          if (defaults.hasOwnProperty(key)) {
              if (!target.hasOwnProperty(key)) {
                  // Key is missing, add it with default value
                  target[key] = defaults[key];
              } else if (typeof defaults[key] === 'object' && defaults[key] !== null && !Array.isArray(defaults[key])) {
                  // If the default value is an object, recurse into it
                  if (typeof target[key] !== 'object' || target[key] === null || Array.isArray(target[key])) {
                      // If the existing value is not an object or is null/array, replace it with the default structure
                      target[key] = defaults[key];
                      changes_made = true;
                  } else {
                      merge_defaults(target[key], defaults[key]);
                  }
              }
          }
      }
  };

  if (player_sd_index === -1) {
      // Player does not exist, create new entry
      let should_be_op = true;

      for (let entry of save_data) {
          if (entry.op === true) {
              should_be_op = false;
              break;
          }
      }

      print(`Player ${playerName} (${playerId}) added with op=${should_be_op}!`);

      player_data = default_player_save_data_structure(should_be_op);
      save_data.push(player_data);
  } else {
      // Player exists, get their data
      player_data = save_data[player_sd_index];

      // Update player name if it's different
      if (player_data.name !== playerName) {
          player_data.name = playerName;
      }

      const dynamic_default_structure = default_player_save_data_structure(player_data.op);
      merge_defaults(player_data, dynamic_default_structure);

  }

  // Apply modifiers to the player's data
  for (let key in modifier) {
      if (player_data.hasOwnProperty(key)) { // Only apply modifier if the key exists in player_data
        player_data[key] = modifier[key];
      }
  }

  update_save_data(save_data);
  print(`Save data for player ${playerName} updated.`);
}


/*------------------------
 Console Output
-------------------------*/

export function print(input) {
  if (version_info.release_type === 0) {
    console.log(version_info.name + " - " + JSON.stringify(input))
  }
}

/*------------------------
 Time Conversion
-------------------------*/

export function convertUnixToDate(unixSeconds, utcOffset) {
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

export function getRelativeTime(diff, player) {
  const save_data = load_save_data();
  const idx = save_data.findIndex(e => e.id === player.id);
  const lang = save_data[idx].lang

  const seconds = Math.round(diff);
  const minutes = seconds / 60;
  const hours = seconds / 3600;
  const days = seconds / 86400;
  const weeks = days / 7;
  const months = days / 30.44;   // average month length
  const years = days / 365.25;   // average year length (leap years included)

  if (years >= 0.95) {
    if (years < 1.5) return translate_textkeys("menu.relative_time.year", lang);
    return translate_textkeys("menu.relative_time.years", lang, { time: Math.round(years) });
  }

  if (months >= 0.95) {
    if (months < 1.5) return translate_textkeys("menu.relative_time.month", lang);
    return translate_textkeys("menu.relative_time.months", lang, { time: Math.round(months) });
  }

  if (weeks >= 0.95) {
    if (weeks < 1.5) return translate_textkeys("menu.relative_time.week", lang);
    return translate_textkeys("menu.relative_time.weeks", lang, { time: Math.round(weeks) });
  }

  if (days >= 0.95) {
    if (days < 1.25) return translate_textkeys("menu.relative_time.day_less", lang);
    if (days < 1.5) return translate_textkeys("menu.relative_time.day_more", lang);
    return translate_textkeys("menu.relative_time.days", lang, { time: Math.round(days) });
  }

  if (hours >= 0.95) {
    if (hours < 1.25) return translate_textkeys("menu.relative_time.hour", lang);
    if (hours < 1.75) return translate_textkeys("menu.relative_time.hour_half", lang);
    return translate_textkeys("menu.relative_time.hours", lang, { time: Math.round(hours) });
  }

  if (minutes >= 1) {
    if (minutes < 1.5) return translate_textkeys("menu.relative_time.minute", lang);
    if (minutes < 15) return translate_textkeys("menu.relative_time.minutes", lang, { time: Math.round(minutes) });
    if (minutes < 20) return translate_textkeys("menu.relative_time.quarter_hour", lang);
    if (minutes < 40) return translate_textkeys("menu.relative_time.half_hour", lang);
    if (minutes < 55) return translate_textkeys("menu.relative_time.three_quarters_hour", lang);
    return translate_textkeys("menu.relative_time.hour", lang);
  }

  if (seconds < 10) return translate_textkeys("menu.relative_time.few_seconds", lang);
  if (seconds < 30) return translate_textkeys("menu.relative_time.less_than_half_minute", lang);
  return translate_textkeys("menu.relative_time.half_minute", lang);
}

/*------------------------
  Local / Global Mode
-------------------------*/
export function convert_local_to_global(player_id) {
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

export function convert_global_to_local(disable_global) {
  let save_data = load_save_data();
  let player_save_data = save_data.findIndex(entry => entry.id === save_data[0].global.last_player_id);

  if (player_save_data) {
    save_data[player_save_data].counting_type = save_data[0].counting_type
    save_data[player_save_data].time.do_count = save_data[0].time.do_count
    save_data[player_save_data].time.timer = save_data[0].time.timer
    save_data[player_save_data].time.stopwatch = save_data[0].time.stopwatch
  } else {
      world.getAllPlayers().forEach(t => {
        let lang = save_data[save_data.findIndex(entry => entry.id === t.id)].lang
        t.sendMessage("§l§7[§f"+ translate_textkeys("message.header.error", lang) + "§7]§r "+translate_textkeys("message.body.convert_global_to_local.error", lang, {name: save_data[0].global.last_player_id}))
    });
  }

  if (disable_global) {
    save_data[0].global.status = false
  } else {
    save_data[0].global.last_player_id = save_data[player_save_data].id
  }

  update_save_data(save_data)
}

/*------------------------
 render_task_list (Menu)
-------------------------*/



/*------------------------
  Start / Stop Challenge
-------------------------*/

export function start_cm_timer() {
  let save_data = load_save_data();
  save_data[0].challenge.progress = 1
  save_data[0].time.do_count = true

  if(save_data[0].challenge.goal.pointer == 0) {
    const availableEntities = goal_entity_list.filter(g => {
      const id = g.id;
      const baseId = id.replace(/^minecraft:/, "");

      if (goal_entity_blocklist.find(blocked => blocked.id === baseId)) return false;

      if (id.startsWith("minecraft:")) return true;

      return false;
    });
    const availableEvents   = goal_event.filter(g => g.condition(save_data));

    const totalEntities = availableEntities.length;
    const totalEvents   = availableEvents.length;
    const totalOptions  = totalEntities + totalEvents;

    const r = Math.floor(Math.random() * totalOptions);

    if (r < totalEntities) {
      const chosenEntity = availableEntities[r];

      save_data[0].challenge.goal.pointer = 1;
      save_data[0].challenge.goal.entity_id = chosenEntity.id;
    } else {
      const idxInEvents = r - totalEntities;
      const chosenEvent = availableEvents[idxInEvents];
      const realIndex   = goal_event.findIndex(g => g.name === chosenEvent.name);

      save_data[0].challenge.goal.pointer    = 2;
      save_data[0].challenge.goal.event_pos  = realIndex;
    }

    // Realtalk: Raw Text to the hell! It took me around 4 hours to implement it for this shitty "translate"
    world.getAllPlayers().forEach(t => {
      let player_sd_index = save_data.findIndex(entry => entry.id === t.id);
      let lang = save_data[player_sd_index].lang
      let design = (typeof save_data[player_sd_index].design === "number"? design_template.find(t => t.id == save_data[player_sd_index].design).content : save_data[player_sd_index].design).find(item => item.type === "ui");
      const parts =
      save_data[0].challenge.goal.pointer === 1
        ? [
            { text: translate_textkeys("message.body.challenge_start.goal.entity_prefix", lang) },
            { translate: "entity." + save_data[0].challenge.goal.entity_id.replace(/^minecraft:/, "") + ".name" },
            { text: "\n" },
          ]
      : save_data[0].challenge.goal.pointer === 2 && save_data[0].challenge.goal.event_pos === 0
        ? [
            { text: translate_textkeys("message.body.challenge_start.goal.event.time", lang) + apply_design(design, save_data[0].time.timer) + "\n" }
          ]
        : [
            { text: translate_textkeys("message.body.challenge_start.goal.event", lang) + goal_event[save_data[0].challenge.goal.event_pos].name + "\n" }
          ];

      t.sendMessage({
        rawtext: [
          { text: "§l§5[§d"+translate_textkeys("menu.goal.title", lang)+"§5]§r§f " },
          ...parts
        ]
      });
    })
  }

  world.getAllPlayers().forEach(t => {
    t.playSound(translate_soundkeys("challenge.starts", t));
    t.sendMessage("§l§7[§f"+ (standallone? translate_textkeys("message.header.system", save_data[save_data.findIndex(entry => entry.id === t.id)].lang) : translate_textkeys("message.header.system.client_mode", save_data[save_data.findIndex(entry => entry.id === t.id)].lang)) + "§7]§r "+translate_textkeys("message.body.challenge_start", save_data[save_data.findIndex(entry => entry.id === t.id)].lang))
  });

  update_save_data(save_data);
}

export function finished_cm_timer(rating, key_message, value, key_entity) {
  let save_data = load_save_data()
  save_data[0].challenge.progress = 2

  save_data[0].challenge.rating = rating
  save_data[0].time.do_count = false

  // Have to be rawtext!
  let rawArray;

  world.getAllPlayers().forEach(t => {
    let lang = save_data[save_data.findIndex(entry => entry.id === t.id)].lang

    const prefix = {
      text: rating === 1
        ? "§l§2[§a"+ translate_textkeys("menu.goal.title", lang) +"§2]§r "
        : "§l§4[§c"+ translate_textkeys("message.header.end", lang) +"§4]§r "
    };

    if (!key_entity) {
      rawArray = [prefix, {text: translate_textkeys(key_message, lang, value)}];
    } else {
      rawArray = [prefix, {text: translate_textkeys(key_message[0], lang, value)}, {translate: key_entity}, {text: translate_textkeys(key_message[1], lang, value)}];
    }

    world.sendMessage({ rawtext: rawArray });


    t.playSound(translate_soundkeys(rating == 1? "challenge.end.good" : "challenge.end.bad", t));
    t.onScreenDisplay.setTitle(rating == 1? translate_textkeys("message.title.challenge_end.good", lang) : translate_textkeys("message.title.challenge_end.bad", lang));
  });

  update_save_data(save_data);
}

/*------------------------
  Close World
-------------------------*/

export function close_world() {
  world.sendMessage("Shutdown Server! The world will be frozen, please wait...")
  while (true) {}
}