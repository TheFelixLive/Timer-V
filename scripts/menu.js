import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"

import { version_info, links } from "./version.js";
import { system_privileges, multiple_menu, challenge_list } from "./communication_system.js";
import { apply_design, design_template  } from "./design.js";

import { difficulty  } from "./difficulty.js";

import { load_save_data, update_save_data, create_player_save_data, convertUnixToDate, getRelativeTime, convert_local_to_global, convert_global_to_local, start_cm_timer, finished_cm_timer, markdownToMinecraft, compareVersions, server_ip, github_data, close_world, server_utc, control_timer } from "./helper_function.js";
import { translate_soundkeys } from "./sound";
import { translate_textkeys, supportedLangs } from "./lang.js";
import { timezone_list } from "./time_zone.js";

import { render_live_actionbar } from "./main.js";

/*------------------------
 Setup Menu
-------------------------*/

import { uu_find_gen, universel_updater, gen_list } from "./universel_updater.js";

export function setup_menu(player) {
  let save_data = load_save_data()
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang



  /*
  ### Admins
  - Language
  - UTC (20%)
  - Updates (60%)
  - Custome Sounds (80%)
  - Challenge Mode (90%)
  - Intruduction (100%)


  ### Members
  - Language (0%)
  - Custome Sounds (50%)
  - Intruduction (100%)
  */


  // Lang (SD from older Version will triger the setup)
  if (save_data[player_sd_index].setup < 20) {
    return settings_lang(player, true)
  }

  // Admin: UTC
  if (save_data[player_sd_index].setup == 20 && player.playerPermissionLevel === 2) {
    if (save_data[0].utc !== undefined) {
      save_data[player_sd_index].setup = 60
      update_save_data(save_data)
      return setup_menu(player)
    }
    return settings_time_zone(player, 0, true)
  }

  // Admin: Universel Updater
  if (save_data[player_sd_index].setup == 60 && player.playerPermissionLevel === 2) {
    let gen = uu_find_gen()

    if (typeof(gen) === 'number') {
      return universel_updater(player, gen)
    } else {
      save_data[player_sd_index].setup = 80
      update_save_data(save_data)
      return setup_menu(player)
    }
  }

  // Custome Sounds
  if ((save_data[player_sd_index].setup == 80 && player.playerPermissionLevel === 2) || save_data[player_sd_index].setup == 50 && player.playerPermissionLevel !== 2) {
    return settings_cs_setup(player, true)
  }

  // Challenge Mode
  if (save_data[player_sd_index].setup == 90 && player.playerPermissionLevel === 2) {
    if (save_data[0].challenge.active) {
      save_data[player_sd_index].setup = 100
      update_save_data(save_data)
      return setup_menu(player)
    } else {
      return splash_challengemode(player, true)
    }
  }

  // Intruduction
  if (save_data[player_sd_index].setup == 100) {
    let form = new ActionFormData();
    form.title(translate_textkeys("menu.setup.title", lang));
    if (world.isHardcore) {
      form.body(translate_textkeys("menu.setup.description.hardcore", lang, {name: save_data[player_sd_index].name}));
    } else {
      form.body(translate_textkeys("menu.setup.description", lang, {name: save_data[player_sd_index].name}));
    }
    form.button(translate_textkeys("menu.main.title", lang));

    form.show(player).then((response) => {
      player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.open_menu", lang))
      if (response.selection == undefined ) {
        return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      }

      if (response.selection === 0) {
        player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3 });
        main_menu(player)
      }

    })

  }
}

/*------------------------
 Main Menu
-------------------------*/

export function main_menu(player) {
  let form = new ActionFormData();
  let save_data = load_save_data()
  let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang
  form.title(translate_textkeys("menu.main.title",lang));

  let actions = main_menu_actions(player, form);

  // Skips the main menu to settings if not needed

  // Hilfsvariablen für Klarheit
  const hasOneButton = actions.length == 1;
  const hasTwoButton = actions.length == 2;
  const isChallengeActive = save_data[0].challenge.active;
  const isChallengeRunning = save_data[0].challenge.progress == 1;
  const hasBackButton = system_privileges !== 2;

  // condition for a skip
  const condition1 = !hasBackButton && hasOneButton && !isChallengeActive;
  const condition2 = hasBackButton && hasTwoButton && !isChallengeActive;
  const condition3 = hasOneButton && isChallengeActive && !isChallengeRunning && !hasBackButton;
  const condition4 = hasBackButton && hasTwoButton && isChallengeActive && !isChallengeRunning;

  // Well the skip function
  if (condition1 || condition2 || condition3 || condition4) {
      return actions[0]();
  }



  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (actions[response.selection]) {
      actions[response.selection]();
    }
  });
}

