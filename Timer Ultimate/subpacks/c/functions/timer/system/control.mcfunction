# Local Mode
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 2 run tag @s add local_mode

execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 2 run tellraw @a {"rawtext":[{"text":"§l§7[§fSystem§7]§r Control was changed to §l§7Local"}]}
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 2 if score host timer_shoud_count_down matches 1 run tellraw @a[tag=target_host] {"rawtext":[{"text":"§l§7[§fSystem§7]§r Timemode is not supported in §l§7Local§r. Therefore your time wasn't changed"}]}
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 2 run tellraw @a[scores={timer_afk=1}] {"rawtext":[{"text":"§l§3[§bAFK§3]§r AFK is once again aktiv!"}]}
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 2 run title @s title §bLocal mode
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 2 run title @s subtitle -- Everyone controls their timer --
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 2 if entity @s[tag=timer_menu_target] run scoreboard players set animation_time timer_menu 40
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 2 run playsound bottle.dragonbreath @a[scores={timer_custom_music=0}]
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 2 run playsound timeru.message.local_control @a[scores={timer_custom_music=1}]




# Global Mode
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run scoreboard players operation host timer_time_ms = @s timer_time_ms
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run scoreboard players operation host timer_time_sec = @s timer_time_sec
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run scoreboard players operation host timer_time_min = @s timer_time_min
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run scoreboard players operation host timer_time_h = @s timer_time_h
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run scoreboard players operation host timer_time_d = @s timer_time_d
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run scoreboard players operation host timer_night_vision = @s timer_night_vision
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run scoreboard players operation host timer_do_count = @s timer_do_count
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run scoreboard players set host timer_shoud_count_down 0

execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run tag @s add global_mode

execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run tellraw @a {"rawtext":[{"text":"§l§7[§fSystem§7]§r Control was changed to §l§7Global"}]}
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run title @s title §aGlobal mode
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run title @s subtitle -- Your timer is visible for everyone --
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 if entity @s[tag=timer_menu_target] run scoreboard players set animation_time timer_menu 40
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run tellraw @a[scores={timer_afk=1}] {"rawtext":[{"text":"§l§3[§bAFK§3]§r AFK is not supported and has been disabled!"}]}
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run playsound block.end_portal_frame.fill @a[scores={timer_custom_music=0}]
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run playsound timeru.message.global_control @a[scores={timer_custom_music=1}]






# World Mode
execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 if score host timer_shoud_count_down matches 0 run scoreboard players operation @a[tag=target_host] timer_time_ms = host timer_time_ms
execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 if score host timer_shoud_count_down matches 0 run scoreboard players operation @a[tag=target_host] timer_time_sec = host timer_time_sec
execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 if score host timer_shoud_count_down matches 0 run scoreboard players operation @a[tag=target_host] timer_time_min = host timer_time_min
execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 if score host timer_shoud_count_down matches 0 run scoreboard players operation @a[tag=target_host] timer_time_h = host timer_time_h
execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 if score host timer_shoud_count_down matches 0 run scoreboard players operation @a[tag=target_host] timer_time_d = host timer_time_d
execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 if score host timer_shoud_count_down matches 0 run scoreboard players operation @a[tag=target_host] timer_night_vision = host timer_night_vision
execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 if score host timer_shoud_count_down matches 0 run scoreboard players operation @a[tag=target_host] timer_do_count = host timer_do_count

execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 run tag @s add world_mode

execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 run scoreboard players set host timer_do_count 1
execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 run tellraw @a {"rawtext":[{"text":"§l§7[§fSystem§7]§r Control was changed to §l§7World"}]}
execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 if score host timer_shoud_count_down matches 1 run tellraw @a[tag=target_host] {"rawtext":[{"text":"§l§7[§fSystem§7]§r Timemode is only supported §l§7Global§r. Therefore your time wasn't saved!"}]}
execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 run title @s title §dWorld mode
execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 run title @s subtitle -- Show the time your the World --
execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 if entity @s[tag=timer_menu_target] run scoreboard players set animation_time timer_menu 40
execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 run playsound bottle.dragonbreath @a[scores={timer_custom_music=0}]
execute if entity @s[tag=trust_player_control] if entity @a[tag=target_host] if score host_mode timer_menu matches 1 run playsound timeru.message.world_control @a[scores={timer_custom_music=1}]

execute if entity @s[tag=trust_player_control] unless entity @a[tag=target_host] if score host_mode timer_menu matches 1 run tellraw @s {"rawtext":[{"text":"§l§4[§cSystem§4]§r The controls could not be changed because the player who activated them could not be found"}]}
execute if entity @s[tag=trust_player_control] unless entity @a[tag=target_host] if score host_mode timer_menu matches 1 run title @s title §4Error
execute if entity @s[tag=trust_player_control] unless entity @a[tag=target_host] if score host_mode timer_menu matches 1 run title @s subtitle -- Look in the Chat --
execute if entity @s[tag=trust_player_control] unless entity @a[tag=target_host] if score host_mode timer_menu matches 1 if entity @s[tag=timer_menu_target] run scoreboard players set animation_time timer_menu 120
execute if entity @s[tag=trust_player_control] unless entity @a[tag=target_host] if score host_mode timer_menu matches 1 run playsound block.loom.use @a[scores={timer_custom_music=0}]
execute if entity @s[tag=trust_player_control] unless entity @a[tag=target_host] if score host_mode timer_menu matches 1 run playsound timeru.message.no.world_control @a[scores={timer_custom_music=1}]




# Tag control
execute if entity @s[tag=trust_player_control] if entity @a[tag=local_mode] run scoreboard players set host_mode timer_menu 0


execute if entity @s[tag=trust_player_control] if entity @a[tag=global_mode] run tag @s add target_host
execute if entity @s[tag=trust_player_control] if entity @a[tag=global_mode] run scoreboard players set host_mode timer_menu 1

execute if entity @s[tag=trust_player_control] if entity @a[tag=world_mode] run scoreboard players set host_mode timer_menu 2
execute if entity @s[tag=trust_player_control] if entity @a[tag=world_mode] run tag @a remove target_host


tag @a remove local_mode
tag @a remove global_mode
tag @a remove world_mode

# Error
execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] run playsound block.false_permissions @s[scores={timer_custom_music=0}]
execute if entity @s[tag=!trust_player_control] run playsound timeru.function_no_permissions @s[scores={timer_custom_music=1}]