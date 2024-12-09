# Gelb §l§6[§eTest§6]§r
# Rot §l§4[§cTest§4]§r
# Grün §l§2[§aTest§2]§r
# Hellblau §l§3[§bTest§3]§r
# Dunkelblau §l§1[§9Test§1]§r
# Weiß §l§7[§fTest§7]§r
# Schwarz §l§0[§8Test§0]§r
# Lila §l§5[§dTest§5]§r

# If its execute from a player
execute if entity @s run tellraw @s {"rawtext":[{"text":"§l§4[§cCrash§4]§r This function is running already"}]}
execute if entity @s unless score custom_music timer_settings matches 1 run playsound random.enderchestopen @s ~~~ 1 0.5
execute if entity @s if score custom_music timer_settings matches 1 run playsound timeru.function_system @s


### Lauch Timer
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_do_count dummy
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_setup dummy
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_shoud_count_down dummy
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_custom_music dummy
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_afk dummy
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_menu dummy
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_night_vision dummy
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_show_actionbar dummy
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_actionbar_time dummy

execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_time_ms dummy
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_time_sec dummy
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_time_min dummy
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_time_h dummy
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard objectives add timer_time_d dummy

execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard players set id timer_menu 0
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard players set is_open timer_menu 0
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard players set animation_time timer_menu 0
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard players set action timer_menu 0
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard players set sound timer_menu 0
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard players set host_mode timer_menu 0

# Setup for player
tag @r add timer_target_test

execute as @a[tag=timer_target_test] unless score @s timer_time_ms matches 0.. run scoreboard players set @s timer_time_ms 0
execute as @a[tag=timer_target_test] unless score @s timer_time_sec matches 0.. run scoreboard players set @s timer_time_sec 0
execute as @a[tag=timer_target_test] unless score @s timer_time_min matches 0.. run scoreboard players set @s timer_time_min 0
execute as @a[tag=timer_target_test] unless score @s timer_time_h matches 0.. run scoreboard players set @s timer_time_h 0
execute as @a[tag=timer_target_test] unless score @s timer_time_d matches 0.. run scoreboard players set @s timer_time_d 0

execute as @a[tag=timer_target_test] unless score @s timer_afk matches 0.. run scoreboard players set @s timer_afk 0
execute as @a[tag=timer_target_test] unless score @s timer_night_vision matches 0.. run scoreboard players set @s timer_night_vision 0
execute as @a[tag=timer_target_test] unless score @s timer_actionbar_time matches 0.. run scoreboard players set @s timer_actionbar_time 0
execute as @a[tag=timer_target_test] unless score @s timer_do_count matches 0.. run scoreboard players set @s timer_do_count 0
execute as @a[tag=timer_target_test] unless score @s timer_show_actionbar matches 0.. run scoreboard players set @s timer_show_actionbar 1
execute as @a[tag=timer_target_test] unless score @s timer_custom_music matches 0.. run scoreboard players set @s timer_custom_music 0
tag @a[tag=timer_target_test] remove timer_target_test


# feedback for chat / sound
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run tag @r add trust_player_control
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 if entity @a[tag=trust_player_control] run tellraw @a {"rawtext":[{"text":"§l§7[§fSystem§7]§r The timer can now be used!"}]}
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 if entity @a[tag=trust_player_control] run scoreboard players set timer_update timer_menu 1
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 if entity @a[tag=trust_player_control] run playsound random.levelup @a[scores={timer_custom_music=0}]
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 if entity @a[tag=trust_player_control] run playsound timeru.lauch_successful @a[scores={timer_custom_music=1}]
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run gamerule sendcommandfeedback false


# On Globalhost
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard players set host timer_time_ms 0
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard players set host timer_shoud_count_down 0
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard players set host timer_time_sec 0
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard players set host timer_time_min 0
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard players set host timer_time_h 0
execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 run scoreboard players set host timer_time_d 0

execute unless score host timer_do_count matches 0.. unless score look timer_setup matches 1 if entity @a[tag=trust_player_control] run scoreboard players set host timer_do_count 0


