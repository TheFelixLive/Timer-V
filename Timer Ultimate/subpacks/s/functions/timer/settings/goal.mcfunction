execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 run scoreboard players add goal timer_settings 1
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 6 run scoreboard players set goal timer_settings 7
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 unless score shoud_count_down timer_settings matches 1 run scoreboard players set goal timer_settings 8
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 9.. run scoreboard players set goal timer_settings 0

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 run tag @r add goal_title
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if entity @s[tag=timer_menu_target] run tag @s add goal_title
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 unless entity @s[tag=timer_menu_target] run tag @s add goal_message

# not_set
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §2The §l§gGoal§r§2 is not defined"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 0 run title @s title Not defined
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 0 unless score custom_music timer_settings matches 1 run playsound conduit.attack @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.goal_0 @a[tag=trust_player_control]

# Ender Dragon
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§gEnder Dragon§r§2 is selected"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 1 run title @s title §5Ender Dragon
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 1 unless score custom_music timer_settings matches 1 run playsound mob.enderdragon.growl @a[tag=trust_player_control] ~ ~ ~ 0.06 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.goal_1 @a[tag=trust_player_control]

# Wither
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§gWither§r§2 is selected"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 2 run title @s title §5Wither
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound mob.wither.shoot @a[tag=trust_player_control]  ~ ~ ~ 0.3 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.goal_2 @a[tag=trust_player_control]

# BOB
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 3 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§gElder Guardian§r§2 is selected"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 3 run title @s title §5Elder Guardian
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 3 unless score custom_music timer_settings matches 1 run playsound mob.elderguardian.curse @a[tag=trust_player_control]  ~ ~ ~ 0.5 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 3 if score custom_music timer_settings matches 1 run playsound timeru.goal_3 @a[tag=trust_player_control]

# Warden
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 4 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§gWarden§r§2 is selected"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 4 run title @s title §5Warden
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 4 unless score custom_music timer_settings matches 1 run playsound mob.warden.nearby_closer @a[tag=trust_player_control]  ~ ~ ~ 0.5 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 4 if score custom_music timer_settings matches 1 run playsound timeru.goal_4 @a[tag=trust_player_control]

# Raid
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 5 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §2A §l§4Raid§r §2is selected"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 5 run title @s title §4Raid
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 5 unless score custom_music timer_settings matches 1 run playsound raid.horn @a[tag=trust_player_control] ~ ~ ~ 0.3 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 5 if score custom_music timer_settings matches 1 run playsound timeru.goal_5 @a[tag=trust_player_control]

# Trail (scraped)
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 6 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§bTrial Chamber§r §2is selected"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 6 run title @s title §bTrial Chamber
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 6 unless score custom_music timer_settings matches 1 run playsound trial_spawner.charge_activate @a[tag=trust_player_control] ~ ~ ~ 0.5 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 6 if score custom_music timer_settings matches 1 run playsound timeru.goal_6 @a[tag=trust_player_control] 

# time_mode
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §2Survive§g§l "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 7 run title @s title §aStart-Zeit
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 7 unless score custom_music timer_settings matches 1 run playsound mob.horse.leather @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 7 if score custom_music timer_settings matches 1 run playsound timeru.goal_7 @a[tag=trust_player_control]

# random
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 8 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §bR§ga§an§6d§4o§fm §2is selected"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 8 run title @s title §bR§ga§an§6d§4o§fm
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 8 unless score custom_music timer_settings matches 1 run playsound mob.wanderingtrader.drink_milk @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 8 if score custom_music timer_settings matches 1 run playsound timeru.goal_8 @a[tag=trust_player_control]



execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 0 run title @s subtitle --Finish the challenge via the menu--
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 1..4 run title @s subtitle --Defeat this creature to complete the challenge--
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 5 run title @s subtitle --Complete this event to complete the challenge--
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 6 run title @s subtitle --Loot this structure to complete the challenge--
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 7 run title @s subtitle --Survive your time--
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 8 run title @s subtitle --Your goal will be randomly generated when you start--

# Resulte
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r You have no goal!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal is: Defeat the §5Ender Dragon§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal is: Defeat the §5Wither§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 3 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal is: Defeat the §5Elder Guardian§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 4 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal is: Defeat the §5Warden§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 5 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal is: Complete a §4Raid§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 6 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal is: Loot a §bTrial Chamber§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 7 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal is: Survive "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_message] if score goal timer_settings matches ..7 unless entity @a[tag=timer_run_goal] unless score custom_music timer_settings matches 1 run playsound random.pop @s
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_message] if score goal timer_settings matches ..7 unless entity @a[tag=timer_run_goal] if score custom_music timer_settings matches 1 run playsound timeru.message @s

tag @a remove goal_message
tag @a remove goal_title

# Error
execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r This action can only run in the main menu."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHelp§6]§r Run §g§l/function timer/control§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound note.function_no_content


execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score difficulty timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§2[§aDifficulty§2]§r Your difficulty cannot be used with the current target, it has been set to §fNormal§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score difficulty timer_settings matches 0 run scoreboard players set difficulty timer_settings 1

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 0 if score speed_run timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§u[§dSpeed Run§u]§r Your goal cannot be used with \"Speed Run\" it has been disabled"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 0 if score speed_run timer_settings matches 1 run scoreboard players set speed_run timer_settings 0