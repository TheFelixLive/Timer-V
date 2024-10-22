### Error
execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s

execute if entity @s[tag=trust_player_control] if score is_open timer_menu matches 1 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r The menu is currently being used by §l"},{"selector": "@a[tag=timer_menu_target]"},{"text":"§r. Please wait until they close it!"}]}
execute if entity @s[tag=trust_player_control] if score is_open timer_menu matches 1 unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=trust_player_control] if score is_open timer_menu matches 1 if score custom_music timer_settings matches 1 run playsound timeru.function_not_available @s

# Sartup menu when mode matches 2 and reset_type 0 or 1
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score difficulty timer_settings matches 0..1 unless score reset_type timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§4[§cError§4]§r Automatic (mode) reset failed! Restoring..."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score difficulty timer_settings matches 0..1 unless score reset_type timer_settings matches 2 run scoreboard objectives remove timer_settings

# Startup menu when mode matches 2 and Hardcore 1
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score difficulty timer_settings matches 2.. unless score reset_type timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r This action can only run in the main menu."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score difficulty timer_settings matches 2.. unless score reset_type timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score difficulty timer_settings matches 2.. unless score reset_type timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content

# Startup menu when speedrun is on and mode 1
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r Speed ​​Run is active, there is no menu!"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 1 unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content @s

# Run function without exiting
execute if entity @s[tag=trust_player_control] if entity @s[tag=timer_menu_target] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r The menu did not exit correctly"}]}
execute if entity @s[tag=trust_player_control] if entity @s[tag=timer_menu_target] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=trust_player_control] if entity @s[tag=timer_menu_target] if score custom_music timer_settings matches 1 run playsound timeru.function_no_content @s
execute if entity @s[tag=trust_player_control] if entity @s[tag=timer_menu_target] run scoreboard players set id timer_menu 1




### Startup menu when mode is 0 (Main-Menu)
execute if entity @s[tag=trust_player_control] if score is_open timer_menu matches 0 if score mode timer_settings matches 0 run tag @s add timer_menu_target
execute if entity @s[tag=trust_player_control] if score is_open timer_menu matches 0 if score mode timer_settings matches 0 run summon npc ~~-20~~~ attacked timer_menu
execute if entity @s[tag=trust_player_control] if score is_open timer_menu matches 0 if score mode timer_settings matches 0 run gamemode spectator
execute if entity @s[tag=trust_player_control] if score is_open timer_menu matches 0 if score mode timer_settings matches 0 run inputpermission set @s movement disabled

# Forward menu to main_cmo
execute if entity @s[tag=trust_player_control] if score is_open timer_menu matches 0 if score mode timer_settings matches 0 run scoreboard players set id timer_menu 2

### Startup menu when mode is 1 (Game-Menu)
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score is_open timer_menu matches 0 if score mode timer_settings matches 1 run tag @s add timer_menu_target
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score is_open timer_menu matches 0 if score mode timer_settings matches 1 run summon npc ~~-20~~~ attacked timer_menu
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score is_open timer_menu matches 0 if score mode timer_settings matches 1 run gamemode spectator
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score is_open timer_menu matches 0 if score mode timer_settings matches 1 run inputpermission set @s movement disabled

# Forward menu to main_cmo
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score is_open timer_menu matches 0 if score mode timer_settings matches 1 run scoreboard players set id timer_menu 3



### Startup menu when mode is 2 (Reset-Menu; good ending)
execute if entity @s[tag=trust_player_control] if score is_open timer_menu matches 0 if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 run tag @s add timer_menu_target
execute if entity @s[tag=trust_player_control] if score is_open timer_menu matches 0 if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 run summon npc ~~-20~~~ attacked timer_menu
execute if entity @s[tag=trust_player_control] if score is_open timer_menu matches 0 if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 run gamemode spectator
execute if entity @s[tag=trust_player_control] if score is_open timer_menu matches 0 if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 run inputpermission set @s movement disabled


# Forward menu to main_cmo
execute if entity @s[tag=trust_player_control] if score is_open timer_menu matches 0 if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 run scoreboard players set id timer_menu 4