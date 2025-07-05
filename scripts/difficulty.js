import { world, system, EntityTypes } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"
import { load_save_data, update_save_data } from "./helper_function.js";
import { translate_soundkeys } from "./sound";
import { translate_textkeys } from "./lang.js";
import { main_menu } from "./menu.js";


export const difficulty = [
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

export function check_difficulty() {
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

export function check_health(configuration) {
  let save_data = load_save_data();


  for (const player of world.getPlayers()) {
    let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
    const health = player.getComponent("health");

    if (configuration == "infinity") {
      if (save_data[0].challenge.difficulty == 4) {
        // Well they are aqute and don't do anything in infinity
        player.removeEffect("regeneration");
        player.removeEffect("absorption");

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


export function settings_difficulty(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)
  let lang = save_data[player_sd_index].lang

  form.title(translate_textkeys("menu.difficulty.title", lang));
  form.body(translate_textkeys("menu.difficulty.description", lang) +
  (save_data[player_sd_index].allow_unnecessary_inputs? "" : (!world.isHardcore
    ? "\n§7"+ translate_textkeys("menu.difficulty.note", lang)
    : "\n§7"+ translate_textkeys("menu.difficulty.note.hardcore", lang))));


  let visibleDifficulties = [];

  difficulty.forEach((diff, index) => {
    if (diff.is_hardcore == world.isHardcore || save_data[player_sd_index].allow_unnecessary_inputs) {
      let name = diff.name;
      if (save_data[0].challenge.difficulty === index) {
        name += "\n"+translate_textkeys("menu.item_selected", save_data[player_sd_index].lang);
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