# oppens the menu from the npc
execute if score id timer_menu matches 2 unless score timer_update timer_menu matches 1 if score is_open timer_menu matches 0 as @a[tag=timer_menu_target] run dialogue open @e[type=npc, name=timer_menu] @s menu_main_0
execute if score id timer_menu matches 3 unless score timer_update timer_menu matches 1 if score is_open timer_menu matches 0 as @a[tag=timer_menu_target] run dialogue open @e[type=npc, name=timer_menu] @s menu_main_1
execute if score id timer_menu matches 4 unless score timer_update timer_menu matches 1 if score is_open timer_menu matches 0 as @a[tag=timer_menu_target] run dialogue open @e[type=npc, name=timer_menu] @s menu_main_2
execute if score id timer_menu matches 5 unless score timer_update timer_menu matches 1 if score is_open timer_menu matches 0 as @a[tag=timer_menu_target] run dialogue open @e[type=npc, name=timer_menu] @s menu_main_3
execute if score id timer_menu matches 6 unless score timer_update timer_menu matches 1 if score is_open timer_menu matches 0 as @a[tag=timer_menu_target] run dialogue open @e[type=npc, name=timer_menu] @s menu_main_4

# oppens the welcome menu
execute if score timer_update timer_menu matches 1 unless entity @e[type=npc, name=timer_menu] as @a[tag=trust_player_control] at @s run function timer/menu
execute if score timer_update timer_menu matches 1 if score is_open timer_menu matches 0 as @a[tag=timer_menu_target] run dialogue open @e[type=npc, name=timer_menu] @s menu_main_welcome
execute if score timer_update timer_menu matches 1 if score is_open timer_menu matches 1 run scoreboard players reset timer_update timer_menu

# closes the menu due to an error
execute if score id timer_menu matches 1..3 if score is_open timer_menu matches 0 run scoreboard players add attempts timer_menu 1
execute if score is_open timer_menu matches 1 if score attempts timer_menu matches 0.. run scoreboard players reset attempts timer_menu

execute if score attempts timer_menu matches 100.. run tellraw @a[tag=timer_menu_target] {"rawtext":[{"text":"§l§6[§eError§6]§r The menu could not be opened"}]}
execute if score attempts timer_menu matches 100.. run stopsound @a[tag=timer_menu_target] 
execute if score attempts timer_menu matches 100.. run playsound random.pop @a[tag=timer_menu_target, scores={timer_custom_music=0}]
execute if score attempts timer_menu matches 100.. run playsound timeru.message @a[tag=timer_menu_target, scores={timer_custom_music=1}]

execute if score attempts timer_menu matches 100.. run scoreboard players set sound timer_menu 1
execute if score attempts timer_menu matches 100.. run scoreboard players set id timer_menu 1
execute if score attempts timer_menu matches 100.. run scoreboard players set animation_time timer_menu 0

execute if entity @a[tag=timer_menu_target] unless entity @e[type=npc, name=timer_menu] if entity @a[tag=close_menu] run tellraw @a[tag=timer_menu_target] {"rawtext":[{"text":"§l§6[§eError§6]§r The menu has been closed by §l"},{"selector": "@a[tag=close_menu]"},{"text":"§r"}]} 
execute if entity @a[tag=timer_menu_target] unless entity @e[type=npc, name=timer_menu] unless entity @a[tag=close_menu] run tellraw @a[tag=timer_menu_target] {"rawtext":[{"text":"§l§6[§eError§6]§r The menu ended because the NPC got lost"}]}

execute if entity @a[tag=timer_menu_target] unless entity @e[type=npc, name=timer_menu] run stopsound @a[tag=timer_menu_target]
execute if entity @a[tag=timer_menu_target] unless entity @e[type=npc, name=timer_menu] run playsound random.pop @a[tag=timer_menu_target, scores={timer_custom_music=0}]
execute if entity @a[tag=timer_menu_target] unless entity @e[type=npc, name=timer_menu] run playsound timeru.message @a[tag=timer_menu_target, scores={timer_custom_music=1}]
execute if entity @a[tag=timer_menu_target] unless entity @e[type=npc, name=timer_menu] run scoreboard players set sound timer_menu 1
execute if entity @a[tag=timer_menu_target] unless entity @e[type=npc, name=timer_menu] run scoreboard players set id timer_menu 1

# close the menu from the npc
execute if score id timer_menu matches 1 run gamemode 1 @a[tag=timer_menu_target]
execute if score id timer_menu matches 1 unless score sound timer_menu matches 1 run stopsound @a[tag=timer_menu_target]
execute if score id timer_menu matches 1 run inputpermission set @a[tag=timer_menu_target] movement enabled
execute if score id timer_menu matches 1 run kill @e[type=npc, name=timer_menu]

