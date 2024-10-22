### Error
execute unless entity @s[tag=timer_menu_target] if entity @s[tag=trust_player_control] if entity @a[tag=timer_menu_target, tag=!trust_player_control] run tag @s add close_menu
execute unless entity @s[tag=timer_menu_target] if entity @s[tag=trust_player_control] if entity @a[tag=timer_menu_target, tag=trust_player_control] run tag @s add error_message
execute unless entity @s[tag=timer_menu_target] unless entity @s[tag=trust_player_control] run tag @s add error_message

execute if score is_open timer_menu matches 1 if entity @s[tag=error_message] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r The menu is currently being used by §l"},{"selector": "@a[tag=timer_menu_target]"},{"text":"§r. Please wait until they close it!"}]}
execute if score is_open timer_menu matches 1 if entity @s[tag=error_message] run playsound block.false_permissions @s[scores={timer_custom_music=0}]
execute if score is_open timer_menu matches 1 if entity @s[tag=error_message] run playsound timeru.function_not_available @s[scores={timer_custom_music=0}]

execute if score is_open timer_menu matches 1 if entity @s[tag=close_menu] run tellraw @s {"rawtext":[{"text":"§l§6[§eMenu§6]§r The menu is currently being used by §l"},{"selector": "@a[tag=timer_menu_target]"},{"text":"§r. It will close soon. Please wait..."}]}
execute if score is_open timer_menu matches 1 if entity @s[tag=close_menu] run playsound random.pop @s[scores={timer_custom_music=0}]
execute if score is_open timer_menu matches 1 if entity @s[tag=close_menu] run playsound timeru.message @s[scores={timer_custom_music=0}]
execute if score is_open timer_menu matches 1 if entity @s[tag=close_menu] run kill @e[type=npc, name=timer_menu]

execute if entity @s[tag=timer_menu_target] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r The menu did not exit correctly"}]}
execute if entity @s[tag=timer_menu_target] run stopsound @s
execute if entity @s[tag=timer_menu_target] run playsound block.false_permissions @s[scores={timer_custom_music=0}]
execute if entity @s[tag=timer_menu_target] run playsound timeru.function_not_available @s[scores={timer_custom_music=0}]
execute if entity @s[tag=timer_menu_target] run scoreboard players set sound timer_menu 1
execute if entity @s[tag=timer_menu_target] run scoreboard players set id timer_menu 1

tag @s remove error_message


### Startup menu when player has prepermission (Main-Host-Menu)
execute if score is_open timer_menu matches 0 run tag @s add timer_menu_target
execute if score is_open timer_menu matches 0 run summon npc ~~-20~~~ attacked timer_menu
execute if score is_open timer_menu matches 0 run gamemode spectator
execute if score is_open timer_menu matches 0 if score host_mode timer_menu matches 0 if score @s timer_night_vision matches 1 run effect @s clear
execute if score is_open timer_menu matches 0 if score host_mode timer_menu matches 0 if score @s timer_do_count matches 0 run tag @s add mode_0
execute if score is_open timer_menu matches 0 if score host_mode timer_menu matches 0 if score @s timer_do_count matches 1 run tag @s add mode_1
execute if score is_open timer_menu matches 0 if score host_mode timer_menu matches 0 if score @s timer_do_count matches 2 run tag @s add mode_2
execute if score is_open timer_menu matches 0 if score host_mode timer_menu matches 0 run scoreboard players set @s timer_do_count 0
execute if score is_open timer_menu matches 0 run inputpermission set @s movement disabled

# Forward menu to main
execute unless entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 if score is_open timer_menu matches 0 run scoreboard players set id timer_menu 2
execute unless entity @s[tag=trust_player_control] if score host_mode timer_menu matches 1.. if score is_open timer_menu matches 0 run scoreboard players set id timer_menu 3
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 if score is_open timer_menu matches 0 run scoreboard players set id timer_menu 4
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 1 if score is_open timer_menu matches 0 run scoreboard players set id timer_menu 5
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 2 if score is_open timer_menu matches 0 run scoreboard players set id timer_menu 6