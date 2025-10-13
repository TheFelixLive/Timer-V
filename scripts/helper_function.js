import { world, system } from "@minecraft/server";
import { version_info } from "./version.js";
import { goal_event, goal_entity_list, goal_entity_blocklist } from "./goal.js";
import { translate_soundkeys } from "./sound.js";
import { apply_design, design_template  } from "./design.js";
import { system_privileges, fetchViaInternetAPI, challenge_list } from "./communication_system.js";
import { translate_textkeys } from "./lang.js";

/*------------------------
 Save Data
-------------------------*/

export function default_save_data_structure() {
  return {
    time: { stopwatch: 0, timer: 0, last_value_timer: 0, do_count: false },
    counting_type: system.currentTick < 12000? 2 : 0,
    counting_type_storage: 0, // used to store the world tick when a challenge ends
    challenge: {
      active: (world.isHardcore || version_info.edition == 1),
      progress: 0,
      rating: 0,
      goal: { pointer: 1, entity_id: "minecraft:ender_dragon", event_pos: 0 },
      difficulty: world.isHardcore ? 2 : 1,
      external_challenge: [] // List of UUIDs which are active as challenge
    },
    global: {
      status: (world.isHardcore || version_info.edition == 1 || system.currentTick < 12000),
      last_player_id: undefined
    },
    sync_day_time: false,
    use_setup: version_info.edition == 1 ? false : true,
    utc: version_info.edition == 1 ? 2 : undefined,
    utc_auto: true
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
  const default_player_save_data_structure = {
    id: playerId,
    time: { stopwatch: 0, timer: 0, last_value_timer: 0, do_count: false },
    custom_sounds: 0,
    afk: false,
    counting_type: 0,
    time_day_actionbar: false,
    allow_unnecessary_inputs: false,
    time_source: 0,
    name: playerName,
    visibility_setting: true,
    absolute_visibility: true,
    fullbright: false,
    lang: version_info.edition == 1? "de_de" : "en_us",
    design: version_info.edition == 1? 12:0,
    setup: 0, // Setup compleation: 0%
    last_unix: Math.floor(Date.now() / 1000),
    gesture: { emote: false, sneak: false, nod: false, stick: false },
    health: 20, // is used to save the heart level only in hardcore mode e.g. during a break
  };

  let player_sd_index = save_data.findIndex(entry => entry.id === playerId);
  let player_data, changes_made = false;

  // Helper function to recursively merge default values
  function merge_defaults(target, defaults) {
    function isPlainObject(v) {
      return v !== null && typeof v === 'object' && !Array.isArray(v);
    }

    function deepClone(value) {
      if (Array.isArray(value)) return value.map(deepClone);
      if (isPlainObject(value)) {
        const out = {};
        for (const k of Object.keys(value)) out[k] = deepClone(value[k]);
        return out;
      }
      return value;
    }

    if (!isPlainObject(target) || !isPlainObject(defaults)) {
      throw new TypeError('Both target and defaults must be plain objects');
    }

    // 1) Fehlende Defaults hinzufügen / rekursiv mergen
    for (const key of Object.keys(defaults)) {
      const defVal = defaults[key];

      if (!Object.prototype.hasOwnProperty.call(target, key)) {
        target[key] = deepClone(defVal);
      } else {
        const tgtVal = target[key];

        if (isPlainObject(defVal) && isPlainObject(tgtVal)) {
          merge_defaults(tgtVal, defVal);
        } else if (isPlainObject(defVal) && !isPlainObject(tgtVal)) {
          target[key] = deepClone(defVal);
        } else if (Array.isArray(defVal) && !Array.isArray(tgtVal)) {
          target[key] = deepClone(defVal);
        } else if (!isPlainObject(defVal) && isPlainObject(tgtVal)) {
          target[key] = deepClone(defVal);
        }
      }
    }

    // 2) Überflüssige Keys löschen
    for (const key of Object.keys(target)) {
      if (!Object.prototype.hasOwnProperty.call(defaults, key)) {
        delete target[key];
      }
    }

    return target;
  }


  if (player_sd_index === -1) {
      print(`Player ${playerName} (${playerId}) added!`);

      player_data = default_player_save_data_structure;
      save_data.push(player_data);
  } else {
      // Player exists, get their data
      player_data = save_data[player_sd_index];

      // Update player name if it's different
      if (player_data.name !== playerName) {
          player_data.name = playerName;
      }

      const dynamic_default_structure = default_player_save_data_structure;
      merge_defaults(player_data, dynamic_default_structure);

  }

  // Apply modifiers to the player's data
  for (let key in modifier) {
      if (player_data.hasOwnProperty(key)) {
        player_data[key] = modifier[key];
      }
  }

  update_save_data(save_data);
  if (changes_made) print(`Save data for player ${playerName} updated.`);
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

  if (player_save_data !== -1) {
    save_data[player_save_data].counting_type = save_data[0].counting_type
    save_data[player_save_data].time.do_count = save_data[0].time.do_count
    save_data[player_save_data].time.timer = save_data[0].time.timer
    save_data[player_save_data].time.stopwatch = save_data[0].time.stopwatch
  } else {
      world.getAllPlayers().forEach(t => {
        let lang = save_data[save_data.findIndex(entry => entry.id === t.id)].lang
        t.sendMessage("§l§4[§c"+ translate_textkeys("message.header.error", lang) + "§4]§r "+translate_textkeys("message.body.convert_global_to_local.error", lang, {name: save_data[0].global.last_player_id}))
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
  Pause / Resume Timer
-------------------------*/

export function control_timer(player, pause_or_resume) {
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang
  let timedata;
  if (save_data[0].global.status) {
    timedata = save_data[0]
  } else {
    timedata = save_data[player_sd_index]
  }

  if ((save_data[0].global.status && player.playerPermissionLevel !== 2) || (save_data[0].challenge.active && save_data[0].challenge.progress !== 1) || save_data[0].counting_type === 2) {
    player.sendMessage("§l§4[§c"+ translate_textkeys("message.header.error", lang) + "§4]§r "+translate_textkeys("message.body.cc.failed", lang, {actions: pause_or_resume}) );
    player.playSound(translate_soundkeys("message.cc.failed", player));
    return;
  }

  if ((pause_or_resume === "resume" && timedata.time.do_count === true) || (pause_or_resume === "pause" && timedata.time.do_count === false)) {
    player.sendMessage("§l§4[§c"+ translate_textkeys("message.header.error", lang) + "§4]§r "+translate_textkeys("message.body.condition.failed.same", lang));
    player.playSound(translate_soundkeys("message.cc.failed", player));
    return;
  }

  if (pause_or_resume === "resume") {
    timedata.time.do_count = true;

    (save_data[0].global.status ? world.getAllPlayers() : [player]).forEach(t => {
      t.sendMessage("§l§2[§a"+ translate_textkeys("message.header.condition", lang) +"§2]§r "+translate_textkeys("message.body.condition.resume", lang));
      if (t.id == player.id && save_data[player_sd_index].custom_sounds > 0) {
        player.queueMusic(translate_soundkeys("condition.resumed", t))
      } else {
        t.playSound(translate_soundkeys("condition.resumed", t));
      }

      if (world.isHardcore && save_data[0].challenge.active) {
        player.applyDamage(20 - save_data[player_sd_index].health)
      }

      if (save_data[0].challenge.active) {
        // Activate external challenges via CCS
        if (save_data[0].challenge.external_challenge.length > 0) {
          world.scoreboard.addObjective("ccs_data");
          world.scoreboard.getObjective("ccs_data").setScore(JSON.stringify({ event: "ccs_start", data: { target: save_data[0].challenge.external_challenge} }), 1);
          world.getDimension("overworld").runCommand("scriptevent ccs:data");
        }
      }
    });
  } else if (pause_or_resume === "pause") {
    timedata.time.do_count = false;

    (save_data[0].global.status ? world.getAllPlayers() : [player]).forEach(t => {
      t.sendMessage("§l§4[§c"+translate_textkeys("message.header.condition", lang)+"§4]§r "+translate_textkeys("message.body.condition.paused", lang));
      if (t.id == player.id && save_data[player_sd_index].custom_sounds > 0) {
        player.queueMusic(translate_soundkeys("condition.paused", t))
      } else {
        t.playSound(translate_soundkeys("condition.paused", t));
      }

      if (world.isHardcore && save_data[0].challenge.active) {
        save_data[player_sd_index].health = player.getComponent("health").currentValue
      }

      if (save_data[0].challenge.active) {
        // Activate external challenges via CCS
        if (save_data[0].challenge.external_challenge.length > 0) {
          world.scoreboard.addObjective("ccs_data");
          world.scoreboard.getObjective("ccs_data").setScore(JSON.stringify({ event: "ccs_stop", data: { target: save_data[0].challenge.external_challenge} }), 1);
          world.getDimension("overworld").runCommand("scriptevent ccs:data");
        }
      }
    });
  }

  update_save_data(save_data);
}

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
    t.sendMessage("§l§7[§f"+ (system_privileges == 2? translate_textkeys("message.header.system", save_data[save_data.findIndex(entry => entry.id === t.id)].lang) : translate_textkeys("message.header.system.client_mode", save_data[save_data.findIndex(entry => entry.id === t.id)].lang)) + "§7]§r "+translate_textkeys("message.body.challenge_start", save_data[save_data.findIndex(entry => entry.id === t.id)].lang))
  });

  // Activate external challenges via CCS
  if (save_data[0].challenge.external_challenge.length > 0) {
    world.scoreboard.addObjective("ccs_data");
    world.scoreboard.getObjective("ccs_data").setScore(JSON.stringify({ event: "ccs_start", data: { target: save_data[0].challenge.external_challenge} }), 1);
    world.getDimension("overworld").runCommand("scriptevent ccs:data");
  }

  update_save_data(save_data);
}

export function finished_cm_timer(rating, key_message, value, key_entity) {
  let save_data = load_save_data()
  save_data[0].challenge.progress = 2

  save_data[0].challenge.rating = rating
  if (save_data[0].counting_type === 2) {
    save_data[0].counting_type_storage = system.currentTick
  } else {
    save_data[0].time.do_count = false
  }

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

    t.sendMessage({ rawtext: rawArray });


    t.playSound(translate_soundkeys(rating == 1? "challenge.end.good" : "challenge.end.bad", t));
    t.onScreenDisplay.setTitle(rating == 1? translate_textkeys("message.title.challenge_end.good", lang) : translate_textkeys("message.title.challenge_end.bad", lang));
  });

  // Deactivate external challenges via CCS
  if (save_data[0].challenge.external_challenge.length > 0) {
    world.scoreboard.addObjective("ccs_data");
    world.scoreboard.getObjective("ccs_data").setScore(JSON.stringify({ event: "ccs_stop", data: { target: save_data[0].challenge.external_challenge} }), 1);
    world.getDimension("overworld").runCommand("scriptevent ccs:data");
  }

  update_save_data(save_data);
}

