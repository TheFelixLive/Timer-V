# Prepering
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 0 run tellraw @s {"rawtext":[{"text":"§l§2[§aInfo§2]§r Dies ist die Übersicht von jedem Spieler der grade §aOnline§r ist:"}]}
execute if entity @s[tag=trust_player_control] unless entity @a[tag=test_person] if score host_mode timer_menu matches 0 run tag @a add test_person


# if the players is not the host
execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] run playsound block.false_permissions @s[scores={timer_custom_music=0}]
execute if entity @s[tag=!trust_player_control] run playsound timeru.function_no_permissions @s[scores={timer_custom_music=1}]

# Result (Global)
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 1.. run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r Switch to §lLocal Mode§r to run testfor"}]}
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 1.. run playsound block.false_permissions @s[scores={timer_custom_music=0}]
execute if entity @s[tag=trust_player_control] if score host_mode timer_menu matches 1.. run playsound timeru.function_no_permissions @s[scores={timer_custom_music=1}]


# Loop with main.mcfuntion
execute as @r[tag=test_person] run tag @a add target_person
execute as @a[tag=target_person] run playsound random.pop @a[tag=trust_player_control, scores={timer_custom_music=0}]
execute as @a[tag=target_person] run playsound timeru.message.list @a[tag=trust_player_control, scores={timer_custom_music=1}]
execute as @a[tag=target_person] run scoreboard players add count_for_testfor timer_menu 1
execute as @a[tag=target_person] run scoreboard players add time_for_testfor timer_menu 5
execute as @a[tag=target_person] run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"- §lName: "},{"selector": "@s"},{"text":", §aTime: "},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s "},{"score":{"name":"@s","objective":"timer_time_ms"}},{"text":"ms, §r§l §bState: "},{"score":{"name":"@s","objective":"timer_do_count"}},{"text":", §9Fullbright: "},{"score":{"name":"@s","objective":"timer_night_vision"}},{"text":", §e§lMusic: "},{"score":{"name":"@s","objective":"timer_custom_music"}}]}

execute unless entity @a[tag=target_person, tag=!test_person] if score count_for_testfor timer_menu matches 2.. run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"(A total of "},{"score":{"name":"count_for_testfor","objective":"timer_menu"}},{"text":" players §aonline§r is calculated in "},{"score":{"name":"time_for_testfor","objective":"timer_menu"}},{"text":"ms)"}]}
execute unless entity @a[tag=target_person, tag=!test_person] if score count_for_testfor timer_menu matches 2.. run playsound random.levelup @a[tag=trust_player_control, scores={timer_custom_music=0}]
execute unless entity @a[tag=target_person, tag=!test_person] if score count_for_testfor timer_menu matches 2.. run playsound timeru.message.list.end @a[tag=trust_player_control, scores={timer_custom_music=1}]
execute unless entity @a[tag=target_person, tag=!test_person] run scoreboard players reset time_for_testfor
execute unless entity @a[tag=target_person, tag=!test_person] run scoreboard players reset count_for_testfor

execute as @a[tag=target_person] run tag @s remove test_person
execute as @a[tag=target_person] run tag @s remove target_person
