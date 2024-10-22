# scoreboard control
execute unless score host_mode timer_menu matches 1 run scoreboard players add @s timer_night_vision 1
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 1 run scoreboard players add host timer_night_vision 1

# night_vision on (lokal)
execute unless score host_mode timer_menu matches 1 if score @s timer_night_vision matches 1 if score @s timer_custom_music matches 0 run playsound random.potion.brewed
execute unless score host_mode timer_menu matches 1 if score @s timer_night_vision matches 1 if score @s timer_custom_music matches 1 run playsound timeru.nightvision_0
execute unless score host_mode timer_menu matches 1 if score @s timer_night_vision matches 1 run tellraw @s {"rawtext":[{"text":"§l§1[§9Info§1]§r Fullbright is active, you have the night vision effect"}]}
execute unless score host_mode timer_menu matches 1 if score @s timer_night_vision matches 1 run title @s title §9Fullbright
execute unless score host_mode timer_menu matches 1 if score @s timer_night_vision matches 1 run title @s subtitle --this modification is §aactive§f --

# night_vision off (lokal)
execute unless score host_mode timer_menu matches 1 if score @s timer_night_vision matches 2 if score @s timer_custom_music matches 0 run playsound random.pop
execute unless score host_mode timer_menu matches 1 if score @s timer_night_vision matches 2 if score @s timer_custom_music matches 1 run playsound timeru.message
execute unless score host_mode timer_menu matches 1 if score @s timer_night_vision matches 2 run title @s title §9Fullbright
execute unless score host_mode timer_menu matches 1 if score @s timer_night_vision matches 2 run title @s subtitle --this modification is §coff§f --
execute unless score host_mode timer_menu matches 1 if score @s timer_night_vision matches 2 run tellraw @s {"rawtext":[{"text":"§l§1[§9Info§1]§r The Fullbright modification is deactivated."}]}
execute unless score host_mode timer_menu matches 1 if score @s timer_night_vision matches 2 run effect @s clear



# night_vision on (global)
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_night_vision matches 1 run playsound random.potion.brewed @a[scores={timer_custom_music=0}]
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_night_vision matches 1 run playsound timeru.nightvision_1 @a[scores={timer_custom_music=1}]
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_night_vision matches 1 run tellraw @a {"rawtext":[{"text":"§l§1[§9Info§1]§r Fullbright is active, you have the night vision effect"}]}
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_night_vision matches 1 run title @s title §9Fullbright
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_night_vision matches 1 run title @s subtitle --this modification is §aactive§f --

# night_vision off (global)
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_night_vision matches 2 run playsound random.pop @a[scores={timer_custom_music=0}]
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_night_vision matches 2 run playsound timeru.message @a[scores={timer_custom_music=1}]
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_night_vision matches 2 run title @s title §9Fullbright
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_night_vision matches 2 run title @s subtitle --this modification is §coff§f --
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_night_vision matches 2 run tellraw @a {"rawtext":[{"text":"§l§1[§9Info§1]§r The Fullbright modification is deactivated."}]}
execute if score host_mode timer_menu matches 1 if entity @s[tag=trust_player_control] if score host timer_night_vision matches 2 run effect @a clear

# Error
execute if score host_mode timer_menu matches 1 if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if score host_mode timer_menu matches 1 if entity @s[tag=!trust_player_control] run playsound block.false_permissions @s[scores={timer_custom_music=0}]
execute if score host_mode timer_menu matches 1 if entity @s[tag=!trust_player_control] run playsound timeru.function_no_permissions @s[scores={timer_custom_music=1}]


execute unless score host_mode timer_menu matches 1 run scoreboard players set @s[scores={timer_night_vision=2..}] timer_night_vision 0
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 1 if score host timer_night_vision matches 2.. run scoreboard players set host timer_night_vision 0

