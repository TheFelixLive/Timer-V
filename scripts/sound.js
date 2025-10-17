import { world } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"
import { load_save_data, update_save_data } from "./helper_function.js";
import { setup_menu, settings_main } from "./menu.js";
import { translate_textkeys } from "./lang.js";
import { version_info } from "./version.js";
import { debug_main } from "./menu.js";

/*------------------------
 Kyes
-------------------------*/

const soundkeys = {

  // Music

  "music.menu.multiple_menu": {
    extern: "timer.music.menu.multiple_menu",
    native: "music.overworld.cherry_grove"
  },

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
      native: "record.tears"
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
  "music.menu.challenge": {
    extern: "timer.music.menu.challenge",
    extern_l: "timeru.music.menu.addon",
    native: "record.ward"
  },
  "music.menu.dictionary": {
    extern: "timer.music.menu.dictionary",
    extern_l: "timeru.music.menu.help",
    native: "record.lava_chicken"
  },
  "music.menu.settings": {
    extern: "timer.music.menu.settings",
    native: "record.strad"
  },
  "music.menu.settings.debug": {
    extern: "timer.music.menu.settings.debug",
    native: "record.relic"
  },
  "music.menu.settings.gestures": {
    extern: "timer.music.menu.settings.gestures",
    native: "music.game.snowy_slopes"
  },
  "music.menu.settings.lang": {
    extern: "timer.music.menu.settings.lang",
    extern_l: "timeru.music.menu.lang",
    native: "music.game.snowy_slopes"
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
  "music.menu.setup": {
    extern: "timer.music.menu.setup",
    extern_l: "timeru.music.menu_0.1",
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
  "message.cc.failed": {
    extern: "timer.condition.failed",
    extern_l: "timeru.function_no_permissions",
    native: "horn.call.7"
  },
};

/*------------------------
 Translate function
-------------------------*/

export function translate_soundkeys(key, player) {
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

  if ((world.isHardcore || idx.allow_unnecessary_inputs) && entry.hardcore) {
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

/*------------------------
 Menus
-------------------------*/

export async function settings_cs_setup(player, in_setup) {
  const saveData = load_save_data();
  const idx = saveData.findIndex(e => e.id === player.id);
  let lang = saveData[idx].lang;

  const HEADER = in_setup ? "" : translate_textkeys("menu.settings.cs.result.header", lang);
  const sep = in_setup ? "" : "\n";

  const tests = [
    {
      soundKey: "timer.test",
      saveValue: 1,
      resultMsg: HEADER + sep + translate_textkeys("menu.settings.cs.result.message_v1", lang)
    },
    {
      soundKey: "timeru.test",
      saveValue: 2,
      resultMsg: HEADER + sep + translate_textkeys("menu.settings.cs.result.message_v2", lang)
    }
  ];


  let heard = false;
  let finalMsg = HEADER + sep + translate_textkeys("menu.settings.cs.result.message_bad", lang)

  for (const { soundKey, saveValue, resultMsg } of tests) {
    player.playMusic(soundKey, { fade: 0.5 });
    const resp = await new MessageFormData()
      .title(translate_textkeys("menu.settings.cs.title", lang))
      .body(saveValue == 2? translate_textkeys("menu.settings.cs.description_0", lang): translate_textkeys("menu.settings.cs.description_1", lang))
      .button1(translate_textkeys("menu.settings.cs.button.yes", lang))
      .button2(translate_textkeys("menu.settings.cs.button.no", lang))
      .show(player);

    if (resp.canceled) {
      if (in_setup) player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.setup.closed", lang) + " " + translate_textkeys("message.body.help.open_menu", lang))
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (resp.selection === 0) {
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

  player.playMusic(translate_soundkeys(in_setup? "music.menu.setup" : "music.menu.settings", player), {
    fade: 0.3,
    loop: true
  });
  await new ActionFormData()
    .title(translate_textkeys("menu.settings.cs.title", lang))
    .body(finalMsg)
    .button(in_setup? translate_textkeys("menu.button_continue", lang) : "")
    .show(player)
    .then((response) => {
      if (response.canceled) {
        if (in_setup) player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.setup.closed", lang) + " " + translate_textkeys("message.body.help.open_menu", lang))
        return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      }
      if (in_setup) {
        saveData[idx].setup = player.playerPermissionLevel === 2 ? 90 : 100;
        update_save_data(saveData);
        return setup_menu(player)
      }
      settings_main(player);
    });
}

// Is part of the debug menu
export function soundkey_test(player, version) {
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

    if (version_info.release_type === 0 && player.playerPermissionLevel === 2) {
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