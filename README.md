# Timer Ulitmate: Timer, Stopwatch, Challenges and more
![Image](https://github.com/user-attachments/assets/84619188-3d94-4e33-b781-7b3b109c476e)

## About
Timer Ultimate is basically tool to track your time in your Minecraft World. However when you play Minecraft, you also play differently depending on your game mode.
That's why there are different timers: one for [survival](#survival-mode---initial-setup) and one for [creative](#creative-mode).

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
Additionally, [Admins](#permissions) can remove the timer here. Just follow the instructions there and you're ready to go.

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
It is the same as in [Creative mode](#time-global-mode). You set your period of time here and it will count down from there. If the timer hit's 0 is over. 
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

> Challenges are not pre installed! Check out the Challenge Addon for that.

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
This end occurs when you have met the goal requirements

---


### Negative ending







# Survival Mode - Addons

# Permissions

# Third party implementations

# Credits


[^1]: Only while using [local mode](#local-mode)
[^2]: If the timer has previously [counted down](#time-global-mode), the timer will not be synchronized because this function is <ins>not available</ins> in local mode
[^3]: Only possible, regardless of the method, if [Speedrun](#speedrun) is not active
[^4]: Only when the [modification](#mods) AFK is activ
