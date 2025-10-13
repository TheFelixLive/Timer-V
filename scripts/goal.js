import { world, system, EntityTypes } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"
import { load_save_data, update_save_data, getRelativeTime } from "./helper_function.js";
import { translate_soundkeys } from "./sound";
import { translate_textkeys } from "./lang.js";
import { main_menu } from "./menu.js";
import { challenge_list } from "./communication_system.js";

export const goal_event = [
  {
    name: "Time Goal",
    icon: "textures/items/clock_item",
    condition: (data) => data[0].time?.timer > 0 && data[0].counting_type === 1
  },
  {
    name: "Raid",
    icon: "textures/ui/raid_omen_effect",
    condition: () => true
  }
]

export let goal_entity_list;

system.run(() => {
  goal_entity_list = EntityTypes.getAll();
});

// Really, how do you defeat an "area effect cloud" in survival?
export const goal_entity_blocklist = [
  {
    id: "agent" // WTF
  },
  {
    id: "area_effect_cloud" // WTF
  },
  {
    id: "armor_stand"
  },
  {
    id: "arrow"
  },
  {
    id: "boat"
  },
  {
    id: "breeze_wind_charge_projectile"
  },
  {
    id: "chest_boat"
  },
  {
    id: "chest_minecart"
  },
  {
    id: "command_block_minecart"
  },
  {
    id: "dragon_fireball"
  },
  {
    id: "egg"
  },
  {
    id: "ender_crystal"
  },
  {
    id: "ender_pearl"
  },
  {
    id: "eye_of_ender_signal"
  },
  {
    id: "fireball"
  },
  {
    id: "fireworks_rocket"
  },
  {
    id: "fishing_hook"
  },
  {
    id: "hopper_minecart"
  },
  {
    id: "lightning_bolt"
  },
  {
    id: "lingering_potion"
  },
  {
    id: "llama_spit"
  },
  {
    id: "minecart"
  },
  {
    id: "npc"
  },
  {
    id: "ominous_item_spawner"
  },
  {
    id: "player" // Technically I could do player as goal but it could result to a soft lock if the selected player leaves... Maybe something for a future update
  },
  {
    id: "shulker_bullet"
  },
  {
    id: "small_fireball"
  },
  {
    id: "snowball"
  },
  {
    id: "splash_potion"
  },
  {
    id: "thrown_trident"
  },
  {
    id: "tnt"
  },
  {
    id: "tnt_minecart"
  },
  {
    id: "tripod_camera" // WTF
  },
  {
    id: "wind_charge_projectile"
  },
  {
    id: "wither_skull"
  },
  {
    id: "wither_skull_dangerous"
  },
  {
    id: "xp_bottle"
  },
  {
    id: "xp_orb"
  },
  {
    id: "zombie_horse" // Have you ever found it in survival?
  },
  // Minecraft still has the V1 Villagers in the code, the ones before 1.14, which you will no longer find because they are all replaced by V2 automatically
  {
    id: "zombie_villager"
  },
  {
    id: "villager"
  },
  // Only available if edu is activated
  {
    id: "balloon"
  },
    {
    id: "ice_bomb"
  }
]

export const goal_entity_exceptionlist = {
  evocation_illager: {
    icon: "textures/items/spawn_eggs/spawn_egg_evoker"
  },

  zombie_pigman: {
    icon: "textures/items/spawn_eggs/spawn_egg_zombified_piglin"
  },

  villager_v2: {
    icon: "textures/items/spawn_eggs/spawn_egg_villager"
  },

  zombie_villager_v2: {
    icon: "textures/items/spawn_eggs/spawn_egg_zombie_villager"
  }
}




