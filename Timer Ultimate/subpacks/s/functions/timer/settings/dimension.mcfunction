execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 run scoreboard players add dimension timer_settings 1
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score dimension timer_settings matches 2.. run scoreboard players set dimension timer_settings 0



### If dimension is overworld
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score dimension timer_settings matches 0 in overworld run tp @a ~ 70 ~
# execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score dimension timer_settings matches 0 if score custom_music timer_settings matches 0 run playsound mob.wanderingtrader.yes @s ~~~ 1 0.8 # If someone want to add sound? Remove the Comment!
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score dimension timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.dimension_0 @s
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score dimension timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§2[§aDimension§2]§r Spiele in der Overworld!"}]}



### If dimension is nether
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score dimension timer_settings matches 1 in nether run tp @a ~ 70 ~
# execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score dimension timer_settings matches 1 if score custom_music timer_settings matches 0 run playsound mob.zombie.unfect @s
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score dimension timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.dimension_1 @s
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score dimension timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§4[§cDimension§4]§r Besiege dein Ziel im Nether"}]}



### If dimension is the_end; unused
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score dimension timer_settings matches 2 in the_end run tp @a 1000 70 1000
# execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score dimension timer_settings matches 2 if score custom_music timer_settings matches 0 run playsound mob.evocation_illager.prepare_summon @s ~~~ 1 0.8
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score dimension timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.dimension_2 @s
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score dimension timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§5[§dDimension§5]§r Bende Minecraft im End!"}]}



# So that players don't suffocate or fall a high amount of blocks in the new dimension
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 unless block ~ ~1 ~ air run setblock ~ ~1 ~ air
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score dimension timer_settings matches 0 if block ~ ~-1 ~ air run setblock ~ ~-1 ~ stone
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score dimension timer_settings matches 1 if block ~ ~-1 ~ air run setblock ~ ~-1 ~ netherrack
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score dimension timer_settings matches 2 if block ~ ~-1 ~ air run setblock ~ ~-1 ~ end_stone

# Feedback if mode is 1
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score custom_music timer_settings matches 0 run playsound random.pop @s
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.message @s



# Error
execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 0 run playsound block.false_permissions
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r This action can only run in the main menu."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§6[§eHelp§6]§r Run §g§l/function timer/control§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score custom_music timer_settings matches 0 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound note.function_no_content

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 unless score dimension timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§u[§dSpeed Run§u]§r Your Dimension cannot be used with \"Speed Run\", which is why it was disabled"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 unless score dimension timer_settings matches 1 run scoreboard players set speed_run timer_settings 0
