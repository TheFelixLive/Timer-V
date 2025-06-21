import { world, system, EntityTypes } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"

const version_info = {
  name: "Timer V",
  version: "v.5.2.0",
  build: "B023",
  release_type: 0, // 0 = Development version (with debug); 1 = Beta version (with adds); 2 = Stable version
  unix: 1750537201,
  update_message_period_unix: 15897600, // Normally 6 months = 15897600
  edition: 0, // 0 = Normal Edition; 1 = BastiGHG Edition
  changelog: {
    // new_features
    new_features: [
      "Added full language support for over 55 languages",
      "Updated timezone settings",
      "Improved setup menu",
    ],
    // general_changes
    general_changes: [
      "Added a new design template \"v.2.0.0\" for the actionbar",
      "Added UU-Support for v.4.0.0 & v.4.0.1",
      "After an update of an older version, the design of this older version is now adopted",
      "Changed the license to the mit license",
      "The relative time is now more naturally formatted",
      "The 'Screen Saver' is how hidden if some kind of day time is shown",

    ],
    // bug_fixes
    bug_fixes: [
      "Fixed a bug that allowed invalid identities to be selected by a random goal",
      "Partially fixed a bug that allowed players to disable almost all gestures, which could result in the menu being unavailable, especially in Hardcore mode.",
      "Fixed a bug that caused the timer to end 5 milliseconds early and is therefore not able reset properly later",
      "Fixed a bug that sometimes caused a softlock when the command /reload got executed",
      "Fixed a bug where the timer would crash when Clone Realtime was enabled and your local time reached 6:00 AM in a timezone ahead of UTC (e.g., UTC+1 or higher)",
      "Fixed a bug that caused a softlock when the goal was Time Goal and the timer got turned off in the settings menu",
      "Fixed a bug that caused the timer to continue playing the music after the menu was closed in the settings type menu",
      "Fixed a bug that players allowed to sleep if clone real time was enabled"
    ]
  }
}

const links = [
  {name: "§l§5Github:§r", link: "github.com/TheFelixLive/Timer-V"},
  {name: "§8Curseforge:§r", link: "curseforge.com/projects/1259478"},
  {name: "§aMcpedl:§r", link: "mcpedl.com/timer"},
]

// These lists are NOT customizable

const timer_modes = [
  {
    label: "menu.mode.stopwatch",
    icon: "textures/items/clock_item",
    show_if: true
  },
  {
    label: "menu.mode.timer",
    icon: "textures/ui/timer",
    show_if: true
  },
  {
    label: "menu.mode.world_time",
    icon: "textures/ui/world_glyph_color",
    show_if: (save_data) => !save_data[0].global.status
  },
  {
    label: "menu.mode.day_time",
    icon: "textures/environment/sun",
    show_if: (save_data, player_sd_index) => {
      return !save_data[0].global.status && save_data[player_sd_index].show_td_as_mode;
    }
  }
];

const difficulty = [
  {
    name: "§aEasy",
    icon: "textures/ui/poison_heart",
    is_hardcore: false
  },
  {
    name: "§fNormal",
    icon: "textures/ui/heart",
    is_hardcore: false
  },
  {
    name: "§4Hard§ccore",
    icon: "textures/ui/hardcore/heart",
    is_hardcore: true
  },
  {
    name: "§cUltra §4Hardcore",
    icon: "textures/ui/hardcore/freeze_heart",
    is_hardcore: true
  },
    {
    name: "§5Infinity",
    icon: "textures/ui/hardcore/wither_heart",
    is_hardcore: true
  }
]

const goal_event = [
  {
    name: "Time Goal",
    icon: "textures/items/clock_item",
    condition: (data) => data[0].time?.timer > 0 && data[0].counting_type === 1
  },
  {
    name: "Raid",
    icon: "textures/ui/raid_omen_effect",
    condition: () => true
  }
]

// These lists ARE customizable
const soundkeys = {

  // Music
  "music.menu.main": {
    extern: "timer.music.menu.main",
    extern_l: "timeru.music.menu_0",
    native: "music.menu",

    global: {
      extern: "timer.music.menu.main.global",
      extern_l: "timeru.music.menu_0",
      native: "music.overworld.cherry_grove"
    },

    challenge_progress_0: {
      extern: "timer.music.menu.main.challenge_progress_0",
      extern_l: "timeru.music.menu_0",
      native: "record.far"
    },

    challenge_progress_1: {
      extern: "timer.music.menu.main.challenge_progress_1",
      extern_l: "timeru.music.menu_1",
      native: "record.wait"
    },

    challenge_progress_2: {
      extern: "timer.music.menu.main.challenge_progress_2",
      extern_l: "timeru.music.menu_3",
      native: "record.otherside"
    }

  },
  "music.menu.difficulty": {
    extern: "timer.music.menu.difficulty",
    extern_l: "timeru.music.menu.difficulty",
    native: "record.cat",

    hardcore: {
      extern: "timer.music.menu.difficulty.hardcore",
      extern_l: "timeru.music.menu.difficulty",
      native: "music.game.nether"
    }
  },
  "music.menu.goal": {
    extern: "timer.music.menu.goal",
    extern_l: "timeru.music.menu.goal",
    native: "record.ward"
  },
  "music.menu.time": {
    extern: "timer.music.menu.time",
    extern_l: "timeru.music.menu.time",
    native: "record.creator"
  },
  "music.menu.dictionary": {
    extern: "timer.music.menu.dictionary",
    extern_l: "timeru.music.menu.help",
    native: "music.menu"
  },
  "music.menu.settings": {
    extern: "timer.music.menu.settings",
    native: "record.strad"
  },
  "music.menu.settings.debug": {
    extern: "timer.music.menu.settings.debug",
    native: "record.relic"
  },
  "music.menu.settings.gestures": {
    extern: "timer.music.menu.settings.gestures",
    native: "music.game.snowy_slopes"
  },
  "music.menu.settings.lang": {
    extern: "timer.music.menu.settings.lang",
    extern_l: "timeru.music.menu.lang",
    native: "music.game.snowy_slopes"
  },
  "music.menu.settings.time_zone": {
    extern: "timer.music.menu.settings.time_zone",
    native: "music.game.snowy_slopes"
  },
  "music.menu.settings.rights": {
    extern: "timer.music.menu.settings.rights",
    extern_l: "timeru.music.menu.permission",
    native: "music.overworld.snowy_slopes"
},
  "music.menu.settings.actionbar": {
    extern: "timer.music.menu.settings.actionbar",
    native: "music.menu"
  },
  "music.menu.settings.actionbar.design": {
    extern: "timer.music.menu.settings.actionbar.design",
    native: "music.overworld.grove"
  },
  "music.menu.setup": {
    extern: "timer.music.menu.setup",
    extern_l: "timeru.music.menu_0.1",
    native: "music.overworld.grove"
  },

  // Soundeffects
  "menu.open": {
    extern: "timer.menu.open",
    extern_l: "timeru.menu.pop",
    native: "random.pop2"
  },
  "menu.close": {
    extern: "timer.menu.close",
    native: "" // When e.g. a Condition change occurs, the external audio is played in full and only after that the condition one plays. This is not available when the native version is used.
  },
  "condition.resumed": {
    extern: "timer.condition.resumed",
    extern_l: "timeru.continue",
    native: "step.amethyst_block"
  },
  "condition.paused": {
    extern: "timer.condition.paused",
    extern_l: "timeru.frozen",
    native: "resonate.amethyst_block"
  },
  "condition.expired": {
    extern: "timer.condition.expired",
    extern_l: "timeru.frozen",
    native: "resonate.amethyst_block"
  },
  "challenge.starts": {
    extern: "timer.condition.starts",
    extern_l: "timeru.reset_true",
    native: "random.levelup"
  },
  "challenge.end.good": {
    extern: "timer.challenge.end.good",
    extern_l: "timeru.win",
    native: "random.toast"
  },
  "challenge.end.bad": {
    extern: "timer.challenge.end.bad",
    extern_l: "timeru.type_death.target",
    native: "horn.call.7"
  },
  "message.beta.feedback": {
    extern: "timer.message.beta.feedback",
    native: "random.orb"
  },
};

const supportedLangs = [
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
    en: "System",
    fr: "Système",
    it: "Sistema",
    es: "Sistema",
    pt: "Sistema",
    is: "Kerfi",
    el: "Σύστημα",
    ar: "النظام",
    fi: "Järjestelmä",
    ru: "Система",
    tr: "Sistem",
    fa: "سیستم",
    ps: "سیستم",
    hi: "सिस्टम",
    si: "පද්ධතිය",
    ta: "கணினி",
    ne: "प्रणाली",
    th: "ระบบ",
    vi: "Hệ thống",
    id: "Sistem",
    zh: "系统",
    ms: "Sistem",
    ja: "システム",
    ko: "시스템",
    mi: "Pūnaha",
    to: "Sisitimi",
    gil: "Tikuare",
    ty: "Sisteme"
  },




  "message.header.system.client_mode": {
    en: version_info.name,
    de: version_info.name,
    fr: version_info.name,
    it: version_info.name,
    es: version_info.name,
    pt: version_info.name,
    is: version_info.name,
    el: version_info.name,
    ar: version_info.name,
    fi: version_info.name,
    sv: version_info.name,
    ru: version_info.name,
    tr: version_info.name,
    fa: version_info.name,
    ps: version_info.name,
    ur: version_info.name,
    hi: version_info.name,
    si: version_info.name,
    ta: version_info.name,
    ne: version_info.name,
    bn: version_info.name,
    th: version_info.name,
    vi: version_info.name,
    id: version_info.name,
    zh: version_info.name,
    ms: version_info.name,
    ja: version_info.name,
    ko: version_info.name,
    mi: version_info.name,
    to: version_info.name,
    gil: version_info.name,
    ty: version_info.name
  },


  "message.header.help": {
    en: "Help",
    de: "Hilfe",
    fr: "Aide",
    it: "Aiuto",
    es: "Ayuda",
    pt: "Ajuda",
    is: "Hjálp",
    el: "Βοήθεια",
    ar: "مساعدة",
    fi: "Apua",
    sv: "Hjälp",
    ru: "Помощь",
    tr: "Yardım",
    fa: "کمک",
    ps: "مرسته",
    ur: "مدد",
    hi: "मदद",
    si: "උදව්",
    ta: "உதவி",
    ne: "मद्दत",
    bn: "সাহায্য",
    th: "ช่วยเหลือ",
    vi: "Trợ giúp",
    id: "Bantuan",
    zh: "帮助",
    ms: "Bantuan",
    ja: "ヘルプ",
    ko: "도움",
    mi: "Āwhina",
    to: "Fakafesoasoani",
    gil: "Kanon",
    ty: "Āwhina"
  },


  "message.header.note": {
    en: "Note",
    de: "Hinweis",
    fr: "Note",
    it: "Nota",
    es: "Nota",
    pt: "Nota",
    is: "Athugasemd",
    el: "Σημείωση",
    ar: "ملاحظة",
    fi: "Huomautus",
    sv: "Notering",
    ru: "Заметка",
    tr: "Not",
    fa: "یادداشت",
    ps: "یادښت",
    ur: "نوٹ",
    hi: "नोट",
    si: "සටහන",
    ta: "குறிப்பு",
    ne: "नोट",
    bn: "নোট",
    th: "บันทึก",
    vi: "Ghi chú",
    id: "Catatan",
    zh: "笔记",
    ms: "Nota",
    ja: "メモ",
    ko: "메모",
    mi: "Tuhipoka",
    to: "Lomipeka",
    gil: "Riki",
    ty: "Fa'aitoito"
  },


  "message.header.end": {
    en: "End",
    de: "Ende",
    fr: "Fin",
    it: "Fine",
    es: "Fin",
    pt: "Fim",
    is: "Endir",
    el: "Τέλος",
    ar: "نهاية",
    fi: "Loppu",
    sv: "Slut",
    ru: "Конец",
    tr: "Son",
    fa: "پایان",
    ps: "پایان",
    ur: "خاتمہ",
    hi: "अंत",
    si: "අවසානය",
    ta: "முடிவு",
    ne: "अन्त",
    bn: "শেষ",
    th: "จบ",
    vi: "Kết thúc",
    id: "Akhir",
    zh: "结束",
    ms: "Akhir",
    ja: "終了",
    ko: "끝",
    mi: "Mutunga",
    to: "Fakaʻoti",
    gil: "Tae",
    ty: "Hope"
  },


  "message.header.condition": {
    en: "Condition",
    de: "Zustand",
    fr: "Condition",
    it: "Condizione",
    es: "Condición",
    pt: "Condição",
    is: "Ástand",
    el: "Κατάσταση",
    ar: "حالة",
    fi: "Ehto",
    sv: "Villkor",
    ru: "Состояние",
    tr: "Durum",
    fa: "شرط",
    ps: "شرط",
    ur: "شرط",
    hi: "शर्त",
    si: "සිත්ව",
    ta: "நிலை",
    ne: "अवस्था",
    bn: "শর্ত",
    th: "เงื่อนไข",
    vi: "Điều kiện",
    id: "Kondisi",
    zh: "条件",
    ms: "Syarat",
    ja: "条件",
    ko: "조건",
    mi: "Āhuatanga",
    to: "Tuʻunga",
    gil: "Karikirake",
    ty: "Faatitia"
  },


  "message.header.error": {
    en: "Error",
    de: "Fehler",
    fr: "Erreur",
    it: "Errore",
    es: "Error",
    pt: "Erro",
    is: "Villa",
    el: "Σφάλμα",
    ar: "خطأ",
    fi: "Virhe",
    sv: "Fel",
    ru: "Ошибка",
    tr: "Hata",
    fa: "خطا",
    ps: "تېروتنه",
    ur: "خرابی",
    hi: "त्रुटि",
    si: "දෝෂය",
    ta: "பிழை",
    ne: "त्रुटि",
    bn: "ত্রুটি",
    th: "ข้อผิดพลาด",
    vi: "Lỗi",
    id: "Kesalahan",
    zh: "错误",
    ms: "Ralat",
    ja: "エラー",
    ko: "오류",
    mi: "Hē",
    to: "Hala",
    gil: "Mwakuri",
    ty: "Hapa"
  },


  // Messages

  "message.body.help.open_menu": {
    en: "You can always open the menu with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    de: "Du kannst das Menü jederzeit mit der Schleicher-Sprung-Geste (oder im Zuschauer-Modus mit der Nicken-Geste), dem Befehl §l/scriptevent timerv:menu§r§f oder mit einem Stock öffnen",
    fr: "Vous pouvez toujours ouvrir le menu avec le geste de saut furtif (ou en spectateur avec le signe de tête), avec la commande §l/scriptevent timerv:menu§r§f ou avec un bâton",
    it: "Puoi sempre aprire il menu con il gesto del salto furtivo (o in modalità spettatore con il cenno), con il comando §l/scriptevent timerv:menu§r§f o con un bastone",
    es: "Siempre puedes abrir el menú con el gesto de salto sigiloso (o en espectador con el gesto de asentir), con el comando §l/scriptevent timerv:menu§r§f o con un palo",
    pt: "Você pode sempre abrir o menu com o gesto de salto furtivo (ou em espectador com o aceno), com o comando §l/scriptevent timerv:menu§r§f ou com um bastão",
    is: "Þú getur alltaf opnað valmyndina með laumuspuni-hoppi (eða í áhorfanda með hnigningu höfuðs), með skipuninni §l/scriptevent timerv:menu§r§f eða með staf",
    el: "Μπορείτε πάντα να ανοίξετε το μενού με τη χειρονομία άλματος κρυφής κίνησης (ή σε θεατή με την κίνηση κεφαλής), με την εντολή §l/scriptevent timerv:menu§r§f ή με ένα ραβδί",
    ar: "يمكنك دائمًا فتح القائمة بإيماءة القفز الخفي (أو في وضع المتفرج بإيماءة الرأس)، باستخدام الأمر §l/scriptevent timerv:menu§r§f أو بعصا",
    fi: "Voit aina avata valikon hiipimä-hypyllä (tai katselijatilassa nyökkäyksellä), komennolla §l/scriptevent timerv:menu§r§f tai kepillä",
    sv: "Du kan alltid öppna menyn med smyghopp-gesten (eller i åskådarläge med nickningen), med kommandot §l/scriptevent timerv:menu§r§f eller med en pinne",
    ru: "Вы всегда можете открыть меню с помощью жеста прыжка из приседа (или в режиме наблюдателя с кивком), командой §l/scriptevent timerv:menu§r§f или палкой",
    tr: "Menüyü her zaman gizli zıplama (veya seyirci modunda kafa sallama) hareketiyle, §l/scriptevent timerv:menu§r§f komutuyla veya bir çubukla açabilirsiniz",
    fa: "شما همیشه می‌توانید منو را با حرکت پرش مخفی (یا در حالت ناظر با حرکت سر) باز کنید، با دستور §l/scriptevent timerv:menu§r§f یا با یک چوب",
    ps: "تاسو کولی شئ تل مینو د پټ کود کولو (یا په ننداره حالت کې د سر حرکت) اشارې سره خلاص کړئ، د کمانډ §l/scriptevent timerv:menu§r§f یا د یوې لرګي سره",
    ur: "آپ ہمیشہ مینو کو چپکے سے جمپ کرنے (یا ناظر موڈ میں سر ہلانے) کے اشارے سے، کمانڈ §l/scriptevent timerv:menu§r§f یا لکڑی سے کھول سکتے ہیں",
    hi: "आप हमेशा मेनू को चुपके कूद (या दर्शक मोड में सिर हिलाने) के इशारे से, कमांड §l/scriptevent timerv:menu§r§f या छड़ी से खोल सकते हैं",
    si: "ඔබට සෑම විටම මෙනුව සුරැකුම් පැනීමේ (හෝ නැරඹුම්කරුවෙකු ලෙස හිස ඉරියව්ව) අතුරුමුහුණතෙන්, §l/scriptevent timerv:menu§r§f විධානයෙන් හෝ කොළයක් මඟින් විවෘත කළ හැක",
    ta: "நீங்கள் எப்பொழுதும் சிக்கன குதிப்பு (அல்லது பார்வையாளராக தலை தட்டல்) கையெழுத்துடன், §l/scriptevent timerv:menu§r§f கட்டளையோ அல்லது கம்பியோ மூலம் மெனுவை திறக்கலாம்",
    ne: "तपाईं सँधै मेनु लुक्ने जम्प (वा दर्शकमा टाउको हल्लाउने) इशाराबाट, कमाण्ड §l/scriptevent timerv:menu§r§f वा लाठीबाट खोल्न सक्नुहुन्छ",
    bn: "আপনি সব সময় স্নিক-জাম্প (অথবা দর্শকে মাথা নাড়ানোর) ইশারায়, কমান্ড §l/scriptevent timerv:menu§r§f বা একটি লাঠি দিয়ে মেনু খুলতে পারেন",
    th: "คุณสามารถเปิดเมนูได้ตลอดเวลาด้วยท่ากระโดดแอบ (หรือในโหมดผู้ชมด้วยการพยักหน้า) ด้วยคำสั่ง §l/scriptevent timerv:menu§r§f หรือด้วยไม้",
    vi: "Bạn luôn có thể mở menu bằng cử chỉ nhảy lén (hoặc trong chế độ xem bằng cái gật đầu), với lệnh §l/scriptevent timerv:menu§r§f hoặc với một cây gậy",
    id: "Anda selalu dapat membuka menu dengan gerakan lompat sembunyi (atau di mode penonton dengan anggukan), dengan perintah §l/scriptevent timerv:menu§r§f atau dengan tongkat",
    zh: "你可以随时通过潜行跳跃（或旁观者模式下点头）动作、命令 §l/scriptevent timerv:menu§r§f 或用一根棍子打开菜单",
    ms: "Anda sentiasa boleh membuka menu dengan gerakan lompat sembunyi (atau dalam mod pemerhati dengan anggukan), dengan arahan §l/scriptevent timerv:menu§r§f atau dengan sebatang kayu",
    ja: "スニークジャンプ（または観戦者モードでのうなずき）ジェスチャー、コマンド §l/scriptevent timerv:menu§r§f、または棒でいつでもメニューを開けます",
    ko: "언제든지 몰래 점프(또는 관전 모드에서 끄덕임) 제스처, 명령어 §l/scriptevent timerv:menu§r§f, 또는 막대기로 메뉴를 열 수 있습니다",
    mi: "Ka taea tonu e koe te whakatuwhera i te tahua mā te tohu peke huna (rānei i te āhua kaitiaki mā te naki), mā te whakahau §l/scriptevent timerv:menu§r§f, mā te rākau rānei",
    to: "Fakatu'utamaki 'a e lisi fakataha 'aki 'a e fakamalolo ma'olunga (pe 'i he mode tapuaki moe fakahā) 'aki ha faka'ali'ali, 'aki ha polokalama §l/scriptevent timerv:menu§r§f pe 'aki ha sia",
    gil: "Ko na bane ni kamate ni bon aronga n atoro ni kakai (aki n te aron te tiakina ni bon) ni kabane §l/scriptevent timerv:menu§r§f ake ni kakai ni kiki",
    ty: "Ua nehenehe ta outou i tārava i te lisi i te nehenehe i te tatara (aore ra i roto i te faaroo i te nenea) i te ohipa §l/scriptevent timerv:menu§r§f aore ra i te ta'ata"
  },


  "message.body.help.setup.closed": {
    en: "The menu got closed! You can always open it again with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    de: "Das Menü wurde geschlossen! Du kannst es jederzeit wieder mit der Schleicher-Sprung-Geste (oder im Zuschauer-Modus mit der Nicken-Geste), dem Befehl §l/scriptevent timerv:menu§r§f oder mit einem Stock öffnen",
    fr: "Le menu a été fermé ! Vous pouvez toujours l'ouvrir à nouveau avec le geste de saut furtif (ou en spectateur avec le signe de tête), avec la commande §l/scriptevent timerv:menu§r§f ou avec un bâton",
    it: "Il menu è stato chiuso! Puoi sempre riaprirlo con il gesto del salto furtivo (o in modalità spettatore con il cenno), con il comando §l/scriptevent timerv:menu§r§f o con un bastone",
    es: "¡El menú se cerró! Siempre puedes abrirlo de nuevo con el gesto de salto sigiloso (o en espectador con el gesto de asentir), con el comando §l/scriptevent timerv:menu§r§f o con un palo",
    pt: "O menu foi fechado! Você pode sempre abri-lo novamente com o gesto de salto furtivo (ou em espectador com o aceno), com o comando §l/scriptevent timerv:menu§r§f ou com um bastão",
    is: "Valmyndinni var lokað! Þú getur alltaf opnað hana aftur með laumuspuni-hoppi (eða í áhorfanda með hnigningu höfuðs), með skipuninni §l/scriptevent timerv:menu§r§f eða með staf",
    el: "Το μενού έκλεισε! Μπορείτε πάντα να το ανοίξετε ξανά με τη χειρονομία άλματος κρυφής κίνησης (ή σε θεατή με την κίνηση κεφαλής), με την εντολή §l/scriptevent timerv:menu§r§f ή με ένα ραβδί",
    ar: "تم إغلاق القائمة! يمكنك دائمًا فتحها مرة أخرى بإيماءة القفز الخفي (أو في وضع المتفرج بإيماءة الرأس)، باستخدام الأمر §l/scriptevent timerv:menu§r§f أو بعصا",
    fi: "Valikko sulkeutui! Voit aina avata sen uudelleen hiipimä-hypyllä (tai katselijatilassa nyökkäyksellä), komennolla §l/scriptevent timerv:menu§r§f tai kepillä",
    sv: "Menyn stängdes! Du kan alltid öppna den igen med smyghopp-gesten (eller i åskådarläge med nickningen), med kommandot §l/scriptevent timerv:menu§r§f eller med en pinne",
    ru: "Меню закрыто! Вы всегда можете открыть его снова с помощью жеста прыжка из приседа (или в режиме наблюдателя с кивком), командой §l/scriptevent timerv:menu§r§f или палкой",
    tr: "Menü kapandı! Menüyü her zaman gizli zıplama (veya seyirci modunda kafa sallama) hareketiyle, §l/scriptevent timerv:menu§r§f komutuyla veya bir çubukla tekrar açabilirsiniz",
    fa: "منو بسته شد! شما همیشه می‌توانید آن را دوباره با حرکت پرش مخفی (یا در حالت ناظر با حرکت سر) باز کنید، با دستور §l/scriptevent timerv:menu§r§f یا با یک چوب",
    ps: "مېنو وتړل شو! تاسو کولی شئ دا بیا د پټ کود کولو (یا په ننداره حالت کې د سر حرکت) اشارې سره خلاص کړئ، د کمانډ §l/scriptevent timerv:menu§r§f یا د یوې لرګي سره",
    ur: "مینو بند ہوگیا! آپ ہمیشہ اسے دوبارہ چپکے سے جمپ کرنے (یا ناظر موڈ میں سر ہلانے) کے اشارے سے، کمانڈ §l/scriptevent timerv:menu§r§f یا لکڑی سے کھول سکتے ہیں",
    hi: "मेनू बंद हो गया! आप इसे हमेशा चुपके कूद (या दर्शक मोड में सिर हिलाने) के इशारे से, कमांड §l/scriptevent timerv:menu§r§f या छड़ी से फिर खोल सकते हैं",
    si: "මෙනුව වසා ඇත! ඔබට එය සෑම විටම නැවත සුරැකුම් පැනීමේ (හෝ නැරඹුම්කරුවෙකු ලෙස හිස ඉරියව්ව) අතුරුමුහුණතෙන්, §l/scriptevent timerv:menu§r§f විධානයෙන් හෝ කොළයක් මඟින් විවෘත කළ හැක",
    ta: "மெனு மூடப்பட்டது! நீங்கள் எப்பொழுதும் சிக்கன குதிப்பு (அல்லது பார்வையாளராக தலை தட்டல்) கையெழுத்துடன், §l/scriptevent timerv:menu§r§f கட்டளையோ அல்லது கம்பியோ மூலம் மீண்டும் திறக்கலாம்",
    ne: "मेनु बन्द भयो! तपाईं सँधै मेनु लुक्ने जम्प (वा दर्शकमा टाउको हल्लाउने) इशाराबाट, कमाण्ड §l/scriptevent timerv:menu§r§f वा लाठीबाट फेरि खोल्न सक्नुहुन्छ",
    bn: "মেনু বন্ধ হয়ে গেছে! আপনি সব সময় স্নিক-জাম্প (অথবা দর্শকে মাথা নাড়ানোর) ইশারায়, কমান্ড §l/scriptevent timerv:menu§r§f বা একটি লাঠি দিয়ে আবার খুলতে পারেন",
    th: "เมนูถูกปิด! คุณสามารถเปิดเมนูอีกครั้งได้ตลอดเวลาด้วยท่ากระโดดแอบ (หรือในโหมดผู้ชมด้วยการพยักหน้า) ด้วยคำสั่ง §l/scriptevent timerv:menu§r§f หรือด้วยไม้",
    vi: "Menu đã đóng! Bạn luôn có thể mở lại bằng cử chỉ nhảy lén (hoặc trong chế độ xem bằng cái gật đầu), với lệnh §l/scriptevent timerv:menu§r§f hoặc với một cây gậy",
    id: "Menu ditutup! Anda selalu dapat membukanya kembali dengan gerakan lompat sembunyi (atau di mode penonton dengan anggukan), dengan perintah §l/scriptevent timerv:menu§r§f atau dengan tongkat",
    zh: "菜单已关闭！你可以随时通过潜行跳跃（或旁观者模式下点头）动作、命令 §l/scriptevent timerv:menu§r§f 或用一根棍子再次打开菜单",
    ms: "Menu ditutup! Anda sentiasa boleh membukanya semula dengan gerakan lompat sembunyi (atau dalam mod pemerhati dengan anggukan), dengan arahan §l/scriptevent timerv:menu§r§f atau dengan sebatang kayu",
    ja: "メニューが閉じられました！スニークジャンプ（または観戦者モードでのうなずき）ジェスチャー、コマンド §l/scriptevent timerv:menu§r§f、または棒でいつでも再度メニューを開けます",
    ko: "메뉴가 닫혔습니다! 언제든지 몰래 점프(또는 관전 모드에서 끄덕임) 제스처, 명령어 §l/scriptevent timerv:menu§r§f, 또는 막대기로 다시 메뉴를 열 수 있습니다",
    mi: "Kua kati te tahua! Ka taea tonu e koe te whakatuwhera anō mā te tohu peke huna (rānei i te āhua kaitiaki mā te naki), mā te whakahau §l/scriptevent timerv:menu§r§f, mā te rākau rānei",
    to: "Na'e tapuaki 'a e lisi! 'Oku lava ke ke faka'ata foki 'aki 'a e fakamalolo ma'olunga (pe 'i he mode tapuaki moe fakahā), 'aki ha polokalama §l/scriptevent timerv:menu§r§f pe 'aki ha sia",
    gil: "E kanganga te bon aronga! Ko na bane ni kamate ni bon aronga n atoro ni kakai (aki n te aron te tiakina ni bon), ni kabane §l/scriptevent timerv:menu§r§f ake ni kakai ni kiki",
    ty: "Ua tapu i te lisi! Ua nehenehe ta outou i tārava anō i te lisi i te nehenehe i te tatara (aore ra i roto i te faaroo i te nenea) i te ohipa §l/scriptevent timerv:menu§r§f aore ra i te ta'ata"
  },


  "message.body.convert_global_to_local.error": {
    en: "The time could not be synchronized with the player profile (%{name}%) and got deleted!",
    de: "Die Zeit konnte nicht mit dem Spielerprofil (%{name}%) synchronisiert werden und wurde gelöscht!",
    fr: "L'heure n'a pas pu être synchronisée avec le profil du joueur (%{name}%) et a été supprimée !",
    it: "L'ora non è stata sincronizzata con il profilo del giocatore (%{name}%) ed è stata cancellata!",
    es: "¡No se pudo sincronizar la hora con el perfil del jugador (%{name}%) y se eliminó!",
    pt: "O tempo não pôde ser sincronizado com o perfil do jogador (%{name}%) e foi excluído!",
    is: "Tíminn gat ekki verið samstilltur við leikmannsprofílinn (%{name}%) og var eytt!",
    el: "Ο χρόνος δεν μπόρεσε να συγχρονιστεί με το προφίλ παίκτη (%{name}%) και διαγράφηκε!",
    ar: "لم يتمكن الوقت من المزامنة مع ملف اللاعب (%{name}%) وتم حذفه!",
    fi: "Aikaa ei voitu synkronoida pelaajaprofiilin (%{name}%) kanssa ja se poistettiin!",
    sv: "Tiden kunde inte synkroniseras med spelarprofilen (%{name}%) och raderades!",
    ru: "Время не удалось синхронизировать с профилем игрока (%{name}%) и оно было удалено!",
    tr: "Zaman oyuncu profili (%{name}%) ile senkronize edilemedi ve silindi!",
    fa: "زمان با پروفایل بازیکن (%{name}%) همگام‌سازی نشد و حذف شد!",
    ps: "وخت له د لوبغاړي پروفایل (%{name}%) سره همغږي نه شوای او حذف شو!",
    ur: "وقت کو کھلاڑی کی پروفائل (%{name}%) کے ساتھ ہم آہنگ نہیں کیا جا سکا اور حذف کر دیا گیا!",
    hi: "समय खिलाड़ी प्रोफ़ाइल (%{name}%) के साथ सिंक्रनाइज़ नहीं हो सका और हटा दिया गया!",
    si: "වේලාව ක්‍රීඩක පැතිකඩ (%{name}%) සමඟ සමකාලීන කළ නොහැකි වූ අතර මකා දැමුණා!",
    ta: "நேரம் பிளேயர் சுயவிவரத்துடன் (%{name}%) ஒத்திசைக்க முடியவில்லை மற்றும் அழிக்கப்பட்டது!",
    ne: "समय खेलाडी प्रोफाइल (%{name}%) सँग सिंक्रोनाइज हुन सकेन र मेटाइयो!",
    bn: "সময় খেলোয়াড় প্রোফাইল (%{name}%) এর সাথে সিঙ্ক্রোনাইজ করা যায়নি এবং মুছে ফেলা হয়েছে!",
    th: "เวลาไม่สามารถซิงค์กับโปรไฟล์ผู้เล่น (%{name}%) ได้และถูกลบไปแล้ว!",
    vi: "Không thể đồng bộ thời gian với hồ sơ người chơi (%{name}%) và đã bị xóa!",
    id: "Waktu tidak dapat disinkronkan dengan profil pemain (%{name}%) dan telah dihapus!",
    zh: "时间无法与玩家资料 (%{name}%) 同步，已被删除！",
    ms: "Masa tidak dapat diselaraskan dengan profil pemain (%{name}%) dan telah dipadamkan!",
    ja: "時間はプレイヤープロフィール（%{name}%）と同期できず、削除されました！",
    ko: "시간을 플레이어 프로필 (%{name}%)과 동기화할 수 없었으며 삭제되었습니다!",
    mi: "Kāore i taea te whakarite wā me te kōtaha kaitākaro (%{name}%) ā, ka mukua!",
    to: "Oku 'ikai ke lava 'o fakataimi moe profile 'a e taʻe (%{name}%) pea kuo maʻu hono fakamate!",
    gil: "E kanganga n te tem tamao ni bon aronga (%{name}%) ao e kabane!",
    ty: "Ua 'ita te taime i te profaili o te ta'ata tākaro (%{name}%) e ua ha'uti!"
  },


  "message.body.shutdown": {
    en: "Shutdown Server! The world will be frozen, please wait...",
    de: "Server wird heruntergefahren! Die Welt wird eingefroren, bitte warten...",
    fr: "Arrêt du serveur ! Le monde sera gelé, veuillez patienter...",
    it: "Arresto del server! Il mondo verrà congelato, attendere prego...",
    es: "¡Apagando el servidor! El mundo se congelará, por favor espere...",
    pt: "Servidor será desligado! O mundo ficará congelado, por favor aguarde...",
    is: "Þjónninn verður lokaður! Heimurinn verður frystur, vinsamlegast bíðið...",
    el: "Τερματισμός διακομιστή! Ο κόσμος θα παγώσει, παρακαλώ περιμένετε...",
    ar: "إيقاف الخادم! سيتم تجميد العالم، يرجى الانتظار...",
    fi: "Palvelin sammutetaan! Maailma jäädytetään, odota...",
    sv: "Stäng ner servern! Världen kommer att frysas, vänligen vänta...",
    ru: "Сервер будет остановлен! Мир заморожен, пожалуйста, подождите...",
    tr: "Sunucu kapatılıyor! Dünya donacak, lütfen bekleyin...",
    fa: "سرور خاموش می‌شود! جهان منجمد خواهد شد، لطفاً صبر کنید...",
    ps: "سرور بندېږي! نړۍ به کنګل شي، مهرباني وکړئ انتظار وباسئ...",
    ur: "سرور بند ہو رہا ہے! دنیا منجمد ہو جائے گی، براہ کرم انتظار کریں...",
    hi: "सर्वर बंद हो रहा है! दुनिया फ्रीज़ हो जाएगी, कृपया प्रतीक्षा करें...",
    si: "සර්වර් නවත්වයි! ලෝකය අයිස් කිරීම සිදුවේ, කරුණාකර ඉවසන්න...",
    ta: "சர்வர் அணைப்பு! உலகம் உறைந்துவிடும், தயவு செய்து காத்திருக்கவும்...",
    ne: "सर्भर बन्द हुँदैछ! संसार जम्नेछ, कृपया पर्खनुहोस्...",
    bn: "সার্ভার বন্ধ হচ্ছে! বিশ্ব ফ্রিজ হবে, অনুগ্রহ করে অপেক্ষা করুন...",
    th: "กำลังปิดเซิร์ฟเวอร์! โลกจะถูกแช่แข็ง โปรดรอ...",
    vi: "Tắt máy chủ! Thế giới sẽ bị đóng băng, vui lòng chờ...",
    id: "Server dimatikan! Dunia akan dibekukan, harap tunggu...",
    zh: "服务器正在关闭！世界将被冻结，请稍候...",
    ms: "Pelayan dimatikan! Dunia akan dibekukan, sila tunggu...",
    ja: "サーバーをシャットダウンします！ワールドは凍結されます。しばらくお待ちください...",
    ko: "서버를 종료합니다! 세계가 얼어붙습니다. 잠시 기다려 주세요...",
    mi: "Ke kati te tūmau! Ka whakamātao te ao, tēnā tatari...",
    to: "Ke fakafonu 'a e Server! Koe lalolagi 'e mate mei he hau, kataki fakamolemole...",
    gil: "Ko nako ni kabane! E kanganga ao ao, ko runga ni kanganga!",
    ty: "Ua fa'aoti te 'āpiti! Tei te ao tei fa'ato'a, tēnā, tēnā, tēnā!"
  },


  "message.body.condition.resume": {
    en: "The timer will resume!",
    de: "Der Timer wird fortgesetzt!",
    fr: "Le minuteur reprendra !",
    it: "Il timer riprenderà!",
    es: "¡El temporizador continuará!",
    pt: "O temporizador continuará!",
    is: "Tíminn heldur áfram!",
    el: "Ο χρονομετρητής θα συνεχιστεί!",
    ar: "سيستأنف المؤقت!",
    fi: "Ajastin jatkuu!",
    sv: "Timern fortsätter!",
    ru: "Таймер возобновится!",
    tr: "Zamanlayıcı devam edecek!",
    fa: "زمان‌سنج ادامه خواهد یافت!",
    ps: "ټایمر به بیا پیل شي!",
    ur: "ٹائمر دوبارہ شروع ہو جائے گا!",
    hi: "टाइमर फिर से चालू होगा!",
    si: "ටයිමර් නැවත පවත්වා ගනු ලැබේ!",
    ta: "டைமர் மீண்டும் தொடரும்!",
    ne: "टाइमर फेरि सुरु हुनेछ!",
    bn: "টাইমার পুনরায় চালু হবে!",
    th: "ตัวจับเวลาจะเริ่มทำงานอีกครั้ง!",
    vi: "Bộ hẹn giờ sẽ tiếp tục!",
    id: "Timer akan dilanjutkan!",
    zh: "计时器将继续！",
    ms: "Pemasa akan disambung semula!",
    ja: "タイマーが再開されます！",
    ko: "타이머가 다시 시작됩니다!",
    mi: "Ka tīmata anō te pātea!",
    to: "E toe kamata ange 'a e taima!",
    gil: "Ka kakaba te tem tamao!",
    ty: "E haamau anei te taime!"
  },


  "message.body.condition.paused": {
    en: "The timer is paused!",
    de: "Der Timer ist pausiert!",
    fr: "Le minuteur est en pause !",
    it: "Il timer è in pausa!",
    es: "¡El temporizador está en pausa!",
    pt: "O temporizador está pausado!",
    is: "Tíminn er í pásu!",
    el: "Ο χρονομετρητής είναι σε παύση!",
    ar: "المؤقت متوقف مؤقتًا!",
    fi: "Ajastin on tauolla!",
    sv: "Timern är pausad!",
    ru: "Таймер на паузе!",
    tr: "Zamanlayıcı duraklatıldı!",
    fa: "زمان‌سنج متوقف شده است!",
    ps: "ټایمر ودرید!",
    ur: "ٹائمر روک دیا گیا ہے!",
    hi: "टाइमर रुका हुआ है!",
    si: "ටයිමර් නවතා ඇත!",
    ta: "டைமர் நிறுத்தப்பட்டுள்ளது!",
    ne: "टाइमर रोकियो!",
    bn: "টাইমার বিরতিতে আছে!",
    th: "ตัวจับเวลาหยุดชั่วคราว!",
    vi: "Bộ hẹn giờ đang tạm dừng!",
    id: "Timer dijeda!",
    zh: "计时器已暂停！",
    ms: "Pemasa dihentikan sementara!",
    ja: "タイマーが一時停止されました！",
    ko: "타이머가 일시 정지되었습니다!",
    mi: "Kua whakatā te pātea!",
    to: "Kuo tu'osi 'a e taima!",
    gil: "E kanganga te tem tamao!",
    ty: "Ua taofe te taime!"
  },

  "message.body.condition.expired": {
    en: "The timer expired after %{time}% and has been paused",
    de: "Der Timer ist nach %{time}% abgelaufen und wurde pausiert",
    fr: "Le minuteur a expiré après %{time}% et a été mis en pause",
    it: "Il timer è scaduto dopo %{time}% ed è stato messo in pausa",
    es: "El temporizador expiró después de %{time}% y se ha pausado",
    pt: "O temporizador expirou após %{time}% e foi pausado",
    is: "Tíminn rann út eftir %{time}% og var settur í pásu",
    el: "Ο χρονομετρητής έληξε μετά από %{time}% και έχει παύσει",
    ar: "انتهى المؤقت بعد %{time}% وتم إيقافه مؤقتًا",
    fi: "Ajastin päättyi %{time}% jälkeen ja se on tauolla",
    sv: "Timern gick ut efter %{time}% och har pausats",
    ru: "Таймер истёк через %{time}% и был приостановлен",
    tr: "Zamanlayıcı %{time}% sonra sona erdi ve duraklatıldı",
    fa: "زمان‌سنج پس از %{time}% منقضی شد و متوقف شد",
    ps: "ټایمر له %{time}% وروسته پای ته ورسېد او ودرید",
    ur: "ٹائمر %{time}% کے بعد ختم ہو گیا اور روک دیا گیا",
    hi: "टाइमर %{time}% बाद समाप्त हो गया और रुका हुआ है",
    si: "ටයිමර් %{time}% ට පසු අවසන් වී නවතා ඇත",
    ta: "டைமர் %{time}% கழித்து முடிந்தது மற்றும் நிறுத்தப்பட்டது",
    ne: "टाइमर %{time}% पछि समाप्त भयो र रोकियो",
    bn: "টাইমার %{time}% পরে শেষ হয়েছে এবং বিরতিতে রয়েছে",
    th: "ตัวจับเวลาหมดเวลา %{time}% และถูกหยุดชั่วคราว",
    vi: "Bộ hẹn giờ đã hết sau %{time}% và đang tạm dừng",
    id: "Timer telah habis setelah %{time}% dan dijeda",
    zh: "计时器在 %{time}% 后过期并已暂停",
    ms: "Pemasa tamat selepas %{time}% dan telah dihentikan sementara",
    ja: "タイマーは %{time}% 経過後に期限切れとなり、一時停止されました",
    ko: "타이머가 %{time}% 후에 만료되어 일시 정지되었습니다",
    mi: "Kua pau te pātea i muri i te %{time}% ā, kua whakatāhia",
    to: "Kuo fili 'a e taima he taimi '%{time}%' pea kuo tu'osi",
    gil: "Ko nako ni kabane e tua ni %{time}% ao e kanganga",
    ty: "Ua ha'uti te taime i te %{time}% e ua taofe"
  },

  "message.body.challenge_start": {
    en: "The Challenge starts now!",
    de: "Die Herausforderung beginnt jetzt!",
    fr: "Le défi commence maintenant !",
    it: "La sfida inizia ora!",
    es: "¡El desafío comienza ahora!",
    pt: "O desafio começa agora!",
    is: "Áskorunin hefst núna!",
    el: "Η πρόκληση ξεκινά τώρα!",
    ar: "التحدي يبدأ الآن!",
    fi: "Haaste alkaa nyt!",
    sv: "Utmaningen börjar nu!",
    ru: "Испытание начинается сейчас!",
    tr: "Meydan okuma şimdi başlıyor!",
    fa: "چالش هم‌اکنون شروع می‌شود!",
    ps: "چیلنج اوس پیلیږي!",
    ur: "چیلنج ابھی شروع ہو رہا ہے!",
    hi: "चैलेंज अब शुरू होता है!",
    si: "අභියෝගය දැන් ආරම්භ වේ!",
    ta: "சவால் இப்போது துவங்குகிறது!",
    ne: "चुनौती अहिले सुरु हुन्छ!",
    bn: "চ্যালেঞ্জ এখন শুরু হচ্ছে!",
    th: "ความท้าทายเริ่มขึ้นแล้ว!",
    vi: "Thử thách bắt đầu ngay bây giờ!",
    id: "Tantangan dimulai sekarang!",
    zh: "挑战现在开始！",
    ms: "Cabaran bermula sekarang!",
    ja: "チャレンジが今始まります！",
    ko: "도전이 지금 시작됩니다!",
    mi: "Ke tīmata te wero ināianei!",
    to: "Oku kamata 'a e Feinga!",
    gil: "E tua ni e kai aka!",
    ty: "Ua amata te fa'ata'ita'iga!"
  },

  "message.body.challenge_start.goal.entity_prefix": {
    en: "Defeat the ",
    de: "Besiege den ",
    fr: "Vaincre le ",
    it: "Sconfiggi il ",
    es: "Derrota al ",
    pt: "Derrote o ",
    is: "Sigra ",
    el: "Νίκησε τον ",
    ar: "اهزم الـ",
    fi: "Voita ",
    sv: "Besegra ",
    ru: "Победите ",
    tr: "Yen ",
    fa: "شکست بده ",
    ps: "شکست ورکړه ",
    ur: "شکست دو ",
    hi: "को हराओ ",
    si: "ජය ගන්න ",
    ta: "சவால் செய்யவும் ",
    ne: "हाराउनुहोस् ",
    bn: "পরাজিত করুন ",
    th: "เอาชนะ ",
    vi: "Đánh bại ",
    id: "Kalahkan ",
    zh: "击败 ",
    ms: "Kalahkan ",
    ja: "倒せ ",
    ko: "무찔러라 ",
    mi: "Whawhai i te ",
    to: "Fakamālohi'i e ",
    gil: "Kabane te ",
    ty: "Haʻuti te "
  },


  "message.body.challenge_start.goal.event": {
    en: "Complete the following event: ",
    de: "Beende folgendes Ereignis: ",
    fr: "Complétez l'événement suivant : ",
    it: "Completa il seguente evento: ",
    es: "Completa el siguiente evento: ",
    pt: "Complete o seguinte evento: ",
    is: "Ljúktu við eftirfarandi atburð: ",
    el: "Ολοκληρώστε το ακόλουθο γεγονός: ",
    ar: "أكمل الحدث التالي: ",
    fi: "Suorita seuraava tapahtuma: ",
    sv: "Slutför följande händelse: ",
    ru: "Завершите следующее событие: ",
    tr: "Aşağıdaki etkinliği tamamlayın: ",
    fa: "رویداد زیر را کامل کنید: ",
    ps: "لاندې پیښه بشپړه کړئ: ",
    ur: "مندرجہ ذیل ایونٹ مکمل کریں: ",
    hi: "निम्न इवेंट पूरा करें: ",
    si: "පහත සිදුවීම සම්පූර්ණ කරන්න: ",
    ta: "அடுத்த நிகழ்வை முடிக்கவும்: ",
    ne: "तलको घटनालाई पूरा गर्नुहोस्: ",
    bn: "নিম্নলিখিত ইভেন্ট সম্পন্ন করুন: ",
    th: "ทำกิจกรรมต่อไปนี้ให้สำเร็จ: ",
    vi: "Hoàn thành sự kiện sau: ",
    id: "Selesaikan acara berikut: ",
    zh: "完成以下事件：",
    ms: "Lengkapkan acara berikut: ",
    ja: "次のイベントを完了してください: ",
    ko: "다음 이벤트를 완료하세요: ",
    mi: "Whakakīia te mahi e whai ake nei: ",
    to: "Fakaoti 'a e me'a 'oku hoko: ",
    gil: "Kanikina ni e anga: "
  },

  "message.body.challenge_start.goal.event.time": {
    en: "Survive: ",
    de: "Überlebe: ",
    fr: "Survivre : ",
    it: "Sopravvivi: ",
    es: "Sobrevive: ",
    pt: "Sobreviva: ",
    is: "Lifðu af: ",
    el: "Επιβίωσε: ",
    ar: "اصمد: ",
    fi: "Selviä: ",
    sv: "Överlev: ",
    ru: "Выжить: ",
    tr: "Hayatta kal: ",
    fa: "بقای: ",
    ps: "ژوندي پاتې شئ: ",
    ur: "بچیں: ",
    hi: "जीवित रहें: ",
    si: "සත්වෙන්න: ",
    ta: "வாழவும்: ",
    ne: "बाँच्नुहोस्: ",
    bn: "বাঁচুন: ",
    th: "อยู่รอด: ",
    vi: "Sống sót: ",
    id: "Bertahan hidup: ",
    zh: "存活：",
    ms: "Bertahan: ",
    ja: "生き残れ: ",
    ko: "생존: ",
    mi: "Ora mai: ",
    to: "Moua hake: ",
    gil: "E mata ni: "
  },

  "message.body.challenge_end.bad": {
    en: "The challenge is over. Time invested: %{time}%. Thanks for playing.",
    de: "Die Herausforderung ist vorbei. Investierte Zeit: %{time}%. Danke fürs Spielen.",
    fr: "Le défi est terminé. Temps investi : %{time}%. Merci d'avoir joué.",
    it: "La sfida è finita. Tempo impiegato: %{time}%. Grazie per aver giocato.",
    es: "El desafío terminó. Tiempo invertido: %{time}%. Gracias por jugar.",
    pt: "O desafio acabou. Tempo investido: %{time}%. Obrigado por jogar.",
    is: "Áskorunin er búin. Tími sem varið var: %{time}%. Takk fyrir að spila.",
    el: "Η πρόκληση τελείωσε. Χρόνος που επενδύθηκε: %{time}%. Ευχαριστούμε που παίξατε.",
    ar: "انتهى التحدي. الوقت المستثمر: %{time}%. شكراً للعبكم.",
    fi: "Haaste on ohi. Käytetty aika: %{time}%. Kiitos pelaamisesta.",
    sv: "Utmaningen är över. Investerad tid: %{time}%. Tack för att du spelade.",
    ru: "Испытание окончено. Затраченное время: %{time}%. Спасибо за игру.",
    tr: "Meydan okuma sona erdi. Harcanan süre: %{time}%. Oynadığınız için teşekkürler.",
    fa: "چالش به پایان رسید. زمان صرف شده: %{time}%. ممنون از بازی کردن.",
    ps: "چیلنج پای ته رسید. وخت: %{time}%. مننه د لوبې لپاره.",
    ur: "چیلنج ختم ہو گیا۔ صرف کیا گیا وقت: %{time}%. کھیلنے کا شکریہ۔",
    hi: "चैलेंज खत्म हो गया। खर्च किया गया समय: %{time}%. खेलने के लिए धन्यवाद।",
    si: "අභියෝගය අවසන් විය. වැය කළ කාලය: %{time}%. ක්‍රීඩා කිරීම සඳහා ස්තුතියි.",
    ta: "சவால் முடிந்தது. செலவிட்ட நேரம்: %{time}%. விளையாடியதற்கு நன்றி.",
    ne: "चुनौती सकियो। लगाएको समय: %{time}%. खेल्नुभएकोमा धन्यवाद।",
    bn: "চ্যালেঞ্জ শেষ। ব্যয় করা সময়: %{time}%. খেলার জন্য ধন্যবাদ।",
    th: "ความท้าทายสิ้นสุดแล้ว ใช้เวลา: %{time}%. ขอบคุณที่เล่นเกมนี้",
    vi: "Thử thách kết thúc. Thời gian đã đầu tư: %{time}%. Cảm ơn bạn đã chơi.",
    id: "Tantangan selesai. Waktu yang dihabiskan: %{time}%. Terima kasih sudah bermain.",
    zh: "挑战结束。投入时间：%{time}%。感谢您的参与。",
    ms: "Cabaran telah tamat. Masa dilaburkan: %{time}%. Terima kasih kerana bermain.",
    ja: "チャレンジが終了しました。経過時間：%{time}%。プレイしてくれてありがとう。",
    ko: "도전이 종료되었습니다. 투자한 시간: %{time}%. 플레이해 주셔서 감사합니다.",
    mi: "Kua mutu te wero. Te wā i whakapaua: %{time}%. Ngā mihi mō te purei.",
    to: "Kua 'osi 'a e Feinga. Ngaahi taimi ne ma'u: %{time}%. Mālō 'aupito 'i he ta'etotolo.",
    gil: "E kanganga te tua. Taimi e kabane: %{time}%. Ko riki nako ni!",
    ty: "Ua oti te fa'ata'ita'iga. Taime fa'aalu: %{time}%. Māuruuru no te ta'a'ira'a."
  },


  "message.body.challenge_end.time.good": {
    en: "You did it! You persevered through the whole time and reached your goal!",
    de: "Du hast es geschafft! Du hast durchgehalten und dein Ziel erreicht!",
    fr: "Vous l'avez fait ! Vous avez tenu bon tout le temps et atteint votre objectif !",
    it: "Ce l'hai fatta! Hai perseverato per tutto il tempo e raggiunto il tuo obiettivo!",
    es: "¡Lo lograste! Perseveraste todo el tiempo y alcanzaste tu meta!",
    pt: "Você conseguiu! Você perseverou durante todo o tempo e alcançou seu objetivo!",
    is: "Þú gerðir það! Þú héldir út allan tímann og náðir markmiði þínu!",
    el: "Τα κατάφερες! Επιμονήσες σε όλη τη διάρκεια και έφτασες στο στόχο σου!",
    ar: "لقد فعلتها! صبرت طوال الوقت ووصلت إلى هدفك!",
    fi: "Sinä teit sen! Kestit koko ajan ja saavutit tavoitteesi!",
    sv: "Du klarade det! Du höll ut hela tiden och nådde ditt mål!",
    ru: "Ты сделал это! Ты выстоял все время и достиг своей цели!",
    tr: "Başardın! Tüm süre boyunca direndin ve hedefe ulaştın!",
    fa: "تو انجامش دادی! تو تمام مدت مقاومت کردی و به هدفت رسیدی!",
    ps: "تاسو دا وکړل! تاسو د ټول وخت له لارې زغم وکړ او خپل هدف ته ورسېدئ!",
    ur: "آپ نے کر دکھایا! آپ نے پورے وقت صبر کیا اور اپنا مقصد حاصل کیا!",
    hi: "आपने किया! आपने पूरे समय धैर्य रखा और अपना लक्ष्य हासिल किया!",
    si: "ඔබ කළා! ඔබ සෑම විටම අප්‍රමාද වූ අතර ඔබේ ඉලක්කයට ළඟා වුණා!",
    ta: "நீங்கள் செய்துவிட்டீர்கள்! நீங்கள் முழு நேரமும் விடாமுயற்சி செய்து உங்கள் இலக்கை அடைந்தீர்கள்!",
    ne: "तपाईंले गर्नुभयो! तपाईंले सम्पूर्ण समय धैर्य गर्नुभयो र लक्ष्यमा पुग्नुभयो!",
    bn: "তুমি পারলে! তুমি পুরো সময় ধৈর্য ধরলে এবং তোমার লক্ষ্য পূরণ করেছ!",
    th: "คุณทำได้! คุณอดทนตลอดเวลาทั้งหมดและบรรลุเป้าหมายของคุณ!",
    vi: "Bạn đã làm được! Bạn kiên trì suốt thời gian và đạt được mục tiêu!",
    id: "Kamu berhasil! Kamu bertahan sepanjang waktu dan mencapai tujuanmu!",
    zh: "你成功了！你坚持了整个时间并达成了目标！",
    ms: "Anda berjaya! Anda bertahan sepanjang masa dan mencapai matlamat anda!",
    ja: "やったね！ずっと頑張って目標を達成した！",
    ko: "해냈어요! 끝까지 버티고 목표에 도달했어요!",
    mi: "I tutuki i a koe! I manawanui koe i te wā katoa, ā, i eke koe ki tō whāinga!",
    to: "Na'a ke fai! Na'a ke tau ki he taimi kotoa pea na'a ke 'osi ki ho'o ngāue'aki!",
    gil: "Kaniniko! Taka naba are tuaimaro ao ngkana bon!",
    ty: "Ua rave outou! Ua fauhia e a 'oe i te taime atoa e ua tae i ta outou huru!"
  },

  "message.body.challenge_end.time.bad": {
    en: "The challenge is over because you went out of time. Thanks for playing.",
    de: "Die Herausforderung ist vorbei, weil deine Zeit abgelaufen ist. Danke fürs Spielen.",
    fr: "Le défi est terminé car votre temps est écoulé. Merci d'avoir joué.",
    it: "La sfida è finita perché il tempo è scaduto. Grazie per aver giocato.",
    es: "El desafío terminó porque se acabó tu tiempo. Gracias por jugar.",
    pt: "O desafio acabou porque seu tempo acabou. Obrigado por jogar.",
    is: "Áskorunin er búin því þú ert búinn af tíma. Takk fyrir að spila.",
    el: "Η πρόκληση τελείωσε γιατί τελείωσε ο χρόνος σου. Ευχαριστούμε που παίξατε.",
    ar: "انتهى التحدي لأن وقتك انتهى. شكراً للعبكم.",
    fi: "Haaste on ohi, koska aika loppui. Kiitos pelaamisesta.",
    sv: "Utmaningen är över eftersom din tid tog slut. Tack för att du spelade.",
    ru: "Испытание окончено, потому что время вышло. Спасибо за игру.",
    tr: "Meydan okuma sona erdi çünkü zamanın doldu. Oynadığınız için teşekkürler.",
    fa: "چالش تمام شده چون زمانت به پایان رسید. ممنون از بازی کردن.",
    ps: "چیلنج پای ته رسید ځکه چې وخت دې پای ته ورسېد. مننه د لوبې لپاره.",
    ur: "چیلنج ختم ہو گیا کیونکہ آپ کا وقت ختم ہوگیا ہے۔ کھیلنے کا شکریہ۔",
    hi: "चैलेंज खत्म हो गया क्योंकि आपका समय खत्म हो गया। खेलने के लिए धन्यवाद।",
    si: "අභියෝගය අවසන් විය, කාලය අවසන් වූ නිසා. ක්‍රීඩා කිරීම සඳහා ස්තුතියි.",
    ta: "சவால் முடிந்துவிட்டது, காரணம் நேரம் முடிந்தது. விளையாடியதற்கு நன்றி.",
    ne: "चुनौती सकियो किनभने तपाईँको समय सकियो। खेल्नुभएकोमा धन्यवाद।",
    bn: "চ্যালেঞ্জ শেষ কারণ আপনার সময় শেষ হয়ে গেছে। খেলার জন্য ধন্যবাদ।",
    th: "ความท้าทายสิ้นสุดลงเพราะเวลาของคุณหมดแล้ว ขอบคุณที่เล่นเกมนี้",
    vi: "Thử thách kết thúc vì bạn đã hết thời gian. Cảm ơn bạn đã chơi.",
    id: "Tantangan selesai karena waktumu habis. Terima kasih sudah bermain.",
    zh: "挑战结束，因为你的时间用完了。感谢您的参与。",
    ms: "Cabaran tamat kerana masa anda habis. Terima kasih kerana bermain.",
    ja: "時間切れでチャレンジは終了しました。プレイしてくれてありがとう。",
    ko: "시간이 다 되어 도전이 종료되었습니다. 플레이해 주셔서 감사합니다.",
    mi: "Kua mutu te wero nā te mea kua pau tō wā. Ngā mihi mō te purei.",
    to: "Kua 'osi 'a e Feinga 'oku pau ho'o taimi. Mālō 'aupito 'i he ta'etotolo.",
    gil: "E kanganga te tua ia n te maeke no taine moan. Ko riki nako ni!",
    ty: "Ua oti te fa'ata'ita'iga no te mea ua pau te taime. Māuruuru no te ta'a'ira'a."
  },

  "message.body.challenge_end.raid": {
    en: "You did it! You prevented the Raid and protected the village like a hero. Good Game!",
    de: "Du hast es geschafft! Du hast den Überfall verhindert und das Dorf wie ein Held beschützt. Gutes Spiel!",
    fr: "Vous l'avez fait ! Vous avez empêché le raid et protégé le village comme un héros. Bon jeu !",
    it: "Ce l'hai fatta! Hai impedito la razzia e protetto il villaggio come un eroe. Buon gioco!",
    es: "¡Lo lograste! Evitaste la incursión y protegiste la aldea como un héroe. ¡Buen juego!",
    pt: "Você conseguiu! Você impediu a invasão e protegeu a vila como um herói. Bom jogo!",
    is: "Þú gerðir það! Þú hindraðir ránið og verndaðir þorpið eins og hetja. Gott spil!",
    el: "Τα κατάφερες! Πρόλαβες την επιδρομή και προστάτεψες το χωριό σαν ήρωας. Καλή παιχνίδι!",
    ar: "لقد فعلتها! منعت الغارة وحميّت القرية كبطل. لعبة جيدة!",
    fi: "Sinä teit sen! Estit hyökkäyksen ja suojelit kylää kuin sankari. Hyvää peliä!",
    sv: "Du klarade det! Du förhindrade raiden och skyddade byn som en hjälte. Bra spel!",
    ru: "Ты сделал это! Ты предотвратил рейд и защитил деревню как герой. Хорошая игра!",
    tr: "Başardın! Baskını engelledin ve köyü bir kahraman gibi korudun. İyi oyun!",
    fa: "تو انجامش دادی! حمله را متوقف کردی و مثل یک قهرمان از روستا محافظت کردی. بازی خوبی بود!",
    ps: "تاسو دا وکړل! تاسو چاپه مخه ونیوله او کلی لکه اتل خوندي کړه. ښه لوبه!",
    ur: "آپ نے کر دکھایا! آپ نے حملہ روکا اور گاؤں کو ہیرو کی طرح بچایا۔ اچھا کھیل!",
    hi: "आपने किया! आपने छापा रोक दिया और गांव को एक हीरो की तरह बचाया। अच्छा खेल!",
    si: "ඔබ කළා! ඔබ ප‍්‍රහාරය නතර කර ගම්මානය වීරයෙකු මෙන් ආරක්ෂා කළා. හොඳ ක්‍රීඩාවක්!",
    ta: "நீங்கள் செய்துவிட்டீர்கள்! நீங்கள் தாக்குதலைத் தடுக்கும் வீரனாக கிராமத்தை பாதுகாத்தீர்கள். நல்ல விளையாட்டு!",
    ne: "तपाईंले गर्नुभयो! तपाईंले छापा रोक्नुभयो र गाउँलाई नायकजस्तै सुरक्षित राख्नुभयो। राम्रो खेल!",
    bn: "তুমি পারলে! তুমি ছাপা প্রতিরোধ করেছ এবং গ্রামের মতো একজন নায়ককে রক্ষা করেছ। ভাল খেলা!",
    th: "คุณทำได้! คุณป้องกันการจู่โจมและปกป้องหมู่บ้านเหมือนฮีโร่ เกมดี!",
    vi: "Bạn đã làm được! Bạn đã ngăn chặn cuộc đột kích và bảo vệ làng như một anh hùng. Trò chơi hay!",
    id: "Kamu berhasil! Kamu mencegah serangan dan melindungi desa seperti pahlawan. Permainan yang bagus!",
    zh: "你成功了！你阻止了袭击，像英雄一样保护了村庄。好游戏！",
    ms: "Anda berjaya! Anda menghalang serangan dan melindungi kampung seperti wira. Permainan yang bagus!",
    ja: "やったね！襲撃を防ぎ、村をヒーローのように守ったよ。いいゲーム！",
    ko: "해냈어요! 침략을 막고 마을을 영웅처럼 지켰어요. 좋은 게임!",
    mi: "I tutuki i a koe! I ārai koe i te pakanga me te tiaki i te kāinga pēnei i te toa. He kēmu pai!",
    to: "Na'a ke fai! Na'a ke ha'u 'a e lavea pea na'a ke ta'au'i 'a e kolo ko ha toa. Kātaki ki he ta'etotolo!",
    gil: "Kaniniko! E taiaki iai te kaineti ao e kanganga n te uta. Kainako!",
    ty: "Ua rave outou! Ua haapu mai 'oe i te pa'o e ua ti'a ia oe te taata toa no te fare. Haere maitai!"
  },


  "message.body.challenge_end.player": {
    en: "You guys really did it. Choosing and achieving such a stupid goal that %{name}% had to die for. I'm at a loss for words.",
    de: "Ihr habt es wirklich geschafft. Ihr habt euch ein so dummes Ziel ausgesucht und erreicht, dass %{name}% dafür sterben musste. Mir fehlen die Worte.",
    fr: "Vous l'avez vraiment fait. Choisir et atteindre un objectif aussi stupide que %{name}% a dû en mourir. Je suis sans voix.",
    it: "Ce l'avete davvero fatta. Scegliere e raggiungere un obiettivo così stupido che %{name}% ha dovuto morire per questo. Sono senza parole.",
    es: "De verdad lo hicieron. Elegir y lograr una meta tan estúpida que %{name}% tuvo que morir por ella. Me quedo sin palabras.",
    pt: "Vocês realmente conseguiram. Escolher e alcançar um objetivo tão estúpido que %{name}% teve que morrer por isso. Estou sem palavras.",
    ru: "Вы действительно сделали это. Вы выбрали и достигли такой глупой цели, ради которой %{name}% пришлось умереть. У меня нет слов.",
    sv: "Ni gjorde det verkligen. Att välja och uppnå ett så dumt mål att %{name}% var tvungen att dö för det. Jag blir mållös.",
    fi: "Te todella teitte sen. Valita ja saavuttaa niin typerä tavoite, että %{name}% joutui kuolemaan sen takia. Sanaton olen.",
    nl: "Jullie hebben het echt gedaan. Zo'n stom doel gekozen en bereikt waarvoor %{name}% moest sterven. Ik ben sprakeloos.",
    pl: "Naprawdę to zrobiliście. Wybraliście i osiągnęliście taki głupi cel, za który %{name}% musiał umrzeć. Brak mi słów.",
    tr: "Gerçekten başardınız. %{name}% için ölmesi gereken böyle aptalca bir hedef seçip başarmak. Kelimelerim tükendi.",
    ja: "本当にやり遂げたね。%{name}%が命をかけなければならなかったこんな馬鹿な目標を選んで達成するなんて。言葉もないよ。",
    ko: "정말 해냈어. %{name}%가 죽어야 했던 바보 같은 목표를 선택하고 달성하다니. 할 말이 없네.",
    zh: "你们真做到了。选择并实现了一个愚蠢的目标，以至于%{name}%不得不为此牺牲。我无言以对。",
    ar: "لقد فعلتم ذلك حقًا. اخترتم وحققتم هدفًا غبيًا حتى اضطر %{name}% للموت من أجله. لا أجد كلمات.",
    is: "Þið gerðuð það virkilega. Að velja og ná svo heimskulegu marki að %{name}% þurfti að deyja fyrir það. Ég er orðlaus.",
    da: "I gjorde det virkelig. Valgte og opnåede et så dumt mål, at %{name}% måtte dø for det. Jeg er målløs.",
    no: "Dere gjorde det virkelig. Valgte og oppnådde et så dumt mål at %{name}% måtte dø for det. Jeg er målløs.",
    hu: "Tényleg megcsináltátok. Olyan ostoba célt választottatok és értetek el, amiért %{name}%-nek meg kellett halnia. Szóhoz sem jutok."
  },


  "message.body.challenge_end.entity_0": {
    en: "You did it! You defeated the ",
    de: "Du hast es geschafft! Du hast den/die/das ",
    fr: "Vous l'avez fait ! Vous avez vaincu le/la ",
    it: "Ce l'hai fatta! Hai sconfitto il/la ",
    es: "¡Lo lograste! Has derrotado al/la ",
    pt: "Você conseguiu! Você derrotou o/a ",
    ru: "Ты сделал это! Ты победил ",
    sv: "Du klarade det! Du besegrade ",
    fi: "Sinä teit sen! Voitit ",
    nl: "Je hebt het gedaan! Je hebt de ",
    pl: "Udało ci się! Pokonałeś ",
    tr: "Başardın! Yenilen ",
    ja: "やったね！あなたは ",
    ko: "해냈어요! 당신은 ",
    zh: "你做到了！你击败了 ",
    ar: "لقد فعلتها! لقد هزمت ",
    is: "Þú gerðir það! Þú sigraðir ",
    da: "Du gjorde det! Du besejrede ",
    no: "Du gjorde det! Du beseiret ",
    hu: "Sikerült! Legyőzted a "
  },


  "message.body.challenge_end.entity_1": {
    en: " in an epic battle! Good Game!",
    de: " in einer epischen Schlacht! Gutes Spiel!",
    fr: " dans une bataille épique ! Bon jeu !",
    it: " in una battaglia epica! Buon gioco!",
    es: " en una batalla épica! ¡Buen juego!",
    pt: " em uma batalha épica! Bom jogo!",
    ru: " в эпической битве! Хорошая игра!",
    sv: " i en episk strid! Bra spel!",
    fi: " eeppisessä taistelussa! Hyvä peli!",
    nl: " in een episch gevecht! Goed spel!",
    pl: " w epickiej bitwie! Dobra gra!",
    tr: " epik bir savaşta! İyi oyun!",
    ja: " 壮大な戦いで！グッドゲーム！",
    ko: " 장대한 전투에서! 좋은 게임!",
    zh: " 在一场史诗般的战斗中！好游戏！",
    ar: " في معركة ملحمية! لعبة جيدة!",
    is: " í epískri orrustu! Gott leikur!",
    da: " i et episk slag! Godt spil!",
    no: " i et episk slag! Godt spill!",
    hu: " egy epikus csatában! Jó játék!"
  },


  // Title
  "message.title.condition.expired": {
    en: "Timer expired",
    de: "Timer abgelaufen",
    fr: "Minuteur expiré",
    it: "Timer scaduto",
    es: "Temporizador expirado",
    pt: "Temporizador expirado",
    ru: "Таймер истек",
    sv: "Timer gick ut",
    fi: "Ajastin päättynyt",
    nl: "Timer verlopen",
    pl: "Minutnik wygasł",
    tr: "Zamanlayıcı süresi doldu",
    ja: "タイマーが切れました",
    ko: "타이머 만료",
    zh: "计时器已到期",
    ar: "انتهى المؤقت",
    is: "Tími runninn út",
    da: "Timer udløbet",
    no: "Timer utløpt",
    hu: "Időzítő lejárt"
  },


  "message.title.challenge_end.good": {
    en: "§aYou Won!",
    de: "§aDu hast gewonnen!",
    fr: "§aVous avez gagné !",
    it: "§aHai vinto!",
    es: "§a¡Has ganado!",
    pt: "§aVocê venceu!",
    ru: "§aВы выиграли!",
    sv: "§aDu vann!",
    fi: "§aVoitit!",
    nl: "§aJe hebt gewonnen!",
    pl: "§aWygrałeś!",
    tr: "§aKazandın!",
    ja: "§aあなたの勝ちです！",
    ko: "§a당신이 이겼어요!",
    zh: "§a你赢了！",
    ar: "§aلقد فزت!",
    is: "§aÞú vannst!",
    da: "§aDu vandt!",
    no: "§aDu vant!",
    hu: "§aNyertél!"
  },

  "message.title.challenge_end.bad": {
    en: "§4Challenge has ended!",
    de: "§4Die Herausforderung ist beendet!",
    fr: "§4Le défi est terminé !",
    it: "§4La sfida è finita!",
    es: "§4¡El desafío ha terminado!",
    pt: "§4O desafio acabou!",
    ru: "§4Вызов завершён!",
    sv: "§4Utmaningen är slut!",
    fi: "§4Haaste on päättynyt!",
    nl: "§4De uitdaging is voorbij!",
    pl: "§4Wyzwanie zakończone!",
    tr: "§4Meydan okuma sona erdi!",
    ja: "§4チャレンジが終了しました！",
    ko: "§4도전이 끝났습니다!",
    zh: "§4挑战结束！",
    ar: "§4انتهى التحدي!",
    is: "§4Áskorunin er búin!",
    da: "§4Udfordringen er slut!",
    no: "§4Utfordringen er over!",
    hu: "§4A kihívás véget ért!"
  },



  /*------------------------
    Relative Time
  -------------------------*/

  "menu.relative_time.years": {
    en: "%{time}% years",
    de: "%{time}% Jahre",
    fr: "%{time}% ans",
    it: "%{time}% anni",
    es: "%{time}% años",
    pt: "%{time}% anos",
    ru: "%{time}% лет",
    sv: "%{time}% år",
    fi: "%{time}% vuotta",
    nl: "%{time}% jaar",
    pl: "%{time}% lat",
    tr: "%{time}% yıl",
    ja: "%{time}% 年",
    ko: "%{time}% 년",
    zh: "%{time}% 年",
    ar: "%{time}% سنوات",
    is: "%{time}% ár",
    da: "%{time}% år",
    no: "%{time}% år",
    hu: "%{time}% év"
  },

  "menu.relative_time.year": {
    en: "about a year",
    de: "ungefähr ein Jahr",
    fr: "environ un an",
    it: "circa un anno",
    es: "alrededor de un año",
    pt: "cerca de um ano",
    ru: "около года",
    sv: "ungefär ett år",
    fi: "noin vuosi",
    nl: "ongeveer een jaar",
    pl: "około roku",
    tr: "yaklaşık bir yıl",
    ja: "約1年",
    ko: "약 1년",
    zh: "大约一年",
    ar: "حوالي سنة",
    is: "um það bil eitt ár",
    da: "omtrent et år",
    no: "omtrent ett år",
    hu: "kb. egy év"
  },

  "menu.relative_time.months": {
    en: "%{time}% months",
    de: "%{time}% Monate",
    fr: "%{time}% mois",
    it: "%{time}% mesi",
    es: "%{time}% meses",
    pt: "%{time}% meses",
    ru: "%{time}% месяцев",
    sv: "%{time}% månader",
    fi: "%{time}% kuukautta",
    nl: "%{time}% maanden",
    pl: "%{time}% miesięcy",
    tr: "%{time}% ay",
    ja: "%{time}% ヶ月",
    ko: "%{time}% 개월",
    zh: "%{time}% 个月",
    ar: "%{time}% أشهر",
    is: "%{time}% mánuðir",
    da: "%{time}% måneder",
    no: "%{time}% måneder",
    hu: "%{time}% hónap"
  },

  "menu.relative_time.month": {
    en: "about a month",
    de: "fast ein Monat",
    fr: "environ un mois",
    it: "circa un mese",
    es: "alrededor de un mes",
    pt: "cerca de um mês",
    ru: "около месяца",
    sv: "ungefär en månad",
    fi: "noin kuukausi",
    nl: "ongeveer een maand",
    pl: "około miesiąca",
    tr: "yaklaşık bir ay",
    ja: "約1ヶ月",
    ko: "약 1개월",
    zh: "大约一个月",
    ar: "حوالي شهر",
    is: "um það bil einn mánuður",
    da: "omtrent en måned",
    no: "omtrent en måned",
    hu: "kb. egy hónap"
  },

  "menu.relative_time.weeks": {
    en: "%{time}% weeks",
    de: "%{time}% Wochen",
    fr: "%{time}% semaines",
    it: "%{time}% settimane",
    es: "%{time}% semanas",
    pt: "%{time}% semanas",
    ru: "%{time}% недель",
    sv: "%{time}% veckor",
    fi: "%{time}% viikkoa",
    nl: "%{time}% weken",
    pl: "%{time}% tygodni",
    tr: "%{time}% hafta",
    ja: "%{time}% 週間",
    ko: "%{time}% 주",
    zh: "%{time}% 周",
    ar: "%{time}% أسابيع",
    is: "%{time}% vikur",
    da: "%{time}% uger",
    no: "%{time}% uker",
    hu: "%{time}% hét"
  },

  "menu.relative_time.week": {
    en: "about a week",
    de: "ungefähr eine Woche",
    fr: "environ une semaine",
    it: "circa una settimana",
    es: "alrededor de una semana",
    pt: "cerca de uma semana",
    ru: "около недели",
    sv: "ungefär en vecka",
    fi: "noin viikko",
    nl: "ongeveer een week",
    pl: "około tygodnia",
    tr: "yaklaşık bir hafta",
    ja: "約1週間",
    ko: "약 1주",
    zh: "大约一周",
    ar: "حوالي أسبوع",
    is: "um það bil ein vika",
    da: "omtrent en uge",
    no: "omtrent en uke",
    hu: "kb. egy hét"
  },


  "menu.relative_time.days": {
    en: "%{time}% days",
    de: "%{time}% Tage",
    fr: "%{time}% jours",
    it: "%{time}% giorni",
    es: "%{time}% días",
    pt: "%{time}% dias",
    ru: "%{time}% дней",
    sv: "%{time}% dagar",
    fi: "%{time}% päivää",
    nl: "%{time}% dagen",
    pl: "%{time}% dni",
    tr: "%{time}% gün",
    ja: "%{time}% 日",
    ko: "%{time}% 일",
    zh: "%{time}% 天",
    ar: "%{time}% أيام",
    is: "%{time}% dagar",
    da: "%{time}% dage",
    no: "%{time}% dager",
    hu: "%{time}% nap"
  },

  "menu.relative_time.day_more": {
    en: "a bit more than a day",
    de: "etwas mehr als einen Tag",
    fr: "un peu plus d'un jour",
    it: "poco più di un giorno",
    es: "un poco más de un día",
    pt: "um pouco mais de um dia",
    ru: "чуть больше суток",
    sv: "lite mer än en dag",
    fi: "hieman yli päivän",
    nl: "iets meer dan een dag",
    pl: "trochę ponad dzień",
    tr: "bir günden biraz fazla",
    ja: "1日ちょっと超える",
    ko: "하루 조금 넘는",
    zh: "超过一天一点点",
    ar: "أكثر بقليل من يوم",
    is: "bitt meira en dagur",
    da: "lidt over en dag",
    no: "litt mer enn en dag",
    hu: "egy kicsit több mint egy nap"
  },

  "menu.relative_time.day_less": {
    en: "almost a whole day",
    de: "fast einen ganzen Tag",
    fr: "presque une journée entière",
    it: "quasi un giorno intero",
    es: "casi un día entero",
    pt: "quase um dia inteiro",
    ru: "почти целый день",
    sv: "nästan en hel dag",
    fi: "melkein koko päivä",
    nl: "bijna een hele dag",
    pl: "prawie cały dzień",
    tr: "neredeyse bütün bir gün",
    ja: "ほぼ丸一日",
    ko: "거의 하루 종일",
    zh: "差不多整整一天",
    ar: "تقريباً يوم كامل",
    is: "næstum allur dagur",
    da: "næsten en hel dag",
    no: "nesten en hel dag",
    hu: "majdnem egész nap"
  },

  "menu.relative_time.hours": {
    en: "%{time}% hours",
    de: "%{time}% Stunden",
    fr: "%{time}% heures",
    it: "%{time}% ore",
    es: "%{time}% horas",
    pt: "%{time}% horas",
    ru: "%{time}% часов",
    sv: "%{time}% timmar",
    fi: "%{time}% tuntia",
    nl: "%{time}% uur",
    pl: "%{time}% godzin",
    tr: "%{time}% saat",
    ja: "%{time}% 時間",
    ko: "%{time}% 시간",
    zh: "%{time}% 小时",
    ar: "%{time}% ساعات",
    is: "%{time}% klukkustundir",
    da: "%{time}% timer",
    no: "%{time}% timer",
    hu: "%{time}% óra"
  },

  "menu.relative_time.hour": {
    en: "about an hour",
    de: "ungefähr eine Stunde",
    fr: "environ une heure",
    it: "circa un'ora",
    es: "alrededor de una hora",
    pt: "cerca de uma hora",
    ru: "около часа",
    sv: "ungefär en timme",
    fi: "noin tunti",
    nl: "ongeveer een uur",
    pl: "około godziny",
    tr: "yaklaşık bir saat",
    ja: "約1時間",
    ko: "약 1시간",
    zh: "大约一小时",
    ar: "حوالي ساعة",
    is: "um það bil klukkutíma",
    da: "omtrent en time",
    no: "omtrent en time",
    hu: "kb. egy óra"
  },

  "menu.relative_time.hour_half": {
    en: "about an hour and a half",
    de: "ungefähr eineinhalb Stunden",
    fr: "environ une heure et demie",
    it: "circa un'ora e mezza",
    es: "alrededor de una hora y media",
    pt: "cerca de uma hora e meia",
    ru: "около полутора часов",
    sv: "ungefär en och en halv timme",
    fi: "noin puolitoista tuntia",
    nl: "ongeveer anderhalf uur",
    pl: "około półtorej godziny",
    tr: "yaklaşık bir buçuk saat",
    ja: "約1時間半",
    ko: "약 1시간 반",
    zh: "大约一个半小时",
    ar: "حوالي ساعة ونصف",
    is: "um það bil klukkutíma og hálft",
    da: "omtrent en halvanden time",
    no: "omtrent en og en halv time",
    hu: "kb. másfél óra"
  },

  "menu.relative_time.minutes": {
    en: "%{time}% minutes",
    de: "%{time}% Minuten",
    fr: "%{time}% minutes",
    it: "%{time}% minuti",
    es: "%{time}% minutos",
    pt: "%{time}% minutos",
    ru: "%{time}% минут",
    sv: "%{time}% minuter",
    fi: "%{time}% minuuttia",
    nl: "%{time}% minuten",
    pl: "%{time}% minut",
    tr: "%{time}% dakika",
    ja: "%{time}% 分",
    ko: "%{time}% 분",
    zh: "%{time}% 分钟",
    ar: "%{time}% دقائق",
    is: "%{time}% mínútur",
    da: "%{time}% minutter",
    no: "%{time}% minutter",
    hu: "%{time}% perc"
  },


  "menu.relative_time.minute": {
    en: "about a minute",
    de: "ungefähr eine Minute",
    fr: "environ une minute",
    it: "circa un minuto",
    es: "alrededor de un minuto",
    pt: "cerca de um minuto",
    ru: "около минуты",
    sv: "ungefär en minut",
    fi: "noin minuutti",
    nl: "ongeveer een minuut",
    pl: "około minuty",
    tr: "yaklaşık bir dakika",
    ja: "約1分",
    ko: "약 1분",
    zh: "大约一分钟",
    ar: "حوالي دقيقة",
    is: "um það bil mínútu",
    da: "omtrent et minut",
    no: "omtrent ett minutt",
    hu: "kb. egy perc"
  },

  "menu.relative_time.quarter_hour": {
    en: "a quarter hour",
    de: "eine Viertelstunde",
    fr: "un quart d'heure",
    it: "un quarto d'ora",
    es: "un cuarto de hora",
    pt: "um quarto de hora",
    ru: "четверть часа",
    sv: "en kvart",
    fi: "vartti",
    nl: "een kwartier",
    pl: "kwadrans",
    tr: "çeyrek saat",
    ja: "15分",
    ko: "15분",
    zh: "一刻钟",
    ar: "ربع ساعة",
    is: "fjórðungur klukkustundar",
    da: "et kvarter",
    no: "et kvarter",
    hu: "egy negyed óra"
  },

  "menu.relative_time.half_hour": {
    en: "half an hour",
    de: "eine halbe Stunde",
    fr: "une demi-heure",
    it: "mezz'ora",
    es: "media hora",
    pt: "meia hora",
    ru: "полчаса",
    sv: "en halvtimme",
    fi: "puoli tuntia",
    nl: "een halfuur",
    pl: "pół godziny",
    tr: "yarım saat",
    ja: "30分",
    ko: "30분",
    zh: "半小时",
    ar: "نصف ساعة",
    is: "hálftími",
    da: "en halv time",
    no: "en halv time",
    hu: "fél óra"
  },

  "menu.relative_time.three_quarters_hour": {
    en: "three quarters of an hour",
    de: "eine drei Viertelstunde",
    fr: "trois quarts d'heure",
    it: "tre quarti d'ora",
    es: "tres cuartos de hora",
    pt: "três quartos de hora",
    ru: "три четверти часа",
    sv: "tre kvart",
    fi: "kolme varttia",
    nl: "drie kwartier",
    pl: "trzy czwarte godziny",
    tr: "üç çeyrek saat",
    ja: "45分",
    ko: "45분",
    zh: "三个四分之一小时",
    ar: "ثلاثة أرباع الساعة",
    is: "þrír fjórðu klukkustundar",
    da: "tre kvarter",
    no: "tre kvarter",
    hu: "háromnegyed óra"
  },

  "menu.relative_time.few_seconds": {
    en: "a few seconds",
    de: "ein paar Sekunden",
    fr: "quelques secondes",
    it: "alcuni secondi",
    es: "unos segundos",
    pt: "alguns segundos",
    ru: "несколько секунд",
    sv: "några sekunder",
    fi: "muutama sekunti",
    nl: "een paar seconden",
    pl: "kilka sekund",
    tr: "birkaç saniye",
    ja: "数秒",
    ko: "몇 초",
    zh: "几秒",
    ar: "بضع ثواني",
    is: "nokkrar sekúndur",
    da: "et par sekunder",
    no: "noen sekunder",
    hu: "néhány másodperc"
  },

  "menu.relative_time.less_than_half_minute": {
    en: "less than half a minute",
    de: "weniger als eine halbe Minute",
    fr: "moins d'une demi-minute",
    it: "meno di mezz'un minuto",
    es: "menos de medio minuto",
    pt: "menos de meio minuto",
    ru: "меньше получаса",
    sv: "mindre än en halv minut",
    fi: "alle puoli minuuttia",
    nl: "minder dan een halve minuut",
    pl: "mniej niż pół minuty",
    tr: "yarım dakikadan az",
    ja: "30秒未満",
    ko: "30초 미만",
    zh: "不到半分钟",
    ar: "أقل من نصف دقيقة",
    is: "minna en hálfa mínútu",
    da: "under et halvt minut",
    no: "mindre enn et halvt minutt",
    hu: "kevesebb mint fél perc"
  },

  "menu.relative_time.half_minute": {
    en: "about half a minute",
    de: "ungefähr eine halbe Minute",
    fr: "environ une demi-minute",
    it: "circa mezzo minuto",
    es: "alrededor de medio minuto",
    pt: "cerca de meio minuto",
    ru: "около получаса",
    sv: "ungefär en halv minut",
    fi: "noin puoli minuuttia",
    nl: "ongeveer een halve minuut",
    pl: "około pół minuty",
    tr: "yaklaşık yarım dakika",
    ja: "約30秒",
    ko: "약 30초",
    zh: "大约半分钟",
    ar: "حوالي نصف دقيقة",
    is: "um það bil hálfa mínútu",
    da: "omtrent et halvt minut",
    no: "omtrent et halvt minutt",
    hu: "kb. fél perc"
  },




  /*------------------------
    Menu - General
  -------------------------*/
  // Toggles
  "menu.toggle_on": {
    en: "§aon",
    de: "§aan",
    fr: "§aactivé",
    it: "§aacceso",
    es: "§aencendido",
    pt: "§aligado",
    ru: "§aвкл",
    sv: "§apå",
    fi: "§apäälle",
    nl: "§aan",
    pl: "§awłączony",
    tr: "§a açık",
    ja: "§aオン",
    ko: "§a켜짐",
    zh: "§a开启",
    ar: "§aتشغيل",
    is: "§akveikt",
    da: "§a tændt",
    no: "§a på",
    hu: "§abe",
  },

  "menu.toggle_off": {
    en: "§coff",
    de: "§caus",
    fr: "§cdésactivé",
    it: "§cspento",
    es: "§capagado",
    pt: "§cdesligado",
    ru: "§cвыключено",
    sv: "§cav",
    fi: "§cpois",
    nl: "§cuit",
    pl: "§cwyłączony",
    tr: "§ckapalı",
    ja: "§coオフ",
    ko: "§c꺼짐",
    zh: "§c关闭",
    ar: "§cإيقاف",
    is: "§cslökkt",
    da: "§cslukket",
    no: "§cav",
    hu: "§cki"
  },


  "menu.toggle_dynamic": {
    en: "§9dynamic",
    de: "§9dynamisch",
    fr: "§9dynamique",
    it: "§9dinamico",
    es: "§9dinámico",
    pt: "§9dinâmico",
    ru: "§9динамический",
    sv: "§9dynamisk",
    fi: "§9dynaaminen",
    nl: "§9dynamisch",
    pl: "§9dynamiczny",
    tr: "§9dinamik",
    ja: "§9ダイナミック",
    ko: "§9동적",
    zh: "§9动态",
    ar: "§9ديناميكي",
    is: "§9dynamískur",
    da: "§9dynamisk",
    no: "§9dynamisk",
    hu: "§9dinamikus"
  },

  "menu.toggle_restricted": {
    en: "§orestricted",
    de: "§oeingeschränkt",
    fr: "§orestrint",
    it: "§orestritto",
    es: "§orestringido",
    pt: "§orestringido",
    ru: "§oограниченный",
    sv: "§obegränsad",
    fi: "§orajoitettu",
    nl: "§obeperkt",
    pl: "§oograniczony",
    tr: "§okısıtlı",
    ja: "§o制限された",
    ko: "§o제한된",
    zh: "§o受限的",
    ar: "§omقيد",
    is: "§otakmarkaður",
    da: "§obegrænset",
    no: "§obegrenset",
    hu: "§okorlátozott"
  },

  "menu.item_selected": {
    en: "§2(selected)",
    de: "§2(ausgewählt)",
    fr: "§2(sélectionné)",
    it: "§2(selezionato)",
    es: "§2(seleccionado)",
    pt: "§2(selecionado)",
    ru: "§2(выбрано)",
    sv: "§2(vald)",
    fi: "§2(valittu)",
    nl: "§2(geselecteerd)",
    pl: "§2(wybrano)",
    tr: "§2(seçildi)",
    ja: "§2(選択済み)",
    ko: "§2(선택됨)",
    zh: "§2(已选择)",
    ar: "§2(مختار)",
    is: "§2(valið)",
    da: "§2(valgt)",
    no: "§2(valgt)",
    hu: "§2(kiválasztva)"
  },


  "menu.item_experimental": {
    en: "§o(experimental)",
    de: "§o(experimental)",
    fr: "§o(expérimental)",
    it: "§o(sperimentale)",
    es: "§o(experimental)",
    pt: "§o(experimental)",
    ru: "§o(экспериментальный)",
    sv: "§o(experimentell)",
    fi: "§o(kokeellinen)",
    nl: "§o(experimenteel)",
    pl: "§o(eksperymentalny)",
    tr: "§o(deneysel)",
    ja: "§o(実験的)",
    ko: "§o(실험적인)",
    zh: "§o(实验性)",
    ar: "§o(تجريبي)",
    is: "§o(tilraunaverkefni)",
    da: "§o(eksperimentel)",
    no: "§o(eksperimentell)",
    hu: "§o(kísérleti)"
  },

  "menu.button_skip": {
    en: "Skip",
    de: "Überspringen",
    fr: "Passer",
    it: "Salta",
    es: "Saltar",
    pt: "Pular",
    ru: "Пропустить",
    sv: "Hoppa över",
    fi: "Ohita",
    nl: "Overslaan",
    pl: "Pomiń",
    tr: "Atla",
    ja: "スキップ",
    ko: "건너뛰기",
    zh: "跳过",
    ar: "تخطي",
    is: "Sleppa",
    da: "Spring over",
    no: "Hopp over",
    hu: "Kihagyás"
  },

  "menu.disable": {
    en: "Disable",
    de: "Ausschalten",
    fr: "Désactiver",
    it: "Disabilita",
    es: "Desactivar",
    pt: "Desativar",
    ru: "Отключить",
    sv: "Inaktivera",
    fi: "Poista käytöstä",
    nl: "Uitschakelen",
    pl: "Wyłącz",
    tr: "Devre dışı bırak",
    ja: "無効にする",
    ko: "비활성화",
    zh: "禁用",
    ar: "تعطيل",
    is: "Slökkva á",
    da: "Deaktiver",
    no: "Deaktiver",
    hu: "Kikapcsolás"
  },

  "menu.enable": {
    en: "Enable",
    de: "Einschalten",
    fr: "Activer",
    it: "Abilita",
    es: "Activar",
    pt: "Ativar",
    ru: "Включить",
    sv: "Aktivera",
    fi: "Ota käyttöön",
    nl: "Inschakelen",
    pl: "Włącz",
    tr: "Etkinleştir",
    ja: "有効にする",
    ko: "활성화",
    zh: "启用",
    ar: "تفعيل",
    is: "Kveikja á",
    da: "Aktiver",
    no: "Aktiver",
    hu: "Bekapcsolás"
  },


  "menu.yes": {
    en: "Yes",
    de: "Ja",
    fr: "Oui",
    it: "Sì",
    es: "Sí",
    pt: "Sim",
    ru: "Да",
    sv: "Ja",
    fi: "Kyllä",
    nl: "Ja",
    pl: "Tak",
    tr: "Evet",
    ja: "はい",
    ko: "예",
    zh: "是",
    ar: "نعم",
    is: "Já",
    da: "Ja",
    no: "Ja",
    hu: "Igen"
  },

  "menu.no": {
    en: "No",
    de: "Nein",
    fr: "Non",
    it: "No",
    es: "No",
    pt: "Não",
    ru: "Нет",
    sv: "Nej",
    fi: "Ei",
    nl: "Nee",
    pl: "Nie",
    tr: "Hayır",
    ja: "いいえ",
    ko: "아니요",
    zh: "不",
    ar: "لا",
    is: "Nei",
    da: "Nej",
    no: "Nei",
    hu: "Nem"
  },

  "menu.button_continue": {
    en: "Continue",
    de: "Fortfahren",
    fr: "Continuer",
    it: "Continua",
    es: "Continuar",
    pt: "Continuar",
    ru: "Продолжить",
    sv: "Fortsätt",
    fi: "Jatka",
    nl: "Doorgaan",
    pl: "Kontynuuj",
    tr: "Devam et",
    ja: "続ける",
    ko: "계속하기",
    zh: "继续",
    ar: "استمر",
    is: "Halda áfram",
    da: "Fortsæt",
    no: "Fortsett",
    hu: "Folytatás"
  },

  "menu.button_switch": {
    en: "Switch to %{name}%",
    de: "Nutze %{name}%",
    fr: "Passer à %{name}%",
    it: "Passa a %{name}%",
    es: "Cambiar a %{name}%",
    pt: "Mudar para %{name}%",
    ru: "Переключиться на %{name}%",
    sv: "Byt till %{name}%",
    fi: "Vaihda %{name}%-kohtaan",
    nl: "Schakel over naar %{name}%",
    pl: "Przełącz na %{name}%",
    tr: "%{name}% öğesine geç",
    ja: "%{name}%に切り替え",
    ko: "%{name}%로 전환",
    zh: "切换到 %{name}%",
    ar: "التبديل إلى %{name}%",
    is: "Skiptu yfir í %{name}%",
    da: "Skift til %{name}%",
    no: "Bytt til %{name}%",
    hu: "Váltás erre: %{name}%"
  },

  "menu.general.description": {
    en: "Select an option!",
    de: "Wähle eine Option!",
    fr: "Sélectionnez une option !",
    it: "Seleziona un'opzione!",
    es: "¡Selecciona una opción!",
    pt: "Selecione uma opção!",
    ru: "Выберите опцию!",
    sv: "Välj ett alternativ!",
    fi: "Valitse vaihtoehto!",
    nl: "Selecteer een optie!",
    pl: "Wybierz opcję!",
    tr: "Bir seçenek seç!",
    ja: "オプションを選択してください！",
    ko: "옵션을 선택하세요!",
    zh: "选择一个选项！",
    ar: "اختر خيارًا!",
    is: "Veldu valkost!",
    da: "Vælg en mulighed!",
    no: "Velg et alternativ!",
    hu: "Válassz egy lehetőséget!"
  },

  "menu.warning": {
    en: "Warning!",
    de: "Warnung!",
    fr: "Attention !",
    it: "Attenzione!",
    es: "¡Advertencia!",
    pt: "Aviso!",
    ru: "Внимание!",
    sv: "Varning!",
    fi: "Varoitus!",
    nl: "Waarschuwing!",
    pl: "Ostrzeżenie!",
    tr: "Uyarı!",
    ja: "警告！",
    ko: "경고!",
    zh: "警告！",
    ar: "تحذير!",
    is: "Viðvörun!",
    da: "Advarsel!",
    no: "Advarsel!",
    hu: "Figyelem!"
  },

  "menu.start": {
    en: "Start",
    fr: "Démarrer",
    it: "Avvia",
    es: "Iniciar",
    pt: "Iniciar",
    ru: "Старт",
    sv: "Start",
    fi: "Aloita",
    nl: "Start",
    pl: "Start",
    tr: "Başlat",
    ja: "開始",
    ko: "시작",
    zh: "开始",
    ar: "ابدأ",
    is: "Byrja",
    da: "Start",
    no: "Start",
    hu: "Indítás"
  },



  // Modes
  "menu.mode.stopwatch": {
    en: "Stopwatch",
    "en_uk": "Stopwatch",
    "en_us": "Stopwatch",
    "en_au": "Stopwatch",
    de: "Stoppuhr",
    de_at: "Stoppuhr",
    de_ch: "Stoppuhr",
    fr: "Chronomètre",
    fr_be: "Chronomètre",
    fr_ch: "Chronomètre",
    it: "Cronometro",
    es: "Cronómetro",
    pt: "Cronômetro",
    ru: "Секундомер",
    sv: "Stopur",
    fi: "Sekuntikello",
    ja: "ストップウォッチ",
    ko: "스톱워치",
    zh: "秒表",
    ar: "ساعة توقيت"
  },

  "menu.mode.timer": {
    en: "Timer",
    "en_uk": "Timer",
    "en_us": "Timer",
    "en_au": "Timer",
    de: "Timer",
    fr: "Minuteur",
    it: "Timer",
    es: "Temporizador",
    pt: "Temporizador",
    ru: "Таймер",
    sv: "Timer",
    fi: "Ajastin",
    ja: "タイマー",
    ko: "타이머",
    zh: "计时器",
    ar: "مؤقت"
  },

  "menu.mode.world_time": {
    en: "World time",
    "en_uk": "World time",
    "en_us": "World time",
    "en_au": "World time",
    de: "Welt-Zeit",
    de_at: "Welt-Zeit",
    de_ch: "Welt-Zeit",
    fr: "Heure mondiale",
    it: "Ora mondiale",
    es: "Hora mundial",
    pt: "Hora mundial",
    ru: "Мировое время",
    sv: "Världstid",
    fi: "Maailmanaika",
    ja: "世界時間",
    ko: "세계 시간",
    zh: "世界时间",
    ar: "الوقت العالمي"
  },

  "menu.mode.day_time": {
    en: "day time",
    "en_uk": "day time",
    "en_us": "day time",
    "en_au": "day time",
    de: "Tageszeit",
    de_at: "Tageszeit",
    de_ch: "Tageszeit",
    fr: "Heure du jour",
    it: "Ora diurna",
    es: "Hora del día",
    pt: "Hora do dia",
    ru: "Дневное время",
    sv: "Dagtid",
    fi: "Päivän aika",
    ja: "昼間",
    ko: "주간 시간",
    zh: "白天时间",
    ar: "وقت النهار"
  },


  /*------------------------
    Menu - render_task_list
  -------------------------*/

  "menu.render_task_list.difficulty.2": {
    en: "§4Hard§ccore§f is active",
    de: "§4Hard§ccore§f ist aktiv",
    fr: "§4Hard§ccore§f est actif",
    it: "§4Hard§ccore§f è attivo",
    es: "§4Hard§ccore§f está activo",
    pt: "§4Hard§ccore§f está ativo",
    ru: "§4Hard§ccore§f активен",
    sv: "§4Hard§ccore§f är aktiv",
    fi: "§4Hard§ccore§f on päällä",
    ja: "§4Hard§ccore§f が有効です",
    ko: "§4Hard§ccore§f 활성화됨",
    zh: "§4Hard§ccore§f 已激活",
    ar: "§4Hard§ccore§f نشط"
  },

  "menu.render_task_list.difficulty.3": {
    en: "§cUltra §4Hardcore§f: A heart is lost forever",
    de: "§cUltra §4Hardcore§f: Ein Herz ist für immer verloren",
    fr: "§cUltra §4Hardcore§f : Un cœur est perdu pour toujours",
    it: "§cUltra §4Hardcore§f: Un cuore è perso per sempre",
    es: "§cUltra §4Hardcore§f: Un corazón se pierde para siempre",
    pt: "§cUltra §4Hardcore§f: Um coração é perdido para sempre",
    ru: "§cUltra §4Hardcore§f: Сердце потеряно навсегда",
    sv: "§cUltra §4Hardcore§f: Ett hjärta förloras för alltid",
    fi: "§cUltra §4Hardcore§f: Sydän menetetään ikuisesti",
    ja: "§cUltra §4Hardcore§f: ハートは永遠に失われます",
    ko: "§cUltra §4Hardcore§f: 하트가 영원히 사라집니다",
    zh: "§cUltra §4Hardcore§f：心脏永远丢失",
    ar: "§cUltra §4Hardcore§f: قلب مفقود إلى الأبد"
  },

  "menu.render_task_list.difficulty.4": {
    en: "§5Infinity§f: no damage",
    de: "§5Infinity§f: kein Schaden",
    fr: "§5Infinity§f : pas de dégâts",
    it: "§5Infinity§f: nessun danno",
    es: "§5Infinity§f: sin daño",
    pt: "§5Infinity§f: sem dano",
    ru: "§5Infinity§f: без урона",
    sv: "§5Infinity§f: ingen skada",
    fi: "§5Infinity§f: ei vahinkoa",
    ja: "§5Infinity§f：ダメージなし",
    ko: "§5Infinity§f: 데미지 없음",
    zh: "§5Infinity§f：无伤害",
    ar: "§5Infinity§f: لا ضرر"
  },

  "menu.render_task_list.goal.random": {
    en: "§5Goal§f is random",
    de: "§5Ziel§f ist zufällig",
    fr: "§5Objectif§f est aléatoire",
    it: "§5Obiettivo§f è casuale",
    es: "§5Objetivo§f es aleatorio",
    pt: "§5Objetivo§f é aleatório",
    ru: "§5Цель§f случайна",
    sv: "§5Mål§f är slumpmässigt",
    fi: "§5Tavoite§f on satunnainen",
    ja: "§5目標§f はランダムです",
    ko: "§5목표§f 는 무작위입니다",
    zh: "§5目标§f 是随机的",
    ar: "§5الهدف§f عشوائي"
  },

  "menu.render_task_list.goal.entity": {
    en: "§5Goal:§f Defeat: ",
    de: "§5Ziel:§f Besiege: ",
    fr: "§5Objectif :§f Vaincre : ",
    it: "§5Obiettivo:§f Sconfiggi: ",
    es: "§5Objetivo:§f Derrota a: ",
    pt: "§5Objetivo:§f Derrote: ",
    ru: "§5Цель:§f Победить: ",
    sv: "§5Mål:§f Besegra: ",
    fi: "§5Tavoite:§f Voita: ",
    ja: "§5目標:§f 倒せ: ",
    ko: "§5목표:§f 물리쳐라: ",
    zh: "§5目标:§f 击败：",
    ar: "§5الهدف:§f هزم: "
  },

  "menu.render_task_list.goal.event": {
    en: "§5Goal:§f ",
    de: "§5Ziel:§f ",
    fr: "§5Objectif :§f ",
    it: "§5Obiettivo:§f ",
    es: "§5Objetivo:§f ",
    pt: "§5Objetivo:§f ",
    ru: "§5Цель:§f ",
    sv: "§5Mål:§f ",
    fi: "§5Tavoite:§f ",
    ja: "§5目標:§f ",
    ko: "§5목표:§f ",
    zh: "§5目标:§f ",
    ar: "§5الهدف:§f "
  },

  "menu.render_task_list.goal.event.time": {
    en: "§aTime available:§f ",
    de: "§aVerfügbare Zeit:§f ",
    fr: "§aTemps disponible :§f ",
    it: "§aTempo disponibile:§f ",
    es: "§aTiempo disponible:§f ",
    pt: "§aTempo disponível:§f ",
    ru: "§aДоступное время:§f ",
    sv: "§aTillgänglig tid:§f ",
    fi: "§aKäytettävissä oleva aika:§f ",
    ja: "§a利用可能な時間:§f ",
    ko: "§a사용 가능 시간:§f ",
    zh: "§a可用时间:§f ",
    ar: "§aالوقت المتاح:§f "
  },

  "menu.render_task_list.goal.event.time.timer": {
    en: "§aSurvive:§f ",
    de: "§aÜberleben:§f ",
    fr: "§aSurvivre :§f ",
    it: "§aSopravvivi:§f ",
    es: "§aSobrevive:§f ",
    pt: "§aSobreviva:§f ",
    ru: "§aВыжить:§f ",
    sv: "§aÖverlev:§f ",
    fi: "§aSelviä:§f ",
    ja: "§a生き残れ:§f ",
    ko: "§a생존:§f ",
    zh: "§a生存:§f ",
    ar: "§aابق على قيد الحياة:§f "
  },


  /*------------------------
    Menu - Setup
  -------------------------*/

  "menu.setup.title": {
    "en": "Initial setup",
    "de": "Ersteinrichtung",
    "fr": "Configuration initiale",
    "it": "Configurazione iniziale",
    "es": "Configuración inicial",
    "pt": "Configuração inicial",
    "is": "Upphafsstilling",
    "el": "Αρχική ρύθμιση",
    "ar": "الإعداد الأولي",
    "fi": "Alkuasetukset",
    "sv": "Initial inställning",
    "ru": "Начальная настройка",
    "tr": "İlk kurulum",
    "fa": "راه‌اندازی اولیه",
    "ps": "لومړنۍ تنظیمات",
    "ur": "ابتدائی سیٹ اپ",
    "hi": "प्रारंभिक सेटअप",
    "si": "පළමු සැකසුම",
    "ta": "ஆரம்ப அமைப்பு",
    "ne": "प्रारम्भिक सेटअप",
    "bn": "প্রাথমিক সেটআপ",
    "th": "การตั้งค่าเบื้องต้น",
    "vi": "Cài đặt ban đầu",
    "id": "Pengaturan awal",
    "zh": "初始设置",
    "ms": "Persediaan awal",
    "ja": "初期設定",
    "ko": "초기 설정",
    "mi": "Tīmatatanga tautuhi",
    "to": "Fakatonutonu fakatāmuʻa",
    "gil": "Tabun temwen",
    "ty": "Te hohoa faatupu"
  },


  "menu.setup.description": {
    "en": "Welcome %{name}%!\nDo you also think that this would be a good time to briefly introduce Timer V?\n\nThe timer should be pretty intuitive to use. That's why my recommendation is to try it rather than study it, just explore it yourself.\n\nIf this sounds a bit overwhelming feel free to check out the guide at "+links[0].link+"\n\n§7Best regards, TheFelixLive (the developer)",
    "de": "Willkommen %{name}%!\nFindest du nicht auch, dass dies ein guter Moment wäre, Timer V kurz vorzustellen?\n\nDer Timer sollte ziemlich intuitiv zu bedienen sein. Deshalb empfehle ich, ihn einfach auszuprobieren, anstatt lange darüber zu lesen – entdecke ihn selbst.\n\nFalls dir das zu viel erscheint, schau dir gerne die Anleitung an: "+links[0].link+"\n\n§7Viele Grüße, TheFelixLive (der Entwickler)",
    "fr": "Bienvenue %{name}% !\nPenses-tu aussi que ce serait le bon moment pour présenter brièvement Timer V ?\n\nLe minuteur est assez intuitif. Je te recommande donc de l'essayer plutôt que de l’étudier — explore-le toi-même.\n\nSi cela te paraît un peu trop, consulte le guide ici : "+links[0].link+"\n\n§7Cordialement, TheFelixLive (le développeur)",
    "it": "Benvenuto %{name}%!\nNon pensi anche tu che sia un buon momento per presentare brevemente Timer V?\n\nIl timer è abbastanza intuitivo. Per questo ti consiglio di provarlo invece di studiarlo, esploralo direttamente.\n\nSe ti sembra troppo impegnativo, consulta la guida qui: "+links[0].link+"\n\n§7Cordiali saluti, TheFelixLive (lo sviluppatore)",
    "es": "¡Bienvenido %{name}%!\n¿También crees que este es un buen momento para presentar brevemente Timer V?\n\nEl temporizador es fácil de usar. Por eso mi recomendación es probarlo en lugar de estudiarlo: simplemente explóralo.\n\nSi te parece demasiado, consulta la guía aquí: "+links[0].link+"\n\n§7Saludos, TheFelixLive (el desarrollador)",
    "pt": "Bem-vindo %{name}%!\nVocê também acha que este é um bom momento para apresentar rapidamente o Timer V?\n\nO temporizador é bem intuitivo. Por isso, recomendo testá-lo em vez de apenas estudá-lo — explore por conta própria.\n\nSe parecer demais, confira o guia aqui: "+links[0].link+"\n\n§7Atenciosamente, TheFelixLive (o desenvolvedor)",
    "is": "Velkomin %{name}%!\nHeldur þú að nú sé góður tími til að kynna Timer V stuttlega?\n\nTímamælirinn ætti að vera nokkuð sjálfskýr. Þess vegna mæli ég með að prófa hann fremur en að lesa um hann — skoðaðu hann sjálf/ur.\n\nEf þetta virðist of mikið, skoðaðu leiðbeiningarnar hér: "+links[0].link+"\n\n§7Kveðja, TheFelixLive (forritari)",
    "el": "Καλώς ήρθες %{name}%!\nΔεν νομίζεις ότι αυτή είναι καλή στιγμή για να παρουσιάσουμε σύντομα το Timer V;\n\nΟ χρονοδιακόπτης είναι αρκετά διαισθητικός. Γι’ αυτό σου συνιστώ να τον δοκιμάσεις αντί να τον μελετάς — εξερεύνησέ τον μόνος σου.\n\nΑν σου φαίνεται περίπλοκο, δες τον οδηγό εδώ: "+links[0].link+"\n\n§7Με εκτίμηση, TheFelixLive (ο προγραμματιστής)",
    "ar": "مرحبًا %{name}%!\nهل تظن أيضًا أن هذا هو الوقت المناسب لتقديم Timer V بإيجاز؟\n\nيعد المؤقت سهل الاستخدام إلى حد كبير. ولهذا، أوصيك بتجربته بدلًا من دراسته — استكشفه بنفسك.\n\nإذا بدا الأمر مربكًا، اطلع على الدليل هنا: "+links[0].link+"\n\n§7مع أطيب التحيات، TheFelixLive (المطور)",
    "fi": "Tervetuloa %{name}%!\nEikö mielestäsi nyt olisi hyvä hetki esitellä Timer V lyhyesti?\n\nAjastimen pitäisi olla melko intuitiivinen käyttää. Siksi suosittelen kokeilemaan sitä opiskelemisen sijaan – tutustu itse.\n\nJos tämä tuntuu liian isolta, tutustu ohjeeseen täällä: "+links[0].link+"\n\n§7Ystävällisin terveisin, TheFelixLive (kehittäjä)",
    "sv": "Välkommen %{name}%!\nTycker du också att det här är en bra tid att kort presentera Timer V?\n\nTimern ska vara ganska intuitiv att använda. Därför rekommenderar jag att du provar den istället för att studera den – utforska den själv.\n\nKänns det överväldigande? Kolla guiden här: "+links[0].link+"\n\n§7Vänliga hälsningar, TheFelixLive (utvecklaren)",
    "ru": "Добро пожаловать, %{name}%!\nКак насчёт того, чтобы кратко познакомиться с Timer V?\n\nТаймер должен быть интуитивно понятным. Поэтому советую попробовать его вместо того, чтобы изучать – исследуй самостоятельно.\n\nЕсли это кажется сложным, загляни в руководство здесь: "+links[0].link+"\n\n§7С уважением, TheFelixLive (разработчик)",
    "tr": "Hoş geldin %{name}%!\nTimer V’yi kısaca tanıtmak için iyi bir zaman olduğunu düşünüyor musun?\n\nZamanlayıcı oldukça sezgisel. Bu yüzden çalışmak yerine doğrudan denemeni öneriyorum — kendi başına keşfet.\n\nEğer karmaşık geliyorsa, rehbere burdan bakabilirsin: "+links[0].link+"\n\n§7Selamlar, TheFelixLive (geliştirici)",
    "fa": "خوش آمدی %{name}%!\nآیا فکر می‌کنی اکنون زمان مناسبی برای معرفی کوتاه Timer V باشد؟\n\nتایمر باید بسیار شهودی باشد. به همین دلیل پیشنهاد می‌کنم آن را امتحان کنی؛ نه اینکه اول مطالعه کنی — آن را خودت کشف کن.\n\nاگر کمی پیچیده به نظر می‌رسد، راهنمای آن را اینجا ببین: "+links[0].link+"\n\n§7با سپاس، TheFelixLive (توسعه‌دهنده)",
    "ps": "ښه راغلې %{name}%!\nایا ته هم فکر کوې چې اوس د Timer V لنډ معرفي کولو ښه وخت دی؟\n\nټایمر باید نسبتاً ساده وي. نو زما سپارښتنه دا ده چې لومړی یې وازمویه نه دا چې یې وڅېړې — په خپله یې ومومه.\n\nکه دا ډېر ښکاري، لارښود دلته وګوره: "+links[0].link+"\n\n§7درناوی، TheFelixLive (پرمختګ کونکی)",
    "ur": "خوش آمدید %{name}%!\nکیا آپ بھی سمجھتے ہیں کہ یہ Timer V کا مختصر تعارف کرانے کے لیے اچھا وقت ہے؟\n\nٹائمر استعمال میں کافی آسان ہونا چاہیے۔ اس لیے میری سفارش ہے کہ اسے مطالعہ کرنے کی بجائے آزمایا جائے — خود ہی دریافت کریں۔\n\nاگر یہ آپ کو زیادہ محسوس ہو تو براہ کرم گائیڈ دیکھیں: "+links[0].link+"\n\n§7نیک خواہشات، TheFelixLive (ڈیویلپر)",
    "hi": "स्वागत है %{name}%!\nक्या आपको भी लगता है कि अब Timer V को संक्षेप में पेश करने का सही समय है?\n\nटाइमर का इस्तेमाल सहज होना चाहिए। इसलिए मेरी सलाह है इसे पढ़ने की बजाय प्रयोग करें — खुद से एक्सप्लोर करें।\n\nअगर यह थोड़ा भारी लगे, तो गाइड यहां देखें: "+links[0].link+"\n\n§7शुभकामनाएं, TheFelixLive (डेवलपर)",
    "si": "සාදරයෙන් පිළිගනිමු %{name}%!\nඇයි ඔබටත් සිතෙන්නේ මේ Timer V කෙටියෙන් හඳුන්වාදීමට හොඳ අවස්ථාවක් කියලාද?\n\nටයිමරය භාවිතා කිරීමට ස්වභාවික බවකින් පමණයි. ඒ නිසා මගේ යෝජනාව තමයි ඉගෙන ගන්නට වඩා පළමැලි භාවිතා කරන්න — ඔබටම එය පරිහරණය කරන්න.\n\nමෙය ඔබට බර බවක් නම්, මගපෑදුම් මෙහි බලන්න: "+links[0].link+"\n\n§7සුභ පතමින්, TheFelixLive (මෙහෙයුම්කරුවා)",
    "ta": "வரவேற்கின்றேன் %{name}%!\nTimer V-ஐ ஒரு சிறிய அறிமுகம் தர இப்போது சரியான நேரமா என்று நீங்க நினைக்கிறீங்களா?\n\nடைமர் பயன்படுத்த மனமுடைந்ததாக இருக்க வேண்டும். அதற்காக படிக்காமல் பதிலாக முயற்சி செய்ய உங்களை நான் பரிந்துரைக்கிறேன் — உங்களையே ஆராயுங்கள்.\n\nஇது உங்களுக்கு ஏதாவது கெட்டுப்போனால், வழிகாட்டுதலை இங்கே பார்த்துக்கொள்ளுங்கள்: "+links[0].link+"\n\n§7நன்றிகளுடன், TheFelixLive (வिकசகர்)",
    "ne": "स्वागत छ %{name}%!\nके तिमी पनि सोच्छौ कि अहिले Timer V लाई संक्षेपमा चिनाउन राम्रो समय हो?\n\nटाइमर प्रयोग गर्न सहज हुनुपर्छ। त्यसैले मेरो सल्लाह छ, पढ्नुको सट्टा आजमाएर हेर — आफैं अन्वेषण गर।\n\nयदि यो अलि बढी जस्तो लाग्छ भने, गाइड यहाँ हेर्नुहोस्: "+links[0].link+"\n\n§7शुभकामना, TheFelixLive (डेभलपर)",
    "bn": "স্বাগতম %{name}%!\nআপনিও কি মনে করেন যে এখন Timer V সংক্ষেপে পরিচয় করানোর জন্য একটি ভালো সময়?\n\nটাইমার ব্যবহার করতে বেশ স্বজ্ঞাত হওয়া উচিত। তাই আমার পরামর্শ হলো পড়ার পরিবর্তে এটি নিজেই চেষ্টা করুন — নিজে এক্সপ্লোর করুন।\n\nযদি এটি বেশিই মনে হয়, তবে গাইড এখানে দেখুন: "+links[0].link+"\n\n§7শুভেচ্ছান্তে, TheFelixLive (ডেভেলপার)",
    "th": "ยินดีต้อนรับ %{name}%!\nคุณคิดเหมือนกันไหมว่านี่เป็นช่วงเวลาที่ดีในการแนะนำ Timer V แบบสั้นๆ?\n\nตัวจับเวลาควรใช้งานง่าย ดังนั้นฉันแนะนำให้ลองใช้งานแทนที่จะศึกษามัน — สำรวจด้วยตัวคุณเอง\n\nหากรู้สึกมากเกินไป ให้ดูคู่มือได้ที่นี่: "+links[0].link+"\n\n§7ด้วยความนับถือ TheFelixLive (ผู้พัฒนา)",
    "vi": "Chào mừng %{name}%!\nBạn có nghĩ rằng bây giờ là thời điểm tốt để giới thiệu ngắn gọn về Timer V không?\n\nBộ đếm giờ nên khá trực quan. Vì vậy, tôi khuyên bạn nên thử nó thay vì học nó — hãy tự khám phá.\n\nNếu cảm thấy quá nhiều, hãy xem hướng dẫn tại: "+links[0].link+"\n\n§7Trân trọng, TheFelixLive (nhà phát triển)",
    "id": "Selamat datang %{name}%!\nApakah kamu juga berpikir ini saat yang tepat untuk memperkenalkan Timer V secara singkat?\n\nTimer ini cukup intuitif. Jadi, rekomendasi saya adalah mencobanya daripada mempelajarinya — jelajahi sendiri.\n\nJika dirasa berlebihan, silakan cek panduannya di: "+links[0].link+"\n\n§7Salam, TheFelixLive (pengembang)",
    "ms": "Selamat datang %{name}%!\nAdakah anda juga rasa ini adalah masa terbaik untuk memperkenalkan Timer V secara ringkas?\n\nPenunjuk masa ini agak intuitif. Oleh itu, saya cadangkan anda mencubanya daripada mempelajarinya — jelajahi sendiri.\n\nSekiranya rasa terlalu banyak, sila lihat panduan di sini: "+links[0].link+"\n\n§7Salam hormat, TheFelixLive (pembangun)",
    "mi": "Nau mai %{name}%!\nKa whakaaro anō koe he wā tika tēnei kia whakauru poto ai i a Timer V?\n\nMe tino mārama te whakamahi i te pātea. Nō reira, ko taku whakaaro kia whakamātau mātou i mua i te ako — tirohia ake koe anō.\n\nKi te āta noho taumaha pea, titiro ki te aratohu i konei: "+links[0].link+"\n\n§7Ngā mihi, TheFelixLive (kaihanga)",
    "to": "Fakaeiki %{name}%!\nOku ke manatu lolotonga ko e taimi lelei 'eni ke fakailoa vave ki he Timer V?\n\n'Oku totonu 'a e taimi ke mahino lelei ke faka‘osi. 'I he taimi ko 'eni, ke ke sio ki ai pea ke feinga fakaosi, kau atu ke ako taha — vakaselia koe 'e taha.\n\nKapau 'oku ke fakamo'ui ange, 'omi ha fa'ahinga fakatonutonu 'i heni: "+links[0].link+"\n\n§7Mālō 'aupito, TheFelixLive (ngaue fakaʻapinga)",
    "gil": "Mauri %{name}%!\nE bonu n aron te tabweka mai ira ibukin Timer V?\n\nI eti are taeka are non ianen te kanganga ni kabane. Kabane, tia bwa ni koroia ate taeka, bwa na kara oi tauri ao kangaia bon—tangira bwa barakin.",
    "ty": "Ia ora na %{name}%!\nE mana'o outou atoa e taime maitai tenei no te fa'aintroduire poto i to tatou Timer V?\n\nTe ha'apopou nei te taime i te mea e hura i te hoho'a te huru. No reira, ua parau vau ia outou e fa'ainitia ia fa'ainiti e tae atu i te mau fifi – fa'aino ou oe iho.\n\nMe farii atu te reira i te mea tumu, 'aore ra e te fatigie, faaroo i te arata'i i kone: "+links[0].link+"\n\n§7Mauruuru, TheFelixLive (fa'aoti o te fa'ataa)"
  },


  "menu.setup.description.hardcore": {
    "en": "Welcome %{name}%!\nThis looks like your next hardcore adventure.\nBe aware that some features may work differently or may simply not be available.\n\n§7Best regards, TheFelixLive (the developer)",
    "de": "Willkommen %{name}%!\nDas sieht aus wie dein nächstes Hardcore-Abenteuer.\nSei dir bewusst, dass einige Funktionen anders funktionieren oder schlicht nicht verfügbar sein könnten.\n\n§7Viele Grüße, TheFelixLive (der Entwickler)",
    "fr": "Bienvenue %{name}% !\nCela ressemble à ta prochaine aventure hardcore.\nSache que certaines fonctionnalités peuvent fonctionner différemment ou simplement être indisponibles.\n\n§7Cordialement, TheFelixLive (le développeur)",
    "it": "Benvenuto %{name}%!\nQuesta sembra la tua prossima avventura hardcore.\nTieni presente che alcune funzionalità potrebbero funzionare in modo diverso o semplicemente non essere disponibili.\n\n§7Cordiali saluti, TheFelixLive (lo sviluppatore)",
    "es": "¡Bienvenido %{name}%!\nEsto parece tu próxima aventura hardcore.\nTen en cuenta que algunas funciones pueden funcionar de forma diferente o simplemente no estar disponibles.\n\n§7Saludos, TheFelixLive (el desarrollador)",
    "pt": "Bem-vindo %{name}%!\nIsto parece sua próxima aventura hardcore.\nEsteja ciente de que alguns recursos podem funcionar de maneira diferente ou simplesmente não estar disponíveis.\n\n§7Atenciosamente, TheFelixLive (o desenvolvedor)",
    "is": "Velkomin %{name}%!\nÞetta lítur út fyrir að vera næsta hardcore ævintýri þitt.\nVertu meðvitaður um að sumar aðgerðir geta virkað öðruvísi eða einfaldlega ekki verið tiltækar.\n\n§7Kveðja, TheFelixLive (forritari)",
    "el": "Καλώς ήρθες %{name}%!\nΑυτό μοιάζει με την επόμενή σου hardcore περιπέτεια.\nΝα ξέρεις ότι ορισμένες λειτουργίες μπορεί να λειτουργούν διαφορετικά ή να μην είναι διαθέσιμες.\n\n§7Με εκτίμηση, TheFelixLive (ο προγραμματιστής)",
    "ar": "مرحبًا %{name}%!\nيبدو أن هذه ستكون مغامرتك الصعبة التالية.\nكن على علم بأن بعض الميزات قد تعمل بشكل مختلف أو قد لا تكون متاحة ببساطة.\n\n§7مع أطيب التحيات، TheFelixLive (المطور)",
    "fi": "Tervetuloa %{name}%!\nTämä vaikuttaa seuraavalta hardcore-seikkailultasi.\nHuomaa, että jotkut ominaisuudet saattavat toimia eri tavalla tai eivät välttämättä ole saatavilla.\n\n§7Ystävällisin terveisin, TheFelixLive (kehittäjä)",
    "sv": "Välkommen %{name}%!\nDet här ser ut att bli ditt nästa hardcore-äventyr.\nVar medveten om att vissa funktioner kan fungera annorlunda eller helt enkelt inte vara tillgängliga.\n\n§7Vänliga hälsningar, TheFelixLive (utvecklaren)",
    "ru": "Добро пожаловать, %{name}%!\nПохоже, это будет твое следующее хардкор-приключение.\nУчти, что некоторые функции могут работать иначе или просто быть недоступны.\n\n§7С уважением, TheFelixLive (разработчик)",
    "tr": "Hoş geldin %{name}%!\nBu senin bir sonraki hardcore maceran gibi görünüyor.\nBazı özelliklerin farklı çalışabileceğini veya hiç kullanılamayabileceğini unutma.\n\n§7Selamlar, TheFelixLive (geliştirici)",
    "fa": "خوش آمدی %{name}%!\nاین به نظر ماجراجویی هاردکور بعدی توست.\nآگاه باش که ممکن است برخی ویژگی‌ها به‌طور متفاوت کار کنند یا اصلاً در دسترس نباشند.\n\n§7با احترام، TheFelixLive (توسعه‌دهنده)",
    "ps": "ښه راغلې %{name}%!\nدا ښکاري چې ستا راتلونکی هارډکور ماجراجویی وي.\nخبر اوسې چې ځینې ځانګړتیاوې ممکن په مختلف ډول کار وکړي یا شتون ونلري.\n\n§7درناوی، TheFelixLive (پرمختیا کونکی)",
    "ur": "خوش آمدید %{name}%!\nیہ آپ کی اگلی ہارڈکور مہم معلوم ہوتی ہے۔\nخیال رکھیں کہ کچھ فیچرز مختلف طریقے سے کام کر سکتے ہیں یا دستیاب نہ بھی ہوں۔\n\n§7نیک خواہشات، TheFelixLive (ڈیویلپر)",
    "hi": "स्वागत है %{name}%!\nयह तुम्हारा अगला हार्डकोर साहसिक कार्य लग रहा है।\nध्यान दें कि कुछ सुविधाएं अलग तरीके से काम कर सकती हैं या उपलब्ध नहीं हो सकती हैं।\n\n§7शुभकामनाएं, TheFelixLive (डेवलपर)",
    "si": "සාදරයෙන් පිළිගනිමු %{name}%!\nමෙය ඔබගේ ඊළඟ දැඩි අත්පහරුවක් ලෙස පෙනේ.\nසලකන්න සමහර විශේෂාංග වෙනස්ව ක්‍රියා කරනු දැනුවත් වන්න හෝ නොලබාගත හැකි බවක් ඇත.\n\n§7සුභ පතමින්, TheFelixLive (මෙහෙයුම්කරුවා)",
    "ta": "வரவேற்கின்றேன் %{name}%!\nஇது உங்கள் அடுத்த ஹார்ட்கோருக்கான சாகசமாகத் தோன்றுகிறது.\nசில அம்சங்கள் வேறுபட்ட முறையில் செயல்படலாம் அல்லது கிடைக்காமை ஏற்படலாம்.\n\n§7நன்றிகளுடன், TheFelixLive (விகசகர்)",
    "ne": "स्वागत छ %{name}%!\nयो तिम्रो अर्को हार्डकोर साहसिक झैं देखिन्छ।\nकेही सुविधाहरूले फरक तरिकाले काम गर्न सक्छन् वा उपलब्ध नहुन सक्छन् भन्ने कुरा मनन गर।\n\n§7शुभकामना, TheFelixLive (डेभलपर)",
    "bn": "স্বাগতম %{name}%!\nএটি আপনার পরবর্তী হার্ডকোর অ্যাডভেঞ্চার বলে মনে হয়।\nকিছু বৈশিষ্ট্য ভিন্নভাবে কাজ করতে পারে বা সেগুলো উপলব্ধ না-ও থাকতে পারে, সচেতন থাকুন।\n\n§7শুভেচ্ছান্তে, TheFelixLive (ডেভেলপার)",
    "th": "ยินดีต้อนรับ %{name}%!\nนี่ดูเหมือนการผจญภัยฮาร์ดคอร์ครั้งต่อไปของคุณ\nโปรดทราบว่าฟีเจอร์บางอย่างอาจทำงานต่างออกไปหรืออาจไม่พร้อมใช้งาน\n\n§7ด้วยความเคารพ, TheFelixLive (ผู้พัฒนา)",
    "vi": "Chào mừng %{name}%!\nĐiều này trông giống như cuộc phiêu lưu hardcore tiếp theo của bạn.\nHãy lưu ý rằng một số tính năng có thể hoạt động khác hoặc đơn giản là không khả dụng.\n\n§7Trân trọng, TheFelixLive (nhà phát triển)",
    "id": "Selamat datang %{name}%!\nIni terlihat seperti petualangan hardcore berikutnya untukmu.\nPerlu diingat bahwa beberapa fitur mungkin berfungsi berbeda atau tidak tersedia.\n\n§7Salam, TheFelixLive (pengembang)",
    "ms": "Selamat datang %{name}%!\nIni kelihatan seperti pengembaraan hardcore anda yang seterusnya.\nHarap maklum bahawa sesetengah ciri mungkin berfungsi berbeza atau tidak tersedia.\n\n§7Salam hormat, TheFelixLive (pembangun)",
    "mi": "Nau mai %{name}%!\nKe titiro ana tēnei ki tō haerenga hardcore e whai ake nei.\nMe mōhio, ka mahi ētahi āhuatanga i tētahi atu huarahi, kāore rānei e wātea ana.\n\n§7Ngā mihi, TheFelixLive (kaihanga)",
    "to": "Fakaeiki %{name}%!\nKo e me'a ko eni hā ka hoko ko ho'o kainga 'o e ngaahi fehalaaki hardcore fakasolopito.\nFakamo'ui'i te ke 'ilo totonu eni 'e fakahoko ha ngaahi ngāue kehe pe 'e 'ikai ke lava.\n\n§7Fakamālō atu, TheFelixLive (ngaue fakaʻapinga)",
    "gil": "Maurin %{name}%!\nBwara emamwe era are aoamwan ao ni kabane ni kamuraki emur rikin Tabweker V.\nTaetae bwa katoka ni mangarake ni bwa ke mourin na ana ni kabane ni karoro.\n\n§7Ko rabaki, TheFelixLive (kaimanea)",
    "ty": "Ia ora na %{name}%!\nE huru outou i to pa'umutu vahi feia'i hardcore matou to roa nei.\nMe matau atu pe mea e rave matamua, te vai ra e mau rave'a e eita e pāpūria ra pe eita e tu'ati.\n\n§7Mauruuru, TheFelixLive (te mau fa'a'a'o)"
  },


  /*------------------------
    Menu - Update popup
  -------------------------*/

  "menu.update.title": {
    "en": "Update time!",
    "de": "Zeit für ein Update!",
    "fr": "Il est temps de mettre à jour !",
    "it": "È ora di aggiornare!",
    "es": "¡Hora de actualizar!",
    "pt": "Hora de atualizar!",
    "is": "Tími til að uppfæra!",
    "el": "Ώρα για ενημέρωση!",
    "ar": "حان وقت التحديث!",
    "fi": "Päivitysaika!",
    "sv": "Dags att uppdatera!",
    "ru": "Время обновиться!",
    "tr": "Güncelleme zamanı!",
    "fa": "زمان به‌روزرسانی!",
    "ps": "د نوي کولو وخت!",
    "ur": "اپ ڈیٹ کا وقت!",
    "hi": "अपडेट का समय!",
    "si": "යාවත්කාලීන කිරීමට වේලාව !",
    "ta": "புதுப்பிக்கும் நேரம்!",
    "ne": "अद्यावधिक गर्न समय!",
    "bn": "আপডেট করার সময়!",
    "th": "ถึงเวลาปรับปรุง!",
    "vi": "Đến lúc cập nhật!",
    "id": "Waktunya memperbarui!",
    "ms": "Masa untuk mengemas kini!",
    "zh": "是时候更新了！",
    "ja": "アップデートの時間です！",
    "ko": "업데이트할 시간입니다!",
    "mi": "Te wā whakahou!",
    "to": "Ko e taimi ke faʻafou!",
    "gil": "Bon tem bwe update!",
    "ty": "Tāime e faaohipa i te faafou!"
  },

  "menu.update.description": {
    "en": "Your current version (" + version_info.version + ") is now %{time}% old.\nThere MIGHT be a newer version out. Feel free to update to enjoy the latest features!\n\nCheck out: §7" + links[0].link,
    "de": "Deine aktuelle Version (" + version_info.version + ") ist jetzt %{time}% alt.\nEs KÖNNTE eine neuere Version geben. Aktualisiere gerne, um die neuesten Funktionen zu nutzen!\n\nSchau hier: §7" + links[0].link,
    "fr": "Votre version actuelle (" + version_info.version + ") a maintenant %{time}%.\nIl SE POURRAIT qu’une version plus récente soit disponible. N’hésitez pas à mettre à jour pour profiter des dernières fonctionnalités !\n\nVoir : §7" + links[0].link,
    "it": "La tua versione attuale (" + version_info.version + ") ha ormai %{time}%.\nPOTREBBE esserci una versione più recente. Sentiti libero di aggiornare per goderti le ultime funzionalità!\n\nScopri qui: §7" + links[0].link,
    "es": "Tu versión actual (" + version_info.version + ") ya tiene %{time}%.\nPODRÍA haber una versión más reciente. ¡No dudes en actualizar para disfrutar de las novedades!\n\nConsulta: §7" + links[0].link,
    "pt": "Sua versão atual (" + version_info.version + ") já tem %{time}%.\nPODE haver uma versão mais recente disponível. Sinta-se à vontade para atualizar e aproveitar os recursos mais recentes!\n\nConfira: §7" + links[0].link,
    "is": "Núverandi útgáfa þín (" + version_info.version + ") er nú %{time}% gömul.\nÞAR GÆTI verið nýrri útgáfa fáanleg. Uppfærðu endilega til að njóta nýjustu eiginleika!\n\nSkoðaðu: §7" + links[0].link,
    "el": "Η τρέχουσα έκδοσή σας (" + version_info.version + ") είναι πλέον %{time}% παλιά.\nΜΠΟΡΕΙ να υπάρχει νεότερη έκδοση. Μη διστάσετε να ενημερώσετε για να απολαύσετε τις τελευταίες λειτουργίες!\n\nΔείτε: §7" + links[0].link,
    "ar": "إصدارك الحالي (" + version_info.version + ") أصبح الآن %{time}% قديمًا.\nقد تكون هناك نسخة أحدث متوفرة. لا تتردد في التحديث للاستمتاع بأحدث الميزات!\n\nتفقد: §7" + links[0].link,
    "fi": "Nykyinen versiosi (" + version_info.version + ") on nyt %{time}% vanha.\nVOI olla uudempi versio saatavilla. Päivitä rohkeasti nauttiaksesi uusimmista ominaisuuksista!\n\nKatso: §7" + links[0].link,
    "sv": "Din nuvarande version (" + version_info.version + ") är nu %{time}% gammal.\nDET KAN finnas en nyare version. Uppdatera gärna för att få de senaste funktionerna!\n\nKolla: §7" + links[0].link,
    "ru": "Ваша текущая версия (" + version_info.version + ") уже %{time}% стара.\nВОЗМОЖНО, доступна более новая версия. Обновитесь, чтобы наслаждаться новыми возможностями!\n\nСсылка: §7" + links[0].link,
    "tr": "Mevcut sürümünüz (" + version_info.version + ") artık %{time}% eski.\nDaha yeni bir sürüm OLABİLİR. En son özellikleri kullanmak için güncellemeyi deneyin!\n\nGöz atın: §7" + links[0].link,
    "fa": "نسخه فعلی شما (" + version_info.version + ") اکنون %{time}% قدیمی است.\nممکن است نسخه جدیدتری عرضه شده باشد. برای بهره‌مندی از آخرین ویژگی‌ها، حتماً بروزرسانی کنید!\n\nبررسی: §7" + links[0].link,
    "ps": "ستاسو اوسنی نسخه (" + version_info.version + ") اوس %{time}% زړې شوې.\nکېدای شي نوې نسخه شتون ولري. د وروستي ځانګړتیاوو لپاره تازه کول وکړئ!\n\nکتنه: §7" + links[0].link,
    "ur": "آپ کا موجودہ ورژن (" + version_info.version + ") اب %{time}% پرانا ہے۔\nممکن ہے کوئی نئی ورژن دستیاب ہو۔ تازہ کاری کریں اور جدید ترین خصوصیات سے لطف اندوز ہوں!\n\nجانیے: §7" + links[0].link,
    "hi": "आपका वर्तमान संस्करण (" + version_info.version + ") अब %{time}% पुराना है।\nसंभव है कि कोई नया संस्करण उपलब्ध हो। नवीनतम सुविधाओं का आनंद लेने के लिए अपडेट करें!\n\nदेखें: §7" + links[0].link,
    "si": "ඔබගේ වර්තමාන පිටපත (" + version_info.version + ") දැන් %{time}% පරණයි.\nවැඩි නවතම පිටපතක් තිබිය හැක. නවතම විශේෂාංග භුක්ති විඳීමට යාවත්කාලීන කරන්න!\n\nබලන්න: §7" + links[0].link,
    "ta": "உங்கள் தற்போதைய பதிப்பு (" + version_info.version + ") இப்போது %{time}% பழுதானது.\nபுதிய பதிப்பு கிடைத்திருக்கலாம். சமீபத்திய அம்சங்களை அனுபவ, புதுப்பிக்க தயங்க வேண்டாம்!\n\nசரி பார்க்க: §7" + links[0].link,
    "ne": "तपाईंको हालको संस्करण (" + version_info.version + ") अहिले %{time}% पुरानो भयो।\nशायदै नयाँ संस्करण उपलब्ध हुन सक्छ। नयाँ सुविधाहरूको मजा लिन अपडेट गर्नुहोस्!\n\nहेर्नुहोस्: §7" + links[0].link,
    "bn": "আপনার বর্তমান সংস্করণ (" + version_info.version + ") এখন %{time}% পুরনো।\nসম্ভবত নতুন সংস্করণ উপলব্ধ আছে। সর্বশেষ বৈশিষ্ট্যগুলি উপভোগ করতে আপডেট করুন!\n\nচেক করুন: §7" + links[0].link,
    "th": "เวอร์ชันปัจจุบันของคุณ (" + version_info.version + ") ตอนนี้มีอายุ %{time}% แล้ว\nอาจมีเวอร์ชันใหม่กว่า ให้คุณอัปเดตเพื่อรับคุณสมบัติล่าสุด!\n\nดูได้ที่: §7" + links[0].link,
    "vi": "Phiên bản hiện tại của bạn (" + version_info.version + ") đã %{time}% tuổi.\nCÓ THỂ có phiên bản mới hơn. Hãy cập nhật để tận hưởng tính năng mới nhất!\n\nXem tại: §7" + links[0].link,
    "id": "Versi Anda saat ini (" + version_info.version + ") sekarang berusia %{time}%.\nBISA ADA versi lebih baru. Silakan perbarui untuk menikmati fitur terbaru!\n\nCek: §7" + links[0].link,
    "ms": "Versi semasa anda (" + version_info.version + ") kini berumur %{time}%.\nMUNGKIN ada versi lebih baru. Kemas kini untuk menikmati ciri terkini!\n\nLihat: §7" + links[0].link,
    "zh": "您当前的版本（" + version_info.version + "）已 %{time}% 过时。\n可能有新版本可用。随时更新以体验最新功能！\n\n查看：§7" + links[0].link,
    "ja": "現在のバージョン（" + version_info.version + "）は %{time}% 前のものです。\n新しいバージョンがあるかもしれません。最新機能を楽しむためにアップデートしてください！\n\n確認：§7" + links[0].link,
    "ko": "현재 버전(" + version_info.version + ")이 이제 %{time}% 지났습니다.\n새 버전이 있을 수 있습니다. 최신 기능을 사용하려면 업데이트하세요!\n\n확인: §7" + links[0].link,
    "mi": "Ko tō putanga o nāianei (" + version_info.version + ") kua %{time}% tawhito.\nKA MŌREA he putanga hou atu. Kia whakahou kia pai koe ki ngā āhuatanga hou!\n\nTirohia: §7" + links[0].link,
    "to": "Ko ho‘o fa‘ahinga i aso ni (" + version_info.version + ") kua %{time}% nofo ‘a e taimi.\n‘Oku ‘i ai ‘a e fa‘ahinga fo‘ou pe lava. Toe faʻafou kia ma‘u ‘a e ngaahi me‘angaue fo‘ou!\n\nPehe ki: §7" + links[0].link,
    "gil": "Burakin ko rengin (" + version_info.version + ") e na ni %{time}% karebon.\nMaeka ni bon ao ara bon kabane? Kabane, bon update n riki ate nanon!\n\nKanikina: §7" + links[0].link,
    "ty": "E hi‘o outou i tō putanga i teie nei (" + version_info.version + ") ua %{time}% tua’i nei.\nUA MAU te ho‘i hoê putanga api. Faafaufaa faafou ia ite i te mau hi‘oraa api!\n\nA hi‘opoa: §7" + links[0].link
  },

  "menu.update.mute": {
    "en": "Mute",
    "de": "Stummschalten",
    "fr": "Muet",
    "it": "Silenzioso",
    "es": "Silenciar",
    "pt": "Mudo",
    "is": "Þögla",
    "el": "Σίγαση",
    "ar": "كتم",
    "fi": "Mykistä",
    "sv": "Ljud av",
    "ru": "Отключить звук",
    "tr": "Sesi kapat",
    "fa": "بی‌صدا",
    "ps": "بندول",
    "ur": "خاموش کریں",
    "hi": "म्युट",
    "si": "නිශ්ඵල",
    "ta": "மௌனமிடு",
    "ne": "म्युट",
    "bn": "নীরব",
    "th": "ปิดเสียง",
    "vi": "Tắt tiếng",
    "id": "Mati suara",
    "ms": "Senyapkan",
    "zh": "静音",
    "ja": "ミュート",
    "ko": "음소거",
    "mi": "Māngere",
    "to": "Fakatu‘u fakatā",
    "gil": "Bwe kango",
    "ty": "Motu"
  },


  /*------------------------
    Menu - UU
  -------------------------*/

"menu.uu.title": {
  "en": "Convert",
  "de": "Konvertieren",
  "fr": "Convertir",
  "it": "Converti",
  "es": "Convertir",
  "pt": "Converter",
  "is": "Breyta",
  "el": "Μετατροπή",
  "ar": "تحويل",
  "fi": "Muunna",
  "sv": "Konvertera",
  "ru": "Преобразовать",
  "tr": "Dönüştür",
  "fa": "تبدیل",
  "ps": "بدلون",
  "ur": "تبدیل کریں",
  "hi": "बदलें",
  "si": "වෙනස් කරන්න",
  "ta": "மாற்று",
  "ne": "रूपान्तरण",
  "bn": "রূপান্তর",
  "th": "แปลง",
  "vi": "Chuyển đổi",
  "id": "Konversi",
  "ms": "Tukar",
  "zh": "转换",
  "ja": "変換",
  "ko": "변환",
  "mi": "Hurihia",
  "to": "Liliu",
  "gil": "Twirawa",
  "ty": "Tāpī'"
},

"menu.uu.description": {
  "en": "It looks like you've used the timer before.\nDo you want to update your save data from %{old_versio}% to " + version_info.version + "?\n\n§7Note: Once you update your save data to a newer version, you can no longer use it with the older version!",
  "de": "Es sieht so aus, als hättest du den Timer schon verwendet.\nMöchtest du deine Spieldaten von %{old_versio}% auf " + version_info.version + " aktualisieren?\n\n§7Hinweis: Wenn du deine Daten auf eine neuere Version aktualisierst, kannst du sie nicht mehr mit der älteren verwenden!",
  "fr": "Il semble que vous ayez déjà utilisé le minuteur.\nVoulez‑vous mettre à jour vos données de %{old_versio}% vers " + version_info.version + " ?\n\n§7Remarque: une fois vos données mises à jour vers une version plus récente, vous ne pourrez plus les utiliser avec l’ancienne!",
  "it": "Sembra che tu abbia già usato il timer.\nVuoi aggiornare i tuoi dati di salvataggio da %{old_versio}% a " + version_info.version + "?\n\n§7Nota: una volta aggiornati i dati a una versione più recente, non potrai più usarli con quella vecchia!",
  "es": "Parece que ya has usado el temporizador.\n¿Quieres actualizar tus datos de %{old_versio}% a " + version_info.version + "?\n\n§7Nota: ¡una vez actualizados a una versión más reciente, ya no podrás usarlos con la anterior!",
  "pt": "Parece que você já usou o temporizador antes.\nDeseja atualizar seus dados de %{old_versio}% para " + version_info.version + "?\n\n§7Observação: uma vez atualizados para uma versão mais nova, você não poderá mais usá‑los na versão antiga!",
  "is": "Það lítur út fyrir að þú hafir notað tímamælinn áður.\nViltu uppfæra vistunargögnin þín úr %{old_versio}% í " + version_info.version + "?\n\n§7Athugið: Þegar þú uppfærir vistunargögnin í nýrri útgáfu, getur þú ekki notað þau í eldri útgáfunni!",
  "el": "Φαίνεται ότι έχετε χρησιμοποιήσει τον χρονοδιακόπτη πριν.\nΘέλετε να ενημερώσετε τα αποθηκευμένα δεδομένα από %{old_versio}% σε " + version_info.version + ";\n\n§7Σημείωση: Μόλις ενημερώσετε τα δεδομένα σε νεότερη έκδοση, δεν μπορείτε να τα χρησιμοποιήσετε στην παλαιότερη!",
  "ar": "يبدو أنك استخدمت المؤقت من قبل.\nهل تريد تحديث بيانات الحفظ من %{old_versio}% إلى " + version_info.version + "؟\n\n§7ملاحظة: بمجرد تحديث البيانات إلى إصدار أحدث، لن تتمكن من استخدامها مع الإصدار القديم!",
  "fi": "Näyttää siltä, että olet käyttänyt ajastinta aiemmin.\nHaluatko päivittää tallennetut tiedot versiosta %{old_versio}% versioon " + version_info.version + "?\n\n§7Huom: Kun päivität tiedot uudempiin versioihin, et enää voi käyttää niitä vanhemman version kanssa!",
  "sv": "Det verkar som att du har använt timern tidigare.\nVill du uppdatera dina sparade data från %{old_versio}% till " + version_info.version + "?\n\n§7Obs: När du uppdaterar dina data till en nyare version kan du inte använda dem i den äldre!",
  "ru": "Похоже, вы уже использовали таймер.\nХотите обновить ваши данные сохранения с %{old_versio}% до " + version_info.version + "?\n\n§7Примечание: после обновления данных до новой версии вы не сможете использовать их со старой!",
  "tr": "Görünüşe göre zamanlayıcıyı daha önce kullandınız.\nKayıt verilerinizi %{old_versio}% sürümünden " + version_info.version + " sürümüne güncellemek ister misiniz?\n\n§7Not: Verileri daha yeni bir sürüme güncellediğinizde eski sürümle kullanamazsınız!",
  "fa": "به نظر می‌رسد قبلاً از تایمر استفاده کرده‌اید.\nمی‌خواهید داده‌های ذخیره‌شده خود را از %{old_versio}% به " + version_info.version + " به‌روزرسانی کنید؟\n\n§7توجه: پس از به‌روزرسانی داده‌ها به نسخه جدیدتر، دیگر نمی‌توانید از آن‌ها در نسخه قدیمی استفاده کنید!",
  "ps": "دا ښکاري چې تاسو دمخه ټایمر کارولی وي.\nایا غواړئ خپل خوندي شوي ډاټا له %{old_versio}% څخه " + version_info.version + " ته نوي کړئ؟\n\n§7یادونه: یو ځل چې ډاټا یوې نوې نسخې ته نوي کړای شي، له زړې نسخې سره یې کارولی نه شئ!",
  "ur": "لگتا ہے آپ نے پہلے ٹائمر استعمال کیا ہے۔\nکیا آپ اپنے محفوظ ڈیٹا کو %{old_versio}% سے " + version_info.version + " پر اپ ڈیٹ کرنا چاہتے ہیں؟\n\n§7نوٹ: ایک بار جب آپ ڈیٹا کو نئی ورژن پر اپ ڈیٹ کر دیں گے، تو آپ اسے پرانے ورژن کے ساتھ نہیں استعمال کر سکیں گے!",
  "hi": "ऐसा लगता है कि आपने पहले टाइमर का उपयोग किया है।\nक्या आप अपने सेव्ड डेटा को %{old_versio}% से " + version_info.version + " में अपडेट करना चाहते हैं?\n\n§7ध्यान दें: एक बार डेटा को नई संस्करण में अपडेट करने पर आप इसे पुरानी में उपयोग नहीं कर पाएंगे!",
  "si": "ඔබ කලින් එම ටයිමරය භාවිතා කර ඇති බව පෙනේ.\nඔබගේ සුරක්ෂිත දත්ත %{old_versio}% සිට " + version_info.version + " වෙත යාවත්කාලීන කළ යුතුද?\n\n§7සටහන: දත්ත නවතම සංස්කරණයට යාවත්කාලීන කළ පසු, පැරණි සංස්කරණය සමඟ භාවිතා කළ නොහැක!",
  "ta": "நீங்கள் இதற்கு முன் டைமரை பயன்படுத்தியதுபோல் தெரிகிறது.\nஉங்கள் சேமிப்பு தரவை %{old_versio}% இருந்து " + version_info.version + " ஆக புதுப்பிக்க வேண்டுமா?\n\n§7குறிப்பு: தரவை புதிய பதிப்பாக புதுப்பித்தால், பழைய பதிப்பில் பயன்படுத்த முடியாது!",
  "ne": "तपाईंले पहिले टाइमर प्रयोग गरेको जस्तो देखिन्छ।\nके तपाईं आफ्नो सेभ डेटा %{old_versio}% बाट " + version_info.version + " मा अपडेट गर्न चाहनुहुन्छ?\n\n§7नोट: एक पटक डेटा नयाँ संस्करणमा अपडेट गर्दा पुरानो संस्करणसँग प्रयोग गर्न सकिँदैन!",
  "bn": "দেখা যাচ্ছে আপনি আগে টাইমার ব্যবহার করেছেন।\nআপনি কি আপনার সেভ ডেটা %{old_versio}% থেকে " + version_info.version + " এ আপডেট করতে চান?\n\n§7দ্রষ্টব্য: একবার ডেটা নতুন সংস্করণে আপডেট করলে, আপনি সেটি পুরনো সংস্করণের সাথে ব্যবহার করতে পারবেন না!",
  "th": "ดูเหมือนว่าคุณเคยใช้ตัวจับเวลาก่อนหน้านี้\nคุณต้องการอัปเดตข้อมูลบันทึกจาก %{old_versio}% เป็น " + version_info.version + " หรือไม่\n\n§7หมายเหตุ: เมื่ออัปเดตข้อมูลเป็นเวอร์ชันใหม่กว่าแล้ว จะไม่สามารถใช้ข้อมูลกับเวอร์ชันเก่าได้!",
  "vi": "Có vẻ như bạn đã sử dụng bộ hẹn giờ trước đây.\nBạn có muốn cập nhật dữ liệu lưu từ %{old_versio}% lên " + version_info.version + " không?\n\n§7Lưu ý: Khi bạn cập nhật dữ liệu lên phiên bản mới, bạn không thể sử dụng nó với phiên bản cũ!",
  "id": "Sepertinya Anda pernah menggunakan timer ini sebelumnya.\nApakah Anda ingin memperbarui data simpanan dari %{old_versio}% ke " + version_info.version + "?\n\n§7Catatan: Setelah memperbarui data ke versi baru, Anda tidak dapat menggunakannya di versi lama!",
  "ms": "Nampaknya anda telah menggunakan penunjuk masa sebelum ini.\nAdakah anda ingin mengemas kini data simpanan dari %{old_versio}% ke " + version_info.version + "?\n\n§7Catatan: Setelah mengemas kini data ke versi baru, anda tidak dapat menggunakannya dengan versi lama!",
  "zh": "看起来您之前已经使用过定时器。\n您是否想将存档数据从 %{old_versio}% 更新到 " + version_info.version + "？\n\n§7注意：一旦将存档数据更新到新版本，就无法在旧版本中使用！",
  "ja": "以前にタイマーを使用したようですね。\nセーブデータを %{old_versio}% から " + version_info.version + " に更新しますか？\n\n§7注意：データを新しいバージョンに更新すると、古いバージョンでは使用できなくなります！",
  "ko": "이전에 타이머를 사용한 것 같습니다.\n저장 데이터를 %{old_versio}%에서 " + version_info.version + "으로 업데이트하시겠습니까?\n\n§7참고: 저장 데이터를 새 버전으로 업데이트하면 이전 버전에서 사용할 수 없습니다!",
  "mi": "Te titiro nei kua whakamahi koe i te pātea i mua.\nE hiahia ana koe ki te whakahou i ō raraunga penapena mai i %{old_versio}% ki " + version_info.version + "?\n\n§7Tuhipoka: Ka whakahoutia ngā raraunga ki tētahi putanga hou, kāore e taea te whakamahi ki tētahi putanga tawhito!",
  "to": "Kuo ke faka‘afe‘i he timisi he mua.\nOku ke fiema‘u ke hoko ke faka‘ilonga ho‘o fakapapau mai %{old_versio}% ki he " + version_info.version + "?\n\n§7Fakamolemole: Kapau na ke faka‘ilonga ho‘o fakapapau ki ha fa‘ahinga fo‘ou, ‘e ‘ikai ke lava ke ke faka⠻ koe ki hono tu‘o!",
  "gil": "Tarakin bwakin karin kabwami ni timer ao.\nIa ti ni reke ni kabane data bwakin reapaki mai %{old_versio}% ao update n " + version_info.version + "?\n\n§7Note: Kabane data e akina reke eri ao kabane ni kanganga bwa barakin update, e n tia bwa aron bone!",
  "ty": "Ua ite vau ua faaaogā outou i te taime i mua.\nE hinaaro outou e faafou i ho outou mau raraunga mai %{old_versio}% i to outou putanga " + version_info.version + "?\n\n§7Note: Ia faafou outou i te mau raraunga ki te putanga api, eita roa outou e faararaa ia i te putanga matamua!"
},

  "menu.uu.update": {
    "en": "update",
    "de": "aktualisieren",
    "fr": "mettre à jour",
    "it": "aggiorna",
    "es": "actualizar",
    "pt": "atualizar",
    "is": "uppfæra",
    "el": "ενημέρωση",
    "ar": "تحديث",
    "fi": "päivitä",
    "sv": "uppdatera",
    "ru": "обновить",
    "tr": "güncelle",
    "fa": "به‌روزرسانی",
    "ps": "نوی کول",
    "ur": "اپ ڈیٹ",
    "hi": "अपडेट",
    "si": "යාවත්කාලීන කරන්න",
    "ta": "புதுப்பி",
    "ne": "अद्यावधिक",
    "bn": "আপডেট",
    "th": "อัปเดต",
    "vi": "cập nhật",
    "id": "perbarui",
    "ms": "kemas kini",
    "zh": "更新",
    "ja": "更新",
    "ko": "업데이트",
    "mi": "whakahou",
    "to": "faafou",
    "gil": "update",
    "ty": "faafou"
  },

  "menu.uu.note.ca": {
    "en": "Challenge settings could not be transferred because they are not currently supported",
    "de": "Challenge-Einstellungen konnten nicht übertragen werden, da sie derzeit nicht unterstützt werden",
    "fr": "Les paramètres du défi n’ont pas pu être transférés car ils ne sont pas pris en charge pour le moment",
    "it": "Le impostazioni di sfida non possono essere trasferite perché non sono attualmente supportate",
    "es": "No se pudieron transferir los ajustes del desafío porque no son compatibles en este momento",
    "pt": "As configurações de desafio não puderam ser transferidas porque não são suportadas no momento",
    "is": "Uppsetningar áskorunar máttu ekki flytja því þær eru ekki studdar núna",
    "el": "Οι ρυθμίσεις της πρόκλησης δεν μπορούσαν να μεταφερθούν επειδή δεν υποστηρίζονται αυτήν τη στιγμή",
    "ar": "لم نتمكن من نقل إعدادات التحدي لأنها غير مدعومة حالياً",
    "fi": "Haasteasetuksia ei voitu siirtää, koska niitä ei tueta tällä hetkellä",
    "sv": "Utmaningsinställningarna kunde inte överföras eftersom de inte stöds för närvarande",
    "ru": "Настройки испытания не удалось перенести, так как они в данный момент не поддерживаются",
    "tr": "Meydan okuma ayarları şu anda desteklenmediği için aktarılamadı",
    "fa": "تنظیمات چالش قابل انتقال نیستند چون در حال حاضر پشتیبانی نمی‌شوند",
    "ps": "د چلنج تنظیمات نشوای انتقالېدای ځکه چې دا اوس مهال ملاتړ نه کېږي",
    "ur": "چیلنج کی ترتیبات منتقل نہیں کی جاسکیں چونکہ یہ فی الحال معاونت یافتہ نہیں ہیں",
    "hi": "चैलेंज सेटिंग्स ट्रांसफर नहीं हो सकीं क्योंकि वे वर्तमान में समर्थित नहीं हैं",
    "si": "අභියෝග සකස් කිරීම් මාරු කළ නොහැකි විය, එය දැනටමත් සහය නොදක්වයි",
    "ta": "சவால் அமைப்புகளை இப்போது ஆதரிக்காததால் மாற்ற முடியவில்லை",
    "ne": "चुनौती सेटिङ्स सार्न सकिएन किनकि हाल समर्थित छैनन्",
    "bn": "চ্যালেঞ্জ সেটিংস স্থানান্তর করা যায়নি কারণ সেগুলি বর্তমানে সমর্থিত নয়",
    "th": "ไม่สามารถโอนไปยังการตั้งค่าความท้าทายได้เนื่องจากยังไม่รองรับ",
    "vi": "Không thể chuyển cài đặt thử thách vì hiện chưa được hỗ trợ",
    "id": "Pengaturan tantangan tidak dapat dipindahkan karena saat ini tidak didukung",
    "ms": "Tetapan cabaran tidak dapat dipindahkan kerana ia tidak disokong buat masa ini",
    "zh": "无法传输挑战设置，因为当前不支持",
    "ja": "チャレンジ設定は現在サポートされていないため、転送できませんでした",
    "ko": "도전 설정은 현재 지원되지 않아 전송할 수 없습니다",
    "mi": "Kāore i taea te kawe ngā tautuhinga wero nā te mea kāore e tautokohia ināianei",
    "to": "‘Oku ‘ikai ke lava ‘o faka‘ilonga e tokoni ‘o e feinga taʻe ‘oku ‘ikai ke tokoni'i he taimi ni",
    "gil": "Challenge settings e n reke ni kabane ma'aka bwa e karoa ni e kanganga kaira",
    "ty": "Aita e faanahoraa fàta‘ita‘i i te faufaa no te mea eita e tauturu i teie nei taime"
  },

  "menu.uu.data_lost.title": {
    "en": "Some data will be lost!",
    "de": "Einige Daten gehen verloren!",
    "fr": "Certaines données seront perdues!",
    "it": "Alcuni dati andranno persi!",
    "es": "¡Se perderán algunos datos!",
    "pt": "Alguns dados serão perdidos!",
    "is": "Sumar gagna tapast!",
    "el": "Κάποια δεδομένα θα χαθούν!",
    "ar": "بعض البيانات ستفقد!",
    "fi": "Joitakin tietoja katoaa!",
    "sv": "Vissa data går förlorade!",
    "ru": "Некоторые данные будут утрачены!",
    "tr": "Bazı veriler silinecek!",
    "fa": "برخی داده‌ها از دست خواهند رفت!",
    "ps": "ځینې معلومات به له منځه ولاړ شي!",
    "ur": "کچھ ڈیٹا ضائع ہو جائے گا!",
    "hi": "कुछ डेटा खो जाएगा!",
    "si": "සමහරු දත්ත අහිමි වේ!",
    "ta": "சில தரவுகள் இழக்கப்படும்!",
    "ne": "केही डेटा हराउनेछ!",
    "bn": "কিছু ডেটা হারানো হবে!",
    "th": "ข้อมูลบางส่วนจะหายไป!",
    "vi": "Một số dữ liệu sẽ bị mất!",
    "id": "Beberapa data akan hilang!",
    "ms": "Beberapa data akan hilang!",
    "zh": "部分数据将丢失！",
    "ja": "一部のデータが失われます！",
    "ko": "일부 데이터가 손실됩니다!",
    "mi": "Ka ngaro ētahi raraunga!",
    "to": "‘E ngalo ha ngaahi tala!",
    "gil": "Some data e n kanganga!",
    "ty": "E ngaro ētahi raraunga!"
  },

  "menu.uu.data_lost.description": {
    "en": "This version contains save data for a total of %{totalPlayers}% players, %{onlinePlayers}% of which are online.\nOnly save data from players who are online can be transferred.\n\nThis would result in a data loss of §l§c%{dataLossPercent}% Percent§r!",
    "de": "Diese Version enthält Spieldaten von insgesamt %{totalPlayers}% Spielern, davon %{onlinePlayers}% online.\nNur die Daten von Spielern, die online sind, können übertragen werden.\n\nDies würde zu einem Datenverlust von §l§c%{dataLossPercent}% Prozent§r führen!",
    "fr": "Cette version contient des données de sauvegarde pour %{totalPlayers}% joueurs, dont %{onlinePlayers}% sont en ligne.\nSeules les données des joueurs connectés peuvent être transférées.\n\nCela entraînerait une perte de données de §l§c%{dataLossPercent}%pourcent§r!",
    "it": "Questa versione contiene dati di salvataggio per un totale di %{totalPlayers}% giocatori, di cui %{onlinePlayers}% online.\nPossono essere trasferiti solo i dati dei giocatori attualmente online.\n\nQuesto comporterebbe una perdita di dati del §l§c%{dataLossPercent}% percento§r!",
    "es": "Esta versión contiene datos de guardado de %{totalPlayers}% jugadores, de los cuales %{onlinePlayers}% están en línea.\nSolo se pueden transferir los datos de los jugadores que estén en línea.\n\n¡Esto resultaría en una pérdida de datos del §l§c%{dataLossPercent}% por ciento§r!",
    "pt": "Esta versão contém dados salvos para um total de %{totalPlayers}% jogadores, %{onlinePlayers}% dos quais estão online.\nApenas os dados de jogadores que estão online podem ser transferidos.\n\nIsso resultaria em uma perda de dados de §l§c%{dataLossPercent}% porcento§r!",
    "is": "Þessi útgáfa inniheldur vistunargögn fyrir samtals %{totalPlayers}% spilara, þar af %{onlinePlayers}% á netinu.\nAðeins gögn spilara sem eru á netinu er hægt að flytja.\n\nÞetta myndi leiða til tap á §l§c%{dataLossPercent}% prósent§r gagna!",
    "el": "Αυτή η έκδοση περιέχει δεδομένα αποθήκευσης για συνολικά %{totalPlayers}% παίκτες, εκ των οποίων %{onlinePlayers}% είναι συνδεδεμένοι.\nΜπορούν να μεταφερθούν μόνο τα δεδομένα παικτών που είναι συνδεδεμένοι.\n\nΑυτό θα είχε ως αποτέλεσμα απώλεια δεδομένων κατά §l§c%{dataLossPercent}% τοις εκατό§r!",
    "ar": "تحتوي هذه النسخة على بيانات حفظ لـ %{totalPlayers}% لاعبين، %{onlinePlayers}% منهم متصلون.\nيمكن نقل بيانات اللاعبين المتصلين فقط.\n\nسيؤدي ذلك إلى فقدان بيانات بنسبة §l§c%{dataLossPercent}% بالمئة§r!",
    "fi": "Tämä versio sisältää tallennustietoja yhteensä %{totalPlayers}% pelaajalta, joista %{onlinePlayers}% on verkossa.\nVain verkossa olevien pelaajien tiedot voidaan siirtää.\n\nTämä johtaisi §l§c%{dataLossPercent}% prosentin§r tietohävikkiin!",
    "sv": "Denna version innehåller spardata för totalt %{totalPlayers}% spelare, varav %{onlinePlayers}% är online.\nEndast data från spelare som är online kan överföras.\n\nDetta skulle resultera i en dataförlust på §l§c%{dataLossPercent}% procent§r!",
    "ru": "Эта версия содержит данные сохранения для %{totalPlayers}% игроков, из которых %{onlinePlayers}% онлайн.\nМожно перенести только данные онлайн-игроков.\n\nЭто приведет к потере данных в размере §l§c%{dataLossPercent}% процентов§r!",
    "tr": "Bu sürüm, toplam %{totalPlayers}% oyuncu için kayıt verisi içeriyor, bunların %{onlinePlayers}%'i çevrimiçi.\nSadece çevrimiçi oyuncuların verileri aktarılabilir.\n\nBu, §l§c%{dataLossPercent}% oranında§r veri kaybına yol açar!",
    "fa": "این نسخه شامل داده‌های ذخیره‌سازی %{totalPlayers}% بازیکن است که %{onlinePlayers}% از آن‌ها آنلاین هستند.\nفقط داده‌های بازیکنان آنلاین قابل انتقال‌اند.\n\nاین منجر به از دست رفتن §l§c%{dataLossPercent}% درصد§r داده می‌شود!",
    "ps": "دا نسخه د ټولټال %{totalPlayers}% لوبغاړو د خوندي کولو ډاټا لري، چې %{onlinePlayers}% یې آنلاین دي.\nیوازې د آنلاین لوبغاړو ډاټا انتقالېدای شي.\n\nدا به د ډاټا ضایعاتو لامل شي چې §l§c%{dataLossPercent}%٪ دي§r!",
    "ur": "یہ ورژن کل %{totalPlayers}% کھلاڑیوں کے محفوظ شدہ ڈیٹا پر مشتمل ہے، جن میں سے %{onlinePlayers}% آن لائن ہیں۔\nصرف آن لائن کھلاڑیوں کا ڈیٹا منتقل کیا جا سکتا ہے۔\n\nاس کے نتیجے میں §l§c%{dataLossPercent}% فیصد§r ڈیٹا ضائع ہوگا!",
    "hi": "इस संस्करण में कुल %{totalPlayers}% खिलाड़ियों का सेव डेटा है, जिनमें से %{onlinePlayers}% ऑनलाइन हैं।\nकेवल ऑनलाइन खिलाड़ियों के डेटा को स्थानांतरित किया जा सकता है।\n\nइससे §l§c%{dataLossPercent}% प्रतिशत§r डेटा खो जाएगा!",
    "si": "මෙම සංස්කරණයෙහි ක්‍රීඩකයින් %{totalPlayers}% දෙනෙකුගේ සුරක්ෂිත දත්ත ඇත, ඔවුන්ගෙන් %{onlinePlayers}% අන්තර්ජාලයේ සිටී.\nඅන්තර්ජාලයේ සිටින ක්‍රීඩකයින්ගේ දත්ත පමණක් එක් කළ හැක.\n\nමෙම ක්‍රියාව §l§c%{dataLossPercent}% ප්‍රතිශත§r දත්ත නෂ්ටයට ගෙන ඒමට හේතු වේ!",
    "ta": "இந்த வெளியீடு மொத்தம் %{totalPlayers}% வீரர்களுக்கான சேமிப்பு தரவுகளை கொண்டுள்ளது, அவற்றில் %{onlinePlayers}% ஆன்லைனில் உள்ளனர்.\nஆன்லைனில் உள்ள வீரர்களின் தரவுகளை மட்டுமே மாற்ற முடியும்.\n\nஇதனால் §l§c%{dataLossPercent}% சதவீதம்§r தரவு இழப்பு ஏற்படும்!",
    "ne": "यो संस्करणमा जम्मा %{totalPlayers}% खेलाडीहरूको सेभ डेटा छ, जसमा %{onlinePlayers}% अनलाइन छन्।\nकेवल अनलाइन खेलाडीहरूको डेटा सार्न सकिन्छ।\n\nयसबाट §l§c%{dataLossPercent}% प्रतिशत§r डेटा हराउनेछ!",
    "bn": "এই সংস্করণে মোট %{totalPlayers}% খেলোয়াড়ের সেভড ডেটা রয়েছে, যার %{onlinePlayers}% অনলাইনে আছে।\nশুধুমাত্র অনলাইনে থাকা খেলোয়াড়দের ডেটা স্থানান্তর করা যাবে।\n\nএর ফলে §l§c%{dataLossPercent}% শতাংশ§r ডেটা হারাবে!",
    "th": "เวอร์ชันนี้มีข้อมูลบันทึกของผู้เล่นทั้งหมด %{totalPlayers}% คน โดย %{onlinePlayers}% คนออนไลน์อยู่\nสามารถย้ายข้อมูลเฉพาะผู้เล่นที่ออนไลน์เท่านั้น\n\nจะทำให้ข้อมูลหายไป §l§c%{dataLossPercent}% เปอร์เซ็นต์§r!",
    "vi": "Phiên bản này chứa dữ liệu lưu cho tổng cộng %{totalPlayers}% người chơi, trong đó %{onlinePlayers}% đang trực tuyến.\nChỉ dữ liệu của những người chơi đang trực tuyến mới có thể được chuyển.\n\nĐiều này sẽ dẫn đến mất §l§c%{dataLossPercent}% phần trăm§r dữ liệu!",
    "id": "Versi ini berisi data simpan untuk total %{totalPlayers}% pemain, %{onlinePlayers}% di antaranya online.\nHanya data pemain yang online yang dapat dipindahkan.\n\nIni akan mengakibatkan kehilangan data sebesar §l§c%{dataLossPercent}% persen§r!",
    "ms": "Versi ini mengandungi data simpan untuk sejumlah %{totalPlayers}% pemain, %{onlinePlayers}% daripadanya dalam talian.\nHanya data pemain yang dalam talian boleh dipindahkan.\n\nIni akan mengakibatkan kehilangan data sebanyak §l§c%{dataLossPercent}% peratus§r!",
    "zh": "此版本包含 %{totalPlayers}% 位玩家的存档数据，其中 %{onlinePlayers}% 正在在线。\n只有在线玩家的数据可以被转移。\n\n这将导致 §l§c%{dataLossPercent}%％§r 的数据丢失！",
    "ja": "このバージョンには合計 %{totalPlayers}% 人のセーブデータが含まれており、そのうち %{onlinePlayers}% 人がオンラインです。\nオンラインのプレイヤーのデータのみ転送できます。\n\nこれにより §l§c%{dataLossPercent}%％§r のデータが失われます！",
    "ko": "이 버전에는 총 %{totalPlayers}%명의 저장 데이터가 포함되어 있으며, 그 중 %{onlinePlayers}%명이 온라인 상태입니다.\n온라인인 플레이어의 데이터만 전송할 수 있습니다.\n\n이로 인해 §l§c%{dataLossPercent}%％§r 의 데이터가 손실됩니다!",
    "mi": "Kei roto i tēnei putanga ngā raraunga penapena mō te katoa %{totalPlayers}% kaitākaro, ā, %{onlinePlayers}% kei runga ipurangi.\nTonoa kia kawe anō ngā raraunga nō ngā kaitākaro kei runga ipurangi anake.\n\nKa hua mai he ngaronga raraunga o §l§c%{dataLossPercent}% ōrau§r!",
    "to": "Ko e fa‘ahinga ko ‘eni ‘oku totonu ke ma‘u ha tala ke ne faka‘ilonga ‘a e kakai ʻo e ta‘etotolo %{totalPlayers}%, pea ‘e % {onlinePlayers}% ‘i ‘a e ngaahi mode ni ‘i he initaneti.\n’Oku ne lava ‘o fetongi pē e tala ni ‘i he kakai ‘oku ‘i ‘a e initaneti.\n\nKo eni ‘e fe‘unga ke ngalo ha §l§c%{dataLossPercent}% pasene§r ‘o e tala!",
    "gil": "Te taeka version e nako ni burokaro data bwakin %, totalPlayers ao %, onlinePlayers bon tabake.\nNabane bon data are online ni kabane ia bo atua naraki.\n\nKaonakan ni e ngana ni bon hongoraki data §l§c%{dataLossPercent}% ro%",
    "ty": "E rave te putuputu putanga nei i te mau raraunga penapena no te mau ta‘ata tākaro e % {totalPlayers}%, e % {onlinePlayers}% i te mau taime online.\nE nehenehe ana‘e ia faao ai te mau raraunga no te mau ta‘ata tākaro e tai‘a online anake.\n\nE faaoti ai te farii na§l§c%{dataLossPercent}% pae§r o te mau raraunga!"
  },

  "menu.uu.compleat.description": {
    "en": "It's done!\nYou can now enjoy the new " + version_info.name,
    "de": "Geschafft!\nDu kannst jetzt das neue " + version_info.name + " genießen",
    "fr": "C’est fait!\nVous pouvez désormais profiter du nouveau " + version_info.name,
    "it": "Fatto!\nOra puoi goderti il nuovo " + version_info.name,
    "es": "¡Listo!\nAhora puedes disfrutar del nuevo " + version_info.name,
    "pt": "Concluído!\nAgora você pode aproveitar o novo " + version_info.name,
    "is": "Þetta er búið!\nÞú getur nú notið nýja " + version_info.name,
    "el": "Έγινε!\nΤώρα μπορείτε να απολαύσετε το νέο " + version_info.name,
    "ar": "تم الأمر!\nيمكنك الآن الاستمتاع بـ " + version_info.name,
    "fi": "Valmista!\nNyt voit nauttia uudesta " + version_info.name,
    "sv": "Klart!\nNu kan du njuta av nya " + version_info.name,
    "ru": "Готово!\nТеперь вы можете насладиться новым " + version_info.name,
    "tr": "Tamamlandı!\nArtık yeni " + version_info.name + " keyfini çıkarabilirsiniz",
    "fa": "انجام شد!\nاکنون می‌توانید از نسخه جدید " + version_info.name + " لذت ببرید",
    "ps": "بشول شو!\nتاسو اوس کولی شئ د نوي " + version_info.name + " خوند واخلئ",
    "ur": "یہ ہو گیا!\nاب آپ نئے " + version_info.name + " سے لطف اندوز ہو سکتے ہیں",
    "hi": "हो गया!\nअब आप नए " + version_info.name + " का आनंद ले सकते हैं",
    "si": "හැසිරවුණා!\nඔබ දැන් නව " + version_info.name + " විඳින්න පුළුවන්",
    "ta": "இது முடிந்துவிட்டது!\nஇப்போது நீங்கள் புதிய " + version_info.name + " ஐ அனுபவிக்கலாம்",
    "ne": "यो भयो!\nअब तपाईं नयाँ " + version_info.name + " को मजा लिन सक्नुहुन्छ",
    "bn": "হয়ে গেল!\nএখন আপনি নতুন " + version_info.name + " উপভোগ করতে পারেন",
    "th": "เสร็จเรียบร้อย!\nตอนนี้คุณสามารถสนุกกับ " + version_info.name + " ใหม่ได้แล้ว",
    "vi": "Xong rồi!\nBây giờ bạn có thể tận hưởng " + version_info.name + " mới",
    "id": "Selesai!\nSekarang Anda dapat menikmati " + version_info.name + " baru",
    "ms": "Selesai!\nKini anda boleh menikmati " + version_info.name + " baharu",
    "zh": "完成！\n您现在可以体验新版 " + version_info.name,
    "ja": "完了！\n新しい " + version_info.name + " をお楽しみください",
    "ko": "완료되었습니다!\n이제 새로운 " + version_info.name + " 를 즐기실 수 있습니다",
    "mi": "Kua oti!\nKa taea e koe inaianei te pai ki te hōu " + version_info.name,
    "to": "Kuo ne 'osi!\n‘Oku ke lava ni fakafiefia he ngaahi me‘angaue fo‘ou " + version_info.name,
    "gil": "Bon karebon!\nE kabane ni bon riki ni ae " + version_info.name,
    "ty": "Ua oti!\nE nehenehe ta outou i faaitoito i te hohoa api " + version_info.name
  },

  "menu.uu.compleat.description.note": {
    "en": "Note",
    "de": "Hinweis",
    "fr": "Remarque",
    "it": "Nota",
    "es": "Nota",
    "pt": "Nota",
    "is": "Athugasemd",
    "el": "Σημείωση",
    "ar": "ملاحظة",
    "fi": "Huomautus",
    "sv": "Notering",
    "ru": "Примечание",
    "tr": "Not",
    "fa": "یادداشت",
    "ps": "یادښت",
    "ur": "نوٹ",
    "hi": "नोट",
    "si": "සටහන",
    "ta": "குறிப்பு",
    "ne": "नोट",
    "bn": "নোট",
    "th": "บันทึก",
    "vi": "Ghi chú",
    "id": "Catatan",
    "ms": "Nota",
    "zh": "注意",
    "ja": "メモ",
    "ko": "메모",
    "mi": "Tuhipoka",
    "to": "Fa‘ahinga manatu‘i",
    "gil": "Tikuare",
    "ty": "Faatitia"
  },


  /*------------------------
    Menu - Main menu
  -------------------------*/

  "menu.main.title": {
    "en": "Main menu",
    "de": "Hauptmenü",
    "fr": "Menu principal",
    "it": "Menu principale",
    "es": "Menú principal",
    "pt": "Menu principal",
    "is": "Aðalvalmynd",
    "el": "Κύριο μενού",
    "ar": "القائمة الرئيسية",
    "fi": "Päävalikko",
    "sv": "Huvudmeny",
    "ru": "Главное меню",
    "tr": "Ana menü",
    "fa": "منوی اصلی",
    "ps": "اصلي مېنو",
    "ur": "مرکزی مینو",
    "hi": "मुख्य मेनू",
    "si": "ප්‍රධාන මෙනුව",
    "ta": "முதன்மை மெனு",
    "ne": "मुख्य मेनू",
    "bn": "প্রধান মেনু",
    "th": "เมนูหลัก",
    "vi": "Menu chính",
    "id": "Menu utama",
    "ms": "Menu utama",
    "zh": "主菜单",
    "ja": "メインメニュー",
    "ko": "메인 메뉴",
    "mi": "Tahua matua",
    "to": "Tū papa taha",
    "gil": "Mēnu nako ni",
    "ty": "Tohina matamua"
  },

  "menu.main.description.ca": {
    "en": "Here's a brief overview, what you have setup:",
    "de": "Hier eine kurze Übersicht über deine Einstellungen:",
    "fr": "Voici un aperçu rapide de ce que vous avez configuré:",
    "it": "Ecco una breve panoramica di ciò che hai impostato:",
    "es": "Aquí tienes un breve resumen de lo que has configurado:",
    "pt": "Aqui está uma visão geral rápida do que você configurou:",
    "is": "Hér er stutt yfirlit yfir það sem þú hefur stillt:",
    "el": "Εδώ είναι μια σύντομη επισκόπηση των ρυθμίσεών σας:",
    "ar": "إليك نظرة عامة سريعة على ما قمت بإعداده:",
    "fi": "Tässä on lyhyt yleiskatsaus asetuksistasi:",
    "sv": "Här är en snabb översikt över vad du har ställt in:",
    "ru": "Ниже краткий обзор ваших настроек:",
    "tr": "İşte ayarladıklarınızın kısa bir özeti:",
    "fa": "در اینجا مروری کوتاه بر تنظیمات شما آمده است:",
    "ps": "دلته ستاسو د تنظیماتو لنډه کتنه ده:",
    "ur": "یہاں آپ کی ترتیبات کا مختصر جائزہ ہے:",
    "hi": "यहाँ आपने जो सेटअप किया है उसका संक्षिप्त विवरण है:",
    "si": "මෙන්න ඔබ සකස් කළ දේ පිළිබඳ කෙටි සාරාංශය:",
    "ta": "நீங்கள் அமைத்ததைத் தொகுத்து காண்பித்துள்ளேன்:",
    "ne": "तपाईंले सेटअप गर्नु भएकोको संक्षिप्त अवलोकन:",
    "bn": "এখানে আপনি যে বিষয়গুলি সেটআপ করেছেন তার সংক্ষিপ্ত ওভারভিউ:",
    "th": "นี่คือการสรุปสั้นๆ เกี่ยวกับสิ่งที่คุณตั้งค่าไว้:",
    "vi": "Đây là cái nhìn tổng quan ngắn gọn về những gì bạn đã thiết lập:",
    "id": "Berikut ringkasan singkat tentang apa yang telah Anda atur:",
    "ms": "Berikut gambaran ringkas apa yang telah anda tetapkan:",
    "zh": "以下是您所设置内容的简要概览：",
    "ja": "設定内容の簡単な概要はこちら：",
    "ko": "설정한 내용의 간략한 개요는 다음과 같습니다:",
    "mi": "Anei he tirohanga pāpaku ki tā koe whakarite:",
    "to": "Lā ʻenei ha fakamatala poto ki he ngaahi meʻa naʻu ke ke fakaleleʻi:",
    "gil": "E koroa te tabweker ni emamwe ara:",
    "ty": "A here te hohoa poto no te mau tautuhinga:"
  },

  "menu.main.reset.title": {
    "en": "Reset %{mode}%",
    "de": "Setze %{mode}% zurück",
    "fr": "Réinitialiser %{mode}%",
    "it": "Reimposta %{mode}%",
    "es": "Restablecer %{mode}%",
    "pt": "Redefinir %{mode}%",
    "is": "Endurstilla %{mode}%",
    "el": "Επαναφορά %{mode}%",
    "ar": "إعادة ضبط %{mode}%",
    "fi": "Palauta %{mode}%",
    "sv": "Återställ %{mode}%",
    "ru": "Сбросить %{mode}%",
    "tr": "%{mode}% sıfırla",
    "fa": "بازنشانی %{mode}%",
    "ps": "%{mode}% بیا تنظیم کړه",
    "ur": "%{mode}% ری سیٹ کریں",
    "hi": "%{mode}% रीसेट करें",
    "si": "%{mode}% නැවත සකසන්න",
    "ta": "%{mode}% மீட்டமை",
    "ne": "%{mode}% रिसेट गर्नुहोस्",
    "bn": "%{mode}% রিসেট করুন",
    "th": "รีเซ็ต %{mode}%",
    "vi": "Đặt lại %{mode}%",
    "id": "Atur ulang %{mode}%",
    "ms": "Tetapkan semula %{mode}%",
    "zh": "重置 %{mode}%",
    "ja": "%{mode}% をリセット",
    "ko": "%{mode}% 재설정",
    "mi": "Whakahoki %{mode}%",
    "to": "Fakafoki %{mode}%",
    "gil": "Reset %{mode}%",
    "ty": "Fa‘ati‘a %{mode}%"
  },

  "menu.main.reset.title.ca": {
    "en": "Start over!",
    "de": "Neu anfangen!",
    "fr": "Recommencer !",
    "it": "Ricominciamo!",
    "es": "¡Empezar de nuevo!",
    "pt": "Recomeçar!",
    "is": "Byrja upp á nýtt!",
    "el": "Ξεκινήστε ξανά!",
    "ar": "ابدأ من جديد!",
    "fi": "Aloita alusta!",
    "sv": "Börja om!",
    "ru": "Начать заново!",
    "tr": "Yeniden başla!",
    "fa": "از نو شروع کنید!",
    "ps": "بیا پیل کړه!",
    "ur": "دوبارہ شروع کریں!",
    "hi": "फिर से शुरू करें!",
    "si": "නවතින් ආරම්භ කරන්න!",
    "ta": "மீண்டும் தொடங்கு!",
    "ne": "फेरी सुरु गर!",
    "bn": "পুনরায় শুরু করুন!",
    "th": "เริ่มใหม่!",
    "vi": "Bắt đầu lại!",
    "id": "Mulai lagi!",
    "ms": "Mulakan semula!",
    "zh": "重新开始！",
    "ja": "最初からやり直す！",
    "ko": "다시 시작!",
    "mi": "Tīmata anō!",
    "to": "Tō 'ilo!",
    "gil": "Start over!",
    "ty": "Tāea anei!"
  },

  "menu.main.afk.title": {
    "en": "Intelligent condition",
    "de": "Intelligenter Zustand",
    "fr": "Condition intelligente",
    "it": "Condizione intelligente",
    "es": "Condición inteligente",
    "pt": "Condição inteligente",
    "is": "Snjallur ástand",
    "el": "Έξυπνη κατάσταση",
    "ar": "حالة ذكية",
    "fi": "Älykäs tila",
    "sv": "Intelligent tillstånd",
    "ru": "Интеллектуальное условие",
    "tr": "Akıllı koşul",
    "fa": "شرط هوشمند",
    "ps": "هوښیار حالت",
    "ur": "ذہین حالت",
    "hi": "बुद्धिमान स्थिति",
    "si": "විස්මිත හේතුව",
    "ta": "அறிந்த நிலையில்",
    "ne": "बुद्धिमत्ता अवस्था",
    "bn": "বুদ্ধিমান শর্ত",
    "th": "เงื่อนไขอัจฉริยะ",
    "vi": "Điều kiện thông minh",
    "id": "Kondisi cerdas",
    "ms": "Kondisi pintar",
    "zh": "智能状态",
    "ja": "インテリジェント条件",
    "ko": "지능형 조건",
    "mi": "Tikanga mātau",
    "to": "Tu‘unga poto",
    "gil": "Intelligent condition",
    "ty": "Fa‘atere aravihi"
  },

  "menu.main.condition.paused": {
    "en": "paused",
    "de": "pausiert",
    "fr": "en pause",
    "it": "in pausa",
    "es": "pausado",
    "pt": "pausado",
    "is": "bíður",
    "el": "παύση",
    "ar": "موقوف",
    "fi": "pysäytetty",
    "sv": "pausad",
    "ru": "приостановлено",
    "tr": "durduruldu",
    "fa": "متوقف",
    "ps": "تم ځنډول",
    "ur": "موقوف",
    "hi": "रोक दिया",
    "si": "නවතා ඇත",
    "ta": "இடைநிறுத்தப்பட்டது",
    "ne": "रोकियो",
    "bn": "বিরতি",
    "th": "หยุดชั่วคราว",
    "vi": "tạm dừng",
    "id": "dijedaikan",
    "ms": "dijedaikan",
    "zh": "已暂停",
    "ja": "一時停止中",
    "ko": "일시 중지됨",
    "mi": "kua whakawātea",
    "to": "mā’ilo",
    "gil": "paused",
    "ty": "tāpoihia"
  },

  "menu.main.condition.resumed": {
    "en": "resumed",
    "de": "fortgesetzt",
    "fr": "repris",
    "it": "ripreso",
    "es": "reanudar",
    "pt": "retomado",
    "is": "hélt áfram",
    "el": "συνέχισε",
    "ar": "استؤنف",
    "fi": "jatkui",
    "sv": "återupptaget",
    "ru": "возобновлено",
    "tr": "devam etti",
    "fa": "از سر گرفته شد",
    "ps": "بیا پیل شو",
    "ur": "دوبارہ شروع",
    "hi": "दुबारा शुरू",
    "si": "ප්‍රතිඵල ප්‍රාප්ත කරයි",
    "ta": "மீண்டும் தொடங்கியது",
    "ne": "पुनः शुरू भयो",
    "bn": "পুনরায় চালু",
    "th": "ดำเนินการต่อ",
    "vi": "tiếp tục",
    "id": "dilanjutkan",
    "ms": "disambung semula",
    "zh": "已恢复",
    "ja": "再開中",
    "ko": "재개됨",
    "mi": "kua timata anō",
    "to": "fakapokotaki",
    "gil": "resumed",
    "ty": "tau faunu’u"
  },

  "menu.main.sync_day_time": {
    "en": "Clone real time",
    "de": "Echte Zeit übernehmen",
    "fr": "Cloner l'heure réelle",
    "it": "Clona ora reale",
    "es": "Clonar hora real",
    "pt": "Clonar hora real",
    "is": "Afrita rauntíma",
    "el": "Κλωνοποίηση πραγματικού χρόνου",
    "ar": "استنساخ الوقت الحقيقي",
    "fi": "Monista reaaliaika",
    "sv": "Klona verklig tid",
    "ru": "Клонировать реальное время",
    "tr": "Gerçek zamanı kopyala",
    "fa": "همگام‌سازی با زمان واقعی",
    "ps": "حقيقي وخت نقلول",
    "ur": "حقیقی وقت کو کاپی کریں",
    "hi": "वास्तविक समय नकल करें",
    "si": "සත්‍ය කාලය පිටපත් කරන්න",
    "ta": "உண்மையான நேரத்தை கிளோன் செய்",
    "ne": "वास्तविक समय क्लोन गर्नुहोस्",
    "bn": "বাস্তব সময় ক্লোন করুন",
    "th": "โคลนเวลาเรียลไทม์",
    "vi": "Sao chép thời gian thực",
    "id": "Kloning waktu nyata",
    "ms": "Mengklon masa sebenar",
    "zh": "克隆实时时间",
    "ja": "実時間をクローン",
    "ko": "실시간 복제",
    "mi": "Whakaahua wa tūturu",
    "to": "Ta‘eki‘i taimi mo‘ui taku",
    "gil": "Clone te wako ni bon",
    "ty": "Apara i te taime ora"
  },


  /*------------------------
    Menu - Difficulty
  -------------------------*/

  "menu.difficulty.title": {
    "en": "Difficulty",
    "de": "Schwierigkeit",
    "fr": "Difficulté",
    "it": "Difficoltà",
    "es": "Dificultad",
    "pt": "Dificuldade",
    "is": "Erfiðleikastig",
    "el": "Δυσκολία",
    "ar": "الصعوبة",
    "fi": "Vaikeustaso",
    "sv": "Svårighetsgrad",
    "ru": "Сложность",
    "tr": "Zorluk",
    "fa": "سختی",
    "ps": "سختۍ",
    "ur": "مشکل",
    "hi": "कठिनाई",
    "si": "අභියෝගය",
    "ta": "திசைகொண்டிருத்தல்",
    "ne": "कठिनाई",
    "bn": "কঠিনতা",
    "th": "ความยาก",
    "vi": "Độ khó",
    "id": "Tingkat Kesulitan",
    "ms": "Tahap Kesukaran",
    "zh": "难度",
    "ja": "難易度",
    "ko": "난이도",
    "mi": "Uaua",
    "to": "Toto‘o",
    "gil": "Uanaki",
    "ty": "Faingataʻa"
  },

  "menu.difficulty.description": {
    "en": "Select your difficulty!",
    "de": "Wähle deine Schwierigkeit!",
    "fr": "Choisissez votre difficulté!",
    "it": "Seleziona la tua difficoltà!",
    "es": "¡Selecciona tu dificultad!",
    "pt": "Selecione sua dificuldade!",
    "is": "Veldu erfiðleikastig!",
    "el": "Επιλέξτε τη δυσκολία σας!",
    "ar": "اختر الصعوبة!",
    "fi": "Valitse vaikeustasosi!",
    "sv": "Välj din svårighetsgrad!",
    "ru": "Выберите сложность!",
    "tr": "Zorluğunuzu seçin!",
    "fa": "سختی خود را انتخاب کنید!",
    "ps": "خپل سختۍ غوره کړئ!",
    "ur": "اپنی مشکل منتخب کریں!",
    "hi": "अपनी कठिनाई चुनें!",
    "si": "ඔබගේ අභියෝගය තෝරන්න!",
    "ta": "உங்கள் கஷ்டத்தைத் தேர்ந்தெடுக்கவும்!",
    "ne": "आफ्नो कठिनाई छान्नुहोस्!",
    "bn": "আপনার কঠিনতা নির্বাচন করুন!",
    "th": "เลือกความยากของคุณ!",
    "vi": "Chọn độ khó!",
    "id": "Pilih tingkat kesulitan Anda!",
    "ms": "Pilih tahap kesukaran anda!",
    "zh": "选择您的难度！",
    "ja": "難易度を選択してください！",
    "ko": "난이도를 선택하세요!",
    "mi": "Tīpakohia tāu uaua!",
    "to": "Fili ho‘o toto‘o!",
    "gil": "Koroa te uanaki!",
    "ty": "Fili i tō faingataʻa!"
  },

  "menu.difficulty.note": {
    "en": "Note: Hardcore difficulties are only available if the world was started in hardcore.",
    "de": "Hinweis: Hardcore-Schwierigkeitsgrade sind nur verfügbar, wenn die Welt im Hardcore-Modus gestartet wurde.",
    "fr": "Remarque: les difficultés hardcore ne sont disponibles que si le monde a été lancé en mode hardcore.",
    "it": "Nota: le difficoltà hardcore sono disponibili solo se il mondo è stato avviato in modalità hardcore.",
    "es": "Nota: las dificultades hardcore solo están disponibles si el mundo se inició en modo hardcore.",
    "pt": "Nota: as dificuldades hardcore só estão disponíveis se o mundo foi iniciado em modo hardcore.",
    "is": "Athugasemd: Hardcore erfiðleikastig eru aðeins í boði ef heimurinn var hafinn í hardcore ham.",
    "el": "Σημείωση: οι hardcore δυσκολίες είναι διαθέσιμες μόνο εάν ο κόσμος ξεκίνησε σε hardcore.",
    "ar": "ملاحظة: صعوبات الهاردكور متوفرة فقط إذا بدأ العالم في وضع الهاردكور.",
    "fi": "Huom: Hardcore-vaikeustasot ovat käytettävissä vain, jos maailma on aloitettu hardcore-tilassa.",
    "sv": "Obs: Hardcore-svårighetsgrader är endast tillgängliga om världen startades i hardcore-läge.",
    "ru": "Примечание: режимы hardcore доступны только если мир был запущен в hardcore-режиме.",
    "tr": "Not: Hardcore zorluklar yalnızca dünya hardcore modda başlatıldıysa kullanılabilir.",
    "fa": "توجه: سختی‌های هاردکور تنها در صورتی در دسترس‌اند که جهان در حالت هاردکور آغاز شده باشد.",
    "ps": "یادونه: هارډکور سختۍ یوازې هغه وخت شتون لري چې نړۍ په هارډکور حالت کې پیل شوې وي.",
    "ur": "نوٹ: ہارڈکور مشکلات صرف اس صورت میں دستیاب ہیں جب دنیا ہارڈکور موڈ میں شروع ہوئی ہو۔",
    "hi": "ध्यान दें: हार्डकोर कठिनाइयाँ केवल तब उपलब्ध होती हैं जब दुनिया हार्डकोर मोड में शुरू हुई हो।",
    "si": "සටහන: ඩුනි යුගය Hardcore ක්‍රමයෙහි ආරම්භ වූ විට පමණක් Hardcore අභියෝග ලබා ගත හැක.",
    "ta": "குறிப்பு: ஹார்ட்கோர் சவால்கள் உலகம் ஹார்ட்கோர் முறையில் தொடங்கப்பட்டால் மட்டுமே கிடைக்கும்.",
    "ne": "नोट: हार्डकोर कठिनाइाहरू केवल तब मात्र उपलब्ध हुन्छन् जब विश्वलाई हार्डकोर मोडमा सुरू गरिएको हो।",
    "bn": "দ্রষ্টব্য: হার্ডকোর কঠিনতা শুধুমাত্র তখনই পাওয়া যায় যখন বিশ্ব হার্ডকোর মোডে শুরু করা হয়।",
    "th": "หมายเหตุ: โหมดฮาร์ดคอร์จะใช้งานได้ก็ต่อเมื่อเริ่มโลกในโหมดฮาร์ดคอร์เท่านั้น",
    "vi": "Lưu ý: Chế độ khó hardcore chỉ khả dụng nếu thế giới được bắt đầu ở chế độ hardcore.",
    "id": "Catatan: Tingkat kesulitan hardcore hanya tersedia jika dunia dimulai dalam mode hardcore.",
    "ms": "Nota: Tahap kesukaran hardcore hanya tersedia jika dunia dimulakan dalam mod hardcore.",
    "zh": "注意：只有当世界以 hardcore 模式启动时，硬核难度才可用。",
    "ja": "注意: ハードコア難易度は、ワールドがハードコアモードで開始された場合にのみ利用可能です。",
    "ko": "참고: 하드코어 난이도는 세계가 하드코어 모드로 시작된 경우에만 사용할 수 있습니다.",
    "mi": "Tuhipoka: Ka wātea ngā uaua hardcore mēnā i tīmata te ao i te aratau hardcore anake.",
    "to": "Fakamolemole: ʻOku ʻi ai pe e ngaahi faingataʻa hardcore kapau na e fonua nofo atu ʻi hono tuʻunga hardcore.",
    "gil": "Note: Hardcore uanaki e man bane bon aron ni are nibwe kabane ni karebon.",
    "ty": "Faaaravihi: E nehenehe faingataʻa hardcore i teie nei taime i te mea ua timata te ao i te mode hardcore."
  },

  "menu.difficulty.note.hardcore": {
    "en": "Note: Easier difficulty levels are only available if you start the world normally.",
    "de": "Hinweis: Einfachere Schwierigkeitsgrade sind nur verfügbar, wenn du die Welt im normalen Modus startest.",
    "fr": "Remarque: les niveaux de difficulté plus faciles ne sont disponibles que si vous lancez le monde normalement.",
    "it": "Nota: i livelli di difficoltà più facili sono disponibili solo se il mondo viene avviato normalmente.",
    "es": "Nota: los niveles de dificultad más fáciles solo están disponibles si inicias el mundo en modo normal.",
    "pt": "Nota: níveis de dificuldade mais fáceis só estão disponíveis se você iniciar o mundo normalmente.",
    "is": "Athugasemd: Auðveldari erfiðleikastig eru aðeins í boði ef þú byrjar heiminn venjulega.",
    "el": "Σημείωση: τα ευκολότερα επίπεδα δυσκολίας είναι διαθέσιμα μόνο εάν ξεκινήσετε τον κόσμο κανονικά.",
    "ar": "ملاحظة: مستويات الصعوبة الأسهل متوفرة فقط إذا بدأت العالم بشكل عادي.",
    "fi": "Huom: Helpommat vaikeustasot ovat käytettävissä vain, jos käynnistät maailman normaalisti.",
    "sv": "Obs: Lättare svårighetsgrader är endast tillgängliga om du startar världen normalt.",
    "ru": "Примечание: более лёгкие уровни сложности доступны только при обычном запуске мира.",
    "tr": "Not: Kolay zorluk seviyeleri yalnızca dünyayı normal şekilde başlattığınızda kullanılabilir.",
    "fa": "توجه: سطوح دشواری آسان‌تر تنها در صورت شروع جهان به‌صورت عادی در دسترس‌اند.",
    "ps": "یادونه: اسانه سختۍ یوازې هغه وخت شتون لري چې نړۍ په عادي ډول پیل شوې وي.",
    "ur": "نوٹ: آسان مشکلات صرف اس صورت میں دستیاب ہیں جب آپ دنیا کو عام طور پر شروع کریں۔",
    "hi": "ध्यान दें: आसान कठिनाइयाँ केवल तभी उपलब्ध होती हैं जब आप दुनिया को सामान्य रूप से शुरू करें।",
    "si": "සටහන: පහසු අභියෝග මට්ටම් පමණක් සාමාන්‍ය ලෙස ලෝකය ආරම්භ කරන විට ලබා ගත හැක.",
    "ta": "குறிப்பு: எளிதான கஷ்ட நிலைகள் உலகத்தை சாதாரணமாகத் தொடங்கினால் மட்டுமே கிடைக்கும்.",
    "ne": "नोट: सजिलो कठिनाइाहरू केवल तब मात्र उपलब्ध हुन्छन् जब तपाईंले संसारलाई सामान्य रूपमा सुरू गर्नुहुन्छ।",
    "bn": "দ্রষ্টব্য: সহজ কঠিনতা মাত্র তখনই পাওয়া যায় যখন আপনি বিশ্বটি স্বাভাবিকভাবে শুরু করেন।",
    "th": "หมายเหตุ: ระดับความยากง่ายจะใช้งานได้ก็ต่อเมื่อคุณเริ่มโลกในโหมดปกติเท่านั้น",
    "vi": "Lưu ý: Chế độ khó dễ chỉ khả dụng nếu bạn khởi động thế giới bình thường.",
    "id": "Catatan: Tingkat kesulitan lebih mudah hanya tersedia jika Anda memulai dunia secara normal.",
    "ms": "Nota: Tahap kesukaran yang lebih mudah hanya tersedia jika anda memulakan dunia secara normal.",
    "zh": "注意：只有当您以普通模式启动世界时，较低难度才可用。",
    "ja": "注意: 簡単な難易度は、ワールドを通常モードで開始した場合にのみ利用可能です。",
    "ko": "참고: 쉬운 난이도는 세계를 일반 모드로 시작할 때만 사용할 수 있습니다.",
    "mi": "Tuhipoka: He wātea ngā taumata uaua māmā mēnā ka tīmata koe i te ao i te aratau noa.",
    "to": "Fakamolemole: Ko e ngaahi faingataʻa matuʻaki faigofie ʻoku ʻi ai pe kapau na e fonua tuʻunga ʻi he mode tatau.",
    "gil": "Note: Easy uanaki e man bane bon aron ni kabane are.",
    "ty": "Faaaravihi: E nehenehe faingataʻa iti i teie nei taime i te mea ua tatara te ao i te faingària noa."
  },



  /*------------------------
    Menu - Goal
  -------------------------*/

  "menu.goal.title": {
    "en": "Goal",
    "de": "Ziel",
    "fr": "Objectif",
    "it": "Obiettivo",
    "es": "Objetivo",
    "pt": "Objetivo",
    "is": "Markmið",
    "el": "Στόχος",
    "ar": "الهدف",
    "fi": "Tavoite",
    "sv": "Mål",
    "ru": "Цель",
    "tr": "Hedef",
    "fa": "هدف",
    "ps": "مقصد",
    "ur": "مقصد",
    "hi": "लक्ष्य",
    "si": "ඉලක්කය",
    "ta": "நோக்கம்",
    "ne": "लक्ष्य",
    "bn": "লক্ষ্য",
    "th": "เป้าหมาย",
    "vi": "Mục tiêu",
    "id": "Tujuan",
    "ms": "Matlamat",
    "zh": "目标",
    "ja": "目標",
    "ko": "목표",
    "mi": "Whāinga",
    "to": "Nima‘u",
    "gil": "Goal",
    "ty": "Fa‘ata‘ita‘i"
  },

  "menu.goal.entity": {
    "en": "Entity",
    "de": "Entität",
    "fr": "Entité",
    "it": "Entità",
    "es": "Entidad",
    "pt": "Entidade",
    "is": "Eining",
    "el": "Οντότητα",
    "ar": "كيان",
    "fi": "Olento",
    "sv": "Entitet",
    "ru": "Сущность",
    "tr": "Varlık",
    "fa": "نهاد",
    "ps": "وجود",
    "ur": "موجود",
    "hi": "इकाई",
    "si": "ඒකකය",
    "ta": "ஒற்றுமை",
    "ne": "एकाइ",
    "bn": "সত্তা",
    "th": "เอนทิตี",
    "vi": "Thực thể",
    "id": "Entitas",
    "ms": "Entiti",
    "zh": "实体",
    "ja": "エンティティ",
    "ko": "엔티티",
    "mi": "Wāhanga",
    "to": "Meʻa",
    "gil": "Entity",
    "ty": "Fa‘akonga"
  },

  "menu.goal.entity.prefix": {
    "en": "Defeat",
    "de": "Besiege",
    "fr": "Vaincre",
    "it": "Sconfiggi",
    "es": "Derrota",
    "pt": "Derrote",
    "is": "Sigra",
    "el": "Νίκησε",
    "ar": "اهزم",
    "fi": "Voita",
    "sv": "Besegra",
    "ru": "Победить",
    "tr": "Yen",
    "fa": "شکست بده",
    "ps": "شکست ورکړه",
    "ur": "شکست دو",
    "hi": "को हराओ",
    "si": "ජය ගන්න",
    "ta": "சவால் செய்யவும்",
    "ne": "हाराउनुहोस्",
    "bn": "পরাজিত করুন",
    "th": "เอาชนะ",
    "vi": "Đánh bại",
    "id": "Kalahkan",
    "ms": "Kalahkan",
    "zh": "击败",
    "ja": "倒せ",
    "ko": "무찔러라",
    "mi": "Whawhai i te",
    "to": "Fakamālohi‘i",
    "gil": "Defeat",
    "ty": "Ha‘uti"
  },

  "menu.goal.entity.fix": {
    "en": " a specific creature",
    "de": " eine bestimmte Kreatur",
    "fr": " une créature spécifique",
    "it": " una creatura specifica",
    "es": " una criatura específica",
    "pt": " uma criatura específica",
    "is": " ákveðinn veru",
    "el": " ένα συγκεκριμένο πλάσμα",
    "ar": " كائن محدد",
    "fi": " tietty olento",
    "sv": " en specifik varelse",
    "ru": " конкретное существо",
    "tr": " belirli bir yaratık",
    "fa": " یک موجود خاص",
    "ps": " یوه ځانګړې مخلوق",
    "ur": " ایک مخصوص مخلوق",
    "hi": " एक विशिष्ट प्राणी",
    "si": " විශේෂ සත්ත්වයක්",
    "ta": " ஒரு குறிப்பிட்ட உயிரினம்",
    "ne": " एक विशिष्ट प्राणी",
    "bn": " একটি নির্দিষ্ট প্রাণী",
    "th": " สิ่งมีชีวิตเฉพาะ",
    "vi": " một sinh vật cụ thể",
    "id": " makhluk tertentu",
    "ms": " makhluk tertentu",
    "zh": " 一个特定生物",
    "ja": " 特定の生物",
    "ko": " 특정 생물",
    "mi": " he mea ora motuhake",
    "to": " ha xivenga takitolu",
    "gil": " a specific creature",
    "ty": " te mea ora faapitoa"
  },

  "menu.goal.event": {
    "en": "Event",
    "de": "Ereignis",
    "fr": "Événement",
    "it": "Evento",
    "es": "Evento",
    "pt": "Evento",
    "is": "Atburður",
    "el": "Εκδήλωση",
    "ar": "حدث",
    "fi": "Tapahtuma",
    "sv": "Händelse",
    "ru": "Событие",
    "tr": "Olay",
    "fa": "رویداد",
    "ps": "پیښه",
    "ur": "واقعہ",
    "hi": "आयोजन",
    "si": "සිද්ධිය",
    "ta": "நிகழ்வு",
    "ne": "घटना",
    "bn": "ইভেন্ট",
    "th": "เหตุการณ์",
    "vi": "Sự kiện",
    "id": "Acara",
    "ms": "Acara",
    "zh": "事件",
    "ja": "イベント",
    "ko": "이벤트",
    "mi": "Takitaha",
    "to": "Ngaahi meʻa",
    "gil": "Event",
    "ty": "Ohipa"
  },

  "menu.goal.event.subtitle": {
    "en": "Trigger a specific event",
    "de": "Löse ein bestimmtes Ereignis aus",
    "fr": "Déclencher un événement spécifique",
    "it": "Attiva un evento specifico",
    "es": "Activa un evento específico",
    "pt": "Acione um evento específico",
    "is": "Kveiktu á ákveðnu atburði",
    "el": "Ενεργοποίησε ένα συγκεκριμένο γεγονός",
    "ar": "أطلق حدثًا معينًا",
    "fi": "Käynnistä tietty tapahtuma",
    "sv": "Trigga en specifik händelse",
    "ru": "Запустить определённое событие",
    "tr": "Belirli bir olayı tetikle",
    "fa": "یک رویداد خاص را راه‌اندازی کن",
    "ps": "یو ځانګړی پیښه پیل کړه",
    "ur": "ایک مخصوص واقعہ شروع کریں",
    "hi": "एक विशिष्ट कार्यक्रम ट्रिगर करें",
    "si": "විශේෂ සිද්ධියක් ක්‍රියාත්මක කරන්න",
    "ta": "ஒரு குறிப்பிட்ட நிகழ்வைத் தூண்டவும்",
    "ne": "विशिष्ट घटना सुरु गर्नुहोस्",
    "bn": "একটি নির্দিষ্ট ইভেন্ট ট্রিগার করুন",
    "th": "เรียกเหตุการณ์เฉพาะ",
    "vi": "Kích hoạt sự kiện cụ thể",
    "id": "Picu acara tertentu",
    "ms": "Picu acara tertentu",
    "zh": "触发特定事件",
    "ja": "特定のイベントを発生させる",
    "ko": "특정 이벤트를 트리거",
    "mi": "Whakahohe takitaha",
    "to": "Tūloloma ha meʻa takitaha",
    "gil": "Trigger a specific event",
    "ty": "Haangana i te ohipa faapitoa"
  },

  "menu.goal.random": {
    "en": "Random",
    "de": "Zufällig",
    "fr": "Aléatoire",
    "it": "Casuale",
    "es": "Aleatorio",
    "pt": "Aleatório",
    "is": "Handahófskennt",
    "el": "Τυχαίο",
    "ar": "عشوائي",
    "fi": "Satunnainen",
    "sv": "Slumpmässig",
    "ru": "Случайно",
    "tr": "Rastgele",
    "fa": "تصادفی",
    "ps": "تصادفي",
    "ur": "بے ترتیب",
    "hi": "यादृच्छिक",
    "si": "අහඹු",
    "ta": "சீரற்ற",
    "ne": "यादृच्छिक",
    "bn": "বিন্যাসহীন",
    "th": "สุ่ม",
    "vi": "Ngẫu nhiên",
    "id": "Acak",
    "ms": "Rawak",
    "zh": "随机",
    "ja": "ランダム",
    "ko": "무작위",
    "mi": "Pāwhiri",
    "to": "ʻOfaʻitoa",
    "gil": "Random",
    "ty": "Hatererē"
  },

  "menu.goal.random.subtitle": {
    "en": "Could be anything",
    "de": "Kann alles Mögliche sein",
    "fr": "Cela peut être n’importe quoi",
    "it": "Potrebbe essere qualsiasi cosa",
    "es": "Podría ser cualquier cosa",
    "pt": "Pode ser qualquer coisa",
    "is": "Gæti verið hvað sem er",
    "el": "Μπορεί να είναι οτιδήποτε",
    "ar": "يمكن أن يكون أي شيء",
    "fi": "Voi olla mitä tahansa",
    "sv": "Kan vara vad som helst",
    "ru": "Может быть чем угодно",
    "tr": "Her şey olabilir",
    "fa": "می‌تواند هر چیز باشد",
    "ps": "کولای شي هر څه وي",
    "ur": "کچھ بھی ہو سکتا ہے",
    "hi": "कुछ भी हो सकता",
    "si": "ඕනෑම කුමක් හෝ විය හැක",
    "ta": "எதைஇலாமையாக இருக்கலாம்",
    "ne": "कुनै पनि हुन सक्छ",
    "bn": "কিছু কিছুই হতে পারে",
    "th": "อาจเป็นอะไรก็ได้",
    "vi": "Có thể là bất cứ điều gì",
    "id": "Bisa apa saja",
    "ms": "Boleh apa saja",
    "zh": "可以是任何事物",
    "ja": "何でもあり得ます",
    "ko": "아무 것이나 될 수 있음",
    "mi": "Ka taea te aha",
    "to": "Lailo e meʻa kotoa pe",
    "gil": "Could be anything",
    "ty": "E nehenehe e te tahi mea atoa"
  },

  "menu.goal.random.title": {
    "en": "§bR§ga§an§6d§4o§fm",
    "de": "§bZ§gu§af§6ä§4ll§fig",
    "fr": "§bA§ll§ae§6a§4t§fo§ir§fe",
    "it": "§bC§ua§as§6u§4a§lf§fo",
    "es": "§bA§lz§aa§6r§4i§fo",
    "pt": "§bA§le§az§6a§4r§fo",
    "is": "§bT§gi§al§6v§4i§lf§ft",
    "el": "§bΤ§gu§au§6χ§4α§fi§fο",
    "ar": "§bع§gش§aو§6ائ§4ي§f",
    "fi": "§bS§ga§at§6u§4n§fn§fa§il§f.",
    "sv": "§bS§gl§au§6m§4p§fm§fa",
    "ru": "§bС§gl§au§6ч§4а§fy§in§fy",
    "tr": "§bR§ga§as§6g§4e§lf§le",
    "fa": "§bت§gh§aص§6ف§4ی§f",
    "ps": "§bا§gو§aت§6ن§4ی§fh§fa§if§f",
    "ur": "§bب§gے§aت§6ر§4ت§fی§fb",
    "hi": "§bय§gा§aदृ§6चि§4क§f",
    "si": "§bඅ§gව§aය§6ෙ§4න§fd§fm",
    "ta": "§bத§ga§am§6ி§4ழ§fh§fm",
    "ne": "§bर§gै§aन§6ड§4म§f",
    "bn": "§bএ§gক§aa§6ট§4ু§f",
    "th": "§bส§gุ§aม§6§4§f",
    "vi": "§bN§gg§aẫ§6u§4n§f",
    "id": "§bA§cg§aa§6k§4§f",
    "ms": "§bR§ga§and§6o§4m§f",
    "zh": "§b随§g机",
    "ja": "§bラ§gン§aダ§6ム",
    "ko": "§b무§g작§a위",
    "mi": "§bA§gr§ak§6e§4n§ga§fi",
    "to": "§bF§ga§ak§6a§4t§fo§u",
    "gil": "§bT§ga§ar§6a§4b§fi§k",
    "ty": "§bM§ga§ata§6i§4r§fa"
  },


  "menu.goal.description": {
    "en": "Select your goal!",
    "de": "Wähle dein Ziel!",
    "fr": "Sélectionnez votre objectif !",
    "it": "Seleziona il tuo obiettivo!",
    "es": "¡Selecciona tu objetivo!",
    "pt": "Selecione seu objetivo!",
    "is": "Veldu markmið þitt!",
    "el": "Επιλέξτε τον στόχο σας!",
    "ar": "اختر هدفك!",
    "fi": "Valitse tavoitteesi!",
    "sv": "Välj ditt mål!",
    "ru": "Выберите свою цель!",
    "tr": "Hedefinizi seçin!",
    "fa": "هدف خود را انتخاب کنید!",
    "ps": "خپل مقصد غوره کړئ!",
    "ur": "اپنا مقصد منتخب کریں!",
    "hi": "अपना लक्ष्य चुनें!",
    "si": "ඔබේ ඉලක්කය තෝරන්න!",
    "ta": "உங்கள் நோக்கத்தைத் தேர்ந்தெடுக்கவும்!",
    "ne": "आफ्नो लक्ष्य छान्नुहोस्!",
    "bn": "আপনার লক্ষ্য নির্বাচন করুন!",
    "th": "เลือกเป้าหมายของคุณ!",
    "vi": "Chọn mục tiêu của bạn!",
    "id": "Pilih tujuan Anda!",
    "ms": "Pilih matlamat anda!",
    "zh": "选择您的目标！",
    "ja": "目標を選択してください！",
    "ko": "목표를 선택하세요!",
    "mi": "Tīpakohia tō whāinga!",
    "to": "Fili ho‘o nima‘u!",
    "gil": "Select your goal!",
    "ty": "Fili i to outou fa‘ata‘ita‘iga!"
  },


  /*------------------------
    Menu - "Change / add time"
  -------------------------*/
  "menu.start_time.title": {
    "en": "Change time",
    "de": "Zeit ändern",
    "fr": "Changer l'heure",
    "it": "Modifica ora",
    "es": "Cambiar hora",
    "pt": "Alterar hora",
    "is": "Breyta tíma",
    "el": "Αλλαγή ώρας",
    "ar": "تغيير الوقت",
    "fi": "Vaihda aika",
    "sv": "Ändra tid",
    "ru": "Изменить время",
    "tr": "Zamanı değiştir",
    "fa": "تغییر زمان",
    "ps": "وخت بدلول",
    "ur": "وقت تبدیل کریں",
    "hi": "समय बदलें",
    "si": "වේලාව වෙනස් කරන්න",
    "ta": "நேரத்தை மாற்றவும்",
    "ne": "समय परिवर्तन गर्नुहोस्",
    "bn": "সময় পরিবর্তন করুন",
    "th": "เปลี่ยนเวลา",
    "vi": "Thay đổi thời gian",
    "id": "Ubah waktu",
    "ms": "Tukar masa",
    "zh": "更改时间",
    "ja": "時間を変更",
    "ko": "시간 변경",
    "mi": "Tairea tā",
    "to": "Liliu taimi",
    "gil": "Change time",
    "ty": "Faufaa i te taime"
  },

  "menu.start_time.title.ca": {
    "en": "Start time",
    "de": "Startzeit",
    "fr": "Heure de début",
    "it": "Ora di inizio",
    "es": "Hora de inicio",
    "pt": "Hora de início",
    "is": "Byrjunar­tími",
    "el": "Ώρα έναρξης",
    "ar": "وقت البدء",
    "fi": "Aloitusaika",
    "sv": "Starttid",
    "ru": "Время начала",
    "tr": "Başlangıç zamanı",
    "fa": "زمان شروع",
    "ps": "د پیل وخت",
    "ur": "شروع وقت",
    "hi": "प्रारंभ समय",
    "si": "ආරම්භක වේලාව",
    "ta": "தொடக்க நேரம்",
    "ne": "सुरु समय",
    "bn": "শুরুর সময়",
    "th": "เวลาเริ่มต้น",
    "vi": "Thời gian bắt đầu",
    "id": "Waktu mulai",
    "ms": "Masa mula",
    "zh": "开始时间",
    "ja": "開始時間",
    "ko": "시작 시간",
    "mi": "Wā tīmatanga",
    "to": "Taimi tuku‘anga",
    "gil": "Start time",
    "ty": "Taime immaroi"
  },

  "menu.start_time.submit": {
    "en": "Set & count down!",
    "de": "Setzen & runterzählen!",
    "fr": "Définir et lancer le compte à rebours!",
    "it": "Imposta e avvia il conto alla rovescia!",
    "es": "¡Establecer y contar regresivamente!",
    "pt": "Definir e iniciar contagem regressiva!",
    "is": "Stilla & telja niður!",
    "el": "Ορισμός & αντίστροφη μέτρηση!",
    "ar": "تعيين وبدء العد التنازلي!",
    "fi": "Aseta & laske taaksepäin!",
    "sv": "Ställ in & räkna ned!",
    "ru": "Установить и запустить обратный отсчёт!",
    "tr": "Ayarla & geri say!",
    "fa": "تنظیم و شمارش معکوس!",
    "ps": "ټاکه او شاتګ شمېر!",
    "ur": "سیٹ کریں اور کاؤنٹ ڈاؤن!",
    "hi": "सेट करें और उल्टा गिनती!",
    "si": "අදාල කරන්න හා නැවත ගණන් කරන්න!",
    "ta": "அமைத்து கவுண்ட் டவுன்!",
    "ne": "सेट र उल्टो गणना!",
    "bn": "সেট করুন এবং কাউন্টডাউন!",
    "th": "ตั้งค่า & นับถอยหลัง!",
    "vi": "Đặt & đếm ngược!",
    "id": "Atur & hitung mundur!",
    "ms": "Tetapkan & kira detik!",
    "zh": "设置 & 倒计时！",
    "ja": "設定してカウントダウン！",
    "ko": "설정 & 카운트다운!",
    "mi": "Tautuhia & tātari hokinga!",
    "to": "Toto & tala ‘i lalo!",
    "gil": "Set & count down!",
    "ty": "Faapipii & faa‘amu hita‘o!"
  },

  "menu.start_time.unit.y": {
    "en": "Years",
    "de": "Jahre",
    "fr": "Années",
    "it": "Anni",
    "es": "Años",
    "pt": "Anos",
    "is": "Ár",
    "el": "Χρόνια",
    "ar": "سنوات",
    "fi": "Vuotta",
    "sv": "År",
    "ru": "Лет",
    "tr": "Yıllar",
    "fa": "سال‌ها",
    "ps": "کلونه",
    "ur": "سال",
    "hi": "साल",
    "si": "වසර",
    "ta": "வயதாக்கள்",
    "ne": "वर्षहरू",
    "bn": "বছর",
    "th": "ปี",
    "vi": "Năm",
    "id": "Tahun",
    "ms": "Tahun",
    "zh": "年",
    "ja": "年",
    "ko": "년",
    "mi": "Tau",
    "to": "Ta’u",
    "gil": "Years",
    "ty": "Matahiti"
  },

  "menu.start_time.unit.w": {
    "en": "Weeks",
    "de": "Wochen",
    "fr": "Semaines",
    "it": "Settimane",
    "es": "Semanas",
    "pt": "Semanas",
    "is": "Vikur",
    "el": "Εβδομάδες",
    "ar": "أسابيع",
    "fi": "Viikkoja",
    "sv": "Veckor",
    "ru": "Недель",
    "tr": "Haftalar",
    "fa": "هفته‌ها",
    "ps": "اونۍ",
    "ur": "ہفتے",
    "hi": "सप्ताह",
    "si": "සතිය",
    "ta": "வாரம்",
    "ne": "हप्ता",
    "bn": "সপ্তাহ",
    "th": "สัปดาห์",
    "vi": "Tuần",
    "id": "Minggu",
    "ms": "Minggu",
    "zh": "周",
    "ja": "週間",
    "ko": "주",
    "mi": "Wiki",
    "to": "Hā",
    "gil": "Weeks",
    "ty": "Savarii"
  },

  "menu.start_time.unit.d": {
    "en": "Days",
    "de": "Tage",
    "fr": "Jours",
    "it": "Giorni",
    "es": "Días",
    "pt": "Dias",
    "is": "Dagar",
    "el": "Ημέρες",
    "ar": "أيام",
    "fi": "Päiviä",
    "sv": "Dagar",
    "ru": "Дней",
    "tr": "Günler",
    "fa": "روزها",
    "ps": "ورځې",
    "ur": "دن",
    "hi": "दिन",
    "si": "දින",
    "ta": "நாட்கள்",
    "ne": "दिनहरू",
    "bn": "দিন",
    "th": "วัน",
    "vi": "Ngày",
    "id": "Hari",
    "ms": "Hari",
    "zh": "天",
    "ja": "日",
    "ko": "일",
    "mi": "Rā",
    "to": "‘Aho",
    "gil": "Days",
    "ty": "‘Aho"
  },

  "menu.start_time.unit.h": {
    "en": "Hours",
    "de": "Stunden",
    "fr": "Heures",
    "it": "Ore",
    "es": "Horas",
    "pt": "Horas",
    "is": "Klukkustundir",
    "el": "Ώρες",
    "ar": "ساعات",
    "fi": "Tunteja",
    "sv": "Timmar",
    "ru": "Часов",
    "tr": "Saatler",
    "fa": "ساعت‌ها",
    "ps": "ساعتونه",
    "ur": "گھنٹے",
    "hi": "घंटे",
    "si": "පැය",
    "ta": "மணிநேரம்",
    "ne": "घण्टा",
    "bn": "ঘন্টা",
    "th": "ชั่วโมง",
    "vi": "Giờ",
    "id": "Jam",
    "ms": "Jam",
    "zh": "小时",
    "ja": "時間",
    "ko": "시간",
    "mi": "Haora",
    "to": "Houa",
    "gil": "Hours",
    "ty": "Horaa"
  },

  "menu.start_time.unit.m": {
    "en": "Minutes",
    "de": "Minuten",
    "fr": "Minutes",
    "it": "Minuti",
    "es": "Minutos",
    "pt": "Minutos",
    "is": "Mínútur",
    "el": "Λεπτά",
    "ar": "دقائق",
    "fi": "Minuteja",
    "sv": "Minuter",
    "ru": "Минут",
    "tr": "Dakikalar",
    "fa": "دقیقه‌ها",
    "ps": "دقیقې",
    "ur": "منٹ",
    "hi": "मिनट",
    "si": "තත්පර",
    "ta": "நிமிடங்கள்",
    "ne": "मिनेट",
    "bn": "মিনিট",
    "th": "นาที",
    "vi": "Phút",
    "id": "Menit",
    "ms": "Minit",
    "zh": "分钟",
    "ja": "分",
    "ko": "분",
    "mi": "Meneti",
    "to": "Miniti",
    "gil": "Minutes",
    "ty": "Minitea"
  },

  "menu.start_time.unit.s": {
    "en": "Seconds",
    "de": "Sekunden",
    "fr": "Secondes",
    "it": "Secondi",
    "es": "Segundos",
    "pt": "Segundos",
    "is": "Sekúndur",
    "el": "Δευτερόλεπτα",
    "ar": "ثواني",
    "fi": "Sekunteja",
    "sv": "Sekunder",
    "ru": "Секунд",
    "tr": "Saniyeler",
    "fa": "ثانیه‌ها",
    "ps": "ثانیې",
    "ur": "سیکنڈ",
    "hi": "सेकंड",
    "si": "තත්පර",
    "ta": "வினாடிகள்",
    "ne": "सेकेन्ड",
    "bn": "সেকেন্ড",
    "th": "วินาที",
    "vi": "Giây",
    "id": "Detik",
    "ms": "Saat",
    "zh": "秒",
    "ja": "秒",
    "ko": "초",
    "mi": "Hēkona",
    "to": "Sekoni",
    "gil": "Seconds",
    "ty": "Tēkona"
  },

  "menu.start_time.unit.ms": {
    "en": "Milliseconds",
    "de": "Millisekunden",
    "fr": "Millisecondes",
    "it": "Millisecondi",
    "es": "Milisegundos",
    "pt": "Milissegundos",
    "is": "Millisekúndur",
    "el": "Χιλιοστά του δευτερολέπτου",
    "ar": "ميلي ثانية",
    "fi": "Millisekunteja",
    "sv": "Millisekunder",
    "ru": "Миллисекунд",
    "tr": "Milisaniyeler",
    "fa": "هزارم ثانیه",
    "ps": "ميلى ثانيې",
    "ur": "ملی سیکنڈ",
    "hi": "मिलीसेकंड",
    "si": "මිලි තත්පර",
    "ta": "மில்லி விநாடிகள்",
    "ne": "मिलिसेकेन्ड",
    "bn": "মিলিসেকেন্ড",
    "th": "มิลลิวินาที",
    "vi": "Mili giây",
    "id": "Millisekon",
    "ms": "Milisaat",
    "zh": "毫秒",
    "ja": "ミリ秒",
    "ko": "밀리초",
    "mi": "Mirisekona",
    "to": "Mili seko",
    "gil": "Milliseconds",
    "ty": "Mili sekona"
  },



  /*------------------------
    Menu - Custom Sounds
  -------------------------*/

  "menu.settings.cs.title": {
    "en": "Custom Sounds",
    "de": "Custom Sounds",
    "fr": "Sons personnalisés",
    "it": "Suoni personalizzati",
    "es": "Sonidos personalizados",
    "pt": "Sons personalizados",
    "is": "Sérsniðin hljóð",
    "el": "Προσαρμοσμένοι ήχοι",
    "ar": "أصوات مخصصة",
    "fi": "Mukautetut äänet",
    "sv": "Anpassade ljud",
    "ru": "Пользовательские звуки",
    "tr": "Özel sesler",
    "fa": "صداهای سفارشی",
    "ps": "ګمره شوي غږونه",
    "ur": "حسبِ منشا آوازیں",
    "hi": "कस्टम ध्वनियाँ",
    "si": "අභිරුචිකෘත ශබ්ද",
    "ta": "தனிப்பயன் ஒலிகள்",
    "ne": "कस्टम ध्वनि",
    "bn": "কাস্টম সাউন্ড",
    "th": "เสียงกำหนดเอง",
    "vi": "Âm thanh tùy chỉnh",
    "id": "Suara khusus",
    "ms": "Bunyi tersuai",
    "zh": "自定义音效",
    "ja": "カスタムサウンド",
    "ko": "사용자 지정 사운드",
    "mi": "Ngā oro ritenga",
    "to": "Ngā leo founga",
    "gil": "Custom Sounds",
    "ty": "Ope‘a fa‘atupu"
  },

  "menu.settings.cs.description_0": {
    "en": "Do you hear a test sound?",
    "de": "Hörst du einen Testsound?",
    "fr": "Entendez‑vous un son de test?",
    "it": "Senti un suono di prova?",
    "es": "¿Oyes un sonido de prueba?",
    "pt": "Você ouve um som de teste?",
    "is": "Heyrirðu prófunarhljóð?",
    "el": "Ακούς ένα δοκιμαστικό ήχο;",
    "ar": "هل تسمع صوت اختبار؟",
    "fi": "Kuuluuko testisoundi?",
    "sv": "Hör du ett testsound?",
    "ru": "Слышите ли вы тестовый звук?",
    "tr": "Bir test sesi duyuyor musun?",
    "fa": "آیا صدای آزمایشی می‌شنوید؟",
    "ps": "ایا د ازموینې غږ اورې؟",
    "ur": "کیا آپ ٹیسٹ آواز سن رہے ہیں؟",
    "hi": "क्या आप परीक्षण ध्वनि सुनते हैं?",
    "si": "ඔබට පරීක්ෂණික ශබ්දයක් ඇහුනේද?",
    "ta": "சோதனை ஒலி கேட்கிறீர்களா?",
    "ne": "के तपाईं परीक्षण आवाज सुन्नुहुन्छ?",
    "bn": "আপনি কি টেস্ট সাউন্ড শুনতে পাচ্ছেন?",
    "th": "คุณได้ยินเสียงทดสอบหรือไม่?",
    "vi": "Bạn có nghe âm thanh thử nghiệm không?",
    "id": "Apakah Anda mendengar suara tes?",
    "ms": "Adakah anda mendengar bunyi ujian?",
    "zh": "您听到测试音效了吗？",
    "ja": "テストサウンドが聞こえますか？",
    "ko": "테스트 사운드가 들리나요?",
    "mi": "Ke rongo koe i tētahi oro whakamātautau?",
    "to": "Oku ke fanongo ha leo talanoa?",
    "gil": "Do you hear a test sound?",
    "ty": "E tauturu anei ia koe i te oro whakamāta‘ita‘i?"
  },

  "menu.settings.cs.description_1": {
    "en": "Do you hear a test sound now?",
    "de": "Hörst du jetzt einen Testsound?",
    "fr": "Entendez‑vous maintenant un son de test?",
    "it": "Ora senti un suono di prova?",
    "es": "¿Oyes ahora un sonido de prueba?",
    "pt": "Você ouve agora um som de teste?",
    "is": "Heyrirðu nú prófunarhljóð?",
    "el": "Ακούς τώρα ένα δοκιμαστικό ήχο;",
    "ar": "هل تسمع صوت الاختبار الآن؟",
    "fi": "Kuuluuko testisoundi nyt?",
    "sv": "Hör du testsoundet nu?",
    "ru": "Слышите ли вы тестовый звук сейчас?",
    "tr": "Şimdi bir test sesi duyuyor musun?",
    "fa": "آیا اکنون صدای آزمایشی می‌شنوید؟",
    "ps": "ایا اوس د ازموینې غږ اورې؟",
    "ur": "کیا آپ اب ٹیسٹ آواز سن رہے ہیں؟",
    "hi": "क्या आप अब परीक्षण ध्वनि सुनते हैं?",
    "si": "දැන් ඔබට පරීක්ෂණික ශබ්දයක් ඇහුනේද?",
    "ta": "இப்போது சோதனை ஒலி கேட்கிறீர்களா?",
    "ne": "अब के तपाईं परीक्षण आवाज सुन्नुहुन्छ?",
    "bn": "এখন আপনি টেস্ট সাউন্ড শুনতে পাচ্ছেন?",
    "th": "ตอนนี้คุณได้ยินเสียงทดสอบหรือไม่?",
    "vi": "Bây giờ bạn có nghe âm thanh thử nghiệm không?",
    "id": "Sekarang apakah Anda mendengar suara tes?",
    "ms": "Sekarang adakah anda mendengar bunyi ujian?",
    "zh": "现在您听到测试音效了吗？",
    "ja": "今テストサウンドが聞こえますか？",
    "ko": "지금 테스트 사운드가 들리나요?",
    "mi": "Ināianei ka rongo koe i tētahi oro whakamātautau?",
    "to": "Oku ke fanongo ha leo talanoa ‘i he taimi ko ‘eni?",
    "gil": "Do you hear a test sound now?",
    "ty": "E tauturu anei ia koe i te oro whakamāta‘ita‘i i teie nei?"
  },

  "menu.settings.cs.button.yes": {
    "en": "§2Yes, there is a sound",
    "de": "§2Ja, ich höre einen Sound",
    "fr": "§2Oui, il y a un son",
    "it": "§2Sì, c'è un suono",
    "es": "§2Sí, hay un sonido",
    "pt": "§2Sim, há um som",
    "is": "§2Já, ég heyri hljóð",
    "el": "§2Ναι, υπάρχει ήχος",
    "ar": "§2نعم، هناك صوت",
    "fi": "§2Kyllä, ääni kuuluu",
    "sv": "§2Ja, det hörs en ljud",
    "ru": "§2Да, звук есть",
    "tr": "§2Evet, bir ses var",
    "fa": "§2بله، صدا می‌آید",
    "ps": "§2هو، غږ شته",
    "ur": "§2جی ہاں، آواز ہے",
    "hi": "§2हाँ, ध्वनि सुनाई देती है",
    "si": "§2ඔව්, ශබ්දයක් ඇහැරේ",
    "ta": "§2ஆம், ஒரு ஒலி உள்ளது",
    "ne": "§2हो, एउटा ध्वनि छ",
    "bn": "§2হ্যাঁ, একটি শব্দ আছে",
    "th": "§2ใช่, มีเสียง",
    "vi": "§2Có, có âm thanh",
    "id": "§2Ya, ada suara",
    "ms": "§2Ya, ada bunyi",
    "zh": "§2是的，有声音",
    "ja": "§2はい、音がします",
    "ko": "§2네, 소리가 납니다",
    "mi": "§2Āe, he oro",
    "to": "§2ʻIo, ʻoku ʻi ha leo",
    "gil": "§2Yes, there is a sound",
    "ty": "§2ʻAe, e tupu te oro"
  },

  "menu.settings.cs.button.no": {
    "en": "§4No, silence",
    "de": "§4Nein",
    "fr": "§4Non, silence",
    "it": "§4No, silenzio",
    "es": "§4No, silencio",
    "pt": "§4Não, silêncio",
    "is": "§4Nei, hljóðlaust",
    "el": "§4Όχι, σιωπή",
    "ar": "§4لا، صمت",
    "fi": "§4Ei, hiljaisuus",
    "sv": "§4Nej, tystnad",
    "ru": "§4Нет, тишина",
    "tr": "§4Hayır, sessizlik",
    "fa": "§4خیر، سکوت",
    "ps": "§4نه، چوپه‌ښتنه",
    "ur": "§4نہیں، خاموشی",
    "hi": "§4नहीं, मौन",
    "si": "§4නැහැ, නිශ්ශබ්දතාව",
    "ta": "§4இல்லை, மௌனம்",
    "ne": "§4होइन, मौन",
    "bn": "§4না, নীরবতা",
    "th": "§4ไม่, ความเงียบ",
    "vi": "§4Không, im lặng",
    "id": "§4Tidak, diam",
    "ms": "§4Tidak, senyap",
    "zh": "§4不，静音",
    "ja": "§4いいえ、無音",
    "ko": "§4아니요, 무음",
    "mi": "§4Kāo, kīhohe",
    "to": "§4ʻIkai, pāpula",
    "gil": "§4No, silence",
    "ty": "§4Aita, tumu‘a"
  },

  "menu.settings.cs.result.header": {
    "en": "The setup process is now complete.",
    "de": "Die Einrichtung ist nun abgeschlossen.",
    "fr": "Le processus de configuration est terminé.",
    "it": "Il processo di configurazione è completato.",
    "es": "El proceso de configuración está completo.",
    "pt": "O processo de configuração está concluído.",
    "is": "Uppsetningarferlið er nú lokið.",
    "el": "Η διαδικασία ρύθμισης ολοκληρώθηκε.",
    "ar": "اكتمل الآن إعداد الأصوات المخصصة.",
    "fi": "Asennusprosessi on nyt valmis.",
    "sv": "Inställningsprocessen är nu klar.",
    "ru": "Процесс настройки завершён.",
    "tr": "Kurulum işlemi tamamlandı.",
    "fa": "فرآیند راه‌اندازی اکنون کامل شد.",
    "ps": "د ترتیب پروسه اوس بشپړ شو.",
    "ur": "سیٹ اپ کا عمل مکمل ہو گیا ہے۔",
    "hi": "सेटअप प्रक्रिया अब पूरी हो गई है।",
    "si": "සැකසුම් ක්‍රියාවලිය දැන් සම්පූර්ණයි.",
    "ta": "அமைப்பு செயல்முறை முடிந்தது.",
    "ne": "सेटअप प्रक्रिया अब पूरा भयो।",
    "bn": "সেটআপ প্রক্রিয়া এখন সম্পূর্ণ হয়েছে।",
    "th": "กระบวนการตั้งค่าเสร็จสิ้นแล้ว",
    "vi": "Quá trình thiết lập đã hoàn tất.",
    "id": "Proses pengaturan sekarang selesai.",
    "ms": "Proses tetapan kini selesai.",
    "zh": "设置过程完成。",
    "ja": "セットアップが完了しました。",
    "ko": "설정 과정이 완료되었습니다.",
    "mi": "Kua oti te tukanga tautuhi.",
    "to": "Kuo 'osi 'a e founga fakaleleʻi.",
    "gil": "The setup process is now complete.",
    "ty": "Ua oti te faatiauraa."
  },

  "menu.settings.cs.result.message_v1": {
    "en": "The timer will now use custom sounds from the resource pack.",
    "de": "Der Timer verwendet nun Custom Sounds aus dem Ressourcenpaket.",
    "fr": "Le minuteur utilise désormais les sons personnalisés du pack de ressources.",
    "it": "Il timer utilizzerà ora i suoni personalizzati dal pacchetto di risorse.",
    "es": "El temporizador usará ahora sonidos personalizados del paquete de recursos.",
    "pt": "O temporizador agora usará sons personalizados do pacote de recursos.",
    "is": "Tímamælirinn notar nú sérsniðin hljóð úr auðlindapakkanum.",
    "el": "Ο χρονοδιακόπτης θα χρησιμοποιεί πλέον προσαρμοσμένους ήχους από το πακέτο πόρων.",
    "ar": "سيستخدم المؤقت الآن أصواتًا مخصصة من حزمة الموارد.",
    "fi": "Ajastin käyttää nyt mukautettuja ääniä resurssipaketista.",
    "sv": "Timern kommer nu att använda anpassade ljud från resurs-paketet.",
    "ru": "Таймер теперь будет использовать пользовательские звуки из ресурс-пака.",
    "tr": "Sayaç artık kaynak paketinden özel sesler kullanacak.",
    "fa": "تایمر اکنون از صداهای سفارشی بسته منابع استفاده می‌کند.",
    "ps": "ټایمر به اوس د سرچینې پیک څخه ځانګړي غږونه وکاروي.",
    "ur": "ٹائمر اب resource pack سے custom sounds استعمال کرے گا۔",
    "hi": "टाइमर अब resource pack से कस्टम ध्वनियाँ उपयोग करेगा।",
    "si": "ටයිමරය දැන් සම්පත් පැකේජයෙනුත් අභිරුචිකෘත ශබ්ද භාවිතා කරයි.",
    "ta": "டைமர் இனி வள தொகுப்பில் இருந்து தனிப்பயன் ஒலிகளைப் பயன்படுத்தும்.",
    "ne": "टाइमर अब resource pack बाट कस्टम ध्वनि प्रयोग गर्नेछ।",
    "bn": "টাইমার এখন রিসোর্স প্যাক থেকে কাস্টম সাউন্ড ব্যবহার করবে।",
    "th": "ตัวจับเวลาจะใช้เสียงกำหนดเองจาก resource pack แล้ว",
    "vi": "Bộ hẹn giờ sẽ sử dụng âm thanh tùy chỉnh từ gói tài nguyên.",
    "id": "Timer sekarang akan menggunakan suara khusus dari paket sumber daya.",
    "ms": "Pemasa kini akan menggunakan bunyi tersuai dari pek sumber.",
    "zh": "计时器现在将使用资源包中的自定义音效。",
    "ja": "タイマーはリソースパックのカスタムサウンドを使用します。",
    "ko": "타이머가 이제 리소스 팩의 사용자 지정 사운드를 사용합니다.",
    "mi": "Ka whakamahi te pātea inaianei i ngā oro ritenga mai i te kete rauemi.",
    "to": "‘Oku ngaue‘aki ‘e he taimi ko ‘eni e ngaahi leo kuo fai faka‘ilonga mei he koloa pakē.",
    "gil": "The timer will now use custom sounds from the resource pack.",
    "ty": "Te taime e faaohipa nei i te mau oro faatupu no te pa‘epa‘e rauemi."
  },

  "menu.settings.cs.result.message_v2": {
    "en": "Your resources pack only supports legacy custom music, so not all timer sounds can be replaced.",
    "de": "Dein Ressourcenpaket unterstützt nur legacy custom music, daher können nicht alle Timer-Sounds ersetzt werden.",
    "fr": "Votre pack de ressources ne prend en charge que la musique personnalisée héritée, tous les sons du minuteur ne peuvent donc pas être remplacés.",
    "it": "Il tuo pacchetto risorse supporta solo la musica personalizzata legacy, quindi non tutti i suoni del timer possono essere sostituiti.",
    "es": "Tu paquete de recursos solo admite música personalizada heredada, por lo que no todos los sonidos del temporizador pueden reemplazarse.",
    "pt": "Seu pacote de recursos suporta apenas música personalizada legada, portanto nem todos os sons do temporizador podem ser substituídos.",
    "is": "Auðlindapakkinn þinn styður aðeins erfðalega sérhannaða tónlist, svo ekki er hægt að skipta öllum tónum tímamælisins.",
    "el": "Το πακέτο πόρων σας υποστηρίζει μόνο παλιά προσαρμοσμένη μουσική, επομένως δεν μπορούν να αντικατασταθούν όλοι οι ήχοι χρονοδιακόπτη.",
    "ar": "حزمة الموارد الخاصة بك تدعم فقط الموسيقى المخصصة القديمة، لذلك لا يمكن استبدال جميع أصوات المؤقت.",
    "fi": "Resurssipakettisi tukee vain perintömuokattua musiikkia, joten kaikkia ajastimen ääniä ei voi korvata.",
    "sv": "Ditt resurs-paket stöder endast gammal anpassad musik, så inte alla timerns ljud kan bytas ut.",
    "ru": "Ваш ресурс-пак поддерживает только устаревшую пользовательскую музыку, поэтому не все звуки таймера можно заменить.",
    "tr": "Kaynak paketin yalnızca eski özel müziği destekliyor, bu nedenle tüm sayaç seslerini değiştirmek mümkün değil.",
    "fa": "بسته منابع شما تنها موسیقی سفارشی قدیمی را پشتیبانی می‌کند، بنابراین همه صداهای تایمر قابل جایگزینی نیستند.",
    "ps": "ستاسو سرچینې پاک یوازې دودیزه میراث موسیقي ملاتړ کوي، نو ټول د ټایمر غږونه نه شي بدلیدای.",
    "ur": "آپ کا resource pack صرف لیگیسی custom music سپورٹ کرتا ہے، لہذا تمام ٹائمر ساؤنڈز تبدیل نہیں کیے جا سکتے۔",
    "hi": "आपका रिसोर्स पैक केवल लेगसी कस्टम म्यूजिक समर्थन करता है, इसलिए सभी टाइमर ध्वनियाँ बदलना संभव नहीं है।",
    "si": "ඔබගේ සම්පත් පැකේජය පරණ අභිරුචිකෘත සංගීතය පමණක් සහාය දක්වයි, එබැවින් සියළු ටයිමර් ශබ්ද වෙනුවට තබා ගැනීමට නොහැක.",
    "ta": "உங்கள் வள தொகுப்பு பாரம்பரிய தனிப்பயன் இசையை மட்டுமே ஆதரிக்கிறது, எனவே அனைத்து டைமர் ஒலிகளையும் மாற்ற முடியாது.",
    "ne": "तपाईंको स्रोत प्याकले मात्र लेगसी कस्टम संगीत समर्थन गर्दछ, त्यसैले सबै टाइमर ध्वनि बदल्न सकिँदैन।",
    "bn": "আপনার রিসোর্স প্যাক শুধুমাত্র লিগাসি কাস্টম মিউজিক সমর্থন করে, তাই সমস্ত টাইমার সাউন্ড প্রতিস্থাপন করা যাবে না।",
    "th": "แพ็คทรัพยากรของคุณรองรับเฉพาะเพลงกำหนดเองเวอร์ชันเก่าเท่านั้น จึงไม่สามารถแทนที่เสียงตัวจับเวลาได้ทั้งหมด",
    "vi": "Gói tài nguyên của bạn chỉ hỗ trợ nhạc tùy chỉnh phiên bản cũ, vì vậy không thể thay thế tất cả âm thanh bộ hẹn giờ.",
    "id": "Paket sumber daya Anda hanya mendukung musik kustom versi lama, jadi tidak semua suara timer dapat diganti.",
    "ms": "Pek sumber anda hanya menyokong muzik tersuai warisan, jadi tidak semua bunyi pemasa boleh digantikan.",
    "zh": "您的资源包仅支持旧版自定义音乐，因此无法替换所有计时器音效。",
    "ja": "リソースパックはレガシーのカスタムミュージックのみサポートしているため、すべてのタイマーサウンドを置き換えることはできません。",
    "ko": "리소스 팩은 레거시 커스텀 음악만 지원하므로 모든 타이머 사운드를 교체할 수 없습니다.",
    "mi": "Ke tautokohia noa e tō kete rauemi te puoro ritenga tuku iho, nō reira kāore e taea te whakakapi i ngā oro pātea katoa.",
    "to": "Ko ho‘o paketa koloa e tokoni pe i te fuata‘anga tuai, ‘ikai ke lava ke liliu ‘a e ngaahi leo taimi kotoa.",
    "gil": "Your resources pack only supports legacy custom music...",
    "ty": "Ta‘nei papa rauemi e tauturu ana noa i te oro faatupu muamua, ‘eita e nehenehe faatere i te mau oro taime atoa."
  },

  "menu.settings.cs.result.message_bad": {
    "en": "Under current conditions, custom sounds cannot be played.\n\n§7Check your resource pack compatibility and in-game music volume.",
    "de": "Unter den aktuellen Bedingungen können keine Custom Sounds abgespielt werden.\n\n§7Überprüfe die Kompatibilität deines Ressourcenpakets und die Musiklautstärke vom Spiel.",
    "fr": "Dans les conditions actuelles, les sons personnalisés ne peuvent pas être lus.\n\n§7Vérifiez la compatibilité de votre pack de ressources et le volume musical en jeu.",
    "it": "Nelle condizioni attuali, i suoni personalizzati non possono essere riprodotti.\n\n§7Controlla la compatibilità del tuo pacchetto risorse e il volume della musica in gioco.",
    "es": "En las condiciones actuales, no se pueden reproducir sonidos personalizados.\n\n§7Comprueba la compatibilidad de tu paquete de recursos y el volumen de la música en el juego.",
    "pt": "Nas condições atuais, não é possível reproduzir sons personalizados.\n\n§7Verifique a compatibilidade do seu pacote de recursos e o volume da música no jogo.",
    "is": "Undir núverandi aðstæðum er ekki hægt að spila sérsniðin hljóð.\n\n§7Athugaðu samhæfni auðlindapakka þíns og tónlistarhljóðstyrk í leik.",
    "el": "Στις τρέχουσες συνθήκες δεν μπορούν να αναπαραχθούν προσαρμοσμένοι ήχοι.\n\n§7Ελέγξτε τη συμβατότητα του πακέτου πόρων και την ένταση μουσικής στο παιχνίδι.",
    "ar": "في الظروف الحالية، لا يمكن تشغيل الأصوات المخصصة.\n\n§7تحقق من توافق حزمة الموارد وضبط مستوى صوت الموسيقى داخل اللعبة.",
    "fi": "Nykyisissä olosuhteissa mukautettuja ääniä ei voi toistaa.\n\n§7Tarkista resurssipakkisi yhteensopivuus ja pelin musiikkivolyymi.",
    "sv": "Under nuvarande förhållanden kan anpassade ljud inte spelas upp.\n\n§7Kontrollera din resurs‑pakets kompatibilitet och musikvolymen i spelet.",
    "ru": "При текущих условиях пользовательские звуки воспроизвести нельзя.\n\n§7Проверьте совместимость ресурс-пака и громкость музыки в игре.",
    "tr": "Mevcut koşullarda özel sesler oynatılamaz.\n\n§7Kaynak paket uyumluluğunu ve oyun içi müzik ses seviyesini kontrol edin.",
    "fa": "در شرایط فعلی نمی‌توان صداهای سفارشی را پخش کرد.\n\n§7سازگاری بسته منابع و حجم موسیقی داخل بازی را بررسی کنید.",
    "ps": "په اوسنیو شرایطو کې ګمره شوي غږونه نه شي چلیدای.\n\n§7د سرچینې پاک مطابقت او د لوبې میوزیک غږ کچه وګورئ.",
    "ur": "موجودہ حالات میں حسب منشا آوازیں نہیں چل سکتیں۔\n\n§7اپنے resource pack کی مطابقت اور گیم میں موسیقی کی آواز چیک کریں۔",
    "hi": "वर्तमान परिस्थितियों में कस्टम ध्वनियाँ नहीं बज सकतीं।\n\n§7अपने संसाधन पैक की संगतता और इन-गेम म्यूजिक वॉल्यूम जांचें।",
    "si": "වත්මන් තත්ත්වයන් යටතේ අභිරුචිකෘත ශබ්ද නැවැත්විය නොහැක.\n\n§7ඔබගේ සම්පත් පැකේජ කළ්‍යතාවය සහ ක්‍රීඩාවේ සංගීත පරිමාව පරීක්‍ෂා කරන්න.",
    "ta": "தற்போதைய சூழ்நிலைகளில் தனிப்பயன் ஒலிகளை இயக்க முடியாது.\n\n§7உங்கள் வள தொகுப்பின் இணக்கத்தன்மை மற்றும் விளையாட்டில் இசை தொகுதியை சரிபார்க்கவும்.",
    "ne": "वर्तमान अवस्था अन्तर्गत कस्टम ध्वनि बजाउन सकिँदैन।\n\n§7तपाईंको स्रोत प्याकको अनुकूलता र खेलभित्र संगीत भोल्युम जाँच गर्नुहोस्।",
    "bn": "বর্তমান পরিস্থিতে কাস্টম সাউন্ড বাজানো যাবে না।\n\n§7আপনার রিসোর্স প্যাক সমার্থকতা এবং ইন‑গেম মিউজিক ভলিউম চেক করুন।",
    "th": "ภายใต้เงื่อนไขปัจจุบัน ไม่สามารถเล่นเสียงกำหนดเองได้\n\n§7ตรวจสอบความเข้ากันได้ของ resource pack และระดับเสียงเพลงในเกม",
    "vi": "Trong điều kiện hiện tại, không thể phát âm thanh tùy chỉnh.\n\n§7Kiểm tra tính tương thích của gói tài nguyên và âm lượng nhạc trong trò chơi.",
    "id": "Dalam kondisi saat ini, suara khusus tidak dapat diputar.\n\n§7Periksa kompatibilitas paket sumber daya dan volume musik di dalam game.",
    "ms": "Dalam keadaan semasa, bunyi tersuai tidak boleh dimainkan.\n\n§7Periksa keserasian pek sumber dan kelantangan muzik dalam permainan.",
    "zh": "在当前条件下无法播放自定义音效。\n\n§7请检查资源包兼容性和游戏中音乐音量。",
    "ja": "現在の条件ではカスタムサウンドを再生できません。\n\n§7リソースパックの互換性とゲーム内音楽の音量を確認してください。",
    "ko": "현재 조건에서는 사용자 지정 사운드를 재생할 수 없습니다.\n\n§7리소스 팩 호환성과 게임 내 음악 볼륨을 확인하세요.",
    "mi": "I raro i ngā āhuatanga o nāianei, kāore e taea te purei i ngā oro ritenga.\n\n§7Tirohia te hototahi o tō kete rauemi me te rahinga oro puoro i roto i te kēmu.",
    "to": "‘I lalo he ngāue tonu, ‘ikai ke lava ke tākalo e ngaahi leo founga fou.\n\n§7Fakamo‘oni lelei ho‘o koloa pakē tali mo e leo musika ‘i he taʻetotolo.",
    "gil": "Under current conditions, custom sounds cannot be played...",
    "ty": "I raro i teie mau tu‘anga, ‘eita e nehenehe e ta‘o i te mau oro faatupu...\n\n§7Tirohia te faatama‘i o ta‘ outou pa‘epa‘e rauemi e te faufaa o te orometua i roto i te ta‘etotolo."
  },


  /*------------------------
    Menu - Shared timer
  -------------------------*/

  "menu.popup.shared_timer.title": {
    "en": "Shared timer",
    "de": "Gemeinsamer Timer",
    "fr": "Minuteur partagé",
    "it": "Timer condiviso",
    "es": "Temporizador compartido",
    "pt": "Temporizador compartilhado",
    "is": "Sameiginlegur tímaritari",
    "el": "Κοινός χρονοδιακόπτης",
    "ar": "المؤقت المشترك",
    "fi": "Jaettu ajastin",
    "sv": "Delad timer",
    "ru": "Общий таймер",
    "tr": "Paylaşılan zamanlayıcı",
    "fa": "تایمر مشترک",
    "ps": "شریک شوي ټایمر",
    "ur": "مشترکہ ٹائمر",
    "hi": "साझा टाइमर",
    "si": "හවුල් කළ ටයිමරය",
    "ta": "பகிரப்பட்ட நேரக்கணி",
    "ne": "सेयर गरिएको टाइमर",
    "bn": "শেয়ার করা টাইমার",
    "th": "ตัวจับเวลาที่แชร์",
    "vi": "Bộ hẹn giờ chia sẻ",
    "id": "Pengatur waktu bersama",
    "ms": "Pemasa berkongsi",
    "zh": "共享计时器",
    "ja": "共有タイマー",
    "ko": "공유 타이머",
    "mi": "Pātea tūhonohono",
    "to": "Taimi fakapapau",
    "gil": "Shared timer",
    "ty": "Taime faatupu"
  },

  "menu.popup.shared_timer.by": {
    "en": "by %{player}%",
    "de": "von %{player}%",
    "fr": "par %{player}%",
    "it": "di %{player}%",
    "es": "por %{player}%",
    "pt": "por %{player}%",
    "is": "eftir %{player}%",
    "el": "από %{player}%",
    "ar": "بواسطة %{player}%",
    "fi": "tekijä %{player}%",
    "sv": "av %{player}%",
    "ru": "от %{player}%",
    "tr": "tarafından %{player}%",
    "fa": "توسط %{player}%",
    "ps": "له لورې %{player}%",
    "ur": "بذریعہ %{player}%",
    "hi": "द्वारा %{player}%",
    "si": "ගේ %{player}%",
    "ta": "மூலம் %{player}%",
    "ne": "द्वारा %{player}%",
    "bn": "দ্বারা %{player}%",
    "th": "โดย %{player}%",
    "vi": "bởi %{player}%",
    "id": "oleh %{player}%",
    "ms": "oleh %{player}%",
    "zh": "由 %{player}%",
    "ja": "により %{player}%",
    "ko": "작성자 %{player}%",
    "mi": "nā %{player}%",
    "to": "‘e %{player}%",
    "gil": "by %{player}%",
    "ty": "e %{player}%"
  },

  "menu.popup.shared_timer.yours_instead": {
    "en": "Share yours instead",
    "de": "Teile stattdessen deinen",
    "fr": "Partage le tien à la place",
    "it": "Condividi il tuo al posto",
    "es": "Comparte el tuyo en su lugar",
    "pt": "Compartilhe o seu em vez disso",
    "is": "Deildu þínum í staðinn",
    "el": "Μοιράσου το δικό σου αντί γι’ αυτό",
    "ar": "شارك ما لديك بدلاً من ذلك",
    "fi": "Jaa omasi sen sijaan",
    "sv": "Dela din istället",
    "ru": "Поделись своим вместо этого",
    "tr": "Kendi zamanlayıcını paylaş",
    "fa": "به جای آن صدای خود را به اشتراک بگذار",
    "ps": "تر او پر ځای خپله شريکه کړه",
    "ur": "بجائے اس کے اپنا شیئر کریں",
    "hi": "इसके बजाय अपना साझा करें",
    "si": "ඔබේ එක හැර වෙනුවට බෙදා ගන්න",
    "ta": "அதற்கு பதிலாக உங்கள் பகிரவும்",
    "ne": "तपाईंको साटो तपाईंको सेयर गर्नुहोस्",
    "bn": "এর পরিবর্তে আপনারটি শেয়ার করুন",
    "th": "แชร์ของคุณแทน",
    "vi": "Chia sẻ của bạn thay vào đó",
    "id": "Bagikan milikmu sebagai gantinya",
    "ms": "Kongsi milik anda sebaliknya",
    "zh": "改为分享你的",
    "ja": "代わりにあなたのを共有",
    "ko": "대신 당신의 것을 공유",
    "mi": "Tōhaina tō ake hei tauāki",
    "to": "Fakafetu‘u ho‘o ia",
    "gil": "Share yours instead",
    "ty": "Fa‘aite i tō outou"
  },

  "menu.popup.shared_timer.description": {
    "en": "The shared timer feature copies your timer to an additional timer that is enforced on all players. %{replace_text}%\n\n§7Required for challenge mode.\n\n",
    "de": "Die Funktion 'Gemeinsamer Timer' kopiert deinen Timer auf einen zusätzlichen Timer, der für alle Spieler verbindlich ist. %{replace_text}%\n\n§7Erforderlich für den Challenge-Modus.\n\n",
    "fr": "La fonction de minuteur partagé copie votre minuteur vers un minuteur supplémentaire appliqué à tous les joueurs. %{replace_text}%\n\n§7Requis pour le mode défi.\n\n",
    "it": "La funzione timer condiviso copia il tuo timer in un timer aggiuntivo applicato a tutti i giocatori. %{replace_text}%\n\n§7Richiesto per la modalità sfida.\n\n",
    "es": "La función de temporizador compartido copia tu temporizador a uno adicional que se aplica a todos los jugadores. %{replace_text}%\n\n§7Requerido para el modo desafío.\n\n",
    "pt": "O recurso de timer compartilhado copia seu timer para um timer adicional aplicado a todos os jogadores. %{replace_text}%\n\n§7Necessário para o modo desafio.\n\n",
    "is": "Sameiginlegi tímamælirinn afritar tímamæli þitt á auka tímamæli sem gildir fyrir alla spilara. %{replace_text}%\n\n§7Áskorunarstilling krefst þessa.\n\n",
    "el": "Η λειτουργία κοινόχρηστου χρονοδιακόπτη αντιγράφει τον χρονοδιακόπτη σας σε έναν επιπλέον που εφαρμόζεται σε όλους τους παίκτες. %{replace_text}%\n\n§7Απαραίτητο για τη λειτουργία πρόκλησης.\n\n",
    "ar": "تقوم ميزة المؤقت المشترك بنسخ المؤقت الخاص بك إلى مؤقت إضافي يفرض على جميع اللاعبين. %{replace_text}%\n\n§7مطلوب لوضع التحدي.\n\n",
    "fi": "Jaetun ajastimen ominaisuus kopioi ajastimesi lisäajastimeen, jota käytetään kaikilla pelaajilla. %{replace_text}%\n\n§7Vaaditaan haaste-tilassa.\n\n",
    "sv": "Funktionen för delad timer kopierar din timer till en extra timer som gäller för alla spelare. %{replace_text}%\n\n§7Krävs för utmaningsläge.\n\n",
    "ru": "Функция общего таймера копирует ваш таймер в дополнительный, обязательный для всех игроков. %{replace_text}%\n\n§7Требуется для режима испытаний.\n\n",
    "tr": "Paylaşılan zamanlayıcı özelliği zamanlayıcınızı tüm oyuncular için uygulanan ek bir zamanlayıcıya kopyalar. %{replace_text}%\n\n§7Meydan okuma modu için gerekli.\n\n",
    "fa": "ویژگی تایمر مشترک تایمر شما را به تایمر اضافی کپی می‌کند که برای همه بازیکنان اجرا می‌شود. %{replace_text}%\n\n§7برای حالت چالش ضروری است.\n\n",
    "ps": "د شریک شوي ټایمر ځانګړتیا ستاسو ټایمر نورو ټولو لوبغاړو ته د پلي کیدو لپاره بل ټایمر ته کاپي کوي. %{replace_text}%\n\n§7د ننګونې حالت لپاره اړین.\n\n",
    "ur": "مشترکہ ٹائمر خصوصیت آپ کے ٹائمر کو ایک اضافی ٹائمر میں کاپی کرتا ہے جو تمام کھلاڑیوں پر نافذ ہوتا ہے۔ %{replace_text}%\n\n§7چیلنج موڈ کے لیے ضروری۔\n\n",
    "hi": "शेयर्ड टाइमर फीचर आपके टाइमर को एक अतिरिक्त टाइमर में कॉपी करता है जो सभी खिलाड़ियों पर लागू होता है। %{replace_text}%\n\n§7चैलेंज मोड के लिए आवश्यक।\n\n",
    "si": "හවුල් කළ ටයිමරය ඔබේ ටයිමරය සෑම ක්‍රීඩකයෙකුටම බලපාන අමතර ටයිමරයකට පිටපත් කරයි. %{replace_text}%\n\n§7අභියෝග මෝඩය සඳහා අවශ්‍යය.\n\n",
    "ta": "பகிரப்பட்ட நேரக்கணி அம்சம் உங்கள் நேரக்கணியை அனைத்து வீரர்களுக்கும் பாய்ச்சப்படும் கூடுதல் நேரக்கணிக்கு நகலெடுக்கும். %{replace_text}%\n\n§7சவால் முறைக்குத் தேவையானது.\n\n",
    "ne": "सेयर गरिएको टाइमरले तपाईंको टाइमरलाई सबै खेलाडीमा लागू हुने थप टाइमरमा प्रतिलिपि बनाउँछ। %{replace_text}%\n\n§7चुनौती मोडका लागि आवश्यक।\n\n",
    "bn": "শেয়ার করা টাইমার বৈশিষ্ট্যটি আপনার টাইমারটি একটি অতিরিক্ত টাইমারে অনুলিপি করে যা সমস্ত খেলোয়াড়ের জন্য প্রযোজ্য। %{replace_text}%\n\n§7চ্যালেঞ্জ মোডের জন্য প্রয়োজন।\n\n",
    "th": "คุณสมบัติตัวจับเวลาที่แชร์จะคัดลอกตัวจับเวลาของคุณไปยังตัวจับเวลาเพิ่มเติมที่บังคับใช้กับผู้เล่นทุกคน %{replace_text}%\n\n§7จำเป็นสำหรับโหมดความท้าทาย\n\n",
    "vi": "Tính năng bộ hẹn giờ chia sẻ sao chép bộ hẹn giờ của bạn sang một bộ hẹn giờ bổ sung được áp dụng cho tất cả người chơi. %{replace_text}%\n\n§7Yêu cầu cho chế độ thử thách.\n\n",
    "id": "Fitur pengatur waktu bersama menyalin pengatur waktu Anda ke pengatur waktu tambahan yang diterapkan pada semua pemain. %{replace_text}%\n\n§7Diperlukan untuk mode tantangan.\n\n",
    "ms": "Ciri pemasa dikongsi menyalin pemasa anda ke pemasa tambahan yang dikuatkuasakan untuk semua pemain. %{replace_text}%\n\n§7Diperlukan untuk mod cabaran.\n\n",
    "zh": "共享计时器功能会将您的计时器复制到对所有玩家强制执行的附加计时器。 %{replace_text}%\n\n§7挑战模式所需。\n\n",
    "ja": "共有タイマー機能はタイマーを全プレイヤーに適用される追加タイマーにコピーします。 %{replace_text}%\n\n§7チャレンジモードに必要です。\n\n",
    "ko": "공유 타이머 기능은 타이머를 모든 플레이어에게 적용되는 추가 타이머로 복사합니다. %{replace_text}%\n\n§7도전 모드에 필요합니다.\n\n",
    "mi": "Ka whakakōpeketia e te āhuatanga pātea tūhonohono tō pātea ki tētahi atu pātea e pā ana ki ngā kaitākaro katoa. %{replace_text}%\n\n§7Me hiahiatia mō te aratau wero.\n\n",
    "to": "ʻOku ngāue ʻa e faingataʻa taimi fakapapau ke fakaʻilonga hoʻo taimi ki ha taimi entonga ʻe fai ki he kakai kotoa. %{replace_text}%\n\n§7Tāpuaki ki he mode feinga.\n\n",
    "gil": "The shared timer feature coppies your timer to an additional timer that is enforced on all players. %{replace_text}%\n\n§7Required for challenge mode.\n\n",
    "ty": "Te haapiiraa taime faatupu e faaohipa i tō taime i ha taime apatooraa e faufaa ia i te mau taata atoa. %{replace_text}%\n\n§7E titauhia no te aravihi faatere.\n\n"
  },

  "menu.popup.shared_timer.description.replace_time": {
    "en": "%{name}% is currently sharing his / her timer. You can §cstop§f this or §ereplace§f it with your own time (%{own_time}%§r)",
    "de": "%{name}% teilt aktuell seinen/ihren Timer. Du kannst dies §cstoppen§f oder ihn mit deiner eigenen Zeit ersetzen (%{own_time}%§r)",
    "fr": "%{name}% partage actuellement son minuteur. Vous pouvez §cartêter§f cela ou §eremplacer§f par votre propre temps (%{own_time}%§r)",
    "it": "%{name}% sta condividendo il suo timer. Puoi §cinterrompere§f o §esostituirlo§f con il tuo tempo (%{own_time}%§r)",
    "es": "%{name}% está compartiendo su temporizador. Puedes §cdetener§f esto o §creemplazar§f con tu propio tiempo (%{own_time}%§r)",
    "pt": "%{name}% está compartilhando seu temporizador. Você pode §cparar§f isto ou §esubstituir§f com seu próprio tempo (%{own_time}%§r)",
    "is": "%{name}% er að deila sínum tímariti. Þú getur §chætt við§f eða §cerstatt§f með þínum tíma (%{own_time}%§r)",
    "el": "Ο %{name}% μοιράζεται αυτήν τη στιγμή τον χρονοδιακόπτη του. Μπορείς να §cσταματήσεις§f ή §cαντικαταστήσεις§f με τον δικό σου χρόνο (%{own_time}%§r)",
    "ar": "%{name}% يشارك مؤقته حاليًا. يمكنك §cإيقاف§f هذا أو §cاستبداله§f بوقتك الخاص (%{own_time}%§r)",
    "fi": "%{name}% jakaa tällä hetkellä ajastinta. Voit §cpysäyttää§f tai §ckorvata§f omalla ajallasi (%{own_time}%§r)",
    "sv": "%{name}% delar för närvarande sin timer. Du kan §cstoppa§f detta eller §cersätta§f med din egen tid (%{own_time}%§r)",
    "ru": "%{name}% в данный момент делится своим таймером. Вы можете §cостановить§f это или §cзаменить§f на своё время (%{own_time}%§r)",
    "tr": "%{name}% şu anda zamanlayıcısını paylaşıyor. Bunu §cdurdurabilir§f veya kendi zamanınızla §cdeğiştirebilirsiniz§f (%{own_time}%§r)",
    "fa": "%{name}% در حال اشتراک‌گذاری تایمر خود است. شما می‌توانید §cتوقف§f یا §cجایگزین§f با زمان خود (%{own_time}%§r) کنید",
    "ps": "%{name}% اوس خپل ټایمر شریکوي. تاسې کولی شئ دا §cودروئ§f یا §cبدیل§f له خپل وخت سره (%{own_time}%§r)",
    "ur": "%{name}% اس وقت اپنا ٹائمر شیئر کر رہا ہے۔ آپ اسے §cروک§f سکتے ہیں یا اپنے وقت (%{own_time}%§r) سے §cبدل§f سکتے ہیں",
    "hi": "%{name}% वर्तमान में अपना टाइमर साझा कर रहा है। आप इसे §cरोक§f सकते हैं या अपने समय (%{own_time}%§r) से §cबदल§f सकते हैं",
    "si": "%{name}% මේ අවස්ථාවේ ඔහුගේ/ඇයගේ ටයිමරය බෙදා ගන්නා අතර ඔබට §cනවතා§f හෝ §cඡන්ද මාරු§f (%{own_time}%§r) කළ හැක",
    "ta": "%{name}% தற்போது தன் நேரக்கணியை பகிர்கிறார். நீங்கள் அதை §cநிறுத்த§f அல்லது உங்கள் நேரத்துடன் §cமாற்ற§f (%{own_time}%§r)லாம்",
    "ne": "%{name}% अहिले आफ्नो टाइमर सेयर गर्दैछ। तपाईं यसलाई §cरोकिन्§f वा आफ्नो समय (%{own_time}%§r) सँग §cपरिवर्तित§f गर्न सक्नुहुन्छ",
    "bn": "§{name}% বর্তমানে তার টাইমার শেয়ার করছে। আপনি এটিকে §cথামাতে§f বা আপনার নিজস্ব সময় (%{own_time}%§r) দিয়ে §cপ্রতিস্থাপন§f করতে পারেন",
    "th": "{name}% กำลังแชร์ตัวจับเวลา คุณสามารถ §cหยุด§f หรือ §cแทนที่§f ด้วยเวลาของคุณเอง (%{own_time}%§r)",
    "vi": "%{name}% hiện đang chia sẻ bộ hẹn giờ. Bạn có thể §c dừng§f hoặc §cthay thế§f bằng thời gian của bạn (%{own_time}%§r)",
    "id": "%{name}% sedang membagikan timer-nya. Anda dapat §chentikan§f ini atau §cganti§f dengan waktu Anda sendiri (%{own_time}%§r)",
    "ms": "%{name}% kini berkongsi pemasa mereka. Anda boleh §chentikan§f ini atau §cganti§f dengan masa anda sendiri (%{own_time}%§r)",
    "zh": "§{name}% 当前正在共享他的计时器。您可以§c停止§f或§c替换§f为您自己的时间（%{own_time}%§r）",
    "ja": "%{name}% は現在タイマーを共有しています。これを§c停止§fするか、あなた自身の時間（%{own_time}%§r）で§c置換§fできます",
    "ko": "%{name}%님이 현재 타이머를 공유 중입니다. 이를 §c중지§f하거나 자신의 시간(%{own_time}%§r)으로 §c교체§f할 수 있습니다",
    "mi": "Ke tohatoha ana a %{name}% i tana pātea ināianei. Ka taea e koe te §cwhakakore§f tēnei, te §ctāwhiri§f rānei ki tō ake wā (%{own_time}%§r)",
    "to": "‘Oku talanoa ‘e %{name}% hono taimi fakapapau. Te ke lava ‘o §ctapu§f pe §cfoki§f ki ho‘o taimi (‘%{own_time}%§r)",
    "gil": "%{name}% is currently sharing his / her timer. You can §cstop§f this or §ereplace§f it with your own time (%{own_time}%§r)",
    "ty": "E faatupu nei a %{name}% i tōna taime. E nehenehe ia outou e §ctutū§f i tēnei aore ra §cfai faa‘iru§f i tō outou taime (‘%{own_time}%§r)"
  },

  "menu.popup.shared_timer.description.contol": {
    "en": "Only admins can control it.",
    "de": "Nur Admins können dies steuern.",
    "fr": "Seuls les administrateurs peuvent le contrôler.",
    "it": "Solo gli amministratori possono controllarlo.",
    "es": "Solo los administradores pueden controlarlo.",
    "pt": "Apenas administradores podem controlá‑lo.",
    "is": "Aðeins stjórnendur geta stjórnað þessu.",
    "el": "Μόνο οι διαχειριστές μπορούν να το ελέγξουν.",
    "ar": "فقط المسؤولون يمكنهم التحكم فيه.",
    "fi": "Vain ylläpitäjät voivat hallita sitä.",
    "sv": "Endast administratörer kan kontrollera det.",
    "ru": "Только админы могут этим управлять.",
    "tr": "Yalnızca yöneticiler kontrol edebilir.",
    "fa": "فقط مدیران می‌توانند آن را کنترل کنند.",
    "ps": "یواځې اډمینان کولای شي دا کنټرول کړي.",
    "ur": "صرف ایڈمنز اسے کنٹرول کر سکتے ہیں۔",
    "hi": "केवल एडमिन ही इसे नियंत्रित कर सकते हैं।",
    "si": "ප්‍රශ්ස්කාරකයින්ට පමණක් මෙය පාලනය කළ හැක.",
    "ta": "பொதுவாக நிர்வாகிகள் மட்டுமே இதை கையாளலாம்.",
    "ne": "केवल एडमिनहरूले यसलाई नियन्त्रण गर्न सक्छन्।",
    "bn": "শুধুমাত্র অ্যাডমিনরা এটি নিয়ন্ত্রণ করতে পারে।",
    "th": "มีเพียงผู้ดูแลระบบเท่านั้นที่ควบคุมได้",
    "vi": "Chỉ quản trị viên mới có thể điều khiển nó.",
    "id": "Hanya admin yang dapat mengendalikannya.",
    "ms": "Hanya pentadbir yang boleh mengawalnya.",
    "zh": "只有管理员可以控制它。",
    "ja": "管理者のみがこれを制御できます。",
    "ko": "관리자만 제어할 수 있습니다.",
    "mi": "Ko ngā kaiwhakahaere anake ka taea te whakahaere.",
    "to": "‘Oku lava pe ʻa e pule faka‘ilonga ke fakahoko‘anga.",
    "gil": "Only admins can control it.",
    "ty": "E nehenehe outou na te mau fa‘atere paha e taata fa‘atere."
  },



  /*------------------------
    Menu - CA
  -------------------------*/

  "menu.popup.ca.title": {
    "en": "Challenge mode",
    "de": "Challenge-Modus",
    "fr": "Mode défi",
    "it": "Modalità sfida",
    "es": "Modo desafío",
    "pt": "Modo desafio",
    "is": "Áskorunarhamur",
    "el": "Λειτουργία πρόκλησης",
    "ar": "وضع التحدي",
    "fi": "Haastetila",
    "sv": "Utmaningsläge",
    "ru": "Режим испытаний",
    "tr": "Meydan okuma modu",
    "fa": "حالت چالش",
    "ps": "د ننګونې حالت",
    "ur": "چیلنج موڈ",
    "hi": "चैलेंज मोड",
    "si": "අභියෝග ආකෘතිය",
    "ta": "சவால் முறையமைப்பு",
    "ne": "चुनौती मोड",
    "bn": "চ্যালেঞ্জ মোড",
    "th": "โหมดความท้าทาย",
    "vi": "Chế độ thử thách",
    "id": "Mode tantangan",
    "ms": "Mod cabaran",
    "zh": "挑战模式",
    "ja": "チャレンジモード",
    "ko": "도전 모드",
    "mi": "Aratau wero",
    "to": "Mode feinga",
    "gil": "Challenge mode",
    "ty": "Mode faahiteraa"
  },

  "menu.popup.ca.description": {
    "en": "In this mode, the timer shifts from a supporting role to the main one. First, you set the guidelines and then plunge into the adventure of the survival mode!",
    "de": "In diesem Modus wird der Timer von einer unterstützenden zu einer zentralen Funktion. Zuerst legst du die Regeln fest und stürzt dich dann ins Abenteuer des Überlebensmodus!",
    "fr": "Dans ce mode, le minuteur passe d’un rôle de soutien à un rôle principal. D’abord, vous définissez les règles, puis vous vous lancez dans l’aventure du mode survie!",
    "it": "In questa modalità, il timer passa da ruolo di supporto a ruolo principale. Prima imposti le linee guida e poi ti tuffi nell’avventura della modalità sopravvivenza!",
    "es": "En este modo, el temporizador pasa de un papel de apoyo a un papel principal. Primero estableces las pautas y luego te sumerges en la aventura del modo supervivencia!",
    "pt": "Neste modo, o temporizador passa de um papel de apoio para o principal. Primeiro você define as diretrizes e depois mergulha na aventura do modo sobrevivência!",
    "is": "Í þessum ham færist tímaritari úr stuðningshlutverki í aðalhlutverk. Fyrst stillirðu reglurnar og svo dýfirðu þér í ævintýri lifnaðarhamarins!",
    "el": "Σε αυτή τη λειτουργία, ο χρονοδιακόπτης μεταβαίνει από δευτερεύοντα ρόλο σε κύριο. Πρώτα ορίζετε τις κατευθυντήριες γραμμές και μετά βυθίζεστε στην περιπέτεια της λειτουργίας επιβίωσης!",
    "ar": "في هذا الوضع، ينتقل المؤقت من دور داعم إلى الدور الرئيسي. أولاً تحدد الإرشادات ثم تغوص في مغامرة وضع البقاء!",
    "fi": "Tässä tilassa ajastin siirtyy tukiroolista päätiehen. Ensin asetat ohjeet ja sitten sukellat selviytymismoodin seikkailuun!",
    "sv": "I detta läge skiftar timern från stödroll till huvudroll. Först ställer du in riktlinjerna och sedan kastar du dig in i överlevnadslägets äventyr!",
    "ru": "В этом режиме таймер переходит из вспомогательной роли в основную. Сначала вы задаёте правила, а затем погружаетесь в приключение режима выживания!",
    "tr": "Bu modda sayaç, destekleyici rolden ana role geçer. Önce kuralları belirlersiniz, sonra hayatta kalma modunun macerasına atılırsınız!",
    "fa": "در این حالت، تایمر از نقش پشتیبان به نقش اصلی منتقل می‌شود. ابتدا راهنما را تنظیم می‌کنید و سپس به ماجراجویی حالت بقا می‌پرید!",
    "ps": "په دې حالت کې، ټایمر له ملاتړي رول څخه اصلي رول ته اوړي. لومړی تاسو لارښودونه ټاکئ او بیا د ژوندي پاتې کیدو حالت ماجراجویۍ ته ځان نږدې کوئ!",
    "ur": "اس موڈ میں، ٹائمر معاون کردار سے مرکزی کردار میں تبدیل ہو جاتا ہے۔ پہلے آپ رہنما اصول مرتب کرتے ہیں اور پھر سرائیوول موڈ کے مہم جوئی میں کود پڑتے ہیں!",
    "hi": "इस मोड में, टाइमर सहायक भूमिका से मुख्य भूमिका में स्थानांतरित हो जाता है। पहले आप दिशानिर्देश सेट करते हैं और फिर सर्वाइवल मोड के साहसिक कार्य में छलांग लगाते हैं!",
    "si": "මෙම මාදිලියේදී ටයිමරය සහායදායක චාරිකාවෙන් ප්‍රධාන චාරිකාවට හරවනවා. පළමුව ඔබ නීති තීරණය කර, පසුව ජීවිතාරක්ෂණ මාදිලියේ සර්ව ඔබාන්න!",
    "ta": "இந்த முறையில், நேரக்கணி துணை அரங்கத்திலிருந்து முதன்மை அரங்கத்துக்கு மாறுகிறது. முதலில் வழிகாட்டுதல்களை அமைத்து பின்னர் உயிர்வாழ்வு முறையின் சாகசத்தில் மூழ்குங்கள்!",
    "ne": "यस मोडमा, टाइमरले समर्थन भूमिका देखि मुख्य भूमिकामा सर्छ। पहिले तपाईंले दिशानिर्देशहरू सेट गर्नुहुन्छ र त्यसपछि सर्वाइवल मोडको साहसिकमा पर्चिनुहुन्छ!",
    "bn": "এই মোডে, টাইমার সহায়ক ভূমিকা থেকে প্রধান ভূমিকা গ্রহণ করে। প্রথমে আপনি নির্দেশিকা সেট করেন এবং তারপর সারভাইভাল মোডের অ্যাডভেঞ্চারে প্রবেশ করেন!",
    "th": "ในโหมดนี้ ตัวจับเวลาจะเปลี่ยนจากบทบาทสนับสนุนเป็นบทบาทหลัก ก่อนอื่นคุณตั้งแนวทาง แล้วจึงดำดิ่งสู่การผจญภัยโหมดเอาชีวิตรอด!",
    "vi": "Trong chế độ này, bộ hẹn giờ chuyển từ vai trò hỗ trợ sang vai trò chính. Đầu tiên bạn đặt hướng dẫn và sau đó lao vào cuộc phiêu lưu chế độ sinh tồn!",
    "id": "Dalam mode ini, timer beralih dari peran pendukung ke peran utama. Pertama, Anda menetapkan pedoman lalu menyelami petualangan mode bertahan hidup!",
    "ms": "Dalam mod ini, pemasa beralih dari peranan sokongan ke peranan utama. Pertama, anda tetapkan garis panduan lalu terjun ke pengembaraan mod bertahan!",
    "zh": "在此模式下，计时器由辅助角色转为主角。首先设置规则，然后投入生存模式的冒险！",
    "ja": "このモードでは、タイマーはサポート役から主役に移行します。まずガイドラインを設定し、その後サバイバルモードの冒険に飛び込みます！",
    "ko": "이 모드에서 타이머는 보조 역할에서 주역 역할로 전환됩니다. 먼저 가이드라인을 설정한 다음 생존 모드의 모험에 뛰어드세요!",
    "mi": "I roto i tēnei aratau, ka neke te pātea i te aronga tautoko ki te aronga matua. Tuatahi whakaritea ngā ārahitanga, katahi ka huri ki te haerenga o te aratau ora!",
    "to": "‘I he mode ko eni, ‘oku palu e taimi mei ha koloa tokoni ki ha koloa potungaue. ‘Oku ke fakaiki ‘a e founga mo ‘osi mohe ki he ngāue feinga fola leva!",
    "gil": "In this mode, the timer shifts from a supporting role to the main one. First, you set the guidelines and then plunge into the adventure of the survival mode!",
    "ty": "I roto i teie arata‘i, e haamaramarama te taime mai te ha‘u papu no te taputapu apatooraa tei te tahi atu papu. I te matahiti mua, e tāpa‘o outou i te mau ta‘ere e ua mau paepae, i muri a‘e e ‘ā i te hohoa faanahoraa oraraa!"
  },

  "menu.popup.ca.description_in_ca": {
    "en": "If this function is deactivated, the timer will operate more in the background and will no longer have any influence on the game mode.",
    "de": "Wenn diese Funktion deaktiviert ist, arbeitet der Timer eher im Hintergrund und hat keinen Einfluss mehr auf den Spielmodus.",
    "fr": "Si cette fonction est désactivée, le minuteur fonctionnera en arrière‑plan et n’aura plus aucune influence sur le mode de jeu.",
    "it": "Se questa funzione è disattivata, il timer funzionerà più in background e non influirà più sulla modalità di gioco.",
    "es": "Si esta función está desactivada, el temporizador funcionará más en segundo plano y ya no influirá en el modo de juego.",
    "pt": "Se essa função estiver desativada, o timer funcionará mais em segundo plano e não influenciará mais o modo de jogo.",
    "is": "Ef þessi aðgerð er afvirkjuð, mun tímamælirinn vinna meira í bakgrunni og hefur ekki lengur áhrif á leikhaminn.",
    "el": "Εάν αυτή η λειτουργία απενεργοποιηθεί, ο χρονοδιακόπτης θα λειτουργεί περισσότερο στο παρασκήνιο και δεν θα επηρεάζει πλέον τη λειτουργία παιχνιδιού.",
    "ar": "إذا تم تعطيل هذه الوظيفة، سيعمل المؤقت في الخلفية بشكل أكبر ولن يؤثر بعد الآن على وضع اللعبة.",
    "fi": "Jos tämä toiminto on poistettu käytöstä, ajastin toimii enemmän taustalla eikä enää vaikuta pelitilaan.",
    "sv": "Om den här funktionen avaktiveras kommer timern att köras mer i bakgrunden och inte längre påverka spelläget.",
    "ru": "Если эта функция отключена, таймер будет работать больше в фоновом режиме и больше не будет влиять на игровой режим.",
    "tr": "Bu işlev devre dışı bırakılırsa sayaç daha arka planda çalışır ve oyun modunu etkilemez.",
    "fa": "اگر این قابلیت غیرفعال شود، تایمر بیشتر در پس‌زمینه کار می‌کند و دیگر روی حالت بازی تأثیری ندارد.",
    "ps": "که دغه فنکشن غیر فعال شي، ټایمر به په پس منظر کې ډیر کار وکړي او د لوبې حالت باندې نور تاثیر نلري.",
    "ur": "اگر یہ فنکشن غیر فعال ہو جائے تو ٹائمر پس منظر میں زیادہ کام کرے گا اور گیم موڈ پر اس کا کوئی اثر نہیں ہوگا۔",
    "hi": "यदि यह फ़ंक्शन अक्षम है, तो टाइमर बैकग्राउंड में अधिक काम करेगा और अब गेम मोड को प्रभावित नहीं करेगा।",
    "si": "මෙම ක්‍රියාවලිය අක්‍රිය කර ඇත්නම්, ටයිමරය පසුබැසීමේදී වැඩ více කරයි හා ක්‍රීඩා මාදිලියට බලපාන්නේ නැත.",
    "ta": "இந்த அம்சம் முடக்கப்பட்டால், நேரக்கணி பின்னணி முறையில் அதிகமாக செயல்படும் மற்றும் விளையாட்டு முறையை மீண்டும் பாதிக்காது.",
    "ne": "यस कार्यक्षमता अक्षम भएमा, टाइमर पृष्ठभूमिमा अधिक सञ्चालन हुनेछ र खेल मोडमा असर नपर्नेछ।",
    "bn": "এই ফাংশনটি নিষ্ক্রিয় হলে টাইমার ব্যাকগ্রাউন্ডে বেশি কাজ করবে এবং গেম মোডে আর প্রভাব ফেলবে না।",
    "th": "หากปิดฟังก์ชันนี้ ตัวจับเวลาจะทำงานเบื้องหลังมากขึ้นและจะไม่ส่งผลต่อโหมดเกมอีกต่อไป",
    "vi": "Nếu chức năng này bị tắt, bộ hẹn giờ sẽ hoạt động nhiều hơn ở nền và sẽ không còn ảnh hưởng đến chế độ chơi nữa.",
    "id": "Jika fungsi ini dinonaktifkan, timer akan berjalan lebih di latar belakang dan tidak lagi memengaruhi mode permainan.",
    "ms": "Jika ciri ini dimatikan, pemasa akan beroperasi lebih di latar belakang dan tidak lagi mempengaruhi mod permainan.",
    "zh": "如果禁用此功能，计时器将在后台更多运行，不再影响游戏模式。",
    "ja": "この機能を無効にすると、タイマーはバックグラウンドでより動作し、ゲームモードには影響しなくなります。",
    "ko": "이 기능을 비활성화하면 타이머가 백그라운드에서 더 작동하며 게임 모드에는 더 이상 영향을 주지 않습니다.",
    "mi": "Mēnā ka whakakorehia tēnei āhuatanga, ka mahi kōrea te pātea i roto i te papamuri, kāore e tino pā ki te aratau kēmu.",
    "to": "Kapau na e fakatu‘u‘i ha me‘a ni, ‘e lea lahi ange e taimi ‘i he hinama ‘o e koloa pea ‘e ‘ikai toe fakamalolō ‘i he mode ‘a e ta‘etotolo.",
    "gil": "If this function is deactivated, the timer will operate more in the background and will no longer have any influence on the game mode.",
    "ty": "Mai te taa‘a mai te faana‘o i teie faanahoraa, e na te taime e faaohipa atu i muri, e ere roa te reira e faufaa i te arata‘i faatere."
  },

  "menu.popup.ca.note": {
    "en": "This setting will change the timer significantly.",
    "de": "Diese Einstellung verändert den Timer erheblich.",
    "fr": "Ce paramètre modifiera considérablement le minuteur.",
    "it": "Questa impostazione cambierà significativamente il timer.",
    "es": "Esta configuración cambiará significativamente el temporizador.",
    "pt": "Esta configuração mudará significativamente o timer.",
    "is": "Þessi stilling mun breyta tímamæli verulega.",
    "el": "Αυτή η ρύθμιση θα αλλάξει σημαντικά τον χρονοδιακόπτη.",
    "ar": "سيؤدي هذا الإعداد إلى تغيير المؤقت بشكل كبير.",
    "fi": "Tämä asetus muuttaa ajastimen huomattavasti.",
    "sv": "Denna inställning kommer att förändra timern avsevärt.",
    "ru": "Этот параметр значительно изменит таймер.",
    "tr": "Bu ayar, zamanlayıcıyı önemli ölçüde değiştirecek.",
    "fa": "این تنظیم تایمر را به طور قابل توجهی تغییر می‌دهد.",
    "ps": "دا تنظیم به ټایمر کې په پراخه کچه بدلون راولي.",
    "ur": "یہ سیٹنگ ٹائمر کو نمایاں طور پر تبدیل کر دے گی۔",
    "hi": "यह सेटिंग टाइमर को काफी बदल देगी।",
    "si": "මෙම සැකසුම ටයිමරය විශාල ලෙස වෙනස් කරයි.",
    "ta": "இந்த அமைப்பு நேரக்கணியை பெரிதும் மாற்றும்.",
    "ne": "यो सेटिङले टाइमरलाई महत्वपूर्ण रूपमा परिवर्तन गर्नेछ।",
    "bn": "এই সেটিং টাইমারটি উল্লেখযোগ্যভাবে পরিবর্তন করবে।",
    "th": "การตั้งค่านี้จะเปลี่ยนตัวจับเวลาอย่างมีนัยสำคัญ",
    "vi": "Cài đặt này sẽ thay đổi bộ hẹn giờ đáng kể.",
    "id": "Pengaturan ini akan mengubah timer secara signifikan.",
    "ms": "Tetapan ini akan mengubah pemasa dengan ketara.",
    "zh": "此设置将显著改变计时器。",
    "ja": "この設定はタイマーを大幅に変更します。",
    "ko": "이 설정은 타이머를 크게 변경합니다.",
    "mi": "Ka rereketia e tēnei tautuhinga te pātea tino nui.",
    "to": "Ko e fakalelei faka‘ata ko eni ‘e liliu lahi ange e taimi.",
    "gil": "This setting will change the timer significantly.",
    "ty": "Te faanahoraa nei e na faaauau roa i to te taime te mau raveʻa."
  },

  "menu.popup.ca.start": {
    "en": "Start Challenge",
    "de": "Challenge starten",
    "fr": "Démarrer le défi",
    "it": "Avvia sfida",
    "es": "Iniciar desafío",
    "pt": "Iniciar desafio",
    "is": "Byrja áskorun",
    "el": "Ξεκίνησε την πρόκληση",
    "ar": "ابدأ التحدي",
    "fi": "Aloita haaste",
    "sv": "Starta utmaning",
    "ru": "Начать испытание",
    "tr": "Challenge başlat",
    "fa": "شروع چالش",
    "ps": "چلنج پیل کړئ",
    "ur": "چیلنج شروع کریں",
    "hi": "चैलेंज शुरू करें",
    "si": "අභියෝගය ආරම්භ කරන්න",
    "ta": "சவாலை தொடங்கவும்",
    "ne": "चुनौती सुरु गर्नुहोस्",
    "bn": "চ্যালেঞ্জ শুরু করুন",
    "th": "เริ่มความท้าทาย",
    "vi": "Bắt đầu thử thách",
    "id": "Mulai tantangan",
    "ms": "Mula cabaran",
    "zh": "开始挑战",
    "ja": "チャレンジ開始",
    "ko": "도전 시작",
    "mi": "Tīmata wero",
    "to": "Fakatu‘a e feinga",
    "gil": "Start Challenge",
    "ty": "Tāroahia te aravihi"
  },

  "menu.popup.ca.start.description": {
    "en": "You are trying to start a challenge. Once a challenge is started, many settings are no longer available.\n\nHere's a brief overview:\n",
    "de": "Du versuchst, einen Challenge-Modus zu starten. Sobald der Challenge-Modus startet, sind viele Einstellungen nicht mehr verfügbar.\n\nHier eine kurze Übersicht:\n",
    "fr": "Vous essayez de démarrer un défi. Une fois le défi lancé, de nombreuses options ne seront plus disponibles.\n\nVoici un aperçu:\n",
    "it": "Stai tentando di avviare una sfida. Una volta avviata, molte impostazioni non saranno più disponibili.\n\nEcco una panoramica:\n",
    "es": "Estás intentando iniciar un desafío. Una vez iniciado, muchas configuraciones ya no estarán disponibles.\n\nAquí un breve resumen:\n",
    "pt": "Você está tentando iniciar um desafio. Uma vez iniciado, muitas configurações não estarão mais disponíveis.\n\nAqui está uma visão geral:\n",
    "is": "Þú ert að reyna að hefja áskorun. Þegar áskorun hefst eru margar stillingar ekki lengur í boði.\n\nHér er stutt yfirlit:\n",
    "el": "Προσπαθείτε να ξεκινήσετε μια πρόκληση. Μόλις ξεκινήσει, πολλές ρυθμίσεις δεν θα είναι πλέον διαθέσιμες.\n\nΕδώ μια σύντομη επισκόπηση:\n",
    "ar": "أنت تحاول بدء التحدي. بمجرد بدء التحدي، لن تتوفر العديد من الإعدادات بعد ذلك.\n\nإليك نظرة عامة سريعة:\n",
    "fi": "Yrität aloittaa haasteen. Kun haaste alkaa, monet asetukset eivät enää ole käytettävissä.\n\nTässä on lyhyt yleiskatsaus:\n",
    "sv": "Du försöker starta en utmaning. När utmaningen startar kommer många inställningar inte längre att vara tillgängliga.\n\nHär är en kort översikt:\n",
    "ru": "Вы пытаетесь начать испытание. После запуска режима многие настройки станут недоступны.\n\nКраткий обзор:\n",
    "tr": "Bir meydan okumayı başlatmaya çalışıyorsunuz. Meydan okuma başlatıldıktan sonra birçok ayar kullanılamaz hale gelir.\n\nİşte kısa bir özet:\n",
    "fa": "شما در حال تلاش برای شروع چالش هستید. پس از شروع، بسیاری از تنظیمات در دسترس نخواهند بود.\n\nدر اینجا مروری کوتاه است:\n",
    "ps": "تاسو هڅه کوئ چې یو ننګونه پیل کړئ. یو ځل چې پیل شي، ډیری ترتیبات نور شتون نلري.\n\nدلته یوه لنډه کتنه ده:\n",
    "ur": "آپ چیلنج شروع کرنے کی کوشش کر رہے ہیں۔ ایک بار شروع ہونے کے بعد، بہت سی ترتیبات دستیاب نہیں رہیں گی۔\n\nیہاں ایک مختصر جائزہ ہے:\n",
    "hi": "आप एक चैलेंज शुरू करने की कोशिश कर रहे हैं। एक बार शुरू होने के बाद, कई सेटिंग्स उपलब्ध नहीं रहेंगी।\n\nयहाँ एक संक्षिप्त अवलोकन है:\n",
    "si": "ඔබ අභියෝගය ආරම්භ කිරීමට උත්සාහ කරමින් සිටී. ආරම්භ වූ විට, බොහෝ සැකසුම් නොපවතී.\n\nමෙන්න කෙටි සාරාංශයක්:\n",
    "ta": "நீங்கள் சவாலை தொடங்க முயற்சிக்கிறீர்கள். ஒரு முறை தொடங்கினால், பல அமைப்புகள் இனி கிடைக்காது.\n\nஇங்கே ஒரு சுருக்கமான கண்ணோட்டம்:\n",
    "ne": "तपाईं चुनौती सुरु गर्न खोज्दै हुनुहुन्छ। एकपटक सुरु भएपछि, धेरै सेटिङहरू उपलब्ध हुँदैनन्।\n\nयहाँ संक्षिप्त अवलोकन:\n",
    "bn": "আপনি একটি চ্যালেঞ্জ শুরু করার চেষ্টা করছেন। একবার শুরু হলে, অনেক সেটিংস আর উপলব্ধ থাকবে না।\n\nএখানে সংক্ষিপ্ত তথ্য:\n",
    "th": "คุณกำลังพยายามเริ่มโหมดความท้าทาย เมื่อเริ่มแล้ว การตั้งค่าหลายอย่างจะไม่สามารถใช้งานได้อีก\n\nนี่คือภาพรวมสั้นๆ:\n",
    "vi": "Bạn đang cố gắng bắt đầu thử thách. Khi thử thách bắt đầu, nhiều cài đặt sẽ không còn khả dụng.\n\nĐây là tóm tắt:\n",
    "id": "Anda berusaha memulai tantangan. Setelah dimulai, banyak pengaturan tidak lagi tersedia.\n\nBerikut ikhtisar singkat:\n",
    "ms": "Anda cuba memulakan cabaran. Setelah dimulakan, banyak tetapan tidak lagi tersedia.\n\nBerikut ringkasan:\n",
    "zh": "您正在尝试开始挑战。一旦开始，许多设置将不再可用。\n\n以下是概览：\n",
    "ja": "チャレンジを開始しようとしています。開始すると、多くの設定が利用できなくなります。\n\n概要はこちら：\n",
    "ko": "도전을 시작하려고 합니다. 시작되면 많은 설정을 더 이상 사용할 수 없습니다.\n\n간단히 요약하면:\n",
    "mi": "Ke whakamātau koe ki te tīmata wero. Kia tīmata ana, kāore e wātea ētahi tautuhinga maha.\n\nAnei he tirohanga pāpaku:\n",
    "to": "Oku ke feinga e fakatu‘a e feinga. Kapau ‘e ‘osi, lahi ngata e ngaahi liliu ‘e ‘ikai ke lava ke ke ngaue‘aki ange\n\n‘I heni ha fakamatala poto:\n",
    "gil": "You are trying to start a challenge. Once a challenge is started, many settings are no longer available.\n\nHere's a brief overview:\n",
    "ty": "E nehenehe ta outou e timata i te aravihi. I muri a‘e i te timata, e ere roa te mau faanahoraa tātau i teie nei.\n\nA here te hohoa poto:\n"
  },

  "menu.popup.give_up": {
    "en": "Give up!",
    "de": "Aufgeben!",
    "fr": "Abandonner!",
    "it": "Rinuncia!",
    "es": "¡Rendirse!",
    "pt": "Desistir!",
    "is": "Gef þig!",
    "el": "Παράτησε!",
    "ar": "استسلم!",
    "fi": "Lannistu!",
    "sv": "Ge upp!",
    "ru": "Сдаться!",
    "tr": "Pes et!",
    "fa": "تسلیم شو!",
    "ps": "شاته شې!",
    "ur": "ہار مان لیں!",
    "hi": "हार मानो!",
    "si": "හැර දමන්න!",
    "ta": "வெறுங்க!",
    "ne": "हार मान!",
    "bn": "ছেড়ে দাও!",
    "th": "ยอมแพ้!",
    "vi": "Bỏ cuộc!",
    "id": "Menyerah!",
    "ms": "Tutup!",
    "zh": "放弃！",
    "ja": "諦める！",
    "ko": "포기!",
    "mi": "Whakawaetia!",
    "to": "Tu‘u!",
    "gil": "Give up!",
    "ty": "Faahoro!"
  },

  "menu.popup.give_up.description": {
    "en": "You are about to end a challenge.\nIf you complete the challenge this way, you will §llose all your progress%{hardcore}%§r.",
    "de": "Du bist dabei, eine Herausforderung zu beenden.\nWenn du den Challenge-Modus so abschließt, wirst du §lall deinen Fortschritt verlieren%{hardcore}%§r.",
    "fr": "Vous êtes sur le point de terminer un défi.\nSi vous terminez le défi ainsi, vous §lperdrez tous vos progrès%{hardcore}%§r.",
    "it": "Stai per terminare una sfida.\nSe completi la sfida in questo modo, §lperderai tutti i tuoi progressi%{hardcore}%§r.",
    "es": "Estás a punto de terminar un desafío.\nSi completas el desafío así, §lperderás todo tu progreso%{hardcore}%§r.",
    "pt": "Você está prestes a encerrar um desafio.\nSe completar o desafio assim, §lperderá todo o seu progresso%{hardcore}%§r.",
    "is": "Þú ert að fara ljúka áskorun.\nEf þú klárar áskorun svona, §ptu tapa öllum framförum þínum%{hardcore}%§r.",
    "el": "Ετοιμάζεστε να τερματίσετε μια πρόκληση.\nΕάν το κάνετε έτσι, §lθα χάσετε όλη την πρόοδό σας%{hardcore}%§r.",
    "ar": "أنت على وشك إنهاء التحدي.\nإذا أنهيت التحدي بهذه الطريقة، فست§lفقد كل تقدمك%{hardcore}%§r.",
    "fi": "Olet lopettamassa haastetta.\nJos lopetat haasteen näin, §lhäviät kaikki edistymisesi%{hardcore}%§r.",
    "sv": "Du är på väg att avsluta en utmaning.\nOm du avslutar utmaningen så här, §lkommer du att förlora all din framsteg%{hardcore}%§r.",
    "ru": "Вы собираетесь завершить испытание.\nЕсли вы так завершите испытание, §lвы потеряете весь прогресс%{hardcore}%§r.",
    "tr": "Bir meydan okumayı bitirmek üzeresiniz.\nMeydan okumayı böyle tamamlarsanız, §ltüm ilerlemenizi kaybedeceksiniz%{hardcore}%§r.",
    "fa": "شما در شرف پایان چالش هستید.\nاگر چالش را اینگونه تکمیل کنید، §lتمام پیشرفت خود را از دست خواهید داد%{hardcore}%§r.",
    "ps": "تاسو د ننګونې پای ته رسولو په حال کې یاست.\nکه تاسو داسې پای ته ورسوئ، §lبه تاسو خپل ټول پرمختګ له لاسه ورکړئ%{hardcore}%§r.",
    "ur": "آپ ایک چیلنج ختم کرنے والے ہیں۔\nاگر آپ اس طرح چیلنج مکمل کرتے ہیں، تو آپ §lاپنی تمام پیشرفت کھو دیں گے%{hardcore}%§r.",
    "hi": "आप एक चुनौती समाप्त करने वाले हैं।\nयदि आप इस तरह चुनौती पूरी करते हैं, तो आप §lअपनी सभी प्रगति खो देंगे%{hardcore}%§r.",
    "si": "ඔබ අභියෝගයක් අවසන් කරන්නේය.\nමෙහෙම නිම කළහොත්, §lඔබගේ සියලු ප්‍රගතිය නෂ්ට වේ%{hardcore}%§r.",
    "ta": "நீங்கள் ஒரு சவாலை நிறுத்தவிருக்கிறீர்கள்.\nஇப்படிச் சவாலை முடித்தால், §lஉங்கள் அனைத்து முன்னேற்றத்தையும் இழந்து விடுவீர்கள்%{hardcore}%§r.",
    "ne": "तपाईं चुनौती समाप्त गर्न लाग्नु भएको छ।\nयदि यसरी चुनौती पूरा गर्नुहुन्छ भने, §lतपाईं आफ्नो सबै प्रगति गुमाउनुहुनेछ%{hardcore}%§r.",
    "bn": "আপনি একটি চ্যালেঞ্জ শেষ করতে যাচ্ছেন।\nএইভাবে চ্যালেঞ্জ সম্পন্ন করলে, §lআপনি আপনার সমস্ত অগ্রগতি হারাবেন%{hardcore}%§r.",
    "th": "คุณกำลังจะยกเลิกความท้าทาย\nหากคุณจบความท้าทายแบบนี้ คุณจะ §lเสียความคืบหน้าทั้งหมด%{hardcore}%§r",
    "vi": "Bạn sắp kết thúc thử thách.\nNếu bạn hoàn thành thử thách như thế này, bạn sẽ §lmất hết tiến trình%{hardcore}%§r.",
    "id": "Anda akan mengakhiri tantangan.\nJika Anda menyelesaikannya dengan cara ini, Anda akan §emme n kehilangan semua kemajuan Anda%{hardcore}%§r.",
    "ms": "Anda hendak menamatkan cabaran.\nJika anda menamatkannya dengan cara ini, anda akan §lkehilangan semua kemajuan anda%{hardcore}%§r.",
    "zh": "您即将结束挑战。\n如果以这种方式完成挑战，您将§l失去所有进度%{hardcore}%§r。",
    "ja": "チャレンジを終了しようとしています。\nこの方法でチャレンジを完了すると、§l全ての進行状況を失います%{hardcore}%§r。",
    "ko": "도전을 종료하려고 합니다.\n이렇게 완료하면 §l모든 진행 상황을 잃게 됩니다%{hardcore}%§r.",
    "mi": "Ke tuari koe i te wero.\nMēnā ka oti pē tēnei, §lka ngaro katoa ōu ahunga whakamua%{hardcore}%§r.",
    "to": "Oku ke fie ‘osi ha feinga.\nKapau ‘e ‘osi pe ho ‘oku feinga ha taha pē, ‘e §lhoha lahi ho‘o ngāue ki ai%{hardcore}%§r.",
    "gil": "You are about to end a challenge.\nIf you complete the challenge this way, you will §llose all your progress%{hardcore}%§r.",
    "ty": "Ua ore outou i te faaaroaraa i te aravihi.\nMai te mea e rave outou i te aravihi ei fa‘ahiti, e §lita‘o‘u atoa i to outou haere faanahoraa%{hardcore}%§r."
  },

  "menu.popup.give_up.description.hardcore": {
    "en": "and this World",
    "de": "und diese Welt",
    "fr": "et ce monde",
    "it": "e questo mondo",
    "es": "y este mundo",
    "pt": "e este mundo",
    "is": "og þennan heim",
    "el": "και αυτόν τον κόσμο",
    "ar": "وهذا العالم",
    "fi": "ja tämän maailman",
    "sv": "och denna värld",
    "ru": "и этот мир",
    "tr": "ve bu dünya",
    "fa": "و این جهان",
    "ps": "او دا نړۍ",
    "ur": "اور یہ دنیا",
    "hi": "और इस दुनिया",
    "si": "හා මේ ලෝකය",
    "ta": "மற்றும் இந்த உலகம்",
    "ne": "र यो संसार",
    "bn": "এবং এই পৃথিবি",
    "th": "และโลกนี้",
    "vi": "và thế giới này",
    "id": "dan dunia ini",
    "ms": "dan dunia ini",
    "zh": "以及此世界",
    "ja": "そしてこの世界も",
    "ko": "그리고 이 세계도",
    "mi": "me tēnei ao",
    "to": "mo e lalolagi ko ‘eni",
    "gil": "and this World",
    "ty": "e te ao nei"
  },


  /*------------------------
    Menu - Settings
  -------------------------*/

  "menu.settings.title": {
    "en": "Settings",
    "de": "Einstellungen",
    "fr": "Paramètres",
    "it": "Impostazioni",
    "es": "Ajustes",
    "pt": "Configurações",
    "is": "Stillingar",
    "el": "Ρυθμίσεις",
    "ar": "الإعدادات",
    "fi": "Asetukset",
    "sv": "Inställningar",
    "ru": "Настройки",
    "tr": "Ayarlar",
    "fa": "تنظیمات",
    "ps": "امستنې",
    "ur": "ترتیبات",
    "hi": "सेटिंग्स",
    "si": "සැකසුම්",
    "ta": "அமைப்புகள்",
    "ne": "सेटिङहरू",
    "bn": "সেটিংস",
    "th": "การตั้งค่า",
    "vi": "Cài đặt",
    "id": "Pengaturan",
    "ms": "Tetapan",
    "zh": "设置",
    "ja": "設定",
    "ko": "설정",
    "mi": "Tautuhinga",
    "to": "Fa‘ahinohino",
    "gil": "Settings",
    "ty": "Fa‘apapū"
  },

  "menu.settings.type": {
    "en": "Switch mode",
    "de": "Modus wechseln",
    "fr": "Changer de mode",
    "it": "Cambia modalità",
    "es": "Cambiar modo",
    "pt": "Mudar modo",
    "is": "Skipta um hátt",
    "el": "Αλλαγή λειτουργίας",
    "ar": "تغيير الوضع",
    "fi": "Vaihda tila",
    "sv": "Byt läge",
    "ru": "Сменить режим",
    "tr": "Modu değiştir",
    "fa": "تغییر حالت",
    "ps": "Mode بدلول",
    "ur": "موڈ تبدیل کریں",
    "hi": "मोड बदलें",
    "si": "තාත්වික විට මාරු කරන්න",
    "ta": "முறை மாற்று",
    "ne": "मोड परिवर्तन गर्नुहोस्",
    "bn": "মোড পরিবর্তন",
    "th": "สลับโหมด",
    "vi": "Chuyển chế độ",
    "id": "Ganti mode",
    "ms": "Tukar mod",
    "zh": "切换模式",
    "ja": "モード切替",
    "ko": "모드 전환",
    "mi": "Whakawhiti aratau",
    "to": "Liliu mode",
    "gil": "Switch mode",
    "ty": "Faahuri mode"
  },

  "menu.settings.fullbright": {
    "en": "Fullbright",
    "de": "Nachtsicht",
    "fr": "Vision nocturne",
    "it": "Vista notturna",
    "es": "Visión nocturna",
    "pt": "Visão noturna",
    "is": "Nætursýn",
    "el": "Νυχτερινή όραση",
    "ar": "رؤية ليلية",
    "fi": "Yötila",
    "sv": "Nattseende",
    "ru": "Ночное зрение",
    "tr": "Gece görüşü",
    "fa": "دید در شب",
    "ps": "د شپې لید",
    "ur": "نائٹ وژن",
    "hi": "पूर्ण प्रकाश",
    "si": "සමූහ නිරීක්ෂණය",
    "ta": "முழு ஒளிர்வு",
    "ne": "पूर्ण उज्यालो",
    "bn": "রাতের দৃশ্য",
    "th": "การมองกลางคืน",
    "vi": "Chế độ sáng trọn vẹn",
    "id": "Visi malam",
    "ms": "Penglihatan malam",
    "zh": "夜视",
    "ja": "ナイトビジョン",
    "ko": "야간 투시",
    "mi": "Tiro pō",
    "to": "Maama pō",
    "gil": "Fullbright",
    "ty": "Mana‘o pōpō"
  },

  "menu.settings.experimental_features": {
    "en": "Experimental features",
    "de": "Experimentelle Funktionen",
    "fr": "Fonctionnalités expérimentales",
    "it": "Funzionalità sperimentali",
    "es": "Funciones experimentales",
    "pt": "Recursos experimentais",
    "is": "Tilraunareiginleikar",
    "el": "Πειραματικές λειτουργίες",
    "ar": "الميزات التجريبية",
    "fi": "Kokeelliset ominaisuudet",
    "sv": "Experimentella funktioner",
    "ru": "Экспериментальные функции",
    "tr": "Deneysel özellikler",
    "fa": "ویژگی‌های آزمایشی",
    "ps": "تجربوي ځانګړتیاوې",
    "ur": "تجرباتی خصوصیات",
    "hi": "प्रयोगात्मक सुविधाएँ",
    "si": "ප්‍රයෝගික ලක්ෂණ",
    "ta": "சோதனை அம்சங்கள்",
    "ne": "प्रयोगात्मक सुविधाहरू",
    "bn": "প্রায়োগিক বৈশিষ্ট্য",
    "th": "คุณสมบัติทดลอง",
    "vi": "Tính năng thử nghiệm",
    "id": "Fitur eksperimental",
    "ms": "Ciri eksperimen",
    "zh": "实验功能",
    "ja": "実験的機能",
    "ko": "실험적 기능",
    "mi": "Āhuatanga whakamātautau",
    "to": "Ngā me‘a talanoa",
    "gil": "Experimental features",
    "ty": "Mau faatupu faanahoraa"
  },

  "menu.settings.update": {
    "en": "Update",
    "de": "Aktualisieren",
    "fr": "Mettre à jour",
    "it": "Aggiorna",
    "es": "Actualizar",
    "pt": "Atualizar",
    "is": "Uppfæra",
    "el": "Ενημέρωση",
    "ar": "تحديث",
    "fi": "Päivitä",
    "sv": "Uppdatera",
    "ru": "Обновить",
    "tr": "Güncelle",
    "fa": "به‌روزرسانی",
    "ps": "نوی کول",
    "ur": "اپ ڈیٹ",
    "hi": "अपडेट",
    "si": "යාවත්කාලීන කරන්න",
    "ta": "புதுப்பி",
    "ne": "अद्यावधिक",
    "bn": "আপডেট",
    "th": "อัปเดต",
    "vi": "Cập nhật",
    "id": "Perbarui",
    "ms": "Kemas kini",
    "zh": "更新",
    "ja": "更新",
    "ko": "업데이트",
    "mi": "Whakahou",
    "to": "Faafou",
    "gil": "Update",
    "ty": "Faufaa"
  },

  "menu.settings.disable_setup": {
    "en": "Disable setup",
    "de": "Einrichtung deaktivieren",
    "fr": "Désactiver l’installation",
    "it": "Disabilita configurazione",
    "es": "Desactivar configuración",
    "pt": "Desativar configuração",
    "is": "Slökkva á uppsetningu",
    "el": "Απενεργοποίηση ρύθμισης",
    "ar": "تعطيل الإعداد",
    "fi": "Poista asennus käytöstä",
    "sv": "Inaktivera uppsättning",
    "ru": "Отключить настройку",
    "tr": "Kurulumu devre dışı bırak",
    "fa": "غیرفعال کردن راه‌اندازی",
    "ps": "تنظیمات غیرفعال کړئ",
    "ur": "سیٹ اپ غیر فعال کریں",
    "hi": "सेटअप अक्षम करें",
    "si": "සැකසීම් අක්‍රිය කරන්න",
    "ta": "அமைப்பை முடக்கு",
    "ne": "सेटअप अक्षम गर्नुहोस्",
    "bn": "সেটআপ নিষ্ক্রিয় করুন",
    "th": "ปิดใช้งานการตั้งค่า",
    "vi": "Tắt thiết lập",
    "id": "Nonaktifkan pengaturan",
    "ms": "Matikan setup",
    "zh": "禁用设置",
    "ja": "セットアップ無効化",
    "ko": "설정 비활성화",
    "mi": "Mono i te tautuhi",
    "to": "Taofi ngaahi founga",
    "gil": "Disable setup",
    "ty": "Faʻahohoʻi faahihia"
  },

  "menu.settings.about": {
    "en": "About",
    "de": "Über diese Version",
    "fr": "À propos",
    "it": "Informazioni",
    "es": "Acerca de",
    "pt": "Sobre",
    "is": "Um",
    "el": "Σχετικά",
    "ar": "حول",
    "fi": "Tietoja",
    "sv": "Om",
    "ru": "О программе",
    "tr": "Hakkında",
    "fa": "درباره",
    "ps": "په اړه",
    "ur": "کے بارے میں",
    "hi": "के बारे में",
    "si": "වශයෙන්",
    "ta": "பற்றி",
    "ne": "बारेमा",
    "bn": "সম্পর্কে",
    "th": "เกี่ยวกับ",
    "vi": "Giới thiệu",
    "id": "Tentang",
    "ms": "Mengenai",
    "zh": "关于",
    "ja": "概要",
    "ko": "정보",
    "mi": "Mō",
    "to": "Mō ma'u",
    "gil": "About",
    "ty": "E pāpū"
  },


  /*------------------------
    Menu - Permissions
  -------------------------*/

  "menu.settings.permissions.title": {
    "en": "Permissions",
    "de": "Berechtigungen",
    "fr": "Autorisations",
    "it": "Autorizzazioni",
    "es": "Permisos",
    "pt": "Permissões",
    "is": "Leyfi",
    "el": "Δικαιώματα",
    "ar": "الأذونات",
    "fi": "Oikeudet",
    "sv": "Behörigheter",
    "ru": "Права",
    "tr": "İzinler",
    "fa": "مجوزها",
    "ps": "اجازې",
    "ur": "اجازتیں",
    "hi": "अनुमतियाँ",
    "si": "අවසර",
    "ta": "அனுமதிகள்",
    "ne": "अनुमतिहरू",
    "bn": "অনুমতি",
    "th": "สิทธิ์",
    "vi": "Quyền",
    "id": "Izin",
    "ms": "Kebenaran",
    "zh": "权限",
    "ja": "権限",
    "ko": "권한",
    "mi": "Mana",
    "to": "Lēsoni",
    "gil": "Permissions",
    "ty": "Tauturu"
  },

  "menu.settings.permissions.title.player": {
    "en": "Edit %{name}%'s permission",
    "de": "Berechtigungen von %{name}% bearbeiten",
    "fr": "Modifier les autorisations de %{name}%",
    "it": "Modifica le autorizzazioni di %{name}%",
    "es": "Editar permisos de %{name}%",
    "pt": "Editar permissões de %{name}%",
    "is": "Breyta leyfum %{name}%",
    "el": "Επεξεργασία δικαιωμάτων %{name}%",
    "ar": "تعديل أذونات %{name}%",
    "fi": "Muokkaa %{name}% oikeuksia",
    "sv": "Redigera behörigheter för %{name}%",
    "ru": "Изменить права %{name}%",
    "tr": "%{name}% izinlerini düzenle",
    "fa": "ویرایش مجوزهای %{name}%",
    "ps": "د %{name}% اجازه‌وې سمول",
    "ur": "ترمیم کریں %{name}% کی اجازتیں",
    "hi": "अधिकार संपादित करें %{name}%",
    "si": "%{name}%ගේ අවසර සංස්කරණය කරන්න",
    "ta": "%{name}% の権限を編集",
    "ne": "सम्पादन अनुमति %{name}%",
    "bn": "সম্পাদনা অনুমতি %{name}%",
    "th": "แก้ไขสิทธิ์ %{name}%",
    "vi": "Chỉnh quyền của %{name}%",
    "id": "Edit izin %{name}%",
    "ms": "Edit kebenaran %{name}%",
    "zh": "编辑 %{name}% 的权限",
    "ja": "%{name}% の権限を編集",
    "ko": "%{name}% 권한 편집",
    "mi": "Whakatika mana %{name}%",
    "to": "Liliu lēsoni %{name}%",
    "gil": "Edit %{name}%'s permission",
    "ty": "Fa‘aitoito i te mana %{name}%"
  },

  "menu.settings.permissions.title.you": {
    "en": "Edit your permission",
    "de": "Deine Berechtigungen bearbeiten",
    "fr": "Modifier vos autorisations",
    "it": "Modifica le tue autorizzazioni",
    "es": "Editar tus permisos",
    "pt": "Editar suas permissões",
    "is": "Breyta þínum leyfum",
    "el": "Επεξεργασία των δικαιωμάτων σας",
    "ar": "تعديل أذوناتك",
    "fi": "Muokkaa omia oikeuksiasi",
    "sv": "Redigera dina behörigheter",
    "ru": "Изменить ваши права",
    "tr": "İzinlerinizi düzenle",
    "fa": "ویرایش مجوزهای شما",
    "ps": "ستاسو اجازه‌وې سمول",
    "ur": "اپنی اجازتیں ترمیم کریں",
    "hi": "अपने अनुमतियाँ संपादित करें",
    "si": "ඔබගේ අවසර සංස්කරණය කරන්න",
    "ta": "உங்கள் அனுமதிகளைத் திருத்தவும்",
    "ne": "आफ्नो अनुमति सम्पादन गर्नुहोस्",
    "bn": "আপনার অনুমতি সম্পাদনা করুন",
    "th": "แก้ไขสิทธิ์ของคุณ",
    "vi": "Chỉnh quyền của bạn",
    "id": "Edit izin Anda",
    "ms": "Edit kebenaran anda",
    "zh": "编辑您的权限",
    "ja": "自分の権限を編集",
    "ko": "자신의 권한 편집",
    "mi": "Whakatika āu mana",
    "to": "Liliu ho‘o lēsoni",
    "gil": "Edit your permission",
    "ty": "Fa‘aitoito i to outou mana"
  },

  "menu.settings.permissions.description": {
    "en": "Select a player!",
    "de": "Wähle einen Spieler aus!",
    "fr": "Sélectionnez un joueur!",
    "it": "Seleziona un giocatore!",
    "es": "¡Selecciona un jugador!",
    "pt": "Selecione um jogador!",
    "is": "Veldu leikmann!",
    "el": "Επιλέξτε έναν παίκτη!",
    "ar": "اختر لاعبًا!",
    "fi": "Valitse pelaaja!",
    "sv": "Välj en spelare!",
    "ru": "Выберите игрока!",
    "tr": "Bir oyuncu seçin!",
    "fa": "یک بازیکن را انتخاب کنید!",
    "ps": "یو لوبغاړی وټاکئ!",
    "ur": "ایک کھلاڑی منتخب کریں!",
    "hi": "एक खिलाड़ी चुनें!",
    "si": "ක්‍රීඩකයෙක් තෝරන්න!",
    "ta": "ஒரு வீரரை தேர்ந்தெடுக்கவும்!",
    "ne": "खेलाडी चुन्नुहोस्!",
    "bn": "একজন খেলোয়াড় নির্বাচন করুন!",
    "th": "เลือกผู้เล่น!",
    "vi": "Chọn người chơi!",
    "id": "Pilih pemain!",
    "ms": "Pilih pemain!",
    "zh": "选择一名玩家！",
    "ja": "プレイヤーを選択してください！",
    "ko": "플레이어를 선택하세요!",
    "mi": "Tīpakohia te kaitākaro!",
    "to": "Fili ha ta‘etotolo!",
    "gil": "Select a player!",
    "ty": "Fili i te taata tākaro!"
  },

  "menu.settings.permissions.online": {
    "en": "Online",
    "de": "Online",
    "fr": "En ligne",
    "it": "Online",
    "es": "En línea",
    "pt": "Online",
    "is": "Á netinu",
    "el": "Σε σύνδεση",
    "ar": "متصل",
    "fi": "Verkossa",
    "sv": "Online",
    "ru": "В сети",
    "tr": "Çevrimiçi",
    "fa": "آنلاین",
    "ps": "آنلاین",
    "ur": "آن لائن",
    "hi": "ऑनलाइन",
    "si": " ඔන්ලೈನ್",
    "ta": "ஆன்லைன்",
    "ne": "अनलाइन",
    "bn": "অনলাইন",
    "th": "ออนไลน์",
    "vi": "Trực tuyến",
    "id": "Daring",
    "ms": "Atas talian",
    "zh": "在线",
    "ja": "オンライン",
    "ko": "온라인",
    "mi": "Ipurangi",
    "to": "I luga ‘i he initaneti",
    "gil": "Online",
    "ty": "I taiʻaroa"
  },

  "menu.settings.permissions.offline": {
    "en": "last seen %{time}% ago",
    "de": "Zuletzt online vor %{time}%",
    "fr": "Vu il y a %{time}%",
    "it": "Ultimo accesso %{time}% fa",
    "es": "Visto por última vez hace %{time}%",
    "pt": "Visto pela última vez há %{time}%",
    "is": "Síðast séð fyrir %{time}%",
    "el": "Τελευταία είσοδος πριν από %{time}%",
    "ar": "آخر ظهور منذ %{time}%",
    "fi": "Viimeksi nähty %{time}% sitten",
    "sv": "Senast online för %{time}% sedan",
    "ru": "В сети был %{time}% назад",
    "tr": "Son görülme %{time}% önce",
    "fa": "آخرین بازدید %{time}% پیش",
    "ps": "وروستی ځل لیدل شوی %{time}% مخکې",
    "ur": "آخری بار دیکھا گیا %{time}% پہلے",
    "hi": "अंतिम बार देखा गया %{time}% पहले",
    "si": "අලුතින් දැක්කා %{time}%කට පෙර",
    "ta": "கடைசியாக கண்டது %{time}% முன்",
    "ne": "अन्तिम पटक देखियो %{time}% अघि",
    "bn": "সর্বশেষ দেখা %{time}% আগে",
    "th": "เห็นครั้งสุดท้ายเมื่อ %{time}% ที่แล้ว",
    "vi": "Lần cuối nhìn thấy cách đây %{time}%",
    "id": "Terakhir terlihat %{time}% lalu",
    "ms": "Terakhir dilihat %{time}% lalu",
    "zh": "最后在线于 %{time}% 前",
    "ja": "最後のオンライン: %{time}% 前",
    "ko": "마지막 접속: %{time}% 전",
    "mi": "I kitea whakamutunga i mua %{time}%",
    "to": "Na‘e sio fakataha 'i he '%{time}%' \n",
    "gil": "last seen %{time}% ago",
    "ty": "Taime hopea kitea %{time}% i luma"
  },

  "menu.settings.permissions.lable.name": {
    "en": "Name: %{name}% (%{id}%)",
    "de": "Name: %{name}% (%{id}%)",
    "fr": "Nom: %{name}% (%{id}%)",
    "it": "Nome: %{name}% (%{id}%)",
    "es": "Nombre: %{name}% (%{id}%)",
    "pt": "Nome: %{name}% (%{id}%)",
    "is": "Nafn: %{name}% (%{id}%)",
    "el": "Όνομα: %{name}% (%{id}%)",
    "ar": "الاسم: %{name}% (%{id}%)",
    "fi": "Nimi: %{name}% (%{id}%)",
    "sv": "Namn: %{name}% (%{id}%)",
    "ru": "Имя: %{name}% (%{id}%)",
    "tr": "İsim: %{name}% (%{id}%)",
    "fa": "نام: %{name}% (%{id}%)",
    "ps": "نوم: %{name}% (%{id}%)",
    "ur": "نام: %{name}% (%{id}%)",
    "hi": "नाम: %{name}% (%{id}%)",
    "si": "නම: %{name}% (%{id}%)",
    "ta": "பெயர்: %{name}% (%{id}%)",
    "ne": "नाम: %{name}% (%{id}%)",
    "bn": "নাম: %{name}% (%{id}%)",
    "th": "ชื่อ: %{name}% (%{id}%)",
    "vi": "Tên: %{name}% (%{id}%)",
    "id": "Nama: %{name}% (%{id}%)",
    "ms": "Nama: %{name}% (%{id}%)",
    "zh": "名称: %{name}% (%{id}%)",
    "ja": "名前: %{name}% (%{id}%)",
    "ko": "이름: %{name}% (%{id}%)",
    "mi": "Ingoa: %{name}% (%{id}%)",
    "to": "Hingoa: %{name}% (%{id}%)",
    "gil": "Name: %{name}% (%{id}%)",
    "ty": "I‘oa: %{name}% (%{id}%)"
  },

  "menu.settings.permissions.lable.actionbar": {
    "en": "Live actionbar: %{actionbar}%",
    "de": "Live-Actionbar: %{actionbar}%",
    "fr": "Barre d’action en direct: %{actionbar}%",
    "it": "Actionbar live: %{actionbar}%",
    "es": "Barra de acción en vivo: %{actionbar}%",
    "pt": "Barra de ação ao vivo: %{actionbar}%",
    "is": "Lifandi aðgerðastika: %{actionbar}%",
    "el": "Ζώνη ενέργειας σε πραγματικό χρόνο: %{actionbar}%",
    "ar": "شريط الإجراءات المباشر: %{actionbar}%",
    "fi": "Suora toimintopalkki: %{actionbar}%",
    "sv": "Direkt actionbar: %{actionbar}%",
    "ru": "Живая панель действий: %{actionbar}%",
    "tr": "Canlı eylem çubuğu: %{actionbar}%",
    "fa": "اکشن‌بار زنده: %{actionbar}%",
    "ps": "ژوندۍ کړنې بار: %{actionbar}%",
    "ur": "لائیو ایکشن بار: %{actionbar}%",
    "hi": "लाइव एक्शनबार: %{actionbar}%",
    "si": "Live ක්‍රියා තීරුව: %{actionbar}%",
    "ta": "லைவ் செயல் பட்டை: %{actionbar}%",
    "ne": "प्रत्यक्ष actionbar: %{actionbar}%",
    "bn": "লাইভ অ্যাকশনবার: %{actionbar}%",
    "th": "แถบแอ็คชันสด: %{actionbar}%",
    "vi": "Thanh hành động trực tiếp: %{actionbar}%",
    "id": "Bar tindakan langsung: %{actionbar}%",
    "ms": "Bar tindakan langsung: %{actionbar}%",
    "zh": "实时操作栏: %{actionbar}%",
    "ja": "ライブアクションバー: %{actionbar}%",
    "ko": "실시간 액션바: %{actionbar}%",
    "mi": "Paepae mahi ora: %{actionbar}%",
    "to": "Paipa gao live: %{actionbar}%",
    "gil": "Live actionbar: %{actionbar}%",
    "ty": "Bar action ora: %{actionbar}%"
  },

  "menu.settings.permissions.cm": {
    "en": "Note: This save data cannot be managed because it is needed by the system due to the Challenge Mode.",
    "de": "Hinweis: Diese Speicherdaten können nicht verwaltet werden, da sie vom System im Challenge-Modus benötigt werden.",
    "fr": "Remarque: ces données de sauvegarde ne peuvent pas être gérées car elles sont nécessaires au système en mode défi.",
    "it": "Nota: questi dati di salvataggio non possono essere gestiti perché necessari al sistema in modalità sfida.",
    "es": "Nota: estos datos guardados no se pueden gestionar porque los necesita el sistema en modo desafío.",
    "pt": "Nota: estes dados salvos não podem ser gerenciados pois são necessários pelo sistema no modo desafio.",
    "is": "Athugasemd: Þessi vistunargögn er ekki hægt að stjórna þar sem kerfið þarfnast þeirra í áskorunarham.",
    "el": "Σημείωση: αυτά τα δεδομένα αποθήκευσης δεν μπορούν να διαχειριστούν επειδή χρειάζονται από το σύστημα σε λειτουργία πρόκλησης.",
    "ar": "ملاحظة: لا يمكن إدارة بيانات الحفظ هذه لأنها مطلوبة من النظام في وضع التحدي.",
    "fi": "Huom: Näitä tallennustietoja ei voi hallita, koska järjestelmä tarvitsee niitä haaste-tilassa.",
    "sv": "Obs: dessa sparade data kan inte hanteras eftersom systemet behöver dem i utmaningsläge.",
    "ru": "Примечание: эти сохранённые данные нельзя изменять, так как система использует их в режиме испытаний.",
    "tr": "Not: Bu kayıt verisi, sistemin meydan okuma modunda ihtiyaç duyduğu için yönetilemez.",
    "fa": "توجه: این داده‌های ذخیره‌سازی قابل مدیریت نیستند زیرا سیستم در حالت چالش به آن‌ها نیاز دارد.",
    "ps": "یادونه: دا خوندي شوي ډاټا نه شي اداره کیدی ځکه چې سیسټم د ننګونې حالت لپاره ورته اړتیا لري.",
    "ur": "نوٹ: یہ محفوظ شدہ ڈیٹا منظم نہیں کیا جا سکتا کیونکہ سسٹم کو چیلنج موڈ کے لئے اس کی ضرورت ہے۔",
    "hi": "ध्यान दें: इस सहेजे गए डेटा को प्रबंधित नहीं किया जा सकता क्योंकि सिस्टम को चैलेंज मोड के लिए इसकी आवश्यकता है।",
    "si": "සටහන: සුරක්ෂිත දත්ත මෙහෙයවිය නොහැක, එය චැලේන්ජ් මාදිලිය සඳහා පද්ධතියට අවශ්‍ය බැවින්.",
    "ta": "குறிப்பு: இந்த சேமிப்பு தரவை நிர்வகிக்க முடியாது, ஏனெனில் சவால் முறைக்கு இது தேவையாகும்.",
    "ne": "नोट: यो सेभ डेटा व्यवस्थापन गर्न सकिँदैन किनकि यो प्रणालीलाई च्यालेन्ज मोडका लागि आवश्यक छ।",
    "bn": "দ্রষ্টব্য: এই সেভড ডেটা পরিচালনা করা যাবে না কারণ সিস্টেমকে চ্যালেঞ্জ মোডের জন্য এর প্রয়োজন।",
    "th": "หมายเหตุ: ไม่สามารถจัดการข้อมูลบันทึกนี้ได้เนื่องจากจำเป็นต่อระบบในโหมดความท้าทาย",
    "vi": "Lưu ý: Dữ liệu lưu này không thể quản lý vì hệ thống cần nó ở chế độ thử thách.",
    "id": "Catatan: Data simpan ini tidak dapat dikelola karena diperlukan oleh sistem dalam mode tantangan.",
    "ms": "Nota: Data simpanan ini tidak boleh diurus kerana diperlukan oleh sistem dalam mod cabaran.",
    "zh": "注意：此存档数据无法管理，因为系统在挑战模式下需要它。",
    "ja": "注：このセーブデータはチャレンジモードでシステムに必要なため、管理できません。",
    "ko": "참고: 이 저장 데이터는 챌린지 모드에서 시스템이 필요로 하므로 관리할 수 없습니다。",
    "mi": "Tuhipoka: Kāore e taea te whakahaere i ēnei raraunga penapena nā te mea e hiahiatia ana e te pūnaha mō te aratau wero.",
    "to": "Fakamolemole: ʻOku ʻikai ke lava ke fakahoko tokoni ki he tala fakahokohoko ko ʻeni he ʻoku fiemaʻu ʻehe system ʻi he mode feinga.",
    "gil": "Note: This save data cannot be managed because it is needed by the system due to the Challenge Mode.",
    "ty": "Faaaravihi: Eita e nehenehe e taata e faufaa i teie mau raraunga na roto i te mea e titauhia ei parauraa no te arata‘i faatere."
  },

  "menu.settings.permissions.manage_sd": {
    "en": "Manage save data",
    "de": "Speicherdaten verwalten",
    "fr": "Gérer les données de sauvegarde",
    "it": "Gestisci dati di salvataggio",
    "es": "Administrar datos guardados",
    "pt": "Gerenciar dados salvos",
    "is": "Stjórna vistunargögnum",
    "el": "Διαχείριση δεδομένων αποθήκευσης",
    "ar": "إدارة بيانات الحفظ",
    "fi": "Hallitse tallennustietoja",
    "sv": "Hantera sparade data",
    "ru": "Управление данными сохранения",
    "tr": "Kayıt verilerini yönet",
    "fa": "مدیریت داده‌های ذخیره",
    "ps": "د خوندي کولو ډاټا اداره کول",
    "ur": "محفوظ شدہ ڈیٹا کا انتظام",
    "hi": "सेव डेटा प्रबंधित करें",
    "si": "සුරක්ෂිත දත්ත කළමනාකරණය කරන්න",
    "ta": "சேவ் தரவை நிர்வகிக்கவும்",
    "ne": "सेभ डेटा व्यवस्थापन गर्नुहोस्",
    "bn": "সেভ ডেটা পরিচালনা করুন",
    "th": "จัดการข้อมูลบันทึก",
    "vi": "Quản lý dữ liệu lưu",
    "id": "Kelola data simpan",
    "ms": "Urus data simpanan",
    "zh": "管理存档数据",
    "ja": "セーブデータを管理",
    "ko": "저장 데이터 관리",
    "mi": "Whakahaere raraunga penapena",
    "to": "Fakaleleʻo e tala",
    "gil": "Manage save data",
    "ty": "Fa‘atere i te mau raraunga penapena"
  },

  "menu.settings.permissions.reset_sd": {
    "en": "Reset save data",
    "de": "Speicherdaten zurücksetzen",
    "fr": "Réinitialiser les données de sauvegarde",
    "it": "Reimposta dati di salvataggio",
    "es": "Restablecer datos guardados",
    "pt": "Redefinir dados salvos",
    "is": "Endurstilla vistunargögn",
    "el": "Επαναφορά δεδομένων αποθήκευσης",
    "ar": "إعادة تعيين بيانات الحفظ",
    "fi": "Palauta tallennustiedot",
    "sv": "Återställ sparade data",
    "ru": "Сброс данных сохранения",
    "tr": "Kayıt verilerini sıfırla",
    "fa": "بازنشانی داده‌های ذخیره",
    "ps": "د خوندي کولو ډاټا ریسیټ",
    "ur": "محفوظ شدہ ڈیٹا ری سیٹ کریں",
    "hi": "सेव डेटा रीसेट करें",
    "si": "සුරක්ෂිත දත්ත නැවත සකසන්න",
    "ta": "சேவ் தரவை மீட்டமை",
    "ne": "सेभ डेटा रिसेट गर्नुहोस्",
    "bn": "সেভ ডেটা রিসেট করুন",
    "th": "รีเซ็ตข้อมูลบันทึก",
    "vi": "Đặt lại dữ liệu lưu",
    "id": "Reset data simpan",
    "ms": "Reset data simpanan",
    "zh": "重置存档数据",
    "ja": "セーブデータをリセット",
    "ko": "저장 데이터 재설정",
    "mi": "Whakahou raraunga penapena",
    "to": "Fakafoki e tala",
    "gil": "Reset save data",
    "ty": "Fa‘ata‘atia i te mau raraunga penapena"
  },

  "menu.settings.permissions.delete_sd": {
    "en": "Delete save data",
    "de": "Speicherdaten löschen",
    "fr": "Supprimer les données de sauvegarde",
    "it": "Elimina dati di salvataggio",
    "es": "Eliminar datos guardados",
    "pt": "Excluir dados salvos",
    "is": "Eyða vistunargögnum",
    "el": "Διαγραφή δεδομένων αποθήκευσης",
    "ar": "حذف بيانات الحفظ",
    "fi": "Poista tallennustiedot",
    "sv": "Radera sparade data",
    "ru": "Удалить данные сохранения",
    "tr": "Kayıt verilerini sil",
    "fa": "حذف داده‌های ذخیره",
    "ps": "د خوندي کولو ډاټا حذف",
    "ur": "محفوظ شدہ ڈیٹا حذف کریں",
    "hi": "सेव डेटा हटाएँ",
    "si": "සුරක්ෂිත දත්ත මකන්න",
    "ta": "சேவ் தரவை நீக்கு",
    "ne": "सेभ डेटा मेटाउनुहोस्",
    "bn": "সেভ ডেটা মুছুন",
    "th": "ลบข้อมูลบันทึก",
    "vi": "Xóa dữ liệu lưu",
    "id": "Hapus data simpan",
    "ms": "Padam data simpanan",
    "zh": "删除存档数据",
    "ja": "セーブデータを削除",
    "ko": "저장 데이터 삭제",
    "mi": "Muku raraunga penapena",
    "to": "Faka‘iloa‘i e tala",
    "gil": "Delete save data",
    "ty": "Mata‘u i te mau raraunga penapena"
  },

  "menu.settings.permissions.shared_timer.description": {
    "en": "%{name}% is currently sharing their timer. You must §cstop§f it%{replace_text}% before you can change their permission.\n\n§7Required for challenge mode.\n\n",
    "de": "%{name}% teilt derzeit seinen Timer. Du musst ihn §cstoppen§f%{replace_text}%, bevor du die Berechtigungen ändern kannst.\n\n§7Erforderlich für den Challenge-Modus.\n\n",
    "fr": "%{name}% partage actuellement son minuteur. Vous devez §carrêter§f celui-ci%{replace_text}% avant de pouvoir modifier ses autorisations.\n\n§7Requis pour le mode défi.\n\n",
    "it": "%{name}% sta condividendo il proprio timer. Devi §cinterromperlo§f%{replace_text}% prima di poter modificare i suoi permessi.\n\n§7Richiesto per la modalità sfida.\n\n",
    "es": "%{name}% está compartiendo su temporizador. Debes §cdetenerlo§f%{replace_text}% antes de poder cambiar sus permisos.\n\n§7Requerido para el modo desafío.\n\n",
    "pt": "%{name}% está compartilhando seu temporizador. Você deve §cpará-lo§f%{replace_text}% antes de poder alterar suas permissões.\n\n§7Necessário para o modo desafio.\n\n",
    "is": "%{name}% er að deila tímamæli. Þú verður að §chætta við§f%{replace_text}% áður en þú getur breytt leyfunum hans/hennar.\n\n§7Krafist fyrir áskorunarham.\n\n",
    "el": "Ο %{name}% μοιράζεται αυτήν τη στιγμή τον χρονοδιακόπτη του. Πρέπει να §cσταματήσεις§f%{replace_text}% πριν μπορέσεις να αλλάξεις τα δικαιώματά του.\n\n§7Απαραίτητο για τη λειτουργία πρόκλησης.\n\n",
    "ar": "%{name}% يشارك مؤقته حاليًا. يجب عليك §cإيقافه§f%{replace_text}% قبل أن تتمكن من تغيير أذوناته.\n\n§7مطلوب لوضع التحدي.\n\n",
    "fi": "%{name}% jakaa ajastinta. Sinun on §cpysäytettävä§f%{replace_text}% ennen kuin voit muuttaa hänen oikeuksiaan.\n\n§7Vaaditaan haaste-tilassa.\n\n",
    "sv": "%{name}% delar sin timer just nu. Du måste §cstoppa§f den%{replace_text}% innan du kan ändra deras behörigheter.\n\n§7Krävs för utmaningsläge.\n\n",
    "ru": "%{name}% в данный момент делится своим таймером. Вы должны §cостановить§f его%{replace_text}% прежде чем изменить его права.\n\n§7Требуется для режима испытаний.\n\n",
    "tr": "%{name}% şu anda zamanlayıcısını paylaşıyor. İzinlerini değiştirmeden önce §cdurdurmalısın§f%{replace_text}%.\n\n§7Meydan okuma modu için gerekli.\n\n",
    "fa": "%{name}% در حال اشتراک‌گذاری تایمر خود است. قبل از تغییر مجوزهای او، باید §cآن را متوقف کنید§f%{replace_text}%.\n\n§7برای حالت چالش ضروری است.\n\n",
    "ps": "%{name}% اوس خپل ټایمر شریکوي. تاسو باید §cدا ودروئ§f%{replace_text}% مخکې له دې چې د هغه اجازې بدل کړئ.\n\n§7د ننګونې حالت لپاره اړین.\n\n",
    "ur": "%{name}% اس وقت اپنا ٹائمر شیئر کر رہا ہے۔ آپ کو اس کو §cروک§fنا ہوگا%{replace_text}% اس سے پہلے کہ آپ اس کی اجازتیں تبدیل کریں۔\n\n§7چیلنج موڈ کے لیے ضروری۔\n\n",
    "hi": "%{name}% वर्तमान में अपना टाइमर साझा कर रहा है। उनकी अनुमति बदलने से पहले आपको इसे §cरोकना होगा§f%{replace_text}%.\n\n§7चैलेंज मोड के लिए आवश्यक।\n\n",
    "si": "%{name}% මේ අවස්ථාවේ තම ටයිමරය බෙදා ගනී. ඔහුගේ අවසර වෙනස් කිරීමට පෙර ඔබට §cනවතා§f%{replace_text}% යුතුය.\n\n§7අභියෝග මාදිලිය සඳහා අවශ්‍යයි.\n\n",
    "ta": "%{name}% தற்போது தன் நேரக்கணியை பகிர்ந்து கொள்கிறார். அவரது அனுமதியை மாற்றுவதற்கு முன்னர் §cநிறுத்த§f%{replace_text}% வேண்டும்.\n\n§7சவால் முறைக்கு தேவையானது.\n\n",
    "ne": "%{name}% वर्तमानमा आफ्नो टाइमर सेयर गर्दैछ। उसको अनुमति परिवर्तन गर्नुअघि तपाईंले §cरोकिन्§f%{replace_text}% पर्छ।\n\n§7चुनौती मोडका लागि आवश्यक।\n\n",
    "bn": "%{name}% বর্তমানে তার টাইমার শেয়ার করছে। তার অনুমতি পরিবর্তন করার আগে আপনাকে §cএটি থামাতে হবে§f%{replace_text}%।\n\n§7চ্যালেঞ্জ মোডের জন্য প্রয়োজন।\n\n",
    "th": "%{name}% กำลังแชร์ตัวจับเวลา คุณต้อง §cหยุดมัน§f%{replace_text}% ก่อนที่คุณจะเปลี่ยนสิทธิ์ของเขา\n\n§7จำเป็นสำหรับโหมดความท้าทาย\n\n",
    "vi": "%{name}% hiện đang chia sẻ bộ hẹn giờ của họ. Bạn phải §cdừng§f nó%{replace_text}% trước khi có thể thay đổi quyền.\n\n§7Yêu cầu cho chế độ thử thách.\n\n",
    "id": "%{name}% sedang membagikan timernya. Anda harus §chentikan§f%{replace_text}% sebelum bisa mengubah izinnya.\n\n§7Diperlukan untuk mode tantangan.\n\n",
    "ms": "%{name}% sedang berkongsi pemasa mereka. Anda mesti §chentikan§f%{replace_text}% sebelum boleh menukar kebenaran mereka.\n\n§7Diperlukan untuk mod cabaran.\n\n",
    "zh": "%{name}% 当前正在共享他们的计时器。您必须先§c停止§f它%{replace_text}%，然后才能更改他们的权限。\n\n§7挑战模式所需。\n\n",
    "ja": "%{name}% は現在タイマーを共有しています。権限を変更する前に、§c停止§f%{replace_text}% してください。\n\n§7チャレンジモードに必要です。\n\n",
    "ko": "%{name}%님이 현재 타이머를 공유 중입니다. 권한을 변경하려면 먼저 §c중지§f%{replace_text}% 해야 합니다.\n\n§7도전 모드에 필요합니다.\n\n",
    "mi": "Ke tohatoha ana a %{name}% i tana pātea. Me §ctāpiri koe§f i tēnei%{replace_text}% i mua i tō whakarerekētanga i āna mana.\n\n§7Me hiahiatia mō te aratau wero.\n\n",
    "to": "Oku talanoa ‘e %{name}% hono taimi fakapapau. ‘E fiema‘u ke ke §ctapu§f ia%{replace_text}% ‘i he ‘aho ki he liliu hoʻo lēsoni.\n\n§7Tāpuaki ki he mode feinga.\n\n",
    "gil": "%{name}% is currently sharing their timer. You must §cstop§f it%{replace_text}% before you can change their permission.\n\n§7Required for challenge mode.\n\n",
    "ty": "E faatupu a %{name}% i tōna taime. Me §ctutū§f¹ tēnei%{replace_text}% i mua e faaite i to outou mana.\n\n§7E titauhia no te aravihi faatere.\n\n"
  },

  "menu.settings.permissions.shared_timer.replace_text": {
    "en": " or §ereplace§f it with your own time (%{own_time}%§r)",
    "de": " oder §eerersetzen§f durch deine eigene Zeit (%{own_time}%§r)",
    "fr": " ou §rremplacer§f par votre propre temps (%{own_time}%§r)",
    "it": " o §csostituirlo§f con il tuo tempo (%{own_time}%§r)",
    "es": " o §creemplazarlo§f con tu propio tiempo (%{own_time}%§r)",
    "pt": " ou §csubstituí‑lo§f com seu próprio tempo (%{own_time}%§r)",
    "is": " eða §chætta við§f með þínum tíma (%{own_time}%§r)",
    "el": " ή §cαντικαταστήστε§f με το δικό σας χρόνο (%{own_time}%§r)",
    "ar": " أو §cاستبداله§f بوقتك الخاص (%{own_time}%§r)",
    "fi": " tai §ckorvaa§f se omalla ajallasi (%{own_time}%§r)",
    "sv": " eller §cersätt§f den med din egen tid (%{own_time}%§r)",
    "ru": " или §czаменить§f его на своё время (%{own_time}%§r)",
    "tr": " veya §cdeğiştir§f kendi zamanınızla (%{own_time}%§r)",
    "fa": " یا §cجایگزین§f با زمان خود (%{own_time}%§r)",
    "ps": " یا §cبدیل§f يې د خپل وخت سره (%{own_time}%§r)",
    "ur": " یا §cنیا§f کریں اپنے وقت (%{own_time}%§r) کے ساتھ",
    "hi": " या §cबदलें§f इसे अपने समय से (%{own_time}%§r)",
    "si": " නැතහොත් §cපරිවර්තන§f කරන්න ඔබේ වෙලාවෙන් (%{own_time}%§r)",
    "ta": " அல்லது §cமாற்ற§f உங்கள் நேரத்துடன் (%{own_time}%§r)",
    "ne": " वा §cपरिवर्तित§f गर्नुहोस् आफ्नो समय (%{own_time}%§r) मा",
    "bn": " অথবা §cপ্রতিস্থাপন§f করুন আপনার নিজস্ব সময় (%{own_time}%§r) দিয়ে",
    "th": " หรือ §cแทนที่§f ด้วยเวลาของคุณ (%{own_time}%§r)",
    "vi": " hoặc §cthay thế§f bằng thời gian của bạn (%{own_time}%§r)",
    "id": " atau §cganti§f dengan waktu Anda sendiri (%{own_time}%§r)",
    "ms": " atau §cgantikan§f dengan masa anda sendiri (%{own_time}%§r)",
    "zh": " 或者 §c替换§f 为您自己的时间 (%{own_time}%§r)",
    "ja": " または §c置換§f して自分の時間 (%{own_time}%§r) に",
    "ko": " 또는 §c교체§f 하여 자신의 시간 (%{own_time}%§r) 으로",
    "mi": " te §whakahōu§f ki tō ake wā (%{own_time}%§r)",
    "to": " pe §cfoki§f ki ho‘o taimi (%{own_time}%§r)",
    "gil": " or §ereplace§f it with your own time (%{own_time}%§r)",
    "ty": " aore ra §cfai faa‘iru§f i tō outou taime (%{own_time}%§r)"
  },

  "menu.settings.permissions.online_player.kick.title": {
    "en": "Online player information",
    "de": "Informationen zum Online-Spieler",
    "fr": "Informations sur le joueur en ligne",
    "it": "Informazioni sul giocatore online",
    "es": "Información del jugador en línea",
    "pt": "Informações do jogador online",
    "is": "Upplýsingar um netspilara",
    "el": "Πληροφορίες για τον παίκτη σε σύνδεση",
    "ar": "معلومات اللاعب المتصل",
    "fi": "Tietoja verkossa olevasta pelaajasta",
    "sv": "Information om online-spelare",
    "ru": "Информация об игроке в сети",
    "tr": "Çevrimiçi oyuncu bilgileri",
    "fa": "اطلاعات بازیکن آنلاین",
    "ps": "د آنلاین لوبغاړي معلومات",
    "ur": "آن لائن کھلاڑی کی معلومات",
    "hi": "ऑनलाइन खिलाड़ी जानकारी",
    "si": "ඔන්ලයින් ක්‍රීඩක තොරතුරු",
    "ta": "ஆன்லைன் வீரர் தகவல்",
    "ne": "अनलाइन खेलाडी जानकारी",
    "bn": "অনলাইন খেলোয়াড় তথ্য",
    "th": "ข้อมูลผู้เล่นออนไลน์",
    "vi": "Thông tin người chơi trực tuyến",
    "id": "Informasi pemain daring",
    "ms": "Maklumat pemain dalam talian",
    "zh": "在线玩家信息",
    "ja": "オンラインプレイヤー情報",
    "ko": "온라인 플레이어 정보",
    "mi": "Ngā pārongo kaitākaro ipurangi",
    "to": "Founga faka‘ali‘ali ki he ta‘etotolo ‘i he initaneti",
    "gil": "Online player information",
    "ty": "Fa‘afaufaa i te taata tākaro i te initaneti"
  },

  "menu.settings.permissions.online_player.kick.description": {
    "en": "Are you sure you want to remove %{name}%'s save data?\nThey must disconnect from the world!",
    "de": "Bist du sicher, dass du die Speicherdaten von %{name}% löschen möchtest?\nDer Spieler muss das Spiel verlassen!",
    "fr": "Êtes-vous sûr de vouloir supprimer les données de %{name}%?\nIl doit se déconnecter du monde!",
    "it": "Sei sicuro di voler rimuovere i dati di %{name}%?\nDeve disconnettersi dal mondo!",
    "es": "¿Estás seguro de que deseas eliminar los datos de %{name}%?\n¡Debe desconectarse del mundo!",
    "pt": "Tem certeza de que deseja remover os dados de %{name}%?\nEle deve desconectar-se do mundo!",
    "is": "Ertu viss um að þú viljir eyða vistunargögnum %{name}%?\nHann/hún verður að aftengjast frá heiminum!",
    "el": "Είστε σίγουροι ότι θέλετε να διαγράψετε τα δεδομένα του %{name}%;\nΠρέπει να αποσυνδεθεί από τον κόσμο!",
    "ar": "هل أنت متأكد أنك تريد إزالة بيانات %{name}%؟\nيجب أن ينقطع عن العالم!",
    "fi": "Oletko varma, että haluat poistaa %{name}% tiedot?\nHänen on katkaistava yhteys maailmasta!",
    "sv": "Är du säker på att du vill ta bort %{name}% data?\nDe måste koppla från världen!",
    "ru": "Вы уверены, что хотите удалить данные %{name}%?\nОн должен отключиться от мира!",
    "tr": " %{name}% verilerini kaldırmak istediğinizden emin misiniz?\nBu, dünyadan bağlantısını kesmelidir!",
    "fa": "آیا مطمئن هستید که می‌خواهید داده‌های %{name}% را حذف کنید؟\nاو باید از دنیای بازی جدا شود!",
    "ps": "باور لرئ چې غواړئ د %{name}% ډاټا لرې کړئ؟\nهغه باید له نړۍ څخه جلا شي!",
    "ur": "کیا آپ واقعی %{name}% کا ڈیٹا حذف کرنا چاہتے ہیں؟\nاسے دنیا سے علیحدہ ہونا ہوگا!",
    "hi": "क्या आप वाकई %{name}% का डेटा हटाना चाहते हैं?\nउसे दुनिया से डिस्कनेक्ट होना होगा!",
    "si": "ඔබට විශ්වාසද %{name}%ගේ දත්ත මකන්න අවශ්‍යද?\nඔහු/ඇය ලෝකයෙන් වෙන් විය යුතුයි!",
    "ta": "நீங்கள் %{name}% のデータを削除してもよろしいですか？\n彼/彼女はワールドから切断する必要があります！",
    "ne": "के तपाईं पक्का हुनुहुन्छ कि %{name}% को डेटा हटाउन चाहनुहुन्छ?\nउनी संसारबाट विच्छेद हुनुपर्छ!",
    "bn": "আপনি কি নিশ্চিত %{name}% এর ডাটা মুছে ফেলতে চান?\nতাঁদের বিশ্বের সাথে সংযোগ বিচ্ছিন্ন করতে হবে!",
    "th": "คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูล %{name}%?\nเขาต้องออกจากโลก!",
    "vi": "Bạn có chắc muốn xóa dữ liệu của %{name}%?\nHọ phải ngắt kết nối khỏi thế giới!",
    "id": "Anda yakin ingin menghapus data %{name}%?\nMereka harus terputus dari dunia!",
    "ms": "Adakah anda pasti mahu memadam data %{name}%?\nMereka mesti terputus dari dunia!",
    "zh": "您确定要删除 %{name}% 的存档数据吗？\n他们必须断开与世界的连接！",
    "ja": "%{name}% のセーブデータを本当に削除しますか？\nワールドから切断する必要があります！",
    "ko": "정말 %{name}%의 저장 데이터를 삭제하시겠습니까?\n그들은 월드에서 연결을 끊어야 합니다!",
    "mi": "E tino ūtua ana koe ki te muku i ngā raraunga penapena a %{name}%?\nMe motuhake ia i te ao!",
    "to": "Oku ke mautinoa ke ke mamafa e tala %{name}%?\nPe ‘e ‘i ai ha fe‘ao ki he lalolagi!",
    "gil": "Are you sure you want to remove %{name}%'s save data?\nThey must disconnect from the world!",
    "ty": "E mauruuru ana anei ia koe e mafai te tātari i te raraunga penapena a %{name}%?\nE titauhia ia ʻere ia i te ao!"
  },

  "menu.settings.permissions.online_player.kick.button": {
    "en": "Kick & Delete",
    "de": "Kicken & Löschen",
    "fr": "Expulser & supprimer",
    "it": "Espelli & elimina",
    "es": "Expulsar y eliminar",
    "pt": "Expulsar e excluir",
    "is": "Kasta út & eyða",
    "el": "Αποβολή & Διαγραφή",
    "ar": "طرد وحذف",
    "fi": "Poista & tyhjennä",
    "sv": "Sparka & ta bort",
    "ru": "Кик & удалить",
    "tr": "At & Sil",
    "fa": "اخراج و حذف",
    "ps": "شړل او حذفول",
    "ur": "کک کریں اور حذف کریں",
    "hi": "किक करें और हटाएँ",
    "si": "හිස් කර හා මකන්න",
    "ta": "செய்த முடிக & நீக்கு",
    "ne": "निकालें और मिटाएं",
    "bn": "কিক করুন এবং মুছুন",
    "th": "เตะ & ลบ",
    "vi": "Đá & Xóa",
    "id": "Keluarkan & Hapus",
    "ms": "Tendang & Padam",
    "zh": "踢出并删除",
    "ja": "キック＆削除",
    "ko": "킥 & 삭제",
    "mi": "Whakahoki & Muku",
    "to": "Kiiki & Muku",
    "gil": "Kick & Delete",
    "ty": "Mae te fa‘aea & tape"
  },

  "menu.settings.permissions.online_player.kick.host.title": {
    "en": "Host player information",
    "de": "Informationen zum Host-Spieler",
    "fr": "Informations sur l’hôte",
    "it": "Informazioni sull’host",
    "es": "Información del anfitrión",
    "pt": "Informações do anfitrião",
    "is": "Upplýsingar um hýsilspilara",
    "el": "Πληροφορίες οικοδεσπότη",
    "ar": "معلومات المضيف",
    "fi": "Isäntätietoja",
    "sv": "Information om värdspelare",
    "ru": "Информация о хосте",
    "tr": "Sunucu oyuncu bilgileri",
    "fa": "اطلاعات میزبان",
    "ps": "د کوربه لوبغاړي معلومات",
    "ur": "میزبان کھلاڑی کی معلومات",
    "hi": "होस्ट खिलाड़ी जानकारी",
    "si": "කාන්තාව තොරතුරු",
    "ta": "ஹோஸ்ட் வீரர் தகவல்",
    "ne": "होस्ट खेलाडी जानकारी",
    "bn": "হোস্ট খেলোয়াড় তথ্য",
    "th": "ข้อมูลผู้เล่นโฮสต์",
    "vi": "Thông tin người chơi máy chủ",
    "id": "Informasi pemain host",
    "ms": "Maklumat pemain hos",
    "zh": "主机玩家信息",
    "ja": "ホストプレイヤー情報",
    "ko": "호스트 플레이어 정보",
    "mi": "Ngā pārongo kaitākaro manuhiri",
    "to": "Founga faka‘ali‘ali ki he ta‘etotolo ho‘o tutua",
    "gil": "Host player information",
    "ty": "Fa‘afaufaa i te taata tākaro fa‘āhiti"
  },

  "menu.settings.permissions.online_player.kick.host.description": {
    "en": "%{name}% is the host. To delete their data, the server must shut down. This usually takes 5 seconds",
    "de": "%{name}% ist der Host. Um dessen Daten zu löschen, muss der Server heruntergefahren werden. Dies dauert in der Regel 5 Sekunden.",
    "fr": "%{name}% est l’hôte. Pour supprimer ses données, le serveur doit s’arrêter. Cela prend généralement 5secondes.",
    "it": "%{name}% è l’host. Per eliminare i suoi dati, il server deve essere arrestato. Di solito ci vogliono 5 secondi.",
    "es": "%{name}% es el anfitrión. Para eliminar sus datos, el servidor debe apagarse. Suele tardar 5 segundos.",
    "pt": "%{name}% é o anfitrião. Para excluir seus dados, o servidor deve desligar. Geralmente leva 5 segundos.",
    "is": "%{name}% er hýsilinn. Til að eyða gögnum hans/hennar þarf að loka netþjóninum. Þetta tekur venjulega 5 sekúndur.",
    "el": "Ο %{name}% είναι ο οικοδεσπότης. Για να διαγράψετε τα δεδομένα του, πρέπει να διακοπεί ο διακομιστής. Συνήθως διαρκεί 5 δευτερόλεπτα.",
    "ar": "%{name}% هو المضيف. لحذف بياناته، يجب إيقاف الخادم. عادةً يستغرق ذلك 5 ثوانٍ.",
    "fi": "%{name}% on isäntä. Poistaaksesi hänen tietonsa, palvelin on sammutettava. Tämä kestää yleensä 5 sekuntia.",
    "sv": "%{name}% är värden. För att radera deras data måste servern stängas av. Detta tar vanligtvis 5 sekunder.",
    "ru": "%{name}% — это хост. Чтобы удалить его данные, сервер должен быть остановлен. Обычно это занимает 5 секунд.",
    "tr": "%{name}% ev sahibi. Verilerini silmek için sunucu kapatılmalı. Bu genellikle 5 saniye sürer.",
    "fa": "%{name}% میزبان است. برای حذف داده‌های او، سرور باید خاموش شود. معمولاً ۵ ثانیه طول می‌کشد.",
    "ps": " %{name}% کوربه دی. د هغه ډاټا د حذفولو لپاره، سرور باید وتړل شي. دا معمولا ۵ ثانیې وخت نیسي.",
    "ur": "%{name}% میزبان ہے۔ ان کا ڈیٹا حذف کرنے کے لیے، سرور کو بند کرنا ہوگا۔ عام طور پر اس میں 5 سیکنڈ لگتے ہیں۔",
    "hi": "%{name}% होस्ट है। उनके डेटा को हटाने के लिए, सर्वर को बंद करना होगा। इसमें आमतौर पर 5 सेकंड लगते हैं।",
    "si": "%{name}% යනු සත්කාරකයා වෙයි. ඔහුගේ දත්ත මකීමට, සේවාදායකය නවත්විය යුතුය. මෙය සාමාන්‍යයෙන් තත්පර 5 ක් ගනී.",
    "ta": "%{name}% ஹோஸ்ட் ஆவார். அவரின் தரவை நீக்க, சர்வரை நிறுத்த வேண்டும். இது சுமார் 5 நொடிகள் எடுக்கும்.",
    "ne": " %{name}% होस्ट हो। उनको डेटा मेटाउन, सर्भर बन्द हुनुपर्छ। यसले सामान्यतया ५ सेकेण्ड लाग्छ।",
    "bn": "%{name}% হোস্ট। তার ডেটা মুছতে, সার্ভার বন্ধ করতে হবে। সাধারণত এতে ৫ সেকেন্ড লাগে।",
    "th": " %{name}% คือโฮสต์ หากต้องการลบข้อมูลของผู้ใช้ ต้องปิดเซิร์ฟเวอร์ มักใช้เวลา 5 วินาที",
    "vi": "%{name}% là máy chủ. Để xóa dữ liệu của họ, máy chủ phải tắt. Thường mất 5 giây.",
    "id": "%{name}% adalah host. Untuk menghapus datanya, server harus dimatikan. Biasanya memakan waktu 5 detik.",
    "ms": "%{name}% ialah hos. Untuk memadam data mereka, pelayan mesti dimatikan. Biasanya mengambil masa 5 saat.",
    "zh": "%{name}% 是主机。要删除他们的数据，必须关闭服务器。通常需要5秒。",
    "ja": "%{name}% はホストです。データを削除するにはサーバーをシャットダウンする必要があります。通常5秒かかります。",
    "ko": "%{name}%님은 호스트입니다. 데이터를 삭제하려면 서버를 종료해야 합니다. 보통 5초 걸립니다.",
    "mi": "Ko %{name}% te manuhiri. Kia muku ai āna raraunga, me kati te tūmau. He 5 hēkona te nuinga.",
    "to": "‘Oku ‘i ai ha, ko %{name}% ko e ho‘o tūmu‘aki. Ke muku hono tala, ‘e ‘i ai ha fie tu‘utāmaki ‘a e server. ‘Oku na toki taku 5 sekoni.",
    "gil": "%{name}% is the host. To delete their data, the server must shut down. This usually takes 5 seconds",
    "ty": "%{name}% te taata tauturu. No te muku i tana mau raraunga, e titauhia ia tapiri te server. E 5 hita‘o roa te reira."
  },

  "menu.settings.permissions.online_player.kick.host.button": {
    "en": "Shutdown & Delete",
    "de": "Herunterfahren & Löschen",
    "fr": "Arrêter & supprimer",
    "it": "Arresta & elimina",
    "es": "Apagar y eliminar",
    "pt": "Desligar e excluir",
    "is": "Slökkva & eyða",
    "el": "Τερματισμός & Διαγραφή",
    "ar": "إغلاق وحذف",
    "fi": "Sammuta & poista",
    "sv": "Stäng av & radera",
    "ru": "Выключить & удалить",
    "tr": "Kapat & Sil",
    "fa": "خاموش & حذف",
    "ps": "تړل او حذف",
    "ur": "بند کریں اور حذف کریں",
    "hi": "शटडाउन और हटाएँ",
    "si": "අපහසු & මකන්න",
    "ta": "முடக்கு & நீக்கு",
    "ne": "शटडाउन र मेटाउन",
    "bn": "শাটডাউন & মুছুন",
    "th": "ปิด & ลบ",
    "vi": "Tắt máy & Xóa",
    "id": "Matikan & Hapus",
    "ms": "Matikan & Padam",
    "zh": "关闭并删除",
    "ja": "シャットダウン＆削除",
    "ko": "종료 & 삭제",
    "mi": "Whakakā & Muku",
    "to": "Tapa & Muku",
    "gil": "Shutdown & Delete",
    "ty": "Tapiri & tape"
  },



  /*------------------------
    Menu - Language
  -------------------------*/

  "menu.settings.lang.title": {
    "en": "Language",
    "de": "Sprache",
    "fr": "Langue",
    "it": "Lingua",
    "es": "Idioma",
    "pt": "Idioma",
    "is": "Tungumál",
    "el": "Γλώσσα",
    "ar": "اللغة",
    "fi": "Kieli",
    "sv": "Språk",
    "ru": "Язык",
    "tr": "Dil",
    "fa": "زبان",
    "ps": "ژبه",
    "ur": "زبان",
    "hi": "भाषा",
    "si": "භාෂාව",
    "ta": "மொழி",
    "ne": "भाषा",
    "bn": "ভাষা",
    "th": "ภาษา",
    "vi": "Ngôn ngữ",
    "id": "Bahasa",
    "ms": "Bahasa",
    "zh": "语言",
    "ja": "言語",
    "ko": "언어",
    "mi": "Reo",
    "to": "Lea",
    "gil": "Language",
    "ty": "Reo"
  },

  "menu.settings.lang.recommendation": {
    "en": "based on your timezone",
    "de": "nach deiner Zeitzone",
    "fr": "en fonction de votre fuseau horaire",
    "it": "in base al tuo fuso orario",
    "es": "basado en tu zona horaria",
    "pt": "com base no seu fuso horário",
    "is": "miðað við tímabeltið þitt",
    "el": "με βάση τη ζώνη ώρας σας",
    "ar": "بناءً على منطقتك الزمنية",
    "fi": "perustuen aikavyöhykkeeseesi",
    "sv": "baserat på din tidszon",
    "ru": "на основе вашего часового пояса",
    "tr": "saat diliminize göre",
    "fa": "براساس منطقه زمانی شما",
    "ps": "ستاسو د وخت زون پراساس",
    "ur": "آپ کے ٹائم زون کی بنیاد پر",
    "hi": "आपके समय क्षेत्र के आधार पर",
    "si": "ඔබගේ වේලාව කලාපය අනුව",
    "ta": "உங்கள் நேர மண்டலத்தை அடிப்படையாகக் கோட்டு",
    "ne": "तपाईंको समय क्षेत्रको आधारमा",
    "bn": "আপনার সময়সীমা অনুযায়ী",
    "th": "ตามเขตเวลาของคุณ",
    "vi": "dựa trên múi giờ của bạn",
    "id": "berdasarkan zona waktu Anda",
    "ms": "berdasarkan zon waktu anda",
    "zh": "基于您的时区",
    "ja": "タイムゾーンに基づいて",
    "ko": "시간대에 따라",
    "mi": "i runga i tō wā rohe",
    "to": "‘i he vā ofāmataʻi ‘oe",
    "gil": "based on your timezone",
    "ty": "i runga i to ’oe taime rohe"
  },

  "menu.settings.lang.preview.messages": {
    "en": "You have selected: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nI confirm that I have understood the sentence in the specified language and would like to use it.\n ",
    "de": "Du hast die Sprache %{name}% ausgewählt\n\n§o§8\"%{preview}%\"§r\n\nIch bestätige, dass ich den Satz in der angegebenen Sprache verstanden habe und sie verwenden möchte.\n ",
    "fr": "Vous avez sélectionné: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nJe confirme avoir compris la phrase dans la langue spécifiée et souhaite l’utiliser.\n ",
    "it": "Hai selezionato: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nConfermo di aver compreso la frase nella lingua specificata e desidero usarla.\n ",
    "es": "Has seleccionado: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nConfirmo que he entendido la frase en el idioma especificado y deseo usarlo.\n ",
    "pt": "Você selecionou: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nConfirmo que entendi a frase no idioma especificado e gostaria de usá‑la.\n ",
    "is": "Þú valdir tungumálið: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nÉg staðfesti að ég skildi setninguna á tilgreindu tungumáli og vil nota hana.\n ",
    "el": "Επιλέξατε: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nΕπιβεβαιώνω ότι κατάλαβα την πρόταση στη συγκεκριμένη γλώσσα και θα ήθελα να τη χρησιμοποιήσω.\n ",
    "ar": "لقد اخترت: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nأؤكد أنني فهمت الجملة باللغة المحددة وأرغب في استخدامها.\n ",
    "fi": "Olet valinnut: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nVahvistan ymmärtäneeni lauseen määritetyllä kielellä ja haluan käyttää sitä.\n ",
    "sv": "Du har valt: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nJag bekräftar att jag har förstått meningen på det angivna språket och vill använda det.\n ",
    "ru": "Вы выбрали: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nПодтверждаю, что понял предложение на указанном языке и хочу его использовать.\n ",
    "tr": "Seçiminiz: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nBelirtilen dili anladığımı ve kullanmak istediğimi onaylıyorum.\n ",
    "fa": "شما انتخاب کردید: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nتأیید می‌کنم جمله را به زبان مشخص شده فهمیده‌ام و می‌خواهم از آن استفاده کنم.\n ",
    "ps": "تاسو غوره کړل: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nزه تأییدوم چې ما جمله په ټاکلې ژبه کې درک کړې او غواړم یې وکاروم.\n ",
    "ur": "آپ نے منتخب کیا: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nمیں تصدیق کرتا ہوں کہ میں نے مخصوص زبان میں جملہ سمجھا ہے اور اسے استعمال کرنا چاہتا ہوں۔\n ",
    "hi": "आपने चुना: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nमैं पुष्टि करता हूँ कि मैंने निर्दिष्ट भाषा में वाक्य को समझा है और इसका उपयोग करना चाहता हूँ।\n ",
    "si": "ඔබගේ තේරීම: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nනියමිත භාෂාවේ වාක්‍යය මට වැටහුණා බව සහ මම එය භාවිත කිරීමට කැමතියි යනුවෙන් තහවුරු කරමි.\n ",
    "ta": "நீங்கள் தேர்ந்தெடுத்தது: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nகுறிப்பிட்ட மொழியில் வாக்கியத்தை நான் புரிந்துகொண்டுள்ளேன் மற்றும் அதை பயன்படுத்த விரும்புகிறேன் என உறுதி செய்கிறேன்.\n ",
    "ne": "तपाईंले चयन गर्नुभएको: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nमैले निर्दिष्ट भाषामा वाक्य बुझें र प्रयोग गर्न चाहन्छु भन्ने कुरा पुष्टि गर्दछु।\n ",
    "bn": "আপনি নির্বাচিত: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nআমি নিশ্চিত করি যে আমি নির্ধারিত ভাষায় বাক্যটি বুঝেছি এবং এটি ব্যবহার করতে চাই।\n ",
    "th": "คุณเลือก: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nฉันยืนยันว่าฉันเข้าใจประโยคในภาษาที่ระบุและต้องการใช้มัน\n ",
    "vi": "Bạn đã chọn: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nTôi xác nhận rằng tôi đã hiểu câu trong ngôn ngữ được chỉ định và muốn sử dụng nó.\n ",
    "id": "Anda telah memilih: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nSaya konfirmasi bahwa saya memahami kalimat dalam bahasa yang ditentukan dan ingin menggunakannya.\n ",
    "ms": "Anda telah memilih: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nSaya mengesahkan bahawa saya faham ayat dalam bahasa yang ditetapkan dan ingin menggunakannya.\n ",
    "zh": "您已选择：%{name}%\n\n§o§8\"%{preview}%\"§r\n\n我确认我已理解指定语言中的句子，并希望使用它。\n ",
    "ja": "選択されました：%{name}%\n\n§o§8\"%{preview}%\"§r\n\n指定した言語の文を理解したことを確認し、使用します。\n ",
    "ko": "선택한 언어: %{name}%\n\n§o§8\"%{preview}%\"§r\n\n지정된 언어의 문장을 이해했으며 사용하겠습니다.\n ",
    "mi": "Kua kōwhiria e koe: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nKa whakapūmau ahau kua mārama au ki te rerenga i te reo kua tohua, ā, kei te hiahia ahau ki te whakamahi.\n ",
    "to": "Kuo ke fili: %{name}%\n\n§o§8\"%{preview}%\"§r\n\n‘Oku ou fakapapau‘i kuo u ma‘u‘i ‘e au ‘a e lea ‘oku ki he lea na‘e tohi‘i, pea ‘oku ou fiema‘u ke u ngaue gā.\n ",
    "gil": "You have selected: %{name}%\n\n§o§8\"%{preview}%\"§r\n\nI confirm that I have understood the sentence in the specified language and would like to use it.\n ",
    "ty": "Ua hoko ia oe e : %{name}%\n\n§o§8\"%{preview}%\"§r\n\nUa hō‘ike vau ua ite au i te fa‘atāii i roto i te reo tā‘ua e hina‘aro vau ia faaohipa i te reira.\n "
  },

  "menu.settings.lang.preview.messages.ai": {
    "en": "Languages are constantly changing. Please share your experience, e.g., translation mistakes. For more infos check Contacts in the \"About\" section!\n\n§o§8\"%{preview}%\"§r\n\nI confirm that I have understood the sentence in the specified language and would like to use it.\n ",
    "de": "Sprachen verändern sich ständig. Bitte teile deine Erfahrungen, z.B. durch Meldung von Übersetzungsfehlern. Weitere Infos findest du unter \"Über diese Version\" im Abschnitt Kontakte!\n\n§o§8\"%{preview}%\"§r\n\nIch bestätige, dass ich den Satz in der angegebenen Sprache verstanden habe und sie verwenden möchte.\n ",
    "fr": "Les langues évoluent constamment. Merci de partager votre expérience, p.ex. erreurs de traduction. Pour plus d’infos, consultez Contacts dans la section «À propos»!\n\n§o§8\"%{preview}%\"§r\n\nJe confirme avoir compris la phrase dans la langue spécifiée et souhaite l’utiliser.\n ",
    "it": "Le lingue cambiano continuamente. Condividi la tua esperienza, es. errori di traduzione. Per più info vedi Contatti nella sezione \"Informazioni\"!\n\n§o§8\"%{preview}%\"§r\n\nConfermo di aver compreso la frase nella lingua specificata e desidero usarla.\n ",
    "es": "Los idiomas cambian constantemente. Comparte tu experiencia, p.ej. errores de traducción. Para más info consulta Contactos en la sección \"Acerca de\"!\n\n§o§8\"%{preview}%\"§r\n\nConfirmo que he entendido la frase en el idioma especificado y deseo usarlo.\n ",
    "pt": "As línguas estão em constante mudança. Compartilhe sua experiência, ex. erros de tradução. Para mais info, veja Contatos em \"Sobre\"!\n\n§o§8\"%{preview}%\"§r\n\nConfirmo que entendi a frase no idioma especificado e gostaria de usá‑la.\n ",
    "nl": "Talen veranderen voortdurend. Deel je ervaring, bijv. vertaalfouten. Voor meer informatie, zie Contacten onder 'Over'!\n\n§o§8\"%{preview}%\"§r\n\nIk bevestig dat ik de zin in de opgegeven taal heb begrepen en deze wil gebruiken.\n ",
    "pl": "Języki stale się zmieniają. Podziel się swoim doświadczeniem, np. błędami w tłumaczeniu. Więcej informacji znajdziesz w sekcji „O programie”!\n\n§o§8\"%{preview}%\"§r\n\nPotwierdzam, że zrozumiałem zdanie w podanym języku i chcę go używać.\n ",
    "ro": "Limbile se schimbă constant. Împărtășește-ți experiența, ex. greșeli de traducere. Pentru mai multe informații, vezi secțiunea „Despre”!\n\n§o§8\"%{preview}%\"§r\n\nConfirm că am înțeles propoziția în limba specificată și doresc să o folosesc.\n ",
    "ru": "Языки постоянно меняются. Поделитесь своим опытом, например, ошибками перевода. Больше информации в разделе «О программе»!\n\n§o§8\"%{preview}%\"§r\n\nЯ подтверждаю, что понял(а) это предложение на указанном языке и хочу его использовать.\n ",
    "tr": "Diller sürekli değişiyor. Lütfen deneyimlerini paylaş, örneğin çeviri hataları. Daha fazla bilgi için \"Hakkında\" bölümündeki İletişim kısmına göz at!\n\n§o§8\"%{preview}%\"§r\n\nBelirtilen dildeki cümleyi anladığımı ve kullanmak istediğimi onaylıyorum.\n ",
    "zh": "语言不断变化。请分享你的体验，例如翻译错误。更多信息请查看“关于”部分中的联系方式！\n\n§o§8\"%{preview}%\"§r\n\n我确认已理解所选语言中的句子，并希望使用它。\n ",
    "ja": "言語は常に変化しています。翻訳ミスなど、あなたの経験を共有してください。「概要」セクションの連絡先をご確認ください。\n\n§o§8\"%{preview}%\"§r\n\n指定された言語の文を理解したことを確認し、使用したいと思います。\n ",
    "ko": "언어는 끊임없이 변합니다. 번역 오류 등의 경험을 공유해주세요. 자세한 정보는 \"정보\" 섹션의 연락처를 확인하세요!\n\n§o§8\"%{preview}%\"§r\n\n해당 언어로 된 문장을 이해했고 사용하고 싶음을 확인합니다.\n ",
    "sv": "Språk förändras ständigt. Dela gärna med dig av dina erfarenheter, t.ex. översättningsfel. Mer info hittar du under 'Om'!\n\n§o§8\"%{preview}%\"§r\n\nJag bekräftar att jag har förstått meningen på det angivna språket och vill använda den.\n ",
    "no": "Språk endres hele tiden. Del gjerne dine erfaringer, f.eks. oversettelsesfeil. Se 'Om' for mer informasjon!\n\n§o§8\"%{preview}%\"§r\n\nJeg bekrefter at jeg har forstått setningen på det angitte språket og ønsker å bruke den.\n ",
    "fi": "Kielet muuttuvat jatkuvasti. Jaa kokemuksesi, esim. käännösvirheet. Lisätietoa kohdasta \"Tietoa\"!\n\n§o§8\"%{preview}%\"§r\n\nVahvistan ymmärtäneeni lauseen kyseisellä kielellä ja haluan käyttää sitä.\n ",
    "cs": "Jazyky se neustále mění. Podělte se o své zkušenosti, např. o chyby v překladu. Více informací najdete v části „O aplikaci“!\n\n§o§8\"%{preview}%\"§r\n\nPotvrzuji, že jsem větě v uvedeném jazyce porozuměl/a a chci ji použít.\n ",
    "sk": "Jazyky sa neustále menia. Podeľ sa o svoje skúsenosti, napr. prekladové chyby. Viac informácií nájdeš v sekcii „O aplikácii“!\n\n§o§8\"%{preview}%\"§r\n\nPotvrdzujem, že som vetu v uvedenom jazyku pochopil/a a chcem ju použiť.\n ",
    "hu": "A nyelvek folyamatosan változnak. Kérjük, oszd meg a tapasztalataidat, pl. fordítási hibák esetén. További információk a \"Névjegy\" részben!\n\n§o§8\"%{preview}%\"§r\n\nMegerősítem, hogy megértettem a megadott nyelvű mondatot, és szeretném használni.\n ",
    "el": "Οι γλώσσες αλλάζουν συνεχώς. Μοιραστείτε την εμπειρία σας, π.χ. λάθη στη μετάφραση. Για περισσότερες πληροφορίες, δείτε την ενότητα «Σχετικά»!\n\n§o§8\"%{preview}%\"§r\n\nΕπιβεβαιώνω ότι κατάλαβα τη φράση στη συγκεκριμένη γλώσσα και θέλω να τη χρησιμοποιήσω.\n ",
    "bg": "Езиците постоянно се променят. Споделете своя опит, напр. грешки в превода. Повече информация – в раздел „Относно“!\n\n§o§8\"%{preview}%\"§r\n\nПотвърждавам, че разбирам изречението на посочения език и искам да го използвам.\n ",
    "uk": "Мови постійно змінюються. Поділіться своїм досвідом, наприклад, про помилки в перекладі. Більше інформації див. у розділі «Про програму»!\n\n§o§8\"%{preview}%\"§r\n\nПідтверджую, що зрозумів(ла) речення зазначеною мовою та хочу його використовувати.\n "
  },


  "menu.settings.lang.preview.test": {
    "en": "Mining diamonds at dawn is the best way to start a Minecraft adventure.",
    "de": "In Minecraft baue ich am liebsten eine gemütliche Holzhütte im Wald.",
    "fr": "Exploiter des diamants à l’aube est la meilleure façon de commencer une aventure Minecraft.",
    "it": "Minare diamanti all’alba è il modo migliore per iniziare un’avventura in Minecraft.",
    "es": "Minar diamantes al amanecer es la mejor forma de comenzar una aventura en Minecraft.",
    "pt": "Minerar diamantes ao amanhecer é a melhor maneira de começar uma aventura em Minecraft.",
    "is": "Að grafa demanta við dagrenningu er besti máti til að hefja ævintýri í Minecraft.",
    "el": "Η εξόρυξη διαμαντιών στον αυγερινό είναι ο καλύτερος τρόπος για να ξεκινήσει μια περιπέτεια Minecraft.",
    "ar": "استخراج الماس عند الفجر هو أفضل طريقة لبدء مغامرة في ماينكرافت.",
    "fi": "Timanttien kaivaminen aamunkoitteessa on paras tapa aloittaa Minecraft-seikkailu.",
    "sv": "Att bryta diamanter vid gryning är det bästa sättet att starta ett Minecraft-äventyr.",
    "ru": "Добыча алмазов на рассвете — лучший способ начать приключение в Minecraft.",
    "tr": "Şafağta elmas kazmak, bir Minecraft macerasına başlamanın en iyi yoludur.",
    "fa": "استخراج الماس در سپیده‌دم بهترین راه برای شروع ماجراجویی در Minecraft است.",
    "ps": "پر سهار د الماسو کيندل د Minecraft د ماجراجويي د پيل غوره لاره ده.",
    "ur": "سحر کے وقت ہیرے نکالنا Minecraft مہم کا آغاز کرنے کا بہترین طریقہ ہے۔",
    "hi": "भोर में हीरे खनन करना Minecraft साहसिक की शुरुआत करने का सबसे अच्छा तरीका है।",
    "si": "Minecraft සෙල්ලමේ ආරම්භ කිරීම සඳහා පෙරණියේ අණු පදම ලබා ගැනීම හොඳම ක්‍රමයයි.",
    "ta": "Minecraft சாகசத்தை துவங்க அதிகாலை வைரவிசாரணை செய்ய வருடுவதை சிறந்த வழி ஆகும்.",
    "ne": "सुड्के समयमा हीरा खन्नु Minecraft साहसिक सुरु गर्ने सबैभन्दा राम्रो तरिका हो।",
    "bn": "সকালের প্রথম আলোতে হীরা খনন করা Minecraft অ্যাডভেঞ্চার শুরু করার সেরা উপায়।",
    "th": "ขุดเพชรตอนรุ่งสางเป็นวิธีที่ดีที่สุดในการเริ่มต้นการผจญภัยใน Minecraft",
    "vi": "Khai khoáng kim cương khi bình minh là cách tốt nhất để bắt đầu cuộc phiêu lưu trong Minecraft.",
    "id": "Menambang berlian saat fajar adalah cara terbaik untuk memulai petualangan Minecraft.",
    "ms": "Mengorek berlian pada waktu fajar adalah cara terbaik untuk memulakan pengembaraan Minecraft.",
    "zh": "黎明时开采钻石是开始 Minecraft 冒险的最佳方式。",
    "ja": "夜明けにダイヤモンドを採掘することは、Minecraft の冒険を始める最良の方法です。",
    "ko": "새벽에 다이아몬드를 채굴하는 것은 Minecraft 모험을 시작하는 가장 좋은 방법입니다。",
    "mi": "Ko te keri kōpani i te ata he huarahi pai ki te tiimata i tētahi haerenga Minecraft.",
    "to": "Ko e kovi paasi i he aho ʻahoʻaho ko e founga lelei taha ke kamata ha feinga ʻi Minecraft.",
    "gil": "Mining diamonds at dawn is the best way to start a Minecraft adventure.",
    "ty": "Te haapiiraa i te niho hiamani i te ata iti o te po te huru maitai roa ia tiamanaki i te hopoʻa Minecraft."
  },


  /*------------------------
    Menu - Gestures
  -------------------------*/

  "menu.settings.gestures.title": {
    "en": "Gestures",
    "de": "Gesten",
    "fr": "Gestes",
    "it": "Gesti",
    "es": "Gestos",
    "pt": "Gestos",
    "is": "Hreyfingar",
    "el": "Χειρονομίες",
    "ar": "إيماءات",
    "fi": "Eleet",
    "sv": "Gester",
    "ru": "Жесты",
    "tr": "Jestler",
    "fa": "اشارات",
    "ps": "اشارې",
    "ur": "اشارے",
    "hi": "संकेत",
    "si": "ආචාර",
    "ta": "இசாக்கள்",
    "ne": "इशारा",
    "bn": "ইশারা",
    "th": "ท่าทาง",
    "vi": "Cử chỉ",
    "id": "Isyarat",
    "ms": "Isyarat",
    "zh": "手势",
    "ja": "ジェスチャー",
    "ko": "제스처",
    "mi": "Ngā tikanga",
    "to": "Ngaueʻaki",
    "gil": "Gestures",
    "ty": "Mana‘o"
  },

  "menu.settings.gestures.description": {
    "en": "Choose your own configuration of how the menu should open!",
    "de": "Wähle deine eigene Konfiguration, wie das Menü geöffnet werden soll!",
    "fr": "Choisissez votre propre configuration pour l’ouverture du menu!",
    "it": "Scegli la tua configurazione su come deve aprirsi il menu!",
    "es": "¡Elige tu propia configuración de cómo debe abrirse el menú!",
    "pt": "Escolha sua própria configuração de como o menu deve abrir!",
    "is": "Veldu þína eigin stillingu fyrir hvernig valmyndin ætti að opnast!",
    "el": "Επιλέξτε τη δική σας ρύθμιση για το πώς θα ανοίγει το μενού!",
    "ar": "اختر تكوينك الخاص لكيفية فتح القائمة!",
    "fi": "Valitse oma kokoonpanosi, miten valikko avautuu!",
    "sv": "Välj din egen konfiguration för hur menyn ska öppnas!",
    "ru": "Выберите свою конфигурацию открытия меню!",
    "tr": "Menünün nasıl açılacağına dair kendi yapılandırmanızı seçin!",
    "fa": "پیکربندی دلخواه خود برای باز شدن منو را انتخاب کنید!",
    "ps": "خپل دودیز ترتیب غوره کړئ چې مینو څنګه پرانیستل شي!",
    "ur": "اپنی مرضی کا کنفیگریشن منتخب کریں کہ مینو کیسے کھلے!",
    "hi": "निर्देशिका कैसे खुले, अपनी स्वयं की कॉन्फ़िगरेशन चुनें!",
    "si": "මෙනුව කොහෙට පිවිසෙයිදැයි ඔබගේම වින්‍යාසය තෝරන්න!",
    "ta": "மெனு எப்படி திறக்க வேண்டும் என்பதை உங்கள் சொந்தமைவை தேர்ந்தெடுக்கவும்!",
    "ne": "मेनु कसरि खुल्छ भनी आफ्नो कन्फिगरेसन छान्नुहोस्!",
    "bn": "মেনু কীভাবে খুলবে তা আপনার নিজস্ব কনফিগারেশন নির্বাচন করুন!",
    "th": "เลือกรูปแบบการเปิดเมนูของคุณเอง!",
    "vi": "Chọn cấu hình của riêng bạn về cách mở menu!",
    "id": "Pilih konfigurasi Anda sendiri tentang cara membuka menu!",
    "ms": "Pilih konfigurasi anda sendiri tentang cara membuka menu!",
    "zh": "选择您自己的菜单打开方式配置！",
    "ja": "メニューの開き方を自分で設定してください！",
    "ko": "메뉴가 열리는 방식을 직접 구성하세요!",
    "mi": "Tīpako i tō ake whirihoranga mō te huarahi e whakatuwhera ai te tahua!",
    "to": "Fili ho‘o founga ke fakatu‘u ai e lisi!",
    "gil": "Choose your own configuration of how the menu should open!",
    "ty": "Fili i tō outou faanahoraa no te avae e tuu ai i te fare haamaramarama!"
  },

  "menu.settings.gestures.emote": {
    "en": "Emote"
  },

  "menu.settings.gestures.sneak": {
    "en": "Sneak",
    "de": "Schleichen",
    "fr": "Se faufiler",
    "it": "Infiltrarsi",
    "es": "Escabullirse",
    "pt": "Esvaziar",
    "is": "Ljúga",
    "el": "Κατασκοπεύω",
    "ar": "تسلل",
    "fi": "Hiiviskellä",
    "sv": "Smyga",
    "ru": "Подкрадываться",
    "tr": "Sinsi sinsi gitmek",
    "fa": "پنهان شدن",
    "ps": "پټیدن",
    "ur": "چپکے چلنا",
    "hi": "चुपके से चलना",
    "si": "ගුහාගත වීම",
    "ta": "ஒளியாமைப்படை",
    "ne": "चुपके",
    "bn": "গোপনে চলা",
    "th": "แอบเดิน",
    "vi": "Lén lút",
    "id": "Menyusup",
    "ms": "Licik",
    "zh": "潜行",
    "ja": "こそこそ",
    "ko": "살금살금",
    "mi": "Whakamōmori",
    "to": "Anga",
    "gil": "Sneak",
    "ty": "Sneak"
  },

  "menu.settings.gestures.nod": {
    "en": "Nod",
    "de": "Nicken",
    "fr": "Hochement",
    "it": "Annuisci",
    "es": "Asentir",
    "pt": "Concordar",
    "is": "Húnka",
    "el": "Να κουνάς το κεφάλι",
    "ar": "إيماءة رأس",
    "fi": "Nyökkää",
    "sv": "Nicka",
    "ru": "Кивок",
    "tr": "Baş sallama",
    "fa": "تایید سر",
    "ps": "سر ټیټول",
    "ur": "سر ہلانا",
    "hi": "सिर हिलाना",
    "si": "සුසැදින්න",
    "ta": "தலை அசை",
    "ne": "तान",
    "bn": "মাথা নাড়া",
    "th": "พยักหน้า",
    "vi": "Gật đầu",
    "id": "Mengangguk",
    "ms": "Mengangguk",
    "zh": "点头",
    "ja": "うなずき",
    "ko": "끄덕임",
    "mi": "Whakarongo",
    "to": "Tā‘ofi",
    "gil": "Nod",
    "ty": "Nod"
  },

  "menu.settings.gestures.stick": {
    "en": "Stick",
    "de": "Mit einem Stock",
    "fr": "Bâton",
    "it": "Bastone",
    "es": "Palo",
    "pt": "Cajado",
    "is": "Stafur",
    "el": "Ράβδος",
    "ar": "عصا",
    "fi": "Keppi",
    "sv": "Stav",
    "ru": "Палка",
    "tr": "Çubuk",
    "fa": "چوبدستی",
    "ps": "لښتی",
    "ur": "چھڑی",
    "hi": "छड़ी",
    "si": "කඩුව",
    "ta": "கம்பி",
    "ne": "डण्डा",
    "bn": "ছড়ি",
    "th": "ไม้เท้า",
    "vi": "Gậy",
    "id": "Tongkat",
    "ms": "Tongkat",
    "zh": "棍棒",
    "ja": "棒",
    "ko": "막대기",
    "mi": "Tarewa",
    "to": "Puleka",
    "gil": "Stick",
    "ty": "Stick"
  },

  "menu.settings.gestures.command": {
    "en": "Command",
    "de": "Befehl",
    "fr": "Commande",
    "it": "Comando",
    "es": "Comando",
    "pt": "Comando",
    "is": "Skipun",
    "el": "Εντολή",
    "ar": "أمر",
    "fi": "Komento",
    "sv": "Kommando",
    "ru": "Команда",
    "tr": "Komut",
    "fa": "فرمان",
    "ps": "امر",
    "ur": "کمانڈ",
    "hi": "आदेश",
    "si": "උපදෙස්",
    "ta": "கமாண்ட்",
    "ne": "आदेश",
    "bn": "কমান্ড",
    "th": "คำสั่ง",
    "vi": "Lệnh",
    "id": "Perintah",
    "ms": "Arahan",
    "zh": "命令",
    "ja": "コマンド",
    "ko": "명령",
    "mi": "Whakahau",
    "to": "Polokalama",
    "gil": "Command",
    "ty": "Command"
  },

  /*------------------------
    Menu - UTC
  -------------------------*/

  "menu.settings.time_zone.title": {
    "en": "Time zone",
    "de": "Zeitzone",
    "fr": "Fuseau horaire",
    "it": "Fuso orario",
    "es": "Zona horaria",
    "pt": "Fuso horário",
    "is": "Tímabelti",
    "el": "Ζώνη ώρας",
    "ar": "المنطقة الزمنية",
    "fi": "Aikavyöhyke",
    "sv": "Tidszon",
    "ru": "Часовой пояс",
    "tr": "Saat dilimi",
    "fa": "منطقه زمانی",
    "ps": "د وخت سیمه",
    "ur": "ٹائم زون",
    "hi": "समय क्षेत्र",
    "si": "කාල කලාපය",
    "ta": "நேர மண்டலம்",
    "ne": "समय क्षेत्र",
    "bn": "সময় অঞ্চল",
    "th": "เขตเวลา",
    "vi": "Múi giờ",
    "id": "Zona waktu",
    "ms": "Zon waktu",
    "zh": "时区",
    "ja": "タイムゾーン",
    "ko": "시간대",
    "mi": "Rohe wā",
    "to": "Vā taimi",
    "gil": "Time zone",
    "ty": "Fenua taime"
  },

  "menu.settings.time_zone.description": {
    "en": "Select your current time zone!",
    "de": "Wähle deine aktuelle Zeitzone!",
    "fr": "Sélectionnez votre fuseau horaire actuel!",
    "it": "Seleziona il tuo fuso orario attuale!",
    "es": "¡Selecciona tu zona horaria actual!",
    "pt": "Selecione seu fuso horário atual!",
    "is": "Veldu núverandi tímabelti þitt!",
    "el": "Επιλέξτε τη τρέχουσα ζώνη ώρας σας!",
    "ar": "اختر منطقتك الزمنية الحالية!",
    "fi": "Valitse nykyinen aikavyöhykkeesi!",
    "sv": "Välj din aktuella tidszon!",
    "ru": "Выберите ваш текущий часовой пояс!",
    "tr": "Mevcut saat diliminizi seçin!",
    "fa": "منطقه زمانی فعلی خود را انتخاب کنید!",
    "ps": "خپل اوسنی وخت سیمه وټاکئ!",
    "ur": "اپنا موجودہ ٹائم زون منتخب کریں!",
    "hi": "अपना वर्तमान समय क्षेत्र चुनें!",
    "si": "ඔබගේ වර්තමාන කාල කලාපය තෝරන්න!",
    "ta": "உங்கள் தற்போதைய நேர மண்டலத்தைத் தேர்ந்தெடுக்கவும்!",
    "ne": "तपाईंको वर्तमान समय क्षेत्र चयन गर्नुहोस्!",
    "bn": "আপনার বর্তমান সময় অঞ্চল নির্বাচন করুন!",
    "th": "เลือกเขตเวลาปัจจุบันของคุณ!",
    "vi": "Chọn múi giờ hiện tại của bạn!",
    "id": "Pilih zona waktu Anda saat ini!",
    "ms": "Pilih zon waktu anda sekarang!",
    "zh": "选择您当前的时区！",
    "ja": "現在のタイムゾーンを選択してください！",
    "ko": "현재 시간대를 선택하세요!",
    "mi": "Tīpakohia tō rohe wā o nāianei!",
    "to": "Fili ho‘o vā taimi ‘oku iai!",
    "gil": "Select your current time zone!",
    "ty": "Fili i teie nei fenua taime!"
  },

  "menu.settings.time_zone.show_later": {
    "en": "Show later time zones",
    "de": "Spätere Zeitzonen",
    "fr": "Afficher les fuseaux suivants",
    "it": "Mostra fusi orari successivi",
    "es": "Mostrar zonas horarias posteriores",
    "pt": "Mostrar fusos horários posteriores",
    "is": "Sýna síðar tímabelti",
    "el": "Εμφάνιση μεταγενέστερων ζωνών ώρας",
    "ar": "عرض المناطق الزمنية اللاحقة",
    "fi": "Näytä myöhemmät aikavyöhykkeet",
    "sv": "Visa senare tidszoner",
    "ru": "Показать более поздние часовые пояса",
    "tr": "Daha sonraki saat dilimlerini göster",
    "fa": "نمایش مناطق زمانی بعدی",
    "ps": "وروستي وخت سیمې وښایئ",
    "ur": "بعد کے ٹائم زون دکھائیں",
    "hi": "बाद के समय क्षेत्रों को दिखाएँ",
    "si": "පසුව පෙනෙන කාල කලාප",
    "ta": "பிறகு நேர மண்டலங்களை காட்டு",
    "ne": "पछिका समय क्षेत्रहरू देखाउनुहोस्",
    "bn": "পরে সময় অঞ্চলগুলি দেখান",
    "th": "แสดงเขตเวลาที่ถัดไป",
    "vi": "Hiển thị múi giờ sau",
    "id": "Tampilkan zona waktu selanjutnya",
    "ms": "Tunjukkan zon waktu kemudian",
    "zh": "显示稍后的时区",
    "ja": "後のタイムゾーンを表示",
    "ko": "나중 시간대 보기",
    "mi": "Whakaatu rohe wā muri",
    "to": "Fakamāfai ange e ngaahi vā taimi",
    "gil": "Show later time zones",
    "ty": "Faaite i te mau fenua taime māire'a"
  },

  "menu.settings.time_zone.show_previous": {
    "en": "Show previous time zones",
    "de": "Frühere Zeitzonen",
    "fr": "Afficher les fuseaux précédents",
    "it": "Mostra fusi orari precedenti",
    "es": "Mostrar zonas horarias anteriores",
    "pt": "Mostrar fusos horários anteriores",
    "is": "Sýna fyrri tímabelti",
    "el": "Εμφάνιση προηγούμενων ζωνών ώρας",
    "ar": "عرض المناطق الزمنية السابقة",
    "fi": "Näytä aiemmat aikavyöhykkeet",
    "sv": "Visa tidigare tidszoner",
    "ru": "Показать предыдущие часовые пояса",
    "tr": "Önceki saat dilimlerini göster",
    "fa": "نمایش مناطق زمانی قبلی",
    "ps": "تېر وخت سیمې وښایئ",
    "ur": "پچھلے ٹائم زون دکھائیں",
    "hi": "पिछले समय क्षेत्रों को दिखाएँ",
    "si": "පෙර කාල කලාප පෙන්වන්න",
    "ta": "முன்னைய நேர மண்டலங்களை காட்டு",
    "ne": "पहिला समय क्षेत्रहरू देखाउनुहोस्",
    "bn": "পূর্বের সময় অঞ্চলগুলি দেখান",
    "th": "แสดงเขตเวลาก่อนหน้า",
    "vi": "Hiển thị múi giờ trước",
    "id": "Tampilkan zona waktu sebelumnya",
    "ms": "Tunjukkan zon waktu sebelumnya",
    "zh": "显示之前的时区",
    "ja": "前のタイムゾーンを表示",
    "ko": "이전 시간대 보기",
    "mi": "Whakaatu rohe wā o mua",
    "to": "Fakamāfai 'aki e ngaahi vā taimi mua",
    "gil": "Show previous time zones",
    "ty": "Faaite i te mau fenua taime mata‘utia"
  },

  "menu.settings.time_zone.show_less": {
    "en": "Show less",
    "de": "Weniger anzeigen",
    "fr": "Afficher moins",
    "it": "Mostra meno",
    "es": "Mostrar menos",
    "pt": "Mostrar menos",
    "is": "Sýna minna",
    "el": "Εμφάνιση λιγότερων",
    "ar": "عرض أقل",
    "fi": "Näytä vähemmän",
    "sv": "Visa mindre",
    "ru": "Показать меньше",
    "tr": "Daha az göster",
    "fa": "نمایش کمتر",
    "ps": "کم ښکاره کړئ",
    "ur": "کم دکھائیں",
    "hi": "कम दिखाएँ",
    "si": "අඩු පෙන්වන්න",
    "ta": "குறைவாக காட்டு",
    "ne": "कम देखाउनुहोस्",
    "bn": "কম দেখান",
    "th": "แสดงน้อยลง",
    "vi": "Hiển thị ít hơn",
    "id": "Tampilkan lebih sedikit",
    "ms": "Tunjukkan kurang",
    "zh": "显示更少",
    "ja": "少なく表示",
    "ko": "간략히 보기",
    "mi": "Whakaatu iti iho",
    "to": "Fakamāfai lahi ange",
    "gil": "Show less",
    "ty": "Faaite iti roa"
  },

  "menu.settings.time_zone.preview": {
    "en": "Time zone: %{name}%\nUTC: %{utc}%\nTime: %{time}%§r\nLocation(s): %{location}%\n\nDo you want to use this time zone?\n ",
    "de": "Zeitzone: %{name}%\nUTC: %{utc}%\nUhrzeit: %{time}%§r\nOrt(e): %{location}%\n\nMöchtest du diese Zeitzone verwenden?\n ",
    "fr": "Fuseau horaire: %{name}%\nUTC: %{utc}%\nHeure: %{time}%§r\nLieu(x): %{location}%\n\nVoulez‑vous utiliser ce fuseau horaire?\n ",
    "it": "Fuso orario: %{name}%\nUTC: %{utc}%\nOra: %{time}%§r\nLocalità: %{location}%\n\nVuoi usare questo fuso orario?\n ",
    "es": "Zona horaria: %{name}%\nUTC: %{utc}%\nHora: %{time}%§r\nUbicación(es): %{location}%\n\n¿Quieres usar esta zona horaria?\n ",
    "pt": "Fuso horário: %{name}%\nUTC: %{utc}%\nHora: %{time}%§r\nLocalização(ões): %{location}%\n\nDeseja usar este fuso horário?\n ",
    "is": "Tímabelti: %{name}%\nUTC: %{utc}%\nTími: %{time}%§r\nStaður/staðir: %{location}%\n\nViltu nota þetta tímabelti?\n ",
    "el": "Ζώνη ώρας: %{name}%\nUTC: %{utc}%\nΏρα: %{time}%§r\nΤοποθεσία(ες): %{location}%\n\nΘα θέλατε να χρησιμοποιήσετε αυτήν τη ζώνη ώρας;\n ",
    "ar": "المنطقة الزمنية: %{name}%\nUTC: %{utc}%\nالوقت: %{time}%§r\nالموقع(المواقع): %{location}%\n\nهل تريد استخدام هذه المنطقة الزمنية؟\n ",
    "fi": "Aikavyöhyke: %{name}%\nUTC: %{utc}%\nAika: %{time}%§r\nSijainti(t): %{location}%\n\nHaluatko käyttää tätä aikavyöhykettä?\n ",
    "sv": "Tidszon: %{name}%\nUTC: %{utc}%\nTid: %{time}%§r\nPlats(er): %{location}%\n\nVill du använda denna tidszon?\n ",
    "ru": "Часовой пояс: %{name}%\nUTC: %{utc}%\nВремя: %{time}%§r\nМестоположение(я): %{location}%\n\nВы хотите использовать этот часовой пояс?\n ",
    "tr": "Saat dilimi: %{name}%\nUTC: %{utc}%\nSaat: %{time}%§r\nKonum(lar): %{location}%\n\nBu saat dilimini kullanmak ister misiniz?\n ",
    "fa": "منطقه زمانی: %{name}%\nUTC: %{utc}%\nزمان: %{time}%§r\nمکان(ها): %{location}%\n\nآیا می‌خواهید از این منطقه زمانی استفاده کنید؟\n ",
    "ps": "د وخت سیمه: %{name}%\nUTC: %{utc}%\nوخت: %{time}%§r\nځای(ونه): %{location}%\n\nایا غواړئ دا وخت سیمه وکاروئ؟\n ",
    "ur": "ٹائم زون: %{name}%\nUTC: %{utc}%\nوقت: %{time}%§r\nمقام(مقامات): %{location}%\n\nکیا آپ اس ٹائم زون کو استعمال کرنا چاہتے ہیں؟\n ",
    "hi": "समय क्षेत्र: %{name}%\nUTC: %{utc}%\nसमय: %{time}%§r\nस्थान(स्थान): %{location}%\n\nक्या आप इस समय क्षेत्र का उपयोग करना चाहते हैं?\n ",
    "si": "කාල කලාපය: %{name}%\nUTC: %{utc}%\nවේලාව: %{time}%§r\nස්ථානය(ස්ථාන): %{location}%\n\nඔබට මෙම කාල කලාපය භාවිතා කිරීමට අවශ්‍යද?\n ",
    "ta": "நேர மண்டலம்: %{name}%\nUTC: %{utc}%\nநேரம்: %{time}%§r\nஇட(ங்கள்): %{location}%\n\nஇந்த நேர மண்டலத்தைப் பயன்படுத்த விரும்புகிறீர்களா?\n ",
    "ne": "समय क्षेत्र: %{name}%\nUTC: %{utc}%\nसमय: %{time}%§r\nस्थान(हरू): %{location}%\n\nके तपाईंले यो समय क्षेत्र प्रयोग गर्न चाहनुहुन्छ?\n ",
    "bn": "সময় অঞ্চল: %{name}%\nUTC: %{utc}%\nসময়: %{time}%§r\nঅবস্থান(গুলি): %{location}%\n\nআপনি কি এই সময় অঞ্চলটি ব্যবহার করতে চান?\n ",
    "th": "เขตเวลา: %{name}%\nUTC: %{utc}%\nเวลา: %{time}%§r\nสถานที่: %{location}%\n\nคุณต้องการใช้เขตเวลานี้หรือไม่?\n ",
    "vi": "Múi giờ: %{name}%\nUTC: %{utc}%\nThời gian: %{time}%§r\nĐịa điểm: %{location}%\n\nBạn có muốn sử dụng múi giờ này không?\n ",
    "id": "Zona waktu: %{name}%\nUTC: %{utc}%\nWaktu: %{time}%§r\nLokasi: %{location}%\n\nApakah Anda ingin menggunakan zona waktu ini?\n ",
    "ms": "Zon waktu: %{name}%\nUTC: %{utc}%\nMasa: %{time}%§r\nLokasi: %{location}%\n\nAdakah anda mahu menggunakan zon waktu ini?\n ",
    "zh": "时区：%{name}%\nUTC：%{utc}%\n时间：%{time}%§r\n位置：%{location}%\n\n您想使用此时区吗？\n ",
    "ja": "タイムゾーン：%{name}%\nUTC：%{utc}%\n時間：%{time}%§r\n場所：%{location}%\n\nこのタイムゾーンを使用しますか？\n ",
    "ko": "시간대: %{name}%\nUTC: %{utc}%\n시간: %{time}%§r\n위치: %{location}%\n\n이 시간대를 사용하시겠습니까?\n ",
    "mi": "Rohe wā: %{name}%\nUTC: %{utc}%\nWā: %{time}%§r\nWāhi: %{location}%\n\nE hiahia ana koe ki te whakamahi i tēnei rohe wā?\n ",
    "to": "Vā taimi: %{name}%\nUTC: %{utc}%\n⨀ taimi: %{time}%§r\nNonga: %{location}%\n\nOku ke fie ngāue‘aki ngā vā taimi ko ‘eni?\n ",
    "gil": "Time zone: %{name}%\nUTC: %{utc}%\nTime: %{time}%§r\nLocation(s): %{location}%\n\nDo you want to use this time zone?\n ",
    "ty": "Fenua taime: %{name}%\nUTC: %{utc}%\nTaime: %{time}%§r\nFei‘i: %{location}%\n\nE hina‘aro outou e faaohipa i teie fenua taime?\n "
  },



  /*------------------------
    Menu - Actionbar
  -------------------------*/

  "menu.settings.actionbar.title": {
    "en": "Actionbar",
    "de": "Actionbar",
    "fr": "Barre d’action",
    "it": "Barra azioni",
    "es": "Barra de acción",
    "pt": "Barra de ações",
    "is": "Aðgerðastika",
    "el": "Γραμμή ενεργειών",
    "ar": "شريط الإجراءات",
    "fi": "Toimintopalkki",
    "sv": "Actionbar",
    "ru": "Панель действий",
    "tr": "Eylem çubuğu",
    "fa": "نوار عملیات",
    "ps": "د کړنو بار",
    "ur": "ایکشن بار",
    "hi": "एक्शनबार",
    "si": "ක්‍රියා තීරුව",
    "ta": "செயல் பட்டி",
    "ne": "एक्शनबार",
    "bn": "অ্যাকশনবার",
    "th": "แถบการกระทำ",
    "vi": "Thanh hành động",
    "id": "Bar aksi",
    "ms": "Bar tindakan",
    "zh": "操作栏",
    "ja": "アクションバー",
    "ko": "액션바",
    "mi": "Paepae mahi",
    "to": "Paipa ngāue",
    "gil": "Actionbar",
    "ty": "Tāpa‘o hana"
  },

  "menu.settings.actionbar.using": {
    "en": "Use actionbar",
    "de": "Nutze actionbar",
    "fr": "Utiliser la barre d’action",
    "it": "Usa barra azioni",
    "es": "Usar barra de acción",
    "pt": "Usar barra de ações",
    "is": "Notaðu aðgerðastiku",
    "el": "Χρήση γραμμής ενεργειών",
    "ar": "استخدام شريط الإجراءات",
    "fi": "Käytä toimintopalkkia",
    "sv": "Använd actionbar",
    "ru": "Использовать панель действий",
    "tr": "Actionbar kullan",
    "fa": "استفاده از نوار عملیات",
    "ps": "د کړنو بار وکاروه",
    "ur": "ایکشن بار استعمال کریں",
    "hi": "एक्शनबार का उपयोग करें",
    "si": "ක්‍රියා තීරුව භාවිතා කරන්න",
    "ta": "செயல் பட்டியைப் பயன்படுத்தவும்",
    "ne": "एक्शनबार प्रयोग गर्नुहोस्",
    "bn": "অ্যাকশনবার ব্যবহার করুন",
    "th": "ใช้แถบการกระทำ",
    "vi": "Sử dụng thanh hành động",
    "id": "Gunakan bar aksi",
    "ms": "Gunakan bar tindakan",
    "zh": "使用操作栏",
    "ja": "アクションバーを使用",
    "ko": "액션바 사용",
    "mi": "Whakamahia te paepae mahi",
    "to": "Usu paipa ngāue",
    "gil": "Use actionbar",
    "ty": "Hao i te tāpa‘o hana"
  },

  "menu.settings.actionbar.day_time": {
    "en": "Show day time",
    "de": "Tageszeit",
    "fr": "Afficher l’heure du jour",
    "it": "Mostra ora diurna",
    "es": "Mostrar hora del día",
    "pt": "Mostrar hora do dia",
    "is": "Sýna dagstund",
    "el": "Εμφάνιση ώρας ημέρας",
    "ar": "إظهار وقت النهار",
    "fi": "Näytä päivän aika",
    "sv": "Visa dagtid",
    "ru": "Показать дневное время",
    "tr": "Gündüz saatini göster",
    "fa": "نمایش زمان روز",
    "ps": "د ورځې وخت وښـايه",
    "ur": "دن کا وقت دکھائیں",
    "hi": "दिन का समय दिखाएँ",
    "si": "දිවා කාලය පෙන්වන්න",
    "ta": "நாள் நேரத்தை காட்டவும்",
    "ne": "दैनिक समय देखाउनुहोस्",
    "bn": "দিনের সময় দেখান",
    "th": "แสดงเวลาในวัน",
    "vi": "Hiển thị thời gian trong ngày",
    "id": "Tampilkan waktu siang",
    "ms": "Tunjuk masa siang",
    "zh": "显示白天时间",
    "ja": "昼の時間を表示",
    "ko": "주간 시간 표시",
    "mi": "Whakaatu te wā o te rā",
    "to": "Fakamāfai taimi ‘aho",
    "gil": "Show day time",
    "ty": "Faahiahia taimi a‘e mahana"
  },

  "menu.settings.actionbar.time_source": {
    "en": "Time Source",
    "de": "Zeitquelle",
    "fr": "Source temporelle",
    "it": "Sorgente orario",
    "es": "Fuente de tiempo",
    "pt": "Fonte de tempo",
    "is": "Tímagjafi",
    "el": "Πηγή χρόνου",
    "ar": "مصدر الوقت",
    "fi": "Aikaleimaus",
    "sv": "Tidskälla",
    "ru": "Источник времени",
    "tr": "Zaman kaynağı",
    "fa": "منبع زمان",
    "ps": "د وخت سرچینه",
    "ur": "وقت کا ماخذ",
    "hi": "समय स्रोत",
    "si": "වේලාවේ මූල",
    "ta": "நேர மூலமாக",
    "ne": "समय स्रोत",
    "bn": "সময়ের উৎস",
    "th": "แหล่งเวลา",
    "vi": "Nguồn thời gian",
    "id": "Sumber waktu",
    "ms": "Sumber masa",
    "zh": "时间来源",
    "ja": "時間ソース",
    "ko": "시간 소스",
    "mi": "Puna wā",
    "to": "Puloto taimi",
    "gil": "Time Source",
    "ty": "Rai taime"
  },

  "menu.settings.actionbar.time_source.in_game": {
    "en": "Minecraft"
  },

  "menu.settings.actionbar.time_source.real_life": {
    "en": "Real Life",
    "de": "Echt Zeit",
    "fr": "Vraie vie",
    "it": "Vita reale",
    "es": "Vida real",
    "pt": "Vida real",
    "is": "Raunveruleiki",
    "el": "Πραγματική ζωή",
    "ar": "الحياة الواقعية",
    "fi": "Todellinen elämä",
    "sv": "Riktiga livet",
    "ru": "Реальная жизнь",
    "tr": "Gerçek hayat",
    "fa": "زندگی واقعی",
    "ps": "ریښتینی ژوند",
    "ur": "حقیقی زندگی",
    "hi": "वास्तविक जीवन",
    "si": "සත්‍ය ජීවිතය",
    "ta": "உண்மை வாழ்க்கை",
    "ne": "वास्तविक जीवन",
    "bn": "বাস্তব জীবন",
    "th": "ชีวิตจริง",
    "vi": "Cuộc sống thực",
    "id": "Kehidupan nyata",
    "ms": "Kehidupan sebenar",
    "zh": "现实生活",
    "ja": "現実世界",
    "ko": "실제 시간",
    "mi": "Oranga tūturu",
    "to": "Mo‘ui faka-teuteu",
    "gil": "Real Life",
    "ty": "Oraraa faufaa"
  },

  "menu.settings.actionbar.design.button": {
    "en": "Change the look!",
    "de": "Ändere das Aussehen!",
    "fr": "Changez l’apparence!",
    "it": "Cambia aspetto!",
    "es": "¡Cambia el aspecto!",
    "pt": "Mude a aparência!",
    "is": "Breyttu útlitinu!",
    "el": "Αλλάξτε την εμφάνιση!",
    "ar": "غير المظهر!",
    "fi": "Vaihda ulkoasua!",
    "sv": "Ändra utseendet!",
    "ru": "Изменить внешний вид!",
    "tr": "Görünümü değiştir!",
    "fa": "ظاهر را تغییر بده!",
    "ps": "بڼه بدل کړئ!",
    "ur": "ظاہری شکل تبدیل کریں!",
    "hi": "दिखावट बदलें!",
    "si": "පෙනුම වෙනස් කරන්න!",
    "ta": "வெளிப்பதை மாற்று!",
    "ne": "देखाउन परिवर्तन गर्नुहोस्!",
    "bn": "দেখা পরিবর্তন করুন!",
    "th": "เปลี่ยนรูปลักษณ์!",
    "vi": "Thay đổi giao diện!",
    "id": "Ubah tampilan!",
    "ms": "Tukar penampilan!",
    "zh": "更改外观！",
    "ja": "見た目を変更！",
    "ko": "모양 변경!",
    "mi": "Panoni te āhua!",
    "to": "Liliu ma‘u!",
    "gil": "Change the look!",
    "ty": "Faahuri te hi‘o!"
  },

  "menu.settings.actionbar.design.title": {
    "en": "Design actionbar",
    "de": "Design actionbar",
    "fr": "Concevoir la barre d’action",
    "it": "Progetta barra azioni",
    "es": "Diseñar barra de acción",
    "pt": "Design da barra de ações",
    "is": "Hanna aðgerðastiku",
    "el": "Σχεδιασμός γραμμής ενεργειών",
    "ar": "تصميم شريط الإجراءات",
    "fi": "Suunnittele toimintopalkki",
    "sv": "Designa actionbar",
    "ru": "Дизайн панели действий",
    "tr": "Actionbar tasarla",
    "fa": "طراحی نوار عملیات",
    "ps": "د کړنو بار ډیزاین",
    "ur": "ایکشن بار ڈیزائن کریں",
    "hi": "एक्शनबार डिजाइन करें",
    "si": "ක්‍රියා තීරුව නිර්මාණය කරන්න",
    "ta": "செயல் பட்டி வடிவமைக்கவும்",
    "ne": "एक्शनबार डिजाइन गर्नुहोस्",
    "bn": "অ্যাকশনবার ডিজাইন করুন",
    "th": "ออกแบบแถบการกระทำ",
    "vi": "Thiết kế thanh hành động",
    "id": "Rancang bar aksi",
    "ms": "Reka bentuk bar tindakan",
    "zh": "设计操作栏",
    "ja": "アクションバーをデザイン",
    "ko": "액션바 디자인",
    "mi": "Hoahoa paepae mahi",
    "to": "Fakafolau paipa ngāue",
    "gil": "Design actionbar",
    "ty": "Faanahu i te tāpa‘o hana"
  },

  "menu.settings.actionbar.design.description": {
    "en": "Select a template or create your own custom design!",
    "de": "Wählen Sie aus einer der Vorlagen aus oder erstellen Sie Ihr eigenes Design!",
    "fr": "Sélectionnez un modèle ou créez votre propre design!",
    "it": "Seleziona un modello o crea il tuo design personalizzato!",
    "es": "¡Selecciona una plantilla o crea tu propio diseño personalizado!",
    "pt": "Selecione um modelo ou crie seu próprio design personalizado!",
    "is": "Veldu sniðmát eða búðu til þitt eigið sérsniðna útlit!",
    "el": "Επιλέξτε ένα πρότυπο ή δημιουργήστε το δικό σας προσαρμοσμένο σχεδιασμό!",
    "ar": "اختر نموذجًا أو أنشئ تصميمك المخصص!",
    "fi": "Valitse malli tai luo oma mukautettu suunnittelu!",
    "sv": "Välj en mall eller skapa din egen anpassade design!",
    "ru": "Выберите шаблон или создайте собственный дизайн!",
    "tr": "Bir şablon seçin veya kendi özel tasarımınızı oluşturun!",
    "fa": "یک الگو انتخاب کنید یا طراحی سفارشی خود را بسازید!",
    "ps": "یو ټیمپلیټ غوره کړئ یا خپله دودیز ډیزاین رامینځته کړئ!",
    "ur": "کوئی ٹیمپلیٹ منتخب کریں یا اپنی مرضی کے مطابق ڈیزائن بنائیں!",
    "hi": "एक टेम्पलेट चुनें या अपनी खुद की कस्टम डिज़ाइन बनाएं!",
    "si": "ක්‍රියා තීරුවේ සෑදවුම් සලකුණු තෝරන්න හෝ ඔබේම අභිරුචිකෘත නිර්මාණය සකසන්න!",
    "ta": "ஒரு வடிவமைப்பைத் தேர்ந்தெடுக்க அல்லது உங்கள் சொந்த தனிப்பயன் வடிவமைப்பை உருவாக்கவும்!",
    "ne": "टेम्प्लेट चयन गर्नुहोस् वा आफ्नो कस्टम डिजाइन सिर्जना गर्नुहोस्!",
    "bn": "একটি টেমপ্লেট নির্বাচন করুন বা আপনার নিজস্ব কাস্টম ডিজাইন তৈরি করুন!",
    "th": "เลือกเทมเพลตหรือสร้างการออกแบบที่กำหนดเองของคุณเอง!",
    "vi": "Chọn mẫu hoặc tạo thiết kế tùy chỉnh của riêng bạn!",
    "id": "Pilih template atau buat desain kustom Anda sendiri!",
    "ms": "Pilih templat atau cipta reka bentuk tersuai sendiri!",
    "zh": "选择一个模板或创建您自己的定制设计！",
    "ja": "テンプレートを選択するか、自分だけのカスタムデザインを作成！",
    "ko": "템플릿을 선택하거나 나만의 맞춤 디자인을 만드세요!",
    "mi": "Tīpako i tētahi tauira, me te hanga i tō hoahoa ritenga ake!",
    "to": "Fili ha tēpileti pe hanga ho‘o founga fakalahi!",
    "gil": "Select a template or create your own custom design!",
    "ty": "Fili i te hoho‘a aore ra faaohipa i tā outou hoahoa faanahoraa!"
  },

  "menu.settings.actionbar.design.preview": {
    "en": "Here is a preview of your selected design. It shows all possible variables at once.\n\nScreen saver: %{screen_saver}%§r\n\nIn the menu: %{ui}%§r\n\nNormal: %{normal}%§r\n\nPaused: %{paused}%§r\n\nFinished (CM only): %{finished}%§r\n\nDay-Time: %{day}%§r\n\nDo you like it?",
    "de": "Hier ist eine Vorschau deines Designs. Es zeigt alle möglichen Zeiten auf einmal:\n\nBildschirmschoner: %{screen_saver}%§r\n\nIm Menü: %{ui}%§r\n\nNormal: %{normal}%§r\n\nPausiert: %{paused}%§r\n\nAbgeschlossen (Nur im CM): %{finished}%§r\n\nTageszeit: %{day}%§r\n\nGefällt es dir?",
    "fr": "Voici un aperçu de votre design sélectionné. Il affiche toutes les variables possibles à la fois:\n\nÉconomiseur d’écran: %{screen_saver}%§r\n\nDans le menu: %{ui}%§r\n\nNormal: %{normal}%§r\n\nEn pause: %{paused}%§r\n\nTerminé (mode défi seulement): %{finished}%§r\n\nHeure du jour: %{day}%§r\n\nÇa vous plaît?",
    "it": "Ecco un’anteprima del design selezionato. Mostra tutte le variabili possibili in una volta:\n\nSalvaschermo: %{screen_saver}%§r\n\nNel menu: %{ui}%§r\n\nNormale: %{normal}%§r\n\nIn pausa: %{paused}%§r\n\nCompletato (solo CM): %{finished}%§r\n\nOra diurna: %{day}%§r\n\nTi piace?",
    "es": "Aquí tienes una vista previa de tu diseño seleccionado. Muestra todas las variables posibles de una vez:\n\nSalvapantallas: %{screen_saver}%§r\n\nEn el menú: %{ui}%§r\n\nNormal: %{normal}%§r\n\nEn pausa: %{paused}%§r\n\nTerminado (solo modo desafío): %{finished}%§r\n\nHora del día: %{day}%§r\n\n¿Te gusta?",
    "pt": "Aqui está uma prévia do design selecionado. Mostra todas as variáveis possíveis de uma vez:\n\nProtetor de tela: %{screen_saver}%§r\n\nNo menu: %{ui}%§r\n\nNormal: %{normal}%§r\n\nPausado: %{paused}%§r\n\nConcluído (apenas CM): %{finished}%§r\n\nHora do dia: %{day}%§r\n\nVocê gosta?",
    "is": "Hér er forskoðun á valinni hönnun. Hún sýnir öll möguleg breytur í einu:\n\nSkjáverndari: %{screen_saver}%§r\n\nÍ valmynd: %{ui}%§r\n\nVenjulegt: %{normal}%§r\n\nStöðvað: %{paused}%§r\n\nLokið (aðeins CM): %{finished}%§r\n\nDagstund: %{day}%§r\n\nLíkar þér þetta?",
    "el": "Εδώ είναι μια προεπισκόπηση του επιλεγμένου σχεδίου. Εμφανίζει όλες τις πιθανές μεταβλητές ταυτόχρονα:\n\nΠροστασία οθόνης: %{screen_saver}%§r\n\nΣτο μενού: %{ui}%§r\n\nΚανονικό: %{normal}%§r\n\nΣε παύση: %{paused}%§r\n\nΟλοκληρώθηκε (μόνο CM): %{finished}%§r\n\nΏρα ημέρας: %{day}%§r\n\nΣου αρέσει;",
    "ar": "إليك معاينة للتصميم المحدد. يعرض جميع المتغيرات الممكنة مرة واحدة:\n\nشاشة التوقف: %{screen_saver}%§r\n\nفي القائمة: %{ui}%§r\n\nعادي: %{normal}%§r\n\nمتوقف: %{paused}%§r\n\nمكتمل (الوضع التحدي فقط): %{finished}%§r\n\nوقت النهار: %{day}%§r\n\nهل يعجبك؟",
    "fi": "Tässä on esikatselu valitsemastasi suunnittelusta. Näyttää kaikki mahdolliset muuttujat kerralla:\n\nNäytönsäästäjä: %{screen_saver}%§r\n\nValikossa: %{ui}%§r\n\nNormaali: %{normal}%§r\n\nTauolla: %{paused}%§r\n\nValmis (vain CM): %{finished}%§r\n\nPäivän aika: %{day}%§r\n\nPidätkö siitä?",
    "sv": "Här är en förhandsgranskning av din valda design. Visar alla möjliga variabler på en gång:\n\nSkärmsläckare: %{screen_saver}%§r\n\nI menyn: %{ui}%§r\n\nNormal: %{normal}%§r\n\nPausad: %{paused}%§r\n\nAvslutad (endast CM): %{finished}%§r\n\nDagtid: %{day}%§r\n\nGillar du det?",
    "ru": "Вот предварительный просмотр выбранного дизайна. Показывает все возможные переменные сразу:\n\nЗаставка: %{screen_saver}%§r\n\nВ меню: %{ui}%§r\n\nОбычный: %{normal}%§r\n\nПриостановлен: %{paused}%§r\n\nЗавершён (только CM): %{finished}%§r\n\nДневное время: %{day}%§r\n\nНравится?",
    "tr": "Seçtiğiniz tasarımın önizlemesi burada. Tüm olası değişkenleri aynı anda gösterir:\n\nEkran koruyucu: %{screen_saver}%§r\n\nMenüde: %{ui}%§r\n\nNormal: %{normal}%§r\n\nDuraklatıldı: %{paused}%§r\n\nTamamlandı (yalnızca CM): %{finished}%§r\n\nGündüz saati: %{day}%§r\n\nBeğendiniz mi?",
    "fa": "در اینجا پیش‌نمایش طراحی شما آمده است. همه متغیرهای ممکن را یک‌جا نمایش می‌دهد:\n\nمحافظ صفحه: %{screen_saver}%§r\n\nدر منو: %{ui}%§r\n\nعادی: %{normal}%§r\n\nموقوف: %{paused}%§r\n\nتمام‌شده (فقط CM): %{finished}%§r\n\nزمان روز: %{day}%§r\n\nدوست دارید؟",
    "ps": "دلته ستاسو د غوره شوي ډیزاین مخکتنه ده. دا ټول احتمالي متغیرونه په یو ځل ښیي:\n\nد سکرین ساتونکی: %{screen_saver}%§r\n\nپه مینو کې: %{ui}%§r\n\nمعمول: %{normal}%§r\n\nتم شوی: %{paused}%§r\n\nپای ته رسیدلی (یوازې CM): %{finished}%§r\n\nد ورځې وخت: %{day}%§r\n\nایا تاسو ورته خوښ شو؟",
    "ur": "یہاں آپ کے منتخب کردہ ڈیزائن کا پیش نظارہ ہے۔ یہ تمام ممکنہ متغیرات ایک ساتھ دکھاتا ہے:\n\nاسکرین سیور: %{screen_saver}%§r\n\nمینو میں: %{ui}%§r\n\nنارمل: %{normal}%§r\n\nروکا ہوا: %{paused}%§r\n\nمکمل (صرف CM): %{finished}%§r\n\nدن کا وقت: %{day}%§r\n\nکیا آپ کو پسند آیا؟",
    "hi": "यहाँ आपके चुने हुए डिज़ाइन का पूर्वावलोकन है। यह सभी संभावित वेरिएबल एक साथ दिखाता है:\n\nस्क्रीन सेवर: %{screen_saver}%§r\n\nमेनू में: %{ui}%§r\n\nसाधारण: %{normal}%§r\n\nरुका हुआ: %{paused}%§r\n\nपूरा हुआ (केवल CM): %{finished}%§r\n\nदिने का समय: %{day}%§r\n\nक्या आपको पसंद है?",
    "si": "ඔබ තෝරාගත් නිර්මාණයේ පෙරදැරි දැක්ම මෙන්න. එකවර සියලුම හැකිතාක් වෙනස්කම් පෙන්වයි:\n\nතිර රදවන උපකරණය: %{screen_saver}%§r\n\nමේනු තුළ: %{ui}%§r\n\nසාමාන්‍ය: %{normal}%§r\n\nතරමක් නතර: %{paused}%§r\n\nසම්පූර්ණ (CM හි පමණි): %{finished}%§r\n\nදිවා කාලය: %{day}%§r\n\nඔබට එය කැමතිද?",
    "ta": "இங்கே உங்கள் தேர்ந்தெடுத்த வடிவமைப்பின் முன்னோட்டம் உள்ளது. இது ஒரே நேரத்தில் அனைத்து மாறிலிகளையும் காட்டுகிறது:\n\nஸ்க்ரீன் சேவரர்: %{screen_saver}%§r\n\nமெனு: %{ui}%§r\n\nஇயல்பானது: %{normal}%§r\n\nஇடைநிறுத்தப்பட்டது: %{paused}%§r\n\nநிறைவடைந்தது (CM மட்டுமே): %{finished}%§r\n\nநாள் நேரம்: %{day}%§r\n\nநீங்கள் இது பிடிக்கும்?",
    "ne": "यहाँ तपाईँले छान्नुभएको डिजाइनको पूर्वावलोकन छ। यसले सबै सम्भावित चलहरू एकैसाथ देखाउँछ:\n\nस्क्रीन सेभर: %{screen_saver}%§r\n\nमेनुमा: %{ui}%§r\n\nसामान्य: %{normal}%§r\n\nरोकियो: %{paused}%§r\n\nसम्पूर्ण (CM मात्र): %{finished}%§r\n\nदैनिक समय: %{day}%§r\n\nतपाईँलाई कस्तो लाग्यो?",
    "bn": "এখানে আপনার নির্বাচিত ডিজাইনের একটি পূর্বরূপ আছে। এটি একবারে সমস্ত সম্ভাব্য ভেরিয়েবল দেখায়:\n\nস্ক্রিন সেভার: %{screen_saver}%§r\n\nমেনুতে: %{ui}%§r\n\nসাধারণ: %{normal}%§r\n\nবিরতি: %{paused}%§r\n\nসম্পন্ন (শুধুমাত্র CM): %{finished}%§r\n\nদৈনিক সময়: %{day}%§r\n\nআপনাকে কেমন লাগছে?",
    "th": "นี่คือการดูตัวอย่างการออกแบบที่คุณเลือก มันแสดงตัวแปรทั้งหมดพร้อมกัน:\n\nเซฟหน้าจอ: %{screen_saver}%§r\n\nในเมนู: %{ui}%§r\n\nปกติ: %{normal}%§r\n\nหยุดชั่วคราว: %{paused}%§r\n\nเสร็จสิ้น (เฉพาะ CM): %{finished}%§r\n\nเวลาในวัน: %{day}%§r\n\nคุณชอบไหม?",
    "vi": "Đây là bản xem trước thiết kế bạn đã chọn. Nó hiển thị tất cả các biến có thể cùng lúc:\n\nBảo vệ màn hình: %{screen_saver}%§r\n\nTrong menu: %{ui}%§r\n\nBình thường: %{normal}%§r\n\nTạm dừng: %{paused}%§r\n\nHoàn thành (chỉ CM): %{finished}%§r\n\nThời gian trong ngày: %{day}%§r\n\nBạn có thích không?",
    "id": "Berikut pratinjau desain yang dipilih. Ini menampilkan semua variabel sekaligus:\n\nScreen saver: %{screen_saver}%§r\n\nDi menu: %{ui}%§r\n\nNormal: %{normal}%§r\n\nPa s: %{paused}%§r\n\nSelesai (hanya CM): %{finished}%§r\n\nWaktu siang: %{day}%§r\n\nAnda suka?",
    "ms": "Ini pratonton reka bentuk yang dipilih. Ia memaparkan semua pembolehubah serentak:\n\nPenjimat skrin: %{screen_saver}%§r\n\nDalam menu: %{ui}%§r\n\nNormal: %{normal}%§r\n\nDihenti: %{paused}%§r\n\nSelesai (hanya CM): %{finished}%§r\n\nMasa harian: %{day}%§r\n\nAnda suka?",
    "zh": "这是您所选设计的预览。它一次显示所有可能的变量：\n\n屏幕保护：%{screen_saver}%§r\n\n在菜单中：%{ui}%§r\n\n正常：%{normal}%§r\n\n已暂停：%{paused}%§r\n\n完成（仅 CM）：%{finished}%§r\n\n白天时间：%{day}%§r\n\n您喜欢吗？",
    "ja": "選択したデザインのプレビューです。すべての変数を同時に表示します：\n\nスクリーンセーバー：%{screen_saver}%§r\n\nメニュー：%{ui}%§r\n\n通常：%{normal}%§r\n\n一時停止：%{paused}%§r\n\n完了（CMのみ）：%{finished}%§r\n\n昼の時間：%{day}%§r\n\n気に入りましたか？",
    "ko": "선택한 디자인 미리보기입니다. 가능한 모든 변수를 한 번에 표시합니다:\n\n화면 보호기: %{screen_saver}%§r\n\n메뉴에서: %{ui}%§r\n\n일반: %{normal}%§r\n\n일시 중지: %{paused}%§r\n\n완료 (CM 전용): %{finished}%§r\n\n주간 시간: %{day}%§r\n\n마음에 드시나요?",
    "mi": "Anei he ātaahua o tō hoahoa kua tohua. E whakaatu ana i ngā panonitanga katoa i te wa kotahi:\n\nTiaki mata: %{screen_saver}%§r\n\nI te tahua: %{ui}%§r\n\nPātea: %{normal}%§r\n\nWhakakorea: %{paused}%§r\n\nKua oti (CM anake): %{finished}%§r\n\nWā rā: %{day}%§r\n\nE pai ana ki a koe?",
    "to": "Hili ha foakiata faka‘ali‘ali ‘o ho‘o founga. ‘Oku fakahā ai e ngaahi liliu kotoa pē ‘i he taimi ko e taha:\n\nTātatau paepala: %{screen_saver}%§r\n\n‘I he menū: %{ui}%§r\n\nFakatō: %{normal}%§r\n\nTāpulo: %{paused}%§r\n\n‘Oku ʻo! (CM pe): %{finished}%§r\n\nTaimi ‘aho: %{day}%§r\n\nOku ke fiefia?",
    "gil": "Here is a preview of your selected design. It shows all possible variables at once.\n\nScreen saver: %{screen_saver}%§r\n\nIn the menu: %{ui}%§r\n\nNormal: %{normal}%§r\n\nPaused: %{paused}%§r\n\nFinished (CM only): %{finished}%§r\n\nDay-Time: %{day}%§r\n\nDo you like it?",
    "ty": "E tuu nei te hohoa faahiahia o to outou haapa‘oraa i mairi. E faaite atoa i te mau tauiraa atoa i te hoê taime:\n\nTaputapu tiro mata: %{screen_saver}%§r\n\nI roto i te fare haamaramarama: %{ui}%§r\n\nNoi noa: %{normal}%§r\n\nTaofe: %{paused}%§r\n\nUa oti (CM anake): %{finished}%§r\n\nTaime a‘e mahana: %{day}%§r\n\nE hina‘aro outou ia?"
  },

  "menu.settings.actionbar.design.preview.apply": {
    "en": "§aApply!",
    "de": "§aAnwenden!",
    "fr": "§aAppliquer!",
    "it": "§aApplica!",
    "es": "§a¡Aplicar!",
    "pt": "§aAplicar!",
    "is": "§aBeita!",
    "el": "§aΕφαρμογή!",
    "ar": "§aتطبيق!",
    "fi": "§aKäytä!",
    "sv": "§aTillämpa!",
    "ru": "§aПрименить!",
    "tr": "§aUygula!",
    "fa": "§aاعمال!",
    "ps": "§aغواړئ!",
    "ur": "§aلاگو کریں!",
    "hi": "§aलागू!",
    "si": "§aඅයදුම් කරන්න!",
    "ta": "§aசெயல்படுத்த!",
    "ne": "§aलागु!",
    "bn": "§aপ্রয়োগ করুন!",
    "th": "§aใช้!",
    "vi": "§aÁp dụng!",
    "id": "§aTerapkan!",
    "ms": "§aTerap!",
    "zh": "§a应用！",
    "ja": "§a適用！",
    "ko": "§a적용!",
    "mi": "§aWhakamahia!",
    "to": "§aFakaaoga!",
    "gil": "§aApply!",
    "ty": "§aFaatupu!"
  },


  /*------------------------
    Menu - Dictionary
  -------------------------*/

  "menu.settings.dictionary.title": {
    "en": "About",
    "de": version_info.version,
    "fr": "À propos",
    "it": "Informazioni",
    "es": "Acerca de",
    "pt": "Sobre",
    "is": "Um",
    "el": "Σχετικά",
    "ar": "حول",
    "fi": "Tietoja",
    "sv": "Om",
    "ru": "О программе",
    "tr": "Hakkında",
    "fa": "درباره",
    "ps": "په اړه",
    "ur": "کے بارے میں",
    "hi": "के बारे में",
    "si": "වශයෙන්",
    "ta": "பற்றி",
    "ne": "बारेमा",
    "bn": "সম্পর্কে",
    "th": "เกี่ยวกับ",
    "vi": "Giới thiệu",
    "id": "Tentang",
    "ms": "Mengenai",
    "zh": "关于",
    "ja": "概要",
    "ko": "정보",
    "mi": "Mō",
    "to": "Mō maʻu",
    "gil": "About",
    "ty": "E pāpū"
  },

  "menu.settings.dictionary.text": {
    "en": "Name: %{name}%\nVersion: %{version}% (%{build}%)\nRelease Type: %{release_type}%\nEdition: %{edition}%\nBuild Date: %{build_date}%\n\n%{license}%",
    "de": "Name: %{name}%\nVersion: %{version}% (%{build}%)\nRelease Type: %{release_type}%\nEdition: %{edition}%\nBuild Datum: %{build_date}%\n\n%{license}%",
    "fr": "Nom: %{name}%\nVersion: %{version}% (%{build}%)\nType de publication: %{release_type}%\nÉdition: %{edition}%\nDate de compilation: %{build_date}%\n\n%{license}%",
    "it": "Nome: %{name}%\nVersione: %{version}% (%{build}%)\nTipo di release: %{release_type}%\nEdizione: %{edition}%\nData build: %{build_date}%\n\n%{license}%",
    "es": "Nombre: %{name}%\nVersión: %{version}% (%{build}%)\nTipo de lanzamiento: %{release_type}%\nEdición: %{edition}%\nFecha de compilación: %{build_date}%\n\n%{license}%",
    "pt": "Nome: %{name}%\nVersão: %{version}% (%{build}%)\nTipo de release: %{release_type}%\nEdição: %{edition}%\nData de build: %{build_date}%\n\n%{license}%",
    "is": "Nafn: %{name}%\nÚtgáfa: %{version}% (%{build}%)\nGerð útgáfu: %{release_type}%\nÚtgáfa: %{edition}%\nUppbyggingardagur: %{build_date}%\n\n%{license}%",
    "el": "Όνομα: %{name}%\nΈκδοση: %{version}% (%{build}%)\nΤύπος έκδοσης: %{release_type}%\nΈκδοση: %{edition}%\nΗμερομηνία κατασκευής: %{build_date}%\n\n%{license}%",
    "ar": "الاسم: %{name}%\nالإصدار: %{version}% (%{build}%)\nنوع الإصدار: %{release_type}%\nالطبعة: %{edition}%\nتاريخ البناء: %{build_date}%\n\n%{license}%",
    "fi": "Nimi: %{name}%\nVersio: %{version}% (%{build}%)\nJulkaisutyyppi: %{release_type}%\nPainos: %{edition}%\nKäännöspäivä: %{build_date}%\n\n%{license}%",
    "sv": "Namn: %{name}%\nVersion: %{version}% (%{build}%)\nUtgåvetyp: %{release_type}%\nUpplaga: %{edition}%\nByggdatum: %{build_date}%\n\n%{license}%",
    "ru": "Название: %{name}%\nВерсия: %{version}% (%{build}%)\nТип релиза: %{release_type}%\nРедакция: %{edition}%\nДата сборки: %{build_date}%\n\n%{license}%",
    "tr": "Ad: %{name}%\nSürüm: %{version}% (%{build}%)\nYayın Türü: %{release_type}%\nBasım: %{edition}%\nOluşturma Tarihi: %{build_date}%\n\n%{license}%",
    "fa": "نام: %{name}%\nنسخه: %{version}% (%{build}%)\nنوع انتشار: %{release_type}%\nویرایش: %{edition}%\nتاریخ ساخت: %{build_date}%\n\n%{license}%",
    "ps": "نوم: %{name}%\nنسخه: %{version}% (%{build}%)\nد خوشې کولو ډول: %{release_type}%\nایډیشن: %{edition}%\nد جوړونې نیټه: %{build_date}%\n\n%{license}%",
    "ur": "نام: %{name}%\nورژن: %{version}% (%{build}%)\nریلیز کی قسم: %{release_type}%\nایڈیشن: %{edition}%\nبلڈ تاریخ: %{build_date}%\n\n%{license}%",
    "hi": "नाम: %{name}%\nसंस्करण: %{version}% (%{build}%)\nरिलीज़ प्रकार: %{release_type}%\nसंस्करण: %{edition}%\nबिल्ड तिथि: %{build_date}%\n\n%{license}%",
    "si": "නම: %{name}%\nපරිවර්තනය: %{version}% (%{build}%)\nහැඳින්වීම: %{release_type}%\nසංස්කරණය: %{edition}%\nගොඩනැගීම් දිනය: %{build_date}%\n\n%{license}%",
    "ta": "பெயர்: %{name}%\nபதிப்பு: %{version}% (%{build}%)\nவெளியீட்டு வகை: %{release_type}%\nஒழுக்கம்: %{edition}%\nபில்ட் தேதி: %{build_date}%\n\n%{license}%",
    "ne": "नाम: %{name}%\nसंस्करण: %{version}% (%{build}%)\nरिलीज प्रकार: %{release_type}%\nसंपादन: %{edition}%\nबिल्ड मिति: %{build_date}%\n\n%{license}%",
    "bn": "নাম: %{name}%\nসংস্করণ: %{version}% (%{build}%)\nরিলিজ টাইপ: %{release_type}%\nএডিশন: %{edition}%\nবিল্ড তারিখ: %{build_date}%\n\n%{license}%",
    "th": "ชื่อ: %{name}%\nรุ่น: %{version}% (%{build}%)\nประเภท: %{release_type}%\nรุ่นพิมพ์: %{edition}%\nวันที่สร้าง: %{build_date}%\n\n%{license}%",
    "vi": "Tên: %{name}%\nPhiên bản: %{version}% (%{build}%)\nLoại phát hành: %{release_type}%\nPhiên bản: %{edition}%\nNgày tạo: %{build_date}%\n\n%{license}%",
    "id": "Nama: %{name}%\nVersi: %{version}% (%{build}%)\nTipe rilis: %{release_type}%\nEdisi: %{edition}%\nTanggal build: %{build_date}%\n\n%{license}%",
    "ms": "Nama: %{name}%\nVersi: %{version}% (%{build}%)\nJenis keluaran: %{release_type}%\nEdisi: %{edition}%\nTarikh bina: %{build_date}%\n\n%{license}%",
    "zh": "名称: %{name}%\n版本: %{version}% (%{build}%)\n发布类型: %{release_type}%\n版本: %{edition}%\n构建日期: %{build_date}%\n\n%{license}%",
    "ja": "名前: %{name}%\nバージョン: %{version}% (%{build}%)\nリリース種別: %{release_type}%\nエディション: %{edition}%\nビルド日: %{build_date}%\n\n%{license}%",
    "ko": "이름: %{name}%\n버전: %{version}% (%{build}%)\n릴리즈 유형: %{release_type}%\n에디션: %{edition}%\n빌드 날짜: %{build_date}%\n\n%{license}%",
    "mi": "Ingoa: %{name}%\nPutanga: %{version}% (%{build}%)\nMomo whakaputanga: %{release_type}%\nWhiwhinga: %{edition}%\nRā hanga: %{build_date}%\n\n%{license}%",
    "to": "Hingoa: %{name}%\nFa‘anodál: %{version}% (%{build}%)\nKoloa: %{release_type}%\nSi‘i: %{edition}%\nTaʻu hanga: %{build_date}%\n\n%{license}%",
    "gil": "Name: %{name}%\nVersion: %{version}% (%{build}%)\nRelease Type: %{release_type}%\nEdition: %{edition}%\nBuild Date: %{build_date}%\n\n%{license}%",
    "ty": "I‘oa: %{name}%\nPutuputuraa: %{version}% (%{build}%)\nMāra‘ihia fa‘atōpū: %{release_type}%\nPutuputuraa: %{edition}%\nTaime haapiiraa: %{build_date}%\n\n%{license}%"
  },

  "menu.settings.dictionary.text.utc_empty": {
    "en": "%{time}% ago\n\n§7Note: Set the time zone to see detailed information",
    "de": "%{time}% her\n\n§7Hinweis: Stelle die Zeitzone ein, um detaillierte Informationen zu sehen",
    "fr": "il y a %{time}%\n\n§7Remarque: définissez le fuseau horaire pour voir les détails",
    "it": "%{time}% fa\n\n§7Nota: Imposta il fuso orario per vedere i dettagli",
    "es": "hace %{time}%\n\n§7Nota: Ajusta la zona horaria para ver información detallada",
    "pt": "há %{time}%\n\n§7Nota: Defina o fuso horário para ver mais detalhes",
    "is": "fyrir %{time}% síðan\n\n§7Athugasemd: Stilltu tímabelti til að sjá upplýsingar",
    "el": "πριν %{time}%\n\n§7Σημείωση: Ρυθμίστε τη ζώνη ώρας για λεπτομέρειες",
    "ar": "منذ %{time}%\n\n§7ملاحظة: اضبط المنطقة الزمنية لرؤية التفاصيل",
    "fi": "%{time}% sitten\n\n§7Huom: Aseta aikavyöhyke nähdäksesi yksityiskohdat",
    "sv": "för %{time}% sedan\n\n§7Obs: Ställ in tidszon för detaljer",
    "ru": "%{time}% назад\n\n§7Примечание: Установите часовой пояс для подробностей",
    "tr": "%{time}% önce\n\n§7Not: Ayrıntılar için saat dilimini ayarlayın",
    "fa": "%{time}% پیش\n\n§7توجه: برای جزئیات منطقه زمانی را تنظیم کنید",
    "ps": "%{time}% مخکې\n\n§7یادونه: د تفصیلاتو لپاره وخت سیمه وټاکئ",
    "ur": "%{time}% پہلے\n\n§7نوٹ: تفصیلات دیکھنے کے لیے ٹائم زون سیٹ کریں",
    "hi": "%{time}% पहले\n\n§7ध्यान दें: विस्तृत जानकारी के लिए समय क्षेत्र सेट करें",
    "si": "%{time}%කට පෙර\n\n§7සටහන: විස්තර සඳහා කාල කලාපය සකසන්න",
    "ta": "%{time}% முன்\n\n§7குறிப்பு: விரிவான தகவல்களுக்கு நேர மண்டலத்தை அமைக்கவும்",
    "ne": "%{time}% अघि\n\n§7सूचना: विस्तृत जानकारीका लागि समय क्षेत्र सेट गर्नुहोस्",
    "bn": "%{time}% আগে\n\n§7দ্রষ্টব্য: বিস্তারিত জানার জন্য সময় অঞ্চল সেট করুন",
    "th": "%{time}% ที่แล้ว\n\n§7หมายเหตุ: ตั้งค่าเขตเวลาเพื่อดูรายละเอียด",
    "vi": "%{time}% trước\n\n§7Lưu ý: Đặt múi giờ để xem chi tiết",
    "id": "%{time}% lalu\n\n§7Catatan: Atur zona waktu untuk melihat detail",
    "ms": "%{time}% lalu\n\n§7Nota: Tetapkan zon waktu untuk melihat maklumat",
    "zh": "%{time}% 前\n\n§7注意：设置时区以查看详细信息",
    "ja": "%{time}% 前\n\n§7注意: 詳細を見るにはタイムゾーンを設定してください",
    "ko": "%{time}% 전\n\n§7참고: 자세한 정보를 보려면 시간대를 설정하세요",
    "mi": "i mua %{time}%\n\n§7Tuhipoka: Whakaritea te rohe wā mō ngā taipitopito",
    "to": "‘i he % {time}% ‘apu\n\n§7Fakamolemole: Seti e vā taimi ke vakai ki he fakaʻilonga",
    "gil": "%{time}% ago\n\n§7Note: Set the time zone to see detailed information",
    "ty": "i mua e %{time}%\n\n§7Faaaravihi: Hōroa te fenua taime no te ite i te haapiiraa"
  },

  "menu.settings.dictionary.text.build.update": {
    "en": "update time",
    "de": "Zeit zum updaten!",
    "fr": "heure de mise à jour",
    "it": "ora di aggiornamento",
    "es": "hora de actualización",
    "pt": "hora de atualização",
    "is": "uppfærslutími",
    "el": "ώρα ενημέρωσης",
    "ar": "وقت التحديث",
    "fi": "päivitysaika",
    "sv": "uppdateringstid",
    "ru": "время обновления",
    "tr": "güncelleme zamanı",
    "fa": "زمان به‌روزرسانی",
    "ps": "د تازه کولو وخت",
    "ur": "اپ ڈیٹ کا وقت",
    "hi": "अपडेट समय",
    "si": "යාවත්කාලීන කිරීමේ වේලාව",
    "ta": "புதுப்பிப்பு நேரம்",
    "ne": "अद्यावधिक समय",
    "bn": "আপডেট সময়",
    "th": "เวลาอัปเดต",
    "vi": "thời gian cập nhật",
    "id": "waktu pembaruan",
    "ms": "masa kemas kini",
    "zh": "更新时间",
    "ja": "更新時間",
    "ko": "업데이트 시간",
    "mi": "wae o whakahou",
    "to": "taimi tāoanga",
    "gil": "update time",
    "ty": "taime whakahou"
  },

  "menu.settings.dictionary.text.dateformat": {
    "en": "%{month}%/%{day}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "de": "%{day}%.%{month}%.%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
  },

  "menu.settings.dictionary.text.dateformat": {
    "en": "%{month}%/%{day}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "de": "%{day}%.%{month}%.%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "fr": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "it": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "es": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "pt": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "is": "%{day}%.%{month}%.%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "el": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "ar": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "fi": "%{day}%.%{month}%.%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "sv": "%{year}%-%{month}%-%{day}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "ru": "%{day}%.%{month}%.%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "tr": "%{day}%.%{month}%.%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "fa": "%{year}%/%{month}%/%{day}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "ps": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "ur": "%{day}%-%{month}%-%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "hi": "%{day}%-%{month}%-%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "si": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "ta": "%{day}%-%{month}%-%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "ne": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "bn": "%{day}%-%{month}%-%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "th": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "vi": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "id": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "zh": "%{year}%/%{month}%/%{day}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "ja": "%{year}%/%{month}%/%{day}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "ko": "%{year}%.%{month}%.%{day}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "ms": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "mi": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "to": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "gil": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)",
    "ty": "%{day}%/%{month}%/%{year}% %{hours}%:%{minutes}%:%{seconds}% (UTC%{utcOffset}%)"
  },


  "menu.settings.dictionary.changelog.title": {
    "en": "Changelog",
    "fr": "Journal des modifications",
    "it": "Registro modifiche",
    "es": "Historial de cambios",
    "pt": "Registro de alterações",
    "is": "Breytingalisti",
    "el": "Ημερολόγιο αλλαγών",
    "ar": "سجل التغييرات",
    "fi": "Muutosloki",
    "sv": "Ändringslogg",
    "ru": "Список изменений",
    "tr": "Değişiklik günlüğü",
    "fa": "فهرست تغییرات",
    "ps": "د بدلونونو لست",
    "ur": "تبدیلیوں کی فہرست",
    "hi": "परिवर्तन विवरण",
    "si": "වෙනස්කම් සටහන",
    "ta": "மாற்ற வரலாறு",
    "ne": "परिवर्तन इतिहास",
    "bn": "পরিবর্তন তালিকা",
    "th": "รายงานการเปลี่ยนแปลง",
    "vi": "Nhật ký thay đổi",
    "id": "Catatan perubahan",
    "zh": "更新日志",
    "ms": "Log perubahan",
    "ja": "変更履歴",
    "ko": "변경 로그",
    "mi": "Rārangi panoni",
    "to": "Palopa founga",
    "gil": "Changelog",
    "ty": "Faufaa i te mau maitahura"
  },

  "menu.settings.dictionary.changelog.new_features": {
    "en": "New Features",
    "de": "Neue Funktionen",
    "fr": "Nouvelles fonctionnalités",
    "it": "Nuove funzionalità",
    "es": "Nuevas funciones",
    "pt": "Novos recursos",
    "is": "Nýjungar",
    "el": "Νέες λειτουργίες",
    "ar": "ميزات جديدة",
    "fi": "Uusia ominaisuuksia",
    "sv": "Nya funktioner",
    "ru": "Новые функции",
    "tr": "Yeni özellikler",
    "fa": "ویژگی‌های جدید",
    "ps": "نوي ځانګړتیاوې",
    "ur": "نئی خصوصیات",
    "hi": "नई सुविधाएँ",
    "si": "නව විශේෂාංග",
    "ta": "புதிய அம்சங்கள்",
    "ne": "नयाँ सुविधाहरू",
    "bn": "নতুন বৈশিষ্ট্য",
    "th": "คุณสมบัติใหม่",
    "vi": "Tính năng mới",
    "id": "Fitur baru",
    "zh": "新功能",
    "ms": "Ciri baru",
    "ja": "新機能",
    "ko": "새로운 기능",
    "mi": "Ngā āhuatanga hou",
    "to": "Fakafounga foʻi",
    "gil": "New Features",
    "ty": "Huru hou"
  },

  "menu.settings.dictionary.changelog.general_changes": {
    "en": "General Changes",
    "de": "Allgemeine Änderungen",
    "fr": "Changements généraux",
    "it": "Modifiche generali",
    "es": "Cambios generales",
    "pt": "Alterações gerais",
    "is": "Almennar breytingar",
    "el": "Γενικές αλλαγές",
    "ar": "تغييرات عامة",
    "fi": "Yleiset muutokset",
    "sv": "Allmänna ändringar",
    "ru": "Общие изменения",
    "tr": "Genel değişiklikler",
    "fa": "تغییرات عمومی",
    "ps": "عمومي بدلونونه",
    "ur": "عمومی تبدیلیاں",
    "hi": "सामान्य परिवर्तन",
    "si": "සාමාන්‍ය වෙනස්කම්",
    "ta": "பொதுவான மாற்றங்கள்",
    "ne": "सामान्य परिवर्तनहरू",
    "bn": "সাধারণ পরিবর্তন",
    "th": "การเปลี่ยนแปลงทั่วไป",
    "vi": "Thay đổi chung",
    "id": "Perubahan umum",
    "zh": "一般更改",
    "ms": "Perubahan umum",
    "ja": "一般的な変更",
    "ko": "일반 변경사항",
    "mi": "Ngā panoni whānui",
    "to": "Liliu taʻu fakafonua",
    "gil": "General Changes",
    "ty": "Tauraa rahi"
  },

  "menu.settings.dictionary.changelog.bug_fixes": {
    "en": "Bug fixes",
    "de": "Fehlerbehebungen",
    "fr": "Corrections de bugs",
    "it": "Correzioni di bug",
    "es": "Correcciones de errores",
    "pt": "Correções de bugs",
    "is": "Villuleiðréttingar",
    "el": "Επιλύσεις σφαλμάτων",
    "ar": "إصلاحات الأخطاء",
    "fi": "Virheenkorjaukset",
    "sv": "Buggfixar",
    "ru": "Исправление ошибок",
    "tr": "Hata düzeltmeleri",
    "fa": "رفع اشکالات",
    "ps": "د تېروتنو اصلاح",
    "ur": "بگ کی درستیاں",
    "hi": "बग सुधार",
    "si": "දෝෂ නිවරදි කිරීම්",
    "ta": "பிழை திருத்தங்கள்",
    "ne": "बग मेटाउने",
    "bn": "বাগ সংশোধন",
    "th": "การแก้ไขข้อบกพร่อง",
    "vi": "Sửa lỗi",
    "id": "Perbaikan bug",
    "zh": "错误修复",
    "ms": "Pembetulan pepijat",
    "ja": "バグ修正",
    "ko": "버그 수정",
    "mi": "Ngā whakatikanga pepeke",
    "to": "Fakatokanga hūhū",
    "gil": "Bug fixes",
    "ty": "Faufaa hapa"
  },

  "menu.settings.dictionary.changelog.build": {
    "en": "As of %{month}%/%{day}%/%{year}% (%{relative_time}% ago)",
    "de": "Stand %{day}%.%{month}%.%{year}% (%{relative_time}% her)",
    "fr": "Au %{day}%/%{month}%/%{year}% (il y a %{relative_time}%)",
    "it": "Al %{day}%/%{month}%/%{year}% (fa %{relative_time}%)",
    "es": "A partir del %{day}%/%{month}%/%{year}% (hace %{relative_time}%)",
    "pt": "Em %{day}%/%{month}%/%{year}% (há %{relative_time}%)",
    "is": "Frá %{day}%.%{month}%.%{year}% (fyrir %{relative_time}%)",
    "el": "Από %{day}%/%{month}%/%{year}% (πριν %{relative_time}%)",
    "ar": "اعتبارًا من %{day}%/%{month}%/%{year}% (منذ %{relative_time}%)",
    "fi": "Päivämäärä %{day}%.%{month}%.%{year}% (%{relative_time}% sitten)",
    "sv": "Från %{year}%-%{month}%-%{day}% (för %{relative_time} sedan)",
    "ru": "По состоянию на %{day}%.%{month}%.%{year}% (%{relative_time}% назад)",
    "tr": "Tarihi %{day}%.%{month}%.%{year}% itibarıyla (%{relative_time}% önce)",
    "fa": "از %{year}%/%{month}%/%{day}% (%{relative_time}% پیش)",
    "ps": "د %{day}%/%{month}%/%{year}% راهیسې ( %{relative_time}% دمخه)",
    "ur": "کی حیثیت میں %{day}%-%{month}%-%{year}% (%{relative_time}% پہلے)",
    "hi": "%{day}%-%{month}%-%{year}% तक (%{relative_time}% पहले)",
    "si": "%{day}%/%{month}%/%{year}% සිට (%{relative_time}% කාලයට පෙර)",
    "ta": "%{day}%-%{month}%-%{year}% வரை (%{relative_time}% கழித்து)",
    "ne": "%{day}%/%{month}%/%{year}% सम्म (%{relative_time}% पहिले)",
    "bn": "%{day}%-%{month}%-%{year}% পর্যন্ত (%{relative_time}% আগে)",
    "th": "ณ %{day}%/%{month}%/%{year}% (%{relative_time}% ที่แล้ว)",
    "vi": "Tính đến %{day}%/%{month}%/%{year}% (%{relative_time}% trước)",
    "id": "Per %{day}%/%{month}%/%{year}% (%{relative_time}% lalu)",
    "zh": "截至 %{year}%/%{month}%/%{day}% （%{relative_time}% 之前）",
    "ms": "Setakat %{day}%/%{month}%/%{year}% (%{relative_time}% lalu)",
    "ja": "%{year}%/%{month}%/%{day}% 時点 (%{relative_time}% 前)",
    "ko": "%{year}%.%{month}%.%{day}% 기준 (%{relative_time}% 전)",
    "mi": "I te %{day}%/%{month}%/%{year}% (i mua i %{relative_time}%)",
    "to": "Ki he %{day}%/%{month}%/%{year}% (kua % {relative_time}%)",
    "gil": "As of %{month}%/%{day}%/%{year}% (%{relative_time}% ago)",
    "ty": "No %{day}%/%{month}%/%{year}% (i mua i %{relative_time}%)"
  },

  "menu.settings.dictionary.contact.title": {
    "en": "Contact",
    "de": "Kontakt",
    "fr": "Contact",
    "it": "Contatto",
    "es": "Contacto",
    "pt": "Contato",
    "is": "Hafðu samband",
    "el": "Επικοινωνία",
    "ar": "الاتصال",
    "fi": "Yhteystiedot",
    "sv": "Kontakt",
    "ru": "Контакт",
    "tr": "İletişim",
    "fa": "تماس",
    "ps": "اړیکه",
    "ur": "رابطہ",
    "hi": "संपर्क",
    "si": "සම්බන්ධ වන්න",
    "ta": "தொடர்பு",
    "ne": "सम्पर्क",
    "bn": "যোগাযোগ",
    "th": "ติดต่อ",
    "vi": "Liên hệ",
    "id": "Kontak",
    "zh": "联系",
    "ms": "Hubungi",
    "ja": "連絡先",
    "ko": "연락처",
    "mi": "Whakapā",
    "to": "Feʻungaō ki he",
    "gil": "Contact",
    "ty": "Vā"
  },

  "menu.settings.dictionary.contact.description": {
    "en": "If you want to report a bug, need help, or have suggestions to improve the project, you can reach me via these platforms:",
    "de": "Wenn du einen Fehler melden, Hilfe benötigst oder Verbesserungsvorschläge für das Projekt hast, kannst du mich über diese Plattformen erreichen:",
    "fr": "Si vous souhaitez signaler un bug, avez besoin d’aide ou des suggestions pour améliorer le projet, vous pouvez me contacter via ces plateformes:",
    "it": "Se vuoi segnalare un bug, hai bisogno di aiuto o suggerimenti per migliorare il progetto, puoi contattarmi tramite queste piattaforme:",
    "es": "Si quieres reportar un error, necesitas ayuda o tienes sugerencias para mejorar el proyecto, puedes contactarme a través de estas plataformas:",
    "pt": "Se quiser relatar um bug, precisar de ajuda ou tiver sugestões para melhorar o projeto, você pode me alcançar através destas plataformas:",
    "is": "Ef þú vilt tilkynna villu, þarft aðstoð eða ábendingar til að bæta verkefnið, getur þú haft samband við mig í gegnum þessar síður:",
    "el": "Αν θέλετε να αναφέρετε ένα σφάλμα, χρειάζεστε βοήθεια ή έχετε προτάσεις βελτίωσης του έργου, μπορείτε να με βρείτε μέσω αυτών των πλατφορμών:",
    "ar": "إذا كنت تريد الإبلاغ عن خطأ، تحتاج مساعدة أو لديك اقتراحات لتحسين المشروع، يمكنك التواصل معي عبر هذه المنصات:",
    "fi": "Jos haluat raportoida virheen, tarvitset apua tai ehdotuksia projektin parantamiseksi, voit tavoittaa minut näiden alustojen kautta:",
    "sv": "Om du vill rapportera ett fel, behöver hjälp eller har förslag på förbättringar av projektet kan du nå mig via dessa plattformar:",
    "ru": "Если вы хотите сообщить об ошибке, нужна помощь или есть предложения по улучшению проекта, вы можете связаться со мной через эти платформы:",
    "tr": "Bir hata bildirmek, yardıma ihtiyacınız olmak veya projeyi geliştirmek için önerileriniz varsa, bu platformlar aracılığıyla bana ulaşabilirsiniz:",
    "fa": "اگر می‌خواهید باگ گزارش کنید، به کمک نیاز دارید یا پیشنهاداتی برای بهبود پروژه دارید، می‌توانید از طریق این پلتفرم‌ها با من در ارتباط باشید:",
    "ps": "که غواړې د یو تېروتنې راپور ورکړې، مرستې ته اړتیا لرې یا د پروژې د ښه کولو وړاندیزونه لرې، کولی شې له دې پلاتفورمونو سره ما ته ورسېږې:",
    "ur": "اگر آپ کوئی بگ رپورٹ کرنا چاہتے ہیں، مدد درکار ہے یا پروجیکٹ کو بہتر بنانے کے لیے تجاویز ہیں تو آپ مجھے ان پلیٹ فارمز کے ذریعے رابطہ کر سکتے ہیں:",
    "hi": "यदि आप कोई बग रिपोर्ट करना चाहते हैं, मदद चाहिए या परियोजना में सुधार के सुझाव हैं, तो आप मुझे इन प्लेटफ़ॉर्म्स के माध्यम से संपर्क कर सकते हैं:",
    "si": "ඔබට දෝෂයක් පැවසීමට, උදව් අවශ්‍ය නම් හෝ ව්‍යාපෘතිය වඩා හොඳ කිරීමට යෝජනා තිබේ නම්, පහත වේදිකා හරහා මට සම්බන්ධ විය හැක:",
    "ta": "யாரிடம் பிழை அறிக்கையிட, உதவி தேவை அல்லது திட்டத்தை மேம்படுத்த யோசனைகள் இருந்தால், இந்த தளங்கள் மூலம் என்னை தொடர்பு கொள்ளலாம்:",
    "ne": "यदि तपाईंले कुनै बग रिपोर्ट गर्न चाहनुहुन्छ, सहयोग चाहिन्छ वा परियोजना सुधारका लागि सुझावहरू छन् भने, यी प्लेटफॉर्महरू मार्फत मसँग सम्पर्क गर्न सक्नुहुन्छ:",
    "bn": "যদি আপনি কোনো বাগ রিপোর্ট করতে চান, সাহায্য প্রয়োজন বা প্রকল্প উন্নয়নের পরামর্শ থাকে, তাহলে আপনি এই প্ল্যাটফর্মগুলির মাধ্যমে আমার সাথে যোগাযোগ করতে পারেন:",
    "th": "หากคุณต้องการรายงานบั๊ก ต้องการความช่วยเหลือ หรือมีข้อเสนอแนะเพื่อปรับปรุงโครงการ คุณสามารถติดต่อฉันผ่านแพลตฟอร์มเหล่านี้ได้:",
    "vi": "Nếu bạn muốn báo lỗi, cần trợ giúp hoặc có đề xuất để cải thiện dự án, bạn có thể liên hệ tôi qua các nền tảng sau:",
    "id": "Jika Anda ingin melaporkan bug, butuh bantuan, atau memiliki saran untuk meningkatkan proyek, Anda dapat menghubungi saya melalui platform-platform ini:",
    "zh": "如果您想报告错误、需要帮助或有改进项目的建议，可以通过以下平台与我联系：",
    "ms": "Jika anda ingin melaporkan pepijat, memerlukan bantuan, atau mempunyai cadangan untuk memperbaiki projek, anda boleh menghubungi saya melalui platform ini:",
    "ja": "バグを報告したい、助けが必要、またはプロジェクト改善の提案がある場合は、次のプラットフォームからご連絡ください：",
    "ko": "버그를 보고하거나 도움이 필요하거나 프로젝트 개선 제안이 있는 경우 다음 플랫폼을 통해 연락할 수 있습니다:",
    "mi": "Mēnā kei te hiahia koe ki te pūrongo hapa, hiahia āwhina rānei, kei te whai whakaaro mō te whakapai ake i te kaupapa, ka taea e koe te whakapā atu ki ahau mā ēnei papanga:",
    "to": "Kapau ʻoku ke fie lipooti he palopalema, fiemaʻu ʻa tokoni pe ʻi ai ha manatu ke fakalelei ʻa e polokalama, ʻe lava ke ke fetuʻutaki mai kia au ʻi he ngaa fononga ko ʻeni:",
    "gil": "If you want to report a bug, need help, or have suggestions to improve the project, you can reach me via these platforms:",
    "ty": "Mai te mea e hinaaro nei oe i te ripoata hapa, me te awhi me te tahi mau faanahoraa no te faaiti i te hoê papa here, e nehenehe ta oe e fetia‘i ia‘u ma te mau fenua rave‘a nei:"
  },

  "menu.settings.dictionary.contact.sd": {
    "en": "Dump SD"
  },

  "menu.settings.dictionary.contact.sd.mode_0": {
    "en": "via private chat",
    "de": "über privaten Chat",
    // Fallbacks
    "fr": "via chat privé",
    "it": "tramite chat privato",
    "es": "vía chat privado",
    "pt": "via chat privado",
    "is": "í gegnum einkaspjall",
    "el": "μέσω ιδιωτικής συνομιλίας",
    "ar": "عبر دردشة خاصة",
    "fi": "yksityisen chatin kautta",
    "sv": "via privat chatt",
    "ru": "через приватный чат",
    "tr": "özel sohbet üzerinden",
    "fa": "از طریق گفتگوی خصوصی",
    "ps": "د خصوصي خبرې اترې له لارې",
    "ur": "نجی چیٹ کے ذریعے",
    "hi": "निजी चैट के माध्यम से",
    "si": "පෞද්ගලික සංවාදය හරහා",
    "ta": "தனிப்பட்ட உரையாடலின் மூலம்",
    "ne": "निजी च्याट मार्फत",
    "bn": "ব্যক্তিগত চ্যাট মারফত",
    "th": "ผ่านแชทส่วนตัว",
    "vi": "qua trò chuyện riêng",
    "id": "melalui obrolan pribadi",
    "zh": "通过私人聊天",
    "ms": "melalui sembang peribadi",
    "ja": "プライベートチャット経由で",
    "ko": "비공개 채팅을 통해",
    "mi": "ma te korerorero tūmataiti",
    "to": "kau ai he talanoa tokotaha",
    "gil": "via private chat",
    "ty": "ma te ta‘o pāporo fa‘ahiti"
  },

  "menu.settings.dictionary.contact.sd.mode_1": {
    "en": "via server console",
    "de": "über Server-Konsole",
    "fr": "via console du serveur",
    "it": "tramite console del server",
    "es": "vía consola del servidor",
    "pt": "via console do servidor",
    "is": "í gegnum þjónaskjöl",
    "el": "μέσω κονσόλας διακομιστή",
    "ar": "عبر وحدة تحكم الخادم",
    "fi": "palvelimen konsolin kautta",
    "sv": "via serverkonsol",
    "ru": "через консоль сервера",
    "tr": "sunucu konsolü üzerinden",
    "fa": "از طریق کنسول سرور",
    "ps": "د سرور کنسول له لارې",
    "ur": "سرور کنسول کے ذریعے",
    "hi": "सर्वर कंसोल के माध्यम से",
    "si": "සේවාදායක පාලක හරහා",
    "ta": "சேவையக கட்டுப்பாட்டு அறை மூலம்",
    "ne": "सर्भर कन्सोल मार्फत",
    "bn": "সার্ভার কনসোলের মাধ্যমে",
    "th": "ผ่านคอนโซลเซิร์ฟเวอร์",
    "vi": "qua bảng điều khiển máy chủ",
    "id": "melalui konsol server",
    "zh": "通过服务器控制台",
    "ms": "melalui konsol pelayan",
    "ja": "サーバーコンソール経由で",
    "ko": "서버 콘솔을 통해",
    "mi": "ma te kōnae tūmau",
    "to": "kau ai he falekoloa server",
    "gil": "via server console",
    "ty": "ma te rūma whakahaere tūmau"
  },



};

const timezone_list = [
  {
    name: "Baker Island Time",
    utc: -12,
    short: "BIT",
    location: ["Baker Island"],
    lang: ["en_us"]
  },
  {
    name: "Niue Time",
    utc: -11,
    short: "NUT",
    location: ["Niue", "American Samoa"],
    lang: ["en_us"]
  },
  {
    name: "Hawaii-Aleutian Standard Time",
    utc: -10,
    short: "HAST",
    location: ["Hawaii", "Honolulu"],
    lang: ["en_us"]
  },
  {
    name: "Marquesas Time",
    utc: -9.5,
    short: "MART",
    location: ["Marquesas Islands"],
    lang: ["fr_fr", "ty_ty"]
  },
  {
    name: "Alaska Standard Time",
    utc: -9,
    short: "AKST",
    location: ["Anchorage"],
    lang: ["en_us"]
  },
  {
    name: "Pacific Standard Time",
    utc: -8,
    short: "PST",
    location: ["Los Angeles (Winter)", "Vancouver (Winter)"],
    lang: ["en_us", "en_ca"]
  },
  {
    name: "Pacific Daylight / Mountain Standard Time",
    utc: -7,
    short: "PDT / MST",
    location: ["Los Angeles (Summer)", "Vancouver (Summer)", "Denver (Winter)", "Phoenix"],
    lang: ["en_us", "en_ca"]
  },
  {
    name: "Mountain Daylight / Central Standard Time",
    utc: -6,
    short: "MDT / CST",
    location: ["Denver (Summer)", "Chicago (Winter)", "Mexico City (Winter)"],
    lang: ["en_us", "es_mx"]
  },
  {
    name: "Central Daylight / Eastern Standard Time",
    utc: -5,
    short: "CDT / EST",
    location: ["Chicago (Summer)", "New York (Winter)", "Toronto (Winter)"],
    lang: ["en_us", "fr_ca", "fr_fr"]
  },
  {
    name: "Atlantic Standard / Eastern Daylight Time",
    utc: -4,
    short: "AST / EDT",
    location: ["Santiago (Winter)", "Caracas (Winter)", "New York (Summer)", "Toronto (Summer)"],
    lang: ["en_us", "es_cl", "es_ve", "fr_ca"]
  },
  {
    name: "Newfoundland Standard Time",
    utc: -3.5,
    short: "NST",
    location: ["St. John's (Winter)"],
    lang: ["en_ca"]
  },
  {
    name: "Atlantic Daylight / Argentina Time",
    utc: -3,
    short: "ADT / ART",
    location: ["Santiago (Summer)", "Buenos Aires", "São Paulo"],
    lang: ["es_cl", "es_ar", "pt_br"]
  },
  {
    name: "Newfoundland Daylight Time",
    utc: -2.5,
    short: "NDT",
    location: ["St. John's (Summer)"],
    lang: ["en_ca"]
  },
  {
    name: "South Georgia Time",
    utc: -2,
    short: "GST",
    location: ["South Georgia"],
    lang: ["en_gb"]
  },
  {
    name: "Azores Standard Time",
    utc: -1,
    short: "AZOT",
    location: ["Azores (Winter)"],
    lang: ["pt_pt"]
  },
  {
    name: "Greenwich Mean Time / Azores Summer Time",
    utc: 0,
    short: "GMT / AZOST",
    location: ["London (Winter)", "Reykjavík", "Azores (Summer)"],
    lang: ["en_gb", "is_is", "pt_pt"]
  },
  {
    name: "Central European Time / British Summer Time",
    utc: 1,
    short: "CET / BST",
    location: ["Berlin (Winter)", "Paris (Winter)", "Rome (Winter)", "London (Summer)"],
    lang: [ "de_de", "de_at", "de_ch", "fr_fr", "fr_be", "fr_ch", "it_it", "en_gb"]
  },
  {
    name: "Central European Summer / Eastern European Time",
    utc: 2,
    short: "CEST / EET",
    location: ["Berlin (Summer)", "Paris (Summer)", "Rome (Summer)", "Athens (Winter)", "Cairo (Winter)", "Helsinki (Winter)"],
    lang: ["de_de", "de_at", "de_ch", "fr_fr", "fr_be", "fr_ch", "it_it", "el_gr", "ar_eg", "ar_sa", "fi_fi", "sv_se"]
  },
  {
    name: "Eastern European Summer / Moscow Time",
    utc: 3,
    short: "EEST / MSK",
    location: ["Athens (Summer)", "Cairo (Summer)", "Moscow", "Istanbul"],
    lang: ["el_gr", "ar_eg", "ar_sa", "ru_ru", "ru_ua", "tr_tr"]
  },
  {
    name: "Iran Standard Time",
    utc: 3.5,
    short: "IRST",
    location: ["Tehran (Winter)"],
    lang: ["fa_ir"]
  },
  {
    name: "Iran Daylight Time / Gulf Standard Time",
    utc: 4,
    short: "IRDT / GST",
    location: ["Tehran (Summer)", "Dubai", "Abu Dhabi"],
    lang: ["fa_ir", "ar_ae", "ar_sa"]
  },
  {
    name: "Afghanistan Time",
    utc: 4.5,
    short: "AFT",
    location: ["Kabul"],
    lang: ["ps_af", "fa_ir"]
  },
  {
    name: "Pakistan Standard Time",
    utc: 5,
    short: "PKT",
    location: ["Karachi", "Islamabad"],
    lang: ["en_pk", "ur_pk"]
  },
  {
    name: "India Standard Time",
    utc: 5.5,
    short: "IST",
    location: ["New Delhi", "Mumbai", "Colombo"],
    lang: ["en_in", "hi_in", "si_lk", "ta_in", "ta_lk"]
  },
  {
    name: "Nepal Time",
    utc: 5.75,
    short: "NPT",
    location: ["Kathmandu"],
    lang: ["ne_np"]
  },
  {
    name: "Bangladesh Time",
    utc: 6,
    short: "BST",
    location: ["Dhaka"],
    lang: ["bn_bd"]
  },
  {
    name: "Cocos Islands Time",
    utc: 6.5,
    short: "CCT",
    location: ["Cocos Islands"],
    lang: ["en_au"]
  },
  {
    name: "Indochina Time",
    utc: 7,
    short: "ICT",
    location: ["Bangkok", "Hanoi", "Jakarta"],
    lang: ["th_th", "vi_vn", "id_id"]
  },
  {
    name: "China Standard Time",
    utc: 8,
    short: "CST",
    location: ["Beijing", "Shanghai", "Singapore"],
    lang: ["zh_cn", "en_sg", "ms_sg", "ta_sg"]
  },
  {
    name: "Australian Central Western Time",
    utc: 8.75,
    short: "ACWST",
    location: ["Eucla"],
    lang: ["en_au"]
  },
  {
    name: "Japan Standard Time",
    utc: 9,
    short: "JST",
    location: ["Tokyo", "Seoul"],
    lang: ["ja_jp", "ko_kr"]
  },
  {
    name: "Australian Central Standard Time",
    utc: 9.5,
    short: "ACST",
    location: ["Adelaide", "Darwin"],
    lang: ["en_au"]
  },
  {
    name: "Australian Eastern Standard Time",
    utc: 10,
    short: "AEST",
    location: ["Brisbane", "Melbourne", "Sydney"],
    lang: ["en_au"]
  },
  {
    name: "Lord Howe Standard Time",
    utc: 10.5,
    short: "LHST",
    location: ["Lord Howe Island"],
    lang: ["en_au"]
  },
  {
    name: "Solomon Islands Time",
    utc: 11,
    short: "SBT",
    location: ["Honiara", "New Caledonia"],
    lang: ["en_nz", "fr_nc"]
  },
  {
    name: "New Zealand Standard Time",
    utc: 12,
    short: "NZST",
    location: ["Wellington", "Auckland"],
    lang: ["en_nz", "mi_nz"]
  },
  {
    name: "Chatham Islands Standard Time",
    utc: 12.75,
    short: "CHAST",
    location: ["Chatham Islands"],
    lang: ["en_nz", "mi_nz"]
  },
  {
    name: "Tonga Time",
    utc: 13,
    short: "TOT",
    location: ["Tonga", "Tokelau"],
    lang: ["en_nz", "to_to"]
  },
  {
    name: "Line Islands Time",
    utc: 14,
    short: "LINT",
    location: ["Kiritimati", "Line Islands"],
    lang: ["en_ki", "gil_ki"]
  }
];

const goal_entity_list = EntityTypes.getAll()

// Really, how do you defeat an "area effect cloud" in survival?
const goal_entity_blocklist = [
  {
    id: "agent" // WTF
  },
  {
    id: "area_effect_cloud" // WTF
  },
  {
    id: "armor_stand"
  },
  {
    id: "arrow"
  },
  {
    id: "boat"
  },
  {
    id: "breeze_wind_charge_projectile"
  },
  {
    id: "chest_boat"
  },
  {
    id: "chest_minecart"
  },
  {
    id: "command_block_minecart"
  },
  {
    id: "dragon_fireball"
  },
  {
    id: "egg"
  },
  {
    id: "ender_crystal"
  },
  {
    id: "ender_pearl"
  },
  {
    id: "eye_of_ender_signal"
  },
  {
    id: "fireball"
  },
  {
    id: "fireworks_rocket"
  },
  {
    id: "fishing_hook"
  },
  {
    id: "hopper_minecart"
  },
  {
    id: "lightning_bolt"
  },
  {
    id: "lingering_potion"
  },
  {
    id: "llama_spit"
  },
  {
    id: "minecart"
  },
  {
    id: "npc"
  },
  {
    id: "ominous_item_spawner"
  },
  {
    id: "player" // Technically I could do player as goal but it could result to a soft lock if the selected player leaves... Maybe something for a future update
  },
  {
    id: "shulker_bullet"
  },
  {
    id: "small_fireball"
  },
  {
    id: "snowball"
  },
  {
    id: "splash_potion"
  },
  {
    id: "thrown_trident"
  },
  {
    id: "tnt"
  },
  {
    id: "tnt_minecart"
  },
  {
    id: "tripod_camera" // WTF
  },
  {
    id: "wind_charge_projectile"
  },
  {
    id: "wither_skull"
  },
  {
    id: "wither_skull_dangerous"
  },
  {
    id: "xp_bottle"
  },
  {
    id: "xp_orb"
  },
  {
    id: "zombie_horse" // Have you ever found it in survival?
  },
  // Minecraft still has the V1 Villagers in the code, the ones before 1.14, which you will no longer find because they are all replaced by V2 automatically
  {
    id: "zombie_villager"
  },
  {
    id: "villager"
  },
  // Only available if edu is activated
  {
    id: "balloon"
  },
    {
    id: "ice_bomb"
  }
]

const goal_entity_exceptionlist = {
  evocation_illager: {
    icon: "textures/items/spawn_eggs/spawn_egg_evoker"
  },

  zombie_pigman: {
    icon: "textures/items/spawn_eggs/spawn_egg_zombified_piglin"
  },

  villager_v2: {
    icon: "textures/items/spawn_eggs/spawn_egg_villager"
  },

  zombie_villager_v2: {
    icon: "textures/items/spawn_eggs/spawn_egg_zombie_villager"
  }
}


const design_template = [
  {
    // The "ms" marker isn't used here, but it works perfectly. Simply because I don't like it.
    name: version_info.version,
    id: 0,
    edition: [0],
    content: [
      { type: "ui", blocks: [
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: "y", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: "y", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: "y", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } },
          { type: "text", text: " §o§7(paused)" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time ->\n§l§7" },
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: { singular: " year, ", plural: " years, " }, separator: { enabled: false } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
      ]},
      // Same goes for here: the "s" marker isn't used here, but it works perfectly.
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§lTimer §tV" }
      ]}
    ]
  },
  {
    name: "v.4.1.0 - v.4.2.2 (Speedrun)",
    id: 1,
    edition: [0],
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ".", position: "after" } },
        { type: "marker", marker: "ms", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§l" },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ".", position: "after" } },
        { type: "marker", marker: "ms", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "paused", blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ".", position: "after" } },
          { type: "marker", marker: "ms", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
          { type: "text", text: " §7§o(frozen)" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time ->\n§l§7" },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ".", position: "after" } },
          { type: "marker", marker: "ms", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§lTimer §7V§r §f§oby TheFelixLive" }
      ]}
    ]
  },
  {
    name: "v.4.1.0 - v.4.2.2 (Hardcore)",
    id: 2,
    edition: [0],
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§c" },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } },
          { type: "text", text: " §7§o(frozen)" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time ->\n§l§7" },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§lTimer §7V §4[§cHardcore Mode§4]§r §f§oby TheFelixLive" }
      ]}
    ]
  },

  {
    name: "v.4.1.0 - v.4.2.2 (Enchant)",
    id: 3,
    edition: [0],
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§9" },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } },
          { type: "text", text: " §7§o(frozen)" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time ->\n§l§7" },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§9Timer V §b§oby TheFelixLive" }
      ]}
    ]
  },
  {
    name: "v.4.1.0 - v.4.2.2 (Default)",
    id: 4,
    edition: [0],
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } },
          { type: "text", text: " §7§o(frozen)" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time ->\n§l§7" },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§lTimer §7V§r §f§oby TheFelixLive" }
      ]}
    ]
  },

  {
    name: "v.4.0.0 - v.4.0.1",
    id: 5,
    edition: [0],
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "w", padZero: false, alwaysShow: false, suffix: "w", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§e" },
        { type: "marker", marker: "w", padZero: false, alwaysShow: false, suffix: "w", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "marker", marker: "w", padZero: false, alwaysShow: false, suffix: "w", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } },
          { type: "text", text: " §o§7(frozen)" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time ->\n§l§7" },
          { type: "marker", marker: "y", padZero: false, alwaysShow: false, suffix: { singular: " year, ", plural: " years, " }, separator: { enabled: false } },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§p§lTimer V §r§h§oLite§r" }
      ]}
    ]
  },
  {
    name: "v.3.3.0 - v.3.6.1",
    id: 6,
    edition: [0],
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§b" },
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§7" },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } },
          { type: "text", text: " §f§o(frozen)" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time: §l§b" },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§b§lTimer V §o§3by TheFelixLive" }
      ]}
    ]
  },

  {
    name: "v.3.0.0 - v.3.2.2",
    id: 7,
    edition: [0],
    content: [
      { type: "ui", blocks: [
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
          { type: "text", text: "§b§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§bTimer V§r is paused\n§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
          { type: "text", text: " <-" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§bTimer V§r is paused\n§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
          { type: "text", text: " <-" }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
        { type: "marker", marker: "h", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
        { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§b§lTimer V §o§3by TheFelixLive" }
      ]}
    ]
  },
  {
    name: "v.2.0.0 - v.2.2.0",
    id: 8,
    edition: [0],
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "w", largest: true, padZero: false, suffixFull: { singular: " week ",  plural: " weeks "  }, suffixAbbr: "w "},
        { type: "marker", marker: "d", largest: true, padZero: false, suffixFull: { singular: " day ",   plural: " days "   }, suffixAbbr: "d "},
        { type: "marker", marker: "h", largest: true, padZero: false, suffixFull: { singular: " hour ",  plural: " hours "  }, suffixAbbr: "h "},
        { type: "marker", marker: "m", largest: true, padZero: false, suffixFull: { singular: " minute ", plural: " minutes "}, suffixAbbr: "m "},
        { type: "marker", marker: "s", largest: true, padZero: false, suffixFull: { singular: " second", plural: " seconds"}, suffixAbbr: "s "}

      ]},
      { type: "normal", blocks: [
        { type: "text", text: "Playtime: ", showIfUnitsZero: true },
        { type: "marker", marker: "w", largest: true, padZero: false, suffixFull: { singular: " §eweek§r ",  plural: " §eweeks§r "  }, suffixAbbr: "§ew§r "},
        { type: "marker", marker: "d", largest: true, padZero: false, suffixFull: { singular: " §eday§r ",   plural: " §edays§r "   }, suffixAbbr: "§ed§r "},
        { type: "marker", marker: "h", largest: true, padZero: false, suffixFull: { singular: " §ehour§r ",  plural: " §ehours§r "  }, suffixAbbr: "§eh§r "},
        { type: "marker", marker: "m", largest: true, padZero: false, suffixFull: { singular: " §eminute§r ", plural: " §eminutes§r "},suffixAbbr: "§em§r "},
        { type: "marker", marker: "s", largest: true, padZero: false, suffixFull: { singular: " §esecond§r", plural: " §eseconds§r"},suffixAbbr: "§es§r"}
      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§3§oTimer paused at §r" },
          { type: "marker", marker: "w", largest: true, padZero: false, suffixFull: { singular: " §eweek§r ",  plural: " §eweeks§r "  }, suffixAbbr: "§ew§r "},
          { type: "marker", marker: "d", largest: true, padZero: false, suffixFull: { singular: " §eday§r ",   plural: " §edays§r "   }, suffixAbbr: "§ed§r "},
          { type: "marker", marker: "h", largest: true, padZero: false, suffixFull: { singular: " §ehour§r ",  plural: " §ehours§r "  }, suffixAbbr: "§eh§r "},
          { type: "marker", marker: "m", largest: true, padZero: false, suffixFull: { singular: " §eminute§r ", plural: " §eminutes§r "},suffixAbbr: "§em§r "},
          { type: "marker", marker: "s", largest: true, padZero: false, suffixFull: { singular: " §esecond§r", plural: " §eseconds§r"},suffixAbbr: "§es§r"}
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§bTimer V§r is paused\n§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " day, ", plural: " days, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["y", "d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
          { type: "text", text: " <-" }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
        { type: "marker", marker: "h", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } },
        { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§3Waiting for instructions..." }
      ]}
    ]
  },

  {
    name: "v.1.0.0",
    id: 9,
    edition: [0],
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: false, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: "ifAllZero", suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "§eh", separator: { enabled: true, value: "§r ", position: "after" } },
        { type: "marker", marker: "m", padZero: false, alwaysShow: true, suffix: "§em", separator: { enabled: true, value: "§r ", position: "after" } },
        { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "§es", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§o<§k____§r§o Timer paused §k____§r>" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "Your time ->\n§l§7" },
          { type: "marker", marker: "h", padZero: false, alwaysShow: false, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "§o<§k____§r§o Timer paused §k____§r>" }
      ]}
    ]
  },
  {
    name: "Custom design",
    id: 10,
    edition: [0],
    content: undefined
  },
  // BastiGHG
  {
    name: "Zick Zack V5 (2M)",
    id: 11,
    edition: [1],
    content: [
      { type: "ui", blocks: [
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§4§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§4§l§oDer Timer ist pausiert" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§4§l§oDer Timer ist pausiert" }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "" }
      ]}
    ]
  },
  {
    name: "Zick Zack V5",
    id: 12,
    edition: [1],
    content: [
      { type: "ui", blocks: [
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§a§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§a§l§oDer Timer ist pausiert" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§a§l§oDer Timer ist pausiert" }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "" }
      ]}
    ]
  },
  {
    name: "Zick Zack V4 (1,5M)",
    id: 13,
    edition: [1],
    content: [
      { type: "ui", blocks: [
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§7§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§7§l§oDer Timer ist pausiert" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§7§l§oDer Timer ist pausiert" }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "" }
      ]}
    ]
  },
  {
    name: "Zick Zack V4 (dual)",
    id: 14,
    edition: [1],
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " Tag, ", plural: " Tage, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§d§l" },
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " Tag, ", plural: " Tage, " }, separator: { enabled: false } },
        { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§d§l§oDer Timer ist pausiert" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§d§l§oDer Timer ist pausiert" }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "" }
      ]}
    ]
  },
  {
    name: "Zick Zack V4",
    id: 15,
    edition: [1],
    content: [
      { type: "ui", blocks: [
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§d§l" },
          { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffix: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", padZero: false, alwaysShow: true, suffix: "s", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§d§l§oDer Timer ist pausiert" }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§d§l§oDer Timer ist pausiert" }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "" }
      ]}
    ]
  },
  {
    name: "Standard (dual)",
    id: 16,
    edition: [1],
    content: [
      { type: "ui", blocks: [
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " Tag, ", plural: " Tage, " }, separator: { enabled: false } },
          { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§6§l" },
        { type: "marker", marker: "d", padZero: false, alwaysShow: false, suffix: { singular: " Tag, ", plural: " Tage, " }, separator: { enabled: false } },
        { type: "marker", marker: "h", padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
        { type: "marker", marker: "s", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: false } }

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§6§oDer Timer ist pausiert." }
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§6§oDer Timer ist pausiert." }
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "" }
      ]}
    ]
  },
  {
    name: "Standard",
    id: 17,
    edition: [1],
    content: [
      { type: "ui", blocks: [
          { type: "marker", marker: "d", largest: true, padZero: false, alwaysShow: false, suffixFull: { singular: "d", plural: "d"}, suffixAbbr: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffixFull: { singular: "h", plural: "h"}, suffixAbbr: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffixFull: { singular: "m", plural: "m"}, suffixAbbr: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", largest: true, padZero: false, suffixFull: { singular: " Sekunde", plural: " Sekunden"}, suffixAbbr: "s"}
      ]},
      { type: "normal", blocks: [
        { type: "text", text: "§e§l" },
          { type: "marker", marker: "d", largest: true, padZero: false, alwaysShow: false, suffixFull: { singular: "d", plural: "d"}, suffixAbbr: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffixFull: { singular: "h", plural: "h"}, suffixAbbr: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffixFull: { singular: "m", plural: "m"}, suffixAbbr: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", largest: true, padZero: false, suffixFull: { singular: " Sekunde", plural: " Sekunden"}, suffixAbbr: "s"}

      ]},
      { type: "paused", blocks: [
          { type: "text", text: "§o§b" },
          { type: "marker", marker: "d", largest: true, padZero: false, alwaysShow: false, suffixFull: { singular: "d", plural: "d"}, suffixAbbr: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffixFull: { singular: "h", plural: "h"}, suffixAbbr: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffixFull: { singular: "m", plural: "m"}, suffixAbbr: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", largest: true, padZero: false, suffixFull: { singular: " Sekunde", plural: " Sekunden"}, suffixAbbr: "s"}
      ]},
      { type: "finished", blocks: [
          { type: "text", text: "§o§b" },
          { type: "marker", marker: "d", largest: true, padZero: false, alwaysShow: false, suffixFull: { singular: "d", plural: "d"}, suffixAbbr: "d", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "h", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["d"] }, suffixFull: { singular: "h", plural: "h"}, suffixAbbr: "h", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "m", largest: true, padZero: false, alwaysShow: { condition: "ifGreater", units: ["h", "d"] }, suffixFull: { singular: "m", plural: "m"}, suffixAbbr: "m", separator: { enabled: true, value: " ", position: "after" } },
          { type: "marker", marker: "s", largest: true, padZero: false, suffixFull: { singular: " Sekunde", plural: " Sekunden"}, suffixAbbr: "s"}
      ]},
      { type: "day", colorConfig: ["§9", "§e", "§b"], blocks: [
          { type: "marker", marker: "h", padZero: false, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "marker", marker: "m", padZero: true, alwaysShow: true, suffix: "", separator: { enabled: true, value: ":", position: "after" } },
          { type: "text", text: " o'clock" }
      ]},
      { type: "screen_saver", blocks: [
          { type: "text", text: "" }
      ]}
    ]
  },
]

console.log("Hello from " + version_info.name + " - "+version_info.version+" ("+version_info.build+") - Further debugging is "+ (version_info.release_type == 0? "enabled" : "disabled" ) + " by the version")
let independent = true

/*------------------------
 Save Data
-------------------------*/

// Creates or Updates Save Data if not present
let save_data = load_save_data();

const default_save_data_structure = {
    time: { stopwatch: 0, timer: 0, last_value_timer: 0, do_count: false },
    counting_type: 0,
    challenge: { active: world.isHardcore || version_info.edition == 1 ? true : false, progress: 0, rating: 0, goal: { pointer: 1, entity_id: "minecraft:ender_dragon", event_pos: 0 }, difficulty: world.isHardcore ? 2 : 1 },
    global: { status: world.isHardcore || version_info.edition == 1 ? true : false, last_player_id: undefined },
    sync_day_time: false,
    utc: version_info.edition == 1? 2 : undefined,
    update_message_unix: (version_info.unix + version_info.update_message_period_unix)
};

if (!save_data) {
    save_data = [default_save_data_structure];
    print("Creating save_data...");
} else {
    let data_entry = save_data[0];
    let changes_made = false;

    function merge_defaults(target, defaults) {
        for (const key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                if (!target.hasOwnProperty(key)) {
                    target[key] = defaults[key];
                    changes_made = true;
                } else if (typeof defaults[key] === 'object' && defaults[key] !== null && !Array.isArray(defaults[key])) {
                    if (typeof target[key] !== 'object' || target[key] === null || Array.isArray(target[key])) {
                        target[key] = defaults[key];
                        changes_made = true;
                    } else {
                        merge_defaults(target[key], defaults[key]);
                    }
                }
            }
        }
    }

    merge_defaults(data_entry, default_save_data_structure);
    if (!Array.isArray(save_data) || save_data.length === 0) {
        save_data = [data_entry];
        changes_made = true;
    } else {
        save_data[0] = data_entry;
    }

    if (changes_made) {
        print("Missing save_data attributes found and added.");
    }
}

update_save_data(save_data);


// Load & Save Save data
function load_save_data() {
    let rawData = world.getDynamicProperty("timerv:save_data");

    if (!rawData) {
        return;
    }

    return JSON.parse(rawData);
}


function update_save_data(input) {
    world.setDynamicProperty("timerv:save_data", JSON.stringify(input))
};

function delete_player_save_data(player) {
  let save_data = load_save_data();

  save_data = save_data.filter(entry => entry.id !== player.id);
  update_save_data(save_data);
}



// Add player if not present
function create_player_save_data(playerId, playerName, modifier) {
  let save_data = load_save_data();

  // Define the default structure for a new player's save data
  const default_player_save_data_structure = (is_op_initial) => ({
      id: playerId,
      show_td_as_mode: false,
      time: { stopwatch: 0, timer: 0, last_value_timer: 0, do_count: false },
      custom_sounds: 0,
      afk: false,
      counting_type: 0,
      time_day_actionbar: false,
      allow_unnecessary_inputs: false,
      time_source: 0,
      name: playerName,
      op: is_op_initial, // This will be determined when the player is first added
      visibility_setting: true,
      absolute_visibility: true,
      fullbright: false,
      lang: version_info.edition == 1? "de_de" : "en_us",
      design: version_info.edition == 1? 12:0,
      setup: 0, // Setup compleation: 0%
      last_unix: Math.floor(Date.now() / 1000),
      gesture: { emote: false, sneak: true, nod: true, stick: true, command: true },
      health: 20, // is used to save the heart level only in hardcore mode e.g. during a break
      openend_menu_via_command: false,
  });

  let player_sd_index = save_data.findIndex(entry => entry.id === playerId);
  let player_data;

  // Helper function to recursively merge default values
  const merge_defaults = (target, defaults) => {
      for (const key in defaults) {
          if (defaults.hasOwnProperty(key)) {
              if (!target.hasOwnProperty(key)) {
                  // Key is missing, add it with default value
                  target[key] = defaults[key];
              } else if (typeof defaults[key] === 'object' && defaults[key] !== null && !Array.isArray(defaults[key])) {
                  // If the default value is an object, recurse into it
                  if (typeof target[key] !== 'object' || target[key] === null || Array.isArray(target[key])) {
                      // If the existing value is not an object or is null/array, replace it with the default structure
                      target[key] = defaults[key];
                      changes_made = true;
                  } else {
                      merge_defaults(target[key], defaults[key]);
                  }
              }
          }
      }
  };

  if (player_sd_index === -1) {
      // Player does not exist, create new entry
      let should_be_op = true;

      for (let entry of save_data) {
          if (entry.op === true) {
              should_be_op = false;
              break;
          }
      }

      print(`Player ${playerName} (${playerId}) added with op=${should_be_op}!`);

      player_data = default_player_save_data_structure(should_be_op);
      save_data.push(player_data);
  } else {
      // Player exists, get their data
      player_data = save_data[player_sd_index];

      // Update player name if it's different
      if (player_data.name !== playerName) {
          player_data.name = playerName;
      }

      const dynamic_default_structure = default_player_save_data_structure(player_data.op);
      merge_defaults(player_data, dynamic_default_structure);

  }

  // Apply modifiers to the player's data
  for (let key in modifier) {
      if (player_data.hasOwnProperty(key)) { // Only apply modifier if the key exists in player_data
        player_data[key] = modifier[key];
      }
  }

  update_save_data(save_data);
  print(`Save data for player ${playerName} updated.`);
}

/*------------------------
  Player Join/Leave
-------------------------*/


world.afterEvents.playerJoin.subscribe(async({ playerId, playerName }) => {
  create_player_save_data(playerId, playerName);

  let save_data = load_save_data()
  await system.waitTicks(100);
  let player = world.getAllPlayers().find(player => player.id == playerId)
  let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang

  // Resets AFK
  let player_sd_index = save_data.findIndex(entry => entry.id === playerId);
  if (!save_data[0].global.status && save_data[player_sd_index].afk && (!save_data[player_sd_index].time.do_count && save_data[player_sd_index].time[save_data[player_sd_index].counting_type == 1 ? "timer" : "stopwatch"] > 0)) {
    save_data[player_sd_index].time.do_count = true;
    update_save_data(save_data)
  }

  if (version_info.release_type !== 2 && save_data[player_sd_index].setup == 100) {
    player.sendMessage("§l§7[§f" + (independent? translate_textkeys("message.header.system", save_data[player_sd_index].lang) : translate_textkeys("message.header.system.client_mode", save_data[player_sd_index].lang)) + "§7]§r "+ save_data[player_sd_index].name +" how is your experiences with "+ version_info.version +"? Does it meet your expectations? Would you like to change something and if so, what? Do you have a suggestion for a new feature? Share it at §l"+links[0].link)
    player.playSound(translate_soundkeys("message.beta.feedback", player))
  }

  // Help reminder: how to open the menu
  if (save_data[player_sd_index].last_unix > (Math.floor(Date.now() / 1000) + 604800) && independent && save_data[player_sd_index].setup == 100) {
    player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.open_menu", lang))
  }

  // If the player has not set up the timer yet, show the setup menu
  initialize_main_menu(player, false, true)
});

world.afterEvents.playerLeave.subscribe(({ playerId, playerName }) => {
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === playerId);

  // When a player's sd gets removed he will kick out of the game triggering this...
  if (player_sd_index) {
    save_data[player_sd_index].last_unix = Math.floor(Date.now() / 1000)
    update_save_data(save_data);
  }
});

/*------------------------
  Universel Updater
-------------------------*/

function uu_find_gen() {
  let gen;
  if (world.scoreboard.getObjective("timer_settings")) {
    gen = 0
  }
  if (world.scoreboard.getObjective("timer_custom_music")) {
    gen = 1
  }
  if (world.scoreboard.getObjective("timer_data")) {
    gen = 2
  }
  return gen
}

let gen_list = [
  "v.4.1.0 - v.4.2.2", // gen 0 (s)
  "v.4.1.0", // gen 1 (c)
  "v.4.0.0 - v.4.0.1"
]

function universel_updater(player, gen) {
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang

  let form = new MessageFormData();
  form.title(translate_textkeys("menu.uu.title"));
  form.body(translate_textkeys("menu.uu.description", lang, {old_version: gen_list[gen]}))
  form.button2("§9"+translate_textkeys("menu.uu.update"));
  form.button1(save_data[player_sd_index].setup == 100? "": translate_textkeys("menu.button_skip", lang));
  const showForm = async () => {
  form.show(player).then((response) => {
    if (response.canceled && response.cancelationReason === "UserBusy") {
      showForm()
    } else {
      if (response.selection == 0) {
        if (save_data[player_sd_index].setup == 100) {
          player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
          settings_main(player)
        } else {
          save_data[player_sd_index].setup = 80
          update_save_data(save_data)
          setup_menu(player)
        }
      }
      if (response.selection == 1) {
        uu_apply_gen(gen, player)
      }
      if (response.selection == undefined ) {
        if (save_data[player_sd_index].setup !== 100) player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.setup.closed", lang))
        return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      }
    }
  });
};
showForm();
}

// is something to improve
function uu_apply_gen(gen, player) {
  let note_message;
  let utc = load_save_data()[0].utc

  // gen 0
  if (gen == 0) {
    note_message = translate_textkeys("menu.uu.note.ca")
    const getScoreSafe = (objective, scoreName, defaultValue = 0) => {
      try {
        return objective.getScore(scoreName) || defaultValue;
      } catch (error) {
        console.error(`Error getting '${scoreName}' from '${objective}': `, error);
        return defaultValue;
      }
    };

    let settings = world.scoreboard.getObjective("timer_settings");
    let addon = world.scoreboard.getObjective("timer_addon");
    let time = world.scoreboard.getObjective("timer_time");
    let show_actionbar = world.scoreboard.getObjective("timer_show_actionbar");
    let old_goal = getScoreSafe(settings, "goal", 1);

    let stopwatchTime = getScoreSafe(settings, "shoud_count_down") === 0
      ? (getScoreSafe(time, "ms") / 5 + getScoreSafe(time, "sec") * 20 + getScoreSafe(time, "min") * 20 * 60 + getScoreSafe(time, "h") * 20 * 60 * 60)
      : 0;

    let timerTime = getScoreSafe(settings, "shoud_count_down") === 1
      ? (getScoreSafe(time, "ms") / 5 + getScoreSafe(time, "sec") * 20 + getScoreSafe(time, "min") * 20 * 60 + getScoreSafe(time, "h") * 20 * 60 * 60)
      : 0;

    let save_data = [{
      time: { stopwatch: stopwatchTime, timer: timerTime, last_value_timer: timerTime, do_count: getScoreSafe(settings, "do_count") === 1 },
      counting_type: getScoreSafe(settings, "shoud_count_down") === 1 ? 1 : 0,
      challenge: {
        active: true,
        progress: getScoreSafe(settings, "mode"),
        rating: getScoreSafe(settings, "reset_type") === 2 ? 1 : 0,
        goal: { pointer: old_goal === 8 ? 0 : old_goal < 5 ? 1 : 2, entity_id: ["minecraft:ender_dragon", "minecraft:wither", "minecraft:elder_guardian", "minecraft:warden"][old_goal - 1], event_pos: old_goal === 5 ? 1 : 0 },
        difficulty: getScoreSafe(settings, "difficulty"),
      },
      global: { status: true, last_player_id: player.id },
      sync_day_time: false,
      use_setup: version_info.edition == 1? false : true,
      utc: utc,
      update_message_unix: (version_info.unix + version_info.update_message_period_unix)
    }];

    try {
      update_save_data(save_data);
    } catch (error) {
      console.error("Error updating save data: ", error);
    }

    let design_id = 4

    if (getScoreSafe(settings, "speed_run") == 1) {
      design_id = 1
    }

    if (getScoreSafe(addon, "enchant") == 1) {
      design_id = 3
    }

    if (getScoreSafe(settings, "difficulty") >= 2) {
      design_id = 2
    }

    world.getAllPlayers().forEach(player => {
      try {
        create_player_save_data(player.id, player.name, {
          setup: 0,
          op: player.hasTag("trust_player_control"),
          custom_sounds: getScoreSafe(settings, "custom_music") === 1 ? 2 : 0,
          fullbright: getScoreSafe(settings, "night_vision") === 1,
          visibility_setting: show_actionbar.getScore(player) === 1? true : false,
          design: design_id,
          setup: 100
        });
        if (player.hasTag("trust_player_control")) player.removeTag("trust_player_control");
      } catch (error) {
        console.error(`Error processing player data for player ${player.name}: `, error);
      }
    });


    const objectives = [
      "timer_settings",
      "timer_time",
      "timer_menu",
      "timer_addon",
      "timer_actionbar_time",
      "timer_show_actionbar",
      "timer_setup"
    ];

    objectives.forEach(obj => {
      try {
        world.scoreboard.removeObjective(obj);
      } catch (error) {
        console.error("Error removing objective", obj, ": ", error);
      }
    });
    uu_gen_successfull(player, note_message)
  }

  if (gen == 1) {
    let totalPlayers = 0;
    let onlinePlayers = 0;

    world.scoreboard.getObjective("timer_time_ms").getParticipants().forEach(o => {
      if (o.type == "Player") {
        totalPlayers++;
        try {
          let entity = o.getEntity();
          if (entity && entity.id) {
            onlinePlayers++;
          }
        } catch (error) {
        }
      }
    });

    let dataLossPercent = totalPlayers > 0
      ? Math.floor(((totalPlayers - onlinePlayers) / totalPlayers) * 100)
      : 0;

    if (dataLossPercent > 0) {
      let form = new MessageFormData();
      let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
      let lang = save_data[player_sd_index].lang
      form.title(translate_textkeys("menu.uu.data_lost.title", lang));
      form.body(translate_textkeys("menu.uu.data_lost.description", lang, {totalPlayers: totalPlayers, onlinePlayers: onlinePlayers, dataLossPercent: dataLossPercent}));
      form.button2("§c"+translate_textkeys("menu.button_continue", lang));
      form.button1("");
      form.show(player).then((response) => {
        if (response.selection == undefined ) {
          return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
        }
        if (response.selection == 0) {
          if (save_data[player_sd_index].setup == 0) {
            player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
            settings_main(player)
          } else {
            startup_popups(player)
          }
        }
        if (response.selection == 1) {
          gen_1();
        }
      });
    } else {
      gen_1();
    }

    function gen_1() {
      let afk = world.scoreboard.getObjective("timer_afk");
      let night_vision = world.scoreboard.getObjective("timer_night_vision");
      let custom_sounds = world.scoreboard.getObjective("timer_custom_music");
      let old_global = world.scoreboard.getObjective("timer_menu").getScore("host_mode");
      let do_count = world.scoreboard.getObjective("timer_do_count");
      let shoud_count_down = world.scoreboard.getObjective("timer_shoud_count_down").getScore("host");
      let show_actionbar = world.scoreboard.getObjective("timer_show_actionbar");

      let time_ms = world.scoreboard.getObjective("timer_time_ms");
      let time_sec = world.scoreboard.getObjective("timer_time_sec");
      let time_min = world.scoreboard.getObjective("timer_time_min");
      let time_h = world.scoreboard.getObjective("timer_time_h");
      let time_d = world.scoreboard.getObjective("timer_time_d");

      let save_data = [{
        time: { stopwatch: shoud_count_down? 0 : (time_ms.getScore("host") / 5 + time_sec.getScore("host") * 20 + time_min.getScore("host") * 20 * 60 + time_h.getScore("host") * 20 * 60 * 60 + time_d.getScore("host") * 20 * 60 * 60 * 24), timer: shoud_count_down? (time_ms.getScore("host") / 5 + time_sec.getScore("host") * 20 + time_min.getScore("host") * 20 * 60 + time_h.getScore("host") * 20 * 60 * 60 + time_d.getScore("host") * 20 * 60 * 60 * 24) : 0, last_value_timer: shoud_count_down? (time_ms.getScore("host") / 5 + time_sec.getScore("host") * 20 + time_min.getScore("host") * 20 * 60 + time_h.getScore("host") * 20 * 60 * 60 + time_d.getScore("host") * 20 * 60 * 60 * 24) : 0, do_count: old_global == 1? do_count.getScore("host") == 1? true : false : false },
        counting_type: shoud_count_down? 1 : 0,
        global: { status: old_global == 1? true : false, last_player_id: world.getAllPlayers().find(player => {player.hasTag("target_host")})?.id || player.id},

        challenge: {active: false, progress: 0, rating: 0, goal: {pointer: 1, entity_id: "minecraft: ender_dragon", event_pos: 0}, difficulty: world.isHardcore? 2 : 1},
        sync_day_time: false,
        use_setup: version_info.edition == 1? false : true,
        utc: utc,
        update_message_unix: (version_info.unix + version_info.update_message_period_unix)
      }];

      try {
        update_save_data(save_data);
      } catch (error) {
        console.error("Error updating save data: ", error);
      }

      for (const player of world.getAllPlayers()) {
        try {
          create_player_save_data(player.id, player.name, {
            time: {do_count: do_count.getScore(player) == 1? true : false, timer: 0, last_value_timer: 0, stopwatch: (time_ms.getScore(player) / 5 + time_sec.getScore(player) * 20 + time_min.getScore(player) * 20 * 60 + time_h.getScore(player) * 20 * 60 * 60 + time_d.getScore(player) * 20 * 60 * 60 * 24)},
            counting_type: old_global == 2? 2 : 0,
            setup: 0,
            afk: afk.getScore(player) === 1 ? true : false,
            op: player.hasTag("trust_player_control")? true : false,
            custom_sounds: custom_sounds.getScore(player) === 1 ? 2 : 0,
            fullbright: night_vision.getScore(player) === 1 ? true : false,
            visibility_setting: show_actionbar.getScore(player) === 1? true : false,
            design: 4,
            setup: 100
          });
          if (player.hasTag("trust_player_control")) player.removeTag("trust_player_control");
        } catch (error) {
          console.error(`Error processing player data for player ${player.name}: `, error);
        }
      };


      const objectives = [
        "timer_night_vision",
        "timer_custom_music",
        "timer_afk",
        "timer_menu",
        "timer_do_count",
        "timer_shoud_count_down",
        "timer_time_ms",
        "timer_time_sec",
        "timer_time_min",
        "timer_time_h",
        "timer_time_d",
        "timer_actionbar_time",
        "timer_show_actionbar",
        "timer_setup"
      ];

      objectives.forEach(obj => {
        try {
          world.scoreboard.removeObjective(obj);
        } catch (error) {
          console.error("Error removing objective", obj, ": ", error);
        }
      });
      uu_gen_successfull(player, note_message)
    }
  }

  if (gen == 2) {
    const getScoreSafe = (objective, scoreName, defaultValue = 0) => {
      try {
        return objective.getScore(scoreName) || defaultValue;
      } catch (error) {
        console.error(`Error getting '${scoreName}' from '${objective}': `, error);
        return defaultValue;
      }
    };

    let data = world.scoreboard.getObjective("timer_data");
    let stopwatchTime = (
      getScoreSafe(data, "tick") +
      getScoreSafe(data, "sec") * 20 +
      getScoreSafe(data, "min") * 20 * 60 +
      getScoreSafe(data, "h")   * 20 * 60 * 60 +
      getScoreSafe(data, "w")   * 20 * 60 * 60 * 24 * 7
    );


    let save_data = [{
      time: { stopwatch: stopwatchTime, timer: 0, last_value_timer: 0, do_count: getScoreSafe(data, "mode") >= 1 ? true : false },
      counting_type: 0,

      global: { status: true, last_player_id: player.id},

      challenge: {active: false, progress: 0, rating: 0, goal: {pointer: 1, entity_id: "minecraft:ender_dragon", event_pos: 0}, difficulty: world.isHardcore? 2 : 1},
      sync_day_time: false,
      use_setup: version_info.edition == 1? false : true,
      utc: utc,
      update_message_unix: (version_info.unix + version_info.update_message_period_unix)
    }];

    try {
      update_save_data(save_data);
    } catch (error) {
      console.error("Error updating save data: ", error);
    }

    world.getAllPlayers().forEach(player => {
      try {
        create_player_save_data(player.id, player.name, {
          setup: 0,
          op: player.hasTag("timer_permissions"),
          design: 5,
          visibility_setting: getScoreSafe(data, "mode") == 2 ? false : true,
          setup: 100
        });
        if (player.hasTag("timer_permissions")) player.removeTag("timer_permissions");
      } catch (error) {
        console.error(`Error processing player data for player ${player.name}: `, error);
      }
    });


    const objectives = [
      "timer_data"
    ];

    objectives.forEach(obj => {
      try {
        world.scoreboard.removeObjective(obj);
      } catch (error) {
        console.error("Error removing objective", obj, ": ", error);
      }
    });
    uu_gen_successfull(player, note_message)
  }

}

function uu_gen_successfull(player, note_message) {
  player.playMusic(translate_soundkeys("music.menu.setup", player), { fade: 0.3 });
  let form = new MessageFormData();
  let save_data = load_save_data()
  let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang

  form.title(translate_textkeys("menu.uu.title"));
  form.body(translate_textkeys("menu.uu.compleat.description") + (note_message? "\n\n§7"+ translate_textkeys("menu.uu.compleat.description.note") + ": " + note_message : ""));
  form.button2("§9"+translate_textkeys("menu.settings.dictionary.changelog.title", lang));
  form.button1("");
  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection == 1) {
      player.playMusic(translate_soundkeys("music.menu.dictionary", player), { fade: 0.3, loop: true });
      return dictionary_about_version_changelog(player, convertUnixToDate(version_info.unix, save_data[0].utc))
    }
    if (response.selection == 0) {
      player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
      return main_menu(player)
    }
  })
}


/*------------------------
  Handshake for independent = false
-------------------------*/

async function timer_handshake() {
  if (independent) {
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
    independent = false
  } else {
    print("Clientmode is already enabled!");
  }
}

/*------------------------
  Hidden Fetures
-------------------------*/

system.afterEvents.scriptEventReceive.subscribe(event=> {
  // Have to be on the top to be able to trigger using getDimension.runCommand
  if (event.id === "timerv:api_client_mode") {
    return timer_handshake()
  }

  let player = event.sourceEntity
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  if (["timerv:reset", "timerv:sd_dump"].includes(event.id)) {
    const notAvailableMsg = id => `§l§7[§f` + (independent? translate_textkeys("message.header.system", save_data[player_sd_index].lang) : translate_textkeys("message.header.system.client_mode", save_data[player_sd_index].lang)) + `§7]§r ${id} is not available in stable releases!`;
    const noPermissionMsg = id => `§l§7[§f` + (independent? translate_textkeys("message.header.system", save_data[player_sd_index].lang) : translate_textkeys("message.header.system.client_mode", save_data[player_sd_index].lang)) + `§7]§r ${id} could not be changed because you do not have permission!`;

    if (!save_data[player_sd_index].op) {
      player.sendMessage(noPermissionMsg(event.id));
      return;
    }

    if (version_info.release_type === 2) {
      player.sendMessage(notAvailableMsg(event.id));
      return;
    }

    if (event.id == "timerv:sd_dump") {
      print(save_data)
    }

    if (event.id == "timerv:reset") {
      update_save_data(undefined)
      return close_world()
    }
  }

/*------------------------
  API Requests
-------------------------*/

  if (!independent) {
    if (event.id === "timerv:api_menu") {
      initialize_main_menu(player, true);
    }

    if (event.id === "timerv:api_show_actionbar") {
      save_data[player_sd_index].absolute_visibility = true
      update_save_data(save_data)
    }

    if (event.id === "timerv:api_hide_actionbar") {
      save_data[player_sd_index].absolute_visibility = false
      update_save_data(save_data)
    }
  }

/*------------------------
 Open the menu
-------------------------*/

  if (event.id === "timerv:menu" && save_data[player_sd_index].gesture.command) {
    save_data[player_sd_index].openend_menu_via_command = true
    update_save_data(save_data)
    initialize_main_menu(player);
  }


  if (event.id === "timerv:menu_soundkey") {
    let version;
    if (event.message == "v1") {
      version = 1
    }
    if (event.message == "v2") {
      version = 2
    }
    player.playSound(translate_soundkeys("menu.open", player));
    player.queueMusic(translate_soundkeys("music.menu.settings.debug", player), { fade: 0.3, loop: true });
    return soundkey_test(player, version)
  }


});


// via. item
world.beforeEvents.itemUse.subscribe(event => {
  const save_data = load_save_data();
  const idx = save_data.findIndex(e => e.id === event.source.id);

	if (event.itemStack.typeId === "minecraft:stick" && save_data[idx].gesture.stick) {
      system.run(() => {
        initialize_main_menu(event.source);
      });
	}
});

// via. jump gesture
const gestureCooldowns_jump = new Map();
const gestureState_reset = new Map(); // Speichert, ob Sneak+Jump zurückgesetzt wurden

async function gesture_jump() {
  const now = Date.now();

  for (const player of world.getAllPlayers()) {
    const lastUsed = gestureCooldowns_jump.get(player.id) || 0;
    const state = gestureState_reset.get(player.id) || { reset: true }; // true = darf wieder ausgelöst werden

    const isSneaking = player.isSneaking;
    const isJumping = player.isJumping;

    // Wenn beide false sind, erlauben wir wieder eine Auslösung beim nächsten Mal
    if (!isSneaking && !isJumping) {
      gestureState_reset.set(player.id, { reset: true });
    }

    // Wenn beide true sind UND vorher ein Reset war UND Cooldown abgelaufen
    if (isSneaking && isJumping && state.reset && (now - lastUsed >= 100)) {
      const save_data = load_save_data();
      const idx = save_data.findIndex(e => e.id === player.id);
      if (save_data[idx].gesture.sneak) {
        initialize_main_menu(player);
      }

      gestureCooldowns_jump.set(player.id, now);
      gestureState_reset.set(player.id, { reset: false }); // Warten bis beide wieder false sind
      await system.waitTicks(10);
    }
  }
}




// via. emote gesture
const gestureCooldowns_emote = new Map();
const gestureState_reset_emote = new Map(); // Speichert, ob Emote zurückgesetzt wurde

async function gesture_emote() {
  const now = Date.now();

  for (const player of world.getAllPlayers()) {
    const lastUsed = gestureCooldowns_emote.get(player.id) || 0;
    const state = gestureState_reset_emote.get(player.id) || { reset: true };

    const isEmoting = player.isEmoting;

    // Wenn Emoting zwischendurch false ist → Reset erlauben
    if (!isEmoting) {
      gestureState_reset_emote.set(player.id, { reset: true });
    }

    // Wenn Emoting aktiv ist, Reset gesetzt ist und Cooldown abgelaufen ist → Menü öffnen
    if (isEmoting && state.reset && (now - lastUsed >= 100)) {
      const save_data = load_save_data();
      const idx = save_data.findIndex(e => e.id === player.id);
      if (save_data[idx].gesture.emote) {
        initialize_main_menu(player);
      }

      gestureCooldowns_emote.set(player.id, now);
      gestureState_reset_emote.set(player.id, { reset: false }); // Bis zum nächsten Emote-Ende blockieren
      await system.waitTicks(10);
    }
  }
}


// via. nod gesture
const playerHeadMovement = new Map();

async function gesture_nod() {
  const now = Date.now();

  for (const player of world.getAllPlayers()) {
    if (player.getGameMode() !== "spectator") continue;

    const { x: pitch } = player.getRotation();

    const prev = playerHeadMovement.get(player.id) || {
      state: "idle",
      timestamp: now,
    };
    let { state, timestamp: lastTime } = prev;

    if (state === "idle" && pitch < -13) {
      state = "lookingUp";
      lastTime = now;
    }
    else if (state === "lookingUp" && pitch > 13) {
      const save_data = load_save_data();
      const idx = save_data.findIndex(e => e.id === player.id);
      if (save_data[idx].gesture.nod) {
        initialize_main_menu(player);
      }

      state = "idle";
      lastTime = now;
    }
    else if (state === "lookingUp" && now - lastTime > 1000) {
      state = "idle";
      lastTime = now;
    }

    playerHeadMovement.set(player.id, { state, timestamp: lastTime });
  }
}




/*------------------------
 general helper functions
-------------------------*/

function print(input) {
  if (version_info.release_type === 0) {
    console.log(version_info.name + " - " + JSON.stringify(input))
  }
}

function convertUnixToDate(unixSeconds, utcOffset) {
  const date = new Date(unixSeconds*1000);
  const localDate = new Date(date.getTime() + utcOffset * 60 * 60 * 1000);

  // Format the date (YYYY-MM-DD HH:MM:SS)
  const year = localDate.getUTCFullYear();
  const month = String(localDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(localDate.getUTCDate()).padStart(2, '0');
  const hours = String(localDate.getUTCHours()).padStart(2, '0');
  const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(localDate.getUTCSeconds()).padStart(2, '0');

  return {
    day: day,
    month: month,
    year: year,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    utcOffset: utcOffset
  };
}

function getRelativeTime(diff, player) {
  const save_data = load_save_data();
  const idx = save_data.findIndex(e => e.id === player.id);
  const lang = save_data[idx].lang

  const seconds = Math.round(diff);
  const minutes = seconds / 60;
  const hours = seconds / 3600;
  const days = seconds / 86400;
  const weeks = days / 7;
  const months = days / 30.44;   // average month length
  const years = days / 365.25;   // average year length (leap years included)

  if (years >= 0.95) {
    if (years < 1.5) return translate_textkeys("menu.relative_time.year", lang);
    return translate_textkeys("menu.relative_time.years", lang, { time: Math.round(years) });
  }

  if (months >= 0.95) {
    if (months < 1.5) return translate_textkeys("menu.relative_time.month", lang);
    return translate_textkeys("menu.relative_time.months", lang, { time: Math.round(months) });
  }

  if (weeks >= 0.95) {
    if (weeks < 1.5) return translate_textkeys("menu.relative_time.week", lang);
    return translate_textkeys("menu.relative_time.weeks", lang, { time: Math.round(weeks) });
  }

  if (days >= 0.95) {
    if (days < 1.25) return translate_textkeys("menu.relative_time.day_less", lang);
    if (days < 1.5) return translate_textkeys("menu.relative_time.day_more", lang);
    return translate_textkeys("menu.relative_time.days", lang, { time: Math.round(days) });
  }

  if (hours >= 0.95) {
    if (hours < 1.25) return translate_textkeys("menu.relative_time.hour", lang);
    if (hours < 1.75) return translate_textkeys("menu.relative_time.hour_half", lang);
    return translate_textkeys("menu.relative_time.hours", lang, { time: Math.round(hours) });
  }

  if (minutes >= 1) {
    if (minutes < 1.5) return translate_textkeys("menu.relative_time.minute", lang);
    if (minutes < 15) return translate_textkeys("menu.relative_time.minutes", lang, { time: Math.round(minutes) });
    if (minutes < 20) return translate_textkeys("menu.relative_time.quarter_hour", lang);
    if (minutes < 40) return translate_textkeys("menu.relative_time.half_hour", lang);
    if (minutes < 55) return translate_textkeys("menu.relative_time.three_quarters_hour", lang);
    return translate_textkeys("menu.relative_time.hour", lang);
  }

  if (seconds < 10) return translate_textkeys("menu.relative_time.few_seconds", lang);
  if (seconds < 30) return translate_textkeys("menu.relative_time.less_than_half_minute", lang);
  return translate_textkeys("menu.relative_time.half_minute", lang);
}



let do_translate_textkeys = true

function translate_textkeys(key, lang, vars = {}) {
  const entry = textkeys[key];
  if (!entry || !do_translate_textkeys) return key;

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




function translate_soundkeys(key, player) {
  const entry = soundkeys[key];
  if (!entry) return undefined;


  const save_data = load_save_data()
  const idx = save_data[save_data.findIndex(e => e.id === player.id)];
  let mode;

  if (idx.custom_sounds == 1) {
    mode = "extern"
  } else if (idx.custom_sounds == 2 && entry["extern_l"]) {
    mode = "extern_l"
  } else {
    mode = "native";
  }

  if (world.isHardcore && entry.hardcore) {
    return entry.hardcore[mode];
  }

  if (save_data[0].global.status && entry.global && !save_data[0].challenge.active) {
    return entry.global[mode];
  }

  if (save_data[0].challenge.active && save_data[0].challenge.progress == 0 && entry.challenge_progress_0) {
    return entry.challenge_progress_0[mode];
  }

  if (save_data[0].challenge.active && save_data[0].challenge.progress == 1 && entry.challenge_progress_1) {
    return entry.challenge_progress_1[mode];
  }

  if (save_data[0].challenge.active && save_data[0].challenge.progress == 2 && entry.challenge_progress_2) {
    return entry.challenge_progress_2[mode];
  }

  return entry[mode];
}

// This function does not need a player (which also contains the position) but his ID
function convert_local_to_global(player_id) {
  let save_data = load_save_data();
  let player_save_data = save_data.findIndex(entry => entry.id === player_id);

  save_data[0].global.last_player_id = save_data[player_save_data].id

  save_data[0].counting_type = save_data[player_save_data].counting_type
  save_data[0].time.do_count = save_data[player_save_data].time.do_count
  save_data[0].time.timer = save_data[player_save_data].time.timer
  save_data[0].time.stopwatch = save_data[player_save_data].time.stopwatch

  save_data[0].global.status = true
  update_save_data(save_data)
}

function convert_global_to_local(disable_global) {
  let save_data = load_save_data();
  let player_save_data = save_data.findIndex(entry => entry.id === save_data[0].global.last_player_id);

  if (player_save_data) {
    save_data[player_save_data].counting_type = save_data[0].counting_type
    save_data[player_save_data].time.do_count = save_data[0].time.do_count
    save_data[player_save_data].time.timer = save_data[0].time.timer
    save_data[player_save_data].time.stopwatch = save_data[0].time.stopwatch
  } else {
      world.getAllPlayers().forEach(t => {
        let lang = save_data[save_data.findIndex(entry => entry.id === t.id)].lang
        t.sendMessage("§l§7[§f"+ translate_textkeys("message.header.error", lang) + "§7]§r "+translate_textkeys("message.body.convert_global_to_local.error", lang, {name: save_data[0].global.last_player_id}))
    });
  }

  if (disable_global) {
    save_data[0].global.status = false
  } else {
    save_data[0].global.last_player_id = save_data[player_save_data].id
  }

  update_save_data(save_data)
}

function start_cm_timer() {
  let save_data = load_save_data();
  save_data[0].challenge.progress = 1
  save_data[0].time.do_count = true

  if(save_data[0].challenge.goal.pointer == 0) {
    const availableEntities = goal_entity_list.filter(g => {
      const id = g.id;
      const baseId = id.replace(/^minecraft:/, "");

      if (goal_entity_blocklist.find(blocked => blocked.id === baseId)) return false;

      if (id.startsWith("minecraft:")) return true;

      return false;
    });
    const availableEvents   = goal_event.filter(g => g.condition(save_data));

    const totalEntities = availableEntities.length;
    const totalEvents   = availableEvents.length;
    const totalOptions  = totalEntities + totalEvents;

    const r = Math.floor(Math.random() * totalOptions);

    if (r < totalEntities) {
      const chosenEntity = availableEntities[r];

      save_data[0].challenge.goal.pointer = 1;
      save_data[0].challenge.goal.entity_id = chosenEntity.id;
    } else {
      const idxInEvents = r - totalEntities;
      const chosenEvent = availableEvents[idxInEvents];
      const realIndex   = goal_event.findIndex(g => g.name === chosenEvent.name);

      save_data[0].challenge.goal.pointer    = 2;
      save_data[0].challenge.goal.event_pos  = realIndex;
    }

    // Realtalk: Raw Text to the hell! It took me around 4 hours to implement it for this shitty "translate"
    world.getAllPlayers().forEach(t => {
      let lang = save_data[save_data.findIndex(entry => entry.id === t.id)].lang
      const parts =
      save_data[0].challenge.goal.pointer === 1
        ? [
            { text: translate_textkeys("message.body.challenge_start.goal.entity_prefix", lang) },
            { translate: "entity." + save_data[0].challenge.goal.entity_id.replace(/^minecraft:/, "") + ".name" },
            { text: "\n" },
          ]
      : save_data[0].challenge.goal.pointer === 2 && save_data[0].challenge.goal.event_pos === 0
        ? [
            { text: translate_textkeys("message.body.challenge_start.goal.event.time", lang) + apply_design(design, save_data[0].time.timer) + "\n" }
          ]
        : [
            { text: translate_textkeys("message.body.challenge_start.goal.event", lang) + goal_event[save_data[0].challenge.goal.event_pos].name + "\n" }
          ];

      t.sendMessage({
        rawtext: [
          { text: "§l§5[§d"+translate_textkeys("menu.goal.title", lang)+"§5]§r§f " },
          ...parts
        ]
      });
    })
  }

  world.getAllPlayers().forEach(t => {
    t.playSound(translate_soundkeys("challenge.starts", t));
    t.sendMessage("§l§7[§f"+ (independent? translate_textkeys("message.header.system", save_data[player_sd_index].lang) : translate_textkeys("message.header.system.client_mode", save_data[player_sd_index].lang)) + "§7]§r "+translate_textkeys("message.body.challenge_start", save_data[save_data.findIndex(entry => entry.id === t.id)].lang))
  });

  update_save_data(save_data);
}

function finished_cm_timer(rating, key_message, value, key_entity) {
  let save_data = load_save_data()
  save_data[0].challenge.progress = 2

  save_data[0].challenge.rating = rating
  save_data[0].time.do_count = false

  // Have to be rawtext!
  let rawArray;

  world.getAllPlayers().forEach(t => {
    let lang = save_data[save_data.findIndex(entry => entry.id === t.id)].lang

    const prefix = {
      text: rating === 1
        ? "§l§2[§a"+ translate_textkeys("menu.goal.title", lang) +"§2]§r "
        : "§l§4[§c"+ translate_textkeys("message.header.end", lang) +"§4]§r "
    };

    if (!key_entity) {
      rawArray = [prefix, {text: translate_textkeys(key_message, lang, value)}];
    } else {
      rawArray = [prefix, {text: translate_textkeys(key_message[0], lang, value)}, {translate: key_entity}, {text: translate_textkeys(key_message[1], lang, value)}];
    }

    world.sendMessage({ rawtext: rawArray });


    t.playSound(translate_soundkeys(rating == 1? "challenge.end.good" : "challenge.end.bad", t));
    t.onScreenDisplay.setTitle(rating == 1? translate_textkeys("message.title.challenge_end.good", lang) : translate_textkeys("message.title.challenge_end.bad", lang));
  });

  update_save_data(save_data);
}

function check_player_gamemode(player) {
  const { challenge, time } = load_save_data()[0];
  const gm = player.getGameMode();

  if (challenge.progress === 0 && !world.isHardcore) {
    const target = "creative";
    if (gm !== target) player.setGameMode(target);
  }

  if (challenge.progress === 1 && !world.isHardcore) {
    const target = time.do_count ? "survival" : "spectator";
    if (gm !== target) player.setGameMode(target);
  }

  if (challenge.progress === 2) {
    let target;
    if (challenge.rating === 1) {
      target = "creative";
    } else {
      target = "spectator";
    }
    if (gm !== target) player.setGameMode(target);
  }
}


function check_difficulty() {
  let save_data = load_save_data();

  if (world.getDifficulty() !== "Easy" && save_data[0].challenge.difficulty == 0) {
    world.setDifficulty("Easy")
  }

  if (world.getDifficulty() !== "Normal" && save_data[0].challenge.difficulty == 1) {
    world.setDifficulty("Normal")
  }
  // It's somehow unnecessary because hardcore is always "hard" but whatever :)
  if (world.getDifficulty() !== "Hard" && save_data[0].challenge.difficulty > 1) {
    world.setDifficulty("Hard")
  }
}

function check_health(configuration) {
  let save_data = load_save_data();


  for (const player of world.getPlayers()) {
    let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
    const health = player.getComponent("health");

    if (configuration == "infinity") {
      if (save_data[0].challenge.difficulty == 4) {
        player.applyDamage(health.currentValue - 1)
      }

      if (save_data[0].challenge.difficulty == 3) {
        player.applyDamage(health.currentValue - save_data[player_sd_index].health)
        save_data[player_sd_index].health = health.currentValue
      }
    } else if (configuration == "resistance" && health.currentValue > 0) {
      health.resetToMaxValue();
    }
    update_save_data(save_data)
  }

}

function render_task_list(player) {
  let save_data = load_save_data();
  let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang
  const lines = [];

  // difficulty
  if ([2, 3, 4].includes(save_data[0].challenge.difficulty)) {
    lines.push({
      text: "- " + translate_textkeys(
        `menu.render_task_list.difficulty.${save_data[0].challenge.difficulty}`,
        lang
      ) + "\n"
    });
  }


  // goals pointer 0 = random
  if (save_data[0].challenge.goal.pointer === 0) {
    lines.push({ text: "- "+translate_textkeys("menu.render_task_list.goal.random", lang)+"\n" });
  }

  // goals pointer 1 = defeat specific entity
  if (save_data[0].challenge.goal.pointer === 1) {
    lines.push({ text: "- "+ translate_textkeys("menu.render_task_list.goal.entity", lang) });
    lines.push({translate: "entity." + save_data[0].challenge.goal.entity_id.replace(/^minecraft:/, "") + ".name"});
    lines.push({ text: "\n" });
  }

  // goals pointer 2 = event/time-based
  if (save_data[0].challenge.goal.pointer === 2 && save_data[0].challenge.goal.event_pos === 0) {
    // survive timer only
    lines.push({ text: "- " + translate_textkeys("menu.render_task_list.goal.event.time.timer", lang) + getRelativeTime(save_data[0].time.timer / 20, player) + "\n" });
  } else {
    // time available
    if (save_data[0].counting_type === 1) {
      lines.push({ text: "-  " + translate_textkeys("menu.render_task_list.goal.event.time", lang) + getRelativeTime(save_data[0].time.timer / 20, player) + "§r§f\n" });
    }
    // goal event
    if (save_data[0].challenge.goal.pointer === 2) {
      lines.push({ text: "- "+ translate_textkeys("menu.render_task_list.goal.event", lang) + goal_event[save_data[0].challenge.goal.event_pos].name + "§r§f\n" });
    }
  }

  return lines;
}

function enable_gamerules(doDayLightCycle) {
  world.gameRules.doDayLightCycle = doDayLightCycle;
  world.gameRules.playerssleepingpercentage = doDayLightCycle? 101 : 100;
  world.gameRules.doEntityDrops = true;
  world.gameRules.doFireTick = true;
  world.gameRules.doWeatherCycle = true;
  world.gameRules.doMobSpawning = true;
}

function disable_gamerules() {
  world.gameRules.doDayLightCycle = false;
  world.gameRules.playerssleepingpercentage = 101;
  world.gameRules.doEntityDrops = false;
  world.gameRules.doFireTick = false;
  world.gameRules.doWeatherCycle = false;
  world.gameRules.doMobSpawning = false;
}

world.afterEvents.dataDrivenEntityTrigger.subscribe((eventData) => {
    const entity = eventData.entity;
    const triggerId = eventData.eventId;

    let save_data = load_save_data()

    if (entity.typeId === "minecraft:villager_v2" && triggerId === "minecraft:start_celebrating" && save_data[0].challenge.progress == 1 && save_data[0].time.do_count && save_data[0].challenge.goal.pointer == 2 && save_data[0].challenge.goal.event_pos == 1) {
      finished_cm_timer(1, "message.body.challenge_end.raid")
    }
});

world.afterEvents.entityDie.subscribe(event => {
  const save_data = load_save_data();

  if (save_data[0].challenge.progress == 1 && save_data[0].time.do_count && save_data[0].challenge.goal.pointer == 1 && event.deadEntity?.typeId === save_data[0].challenge.goal.entity_id) {
    if (event.deadEntity?.typeId == "minecraft:player") {
      return finished_cm_timer(1, "message.body.challenge_end.player", {name: event.deadEntity.name })
    } else {
      return finished_cm_timer(1, ["message.body.challenge_end.entity_0", "message.body.challenge_end.entity_1"], {}, ("entity."+save_data[0].challenge.goal.entity_id.replace(/^minecraft:/, "")+".name"))
    }
  }

  if (event.deadEntity?.typeId === "minecraft:player") {
    const player = event.deadEntity;
    const player_sd_index = save_data.findIndex(entry => entry.id === player.id);

    if (save_data[0].challenge.difficulty > 0 && save_data[0].challenge.progress == 1 && save_data[0].time.do_count) {
      finished_cm_timer(0, "message.body.challenge_end.bad", {time: apply_design(
        (
          typeof save_data[player_sd_index].design === "number"
            ? design_template.find(t => t.id == save_data[player_sd_index].design).content
            : save_data[player_sd_index].design
        ).find(item => item.type === "ui"),
        (save_data[0].counting_type == 0? save_data[0].time.stopwatch : save_data[0].time.last_value_timer - save_data[0].time.timer)
      )})
    }
  }
});




/*------------------------
Actionbar
-------------------------*/

function apply_design(design, time) {
  let timeValues = {};
  const allUnits = ["y","w","d","h","m","s","ms"];

  // 1) Zeit in Einheiten zerlegen
  if (design.type === "day") {
    // Tages-Modus bleibt unverändert
    const T = 24000, M = 86400000, O = 6 * 3600000;
    let rm = ((time / T) * M + O) % M;
    timeValues = {
      y: 0, w: 0, d: 0,
      h: Math.floor(rm / 3600000),
      m: Math.floor((rm % 3600000) / 60000),
      s: Math.floor((rm % 60000) / 1000),
      ms: Math.floor((rm % 1000) / 10)
    };
  } else {
    // Normal- & Playtime-Modus: Zeit in ms und nur für vorhandene Marker zerlegen
    let remainingMs = (time / 20) * 1000;
    const msPer = {
      y: 365.25 * 24 * 3600 * 1000,
      w:          7 * 24 * 3600 * 1000,
      d:              24 * 3600 * 1000,
      h:                   3600 * 1000,
      m:                        60 * 1000,
      s:                             1000,
      ms:                             10
    };
    // Welche Einheiten sind im Design überhaupt vorhanden?
    const used = new Set(
      (design.blocks || [])
        .filter(b => b.type === "marker" && allUnits.includes(b.marker))
        .map(b => b.marker)
    );
    // Für jede Einheit: wenn verwendet, extrahieren, sonst 0 lassen und ms im Rest belassen
    for (let u of allUnits) {
      if (used.has(u)) {
        const val = Math.floor(remainingMs / msPer[u]);
        timeValues[u] = val;
        remainingMs -= val * msPer[u];
      } else {
        timeValues[u] = 0;
      }
    }
  }

  // 2) Basis-Verarbeitung der Blöcke
  const blocks = (design.blocks || []).map(b => ({
    ...b,
    valueNum: b.type === "marker" ? (timeValues[b.marker] || 0) : undefined,
    show:      false,
    _useFull:  false,
    _useAbbr:  false,
    ifAllZeroCandidate: false
  }));

  // 3) Prüfen auf Playtime‑Modus (largest-Flag)
  const playMode = blocks.some(b => b.type==="marker" && b.largest);

  if (playMode) {
    // Playtime: größte Unit + alle folgenden anzeigen (auch wenn 0)
    const markers = blocks.filter(b => b.type==="marker");
    let hit = false;
    for (let b of markers) {
      if (!hit && b.valueNum > 0) {
        b.show = true; b._useFull = true; hit = true;
      } else if (hit) {
        b.show = true; b._useAbbr = true;
      } else {
        b.show = false;
      }
    }
    // Sonderfall: alles 0 → Sekunden voll anzeigen
    if (!hit) {
      const sec = markers.find(b => b.marker==="s");
      if (sec) { sec.show = true; sec._useFull = true; }
    }
  } else {
    // Alter Modus: alwaysShow-/ifAllZero‑Logik
    for (let b of blocks) {
      if (b.type !== "marker") continue;
      const v = b.valueNum;
      if (v !== 0) b.show = true;
      else if (b.alwaysShow === true || b.alwaysShow === "always") b.show = true;
      else if (b.alwaysShow === "ifAllZero") b.ifAllZeroCandidate = true;
      else if (typeof b.alwaysShow === "object" && b.alwaysShow.condition === "ifGreater") {
        const anyGreater = b.alwaysShow.units.some(u => (timeValues[u] || 0) > 0);
        if (anyGreater) b.show = true;
      }
    }
    // ifAllZero-Fallback
    const any = blocks.some(b => b.type==="marker" && b.show);
    if (!any) {
      blocks.forEach(b => {
        if (b.type==="marker" && b.ifAllZeroCandidate) b.show = true;
      });
    }
  }

  // 4) String-Zusammenbau
  let result = "";
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];

    // → Text‑Block: evtl. nur show, wenn w,d,h==0
    if (b.type === "text") {
      if (b.showIfUnitsZero) {
        if (timeValues.w===0 && timeValues.d===0 && timeValues.h===0) {
          result += b.text;
        }
      } else {
        result += b.text;
      }
      continue;
    }

    // → Marker-Block
    if (b.type === "marker" && b.show) {
      // Separator before
      if (b.separator?.enabled && ["before","both"].includes(b.separator.position)) {
        const prev = blocks.slice(0,i).some(x => x.type==="marker" && x.show);
        if (prev) result += b.separator.value;
      }
      // Wert mit Padding
      const raw = String(b.valueNum);
      const val = b.padZero && raw.length===1 ? "0"+raw : raw;
      result += val;
      // Suffix wählen
      if (b._useFull) {
        const { singular, plural } = b.suffixFull;
        result += (b.valueNum===1 ? singular : plural);
      } else if (b._useAbbr) {
        result += b.suffixAbbr || "";
      } else {
        if (typeof b.suffix === "string") result += b.suffix;
        else if (typeof b.suffix === "object") {
          const { singular, plural } = b.suffix;
          result += (b.valueNum===1 ? singular : plural);
        }
      }
      // Separator after
      if (b.separator?.enabled && ["after","both"].includes(b.separator.position)) {
        const next = blocks.slice(i+1).some(x => x.type==="marker" && x.show);
        if (next) result += b.separator.value;
      }
    }
  }

  // 5) Tages‑Farblogik (unverändert)
  if (design.type==="day" && Array.isArray(design.colorConfig) && design.colorConfig.length>=3) {
    const h = Number(timeValues.h), m = Number(timeValues.m);
    const tot = h*60 + m;
    const color = tot<(4*60+30)||h>=19
                ? design.colorConfig[0]
                : ((tot>=(4*60+30)&&tot<(6*60))||(h>=17&&h<19))
                ? design.colorConfig[1]
                : design.colorConfig[2];
    result = color + result;
  }

  return result;
}



/*------------------------
 Menus
-------------------------*/


function initialize_main_menu(player, lauched_by_addon, lauched_by_joining) {
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  if (independent || lauched_by_addon) {

    // open Setup menu
    if (save_data[player_sd_index].setup !== 100 && save_data[0].use_setup) {
      player.playSound(translate_soundkeys("menu.open", player));
      player.playMusic(translate_soundkeys("music.menu.setup", player), { fade: 0.3, loop: true });
      return setup_menu(player)
    }

    // Version update popup
    if (save_data[player_sd_index].op && (Math.floor(Date.now() / 1000)) > save_data[0].update_message_unix && lauched_by_joining) {
      player.playMusic(translate_soundkeys("music.menu.setup", player), { fade: 0.3 });
      let form = new ActionFormData();
      let lang = save_data[player_sd_index].lang
      form.title(translate_textkeys("menu.update.title", lang));
      form.body(translate_textkeys("menu.update.description", lang, {time: getRelativeTime(Math.floor(Date.now() / 1000) - version_info.unix, player)}));
      form.button(translate_textkeys("menu.update.mute", lang));

      const showForm = async () => {
        form.show(player).then((response) => {
          if (response.canceled && response.cancelationReason === "UserBusy") {
            showForm()
          } else {
            if (response.selection === 0) {
              save_data[0].update_message_unix = (Math.floor(Date.now() / 1000)) + version_info.update_message_period_unix;
              update_save_data(save_data);
            }
            if (response.selection == undefined ) {
              return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
            }
          }
        });
      };
      showForm();
    }


    // Preventing the main menu from opening every time when a player joined the game
    if (lauched_by_joining) return -1

    // open Main menu
    if (!lauched_by_addon) {
      player.playSound(translate_soundkeys("menu.open", player));
    }
    player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
    return main_menu(player)

  }









}

function setup_menu(player) {
  let save_data = load_save_data()
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang



  /*
  ### Admins
  - Language
  - UTC (20%)
  - Updates (60%)
  - Custome Sounds (80%)
  - Challenge Mode (90%)
  - Intruduction (100%)


  ### Members
  - Language (0%)
  - Custome Sounds (50%)
  - Intruduction (100%)
  */


  // Lang (SD from older Version will triger the setup)
  if (save_data[player_sd_index].setup < 20) {
    return settings_lang(player, true)
  }

  // Admin: UTC
  if (save_data[player_sd_index].setup == 20 && save_data[player_sd_index].op) {
    if (save_data[0].utc !== undefined) {
      save_data[player_sd_index].setup = 60
      update_save_data(save_data)
      return setup_menu(player)
    }
    return settings_time_zone(player, 0, true)
  }

  // Admin: Universel Updater
  if (save_data[player_sd_index].setup == 60 && save_data[player_sd_index].op) {
    let gen = uu_find_gen()

    if (typeof(gen) === 'number') {
      return universel_updater(player, gen)
    } else {
      save_data[player_sd_index].setup = 80
      update_save_data(save_data)
      return setup_menu(player)
    }
  }

  // Custome Sounds
  if ((save_data[player_sd_index].setup == 80 && save_data[player_sd_index].op) || save_data[player_sd_index].setup == 50 && !save_data[player_sd_index].op) {
    return settings_cs_setup(player, true)
  }

  // Challenge Mode
  if (save_data[player_sd_index].setup == 90 && save_data[player_sd_index].op) {
    if (world.isHardcore || save_data[0].challenge.active) {
      save_data[player_sd_index].setup = 100
      update_save_data(save_data)
      return setup_menu(player)
    } else {
      return splash_challengemode(player, true)
    }
  }

  // Intruduction
  if (save_data[player_sd_index].setup == 100) {
    let form = new ActionFormData();
    form.title(translate_textkeys("menu.setup.title", lang));
    if (world.isHardcore) {
      form.body(translate_textkeys("menu.setup.description.hardcore", lang, {name: save_data[player_sd_index].name}));
    } else {
      form.body(translate_textkeys("menu.setup.description", lang, {name: save_data[player_sd_index].name}));
    }
    form.button(translate_textkeys("menu.main.title", lang));

    form.show(player).then((response) => {
      player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.open_menu", lang))
      if (response.selection == undefined ) {
        return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      }

      if (response.selection === 0) {
        player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3 });
        main_menu(player)
      }

    })

  }
}



function soundkey_test(player, version) {
  let form = new ActionFormData();
  let save_data = load_save_data()
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let actions = []
  form.title("soundkey_test")

  if (version == 1 || version == 2) {
    form.body("Select an sound you want to play!")
    for (const key in soundkeys) {
      const sound = soundkeys[key];

      if (version == 2 ? sound.extern : sound.extern_l) {
        form.button(version == 2 ? sound.extern : sound.extern_l, "textures/ui/sound_glyph_color_2x");
        actions.push(() => {
          player.playMusic(version == 2 ? sound.extern : sound.extern_l, { fade: 0.3});
          player.queueMusic(translate_soundkeys("music.menu.settings.debug", player), { fade: 0.3, loop: true });
          soundkey_test(player, version);
        });
      }

      for (const subKey in sound) {
        const subsound = sound[subKey];

        if (version == 2 ? subsound.extern : subsound.extern_l) {
          form.button(version == 2 ? subsound.extern : subsound.extern_l, "textures/ui/sound_glyph_color_2x");
          actions.push(() => {
            player.playMusic(version == 2 ? subsound.extern : subsound.extern_l, { fade: 0.3 });
            player.queueMusic(translate_soundkeys("music.menu.settings.debug", player), { fade: 0.3, loop: true });
            soundkey_test(player, version);
          });
        }
      }
    }
    form.button("");
    actions.push(() => {
      soundkey_test(player, undefined);
    });
  } else {
    form.body("Choose an interpret!")
    form.button("V2 (latest)");
    form.button("V1 (legacy)");

    actions.push(() => {
      soundkey_test(player, 2);
    });

    actions.push(() => {
      soundkey_test(player, 1);
    });

    if (version_info.release_type === 0 && save_data[player_sd_index].op) {
      form.button("");
      actions.push(() => {
        debug_main(player);
      });
    }
  }


  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (actions[response.selection]) {
      actions[response.selection]();
    }
  })

}

function main_menu_actions(player, form) {
  let actions = []
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)
  let lang = save_data[player_sd_index].lang;


  if (form) {
    if (save_data[0].challenge.active && save_data[0].challenge.progress == 1) {
      form.body({rawtext:[
        { text: translate_textkeys("menu.main.description.ca", lang) + "\n" },
        ...render_task_list(player),
        { text: "\n" }
      ]});

    } else {
    form.body(translate_textkeys("menu.general.description", lang));
    }
  }

  let timedata;
  if (save_data[0].global.status) {
    timedata = save_data[0]
  } else {
    timedata = save_data[player_sd_index]
  }

  if (!save_data[0].global.status || save_data[0].global.status && save_data[player_sd_index].op) {
    if (timedata.counting_type == 0 || timedata.counting_type == 1) {

      if (((timedata.counting_type == 0 || (timedata.counting_type == 1 & timedata.time.timer > 0)) && (!save_data[player_sd_index].afk || save_data[0].global.status || timedata.time[timedata.counting_type == 1 ? "timer" : "stopwatch"] == 0) &&  !save_data[0].challenge.active)  || (save_data[0].challenge.active && save_data[0].challenge.progress == 1 && (!world.isHardcore || world.isHardcore && save_data[player_sd_index].allow_unnecessary_inputs))) {
        if(form){form.button(translate_textkeys("message.header.condition", lang)+" " + (world.isHardcore? translate_textkeys("menu.item_experimental", save_data[player_sd_index].lang) +"§r\n" : "\n") + (timedata.time.do_count === true ? "§a"+translate_textkeys("menu.main.condition.resumed", lang) : "§c"+translate_textkeys("menu.main.condition.paused", lang)), (timedata.time.do_count === true ? "textures/ui/toggle_on" : "textures/ui/toggle_off"))}
        actions.push(() => {
          player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
          if (timedata.time.do_count === false) {
            timedata.time.do_count = true;

            (save_data[0].global.status ? world.getAllPlayers() : [player]).forEach(t => {
              t.sendMessage("§l§2[§a"+ translate_textkeys("message.header.condition", lang) +"§2]§r "+translate_textkeys("message.body.condition.resume", lang));
              if (t.id == player.id && save_data[player_sd_index].custom_sounds > 0) {
                player.queueMusic(translate_soundkeys("condition.resumed", t))
              } else {
                t.playSound(translate_soundkeys("condition.resumed", t));
              }

              if (world.isHardcore) {
                player.applyDamage(20 - save_data[player_sd_index].health)
              }
            });
          } else {
            timedata.time.do_count = false;

            (save_data[0].global.status ? world.getAllPlayers() : [player]).forEach(t => {
              t.sendMessage("§l§4[§c"+translate_textkeys("message.header.condition", lang)+"§4]§r "+translate_textkeys("message.body.condition.paused", lang));
              if (t.id == player.id && save_data[player_sd_index].custom_sounds > 0) {
                player.queueMusic(translate_soundkeys("condition.paused", t))
              } else {
                t.playSound(translate_soundkeys("condition.paused", t));
              }

              if (world.isHardcore) {
                save_data[player_sd_index].health = player.getComponent("health").currentValue
              }
            });
          }
          update_save_data(save_data);
        });
      }

      if (timedata.time[timedata.counting_type == 1 ? "timer" : "stopwatch"] > 0 && !save_data[0].challenge.active) {
        if (!save_data[0].global.status) {
          if(form){form.button(translate_textkeys("menu.main.afk.title", lang)+"\n" + (save_data[player_sd_index].afk === true ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), (save_data[player_sd_index].afk === true ? "textures/ui/toggle_on" : "textures/ui/toggle_off"))}
          actions.push(() => {
            if (save_data[player_sd_index].afk) {
              save_data[player_sd_index].afk = false
            } else {
              save_data[player_sd_index].afk = true
            }

            update_save_data(save_data);
            main_menu(player);
          });
        }

        if(form){form.button("§c"+translate_textkeys("menu.main.reset.title", lang, {mode: (timedata.counting_type == 1 ? translate_textkeys("menu.mode.timer", save_data[player_sd_index].lang) : translate_textkeys("menu.mode.stopwatch", save_data[player_sd_index].lang))}), "textures/ui/recap_glyph_color_2x")}
        actions.push(() => {
          timedata.time[timedata.counting_type == 1 ? "timer" : "stopwatch"] = 0;
          timedata.time.do_count = false;
          save_data[player_sd_index].afk = false

          update_save_data(save_data);
          main_menu(player);
        });
      }
    }

    /*------------------------
      Only Challenge mode
    -------------------------*/

    const challenge = save_data[0].challenge;
    const isHardcore = difficulty[challenge.difficulty].is_hardcore;

    if (challenge.progress === 1) {
      if (form) form.button("§c"+translate_textkeys("menu.popup.give_up", lang), "textures/blocks/barrier");
      actions.push(() => {
        splash_end_challenge(player)
      });
    }

    if (challenge.progress === 2 && (isHardcore && challenge.rating === 1 || !isHardcore)) {
      if (form) form.button("§a"+translate_textkeys("menu.main.reset.title.ca", lang), "textures/ui/recap_glyph_color_2x");

      actions.push(() => {
        if (challenge.rating === 1) {
          challenge.goal.pointer = 0;
        } else {
          save_data[0].time[timedata.counting_type == 1 ? "timer" : "stopwatch"] = 0;
          world.setTimeOfDay(0);
          world.getDimension("overworld").setWeather("Clear");
        }

        challenge.progress = 0;
        update_save_data(save_data);
        player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3 , loop: true});
        main_menu(player);
      });
    }


    if (challenge.active && challenge.progress == 0) {
      if (timedata.counting_type == 0 || (timedata.counting_type == 1 & timedata.time.timer > 0)) {
        if (form) form.button("§2" + translate_textkeys("menu.popup.ca.start", lang) +"\n", "textures/gui/controls/right");
        actions.push(() => {
          splash_start_challenge(player);
        });
      }

      if (form) form.button({rawtext:
        [
          { text: "§5"+translate_textkeys("menu.goal.title", lang)+"§9\n" },
          challenge.goal.pointer === 2
            ? { text: goal_event[challenge.goal.event_pos].name }
            : challenge.goal.pointer === 0
            ? { text: translate_textkeys("menu.goal.random.title", lang) }
            : { translate: "entity." + save_data[0].challenge.goal.entity_id.replace(/^minecraft:/, "") + ".name" }
        ]},
        "textures/items/elytra"
      );

      actions.push(() => {
        player.playMusic(translate_soundkeys("music.menu.goal", player), { fade: 0.3 , loop: true});
        settings_goals_main(player);
      });

      if (form) form.button("§c"+translate_textkeys("menu.difficulty.title", lang)+"\n" + difficulty[challenge.difficulty].name + "", difficulty[challenge.difficulty].icon);
      actions.push(() => {
        player.playMusic(translate_soundkeys("music.menu.difficulty", player), { fade: 0.3 , loop: true});
        settings_difficulty(player);
      });
    }


    if (save_data[player_sd_index].op && !challenge.active && timedata.counting_type !== 2) {
      if(form){form.button(translate_textkeys("menu.popup.shared_timer.title", lang)+ "\n§9" + (save_data[0].global.status ? translate_textkeys("menu.popup.shared_timer.by", lang, {player: save_data.find(e => e.id === save_data[0].global.last_player_id)?.name}) : translate_textkeys("menu.toggle_off", lang)), "textures/ui/FriendsIcon")};
      actions.push(() => {
        splash_globalmode(player);
      });
    }

    // "Change / add time" button
    if (!(challenge.active && challenge.progress > 0) && timedata.counting_type !== 2) {
      if (form) {
        form.button(
          (challenge.active ? translate_textkeys("menu.start_time.title.ca", lang)+"\n" : translate_textkeys("menu.start_time.title", lang)+"\n") +
          apply_design(
            (
              typeof save_data[player_sd_index].design === "number"
                ? design_template.find(t => t.id == save_data[player_sd_index].design).content
                : save_data[player_sd_index].design
            ).find(item => item.type === "ui"),
            timedata.time[timedata.counting_type == 1 ? "timer" : "stopwatch"]
          ),
          "textures/ui/color_plus"
        );
      }
      actions.push(() => {
        player.playMusic(translate_soundkeys("music.menu.time", player), { fade: 0.3, loop: true });
        settings_start_time(player);
      });
    }
  }


  if ((save_data[player_sd_index].time_day_actionbar == true || timedata.counting_type == 3) && save_data[0].challenge.progress == 0) {
    if (save_data[player_sd_index].time_source === 1 && save_data[player_sd_index].op) {
      if(form){form.button(translate_textkeys("menu.main.sync_day_time", lang)+"\n" + (save_data[0].sync_day_time ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), (save_data[0].sync_day_time ? "textures/ui/toggle_on" : "textures/ui/toggle_off"))};
      actions.push(() => {
        if (!save_data[0].sync_day_time) {
          save_data[0].sync_day_time = true;
        } else {1
          save_data[0].sync_day_time = false;
        }
        update_save_data(save_data);
        main_menu(player);
      });
    }
  }

  if (save_data[player_sd_index].op && save_data[0].global.status && save_data[0].challenge.progress == 0 && !world.isHardcore && version_info.edition !== 1) {
    if(form){form.button(translate_textkeys("menu.popup.ca.title", lang)+"\n" + (save_data[0].challenge.active ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), save_data[0].challenge.active ? "textures/ui/toggle_on" : "textures/ui/toggle_off")};
    actions.push(() => {
      splash_challengemode(player);
    });
  }

  // Button: Settings
  if(form){form.button(translate_textkeys("menu.settings.title", lang), "textures/ui/automation_glyph_color")}
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
    settings_main(player);
  });

  if (!independent) {
    if(form){form.button("")}
    actions.push(() => {
      player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      player.runCommand("/scriptevent timerv:api_menu_parent")
    });
  }


  return actions
}

function main_menu(player) {
  let form = new ActionFormData();
  let save_data = load_save_data()
  let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang
  form.title(translate_textkeys("menu.main.title",lang));

  let actions = main_menu_actions(player, form);

  if (actions.length == 1 && !save_data[0].challenge.active || (actions.length == 1 && save_data[0].challenge.active && save_data[0].challenge.progress !== 1)) return actions[0]();

  // Das Formular anzeigen und anhand des Indexes der sichtbaren Buttons die jeweilige Aktion ausführen
  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (actions[response.selection]) {
      actions[response.selection]();
    }
  });
}

/*------------------------
 splash screens
-------------------------*/


function splash_challengemode(player, in_setup) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang

  form.title(translate_textkeys("menu.popup.ca.title", lang));
  form.body(
    (!save_data[0].challenge.active
      ? translate_textkeys("menu.popup.ca.description", lang)
      : translate_textkeys("menu.popup.ca.description_in_ca", lang))
    + "\n\n§7"+ translate_textkeys("menu.popup.ca.note", lang) +"\n\n"
  );

  form.button(!save_data[0].challenge.active ? "§a"+translate_textkeys("menu.enable", lang): "§c"+translate_textkeys("menu.disable", lang));
  form.button(in_setup? translate_textkeys("menu.button_skip", lang) : "");


  form.show(player).then((response) => {
    if (response.canceled) {
      if (in_setup) player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.setup.closed", lang))
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (response.selection == 0) {
      // Disable
      if (save_data[0].challenge.active) {
        convert_local_to_global(save_data[0].global.last_player_id);
        save_data = load_save_data()

      } /* Enable */ else {
        if (in_setup) {
          if (!save_data[0].global.status) convert_local_to_global(player.id); save_data = load_save_data()
        }
        convert_global_to_local(false);
        save_data = load_save_data()

        save_data[0].time.do_count = false
        save_data[0].time.timer = 0
        save_data[0].time.stopwatch = 0
        world.setTimeOfDay(0);
        world.getDimension("overworld").setWeather("Clear");

        if (save_data[0].counting_type == 0 && save_data[0].challenge.goal.pointer == 2 && save_data[0].challenge.goal.event_pos == 0) {
          save_data[0].challenge.goal.pointer = 0
        }
      }

      save_data[0].challenge.active = save_data[0].challenge.active ? false : true,
      update_save_data(save_data);
      if (!in_setup) {
        if (in_setup) player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.setup.closed", lang))
        player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
      }
    }
    if (in_setup) {
      save_data[player_sd_index].setup = 100
      update_save_data(save_data);
      return setup_menu(player);
    }

    return main_menu(player)
  });
}

function splash_start_challenge(player) {
  let form = new MessageFormData();
  let save_data = load_save_data()
  let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang

  form.title(translate_textkeys("menu.warning", lang));
  form.body({rawtext:[{text: translate_textkeys("menu.popup.ca.start.description", lang)}, ...render_task_list(player), {text: "\n\n"}]});

  form.button2("§a"+translate_textkeys("menu.start", lang));
  form.button1("");

  form.show(player).then((response) => {
    if (response.selection == 1) {
      player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      return start_cm_timer()
    }

    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }


    if (response.selection == 0) return main_menu(player);
  });
}

function splash_end_challenge(player) {
  let form = new MessageFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)
  let lang = save_data[player_sd_index].lang

  form.title(translate_textkeys("menu.warning", lang));
  form.body(translate_textkeys("menu.popup.give_up.description", lang, {hardcore: world.isHardcore? translate_textkeys("menu.popup.give_up.description.hardcore", lang) : ""}))

  form.button2("§c"+translate_textkeys("menu.popup.give_up", lang));
  form.button1("");

  form.show(player).then((response) => {
    if (response.selection == 1) {
        player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
        finished_cm_timer(0, "message.body.challenge_end.bad", {time: apply_design(
          (
            typeof save_data[player_sd_index].design === "number"
              ? design_template.find(t => t.id == save_data[player_sd_index].design).content
              : save_data[player_sd_index].design
          ).find(item => item.type === "ui"),
          (save_data[0].counting_type == 0? save_data[0].time.stopwatch : save_data[0].time.last_value_timer - save_data[0].time.timer)
        )})
    }

    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }


    if (response.selection == 0) return main_menu(player);
  });
}

function splash_globalmode(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)
  let lang = save_data[player_sd_index].lang
  let design = (typeof save_data[player_sd_index].design === "number"? design_template.find(t => t.id == save_data[player_sd_index].design).content : save_data[player_sd_index].design).find(item => item.type === "ui");
  let actions = [];

  form.title(translate_textkeys("menu.popup.shared_timer.title", lang));

  form.body(translate_textkeys("menu.popup.shared_timer.description", lang, {
    replace_text: save_data[0].global.status ? save_data[0].global.last_player_id !== player.id ? translate_textkeys("menu.popup.shared_timer.description.replace_time", lang, {name: save_data.find(e => e.id === save_data[0].global.last_player_id)?.name, own_time: apply_design(design, save_data[player_sd_index].time[save_data[player_sd_index].counting_type == 1 ? "timer" : "stopwatch"])}) : "" :
    translate_textkeys("menu.popup.shared_timer.description.contol", lang)
  }));

  if (save_data[0].global.status) {
    if (save_data[0].global.last_player_id !== player.id) {
      form.button("§e"+translate_textkeys("menu.popup.shared_timer.yours_instead", lang));
      actions.push(() => {
        convert_global_to_local(true);
        convert_local_to_global(player.id);
        player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
      });
    }

    form.button("§c"+translate_textkeys("menu.disable", lang));
    actions.push(() => {
      convert_global_to_local(true);
      player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
    });



  } else {
    form.button("§a"+translate_textkeys("menu.enable", lang));
    actions.push(() => {
      convert_local_to_global(player.id)
      player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
    });
  }

  form.button("");
  actions.push(() => {});


  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (actions[response.selection]) {
      actions[response.selection]();
      main_menu(player);
    }
  });

}


/*------------------------
 Settings
-------------------------*/

function settings_start_time(player) {
  const save = load_save_data();
  const idx  = save.findIndex(e => e.id === player.id);
  const lang = save[idx].lang
  const form = new ModalFormData().title(save[0].challenge.active ? translate_textkeys("menu.start_time.title.ca", lang) : translate_textkeys("menu.start_time.title", lang))
  const sd   = save[save[0].global.status ? 0 : idx];
  const allow = save[idx].allow_unnecessary_inputs;

  const MS = {
    year:   365.25 * 24 * 60 * 60 * 1000,
    day:         24 * 60 * 60 * 1000,
    hour:             60 * 60 * 1000,
    minute:                60 * 1000,
    second:                     1000
  };

  let totalMs = sd.time[sd.counting_type == 1 ? "timer" : "stopwatch"] * 50;

  function decomp(ms) {
    let y = Math.floor(ms / MS.year); ms %= MS.year;
    let dTot = Math.floor(ms / MS.day); ms %= MS.day;
    let w = Math.floor(dTot / 7), d = dTot % 7;
    let h = Math.floor(ms / MS.hour); ms %= MS.hour;
    let m = Math.floor(ms / MS.minute); ms %= MS.minute;
    let s = Math.floor(ms / MS.second); ms %= MS.second;
    return { y, w, d, h, m, s, ms };
  }

  let time = decomp(totalMs);
  if (allow && totalMs > MS.year * 9) {
    let rem = totalMs - MS.year * 9;
    const weeks = Math.floor(rem / (7 * MS.day));
    rem -= weeks * 7 * MS.day;

    const days = Math.floor(rem / MS.day);
    rem -= days * MS.day;

    const hours = Math.floor(rem / MS.hour);
    rem -= hours * MS.hour;

    const minutes = Math.floor(rem / MS.minute);
    rem -= minutes * MS.minute;

    const seconds = Math.floor(rem / MS.second);
    rem -= seconds * MS.second;

    const ms = rem;

    if (ms < 951) {
      time = { y: 9, w: weeks, d: days, h: hours, m: minutes, s: seconds, ms };
    }
  }

  if (!allow) {
    const extraDays = Math.floor(time.y * 365.25) + time.w * 7;
    time.d += extraDays;
  }

  if (allow) {
    form.slider(translate_textkeys("menu.start_time.unit.y", lang),        0,  9,   1, time.y);
    form.slider(translate_textkeys("menu.start_time.unit.w", lang),        0, 52,   1, time.w);
    form.slider(translate_textkeys("menu.start_time.unit.d", lang),         0,  6,   1, time.d);
  } else {
    form.slider(translate_textkeys("menu.start_time.unit.d", lang),         0, 30,   1, time.d);
  }
  form.slider(translate_textkeys("menu.start_time.unit.h", lang),        0, 23,   1, time.h);
  form.slider(translate_textkeys("menu.start_time.unit.m", lang),      0, 59,   1, time.m);
  form.slider(translate_textkeys("menu.start_time.unit.s", lang),      0, 59,   1, time.s);
  if (allow) form.slider(translate_textkeys("menu.start_time.unit.ms", lang),0,950,  50, time.ms);
  form.submitButton(translate_textkeys("menu.start_time.submit", lang));

  form.show(player).then(res => {
    if (res.canceled) return player.playMusic(translate_soundkeys("menu.close", player),{fade:0.3});
    let i=0, y=0, w=0, d=0;
    if (allow) { y=res.formValues[i++]; w=res.formValues[i++]; d=res.formValues[i++]; }
    else d=res.formValues[i++];
    const h=res.formValues[i++], m=res.formValues[i++], s=res.formValues[i++],
          ms=allow?res.formValues[i++]:0;
    const recomb = y*MS.year + w*7*MS.day + d*MS.day + h*MS.hour + m*MS.minute + s*MS.second + ms;
    const ticks = Math.floor(recomb/50);
    sd.time.timer = sd.time.last_value_timer = ticks;
    sd.counting_type = ticks>0?1:0;
    if (ticks===0 && save[0].challenge.active && save[0].challenge.goal.pointer===2 && save[0].challenge.goal.event_pos===0) {
      save[0].challenge.goal.pointer = 0;
    }
    update_save_data(save);
    player.playMusic(translate_soundkeys("music.menu.main", player),{fade:0.3,loop:true});
    return main_menu(player);
  });
}










function settings_difficulty(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id)
  let lang = save_data[player_sd_index].lang

  form.title(translate_textkeys("menu.difficulty.title", lang));
  form.body(translate_textkeys("menu.difficulty.description", lang) +
  (save_data[player_sd_index].allow_unnecessary_inputs? "" : (!world.isHardcore
    ? "\n§7"+ translate_textkeys("menu.difficulty.note", lang)
    : "\n§7"+ translate_textkeys("menu.difficulty.note.hardcore", lang))));


  let visibleDifficulties = [];

  difficulty.forEach((diff, index) => {
    if (diff.is_hardcore == world.isHardcore || save_data[player_sd_index].allow_unnecessary_inputs) {
      let name = diff.name;
      if (save_data[0].challenge.difficulty === index) {
        name += "\n"+translate_textkeys("menu.item_selected", save_data[player_sd_index].lang);
      }
      form.button(name, diff.icon);
      visibleDifficulties.push({ diff, index });
    }
  });

  form.button("");

  form.show(player).then((response) => {
    if (response.canceled) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (response.selection >= 0 && response.selection < visibleDifficulties.length) {
      let selected = visibleDifficulties[response.selection];
      save_data[0].challenge.difficulty = selected.index;
      update_save_data(save_data);
    }

    player.playMusic(translate_soundkeys("music.menu.main", player), {fade: 0.3});
    return main_menu(player);
  });
}


async function settings_cs_setup(player, in_setup) {
  const saveData = load_save_data();
  const idx = saveData.findIndex(e => e.id === player.id);

  const HEADER = in_setup ? "" : translate_textkeys("menu.settings.cs.result.header", saveData[idx].lang);
  const sep = in_setup ? "" : "\n";

  const tests = [
    {
      soundKey: "timer.test",
      saveValue: 1,
      resultMsg: HEADER + sep + translate_textkeys("menu.settings.cs.result.message_v1", saveData[idx].lang)
    },
    {
      soundKey: "timeru.test",
      saveValue: 2,
      resultMsg: HEADER + sep + translate_textkeys("menu.settings.cs.result.message_v2", saveData[idx].lang)
    }
  ];


  let heard = false;
  let finalMsg = HEADER + sep + translate_textkeys("menu.settings.cs.result.message_bad", saveData[idx].lang)

  for (const { soundKey, saveValue, resultMsg } of tests) {
    player.playMusic(soundKey, { fade: 0.5 });
    const resp = await new MessageFormData()
      .title(translate_textkeys("menu.settings.cs.title", saveData[idx].lang))
      .body(saveValue == 2? translate_textkeys("menu.settings.cs.description_0", saveData[idx].lang): translate_textkeys("menu.settings.cs.description_1", saveData[idx].lang))
      .button2(translate_textkeys("menu.settings.cs.button.yes", saveData[idx].lang))
      .button1(translate_textkeys("menu.settings.cs.button.no", saveData[idx].lang))
      .show(player);

    if (resp.canceled) {
      if (in_setup) player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.setup.closed", lang))
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (resp.selection === 1) {
      saveData[idx].custom_sounds = saveValue;
      update_save_data(saveData);
      finalMsg = resultMsg;
      heard = true;
      break;
    }
  }

  if (!heard) {
    saveData[idx].custom_sounds = 0;
    update_save_data(saveData);
  }

  player.playMusic(translate_soundkeys(in_setup? "music.menu.setup" : "music.menu.settings", player), {
    fade: 0.3,
    loop: true
  });
  await new ActionFormData()
    .title(translate_textkeys("menu.settings.cs.title", saveData[idx].lang))
    .body(finalMsg)
    .button(in_setup? translate_textkeys("menu.button_continue", saveData[idx].lang) : "")
    .show(player)
    .then((response) => {
      if (response.canceled) {
        if (in_setup) player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.setup.closed", lang))
        return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      }
      if (in_setup) {
        saveData[idx].setup = saveData[idx].op ? 90 : 100;
        update_save_data(saveData);
        return setup_menu(player)
      }
      settings_main(player);
    });
}





function settings_goals_main(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang
  const pointer = save_data[0].challenge.goal.pointer;

  form.title(translate_textkeys("menu.goal.title", lang));
  form.body(translate_textkeys("menu.general.description", lang));

  form.button({
    rawtext: [
      { text: translate_textkeys("menu.goal.entity", lang)+"\n"+translate_textkeys("menu.goal.entity.prefix", lang) },
      ...(pointer === 1
        ? [
            { text: ": " },
            { translate: "entity." + save_data[0].challenge.goal.entity_id.replace(/^minecraft:/, "") + ".name" }
          ]
        : [{ text: translate_textkeys("menu.goal.entity.fix", lang) }]
      )
    ]
  },
  pointer === 1 ? "textures/ui/realms_slot_check" : undefined);



  form.button(
    translate_textkeys("menu.goal.event", lang)+"\n"+translate_textkeys("menu.goal.event.subtitle", lang),
    pointer === 2 ? "textures/ui/realms_slot_check" : undefined
  );

  form.button(
    translate_textkeys("menu.goal.random", lang)+"\n"+translate_textkeys("menu.goal.random.subtitle", lang),
    pointer === 0 ? "textures/ui/realms_slot_check" : undefined
  );

  form.button("");

  form.show(player).then((response) => {
    if (response.canceled) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection === 0) {
      settings_goals_select(player, "entity")
    };
    if (response.selection === 1) return settings_goals_select(player, "event");
    if (response.selection === 2) {
      save_data[0].challenge.goal.pointer = 0;
      update_save_data(save_data);
      return settings_goals_main(player);
    }
    if (response.selection === 3) {
      player.playMusic(translate_soundkeys("music.menu.main", player), {fade: 0.3});
      return main_menu(player);
    }
  });
}


async function settings_goals_select(player, type) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang
  const isEvent = type === "event";
  const isRandom = save_data[0].challenge.goal.pointer === 0;
  const pointerValue = isEvent ? 2 : 1;
  const goalArray = isEvent ? goal_event : goal_entity_list; // für Entities goal_entity_list benutzen

  // Für Entity-Typen: aktuell gespeicherte entity_id
  const currentGoalID = (!isEvent && !isRandom && save_data[0].challenge.goal.pointer === 1)
    ? save_data[0].challenge.goal.entity_id
    : undefined;
  // Für Event-Typen: aktuell gespeicherter Event-Index
  const currentGoalIndex = (isEvent && !isRandom && save_data[0].challenge.goal.pointer === 2)
    ? save_data[0].challenge.goal.event_pos
    : undefined;

  form.title(translate_textkeys("menu.goal.title", lang)+" - " +(isEvent ? translate_textkeys("menu.goal.event", lang) : translate_textkeys("menu.goal.entity", lang)));
  form.body(translate_textkeys("menu.goal.description", lang));

  let visibleGoals;
  if (isEvent) {
    visibleGoals = goalArray.filter(goal => goal.condition(save_data));
  } else {
    visibleGoals = goalArray.filter(e => {
      const id = e.id;
      const baseId = id.replace(/^minecraft:/, "");
      if (!id.startsWith("minecraft:") && !save_data[player_sd_index].allow_unnecessary_inputs) return false;
      if (goal_entity_blocklist.find(blocked => blocked.id === baseId)) return false;
      return true;
    });
  }

  // Aktuelles Ziel ggf. oben anstellen und aus der Liste entfernen,
  // aber nur wenn pointer zum Typ passt
  let selectedGoal;
  if (isEvent && currentGoalIndex !== undefined) {
    const goal = goalArray[currentGoalIndex];
    if (visibleGoals.includes(goal)) {
      selectedGoal = goal;
      visibleGoals = visibleGoals.filter(g => g !== goal);
    }
  } else if (!isEvent && currentGoalID) {
    const goal = visibleGoals.find(g => g.id === currentGoalID);
    if (goal) {
      selectedGoal = goal;
      visibleGoals = visibleGoals.filter(g => g.id !== currentGoalID);
    }
  }

  visibleGoals.sort((a, b) => {
    return isEvent
      ? a.name.localeCompare(b.name)
      : a.id.localeCompare(b.id);
  });

  if (selectedGoal) {
    visibleGoals.unshift(selectedGoal);
  }

  visibleGoals.forEach(goal => {
    const realIndex = isEvent
      ? goalArray.findIndex(g => g.name === goal.name)
      : undefined;

    const pointer = save_data[0].challenge.goal.pointer;
    const isSelected = isEvent
      ? (pointer === 2 && currentGoalIndex === realIndex)
      : (pointer === 1 && currentGoalID === goal.id);

    const labelText = {
      rawtext: [
        isEvent
          ? { text: goal.name }
          : { translate: "entity." + goal.id.replace(/^minecraft:/, "") + ".name" },
        { text: isSelected
            ? "\n" + translate_textkeys("menu.item_selected", save_data[player_sd_index].lang)
            : ""
        },
      ],
    };

    const icon = goal.icon
      ? goal.icon
      : (!isEvent && goal_entity_exceptionlist[goal.id.replace(/^minecraft:/, "")]
        ? goal_entity_exceptionlist[goal.id.replace(/^minecraft:/, "")].icon
        : `textures/items/spawn_eggs/spawn_egg_${goal.id.replace(/^minecraft:/, "")}`);

    form.button(labelText, icon);
  });

  form.button("");
  form.show(player).then((response) => {
    if (response.canceled) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection < visibleGoals.length) {
      const selectedGoal = visibleGoals[response.selection];
      if (isEvent) {
        const realIndex = goalArray.findIndex(goal => goal.name === selectedGoal.name);
        save_data[0].challenge.goal.event_pos = realIndex;
      } else {
        save_data[0].challenge.goal.entity_id = selectedGoal.id;
      }
      save_data[0].challenge.goal.pointer = pointerValue;
      update_save_data(save_data);
    }
    if (response.selection >= 0) return settings_goals_main(player);
  });
}










function settings_time_zone(player, viewing_mode, in_setup) {
  const form = new ActionFormData();
  const actions = [];
  const save_data = load_save_data();
  const player_sd = save_data.find(entry => entry.id === player.id);
  const now = new Date();
  const TICKS = 24000, MILLIS_DAY = 86400000, START_OFFSET = 6 * 3600000;

  let current_utc = save_data[0].utc;

  if (current_utc === undefined) {
    viewing_mode = 3;
  }

  form.title(translate_textkeys("menu.settings.time_zone.title", player_sd.lang)).body(translate_textkeys("menu.settings.time_zone.description", player_sd.lang));

  const current_zone_index = timezone_list.findIndex(z => z.utc === current_utc)
    ?? timezone_list.reduce((closest, zone, i) =>
         Math.abs(zone.utc - current_utc) < Math.abs(timezone_list[closest].utc - current_utc) ? i : closest, 0);


  const getTicks = utc => {
    const total = (now.getHours() + utc) * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000 + Math.floor(now.getMilliseconds() / 10) * 10;
    const adj = (total - START_OFFSET + MILLIS_DAY) % MILLIS_DAY;
    return (adj / MILLIS_DAY) * TICKS;
  };

  const renderZoneButton = (zone, index) => {
    const ticks = getTicks(zone.utc);

    const design = typeof player_sd.design === "number"
      ? design_template.find(t => t.id === player_sd.design).content
      : player_sd.design;

    const label = (zone.name.length > 28 ? zone.short : zone.name) + "\n" +
                  apply_design(design.find(i => i.type === "day"), ticks);

    const utcHours = (now.getUTCHours() + zone.utc + 24) % 24;
    const utcMinutes = now.getUTCMinutes();
    const totalMinutes = utcHours * 60 + utcMinutes;

    const getTimeIcon = (minutes) => {
      if (minutes < 270) return "textures/ui/time_6midnight";        // 00:00–04:30
      if (minutes < 360) return "textures/ui/time_1sunrise";         // 04:30–06:00
      if (minutes < 720) return "textures/ui/time_2day";             // 06:00–12:00
      if (minutes < 1020) return "textures/ui/time_3noon";           // 12:00–17:00
      if (minutes < 1140) return "textures/ui/time_4sunset";         // 17:00–19:00
      return "textures/ui/time_5night";                              // 19:00–00:00
    };

    const icon = index === current_zone_index
      ? "textures/ui/realms_slot_check"
      : getTimeIcon(totalMinutes);

    form.button(label, icon);

    actions.push(() => {
      if (icon === "textures/ui/realms_slot_check") {
        save_data.forEach(entry => {
          if (entry.time_source === 1) {
            entry.time_source = 0;
          }
        });
        save_data[0].utc = undefined;
        update_save_data(save_data);
        settings_time_zone(player);
      } else {
        settings_time_zone_preview(player, zone, viewing_mode, in_setup);
      }
    });
  };




  const navButton = (label, icon, mode) => {
    form.button(label, icon);
    actions.push(() => settings_time_zone(player, mode));
  };

  const renderZones = (filterFn) => {
    timezone_list.forEach((zone, i) => {
      if (filterFn(i)) renderZoneButton(zone, i);
    });
  };

  if (viewing_mode === 0) {
    let start = Math.max(0, current_zone_index - 2);
    let end = Math.min(timezone_list.length - 1, current_zone_index + 2);

    if (start > 0) navButton(translate_textkeys("menu.settings.time_zone.show_previous", player_sd.lang), "textures/ui/up_arrow", 1);
    for (let i = start; i <= end; i++) renderZoneButton(timezone_list[i], i);
    if (end < timezone_list.length - 1) navButton(translate_textkeys("menu.settings.time_zone.show_later", player_sd.lang), "textures/ui/down_arrow", 2);
  } else {
    if (viewing_mode === 1) navButton(translate_textkeys("menu.settings.time_zone.show_less", player_sd.lang), "textures/ui/down_arrow", 0);
    if (viewing_mode === 2 && current_zone_index !== 0) navButton(translate_textkeys("menu.settings.time_zone.show_previous", player_sd.lang), "textures/ui/up_arrow", 3);
    if (viewing_mode === 3 && current_utc !== undefined) navButton(translate_textkeys("menu.settings.time_zone.show_less", player_sd.lang), "textures/ui/down_arrow", 2);

    renderZones(i =>
      viewing_mode === 3 ||
      (viewing_mode === 1 && i <= current_zone_index) ||
      (viewing_mode === 2 && i >= current_zone_index)
    );

    if (viewing_mode === 1 && current_zone_index !== timezone_list.length) navButton(translate_textkeys("menu.settings.time_zone.show_later", player_sd.lang), "textures/ui/down_arrow", 3);
    if (viewing_mode === 2) navButton(translate_textkeys("menu.settings.time_zone.show_less", player_sd.lang), "textures/ui/up_arrow", 0);
    if (viewing_mode === 3 && current_utc !== undefined) navButton(translate_textkeys("menu.settings.time_zone.show_less", player_sd.lang), "textures/ui/up_arrow", 1);
  }

  if (in_setup) {
    form.button(translate_textkeys("menu.button_skip", player_sd.lang));
    actions.push(() => {
      player_sd.setup = 60
      update_save_data(save_data);
      return setup_menu(player)
    });
  } else {
    form.button("");
    actions.push(() => {
      player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
      settings_main(player);
    });
  }

  form.show(player).then(res => {
    if (res.selection === undefined) {
      if (in_setup) player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.setup.closed", lang))
      player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    } else {
      actions[res.selection]?.();
    }
  });
}


function settings_time_zone_preview (player, zone, viewing_mode, in_setup) {
  const save_data = load_save_data();
  const player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let form = new MessageFormData();
  const now = new Date();
  const TICKS = 24000, MILLIS_DAY = 86400000, START_OFFSET = 6 * 3600000;

  const getTicks = utc => {
    const total = (now.getHours() + utc) * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000 + Math.floor(now.getMilliseconds() / 10) * 10;
    const adj = (total - START_OFFSET + MILLIS_DAY) % MILLIS_DAY;
    return (adj / MILLIS_DAY) * TICKS;
  };

  const ticks = getTicks(zone.utc);

  const design = typeof save_data[player_sd_index].design === "number"
    ? design_template.find(t => t.id === save_data[player_sd_index].design).content
    : save_data[player_sd_index].design;


  form.title(translate_textkeys("menu.settings.time_zone.title", save_data[player_sd_index].lang));
  form.body(
    "Time zone: " + zone.name +
    "\nUTC: "+ (zone.utc >= 0 ? "+" : "") + zone.utc +
    "\nTime: " + apply_design(design.find(i => i.type === "day"), ticks) +
    "§r\nLocation: " + zone.location.join(", ") +
    "\n\nDo you want to use this time zone?\n "
  )

  form.body(translate_textkeys(
    "menu.settings.time_zone.preview",
    save_data[player_sd_index].lang,
    {
      name: zone.name,
      utc: zone.utc,
      time: apply_design(design.find(i => i.type === "day"), ticks),
      location: zone.location.join(", ")
    }

  ))

  form.button2(translate_textkeys("menu.button_switch", save_data[player_sd_index].lang, {name: zone.short}));
  form.button1("");

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      if (in_setup) player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.setup.closed", lang))
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection == 1) {
      save_data[0].utc = zone.utc;

      if (in_setup) {
        save_data[player_sd_index].setup = 60
        update_save_data(save_data);
        return setup_menu(player)
      }
      update_save_data(save_data);
      player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
      return settings_main(player);
    }
    settings_time_zone(player, viewing_mode, in_setup);
  });

}



function settings_main(player) {
  let form = new ActionFormData();
  let actions = [];
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang

  form.title(translate_textkeys("menu.settings.title", lang));
  form.body(translate_textkeys("menu.general.description", lang));

  // Button 0: Type
  if ((!save_data[0].global.status || (save_data[0].global.status && save_data[player_sd_index].op)) && ((save_data[0].challenge.active && save_data[0].challenge.progress == 0) || !save_data[0].challenge.active)) {
    form.button(
      translate_textkeys("menu.settings.type", lang) +
      "\n§9" + translate_textkeys(timer_modes[save_data[save_data[0].global.status ? 0 : player_sd_index].counting_type].label, lang),
      timer_modes[save_data[save_data[0].global.status ? 0 : player_sd_index].counting_type].icon
    );
    actions.push(() => settings_type(player));
  }


  // Button 1: Permission
  if (save_data[player_sd_index].op) {
    const players = world.getAllPlayers();
    const ids = players.map(p => p.id);
    const names = save_data.slice(1)
      .sort((a, b) =>
        ids.includes(a.id) && !ids.includes(b.id) ? -1 :
        ids.includes(b.id) && !ids.includes(a.id) ? 1 : 0
      )
      .map(e => e.name);

    if (names.length > 1) {
      form.button(translate_textkeys("menu.settings.permissions.title", save_data[player_sd_index].lang)+"\n" + (
        names.slice(0, -1).join(", ") + " & " + names[names.length - 1]
      ), "textures/ui/op");

      actions.push(() => {
        settings_rights_main(player, true);
        player.playMusic(translate_soundkeys("music.menu.settings.rights", player), { fade: 0.3, loop: true });
      });
    }
  }


  // Button 2: Actionbar
  form.button(translate_textkeys("menu.settings.actionbar.title", lang)+"\n" + render_live_actionbar(save_data[player_sd_index], false), "textures/ui/brewing_fuel_bar_empty");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings.actionbar", player), { fade: 0.3 , loop: true})
    settings_actionbar(player)
  });

  // Button 2.5: Gestures
  if (independent) {
    form.button(translate_textkeys("menu.settings.gestures.title", lang), "textures/ui/sidebar_icons/emotes");
    actions.push(() => {
      player.playMusic(translate_soundkeys("music.menu.settings.gestures", player), { fade: 0.3 , loop: true})
      settings_gestures(player)
    });
  }

  // Button 2.7: Language
  if (version_info.edition !== 1) {
    form.button(translate_textkeys("menu.settings.lang.title", lang)+"\n§r§9"+supportedLangs.find(l=> l.id == lang).name, "textures/ui/language_glyph_color");
    actions.push(() => {
      player.playMusic(translate_soundkeys("music.menu.settings.lang", player), { fade: 0.3 , loop: true})
      settings_lang(player)
    });
  }

  // Button 3: Time zone
  if (save_data[player_sd_index].op == true && version_info.edition !== 1) {
    if(form) {
      let zone = timezone_list.find(zone => zone.utc === save_data[0].utc), zone_text;

      if (!zone) {
        if (zone !== undefined) {
          zone = timezone_list.reduce((closest, current) => {
            const currentDiff = Math.abs(current.utc - save_data[0].utc);
            const closestDiff = Math.abs(closest.utc - save_data[0].utc);
            return currentDiff < closestDiff ? current : closest;
          });
          zone_text = "Prob. " + ("Prob. "+ zone.name.length > 30 ? zone.short : zone.name)
        }
      } else {
        zone_text = zone.name.length > 30 ? zone.short : zone.name
      }


      form.button(translate_textkeys("menu.settings.time_zone.title", save_data[player_sd_index].lang) + (zone !== undefined? "\n§9"+zone_text : ""), "textures/ui/world_glyph_color_2x")
    };
    actions.push(() => {
      player.playMusic(translate_soundkeys("music.menu.settings.time_zone", player), { fade: 0.3 , loop: true})
      settings_time_zone(player, 0);
    });
  }

  // Button 4: Fullbright
  form.button(translate_textkeys("menu.settings.fullbright", save_data[player_sd_index].lang)+"\n" + (save_data[player_sd_index].fullbright ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), (save_data[player_sd_index].fullbright ? "textures/items/potion_bottle_nightVision" : "textures/items/potion_bottle_empty"));
  actions.push(() => {
    if (!save_data[player_sd_index].fullbright) {
      save_data[player_sd_index].fullbright = true;
    } else {
      player.removeEffect("night_vision");
      save_data[player_sd_index].fullbright = false;
    }
    update_save_data(save_data);
    settings_main(player);
  });


  // Button 5: Custom Sounds
  if (version_info.edition !== 1) {
    form.button(translate_textkeys("menu.settings.cs.title", lang)+ "\n" + (save_data[player_sd_index].custom_sounds > 0 ? save_data[player_sd_index].custom_sounds == 1 ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : "§aon (legacy)" : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), save_data[player_sd_index].custom_sounds > 0 ? "textures/ui/toggle_on" : "textures/ui/toggle_off");
    actions.push(() => {
      if (save_data[player_sd_index].custom_sounds > 0) {
        save_data[player_sd_index].custom_sounds = 0
        update_save_data(save_data)
        player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3 , loop: true});
        settings_main(player)
      } else {
        settings_cs_setup(player)
      }
    });
  }

  // Button 5.5: Disable Setup
  if (save_data[player_sd_index].op == true && version_info.edition !== 1) {
    form.button(translate_textkeys("menu.settings.disable_setup", lang)+ "\n" + (!save_data[0].use_setup ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), !save_data[0].use_setup ? "textures/ui/toggle_on" : "textures/ui/toggle_off");
    actions.push(() => {
      if (save_data[0].use_setup) {
        save_data[0].use_setup = false
      } else {
        save_data[0].use_setup = true
      }
      update_save_data(save_data)
      settings_main(player)
    });
  }

  // Button 6: Experimental features
  if (version_info.release_type !== 2) {
    form.button(translate_textkeys("menu.settings.experimental_features", lang)+"\n" + (save_data[player_sd_index].allow_unnecessary_inputs ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), "textures/ui/Add-Ons_Nav_Icon36x36");
    actions.push(() => {
      if (!save_data[player_sd_index].allow_unnecessary_inputs) {
        return settings_allow_unnecessary_inputs(player)
      } else {
        save_data[player_sd_index].allow_unnecessary_inputs = false;
      }
      update_save_data(save_data);
      settings_main(player);
    });
  }

  // Button 7: Debug
  if (version_info.release_type === 0 && save_data[player_sd_index].op) {
    form.button("Debug\n", "textures/ui/ui_debug_glyph_color");
    actions.push(() => {
      debug_main(player);
      player.playMusic(translate_soundkeys("music.menu.settings.debug", player), { fade: 0.3 , loop: true})
    });
  }

  // Button 8: Update / Dictionary
  let gen = uu_find_gen()

  if (typeof(gen) === 'number' && save_data[player_sd_index].op && version_info.edition !== 1) {
    form.button(translate_textkeys("menu.settings.update", lang)+"\n" + gen_list[gen] + " -> " + version_info.version, "textures/ui/icon_bell");
    actions.push(() => {
      universel_updater(player, gen)
      player.playMusic(translate_soundkeys("music.menu.setup", player), { fade: 0.3 });
    });
  } else {
    form.button(translate_textkeys("menu.settings.about", lang)+"\n", "textures/ui/infobulb");
    actions.push(() => {
      player.playMusic(translate_soundkeys("music.menu.dictionary", player), { fade: 0.3, loop: true });
      dictionary_about_version(player)
    });
  }

  // Back to main menu

  if (main_menu_actions(player).length > 1) {
    form.button("");
    actions.push(() => {
      player.playMusic(translate_soundkeys("music.menu.main", player), { fade: 0.3, loop: true });
      main_menu(player)
    });
  }

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (response.selection !== undefined && actions[response.selection]) {
      actions[response.selection]();
    }
  });
}

/*------------------------
 Language
-------------------------*/

function settings_lang(player, in_setup) {
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

  form.button2(translate_textkeys(
    "menu.button_switch",
    current_lang_id,
    {
      name: selected_lang.name,
    }
  ));
  form.button1("");

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection == 1) {
      save_data[player_sd_index].lang = selected_lang.id;

      update_save_data(save_data);
      player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
      return settings_main(player);
    }
    settings_lang(player);
  });

}

/*------------------------
 Gestures
-------------------------*/

function settings_gestures(player) {
  const form = new ActionFormData();
  const save_data = load_save_data();
  const idx = save_data.findIndex(e => e.id === player.id);
  const playerGestures = save_data[idx].gesture;
  let lang = save_data[idx].lang;
  let actions = [];

  // configured_gestures als Array mit Objekten
  let configured_gestures = [
    { name: translate_textkeys("menu.settings.gestures.emote", lang), id: "emote", modes: ["su", "a", "c"] },
    { name: translate_textkeys("menu.settings.gestures.sneak", lang), id: "sneak", modes: ["su", "a", "c"] },
    { name: translate_textkeys("menu.settings.gestures.nod", lang), id: "nod", modes: ["sp"] },
    { name: translate_textkeys("menu.settings.gestures.stick", lang), id: "stick", modes: ["su", "a", "c"] },
  ];

  if (save_data[idx].openend_menu_via_command) {
    configured_gestures.push({ name: translate_textkeys("menu.settings.gestures.command", lang), id: "command", modes: ["su", "a", "c", "sp"] });
  }

  form.title(translate_textkeys("menu.settings.gestures.title", lang));
  form.body(translate_textkeys("menu.settings.gestures.description", lang));


  const modeCounts = {
    su: 0, a: 0, c: 0, sp: 0
  };

  configured_gestures.forEach(({ id, modes }) => {
    if (playerGestures[id]) {
      modes.forEach(mode => {
        modeCounts[mode]++;
      });
    }
  });

  configured_gestures.forEach(({ name, id, modes }) => {
    const isOn = playerGestures[id];
    let label = `${name}\n${isOn ? translate_textkeys("menu.toggle_on", lang) : translate_textkeys("menu.toggle_off", lang)}`;
    let icon = isOn ? "textures/ui/toggle_on" : "textures/ui/toggle_off";
    let alwaysActive = false;

    // Wenn diese Geste aktiv ist und in einem Modus die einzige aktive Geste ist → restricted
    const restricted = isOn && modes.some(mode => modeCounts[mode] === 1);
    if (restricted) {
      label = name + "\n" + translate_textkeys("menu.toggle_restricted", lang);
      icon = "textures/ui/hammer_l_disabled";
      alwaysActive = true;
    }

    form.button(label, icon);

    actions.push(() => {
      if (!alwaysActive) {
        playerGestures[id] = !playerGestures[id];
        update_save_data(save_data);
      }
      settings_gestures(player);
    });
  });

  form.button("");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
    settings_main(player);
  });

  form.show(player).then(response => {
    if (response.selection === undefined) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    const sel = response.selection;
    if (typeof actions[sel] === "function") actions[sel]();
  });
}





/*------------------------
 Dictionary
-------------------------*/

function dictionary_about_version(player) {
  let save_data = load_save_data()
  let form = new ActionFormData()
  let actions = []
  let build_date = convertUnixToDate(version_info.unix, save_data[0].utc || 2);
  const player_sd_index = save_data.findIndex(e => e.id === player.id);
  let lang = save_data[player_sd_index].lang;

  const formattedDate = translate_textkeys("menu.settings.dictionary.text.dateformat", lang, {
    day: build_date.day,
    month: build_date.month,
    year: build_date.year,
    hours: build_date.hours,
    minutes: build_date.minutes,
    seconds: build_date.seconds,
    utcOffset: (build_date.utcOffset >= 0 ? "+" : "") + build_date.utcOffset
  });


  form.title(translate_textkeys("menu.settings.dictionary.title", lang))
  form.body(translate_textkeys("menu.settings.dictionary.text", lang, {
    name: version_info.name,
    version: version_info.version,
    build: ((Math.floor(Date.now() / 1000)) > (version_info.update_message_period_unix + version_info.unix)? "§a"+translate_textkeys("menu.settings.dictionary.text.build.update", lang)+"§r" : version_info.build),
    edition: ["International", "German (BastiGHG)"][version_info.edition],
    release_type: ["dev", "preview", "stable"][version_info.release_type],

    build_date: ((save_data[0].utc == undefined)
      ? translate_textkeys("menu.settings.dictionary.text.utc_empty", lang, {time: getRelativeTime(Math.floor(Date.now() / 1000) - version_info.unix, player)})
      : formattedDate),

    license: "§7© 2022-"+ build_date.year + " TheFelixLive. Licensed under the MIT License."
  }))

  if (version_info.changelog.new_features.length > 0 || version_info.changelog.general_changes.length > 0 || version_info.changelog.bug_fixes.length > 0) {
    form.button("§9"+ translate_textkeys("menu.settings.dictionary.changelog.title", lang));
    actions.push(() => {
      dictionary_about_version_changelog(player, build_date)
    });
  }

  form.button("§3"+ translate_textkeys("menu.settings.dictionary.contact.title", lang));
  actions.push(() => {
    dictionary_contact(player, build_date)
  });

  form.button("");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
    return settings_main(player);
  });

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection !== undefined && actions[response.selection]) {
      actions[response.selection]();
    }
  });
}

function dictionary_contact(player, build_date) {
  let form = new ActionFormData()
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang;

  // Yes, that's right, you're not dumping the full "save_data". The player names are removed here for data protection reasons
  save_data = save_data.map(entry => {
    if ("name" in entry) {
      return { ...entry, name: "" };
    }
    return entry;
  });
  // and this adds information about the dump date and version to ensure whether a dump matches a bug
  save_data.push({ dump_unix:Math.floor(Date.now() / 1000), name:version_info.name, version:version_info.version, build:version_info.build });

  let actions = []
  form.title(translate_textkeys("menu.settings.dictionary.contact.title", lang))
  let message = translate_textkeys("menu.settings.dictionary.contact.description", lang) + "\n\n";

  for (const entry of links) {
    message += `${entry.name} ${entry.link}\n\n`;
  }

  form.body(message);

  if (save_data[player_sd_index].op) {
    form.button(translate_textkeys("menu.settings.dictionary.contact.sd", lang) + (version_info.release_type !== 2? "\n"+translate_textkeys("menu.settings.dictionary.contact.sd.mode_0", lang) : ""));
    actions.push(() => {
      player.sendMessage("§l§7[§f"+ (independent? translate_textkeys("message.header.system", save_data[player_sd_index].lang) : translate_textkeys("message.header.system.client_mode", save_data[player_sd_index].lang)) + "§7]§r "+ translate_textkeys("menu.settings.dictionary.contact.sd", lang) +":\n"+JSON.stringify(save_data))
      player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    });

    if (version_info.release_type !== 2) {
      form.button(translate_textkeys("menu.settings.dictionary.contact.sd", lang)+"\n" + translate_textkeys("menu.settings.dictionary.contact.sd.mode_1", lang));
      actions.push(() => {
        console.log(JSON.stringify(save_data))
        player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      });
    }
  }

  form.button("");
  actions.push(() => {
    dictionary_about_version(player, build_date)
  });

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection !== undefined && actions[response.selection]) {
      actions[response.selection]();
    }
  });
}

function dictionary_about_version_changelog(player, build_date) {
  let form = new ActionFormData()
  let save_data = load_save_data()
  let player_sd_index = save_data.findIndex(e => e.id === player.id);
  let lang = save_data[player_sd_index].lang;


  form.title(translate_textkeys("menu.settings.dictionary.changelog.title", lang)+" - "+version_info.version)
  let bodyText = "";
  if (version_info.changelog.new_features.length > 0) {
    bodyText += "§l§b"+ translate_textkeys("menu.settings.dictionary.changelog.new_features", lang) +"§r\n\n";
    version_info.changelog.new_features.forEach(feature => {
      bodyText += `- ${feature}\n\n`;
    });
  }

  if (version_info.changelog.general_changes.length > 0) {
    bodyText += "§l§a"+ translate_textkeys("menu.settings.dictionary.changelog.general_changes", lang) +"§r\n\n";
    version_info.changelog.general_changes.forEach(change => {
      bodyText += `- ${change}\n\n`;
    });
  }

  if (version_info.changelog.bug_fixes.length > 0) {
    bodyText += "§l§c"+ translate_textkeys("menu.settings.dictionary.changelog.bug_fixes", lang) +"§r\n\n";
    version_info.changelog.bug_fixes.forEach(fix => {
      bodyText += `- ${fix}\n\n`;
    });
  }

  bodyText += "§7" + translate_textkeys("menu.settings.dictionary.changelog.build", lang, {
    day: build_date.day,
    month: build_date.month,
    year: build_date.year,
    relative_time: getRelativeTime(Math.floor(Date.now() / 1000) - version_info.unix, player)
  });

  form.body(bodyText);
  form.button("");

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection == 0) {
      dictionary_about_version(player)
    }
  });
}




/*------------------------
 Debug
-------------------------*/

function debug_main(player) {
  let form = new ActionFormData()
  let actions = []
  let save_data = load_save_data()
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  form.body("DynamicPropertyTotalByteCount: "+world.getDynamicPropertyTotalByteCount() +" of 32767 bytes used ("+Math.floor((world.getDynamicPropertyTotalByteCount()/32767)*100) +" Procent)")


  form.button("§e\"save_data\" Editor");
  actions.push(() => {
    debug_sd_editor(player, () => debug_main(player), [])
  });


  form.button("§aAdd player (save data)");
  actions.push(() => {
    return debug_add_fake_player(player);
  });

  form.button("Trigger Setup");
  actions.push(async () => {
    save_data[player_sd_index].setup = 0
    update_save_data(save_data)
    await system.waitTicks(30)
    initialize_main_menu(player)
  });

  form.button("do_translate_textkeys\n" + (do_translate_textkeys ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)), do_translate_textkeys == true ? "textures/ui/toggle_on" : "textures/ui/toggle_off");
  actions.push(() => {
    if (do_translate_textkeys) {
      do_translate_textkeys = false
    } else {
      do_translate_textkeys = true
    }
    debug_main(player)
  });

  form.button("§cRemove \"save_data\"");
  actions.push(() => {
    world.setDynamicProperty("timerv:save_data", undefined);
    return close_world()
  });


  form.button("§cClose Server");
  actions.push(() => {
    return close_world()
  });


  form.button("soundkey_test");
  actions.push(() => {
    return soundkey_test(player, undefined)
  });

  form.button("");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
    return settings_main(player)
  });


  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection !== undefined && actions[response.selection]) {
      actions[response.selection]();
    }
  });
}



function debug_sd_editor(player, onBack, path = []) {
  const save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  let current = save_data;
  for (const key of path) {
    current = current[key];
  }

  const returnToCurrentMenu = () => debug_sd_editor(player, onBack, path);

  if (Array.isArray(current)) {
    const form = new ActionFormData()
      .title("Debug Editor v.1.0")
      .body(`Path: §7save_data/`);

    current.forEach((entry, idx) => {
      const label = idx === 0
        ? `Server [${idx}]`
        : `${entry.name ?? `Player ${idx}`} [${entry.id ?? idx}]`;
      form.button(label, "textures/ui/storageIconColor");
    });

    form.button(""); // Back

    form.show(player).then(res => {
      if (res.canceled) return;
      if (res.selection === current.length) {
        return onBack();
      }
      debug_sd_editor(
        player,
        returnToCurrentMenu,
        [...path, res.selection]
      );
    });

  // === B) Object-Branch ===
  } else if (current && typeof current === "object") {
    const keys = Object.keys(current);
    const displaySegments = path.map((seg, idx) => {
      if (idx === 0) {
        return seg === 0 ? "server" : save_data[Number(seg)]?.id ?? seg;
      }
      return seg;
    });
  const displayPath = `save_data/${displaySegments.join("/")}`;
    const form = new ActionFormData()
      .title("Debug Editor v.1.0")
      .body(`Path: §7${displayPath}`);

    keys.forEach(key => {
      const val = current[key];
      if (typeof val === "boolean") {
        form.button(
          `${key}\n${val ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)}`,
          val ? "textures/ui/toggle_on" : "textures/ui/toggle_off"
        );
      } else if (typeof val === "number") {
        form.button(`${key}: ${val}§r\n§9type: number`, "textures/ui/editIcon");
      } else if (typeof val === "string") {
        form.button(`${key}: ${val}§r\n§9type: string`, "textures/ui/editIcon");
      } else {
        form.button(`${key}`, "textures/ui/storageIconColor"); // verschachteltes Objekt/Array
      }
    });

    form.button(""); // Back

    form.show(player).then(res => {
      if (res.selection == undefined ) {
        return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
      }
      // 1. Back-Button?
      if (res.selection === keys.length) {
        return onBack();
      }

      const key = keys[res.selection];
      const nextPath = [...path, key];
      const fresh = load_save_data();
      let target = fresh;
      for (const k of nextPath.slice(0, -1)) {
        target = target[k];
      }
      const val = target[key];
      if (typeof val === "boolean") {
        // Boolean-Toggle
        target[key] = !val;
        update_save_data(fresh);
        returnToCurrentMenu();

      } else if (typeof val === "number" || typeof val === "string") {
        // Number-Editor
        openTextEditor(
          player,
          String(val),
          nextPath,
          newText => {
            target[key] = newText;
            update_save_data(fresh);
            returnToCurrentMenu();
          },
          () => {
            player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
          }
        );

      } else {
        debug_sd_editor(player, returnToCurrentMenu, nextPath);
      }
    });
  }
}

function openTextEditor(player, current, path, onSave, onCancel) {
  const displaySegments = path.map((seg, idx) => {
    if (idx === 0) {
      return seg === 0 ? "server" : save_data[Number(seg)]?.id ?? seg;
    }
    return seg;
  });

  const fullPath = `save_data/${displaySegments.join("/")}`;
  const form = new ModalFormData();
  form.title("Edit Text");
  form.textField(`Path: ${fullPath} > Value:`, "Enter text...", current);
  form.submitButton("Save");

  form.show(player).then(res => {
    if (res.canceled) {
      return onCancel();
    }

    let input = res.formValues[0];
    // Wenn der String nur aus Ziffern besteht, in Zahl umwandeln
    if (/^\d+$/.test(input)) {
      input = Number(input);
    }

    onSave(input);
  });
}





function debug_add_fake_player(player) {
  let form = new ModalFormData();

  form.textField("Player name", player.name);
  form.textField("Player id", player.id);
  form.submitButton("Add player")

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    create_player_save_data(response.formValues[1], response.formValues[0])
    return debug_main(player)
  });
}

function settings_allow_unnecessary_inputs(player) {
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  let form = new MessageFormData();
  form.title("Experimental features");
  form.body("These features / changes are still under development and may contain §lunforeseen bugs§r. Once activated, the following features will be available:§7\n\n- All entities, including those from behavior packs, can be set as goal\n\n- The maximum limit of a timer will be increased to 10 years\n\n- Hardcore modes can be used without hardcore worlds\n\n- Timer can be paused in hardcore mode§r\n\nDo you really want to activate it?\n ");
  form.button1("");
  form.button2("§aEnable");
  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection == 1) {
      save_data[player_sd_index].allow_unnecessary_inputs = true;
      update_save_data(save_data);
    }

    return settings_main(player);
  });
}

function settings_rights_main(player, came_from_settings) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(e => e.id === player.id);

  form.title(translate_textkeys("menu.settings.permissions.title", save_data[player_sd_index].lang));
  form.body(translate_textkeys("menu.settings.permissions.description", save_data[player_sd_index].lang));


  const players = world.getAllPlayers();
  const playerIds = players.map(player => player.id);

  let newList = save_data.slice(1);

  newList.sort((a, b) => {
    const now = Math.floor(Date.now() / 1000);

    const aOnline = playerIds.includes(a.id);
    const bOnline = playerIds.includes(b.id);

    const aOp = a.op;
    const bOp = b.op;

    const aLastSeen = now - a.last_unix;
    const bLastSeen = now - b.last_unix;

    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();

    if (aOnline && !bOnline) return -1;
    if (!aOnline && bOnline) return 1;

    if (aOnline && bOnline) {
      if (aOp && !bOp) return -1;
      if (!aOp && bOp) return 1;

      return aName.localeCompare(bName);
    }
    return aLastSeen - bLastSeen;
  });


  newList.forEach(entry => {
    const isOnline = playerIds.includes(entry.id);
    let displayName = entry.name;

    if (isOnline) {
      displayName += "\n§a("+translate_textkeys("menu.settings.permissions.online", save_data[player_sd_index].lang)+")§r";
    } else {
      displayName += "\n§o(" +translate_textkeys("menu.settings.permissions.offline", save_data[player_sd_index].lang, {time: (getRelativeTime(Math.floor(Date.now() / 1000) - entry.last_unix, player))}) + ")§r";
    }

    if (entry.op) {
      form.button(displayName, "textures/ui/op");
    } else {
      form.button(displayName, "textures/ui/permissions_member_star");
    }
  });

  form.button("");

  if (newList.length == 1) {
    if (came_from_settings) {
      return settings_rights_data(player, newList[0]);
    } else {
      player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
      return settings_main(player);
    }
  }


  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection === newList.length) {
      player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
      return settings_main(player);
    } else {
      return settings_rights_data(player, newList[response.selection]);
    }
  });
}

function settings_rights_data(viewing_player, selected_save_data) {
  let save_data = load_save_data()
  let selected_player = world.getAllPlayers().find(player => player.id == selected_save_data.id);
  let viewing_player_sd_index = save_data.findIndex(e => e.id === viewing_player.id);
  let form = new ActionFormData();

  let body_text =
      translate_textkeys("menu.settings.permissions.lable.name", save_data[viewing_player_sd_index].lang, {name: selected_save_data.name, id: selected_save_data.id}) + "\n" +

      translate_textkeys("menu.settings.lang.title", save_data[viewing_player_sd_index].lang) +": " + supportedLangs.find(l => l.id == selected_save_data.lang).name + "\n" +
      (
          selected_player
              ? (
                  version_info.release_type === 0
                      ? (
                          translate_textkeys("menu.settings.permissions.online", save_data[viewing_player_sd_index].lang)+ ": "+ translate_textkeys("menu.yes", save_data[viewing_player_sd_index].lang) +"\n" +
                          "Platform: " + selected_player.clientSystemInfo.platformType + "\n" +
                          (
                              ["Under 1.5 GB", "1.5 - 2.0 GB", "2.0 - 4.0 GB", "4.0 - 8.0 GB", "Over 8.0 GB"][selected_player.clientSystemInfo.memoryTier]
                                  ? "Client Total Memory: " +
                                    ["Under 1.5 GB", "1.5 - 2.0 GB", "2.0 - 4.0 GB", "4.0 - 8.0 GB", "Over 8.0 GB"][selected_player.clientSystemInfo.memoryTier]
                                  : ""
                          ) + "\n" +
                          (
                              {
                                  "Gamepad": "Input: Gamepad",
                                  "KeyboardAndMouse": "Input: Mouse & Keyboard",
                                  "MotionController": "Input: Motion controller",
                                  "Touch": "Input: Touch"
                              }[selected_player.inputInfo.lastInputModeUsed] || ""
                          ) + "\n"
                      )
                      : translate_textkeys("menu.settings.permissions.online", save_data[viewing_player_sd_index].lang)+ ": "+translate_textkeys("menu.yes", save_data[viewing_player_sd_index].lang)+"\n"
              )
              : translate_textkeys("menu.settings.permissions.online", save_data[viewing_player_sd_index].lang)+ ": "+translate_textkeys("menu.no", save_data[viewing_player_sd_index].lang)+" §7("+ translate_textkeys("menu.settings.permissions.offline", save_data[viewing_player_sd_index].lang, {time: getRelativeTime(Math.floor(Date.now() / 1000) - selected_save_data.last_unix, viewing_player)}) +")§r\n"
      ) + translate_textkeys("menu.settings.permissions.lable.actionbar", save_data[viewing_player_sd_index].lang, {actionbar: render_live_actionbar(selected_save_data, false)}) +
      (
          selected_save_data.id == save_data[0].global.last_player_id && save_data[0].challenge.active
              ? "§r§f\n\n§7" + translate_textkeys("menu.settings.permissions.cm", save_data[viewing_player_sd_index].lang) +"\n\n"
              : "\n\n"
      );


  form.body(body_text);
  let actions = [];

  if (selected_save_data.id !== viewing_player.id) {
    form.title(translate_textkeys("menu.settings.permissions.title.player", save_data[viewing_player_sd_index].lang, {name: selected_save_data.name}));
    if (selected_save_data.op) {

      form.button("§cMake deop");
      actions.push(() => {
        let player_sd_index = save_data.findIndex(entry => entry.id === selected_save_data.id)
        save_data[player_sd_index].op = false
        update_save_data(save_data);
        return settings_rights_data(viewing_player, save_data[player_sd_index])
      });

    } else {

      form.button("§aMake op");
      actions.push(() => {
        form = new MessageFormData();
        form.title("Op advantages");
        form.body("Your are trying to add op advantages to "+selected_save_data.name+". With them he would be able to:\n\n- Mange other and your OP status\n- Mange Timer modes\n- Mange save data\n- Could delete the timer!\n\nAre you sure you want to add them?\n ");
        form.button1("");
        form.button2("§aMake op");
        form.show(viewing_player).then((response) => {
          if (response.selection == undefined ) {
            return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
          }
          if (response.selection == 1) {
            let player_sd_index = save_data.findIndex(entry => entry.id === selected_save_data.id)
            save_data[player_sd_index].op = true
            selected_save_data = save_data[player_sd_index]
            update_save_data(save_data);
          }

          return settings_rights_data(viewing_player, selected_save_data)
        });
      });

    }
  } else {
    form.title(translate_textkeys("menu.settings.permissions.title.you", save_data[viewing_player_sd_index].lang));
  }

  if (!(selected_save_data.id == save_data[0].global.last_player_id && save_data[0].challenge.active)) {
    form.button(translate_textkeys("menu.settings.permissions.manage_sd", save_data[viewing_player_sd_index].lang));
    actions.push(() => {
      settings_rights_manage_sd(viewing_player, selected_save_data);
    });
  }

  form.button("");
  actions.push(() => {
    settings_rights_main(viewing_player, false);
  });

  form.show(viewing_player).then((response) => {
    if (response.selection == undefined ) {
      return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
    }
    if (actions[response.selection]) {
      actions[response.selection]();
    }
  });
}

function settings_rights_manage_sd(viewing_player, selected_save_data) {
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === viewing_player.id);
  let viewing_player_sd_index = save_data.findIndex(entry => entry.id === viewing_player.id);
  const form = new ActionFormData()
    .title(selected_save_data.id !== viewing_player.id? translate_textkeys("menu.settings.permissions.title.player", save_data[viewing_player_sd_index].lang, {name: selected_save_data.name}) : translate_textkeys("menu.settings.permissions.title.you", save_data[viewing_player_sd_index].lang))
    .body(translate_textkeys("menu.general.description", save_data[player_sd_index].lang))
    .button("§d"+translate_textkeys("menu.settings.permissions.reset_sd", save_data[viewing_player_sd_index].lang))
    .button("§c"+translate_textkeys("menu.settings.permissions.delete_sd", save_data[viewing_player_sd_index].lang))
    .button("");

  form.show(viewing_player).then(response => {
    if (response.selection == undefined ) {
      return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
    }

    const is_reset = response.selection === 0;
    const is_delete = response.selection === 1;

    const is_global = response.selection < 2 &&
                      save_data[0].global.last_player_id === selected_save_data.id &&
                      save_data[0].global.status;

    if (is_global) {
      const player_sd_index = save_data.findIndex(entry => entry.id === viewing_player.id);

        const design_data = typeof save_data[player_sd_index].design === "number"
          ? design_template.find(t => t.id == save_data[player_sd_index].design).content
          : save_data[player_sd_index].design;
        const design = design_data.find(item => item.type === "ui");

        const own_time = apply_design(
          design,
          save_data[player_sd_index].time[
            save_data[player_sd_index].counting_type == 1 ? "timer" : "stopwatch"
          ]
        );

        const shared_form = new ActionFormData()
          .title(translate_textkeys("menu.popup.shared_timer.title", save_data[viewing_player_sd_index].lang))
          .body(
            translate_textkeys("menu.settings.permissions.shared_timer.description", save_data[viewing_player_sd_index].lang,{
              name: selected_save_data.name,
              replace_text: save_data[0].global.last_player_id !== viewing_player.id ? translate_textkeys("menu.settings.permissions.shared_timer.description", save_data[viewing_player_sd_index].lang,{own_time: own_time}) : ""
            })
          );

        const isSharing = (save_data[0].global.last_player_id === viewing_player.id);
        if (!isSharing) {
          shared_form.button("§e"+translate_textkeys("menu.popup.shared_timer.yours_instead", save_data[viewing_player_sd_index].lang));
        }
        shared_form.button("§c"+translate_textkeys("menu.disable", save_data[viewing_player_sd_index].lang));
        shared_form.button("")

        shared_form.show(viewing_player).then(global_response => {
          if (global_response.selection == undefined ) {
            return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
          }

          const sel = global_response.selection;
          const reload = () => {
            save_data = load_save_data();
            selected_save_data = save_data.find(e => e.id === selected_save_data.id);
            handle_data_action(is_reset, is_delete, viewing_player, selected_save_data, save_data[viewing_player_sd_index].lang);
          };

          const shareIndex   = isSharing ? -1 : 0;
          const disableIndex = isSharing ? 0  : 1;
          const settingsIndex = disableIndex + 1;

          if (sel === shareIndex) {
            convert_local_to_global(viewing_player.id);
            reload();

          } else if (sel === disableIndex) {
            convert_global_to_local(true);
            reload();

          } else if (sel === settingsIndex) {
            settings_rights_manage_sd(viewing_player, selected_save_data);
          }
        });



    } else {
      handle_data_action(is_reset, is_delete, viewing_player, selected_save_data, save_data[viewing_player_sd_index].lang);
    }

    if (response.selection === 2) {
      settings_rights_data(viewing_player, selected_save_data);
    }
  });
}

function handle_data_action(is_reset, is_delete, viewing_player, selected_save_data, lang) {
  const selected_player = world.getAllPlayers().find(p => p.id === selected_save_data.id);
  if (is_reset) {
    delete_player_save_data(selected_save_data);
    create_player_save_data(selected_save_data.id, selected_save_data.name);
    return settings_rights_main(viewing_player, false);
  }

  if (is_delete) {
    if (selected_player) {
      const confirm_form = new MessageFormData()
        .title(translate_textkeys("menu.settings.permissions.online_player.kick.title", lang))
        .body(translate_textkeys("menu.settings.permissions.online_player.kick.description", lang, {name: selected_player.name}))
        .button1("")
        .button2("§c"+translate_textkeys("menu.settings.permissions.online_player.kick.button", lang));

      confirm_form.show(viewing_player).then(confirm => {
        if (confirm.selection == undefined ) {
          return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
        }
        if (confirm.selection === 1) {
          if (!world.getDimension("overworld").runCommand(`kick ${selected_player.name}`).successCount) {
            const host_form = new MessageFormData()
              .title(translate_textkeys("menu.settings.permissions.online_player.kick.host.title", lang))
              .body(translate_textkeys("menu.settings.permissions.online_player.kick.host.description", lang, {name: selected_player.name}))
              .button1("")
              .button2("§c"+translate_textkeys("menu.settings.permissions.online_player.kick.host.button", lang));

            host_form.show(viewing_player).then(host => {
              if (host.selection == undefined ) {
                return viewing_player.playMusic(translate_soundkeys("menu.close", viewing_player), { fade: 0.3 });
              }
              if (host.selection === 1) {
                delete_player_save_data(selected_save_data);
                return close_world();
              } else {
                settings_rights_manage_sd(viewing_player, selected_save_data);
              }
            });
          } else {
            delete_player_save_data(selected_save_data);
            settings_rights_main(viewing_player, false);
          }
        } else {
          settings_rights_manage_sd(viewing_player, selected_save_data);
        }
      });

    } else {
      delete_player_save_data(selected_save_data);
      settings_rights_main(viewing_player, false);
    }
  }
}

function settings_type(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();

  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  if (save_data[0].global.status) {
    player_sd_index = 0;
  }

  let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang

  form.title(translate_textkeys("menu.settings.type", lang));
  form.body(translate_textkeys("menu.general.description", lang));

  let validSelections = [];
  let actions = [];

  timer_modes.forEach((button, index) => {
    const shouldShow = typeof button.show_if === 'function' ? button.show_if(save_data, player_sd_index) : button.show_if;

    if (shouldShow) {
      validSelections.push(index);

      if (save_data[player_sd_index].counting_type === index) {
        form.button(translate_textkeys(button.label, lang) + "\n" + translate_textkeys("menu.item_selected", lang), button.icon);
      } else {
        form.button(translate_textkeys(button.label, lang), button.icon);
      }

      actions.push((response) => {
        let selectedIndex = index;

        if (selectedIndex !== undefined) {
          if (
            save_data[0].counting_type == 1 &&
            save_data[player_sd_index].counting_type !== selectedIndex &&
            save_data[0].challenge.goal.event_pos === 0 &&
            save_data[0].challenge.goal.pointer === 2
          ) {
            save_data[0].challenge.goal.pointer = 0;
          }

          if (
            (save_data[player_sd_index].counting_type === 0 || save_data[player_sd_index].counting_type === 1) &&
            save_data[player_sd_index].time.do_count &&
            save_data[player_sd_index].counting_type !== selectedIndex
          ) {
            return settings_type_info(player, response);
          }

          if (save_data[player_sd_index].counting_type !== selectedIndex) {
            save_data[player_sd_index].time.do_count = false;
          }

          save_data[player_sd_index].counting_type = selectedIndex;
          update_save_data(save_data);
          return settings_main(player);
        }
      });
    }
  });

  // Zurück-Button
  form.button("");
  actions.push(() => {
    return settings_main(player);
  });

  form.show(player).then((response) => {
    if (response.selection === undefined) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (actions[response.selection]) {
      actions[response.selection](response);
    }
  });
}




function settings_type_info(player, response) {
  let form = new MessageFormData();
  let save_data = load_save_data();

  let player_sd_index;

  if (save_data[0].global.status) {
    player_sd_index = 0;
  } else {
    player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  }

  form.title("Information");
  form.body("Your " + (save_data[player_sd_index].counting_type == 1 ? "timer" : "stopwatch") +
    " is not paused! If you change now the mode to " + translate_textkeys(timer_modes[response.selection].label, lang) +
    " it will be paused!");

  let actions = [];

  form.button1("");
  actions.push(() => {
    return settings_type(player); // Zurück zur settings_type Funktion
  });

  form.button2("Change to: " + translate_textkeys(timer_modes[response.selection].label), lang);
  actions.push(() => {
    save_data[player_sd_index].counting_type = response.selection;
    save_data[player_sd_index].time.do_count = false;

    update_save_data(save_data);
    return settings_main(player);
  });

  form.show(player).then((response_2) => {
    if (response_2.selection == undefined) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (actions[response_2.selection]) {
      actions[response_2.selection]();
    }
  });
}


function settings_actionbar(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
  let lang = save_data[player_sd_index].lang

  let actions = [];

  form.title(translate_textkeys("menu.settings.actionbar.title", lang));
  form.body(translate_textkeys("menu.general.description", lang));

  form.button(
    translate_textkeys("menu.settings.actionbar.design.button", lang)+"\n" + render_live_actionbar(save_data[player_sd_index], false),
    "textures/ui/mashup_PaintBrush"
  );
  actions.push(() => {
    design_template_ui(player);
    player.playMusic(translate_soundkeys("music.menu.settings.actionbar.design", player), { fade: 0.3, loop: true });
  });

  form.button(
    translate_textkeys("menu.settings.actionbar.using", lang)+ "\n" + (save_data[player_sd_index].visibility_setting ? save_data[player_sd_index].absolute_visibility !== save_data[player_sd_index].visibility_setting? translate_textkeys("menu.toggle_dynamic", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)),
    save_data[player_sd_index].visibility_setting ? save_data[player_sd_index].absolute_visibility !== save_data[player_sd_index].visibility_setting ? "textures/ui/automation_glyph_color" : "textures/ui/toggle_on" : "textures/ui/toggle_off"

  );
  actions.push(() => {
    save_data[player_sd_index].visibility_setting = !save_data[player_sd_index].visibility_setting;
    update_save_data(save_data);
    settings_actionbar(player);
  });

  if (save_data[player_sd_index].counting_type !== 3) {
    form.button(
      translate_textkeys("menu.settings.actionbar.day_time", lang)+"\n" + (save_data[player_sd_index].time_day_actionbar ? translate_textkeys("menu.toggle_on", save_data[player_sd_index].lang) : translate_textkeys("menu.toggle_off", save_data[player_sd_index].lang)),
      save_data[player_sd_index].time_day_actionbar ? "textures/ui/toggle_on" : "textures/ui/toggle_off"
    );
    actions.push(() => {
      save_data[player_sd_index].time_day_actionbar = !save_data[player_sd_index].time_day_actionbar;
      update_save_data(save_data);
      settings_actionbar(player);
    });
  }

  if (save_data[player_sd_index].time_day_actionbar || save_data[player_sd_index].counting_type == 3) {
    if (!save_data[0].sync_day_time && save_data[0].utc !== undefined) {
      if(form){form.button(translate_textkeys("menu.settings.actionbar.time_source", save_data[player_sd_index].lang)+"\n§9" + (save_data[player_sd_index].time_source === 0 ? translate_textkeys("menu.settings.actionbar.time_source.in_game", save_data[player_sd_index].lang) : translate_textkeys("menu.settings.actionbar.time_source.real_life", save_data[player_sd_index].lang)), "textures/ui/share_microsoft")};
      actions.push(() => {
        if (save_data[player_sd_index].time_source === 0) {
          save_data[player_sd_index].time_source = 1;
        } else {
          save_data[player_sd_index].time_source = 0;
        }
        update_save_data(save_data);
        settings_actionbar(player);
      });
    } else if (save_data[0].utc !== undefined) {
      save_data[player_sd_index].time_source = 1
      update_save_data(save_data);
    }
  }

  // 5. back-Button
  form.button("");
  actions.push(() => {
    player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
    settings_main(player);
  });

  form.show(player).then(response => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    const idx = response.selection;
    if (typeof actions[idx] === "function") {
      actions[idx]();
    }
  });
}


function design_template_ui(player) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);



  form.title(translate_textkeys("menu.settings.actionbar.design.title", save_data[player_sd_index].lang));
  form.body(translate_textkeys("menu.settings.actionbar.design.description", save_data[player_sd_index].lang));

  var currentDesign = save_data[player_sd_index].design;

  if (typeof save_data[player_sd_index].design == "number") {
    currentDesign = design_template.find(t => t.id == save_data[player_sd_index].design).content
  }

  let sortedDesigns = design_template
    .filter(design => {
      return (save_data[player_sd_index].allow_unnecessary_inputs || design.content !== undefined) && design.edition.includes(version_info.edition);
    })
    .sort((a, b) => (b.content === currentDesign) - (a.content === currentDesign));


  let hasMatchingDesign = sortedDesigns.some(design => JSON.stringify(design.content) === JSON.stringify(currentDesign));

  sortedDesigns.forEach((design) => {
    let buttonText = design.name + "\n" // + (apply_design(design.content.find(d => d.type === "screen_saver"), 0)+ " "); // Looks a bit off
    if (JSON.stringify(design.content) === JSON.stringify(currentDesign) || (!hasMatchingDesign && design.content === undefined)) {
      buttonText += "§r"+translate_textkeys("menu.item_selected", save_data[player_sd_index].lang);
    }
    form.button(buttonText);
  });

  form.button("");

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    if (response.selection === sortedDesigns.length) {
      player.playMusic(translate_soundkeys("music.menu.settings.actionbar", player), { fade: 0.3, loop: true });
      return settings_actionbar(player);

    } else {
      let selectedDesign = sortedDesigns[response.selection];

      if (selectedDesign.content === undefined) {
        return //design_maker(player)
      } else {
        return design_preview(player, selectedDesign.content, false);
      }
    }
  });
}




function design_preview(player, design, is_custom) {
  let form = new ActionFormData();
  let save_data = load_save_data();
  let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

  form.title(translate_textkeys("menu.settings.actionbar.design.title", save_data[player_sd_index].lang));

  let ui_preview = apply_design(design.find(d => d.type === "ui"), 660822121.4)
  let normal_preview = apply_design(design.find(d => d.type === "normal"), 660822121.4)
  let paused_preview = apply_design(design.find(d => d.type === "paused"), 660822121.4)

  let finished_preview = apply_design(design.find(d => d.type === "finished"), 660822121.4)
  let day_preview = apply_design(design.find(d => d.type === "day"), 19395.9)

  let screen_saver_preview = apply_design(design.find(d => d.type === "screen_saver"), 0)

  form.body(translate_textkeys(
    "menu.settings.actionbar.design.preview",
    save_data[player_sd_index].lang,
    {
      screen_saver: screen_saver_preview,
      ui: ui_preview,
      normal: normal_preview,
      paused: paused_preview,
      finished: finished_preview,
      day: day_preview
    }
  ));


  form.button(translate_textkeys("menu.settings.actionbar.design.preview.apply", save_data[player_sd_index].lang));


  form.button("");

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }

    if (response.selection == 0) {

      if (is_custom) {
        save_data[player_sd_index].design = design
      } else {
        save_data[player_sd_index].design = design_template.find(d => d.content === design).id
      }

      update_save_data(save_data);
      player.playMusic(translate_soundkeys("music.menu.settings.actionbar", player), { fade: 0.3, loop: true });
      return settings_actionbar(player);
    }

    if (response.selection == 1) {
      if (is_custom) {
        return //design_maker(player)
      } else {
        return design_template_ui(player)
      }
    };
  });
}

/*------------------------
 AFK
-------------------------*/

const AFK_THRESHOLD_MS = 15 * 1000;

// Speicher-Maps
const lastActivity   = new Map();
const lastPosition   = new Map();
const lastRotation   = new Map();
const isCurrentlyAFK = new Map();

function updateActivity(player) {
  lastActivity.set(player.id, Date.now());
}

function initPlayer(player) {
  updateActivity(player);
  lastPosition.set(player.id, {
    x: player.location.x,
    y: player.location.y,
    z: player.location.z
  });
  const rot = player.getRotation();
  lastRotation.set(player.id, {
    yaw: rot.y,
    pitch: rot.x
  });
  isCurrentlyAFK.set(player.id, false);
}

function checkAFKStatus(player) {
  const last = lastActivity.get(player.id) ?? Date.now();
  return (Date.now() - last) > AFK_THRESHOLD_MS;
}

system.runTimeout(() => {
  for (const player of world.getAllPlayers()) {
    initPlayer(player);
  }
}, 60);


world.afterEvents.playerSpawn.subscribe(evt => {
  initPlayer(evt.player);
});

world.afterEvents.itemUse  .subscribe(evt => updateActivity(evt.source));
world.afterEvents.itemUseOn.subscribe(evt => updateActivity(evt.source));

/*------------------------
 Update loop
-------------------------*/

function close_world() {
  let save_data = load_save_data();
  world.getAllPlayers().forEach(player => {
    let player_sd_index = save_data.findIndex(entry => entry.id === player.id);
    player.sendMessage(
      "§l§7[§f" +
      (independent
        ? translate_textkeys("message.header.system", save_data[player_sd_index].lang || "en_us")
        : translate_textkeys("message.header.system.client_mode", save_data[player_sd_index].lang || "en_us")
      ) +
      "§7]§r " +
      translate_textkeys("message.body.shutdown", save_data[player_sd_index].lang)
    );
  });
  while (true) {}
}

function render_live_actionbar(selected_save_data, do_update) {
  const data = load_save_data();

  let tv = calcAB(do_update, selected_save_data.id, false);
  if (typeof selected_save_data.design === "number")
    selected_save_data.design = design_template.find(item => item.id == selected_save_data.design).content;

  let d0, d1;
  if (selected_save_data.counting_type !== 3) {
    if (data[0].challenge.progress == 2) {
      d0 = selected_save_data.design.find(d => d.type === "finished");
    } else {
      d0 = tv.do_count
        ? selected_save_data.design.find(d => d.type === "normal")
        : (tv.value === 0
            ? selected_save_data.design.find(d => d.type === "screen_saver")
            : selected_save_data.design.find(d => d.type === "paused"));
    }
    if (selected_save_data.time_day_actionbar)
      d1 = selected_save_data.design.find(d => d.type === "day");
  } else {
    d0 = selected_save_data.design.find(d => d.type === "day");
  }

  if (d0?.type === "screen_saver" && d1) {
    return apply_design(d1, calcAB(true, selected_save_data.id, true).value);
  }

  return d1
    ? apply_design(d0, tv.value) + " §r§f| " + apply_design(d1, calcAB(true, selected_save_data.id, true).value)
    : apply_design(d0, tv.value);

}

function calcAB(update, id, dayFormat) {
  const data = load_save_data();
  let idx = data.findIndex(e => e.id === id);
  let lang = data[idx].lang
  let counting_type, timevalue, timedata;

  if (data[0].global.status) {
    counting_type = data[0].counting_type
    timedata = data[0].time
    // Prevent conting on dedicated server if no player is online
    if (!world.getAllPlayers()) {
      update = false
    }
  } else {
    counting_type = data[idx].counting_type
    timedata = data[idx].time
  }



  if (counting_type === 2) {
    timevalue = { value: system.currentTick, do_count: true };
  }


  if (counting_type === 0 || counting_type === 1) {
      let val = timedata[counting_type === 0 ? "stopwatch" : "timer"];
      if (update && timedata.do_count && !dayFormat) {
        if (counting_type === 1) {
          if (timedata.timer == 0) {
            if (data[0].challenge.progress == 1) {
              if (data[0].challenge.goal.pointer == 2 && data[0].challenge.goal.event_pos == 0) {
                finished_cm_timer(1, "message.body.challenge_end.time.good")
              } else {
                finished_cm_timer(0, "message.body.challenge_end.time.bad")
              }
              return -1;
            } else {
              timedata.do_count = false;
              if (data[0].global.status) {
                world.getAllPlayers().forEach(player => {
                  idx = data.findIndex(e => e.id === player.id);
                  let lang = save_data[idx].lang
                  player.sendMessage("§l§4[§c"+translate_textkeys("message.header.condition", lang)+"§4]§r "+ translate_textkeys("message.body.condition.expired", lang, {time: apply_design((typeof data[idx].design === "number" ? design_template[data[idx].design].content : data[idx].design).find(item => item.type === "ui"), timedata.last_value_timer - timedata.timer)}))

                  player.onScreenDisplay.setTitle("§4"+translate_textkeys("message.title.condition.expired", lang))
                  player.playSound(translate_soundkeys("condition.expired", player))
                });
              } else {
                let player = world.getAllPlayers().find(player => player.id == id)
                let lang = save_data[save_data.findIndex(entry => entry.id === player.id)].lang
                player.sendMessage("§l§4[§c"+translate_textkeys("message.header.condition", lang)+"§4]§r "+translate_textkeys("message.body.condition.expired", lang, {time: apply_design((typeof data[idx].design === "number" ? design_template[data[idx].design].content : data[idx].design).find(item => item.type === "ui"), timedata.last_value_timer - timedata.timer)}))
                player.onScreenDisplay.setTitle("§4"+translate_textkeys("message.title.condition.expired", lang))
                player.playSound(translate_soundkeys("condition.expired", player))
              }
            }
          }
          timedata.timer = Math.max(timedata.timer - 1, 0);
        } else {
          timedata.stopwatch++;
        }
        update_save_data(data);
      }
      timevalue = { value: val, do_count: timedata.do_count };
  }

  if (counting_type === 3 || dayFormat) {
    if (data[idx].time_source === 1 || data[0].sync_day_time) {
      const TICKS = 24000, MILLIS_DAY = 86400000, START_OFFSET = 6 * 3600000;
      let now = new Date(),
      total = (now.getHours() + data[0].utc) * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000 + Math.floor(now.getMilliseconds() / 10) * 10,
      adj = total - START_OFFSET < 0 ? total - START_OFFSET + MILLIS_DAY : total - START_OFFSET,
      ticks = (adj / MILLIS_DAY) * TICKS;
      timevalue = { value: ticks, do_count: true };

      if (data[0].sync_day_time && update && (!data[0].challenge.active || (data[0].challenge.progress === 1 && data[0].time.do_count))) {
        world.setTimeOfDay(Math.floor(((ticks % 24000) + 24000) % 24000));
      }

    } else {
      timevalue = { value: world.getTimeOfDay(), do_count: true };
    }
  }
  return timevalue;
}

async function update_loop() {
    while (true) {
      let save_data = load_save_data();
      gesture_nod()
      gesture_jump()
      gesture_emote()

      if (save_data[0].global.status) {
        calcAB(true, undefined, false)
      }

      if (save_data[0].sync_day_time) {
        world.gameRules.doDayLightCycle = false;
        world.gameRules.playersSleepingPercentage = 101;
      } else {
        world.gameRules.doDayLightCycle = true;
        world.gameRules.playersSleepingPercentage = 100;
      }


      if (save_data[0].challenge.progress == 1 && save_data[0].time.do_count) {
        enable_gamerules(!save_data[0].sync_day_time);
        check_health("infinity")
      } else if (save_data[0].challenge.active) {
        disable_gamerules()
        if (world.isHardcore) {
          check_health("resistance")
        }
      }

      if (save_data[0].challenge.active) {
        check_difficulty()
      }




      for (const player of world.getAllPlayers()) {
        save_data = load_save_data();
        let player_sd_index = save_data.findIndex(entry => entry.id === player.id);

        // AFK
        const wasAFK = isCurrentlyAFK.get(player.id) || false;
        const nowAFK = checkAFKStatus(player);

        if (!wasAFK && nowAFK) {
          // Went afk
          if (!save_data[0].global.status && save_data[player_sd_index].afk && save_data[player_sd_index].time.do_count) {
            save_data[player_sd_index].time.do_count = false;

            let key = save_data[player_sd_index].counting_type == 1 ? "timer" : "stopwatch";
            let delta = save_data[player_sd_index].counting_type ? 15 * 20 : -15 * 20;

            save_data[player_sd_index].time[key] += delta;

            if (save_data[player_sd_index].time[key] < 0) {
                save_data[player_sd_index].time[key] = 0;
            }

            update_save_data(save_data)
          }
          isCurrentlyAFK.set(player.id, true);
        } else if (wasAFK && !nowAFK) {
          // Came back
          if (!save_data[0].global.status && save_data[player_sd_index].afk && (!save_data[player_sd_index].time.do_count && save_data[player_sd_index].time[save_data[player_sd_index].counting_type == 1 ? "timer" : "stopwatch"] > 0)) {
            save_data[player_sd_index].time.do_count = true;
            update_save_data(save_data)
          }
          isCurrentlyAFK.set(player.id, false);
        }

        // Forceing gamemode (cm)
        if (save_data[0].challenge.active) {
          check_player_gamemode(player)
        }

        // Fullbrighe
        const nightVision = player.getEffect("night_vision");

        if (save_data[player_sd_index].fullbright &&(!nightVision || nightVision.duration < 205)) {
          player.addEffect("night_vision", 250, { showParticles: false });
        }



        if (save_data[player_sd_index].absolute_visibility == true) {
          player.onScreenDisplay.setActionBar(render_live_actionbar(save_data[player_sd_index], save_data[0].global.status ? false : true));
        }

      }

      // AFK
      for (const player of world.getAllPlayers()) {
        const name    = player.id;
        const currPos = player.location;
        const currRotRaw = player.getRotation();
        const currRot = { yaw: currRotRaw.y, pitch: currRotRaw.x };

        const prevPos = lastPosition.get(name);
        const moved = !prevPos
          || prevPos.x !== currPos.x
          || prevPos.y !== currPos.y
          || prevPos.z !== currPos.z;

        const prevRot = lastRotation.get(name);
        const rotated = !prevRot
          || prevRot.yaw   !== currRot.yaw
          || prevRot.pitch !== currRot.pitch;

        if (moved || rotated) {
          updateActivity(player);
          lastPosition.set(name, { x: currPos.x, y: currPos.y, z: currPos.z });
          lastRotation.set(name, currRot);
        }
      }


      await system.waitTicks(1);
    }
}

update_loop();