function main_menu_actions(player, form) {
  let actions = []
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)
  let lang = save_data[player_sd_index].lang;


  if (form) {
    if (save_data[0].challenge.active && save_data[0].challenge.progress == 1) {
      form.body({rawtext:[
        { text: translate_textkeys("menu.main.description.ca", lang) + "\n" },
        ...render_task_list(player),
        { text: "\n" }
      ]});

    } else {
    form.body(translate_textkeys("menu.general.description", lang));
    }
  }

  let timedata;
  if (save_data[0].global.status) {
    timedata = save_data[0]
  } else {
    timedata = save_data[player_sd_index]
  }

  if (!save_data[0].global.status || save_data[0].global.status && player.playerPermissionLevel === 2) {
    if (timedata.counting_type == 0 || timedata.counting_type == 1) {

      // Control
      if (((timedata.counting_type == 0 || (timedata.counting_type == 1 & timedata.time.timer > 0)) && (!save_data[player_sd_index].afk || save_data[0].global.status || timedata.time[timedata.counting_type == 1 ? "timer" : "stopwatch"] == 0) &&  !save_data[0].challenge.active)  || (save_data[0].challenge.active && save_data[0].challenge.progress == 1 && (!world.isHardcore || world.isHardcore && save_data[player_sd_index].allow_unnecessary_inputs))) {
        if(form){form.button(translate_textkeys("message.header.condition", lang)+" " + (world.isHardcore? translate_textkeys("menu.item_experimental", save_data[player_sd_index].lang) +"§r\n" : "\n") + (timedata.time.do_count === true ? "§a"+translate_textkeys("menu.main.condition.resumed", lang) : "§c"+translate_textkeys("menu.main.condition.paused", lang)), (timedata.time.do_count === true ? "textures/ui/toggle_on" : "textures/ui/toggle_off"))}
        actions.push(() => {
          player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
          if (timedata.time.do_count === false) {
            control_timer(player, "resume")
          } else {
            control_timer(player, "pause")
          }
        });
      }


      if (timedata.time[timedata.counting_type == 1 ? "timer" : "stopwatch"] > 0 && !save_data[0].challenge.active) {
        // AFK
        if (!save_data[0].global.status) {
          if(form){form.button(translate_textkeys("menu.main.afk.title", lang)+"\n" + (save_data[player_sd_index].afk === true ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), (save_data[player_sd_index].afk === true ? "textures/ui/toggle_on" : "textures/ui/toggle_off"))}
          actions.push(() => {
            if (save_data[player_sd_index].afk) {
              save_data[player_sd_index].afk = false
            } else {
              save_data[player_sd_index].afk = true
              save_data[player_sd_index].time.do_count = true
            }

            update_save_data(save_data);
            main_menu(player);
          });
        }
        // Reset timer
        if(form){form.button("§c"+translate_textkeys("menu.main.reset.title", lang, {mode: (timedata.counting_type == 1 ? translate_textkeys("menu.mode.timer", save_data[player_sd_index].lang) : translate_textkeys("menu.mode.stopwatch", save_data[player_sd_index].lang))}), "textures/ui/recap_glyph_color_2x")}
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

    // Give up
    if (challenge.progress === 1) {
      if (form) form.button("§c"+translate_textkeys("menu.popup.give_up", lang), "textures/blocks/barrier");
      actions.push(() => {
        splash_end_challenge(player)
      });
    }

    // Reset Challenge
    if (challenge.progress === 2 && (isHardcore && challenge.rating === 1 || !isHardcore)) {
      if (form) form.button("§a"+translate_textkeys("menu.main.reset.title.ca", lang), "textures/ui/recap_glyph_color_2x");
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

    // Challenge Default
    if (challenge.active && challenge.progress == 0) {
      if (timedata.counting_type !== 1 || timedata.time.timer > 0) {
        if (form) form.button("§2" + translate_textkeys("menu.popup.ca.start", lang) +"\n", "textures/gui/controls/right");
        actions.push(() => {
          splash_start_challenge(player);
        });
        if(form) form.divider()
      }

      if (form) form.button({rawtext:
        [
          { text: "§5"+translate_textkeys("menu.goal.title", lang)+"§9\n" },
          challenge.goal.pointer === 2
            ? { text: goal_event[challenge.goal.event_pos].name }
            : challenge.goal.pointer === 0
            ? { text: translate_textkeys("menu.goal.random.title", lang) }
            : { translate: "entity." + save_data[0].challenge.goal.entity_id.replace(/^minecraft:/, "") + ".name" }
        ]},
        "textures/items/elytra"
      );

      actions.push(() => {
        player.playMusic(translate_soundkeys("music.menu.goal", player), { fade: 0.3 , loop: true});
        settings_goals_main(player);
      });

      if (form) form.button("§c"+translate_textkeys("menu.difficulty.title", lang)+"\n" + difficulty[challenge.difficulty].name + "", difficulty[challenge.difficulty].icon);
      actions.push(() => {
        player.playMusic(translate_soundkeys("music.menu.difficulty", player), { fade: 0.3 , loop: true});
        settings_difficulty(player);
      });

      if (challenge_list.length > 0) {
        if(form) {
          let names = challenge_list
            .filter(c => save_data[0]?.challenge?.external_challenge.includes(c.uuid))
            .map(c => c.name);

          let nameText = names.length > 1 ? names.slice(0,-1).join(", ") + " & " + names[names.length-1] : names[0] || "";

          let buttonText = translate_textkeys("menu.challenge.title", lang) + (names.length > 0 ? "\n§9" + nameText : "");

          form.button(buttonText, "textures/items/chain");

        }
        actions.push(() => {
          player.playMusic(translate_soundkeys("music.menu.challenge", player), { fade: 0.3, loop: true });
          challenge_main(player);
        });
      }
    }

    // "Change / add time" button
    if (!(challenge.active && challenge.progress > 0) && (timedata.counting_type == 1 || (timedata.counting_type == 0 && (save_data[player_sd_index].afk || save_data[0].global.status)) || (timedata.counting_type == 2 && save_data[0].challenge.active))) {
      if (form) {
        form.button(
          (challenge.active ? translate_textkeys("menu.start_time.title.ca", lang)+"\n" : translate_textkeys("menu.start_time.title", lang)+"\n") +
          apply_design(
            (
              typeof save_data[player_sd_index].design === "number"
                ? design_template.find(t => t.id == save_data[player_sd_index].design).content
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

  if(form && save_data[0].challenge.progress !== 1) form.divider()

  // Button: Settings
  if(form) {form.button(translate_textkeys("menu.settings.title", lang), "textures/ui/automation_glyph_color")}
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
    settings_main(player);
  });

  // Multimenu
  if (system_privileges !== 2) {
    if(form) form.button("");
    actions.push(() => {
      player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      world.scoreboard.addObjective("mm_data");
      world.scoreboard.getObjective("mm_data").setScore(JSON.stringify({event: "mm_open", data:{target: "main"}}), 1);
      player.runCommand("scriptevent multiple_menu:data");
    });
  }

  return actions
}

/*------------------------
    Change Time
-------------------------*/

function settings_start_time(player) {
  const save = load_save_data();
  const idx  = save.findIndex(e => e.id === player.id);
  const lang = save[idx].lang
  const form = new ModalFormData().title(save[0].challenge.active ? translate_textkeys("menu.start_time.title.ca", lang) : translate_textkeys("menu.start_time.title", lang))
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

  if (allow) {
    form.slider(translate_textkeys("menu.start_time.unit.y", lang),        0,  9,   {defaultValue: time.y});
    form.slider(translate_textkeys("menu.start_time.unit.w", lang),        0, 52,   {defaultValue: time.w});
    form.slider(translate_textkeys("menu.start_time.unit.d", lang),         0,  6,   {defaultValue: time.d});
  } else {
    form.slider(translate_textkeys("menu.start_time.unit.d", lang),         0, 30,   {defaultValue: time.d});
  }
  form.slider(translate_textkeys("menu.start_time.unit.h", lang),        0, 23,   {defaultValue: time.h});
  form.slider(translate_textkeys("menu.start_time.unit.m", lang),      0, 59,   {defaultValue: time.m});
  form.slider(translate_textkeys("menu.start_time.unit.s", lang),      0, 59,   {defaultValue: time.s});
  if (allow) form.slider(translate_textkeys("menu.start_time.unit.ms", lang),0,950,  {valueStep: 50, defaultValue: time.ms});
  form.submitButton(translate_textkeys("menu.start_time.submit", lang));

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

/*------------------------
    Challenge Menu
-------------------------*/

function challenge_main(player) {
  let form = new ActionFormData();
  let actions = [];
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang

  form.title(translate_textkeys("menu.challenge.title", lang));

  const activeUUIDs = new Set(save_data[0].challenge.external_challenge || []);
  const active = challenge_list.filter(ch => activeUUIDs.has(ch.uuid));
  const available = challenge_list.filter(ch => !activeUUIDs.has(ch.uuid));

  // Unavailable anhand der Inkompatibilitäten aktiver Challenges bestimmen
  const incompatible = new Set();
  active.forEach(a => a.incompatibilities?.forEach(uuid => incompatible.add(uuid)));

  const unavailable = available.filter(ch => incompatible.has(ch.uuid));
  const availableFiltered = available.filter(ch => !incompatible.has(ch.uuid));

  // Hilfsfunktion für Buttons
  function addButton(challenge, onClick) {
    if (challenge.icon) form.button(challenge.name, challenge.icon);
    else form.button(challenge.name || challenge.uuid);
    actions.push(onClick);
  }

  // --- Active Challenges ---

  form.body(translate_textkeys("menu.challenge.label.active", lang));
  if (active.length) {
    active.forEach(ch =>
      addButton(ch, () => {
        challenge_details(player, ch);
      })
    );
  } else {
    form.label(translate_textkeys("menu.challenge.label.active.empty", lang));
  }
  form.divider();


  // --- Available Challenges ---

  form.label(translate_textkeys("menu.challenge.label.available", lang));
  if (availableFiltered.length) {
    availableFiltered.forEach(ch =>
      addButton(ch, () => {
        challenge_details(player, ch);
      })
    );
  } else {
    form.label(translate_textkeys("menu.challenge.label.available.empty", lang));
  }
  form.divider();

  // --- Unavailable Challenges ---
  if (unavailable.length) {
    form.label(translate_textkeys("menu.challenge.label.unavailable", lang));
    unavailable.forEach(ch =>
      addButton(ch, () => challenge_details(player, ch))
    );
    form.divider();
  }



  form.button("");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
    return main_menu(player);
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

export function challenge_details(player, challenge) {
  let form = new ActionFormData();
  let actions = [];
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang;
  form.title(challenge.name || challenge.uuid);

  form.body(translate_textkeys("menu.general.description", lang));

  const activeUUIDs = new Set(save_data[0].challenge.external_challenge || []);
  const active = typeof challenge_list !== "undefined"
    ? challenge_list.filter(ch => activeUUIDs.has(ch.uuid))
    : [];
  const incompatible = new Set();
  active.forEach(a => a.incompatibilities?.forEach(uuid => incompatible.add(uuid)));

  const isActive = activeUUIDs.has(challenge.uuid);
  const isUnavailable = !isActive && incompatible.has(challenge.uuid);

  if (!isUnavailable) {
    form.button(
      translate_textkeys("menu.challenge.button.active", lang) + "\n" +
      (isActive ? translate_textkeys("menu.toggle_on", lang) : translate_textkeys("menu.toggle_off", lang)),
      (isActive ? "textures/ui/toggle_on" : "textures/ui/toggle_off")
    );
    actions.push(() => {
      if (isActive) {
        save_data[0].challenge.external_challenge = save_data[0].challenge.external_challenge.filter(uuid => uuid !== challenge.uuid);
      } else {
        save_data[0].challenge.external_challenge.push(challenge.uuid);
      }
      update_save_data(save_data);
      challenge_details(player, challenge);
    });
  }

  if (challenge.config_available) {
    form.button(translate_textkeys("menu.challenge.button.config", lang), "textures/ui/automation_glyph_color");
    actions.push(() => {
      world.scoreboard.addObjective("ccs_data");
      world.scoreboard.getObjective("ccs_data").setScore(JSON.stringify({ event: "ccs_config", data: { target: challenge.uuid } }), 1);
      player.runCommand("scriptevent ccs:data");
    });
  }

  form.divider();

  if (challenge.about_available) {
    form.button(translate_textkeys("menu.settings.about", lang), "textures/ui/infobulb");
    actions.push(() => {
      player.playMusic(translate_soundkeys("music.menu.dictionary", player), { fade: 0.3, loop: true });
      world.scoreboard.addObjective("ccs_data");
      world.scoreboard.getObjective("ccs_data").setScore(JSON.stringify({ event: "ccs_about", data: { target: challenge.uuid } }), 1);
      player.runCommand("scriptevent ccs:data");
    });
  }

  form.divider();
  form.button("");
  actions.push(() => {
    challenge_main(player);
  });

  form.show(player).then((response) => {
    if (response.selection == undefined) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection !== undefined && actions[response.selection]) {
      actions[response.selection]();
    }
  });
}


/*------------------------
    Other CA Menus & render_task_list
-------------------------*/

import { settings_goals_main, render_task_list, goal_event } from "./goal.js";
import { settings_difficulty } from "./difficulty.js";

/*------------------------
  Challenge Mode start / stop splash screens
-------------------------*/

export function splash_start_challenge(player) {
  let form = new MessageFormData();
  let save_data = load_save_data()
  let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang

  form.title(translate_textkeys("menu.warning", lang));
  form.body({rawtext:[{text: translate_textkeys("menu.popup.ca.start.description", lang)}, ...render_task_list(player), {text: "\n\n"}]});

  form.button1("§a"+translate_textkeys("menu.start", lang));
  form.button2("");

  form.show(player).then((response) => {
    if (response.selection == 0) {
      player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      return start_cm_timer()
    }

    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }


    if (response.selection == 1) return main_menu(player);
  });
}

export function splash_end_challenge(player) {
  let form = new MessageFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)
  let lang = save_data[player_sd_index].lang

  form.title(translate_textkeys("menu.warning", lang));
  form.body(translate_textkeys("menu.popup.give_up.description", lang, {hardcore: world.isHardcore? translate_textkeys("menu.popup.give_up.description.hardcore", lang) : ""}))

  form.button1("§c"+translate_textkeys("menu.popup.give_up", lang));
  form.button2("");

  form.show(player).then((response) => {
    if (response.selection == 0) {
        let time;
        if (save_data[0].counting_type == 0) {
          time = save_data[0].time.stopwatch
        } else if (save_data[0].counting_type == 1) {
          time = save_data[0].time.last_value_timer - save_data[0].time.timer
        } else {
          time = system.currentTick
        }
        player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
        finished_cm_timer(0, "message.body.challenge_end.bad", {time: apply_design(
          (
            typeof save_data[player_sd_index].design === "number"
              ? design_template.find(t => t.id == save_data[player_sd_index].design).content
              : save_data[player_sd_index].design
          ).find(item => item.type === "ui"),
          (time)
        )})
    }

    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }


    if (response.selection == 1) return main_menu(player);
  });
}

/*------------------------
 Settings
-------------------------*/

export function settings_main(player) {
  let form = new ActionFormData();
  let actions = [];
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang

  form.title(translate_textkeys("menu.settings.title", lang));
  form.body(translate_textkeys("menu.general.description", lang));

  /*------------------------
    Timer
  -------------------------*/

  // Type
  if ((!save_data[0].global.status || (save_data[0].global.status && player.playerPermissionLevel === 2)) && ((save_data[0].challenge.active && save_data[0].challenge.progress == 0) || !save_data[0].challenge.active)) {
    form.label(translate_textkeys("menu.settings.label.timer", lang))
    form.button(
      translate_textkeys("menu.settings.type", lang) +
      "\n§9" + translate_textkeys(timer_modes[save_data[save_data[0].global.status ? 0 : player_sd_index].counting_type].label, lang),
      timer_modes[save_data[save_data[0].global.status ? 0 : player_sd_index].counting_type].icon
    );
    actions.push(() => settings_type(player));

    // Challenge Mode
    if (player.playerPermissionLevel === 2 && save_data[0].global.status && save_data[0].challenge.progress == 0 && !world.isHardcore && version_info.edition !== 1 && challenge_list.length == 0) {
      if(form){form.button(translate_textkeys("menu.popup.ca.title", lang)+"\n" + (save_data[0].challenge.active ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), save_data[0].challenge.active ? "textures/ui/toggle_on" : "textures/ui/toggle_off")};
      actions.push(() => {
        splash_challengemode(player);
      });
    }


    form.divider()
  }

  /*------------------------
   your_self
  -------------------------*/

  form.label(translate_textkeys("menu.settings.label.your_self", lang))

  // Language
  if (version_info.edition !== 1) {
    form.button(translate_textkeys("menu.settings.lang.title", lang)+"\n§r§9"+supportedLangs.find(l=> l.id == lang).name, "textures/ui/language_glyph_color");
    actions.push(() => {
      player.playMusic(translate_soundkeys("music.menu.settings.lang", player), { fade: 0.3 , loop: true})
      settings_lang(player)
    });
  }

  // Actionbar
  form.button(translate_textkeys("menu.settings.actionbar.title", lang)+"\n" + render_live_actionbar(save_data[player_sd_index], false), "textures/ui/brewing_fuel_bar_empty");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings.actionbar", player), { fade: 0.3 , loop: true})
    settings_actionbar(player)
  });

  // Gestures
  if (system_privileges == 2) {
    form.button(translate_textkeys("menu.settings.gestures.title", lang), "textures/ui/sidebar_icons/emotes");
    actions.push(() => {
      player.playMusic(translate_soundkeys("music.menu.settings.gestures", player), { fade: 0.3 , loop: true})
      settings_gestures(player)
    });
  }

  /*------------------------
   multiplayer
  -------------------------*/

  // Permission
  if (player.playerPermissionLevel === 2) {
    form.divider();
    form.label(translate_textkeys("menu.settings.label.multiplayer", lang));
  }


  // shared_timer
  if (player.playerPermissionLevel === 2 && !save_data[0].challenge.active && (save_data[0].counting_type !== 2 || !save_data[0].global.status)) {
    if(form){form.button(translate_textkeys("menu.popup.shared_timer.title", lang)+ "\n§9" + (save_data[0].global.status ? (save_data[0].global.last_player_id? translate_textkeys("menu.popup.shared_timer.by", lang, {player: save_data.find(e => e.id === save_data[0].global.last_player_id)?.name}) : translate_textkeys("menu.toggle_on", lang)) : translate_textkeys("menu.toggle_off", lang)), "textures/ui/FriendsIcon")};
    actions.push(() => {
      splash_globalmode(player);
    });
  }

  // Time zone
  if (player.playerPermissionLevel === 2 == true && version_info.edition !== 1) {
    let zone = timezone_list.find(zone => zone.utc === save_data[0].utc), zone_text;
    if(form) {
      if (!zone) {
        if (zone !== undefined) {
          zone = timezone_list.reduce((closest, current) => {
            const currentDiff = Math.abs(current.utc - save_data[0].utc);
            const closestDiff = Math.abs(closest.utc - save_data[0].utc);
            return currentDiff < closestDiff ? current : closest;
          });
          zone_text = "Prob. " + ("Prob. "+ zone.name.length > 30 ? zone.short : zone.name)
        }
      } else {
        zone_text = zone.name.length > 30 ? zone.short : zone.name
      }


      form.button(translate_textkeys("menu.settings.time_zone.title", save_data[player_sd_index].lang) + (zone !== undefined? "\n§9"+zone_text : ""), "textures/ui/world_glyph_color_2x")
    };
    actions.push(() => {
      player.playMusic(translate_soundkeys("music.menu.settings.time_zone", player), { fade: 0.3 , loop: true})
      if (save_data[0].utc_auto && server_utc) return settings_time_zone_preview(player, zone)
      settings_time_zone(player);
    });
  }

  /*------------------------
   features
  -------------------------*/

  form.divider()
  form.label(translate_textkeys("menu.settings.label.features", lang))

  // Fullbright
  form.button(translate_textkeys("menu.settings.fullbright", save_data[player_sd_index].lang)+"\n" + (save_data[player_sd_index].fullbright ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), (save_data[player_sd_index].fullbright ? "textures/items/potion_bottle_nightVision" : "textures/items/potion_bottle_empty"));
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


  // Custom Sounds
  if (version_info.edition !== 1) {
    form.button(translate_textkeys("menu.settings.cs.title", lang)+ "\n" + (save_data[player_sd_index].custom_sounds > 0 ? save_data[player_sd_index].custom_sounds == 1 ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : "§aon (legacy)" : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), save_data[player_sd_index].custom_sounds > 0 ? "textures/ui/toggle_on" : "textures/ui/toggle_off");
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
  }

  // Daytime-Sync
  if ((save_data[player_sd_index].time_day_actionbar || save_data[0].sync_day_time || save_data[player_sd_index].counting_type == 3) && save_data[0].challenge.progress == 0) {
    if ((save_data[player_sd_index].time_source === 1 || save_data[0].sync_day_time) && player.playerPermissionLevel === 2) {
      if(form){form.button(translate_textkeys("menu.main.sync_day_time", lang)+"\n" + (save_data[0].sync_day_time ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), (save_data[0].sync_day_time ? "textures/ui/toggle_on" : "textures/ui/toggle_off"))};
      actions.push(() => {
        if (!save_data[0].sync_day_time) {
          save_data[0].sync_day_time = true;
        } else {1
          save_data[0].sync_day_time = false;
        }
        update_save_data(save_data);
        settings_main(player);
      });
    }
  }

  /*------------------------
   advanced_settings
  -------------------------*/

  if (version_info.release_type !== 2 || player.playerPermissionLevel === 2 == true && version_info.edition !== 1) {
    form.divider()
    form.label(translate_textkeys("menu.settings.label.advanced_settings", lang))
  }

  // Disable Setup
  if (player.playerPermissionLevel === 2 == true && version_info.edition !== 1) {
    form.button(translate_textkeys("menu.settings.disable_setup", lang)+ "\n" + (!save_data[0].use_setup ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), !save_data[0].use_setup ? "textures/ui/toggle_on" : "textures/ui/toggle_off");
    actions.push(() => {
      if (save_data[0].use_setup) {
        save_data[0].use_setup = false
      } else {
        save_data[0].use_setup = true
      }
      update_save_data(save_data)
      settings_main(player)
    });
  }

  // Experimental features
  if (version_info.release_type !== 2) {
    form.button(translate_textkeys("menu.settings.experimental_features", lang)+"\n" + (save_data[player_sd_index].allow_unnecessary_inputs ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), "textures/ui/Add-Ons_Nav_Icon36x36");
    actions.push(() => {
      if (!save_data[player_sd_index].allow_unnecessary_inputs) {
        return settings_allow_unnecessary_inputs(player)
      } else {
        save_data[player_sd_index].allow_unnecessary_inputs = false;
      }
      update_save_data(save_data);
      settings_main(player);
    });
  }

  // Debug
  if (version_info.release_type === 0 && player.playerPermissionLevel === 2) {
    form.button("Debug\n", "textures/ui/ui_debug_glyph_color");
    actions.push(() => {
      debug_main(player);
      player.playMusic(translate_soundkeys("music.menu.settings.debug", player), { fade: 0.3 , loop: true})
    });
  }

  /*------------------------
   version
  -------------------------*/

  if (player.playerPermissionLevel === 2) {
    form.divider()
    form.label(translate_textkeys("menu.settings.label.version", lang))

    // Convert
    let gen = uu_find_gen()

    if (typeof(gen) === 'number' && version_info.edition !== 1) {
      form.button(translate_textkeys("menu.settings.update", lang)+"\n" + gen_list[gen] + " -> " + version_info.version, "textures/ui/icon_bell");
      actions.push(() => {
        universel_updater(player, gen)
        player.playMusic(translate_soundkeys("music.menu.setup", player), { fade: 0.3 });
      });
    }

    // Dictionary
    form.button(translate_textkeys("menu.settings.about", lang), "textures/ui/infobulb");
    actions.push(() => {
      player.playMusic(translate_soundkeys("music.menu.dictionary", player), { fade: 0.3, loop: true });
      dictionary_about(player)
    });
  }

  /*------------------------
   Main menu
  -------------------------*/

  // Skips the main menu to settings if not needed

  // Hilfsvariablen für Klarheit
  const hasOneButton = main_menu_actions(player, false).length == 1;
  const hasTwoButton = main_menu_actions(player, false).length == 2;
  const isChallengeActive = save_data[0].challenge.active;
  const isChallengeRunning = save_data[0].challenge.progress == 1;
  const hasBackButton = system_privileges !== 2;

  // condition for a skip
  const condition1 = !hasBackButton && hasOneButton && !isChallengeActive;
  const condition2 = hasBackButton && hasTwoButton && !isChallengeActive;
  const condition3 = hasOneButton && isChallengeActive && !isChallengeRunning && !hasBackButton;
  const condition4 = hasBackButton && hasTwoButton && isChallengeActive && !isChallengeRunning;

  // Well the skip function
  if (!(condition1 || condition2 || condition3 || condition4)) {
    form.divider()
    form.button("");
    actions.push(() => {
        player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
        main_menu(player)
    });
  } else if (hasBackButton) {
    form.divider()
    form.button("");
    actions.push(() => {
      return main_menu_actions(player, false)[1]()
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
    Type Settings
-------------------------*/

const timer_modes = [
  {
    label: "menu.mode.stopwatch",
    icon: "textures/items/clock_item",
    show_if: true
  },
  {
    label: "menu.mode.timer",
    icon: "textures/ui/timer",
    show_if: true
  },
  {
    label: "menu.mode.world_time",
    icon: "textures/ui/world_glyph_color",
    show_if: (save_data) => save_data[0].global.status
  },
  {
    label: "menu.mode.day_time",
    icon: "textures/environment/sun",
    show_if: (save_data, player_sd_index) => {
      return !save_data[0].global.status && save_data[player_sd_index].allow_unnecessary_inputs;
    }
  }
];

function settings_type(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();

  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  if (save_data[0].global.status) {
    player_sd_index = 0;
  }

  let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang

  form.title(translate_textkeys("menu.settings.type", lang));
  form.body(translate_textkeys("menu.general.description", lang));

  let validSelections = [];
  let actions = [];

  timer_modes.forEach((button, index) => {
    const shouldShow = typeof button.show_if === 'function' ? button.show_if(save_data, player_sd_index) : button.show_if;

    if (shouldShow) {
      validSelections.push(index);

      if (save_data[player_sd_index].counting_type === index) {
        form.button(translate_textkeys(button.label, lang) + "\n" + translate_textkeys("menu.item_selected", lang), button.icon);
      } else {
        form.button(translate_textkeys(button.label, lang), button.icon);
      }

      actions.push((response) => {
        let selectedIndex = index;

        if (selectedIndex !== undefined) {
          if (
            save_data[0].counting_type == 1 &&
            save_data[player_sd_index].counting_type !== selectedIndex &&
            save_data[0].challenge.goal.event_pos === 0 &&
            save_data[0].challenge.goal.pointer === 2
          ) {
            save_data[0].challenge.goal.pointer = 0;
          }

          if (
            (save_data[player_sd_index].counting_type === 0 || save_data[player_sd_index].counting_type === 1) &&
            save_data[player_sd_index].time.do_count &&
            save_data[player_sd_index].counting_type !== selectedIndex
          ) {
            return settings_type_info(player, response);
          }

          if (save_data[player_sd_index].counting_type !== selectedIndex) {
            save_data[player_sd_index].time.do_count = false;
          }

          save_data[player_sd_index].counting_type = selectedIndex;
          update_save_data(save_data);
          return settings_main(player);
        }
      });
    }
  });

  // Zurück-Button
  form.divider()
  form.button("");
  actions.push(() => {
    return settings_main(player);
  });

  form.show(player).then((response) => {
    if (response.selection === undefined) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (actions[response.selection]) {
      actions[response.selection](response);
    }
  });
}

function settings_type_info(player, response) {
  let form = new MessageFormData();
  let save_data = load_save_data();

  let player_sd_index;
  let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang

  if (save_data[0].global.status) {
    player_sd_index = 0;
  } else {
    player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  }

  form.title(translate_textkeys("menu.settings.type_info.title", lang));



  form.body(translate_textkeys("menu.settings.type_info.description", lang, {current_counting_type: save_data[player_sd_index].counting_type == 1 ? translate_textkeys("menu.mode.timer", lang) : translate_textkeys("menu.mode.stopwatch", lang), new_counting_type: translate_textkeys(timer_modes[response.selection].label, lang)}));

  let actions = [];

  form.button1(translate_textkeys("menu.settings.type_info.change_to", lang, {new_counting_type: translate_textkeys(timer_modes[response.selection].label, lang)}));
  actions.push(() => {
    save_data[player_sd_index].counting_type = response.selection;
    save_data[player_sd_index].time.do_count = false;

    update_save_data(save_data);
    return settings_main(player);
  });

  form.button2("");
  actions.push(() => {
    return settings_type(player); // Zurück zur settings_type Funktion
  });

  form.show(player).then((response_2) => {
    if (response_2.selection == undefined) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (actions[response_2.selection]) {
      actions[response_2.selection]();
    }
  });
}

/*------------------------
    Challenge Mode
-------------------------*/

function splash_challengemode(player, in_setup) {
  let form = new MessageFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang

  form.title(translate_textkeys("menu.popup.ca.title", lang));
  form.body(
    (!save_data[0].challenge.active
      ? translate_textkeys("menu.popup.ca.description", lang)
      : translate_textkeys("menu.popup.ca.description_in_ca", lang))
    + "\n\n§7"+ translate_textkeys("menu.popup.ca.note", lang) +"\n\n"
  );

  form.button1(!save_data[0].challenge.active ? "§a"+translate_textkeys("menu.enable", lang): "§c"+translate_textkeys("menu.disable", lang));
  form.button2(in_setup? translate_textkeys("menu.button_skip", lang) : "");


  form.show(player).then((response) => {
    if (response.canceled) {
      if (in_setup) player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.setup.closed", lang))
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (response.selection == 0) {
      // Disable
      if (save_data[0].challenge.active) {
        convert_local_to_global(save_data[0].global.last_player_id);
        save_data = load_save_data()

      } /* Enable */ else {
        if (in_setup) {
          if (!save_data[0].global.status) convert_local_to_global(player.id);
          save_data = load_save_data()
        }
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

    if (in_setup) {
      save_data[player_sd_index].setup = 100
      update_save_data(save_data);
      return setup_menu(player);
    } else {
      player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
      return main_menu(player)
    }
    return settings_main(player)
  });
}

/*------------------------
    shared_timer
-------------------------*/

export function splash_globalmode(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)
  let lang = save_data[player_sd_index].lang
  let design = (typeof save_data[player_sd_index].design === "number"? design_template.find(t => t.id == save_data[player_sd_index].design).content : save_data[player_sd_index].design).find(item => item.type === "ui");
  let actions = [];

  form.title(translate_textkeys("menu.popup.shared_timer.title", lang));

  form.body(translate_textkeys("menu.popup.shared_timer.description", lang, {
    replace_text: save_data[0].global.status ? save_data[0].global.last_player_id !== player.id ? translate_textkeys("menu.popup.shared_timer.description.replace_time", lang, {name: (save_data[0].global.last_player_id? save_data.find(e => e.id === save_data[0].global.last_player_id)?.name: translate_textkeys("menu.popup.shared_timer.description.unknown_player", lang)), own_time: apply_design(design, save_data[player_sd_index].time[save_data[player_sd_index].counting_type == 1 ? "timer" : "stopwatch"])}) : "" :
    translate_textkeys("menu.popup.shared_timer.description.contol", lang)
  }));

  if (save_data[0].global.status) {
    if (save_data[0].global.last_player_id !== player.id) {
      form.button("§e"+translate_textkeys("menu.popup.shared_timer.yours_instead", lang));
      actions.push(() => {
        convert_global_to_local(true);
        convert_local_to_global(player.id);
      });
    }

    form.button("§c"+translate_textkeys("menu.disable", lang));
    actions.push(() => {
      convert_global_to_local(true);
    });



  } else {
    form.button("§a"+translate_textkeys("menu.enable", lang));
    actions.push(() => {
      convert_local_to_global(player.id)
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
      settings_main(player);
    }
  });

}

/*------------------------
    Actionbar
-------------------------*/

import { settings_actionbar } from "./design.js";

/*------------------------
    Gestures
-------------------------*/

export function settings_gestures(player) {
  const form = new ActionFormData();
  const save_data = load_save_data();
  const idx = save_data.findIndex(e => e.id === player.id);
  const playerGestures = save_data[idx].gesture;
  let lang = save_data[idx].lang;
  let actions = [];

  // configured_gestures als Array mit Objekten
  let configured_gestures = [
    { name: translate_textkeys("menu.settings.gestures.emote", lang), id: "emote", modes: ["su", "a", "c"] },
    { name: translate_textkeys("menu.settings.gestures.sneak", lang), id: "sneak", modes: ["su", "a", "c"] },
    { name: translate_textkeys("menu.settings.gestures.nod", lang), id: "nod", modes: ["sp"] },
    { name: translate_textkeys("menu.settings.gestures.stick", lang), id: "stick", modes: ["su", "a", "c"] },
  ];

  form.title(translate_textkeys("menu.settings.gestures.title", lang));
  form.body(translate_textkeys("menu.settings.gestures.description", lang));


  const modeCounts = {
    su: 0, a: 0, c: 0, sp: 0
  };

  configured_gestures.forEach(({ id, modes }) => {
    if (playerGestures[id]) {
      modes.forEach(mode => {
        modeCounts[mode]++;
      });
    }
  });

  configured_gestures.forEach(({ name, id, modes }) => {
    const isOn = playerGestures[id];
    let label = `${name}\n${isOn ? translate_textkeys("menu.toggle_on", lang) : translate_textkeys("menu.toggle_off", lang)}`;
    let icon = isOn ? "textures/ui/toggle_on" : "textures/ui/toggle_off";
    let alwaysActive = false;

    // Wenn diese Geste aktiv ist und in einem Modus die einzige aktive Geste ist → restricted
    /*// Unused! Since "/timer menu" is allways anabled
    const restricted = isOn && modes.some(mode => modeCounts[mode] === 1);
    if (restricted) {
      label = name + "\n" + translate_textkeys("menu.toggle_restricted", lang);
      icon = "textures/ui/hammer_l_disabled";
      alwaysActive = true;
    }
    */

    form.button(label, icon);

    actions.push(() => {
      if (!alwaysActive) {
        playerGestures[id] = !playerGestures[id];
        update_save_data(save_data);
      }
      settings_gestures(player);
    });
  });

  form.divider()
  form.button("");
  actions.push(() => {
    if (system_privileges == 1) {
      return multiple_menu(player);
    }
    player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
    settings_main(player);
  });

  form.show(player).then(response => {
    if (response.selection === undefined) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    const sel = response.selection;
    if (typeof actions[sel] === "function") actions[sel]();
  });
}

/*------------------------
    Time Zone & Language
-------------------------*/

import { settings_lang } from "./lang.js";
import { settings_time_zone, settings_time_zone_preview } from "./time_zone.js";

/*------------------------
    Custom Sound
-------------------------*/

import {settings_cs_setup, soundkey_test /* This one is only in debug mode available */} from "./sound.js";

/*------------------------
    Experimental features
-------------------------*/

function settings_allow_unnecessary_inputs(player) {
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  let form = new MessageFormData();
  form.title("Experimental features");
  form.body("These features / changes are still under development and may contain §lunforeseen bugs§r. Once activated, the following features will be available:§7\n\n- All entities, including those from behavior packs, can be set as goal\n\n- The maximum limit of a timer will be increased to 10 years\n\n- Hardcore modes can be used without hardcore worlds\n\n- Timer can be paused in hardcore mode§r\n\nDo you really want to activate it?\n ");
  form.button2("");
  form.button1("§aEnable");
  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection == 0) {
      save_data[player_sd_index].allow_unnecessary_inputs = true;
      update_save_data(save_data);
    }

    return settings_main(player);
  });
}

/*------------------------
    Debug
-------------------------*/

export function debug_main(player) {
  let form = new ActionFormData()
  let actions = []
  let save_data = load_save_data()
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  form.body("DynamicPropertyTotalByteCount: "+world.getDynamicPropertyTotalByteCount() +" of 32767 bytes used ("+Math.floor((world.getDynamicPropertyTotalByteCount()/32767)*100) +" Procent)")


  form.button("§e\"save_data\" Editor");
  actions.push(() => {
    debug_sd_editor(player, () => debug_main(player), [])
  });

  form.button("Trigger Setup");
  actions.push(async () => {
    save_data[player_sd_index].setup = 0
    update_save_data(save_data)
    player.sendMessage("Setup triggered!");
    player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
  });

  form.button("§cRemove \"save_data\"");
  actions.push(() => {
    world.setDynamicProperty("timerv:save_data", undefined);
    return close_world()
  });


  form.button("§cClose Server");
  actions.push(() => {
    return close_world()
  });


  form.button("soundkey_test");
  actions.push(() => {
    return soundkey_test(player, undefined)
  });

  form.button("§cReset Design");
  actions.push(() => {
    save_data[player_sd_index].design = 0
    update_save_data(save_data)
    return debug_main(player)
  });


  form.divider()
  form.button("");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
    return settings_main(player)
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

function debug_sd_editor(player, onBack, path = []) {
  let actions = [];
  const save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  let current = save_data;
  for (const key of path) {
    current = current[key];
  }

  const returnToCurrentMenu = () => debug_sd_editor(player, onBack, path);

  // === A) Array-Branch ===
  if (path.length === 0 && Array.isArray(current)) {
    const form = new ActionFormData()
      .title("SD notepad v.2.0")
      .body(`Path: §7save_data/`);

    current.forEach((entry, idx) => {
      const label = idx === 0
        ? `Server [${idx}]`
        : `${entry.name ?? `Player ${idx}`} [${entry.id ?? idx}]`;
      form.button(label, "textures/ui/storageIconColor");

      // Push action for this entry
      actions.push(() => {
        debug_sd_editor(
          player,
          returnToCurrentMenu,
          [...path, idx]
        );
      });
    });

    form.button("§aAdd player", "textures/ui/color_plus");
    actions.push(() => {
      return debug_add_fake_player(player);
    });

    form.divider()
    form.button(""); // Back (no action needed here)

    form.show(player).then(res => {
      if (res.selection == undefined) {
        return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      }
      if (res.selection === current.length + 1) { // Back button index
        return onBack();
      }

      // Execute selected action
      actions[res.selection]?.();
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
      .title("SD notepad v.2.0")
      .body(`Path: §7${displayPath}`);

    // Dateneinträge als Buttons
    keys.forEach(key => {
      const val = current[key];
      if (typeof val === "boolean") {
        form.button(
          `${key}\n${val ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)}`,
          val ? "textures/ui/toggle_on" : "textures/ui/toggle_off"
        );
      } else if (typeof val === "number") {
        form.button(`${key}: ${val}§r\n§9type: number`, "textures/ui/editIcon");
      } else if (typeof val === "string") {
        form.button(`${key}: ${val}§r\n§9type: string`, "textures/ui/editIcon");
      } else {
        form.button(`${key}`, "textures/ui/storageIconColor");
      }

      // Aktionen pushen
      actions.push(() => {
        const nextPath = [...path, key];
        const fresh = load_save_data();
        let target = fresh;
        for (const k of nextPath.slice(0, -1)) {
          target = target[k];
        }
        const val = target[key];

        if (typeof val === "boolean") {
          target[key] = !val;
          update_save_data(fresh);
          returnToCurrentMenu();
        } else if (typeof val === "number" || typeof val === "string") {
          openTextEditor(
            player,
            String(val),
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
    });
    // Optional: Remove player
    if (path.length === 1 && path[0] !== 0) {
      form.button("Open in Permissions", "textures/ui/op");
      actions.push(() => {
        player.playMusic(translate_soundkeys("music.menu.settings.rights", player), { fade: 0.3, loop: true });
        return settings_rights_data(player, save_data[Number(path[0])]);
      });
    }

    // Zurück-Button
    form.divider()
    form.button("");
    actions.push(() => onBack());

    form.show(player).then(res => {
      if (res.selection == undefined) {
        return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      }

      // Aktion ausführen
      const action = actions[res.selection];
      if (action) {
        action();
      }
    });

  }
}

function openTextEditor(player, current, path, onSave, onCancel) {
  let save_data = load_save_data()
  const displaySegments = path.map((seg, idx) => {
    if (idx === 0) {
      return seg === 0 ? "server" : save_data[Number(seg)]?.id ?? seg;
    }
    return seg;
  });

  const fullPath = `save_data/${displaySegments.join("/")}`;
  const form = new ModalFormData();
  form.title("Edit Text");
  form.textField(`Path: ${fullPath} > Value:`, "Enter text...", {defaultValue: current});
  form.submitButton("Save");

  form.show(player).then(res => {
    if (res.canceled) {
      return onCancel();
    }

    let input = res.formValues[0];
    // Wenn der String nur aus Ziffern besteht, in Zahl umwandeln
    if (/^\d+$/.test(input)) {
      input = Number(input);
    }

    onSave(input);
  });
}

function debug_add_fake_player(player) {
  let form = new ModalFormData();
  let UniqueId = ""+generateEntityUniqueId()

  form.textField("Player name", player.name);
  form.textField("Player id", UniqueId);
  form.submitButton("Add player")

  form.show(player).then((response) => {
    if (response.canceled) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    let name = response.formValues[0]
    let id = response.formValues[1]

    if (id == "") {
      id = UniqueId
    }

    if (name == "") {
      name = player.name
    }

    create_player_save_data(id, name, {last_unix: undefined})
    return debug_sd_editor(player, () => debug_main(player), [])
  });
}

function generateEntityUniqueId() {
  // Erzeuge eine zufällige 64-Bit Zahl als BigInt
  // Wir erzeugen 2 * 32-Bit Teile und setzen sie zusammen
  const high = BigInt(Math.floor(Math.random() * 0x100000000)); // obere 32 Bit
  const low = BigInt(Math.floor(Math.random() * 0x100000000));  // untere 32 Bit

  let id = (high << 32n) | low;

  // Umwandlung in signed 64-Bit Bereich (zweier Komplement)
  // Wenn das höchste Bit (63.) gesetzt ist, wird die Zahl negativ
  if (id & (1n << 63n)) {
    id = id - (1n << 64n);
  }

  return id;
}

// Permissions

function settings_rights_data(viewing_player, selected_save_data) {
  let save_data = load_save_data()
  let selected_player = world.getAllPlayers().find(player => player.id == selected_save_data.id);
  let viewing_player_sd_index = save_data.findIndex(e => e.id === viewing_player.id);
  let form = new ActionFormData();

  let body_text =
      translate_textkeys("menu.settings.permissions.lable.name", save_data[viewing_player_sd_index].lang, {name: selected_save_data.name, id: selected_save_data.id}) + "\n" +

      translate_textkeys("menu.settings.lang.title", save_data[viewing_player_sd_index].lang) +": " + supportedLangs.find(l => l.id == selected_save_data.lang).name + "\n" +
      (
          selected_player
              ? (
                  version_info.release_type === 0
                      ? (
                          translate_textkeys("menu.settings.permissions.online", save_data[viewing_player_sd_index].lang)+ ": "+ translate_textkeys("menu.yes", save_data[viewing_player_sd_index].lang) +"\n" +
                          "Platform: " + selected_player.clientSystemInfo.platformType + "\n" +
                          "Graphics Mode: " + selected_player.graphicsMode + "\n" +
                          "Level: " + selected_player.level + "\n" +
                          "Solt: " + selected_player.selectedSlotIndex + "\n" +
                          (
                              ["Under 1.5 GB", "1.5 - 2.0 GB", "2.0 - 4.0 GB", "4.0 - 8.0 GB", "Over 8.0 GB"][selected_player.clientSystemInfo.memoryTier]
                                  ? "Client Total Memory: " +
                                    ["Under 1.5 GB", "1.5 - 2.0 GB", "2.0 - 4.0 GB", "4.0 - 8.0 GB", "Over 8.0 GB"][selected_player.clientSystemInfo.memoryTier]
                                  : ""
                          ) + "\n" +
                          (
                              {
                                  "Gamepad": "Input: Gamepad",
                                  "KeyboardAndMouse": "Input: Mouse & Keyboard",
                                  "MotionController": "Input: Motion controller",
                                  "Touch": "Input: Touch"
                              }[selected_player.inputInfo.lastInputModeUsed] || ""
                          ) + "\n"
                      )
                      : translate_textkeys("menu.settings.permissions.online", save_data[viewing_player_sd_index].lang)+ ": "+translate_textkeys("menu.yes", save_data[viewing_player_sd_index].lang)+"\n"
              )
              : translate_textkeys("menu.settings.permissions.online", save_data[viewing_player_sd_index].lang) + ": " + translate_textkeys("menu.no", save_data[viewing_player_sd_index].lang) + (selected_save_data.last_unix ? " §7(" + translate_textkeys("menu.settings.permissions.offline", save_data[viewing_player_sd_index].lang, { time: getRelativeTime(Math.floor(Date.now() / 1000) - selected_save_data.last_unix, viewing_player) }) + ")§r\n" : "\n")
      ) + translate_textkeys("menu.settings.permissions.lable.actionbar", save_data[viewing_player_sd_index].lang, {actionbar: render_live_actionbar(selected_save_data, false)}) +
      (
          selected_save_data.id == save_data[0].global.last_player_id && save_data[0].challenge.active
              ? "§r§f\n\n§7" + translate_textkeys("menu.settings.permissions.cm", save_data[viewing_player_sd_index].lang) +"\n\n"
              : "\n\n"
      );


  form.body(body_text);
  let actions = [];

  if (selected_save_data.id !== viewing_player.id) {
    form.title(translate_textkeys("menu.settings.permissions.title.player", save_data[viewing_player_sd_index].lang, {name: selected_save_data.name}));
    if (selected_player) {
      if (player.playerPermissionLevel === 2) {

        form.button(translate_textkeys("menu.settings.permissions.deop", save_data[viewing_player_sd_index].lang));
        actions.push(() => {
          let player_sd_index = save_data.findIndex(entry => entry.id === selected_save_data.id)
          selected_player.runCommand("/deop @s")
          update_save_data(save_data);
          return settings_rights_data(viewing_player, save_data[player_sd_index])
        });

      } else {

        form.button(translate_textkeys("menu.settings.permissions.op", save_data[viewing_player_sd_index].lang));
        actions.push(() => {
          form = new MessageFormData();
          form.title(translate_textkeys("menu.settings.permissions.op.title", save_data[viewing_player_sd_index].lang));
          form.body(translate_textkeys("menu.settings.permissions.op.description", save_data[viewing_player_sd_index].lang, {name: selected_save_data.name}));
          form.button2("");
          form.button1("§aMake op");
          form.show(viewing_player).then((response) => {
            if (response.selection == undefined ) {
              return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
            }
            if (response.selection == 0) {
              let player_sd_index = save_data.findIndex(entry => entry.id === selected_save_data.id)
              selected_player.runCommand("/op @s")
              selected_save_data = save_data[player_sd_index]
              update_save_data(save_data);
            }

            return settings_rights_data(viewing_player, selected_save_data)
          });
        });
      }
    }
  } else {
    form.title(translate_textkeys("menu.settings.permissions.title.you", save_data[viewing_player_sd_index].lang));
  }

  if (!(selected_save_data.id == save_data[0].global.last_player_id && save_data[0].challenge.active)) {
    form.button(translate_textkeys("menu.settings.permissions.manage_sd", save_data[viewing_player_sd_index].lang));
    actions.push(() => {
      settings_rights_manage_sd(viewing_player, selected_save_data);
    });
  }

  if (!(selected_save_data.id == save_data[0].global.last_player_id && save_data[0].challenge.active) || selected_save_data.id !== viewing_player.id) {
    form.divider()
  }

  form.button("");
  actions.push(() => {
    viewing_player.playMusic(translate_soundkeys("music.menu.settings.debug", viewing_player), { fade: 0.3 , loop: true})
    debug_sd_editor(
      viewing_player,
      () => debug_sd_editor(viewing_player, () => debug_main(viewing_player), []),
      [save_data.findIndex(entry => entry.id === selected_save_data.id)]
    );
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
  let viewing_player_sd_index = save_data.findIndex(entry => entry.id === viewing_player.id);
  const lang = save_data[viewing_player_sd_index].lang;

  const form = new ActionFormData();
  const actions = [];

  let resetIndex       = -1;
  let deleteIndex      = -1;

  // Titel und Beschreibung
  form.title(
    selected_save_data.id !== viewing_player.id
      ? translate_textkeys("menu.settings.permissions.title.player", lang, { name: selected_save_data.name })
      : translate_textkeys("menu.settings.permissions.title.you", lang)
  );
  form.body(translate_textkeys("menu.general.description", lang));

  // Reset-Button
  form.button("§d" + translate_textkeys("menu.settings.permissions.reset_sd", lang));
  resetIndex = actions.length;
  actions.push(() => {
    handle_data_action(true, false, viewing_player, selected_save_data, lang);
  });

  // Delete-Button
  form.button("§c" + translate_textkeys("menu.settings.permissions.delete_sd", lang));
  deleteIndex = actions.length;
  actions.push(() => {
    handle_data_action(false, true, viewing_player, selected_save_data, lang);
  });

  // Zurück / Weiter zu Data Settings
  form.button("");
  actions.push(() => {
    settings_rights_data(viewing_player, selected_save_data);
  });

  // Formular anzeigen
  form.show(viewing_player).then(response => {
    if (response.selection === undefined) {
      return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
    }

    const sel = response.selection;
    const isResetOrDelete =
      sel === sel === resetIndex || sel === deleteIndex;

    const is_global = isResetOrDelete &&
      save_data[0].global.last_player_id === selected_save_data.id &&
      save_data[0].global.status;


    if (is_global) {
      const isSharing = save_data[0].global.last_player_id === viewing_player.id;

      const design_data = typeof save_data[viewing_player_sd_index].design === "number"
        ? design_template.find(t => t.id == save_data[viewing_player_sd_index].design).content
        : save_data[viewing_player_sd_index].design;

      const design = design_data.find(item => item.type === "ui");

      const own_time = apply_design(
        design,
        save_data[viewing_player_sd_index].time[
          save_data[viewing_player_sd_index].counting_type == 1 ? "timer" : "stopwatch"
        ]
      );

      const shared_form = new ActionFormData();
      const shared_actions = [];

      shared_form.title(translate_textkeys("menu.popup.shared_timer.title", lang));
      shared_form.body(
        translate_textkeys("menu.settings.permissions.shared_timer.description", lang, {
          name: selected_save_data.name,
          replace_text: !isSharing
            ? translate_textkeys("menu.settings.permissions.shared_timer.description", lang, { own_time })
            : ""
        })
      );

      if (!isSharing) {
        shared_form.button("§e" + translate_textkeys("menu.popup.shared_timer.yours_instead", lang));
        shared_actions.push(() => {
          convert_local_to_global(viewing_player.id);
          reload_and_handle();
        });
      }

      shared_form.button("§c" + translate_textkeys("menu.disable", lang));
      shared_actions.push(() => {
        convert_global_to_local(true);
        reload_and_handle();
      });

      shared_form.button("");
      shared_actions.push(() => {
        settings_rights_manage_sd(viewing_player, selected_save_data);
      });

      shared_form.show(viewing_player).then(global_response => {
        if (global_response.selection === undefined) {
          return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
        }

        const shared_action = shared_actions[global_response.selection];
        if (shared_action) shared_action();
      });

      function reload_and_handle() {
        save_data = load_save_data();
        selected_save_data = save_data.find(e => e.id === selected_save_data.id);
        handle_data_action(sel === 0, sel === 1, viewing_player, selected_save_data, lang);
      }

    } else {
      const action = actions[sel];
      if (action) action();
    }
  });
}

function delete_player_save_data(player) {
  let save_data = load_save_data();

  save_data = save_data.filter(entry => entry.id !== player.id);
  update_save_data(save_data);
}

function handle_data_action(is_reset, is_delete, viewing_player, selected_save_data, lang) {
  const selected_player = world.getAllPlayers().find(p => p.id === selected_save_data.id);
  if (is_reset) {
    delete_player_save_data(selected_save_data);
    create_player_save_data(selected_save_data.id, selected_save_data.name, {last_unix: undefined});
    viewing_player.playMusic(translate_soundkeys("music.menu.settings.rights", viewing_player), { fade: 0.3, loop: true });
    return settings_rights_data(viewing_player, save_data[Number(path[0])]);
  }

  if (is_delete) {
    if (selected_player) {
      const confirm_form = new MessageFormData()
        .title(translate_textkeys("menu.settings.permissions.online_player.kick.title", lang))
        .body(translate_textkeys("menu.settings.permissions.online_player.kick.description", lang, {name: selected_player.name}))
        .button2("")
        .button1("§c"+translate_textkeys("menu.settings.permissions.online_player.kick.button", lang));

      confirm_form.show(viewing_player).then(confirm => {
        if (confirm.selection == undefined ) {
          return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
        }
        if (confirm.selection === 0) {
          if (!world.getDimension("overworld").runCommand(`kick ${selected_player.name}`).successCount) {
            const host_form = new MessageFormData()
              .title(translate_textkeys("menu.settings.permissions.online_player.kick.host.title", lang))
              .body(translate_textkeys("menu.settings.permissions.online_player.kick.host.description", lang, {name: selected_player.name}))
              .button2("")
              .button1("§c"+translate_textkeys("menu.settings.permissions.online_player.kick.host.button", lang));

            host_form.show(viewing_player).then(host => {
              if (host.selection == undefined ) {
                return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
              }
              if (host.selection === 0) {
                delete_player_save_data(selected_save_data);
                viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
                return close_world();
              } else {
                settings_rights_manage_sd(viewing_player, selected_save_data);
              }
            });
          } else {
            delete_player_save_data(selected_save_data);
            viewing_player.playMusic(translate_soundkeys("music.menu.settings.rights", player), { fade: 0.3, loop: true });
            return settings_rights_data(viewing_player, save_data[Number(path[0])]);
          }
        } else {
          settings_rights_manage_sd(viewing_player, selected_save_data);
        }
      });

    } else {
      delete_player_save_data(selected_save_data);
      viewing_player.playMusic(translate_soundkeys("music.menu.settings.rights", viewing_player), { fade: 0.3, loop: true });
      return settings_rights_data(viewing_player, save_data[Number(path[0])]);
    }
  }
}

/*------------------------
 Dictionary
-------------------------*/

export function dictionary_about(player) {
  let form = new ActionFormData()
  let actions = []

  let save_data = load_save_data()
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang;

  if (!challenge_list.some(ch => ch.about_available) || !save_data[0].challenge.active) return dictionary_about_timer(player)

  form.title(translate_textkeys("menu.settings.dictionary.title", lang))
  form.body(translate_textkeys("menu.general.description", lang))

  form.button(version_info.name, "textures/ui/timer");
  actions.push(() => {
    dictionary_about_timer(player, false)
  });

  form.divider();

  challenge_list
  .filter(ch => ch.about_available)
  .forEach(challenge => {
    form.button(challenge.name, challenge.icon);
    actions.push(() => {
      world.scoreboard.addObjective("ccs_data");
      world.scoreboard.getObjective("ccs_data").setScore(JSON.stringify({event: "ccs_about", data:{target: challenge.uuid}}), 1);
      player.runCommand("scriptevent ccs:data");
    });
  });

  form.divider();
  form.button("");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
    return settings_main(player)
  });

  form.show(player).then(response => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (actions[response.selection]) actions[response.selection]();
  });
}

function dictionary_about_timer(player, show_ip = false) {
  let form = new ActionFormData()
  let actions = []

  let save_data = load_save_data()
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang;

  let build_date = convertUnixToDate(version_info.unix, save_data[0].utc || 0);
  const formattedDate = translate_textkeys("menu.settings.dictionary.label.build_date.dateformat", lang, {
    day: build_date.day,
    month: build_date.month,
    year: build_date.year,
    hours: build_date.hours,
    minutes: build_date.minutes,
    seconds: build_date.seconds,
    utcOffset: (build_date.utcOffset >= 0 ? "+" : "") + build_date.utcOffset
  });

  form.title(translate_textkeys("menu.settings.dictionary.title", lang))

  form.body("§l"+translate_textkeys("menu.settings.dictionary.title.general", lang))
  form.label(
    translate_textkeys("menu.settings.dictionary.label.name", lang)+ ": " + version_info.name+ "\n"+
    translate_textkeys("menu.settings.dictionary.label.uuid", lang)+ ": "+ version_info.uuid+ "\n"+
    translate_textkeys("menu.settings.dictionary.label.edition", lang)+ ": "+ ["International", "German (BastiGHG)"][version_info.edition]+
    (show_ip? "\n"+ translate_textkeys("menu.settings.dictionary.label.ip", lang)+": "+server_ip : "")
  )

  form.body("§l"+translate_textkeys("menu.settings.dictionary.title.version", lang))
  form.label(
    translate_textkeys("menu.settings.dictionary.label.version", lang)+ ": " + version_info.version + "\n" +
    translate_textkeys("menu.settings.dictionary.label.build", lang)+ ": " + version_info.build + "\n" +
    translate_textkeys("menu.settings.dictionary.label.release_type", lang)+ ": " + ["dev", "preview", "stable"][version_info.release_type] + "\n" +
    translate_textkeys("menu.settings.dictionary.label.build_date", lang)+ ": "+ ((save_data[0].utc == undefined)
      ? translate_textkeys("menu.settings.dictionary.label.build_date.utc_empty", lang, {time: getRelativeTime(Math.floor(Date.now() / 1000) - version_info.unix, player)})
      : formattedDate) + "\n" +
    translate_textkeys("menu.settings.dictionary.label.status", lang)+ ": " + (github_data? (compareVersions((version_info.release_type === 2 ? github_data.find(r => !r.prerelease)?.tag : github_data[0]?.tag), version_info.version) !== 1? "§a"+translate_textkeys("menu.settings.dictionary.label.status.latest", lang) : "§6"+translate_textkeys("menu.settings.dictionary.label.status.update", lang)): "§c"+translate_textkeys("menu.settings.dictionary.label.status.failed", lang))
  );

  form.label("§7© "+ (build_date.year > 2025 ? "2025 - " + build_date.year : build_date.year ) + " TheFelixLive. Licensed under the MIT License.")

  if (!show_ip && server_ip && player.playerPermissionLevel === 2) {
    form.button(translate_textkeys("menu.settings.dictionary.button.ip", lang));
    actions.push(() => {
      dictionary_about(player, true)
    });
    form.divider()
  }

  if (version_info.changelog.new_features.length > 0 || version_info.changelog.general_changes.length > 0 || version_info.changelog.bug_fixes.length > 0) {
    form.button("§9"+(github_data? translate_textkeys("menu.settings.dictionary.changelogs", lang) : translate_textkeys("menu.settings.dictionary.changelog", lang)));
    actions.push(() => {
      github_data? dictionary_about_changelog(player) : dictionary_about_changelog_legacy(player, build_date)
    });
  }

  form.button("§3"+ translate_textkeys("menu.settings.dictionary.contact.title", lang));
  actions.push(() => {
    dictionary_contact(player)
  });

  form.divider()
  form.button("");
  actions.push(() => {
    if (!challenge_list.some(ch => ch.about_available) || !save_data[0].challenge.active) {
      player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
      return settings_main(player)
    } else {
      return dictionary_about(player)
    }
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

function dictionary_about_changelog(player) {
  const form = new ActionFormData();
  let save_data = load_save_data()
  let lang = save_data[save_data.findIndex(e => e.id === player.id)].lang;
  const actions = [];

  // ---- 1) Hilfsdaten ----------------------------------------------------
  const installed   = version_info.version;        // z.B. "v1.5.0"
  const buildName   = version_info.build;          // z.B. "B123"
  const installDate = version_info.unix;           // z.B. "1700000000"

  // ---- 3) Neue Instanzen finden -----------------------------------------
  const latest_stable = github_data.find(r => !r.prerelease);
  let   latest_beta   = github_data.find(r => r.prerelease);

  // ---- 4) Beta-Versions-Filter (nach release_type) --------------------
  if (version_info.release_type === 2) { // „nur Beta zulassen“
    if (latest_beta && latest_stable) {
      const isBetaNewer = compareVersions(latest_beta.name, latest_stable.name) > 0;
      if (isBetaNewer) {
        // Nur die neueste Beta behalten
        github_data = github_data.filter(r => r === latest_beta || !r.prerelease);
      } else {
        // Stable neuer oder gleich → Betas entfernen
        github_data = github_data.filter(r => !r.prerelease);
        latest_beta = undefined;
      }
    } else {
      // Sicherheit: Alle Betas entfernen
      github_data = github_data.filter(r => !r.prerelease);
      latest_beta = undefined;
    }
  } else {
    // Wenn Stable neuer als Beta ist → Beta Label unterdrücken
    if (latest_beta && latest_stable) {
      const isStableNewer = compareVersions(latest_stable.name, latest_beta.name) > 0;
      if (isStableNewer) {
        latest_beta = undefined; // Kein Beta-Label später anzeigen
      }
    }
  }


  // ---- 5) Alle Einträge, inkl. eventuell fehlenden Installations‑Eintrag --
  const allData = [...github_data];

  // Prüfen, ob die installierte Version überhaupt in der Liste vorkommt
  const isInstalledListed = github_data.some(r => r.name === installed);
  if (!isInstalledListed) {
    // Dummy‑Objekt – so sieht es aus wie ein reguläres GitHub‑Release
    allData.push({
      name:        installed,
      published_at: installDate,
      prerelease:  false,          // wichtig, damit das Label nicht „(latest beta)“ bekommt
    });
  }

  // Sortieren (nach Version)
  allData.sort((a, b) => compareVersions(b.name, a.name));

  // ---- 6) UI bauen ----------------------------------------------------
  form.title(translate_textkeys("menu.settings.dictionary.title", lang))
  form.body(translate_textkeys("menu.settings.dictionary.changelog.select", lang));

  allData.forEach(r => {
    // Prüfen, ob r.published_at schon Unix-Sekunden ist
    const publishedUnix = (typeof r.published_at === 'number' && r.published_at < 1e12)
      ? r.published_at // schon in Sekunden
      : Math.floor(new Date(r.published_at).getTime() / 1000); // in Sekunden umrechnen

    let label;
    let build_date = convertUnixToDate(publishedUnix, save_data[0].utc || 0);

    let build_text = (
      save_data[0].utc === undefined
        ? getRelativeTime(Math.floor(Date.now() / 1000) - publishedUnix, player) + " ago"
        : `${build_date.day}.${build_date.month}.${build_date.year}`
    );

    if (r === latest_beta && r.name === installed) {
      label = `${r.name} (${buildName})\n${build_text} §9(latest beta)`;
    } else {
      label = `${r.name}\n${build_text}`;

      if (r === latest_stable) {
        label += ` §a(${translate_textkeys("menu.settings.dictionary.changelog.label.version", lang)})`;
      } else if (r === latest_beta) {
        label += ` §9(${translate_textkeys("menu.settings.dictionary.changelog.label.beta", lang)})`;
      } else if (r.name === installed) {
        label += ` §6(${translate_textkeys("menu.settings.dictionary.changelog.label.installed", lang)})`;
      }
    }

    form.button(label);

    actions.push(() => {
      dictionary_about_changelog_view(player, r);
    });
  });


  // ---- 7) Footer‑Button -------------------------------------------------
  form.divider();
  form.button("");
  actions.push(() => {
    dictionary_about_timer(player);
  });

  // ---- 8) Anzeigen -----------------------------------------------------
  form.show(player).then(response => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (actions[response.selection]) actions[response.selection]();
  });
}

function dictionary_about_changelog_view(player, version) {
  let save_data = load_save_data()
  let lang = save_data[save_data.findIndex(e => e.id === player.id)].lang;
  const publishedUnix = (typeof version.published_at === 'number' && version.published_at < 1e12)
  ? version.published_at
  : Math.floor(new Date(version.published_at).getTime() / 1000);

  let build_date = convertUnixToDate(publishedUnix, save_data[0].utc || 0);

  if (version.name == version_info.version) return dictionary_about_changelog_legacy(player, build_date)
  const form = new ActionFormData().title(translate_textkeys("menu.settings.dictionary.changelog", lang)+" - "+version.name);

  form.body(markdownToMinecraft(version.body))

  form.label("§7"+translate_textkeys("menu.settings.dictionary.changelog.build", lang, {
    day: build_date.day,
    month: build_date.month,
    year: build_date.year,
    relative_time: getRelativeTime(Math.floor(Date.now() / 1000) - publishedUnix, player)
  }));
  form.button("");

  form.show(player).then(res => {
    if (res.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (res.selection === 0) dictionary_about_changelog(player);
  });
}

export function dictionary_about_changelog_legacy(player, build_date) {
  let lang = load_save_data().find(e => e.id === player.id)?.lang;
  const { new_features, general_changes, bug_fixes } = version_info.changelog;
  const sections = [
    { title: "§l§b"+translate_textkeys("menu.settings.dictionary.changelog.new_features", lang)+"§r", items: new_features },
    { title: "§l§a"+translate_textkeys("menu.settings.dictionary.changelog.general_changes", lang)+"§r", items: general_changes },
    { title: "§l§c"+translate_textkeys("menu.settings.dictionary.changelog.bug_fixes", lang)+"§r", items: bug_fixes }
  ];

  const form = new ActionFormData().title(translate_textkeys("menu.settings.dictionary.changelog", lang)+" - "+version_info.version)

  let bodySet = false;
  for (let i = 0; i < sections.length; i++) {
    const { title, items } = sections[i];
    if (items.length === 0) continue;

    const content = title + "\n\n" + items.map(i => `- ${i}`).join("\n\n");

    if (!bodySet) {
      form.body(content);
      bodySet = true;
    } else {
      form.label(content);
    }

    // Add divider if there's at least one more section with items
    if (sections.slice(i + 1).some(s => s.items.length > 0)) {
      form.divider();
    }
  }

  form.label("§7"+translate_textkeys("menu.settings.dictionary.changelog.build", lang, {
    day: build_date.day,
    month: build_date.month,
    year: build_date.year,
    relative_time: getRelativeTime(Math.floor(Date.now() / 1000) - version_info.unix, player)
  }));
  form.button("");

  form.show(player).then(res => {
    if (res.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (res.selection == 0) {
      github_data? dictionary_about_changelog(player) : dictionary_about_timer(player);
    }
  });
}

function dictionary_contact(player) {
  let form = new ActionFormData()
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang;

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
  form.title(translate_textkeys("menu.settings.dictionary.contact.title", lang))
  form.body(translate_textkeys("menu.settings.dictionary.contact.description", lang) + "\n")

  for (const entry of links) {
    if (entry !== links[0]) form.divider()
    form.label(`${entry.name}\n${entry.link}`);
  }

  if (player.playerPermissionLevel === 2) {
    form.button(translate_textkeys("menu.settings.dictionary.contact.sd", lang) + (version_info.release_type !== 2? "\n"+translate_textkeys("menu.settings.dictionary.contact.sd.mode_0", lang) : ""));
    actions.push(() => {
      player.sendMessage("§l§7[§f"+ (system_privileges == 2? translate_textkeys("message.header.system", save_data[player_sd_index].lang) : translate_textkeys("message.header.system.client_mode", save_data[player_sd_index].lang)) + "§7]§r "+ translate_textkeys("menu.settings.dictionary.contact.sd", lang) +":\n"+JSON.stringify(save_data))
      player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    });

    if (version_info.release_type !== 2) {
      form.button(translate_textkeys("menu.settings.dictionary.contact.sd", lang)+"\n" + translate_textkeys("menu.settings.dictionary.contact.sd.mode_1", lang));
      actions.push(() => {
        console.log(JSON.stringify(save_data))
        player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      });
    }
  }
  form.divider()
  form.button("");
  actions.push(() => {
    dictionary_about_timer(player)
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