execute if score id timer_menu matches 1 run titleraw @a[tag=mode_2] actionbar {"rawtext":[{"text":"§lThe Timer is §7invisible"}]}
execute if score id timer_menu matches 1 if score host_mode timer_menu matches 0 run scoreboard players set @a[tag=mode_0] timer_do_count 0
execute if score id timer_menu matches 1 if score host_mode timer_menu matches 0 run scoreboard players set @a[tag=mode_1] timer_do_count 1
execute if score id timer_menu matches 1 if score host_mode timer_menu matches 0 run scoreboard players set @a[tag=mode_2] timer_do_count 2

execute if score id timer_menu matches 1 if score host_mode timer_menu matches 1 if entity @a[tag=mode_0] run scoreboard players set host timer_do_count 0
execute if score id timer_menu matches 1 if score host_mode timer_menu matches 1 if entity @a[tag=mode_1] run scoreboard players set host timer_do_count 1
execute if score id timer_menu matches 1 if score host_mode timer_menu matches 1 if entity @a[tag=mode_2] run scoreboard players set host timer_do_count 2


execute if score id timer_menu matches 1 run tag @a remove mode_0
execute if score id timer_menu matches 1 run tag @a remove mode_1
execute if score id timer_menu matches 1 run tag @a remove mode_2
execute if score id timer_menu matches 1 run tag @a remove timer_menu_target
execute if score id timer_menu matches 1 run scoreboard players set sound timer_menu 0
execute if score id timer_menu matches 1 run scoreboard players set is_open timer_menu 0
execute if score id timer_menu matches 1 as @a[tag=close_menu] at @s run function timer/menu
execute if score id timer_menu matches 1 run tag @a remove close_menu

execute if score attempts timer_menu matches 100.. run scoreboard players reset attempts timer_menu

execute if score id timer_menu matches 1.. run scoreboard players set id timer_menu 0

# if someone selects for an example a goal the menu should open (animation)
execute if score animation_time timer_menu matches 2.. run scoreboard players remove animation_time timer_menu 1
execute if score animation_time timer_menu matches 2 if score is_open timer_menu matches 1 run scoreboard players set is_open timer_menu 0

execute if score animation_time timer_menu matches 1 if entity @a[tag=timer_menu_target, tag=!trust_player_control] if score host_mode timer_menu matches 0 run scoreboard players set id timer_menu 2
execute if score animation_time timer_menu matches 1 if entity @a[tag=timer_menu_target, tag=!trust_player_control] if score host_mode timer_menu matches 1.. run scoreboard players set id timer_menu 3
execute if score animation_time timer_menu matches 1 if entity @a[tag=timer_menu_target, tag=trust_player_control] if score host_mode timer_menu matches 0 run scoreboard players set id timer_menu 4
execute if score animation_time timer_menu matches 1 if entity @a[tag=timer_menu_target, tag=trust_player_control] if score host_mode timer_menu matches 1 run scoreboard players set id timer_menu 5
execute if score animation_time timer_menu matches 1 if entity @a[tag=timer_menu_target, tag=trust_player_control] if score host_mode timer_menu matches 2 run scoreboard players set id timer_menu 6

execute if score animation_time timer_menu matches 1 if score is_open timer_menu matches 1 run scoreboard players set animation_time timer_menu 0


# removing save data
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_do_count
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_shoud_count_down
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_custom_music 
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_afk
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_menu 
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_night_vision

execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_actionbar_time
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_show_actionbar

execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_time_ms 
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_time_sec
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_time_min
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_time_h
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard objectives remove timer_time_d

execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run gamerule sendcommandfeedback true

execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run tag @a remove trust_player_control
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run tag @a remove target_host

execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 at @r run playsound random.toast @a ~~~ 1 0.5
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run tellraw @a {"rawtext":[{"text":"§l§7[§fSystem§7]§r The necessary resources from the timer have been successfully removed"}]}
execute unless entity @e[type=npc, name=timer_menu] if score look timer_setup matches 0 run scoreboard players set look timer_setup 1


# When the timer is over 999 days
tellraw @a[scores={timer_do_count=1.., timer_time_d=1000..}] {"rawtext":[{"text":"§l§4[§cError§4]§r The timer cannot count past 1000 days [2.74 years]. Use the menu to reset it!"}]}
execute as @a[scores={timer_do_count=1.., timer_time_d=1000.., timer_night_vision=1}] run effect @s clear night_vision
execute as @a[scores={timer_do_count=1.., timer_time_d=1000..}] run playsound respawn_anchor.set_spawn @s[scores={timer_custom_music=0}]
execute as @a[scores={timer_do_count=1.., timer_time_d=1000..}] run playsound timeru.type_other.target @s[scores={timer_custom_music=1}]
execute as @a[scores={timer_do_count=1.., timer_time_d=1000..}] run scoreboard players set @s timer_do_count 0

