# Gelb §l§6[§eTest§6]§r
# Rot §l§4[§cTest§4]§r
# Grün §l§2[§aTest§2]§r
# Hellblau §l§3[§bTest§3]§r
# Dunkelblau §l§1[§9Test§1]§r
# Weiß §l§7[§fTest§7]§r
# Schwarz §l§0[§8Test§0]§r
# Lila §l§5[§dTest§5]§r

# If its execute from a player
execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s


execute if entity @s[tag=trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§4[§cError§4]§r This function is running already"}]}
execute if entity @s[tag=trust_player_control] unless score custom_music timer_settings matches 1 run playsound random.enderchestopen @s ~~~ 1 0.5
execute if entity @s[tag=trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_system @s

# search for save data "mode"
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run tag @r add trust_player_control

# if the Challenge-Addon is aktiv
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run function ca/system_do_not_use/text_challenge

### start "create-data for Timer Ultimate"
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run gamerule sendcommandfeedback false
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run gamerule dodaylightcycle false
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run gamerule doweathercycle false
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run time set 0
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run weather clear
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run gamemode creative @a

execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_settings dummy
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_time dummy
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_menu dummy
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_show_actionbar dummy
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_actionbar_time dummy

# This runs any time because it affects every player
execute as @r unless score @s timer_actionbar_time matches 0.. run scoreboard players set @s timer_actionbar_time 0
execute as @r unless score @s timer_show_actionbar matches 0.. run scoreboard players set @s timer_show_actionbar 1

execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set ms timer_time 0
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set sec timer_time 0
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set min timer_time 0
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set h timer_time 0

execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set id timer_menu 0
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set is_open timer_menu 0
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set animation_time timer_menu 0
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set action timer_menu 0

execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set speed_run timer_settings 0
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set speed_run_available timer_settings 1

execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set goal timer_settings 8
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set difficulty timer_settings 1
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set dimension timer_settings 0
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set custom_music timer_settings 0
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set help timer_settings 1
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set lang timer_settings 0

execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set reset_message_show timer_settings 0
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set reset_type timer_settings 10
# 0 = bad_death; 1=bad_stop; 2 = good

execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set shoud_count_down timer_settings 0
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set do_count timer_settings 0

execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set afk timer_settings 0
execute unless score mode timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard players set night_vision timer_settings 0

# feedback for chat / sound
execute unless score mode timer_settings matches 0.. if entity @a[tag=trust_player_control] unless score look timer_setup matches 1 run tellraw @a {"rawtext":[{"text":"§l§7[§fSystem§7]§r The timer can now be used! The Menu will open soon..."}]}
execute unless score mode timer_settings matches 0.. if entity @a[tag=trust_player_control] unless score look timer_setup matches 1 run scoreboard players set timer_update timer_menu 1
execute unless score mode timer_settings matches 0.. if entity @a[tag=trust_player_control] unless score look timer_setup matches 1 unless score custom_music timer_settings matches 1 run playsound random.levelup @a
execute unless score mode timer_settings matches 0.. if entity @a[tag=trust_player_control] unless score look timer_setup matches 1 if score custom_music timer_settings matches 1 run playsound timeru.lauch_successful @a

execute unless score mode timer_settings matches 0.. if entity @a[tag=trust_player_control] unless score look timer_setup matches 1 run scoreboard players set mode timer_settings 0

# seaching for corrupt data
execute unless score id timer_menu matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Menu data (id) is corrupt! Restoring..."}]}
execute unless score is_open timer_menu matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Menu data (is_open) is corrupt! Restoring..."}]}
execute unless score action timer_menu matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Menu data (action) is corrupt! Restoring..."}]}
execute unless score animation_time timer_menu matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Menu data (animation_time) is corrupt! Restoring..."}]}

execute unless score ms timer_time matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Time data (ms) is corrupt! Restoring..."}]}
execute unless score sec timer_time matches -60.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Time data (sec) is corrupt! Restoring..."}]}
execute unless score min timer_time matches -60.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Time data (min) is corrupt! Restoring..."}]}
execute unless score h timer_time matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Time data (h) is corrupt! Restoring..."}]}

execute unless score speed_run timer_settings matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Timer settings file (speed_run) is corrupt! Restoring..."}]}
execute unless score speed_run_available timer_settings matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Timer settings file (speed_run_available) is corrupt! Restoring..."}]}

execute unless score goal timer_settings matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Timer settings file (goal) is corrupt! Restoring..."}]}
execute unless score difficulty timer_settings matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Timer settings file (difficulty) is corrupt! Restoring..."}]}
execute unless score dimension timer_settings matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Timer settings file (dimension) is corrupt! Restoring..."}]}
execute unless score custom_music timer_settings matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Timer settings file (custom_music) is corrupt! Restoring..."}]}
execute unless score help timer_settings matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Timer settings file (help) is corrupt! Restoring..."}]}
execute unless score lang timer_settings matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Timer settings file (lang) is corrupt! Restoring..."}]}
execute unless score reset_message_show timer_settings matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Timer settings file (reset_message_show) is corrupt! Restoring..."}]}
execute unless score reset_type timer_settings matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Timer settings file (reset_type) is corrupt! Restoring..."}]}
execute unless score shoud_count_down timer_settings matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Timer settings file (shoud_count_down) is corrupt! Restoring..."}]}
execute unless score do_count timer_settings matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Timer settings file (do_count) is corrupt! Restoring..."}]}
execute unless score night_vision timer_settings matches 0.. unless score look timer_setup matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cCrash§4]§r Timer settings file (night_vision) is corrupt! Restoring..."}]}

execute unless score id timer_menu matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score is_open timer_menu matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score action timer_menu matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score animation_time timer_menu matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings

execute unless score ms timer_time matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score sec timer_time matches -60.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score min timer_time matches -60.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score h timer_time matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings

execute unless score speed_run timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score speed_run_available timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings

execute unless score goal timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score difficulty timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score dimension timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score custom_music timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score help timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score lang timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score reset_message_show timer_settings matches 0.. run scoreboard objectives remove timer_settings
execute unless score reset_type timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score shoud_count_down timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score do_count timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings
execute unless score night_vision timer_settings matches 0.. unless score look timer_setup matches 1 run scoreboard objectives remove timer_settings

# Fullbright
execute if score mode timer_settings matches 1 if score do_count timer_settings matches 1 if score night_vision timer_settings matches 1 run effect @a night_vision 83 2 true

# for the Challenge Addon
function ca/system_do_not_use/main_ca

# oppens the menu from the npc
execute if score id timer_menu matches 2 unless score timer_update timer_menu matches 1 if score is_open timer_menu matches 0 as @a[tag=timer_menu_target] run dialogue open @e[type=npc, name=timer_menu] @s menu_main
execute if score id timer_menu matches 3 if score is_open timer_menu matches 0 as @a[tag=timer_menu_target] run dialogue open @e[type=npc, name=timer_menu] @s menu_game
execute if score id timer_menu matches 4 if score is_open timer_menu matches 0 as @a[tag=timer_menu_target] run dialogue open @e[type=npc, name=timer_menu] @s menu_reset_true
execute if score id timer_menu matches 5 if score is_open timer_menu matches 0 as @a[tag=timer_menu_target] run dialogue open @e[type=npc, name=timer_menu] @s menu_reset_false

# oppens the welcome menu
execute if score timer_update timer_menu matches 1 unless entity @e[type=npc, name=timer_menu] as @a[tag=trust_player_control] at @s run function timer/menu
execute if score timer_update timer_menu matches 1 if score is_open timer_menu matches 0 as @a[tag=timer_menu_target] run dialogue open @e[type=npc, name=timer_menu] @s menu_main_welcome
execute if score timer_update timer_menu matches 1 if score is_open timer_menu matches 1 run scoreboard players reset timer_update timer_menu

# closes the menu due to an error
execute if score id timer_menu matches 2..5 if score is_open timer_menu matches 0 run scoreboard players add attempts timer_menu 1
execute if score is_open timer_menu matches 1 if score attempts timer_menu matches 0.. run scoreboard players reset attempts timer_menu

execute if score attempts timer_menu matches 100.. run tellraw @a[tag=timer_menu_target] {"rawtext":[{"text":"§l§6[§eError§6]§r The menu could not be opened"}]}
execute if score attempts timer_menu matches 100.. if score sound timer_menu matches 0 run stopsound @a[tag=timer_menu_target]
execute if score attempts timer_menu matches 100.. as @a[tag=timer_menu_target] unless score custom_music timer_settings matches 1 run playsound random.pop
execute if score attempts timer_menu matches 100.. as @a[tag=timer_menu_target] if score custom_music timer_settings matches 1 run playsound timeru.message

execute if score attempts timer_menu matches 100.. run scoreboard players set id timer_menu 1
execute if score attempts timer_menu matches 100.. run scoreboard players set sound timer_menu 1
execute if score attempts timer_menu matches 100.. run scoreboard players set animation_time timer_menu 0

execute if entity @a[tag=timer_menu_target] unless entity @e[type=npc, name=timer_menu] run tellraw @a[tag=timer_menu_target] {"rawtext":[{"text":"§l§6[§eError§6]§r The menu ended because the NPC got lost"}]}
execute if entity @a[tag=timer_menu_target] unless entity @e[type=npc, name=timer_menu] if score sound timer_menu matches 0 run stopsound @a[tag=timer_menu_target]
execute if entity @a[tag=timer_menu_target] unless entity @e[type=npc, name=timer_menu] as @a[tag=timer_menu_target] unless score custom_music timer_settings matches 1 run playsound random.pop
execute if entity @a[tag=timer_menu_target] unless entity @e[type=npc, name=timer_menu] as @a[tag=timer_menu_target] if score custom_music timer_settings matches 1 run playsound timeru.message
execute if entity @a[tag=timer_menu_target] unless entity @e[type=npc, name=timer_menu] run  scoreboard players set sound timer_menu 1
execute if entity @a[tag=timer_menu_target] unless entity @e[type=npc, name=timer_menu] run scoreboard players set id timer_menu 1

# close the menu from the npc
execute if score id timer_menu matches 1 run gamemode 1 @a[tag=timer_menu_target]
execute if score id timer_menu matches 1 unless score sound timer_menu matches 1 run stopsound @a[tag=timer_menu_target]
execute if score id timer_menu matches 1 if score sound timer_menu matches 1 run scoreboard players reset sound timer_menu

execute if score id timer_menu matches 1 run inputpermission set @a[tag=timer_menu_target] movement enabled
execute if score id timer_menu matches 1 run kill @e[type=npc, name=timer_menu]
execute if score id timer_menu matches 1 run tag @a remove timer_menu_target
execute if score id timer_menu matches 1 run scoreboard players set is_open timer_menu 0

execute if score attempts timer_menu matches 100.. run scoreboard players reset attempts timer_menu

execute if score id timer_menu matches 1.. if score is_open timer_menu matches 1 run scoreboard players set id timer_menu 0

# if someone selects for an example a goal the menu should open (animation)
execute if score animation_time timer_menu matches 2.. run scoreboard players remove animation_time timer_menu 1
execute if score animation_time timer_menu matches 2 if score is_open timer_menu matches 1 run scoreboard players set is_open timer_menu 0

execute if score animation_time timer_menu matches 1 if score mode timer_settings matches 0 run scoreboard players set id timer_menu 2
execute if score animation_time timer_menu matches 1 if score mode timer_settings matches 1 run scoreboard players set id timer_menu 3

execute if score animation_time timer_menu matches 1 if score is_open timer_menu matches 1 run scoreboard players set animation_time timer_menu 0

# Runs /function timer/control from the menu
execute as @a[tag=target_run_control] at @s run function timer/control
tag @a remove target_run_control

# Runs /function timer/settings/dimension from the menu
execute as @a[tag=target_run_dimension] at @s run function timer/settings/dimension
tag @a remove target_run_dimension

execute as @a[tag=target_run_scriptevent] at @s run scriptevent timeru:menu_time_new
tag @a remove target_run_scriptevent




# removing save data
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_menu
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_time
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_settings
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_actionbar_time
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_show_actionbar
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run tag @a remove trust_player_control
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run gamerule sendcommandfeedback true
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run gamerule dodaylightcycle true
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run gamerule doweathercycle true
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 at @r run playsound random.toast @a ~~~ 1 0.5
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run tellraw @a {"rawtext":[{"text":"§l§7[§fSystem§7]§r The necessary resources from the timer have been successfully removed"}]}
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard players set look timer_setup 1


# automatic gamemode switch
execute if score mode timer_settings matches 1 if score do_count timer_settings matches 1 unless score speed_run timer_settings matches 1 as @a[m=!s, tag=trust_player_control] at @s run function timer/control
execute if score mode timer_settings matches 1 if score do_count timer_settings matches 1 if score speed_run timer_settings matches 1 as @a[m=!s, tag=trust_player_control] at @s run gamemode s @s
execute if score mode timer_settings matches 1 if score do_count timer_settings matches 1 as @a[m=!s, tag=!trust_player_control] at @s run gamemode s @s

execute if score mode timer_settings matches 1 if score do_count timer_settings matches 0 as @a[m=!spectator, tag=trust_player_control] at @s run function timer/control
execute if score mode timer_settings matches 1 if score do_count timer_settings matches 0 as @a[m=!spectator, tag=!trust_player_control] at @s run gamemode spectator @s

execute if score mode timer_settings matches 0 as @a[m=s, tag=trust_player_control] at @s run function timer/control
execute if score mode timer_settings matches 0 as @a[m=s, tag=!trust_player_control] at @s run gamemode c @s

execute if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 as @a[m=!spectator, tag=trust_player_control] at @s run function timer/control
execute if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 as @a[m=!spectator, tag=!trust_player_control] at @s run gamemode spectator @s

# movement
execute if score mode timer_settings matches 1 if score do_count timer_settings matches 0 run inputpermission set @a movement disabled
execute if score mode timer_settings matches 1 if score movement timer_addon matches 4.. run inputpermission set @a movement disabled
execute if score mode timer_settings matches 1 if score movement timer_addon matches 5 run inputpermission set @a camera disabled


# definition
execute if score shoud_count_down timer_settings matches 0 if score mode timer_settings matches 1 if score do_count timer_settings matches 1 run scoreboard players add ms timer_time 5

execute if score shoud_count_down timer_settings matches 0 if score ms timer_time matches 100.. run scoreboard players add sec timer_time 1
execute if score shoud_count_down timer_settings matches 0 if score ms timer_time matches 100.. run scoreboard players remove ms timer_time 100

execute if score shoud_count_down timer_settings matches 0 if score sec timer_time matches 60.. run scoreboard players add min timer_time 1
execute if score shoud_count_down timer_settings matches 0 if score sec timer_time matches 60.. run scoreboard players remove sec timer_time 60

execute if score shoud_count_down timer_settings matches 0 if score min timer_time matches 60.. run scoreboard players add h timer_time 1
execute if score shoud_count_down timer_settings matches 0 if score min timer_time matches 60.. run scoreboard players remove min timer_time 60


# The will remove 5 ms, if the Timer is continue and the time_mode is aktiv
execute if score shoud_count_down timer_settings matches 1 if score mode timer_settings matches 1 if score do_count timer_settings matches 1 run scoreboard players remove ms timer_time 5

execute if score shoud_count_down timer_settings matches 1 if score ms timer_time matches ..-1 run scoreboard players remove sec timer_time 1
execute if score shoud_count_down timer_settings matches 1 if score ms timer_time matches ..-1 run scoreboard players add ms timer_time 100

execute if score shoud_count_down timer_settings matches 1 if score sec timer_time matches ..-1 run scoreboard players remove min timer_time 1
execute if score shoud_count_down timer_settings matches 1 if score sec timer_time matches ..-1 run scoreboard players add sec timer_time 60

execute if score shoud_count_down timer_settings matches 1 if score min timer_time matches ..-1 run scoreboard players remove h timer_time 1
execute if score shoud_count_down timer_settings matches 1 if score min timer_time matches ..-1 run scoreboard players add min timer_time 60


# when the timer is over 999 hours
execute if score shoud_count_down timer_settings matches 0 if score h timer_time matches 1000.. run scoreboard players set reset_type timer_settings 1
execute if score shoud_count_down timer_settings matches 0 if score h timer_time matches 1000.. run function timer/system_do_not_use/end_cmo

# if time is under 0 and the time_mode is on
execute if score reset_message_show timer_settings matches 0 if score shoud_count_down timer_settings matches 1 if score ms timer_time matches 0 if score sec timer_time matches 0 if score min timer_time matches 0 if score h timer_time matches 0 if score goal timer_settings matches !7 if score mode timer_settings matches 1 run scoreboard players set reset_type timer_settings 1
execute if score reset_message_show timer_settings matches 0 if score shoud_count_down timer_settings matches 1 if score ms timer_time matches 0 if score sec timer_time matches 0 if score min timer_time matches 0 if score h timer_time matches 0 if score goal timer_settings matches 7 if score mode timer_settings matches 1 run scoreboard players set reset_type timer_settings 2

execute if score reset_message_show timer_settings matches 0 if score shoud_count_down timer_settings matches 1 if score ms timer_time matches 0 if score sec timer_time matches 0 if score min timer_time matches 0 if score h timer_time matches 0 if score mode timer_settings matches 1 run function timer/system_do_not_use/end_cmo


### This counds for the secred 3th mode (it will hide the actionbar temporely)
scoreboard players set @a[scores={timer_show_actionbar=!2, timer_actionbar_time=1..}] timer_show_actionbar 2
scoreboard players set @a[scores={timer_show_actionbar=2, timer_actionbar_time=0}] timer_actionbar_time 50
scoreboard players set @a[scores={timer_show_actionbar=2, timer_actionbar_time=0}] timer_show_actionbar 0

scoreboard players set @a[scores={timer_actionbar_time=1}] timer_show_actionbar 1
scoreboard players remove @a[scores={timer_actionbar_time=1..}] timer_actionbar_time 1





# Feedback at actionbar --------------------------------------

# Title when someone in the main-menu is
execute if score mode timer_settings matches 0 if score speed_run timer_settings matches 0 unless score difficulty timer_settings matches 2.. unless score enchant timer_addon matches 1.. if score shoud_count_down timer_settings matches 1 run titleraw @a[tag=trust_player_control, scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§lTimer §7Ultimate§r §5("},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s) §f§oby TheFelixLive"}]}
execute if score mode timer_settings matches 0 if score speed_run timer_settings matches 0 if score difficulty timer_settings matches 2.. unless score enchant timer_addon matches 1.. if score shoud_count_down timer_settings matches 1 run titleraw @a[tag=trust_player_control, scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§lTimer §7Ultimate§r §c("},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s) §f§oby TheFelixLive"}]}

