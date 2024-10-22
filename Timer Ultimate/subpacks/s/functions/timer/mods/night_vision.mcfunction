# scoreboard control
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 run scoreboard players add night_vision timer_settings 1
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score night_vision timer_settings matches 2.. run scoreboard players set night_vision timer_settings 0



# night_vision on
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 1 unless score gravity timer_addon matches 1 unless score speed_x timer_addon matches 1 unless score invisibility timer_addon matches 1 run title @s title §9Fullbright
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 1 unless score gravity timer_addon matches 1 unless score speed_x timer_addon matches 1 unless score invisibility timer_addon matches 1 run title @s subtitle --this modification is §aactive§f --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 1 unless score gravity timer_addon matches 1 unless score speed_x timer_addon matches 1 unless score invisibility timer_addon matches 1 unless score custom_music timer_settings matches 1 run playsound random.potion.brewed @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 1 unless score gravity timer_addon matches 1 unless score speed_x timer_addon matches 1 unless score invisibility timer_addon matches 1 if score custom_music timer_settings matches 1 run playsound timeru.nightvision_0 @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score night_vision timer_settings matches 1 unless score gravity timer_addon matches 1 unless score speed_x timer_addon matches 1 unless score invisibility timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§1[§9Info§1]§r If the challenge is active, all players will be on night vision, if deactivated all effects will be removed"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 1 if score night_vision timer_settings matches 1 unless score gravity timer_addon matches 1 unless score speed_x timer_addon matches 1 unless score invisibility timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§1[§9Info§1]§r Fullbright is active, all players have the night Vision effect"}]}

# night_vision off
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 0 unless score gravity timer_addon matches 1 unless score speed_x timer_addon matches 1 unless score invisibility timer_addon matches 1 run title @s title §9Fullbright
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 0 unless score gravity timer_addon matches 1 unless score speed_x timer_addon matches 1 unless score invisibility timer_addon matches 1 run title @s subtitle --this modification is §coff§f --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 0 unless score gravity timer_addon matches 1 unless score speed_x timer_addon matches 1 unless score invisibility timer_addon matches 1 unless score custom_music timer_settings matches 1 run playsound random.pop @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 0 unless score gravity timer_addon matches 1 unless score speed_x timer_addon matches 1 unless score invisibility timer_addon matches 1 if score custom_music timer_settings matches 1 run playsound timeru.message @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 0 unless score gravity timer_addon matches 1 unless score speed_x timer_addon matches 1 unless score invisibility timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§1[§9Info§1]§r The Fullbright modification is deactivated."}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score night_vision timer_settings matches 0 unless score gravity timer_addon matches 1 unless score speed_x timer_addon matches 1 unless score invisibility timer_addon matches 1 run effect @a clear


# Error
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score gravity timer_addon matches 1 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r The modification Fullbright could not be activated because the Gravity Challenge is active."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score gravity timer_addon matches 1 unless score custom_music timer_settings matches 1 run playsound random.pop @s
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score gravity timer_addon matches 1 if score custom_music timer_settings matches 1 run playsound timeru.message @s

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score speed_x timer_addon matches 1 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r The modification Fullbright could not be activated because the Speed X Challenge is active."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score speed_x timer_addon matches 1 unless score custom_music timer_settings matches 1 run playsound random.pop @s
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score speed_x timer_addon matches 1 if score custom_music timer_settings matches 1 run playsound timeru.message @s

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score invisibility timer_addon matches 1 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r The modification Fullbright could not be activated because the Invisibility Challenge is active."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score invisibility timer_addon matches 1 unless score custom_music timer_settings matches 1 run playsound random.pop @s
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 0..1 if score invisibility timer_addon matches 1 if score custom_music timer_settings matches 1 run playsound timeru.message @s

execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r This action can only run in the main menu."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHelp§6]§r Führe §g§l/function timer/control§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content

execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 if score lang timer_settings matches 0 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r The modification fullbright could not be activated because the \"Speed Run Mode\" is active."}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 if score lang timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r Die Modifikation Fullbright konnte nicht aktiviert werden, da der „Speed Run Mode“ aktiv ist."}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content

