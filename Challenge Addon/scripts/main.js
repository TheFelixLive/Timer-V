import {world,system, EquipmentSlot} from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"


let MessageBorder = false;
let timer_settings = world.scoreboard.getObjective("timer_settings");
let timer_addon = world.scoreboard.getObjective("timer_addon");
let oldLevel = 0;
let latest_y = 999;
let previousDimension = null;



// Load and Save movements
function load_movement_sd() {
    let rawData = world.getDynamicProperty("timerv:save_data");
    if (!rawData) {
        return;
    }
    return JSON.parse(rawData);
}

function write_movement_sd(sd) {
  world.setDynamicProperty("timerv:save_data", JSON.stringify(sd));
}


// Saves default movement
if (!load_movement_sd()) {
  write_movement_sd([
    // "0" == "Not activ"; "1" == "Punish it"; "2" == "Disable it"
    0, // Armor
    0, // Block break
    0, // Block place
    0, // Interactions
    0, // Jumping
    0, // Swimming
    0, // Sprinting
    0, // Sneaks
    { camera: true, mount: true, dismount: true, forward: true, left: true, backward: true, right: true } // General movement
  ]);
}


// script events
system.afterEvents.scriptEventReceive.subscribe(event=> {
  // start a challenge
  if (event.id === "timeru:timer_starts") {
    let save_data = load_movement_sd()
    save_data.forEach((entry, index) => {
      if (index == 8) {
        world.sendMessage("§l§f[§5"+ restriction_list[index].name  +"§f]§r Your general movement is restricted, be careful!")
      } else if (index < 8) {
        if (entry > 0) world.sendMessage("§l§f[§5"+ restriction_list[index].name  +"§f]§r " + restriction_list[index].description + (save_data[index] == 1 ? ". You will be §cpunish§f for doing that!" : ". You §ccan't§f do that!"))
      }
    });
  }
  // movement menu
  if (event.id === "timeru:new_menu_challenge_movement") {
    new_menu_challenge_movement_main(event.sourceEntity, true)
  }
  // During the uninstallation program
  if (event.id === "timeru:remove") {
    world.setDynamicProperty("timerv:save_data", undefined);
    while (true);
  }
});




const restriction_list = [
  { name: "Armor", description: "Removes the ability to use armor", texture: "textures/items/armor_stand", supports_disable: true },
  { name: "Block break", description: "Triggered when a block is destroyed", texture: "textures/ui/pick_block", supports_disable: true },
  { name: "Block place", description: "Triggered when a block is placed", texture: "textures/ui/pick_block", supports_disable: true },
  { name: "Interactions", description: "Triggered when interacting with a block (e.g. with a chest)", texture: "textures/items/oak_chest_boat", supports_disable: true },
  { name: "Jumping", description: "Triggered when when a player jumps", texture: "textures/gui/controls/jump", supports_disable: true },
  { name: "Water", description: "Triggered when when a player is unter water", texture: "textures/gui/controls/waterascend", supports_disable: false },
  { name: "Sprinting", description: "Triggered when when a player sprints", texture: "textures/gui/controls/flyingascend", supports_disable: false },
  { name: "Sneaks", description: "Triggered when when a player sneaks\n\n§7Note: Incompatible with ice & gravity", texture: "textures/gui/controls/sneak_dpad", supports_disable: true },
  { name: "General movement", description: "", texture: "textures/ui/speed_effect", supports_disable: true },
  { name: "Only", description: "Removes the ability to go ever down or up\n\n§7Note: Teleports all players to X: 0 Y: 0 Z: 0 at start of Only Up", texture: "textures/items/ender_eye", supports_disable: false },
];



async function new_menu_challenge_movement_main(player, delay) {
  let form = new ActionFormData();
  let save_data = load_movement_sd()
  let actions = []
  form.title("Movement");
  form.body("This is an overview of all §2active§r§f restrictions on movement!");

  // Todo: Check if it is active (only)!
  restriction_list.forEach((restriction, index) => {
    if (index == 8) {
      if (!Object.values(save_data[8]).every(value => value === true)) {
        form.button(restriction.name, restriction.texture);
        actions.push(() => {
          new_menu_challenge_movement_8(player, index)
        });
      }
    } else if (index > 8 && timer_addon.getScore("only") > 0) {
      form.button(restriction.name, restriction.texture);
      actions.push(() => {
        new_menu_challenge_movement_description(player, index)
      });
    } else {
      if (save_data[index] > 0) {
        form.button(restriction.name, restriction.texture);
        actions.push(() => {
          new_menu_challenge_movement_description(player, index)
        });
      }
    }
  });

  if (timer_settings.getScore("mode") == 0) {
    form.button("Add restrictions", "textures/blocks/barrier");
    actions.push(() => {
      new_menu_challenge_movement_add(player)
    });
  }


  form.button("");
  actions.push(() => {
    player.runCommand(`dialogue open @e[type=npc, name=timer_menu] @s menu_challenge_new`);
  });

  if (delay) {
    await system.waitTicks(10);
  }

  form.show(player).then((response) => {
    // return closing the menu
    if (response.canceled) {
      return player.runCommand("scoreboard players set id timer_menu 1")
    }

    if (actions[response.selection]) {
      actions[response.selection]();
    }
  });
}



