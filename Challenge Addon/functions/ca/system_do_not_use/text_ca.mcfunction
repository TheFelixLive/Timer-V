# If its execute from a player
execute unless entity @a[tag=on_start_challage] if entity @s[tag=!trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§6[§eError§6]§r You do not have the necessary permissions for this action. Current players who could grant you this permission: §l"},{"selector": "@a[tag=trust_player_control]"}]}
execute unless entity @a[tag=on_start_challage] if entity @s[tag=!trust_player_control] unless score custom_music timer_settings matches 1 run playsound block.false_permissions
execute unless entity @a[tag=on_start_challage] if entity @s[tag=!trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_no_permissions @s


execute unless entity @a[tag=on_start_challage] if entity @s[tag=trust_player_control] run tellraw @s {"rawtext":[{"text":"§l§4[§cError§4]§r This function is running already"}]}
execute unless entity @a[tag=on_start_challage] if entity @s[tag=trust_player_control] unless score custom_music timer_settings matches 1 run playsound random.enderchestopen @s ~~~ 1 0.5
execute unless entity @a[tag=on_start_challage] if entity @s[tag=trust_player_control] if score custom_music timer_settings matches 1 run playsound timeru.function_system @s


# if the timer starts
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score no_armor timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§5Info§f]§r As soon as a piece of armor appears in an inventory, it's over!"}]}
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score no_block_break timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§5Info§f]§r No more blocks can be mined"}]} 
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score no_block_place timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§5Info§f]§r No more blocks can be placed!"}]} 
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score no_crafting timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§5Info§f]§r As soon as a crafting table appears in an inventory, it is over!"}]} 


execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score movement timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§5Info§f]§r If someone jump, the run is over!"}]}
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score movement timer_addon matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§3[§bInfo§3]§r If someone starts swimming, the run is over!"}]}
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score movement timer_addon matches 3 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§6[§aInfo§6]§r If someone starts sprinting, the run is over!"}]} 
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score movement timer_addon matches 4 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§5Info§f]§r You are no longer able to move"}]}
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score movement timer_addon matches 5 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§5Info§f]§r You are no longer able to move and look around"}]}



execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score sneak_same_death timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§cInfo§f]§r Sneak = Death Challenge, if one sneak it's all over!"}]} 
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score floor_is_lava timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§c[§6Info§c]§r floor = lava challenge is aktiv, lava spawns among all players"}]} 
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score enchant timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§1[§9Info§1]§r You play Enchant, your things are automatically enchanted"}]} 
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score gravity timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§2[§gInfo§2]§r Everything flies up into the air but you can get back down by sneaking, if you get too far, the ground is game over!"}]} 
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score ice_challenge timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§f[§bInfo§f]§r You play the Ice Challenge, ice spawns among all players"}]}
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score invisibility timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§7[§fInfo§7]§r Almost all entities are invisible in your world"}]} 
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score level_equals_border timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§c[§bWorld Boader§c]§r Your world is shrunk to one block and with each level the world expands"}]} 
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score speed_x timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§t[§3Info§t]§r Everything in your world receives the speed x effect, if you stand still for more than 10 seconds you die"}]}


execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score only timer_addon matches 1 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§u[§dInfo§u]§r Your height is restricted, if someone goes down, it's over"}]}
# Won't run if tickingarea is missing, players are loading it too late!
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score only timer_addon matches 1 in overworld run tickingarea add circle 0 -61 0 4 timer_for_fill true
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score only timer_addon matches 1 in overworld run fill -1 -63 -1 1 -63 1 oak_log ["pillar_axis"="x"]
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score only timer_addon matches 1 in overworld run fill -1 -60 -1 1 -62 1 air
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score only timer_addon matches 1 in overworld run tickingarea remove timer_for_fill
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score only timer_addon matches 1 in overworld run tp @a 0 -62 0
execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 if score only timer_addon matches 2 run tellraw @a[tag=trust_player_control] {"rawtext":[{"text":"§l§u[§dInfo§u]§r Your height is restricted, if someone goes up, it's over"}]}


execute if entity @a[tag=on_start_challage] if score mode timer_settings matches 0 run scriptevent timeru:timer_starts