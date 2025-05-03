# Timer Ulitmate: Timer, Stopwatch, Challenges and more
![Image](https://github.com/user-attachments/assets/84619188-3d94-4e33-b781-7b3b109c476e)

## About
Timer Ultimate is basically tool to track your time in your Minecraft World. However when you play Minecraft, you also play differently depending on your game mode.
That's why there are different timers: one for [survival](#survival-mode) and one for [creative](#creative-mode).

> [!TIP]
>  To control the timer, you can use different functions which are in this syntax: `/function timer/[...]`
>  or you use the **recommended menu**, which will open with `/function timer/menu`.
>  Make shure you have the right **[permission](#Permissions)**!



## Creative Mode
The creative mode is kind of a lightweight mode if you compare them. It's designed to allow multiple timers to be tracked simultaneously.
What do I mean by that? Player 1 can have a different time than Player 2. In fact, someone can pause their timer while another person's timer continues counting.
So much for the theory, let's talk about the home screen:

![Image](https://github.com/user-attachments/assets/f4102726-7c00-4bb6-941b-b167d8107cdc)

There we have the following Buttons:

<details><summary>Mode</summary>

This button allows you to **pause** or **resume** the timer, as well as **hide it** completely from the action bar.
>  If you are using global mode, pause and resume will also be applied to other players.

To switch between resume and pause you can also use:
```mcfunction
/function timer/mode
``` 
and for the visibly
```mcfunction
/function timer/visible
``` 

</details>

<details><summary>Addon</summary>

Here you can togelle some Modification on or off. It's a kind of mod menu, but again nothing compared to the other one.
| Name| Fullbright | Custom Music  | AFK |
|--------|--------|--------|--------|
|Description| Gives you permanent night vision | Replaces all sounds from the timer with the ones you specify | Pauses the timer automatically |
|Limitations| Enforced in global mode | Requires a compatible resource pack | Only available in local mode |
|Commands| `/function timer/mods/night_vision` || `/function timer/mods/afk`|

</details> 

<details><summary>Reset</summary>

As the title suggests it sets the timer to 0, which also can be used in global mode.
Additionally, [Admins](#Permissions) can remove the timer here. Just follow the instructions there and you're ready to go.

</details> 
 
<details><summary>Status / Time</summary>

> These ones are special feature and are only available to [admins](#Permissions)!

### Status (local mode)
Gives you an overview of every player in the world:
- Name (is the player name)
- Time (there courned timer)
- State (0 men paused and 1 resumed)
- Fullbright (0 means off and 1 on)
- Music (reprends Custom Music and 0 means off and 1 on)

### Time (global mode)
Isn't it ironic that the plugin is called **Timer** Ultimate and has nothing to do with a timer so far?
Now, if global mode is enabled, you can set a start time here, and it will count down from there.

![Image](https://github.com/user-attachments/assets/51ad6b9c-0129-40a2-8841-ac62740a58e8)

</details> 

<details><summary>Control</summary>

> This one is a special feature and is only available to [admins](#Permissions)!

It let you switch between local, global and world mode.
I promise it makes sense, [here](#different-modes)
Anyway if you want to run it via Commands:
```mcfunction
/function timer/system/control
``` 

</details> 

<details><summary>Dictionary</summary>

If you are really looking for a dictionary here, I have to disappoint you. It's like this page: a guide with changelog. Now you know!

</details> 

### Different modes





## Survival Mode

## Permissions