execute if score mode timer_settings matches 0 if score speed_run timer_settings matches 0 unless score difficulty timer_settings matches 2.. unless score enchant timer_addon matches 1.. if score shoud_count_down timer_settings matches 0 run titleraw @a[tag=trust_player_control, scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§lTimer §7Ultimate§r §f§oby TheFelixLive"}]}

# for player thay dont have the trust_player_control
execute if score mode timer_settings matches 0 if score speed_run timer_settings matches 0 unless score difficulty timer_settings matches 2.. unless score enchant timer_addon matches 1.. run titleraw @a[tag=!trust_player_control, scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§lTimer §7Ultimate§r §f§oby TheFelixLive"}]}


execute if score mode timer_settings matches 0 if score speed_run timer_settings matches 0 if score difficulty timer_settings matches 2 unless score enchant timer_addon matches 1.. if score shoud_count_down timer_settings matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§lTimer §7Ultimate §4[§cHardcore Mode§4]§r §f§oby TheFelixLive"}]}
execute if score mode timer_settings matches 0 if score speed_run timer_settings matches 0 if score difficulty timer_settings matches 3 unless score enchant timer_addon matches 1.. if score shoud_count_down timer_settings matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§lTimer §7Ultimate §4[§cUltra Hardcore§4]§r §f§oby TheFelixLive"}]}
execute if score mode timer_settings matches 0 if score speed_run timer_settings matches 0 if score difficulty timer_settings matches 4 unless score enchant timer_addon matches 1.. if score shoud_count_down timer_settings matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§lTimer §7Ultimate §4[§7Infinity§4]§r §f§oby TheFelixLive"}]}

execute if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l§u00:0§d0.00"}]}

# Normal

# time_second
execute if score do_count timer_settings matches 1 if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score difficulty timer_settings matches 0..1 unless score enchant timer_addon matches 1.. if score sec timer_time matches 0.. if score min timer_time matches 0 if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}

# time_minuten
execute if score do_count timer_settings matches 1 if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score difficulty timer_settings matches 0..1 unless score enchant timer_addon matches 1.. if score sec timer_time matches 0 if score min timer_time matches 1.. if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"min","objective":"timer_time"}},{"text":"m"}]}
execute if score do_count timer_settings matches 1 if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score difficulty timer_settings matches 0..1 unless score enchant timer_addon matches 1.. if score sec timer_time matches 1.. if score min timer_time matches 1.. if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}


