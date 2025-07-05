import { system, world } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"
import { print, load_save_data } from "./helper_function.js";
import { translate_textkeys } from "./lang.js";
import { settings_gestures } from "./menu.js";
import { translate_soundkeys } from "./sound.js";
import { version_info } from "./version.js";

// 2 = Standalone, 1 = Multiple Menu: Host, 0 = Multiple Menu: Client
export let system_privileges = 2;




/*------------------------
  Client
-------------------------*/

system.afterEvents.scriptEventReceive.subscribe(event=> {
  if (event.id === "multiple_menu:initialize") {
    world.scoreboard.getObjective("multiple_menu_name").setScore(version_info.name, 1);
    world.scoreboard.getObjective("multiple_menu_icon").setScore("textures/ui/timer", 1);
    world.scoreboard.getObjective("multiple_menu_id").setScore(version_info.uuid, 1);
    if (system_privileges == 2) system_privileges = 0;
  }
  if (event.id === "multiple_menu:open_main" && system_privileges == 1) {
    multiple_menu(event.sourceEntity);
  }
})


/*------------------------
  Host
-------------------------*/
let addon_name, addon_id, addon_icon;

export async function initialize_multiple_menu() {

  try {
    world.scoreboard.addObjective("multiple_menu_name");
    world.scoreboard.addObjective("multiple_menu_id");
    world.scoreboard.addObjective("multiple_menu_icon");
    print("Multiple Menu: Initializing Host");
    system_privileges = 1;
  } catch (e) {
    print("Multiple Menu: Already Initialized");
    return -1;
  }


  world.getDimension("overworld").runCommand("scriptevent multiple_menu:initialize");

  await system.waitTicks(2);
  print("Multiple Menu: successfully initialized as Host");

  addon_name = world.scoreboard.getObjective("multiple_menu_name").getParticipants().map(p => p.displayName);
  addon_id = world.scoreboard.getObjective("multiple_menu_id").getParticipants().map(p => p.displayName);
  addon_icon = world.scoreboard.getObjective("multiple_menu_icon").getParticipants().map(p => p.displayName);

  if (addon_id.length == 1) {
    print("Multiple Menu: no other plugin found");
    system_privileges = 2;
  }

  world.scoreboard.removeObjective("multiple_menu_name")
  world.scoreboard.removeObjective("multiple_menu_id")
  world.scoreboard.removeObjective("multiple_menu_icon")


}

export function multiple_menu(player) {
  let form = new ActionFormData();
  let actions = [];
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang;

  form.title(translate_textkeys("menu.multiple_menu.title", lang, {version: "v.1.0"}));
  form.body(translate_textkeys("menu.multiple_menu.description", lang));

  player.playMusic(translate_soundkeys("music.menu.multiple_menu", player), { fade: 0.3, loop: true });

  addon_name.forEach((name, index) => {
    form.button(name, addon_icon[index]);

    actions.push(() => {
      if (addon_id[index] !== version_info.uuid) {
        player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      }
      player.runCommand("scriptevent multiple_menu:open_"+ addon_id[index]);
    });
  });
  form.divider()
  form.label(translate_textkeys("menu.settings.title", lang))

  form.button(translate_textkeys("menu.settings.gestures.title", lang), "textures/ui/sidebar_icons/emotes");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings.gestures", player), { fade: 0.3 , loop: true})
    settings_gestures(player)
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