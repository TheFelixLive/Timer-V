# scoreboard control
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 run scoreboard players add night_vision timer_settings 1
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score night_vision timer_settings matches 2.. run scoreboard players set night_vision timer_settings 0



# night_vision on
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 1 run title @s title §9Fullbright
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 1 run title @s subtitle --this modification is §aactive§f --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 1 unless score custom_music timer_settings matches 1 run playsound random.potion.brewed @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.nightvision_0 @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 1 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§1[§9Info§1]§r All players get permanent night vision"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 1 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§1[§9Info§1]§r Alle Spieler bekommen über die ganze Challenge den Effekt Nachtsicht"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 1 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.error"},{"text":" "},{"translate":"timeru.message.night_vision.on"}]}

# night_vision off
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 0 run title @s title §9Fullbright
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 0 run title @s subtitle --this modification is §coff§f --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 0 unless score custom_music timer_settings matches 1 run playsound random.pop @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.message @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 0 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§1[§9Info§1]§r The Fullbright modification is deactivated."}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 0 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§1[§9Info§1]§r Die Modifikation Fullbright ist deaktiviert."}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 0 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.error"},{"text":" "},{"translate":"timeru.message.night_vision.off"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score night_vision timer_settings matches 0 run effect @a clear night_vision


# Errors

# Incompatible challenges / Features
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score speed_run timer_settings matches 1 if score lang timer_settings matches 0 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r AFK isn't compatible with the Speed Run Mode! Disable the Speed Run Mode to make changes."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score speed_run timer_settings matches 1 if score lang timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r AFK ist nicht mit dem Speed Run Mode kompatible! Deaktivieren sie den Speed Run Mode um Änderungen vorzunehmen."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score speed_run timer_settings matches 1 if score lang timer_settings matches 2 run tellraw @s[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.error"},{"text":" "},{"translate":"timeru.message.incompatible.not_possible", "with":["AFK","Speed Run"]}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score speed_run timer_settings matches 1 run title @a[tag=timer_menu_target] title §eAn Error occurred
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score speed_run timer_settings matches 1 run title @a[tag=timer_menu_target] subtitle -- Look in the chat --
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score speed_run timer_settings matches 1 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score speed_run timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content

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