# time_hours
execute if score do_count timer_settings matches 1 if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score difficulty timer_settings matches 0..1 unless score enchant timer_addon matches 1.. if score sec timer_time matches 0 if score min timer_time matches 0 if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"h","objective":"timer_time"}},{"text":"h"}]}
execute if score do_count timer_settings matches 1 if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score difficulty timer_settings matches 0..1 unless score enchant timer_addon matches 1.. if score sec timer_time matches 1.. if score min timer_time matches 0 if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}
execute if score do_count timer_settings matches 1 if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score difficulty timer_settings matches 0..1 unless score enchant timer_addon matches 1.. if score sec timer_time matches 0 if score min timer_time matches 1.. if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m"}]}
execute if score do_count timer_settings matches 1 if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score difficulty timer_settings matches 0..1 unless score enchant timer_addon matches 1.. if score sec timer_time matches 1.. if score min timer_time matches 1.. if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}

# Hardcore

# time_second
execute if score do_count timer_settings matches 1 if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score difficulty timer_settings matches 2.. if score sec timer_time matches 0.. if score min timer_time matches 0 if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§c"},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}

# time_minuten
execute if score do_count timer_settings matches 1 if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score difficulty timer_settings matches 2.. if score sec timer_time matches 0 if score min timer_time matches 1.. if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§c"},{"score":{"name":"min","objective":"timer_time"}},{"text":"m"}]}
execute if score do_count timer_settings matches 1 if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score difficulty timer_settings matches 2.. if score sec timer_time matches 1.. if score min timer_time matches 1.. if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§c"},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}


