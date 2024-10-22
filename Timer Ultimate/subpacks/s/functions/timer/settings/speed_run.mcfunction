execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 0 run scoreboard players add speed_run timer_settings 1
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 0 if score speed_run timer_settings matches 2.. run scoreboard players set speed_run timer_settings 0

### If speed_run is off
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 0 if score speed_run timer_settings matches 0 run titleraw @s title {"rawtext":[{"text":"§uSpeed §dRun"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 0 if score speed_run timer_settings matches 0 run titleraw @s subtitle {"rawtext":[{"text":"-- is off --"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 0 if score speed_run timer_settings matches 0 unless score custom_music timer_settings matches 1 run playsound trial_spawner.break @a[tag=trust_player_control] ~~~ 1 0.8
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 0 if score speed_run timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.speed_run_0 @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 0 if score speed_run timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§u[§dSpeed Run§u]§r Give yourself all the time in the world if you have it!"}]}


### If speed_run is on
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 0 if score speed_run timer_settings matches 1 run titleraw @s title {"rawtext":[{"text":"§uSpeed §dRun"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 0 if score speed_run timer_settings matches 1 run titleraw @s subtitle {"rawtext":[{"text":"-- Play as fast as you can! --"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 0 if score speed_run timer_settings matches 1 unless score custom_music timer_settings matches 1 run playsound trial_spawner.spawn_mob @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 0 if score speed_run timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.speed_run_1 @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 0 if score speed_run timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§u[§dSpeed Run§u]§r Without a break, without difficulty, just Minecraft!"}]}


# Feedback if look is 1
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 0 unless score custom_music timer_settings matches 1 run playsound random.pop @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.message @a[tag=trust_player_control]



### Error
execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r This action can only run in the main menu."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHelp§6]§r Führe §g§l/function timer/control§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound note.function_no_content

execute if entity @s[tag=trust_player_control] if score speed_run_available timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r Speedrun Mode can only be activated once when the timer was loaded for the first time!"}]}
execute if entity @s[tag=trust_player_control] if score speed_run_available timer_settings matches 0 run title @a[tag=timer_menu_target] title §eAn Error occurred
execute if entity @s[tag=trust_player_control] if score speed_run_available timer_settings matches 0 run title @a[tag=timer_menu_target] subtitle -- Look in the chat --
execute if entity @s[tag=trust_player_control] if score speed_run_available timer_settings matches 0 unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=trust_player_control] if score speed_run_available timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content @s

execute if entity @s[tag=trust_player_control] if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 1.. run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r Speedrun Mode can only be activated when the dimension is set to Overworld"}]}
execute if entity @s[tag=trust_player_control] if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 1.. run title @a[tag=timer_menu_target] title §eAn Error occurred
execute if entity @s[tag=trust_player_control] if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 1.. run title @a[tag=timer_menu_target] subtitle -- Look in the chat --
execute if entity @s[tag=trust_player_control] if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 1.. unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=trust_player_control] if score speed_run_available timer_settings matches 1 if score dimension timer_settings matches 1.. if score custom_music timer_settings matches 1 run playsound timeru.function_no_content @s

# Incompadibal
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 0 if score speed_run timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal cannot be used with \"Speed Run\", it has been set to §bR§ga§an§6d§4o§fm"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 0 if score speed_run timer_settings matches 1 run scoreboard players set goal timer_settings 8

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score speed_run timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal cannot be used with \"Speed Run\", it has been set to §bR§ga§an§6d§4o§fm"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score speed_run timer_settings matches 1 run scoreboard players set goal timer_settings 8

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 unless score difficulty timer_settings matches 1 if score speed_run timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§7[§fDifficulty§7]§r Your Difficulty cannot be used with \"Speed Run\", it has been set to §fNormal§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 unless score difficulty timer_settings matches 1 if score speed_run timer_settings matches 1 run scoreboard players set difficulty timer_settings 1

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score night_vision timer_settings matches 1 if score speed_run timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§1[§9Info§1]§r The Fullbright modification is now deactivated because the \"Speed Run Mode\" is incompadibal with it."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score night_vision timer_settings matches 1 if score speed_run timer_settings matches 1 run scoreboard players set night_vision timer_settings 0

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score shoud_count_down timer_settings matches 1 if score speed_run timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dSystem§5]§r The §5Timermode§r was deactivated because the \"Speed Run Mode\" is incompadibal with it."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score shoud_count_down timer_settings matches 1 if score speed_run timer_settings matches 1 run scoreboard players set h timer_time 0
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score shoud_count_down timer_settings matches 1 if score speed_run timer_settings matches 1 run scoreboard players set min timer_time 0
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score shoud_count_down timer_settings matches 1 if score speed_run timer_settings matches 1 run scoreboard players set sec timer_time 0
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score shoud_count_down timer_settings matches 1 if score speed_run timer_settings matches 1 run scoreboard players set shoud_count_down timer_settings 0

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score afk timer_settings matches 1 if score speed_run timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§3[§bAFK§3]§r The AFK modification is now deactivated because the \"Speed Run Mode\" is incompadibal with it."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score afk timer_settings matches 1 if score speed_run timer_settings matches 1 run scoreboard players set afk timer_settings 0