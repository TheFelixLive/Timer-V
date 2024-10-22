### v.1.0.0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Source version: v.1.0.0"}]}
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Target version: v.4.1.0"}]}


execute if entity @e[type=armor_stand, name=Timer] run gamerule sendcommandfeedback false
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Set gamerule sendcommandfeedback to false"}]}
execute if entity @e[type=armor_stand, name=Timer] run gamerule commandblockoutput true
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Set gamerule commandblockoutput to true"}]}

execute if entity @e[type=armor_stand, name=Timer] run scoreboard objectives add timer_settings dummy
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added objectives timer_settings at scoreboard"}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard objectives add timer_time dummy
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added objectives timer_time at scoreboard"}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard objectives add timer_menu dummy
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added objectives timer_menu at scoreboard"}]}

execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set ms timer_time 0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added ms to timer_time with "},{"score":{"name":"ms","objective":"timer_time"}}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players operation sec timer_time = @r sekunden
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Changed sec of timer_time to "},{"score":{"name":"sec","objective":"timer_time"}}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players operation min timer_time = @r minuten
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Changed min of timer_time to "},{"score":{"name":"min","objective":"timer_time"}}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players operation h timer_time = @r stunden
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Changed h of timer_time to "},{"score":{"name":"h","objective":"timer_time"}}]}

execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set id timer_menu 0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added id to timer_menu with "},{"score":{"name":"id","objective":"timer_menu"}}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set is_open timer_menu 0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added is_open to timer_menu with "},{"score":{"name":"is_open","objective":"timer_menu"}}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set animation_time timer_menu 0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added animation_time to timer_menu with "},{"score":{"name":"animation_time","objective":"timer_menu"}}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set action timer_menu 0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added action to timer_menu with "},{"score":{"name":"action","objective":"timer_menu"}}]}

execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set speed_run timer_settings 0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added speed_run to timer_settings with "},{"score":{"name":"speed_run","objective":"timer_settings"}}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set speed_run_available timer_settings 1
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added speed_run_available to timer_settings with "},{"score":{"name":"speed_run_available","objective":"timer_settings"}}]}

execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set goal timer_settings 0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added goal to timer_settings with "},{"score":{"name":"goal","objective":"timer_settings"}}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set difficulty timer_settings 1
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added difficulty to timer_settings with "},{"score":{"name":"difficulty","objective":"timer_settings"}}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set dimension timer_settings 0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added dimension to timer_settings with "},{"score":{"name":"dimension","objective":"timer_settings"}}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set help timer_settings 1
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added help to timer_settings with "},{"score":{"name":"help","objective":"timer_settings"}}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set lang timer_settings 0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added lang to timer_settings with "},{"score":{"name":"lang","objective":"timer_settings"}}]}

execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set reset_message_show timer_settings 0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added reset_message_show to timer_settings with "},{"score":{"name":"reset_message_show","objective":"timer_settings"}}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set reset_type timer_settings 10
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added reset_type to timer_settings with "},{"score":{"name":"reset_type","objective":"timer_settings"}}]}


execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set shoud_count_down timer_settings 0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added shoud_count_down to timer_settings with "},{"score":{"name":"shoud_count_down","objective":"timer_settings"}}]}

execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set afk timer_settings 0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added afk to timer_settings with "},{"score":{"name":"afk","objective":"timer_settings"}}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set night_vision timer_settings 0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added night_vision to timer_settings with "},{"score":{"name":"night_vision","objective":"timer_settings"}}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set custom_music timer_settings 0
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added custom_music to timer_settings with "},{"score":{"name":"custom_music","objective":"timer_settings"}}]}

execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set do_count timer_settings 0
execute if entity @e[type=armor_stand, name=Timer] run scoreboard players set mode timer_settings 0
execute if entity @e[type=armor_stand, name=Timer] if entity @r[tag=timer_resume] run scoreboard players set do_count timer_settings 1
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Changed do_count of timer_settings to "},{"score":{"name":"do_count","objective":"timer_settings"}}]}
execute if entity @e[type=armor_stand, name=Timer] if entity @r[tag=timer_resume] run scoreboard players set mode timer_settings 1
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Changed mode of timer_settings to "},{"score":{"name":"mode","objective":"timer_settings"}}]}

execute if entity @e[type=armor_stand, name=Timer] run scoreboard objectives remove sekunden
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Removed objectives sekunden at scoreboard"}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard objectives remove minuten
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Removed objectives minuten at scoreboard"}]}
execute if entity @e[type=armor_stand, name=Timer] run scoreboard objectives remove stunden
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Removed objectives stunden at scoreboard"}]}

execute if entity @e[type=armor_stand, name=Timer] run tag @a add trust_player_control
execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Added tag trust_player_control to "},{"selector": "@a[tag=trust_player_control]"}]}

execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Removed tag timer_resume form "},{"selector": "@a[tag=timer_resume]"}]}
execute if entity @e[type=armor_stand, name=Timer] run tag @a remove timer_resume

execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Removed tag timer form "},{"selector": "@a[tag=timer]"}]}
execute if entity @e[type=armor_stand, name=Timer] run tag @a remove timer

execute if entity @e[type=armor_stand, name=Timer] run tellraw @a {"rawtext":[{"text":"§l§7[§fLog§7]§r Removed traget! §7Note: v.3.3.0 or earlier cannot be completely removed from your world!\n§l§2[§aLog§2]§r Done!"}]}
execute at @e[type=armor_stand, name=Timer] run fill ~2 ~-1 ~2 ~-2 ~2 ~-4 stone
execute as @e[type=armor_stand, name=Timer] run kill