execute if score host timer_time_d matches 1000.. if score host timer_do_count matches 1.. run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§4[§cError§4]§r The timer cannot count past 1000 days [2.74 years]. Use the menu to reset it!"}]}
execute if score host timer_time_d matches 1000.. if score host timer_do_count matches 1.. if score host timer_night_vision matches 1 run effect @a clear night_vision
execute if score host timer_time_d matches 1000.. if score host timer_do_count matches 1.. as @a[tag=trust_player_control] run playsound respawn_anchor.set_spawn @s[scores={timer_custom_music=0}]
execute if score host timer_time_d matches 1000.. if score host timer_do_count matches 1.. as @a[tag=trust_player_control] run playsound timeru.type_other.target @s[scores={timer_custom_music=1}]
execute if score host timer_time_d matches 1000.. if score host timer_do_count matches 1.. as @a[tag=trust_player_control] run scoreboard players set host timer_do_count 0

# When the timer is 0 on time_mode
execute if score host timer_do_count matches 1.. if score host timer_shoud_count_down matches 1 if score host timer_time_d matches 0 if score host timer_time_d matches 0 if score host timer_time_h matches 0 if score host timer_time_min matches 0 if score host timer_time_sec matches 0 if score host timer_time_ms matches 0 run tag @r add timer_up

execute if entity @a[tag=timer_up] run tellraw @a {"rawtext":[{"text":"§l§4[§cSystem§4]§r Time Up!"}]}
execute if entity @a[tag=timer_up] if score host timer_night_vision matches 1 run effect @a clear night_vision
execute if entity @a[tag=timer_up] as @a[tag=trust_player_control] run playsound respawn_anchor.set_spawn @a[scores={timer_custom_music=0}]
execute if entity @a[tag=timer_up] as @a[tag=trust_player_control] run playsound timeru.type_other.target @a[scores={timer_custom_music=1}]
execute if entity @a[tag=timer_up] run scoreboard players set host timer_do_count 0
execute if entity @a[tag=timer_up] run scoreboard players set host timer_shoud_count_down 0

tag @a[tag=timer_up] remove timer_up


# Fullbright
execute if score host_mode timer_menu matches 0 run effect @a[scores={timer_do_count=1.., timer_night_vision=1}] night_vision 83 2 true
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 1.. if score host timer_night_vision matches 1 run effect @a night_vision 83 2 true
execute if score host_mode timer_menu matches 2 run effect @a[scores={timer_night_vision=1}] night_vision 83 2 true

# Testfor loop
execute if entity @a[tag=test_person] run function timer/tesfor

# The no player is online on globalmode control
execute unless entity @a if score host_mode timer_menu matches 1 if score host timer_do_count matches 1 run say The timer has stopped because no player is online.
execute unless entity @a if score host_mode timer_menu matches 1 if score host timer_do_count matches 1 run scoreboard players set temp_host timer_do_count 1
execute unless entity @a if score host_mode timer_menu matches 1 if score host timer_do_count matches 1 run scoreboard players set host timer_do_count 0

execute if entity @a if score host_mode timer_menu matches 1 if score temp_host timer_do_count matches 1 run tellraw @a {"rawtext":[{"text":"§l§7[§fSystem§7]§r The timer was previously paused due to inactivity"}]}
execute if entity @a if score host_mode timer_menu matches 1 if score temp_host timer_do_count matches 1 run scoreboard players set host timer_do_count 1
execute if entity @a if score host_mode timer_menu matches 1 if score temp_host timer_do_count matches 1 run scoreboard players reset temp_host timer_do_count


### The will at the Host 5 ms, if the Timer is continue
execute if score host timer_shoud_count_down matches 0 if score host timer_do_count matches 1.. if score host_mode timer_menu matches 1 run scoreboard players add host timer_time_ms 5

execute if score host timer_time_ms matches 100.. run scoreboard players add host timer_time_sec 1
execute if score host timer_time_ms matches 100.. run scoreboard players remove host timer_time_ms 100

execute if score host timer_time_sec matches 60.. run scoreboard players add host timer_time_min 1
execute if score host timer_time_sec matches 60.. run scoreboard players remove host timer_time_sec 60

