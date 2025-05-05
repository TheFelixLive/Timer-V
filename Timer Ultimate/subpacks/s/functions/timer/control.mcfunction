### Reset-Timer when the goal is completed
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score reset_message_show timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§7[§fSystem§7]§r Timer has been §asuccessfully§r prepared for a new goal!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score reset_message_show timer_settings matches 1 if score help timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHelp§6]§r Run §g§l/function timer/settings/goal§r to select your new goal"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score reset_message_show timer_settings matches 1 unless score custom_music timer_settings matches 1 run playsound beacon.power @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score reset_message_show timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.reset_true @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score reset_message_show timer_settings matches 1 run scoreboard players set goal timer_settings 8

### Reset-Timer when the players died
#execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 unless score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§7[§fSystem§7]§r Timer was successfully §c§lreset!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 unless score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 if score help timer_settings matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHelp§6]§r Run §g§l/function timer/settings/goal§r to select your new goal"}]}
#execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 unless score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 unless score custom_music timer_settings matches 1 run playsound beacon.power @a[tag=trust_player_control]
#execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 unless score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.reset_false @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 unless score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 run gamemode creative @a
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 unless score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 run time set 0
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 unless score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 run weather clear 

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 unless score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 run scoreboard players set h timer_time 0
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 unless score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 run scoreboard players set min timer_time 0
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 unless score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 run scoreboard players set sec timer_time 0
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 unless score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 run scoreboard players set ms timer_time 0

execute if entity @s[tag=trust_player_control] if score shoud_count_down timer_settings matches 1 if score h timer_time matches 0 if score min timer_time matches 0 if score sec timer_time matches 0 run scoreboard players set shoud_count_down timer_settings 0

### Try to reset if Hardcore Mode was actived
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 unless score custom_music timer_settings matches 1 run playsound mob.vex.ambient @s ~ ~ ~ 3 0.8
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.reset_false_hardcore @s
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§4[§cError§4]§r With §4Hardcore Mode§r the world is lost"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 if score difficulty timer_settings matches 2.. if score reset_message_show timer_settings matches 1 run gamemode spectator @s





