# scoreboard control
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 run scoreboard players add movement timer_addon 1
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score movement timer_addon matches 6.. run scoreboard players set movement timer_addon 0

# Default
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score movement timer_addon matches 0 run title @s title §aDefault
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score movement timer_addon matches 0 run title @s subtitle -- move without §crestrictions§f --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§5Info§f]§r Move without restrictions"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 0 unless score custom_music timer_settings matches 1 run playsound random.pop @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 0 if score custom_music timer_settings matches 1 run playsound ca.movement_0 @a[tag=trust_player_control]

# No Jump
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score movement timer_addon matches 1 run title @s title §cNo §7Jump
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score movement timer_addon matches 1 run title @s subtitle -- ends immediately --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§5Info§f]§r If someone jump, the run is over!"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 1 unless score custom_music timer_settings matches 1 run playsound mob.breeze.jump @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 1 if score custom_music timer_settings matches 1 run playsound ca.movement_1 @a[tag=trust_player_control]

# No Swimming
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score movement timer_addon matches 2 run title @s title §cNo §bSwimm
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score movement timer_addon matches 2 run title @s subtitle -- ends immediately --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§3[§bInfo§3]§r If someone starts swimming, the run is over!"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 2 unless score custom_music timer_settings matches 1 run playsound mob.dolphin.splash @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 2 if score custom_music timer_settings matches 1 run playsound ca.movement_2 @a[tag=trust_player_control]


# No Sprinting
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score movement timer_addon matches 3 run title @s title §cNo §6Sprinting
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score movement timer_addon matches 3 run title @s subtitle -- ends immediately --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 3 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§aInfo§6]§r If someone starts sprinting, the run is over!"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 3 unless score custom_music timer_settings matches 1 run playsound apply_effect.bad_omen @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 3 if score custom_music timer_settings matches 1 run playsound ca.movement_3 @a[tag=trust_player_control]

# No Move
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score movement timer_addon matches 4 run title @s title §cNo §fMove
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score movement timer_addon matches 4 run title @s subtitle -- is restricted --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 4 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§5Info§f]§r You are no longer able to move"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 4 unless score custom_music timer_settings matches 1 run playsound mob.endermen.portal @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 4 if score custom_music timer_settings matches 1 run playsound ca.movement_4 @a[tag=trust_player_control]

# No Camara
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score movement timer_addon matches 5 run title @s title §cNo §fMove & View
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score movement timer_addon matches 5 run title @s subtitle -- is restricted --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 5 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§5Info§f]§r You are no longer able to move and look around"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 5 unless score custom_music timer_settings matches 1 run playsound mace.heavy_smash_ground @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score movement timer_addon matches 5 if score custom_music timer_settings matches 1 run playsound ca.movement_5 @a[tag=trust_player_control]

# if other incompatible things were active
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score speed_x timer_addon matches 1 run tellraw @s {"rawtext":[{"text":"§l§t[§3Info§t]§r The Speed X challange is not compatible with the no move challenge and has been disabled!"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score speed_x timer_addon matches 1 run scoreboard players set speed_x timer_addon 0


# Error
execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r This action can only run in the main menu."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHelp§6]§r Run §g§l/function timer/control§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content

execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r Challenges could not be activated because the \"Speed ​Run Mode\" is active."}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content