async function new_menu_challenge_movement_add(player) {
  let save_data = load_movement_sd()
  let form = new ActionFormData();
  let actions = []
  form.title("Movement");
  form.body("This is an overview of all available restrictions on movement!");

  // Todo: Check if it is not active (only)!
  restriction_list.forEach((restriction, index) => {
    if (index == 8) {
      if (Object.values(save_data[8]).every(value => value === true)) {
        form.button(restriction.name, restriction.texture);
        actions.push(() => {
          new_menu_challenge_movement_8(player, index)
        });
      }
    } else if (index > 8 && timer_addon.getScore("only") == 0) {
      form.button(restriction.name, restriction.texture);
      actions.push(() => {
        new_menu_challenge_movement_description(player, index)
      });
    } else {
      if (save_data[index] == 0) {
        form.button(restriction.name, restriction.texture);
        actions.push(() => {
          new_menu_challenge_movement_description(player, index)
        });
      }
    }
  });

  form.button("");
  actions.push(() => {
    new_menu_challenge_movement_main(player, false)
  });

  form.show(player).then((response) => {
    // return closing the menu
    if (response.canceled) {
      return player.runCommand("scoreboard players set id timer_menu 1")
    }

    if (actions[response.selection]) {
      actions[response.selection]();
    }
  });
}

async function new_menu_challenge_movement_8(player) {
  if (timer_settings.getScore("mode") == 0) {
    let save_data = load_movement_sd()
    let form = new ModalFormData();
    form.title(restriction_list[8].name);

    form.toggle('Camera', save_data[8].camera);
    form.toggle('Mount', save_data[8].mount);
    form.toggle('Disount', save_data[8].dismount);

    form.toggle('Move: Forward (W)', save_data[8].forward);
    form.toggle('Move: Left (A)', save_data[8].left);
    form.toggle('Move: Backward (S)', save_data[8].backward);
    form.toggle('Move: Right (D)', save_data[8].right);

    form.show(player).then((response) => {
      // return closing the menu
      if (response.canceled) {
        return player.runCommand("scoreboard players set id timer_menu 1")
      }

      save_data[8].camera = response.formValues[0]
      save_data[8].mount = response.formValues[1]
      save_data[8].dismount = response.formValues[2]
      save_data[8].forward = response.formValues[3]
      save_data[8].left = response.formValues[4]
      save_data[8].backward = response.formValues[5]
      save_data[8].right = response.formValues[6]
      write_movement_sd(save_data);

      if (save_data[8].forward && save_data[8].left && save_data[8].backward && save_data[8].right) {
        timer_addon.setScore("movement_severely_restricted", 1)
        if (timer_addon.getScore("speed_x") == 1) {
          player.sendMessage("§l§t[§3Info§t]§r Speed X is not compatible and has been disabled!")
          timer_addon.setScore("speed_x", 0)
        }
      } else {
        timer_addon.setScore("movement_severely_restricted", 1)
      }

      if (Object.values(save_data[8]).every(value => value === true)) {
        return new_menu_challenge_movement_add(player)
      } else {
        return new_menu_challenge_movement_main(player, false)
      }
    });
  } else {
    let save_data = load_movement_sd()
    let form = new ActionFormData();
    form.title(restriction_list[8].name);
    let actions = []
    form.body(
      "Camera: " + (save_data[8].camera ? "§aactive" : "§cdisable") + "\n§r" +
      "Mount: " + (save_data[8].mount ? "§aactive" : "§cdisable") + "\n§r" +
      "Dismount: " + (save_data[8].dismount ? "§aactive" : "§cdisable") + "\n§r" +
      "Move: Forward (W): " + (save_data[8].forward ? "§aactive" : "§cdisable") + "\n§r" +
      "Move: Left (A): " + (save_data[8].left ? "§aactive" : "§cdisable") + "\n§r" +
      "Move: Backward (S): " + (save_data[8].backward ? "§aactive" : "§cdisable") + "\n§r" +
      "Move: Right (D): " + (save_data[8].right ? "§aactive" : "§cdisable§r")
    );


    form.button("");
    actions.push(() => {
      new_menu_challenge_movement_main(player, false)
    });
    form.show(player).then((response) => {
      // return closing the menu
      if (response.canceled) {
        return player.runCommand("scoreboard players set id timer_menu 1")
      }

      if (actions[response.selection]) {
        actions[response.selection]();
      }
    });
  }
}



