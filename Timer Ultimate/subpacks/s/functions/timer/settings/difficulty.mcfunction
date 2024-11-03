execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 run scoreboard players add difficulty timer_settings 1
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 run gamerule naturalregeneration true
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score difficulty timer_settings matches 5.. run scoreboard players set difficulty timer_settings 0

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 run tag @s add difficulty_title
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if entity @s[tag=timer_menu_target] run tag @s add difficulty_title
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 unless entity @s[tag=timer_menu_target] run tag @s add difficulty_message


### If difficulty is Easy
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 0 run titleraw @s title {"rawtext":[{"text":"§2Easy §aMode"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 0 run titleraw @s subtitle {"rawtext":[{"text":"§l§aJust §2play!"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 0 run difficulty easy
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 0 unless score custom_music timer_settings matches 1 run playsound mob.wanderingtrader.yes @a[tag=trust_player_control] ~~~ 1 0.8
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.difficulty_0 @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§2[§aDifficulty§2]§r From now on the challenge no longer ends when a player dies!"}]}


### If difficulty is normal
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 1 run titleraw @s title {"rawtext":[{"text":"§fNormal"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 1 run titleraw @s subtitle {"rawtext":[{"text":"§oPlay without restrictions"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 1 run difficulty normal
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 1 unless score custom_music timer_settings matches 1 run playsound mob.zombie.unfect @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.difficulty_1 @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§7[§fDifficulty§7]§r From now on there will be no more restrictions"}]}


### If difficulty is hard
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 2 run titleraw @s title {"rawtext":[{"text":"§4Hardcore §cMode"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 2 run titleraw @s subtitle {"rawtext":[{"text":"§o§c§kThe §4Death§c is§4 the§c end"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 2 run difficulty hard
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound mob.evocation_illager.prepare_summon @a[tag=trust_player_control] ~~~ 1 0.8
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.difficulty_2 @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cDifficulty§4]§r §4Hardcore §cMode§l is active!§r §6If someone dies on the way to the goal.§b The world is lost!"}]}


### If Ultra difficultymode is on
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 3 run titleraw @s title {"rawtext":[{"text":"§cUltra §4Hardcore"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 3 run titleraw @s subtitle {"rawtext":[{"text":"§o§c§kKeine §4Re§cge§4na§ction§4"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 3 run difficulty hard
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 3 run gamerule naturalregeneration false
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 3 unless score custom_music timer_settings matches 1 run playsound block.end_portal.spawn @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 3 if score custom_music timer_settings matches 1 run playsound timeru.difficulty_3 @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 3 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cDifficulty§4]§r §cUltra §4Hardcore§c§l is active!§r The §lNatural Regeneration§r is §l§7OFF§r"}]}

### If infinity is on
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 4 run titleraw @s title {"rawtext":[{"text":"§7Infinity"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 4 run titleraw @s subtitle {"rawtext":[{"text":"§o§c§kkein §4Schaden"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 4 run difficulty hard
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 4 unless score custom_music timer_settings matches 1 run playsound respawn_anchor.ambient @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 4 if score custom_music timer_settings matches 1 run playsound timeru.difficulty_4 @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 4 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cDifficulty§4]§r §7Infinity§c§l is active!§r Play §lwithout damage§r to achieve your goal!"}]}


# Feedback if look is 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_message] if score difficulty timer_settings matches 0..1 unless score custom_music timer_settings matches 1 run playsound random.pop @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_message] if score difficulty timer_settings matches 0..1 if score custom_music timer_settings matches 1 run playsound timeru.message @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_message] if score difficulty timer_settings matches 2.. unless score custom_music timer_settings matches 1 as @a[tag=trust_player_control] at @s run playsound mob.evocation_illager.prepare_wololo @s ~~~ 2 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_message] if score difficulty timer_settings matches 2.. if score custom_music timer_settings matches 1 run playsound timeru.message.hardcore @a[tag=trust_player_control]

tag @a remove difficulty_title
tag @a remove difficulty_message

# Error
execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r This action can only run in the main menu."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHelp§6]§r Run §g§l/function timer/control§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound note.function_no_content

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score difficulty timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal cannot be used with the current difficulty, it has been set to not defined"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score difficulty timer_settings matches 0 run scoreboard players set goal timer_settings 0

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 unless score difficulty timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§u[§dSpeed Run§u]§r Your Difficulty cannot be used with \"Speed ​​Run\", which is why it was disabled"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 unless score difficulty timer_settings matches 1 run scoreboard players set speed_run timer_settings 0