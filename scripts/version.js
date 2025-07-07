export const version_info = {
  name: "Timer V",
  version: "v.5.3.0",
  build: "B028",
  release_type: 0, // 0 = Development version (with debug); 1 = Beta version (with adds); 2 = Stable version
  unix: 1751897635,
  update_message_period_unix: 15897600, // Normally 6 months = 15897600
  uuid: "c4d3852f-f902-4807-a8c8-51980fdae4c3",
  edition: 0, // 0 = Normal Edition; 1 = BastiGHG Edition
  changelog: {
    // new_features
    new_features: [
      "New menu structure"
    ],
    // general_changes
    general_changes: [
      "Added Multiple Menu Support",
      "The Main menu will now be hidden if nessessary",
      "The music in some menus has been changed",
      "Language data has been improved",
      "Added UUID to the about page"
    ],
    // bug_fixes
    bug_fixes: [
      "Fixed a bug that cause the menu to crash when the counting type was changed and the timer or stopwatch not paused",
      "Fixed a bug that caused design templates to be unnecessarily saved to local storage when a player changed a settings related to the actionbar"
    ]
  }
}

export const links = [
  {name: "§l§5Github:§r", link: "github.com/TheFelixLive/Timer-V"},
  {name: "§8Curseforge:§r", link: "curseforge.com/projects/1259478"},
  {name: "§aMcpedl:§r", link: "mcpedl.com/timer"},
]