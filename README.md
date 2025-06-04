<<<<<<< HEAD
# Timer V - Timer, Stopwatch, Real time and more
<img src="https://github.com/user-attachments/assets/6e1c269f-858b-4e9b-94c0-30a4c13659e0" width="1920" height="auto" />

## About
When you think of a timer in Minecraft Bedrock, what comes to mind? Maybe a point in the future that you want to reach or something as banal as a stopwatch to keep you grounded.
My idea of ​​it is the **Timer V**, you could say it redefines what a timer should do do in Minecraft Bedrock.
Stay tuned and [let me know what](https://github.com/TheFelixLive/Timer-Ultimate/issues/new?template=feature_request.md) you think about it!
=======
# Timer Ulitmate: Timer, Stopwatch, Challenges and more
<img src="https://github.com/user-attachments/assets/cc264e11-f5db-470d-a8ec-3c36d017ef0f" width="1920" height="auto" />

## About

Timer Ultimate is basically tool to track your time in your Minecraft World. However when you play Minecraft, you also play differently depending on your game mode.
That's why there are different timers: one for [survival](#survival-mode---initial-setup) and one for [creative](#creative-mode).
It requires **at least** a version of Minecraft Bedrock `v.1.21.41`, so it is with the latest release of Minecraft Bedorck **compatible**.
Click [here](#installation-and-configuration) for the installation!

> [!TIP]
>  To control the timer, you can use different functions which are in this syntax: `/function timer/[...]`
>  or you use the **recommended menu**, which will open with `/function timer/menu` and in [survival mode](#survival-mode---initial-setup) by jumping and sneaking at the same time.
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

<img src="https://github.com/user-attachments/assets/51ad6b9c-0129-40a2-8841-ac62740a58e8" width="1920" height="auto" />

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
>>>>>>> main

---

### Planned features
- Updates the save data of an older timer version (at start, 4.1.0 will be fully supported and it is planned to be rolled out further with each feature update)
- Third Party goals - Creatures from a behavior pack can also be selected as a goal (planed for `v.5.1.0` or `v.5.2.0`)
- Statistics e.g. stores, for example, which blocks were mined or placed or how far someone has travelled (planed for `v.5.x.0`)
- Players can create their own template (planed for `v.5.x.0`)
- A global search for all features of the timer (planed for `v.5.x.0`)
- The return of challenges (planed for `v.5.x.0`)

---

### Update?
If you are actively looking for the Timer Ultimate (v.4.2.2 or older), please use [this guide](https://github.com/TheFelixLive/Timer-Ultimate/tree/9dd11eccb10fe2d0877da4243555df7bc23d7413) instead!
When you are using such a version, it can be simply updated be [follow these](#updating) steps.


# Setup
First impressions are everything, so let's start with that. The timer greets each player with this or a slightly modified menu. This should sound familiar to old hands, as you as an admin can switch between Surivial and Creative.
If you can't do anything with it, that's no problem. You can simply continue with the default settings by closing the menu, as we will cover everything in this guide. _Note: If you are using a **hardcore world**, please continue with [this](#challenge-mode-sometimes-called-mode-survival-mode) instead!_

![Image](https://github.com/user-attachments/assets/10ff20dd-b433-43cb-b36b-f8d60cf96047)

# Control
From now on every player can open the menu of the timer at any time using these methots:
- jumping and sneaking at the same time (jump gesture)
- by interacting using a stick (right click)
- by nodding (only in specator mode)
- entering `/scriptevent timerv:menu`

# Usual main menu
![Image](https://github.com/user-attachments/assets/6eb92f84-19f6-44b9-b4cb-83069312487d)

Let's break this down into pieces. What do these buttons?

## Condition
This is as far as possible always available. It lets you **pause or resume** your stopwatch or [if set up the timer](#change-time).
If it's not available, you shouldn't have a reason to.

## Reset \<stopwatch or timer\>
Should be pretty self-explanatory, just **reset** your timer or stopwatch to 0 and is therefore only available if the timer is not already at 0

## Change time
Remember how I said at the beginning that a timer is a point in the future that you want to reach? **This point** can be set here and increased or decreased at any time later. In fact, it can also be combined with the [shared timer](#special-ones) function.

## Special ones:

| Buttonname | Available | Function |
|--------|--------|--------|
| Intelligent condition | If no timer is shared and [challenge mode](#challenge-mode-sometimes-called-mode-survival-mode) is not used | If you have forgotten to pause your timer or stopwatch, it is no longer a problem because Intelligent Condition now takes care of this and pauses your timer or stopwatch and automatically resumes it. |
| Shared timer | Only for [admins](#permission) and when the [challenge mode](#challenge-mode-sometimes-called-mode-survival-mode) is not used | This feature shares your timer with all other players on the world. If this is active, only admins can now manage the timer e.g. the [condition](#condition) |
| Challenge mode | Only for [admins](#permission) if one of them is shareing there timer | Challenge Mode can be activated also in the main menu, if you don't know what that is, [take a look](#challenge-mode-sometimes-called-mode-survival-mode)! |
| Clone real time | Only for [admins](#permission) who enabled [time](#show-day-time--time-source) in the actionbar and set the [sources to real time](#show-day-time--time-source) | Take a break from your device and go out. What time is it? If you enable this option the same time will be in Minecraft! |


# Settings
Settings are really always available and individual for each player so let's take a closer look what these buttons do!

<img src="https://github.com/user-attachments/assets/67cd5cd1-9eea-43d3-ad0f-9c686ed43079" width="1920" height="auto" />

## Type (sometimes called mode)
As the name suggests, you can set the counter type here, e.g. change from timer to stopwatch.
If no [timer is shared](#special-ones) and the [challenge mode](#challenge-mode-sometimes-called-mode-survival-mode) is not used you can also select: **World-time** 

## Permission
> [!NOTE]
> Only available for admins

So what the hell does that even mean "admins"? Well, admins are players who have special rights. Using the permission feature, these player can now also appoint other players to be an admin. There is also some general information available, e.g. when a player last played in the world.

<<<<<<< HEAD
> Operators (players who can, among other things, execute commands) or members do not necessarily have to be admins! I know it's a little confusing

## Time zone
> [!NOTE]
> Only available for admins

For example, in order to clone your realtime, Minecraft needs to know which time zone you are in. Normally you only setup that ones and leave it as it is.

## Fullbright
Gives you permanent night vision. What can I say about it? That it always works...

## Custom Sounds
Replaces all sounds from the timer with the ones you specify. It requires a compatible resource pack more on that [here](url)

## Actionbar
Long story short, it lets you change your entire actionbar:

![Image](https://github.com/user-attachments/assets/4b188043-851d-42ac-a7da-8d1fb2d83f78)

### Use actionbar
If this is switched off, the timer will continue to run normally, but will no longer be displayed in your actionbar

---

###  Show day time (& Time Source)
As you can see in the picture, a time (17:23 o'clock) is displayed after the splash screen, this is described as "daytime". Optionaly would you change that to your real time with Time Source.

---

### Change the look!
> [!WARNING]
> This function is only partially available, e.g. you cannot yet create your own designs but can choose from a list of 9 designs from previous versions. Will be added in a [future update](#planned-features)!

I'm really serious. This allows you to change how the timer displays time. For example, you could add a text like "Yay" to the actionbar when the timer runs over an hour.

# Challenge Mode (sometimes called mode survival mode)
> [!CAUTION]
> This mode heavily changes how the timer and the world behaves, as it was designed for Survival / Hardcore mode in Minecraft!
 
I think that should be enough settings to play around with so let's talk about challenge mode. Click [here](#special-ones) to find out how it can be enabled.
The basic idea is setting a goal that you want to achieve and the timer could makes it easier or more difficult for you to reach your goal.
On this occasion, let's take another look at the main menu to get an overview of everything we can do before starting our survival journey.

![Image](https://github.com/user-attachments/assets/33370d9a-0f22-4d50-8be0-c300aa6f13c9)
=======
<img src="https://github.com/user-attachments/assets/72b5df6b-6ded-4d3a-bca5-35d92c3ab737" width="1920" height="auto" />
>>>>>>> main

## Goals
Guess what, you choose a goal from the following and when you defeat it or you finish the event, the timer stops automatically.
- Defeat a specific creature from Minecraft (e.g the Ender Dragon as you can see in the picture)
- Raid
<<<<<<< HEAD
- Survive a preset time (only when a timer is set up)
=======

In addition, it can be randomly generated (which is the default one and will be revealed [here](#survival-mode---survival)), survive a period of time (the [period](#start-time) have to be set first) or be indefinite, where you have to finish the timer while playing.
You can also switch the goals by using[^5]:
```mcfunction
/function timer/settings/goal
```

>>>>>>> main

## Start-Time
It is the same as [change time](#change-time) except you can not change the time after you have started the challenge.
In summary you set your period of time here and it will count down from there. If the timer hit's 0 is [over](#negative-ending). 
> [!TIP]
> After you have selected a period of time, you can also choose the goal to survive that time

## Difficulty
Here you can change your difficulty and yes it does more than make mobs stronger:

| Name | Easy | Normal | Hardcore | Ultra Hardcore | Infinity |
|--------|--------|--------|--------|--------|--------|
| Minecraft difficulty | Easy | Normal | Hard | Hard | Hard |
<<<<<<< HEAD
| Requers Minecraft's native Hardcore mode | No, would not be available | No, would not be available | Yes | Yes | Yes |
| Maximum hearts available | 10 | 10 | 10 | 10 | 0,5 |
| Disabled regeneration | | | | Yes | Yes |

# Challenge Mode - Survival
Now we have everything setup how we want, we can start the timer by using `start challenge` in the menu:

![Image](https://github.com/user-attachments/assets/da7b8994-d1eb-4c65-9047-ae5e6f78435f)

Great! Our multiple day long adventure has begun.
- All player are in survival mode
- The timer is and all settings are up and running
=======
| In case of a [negative end](#negative-ending) | Resets the timer | Resets the timer | Locks the world | Locks the world | Locks the world |
| Complicates regeneration | | | | Yes |  |
| Died with any damage | | | | | Yes* |
| Notes | Not available in combination with Minecraft's native Hardcore mode | Not available in combination with Minecraft's native Hardcore mode | | | |

You can also switch the difficultys by using[^5]:
```mcfunction
/function timer/settings/difficulty
```

> [!CAUTION]
>  [*] Infinity ignores the Totem of undying, so don't feel so safe

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
|Commands| `/function timer/mods/night_vision` [^5] || `/function timer/mods/afk` [^5]|

> Challenges are not pre installed! Check out the [Challenge Addon](#survival-mode---addons) for that.

## Dimension
A quick way to start your adventure e.g. in the nether. _If you're tired of the overworld_
You can also switch the dimensions by using[^5]:
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

OR running[^5]:
```mcfunction
/function timer/control
```

Great! Our multiple day long adventure has begun.
- All player are in survival mode
- All twecks, modifications & challenges are up and running
>>>>>>> main
- Day & Wetherciyle are now working
- In case of a [random goal](#goals) it is now shown for the first time

---

### Pause & more
<<<<<<< HEAD
Now to pause the timer we have to use the menu for that[^1]:
=======
Now to pause[^3] the timer we can run the command again[^5]:
```mcfunction
/function timer/control
```
OR:
- change the gamemode
- go afk[^4]
- by opening the menu
>>>>>>> main

![Image](https://github.com/user-attachments/assets/b91e7668-194a-4b43-8f19-be344f0432ba)

> During a break, **all players** are put into `spectator` mode[^2]!

Speaking of which, we can see live what we have [set up](#challenge-mode-sometimes-called-mode-survival-mode).
Moveover in the menu we could give up, what results in a [negative ending](#negative-ending).

![Image](https://github.com/user-attachments/assets/cea9de99-2e72-47ce-bc70-5f2750cebfae)

# Challenge Mode - Endings
Different endings may occur depending on what you did [during the game](#challenge-mode---survival) or what you set [beforehand](#challenge-mode-sometimes-called-mode-survival-mode).
In short, you can divide these ends into the following categories:

### Positive ending
This end occurs when you have met the goal requirements.

![Image](https://github.com/user-attachments/assets/63dcf22e-4f4b-4414-9ec4-ba3ca92389ad)
> Was captured with the goal Ender Dragon after defeating it in v.4.1.0, but it behaves almost identically in v5

As you can see in the images, all players change their game mode to Creative[^2] immediately after reaching the goal.
The idea behind this ending is that you now revisit this world.
<<<<<<< HEAD
If you want to choose another goal, you can do that via the menu.
=======
If you want to choose another goal, you can return to the main menu via the menu (what a saying) and the following command[^5]:
```mcfunction
/function timer/control
```
>>>>>>> main

---


### Negative ending
There's a little more to this. Assuming a player has done something from this example list, you get a negative ending:
- dying (excluding [difficulty easy](#difficulty))
- give up via. the menu
- timer hits 0 while using [start time](#start-time) (unless you have set your goal to it, which would leads to a [positive ending](#positive-ending))

Whether you can continue playing in this world now depends now on the Hardcore mode.

![Image](https://github.com/user-attachments/assets/1a094ed0-da30-4451-9d61-8c9fffb3ae36)
> Was captured during a death with [difficulty](#difficulty) infinity in v.4.1.0, but it behaves almost identically in v5. The player name was subsequently removed

<<<<<<< HEAD
# Installation
=======
# Survival Mode - Addons
To start thinks off the Challenge Addon is another Behavior Pack, which added addition challenges to the timer. It can be downloaded or installed together with the timer or separately, both are available in the [releases](https://github.com/TheFelixLive/Timer-Ultimate/releases/latest).
Regardless of that, what are new challenges in this context?
In a nutshell, challenges add variety to the game. How big of an impact they have depends on the challenge itself. Therefore, here's a list of all 8 challenges and what they do.

> [!NOTE]
> This table was changed with the introduction of movement restrictions in v.4.2.0.
> If you are using an older version, please refer to [this table](https://github.com/TheFelixLive/Timer-Ultimate/tree/v.4.1.1?tab=readme-ov-file#survival-mode---addons) instead.

### Challenges:
| Name | Description | Limitations | Command |
|--------|--------|--------|--------|
| Movement | Lets you restrict your movement individually by choosing from [18 different aspects](#movement-restrictions) | Some restrictions are incompatible with some challenges | |
| Speed X | Everything gets speed x, whoever doesn't take advantage of this will lose the timer | Incompatible with Level = Boder | `/function ca/addon/speed_x` [^5] |
| The floor is lava | The title says it all | Is not very stable | `/function ca/addon/BiL` [^5] |
| Enchant | Each tool is enchanted as best as possible | | `/function ca/addon/enchant` [^5] |
| Gravity | Everything flies up, whoever sneaks comes down but the ground is your enemy | Incompatible with ice & no sneaking | `/function ca/addon/gravity` [^5] |
| Ice | When you sneak, a layer of ice appears under you | Incompatible with gravity & no sneaking | `/function ca/addon/ice` [^5] |
| Invisibility | Almost all creatures are invisible | | `/function ca/addon/invisibility` [^5]|
| Level = Boder | The world shrinks to one block and each level enlarges the world | Incompatible with Speed X | `/function ca/addon/levelborder` [^5] |

### Movement restrictions:
There are in toal 18 different restrictions available and by default no one is active, so you have to `Add` them. When you find something interesting you get short description what it's restricts and you can choose between **punishing** and **disable**. The difference lies in the behavior if the restriction is violated. If **disabled**, you simply cannot perform this action at all, and if **punishing** is seleced, the entire challenge get canceled.

| Name | Description | Supported modes | Incompatibility |
|--------|--------|--------|--------|
| Armor | Removes the ability to use armor | punishing & disable | |
| Block break | Triggered when a block is destroyed | punishing & disable | |
| Block place | Triggered when a block is placed | punishing & disable | |
| Interactions | Triggered when interacting with a block (e.g. with a chest) | punishing & disable | |
| Jumping | Triggered when when a player jumps | punishing & disable | |
| Water | Triggered when when a player touches water | punishing | |
| Sprinting | Triggered when when a player sprints | punishing | |
| Sneaking | Triggered when when a player sneaks | punishing & disable | Gravity &  Ice |
| General movement | Let you manage the left, right, forward, backward movement as well as the camera and mounting and unmounting on entities| disable | Speed X |
| Only | Every block a player goes down (or up), is he no longer allowed to go up (or down). | If you called that way: punishing  | Gravity & Timer [Dimension feature](#dimension) |


# Installation and configuration
>>>>>>> main
1. **Download** the latest release from [here](https://github.com/TheFelixLive/Timer-Ultimate/releases/latest).
2. **Open** the `.mcpack` or `.mcaddon` file with Minecraft.
3. **Create** a new world OR **edit** an existing world
4. **Navigate to**: Behavior packs.
5. **Click on** "Available"
6. **Activate** the timer

## Updating
> Please follow the steps from the [installation](#installation) before
7. **Disable** the old version *(e.g. Timer Ultimate)*
8. **Start** your world

<<<<<<< HEAD
**From here, please proceed with the on-screen instructions[^3]**

![Screenshot 2025-06-04 153655](https://github.com/user-attachments/assets/8a5b0ed3-c7a4-4a78-8b10-76f943388466)
=======
<img src="https://github.com/user-attachments/assets/f59543ef-3abb-4fd7-b6d2-a8907b9c7075" width="1920" height="auto" />

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
> [!Note]
> Please share your experience with multiplayer [here](https://github.com/TheFelixLive/Timer-Ultimate/issues/new/choose) as it has not been tested extensively yet!

![Minecraft 22 05 2025 18_41_02](https://github.com/user-attachments/assets/e2715c1d-7853-47cf-9225-969dcd3880e3)

When the timer is installed on a world for the first time one player gets the tag `trust_player_control`. With this tag, players have the opportunity to use extra functions in **[creative mode](#creative-mode)**.
Those are marked in this guid with an admin popup ([see here as an example](#Control)).

In **[survival mode](#survival-mode---initial-setup)** players without the tag can do nothing except pausing the timer with the [afk modification](#mods).

To promote a player you can use the menu (as shown in the pictures, only works in [survival](#survival-mode---initial-setup)) or enter the following command[^5], _remember to replace the player name_:
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
>>>>>>> main

# Credits

> [!NOTE]
> These are mainly german YouTubers, since the original version and the associated idea were actually in german.

- **The actual idea for the timer**: [Hasenzahn](https://www.youtube.com/watch?v=CZRczUj__P8)
- **Inspiration for the challenges**: [BastiGHG](https://www.youtube.com/@bastighg)

<<<<<<< HEAD
[^1]: This feature is experimental while using hardcore
[^2]: While hardcore, they remain survival but invulnerable, until a mob 1 shots you e.g. the warden
[^3]: You may need to confirm the update process several times. Under certain circumstances, not all data can be transferred.
=======
[^1]: Only while using [local mode](#local-mode)
[^2]: If the timer has previously [counted down](#time-global-mode), the timer will not be synchronized because this function is <ins>not available</ins> in local mode
[^3]: Only possible, regardless of the method, if [Speedrun](#speedrun) is not active
[^4]: Only when the [modification](#mods) AFK is activ
[^5]: To perform functions you need cheats, which are not available in Minecraft's native Hardcore mode.
>>>>>>> main
