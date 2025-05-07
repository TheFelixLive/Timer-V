import {world,system} from "@minecraft/server";

let MessageBorder = false;
let timer_settings = world.scoreboard.getObjective("timer_settings");
let timer_addon = world.scoreboard.getObjective("timer_addon");
let oldLevel = 0;
let latest_y = 999;
let previousDimension = null;

function spawnBorderParticles(player, level) {
  const y = player.location.y + 1;
  const px = player.location.x;
  const pz = player.location.z;
  const radius = 35;

  // X-Ränder bei x = ±level
  for (const borderX of [-level, level]) {
    // nur wenn der Spieler nahe genug am Rand ist
    if (Math.abs(px - borderX) <= radius) {
      const zStart = Math.max(-level, Math.floor(pz - radius));
      const zEnd   = Math.min( level, Math.floor(pz + radius));
      for (let z = zStart; z <= zEnd; z++) {
        player.runCommand(
          `particle minecraft:basic_portal_particle ${borderX} ${y} ${z}`
        );
      }
    }
  }

  // Z-Ränder bei z = ±level
  for (const borderZ of [-level, level]) {
    // nur wenn der Spieler nahe genug am Rand ist
    if (Math.abs(pz - borderZ) <= radius) {
      const xStart = Math.max(-level, Math.floor(px - radius));
      const xEnd   = Math.min( level, Math.floor(px + radius));
      for (let x = xStart; x <= xEnd; x++) {
        player.runCommand(
          `particle minecraft:basic_portal_particle ${x} ${y} ${borderZ}`
        );
      }
    }
  }
}


// Block break and place
world.beforeEvents.playerBreakBlock.subscribe((data) => {
  if (world.scoreboard.getObjective("timer_settings") !== undefined && world.scoreboard.getObjective("timer_addon") !== undefined) {
    if (timer_settings.getScore("mode") == 1 && timer_settings.getScore("do_count") == 1 && timer_addon.getScore("no_block_break") == 1) {
      data.cancel = true;
    }
  }
})

// Got it fixed :)
world.beforeEvents.itemUseOn.subscribe((data) => {
  if (world.scoreboard.getObjective("timer_settings") !== undefined && world.scoreboard.getObjective("timer_addon") !== undefined) {
    if (timer_settings.getScore("mode") == 1 && timer_settings.getScore("do_count") == 1 && timer_addon.getScore("no_block_place") == 1) {
      data.cancel = true;
    }
  }
})



function mainTick() {
  const players = world.getAllPlayers();
  for (const player of players) {

    
    // This protects the script from crashing when the scoreboard "timer_settings" and or "timer_addon"  is deleted.
    if (timer_settings !== undefined && timer_addon !== undefined) {
      const x = player.location.x;
      const z = player.location.z;

      let level = Math.max(player.level, 0.5);
      let reducedLevel = 0;
      let xp_needed = player.totalXpNeededForNextLevel;

      reducedLevel = oldLevel - level;
      xp_needed = xp_needed - player.xpEarnedAtCurrentLevel;


      let newX = x;
      let newZ = z;
      let outsideBorder = false;
      
      if (x > level) {
          newX = level;
          outsideBorder = true;
      } else if (x < -level) {
          newX = -level;
          outsideBorder = true;
      }
      
      if (z > level) {
          newZ = level;
          outsideBorder = true;
      } else if (z < -level) {
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
      
    
      // Level = Boader

      // Out of borader message
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

        // particle
        if (level < 24791) {
          spawnBorderParticles(player, level);
        }
    
        // Increas or decrese Boader message
        if (level !== oldLevel) {
            if (level > oldLevel && level !== 24791) {
                player.runCommand('playsound random.orb @a');
                world.sendMessage('§l§c[§bWorld Boader§c]§r The world border expant to §l§a'+ level +' Blocks§r!');
            }
    
            if (level < oldLevel && level !== 24791) {
                player.runCommand('playsound note.bassattack @a');
                
                world.sendMessage(
                  `§l§c[§bWorld Border§c]§r The world border reduced by §l§a${reducedLevel} Block${reducedLevel === 1 ? '' : 's'}§r! Now it is §l§a${level} Blocks§r!`
                );
                
            }
    
            if (level == 24791) {
                player.runCommand('playsound random.orb @a');
                world.sendMessage('§l§c[§bWorld Boader§c]§r The world border is turned off because you have reached the maximum level of §l§a'+ level +'§r!');
            }
    
            oldLevel = level;
        }
      }
    } else {
      timer_settings = world.scoreboard.getObjective("timer_settings");
      timer_addon = world.scoreboard.getObjective("timer_addon");
    }
  }
  system.run(mainTick);
}
system.run(mainTick);