function new_menu_challenge_movement_description(player, id) {
  let save_data = load_movement_sd()
  let form = new ActionFormData();
  let actions = []
  form.title(restriction_list[id].name);
  form.body(restriction_list[id].description+ (save_data[id] > 0? save_data[id] == 1 ? ".-\n\nYou will be punish for doing that!" : ".\n\nYou can't do that!" : "")+ "\n\n");

  if (timer_settings.getScore("mode") == 0) {
    if (id > 8) {
      if (timer_addon.getScore("only") !== 2) {
        form.button((timer_addon.getScore("only") == 1 ? "Change to " : "") + "§5Only Down");
        actions.push(async () => {
          if (timer_addon.getScore("gravity") == 1) {
            player.sendMessage("§l§2[§gInfo§2]§r The gravity challenge is not compatible and has been disabled!")
            timer_addon.setScore("gravity", 0)
          }

          timer_addon.setScore("only", 2)

          if (timer_settings.getScore("dimension") == 1) {
            player.sendMessage("§l§2[§aDimension§2]§r Dimension is not compatible with the only challenge and has been disabled!")
            timer_settings.setScore("dimension", 0)
            player.runCommand("scoreboard players set id timer_menu 1")
            await system.waitTicks(10);
            return player.runCommand("execute in overworld run tp @a ~ 70 ~")
             
          }


          
          new_menu_challenge_movement_main(player, false)
        });
      }

      if (timer_addon.getScore("only") !== 1) {
        form.button((timer_addon.getScore("only") == 2 ? "Change to " : "") + "§5Only Up");
        actions.push(async () => {
          if (timer_addon.getScore("gravity") == 1) {
            player.sendMessage("§l§2[§gInfo§2]§r The gravity challenge is not compatible and has been disabled!")
            timer_addon.setScore("gravity", 0)
          }

          timer_addon.setScore("only", 1)

          if (timer_settings.getScore("dimension") == 1) {
            player.sendMessage("§l§2[§aDimension§2]§r Dimension is not compatible with the only challenge and has been disabled!")
            timer_settings.setScore("dimension", 0)
            await system.waitTicks(10);
            player.runCommand("scoreboard players set id timer_menu 1")
            return player.runCommand("execute in overworld run tp @a ~ 70 ~")
          }

          
          if (timer_settings.getScore("night_vision") == 0) {
            new_menu_challenge_movement_only_up_night_vision(player)
          } else {
            new_menu_challenge_movement_main(player, false)
          }
        });
      }

      if (timer_addon.getScore("only") !== 0) {
        form.button("§cRemove restrictions");
        actions.push(() => {
          timer_addon.setScore("only", 0)
          new_menu_challenge_movement_main(player, false)
        });
      }

    } else {
      if (restriction_list[id].supports_disable && save_data[id] !== 2) {
        form.button((save_data[id] == 1 ? "Change to " : "") + "§cDisable it");
        actions.push(() => {
          save_data[id] = 2
          write_movement_sd(save_data);
          new_menu_challenge_movement_main(player, false)
        });
      }

      if (save_data[id] !== 1) {
        form.button((save_data[id] == 2 ? "Change to " : "") + "§cPunish it");
        actions.push(() => {
          save_data[id] = 1
          write_movement_sd(save_data);
          new_menu_challenge_movement_main(player, false)
        });
      }

      if (save_data[id] !== 0) {
        form.button("§cRemove restrictions");
        actions.push(() => {
          save_data[id] = 0
          write_movement_sd(save_data);
          new_menu_challenge_movement_main(player, false)
        });
      }
    }
  }


  form.button("");
  actions.push(() => {
    if (save_data[id] > 0) {
      if (id == 7) {
        timer_addon.setScore("movement_sneaking", 1)

        if (timer_addon.getScore("ice_challenge") == 1) {
          player.sendMessage("§l§f[§bInfo§f]§r The ice challenge is not compatible and has been disabled!")
          timer_addon.setScore("ice_challenge", 0)
        }

        if (timer_addon.getScore("gravity") == 1) {
          player.sendMessage("§l§2[§gInfo§2]§r The gravity challenge is not compatible and has been disabled!")
          timer_addon.setScore("gravity", 0)
        }
      }
      new_menu_challenge_movement_main(player, false)
    } else {
      if (id == 7) {
        timer_addon.setScore("movement_sneaking", 0)
      }
      new_menu_challenge_movement_add(player)
    }
  });


  form.show(player).then((response) => {
    // return closing the menu
    if (response.canceled) {
      return player.runCommand("scoreboard players set id timer_menu 1")
    }

    if (actions[response.selection]) {
      actions[response.selection]();
    }
  });
}

