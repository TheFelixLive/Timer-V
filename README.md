# Timer V - Timer, Stopwatch, Real time and more
<img src="https://github.com/user-attachments/assets/6e1c269f-858b-4e9b-94c0-30a4c13659e0" width="1920" height="auto" />

## About
When you think of a timer in Minecraft Bedrock, what comes to mind? Maybe a point in the future that you want to reach or something as banal as a stopwatch to keep you grounded.
My idea of ​​it is the **Timer V**, you could say it redefines what a timer should do do in Minecraft Bedrock.
Stay tuned and [let me know what](https://github.com/TheFelixLive/Timer-Ultimate/issues/new?template=feature_request.md) you think about it!

---

### Planned features
- Updates the save data of an older timer version (at start, 4.1.0 will be fully supported and it is planned to be rolled out further with each feature update)
- Third Party goals - Creatures from a behavior pack can also be selected as a goal (planed for `v.5.1.0` or `v.5.2.0`)
- Statistics e.g. stores, for example, which blocks were mined or placed or how far someone has travelled (planed for `v.5.x.0`)
- Players can create their own template (planed for `v.5.x.0`)
- A global search for all features of the timer (planed for `v.5.x.0`)
- The return of challenges (planed for `v.5.x.0`)

---

> [!IMPORTANT]
> If you are looking for Timer Ultimate (v.4.2.2 or older) please use [this guide](https://github.com/TheFelixLive/Timer-Ultimate/tree/d005c13a41b5fe50cac348d51a233ee79c1cc088) instead!


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
This is as far as possible always available. It lets you **pause or resume** your stopwatch or [if setuped the timer](#change-time).
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

## Goals
Guess what, you choose a goal from the following and when you defeat it or you finish the event, the timer stops automatically.
- Defeat a specific creature from Minecraft (e.g the Ender Dragon as you can see in the picture)
- Raid
- Survive a preset time (only when a timer is setuped)

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
| Requers Minecraft's native Hardcore mode | No, would not be available | No, would not be available | Yes | Yes | Yes |
| Maximum hearts available | 10 | 10 | 10 | 10 | 0,5 |
| Disabled regeneration | | | | Yes | Yes |

# Challenge Mode - Survival
Now we have everything setup how we want, we can start the timer by using `start challenge` in the menu:

![Image](https://github.com/user-attachments/assets/da7b8994-d1eb-4c65-9047-ae5e6f78435f)

Great! Our multiple day long adventure has begun.
- All player are in survival mode
- The timer is and all settings are up and running
- Day & Wetherciyle are now working
- In case of a [random goal](#goals) it is now shown for the first time

---

### Pause & more
Now to pause the timer we have to use the menu for that[^1]:

![Image](https://github.com/user-attachments/assets/b91e7668-194a-4b43-8f19-be344f0432ba)

> During a break, **all players** are put into `spectator` mode[^2]!

Speaking of which, we can see live what we have [setuped](#challenge-mode-sometimes-called-mode-survival-mode).
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
If you want to choose another goal, you can do that via the menu.

---


### Negative ending
There's a little more to this. Assuming a player has done something from this example list, you get a negative ending:
- dying (excluding [difficulty easy](#difficulty))
- give up via. the menu
- timer hits 0 while using [start time](#start-time) (unless you have set your goal to it, which would leads to a [positive ending](#positive-ending))

Whether you can continue playing in this world now depends now on the Hardcore mode.

![Image](https://github.com/user-attachments/assets/1a094ed0-da30-4451-9d61-8c9fffb3ae36)
> Was captured during a death with [difficulty](#difficulty) infinity in v.4.1.0, but it behaves almost identically in v5. The player name was subsequently removed

# Installation and configuration
1. **Download** the latest release from [here](https://github.com/TheFelixLive/Timer-Ultimate/releases/latest).

2. **Open** the `.mcpack` or `.mcaddon` file with Minecraft.
3. **Create** a new world OR edit an existing world with: <img src="https://github.com/user-attachments/assets/2def9d21-84ba-4222-92b6-c42bc3ada5bf" width="35"/>
4. **Navigate to**: <img src="https://github.com/user-attachments/assets/eeaba65d-f9a1-4e2f-9f6b-dc9e4a7f8b04" width="120"/>
5. **Click on** "Available".
6. Activate the timer by using <img src="https://github.com/user-attachments/assets/67678b1f-7e2d-41e9-ac57-3a59bc1414b5" width="35"/> next to it.
7. **Have fun!**

# Credits
> [!NOTE]
> These are mainly german YouTubers, since the original version and the associated idea were actually in german.

- **The actual idea for the timer**: [Hasenzahn](https://www.youtube.com/watch?v=CZRczUj__P8)
- **Inspiration for the challenges**: [BastiGHG](https://www.youtube.com/@bastighg)

[^1]: This feature is experimental while using hardcore
[^2]: While hardcore, they remain survival but invulnerable, until a mob 1 shots you e.g. the warden
