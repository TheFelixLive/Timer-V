import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"
import { load_save_data, update_save_data, create_player_save_data, print} from "./helper_function.js";
import { translate_soundkeys } from "./sound";
import { translate_textkeys } from "./lang.js";
import { setup_menu, main_menu, dictionary_about_changelog_legacy } from "./menu.js";
import { version_info } from "./version.js";

export function uu_find_gen() {
  let gen;
  if (world.scoreboard.getObjective("timer_settings")) {
    gen = 0
  }
  if (world.scoreboard.getObjective("timer_custom_music")) {
    gen = 1
  }
  if (world.scoreboard.getObjective("timer_data")) {
    gen = 2
  }
  return gen
}

export let gen_list = [
  "v.4.1.0 - v.4.2.2", // gen 0 (s)
  "v.4.1.0", // gen 1 (c)
  "v.4.0.0 - v.4.0.1"
]

export function universel_updater(player, gen) {
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang

  let form = new MessageFormData();
  form.title(translate_textkeys("menu.uu.title", lang));
  form.body(translate_textkeys("menu.uu.description", lang, {old_version: gen_list[gen]}))
  form.button1("§9"+translate_textkeys("menu.uu.update", lang));
  form.button2(save_data[player_sd_index].setup == 100? "": translate_textkeys("menu.button_skip", lang));
  const showForm = async () => {
  form.show(player).then((response) => {
    if (response.canceled && response.cancelationReason === "UserBusy") {
      showForm()
    } else {
      if (response.selection == 1) {
        if (save_data[player_sd_index].setup == 100) {
          player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
          settings_main(player)
        } else {
          save_data[player_sd_index].setup = 80
          update_save_data(save_data)
          setup_menu(player)
        }
      }
      if (response.selection == 0) {
        uu_apply_gen(gen, player)
      }
      if (response.selection == undefined ) {
        if (save_data[player_sd_index].setup !== 100) player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.setup.closed", lang) + " " + translate_textkeys("message.body.help.open_menu", lang))
        return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      }
    }
  });
};
showForm();
}