function new_menu_challenge_movement_only_up_night_vision(player) {
  let form = new MessageFormData();
  form.title("Only Up");
  form.body("It's dangerous to go alone. Take this!");

  form.button2('§9Night vision');
  form.button1('Nevermind')
        

  form.show(player).then((response) => {
    // return closing the menu
    if (response.canceled) {
      return player.runCommand("scoreboard players set id timer_menu 1")
    } else {
      if (response.selection == 1) {
        timer_settings.setScore("night_vision", 1)
      }
      new_menu_challenge_movement_main(player, false)
    }
  });
}




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


const actions = [
  {
    event: world.beforeEvents.playerBreakBlock,
    index: 1,
    getItemId: data => data.block?.typeId,
    getPlayer: data => data.player
  },
  {
    event: world.beforeEvents.itemUseOn,
    index: 2,
    getItemId: data => data.itemStack?.typeId,
    getPlayer: data => data.source
  },
  {
    event: world.beforeEvents.playerInteractWithBlock,
    index: 3,
    getItemId: data => data.itemStack?.typeId,
    getPlayer: data => data.source
  }
];

const handleEvent = ({ index, getItemId, getPlayer, label=restriction_list[index].name }) => data => {
  if (!world.scoreboard.getObjective("timer_settings")) return;
  const save_data = load_movement_sd();
  if (timer_settings.getScore("mode") !== 1 || timer_settings.getScore("do_count") !== 1) return;
  if (save_data[index] === 0) return;

  data.cancel = true;
  const player = getPlayer(data);

  if (save_data[index] !== 2) {
    const itemId = getItemId(data);
    const translationKey = "tile." + itemId.replace("minecraft:", "") + ".name";
    world.sendMessage({
      rawtext: [
        { text: `§l§f[§5${label}§f]§r §l${player.name}§r ${label === "Block place" ? "placed" : label === "Block break" ? "destroyed" : "interacted with"}: ` },
        { translate: translationKey }
      ]
    });
    system.run(() => {
      player.runCommand('scoreboard players set reset_type timer_settings 1');
      player.runCommand('function timer/system_do_not_use/end_cmo');
    });
  }
};

actions.forEach(action => action.event.subscribe(handleEvent(action)));


function inputpermission_default(player) {
  player.runCommand("/inputpermission set @s camera enabled")
  player.runCommand("/inputpermission set @s mount enabled")
  player.runCommand("/inputpermission set @s dismount enabled")
  player.runCommand("/inputpermission set @s dismount enabled")
  player.runCommand("/inputpermission set @s move_left enabled")
  player.runCommand("/inputpermission set @s move_right enabled")
  player.runCommand("/inputpermission set @s move_forward enabled")
  player.runCommand("/inputpermission set @s move_backward enabled")
  player.runCommand("/inputpermission set @s sneak enabled")
  player.runCommand("/inputpermission set @s jump enabled")
}