export function settings_goals_main(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang
  const pointer = save_data[0].challenge.goal.pointer;

  form.title(translate_textkeys("menu.goal.title", lang));
  form.body(translate_textkeys("menu.general.description", lang));

  form.button({
    rawtext: [
      { text: translate_textkeys("menu.goal.entity", lang)+"\n"+translate_textkeys("menu.goal.entity.prefix", lang) },
      ...(pointer === 1
        ? [
            { text: ": " },
            { translate: "entity." + save_data[0].challenge.goal.entity_id.replace(/^minecraft:/, "") + ".name" }
          ]
        : [{ text: translate_textkeys("menu.goal.entity.fix", lang) }]
      )
    ]
  },
  pointer === 1 ? "textures/ui/realms_slot_check" : undefined);



  form.button(
    translate_textkeys("menu.goal.event", lang)+"\n"+translate_textkeys("menu.goal.event.subtitle", lang),
    pointer === 2 ? "textures/ui/realms_slot_check" : undefined
  );

  form.button(
    translate_textkeys("menu.goal.random", lang)+"\n"+translate_textkeys("menu.goal.random.subtitle", lang),
    pointer === 0 ? "textures/ui/realms_slot_check" : undefined
  );
  form.divider()
  form.button("");

  form.show(player).then((response) => {
    if (response.canceled) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection === 0) {
      settings_goals_select(player, "entity")
    };
    if (response.selection === 1) return settings_goals_select(player, "event");
    if (response.selection === 2) {
      save_data[0].challenge.goal.pointer = 0;
      update_save_data(save_data);
      return settings_goals_main(player);
    }
    if (response.selection === 3) {
      player.playMusic(translate_soundkeys("music.menu.main", player), {fade: 0.3});
      return main_menu(player);
    }
  });
}


async function settings_goals_select(player, type) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang
  const isEvent = type === "event";
  const isRandom = save_data[0].challenge.goal.pointer === 0;
  const pointerValue = isEvent ? 2 : 1;
  const goalArray = isEvent ? goal_event : goal_entity_list; // für Entities goal_entity_list benutzen

  // Für Entity-Typen: aktuell gespeicherte entity_id
  const currentGoalID = (!isEvent && !isRandom && save_data[0].challenge.goal.pointer === 1)
    ? save_data[0].challenge.goal.entity_id
    : undefined;
  // Für Event-Typen: aktuell gespeicherter Event-Index
  const currentGoalIndex = (isEvent && !isRandom && save_data[0].challenge.goal.pointer === 2)
    ? save_data[0].challenge.goal.event_pos
    : undefined;

  form.title(translate_textkeys("menu.goal.title", lang)+" - " +(isEvent ? translate_textkeys("menu.goal.event", lang) : translate_textkeys("menu.goal.entity", lang)));
  form.body(translate_textkeys("menu.goal.description", lang));

  let visibleGoals;
  if (isEvent) {
    visibleGoals = goalArray.filter(goal => goal.condition(save_data));
  } else {
    visibleGoals = goalArray.filter(e => {
      const id = e.id;
      const baseId = id.replace(/^minecraft:/, "");
      if (!id.startsWith("minecraft:") && !save_data[player_sd_index].allow_unnecessary_inputs) return false;
      if (goal_entity_blocklist.find(blocked => blocked.id === baseId)) return false;
      return true;
    });
  }

  // Aktuelles Ziel ggf. oben anstellen und aus der Liste entfernen,
  // aber nur wenn pointer zum Typ passt
  let selectedGoal;
  if (isEvent && currentGoalIndex !== undefined) {
    const goal = goalArray[currentGoalIndex];
    if (visibleGoals.includes(goal)) {
      selectedGoal = goal;
      visibleGoals = visibleGoals.filter(g => g !== goal);
    }
  } else if (!isEvent && currentGoalID) {
    const goal = visibleGoals.find(g => g.id === currentGoalID);
    if (goal) {
      selectedGoal = goal;
      visibleGoals = visibleGoals.filter(g => g.id !== currentGoalID);
    }
  }

  visibleGoals.sort((a, b) => {
    return isEvent
      ? a.name.localeCompare(b.name)
      : a.id.localeCompare(b.id);
  });

  if (selectedGoal) {
    visibleGoals.unshift(selectedGoal);
  }

  visibleGoals.forEach(goal => {
    const realIndex = isEvent
      ? goalArray.findIndex(g => g.name === goal.name)
      : undefined;

    const pointer = save_data[0].challenge.goal.pointer;
    const isSelected = isEvent
      ? (pointer === 2 && currentGoalIndex === realIndex)
      : (pointer === 1 && currentGoalID === goal.id);

    const labelText = {
      rawtext: [
        isEvent
          ? { text: goal.name }
          : { translate: "entity." + goal.id.replace(/^minecraft:/, "") + ".name" },
        { text: isSelected
            ? "\n" + translate_textkeys("menu.item_selected", save_data[player_sd_index].lang)
            : ""
        },
      ],
    };

    const icon = goal.icon
      ? goal.icon
      : (!isEvent && goal_entity_exceptionlist[goal.id.replace(/^minecraft:/, "")]
        ? goal_entity_exceptionlist[goal.id.replace(/^minecraft:/, "")].icon
        : `textures/items/spawn_eggs/spawn_egg_${goal.id.replace(/^minecraft:/, "")}`);

    form.button(labelText, icon);
    if (isSelected & visibleGoals.length > 1) form.divider()
  });
  form.divider()
  form.button("");
  form.show(player).then((response) => {
    if (response.canceled) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection < visibleGoals.length) {
      const selectedGoal = visibleGoals[response.selection];
      if (isEvent) {
        const realIndex = goalArray.findIndex(goal => goal.name === selectedGoal.name);
        save_data[0].challenge.goal.event_pos = realIndex;
      } else {
        save_data[0].challenge.goal.entity_id = selectedGoal.id;
      }
      save_data[0].challenge.goal.pointer = pointerValue;
      update_save_data(save_data);
    }
    if (response.selection >= 0) return settings_goals_main(player);
  });
}