/*------------------------
 Update data (github)
-------------------------*/

export let github_data

export async function update_github_data() {
  try {
    fetchViaInternetAPI("https://api.github.com/repos/TheFelixLive/Timer-V/releases")
    .then(result => {
      print("API-Antwort erhalten");

      github_data = result.map(release => {
        const totalDownloads = release.assets?.reduce((sum, asset) => sum + (asset.download_count || 0), 0) || 0;
        return {
          tag: release.tag_name,
          name: release.name,
          prerelease: release.prerelease,
          published_at: release.published_at,
          body: release.body,
          download_count: totalDownloads
        };
      });

    })
    .catch(err => {
      print("Fehler beim Abruf: " + err);
    });

  } catch (e) {
  }
}

export function compareVersions(version1, version2) {
  if (!version1 || !version2) return 0;

  // Entfernt 'v.' oder 'V.' am Anfang
  version1 = version1.replace(/^v\./i, '').trim();
  version2 = version2.replace(/^v\./i, '').trim();

  // Extrahiere Beta-Nummer aus "_1" oder " Beta 1"
  function extractBeta(version) {
    const betaMatch = version.match(/^(.*?)\s*(?:_|\sBeta\s*)(\d+)$/i);
    if (betaMatch) {
      return {
        base: betaMatch[1].trim(),
        beta: parseInt(betaMatch[2], 10)
      };
    }
    return {
      base: version,
      beta: null
    };
  }

  const v1 = extractBeta(version1);
  const v2 = extractBeta(version2);

  const v1Parts = v1.base.split('.').map(Number);
  const v2Parts = v2.base.split('.').map(Number);

  // Vergleicht Major, Minor, Patch
  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const num1 = v1Parts[i] || 0;
    const num2 = v2Parts[i] || 0;
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  // Wenn gleich, vergleiche Beta
  if (v1.beta !== null && v2.beta === null) return -1; // Beta < Vollversion
  if (v1.beta === null && v2.beta !== null) return 1;  // Vollversion > Beta

  if (v1.beta !== null && v2.beta !== null) {
    if (v1.beta > v2.beta) return 1;
    if (v1.beta < v2.beta) return -1;
  }

  return 0;
}

