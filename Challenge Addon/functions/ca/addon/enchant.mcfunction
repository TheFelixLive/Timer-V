# scoreboard control
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 run scoreboard players add enchant timer_addon 1
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score enchant timer_addon matches 2.. run scoreboard players set enchant timer_addon 0

# Ice-challenge_disable message
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score enchant timer_addon matches 0 run title @s title §9Enchant
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score enchant timer_addon matches 0 run title @s subtitle -- is §cdisabled§f --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score enchant timer_addon matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§1[§9Info§1]§r The automatic enchantment [Enchant] is off"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score enchant timer_addon matches 0 unless score custom_music timer_settings matches 1 run playsound random.pop @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score enchant timer_addon matches 0 if score custom_music timer_settings matches 1 run playsound ca.enchant_0 @a[tag=trust_player_control]

# Ice-challenge enable message 
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score enchant timer_addon matches 1 run title @s title §9Enchant
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score enchant timer_addon matches 1 run title @s subtitle -- is §aactiv§f --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score enchant timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§1[§9Info§1]§r You play Enchant, your things are automatically enchanted"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score enchant timer_addon matches 1 unless score custom_music timer_settings matches 1 run playsound block.enchanting_table.use @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score enchant timer_addon matches 1 if score custom_music timer_settings matches 1 run playsound ca.enchant_1 @a[tag=trust_player_control]

# Error
execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r This action can only run in the main menu."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHelp§6]§r Run §g§l/function timer/control§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content

execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r challenges could not be activated because the \"Speed ​Run Mode\" is active."}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content