export function render_task_list(player) {
  let save_data = load_save_data();
  let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang
  let lines = [];

  // difficulty
  if ([2, 3, 4].includes(save_data[0].challenge.difficulty)) {
    lines.push({
      text: "- " + translate_textkeys(
        `menu.render_task_list.difficulty.${save_data[0].challenge.difficulty}`,
        lang
      ) + "\n"
    });
  }

  // challenge name
  if (save_data[0].challenge.external_challenge) {
    challenge_list.forEach(ch => {
      if (save_data[0].challenge.external_challenge.includes(ch.uuid)) {
        lines.push({ text: "- " + translate_textkeys("menu.render_task_list.challenge", lang, {name: ch.name}) + "\n" });
      }
    });
  }

  // goals pointer 0 = random
  if (save_data[0].challenge.goal.pointer === 0) {
    lines.push({ text: "- "+translate_textkeys("menu.render_task_list.goal.random", lang)+"\n" });
  }

  // goals pointer 1 = defeat specific entity
  if (save_data[0].challenge.goal.pointer === 1) {
    lines.push({ text: "- "+ translate_textkeys("menu.render_task_list.goal.entity", lang) });
    lines.push({translate: "entity." + save_data[0].challenge.goal.entity_id.replace(/^minecraft:/, "") + ".name"});
    lines.push({ text: "\n" });
  }

  // goals pointer 2 = event/time-based
  if (save_data[0].challenge.goal.pointer === 2 && save_data[0].challenge.goal.event_pos === 0) {
    // survive timer only
    lines.push({ text: "- " + translate_textkeys("menu.render_task_list.goal.event.time.timer", lang) + getRelativeTime(save_data[0].time.timer / 20, player) + "\n" });
  } else {
    // time available
    if (save_data[0].counting_type === 1) {
      lines.push({ text: "- " + translate_textkeys("menu.render_task_list.goal.event.time", lang) + getRelativeTime(save_data[0].time.timer / 20, player) + "§r§f\n" });
    }
    // goal event
    if (save_data[0].challenge.goal.pointer === 2) {
      lines.push({ text: "- "+ translate_textkeys("menu.render_task_list.goal.event", lang) + goal_event[save_data[0].challenge.goal.event_pos].name + "§r§f\n" });
    }
  }

  return lines;
}