execute if score host timer_time_min matches 60.. run scoreboard players add host timer_time_h 1
execute if score host timer_time_min matches 60.. run scoreboard players remove host timer_time_min 60

execute if score host timer_time_h matches 24.. run scoreboard players add host timer_time_d 1
execute if score host timer_time_h matches 24.. run scoreboard players remove host timer_time_h 24



### This will remove the Host 5 ms, if the Timer is continue
execute if score host timer_shoud_count_down matches 1 if score host timer_do_count matches 1.. if score host_mode timer_menu matches 1 run scoreboard players remove host timer_time_ms 5


execute if score host timer_time_ms matches ..-1 run scoreboard players remove host timer_time_sec 1
execute if score host timer_time_ms matches ..-1 run scoreboard players add host timer_time_ms 100

execute if score host timer_time_sec matches ..-1 run scoreboard players remove host timer_time_min 1
execute if score host timer_time_sec matches ..-1 run scoreboard players add host timer_time_sec 60

execute if score host timer_time_min matches ..-1 run scoreboard players remove host timer_time_h 1
execute if score host timer_time_min matches ..-1 run scoreboard players add host timer_time_min 60

execute if score host timer_time_h matches ..-1 run scoreboard players remove host timer_time_d 1
execute if score host timer_time_h matches ..-1 run scoreboard players add host timer_time_h 24


### This will add the Player 5 ms, if the Timer is continue
execute if score host_mode timer_menu matches 0 run scoreboard players add @a[scores={timer_do_count=1..}] timer_time_ms 5

scoreboard players add @a[scores={timer_time_ms=100..}] timer_time_sec 1
scoreboard players remove @a[scores={timer_time_ms=100..}] timer_time_ms 100

scoreboard players add @a[scores={timer_time_sec=60..}] timer_time_min 1
scoreboard players remove @a[scores={timer_time_sec=60..}] timer_time_sec 60

scoreboard players add @a[scores={timer_time_min=60..}] timer_time_h 1
scoreboard players remove @a[scores={timer_time_min=60..}] timer_time_min 60

scoreboard players add @a[scores={timer_time_h=24..}] timer_time_d 1
scoreboard players remove @a[scores={timer_time_h=24..}] timer_time_h 24


### This counds for the secred 3th mode (it will hide the actionbar temporely)
scoreboard players set @a[scores={timer_show_actionbar=2, timer_actionbar_time=0}] timer_actionbar_time 50
scoreboard players set @a[scores={timer_show_actionbar=2, timer_actionbar_time=0}] timer_show_actionbar 0
scoreboard players set @a[scores={timer_actionbar_time=1}] timer_show_actionbar 1
scoreboard players remove @a[scores={timer_actionbar_time=1..}] timer_actionbar_time 1


### This is now title for the actionbar

# No Title
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=0, timer_time_h=0, timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§lTimer §7Ultimate§r §f§oby TheFelixLive"}]}
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 0 if score host timer_time_min matches 0 if score host timer_time_h matches 0 if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§lTimer §7Ultimate§r §f§oby TheFelixLive"}]}




# Continue (local)

# Only "sec"
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=0.., timer_time_min=0, timer_time_h=0, timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s"}]}

# Only "timer_time_min"
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=1.., timer_time_h=0, timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=1.., timer_time_h=0, timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s"}]}

# Only "h"
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=0, timer_time_h=1.., timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=0, timer_time_h=1.., timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=1.., timer_time_h=1.., timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=1.., timer_time_h=1.., timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s"}]}

# Only "d"
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=0, timer_time_h=0, timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=0, timer_time_h=1.., timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=1.., timer_time_h=0, timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=0, timer_time_h=0, timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=1.., timer_time_h=0, timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=1.., timer_time_h=1.., timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=0, timer_time_h=1.., timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=1, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=1.., timer_time_h=1.., timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s"}]}



# Continue (global / world)

# Only "sec"
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 0.. if score host timer_time_min matches 0 if score host timer_time_h matches 0 if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s"}]}

# Only "min"
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 0 if score host timer_time_min matches 1.. if score host timer_time_h matches 0 if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m"}]}
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 1.. if score host timer_time_min matches 1.. if score host timer_time_h matches 0 if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s"}]}

# Only "h"
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 0 if score host timer_time_min matches 0 if score host timer_time_h matches 1.. if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h"}]}
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 1.. if score host timer_time_min matches 0 if score host timer_time_h matches 1.. if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s"}]}
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 0 if score host timer_time_min matches 1.. if score host timer_time_h matches 1.. if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m"}]}
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 1.. if score host timer_time_min matches 1.. if score host timer_time_h matches 1.. if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s"}]}