function mainTick() {
  const players = world.getAllPlayers();
  for (const player of players) {
    if (timer_settings.getScore("mode") !== 1 || timer_settings.getScore("do_count") !== 1) inputpermission_default(player)
    // This protects the script from crashing when the scoreboard "timer_settings" and or "timer_addon"  is deleted.
    if (timer_settings !== undefined && timer_addon !== undefined) {
      let save_data = load_movement_sd()
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


      // no Armor
      if (timer_settings.getScore("mode") == 1 && timer_settings.getScore("do_count") == 1 && save_data[0] !== 0) {
        const equippable = player.getComponent("minecraft:equippable");
        const inventory = player.getComponent("minecraft:inventory")?.container;

        const slots = [
          EquipmentSlot.Head,
          EquipmentSlot.Chest,
          EquipmentSlot.Legs,
          EquipmentSlot.Feet,
        ];

        for (const slot of slots) {
          const item = equippable.getEquipment(slot)
          if (item) {
            if (save_data[0] == 2) {
              equippable.setEquipment(slot, undefined);
              inventory.addItem(item);
            } else {
              world.sendMessage({
                rawtext: [
                  { text: "§l§f[§5Armor§f]§r §l" + player.name + "§r put on: " },
                  { translate: (item.typeId.replace("minecraft:", "item.")+".name") }
                ]
              });

              player.runCommand('scoreboard players set reset_type timer_settings 1');
              player.runCommand('function timer/system_do_not_use/end_cmo');
            }
          }
        }
      }
      // no Jumping
      if (timer_settings.getScore("mode") == 1 && timer_settings.getScore("do_count") == 1 && save_data[4] !== 0) {
        
        if (save_data[4] == 2) {
          player.runCommand("/inputpermission set @s jump disabled")
        } else {
          
          if (player.isJumping) {
            world.sendMessage({
              rawtext: [
                { text: "§l§f[§5Jump§f]§r §l" + player.name + "§r jumped!" }
              ]
            });

            player.runCommand('scoreboard players set reset_type timer_settings 1');
            player.runCommand('function timer/system_do_not_use/end_cmo');
          }
        }
      }
      // no Swimming
      if (timer_settings.getScore("mode") == 1 && timer_settings.getScore("do_count") == 1 && save_data[5] !== 0) {
        if (player.isInWater) {
          world.sendMessage({
            rawtext: [
              { text: "§l§f[§5Swimming§f]§r §l" + player.name + "§r is in water!" }
            ]
          });

          player.runCommand('scoreboard players set reset_type timer_settings 1');
          player.runCommand('function timer/system_do_not_use/end_cmo');
        }
      }

      // no Sprinting
      if (timer_settings.getScore("mode") == 1 && timer_settings.getScore("do_count") == 1 && save_data[6] !== 0) {
        if (player.isSprinting) {
          world.sendMessage({
            rawtext: [
              { text: "§l§f[§5Sprinting§f]§r §l" + player.name + "§r sprinted!" }
            ]
          });

          player.runCommand('scoreboard players set reset_type timer_settings 1');
          player.runCommand('function timer/system_do_not_use/end_cmo');
        }
      }

      // no sneaking
      if (timer_settings.getScore("mode") == 1 && timer_settings.getScore("do_count") == 1 && save_data[7] !== 0) {

        if (save_data[7] == 2) {
          player.runCommand("/inputpermission set @s sneak disabled")
        } else {
          
          if (player.isSneaking) {
            world.sendMessage({
              rawtext: [
                { text: "§l§f[§5Sneak§f]§r §l" + player.name + "§r sneaked!" },
              ]
            });

            player.runCommand('scoreboard players set reset_type timer_settings 1');
            player.runCommand('function timer/system_do_not_use/end_cmo');
          }
        }
      }

      // mode 8
      if (timer_settings.getScore("mode") == 1 && timer_settings.getScore("do_count") == 1 && !Object.values(save_data[8]).every(value => value === true)) {
        if (!save_data[8].camera) {
          player.runCommand("/inputpermission set @s camera disabled");
        }

        if (!save_data[8].mount) {
          player.runCommand("/inputpermission set @s mount disabled");
        }

        if (!save_data[8].dismount) {
          player.runCommand("/inputpermission set @s dismount disabled");
        }

        if (!save_data[8].left) {
          player.runCommand("/inputpermission set @s move_left disabled");
        }

        if (!save_data[8].right) {
          player.runCommand("/inputpermission set @s move_right disabled");
        }

        if (!save_data[8].forward) {
          player.runCommand("/inputpermission set @s move_forward disabled");
        }

        if (!save_data[8].backward) {
          player.runCommand("/inputpermission set @s move_backward disabled");
        }

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
                player.sendMessage('§l§c[§bWorld Boader§c]§r The world border expant to §l§a'+ level +' Blocks§r!');
            }
    
            if (level < oldLevel && level !== 24791) {
                player.runCommand('playsound note.bassattack @a');
                
                player.sendMessage(
                  `§l§c[§bWorld Border§c]§r The world border reduced by §l§a${reducedLevel} Block${reducedLevel === 1 ? '' : 's'}§r! Now it is §l§a${level} Blocks§r!`
                );
                
            }
    
            if (level == 24791) {
                player.runCommand('playsound random.orb @a');
                player.sendMessage('§l§c[§bWorld Boader§c]§r The world border is turned off because you have reached the maximum level of §l§a'+ level +'§r!');
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