# time_hours
execute if score do_count timer_settings matches 1 if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score difficulty timer_settings matches 2.. if score sec timer_time matches 0 if score min timer_time matches 0 if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§c"},{"score":{"name":"h","objective":"timer_time"}},{"text":"h"}]}
execute if score do_count timer_settings matches 1 if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score difficulty timer_settings matches 2.. if score sec timer_time matches 1.. if score min timer_time matches 0 if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§c"},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}
execute if score do_count timer_settings matches 1 if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score difficulty timer_settings matches 2.. if score sec timer_time matches 0 if score min timer_time matches 1.. if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§c"},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m"}]}
execute if score do_count timer_settings matches 1 if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score difficulty timer_settings matches 2.. if score sec timer_time matches 1.. if score min timer_time matches 1.. if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§c"},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s"}]}

# Speed Run

# time_minuten
execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches 10.. if score sec timer_time matches 10.. if score min timer_time matches 10.. if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l"},{"score":{"name":"min","objective":"timer_time"}},{"text":":"},{"score":{"name":"sec","objective":"timer_time"}},{"text":"."},{"score":{"name":"ms","objective":"timer_time"}}]}
execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches 10.. if score sec timer_time matches 10.. if score min timer_time matches ..9 if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l0"},{"score":{"name":"min","objective":"timer_time"}},{"text":":"},{"score":{"name":"sec","objective":"timer_time"}},{"text":"."},{"score":{"name":"ms","objective":"timer_time"}}]}
execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches 10.. if score sec timer_time matches ..9 if score min timer_time matches 10.. if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l"},{"score":{"name":"min","objective":"timer_time"}},{"text":":0"},{"score":{"name":"sec","objective":"timer_time"}},{"text":"."},{"score":{"name":"ms","objective":"timer_time"}}]}
execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches 10.. if score sec timer_time matches ..9 if score min timer_time matches ..9 if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l0"},{"score":{"name":"min","objective":"timer_time"}},{"text":":0"},{"score":{"name":"sec","objective":"timer_time"}},{"text":"."},{"score":{"name":"ms","objective":"timer_time"}}]}

execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches ..9 if score sec timer_time matches 10.. if score min timer_time matches 10.. if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l"},{"score":{"name":"min","objective":"timer_time"}},{"text":":"},{"score":{"name":"sec","objective":"timer_time"}},{"text":".0"},{"score":{"name":"ms","objective":"timer_time"}}]}
execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches ..9 if score sec timer_time matches 10.. if score min timer_time matches ..9 if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l0"},{"score":{"name":"min","objective":"timer_time"}},{"text":":"},{"score":{"name":"sec","objective":"timer_time"}},{"text":".0"},{"score":{"name":"ms","objective":"timer_time"}}]}
execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches ..9 if score sec timer_time matches ..9 if score min timer_time matches 10.. if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l"},{"score":{"name":"min","objective":"timer_time"}},{"text":":0"},{"score":{"name":"sec","objective":"timer_time"}},{"text":".0"},{"score":{"name":"ms","objective":"timer_time"}}]}
execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches ..9 if score sec timer_time matches ..9 if score min timer_time matches ..9 if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l0"},{"score":{"name":"min","objective":"timer_time"}},{"text":":0"},{"score":{"name":"sec","objective":"timer_time"}},{"text":".0"},{"score":{"name":"ms","objective":"timer_time"}}]}


