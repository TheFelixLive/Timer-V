import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"
import { version_info, links } from "./version.js";
import { load_save_data, update_save_data } from "./helper_function.js";
import { timezone_list } from "./time_zone.js";
import { translate_soundkeys } from "./sound";
import { setup_menu, settings_main, main_menu } from "./menu.js";

/*------------------------
 Kyes
-------------------------*/

export const supportedLangs = [
  {
    id: "en_us",
    name: "English (US)",
    ai: true
  },
  {
    id: "en_uk",
    name: "English (UK)",
    ai: false
  },
  {
    id: "de_de",
    name: "Deutsch (Deutschland)",
    creator: "TheFelixLive",
    ai: false
  },
  {
    id: "de_at",
    name: "Deutsch (Österreich)",
    ai: true
  },
  {
    id: "de_ch",
    name: "Deutsch (Schweiz)",
    ai: true
  },
  {
    id: "fr_fr",
    name: "Français (France)",
    ai: true
  },
  {
    id: "fr_be",
    name: "Français (Belgique)",
    ai: true
  },
  {
    id: "fr_ch",
    name: "Français (Suisse)",
    ai: true
  },
  {
    id: "fr_ca",
    name: "Français (Canada)",
    ai: true
  },
  {
    id: "it_it",
    name: "Italiano (Italia)",
    ai: true
  },
  {
    id: "es_cl",
    name: "Español (Chile)",
    ai: true
  },
  {
    id: "es_ve",
    name: "Español (Venezuela)",
    ai: true
  },
  {
    id: "es_ar",
    name: "Español (Argentina)",
    ai: true
  },
  {
    id: "es_mx",
    name: "Español (México)",
    ai: true
  },
  {
    id: "pt_pt",
    name: "Português (Portugal)",
    ai: true
  },
  {
    id: "pt_br",
    name: "Português (Brasil)",
    ai: true
  },
  {
    id: "is_is",
    name: "Íslenska (Ísland)",
    ai: true
  },
  {
    id: "el_gr",
    name: "Ελληνικά (Ελλάδα)",
    ai: true
  },
  {
    id: "ar_eg",
    name: "العربية (مصر)",
    ai: true
  },
  {
    id: "ar_sa",
    name: "العربية (السعودية)",
    ai: true
  },
  {
    id: "ar_ae",
    name: "العربية (الإمارات)",
    ai: true
  },
  {
    id: "fi_fi",
    name: "Suomi (Suomi)",
    ai: true
  },
  {
    id: "sv_se",
    name: "Svenska (Sverige)",
    ai: true
  },
  {
    id: "ru_ru",
    name: "Русский (Россия)",
    ai: true
  },
  {
    id: "ru_ua",
    name: "Русский (Украина)",
    ai: true
  },
  {
    id: "tr_tr",
    name: "Türkçe (Türkiye)",
    ai: true
  },
  {
    id: "fa_ir",
    name: "فارسی (ایران)",
    ai: true
  },
  {
    id: "ps_af",
    name: "پښتو (افغانستان)",
    ai: true
  },
  {
    id: "en_pk",
    name: "English (Pakistan)",
    ai: true
  },
  {
    id: "ur_pk",
    name: "اردو (پاکستان)",
    ai: true
  },
  {
    id: "en_in",
    name: "English (India)",
    ai: true
  },
  {
    id: "hi_in",
    name: "हिन्दी (भारत)",
    ai: true
  },
  {
    id: "si_lk",
    name: "සිංහල (ශ්‍රී ලංකා)",
    ai: true
  },
  {
    id: "ta_in",
    name: "தமிழ் (இந்தியா)",
    ai: true
  },
  {
    id: "ta_lk",
    name: "தமிழ் (இலங்கை)",
    ai: true
  },
  {
    id: "ne_np",
    name: "नेपाली (नेपाल)",
    ai: true
  },
  {
    id: "bn_bd",
    name: "বাংলা (বাংলাদেশ)",
    ai: true
  },
  {
    id: "en_au",
    name: "English (Australia)",
    ai: true
  },
  {
    id: "th_th",
    name: "ไทย (ประเทศไทย)",
    ai: true
  },
  {
    id: "vi_vn",
    name: "Tiếng Việt (Việt Nam)",
    ai: true
  },
  {
    id: "id_id",
    name: "Bahasa Indonesia",
    ai: true
  },
  {
    id: "zh_cn",
    name: "简体中文 (中国)",
    ai: true
  },
  {
    id: "en_sg",
    name: "English (Singapore)",
    ai: true
  },
  {
    id: "ms_sg",
    name: "Bahasa Melayu (Singapura)",
    ai: true
  },
  {
    id: "ta_sg",
    name: "தமிழ் (சிங்கப்பூர்)",
    ai: true
  },
  {
    id: "ja_jp",
    name: "日本語 (日本)",
    ai: true
  },
  {
    id: "ko_kr",
    name: "한국어 (대한민국)",
    ai: true
  },
  {
    id: "en_nz",
    name: "English (New Zealand)",
    ai: true
  },
  {
    id: "mi_nz",
    name: "Te Reo Māori (Aotearoa)",
    ai: true
  },
  {
    id: "to_to",
    name: "Lea Faka-Tonga",
    ai: true
  },
  {
    id: "en_ki",
    name: "English (Kiribati)",
    ai: true
  },
  {
    id: "gil_ki",
    name: "Gilbertese (Kiribati)",
    ai: true
  },
  {
    id: "ty_ty",
    name: "Reo Tahiti",
    ai: true
  }
];



