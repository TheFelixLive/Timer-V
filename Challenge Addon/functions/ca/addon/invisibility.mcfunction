# scoreboard control
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 run scoreboard players add invisibility timer_addon 1
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score invisibility timer_addon matches 2.. run scoreboard players set invisibility timer_addon 0

# Ice-challenge_disable message
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score invisibility timer_addon matches 0 run title @s title §7Invisibility
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score invisibility timer_addon matches 0 run title @s subtitle -- is §cdisabled§f --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score invisibility timer_addon matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§7[§fInfo§7]§r Invisibility is off"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score invisibility timer_addon matches 0 unless score custom_music timer_settings matches 1 run playsound random.pop @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score invisibility timer_addon matches 0 if score custom_music timer_settings matches 1 run playsound ca.invisibility_0 @a[tag=trust_player_control]

# Ice-challenge enable message 
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score invisibility timer_addon matches 1 run title @s title §7Invisibility
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score invisibility timer_addon matches 1 run title @s subtitle -- is §aactiv§f --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score invisibility timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§7[§fInfo§7]§r Almost all entities are invisible in your world"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score invisibility timer_addon matches 1 unless score custom_music timer_settings matches 1 run playsound trial_spawner.ambient_ominous @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score invisibility timer_addon matches 1 if score custom_music timer_settings matches 1 run playsound ca.invisibility_1 @a[tag=trust_player_control]

# if other incompatible things were active
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score gravity timer_addon matches 1 run tellraw @s {"rawtext":[{"text":"§l§2[§gInfo§2]§r The gravity challange is not compatible with invisibility and has been disabled!"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score gravity timer_addon matches 1 run scoreboard players set gravity timer_addon 0

execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score speed_x timer_addon matches 1 run tellraw @s {"rawtext":[{"text":"§l§t[§3Info§t]§r The Speed X challange is not compatible with invisibility and has been disabled!"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score speed_x timer_addon matches 1 run scoreboard players set speed_x timer_addon 0

execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score night_vision timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§1[§9Info§1]§r The mod fullbright is not compatible with invisibility and has been disabled!"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score night_vision timer_settings matches 1 run scoreboard players set night_vision timer_settings 0

# Error
execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r This action can only run in the main menu."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHelp§6]§r Run §g§l/function timer/control§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content

execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r challenges could not be activated because the \"Speed ​Run Mode\" is active."}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content