# Stunden
execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches 10.. if score sec timer_time matches 10.. if score min timer_time matches 10.. if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l"},{"score":{"name":"h","objective":"timer_time"}},{"text":":"},{"score":{"name":"min","objective":"timer_time"}},{"text":":"},{"score":{"name":"sec","objective":"timer_time"}},{"text":"."},{"score":{"name":"ms","objective":"timer_time"}}]}
execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches 10.. if score sec timer_time matches 10.. if score min timer_time matches ..9 if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l"},{"score":{"name":"h","objective":"timer_time"}},{"text":":0"},{"score":{"name":"min","objective":"timer_time"}},{"text":":"},{"score":{"name":"sec","objective":"timer_time"}},{"text":"."},{"score":{"name":"ms","objective":"timer_time"}}]}
execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches 10.. if score sec timer_time matches ..9 if score min timer_time matches 10.. if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l"},{"score":{"name":"h","objective":"timer_time"}},{"text":":"},{"score":{"name":"min","objective":"timer_time"}},{"text":":0"},{"score":{"name":"sec","objective":"timer_time"}},{"text":"."},{"score":{"name":"ms","objective":"timer_time"}}]}
execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches 10.. if score sec timer_time matches ..9 if score min timer_time matches ..9 if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l"},{"score":{"name":"h","objective":"timer_time"}},{"text":":0"},{"score":{"name":"min","objective":"timer_time"}},{"text":":0"},{"score":{"name":"sec","objective":"timer_time"}},{"text":"."},{"score":{"name":"ms","objective":"timer_time"}}]}

execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches ..9 if score sec timer_time matches 10.. if score min timer_time matches 10.. if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l"},{"score":{"name":"h","objective":"timer_time"}},{"text":":"},{"score":{"name":"min","objective":"timer_time"}},{"text":":"},{"score":{"name":"sec","objective":"timer_time"}},{"text":".0"},{"score":{"name":"ms","objective":"timer_time"}}]}
execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches ..9 if score sec timer_time matches 10.. if score min timer_time matches ..9 if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l"},{"score":{"name":"h","objective":"timer_time"}},{"text":":0"},{"score":{"name":"min","objective":"timer_time"}},{"text":":"},{"score":{"name":"sec","objective":"timer_time"}},{"text":".0"},{"score":{"name":"ms","objective":"timer_time"}}]}
execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches ..9 if score sec timer_time matches ..9 if score min timer_time matches 10.. if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l"},{"score":{"name":"h","objective":"timer_time"}},{"text":":"},{"score":{"name":"min","objective":"timer_time"}},{"text":":0"},{"score":{"name":"sec","objective":"timer_time"}},{"text":".0"},{"score":{"name":"ms","objective":"timer_time"}}]}
execute if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score ms timer_time matches ..9 if score sec timer_time matches ..9 if score min timer_time matches ..9 if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§l"},{"score":{"name":"h","objective":"timer_time"}},{"text":":0"},{"score":{"name":"min","objective":"timer_time"}},{"text":":0"},{"score":{"name":"sec","objective":"timer_time"}},{"text":".0"},{"score":{"name":"ms","objective":"timer_time"}}]}


# Pause

# time_second
execute if score do_count timer_settings matches 0 if score mode timer_settings matches 1 if score sec timer_time matches 0.. if score min timer_time matches 0 if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s §f§o(frozen)"}]}

# time_minuten
execute if score do_count timer_settings matches 0 if score mode timer_settings matches 1 if score sec timer_time matches 0 if score min timer_time matches 1.. if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"min","objective":"timer_time"}},{"text":"m §f§o(frozen)"}]}
execute if score do_count timer_settings matches 0 if score mode timer_settings matches 1 if score sec timer_time matches 1.. if score min timer_time matches 1.. if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"min","objective":"timer_time"}},{"text":"m "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s §f§o(frozen)"}]}


# time_hours
execute if score do_count timer_settings matches 0 if score mode timer_settings matches 1 if score sec timer_time matches 0 if score min timer_time matches 0 if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"h","objective":"timer_time"}},{"text":"h §f§o(frozen)"}]}
execute if score do_count timer_settings matches 0 if score mode timer_settings matches 1 if score sec timer_time matches 1.. if score min timer_time matches 0 if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"sec","objective":"timer_time"}},{"text":"s §f§o(frozen)"}]}
execute if score do_count timer_settings matches 0 if score mode timer_settings matches 1 if score sec timer_time matches 0 if score min timer_time matches 1.. if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"h","objective":"timer_time"}},{"text":"h "},{"score":{"name":"min","objective":"timer_time"}},{"text":"m §f§o(frozen)"}]}