export function markdownToMinecraft(md) {
  if (typeof md !== 'string') return '';

  // normalize newlines
  md = md.replace(/\r\n?/g, '\n');

  const UNSUPPORTED_MSG = '§o§7Tabelles are not supported! Visit GitHub for this.';

  // helper: map admonition type -> minecraft color code (choose sensible defaults)
  function admonColor(type) {
    const t = (type || '').toLowerCase();
    if (['caution', 'warning', 'danger', 'important'].includes(t)) return '§c'; // red
    if (['note', 'info', 'tip', 'hint'].includes(t)) return '§b'; // aqua
    return '§e'; // fallback: yellow
  }

  // inline processor (handles code spans first, then bold/italic/strike, links/images, etc.)
  function processInline(text) {
    if (!text) return '';

    // tokenise code spans to avoid further processing inside them
    const tokens = [];
    text = text.replace(/(`+)([\s\S]*?)\1/g, (m, ticks, code) => {
      const safe = code.replace(/\n+/g, ' '); // inline code -> single line
      const repl = '§7' + safe + '§r';
      tokens.push(repl);
      return `__MD_TOKEN_${tokens.length - 1}__`;
    });

    // images -> unsupported (replace whole image with message)
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, () => UNSUPPORTED_MSG);

    // links -> keep link text only (no URL)
    text = text.replace(/\[([^\]]+)\]\((?:[^)]+)\)/g, '$1');

    // bold: **text** or __text__ -> §ltext§r
    text = text.replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g, '§l$2§r');

    // italic: *text* or _text_ -> §otext§r
    // (do after bold so that **...** won't be partially matched)
    text = text.replace(/(\*|_)(?=\S)([\s\S]*?\S)\1/g, '§o$2§r');

    // strikethrough: ~~text~~ -> use italic+gray as fallback (no §m)
    text = text.replace(/~~([\s\S]*?)~~/g, '§o§7$1§r');

    // simple HTML tags or raw tags -> treat as unsupported (avoid exposing markup)
    if (/<\/?[a-z][\s\S]*?>/i.test(text)) return UNSUPPORTED_MSG;

    // restore code tokens
    text = text.replace(/__MD_TOKEN_(\d+)__/g, (m, idx) => tokens[Number(idx)] || '');

    return text;
  }

  // 1) Replace fenced code blocks (```...```) with unsupported message
  md = md.replace(/```[\s\S]*?```/g, () => UNSUPPORTED_MSG);

  // 2) Replace GitHub-style admonition blocks: ::: type\n...\n:::
  md = md.replace(/::: *([A-Za-z0-9_-]+)\s*\n([\s\S]*?)\n:::/gmi, (m, type, content) => {
    // flatten content lines, then process inline inside
    const inner = processInline(content.replace(/\n+/g, ' ').trim());
    const cap = type.charAt(0).toUpperCase() + type.slice(1);
    return `§l${admonColor(type)}${cap}: ${inner}§r`;
  });

  // now process line-by-line for tables / headings / lists / blockquotes / admonitions-as-blockquotes
  const lines = md.split('\n');
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // trim trailing CR/ spaces
    const raw = line;

    //  ---- detect table: a row with '|' and a following separator row like "| --- | --- |" or "---|---"
    const nextLine = lines[i + 1] || '';
    const isTableRow = /\|/.test(line);
    const nextIsSeparator = /^\s*\|?[:\-\s|]+$/.test(nextLine);
    if (isTableRow && nextIsSeparator) {
      // consume all contiguous table rows
      out.push(UNSUPPORTED_MSG);
      i++; // skip the separator
      while (i + 1 < lines.length && /\|/.test(lines[i + 1])) i++;
      continue;
    }

    //  ---- headings (#, ##, ###) -> §l + content + §r + \n
    const hMatch = line.match(/^(#{1,3})\s*(.*)$/);
    if (hMatch) {
      const content = hMatch[2].trim();
      out.push('§l' + processInline(content) + '§r\n');
      continue;
    }

    //  ---- GitHub-style single-line admonition in > or plain "Caution: ..." at line start
    const admonLineMatch = raw.match(/^\s*(?:>\s*)?(?:\*\*)?(Caution|Warning|Note|Tip|Important|Danger|Info)(?:\*\*)?:\s*(.+)$/i);
    if (admonLineMatch) {
      const type = admonLineMatch[1];
      const content = admonLineMatch[2].trim();
      out.push(`§l${admonColor(type)}${type}: ${processInline(content)}§r`);
      continue;
    }

    //  ---- blockquote lines starting with '>'
    if (/^\s*>/.test(line)) {
      const content = line.replace(/^\s*>+\s?/, '');
      out.push('§o' + processInline(content) + '§r');
      continue;
    }

    //  ---- images or html inline -> unsupported
    if (/^!\[.*\]\(.*\)/.test(line) || /<[^>]+>/.test(line)) {
      out.push(UNSUPPORTED_MSG);
      continue;
    }

    //  ---- unordered list (-, *, +) -> bullet + inline
    if (/^\s*[-*+]\s+/.test(line)) {
      const item = line.replace(/^\s*[-*+]\s+/, '');
      out.push('• ' + processInline(item));
      continue;
    }

    //  ---- ordered list (1. 2. ...) -> bullet as well
    if (/^\s*\d+\.\s+/.test(line)) {
      const item = line.replace(/^\s*\d+\.\s+/, '');
      out.push('• ' + processInline(item));
      continue;
    }

    //  ---- default: process inline formatting
    // empty line -> keep empty
    if (line.trim() === '') {
      out.push('');
      continue;
    }

    out.push(processInline(line));
  }

  // join with newline and return
  return out.join('\n');
}

/*------------------------
 Auto Timezone
-------------------------*/

export let server_ip, server_utc

export async function update_server_utc() {
  try {
    let response = await fetchViaInternetAPI("https://ipwho.is/?fields=ip,timezone");
    server_ip = response.ip
    server_utc = offsetToDecimal(response.timezone.utc)
  } catch (e) {}

  let save_data = load_save_data()

  if (save_data[0].utc_auto) {
    if (server_utc) {
      save_data[0].utc = server_utc
    } else if (!save_data[0].utc) {
      save_data[0].utc_auto = false
    }

    update_save_data(save_data)
  }
}

function offsetToDecimal(offsetStr) {
    // Prüfe auf das richtige Format (z. B. +02:00 oder -03:30)
    const match = offsetStr.match(/^([+-])(\d{2}):(\d{2})$/);
    if (!match) {
        throw new Error("Ungültiges Format. Erwartet wird z.B. '+02:00' oder '-03:30'");
    }

    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3], 10);

    // Umwandlung in Kommazahl (Dezimalstunden)
    const decimal = sign * (hours + minutes / 60);
    return decimal;
}

/*------------------------
  Close World
-------------------------*/

export function close_world() {
  world.sendMessage("Shutdown Server! The world will be frozen, please wait...")
  while (true) {}
}