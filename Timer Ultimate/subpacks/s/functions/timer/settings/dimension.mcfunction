execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 run scoreboard players add dimension timer_settings 1
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score dimension timer_settings matches 2.. run scoreboard players set dimension timer_settings 0



### If dimension is overworld
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score dimension timer_settings matches 0 in overworld run tp @a ~ 70 ~
# execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score dimension timer_settings matches 0 if score custom_music timer_settings matches 0 run playsound mob.wanderingtrader.yes @s ~~~ 1 0.8 # If someone want to add sound? Remove the Comment!
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score dimension timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.dimension_0 @s
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score dimension timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§2[§aDimension§2]§r Play in the overworld!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score dimension timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§2[§aDimension§2]§r Spiele in der Overworld!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score dimension timer_settings matches 0 run tellraw @s {"rawtext":[{"translate":"timeru.header.dimension.0"},{"text":" "},{"translate":"timeru.message.dimension.0"}]}



### If dimension is nether
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score dimension timer_settings matches 1 in nether run tp @a ~ 70 ~
# execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score dimension timer_settings matches 1 if score custom_music timer_settings matches 0 run playsound mob.zombie.unfect @s
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score dimension timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.dimension_1 @s
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score dimension timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§4[§cDimension§4]§r Defeat your goal in the nether!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score dimension timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§4[§cDimension§4]§r Besiege dein Ziel im Nether"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score dimension timer_settings matches 1 run tellraw @s {"rawtext":[{"translate":"timeru.header.dimension.1"},{"text":" "},{"translate":"timeru.message.dimension.1"}]}



### If dimension is the_end; unused
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score dimension timer_settings matches 2 in the_end run tp @a 1000 70 1000
# execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score dimension timer_settings matches 2 if score custom_music timer_settings matches 0 run playsound mob.evocation_illager.prepare_summon @s ~~~ 1 0.8
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score dimension timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.dimension_2 @s
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score dimension timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§5[§dDimension§5]§r End Minecraft in the end!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score dimension timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§5[§dDimension§5]§r Bende Minecraft im End!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score dimension timer_settings matches 2 run tellraw @s {"rawtext":[{"translate":"timeru.header.dimension.2"},{"text":" "},{"translate":"timeru.message.dimension.2"}]}



# So that players don't suffocate or fall a high amount of blocks in the new dimension
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 run fill ~ ~1 ~ ~ ~ ~ air
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score dimension timer_settings matches 0 run setblock ~ ~-1 ~ stone
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score dimension timer_settings matches 1 run setblock ~ ~-1 ~ netherrack
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score dimension timer_settings matches 2 run setblock ~ ~-1 ~ end_stone

# Feedback if mode is 1
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score custom_music timer_settings matches 0 run playsound random.pop @s
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.message @s



# Errors

# Incompatible challenges / Features
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 if score lang timer_settings matches 0 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r Dimension isn't compatible with the Speed Run Mode! Disable the Speed Run Mode to make changes."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 if score lang timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r Dimension ist nicht mit dem Speed Run Mode kompatible! Deaktivieren sie den Speed Run Mode um Änderungen vorzunehmen."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 if score lang timer_settings matches 2 run tellraw @s[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.error"},{"text":" "},{"translate":"timeru.message.incompatible.not_possible", "with":["Dimension","Speed Run"]}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score only timer_addon matches 1 if score lang timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r Dimension isn't compatible with the Only, therefore Only changed to off!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score only timer_addon matches 1 if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r Dimension ist nicht mit der Only Challenge kompatible, weswegen sie deaktiviert wurde!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score only timer_addon matches 1 if score lang timer_settings matches 2 run tellraw @s {"rawtext":[{"translate":"timeru.header.error"},{"text":" "},{"translate":"timeru.message.incompatible.forese", "with":["Dimension","Only","off"]}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score only timer_addon matches 1 run scoreboard players set only timer_addon 0

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

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 if score lang timer_settings matches 0 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHelp§6]§r Run §g§l/function timer/control§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 if score lang timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHilfe§6]§r Führe §g§l/function timer/control§r aus"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 if score lang timer_settings matches 2 run tellraw @s[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.help"},{"text":" "},{"translate":"timeru.message.help.run", "with":["/function timer/control"]}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content