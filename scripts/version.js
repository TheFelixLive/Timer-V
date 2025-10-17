export const version_info = {
  name: "Timer V",
  version: "v.5.4.2",
  build: "B038",
  release_type: 0, // 0 = Development version (with debug); 1 = Beta version (with adds); 2 = Stable version
  unix: 1760717279,
  uuid: "c4d3852f-f902-4807-a8c8-51980fdae4c3",
  edition: 0, // 0 = Normal Edition; 1 = BastiGHG Edition
  changelog: {
    // new_features
    new_features: [
      "Challenges can now be configured during the challenge",
    ],
    // general_changes
    general_changes: [
      "Added Support for CCS V2",
      "If the timer gets reseted after a failed challenge in world mode, the mode will now be set to the stopwatch"
    ],
    // bug_fixes
    bug_fixes: [
      "Fixed a bug where the timer automatily enters Challenge Mode after a reload",
      "Fixed an help translation",
      "Fixed a bug where an Challenge remained selectable even though an active Challenge declared it incompatible"
    ]
  }
}

export const links = [
  {name: "§l§5Github:§r", link: "github.com/TheFelixLive/Timer-V"},
  {name: "§8Curseforge:§r", link: "curseforge.com/projects/1259478"},
  {name: "§aMcpedl:§r", link: "mcpedl.com/timer"},
]