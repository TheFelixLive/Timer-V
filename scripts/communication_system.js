/*------------------------
  Handshake for standallone = false
-------------------------*/

import { print } from "./helper_function.js";

export let standallone = true; // standallone mode is enabled by default

export async function timer_handshake() {
  if (standallone) {
    print("Timer: Receiving handshake!");
    world.scoreboard.addObjective("timer_handshake")

    await system.waitTicks(2);

    try {
      if (world.scoreboard.removeObjective("timer_handshake")) {
        print("Timer: Handshake timeout!");
        return -1
      }
    } catch {}

    print("Timer: Clientmode enabled!");
    standallone = false
  } else {
    print("Clientmode is already enabled!");
  }
}