### Control

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 0 unless score custom_music timer_settings matches 1 run playsound beacon.activate @a
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 0 if score custom_music timer_settings matches 1 run playsound timeru.continue @a
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 0 run gamerule dodaylightcycle true
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 0 run gamerule doweathercycle true
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 0 run inputpermission set @a movement enabled
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 0 run gamemode 0 @a
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 0 run tellraw @a[tag=!type_afk] {"rawtext":[{"text":"§l§7[§fSystem§7]§r §l"},{"selector": "@s"},{"text":"§r §7continued§r the Timer"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 0 run tellraw @a[tag=type_afk] {"rawtext":[{"text":"§l§7[§fSystem§7]§r Welcome back, §l"},{"selector": "@s"},{"text":"§r the timer has §7continued"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 0 run title @s title §fTimer §7continued

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 unless score speed_run timer_settings matches 1 if score do_count timer_settings matches 1 unless score custom_music timer_settings matches 1 run playsound beacon.deactivate @a
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 unless score speed_run timer_settings matches 1 if score do_count timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.frozen @a
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 unless score speed_run timer_settings matches 1 if score do_count timer_settings matches 1 run gamerule dodaylightcycle false
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 unless score speed_run timer_settings matches 1 if score do_count timer_settings matches 1 run gamerule doweathercycle false
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 unless score speed_run timer_settings matches 1 if score do_count timer_settings matches 1 run gamemode spectator @a
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 unless score speed_run timer_settings matches 1 if score do_count timer_settings matches 1 unless entity @s[tag=type_afk] run tellraw @a {"rawtext":[{"text":"§l§7[§fSystem§7]§r §l"},{"selector": "@s"},{"text":"§r §4paused§r the Timer"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 unless score speed_run timer_settings matches 1 if score do_count timer_settings matches 1 unless entity @s[tag=type_afk] run inputpermission set @a movement disabled
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 unless score speed_run timer_settings matches 1 if score do_count timer_settings matches 1 if entity @s[tag=type_afk] run inputpermission set @a[tag=!type_afk] movement disabled
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 unless score speed_run timer_settings matches 1 if score do_count timer_settings matches 1 if entity @s[tag=type_afk] run tellraw @a {"rawtext":[{"text":"§l§3[§bAFK§3]§r The timer was §4paused§r because §l"},{"selector": "@s"},{"text":"§r went AFK"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 unless score speed_run timer_settings matches 1 if score do_count timer_settings matches 1 run title @s title §4Timer paused

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 1 if score night_vision timer_settings matches 1 run effect @a clear night_vision
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 1 if score gravity timer_addon matches 1 run effect @e clear levitation
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 1 if score gravity timer_addon matches 1 run effect @e clear slow_falling
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 1 if score speed_x timer_addon matches 1 run effect @e clear speed
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 1 if score invisibility timer_addon matches 1 run effect @e clear invisibility


# Speedrun Error
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 1 if score speed_run timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r Speed Run is active, there is no break!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 1 if score speed_run timer_settings matches 1 unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score do_count timer_settings matches 1 if score speed_run timer_settings matches 1 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 run scoreboard players add do_count timer_settings 1
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 if score speed_run timer_settings matches 1 if score do_count timer_settings matches 2.. run scoreboard players set do_count timer_settings 1
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 1 unless score speed_run timer_settings matches 1 if score do_count timer_settings matches 2.. run scoreboard players set do_count timer_settings 0





### Start
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 run tellraw @a {"rawtext":[{"text":"§l§7[§fSystem§7]§r The §2Challenge§r is starting..."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 run tag @r add on_start_challage
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score h timer_time matches 1000.. run tellraw @a {"rawtext":[{"text":"§l§6[§eError§6]§r 999 hours must not be exceeded when starting!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score shoud_count_down timer_settings matches 1 if score h timer_time matches 1000.. run scoreboard players set h timer_time 999
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 unless score shoud_count_down timer_settings matches 1 if score h timer_time matches 1000.. run scoreboard players set h timer_time 0

# for infinity
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score difficulty timer_settings matches 4 run effect @a instant_health 1 255 true

### Start bei random
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score shoud_count_down timer_settings matches 0 if score goal timer_settings matches 8 run scoreboard players random goal timer_settings 1 5
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score shoud_count_down timer_settings matches 1 if score goal timer_settings matches 8 run scoreboard players random goal timer_settings 1 6
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score goal timer_settings matches 6 run scoreboard players set goal timer_settings 7 
# Goal 6 is unused and get replaced by the time goal (7)

#-------------------------------------------------------------------------------
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score speed_run timer_settings matches 1 run tellraw @a {"rawtext":[{"text":"§l§u[§dSpeed Run§u]§r Without a break, without difficulty just Minecraft!"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score shoud_count_down timer_settings matches 1 run tellraw @a {"rawtext":[{"text":"§l§5[§dSystem§5]§r The §5Timermode§r is active, the time is counted backwards"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 if score difficulty timer_settings matches 2.. run tellraw @a {"rawtext":[{"text":"§l§4[§cDifficulty§4]§r §4Hardcore §cMode§4§l is active,§r whoever dies loses the world!"}]}


execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 run function ca/system_do_not_use/text_ca
#-------------------------------------------------------------------------------
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0 run scoreboard players set mode timer_settings 1

### Start bei random 2
execute if entity @a[tag=on_start_challage] run function timer/settings/goal
tag @a remove on_start_challage


### Reset
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 run scoreboard players set reset_message_show timer_settings 0
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 run scoreboard players set mode timer_settings 0
execute if entity @s[tag=trust_player_control] if score reset_type timer_settings matches 2 run scoreboard players set reset_type timer_settings 0


execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 unless score difficulty timer_settings matches 2.. run scoreboard players set reset_message_show timer_settings 0
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 0..1 unless score difficulty timer_settings matches 2.. run scoreboard players set mode timer_settings 0
execute if entity @s[tag=trust_player_control] if score reset_type timer_settings matches 0..1 unless score difficulty timer_settings matches 2.. run scoreboard players set reset_type timer_settings 10

# Error
execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s