const textkeys = {
  /*------------------------
  Messages
  -------------------------*/

  // Header
  "message.header.system": {
    "en": "System",
  },


  "message.header.system.client_mode": {
    "en": version_info.name,
  },


  "message.header.help": {
    "en": "Help",
  },


  "message.header.note": {
    "en": "Note",
  },


  "message.header.end": {
    "en": "End",
  },


  "message.header.condition": {
    "en": "Condition",
  },


  "message.header.error": {
    "en": "Error",
  },


  // Messages

  "message.body.help.open_menu": {
    "en": "You can always open the menu with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
  },


  "message.body.help.setup.closed": {
    "en": "The menu got closed! You can always open it again with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
  },


  "message.body.convert_global_to_local.error": {
    "en": "The time could not be synchronized with the player profile (%{name}%) and got deleted!",
  },


  "message.body.condition.resume": {
    "en": "The timer will resume!",
  },


  "message.body.condition.paused": {
    "en": "The timer is paused!",
  },

  "message.body.condition.expired": {
    "en": "The timer expired after %{time}% and has been paused",
  },

  "message.body.challenge_start": {
    "en": "The Challenge starts now!",
  },

  "message.body.challenge_start.goal.entity_prefix": {
    "en": "Defeat the ",
  },


  "message.body.challenge_start.goal.event": {
    "en": "Complete the following event: ",
  },

  "message.body.challenge_start.goal.event.time": {
    "en": "Survive: ",
  },

  "message.body.challenge_end.bad": {
    "en": "The challenge is over. Time invested: %{time}%. Thanks for playing.",
  },


  "message.body.challenge_end.time.good": {
    "en": "You did it! You persevered through the whole time and reached your goal!",
  },

  "message.body.challenge_end.time.bad": {
    "en": "The challenge is over because you went out of time. Thanks for playing.",
  },

  "message.body.challenge_end.raid": {
    "en": "You did it! You prevented the Raid and protected the village like a hero. Good Game!",
  },


  "message.body.challenge_end.player": {
    "en": "You guys really did it. Choosing and achieving such a stupid goal that %{name}% had to die for. I'm at a loss for words.",
  },


  "message.body.challenge_end.entity_0": {
    "en": "You did it! You defeated the ",
  },


  "message.body.challenge_end.entity_1": {
    "en": " in an epic battle! Good Game!",
  },


  // Title
  "message.title.condition.expired": {
    "en": "Timer expired",
  },


  "message.title.challenge_end.good": {
    "en": "§aYou Won!",
  },

  "message.title.challenge_end.bad": {
    "en": "§4Challenge has ended!",
  },



  /*------------------------
    Relative Time
  -------------------------*/

  "menu.relative_time.years": {
    "en": "%{time}% years",
  },

  "menu.relative_time.year": {
    "en": "about a year",
  },

  "menu.relative_time.months": {
    "en": "%{time}% months",
  },

  "menu.relative_time.month": {
    "en": "about a month",
  },

  "menu.relative_time.weeks": {
    "en": "%{time}% weeks",
  },

  "menu.relative_time.week": {
    "en": "about a week",
  },


  "menu.relative_time.days": {
    "en": "%{time}% days",
  },

  "menu.relative_time.day_more": {
    "en": "a bit more than a day",
  },

  "menu.relative_time.day_less": {
    "en": "almost a whole day",
  },

  "menu.relative_time.hours": {
    "en": "%{time}% hours",
  },

  "menu.relative_time.hour": {
    "en": "about an hour",
  },

  "menu.relative_time.hour_half": {
    "en": "about an hour and a half",
  },

  "menu.relative_time.minutes": {
    "en": "%{time}% minutes",
  },


  "menu.relative_time.minute": {
    "en": "about a minute",
  },

  "menu.relative_time.quarter_hour": {
    "en": "a quarter hour",
  },

  "menu.relative_time.half_hour": {
    "en": "half an hour",
  },

  "menu.relative_time.three_quarters_hour": {
    "en": "three quarters of an hour",
  },

  "menu.relative_time.few_seconds": {
    "en": "a few seconds",
  },

  "menu.relative_time.less_than_half_minute": {
    "en": "less than half a minute",
  },

  "menu.relative_time.half_minute": {
    "en": "about half a minute",
  },




  /*------------------------
    Menu - General
  -------------------------*/

  // Toggles
  "menu.toggle_on": {
    "en": "§aon",
  },

  "menu.toggle_off": {
    "en": "§coff",
  },


  "menu.toggle_dynamic": {
    "en": "§9dynamic",
  },

  "menu.toggle_restricted": {
    "en": "§orestricted",
  },

  "menu.item_selected": {
    "en": "§2(selected)",
  },


  "menu.item_experimental": {
    "en": "§o(experimental)",
  },

  "menu.button_skip": {
    "en": "Skip",
  },

  "menu.disable": {
    "en": "Disable",
  },

  "menu.enable": {
    "en": "Enable",
  },


  "menu.yes": {
    "en": "Yes",
  },

  "menu.no": {
    "en": "No",
  },

  "menu.button_continue": {
    "en": "Continue",
  },

  "menu.button_switch": {
    "en": "Switch to %{name}%",
  },

  "menu.general.description": {
    "en": "Select an option!",
  },

  "menu.warning": {
    "en": "Warning!",
  },

  "menu.start": {
    "en": "Start",
  },



  // Modes
  "menu.mode.stopwatch": {
    "en": "Stopwatch",
  },

  "menu.mode.timer": {
    "en": "Timer",
  },

  "menu.mode.world_time": {
    "en": "World time",
  },

  "menu.mode.day_time": {
    "en": "day time",
  },

  /*------------------------
    Multiple menu
  -------------------------*/

  "menu.multiple_menu.title": {
    "en": "Multiple menu %{version}%",
  },

  "menu.multiple_menu.description": {
    "en": "Select an addon to open it's menu",
  },

  /*------------------------
    Menu - render_task_list
  -------------------------*/

  "menu.render_task_list.difficulty.2": {
    "en": "§4Hard§ccore§f is active",
  },

  "menu.render_task_list.difficulty.3": {
    "en": "§cUltra §4Hardcore§f: A heart is lost forever",
  },

  "menu.render_task_list.difficulty.4": {
    "en": "§5Infinity§f: no damage",
  },

  "menu.render_task_list.goal.random": {
    "en": "§5Goal§f is random",
  },

  "menu.render_task_list.goal.entity": {
    "en": "§5Goal:§f Defeat: ",
  },

  "menu.render_task_list.goal.event": {
    "en": "§5Goal:§f ",
  },

  "menu.render_task_list.goal.event.time": {
    "en": "§aTime available:§f ",
  },

  "menu.render_task_list.goal.event.time.timer": {
    "en": "§aSurvive:§f ",
  },


  /*------------------------
    Menu - Setup
  -------------------------*/

  "menu.setup.title": {
    "en": "Initial setup",
  },


  "menu.setup.description": {
    "en": "Welcome %{name}%!\nDo you also think that this would be a good time to briefly introduce Timer V?\n\nThe timer should be pretty intuitive to use. That's why my recommendation is to try it rather than study it, just explore it yourself.\n\nIf this sounds a bit overwhelming feel free to check out the guide at "+links[0].link+"\n\n§7Best regards, TheFelixLive (the developer)",
  },


  "menu.setup.description.hardcore": {
    "en": "Welcome %{name}%!\nThis looks like your next hardcore adventure.\nBe aware that some features may work differently or may simply not be available.\n\n§7Best regards, TheFelixLive (the developer)",
  },


  /*------------------------
    Menu - Update popup
  -------------------------*/

  "menu.update.title": {
    "en": "Update time!",
  },

  "menu.update.description": {
    "en": "Your current version (" + version_info.version + ") is now %{time}% old.\nThere MIGHT be a newer version out. Feel free to update to enjoy the latest features!\n\nCheck out: §7" + links[0].link,
  },

  "menu.update.mute": {
    "en": "Mute",
  },


  /*------------------------
    Menu - UU
  -------------------------*/

"menu.uu.title": {
    "en": "Convert",
  },

"menu.uu.description": {
    "en": "It looks like you've used the timer before.\nDo you want to update your save data from %{old_version}% to " + version_info.version + "?\n\n§7Note: Once you update your save data to a newer version, you can no longer use it with the older version!",
  },

  "menu.uu.update": {
    "en": "Update",
  },

  "menu.uu.note.ca": {
    "en": "Challenge settings could not be transferred because they are not currently supported",
  },

  "menu.uu.data_lost.title": {
    "en": "Some data will be lost!",
  },

  "menu.uu.data_lost.description": {
    "en": "This version contains save data for a total of %{totalPlayers}% players, %{onlinePlayers}% of which are online.\nOnly save data from players who are online can be transferred.\n\nThis would result in a data loss of §l§c%{dataLossPercent}% Percent§r!",
  },

  "menu.uu.compleat.description": {
    "en": "It's done!\nYou can now enjoy the new " + version_info.name,
  },

  "menu.uu.compleat.description.note": {
    "en": "Note",
  },


  /*------------------------
    Menu - Main menu
  -------------------------*/

  "menu.main.title": {
    "en": "Main menu",
  },

  "menu.main.description.ca": {
    "en": "Here's a brief overview, what you have setup:",
  },

  "menu.main.reset.title": {
    "en": "Reset %{mode}%",
  },

  "menu.main.reset.title.ca": {
    "en": "Start over!",
  },

  "menu.main.afk.title": {
    "en": "Intelligent condition",
  },

  "menu.main.condition.paused": {
    "en": "paused",
  },

  "menu.main.condition.resumed": {
    "en": "resumed",
  },

  "menu.main.sync_day_time": {
    "en": "Clone real time",
  },


  /*------------------------
    Menu - Difficulty
  -------------------------*/

  "menu.difficulty.title": {
    "en": "Difficulty",
  },

  "menu.difficulty.description": {
    "en": "Select your difficulty!",
  },

  "menu.difficulty.note": {
    "en": "Note: Hardcore difficulties are only available if the world was started in hardcore.",
  },

  "menu.difficulty.note.hardcore": {
    "en": "Note: Easier difficulty levels are only available if you start the world normally.",
  },



  /*------------------------
    Menu - Goal
  -------------------------*/

  "menu.goal.title": {
    "en": "Goal",
  },

  "menu.goal.entity": {
    "en": "Entity",
  },

  "menu.goal.entity.prefix": {
    "en": "Defeat",
  },

  "menu.goal.entity.fix": {
    "en": " a specific creature",
  },

  "menu.goal.event": {
    "en": "Event",
  },

  "menu.goal.event.subtitle": {
    "en": "Trigger a specific event",
  },

  "menu.goal.random": {
    "en": "Random",
  },

  "menu.goal.random.subtitle": {
    "en": "Could be anything",
  },

  "menu.goal.random.title": {
    "en": "§bR§ga§an§6d§4o§fm",
  },


  "menu.goal.description": {
    "en": "Select your goal!",
  },


  /*------------------------
    Menu - "Change / add time"
  -------------------------*/
  "menu.start_time.title": {
    "en": "Change time",
  },

  "menu.start_time.title.ca": {
    "en": "Start time",
  },

  "menu.start_time.submit": {
    "en": "Set & count down!",
  },

  "menu.start_time.unit.y": {
    "en": "Years",
  },

  "menu.start_time.unit.w": {
    "en": "Weeks",
  },

  "menu.start_time.unit.d": {
    "en": "Days",
  },

  "menu.start_time.unit.h": {
    "en": "Hours",
  },

  "menu.start_time.unit.m": {
    "en": "Minutes",
  },

  "menu.start_time.unit.s": {
    "en": "Seconds",
  },

  "menu.start_time.unit.ms": {
    "en": "Milliseconds",
  },



  /*------------------------
    Menu - Custom Sounds
  -------------------------*/

  "menu.settings.cs.title": {
    "en": "Custom Sounds",
  },

  "menu.settings.cs.description_0": {
    "en": "Do you hear a test sound?",
  },

  "menu.settings.cs.description_1": {
    "en": "Do you hear a test sound now?",
  },

  "menu.settings.cs.button.yes": {
    "en": "§2Yes, there is a sound",
  },

  "menu.settings.cs.button.no": {
    "en": "§4No, silence",
  },

  "menu.settings.cs.result.header": {
    "en": "The setup process is now complete.",
  },

  "menu.settings.cs.result.message_v1": {
    "en": "The timer will now use custom sounds from the resource pack.",
  },

  "menu.settings.cs.result.message_v2": {
    "en": "Your resources pack only supports legacy custom music, so not all timer sounds can be replaced.",
  },

  "menu.settings.cs.result.message_bad": {
    "en": "Under current conditions, custom sounds cannot be played.\n\n§7Check your resource pack compatibility and in-game music volume.",
  },


  /*------------------------
    Menu - Shared timer
  -------------------------*/

  "menu.popup.shared_timer.title": {
    "en": "Shared timer",
  },

  "menu.popup.shared_timer.by": {
    "en": "by %{player}%",
  },

  "menu.popup.shared_timer.yours_instead": {
    "en": "Share yours instead",
  },

  "menu.popup.shared_timer.description": {
    "en": "The shared timer feature copies your timer to an additional timer that is enforced on all players. %{replace_text}%\n\n§7Required for challenge mode.\n\n",
  },

  "menu.popup.shared_timer.description.replace_time": {
    "en": "%{name}% is currently sharing his / her timer. You can §cstop§f this or §ereplace§f it with your own time (%{own_time}%§r)",
  },

  "menu.popup.shared_timer.description.contol": {
    "en": "Only admins can control it.",
  },



  /*------------------------
    Menu - CA
  -------------------------*/

  "menu.popup.ca.title": {
    "en": "Challenge mode",
  },

  "menu.popup.ca.description": {
    "en": "In this mode, the timer shifts from a supporting role to the main one. First, you set the guidelines and then plunge into the adventure of the survival mode!",
  },

  "menu.popup.ca.description_in_ca": {
    "en": "If this function is deactivated, the timer will operate more in the background and will no longer have any influence on the game mode.",
  },

  "menu.popup.ca.note": {
    "en": "This setting will change the timer significantly.",
  },

  "menu.popup.ca.start": {
    "en": "Start Challenge",
  },

  "menu.popup.ca.start.description": {
    "en": "You are trying to start a challenge. Once a challenge is started, many settings are no longer available.\n\nHere's a brief overview:\n",
  },

  "menu.popup.give_up": {
    "en": "Give up!",
  },

  "menu.popup.give_up.description": {
    "en": "You are about to end a challenge.\nIf you complete the challenge this way, you will §llose all your progress%{hardcore}%§r.",
  },

  "menu.popup.give_up.description.hardcore": {
    "en": "and this World",
  },


  /*------------------------
    Menu - Settings
  -------------------------*/

  "menu.settings.title": {
    "en": "Settings",
  },

  "menu.settings.type": {
    "en": "Switch mode",
  },

  "menu.settings.fullbright": {
    "en": "Fullbright",
  },

  "menu.settings.experimental_features": {
    "en": "Experimental features",
  },

  "menu.settings.update": {
    "en": "Update",
  },

  "menu.settings.disable_setup": {
    "en": "Disable setup",
  },

  "menu.settings.about": {
    "en": "About",
  },


  /*------------------------
    Menu - Permissions
  -------------------------*/

  "menu.settings.permissions.title": {
    "en": "Permissions",
  },

  "menu.settings.permissions.title.player": {
    "en": "Edit %{name}%'s permission",
  },

  "menu.settings.permissions.title.you": {
    "en": "Edit your permission",
  },

  "menu.settings.permissions.description": {
    "en": "Select a player!",
  },

  "menu.settings.permissions.online": {
    "en": "Online",
  },

  "menu.settings.permissions.offline": {
    "en": "last seen %{time}% ago",
  },

  "menu.settings.permissions.lable.name": {
    "en": "Name: %{name}% (%{id}%)",
  },

  "menu.settings.permissions.lable.actionbar": {
    "en": "Live actionbar: %{actionbar}%",
  },

  "menu.settings.permissions.cm": {
    "en": "Note: This save data cannot be managed because it is needed by the system due to the Challenge Mode.",
  },

  "menu.settings.permissions.manage_sd": {
    "en": "Manage save data",
  },

  "menu.settings.permissions.reset_sd": {
    "en": "Reset save data",
  },

  "menu.settings.permissions.delete_sd": {
    "en": "Delete save data",
  },

  "menu.settings.permissions.shared_timer.description": {
    "en": "%{name}% is currently sharing their timer. You must §cstop§f it%{replace_text}% before you can change their permission.\n\n§7Required for challenge mode.\n\n",
  },

  "menu.settings.permissions.shared_timer.replace_text": {
    "en": " or §ereplace§f it with your own time (%{own_time}%§r)",
  },

  "menu.settings.permissions.online_player.kick.title": {
    "en": "Online player information",
  },

  "menu.settings.permissions.online_player.kick.description": {
    "en": "Are you sure you want to remove %{name}%'s save data?\nThey must disconnect from the world!",
  },

  "menu.settings.permissions.online_player.kick.button": {
    "en": "Kick & Delete",
  },

  "menu.settings.permissions.online_player.kick.host.title": {
    "en": "Host player information",
  },

  "menu.settings.permissions.online_player.kick.host.description": {
    "en": "%{name}% is the host. To delete their data, the server must shut down. This usually takes 5 seconds",
  },

  "menu.settings.permissions.online_player.kick.host.button": {
    "en": "Shutdown & Delete",
  },



  /*------------------------
    Menu - Language
  -------------------------*/

  "menu.settings.lang.title": {
    "en": "Language",
  },

  "menu.settings.lang.recommendation": {
    "en": "based on your timezone",
  },

  "menu.settings.lang.preview.messages": {
    "en": "You have selected: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nI confirm that I have understood the sentence in the specified language and would like to use it.\n ",
  },

  "menu.settings.lang.preview.messages.ai": {
    "en": "Languages are constantly changing. Please share your experience, e.g., translation mistakes. For more infos check Contacts in the \"About\" section!\n\n§o§8\"%{preview}%\"§r\n\nI confirm that I have understood the sentence in the specified language and would like to use it.\n ",
  },


  "menu.settings.lang.preview.test": {
    "en": "Mining diamonds at dawn is the best way to start a Minecraft adventure.",
  },


  /*------------------------
    Menu - Gestures
  -------------------------*/

  "menu.settings.gestures.title": {
    "en": "Gestures",
  },

  "menu.settings.gestures.description": {
    "en": "Choose your own configuration of how the menu should open!",
  },

  "menu.settings.gestures.emote": {
    "en": "Emote"
  },

  "menu.settings.gestures.sneak": {
    "en": "Sneak",
  },

  "menu.settings.gestures.nod": {
    "en": "Nod",
  },

  "menu.settings.gestures.stick": {
    "en": "Stick",
  },

  "menu.settings.gestures.command": {
    "en": "Command",
  },

  /*------------------------
    Menu - UTC
  -------------------------*/

  "menu.settings.time_zone.title": {
    "en": "Time zone",
  },

  "menu.settings.time_zone.description": {
    "en": "Select your current time zone!",
  },

  "menu.settings.time_zone.show_later": {
    "en": "Show later time zones",
  },

  "menu.settings.time_zone.show_previous": {
    "en": "Show previous time zones",
  },

  "menu.settings.time_zone.show_less": {
    "en": "Show less",
  },

  "menu.settings.time_zone.preview": {
    "en": "Time zone: %{name}%\nUTC: %{utc}%\nTime: %{time}%§r\nLocation(s): %{location}%\n\nDo you want to use this time zone?\n ",
  },



  /*------------------------
    Menu - Actionbar
  -------------------------*/

  "menu.settings.actionbar.title": {
    "en": "Actionbar",
  },

  "menu.settings.actionbar.using": {
    "en": "Use actionbar",
  },

  "menu.settings.actionbar.day_time": {
    "en": "Show day time",
  },

  "menu.settings.actionbar.time_source": {
    "en": "Time Source",
  },

  "menu.settings.actionbar.time_source.in_game": {
    "en": "Minecraft"
  },

  "menu.settings.actionbar.time_source.real_life": {
    "en": "Real Life",
  },

  "menu.settings.actionbar.design.button": {
    "en": "Change the look!",
  },

  "menu.settings.actionbar.design.title": {
    "en": "Design actionbar",
  },

  "menu.settings.actionbar.design.description": {
    "en": "Select a template or create your own custom design!",
  },

  "menu.settings.actionbar.design.preview": {
    "en": "Here is a preview of your selected design. It shows all possible variables at once.\n\nScreen saver: %{screen_saver}%§r\n\nIn the menu: %{ui}%§r\n\nNormal: %{normal}%§r\n\nPaused: %{paused}%§r\n\nFinished (CM only): %{finished}%§r\n\nDay-Time: %{day}%§r\n\nDo you like it?",
  },

  "menu.settings.actionbar.design.preview.apply": {
    "en": "§aApply!",
  },


  /*------------------------
    Menu - Dictionary
  -------------------------*/

  "menu.settings.dictionary.title": {
    "en": "About",
  },

  "menu.settings.dictionary.text": {
    "en": "Name: %{name}%\nVersion: %{version}% (%{build}%)\nRelease Type: %{release_type}%\nEdition: %{edition}%\nUUID: %{uuid}%\nBuild Date: %{build_date}%\n\n%{license}%",
  },

  "menu.settings.dictionary.text.utc_empty": {
    "en": "%{time}% ago\n\n§7Note: Set the time zone to see detailed information",
  },

  "menu.settings.dictionary.text.build.update": {
    "en": "update time",
  },

  "menu.settings.dictionary.text.dateformat": {
    "en": "%{month}%/%{day}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
  },

  "menu.settings.dictionary.text.dateformat": {
    "en": "%{month}%/%{day}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
  },


  "menu.settings.dictionary.changelog.title": {
    "en": "Changelog",
  },

  "menu.settings.dictionary.changelog.new_features": {
    "en": "New Features",
  },

  "menu.settings.dictionary.changelog.general_changes": {
    "en": "General Changes",
  },

  "menu.settings.dictionary.changelog.bug_fixes": {
    "en": "Bug fixes",
  },

  "menu.settings.dictionary.changelog.build": {
    "en": "As of %{month}%/%{day}%/%{year}% (%{relative_time}% ago)",
  },

  "menu.settings.dictionary.contact.title": {
    "en": "Contact",
  },

  "menu.settings.dictionary.contact.description": {
    "en": "If you want to report a bug, need help, or have suggestions to improve the project, you can reach me via these platforms:",
  },

  "menu.settings.dictionary.contact.sd": {
    "en": "Dump SD"
  },

  "menu.settings.dictionary.contact.sd.mode_0": {
    "en": "via private chat",
    // Fallbacks
  },

  "menu.settings.dictionary.contact.sd.mode_1": {
    "en": "via server console",
  },



};

