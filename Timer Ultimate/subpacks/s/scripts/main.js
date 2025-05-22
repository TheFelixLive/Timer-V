import {world,system} from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"

// Load and Save movements
function load_permission_sd() {
    let rawData = world.getDynamicProperty("timerv:permission_save_data");
    if (!rawData) {
        return;
    }
    return JSON.parse(rawData);
}

function write_permission_sd(sd) {
  world.setDynamicProperty("timerv:permission_save_data", JSON.stringify(sd));
}


function getPlayer() {
  const allPlayers = world.getAllPlayers();
  if (allPlayers.length === 0) {
    return undefined;
  }

  return allPlayers[0];
}

function getPlayerDimension() {
  const player = getPlayer();
  if (player === undefined) {
    return undefined;
  }
  return player.dimension;
}

// Scoreborads
let timer_settings = world.scoreboard.getObjective("timer_settings");

if (!timer_settings) {
  timer_settings = world.scoreboard.addObjective("timer_settings");
}

// Disable auto gamemode switch
if (world.isHardcore) {
  timer_settings.setScore("is_hardcore", 1);
}

function return_to_old_menu(player, menu) {
  player.runCommand(`dialogue open @e[type=npc, name=timer_menu] @s ` + menu);
  player.runCommand(`stopsound @s`);
  player.playSound("random.click");
  // Custom Sound
  const score = timer_settings.getScore("custom_music");

  if (score === 0) {
    for (const target of world.getPlayers({ tags: ["timer_menu_target"] })) {
      target.playSound(menu.includes("menu_help") ? "music.menu" : "record.far", {
        location: target.location,
        volume: 0.3,
        pitch: 1.0
      });
    }
  }

  if (score === 1) {
    for (const target of world.getPlayers({ tags: ["timer_menu_target"] })) {
      target.playSound(menu.includes("menu_help") ? "timeru.music.menu.help" : "timeru.music.menu_0");
    }
  }
}

// Open menu via. jump gesture
const gestureCooldowns = new Map();

function gesture_jump() {
  const now = Date.now();

  for (const player of world.getAllPlayers()) {
    const lastUsed = gestureCooldowns.get(player.name) || 0;

    if (player.isSneaking && player.isJumping) {
      if (now - lastUsed >= 1000) { // 2 Sekunden Cooldown
        player.runCommand("function timer/menu")
      }
    }
  }
}


// Redirect to the new menu
system.afterEvents.scriptEventReceive.subscribe(event=> {
  if (event.id === "timeru:menu_time_new") {
    new_menu_time(event.sourceEntity)
  }
  if (event.id === "timeru:menu_permission") {
    menu_permission(event.sourceEntity, true)
  }
});

function menu_permission_offline(player, entry) {
  let form = new ActionFormData();
  form.title(entry.name);

  let now = Date.now();
  let diff = now - entry.unix;
  let timeString = getRelativeTime(diff);

  form.body(`The player ${entry.name} has admin rights, but is not online. He was last online ${timeString}. Therefore, you cannot revoke his rights.`);
  form.button("");

  form.show(player).then((response) => {
    if (response.canceled) {
      // return closing the menu
      return player.runCommand("scoreboard players set id timer_menu 1");
    }
    menu_permission(player, false);
  });
}