// is something to improve
function uu_apply_gen(gen, player) {
  let note_message;
  let utc = load_save_data()[0].utc

  // gen 0
  if (gen == 0) {
    note_message = translate_textkeys("menu.uu.note.ca")
    const getScoreSafe = (objective, scoreName, defaultValue = 0) => {
      try {
        return objective.getScore(scoreName) || defaultValue;
      } catch (error) {
        console.error(`Error getting '${scoreName}' from '${objective}': `, error);
        return defaultValue;
      }
    };

    let settings = world.scoreboard.getObjective("timer_settings");
    let addon = world.scoreboard.getObjective("timer_addon");
    let time = world.scoreboard.getObjective("timer_time");
    let show_actionbar = world.scoreboard.getObjective("timer_show_actionbar");
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
        goal: { pointer: old_goal === 8 ? 0 : old_goal < 5 ? 1 : 2, entity_id: ["minecraft:ender_dragon", "minecraft:wither", "minecraft:elder_guardian", "minecraft:warden"][old_goal - 1], event_pos: old_goal === 5 ? 1 : 0 },
        difficulty: getScoreSafe(settings, "difficulty"),
      },
      global: { status: true, last_player_id: player.id },
      sync_day_time: false,
      use_setup: version_info.edition == 1? false : true,
      utc: utc,
      update_message_unix: (version_info.unix + version_info.update_message_period_unix)
    }];

    try {
      update_save_data(save_data);
    } catch (error) {
      console.error("Error updating save data: ", error);
    }

    let design_id = 4

    if (getScoreSafe(settings, "speed_run") == 1) {
      design_id = 1
    }

    if (getScoreSafe(addon, "enchant") == 1) {
      design_id = 3
    }

    if (getScoreSafe(settings, "difficulty") >= 2) {
      design_id = 2
    }

    world.getAllPlayers().forEach(player => {
      try {
        create_player_save_data(player.id, player.name, {
          setup: 0,
          op: player.hasTag("trust_player_control"),
          custom_sounds: getScoreSafe(settings, "custom_music") === 1 ? 2 : 0,
          fullbright: getScoreSafe(settings, "night_vision") === 1,
          visibility_setting: show_actionbar.getScore(player) === 1? true : false,
          design: design_id,
          setup: 100
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
      "timer_show_actionbar",
      "timer_setup"
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
        }
      }
    });

    let dataLossPercent = totalPlayers > 0
      ? Math.floor(((totalPlayers - onlinePlayers) / totalPlayers) * 100)
      : 0;

    if (dataLossPercent > 0) {
      let form = new MessageFormData();
      let save_data = load_save_data()
      let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
      let lang = save_data[player_sd_index].lang
      form.title(translate_textkeys("menu.uu.data_lost.title", lang));
      form.body(translate_textkeys("menu.uu.data_lost.description", lang, {totalPlayers: totalPlayers, onlinePlayers: onlinePlayers, dataLossPercent: dataLossPercent}));
      form.button1("§c"+translate_textkeys("menu.button_continue", lang));
      form.button2("");
      form.show(player).then((response) => {
        if (response.selection == undefined ) {
          return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
        }
        if (response.selection == 1) {
          if (save_data[player_sd_index].setup == 0) {
            player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
            settings_main(player)
          } else {
            universel_updater(player)
          }
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
      let show_actionbar = world.scoreboard.getObjective("timer_show_actionbar");

      let time_ms = world.scoreboard.getObjective("timer_time_ms");
      let time_sec = world.scoreboard.getObjective("timer_time_sec");
      let time_min = world.scoreboard.getObjective("timer_time_min");
      let time_h = world.scoreboard.getObjective("timer_time_h");
      let time_d = world.scoreboard.getObjective("timer_time_d");

      let save_data = [{
        time: { stopwatch: shoud_count_down? 0 : (time_ms.getScore("host") / 5 + time_sec.getScore("host") * 20 + time_min.getScore("host") * 20 * 60 + time_h.getScore("host") * 20 * 60 * 60 + time_d.getScore("host") * 20 * 60 * 60 * 24), timer: shoud_count_down? (time_ms.getScore("host") / 5 + time_sec.getScore("host") * 20 + time_min.getScore("host") * 20 * 60 + time_h.getScore("host") * 20 * 60 * 60 + time_d.getScore("host") * 20 * 60 * 60 * 24) : 0, last_value_timer: shoud_count_down? (time_ms.getScore("host") / 5 + time_sec.getScore("host") * 20 + time_min.getScore("host") * 20 * 60 + time_h.getScore("host") * 20 * 60 * 60 + time_d.getScore("host") * 20 * 60 * 60 * 24) : 0, do_count: old_global == 1? do_count.getScore("host") == 1? true : false : false },
        counting_type: shoud_count_down? 1 : 0,
        global: { status: old_global == 1? true : false, last_player_id: world.getAllPlayers().find(player => {player.hasTag("target_host")})?.id || player.id},

        challenge: {active: false, progress: 0, rating: 0, goal: {pointer: 1, entity_id: "minecraft: ender_dragon", event_pos: 0}, difficulty: world.isHardcore? 2 : 1},
        sync_day_time: false,
        use_setup: version_info.edition == 1? false : true,
        utc: utc,
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
            visibility_setting: show_actionbar.getScore(player) === 1? true : false,
            design: 4,
            setup: 100
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
        "timer_show_actionbar",
        "timer_setup"
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

  if (gen == 2) {
    const getScoreSafe = (objective, scoreName, defaultValue = 0) => {
      try {
        return objective.getScore(scoreName) || defaultValue;
      } catch (error) {
        console.error(`Error getting '${scoreName}' from '${objective}': `, error);
        return defaultValue;
      }
    };

    let data = world.scoreboard.getObjective("timer_data");
    let stopwatchTime = (
      getScoreSafe(data, "tick") +
      getScoreSafe(data, "sec") * 20 +
      getScoreSafe(data, "min") * 20 * 60 +
      getScoreSafe(data, "h")   * 20 * 60 * 60 +
      getScoreSafe(data, "w")   * 20 * 60 * 60 * 24 * 7
    );


    let save_data = [{
      time: { stopwatch: stopwatchTime, timer: 0, last_value_timer: 0, do_count: getScoreSafe(data, "mode") >= 1 ? true : false },
      counting_type: 0,

      global: { status: true, last_player_id: player.id},

      challenge: {active: false, progress: 0, rating: 0, goal: {pointer: 1, entity_id: "minecraft:ender_dragon", event_pos: 0}, difficulty: world.isHardcore? 2 : 1},
      sync_day_time: false,
      use_setup: version_info.edition == 1? false : true,
      utc: utc,
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
          op: player.hasTag("timer_permissions"),
          design: 5,
          visibility_setting: getScoreSafe(data, "mode") == 2 ? false : true,
          setup: 100
        });
        if (player.hasTag("timer_permissions")) player.removeTag("timer_permissions");
      } catch (error) {
        console.error(`Error processing player data for player ${player.name}: `, error);
      }
    });


    const objectives = [
      "timer_data"
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

function uu_gen_successfull(player, note_message) {
  player.playMusic(translate_soundkeys("music.menu.setup", player), { fade: 0.3 });
  let form = new MessageFormData();
  let save_data = load_save_data()
  let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang

  form.title(translate_textkeys("menu.uu.title", lang));
  form.body(translate_textkeys("menu.uu.compleat.description", lang) + (note_message? "\n\n§7"+ translate_textkeys("menu.uu.compleat.description.note") + ": " + note_message : ""));
  form.button1("§9"+translate_textkeys("menu.settings.dictionary.changelog.title", lang));
  form.button2("");
  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection == 0) {
      player.playMusic(translate_soundkeys("music.menu.dictionary", player), { fade: 0.3, loop: true });
      return dictionary_about_changelog_legacy(player, convertUnixToDate(version_info.unix, save_data[0].utc))
    }
    if (response.selection == 1) {
      player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
      return main_menu(player)
    }
  })
}