/*------------------------
 Translate function
-------------------------*/

export function translate_textkeys(key, lang, vars = {}) {
  const entry = textkeys[key];
  if (!entry) return key;

  let str = entry[lang];

  if (str == null) {
    const baseLang = lang.split("_")[0];
    str = entry[baseLang];
  }

  if (str == null) {
    str = entry["en"];
  }

  if (str == null) return key;

  str = str.replace(/%\{(\w+)\}%/g, (_, name) => {
    return vars[name] != null ? vars[name] : "";
  });

  return str;
}

/*------------------------
 Menus
-------------------------*/

export function settings_lang(player, in_setup) {
  const form = new ActionFormData();
  const save_data = load_save_data();
  const player_sd_index = save_data.findIndex(e => e.id === player.id);
  let lang = save_data[player_sd_index].lang;

  let timezone_langs = timezone_list.find(zone => zone.utc === save_data[0].utc)?.lang;
  if (!Array.isArray(timezone_langs)) timezone_langs = [];

  const selected = supportedLangs.find(l => l.id === lang);
  const enLang = supportedLangs.find(l => l.id === "en_us");

  // Kategorie 4: alle übrigen Sprachen (noch ungefiltert)
  let otherLangs = supportedLangs.filter(l => l.id !== selected.id && l.id !== "en_us");

  // Kategorie 3: Zeitzonen-Sprachen (nur wenn sie in otherLangs und supportedLangs sind)
  const timezoneLangsFiltered = otherLangs
    .filter(l => timezone_langs.includes(l.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Entferne timezone-basierte Sprachen aus Kategorie 4
  otherLangs = otherLangs.filter(l => !timezoneLangsFiltered.some(tz => tz.id === l.id));
  otherLangs.sort((a, b) => a.name.localeCompare(b.name));

  const displayLangs = [];

  // Kategorie 1: ausgewählte Sprache
  displayLangs.push({ ...selected, note: (in_setup? "" : "\n" + translate_textkeys("menu.item_selected", lang)) });

  // Kategorie 2: Englisch US (falls nicht ausgewählt)
  if (enLang && enLang.id !== selected.id) {
    const note = timezone_langs.includes(enLang.id) ? "\n§5("+ translate_textkeys("menu.settings.lang.recommendation", lang) +")§r" : "";
    displayLangs.push({ ...enLang, note });
  }

  // Kategorie 3: Zeitzonenbasierte Vorschläge
  timezoneLangsFiltered.forEach(l => {
    displayLangs.push({ ...l, note: "\n§5("+ translate_textkeys("menu.settings.lang.recommendation", lang) +")§r" });
  });

  // Kategorie 4: Restliche Sprachen
  otherLangs.forEach(l => {
    displayLangs.push({ ...l, note: "" });
  });

  const actions = [];

  form.title(translate_textkeys("menu.settings.lang.title", lang));
  form.body(translate_textkeys("menu.general.description", lang));

  displayLangs.forEach(l => {
    form.button(l.name + (l.note || ""), l.ai ? "textures/ui/servers" : "textures/ui/sidebar_icons/my_characters");

    actions.push(() => {
      if (in_setup) {
        save_data[player_sd_index].lang = l.id;
        if (save_data[player_sd_index].op) {
          save_data[player_sd_index].setup = 20;
        } else {
          save_data[player_sd_index].setup = 50;
        }
        update_save_data(save_data);
        setup_menu(player);
      } else {
        settings_lang_preview(player, l, in_setup)
      }
    });
  });

  if (!in_setup) {
    form.button("");
    actions.push(() => {
      player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
      settings_main(player);
    });
  } else if (version_info.release_type == 0) {
    form.button("Skip Setup");
    actions.push(() => {
      save_data[player_sd_index].setup = 100
      update_save_data(save_data)
      player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3 });
      return main_menu(player)
    });
  }

  form.show(player).then(response => {
    if (response.selection === undefined) {
      if (in_setup) player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.setup.closed", lang))
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    const sel = response.selection;
    if (typeof actions[sel] === "function") actions[sel]();
  });
}

function settings_lang_preview(player, selected_lang) {
  const save_data = load_save_data();
  const player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let form = new MessageFormData();
  let current_lang_id = save_data[player_sd_index].lang;


  form.title(translate_textkeys("menu.settings.lang.title", current_lang_id));

  form.body(!selected_lang.ai? translate_textkeys(
    "menu.settings.lang.preview.messages",
    current_lang_id,
    {
      name: selected_lang.name,
      preview: translate_textkeys("menu.settings.lang.preview.test", selected_lang.id),
    }
  ) : translate_textkeys(
    "menu.settings.lang.preview.messages.ai",
    current_lang_id,
    {
      name: selected_lang.name,
      preview: translate_textkeys("menu.settings.lang.preview.test", selected_lang.id),
    }
  ));

  form.button1(translate_textkeys(
    "menu.button_switch",
    current_lang_id,
    {
      name: selected_lang.name,
    }
  ));
  form.button2("");

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection == 0) {
      save_data[player_sd_index].lang = selected_lang.id;

      update_save_data(save_data);
      player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
      return settings_main(player);
    }
    settings_lang(player);
  });

}