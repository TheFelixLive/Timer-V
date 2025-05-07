# Timer Ulitmate: Timer, Stopwatch, Challenges and more
![Minecraft2025-05-0421-27-24-ezgif com-video-to-gif-converter(1)](https://github.com/user-attachments/assets/cc264e11-f5db-470d-a8ec-3c36d017ef0f)

## About

Timer Ultimate is basically tool to track your time in your Minecraft World. However when you play Minecraft, you also play differently depending on your game mode.
That's why there are different timers: one for [survival](#survival-mode---initial-setup) and one for [creative](#creative-mode).
It requires **at least** a version of Minecraft Bedrock `v.1.21.41`, so it is with the latest release `v.1.21.80` of Minecraft Bedorck **compatible**.
Click [here](#installation-and-configuration) for the installation!

> [!TIP]
>  To control the timer, you can use different functions which are in this syntax: `/function timer/[...]`
>  or you use the **recommended menu**, which will open with `/function timer/menu`.
>  Make shure you have the right **[permission](#permissions)**!


# Creative Mode
The creative mode is kind of a lightweight mode if you compare them. It's designed to allow multiple timers to be tracked simultaneously.
What do I mean by that? Player 1 can have a different time than Player 2. In fact, someone can pause their timer while another person's timer continues counting[^1].
So much for the theory, let's talk about the home screen:

![Image](https://github.com/user-attachments/assets/f4102726-7c00-4bb6-941b-b167d8107cdc)

Here we have the following buttons, these can be different depending on your [rights](#permissions) you may or may not have and the current [submode](#local-mode)


## Mode
This button allows you to **pause** or **resume** the timer, as well as **hide it** completely from the action bar.
>  If you are using [global mode](#global-mode), pause and resume will also be applied to other players.

To switch between resume and pause you can also use:
```mcfunction
/function timer/mode
``` 
and for the visibly
```mcfunction
/function timer/visible
``` 

## Addon
Here you can togelle some Modification on or off. It's a kind of mod menu, but again nothing compared to the other one.
| Name| Fullbright | Custom Music  | AFK |
|--------|--------|--------|--------|
|Description| As long as the timer is running, you will have night vision | Replaces all sounds from the timer with the ones you specify | Pauses the timer automatically |
|Limitations| Enforced in [global mode](#global-mode) | Requires a compatible resource pack | Only available in [local mode](#local-mode) |
|Commands| `/function timer/mods/night_vision` || `/function timer/mods/afk`|

## Reset
As the title suggests it sets the timer to 0, which also can be used in [global mode](#global-mode).

## Status / Time

> [!IMPORTANT]
>  These ones are special feature and are only available to [admins](#permissions)!

### Status ([local mode](#local-mode))
Gives you an overview of every player in the world:
- Name (is the player name)
- Time (there courned timer)
- State (0 means paused and 1 resumed)
- Fullbright (0 means off and 1 means on)
- Music (reprends Custom Music; 0 means off and 1 means on)

Can also be triggered via:
```mcfunction
/function timer/system/testfor
``` 

---
### Time ([global mode](#global-mode))
Isn't it ironic that the plugin is called **Timer** Ultimate and has nothing to do with a timer so far?
Now, if global mode is enabled, you can set a start time here, and it will count down from there.

![Image](https://github.com/user-attachments/assets/51ad6b9c-0129-40a2-8841-ac62740a58e8)

## Control
> [!IMPORTANT]
> This one is a special feature and is only available to [admins](#permissions)!

Well this button let you switch between thoes 3 submodes.
OR you use that Command:
```mcfunction
/function timer/system/control
``` 
---

### Local mode
This is the default mode and it allows every player in the world to have and control their own timer.

---

### Global mode
The [admin](#permissions) who activates it shares their timer with all other players in the world. Under this condition, **[only admins](#permissions)** can control it and also [count down](#time-global-mode) the timer. Only the [admin](#permissions) who activated it can deactivate or change to an other mode, as this timer is synchronized with his own [^2].

---

### World mode
This mode displays the internal play time in a world. For this reason, any option to pause the timer is disabled.


## Dictionary
If you are really looking for a dictionary here, I have to disappoint you. It's like this page: a guide with changelog. Now you know!

![Image](https://github.com/user-attachments/assets/0f29adee-5d46-486c-b391-7a889befde2e)



# Survival Mode - initial setup
> [!NOTE]
> During the entire setup period, the game time and the weather will not change.

Where do I start with this, there is a lot to cover...
So the basic idea is that at the beginning of your survival world, you set a goal that you want to achieve. The timer in this case makes it easier or more difficult for you to reach your goal. Click [here](#survival-mode---survival) to go with the default setup.
Otherwise let's cover everything we **can do before** we start our survival journey. That's the Main Menu:

![Image](https://github.com/user-attachments/assets/72b5df6b-6ded-4d3a-bca5-35d92c3ab737)

## Goals
It's pretty self-explanatory, you choose a goal from the following and when you defeat it or you finish the event, the timer stops automatically.
- Ender Dragon
- Wither
- Elder Guardian
- Warden
- Raid

In addition, it can be randomly generated (which is the default one and will be revealed [here](#survival-mode---survival)), survive a period of time (the [period](#start-time) have to be set first) or be indefinite, where you have to finish the timer while playing.
You can also switch the goals by using:
```mcfunction
/function timer/settings/goal
``` 


## Start-Time
It is the same as in [Creative mode](#time-global-mode). You set your period of time here and it will count down from there. If the timer hit's 0 is [over](#negative-ending). 
> [!TIP]
> After you have selected a period of time, you can also choose the goal to survive that time

## Difficulty
> [!NOTE]
>  This feature was developed for an older version of Minecraft Bedrock which **didn't have** a hardcore mode, which makes it a bit unnecessary

Here you can change your difficulty and yes it does more than make mobs stronger:

| Name | Easy | Normal (default) | Hardcore | Ultra Hardcore | Infinity |
|--------|--------|--------|--------|--------|--------|
| Minecraft difficulty | Easy | Normal | Hard | Hard | Hard |
| In case of a [negative end](#negative-ending) | Resets the timer | Resets the timer | Locks the world | Locks the world | Locks the world |
| Complicates regeneration | | | | Yes | Yes* |
| Died with any damage | | | | | Yes |

You can also switch the difficultys by using:
```mcfunction
/function timer/settings/difficulty
``` 

> [!CAUTION]
>  [*] Sometimes Infinity doesn't recognize that someone has taken damage. In this case, it behaves like Ultra Hardcore

## Addons
This is for toggling your Modification on or off and manage your installed Challenges, kind of mod menu.
> [!TIP]
> Modifications can also be changed during the timer, whereas in contrast to challenges you can only check whether they are active
### Mods
| Name| Fullbright | Custom Music  | AFK |
|--------|--------|--------|--------|
|Description| As long as the timer is running, you will have night vision | Replaces all sounds from the timer with the ones you specify | Pauses the timer automatically |
|Limitations| | Requires a compatible resource pack | Pauses the timer for all |
| Allowed in speedruns ||Yes |
|Commands| `/function timer/mods/night_vision` || `/function timer/mods/afk`|

> Challenges are not pre installed! Check out the [Challenge Addon](#survival-mode---addons) for that.

## Dimension
A quick way to start your adventure e.g. in the nether. _If you're tired of the overworld_
You can also switch the dimensions by using:
```mcfunction
/function timer/settings/dimension
``` 

![Image](https://github.com/user-attachments/assets/af78f566-f872-4308-928a-064c10be5720)

> [!WARNING]
> "The  End" as a dimension is intentionally unavailable due to instability

## Speedrun
This tweak can only be activated immediately after creating the world. It activates milliseconds for your best time possible and <ins>deactivates</ins> the following features:
- Start-Time
- Pausing the timer
- <ins>Some</ins> Modifications (see [here](#addons))
- Challenges
- Dimentions
- Difficulty
- Goal nothing and period of time
- Menu

# Survival Mode - Survival
Now we have everything setup how we want, we can start the timer by using the menu:

![Image](https://github.com/user-attachments/assets/3e6c4238-fca3-455d-9bb2-65a07d96669c)

OR running:
```mcfunction
/function timer/control
``` 

Great! Our multiple day long adventure has begun.
- All player are in surival mode
- All twecks, modifications & challenges are up and running
- Day & Wetherciyle are now working
- In case of a [random goal](#goals) it is now shown for the first time

---

### Pause & more
Now to pause[^3] the timer we can run the command again:
```mcfunction
/function timer/control
``` 
OR:
- change the gamemode
- go afk[^4]
- by opening the menu

> During a break, **all players** are put into `spectator` mode and cannot move!

Speaking of the menu, we can now use it or run any function we used in the initial setup to ask there status.
Moveover in the menu we could give up, what results in a [negative ending](#negative-ending) or reach that [undefinite goal](#goals).

![Image](https://github.com/user-attachments/assets/62cfe2bd-89d0-43a8-81e1-e3055908b88b)

# Survival Mode - Endings
Different endings may occur depending on what you did [during the game](#survival-mode---survival) or what you set [beforehand](#survival-mode---initial-setup).
In short, you can divide these ends into the following categories:

### Positive ending
This end occurs when you have met the goal requirements.

![Image](https://github.com/user-attachments/assets/63dcf22e-4f4b-4414-9ec4-ba3ca92389ad)
> Was captured with the goal Ender Dragon after defeating it

As you can see in the images, all players change their game mode to Creative immediately after reaching the goal.
The idea behind this ending is that you now revisit this world.
If you want to choose another goal, you can return to the main menu via the menu (what a saying) and the following command:
```mcfunction
/function timer/control
``` 

---


### Negative ending
There's a little more to this. Assuming a player has done something from this example list, you get a negative ending:
- dying (excluding [difficulty easy](#difficulty))
- give up via. the menu
- timer hits 0 while using [start time](#start-time) (unless you have set your goal to it, which would leads to a [positive ending](#positive-ending))
- ignore aktived [challenges](#survival-mode---addons)

Whether you can continue playing in this world depends now on your [difficulty](#difficulty). Look in the [table](#difficulty) for "In case of a negative end".

![Image](https://github.com/user-attachments/assets/1a094ed0-da30-4451-9d61-8c9fffb3ae36)
> Was captured during a death with [difficulty](#difficulty) infinity. The player name was subsequently removed

# Survival Mode - Addons
To start thinks off the Challenge Addon is another Behavior Pack, which added addition challenges to the timer. It can be downloaded or installed together with the timer or separately, both are available in the [releases](https://github.com/TheFelixLive/Timer-Ultimate/releases/latest).
Regardless of that, what are new challenges in this context?
In a nutshell, challenges add variety to the game. How big of an impact they have depends on the challenge itself. Therefore, here's a list of all 19 challenges and what they do.

| Name | Description | Limitations | Command | Extra notes |
|--------|--------|--------|--------|--------|
| No armor | If someone has a piece of armor in their inventory the timer will end | | `/function ca/addon/no/armor` | |
| No block break | Disables the bracking of blocks || `/function ca/addon/no/block_break` | |
| No block place | Disables the placement of blocks || `/function ca/addon/no/block_place` | |
| No crafting table | If someone has a crafting table in their inventory the timer will end | In some structures there are crafting tables that you could exploit | `/function ca/addon/no/crafting` | |
| No jumping | If someone jumps the timer will end | Only one restriction from the movement category can be selected! | `/function ca/addon/no/move` | Is part of the category Movement |
| No swimming | If someone swimms the timer will end | Only one restriction from the movement category can be selected! | `/function ca/addon/no/move` | Is part of the category Movement |
| No sprinting | If someone sprints the timer will end | Only one restriction from the movement category can be selected! | `/function ca/addon/no/move` | Is part of the category Movement |
| No movement | Disables the movement of all players | Only one restriction from the movement category can be selected! | `/function ca/addon/no/move` | Is part of the category Movement |
| No movement & viewing | Disables the movement and view option of all players | Only one restriction from the movement category can be selected! | `/function ca/addon/no/move` | Is part of the category Movement |
| No sneaking | If someone sneaks the timer will end | Incompatible with ice & gravity  | `/function ca/addon/no/move` |  |
| Only up | Teleports all players to the lowest block in the world at the start. Every block they go up, they are no longer allowed to go down. | Only one restriction from the only category can be selected! | `/function ca/addon/only` |  Is part of the category Only |
| Only down | Every block a player goes down,is he no longer allowed to go up. | Only one restriction from the only category can be selected! | `/function ca/addon/only` |  Is part of the category Only |
| Speed X | Everything gets speed x, whoever doesn't take advantage of this will lose the timer | Incompatible with Level = Boder | `/function ca/addon/speed_x` | |
| The floor is lava | The title says it all | Is not very stable | `/function ca/addon/BiL` |  |
| Enchant | Each tool is enchanted as best as possible | | `/function ca/addon/enchant` |  |
| Gravity | Everything flies up, whoever sneaks comes down but the ground is your enemy | Incompatible with ice & no sneaking | `/function ca/addon/gravity` |  |
| Ice | When you sneak, a layer of ice appears under you | Incompatible with gravity & no sneaking | `/function ca/addon/ice` |  |
| Invisibility | Almost all creatures are invisible | | `/function ca/addon/invisibility`|  |
| Level = Boder | The world shrinks to one block and each level enlarges the world | Incompatible with Speed X | `/function ca/addon/levelborder` |  |

Wait, what was that about the border?
Yes, you were paying attention. Here's a picture of the border that was specially created for this.

![Image](https://github.com/user-attachments/assets/4adb21cc-6ba6-451f-a6da-856cb1f19a42)


# Installation and configuration
1. **Download** the latest release from [here](https://github.com/TheFelixLive/Timer-Ultimate/releases/latest).

2. **Open** the `.mcpack` or `.mcaddon` file with Minecraft.
3. **Create** a new world OR edit an existing world with: <img src="https://github.com/user-attachments/assets/2def9d21-84ba-4222-92b6-c42bc3ada5bf" width="35"/>
4. **Navigate to**: <img src="https://github.com/user-attachments/assets/eeaba65d-f9a1-4e2f-9f6b-dc9e4a7f8b04" width="120"/>
5. **Click on** "Available".
6. Activate the timer (if you want the Challenge Addon as well) by using <img src="https://github.com/user-attachments/assets/67678b1f-7e2d-41e9-ac57-3a59bc1414b5" width="35"/> next to it. If you use the Challenge Addon make sure that it is above the timer
7. Back on the "Active" page press on this icon next to the timer: <img src="https://github.com/user-attachments/assets/03ff7112-981b-4c01-a6e9-bd6df7a30c09" width="35"/>

**Here you can choose between [survival](#survival-mode---initial-setup) and [creative](#creative-mode).**

![Image](https://github.com/user-attachments/assets/f59543ef-3abb-4fd7-b6d2-a8907b9c7075)

> [!IMPORTANT]
> When you use the  "Challenge Addon" select [survival](#survival-mode---initial-setup) otherwise it will not work!

# Uninstallation 
Since the timer installs automatically, it cannot be easily removed.
Before you presite **make sure** you have the [right permission](#permissions)!

> [!CAUTION]
> In some cases the timer **can't** be uninstalled and therefore **should not be** deactivated.
> _Unless you realy want to cheat!_

### Steps

1. Run the command: `/funtion timer/menu`
2. Click on the "Delete" Button.
3. Confirm your decision by pressing Delete again.
4. Quit the world.
5. Remove the behavior pack from your world.
6. Relaunch the world.
7. Run the command: `/scoreboard objectives remove timer_setup`

### Troubleshooting
> I didn't found the "Delete" Button in step 2!

Sometimes it is on the 2nd page or in the reset category.
- If you have the option "Status", press it and then "Give up". Now try to continue with step 1.
- If you have the option "Game & Menu", press it and continue with step 2.

> Do I have to uninstall the Challenge Addon separately?

No, it will uninstall automatically along with the timer.

# Permissions
When the timer is installed on a world for the first time one player gets the tag `trust_player_control`. With this tag, players have the opportunity to use extra functions in **[creative mode](#creative-mode)**.
Those are marked in this guid with an admin popup ([see here as an example](#Control)).

In **[survival mode](#survival-mode---initial-setup)** players without the tag can do nothing except pausing the timer with the [afk modification](#mods).

To promote a player you can enter the following command, _remember to replace the player name_:
```mcfunction
/tag [player name] add trust_player_control
``` 

> [!WARNING]
> Players with this tag also have the power to uninstall the timer as well!

# Third party implementations
![Image](https://github.com/user-attachments/assets/c589e87d-def1-4338-ae47-9aa7b30387ca)

I know it's a little niche and unnecessary but as a (small) developer (if you can call it that) you have 2 (technically 3) interfaces from the timer that you can integrate into your code. Check it [here](./Timer%20Ultimate/sample%20resource%20pack) out.
- the challenge addon
- custom music
- (custom language)
> For the 3th one are references in the survival and challenge addon code but it's not finished.

# Credits
> [!NOTE]
> These are mainly german YouTubers, since the original version and the associated idea were actually in german.

- **The actual idea for the timer**: [Hasenzahn](https://www.youtube.com/watch?v=CZRczUj__P8)
- **Inspiration for the challenges**: [BastiGHG](https://www.youtube.com/@bastighg)

[^1]: Only while using [local mode](#local-mode)
[^2]: If the timer has previously [counted down](#time-global-mode), the timer will not be synchronized because this function is <ins>not available</ins> in local mode
[^3]: Only possible, regardless of the method, if [Speedrun](#speedrun) is not active
[^4]: Only when the [modification](#mods) AFK is activ
> All images were taken in-game with version v.1.21.73
