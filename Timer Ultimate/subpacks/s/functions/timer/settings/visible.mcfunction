# If the score is 2, it will be interrupted
execute if score @s timer_show_actionbar matches 2 run scoreboard players set @s timer_actionbar_time 0
execute if score @s timer_show_actionbar matches 2 run scoreboard players set @s timer_show_actionbar 0

scoreboard players add @s timer_show_actionbar 1
execute if score @s timer_show_actionbar matches 2.. run scoreboard players set @s timer_show_actionbar 0

### If show_actionbar is 0
execute if score @s timer_show_actionbar matches 0 if score custom_music timer_settings matches 0 run playsound entity.zombie.converted_to_drowned @s
execute if score @s timer_show_actionbar matches 0 if score custom_music timer_settings matches 1 run playsound timeru.invisible @s
execute if score @s timer_show_actionbar matches 0 if score lang timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§7[§fSystem§7]§r Timer is §8invisible"}]}
execute if score @s timer_show_actionbar matches 0 if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§7[§fSystem§7]§r Timer ist §8unsichtbar"}]}
execute if score @s timer_show_actionbar matches 0 if score lang timer_settings matches 2 run tellraw @s {"rawtext":[{"translate":"timeru.header.system"},{"text":" "},{"translate":"timeru.message.visible.0"}]}
execute if score @s timer_show_actionbar matches 0 run title @s title §8Timer is invisible
execute if score @s timer_show_actionbar matches 0 run title @s actionbar §lTimer is now §8invisible

### If show_actionbar is 1
execute if score @s timer_show_actionbar matches 1 if score custom_music timer_settings matches 0 run playsound beacon.activate
execute if score @s timer_show_actionbar matches 1 if score custom_music timer_settings matches 1 run playsound timeru.visible @s
execute if score @s timer_show_actionbar matches 1 if score lang timer_settings matches 0 run tellraw @s {"rawtext":[{"text":"§l§7[§fSystem§7]§r Timer is §7visible§r"}]}
execute if score @s timer_show_actionbar matches 1 if score lang timer_settings matches 1 run tellraw @s {"rawtext":[{"text":"§l§7[§fSystem§7]§r Timer ist §7sichtbar§r"}]}
execute if score @s timer_show_actionbar matches 1 if score lang timer_settings matches 2 run tellraw @s {"rawtext":[{"translate":"timeru.header.system"},{"text":" "},{"translate":"timeru.message.visible.1"}]}
execute if score @s timer_show_actionbar matches 1 run title @s title §fTimer is §7visible§r

### If show_actionbar is 2 it will count down and swiches to 0