# finished

# time_0
execute if score mode timer_settings matches 2 if score difficulty timer_settings matches 0..1 if score sec timer_time matches 0 if score min timer_time matches 0 if score h timer_time matches 0 run titleraw @a[tag=trust_player_control] actionbar {"rawtext":[{"text":"§g§l/function timer/control"}]}
execute if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 if score difficulty timer_settings matches 0..1 if score sec timer_time matches 0 if score min timer_time matches 0 if score h timer_time matches 0 run titleraw @a[tag=!trust_player_control] actionbar {"rawtext":[{"text":"§[§cEnde§4]"}]}
execute if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score difficulty timer_settings matches 0..1 if score sec timer_time matches 0 if score min timer_time matches 0 if score h timer_time matches 0 run titleraw @a[tag=!trust_player_control] actionbar {"rawtext":[{"text":"§2[§aEnde§2]"}]}
execute if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score difficulty timer_settings matches 2.. if score sec timer_time matches 0 if score min timer_time matches 0 if score h timer_time matches 0 run titleraw @a[tag=trust_player_control] actionbar {"rawtext":[{"text":"§g§l/function timer/control"}]}
execute if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 if score difficulty timer_settings matches 2.. if score sec timer_time matches 0 if score min timer_time matches 0 if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§4[§cEnde§4]"}]}

# time_minuten
execute if score mode timer_settings matches 2 if score sec timer_time matches 10.. if score min timer_time matches 10.. if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"Your Time: §7§l"},{"score":{"name":"min","objective":"timer_time"}},{"text":":"},{"score":{"name":"sec","objective":"timer_time"}}]}
execute if score mode timer_settings matches 2 if score sec timer_time matches 10.. if score min timer_time matches ..9 if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"Your Time: §7§l0"},{"score":{"name":"min","objective":"timer_time"}},{"text":":"},{"score":{"name":"sec","objective":"timer_time"}}]}
execute if score mode timer_settings matches 2 if score sec timer_time matches 1..9 if score min timer_time matches 10.. if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"Your Time: §7§l"},{"score":{"name":"min","objective":"timer_time"}},{"text":":0"},{"score":{"name":"sec","objective":"timer_time"}}]}
execute if score mode timer_settings matches 2 if score sec timer_time matches 1..9 if score min timer_time matches ..9 if score h timer_time matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"Your Time: §7§l0"},{"score":{"name":"min","objective":"timer_time"}},{"text":":0"},{"score":{"name":"sec","objective":"timer_time"}}]}

# Stunden
execute if score mode timer_settings matches 2 if score sec timer_time matches 10.. if score min timer_time matches 10.. if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"Your Time: §7§l"},{"score":{"name":"h","objective":"timer_time"}},{"text":":"},{"score":{"name":"min","objective":"timer_time"}},{"text":":"},{"score":{"name":"sec","objective":"timer_time"}}]}
execute if score mode timer_settings matches 2 if score sec timer_time matches 10.. if score min timer_time matches ..9 if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"Your Time: §7§l"},{"score":{"name":"h","objective":"timer_time"}},{"text":":0"},{"score":{"name":"min","objective":"timer_time"}},{"text":":"},{"score":{"name":"sec","objective":"timer_time"}}]}
execute if score mode timer_settings matches 2 if score sec timer_time matches ..9 if score min timer_time matches 10.. if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"Your Time: §7§l"},{"score":{"name":"h","objective":"timer_time"}},{"text":":"},{"score":{"name":"min","objective":"timer_time"}},{"text":":0"},{"score":{"name":"sec","objective":"timer_time"}}]}
execute if score mode timer_settings matches 2 if score sec timer_time matches ..9 if score min timer_time matches ..9 if score h timer_time matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"Your Time: §7§l"},{"score":{"name":"h","objective":"timer_time"}},{"text":":0"},{"score":{"name":"min","objective":"timer_time"}},{"text":":0"},{"score":{"name":"sec","objective":"timer_time"}}]}
