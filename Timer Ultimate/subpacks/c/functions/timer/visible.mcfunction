### Scoreboard
scoreboard players add @s timer_show_actionbar 1

# Control (local)
execute if score @s timer_show_actionbar matches 1 if score @s timer_custom_music matches 0 run playsound beacon.activate
execute if score @s timer_show_actionbar matches 1 if score @s timer_custom_music matches 1 run playsound timeru.visible
execute if score @s timer_show_actionbar matches 1 run tellraw @s {"rawtext":[{"text":"§l§7[§fSystem§7]§r Timer is §7visible§r"}]}
execute if score @s timer_show_actionbar matches 1 run title @s title §fTimer is §7visible§r


execute if score @s timer_show_actionbar matches 2 if score @s timer_custom_music matches 0 run playsound entity.zombie.converted_to_drowned
execute if score @s timer_show_actionbar matches 2 if score @s timer_custom_music matches 1 run playsound timeru.invisible
execute if score @s timer_show_actionbar matches 2 run tellraw @s {"rawtext":[{"text":"§l§7[§fSystem§7]§r Timer is §8invisible"}]}
execute if score @s timer_show_actionbar matches 2 run title @s title §8Timer is invisible
execute if score @s timer_show_actionbar matches 2 run title @s actionbar §lTimer is now §8invisible

scoreboard players set @s[scores={timer_show_actionbar=2..}] timer_show_actionbar 0
