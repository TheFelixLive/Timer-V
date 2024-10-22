# scoreboard control
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 run scoreboard players add no_crafting timer_addon 1
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score no_crafting timer_addon matches 2.. run scoreboard players set no_crafting timer_addon 0

# Ice-Challenge_disable message
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score no_crafting timer_addon matches 0 run title @s title §cNo §fCrafting §5Table
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score no_crafting timer_addon matches 0 run title @s subtitle -- is §cdisabled§f --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score no_crafting timer_addon matches 0 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§5Info§f]§r No Crafting Table Challenge is off"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score no_crafting timer_addon matches 0 unless score custom_music timer_settings matches 1 run playsound random.pop @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score no_crafting timer_addon matches 0 if score custom_music timer_settings matches 1 run playsound ca.no_crafting_0 @a[tag=trust_player_control]

# Ice-Challenge enable message 
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score no_crafting timer_addon matches 1 run title @s title §cNo §fCrafting §5Table
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0 if score no_crafting timer_addon matches 1 run title @s subtitle -- is §aactiv§f --
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score no_crafting timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§5Info§f]§r As soon as a crafting table appears in an inventory, it is over!"}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score no_crafting timer_addon matches 1 unless score custom_music timer_settings matches 1 run playsound smithing_table.use @a[tag=trust_player_control]
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 0 if score mode timer_settings matches 0..1 if score no_crafting timer_addon matches 1 if score custom_music timer_settings matches 1 run playsound ca.no_crafting_1 @a[tag=trust_player_control]
 


# Error
execute if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute if entity @s[tag=!trust_player_control] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s

execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r This action can only run in the main menu."}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score reset_type timer_settings matches 2 if score help timer_settings matches 1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eHelp§6]§r Run §g§l/function timer/control§r"}]}
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score mode timer_settings matches 2 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content

execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 run tellraw @s[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§eError§6]§r Challenges could not be activated because the \"Speed ​Run Mode\" is active."}]}
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 unless score custom_music timer_settings matches 1 run playsound note.didgeridoo
execute if entity @s[tag=trust_player_control] if score speed_run timer_settings matches 1 if score mode timer_settings matches 0..1 if score custom_music timer_settings matches 1 run playsound timeru.function_no_content
