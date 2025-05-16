import {world,system} from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"

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


let timer_settings = world.scoreboard.getObjective("timer_settings");
let timer_time = world.scoreboard.getObjective("timer_time");



system.afterEvents.scriptEventReceive.subscribe(event=> {
  if (event.id === "timeru:menu_time_new") {
    new_menu_time(event.sourceEntity)
  }
});


function return_to_old_menu(player) {
  player.runCommand(`dialogue open @e[type=npc, name=timer_menu] @s menu_main`);
  player.runCommand(`stopsound @s`);
  player.playSound("random.click");
  // Custom Sound
  const score = timer_settings.getScore("custom_music");
  if (score !== 1) {
    for (const target of world.getPlayers({ tags: ["timer_menu_target"] })) {
      target.playSound("record.far", {
        location: target.location,
        volume: 0.3,
        pitch: 1.0
      });
    }
  }

  if (score === 1) {
    for (const target of world.getPlayers({ tags: ["timer_menu_target"] })) {
      target.playSound("timeru.music.menu_0");
    }
  }
}

function speed_run_message(player) {
  const shouldCount = timer_settings.getScore("shoud_count_down") ?? 0;
  const speedRun = timer_settings.getScore("speed_run") ?? 0;

  if (shouldCount === 1 && speedRun === 1) {
    for (const player of world.getPlayers({ tags: ["timer_menu_target"] })) {
      player.sendMessage("§l§u[§dSpeed Run§u]§r The \"Speedrun Mode\" has been deactivated because the §5Timermode§r is incompatible with it.");
    }
    timer_settings.setScore("speed_run", 0);
  }
}


async function new_menu_time(player) {
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
      return_to_old_menu(player)
    } else {
      timer_settings.setScore("shoud_count_down", 0);
      if (timer_settings.getScore("goal") == 7) {
        timer_settings.setScore("goal", 8)
      }
      return new_menu_time_invalid(player)
    }

  });
}

function new_menu_time_invalid(player) {
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

      try {
        player.runCommand("stopsound @s");
      } catch (e) {
        console.warn("Fehler beim Stoppen des Sounds:", e);
      }

      // 2. Score lesen
      const score = timer_settings?.getScore(player.scoreboardIdentity);

      // 3. Sound abspielen je nach Score
      for (const target of world.getPlayers({ tags: ["timer_menu_target"] })) {
        if (score === 1) {
          target.playSound("timeru.time_random");
        } else {
          target.playSound("random.levelup");
        }
      }

      // 4. Zufallswerte mit Math.random()
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
      return_to_old_menu(player)
    }
  });
}


function mainTick() {
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