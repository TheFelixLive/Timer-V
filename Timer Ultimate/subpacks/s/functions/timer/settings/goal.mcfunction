execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 run scoreboard players add goal timer_settings 1
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 6 run scoreboard players set goal timer_settings 7
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 unless score shoud_count_down timer_settings matches 1 run scoreboard players set goal timer_settings 8
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 9.. run scoreboard players set goal timer_settings 0

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 run tag @r add goal_title
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if entity @s[tag=timer_menu_target] run tag @s add goal_title
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 unless entity @s[tag=timer_menu_target] run tag @s add goal_message

# not_set
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 0 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §2The §l§gGoal§r§2 is not defined"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 0 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §2Das §l§gZiel§r§2 ist undefiniert"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 0 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.selected.not_set"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 0 run title @s title Not defined
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 0 unless score custom_music timer_settings matches 1 run playsound conduit.attack @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.goal_0 @a[tag=trust_player_control]

# Ender Dragon
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 1 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§gEnder Dragon§r§2 is selected"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 1 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§gEnder Dragon§r§2 wurde ausgewählt"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 1 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.selected.creature", "with":["Ender Dragon"]}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 1 run title @s title §5Ender Dragon
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 1 unless score custom_music timer_settings matches 1 run playsound mob.enderdragon.growl @a[tag=trust_player_control] ~ ~ ~ 0.06 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.goal_1 @a[tag=trust_player_control]

# Wither
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 2 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§gWither§r§2 is selected"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 2 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§gWither§r§2 wurde ausgewählt"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 2 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.selected.creature", "with":["Wither"]}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 2 run title @s title §5Wither
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound mob.wither.shoot @a[tag=trust_player_control]  ~ ~ ~ 0.3 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.goal_2 @a[tag=trust_player_control]

# BOB
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 3 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§gElder Guardian§r§2 is selected"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 3 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§gElder Guardian§r§2 wurde ausgewählt"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 3 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.selected.creature", "with":["Elder Guardian"]}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 3 run title @s title §5Elder Guardian
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 3 unless score custom_music timer_settings matches 1 run playsound mob.elderguardian.curse @a[tag=trust_player_control]  ~ ~ ~ 0.5 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 3 if score custom_music timer_settings matches 1 run playsound timeru.goal_3 @a[tag=trust_player_control]

# Warden
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 4 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§gWarden§r§2 is selected"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 4 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§gWarden§r§2 wurde ausgewählt"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 4 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.selected.creature", "with":["Warden"]}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 4 run title @s title §5Warden
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 4 unless score custom_music timer_settings matches 1 run playsound mob.warden.nearby_closer @a[tag=trust_player_control]  ~ ~ ~ 0.5 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 4 if score custom_music timer_settings matches 1 run playsound timeru.goal_4 @a[tag=trust_player_control]

# Raid
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 5 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §2A §l§4Raid§r §2is selected"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 5 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §2Ein §l§4Raid§r §2wurde ausgewählt"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 5 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.selected.event", "with":["Raid"]}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 5 run title @s title §4Raid
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 5 unless score custom_music timer_settings matches 1 run playsound raid.horn @a[tag=trust_player_control] ~ ~ ~ 0.3 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 5 if score custom_music timer_settings matches 1 run playsound timeru.goal_5 @a[tag=trust_player_control]

# Trail (scraped)
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 6 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§bTrial Chamber§r §2is selected"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 6 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §l§bTrial Chamber§r §2wurde ausgewählt"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 6 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.selected.structure", "with":["Trial Chamber"]}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 6 run title @s title §bTrial Chamber
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 6 unless score custom_music timer_settings matches 1 run playsound trial_spawner.charge_activate @a[tag=trust_player_control] ~ ~ ~ 0.5 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 6 if score custom_music timer_settings matches 1 run playsound timeru.goal_6 @a[tag=trust_player_control] 



# time_mode
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §2Survive§g§l "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §2Überlebe§g§l "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.selected.time", "with":{"rawtext":[{"score":{"name":"h","objective":"timer_time"}},{"score":{"name":"min","objective":"timer_time"}},{"score":{"name":"sec","objective":"timer_time"}}]}}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 7 run title @s title §aStart-Time
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 7 unless score custom_music timer_settings matches 1 run playsound mob.horse.leather @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 7 if score custom_music timer_settings matches 1 run playsound timeru.goal_7 @a[tag=trust_player_control]

# random
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 8 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §bR§ga§an§6d§4o§fm §2is selected"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 8 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§5[§dGoal§5]§r §bR§ga§an§6d§4o§fm §2ist ausgewählt"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 8 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.selected.event", "with":["§bR§ga§an§6d§4o§fm"]}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 8 run title @s title §bR§ga§an§6d§4o§fm
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 8 unless score custom_music timer_settings matches 1 run playsound mob.wanderingtrader.drink_milk @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 8 if score custom_music timer_settings matches 1 run playsound timeru.goal_8 @a[tag=trust_player_control]



execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 0 run title @s subtitle --Finish the challenge via the menu--
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 1..4 run title @s subtitle --Defeat this creature to complete the challenge--
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 5 run title @s subtitle --Complete this event to complete the challenge--
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 6 run title @s subtitle --Loot this structure to complete the challenge--
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 7 run title @s subtitle --Survive your time--
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_title] if score goal timer_settings matches 8 run title @s subtitle --Your goal will be randomly generated at start--

