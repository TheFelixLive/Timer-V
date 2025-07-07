import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"

import { links, version_info } from "./version.js";

import { translate_textkeys } from "./lang.js";
import { translate_soundkeys, soundkey_test } from "./sound.js";

import { check_difficulty, check_health } from "./difficulty.js";
import { apply_design, design_template  } from "./design.js";
import { setup_menu, main_menu } from "./menu.js";
import { initialize_multiple_menu, multiple_menu, system_privileges } from "./communication_system.js";


console.log("Hello from " + version_info.name + " - "+version_info.version+" ("+version_info.build+") - Further debugging is "+ (version_info.release_type == 0? "enabled" : "disabled" ) + " by the version")

/*------------------------
 Save Data
-------------------------*/

// Load & Save Save data
import { finished_cm_timer, getRelativeTime, print, load_save_data, update_save_data, default_save_data_structure, create_player_save_data, close_world } from "./helper_function.js";

system.run(() => {

initialize_multiple_menu()

// Creates or Updates Save Data if not present
function initialize_save_data() {
  let save_data = load_save_data();

  if (!save_data) {
      save_data = [default_save_data_structure()];
      print("Creating save_data...");
  } else {
      let data_entry = save_data[0];
      let changes_made = false;

      function merge_defaults(target, defaults) {
          for (const key in defaults) {
              if (defaults.hasOwnProperty(key)) {
                  if (!target.hasOwnProperty(key)) {
                      target[key] = defaults[key];
                      changes_made = true;
                  } else if (typeof defaults[key] === 'object' && defaults[key] !== null && !Array.isArray(defaults[key])) {
                      if (typeof target[key] !== 'object' || target[key] === null || Array.isArray(target[key])) {
                          target[key] = defaults[key];
                          changes_made = true;
                      } else {
                          merge_defaults(target[key], defaults[key]);
                      }
                  }
              }
          }
      }

      merge_defaults(data_entry, default_save_data_structure());
      if (!Array.isArray(save_data) || save_data.length === 0) {
          save_data = [data_entry];
          changes_made = true;
      } else {
          save_data[0] = data_entry;
      }

      if (changes_made) {
          print("Missing save_data attributes found and added.");
      }
  }

  update_save_data(save_data);
}

initialize_save_data()

/*------------------------
  Player Join Messages / Trigger Setup Menu
-------------------------*/

world.afterEvents.playerJoin.subscribe(({ playerId, playerName }) => {
  create_player_save_data(playerId, playerName);
})

world.afterEvents.playerSpawn.subscribe(async(eventData) => {
  const { player, initialSpawn } = eventData;
  if (!initialSpawn) return -1

  let save_data = load_save_data()
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang

  // Resets AFK
  if (!save_data[0].global.status && save_data[player_sd_index].afk && (!save_data[player_sd_index].time.do_count && save_data[player_sd_index].time[save_data[player_sd_index].counting_type == 1 ? "timer" : "stopwatch"] > 0)) {
    save_data[player_sd_index].time.do_count = true;
    update_save_data(save_data)
  }

  await system.waitTicks(40); // Wait for the player to be fully joined

  if (version_info.release_type !== 2 && save_data[player_sd_index].setup == 100) {
    player.sendMessage("§l§7[§f" + (system_privileges == 2? translate_textkeys("message.header.system", save_data[player_sd_index].lang) : translate_textkeys("message.header.system.client_mode", save_data[player_sd_index].lang)) + "§7]§r "+ save_data[player_sd_index].name +" how is your experiences with "+ version_info.version +"? Does it meet your expectations? Would you like to change something and if so, what? Do you have a suggestion for a new feature? Share it at §l"+links[0].link)
    player.playSound(translate_soundkeys("message.beta.feedback", player))
  }

  // Help reminder: how to open the menu
  if (save_data[player_sd_index].last_unix > (Math.floor(Date.now() / 1000) + 604800) && system_privileges == 2 && save_data[player_sd_index].setup == 100) {
    player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.open_menu", lang))
  }

  // If the player has not set up the timer yet, show the setup menu
  initialize_main_menu(player, false, true)
});

/*------------------------
  scriptEvent Commands
-------------------------*/

system.afterEvents.scriptEventReceive.subscribe(event=> {
  if (!event.sourceEntity) return -1
  let player = event.sourceEntity
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  if (["timerv:reset", "timerv:sd_dump"].includes(event.id)) {
    const notAvailableMsg = id => `§l§7[§f` + (system_privileges == 2? translate_textkeys("message.header.system", save_data[player_sd_index].lang) : translate_textkeys("message.header.system.client_mode", save_data[player_sd_index].lang)) + `§7]§r ${id} is not available in stable releases!`;
    const noPermissionMsg = id => `§l§7[§f` + (system_privileges == 2? translate_textkeys("message.header.system", save_data[player_sd_index].lang) : translate_textkeys("message.header.system.client_mode", save_data[player_sd_index].lang)) + `§7]§r ${id} could not be changed because you do not have permission!`;

    if (!save_data[player_sd_index].op) {
      player.sendMessage(noPermissionMsg(event.id));
      return;
    }

    if (version_info.release_type === 2) {
      player.sendMessage(notAvailableMsg(event.id));
      return;
    }

    if (event.id == "timerv:sd_dump") {
      print(save_data)
    }

    if (event.id == "timerv:reset") {
      update_save_data(undefined)
      return close_world()
    }
  }

/*------------------------
  API Requests
-------------------------*/

  if (system_privileges !== 2) {
    if (event.id === "multiple_menu:open_"+version_info.uuid) {
      initialize_main_menu(player, true);
    }

    if (event.id === "timerv:api_show_actionbar") {
      save_data[player_sd_index].absolute_visibility = true
      update_save_data(save_data)
    }

    if (event.id === "timerv:api_hide_actionbar") {
      save_data[player_sd_index].absolute_visibility = false
      update_save_data(save_data)
    }
  }

/*------------------------
 Menu Requests
-------------------------*/

  if (event.id === "timerv:menu" && save_data[player_sd_index].gesture.command) {
    save_data[player_sd_index].openend_menu_via_command = true
    update_save_data(save_data)
    initialize_main_menu(player);
  }


  if (event.id === "timerv:menu_soundkey") {
    let version;
    if (event.message == "v1") {
      version = 1
    }
    if (event.message == "v2") {
      version = 2
    }
    player.playSound(translate_soundkeys("menu.open", player));
    player.queueMusic(translate_soundkeys("music.menu.settings.debug", player), { fade: 0.3, loop: true });
    return soundkey_test(player, version)
  }


});


// via. item
world.beforeEvents.itemUse.subscribe(event => {
  const save_data = load_save_data();
  const idx = save_data.findIndex(e => e.id === event.source.id);

	if (event.itemStack.typeId === "minecraft:stick" && save_data[idx].gesture.stick) {
      system.run(() => {
        initialize_main_menu(event.source);
      });
	}
});

// via. jump gesture
const gestureCooldowns_jump = new Map();
const gestureState_reset = new Map(); // Speichert, ob Sneak+Jump zurückgesetzt wurden

async function gesture_jump() {
  const now = Date.now();

  for (const player of world.getAllPlayers()) {
    const lastUsed = gestureCooldowns_jump.get(player.id) || 0;
    const state = gestureState_reset.get(player.id) || { reset: true }; // true = darf wieder ausgelöst werden

    const isSneaking = player.isSneaking;
    const isJumping = player.isJumping;

    // Wenn beide false sind, erlauben wir wieder eine Auslösung beim nächsten Mal
    if (!isSneaking && !isJumping) {
      gestureState_reset.set(player.id, { reset: true });
    }

    // Wenn beide true sind UND vorher ein Reset war UND Cooldown abgelaufen
    if (isSneaking && isJumping && state.reset && (now - lastUsed >= 100)) {
      const save_data = load_save_data();
      const idx = save_data.findIndex(e => e.id === player.id);
      if (save_data[idx].gesture.sneak) {
        initialize_main_menu(player);
      }

      gestureCooldowns_jump.set(player.id, now);
      gestureState_reset.set(player.id, { reset: false }); // Warten bis beide wieder false sind
      await system.waitTicks(10);
    }
  }
}




// via. emote gesture
const gestureCooldowns_emote = new Map();
const gestureState_reset_emote = new Map(); // Speichert, ob Emote zurückgesetzt wurde

async function gesture_emote() {
  const now = Date.now();

  for (const player of world.getAllPlayers()) {
    const lastUsed = gestureCooldowns_emote.get(player.id) || 0;
    const state = gestureState_reset_emote.get(player.id) || { reset: true };

    const isEmoting = player.isEmoting;

    // Wenn Emoting zwischendurch false ist → Reset erlauben
    if (!isEmoting) {
      gestureState_reset_emote.set(player.id, { reset: true });
    }

    // Wenn Emoting aktiv ist, Reset gesetzt ist und Cooldown abgelaufen ist → Menü öffnen
    if (isEmoting && state.reset && (now - lastUsed >= 100)) {
      const save_data = load_save_data();
      const idx = save_data.findIndex(e => e.id === player.id);
      if (save_data[idx].gesture.emote) {
        initialize_main_menu(player);
      }

      gestureCooldowns_emote.set(player.id, now);
      gestureState_reset_emote.set(player.id, { reset: false }); // Bis zum nächsten Emote-Ende blockieren
      await system.waitTicks(10);
    }
  }
}


// via. nod gesture
const playerHeadMovement = new Map();

async function gesture_nod() {
  const now = Date.now();

  for (const player of world.getAllPlayers()) {
    if (player.getGameMode() !== "Spectator") return -1;

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
      const save_data = load_save_data();
      const idx = save_data.findIndex(e => e.id === player.id);
      if (save_data[idx].gesture.nod) {
        initialize_main_menu(player);
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
 general helper functions
-------------------------*/

function check_player_gamemode(player) {
  const { challenge, time } = load_save_data()[0];
  const gm = player.getGameMode();

  if (challenge.progress === 0 && !world.isHardcore) {
    const target = "Creative";
    if (gm !== target) player.setGameMode(target);
  }

  if (challenge.progress === 1 && !world.isHardcore) {
    const target = time.do_count ? "Survival" : "Spectator";
    if (gm !== target) player.setGameMode(target);
  }

  if (challenge.progress === 2) {
    let target;
    if (challenge.rating === 1) {
      target = "Creative";
    } else {
      target = "Spectator";
    }
    if (gm !== target) player.setGameMode(target);
  }
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

/*------------------------
 CA End trigger
-------------------------*/

world.afterEvents.dataDrivenEntityTrigger.subscribe((eventData) => {
    const entity = eventData.entity;
    const triggerId = eventData.eventId;

    let save_data = load_save_data()

    if (entity.typeId === "minecraft:villager_v2" && triggerId === "minecraft:start_celebrating" && save_data[0].challenge.progress == 1 && save_data[0].time.do_count && save_data[0].challenge.goal.pointer == 2 && save_data[0].challenge.goal.event_pos == 1) {
      finished_cm_timer(1, "message.body.challenge_end.raid")
    }
});

world.afterEvents.entityDie.subscribe(event => {
  const save_data = load_save_data();

  if (save_data[0].challenge.progress == 1 && save_data[0].time.do_count && save_data[0].challenge.goal.pointer == 1 && event.deadEntity?.typeId === save_data[0].challenge.goal.entity_id) {
    if (event.deadEntity?.typeId == "minecraft:player") {
      return finished_cm_timer(1, "message.body.challenge_end.player", {name: event.deadEntity.name })
    } else {
      return finished_cm_timer(1, ["message.body.challenge_end.entity_0", "message.body.challenge_end.entity_1"], {}, ("entity."+save_data[0].challenge.goal.entity_id.replace(/^minecraft:/, "")+".name"))
    }
  }

  if (event.deadEntity?.typeId === "minecraft:player") {
    const player = event.deadEntity;
    const player_sd_index = save_data.findIndex(entry => entry.id === player.id);

    if (save_data[0].challenge.difficulty > 0 && save_data[0].challenge.progress == 1 && save_data[0].time.do_count) {
      finished_cm_timer(0, "message.body.challenge_end.bad", {time: apply_design(
        (
          typeof save_data[player_sd_index].design === "number"
            ? design_template.find(t => t.id == save_data[player_sd_index].design).content
            : save_data[player_sd_index].design
        ).find(item => item.type === "ui"),
        (save_data[0].counting_type == 0? save_data[0].time.stopwatch : save_data[0].time.last_value_timer - save_data[0].time.timer)
      )})
    }
  }
});

/*------------------------
 Menus
-------------------------*/

function initialize_main_menu(player, lauched_by_addon, lauched_by_joining) {
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  if (system_privileges == 1 && !lauched_by_addon && !lauched_by_joining) {
    player.playSound(translate_soundkeys("menu.open", player));
    return multiple_menu(player)
  }

  if (system_privileges == 2 || lauched_by_addon) {

    // open Setup menu
    if (save_data[player_sd_index].setup !== 100 && save_data[0].use_setup) {
      if (!lauched_by_addon) player.playSound(translate_soundkeys("menu.open", player));
      player.playMusic(translate_soundkeys("music.menu.setup", player), { fade: 0.3, loop: true });
      return setup_menu(player)
    }

    // Version update popup
    if (save_data[player_sd_index].op && (Math.floor(Date.now() / 1000)) > save_data[0].update_message_unix && lauched_by_joining) {
      player.playMusic(translate_soundkeys("music.menu.setup", player), { fade: 0.3 });
      let form = new ActionFormData();
      let lang = save_data[player_sd_index].lang
      form.title(translate_textkeys("menu.update.title", lang));
      form.body(translate_textkeys("menu.update.description", lang, {time: getRelativeTime(Math.floor(Date.now() / 1000) - version_info.unix, player)}));
      form.button(translate_textkeys("menu.update.mute", lang));

      const showForm = async () => {
        form.show(player).then((response) => {
          if (response.canceled && response.cancelationReason === "UserBusy") {
            showForm()
          } else {
            if (response.selection === 0) {
              save_data[0].update_message_unix = (Math.floor(Date.now() / 1000)) + version_info.update_message_period_unix;
              update_save_data(save_data);
            }
            if (response.selection == undefined ) {
              return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
            }
          }
        });
      };
      showForm();
    }


    // Preventing the main menu from opening every time when a player joined the game
    if (lauched_by_joining) return -1

    // open Main menu
    if (!lauched_by_addon) player.playSound(translate_soundkeys("menu.open", player));
    player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
    return main_menu(player)

  }
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
world.afterEvents.itemStartUseOn.subscribe(evt => updateActivity(evt.source));

/*------------------------
 Update loop
-------------------------*/

async function update_loop() {
    while (true) {
      let save_data = load_save_data();
      gesture_nod()
      gesture_jump()
      gesture_emote()

      if (save_data[0].global.status) {
        calcAB(true, undefined, false)
      }

      if (save_data[0].sync_day_time) {
        world.gameRules.doDayLightCycle = false;
        world.gameRules.playersSleepingPercentage = 101;
      } else {
        world.gameRules.doDayLightCycle = true;
        world.gameRules.playersSleepingPercentage = 100;
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

        save_data[player_sd_index].last_unix = Math.floor(Date.now() / 1000) // Update last unix time
        update_save_data(save_data)

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



        if (save_data[player_sd_index].absolute_visibility == true) {
          player.onScreenDisplay.setActionBar(render_live_actionbar(save_data[player_sd_index], save_data[0].global.status ? false : true));
        }

      }

      // AFK
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


      await system.waitTicks(1);
    }
}

update_loop();
});

/*------------------------
 Render Actionbar & Count up
-------------------------*/

export function render_live_actionbar(selected_save_data, do_update) {
  const data = load_save_data();
  let tv = calcAB(do_update, selected_save_data.id, false);

  const design = typeof selected_save_data.design === "number"
    ? design_template.find(item => item.id == selected_save_data.design)?.content
    : selected_save_data.design;

  if (!Array.isArray(design)) {
    console.warn("Invalid or missing design");
    return "";
  }

  let d0, d1;
  if (selected_save_data.counting_type !== 3) {
    if (data[0]?.challenge?.progress == 2) {
      d0 = design.find(d => d.type === "finished");
    } else {
      d0 = tv.do_count
        ? design.find(d => d.type === "normal")
        : (tv.value === 0
            ? design.find(d => d.type === "screen_saver")
            : design.find(d => d.type === "paused"));
    }
    if (selected_save_data.time_day_actionbar || data[0].sync_day_time)
      d1 = design.find(d => d.type === "day");
  } else {
    d0 = design.find(d => d.type === "day");
  }

  if (d0?.type === "screen_saver" && d1) {
    return apply_design(d1, calcAB(true, selected_save_data.id, true).value);
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
          if (timedata.timer == 0) {
            if (data[0].challenge.progress == 1) {
              if (data[0].challenge.goal.pointer == 2 && data[0].challenge.goal.event_pos == 0) {
                finished_cm_timer(1, "message.body.challenge_end.time.good")
              } else {
                finished_cm_timer(0, "message.body.challenge_end.time.bad")
              }
              return -1;
            } else {
              timedata.do_count = false;
              if (data[0].global.status) {
                world.getAllPlayers().forEach(player => {
                  idx = data.findIndex(e => e.id === player.id);
                  let lang = data[idx].lang
                  player.sendMessage("§l§4[§c"+translate_textkeys("message.header.condition", lang)+"§4]§r "+ translate_textkeys("message.body.condition.expired", lang, {time: apply_design((typeof data[idx].design === "number" ? design_template[data[idx].design].content : data[idx].design).find(item => item.type === "ui"), timedata.last_value_timer - timedata.timer)}))

                  player.onScreenDisplay.setTitle("§4"+translate_textkeys("message.title.condition.expired", lang))
                  player.playSound(translate_soundkeys("condition.expired", player))
                });
              } else {
                let player = world.getAllPlayers().find(player => player.id == id)
                idx = data.findIndex(e => e.id === player.id);
                let lang = data[idx].lang
                player.sendMessage("§l§4[§c"+translate_textkeys("message.header.condition", lang)+"§4]§r "+translate_textkeys("message.body.condition.expired", lang, {time: apply_design((typeof data[idx].design === "number" ? design_template[data[idx].design].content : data[idx].design).find(item => item.type === "ui"), timedata.last_value_timer - timedata.timer)}))
                player.onScreenDisplay.setTitle("§4"+translate_textkeys("message.title.condition.expired", lang))
                player.playSound(translate_soundkeys("condition.expired", player))
              }
            }
          }
          timedata.timer = Math.max(timedata.timer - 1, 0);
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
        world.setTimeOfDay(Math.floor(((ticks % 24000) + 24000) % 24000));
      }

    } else {
      timevalue = { value: world.getTimeOfDay(), do_count: true };
    }
  }
  return timevalue;
}