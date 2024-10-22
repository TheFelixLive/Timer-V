import {world,system} from "@minecraft/server";

let ms = system.currentTick * 5;
let sec = 0;
let min = 0;
let h = 0;
let d = 0;
let is_available = 1;

function mainTick() {
  // calculated time
  ms = ms + 5;

  while (100 <= ms) {
    ms = ms - 100;
    sec = sec + 1;
  }

  while (60 <= sec) {
      sec = sec - 60;
      min = min + 1;
  }

  while (60 <= min) {
      min = min - 60;
      h = h + 1;
  }

  while (24 <= h) {
      h = h - 24;
      d = d + 1;
  }

  let timer_time_ms = world.scoreboard.getObjective("timer_time_ms");
  let timer_time_sec = world.scoreboard.getObjective("timer_time_sec");
  let timer_time_min = world.scoreboard.getObjective("timer_time_min");
  let timer_time_h = world.scoreboard.getObjective("timer_time_h");
  let timer_time_d = world.scoreboard.getObjective("timer_time_d");

  let timer_menu = world.scoreboard.getObjective("timer_menu");
  let timer_do_count = world.scoreboard.getObjective("timer_do_count");

  let timer_setup = world.scoreboard.getObjective("timer_setup");

  // Decet a crash 
  if (!timer_time_ms | !timer_time_sec | !timer_time_min | !timer_time_h | !timer_time_d | !timer_menu | !timer_do_count) {
    is_available = 0;
  }


  // Sync calculated time with timer
  if (is_available === 1) {

    if (timer_menu.getScore("host_mode") === 2 && timer_do_count.getScore("host") >= 0) {
    
      timer_time_ms.setScore("host", ms);
      timer_time_sec.setScore("host", sec);
      timer_time_min.setScore("host", min);
      timer_time_h.setScore("host", h);
      timer_time_d.setScore("host", d);
    }
  }

  if (timer_time_ms | timer_time_sec | timer_time_min | timer_time_h | timer_time_d | timer_menu | timer_do_count) {
    is_available = 1;
  }


  system.run(mainTick);
}

system.run(mainTick);