# Resulte
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 0 if score lang timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r You have no goal!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 0 if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Du hast kein Ziel!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 0 if score lang timer_settings matches 2 run tellraw @s {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.remember.not_set"}]}

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 1 if score lang timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal is: Defeat the §5Ender Dragon§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 1 if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Dein Ziel lautet: Defeat the §5Ender Dragon§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 1 if score lang timer_settings matches 2 run tellraw @s {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.remember.general", "with":[{"rawtext":[{"translate":"timeru.message.goal.remember.creature", "with":["Ender Dragon"]}]}]}]}

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 2 if score lang timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal is: Defeat the §5Wither§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 2 if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Dein Ziel lautet: Defeat the §5Wither§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 2 if score lang timer_settings matches 2 run tellraw @s {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.remember.general", "with":[{"rawtext":[{"translate":"timeru.message.goal.remember.creature", "with":["Wither"]}]}]}]}

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 3 if score lang timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal is: Defeat the §5Elder Guardian§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 3 if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Dein Ziel lautet: Defeat the §5Elder Guardian§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 3 if score lang timer_settings matches 2 run tellraw @s {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.remember.general", "with":[{"rawtext":[{"translate":"timeru.message.goal.remember.creature", "with":["Elder Guardian"]}]}]}]}

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 4 if score lang timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal is: Defeat the §5Warden§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 4 if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Dein Ziel lautet: Defeat the §5Warden§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 4 if score lang timer_settings matches 2 run tellraw @s {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.remember.general", "with":[{"rawtext":[{"translate":"timeru.message.goal.remember.creature", "with":["Warden"]}]}]}]}

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 5 if score lang timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal is: Complete a §4Raid§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 5 if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Dein Ziel lautet: Complete a §4Raid§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 5 if score lang timer_settings matches 2 run tellraw @s {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.remember.general", "with":[{"rawtext":[{"translate":"timeru.message.goal.remember.event", "with":["Raid"]}]}]}]}

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 6 if score lang timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal is: Loot a §bTrial Chamber§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 6 if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Dein Ziel lautet: Loot a §bTrial Chamber§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 6 if score lang timer_settings matches 2 run tellraw @s {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.remember.general", "with":[{"rawtext":[{"translate":"timeru.message.goal.remember.structure", "with":["Trial Chamber"]}]}]}]}

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 7 if score lang timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Your goal is: Survive "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 7 if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§5[§dGoal§5]§r Dein Ziel lautet: Survive "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score goal timer_settings matches 7 if score lang timer_settings matches 2 run tellraw @s {"rawtext":[{"translate":"timeru.header.goal"},{"text":" "},{"translate":"timeru.message.goal.remember.general", "with":[{"rawtext":[{"translate":"timeru.message.goal.remember.time", "with":["rawtext":[{"score":{"name":"h","objective":"timer_time"}},{"score":{"name":"min","objective":"timer_time"}},{"score":{"name":"sec","objective":"timer_time"}}]]}]}]}]}

execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_message] if score goal timer_settings matches ..7 unless entity @a[tag=timer_run_goal] unless score custom_music timer_settings matches 1 run playsound random.pop @s
execute if entity @s[tag=trust_player_control] if entity @s[tag=goal_message] if score goal timer_settings matches ..7 unless entity @a[tag=timer_run_goal] if score custom_music timer_settings matches 1 run playsound timeru.message @s

tag @a remove goal_message
tag @a remove goal_title

# Errors

# Incompatible challenges / Features
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 if score goal timer_settings matches 0 if score lang timer_settings matches 0 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r Your goal isn't compatible with the Speed Run Mode, therefore Speed Run changed to off!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 if score goal timer_settings matches 0 if score lang timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r Dein Ziel ist nicht mit dem Speed Run Mode kompatible, weswegen dieser deaktivirt wurde"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 if score goal timer_settings matches 0 if score lang timer_settings matches 2 run tellraw @s[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.error"},{"text":" "},{"translate":"timeru.message.incompatible.forese", "with":["Goal","Speed Run","off"]}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 if score goal timer_settings matches 0 run scoreboard players set speed_run timer_settings 0

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score difficulty timer_settings matches 0 if score lang timer_settings matches 0 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r Your goal isn't compatible with your difficulty, therefore your difficulty changed to §fNormal§r!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score difficulty timer_settings matches 0 if score lang timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r Dein Ziel ist nicht mit deiner Schwierigkeit kompatible, weswegen dieses zu §fNormal§r geändert wurde!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score difficulty timer_settings matches 0 if score lang timer_settings matches 2 run tellraw @s[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.error"},{"text":" "},{"translate":"timeru.message.incompatible.forese", "with":["Goal","Difficulty","§fNormal§r"]}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score difficulty timer_settings matches 0 run scoreboard players set difficulty timer_settings 1


# permissions
execute if entity @s[tag=!trust_player_control] if score lang timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r Sie verfügen nicht über die erforderlichen Berechtigungen für diese Aktion. Aktuelle Spieler, die Ihnen diese Erlaubnis erteilen könnten: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"translate":"timeru.header.error"},{"text":" "},{"translate":"timeru.message.permission.no", "with":[{"rawtext":[{"selector":"@a[tag=trust_player_control]"}]}]}]}
execute if entity @s[tag=!trust_player_control] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s

# reset state
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score lang timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r This action can only run in the main menu."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r Diese Aktion kann nur im Hauptmenü ausgeführt werden."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"translate":"timeru.header.error"},{"text":" "},{"translate":"timeru.message.reset_state.error"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 run title @a[tag=timer_menu_target] title §eAn Error occurred
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 run title @a[tag=timer_menu_target] subtitle -- Look in the chat --

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 if score lang timer_settings matches 0 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHelp§6]§r Run §g§l/function timer/control§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 if score lang timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHilfe§6]§r Führe §g§l/function timer/control§r aus"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 if score lang timer_settings matches 2 run tellraw @s[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.help"},{"text":" "},{"translate":"timeru.message.help.run", "with":["/function timer/control"]}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content