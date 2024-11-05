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
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 0 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§2[§aDifficulty§2]§r From now on the challenge no longer ends when a player dies!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 0 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§2[§aDifficulty§2]§r Von nun an endet die Challenge nicht mehr, wenn ein Spieler stirbt!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 0 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.difficulty.0"},{"text":" "},{"translate":"timeru.message.difficulty.0"}]}


### If difficulty is normal
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 1 run titleraw @s title {"rawtext":[{"text":"§fNormal"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 1 run titleraw @s subtitle {"rawtext":[{"text":"§oPlay without restrictions"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 1 run difficulty normal
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 1 unless score custom_music timer_settings matches 1 run playsound mob.zombie.unfect @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.difficulty_1 @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 1 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§7[§fDifficulty§7]§r From now on there will be no more restrictions"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 1 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§7[§fDifficulty§7]§r Ab sofort wird es keine Einschränkungen mehr geben"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 1 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.difficulty.1"},{"text":" "},{"translate":"timeru.message.difficulty.1"}]}


### If difficulty is hard
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 2 run titleraw @s title {"rawtext":[{"text":"§4Hardcore §cMode"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 2 run titleraw @s subtitle {"rawtext":[{"text":"§o§c§kThe §4Death§c is§4 the§c end"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 2 run difficulty hard
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound mob.evocation_illager.prepare_summon @a[tag=trust_player_control] ~~~ 1 0.8
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.difficulty_2 @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 2 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cDifficulty§4]§r §4Hardcore §cMode§l is active!§r §6If someone dies on the way to the goal,§b the world is lost!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 2 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cDifficulty§4]§r §4Hardcore §cModus§l ist aktiv!§r §6Wenn jemand stirbt,§b ist die Welt verloren!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 2 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.difficulty.2"},{"text":" "},{"translate":"timeru.message.difficulty.2"}]}



### If Ultra difficultymode is on
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 3 run titleraw @s title {"rawtext":[{"text":"§cUltra §4Hardcore"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 3 run titleraw @s subtitle {"rawtext":[{"text":"§o§c§kKeine §4Re§cge§4na§ction§4"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 3 run difficulty hard
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 3 run gamerule naturalregeneration false
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 3 unless score custom_music timer_settings matches 1 run playsound block.end_portal.spawn @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 3 if score custom_music timer_settings matches 1 run playsound timeru.difficulty_3 @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 3 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cDifficulty§4]§r §cUltra §4Hardcore§c§l is active!§r The §lnatural Regeneration§r is §l§7OFF§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 3 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cDifficulty§4]§r §cUltra §4Hardcore§c§l ist aktiv!§r Die §lnatürlich Regeneration§r ist §l§7Aus§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 3 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.difficulty.2"},{"text":" "},{"translate":"timeru.message.difficulty.3"}]}

### If infinity is on
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 4 run titleraw @s title {"rawtext":[{"text":"§7Infinity"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 4 run titleraw @s subtitle {"rawtext":[{"text":"§o§c§kkein §4Schaden"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 4 run difficulty hard
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 4 unless score custom_music timer_settings matches 1 run playsound respawn_anchor.ambient @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_title] if score difficulty timer_settings matches 4 if score custom_music timer_settings matches 1 run playsound timeru.difficulty_4 @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 4 if score lang timer_settings matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cDifficulty§4]§r §7Infinity§c§l is active!§r Play §lwithout damage§r to achieve your goal!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 4 if score lang timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cDifficulty§4]§r §7Infinity§c§l ist aktiv!§r Spiele §lohne schaden§r um dein Ziel zu erreichen!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches ..1 if score difficulty timer_settings matches 4 if score lang timer_settings matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.difficulty.2"},{"text":" "},{"translate":"timeru.message.difficulty.4"}]}



# Feedback if look is 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_message] if score difficulty timer_settings matches 0..1 unless score custom_music timer_settings matches 1 run playsound random.pop @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_message] if score difficulty timer_settings matches 0..1 if score custom_music timer_settings matches 1 run playsound timeru.message @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_message] if score difficulty timer_settings matches 2.. unless score custom_music timer_settings matches 1 as @a[tag=trust_player_control] at @s run playsound mob.evocation_illager.prepare_wololo @s ~~~ 2 1
execute if entity @s[tag=trust_player_control] if entity @s[tag=difficulty_message] if score difficulty timer_settings matches 2.. if score custom_music timer_settings matches 1 run playsound timeru.message.hardcore @a[tag=trust_player_control]

tag @a remove difficulty_title
tag @a remove difficulty_message

# Errors

# Incompatible challenges / Features
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 unless score difficulty timer_settings matches 1 if score lang timer_settings matches 0 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r Your difficulty isn't compatible with the Speed Run Mode, therefore Speed Run changed to off!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 unless score difficulty timer_settings matches 1 if score lang timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r Deine aktuelle Schwierigkeit ist nicht mit dem Speed Run Mode kompatible, weswegen dieser deaktivirt wurde"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 unless score difficulty timer_settings matches 1 if score lang timer_settings matches 2 run tellraw @s[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.error"},{"text":" "},{"translate":"timeru.message.incompatible.forese", "with":["Difficulty","Speed Run","off"]}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 unless score difficulty timer_settings matches 1 run scoreboard players set speed_run timer_settings 0

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score difficulty timer_settings matches 0 if score lang timer_settings matches 0 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r Your difficulty isn't compatible with your goal, therefore your goal changed to not defined!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score difficulty timer_settings matches 0 if score lang timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r Deine aktuelle Schwierigkeit ist nicht mit deinem Ziel kompatible, weswegen dieses zu not defined geändert wurde!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score difficulty timer_settings matches 0 if score lang timer_settings matches 2 run tellraw @s[tag=trust_player_control] {"rawtext":[{"translate":"timeru.header.error"},{"text":" "},{"translate":"timeru.message.incompatible.forese", "with":["Difficulty","Goal","not defined"]}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 7 if score difficulty timer_settings matches 0 run scoreboard players set goal timer_settings 0


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
