import {world,system} from "@minecraft/server";


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
let is_available = 1;

function mainTick() {
  // Decet a crash 
  if (!timer_settings) {
    is_available = 0;
  }




  // Sync with Dimension
  if (is_available === 1) {

    const playerDimension = getPlayerDimension();
    const player = getPlayer();
    if (system.currentTick % 20 === 0) {
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
    }

  }

  if (timer_settings) {
    is_available = 1;
  }


  system.run(mainTick);
}

system.run(mainTick);