# If its execute from a player and the reason isn't death
execute unless score reset_type timer_settings matches 1 if entity @s[tag=!trust_player_control, tag=!target_player_end] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute unless score reset_type timer_settings matches 1 if entity @s[tag=!trust_player_control, tag=!target_player_end] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute unless score reset_type timer_settings matches 1 if entity @s[tag=!trust_player_control, tag=!target_player_end] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s


execute unless score reset_type timer_settings matches 1 if entity @s[tag=trust_player_control, tag=!target_player_end] run tellraw @s {"rawtext":[{"text":"§l§4[§cError§4]§r This function is not available"}]}
execute unless score reset_type timer_settings matches 1 if entity @s[tag=trust_player_control, tag=!target_player_end] unless score custom_music timer_settings matches 1 run playsound random.enderchestopen @s ~~~ 1 0.5
execute unless score reset_type timer_settings matches 1 if entity @s[tag=trust_player_control, tag=!target_player_end] if score custom_music timer_settings matches 1 run playsound timeru.function_system @s

### Win
execute if score reset_type timer_settings matches 2 if score reset_message_show timer_settings matches 0 run title @a title §aChallenge absolviert
execute if score reset_type timer_settings matches 2 if score speed_run timer_settings matches 0 if score reset_message_show timer_settings matches 0 run tellraw @a {"rawtext":[{"text":"§l§2[§aEnd§2]§r You have §acompleted§r the challenge and the timer has §astopped.§r Your time: "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}
execute if score reset_type timer_settings matches 2 if score speed_run timer_settings matches 1 if score reset_message_show timer_settings matches 0 run tellraw @a {"rawtext":[{"text":"§l§2[§aEnd§2]§r You have §acompleted§r the challenge and the timer has §astopped.§r Past time: "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s "},{"score":{"name":"ms","objective":"timer_time"}},{"text":"ms"}]}
execute if score reset_type timer_settings matches 2 if score reset_message_show timer_settings matches 0 unless score custom_music timer_settings matches 1 run playsound random.toast @a
execute if score reset_type timer_settings matches 2 if score reset_message_show timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.win @a

### Lose normal
execute if score reset_type timer_settings matches 0..1 if score reset_message_show timer_settings matches 0 run title @a title §4Challenge wurde beendet
execute if score reset_type timer_settings matches 0 if score difficulty timer_settings matches 0..1 if score speed_run timer_settings matches 0 if score reset_message_show timer_settings matches 0 run tellraw @a {"rawtext":[{"text":"§l§4[§cEnd§4]§r The player §l"},{"selector": "@a[tag=target_player_end]"},{"text":"§r §4died §rand the challenge§4 ended.§r Your time: "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}
execute if score reset_type timer_settings matches 0 if score difficulty timer_settings matches 0..1 if score speed_run timer_settings matches 1 if score reset_message_show timer_settings matches 0 run tellraw @a {"rawtext":[{"text":"§l§4[§cEnd§4]§r The player §l"},{"selector": "@a[tag=target_player_end]"},{"text":"§r §4died §rand the challenge§4 ended.§r Lost time: "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s "},{"score":{"name":"ms","objective":"timer_time"}},{"text":"ms"}]}
execute if score reset_type timer_settings matches 0 if score difficulty timer_settings matches 0..1 if score reset_message_show timer_settings matches 0 as @a[tag=target_player_end] unless score custom_music timer_settings matches 1 run playsound item.trident.thunder @s ~ ~ ~ 0.5 1
execute if score reset_type timer_settings matches 0 if score difficulty timer_settings matches 0..1 if score reset_message_show timer_settings matches 0 as @a[tag=target_player_end] if score custom_music timer_settings matches 1 run playsound timeru.type_death.target @s

execute if score reset_type timer_settings matches 0 if score difficulty timer_settings matches 0..1 if score reset_message_show timer_settings matches 0 unless score custom_music timer_settings matches 1 run playsound game.player.die @a[tag=!target_player_end]
execute if score reset_type timer_settings matches 0 if score difficulty timer_settings matches 0..1 if score reset_message_show timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.type_death.other @a[tag=!target_player_end]


### Lose with Hardcore (death)
execute if score reset_type timer_settings matches 0 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 0 run tellraw @a {"rawtext":[{"text":"§l§4[§cEnd§4]§r The player §l"},{"selector": "@a[tag=target_player_end]"},{"text":"§r §4died §rand the challenge§l ended§r. The world is lost because of the §4Hardcore Mode§r! §rYour time: "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}
execute if score reset_type timer_settings matches 0 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 0 unless score custom_music timer_settings matches 1 as @a[tag=target_player_end] run playsound mob.endermen.stare @s ~ ~ ~ 5 2
execute if score reset_type timer_settings matches 0 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 0 if score custom_music timer_settings matches 1 as @a[tag=target_player_end] run playsound timeru.type_death.target.hardcore @s

execute if score reset_type timer_settings matches 0 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 0 unless score custom_music timer_settings matches 1 run playsound random.totem @a[tag=!target_player_end] ~ ~ ~ 1 0.5
execute if score reset_type timer_settings matches 0 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.type_death.other.hardcore @a[tag=!target_player_end]

# music for Hardcore
execute if score reset_type timer_settings matches 0..1 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 0 unless score custom_music timer_settings matches 1 run playsound music.game.water @a ~ ~ ~ 0.3 1
execute if score reset_type timer_settings matches 0..1 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.music.type_death.hardcore @a[tag=target_player_end]
execute if score reset_type timer_settings matches 0..1 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.music.type_other.hardcore @a[tag=!target_player_end]





# If is ends via. an external source, as an example the time matches 0 (with timemode and without the goal) or 9000 | with difficulty
execute if score reset_type timer_settings matches 1 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 0 unless entity @a[tag=target_player_end] run tellraw @a {"rawtext":[{"text":"§l§4[§cEnd§4]§r The challenge §4ended§r by §lan external source§r. The world is lost because of the §4Hardcore Mode§r!§r Your time: "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}
execute if score reset_type timer_settings matches 1 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 0 if entity @a[tag=target_player_end] run tellraw @a {"rawtext":[{"text":"§l§4[§cEnd§4]§r The challenge §4finished§r by §l"},{"selector": "@a[tag=target_player_end]"},{"text":"§r. The world is lost because of the §4Hardcore Mode§r! Your time: "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}

# the same (external source) without difficulty
execute if score reset_type timer_settings matches 1 if score difficulty timer_settings matches 0..1 if score reset_message_show timer_settings matches 0 unless entity @a[tag=target_player_end] run tellraw @a {"rawtext":[{"text":"§l§4[§cEnd§4]§r The challenge §4ended§r by §lan external source§r. Your time: "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}
execute if score reset_type timer_settings matches 1 if score difficulty timer_settings matches 0..1 if score reset_message_show timer_settings matches 0 if entity @a[tag=target_player_end] run tellraw @a {"rawtext":[{"text":"§l§4[§cEnd§4]§r The challenge §4finished§r by §l"},{"selector": "@a[tag=target_player_end]"},{"text":"§r. Your time: "},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}


execute if score reset_type timer_settings matches 1 if score reset_message_show timer_settings matches 0 as @a[tag=target_player_end] at @s unless score custom_music timer_settings matches 1 run playsound respawn_anchor.set_spawn @s ~~~ 1 0.5
execute if score reset_type timer_settings matches 1 if score reset_message_show timer_settings matches 0 unless score custom_music timer_settings matches 1 run playsound random.pop @a[tag=!target_player_end]

execute if score reset_type timer_settings matches 1 if score reset_message_show timer_settings matches 0 as @a[tag=target_player_end] if score custom_music timer_settings matches 1 run playsound timeru.type_other.target @s
execute if score reset_type timer_settings matches 1 if score reset_message_show timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.type_other.other @a[tag=!target_player_end]





# help message
# execute if score reset_type timer_settings matches 0 if score difficulty timer_settings matches 0..1 if score reset_message_show timer_settings matches 0 if score help timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHilfe§6]§r Zum §4Zurücksetzen§r gebe §g§l/function timer/control§r ein oder benutze das Menü"}]}
execute if score reset_type timer_settings matches 2 if score reset_message_show timer_settings matches 0 if score help timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHelp§6]§r Continue playing? Run §l§g/function timer/control§r or use the menu"}]}

# for reset
execute if score reset_type timer_settings matches 0..2 if score reset_message_show timer_settings matches 0 run scoreboard players set mode timer_settings 2
execute if score reset_type timer_settings matches 0..2 if score reset_message_show timer_settings matches 0 run scoreboard players set speed_run timer_settings 0
execute if score reset_type timer_settings matches 0..2 if score reset_message_show timer_settings matches 0 run scoreboard players set speed_run_available timer_settings 0
execute if score reset_type timer_settings matches 0..2 if score reset_message_show timer_settings matches 0 run scoreboard players set do_count timer_settings 0
execute if score reset_type timer_settings matches 0..2 if score reset_message_show timer_settings matches 0 run tag @a remove type_afk
execute if score reset_type timer_settings matches 0..2 if score reset_message_show timer_settings matches 0 run gamerule dodaylightcycle false
execute if score reset_type timer_settings matches 0..2 if score reset_message_show timer_settings matches 0 run gamerule doweathercycle false
execute if score reset_type timer_settings matches 0..2 if score reset_message_show timer_settings matches 0 if score night_vision timer_settings matches 1 run effect @a clear
execute if score reset_type timer_settings matches 0..2 if score reset_message_show timer_settings matches 0 if score gravity timer_addon matches 1 run effect @e clear
execute if score reset_type timer_settings matches 0..2 if score reset_message_show timer_settings matches 0 if score speed_x timer_addon matches 1 run effect @e clear
execute if score reset_type timer_settings matches 0..2 if score reset_message_show timer_settings matches 0 if score invisibility timer_addon matches 1 run effect @e clear

execute if score reset_type timer_settings matches 0..2 if score reset_message_show timer_settings matches 0 if score no_move timer_addon matches 1.. run inputpermission set @a movement enabled
execute if score reset_type timer_settings matches 0..2 if score reset_message_show timer_settings matches 0 if score no_move timer_addon matches 2 run inputpermission set @a camera enabled

execute if score reset_type timer_settings matches 0..1 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 0 run gamemode spectator @a
execute if score reset_type timer_settings matches 2 if score reset_message_show timer_settings matches 0 run gamemode 1 @a

execute if score reset_type timer_settings matches 0..1 if score reset_message_show timer_settings matches 0 run tag @a remove target_player_end
execute if score reset_type timer_settings matches 0..1 if score reset_message_show timer_settings matches 0 unless score difficulty timer_settings matches 2.. run scoreboard players set automatic_mode_reset timer_settings 1
execute if score reset_type timer_settings matches 0..2 if score reset_message_show timer_settings matches 0 run scoreboard players set reset_message_show timer_settings 1
execute if score automatic_mode_reset timer_settings matches 1 run function timer/control
scoreboard players reset automatic_mode_reset timer_settings