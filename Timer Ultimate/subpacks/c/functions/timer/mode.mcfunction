### Scoreboard
execute if score host_mode timer_menu matches 0 run scoreboard players add @s timer_do_count 1
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] run scoreboard players add host timer_do_count 1

# Control (local)
execute if score host_mode timer_menu matches 0 if score @s timer_do_count matches 1 unless score @s timer_time_d matches 1000.. if score @s timer_custom_music matches 0 run playsound beacon.activate
execute if score host_mode timer_menu matches 0 if score @s timer_do_count matches 1 unless score @s timer_time_d matches 1000.. if score @s timer_custom_music matches 1 run playsound timeru.continue
execute if score host_mode timer_menu matches 0 if score @s timer_do_count matches 1 unless score @s timer_time_d matches 1000.. run tellraw @s {"rawtext":[{"text":"§l§7[§fSystem§7]§r Timer §7continued§r"}]}
execute if score host_mode timer_menu matches 0 if score @s timer_do_count matches 1 unless score @s timer_time_d matches 1000.. run title @s title §fTimer §7continued§r

execute if score host_mode timer_menu matches 0 if score @s timer_do_count matches 2 if score @s timer_custom_music matches 0 run playsound beacon.deactivate
execute if score host_mode timer_menu matches 0 if score @s timer_do_count matches 2 if score @s timer_custom_music matches 1 run playsound timeru.frozen
execute if score host_mode timer_menu matches 0 if score @s timer_do_count matches 2 if score @s timer_night_vision matches 1 run effect @s clear
execute if score host_mode timer_menu matches 0 if score @s timer_do_count matches 2 run title @s title §4Timer paused§r
execute if score host_mode timer_menu matches 0 if score @s timer_do_count matches 2 run tellraw @s {"rawtext":[{"text":"§l§7[§fSystem§7]§r Timer §4paused§r"}]}

execute if score host_mode timer_menu matches 0 run scoreboard players set @s[scores={timer_do_count=2..}] timer_do_count 0


# Control (global)

execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_do_count matches 1 unless score host timer_time_d matches 1000.. run playsound beacon.activate @a[scores={timer_custom_music=0}]
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_do_count matches 1 unless score host timer_time_d matches 1000.. run playsound timeru.continue @a[scores={timer_custom_music=1}]
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_do_count matches 1 unless score host timer_time_d matches 1000.. run tellraw @a {"rawtext":[{"text":"§l§7[§fSystem§7]§r Timer §7continued§r"}]}
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_do_count matches 1 unless score host timer_time_d matches 1000.. run title @a title §fTimer §7continued§r

execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_do_count matches 3 run playsound beacon.deactivate @a[scores={timer_custom_music=0}]
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_do_count matches 3 run playsound timeru.frozen @a[scores={timer_custom_music=1}]
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_do_count matches 3 if score host timer_night_vision matches 1 run effect @a clear
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_do_count matches 3 run title @a title §4Timer paused§r
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_do_count matches 3 run tellraw @a {"rawtext":[{"text":"§l§7[§fSystem§7]§r Timer §4paused§r"}]}

execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_do_count matches 2.. run scoreboard players set host timer_do_count 0

# Error
execute if score host_mode timer_menu matches 2 if entity @s[tag=trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r §lWorld mode§r doesn't have any modes to change!"}]}
execute if score host_mode timer_menu matches 2 if entity @s[tag=trust_player_control] run playsound block.false_permissions @s[scores={timer_custom_music=0}]
execute if score host_mode timer_menu matches 2 if entity @s[tag=trust_player_control] run playsound timeru.function_no_permissions @s[scores={timer_custom_music=1}]


execute if score host_mode timer_menu matches 1.. if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if score host_mode timer_menu matches 1.. if entity @s[tag=!trust_player_control] run playsound block.false_permissions @s[scores={timer_custom_music=0}]
execute if score host_mode timer_menu matches 1.. if entity @s[tag=!trust_player_control] run playsound timeru.function_no_permissions @s[scores={timer_custom_music=1}]