function getRelativeTime(diff) {
  let seconds = Math.floor(diff / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let months = Math.floor(days / 30);
  let years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  return `a few seconds ago`;
}


async function menu_permission(player, delay) {
  let timer_settings = world.scoreboard.getObjective("timer_settings");
  let form = new ActionFormData();
  form.title("Permissions §o(light)");
  form.body("Here you can adjust the permissions for other player.\n\n§7Note that offline players are listed but can't be changed.")
  let save_data = load_permission_sd()
  let actions = []

  if (timer_settings.getScore("mode") == 0) {
    form.button("§9Help", "textures/ui/infobulb")
    actions.push(() => {
      return_to_old_menu(player, "menu_help_text_htu_0")
    });
  }


  world.getAllPlayers().forEach(w_player => {
    let player_index = save_data.findIndex(entry => entry.id === w_player.id);

    if (player_index !== -1) {
      if (w_player.name !== player.name) {
        form.button(w_player.name, "textures/ui/op")
        actions.push(() => {
          w_player.removeTag("trust_player_control")
          check_permission()
          menu_permission(player, false)
        });
      }
    } else {
      form.button(w_player.name, "textures/ui/permissions_member_star")
      actions.push(() => {
        w_player.addTag("trust_player_control")
        check_permission()
        menu_permission(player, false)
      });
    }

  });

  save_data.forEach(entry => {
    let player_exists = world.getAllPlayers().some(w_player => w_player.id === entry.id);

    if (!player_exists) {
      form.button(entry.name, "textures/ui/Ping_Offline_Red_Dark");
      actions.push(() => {
        menu_permission_offline(player, entry)
      });
    }
  });


  form.button("")
  actions.push(() => {
    if (timer_settings.getScore("mode") == 0) {
      return_to_old_menu(player, "menu_main_2")
    } else {
      return_to_old_menu(player, "menu_help_text_htu_0")
    }
  });


  if (delay) {
    await system.waitTicks(10);
  }

  form.show(player).then((response) => {

    if (response.canceled) {
      // return closing the menu
      return player.runCommand("scoreboard players set id timer_menu 1")
    }


    if (actions[response.selection]) {
      actions[response.selection]();
    }

  });
}

// Time menu
async function new_menu_time(player) {
  let timer_settings = world.scoreboard.getObjective("timer_settings");
  let timer_time = world.scoreboard.getObjective("timer_time");
  let form = new ModalFormData();
  form.title("Start time");

  let ms = timer_time.getScore("ms")*10

  form.slider("Hours", 0, 23, 1, timer_time.getScore("h"));
  form.slider("Minutes", 0, 59, 1, timer_time.getScore("min"));
  form.slider("Seconds", 0, 59, 1, timer_time.getScore("sec"));
  form.slider("Milliseconds", 0, 999, 50, ms);

  await system.waitTicks(10);

  form.show(player).then((response) => {

    if (response.canceled) {
      // return closing the menu
      return player.runCommand("scoreboard players set id timer_menu 1")
    }

    let h = response.formValues[0]
    let m = response.formValues[1]
    let s = response.formValues[2]
    let ms = response.formValues[3] / 10

    timer_time.setScore("h", h);
    timer_time.setScore("min", m);
    timer_time.setScore("sec", s);
    timer_time.setScore("ms", ms);

    if (h >= 1 || m >= 1) {
      timer_settings.setScore("shoud_count_down", 1);
      speed_run_message(player);
      // return to the main menu
      return_to_old_menu(player, "menu_main")
    } else {
      timer_settings.setScore("shoud_count_down", 0);
      if (timer_settings.getScore("goal") == 7) {
        timer_settings.setScore("goal", 8)
      }
      return new_menu_time_invalid(player)
    }

  });
}

function speed_run_message() {
  const shouldCount = timer_settings.getScore("shoud_count_down") ?? 0;
  const speedRun = timer_settings.getScore("speed_run") ?? 0;

  if (shouldCount === 1 && speedRun === 1) {
    for (const player of world.getPlayers({ tags: ["timer_menu_target"] })) {
      player.sendMessage("§l§u[§dSpeed Run§u]§r The \"Speedrun Mode\" has been deactivated because the §5Timermode§r is incompatible with it.");
    }
    timer_settings.setScore("speed_run", 0);
  }
}

function new_menu_time_invalid(player) {
  let timer_settings = world.scoreboard.getObjective("timer_settings");
  let timer_time = world.scoreboard.getObjective("timer_time");
  let form = new MessageFormData()
    .title("Start time")
    .body("Your selected time is invalid!")
    .button2("Generate randomly")
    .button1("");

  form.show(player).then((response) => {

    timer_time.setScore("h", 0);
    timer_time.setScore("min", 0);
    timer_time.setScore("sec", 0);
    timer_time.setScore("ms", 0);

    if (response.canceled) {
      return player.runCommand("scoreboard players set id timer_menu 1")
    }

    if (response.selection === 1) {

      player.runCommand("stopsound @s");

      const score = timer_settings?.getScore("custom_music");

      for (const target of world.getPlayers({ tags: ["timer_menu_target"] })) {
        if (score === 1) {
          target.playSound("timeru.time_random");
        } else {
          target.playSound("random.levelup");
        }
      }

      const h = Math.floor(Math.random() * 5);
      const min = h === 0 
        ? Math.floor(Math.random() * 59) + 1
        : Math.floor(Math.random() * 60);   
      const sec = Math.floor(Math.random() * 60); 

      timer_time.setScore("h", h);
      timer_time.setScore("min", min);
      timer_time.setScore("sec", sec);
      timer_settings.setScore("shoud_count_down", 1);
      speed_run_message(player);

      const animTime = world.scoreboard.getObjective("timer_menu");
      animTime.setScore("animation_time", 30)


      player.onScreenDisplay.setTitle(
        `§a${h}h ${min}m ${sec}s§r`
      );
      player.onScreenDisplay.updateSubtitle("-- was chosen --");
    }

    if (response.selection === 0) {
      return_to_old_menu(player, "menu_main")
    }
  });
}

function check_permission() {
    world.getAllPlayers().forEach(player => {
    let save_data = load_permission_sd() || [{id: player.id, name: player.name, unix: new Date()}];
    let player_index = save_data.findIndex(entry => entry.id === player.id);

    if (player.hasTag("trust_player_control") && player_index === -1) {
      save_data.push({
        id: player.id,
        name: player.name,
        unix: Date.now()
      });
    } 

    if (!player.hasTag("trust_player_control") && player_index !== -1) {
      save_data.splice(player_index, 1);
    }

    if (player.hasTag("trust_player_control") && player_index !== -1) {
      save_data[player_index].unix = Date.now();
    }

    write_permission_sd(save_data);
  });
}

function mainTick() {
  gesture_jump()
  check_permission()

  const playerDimension = getPlayerDimension();
  if (system.currentTick % 20 === 0) {
    // This If query protects the script from crashing when the scoreboard "timer_settings" is deleted.
    if (timer_settings !== undefined) {

      if (playerDimension !== undefined && timer_settings.getScore("mode") === 0) {

        if (playerDimension.id === "minecraft:overworld" && timer_settings.getScore("dimension") !== 0) { 
          timer_settings.setScore("dimension", 0);
        }
        
        if (playerDimension.id === "minecraft:nether" && timer_settings.getScore("dimension") !== 1) { 
          timer_settings.setScore("dimension", 1);
        }
        // This doesn't work realy well but if you enter the end you get the hidden dimension
        if (playerDimension.id === "minecraft:the_end" && timer_settings.getScore("dimension") !== 2) { 
          timer_settings.setScore("dimension", 2);
        }
      }
    } else {
      timer_settings = world.scoreboard.getObjective("timer_settings");
    }
  }

  system.run(mainTick);
}

system.run(mainTick);