import {world,system} from "@minecraft/server";

let MessageBorder = false;
let timer_settings = world.scoreboard.getObjective("timer_settings");
let timer_addon = world.scoreboard.getObjective("timer_addon");
let oldLevel = 0;
let latest_y = 999;
let previousDimension = null;

function mainTick() {
  const players = world.getAllPlayers();
  for (const player of players) {

    
    // This If query protects the script from crashing when the scoreboard "timer_settings" is deleted.
    if (world.scoreboard.getObjective("timer_settings") !== undefined && world.scoreboard.getObjective("timer_addon") !== undefined) {
      const x = Math.floor(player.location.x);
      const z = Math.floor(player.location.z);

      let level = player.level;
      let reducedLevel = 0;
      let xp_needed = player.totalXpNeededForNextLevel;

      reducedLevel = oldLevel - level;
      xp_needed = xp_needed - player.xpEarnedAtCurrentLevel;


      if (level == undefined) continue;

      let newX = x;
      let newZ = z;
      let outsideBorder = false;

      if (x > level) {
          newX = level;
          outsideBorder = true;
      }

      else if (x < -level) {
          newX = -level;
          outsideBorder = true;
      }

      if (z > level) {
          newZ = level;
          outsideBorder = true;
      }

      else if (z < -level) {
          newZ = -level;
          outsideBorder = true;
      }

      // Only

      const currentDimension = player.dimension.id; // Aktuelle Dimension des Spielers abrufen

      // Überprüfen, ob es einen Dimensionswechsel gab
      if (currentDimension !== previousDimension) {
          latest_y = 999;
          previousDimension = currentDimension; // Aktuelle Dimension für den nächsten Tick speichern
      }

      if (timer_settings.getScore("mode") == 1 && timer_settings.getScore("do_count") == 0 && timer_addon.getScore("only") > 0) {
        latest_y = 999;
      }


      if (timer_settings.getScore("mode") == 1 && timer_settings.getScore("do_count") == 1 && timer_addon.getScore("only") == 1) {
        const y = Math.floor(player.location.y);

        if (latest_y == 999) {
          latest_y = y;
        }

        if (y < latest_y) {
          world.sendMessage('§l§u[§dOnly§u]§r §l'+ player.name +'§r fall from §by§r '+ latest_y +' to §9y§r '+ y +'!');
          player.runCommand('scoreboard players set reset_type timer_settings 1');
          player.runCommand('function timer/system_do_not_use/end_cmo');
          latest_y == 999;
        }

        if (latest_y !== 999) {
          latest_y = y;
        }
      }

      if (timer_settings.getScore("mode") == 1 && timer_settings.getScore("do_count") == 1 && timer_addon.getScore("only") == 2) {
        const y = Math.floor(player.location.y);

        if (latest_y == 999) {
          latest_y = y;
        }

        if (y > latest_y) {
          world.sendMessage('§l§u[§dOnly§u]§r §l'+ player.name +'§r climbed from §by§r '+ latest_y +' to §9y§r '+ y +' up!');
          player.runCommand('scoreboard players set reset_type timer_settings 1');
          player.runCommand('function timer/system_do_not_use/end_cmo');
          latest_y = 999;
        }

        if (latest_y !== 999) {
          latest_y = y;
        }
        
      }

      /* Only Debug
      player.runCommand('scoreboard players set @s timer_actionbar_time 60');
      player.runCommand('title @s actionbar §9latest_y:§r '+ latest_y +' | §by:§r '+ latest_y);*/

      // Block break and place
      if (timer_settings.getScore("mode") == 1 && timer_settings.getScore("do_count") == 1 && timer_addon.getScore("no_block_break") == 1) {
        world.beforeEvents.playerBreakBlock.subscribe((data) => {
        data.cancel = true;
        })
      }

      if (timer_settings.getScore("mode") == 1 && timer_settings.getScore("do_count") == 1 && timer_addon.getScore("no_block_place") == 1) {
        world.afterEvents.playerPlaceBlock.subscribe((data) => {
        data.cancel = true;
        })
      }
    
      // Level = Boader
      if (timer_settings.getScore("mode") == 1 && timer_settings.getScore("do_count") == 1 && timer_addon.getScore("level_equals_border") == 1) {
        if (outsideBorder && level < 24791) {
            player.teleport({ x: newX, y: player.location.y, z: newZ });
            MessageBorder = true;
        }
    
        if (!outsideBorder && MessageBorder) {
            player.runCommand('/scoreboard players set @s timer_actionbar_time 60');
            player.runCommand('title @s actionbar Earne §l§a'+ xp_needed +' XP§r§f to expant the world border');
            MessageBorder = false;
        }
    
        if (level !== oldLevel) {
            if (level > oldLevel && level !== 24791) {
                player.runCommand('playsound random.orb @a');
                world.sendMessage('§l§c[§bWorld Boader§c]§r The world border expant to §l§a'+ level +' Blocks§r!');
            }
    
            if (level < oldLevel && level !== 24791) {
                player.runCommand('playsound note.bassattack @a');
                
                if (reducedLevel == 1) {
                    world.sendMessage('§l§c[§bWorld Boader§c]§r The world border reduced by §l§a'+ reducedLevel +' Block§r! Now it is §l§a'+ level +' Blocks§r!');
                }
    
                if (reducedLevel !== 1) {
                    world.sendMessage('§l§c[§bWorld Boader§c]§r The world border reduced by §l§a'+ reducedLevel +' Blocks§r! Now it is §l§a'+ level +' Blocks§r!');
                }
            }
    
            if (level == 24791) {
                player.runCommand('playsound random.orb @a');
                world.sendMessage('§l§c[§bWorld Boader§c]§r The world border is turned off because you have reached the maximum level of §l§a'+ level +'§r!');
            }
    
            oldLevel = level;
        }
      }
    }
  }
  system.run(mainTick);
}
system.run(mainTick);