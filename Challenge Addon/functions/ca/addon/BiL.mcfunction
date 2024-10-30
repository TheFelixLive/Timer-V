# scoreboard control
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 run scoreboard players add floor_is_lava timer_addon 1
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score floor_is_lava timer_addon matches 2.. run scoreboard players set floor_is_lava timer_addon 0

# Ice-challenge_disable message
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score floor_is_lava timer_addon matches 0 run title @s title §l§6The §cfloor §6= §clava §r§f[Beta]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score floor_is_lava timer_addon matches 0 run title @s subtitle -- is §cdisabled§f --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score floor_is_lava timer_addon matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§c[§6Info§c]§r The floor = lava challenge is off"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score floor_is_lava timer_addon matches 0 unless score custom_music timer_settings matches 1 run playsound random.pop @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score floor_is_lava timer_addon matches 0 if score custom_music timer_settings matches 1 run playsound ca.floor_is_lava_0 @a[tag=trust_player_control]

# Ice-challenge enable message 
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score floor_is_lava timer_addon matches 1 run title @s title §l§6The §cfloor §6= §clava §r§f[Beta]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score floor_is_lava timer_addon matches 1 run title @s subtitle -- is §aactiv§f --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score floor_is_lava timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§c[§6Info§c]§r floor = lava challenge is aktiv, lava spawns among all players"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score floor_is_lava timer_addon matches 1 unless score custom_music timer_settings matches 1 run playsound bucket.fill_lava @a[tag=trust_player_control] ~ ~ ~ 0.3
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score floor_is_lava timer_addon matches 1 if score custom_music timer_settings matches 1 run playsound ca.floor_is_lava_1 @a[tag=trust_player_control]

# if other incompatible things were active
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score gravity timer_addon matches 1 run tellraw @s {"rawtext":[{"text":"§l§2[§gInfo§2]§r Gravity is not compatible with floor = lava and has been disabled!"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score gravity timer_addon matches 1 run scoreboard players set gravity timer_addon 0

execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score ice_challenge timer_addon matches 1 run tellraw @s {"rawtext":[{"text":"§l§f[§bInfo§f]§r The ice challenge is not compatible with floor = lava and has been disabled!"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score ice_challenge timer_addon matches 1 run scoreboard players set ice_challenge timer_addon 0

execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score level_equals_border timer_addon matches 1 run tellraw @s {"rawtext":[{"text":"§l§c[§bWorld Boader§c]§r The level equals border challange is not compatible with the Speed X challenge and has been disabled!"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score level_equals_border timer_addon matches 1 run scoreboard players set level_equals_border timer_addon 0


# Error
execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r This action can only run in the main menu."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHelp§6]§r Run §g§l/function timer/control§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content

execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r challenges could not be activated because the \"Speed Run Mode\" is active."}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content