# Only "d"
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 0 if score host timer_time_min matches 0 if score host timer_time_h matches 0 if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d"}]}
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 0 if score host timer_time_min matches 0 if score host timer_time_h matches 1.. if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h"}]}
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 0 if score host timer_time_min matches 1.. if score host timer_time_h matches 0 if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m"}]}
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 1.. if score host timer_time_min matches 0 if score host timer_time_h matches 0 if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s"}]}
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 1.. if score host timer_time_min matches 1.. if score host timer_time_h matches 0 if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s"}]}
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 0 if score host timer_time_min matches 1.. if score host timer_time_h matches 1.. if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m"}]}
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 1.. if score host timer_time_min matches 0 if score host timer_time_h matches 1.. if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s"}]}
execute if score host_mode timer_menu matches 1.. if score host timer_do_count matches 1 if score host timer_time_sec matches 1.. if score host timer_time_min matches 1.. if score host timer_time_h matches 1.. if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§f"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s"}]}



# Brake (local)

# Only "sec"
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=0, timer_time_h=0, timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}

# Only "timer_time_min"
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=1.., timer_time_h=0, timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=1.., timer_time_h=0, timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}

# Only "h"
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=0, timer_time_h=1.., timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=0, timer_time_h=1.., timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=1.., timer_time_h=1.., timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=1.., timer_time_h=1.., timer_time_d=0}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}

# Only "d"
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=0, timer_time_h=0, timer_time_d=1..999}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=0, timer_time_h=0, timer_time_d=1000..}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d §7§o(cannot resumed)"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=0, timer_time_h=1.., timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=1.., timer_time_h=0, timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=0, timer_time_h=0, timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=1.., timer_time_h=0, timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=0, timer_time_min=1.., timer_time_h=1.., timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=0, timer_time_h=1.., timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 0 as @a[scores={timer_do_count=0, timer_show_actionbar=1, timer_time_sec=1.., timer_time_min=1.., timer_time_h=1.., timer_time_d=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"@s","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"@s","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"@s","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"@s","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}


# Brake (global)

# Only "sec"
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 1.. if score host timer_time_min matches 0 if score host timer_time_h matches 0 if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}

# Only "min"
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 0 if score host timer_time_min matches 1.. if score host timer_time_h matches 0 if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 1.. if score host timer_time_min matches 1.. if score host timer_time_h matches 0 if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}

# Only "h"
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 0 if score host timer_time_min matches 0 if score host timer_time_h matches 1.. if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 1.. if score host timer_time_min matches 0 if score host timer_time_h matches 1.. if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 0 if score host timer_time_min matches 1.. if score host timer_time_h matches 1.. if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 1.. if score host timer_time_min matches 1.. if score host timer_time_h matches 1.. if score host timer_time_d matches 0 run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}

# Only "d"
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 0 if score host timer_time_min matches 0 if score host timer_time_h matches 0 if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 0 if score host timer_time_min matches 0 if score host timer_time_h matches 0 if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d §f§o(cannot resumed)"}]}
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 0 if score host timer_time_min matches 0 if score host timer_time_h matches 1.. if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 0 if score host timer_time_min matches 1.. if score host timer_time_h matches 0 if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 1.. if score host timer_time_min matches 0 if score host timer_time_h matches 0 if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 1.. if score host timer_time_min matches 1.. if score host timer_time_h matches 0 if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 0 if score host timer_time_min matches 1.. if score host timer_time_h matches 1.. if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 1.. if score host timer_time_min matches 0 if score host timer_time_h matches 1.. if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}
execute if score host_mode timer_menu matches 1 if score host timer_do_count matches 0 if score host timer_time_sec matches 1.. if score host timer_time_min matches 1.. if score host timer_time_h matches 1.. if score host timer_time_d matches 1.. run titleraw @a[scores={timer_show_actionbar=1}] actionbar {"rawtext":[{"text":"§7"},{"score":{"name":"host","objective":"timer_time_d"}},{"text":"d "},{"score":{"name":"host","objective":"timer_time_h"}},{"text":"h "},{"score":{"name":"host","objective":"timer_time_min"}},{"text":"m "},{"score":{"name":"host","objective":"timer_time_sec"}},{"text":"s §f§o(frozen)"}]}



