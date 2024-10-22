# scoreboard controle
execute if score host_mode timer_menu matches 0 run scoreboard players add @s timer_afk 1
execute if score host_mode timer_menu matches 0 if score @s timer_afk matches 2 run scoreboard players set @s timer_afk 0


# afk_disable on message when it is toggelbar
execute if score host_mode timer_menu matches 0 if score @s timer_afk matches 1 run playsound respawn_anchor.charge @s[scores={timer_custom_music=0}]
execute if score host_mode timer_menu matches 0 if score @s timer_afk matches 1 run playsound timeru.afk_1 @s[scores={timer_custom_music=1}]
execute if score host_mode timer_menu matches 0 if score @s timer_afk matches 1 run title @s title §bAFK §7§o[BETA]
execute if score host_mode timer_menu matches 0 if score @s timer_afk matches 1 run title @s subtitle -- is now §aactiv§f --
execute if score host_mode timer_menu matches 0 if score @s timer_afk matches 1 run tellraw @s {"rawtext":[{"text":"§l§3[§bAFK§3]§r The automatic AFK detector is activated, if someone goes AFK for more than 15 seconds, the timer will be paused."}]}

# afk_disable off message when it is toggelbar
execute if score host_mode timer_menu matches 0 if score @s timer_afk matches 0 run playsound respawn_anchor.deplete @s[scores={timer_custom_music=0}]
execute if score host_mode timer_menu matches 0 if score @s timer_afk matches 0 run playsound timeru.afk_0 @s[scores={timer_custom_music=1}]
execute if score host_mode timer_menu matches 0 if score @s timer_afk matches 0 run title @s title §bAFK §7§o[BETA]
execute if score host_mode timer_menu matches 0 if score @s timer_afk matches 0 run title @s subtitle -- is now §cdisabled§f --
execute if score host_mode timer_menu matches 0 if score @s timer_afk matches 0 run tellraw @s {"rawtext":[{"text":"§l§3[§bAFK§3]§r The automatic AFK detector is deactivated and the timer continues to run all the time."}]}




# Error
execute if score host_mode timer_menu matches 1.. if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if score host_mode timer_menu matches 1.. if entity @s[tag=!trust_player_control] run playsound block.false_permissions @s[scores={timer_custom_music=0}]
execute if score host_mode timer_menu matches 1.. if entity @s[tag=!trust_player_control] run playsound timeru.function_no_permissions @s[scores={timer_custom_music=1}]

execute if score host_mode timer_menu matches 1.. if entity @s[tag=trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r Switch to §fLocal Mode§r to use AFK"}]}
execute if score host_mode timer_menu matches 1.. if entity @s[tag=trust_player_control] run playsound block.false_permissions @s[scores={timer_custom_music=0}]
execute if score host_mode timer_menu matches 1.. if entity @s[tag=trust_player_control] run playsound timeru.function_no_permissions @s[scores={timer_custom_music=1}]

