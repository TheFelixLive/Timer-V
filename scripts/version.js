export const version_info = {
  name: "Timer V",
  version: "v.5.4.0",
  build: "B032",
  release_type: 0, // 0 = Development version (with debug); 1 = Beta version (with adds); 2 = Stable version
  unix: 1760128965,
  uuid: "c4d3852f-f902-4807-a8c8-51980fdae4c3",
  edition: 0, // 0 = Normal Edition; 1 = BastiGHG Edition
  changelog: {
    // new_features
    new_features: [
      "Achievements can now be earned with this add-on",
      "Time zones can now be determined automatically",
      "The About page got a redesign"
    ],
    // general_changes
    general_changes: [
      "World time can now be used in challenges and as a shared timer.",
      "World time can no longer be displayed for individual players",
      "World time is now the default if the world is less than 10 minutes old",
      "Permissions are now handled by Minecraft",
      "Removed Permission Menu",
      "Added multiple menu support for v2.0"
    ],
    // bug_fixes
    bug_fixes: [
      "Fixed a bug that caused the setup to not finish correctly at 90%",
      "Fixed a bug where the timer may fail to update player data",
      "Fixed a bug where the timer chrashed when the time couldn't be saved to a player profile",
    ]
  }
}

export const links = [
  {name: "§l§5Github:§r", link: "github.com/TheFelixLive/Timer-V"},
  {name: "§8Curseforge:§r", link: "curseforge.com/projects/1259478"},
  {name: "§aMcpedl:§r", link: "mcpedl.com/timer"},
]