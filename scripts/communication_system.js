import { system, world } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"
import { print, load_save_data } from "./helper_function.js";
import { translate_textkeys } from "./lang.js";
import { settings_gestures } from "./settings_gestures.js";
import { translate_soundkeys } from "./sound.js";

// 2 = Standalone, 1 = Multiple Menu: Host, 0 = Multiple Menu: Client
export let system_privileges = 2;




/*------------------------
  Client
-------------------------*/

system.afterEvents.scriptEventReceive.subscribe(event=> {
  if (event.id === "multiple_menu:initialize") {
    world.scoreboard.getObjective("multiple_menu_name").setScore("Timer V", 1);
    world.scoreboard.getObjective("multiple_menu_icon").setScore("Timer V", 1);
    world.scoreboard.getObjective("multiple_menu_id").setScore("c4d3852f-f902-4807-a8c8-51980fdae4c3", 1);
    if (system_privileges = 2) system_privileges = 0;
  }
  if (event.id === "multiple_menu:open_main" && system_privileges == 1) {
    multiple_menu(event.sourceEntity);
  }
})

let addon_name, addon_id, addon_icon;

/*------------------------
  Host
-------------------------*/

export async function initialize_multiple_menu() {
  if (system_privileges == 0) {
    print("Multiple Menu: Already Initialized");
    return -1;
  }
  print("Multiple Menu: Initializing Host");
  world.scoreboard.addObjective("multiple_menu_name")
  world.scoreboard.addObjective("multiple_menu_id")
  world.scoreboard.addObjective("multiple_menu_icon")
  system_privileges = 1;
  world.getDimension("overworld").runCommand("scriptevent multiple_menu:initialize");

  await system.waitTicks(2);
  print("Multiple Menu: successfully initialized as Host");

  addon_name = world.scoreboard.getObjective("multiple_menu_name").getParticipants().map(p => p.displayName);
  addon_id = world.scoreboard.getObjective("multiple_menu_id").getParticipants().map(p => p.displayName);
  addon_icon = world.scoreboard.getObjective("multiple_menu_icon").getParticipants().map(p => p.displayName);
}

export function multiple_menu(player) {
  let form = new ActionFormData();
  let actions = [];
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang;

  form.title("Multiple Menu v.1.0");
  form.body("Select an addon to open its menu");

  addon_name.forEach((name, index) => {
    form.button(name, addon_icon[index]);

    actions.push(() => {
      world.getDimension("overworld").runCommand("scriptevent multiple_menu:open_"+ addon_id[index]);
    });
  });
  form.divider()
  form.button(translate_textkeys("menu.settings.gestures.title", lang), "textures/ui/sidebar_icons/emotes");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings.gestures", player), { fade: 0.3 , loop: true})
    settings_gestures(player)
  });
}