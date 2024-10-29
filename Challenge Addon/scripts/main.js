import {world,system} from "@minecraft/server";

let MessageBorder = false;
let timer_settings = world.scoreboard.getObjective("timer_settings");
let timer_addon = world.scoreboard.getObjective("timer_addon");
let oldLevel = 0;

let is_available = 1;

function mainTick() {
  // Decet a crash 
  if (!timer_settings) {
    is_available = 0;
  }

  
  if (is_available === 1) {
    const players = world.getAllPlayers();
    for (const player of players) {
        const x = Math.floor(player.location.x);
        const z = Math.floor(player.location.z);
  
        let level = player.level;
        let reducedLevel = 0;
        let xp_needed = player.totalXpNeededForNextLevel;
  
        reducedLevel = oldLevel - level;
        xp_needed = xp_needed - player.xpEarnedAtCurrentLevel;
  
  
        if (level === undefined) continue;
  
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
  
        if (timer_settings.getScore("mode") === 1 && timer_addon.getScore("no_block_break") === 1) {
          world.beforeEvents.playerBreakBlock.subscribe((data) => {
          data.cancel = true;
          })
        }
  
        if (timer_settings.getScore("mode") === 1 && timer_addon.getScore("no_block_place") === 1) {
          world.afterEvents.playerPlaceBlock.subscribe((data) => {
          data.cancel = true;
          })
        }
      
       if (timer_settings.getScore("mode") === 1 && timer_addon.getScore("level_equals_border") === 1) {
          if (outsideBorder && level < 24791) {
              player.teleport({ x: newX, y: player.location.y, z: newZ });
              MessageBorder = true;
          }
      
          if (!outsideBorder && MessageBorder) {
              player.runCommand('scoreboard players set @s timer_show_actionbar 2');
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
                  
                  if (reducedLevel === 1) {
                      world.sendMessage('§l§c[§bWorld Boader§c]§r The world border reduced by §l§a'+ reducedLevel +' Block§r! Now it is §l§a'+ level +' Blocks§r!');
                  }
      
                  if (reducedLevel !== 1) {
                      world.sendMessage('§l§c[§bWorld Boader§c]§r The world border reduced by §l§a'+ reducedLevel +' Blocks§r! Now it is §l§a'+ level +' Blocks§r!');
                  }
              }
      
              if (level === 24791) {
                  player.runCommand('playsound random.orb @a');
                  world.sendMessage('§l§c[§bWorld Boader§c]§r The world border is turned off because you have reached the maximum level of §l§a'+ level +'§r!');
              }
      
              oldLevel = level;
          }
        }
      }
    }

  if (timer_settings) {
    is_available = 1;
  }
  system.run(mainTick);
}

system.run(mainTick);