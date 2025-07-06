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
    "en_us": "System",
    "en_uk": "System",
    "de_de": "System",
    "de_at": "System",
    "de_ch": "System",
    "fr_fr": "Système",
    "fr_be": "Système",
    "fr_ch": "Système",
    "fr_ca": "Système",
    "it_it": "Sistema",
    "es_cl": "Sistema",
    "es_ve": "Sistema",
    "es_ar": "Sistema",
    "es_mx": "Sistema",
    "pt_pt": "Sistema",
    "pt_br": "Sistema",
    "is_is": "Kerfi",
    "el_gr": "Σύστημα",
    "ar_eg": "النظام",
    "ar_sa": "النظام",
    "ar_ae": "النظام",
    "fi_fi": "Järjestelmä",
    "sv_se": "System",
    "ru_ru": "Система",
    "ru_ua": "Система",
    "tr_tr": "Sistem",
    "fa_ir": "سیستم",
    "ps_af": "سیستم",
    "en_pk": "System",
    "ur_pk": "سسٹم",
    "en_in": "System",
    "hi_in": "सिस्टम",
    "si_lk": "පද්ධතිය",
    "ta_in": "அமைப்பு",
    "ta_lk": "அமைப்பு",
    "ne_np": "प्रणाली",
    "bn_bd": "সিস্টেম",
    "en_au": "System",
    "th_th": "ระบบ",
    "vi_vn": "Hệ thống",
    "id_id": "Sistem",
    "zh_cn": "系统",
    "en_sg": "System",
    "ms_sg": "Sistem",
    "ta_sg": "அமைப்பு",
    "ja_jp": "システム",
    "ko_kr": "시스템",
    "en_nz": "System",
    "mi_nz": "Pūnaha",
    "to_to": "Fakatupu",
    "en_ki": "System",
    "gil_ki": "Sistim",
    "ty_ty": "Pūnaha"
  },

  "message.header.system.client_mode": {
    "en": version_info.name,
  },

  "message.header.help": {
    "en_us": "Help",
    "en_uk": "Help",
    "de_de": "Hilfe",
    "de_at": "Hilfe",
    "de_ch": "Hilfe",
    "fr_fr": "Aide",
    "fr_be": "Aide",
    "fr_ch": "Aide",
    "fr_ca": "Aide",
    "it_it": "Aiuto",
    "es_cl": "Ayuda",
    "es_ve": "Ayuda",
    "es_ar": "Ayuda",
    "es_mx": "Ayuda",
    "pt_pt": "Ajuda",
    "pt_br": "Ajuda",
    "is_is": "Hjálp",
    "el_gr": "Βοήθεια",
    "ar_eg": "مساعدة",
    "ar_sa": "مساعدة",
    "ar_ae": "مساعدة",
    "fi_fi": "Apua",
    "sv_se": "Hjälp",
    "ru_ru": "Помощь",
    "ru_ua": "Допомога",
    "tr_tr": "Yardım",
    "fa_ir": "کمک",
    "ps_af": "مرسته",
    "en_pk": "Help",
    "ur_pk": "مدد",
    "en_in": "Help",
    "hi_in": "सहायता",
    "si_lk": "උදව්",
    "ta_in": "உதவி",
    "ta_lk": "உதவி",
    "ne_np": "मद्दत",
    "bn_bd": "সাহায্য",
    "en_au": "Help",
    "th_th": "ช่วยเหลือ",
    "vi_vn": "Trợ giúp",
    "id_id": "Bantuan",
    "zh_cn": "帮助",
    "en_sg": "Help",
    "ms_sg": "Bantuan",
    "ta_sg": "உதவி",
    "ja_jp": "ヘルプ",
    "ko_kr": "도움말",
    "en_nz": "Help",
    "mi_nz": "Āwhina",
    "to_to": "Tokoni",
    "en_ki": "Help",
    "gil_ki": "Kabane",
    "ty_ty": "Āwhina"
  },

  "message.header.note": {
    "en_us": "Note",
    "en_uk": "Note",
    "de_de": "Hinweis",
    "de_at": "Hinweis",
    "de_ch": "Hinweis",
    "fr_fr": "Note",
    "fr_be": "Note",
    "fr_ch": "Note",
    "fr_ca": "Note",
    "it_it": "Nota",
    "es_cl": "Nota",
    "es_ve": "Nota",
    "es_ar": "Nota",
    "es_mx": "Nota",
    "pt_pt": "Nota",
    "pt_br": "Nota",
    "is_is": "Athugasemd",
    "el_gr": "Σημείωση",
    "ar_eg": "ملاحظة",
    "ar_sa": "ملاحظة",
    "ar_ae": "ملاحظة",
    "fi_fi": "Huomautus",
    "sv_se": "Notering",
    "ru_ru": "Примечание",
    "ru_ua": "Примітка",
    "tr_tr": "Not",
    "fa_ir": "توجه",
    "ps_af": "یادونه",
    "en_pk": "Note",
    "ur_pk": "نوٹ",
    "en_in": "Note",
    "hi_in": "नोट",
    "si_lk": "සටහන",
    "ta_in": "குறிப்பு",
    "ta_lk": "குறிப்பு",
    "ne_np": "टिप्पणी",
    "bn_bd": "নোট",
    "en_au": "Note",
    "th_th": "หมายเหตุ",
    "vi_vn": "Ghi chú",
    "id_id": "Catatan",
    "zh_cn": "注意",
    "en_sg": "Note",
    "ms_sg": "Catatan",
    "ta_sg": "குறிப்பு",
    "ja_jp": "注意",
    "ko_kr": "참고",
    "en_nz": "Note",
    "mi_nz": "Kōrero",
    "to_to": "Fakamatala",
    "en_ki": "Note",
    "gil_ki": "Katei",
    "ty_ty": "Kōrero"
  },

  "message.header.end": {
    "en_us": "End",
    "en_uk": "End",
    "de_de": "Ende",
    "de_at": "Ende",
    "de_ch": "Ende",
    "fr_fr": "Fin",
    "fr_be": "Fin",
    "fr_ch": "Fin",
    "fr_ca": "Fin",
    "it_it": "Fine",
    "es_cl": "Fin",
    "es_ve": "Fin",
    "es_ar": "Fin",
    "es_mx": "Fin",
    "pt_pt": "Fim",
    "pt_br": "Fim",
    "is_is": "Lok",
    "el_gr": "Τέλος",
    "ar_eg": "نهاية",
    "ar_sa": "نهاية",
    "ar_ae": "نهاية",
    "fi_fi": "Loppu",
    "sv_se": "Slut",
    "ru_ru": "Конец",
    "ru_ua": "Кінець",
    "tr_tr": "Son",
    "fa_ir": "پایان",
    "ps_af": "پای",
    "en_pk": "End",
    "ur_pk": "اختتام",
    "en_in": "End",
    "hi_in": "अंत",
    "si_lk": "අවසානය",
    "ta_in": "முடிவு",
    "ta_lk": "முடிவு",
    "ne_np": "अन्त",
    "bn_bd": "শেষ",
    "en_au": "End",
    "th_th": "จบ",
    "vi_vn": "Kết thúc",
    "id_id": "Akhir",
    "zh_cn": "结束",
    "en_sg": "End",
    "ms_sg": "Akhir",
    "ta_sg": "முடிவு",
    "ja_jp": "終了",
    "ko_kr": "끝",
    "en_nz": "End",
    "mi_nz": "Mutunga",
    "to_to": "Ngata",
    "en_ki": "End",
    "gil_ki": "Kaoti",
    "ty_ty": "Hopea"
  },


  "message.header.condition": {
    "en_us": "Condition",
    "en_uk": "Condition",
    "de_de": "Bedingung",
    "de_at": "Bedingung",
    "de_ch": "Bedingung",
    "fr_fr": "Condition",
    "fr_be": "Condition",
    "fr_ch": "Condition",
    "fr_ca": "Condition",
    "it_it": "Condizione",
    "es_cl": "Condición",
    "es_ve": "Condición",
    "es_ar": "Condición",
    "es_mx": "Condición",
    "pt_pt": "Condição",
    "pt_br": "Condição",
    "is_is": "Ástand",
    "el_gr": "Κατάσταση",
    "ar_eg": "حالة",
    "ar_sa": "حالة",
    "ar_ae": "حالة",
    "fi_fi": "Ehto",
    "sv_se": "Villkor",
    "ru_ru": "Условие",
    "ru_ua": "Умова",
    "tr_tr": "Koşul",
    "fa_ir": "شرایط",
    "ps_af": "شرط",
    "en_pk": "Condition",
    "ur_pk": "شرط",
    "en_in": "Condition",
    "hi_in": "स्थिति",
    "si_lk": "තත්ත්වය",
    "ta_in": "நிலை",
    "ta_lk": "நிலை",
    "ne_np": "अवस्था",
    "bn_bd": "অবস্থা",
    "en_au": "Condition",
    "th_th": "เงื่อนไข",
    "vi_vn": "Điều kiện",
    "id_id": "Kondisi",
    "zh_cn": "条件",
    "en_sg": "Condition",
    "ms_sg": "Syarat",
    "ta_sg": "நிலை",
    "ja_jp": "条件",
    "ko_kr": "조건",
    "en_nz": "Condition",
    "mi_nz": "Tikanga",
    "to_to": "Fekau",
    "en_ki": "Condition",
    "gil_ki": "Kainaki",
    "ty_ty": "Raveā"
  },

  "message.header.error": {
    "en_us": "Error",
    "en_uk": "Error",
    "de_de": "Fehler",
    "de_at": "Fehler",
    "de_ch": "Fehler",
    "fr_fr": "Erreur",
    "fr_be": "Erreur",
    "fr_ch": "Erreur",
    "fr_ca": "Erreur",
    "it_it": "Errore",
    "es_cl": "Error",
    "es_ve": "Error",
    "es_ar": "Error",
    "es_mx": "Error",
    "pt_pt": "Erro",
    "pt_br": "Erro",
    "is_is": "Villa",
    "el_gr": "Σφάλμα",
    "ar_eg": "خطأ",
    "ar_sa": "خطأ",
    "ar_ae": "خطأ",
    "fi_fi": "Virhe",
    "sv_se": "Fel",
    "ru_ru": "Ошибка",
    "ru_ua": "Помилка",
    "tr_tr": "Hata",
    "fa_ir": "خطا",
    "ps_af": "تېروتنه",
    "en_pk": "Error",
    "ur_pk": "خرابی",
    "en_in": "Error",
    "hi_in": "त्रुटि",
    "si_lk": "දෝෂය",
    "ta_in": "பிழை",
    "ta_lk": "பிழை",
    "ne_np": "त्रुटि",
    "bn_bd": "ত্রুটি",
    "en_au": "Error",
    "th_th": "ข้อผิดพลาด",
    "vi_vn": "Lỗi",
    "id_id": "Kesalahan",
    "zh_cn": "错误",
    "en_sg": "Error",
    "ms_sg": "Ralat",
    "ta_sg": "பிழை",
    "ja_jp": "エラー",
    "ko_kr": "오류",
    "en_nz": "Error",
    "mi_nz": "Hapa",
    "to_to": "Hala",
    "en_ki": "Error",
    "gil_ki": "Kanako",
    "ty_ty": "Hape"
  },


  // Messages
  "message.body.help.open_menu": {
    "en_us": "You can always open the menu with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "en_uk": "You can always open the menu with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "de_de": "Du kannst das Menü jederzeit mit der Schleich-Sprung (oder im Zuschauermodus mit dem Nicken) Geste, mit dem Befehl §l/scriptevent timerv:menu§r§f oder mit einem Stock öffnen",
    "de_at": "Du kannst das Menü jederzeit mit der Schleich-Sprung (oder im Zuschauermodus mit dem Nicken) Geste, mit dem Befehl §l/scriptevent timerv:menu§r§f oder mit einem Stock öffnen",
    "de_ch": "Du chasch s'Menü jederziit mit de Schliich-Sprung (oder im Zueschauermodue mit em Nicke) Geste, mit em Befehl §l/scriptevent timerv:menu§r§f oder mit em Stock öffne",
    "fr_fr": "Vous pouvez toujours ouvrir le menu avec le geste accroupi-saut (ou en spectateur avec le hochement de tête), avec la commande §l/scriptevent timerv:menu§r§f ou avec un bâton",
    "fr_be": "Vous pouvez toujours ouvrir le menu avec le geste accroupi-saut (ou en spectateur avec le hochement de tête), avec la commande §l/scriptevent timerv:menu§r§f ou avec un bâton",
    "fr_ch": "Vous pouvez toujours ouvrir le menu avec le geste accroupi-saut (ou en spectateur avec le hochement de tête), avec la commande §l/scriptevent timerv:menu§r§f ou avec un bâton",
    "fr_ca": "Vous pouvez toujours ouvrir le menu avec le geste accroupi-saut (ou en spectateur avec le hochement de tête), avec la commande §l/scriptevent timerv:menu§r§f ou avec un bâton",
    "it_it": "Puoi sempre aprire il menu con il gesto accovacciati-salta (o in spettatore con l'annuire), con il comando §l/scriptevent timerv:menu§r§f o con un bastone",
    "es_cl": "Siempre puedes abrir el menú con el gesto agacharse-saltar (o en espectador con el asentimiento), con el comando §l/scriptevent timerv:menu§r§f o con un palo",
    "es_ve": "Siempre puedes abrir el menú con el gesto agacharse-saltar (o en espectador con el asentimiento), con el comando §l/scriptevent timerv:menu§r§f o con un palo",
    "es_ar": "Siempre podés abrir el menú con el gesto agacharse-saltar (o en espectador con el asentimiento), con el comando §l/scriptevent timerv:menu§r§f o con un palo",
    "es_mx": "Siempre puedes abrir el menú con el gesto agacharse-saltar (o en espectador con el asentimiento), con el comando §l/scriptevent timerv:menu§r§f o con un palo",
    "pt_pt": "Podes sempre abrir o menu com o gesto agachar-saltar (ou em espectador com o acenar), com o comando §l/scriptevent timerv:menu§r§f ou com um pau",
    "pt_br": "Você sempre pode abrir o menu com o gesto agachar-pular (ou em espectador com o acenar), com o comando §l/scriptevent timerv:menu§r§f ou com uma vara",
    "is_is": "Þú getur alltaf opnað valmyndina með skjálfa-hoppa (eða í áhorfanda með hnakka) bendingu, með skipuninni §l/scriptevent timerv:menu§r§f eða með staf",
    "el_gr": "Μπορείτε πάντα να ανοίξετε το μενού με τη χειρονομία κάθισμα-άλμα (ή σε θεατή με το γνέψιμο), με την εντολή §l/scriptevent timerv:menu§r§f ή με ένα ραβδί",
    "ar_eg": "يمكنك دائماً فتح القائمة بحركة الانحناء-القفز (أو في وضع المشاهد بالإيماءة)، بالأمر §l/scriptevent timerv:menu§r§f أو بالعصا",
    "ar_sa": "يمكنك دائماً فتح القائمة بحركة الانحناء-القفز (أو في وضع المشاهد بالإيماءة)، بالأمر §l/scriptevent timerv:menu§r§f أو بالعصا",
    "ar_ae": "يمكنك دائماً فتح القائمة بحركة الانحناء-القفز (أو في وضع المشاهد بالإيماءة)، بالأمر §l/scriptevent timerv:menu§r§f أو بالعصا",
    "fi_fi": "Voit aina avata valikon kyykky-hyppy (tai katsojassa nyökkäys) eleellä, komennolla §l/scriptevent timerv:menu§r§f tai kepillä",
    "sv_se": "Du kan alltid öppna menyn med huk-hopp (eller i åskådare med nick) gesten, med kommandot §l/scriptevent timerv:menu§r§f eller med en pinne",
    "ru_ru": "Вы всегда можете открыть меню жестом присесть-прыжок (или в режиме наблюдателя кивком), командой §l/scriptevent timerv:menu§r§f или палкой",
    "ru_ua": "Вы всегда можете открыть меню жестом присесть-прыжок (или в режиме наблюдателя кивком), командой §l/scriptevent timerv:menu§r§f или палкой",
    "tr_tr": "Menüyü her zaman çömel-zıpla (veya izleyicide başını sallama) hareketiyle, §l/scriptevent timerv:menu§r§f komutuyla veya çubukla açabilirsiniz",
    "fa_ir": "همیشه می‌توانید منو را با حرکت خم شدن-پریدن (یا در حالت تماشاگر با سر تکان دادن)، با دستور §l/scriptevent timerv:menu§r§f یا با چوب باز کنید",
    "ps_af": "تاسو کولی شئ تل د لمنۍ حرکت سره مینو خلاص کړئ (یا د لیدونکي په حالت کې د سر سره)، د §l/scriptevent timerv:menu§r§f امر سره یا د لرګي سره",
    "en_pk": "You can always open the menu with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "ur_pk": "آپ ہمیشہ منیو کو جھکنا-چھلانگ (یا تماشائی میں سر ہلانے) کے اشارے سے، §l/scriptevent timerv:menu§r§f کمانڈ سے یا چھڑی سے کھول سکتے ہیں",
    "en_in": "You can always open the menu with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "hi_in": "आप हमेशा स्नीक-जंप (या दर्शक में नॉड) इशारे के साथ, §l/scriptevent timerv:menu§r§f कमांड के साथ या एक छड़ी के साथ मेनू खोल सकते हैं",
    "si_lk": "ඔබට සෑම විටම තිරයට පැමිණීම-පැනීම (හෝ නරඹන්නා තුළ හිස නෙරනවා) හාවභාවයෙන්, §l/scriptevent timerv:menu§r§f විධානයෙන් හෝ කූරකයකින් මෙනුව විවෘත කළ හැකිය",
    "ta_in": "நீங்கள் எப்போதும் குனிந்து-தாவும் (அல்லது பார்வையாளரில் தலையசைத்தல்) சைகையால், §l/scriptevent timerv:menu§r§f கட்டளையால் அல்லது ஒரு கோலால் மெனுவை திறக்கலாம்",
    "ta_lk": "நீங்கள் எப்போதும் குனிந்து-தாவும் (அல்லது பார்வையாளரில் தலையசைத்தல்) சைகையால், §l/scriptevent timerv:menu§r§f கட்டளையால் அல்லது ஒரு கோலால் மெனுவை திறக்கலாம்",
    "ne_np": "तपाईं सधैं लुकेर-उफ्रिने (वा दर्शकमा टाउको हल्लाउने) इशाराले, §l/scriptevent timerv:menu§r§f आदेशले वा लठ्ठीले मेनु खोल्न सक्नुहुन्छ",
    "bn_bd": "আপনি সর্বদা লুকিয়ে-লাফানো (বা দর্শকে মাথা নাড়ানো) অঙ্গভঙ্গি দিয়ে, §l/scriptevent timerv:menu§r§f কমান্ড দিয়ে বা একটি লাঠি দিয়ে মেনু খুলতে পারেন",
    "en_au": "You can always open the menu with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "th_th": "คุณสามารถเปิดเมนูได้เสมอด้วยท่าทางย่อตัว-กระโดด (หรือในโหมดผู้ชมด้วยการพยักหน้า), ด้วยคำสั่ง §l/scriptevent timerv:menu§r§f หรือด้วยไม้",
    "vi_vn": "Bạn luôn có thể mở menu bằng cử chỉ cúi-nhảy (hoặc trong chế độ khán giả bằng gật đầu), bằng lệnh §l/scriptevent timerv:menu§r§f hoặc bằng que",
    "id_id": "Anda selalu dapat membuka menu dengan gerakan jongkok-lompat (atau dalam penonton dengan mengangguk), dengan perintah §l/scriptevent timerv:menu§r§f atau dengan tongkat",
    "zh_cn": "您可以随时通过潜行-跳跃（或在观察者模式中点头）手势、§l/scriptevent timerv:menu§r§f命令或用棍子打开菜单",
    "en_sg": "You can always open the menu with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "ms_sg": "Anda sentiasa boleh membuka menu dengan gerakan sembunyi-lompat (atau dalam penonton dengan mengangguk), dengan arahan §l/scriptevent timerv:menu§r§f atau dengan tongkat",
    "ta_sg": "நீங்கள் எப்போதும் குனிந்து-தாவும் (அல்லது பார்வையாளரில் தலையசைத்தல்) சைகையால், §l/scriptevent timerv:menu§r§f கட்டளையால் அல்லது ஒரு கோலால் மெனுவை திறக்கலாம்",
    "ja_jp": "スニーク-ジャンプ（またはスペクテーターでのうなずき）ジェスチャー、§l/scriptevent timerv:menu§r§fコマンド、または棒でいつでもメニューを開くことができます",
    "ko_kr": "웅크리기-점프 (또는 관전자 모드에서 고개 끄덕이기) 제스처, §l/scriptevent timerv:menu§r§f 명령어 또는 막대기로 언제든지 메뉴를 열 수 있습니다",
    "en_nz": "You can always open the menu with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "mi_nz": "Ka taea e koe te whakatuwhera i te raina i nga wa katoa ki te tohu whakangaro-tupeke (ranei i te kaimātakitaki ki te pokohiwi), ki te tohutohu §l/scriptevent timerv:menu§r§f ranei ki te rākau",
    "to_to": "Ko e lava 'o ke faka'ava 'a e mīniu 'i he faka'ilo 'o e lolo-kapu (pe 'i he tokoto'i 'aki 'a e faka'ilo 'ulo), 'i he fekau §l/scriptevent timerv:menu§r§f pe 'aki 'a e vakapuna",
    "en_ki": "You can always open the menu with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "gil_ki": "A rawa n tei bongana te menu am te taeka n maka-ruru (am te kaitanikara am te bongana), am te command §l/scriptevent timerv:menu§r§f am te stick",
    "ty_ty": "Ua mea roa outou i te hāmani i te tahua ma te fifi-ōpē (ahiri rānei i te hi'ora'a ma te 'ā'ē), ma te parau §l/scriptevent timerv:menu§r§f ahiri rānei ma te rā'au"
  },


  "message.body.help.setup.closed": {
    "en_us": "The menu got closed! You can always open it again with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "en_uk": "The menu got closed! You can always open it again with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "de_de": "Das Menü wurde geschlossen! Du kannst es jederzeit wieder öffnen mit der Schleich-Sprung (oder im Zuschauermodus mit dem Nicken) Geste, mit dem Befehl §l/scriptevent timerv:menu§r§f oder mit einem Stock",
    "de_at": "Das Menü wurde geschlossen! Du kannst es jederzeit wieder öffnen mit der Schleich-Sprung (oder im Zuschauermodus mit dem Nicken) Geste, mit dem Befehl §l/scriptevent timerv:menu§r§f oder mit einem Stock",
    "de_ch": "Das Menü wurde geschlossen! Du kannst es jederzeit wieder öffnen mit der Schleich-Sprung (oder im Zuschauermodus mit dem Nicken) Geste, mit dem Befehl §l/scriptevent timerv:menu§r§f oder mit einem Stock",
    "fr_fr": "Le menu s'est fermé ! Vous pouvez toujours le rouvrir avec le geste accroupi-saut (ou en spectateur avec le hochement de tête), avec la commande §l/scriptevent timerv:menu§r§f ou avec un bâton",
    "fr_be": "Le menu s'est fermé ! Vous pouvez toujours le rouvrir avec le geste accroupi-saut (ou en spectateur avec le hochement de tête), avec la commande §l/scriptevent timerv:menu§r§f ou avec un bâton",
    "fr_ch": "Le menu s'est fermé ! Vous pouvez toujours le rouvrir avec le geste accroupi-saut (ou en spectateur avec le hochement de tête), avec la commande §l/scriptevent timerv:menu§r§f ou avec un bâton",
    "fr_ca": "Le menu s'est fermé ! Vous pouvez toujours le rouvrir avec le geste accroupi-saut (ou en spectateur avec le hochement de tête), avec la commande §l/scriptevent timerv:menu§r§f ou avec un bâton",
    "it_it": "Il menu si è chiuso! Puoi sempre riaprirlo con il gesto accovacciato-salto (o in spettatore con il cenno del capo), con il comando §l/scriptevent timerv:menu§r§f o con un bastone",
    "es_cl": "¡El menú se cerró! Siempre puedes abrirlo de nuevo con el gesto agacharse-saltar (o en espectador con el gesto de asentir), con el comando §l/scriptevent timerv:menu§r§f o con un palo",
    "es_ve": "¡El menú se cerró! Siempre puedes abrirlo de nuevo con el gesto agacharse-saltar (o en espectador con el gesto de asentir), con el comando §l/scriptevent timerv:menu§r§f o con un palo",
    "es_ar": "¡El menú se cerró! Siempre podés abrirlo de nuevo con el gesto agacharse-saltar (o en espectador con el gesto de asentir), con el comando §l/scriptevent timerv:menu§r§f o con un palo",
    "es_mx": "¡El menú se cerró! Siempre puedes abrirlo de nuevo con el gesto agacharse-saltar (o en espectador con el gesto de asentir), con el comando §l/scriptevent timerv:menu§r§f o con un palo",
    "pt_pt": "O menu fechou-se! Podes sempre abri-lo novamente com o gesto agachar-saltar (ou em espectador com o acenar), com o comando §l/scriptevent timerv:menu§r§f ou com um pau",
    "pt_br": "O menu fechou! Você sempre pode abri-lo novamente com o gesto agachar-pular (ou em espectador com o acenar), com o comando §l/scriptevent timerv:menu§r§f ou com um graveto",
    "is_is": "Valmyndin lokaðist! Þú getur alltaf opnað hana aftur með snigla-stökkva (eða í áhorfanda með hneigjugesti), með skipuninni §l/scriptevent timerv:menu§r§f eða með staf",
    "el_gr": "Το μενού έκλεισε! Μπορείς πάντα να το ανοίξεις ξανά με τη χειρονομία σκύψιμο-άλμα (ή σε θεατή με το νεύμα), με την εντολή §l/scriptevent timerv:menu§r§f ή με ένα ραβδί",
    "ar_eg": "تم إغلاق القائمة! يمكنك دائماً فتحها مرة أخرى باستخدام إيماءة الانحناء-القفز (أو في المتفرج بالإيماء)، مع الأمر §l/scriptevent timerv:menu§r§f أو بالعصا",
    "ar_sa": "تم إغلاق القائمة! يمكنك دائماً فتحها مرة أخرى باستخدام إيماءة الانحناء-القفز (أو في المتفرج بالإيماء)، مع الأمر §l/scriptevent timerv:menu§r§f أو بالعصا",
    "ar_ae": "تم إغلاق القائمة! يمكنك دائماً فتحها مرة أخرى باستخدام إيماءة الانحناء-القفز (أو في المتفرج بالإيماء)، مع الأمر §l/scriptevent timerv:menu§r§f أو بالعصا",
    "fi_fi": "Valikko sulkeutui! Voit aina avata sen uudelleen hiivi-hyppy (tai katsojassa nyökkäys) eleellä, komennolla §l/scriptevent timerv:menu§r§f tai kepillä",
    "sv_se": "Menyn stängdes! Du kan alltid öppna den igen med smyg-hopp (eller i åskådare med nick) gesten, med kommandot §l/scriptevent timerv:menu§r§f eller med en pinne",
    "ru_ru": "Меню закрылось! Вы всегда можете открыть его снова жестом присесть-прыжок (или в режиме наблюдателя кивком), командой §l/scriptevent timerv:menu§r§f или палкой",
    "ru_ua": "Меню закрылось! Вы всегда можете открыть его снова жестом присесть-прыжок (или в режиме наблюдателя кивком), командой §l/scriptevent timerv:menu§r§f или палкой",
    "tr_tr": "Menü kapandı! Her zaman çömel-zıpla (veya izleyici modunda başını sallama) hareketiyle, §l/scriptevent timerv:menu§r§f komutuyla veya bir sopayla yeniden açabilirsiniz",
    "fa_ir": "منو بسته شد! همیشه می‌توانید آن را دوباره با حرکت خمیده شدن-پریدن (یا در حالت تماشاگر با تکان دادن سر) باز کنید، با دستور §l/scriptevent timerv:menu§r§f یا با چوب",
    "ps_af": "مینو تړل شوه! تاسو کولی شئ دا بیا د ټیټېدو-ټوپ (یا په لیدونکي کې د سر ښوړولو) نښو سره، د §l/scriptevent timerv:menu§r§f امر سره یا د لرګي سره خلاص کړئ",
    "en_pk": "The menu got closed! You can always open it again with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "ur_pk": "مینو بند ہو گیا! آپ اسے ہمیشہ جھکنا-چھلانگ (یا تماشائی میں سر ہلانا) کے اشارے سے، §l/scriptevent timerv:menu§r§f کمانڈ سے یا لاٹھی سے کھول سکتے ہیں",
    "en_in": "The menu got closed! You can always open it again with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "hi_in": "मेन्यू बंद हो गया! आप इसे हमेशा स्नीक-जंप (या दर्शक मोड में नॉड) जेस्चर से, §l/scriptevent timerv:menu§r§f कमांड से या स्टिक से खोल सकते हैं",
    "si_lk": "මෙනුව වැසී ගියා! ඔබට එය සෑමවිටම හැංගී-පනිනවා (හෝ නරඹන්නාගේ තුළ හිස නැමීම) අභිනයෙන්, §l/scriptevent timerv:menu§r§f විධානයෙන් හෝ කූරකින් නැවත විවෘත කළ හැකිය",
    "ta_in": "மெனு மூடப்பட்டது! நீங்கள் எப்போதும் அதை மீண்டும் திருட்டு-தாவல் (அல்லது பார்வையாளரில் தலையசைத்தல்) சைகையால், §l/scriptevent timerv:menu§r§f கட்டளையால் அல்லது குச்சியால் திறக்கலாம்",
    "ta_lk": "மெனு மூடப்பட்டது! நீங்கள் எப்போதும் அதை மீண்டும் திருட்டு-தாவல் (அல்லது பார்வையாளரில் தலையசைத்தல்) சைகையால், §l/scriptevent timerv:menu§r§f கட்டளையால் அல்லது குச்சியால் திறக்கலாம்",
    "ne_np": "मेनु बन्द भयो! तपाईं यसलाई सधैं लुकेर-उफ्रिने (वा दर्शकमा टाउको हल्लाउने) इशाराबाट, §l/scriptevent timerv:menu§r§f आदेशबाट वा लाठीबाट खोल्न सक्नुहुन्छ",
    "bn_bd": "মেনু বন্ধ হয়ে গেছে! আপনি সর্বদা এটি স্নিক-জাম্প (বা দর্শক মোডে নড) অঙ্গভঙ্গি দিয়ে, §l/scriptevent timerv:menu§r§f কমান্ড দিয়ে বা লাঠি দিয়ে আবার খুলতে পারেন",
    "en_au": "The menu got closed! You can always open it again with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "th_th": "เมนูปิดแล้ว! คุณสามารถเปิดมันอีกครั้งด้วยท่าทางแอบ-กระโดด (หรือในโหมดผู้ชมด้วยการพยักหน้า), ด้วยคำสั่ง §l/scriptevent timerv:menu§r§f หรือด้วยไม้",
    "vi_vn": "Menu đã đóng! Bạn luôn có thể mở lại bằng cử chỉ rón rén-nhảy (hoặc trong chế độ khán giả bằng gật đầu), bằng lệnh §l/scriptevent timerv:menu§r§f hoặc bằng que",
    "id_id": "Menu telah ditutup! Anda selalu dapat membukanya lagi dengan gerakan jongkok-lompat (atau dalam mode penonton dengan mengangguk), dengan perintah §l/scriptevent timerv:menu§r§f atau dengan tongkat",
    "zh_cn": "菜单已关闭！您可以随时通过潜行-跳跃手势（或在观察者模式下点头）、使用命令§l/scriptevent timerv:menu§r§f或使用棍子重新打开它",
    "en_sg": "The menu got closed! You can always open it again with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "ms_sg": "Menu telah ditutup! Anda sentiasa boleh membukanya semula dengan gerakan selinap-lompat (atau dalam tontonan dengan mengangguk), dengan arahan §l/scriptevent timerv:menu§r§f atau dengan kayu",
    "ta_sg": "மெனு மூடப்பட்டது! நீங்கள் எப்போதும் அதை மீண்டும் திருட்டு-தாவல் (அல்லது பார்வையாளரில் தலையசைத்தல்) சைகையால், §l/scriptevent timerv:menu§r§f கட்டளையால் அல்லது குச்சியால் திறக்கலாம்",
    "ja_jp": "メニューが閉じられました！いつでもスニーク-ジャンプ（またはスペクテーターでうなずき）ジェスチャー、コマンド§l/scriptevent timerv:menu§r§f、または棒で再度開くことができます",
    "ko_kr": "메뉴가 닫혔습니다! 언제든지 웅크리기-점프 (또는 관전자 모드에서 고개 끄덕이기) 제스처로, §l/scriptevent timerv:menu§r§f 명령으로 또는 막대기로 다시 열 수 있습니다",
    "en_nz": "The menu got closed! You can always open it again with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "mi_nz": "Kua kopi te tahua! Ka taea e koe te whakatuwera anō me te tohu ngawha-rere (rānei i te kaimātai me te whakangahau), me te whakahau §l/scriptevent timerv:menu§r§f rānei me te rākau",
    "to_to": "Kuo tapuni 'a e menu! Ke lava 'o toe 'avake ia mo e fakatokanga momoko-'alu (pe 'i he sio mo e ngu'u), mo e fekau §l/scriptevent timerv:menu§r§f pe mo e tu'unga",
    "en_ki": "The menu got closed! You can always open it again with the sneak-jump (or in spectator with the nod) gesture, with the command §l/scriptevent timerv:menu§r§f or with a stick",
    "gil_ki": "A bwaitoka te menu! E kona n tia buokaki naba ma te bwai-bwai (am ba i te neboa ma te ngai), ma te tia §l/scriptevent timerv:menu§r§f am ba ma te bwai",
    "ty_ty": "Ua pani te menu! E nehenehe ia oe e fa'atupu faahou me te fa'atupu paruru-tairi (pe i te mata'i me te fa'arue), me te fa'anahoara'a §l/scriptevent timerv:menu§r§f pe me te ra'au"
  },

  "message.body.convert_global_to_local.error": {
    "en_us": "The time could not be synchronized with the player profile (%{name}%) and got deleted!",
    "en_uk": "The time could not be synchronised with the player profile (%{name}%) and got deleted!",
    "de_de": "Die Zeit konnte nicht mit dem Spielerprofil (%{name}%) synchronisiert werden und wurde gelöscht!",
    "de_at": "Die Zeit konnte nicht mit dem Spielerprofil (%{name}%) synchronisiert werden und wurde gelöscht!",
    "de_ch": "Die Zeit konnte nicht mit dem Spielerprofil (%{name}%) synchronisiert werden und wurde gelöscht!",
    "fr_fr": "L'heure n'a pas pu être synchronisée avec le profil du joueur (%{name}%) et a été supprimée !",
    "fr_be": "L'heure n'a pas pu être synchronisée avec le profil du joueur (%{name}%) et a été supprimée !",
    "fr_ch": "L'heure n'a pas pu être synchronisée avec le profil du joueur (%{name}%) et a été supprimée !",
    "fr_ca": "L'heure n'a pas pu être synchronisée avec le profil du joueur (%{name}%) et a été supprimée !",
    "it_it": "Il tempo non è stato sincronizzato con il profilo del giocatore (%{name}%) ed è stato eliminato!",
    "es_cl": "El tiempo no pudo sincronizarse con el perfil del jugador (%{name}%) y fue eliminado!",
    "es_ve": "El tiempo no pudo sincronizarse con el perfil del jugador (%{name}%) y fue eliminado!",
    "es_ar": "El tiempo no pudo sincronizarse con el perfil del jugador (%{name}%) y fue eliminado!",
    "es_mx": "El tiempo no pudo sincronizarse con el perfil del jugador (%{name}%) y fue eliminado!",
    "pt_pt": "O tempo não pôde ser sincronizado com o perfil do jogador (%{name}%) e foi apagado!",
    "pt_br": "O tempo não pôde ser sincronizado com o perfil do jogador (%{name}%) e foi deletado!",
    "is_is": "Tíminn gat ekki samstillt við leikmannssnið (%{name}%) og var eytt!",
    "el_gr": "Ο χρόνος δεν μπόρεσε να συγχρονιστεί με το προφίλ του παίκτη (%{name}%) και διαγράφηκε!",
    "ar_eg": "لا يمكن مزامنة الوقت مع ملف تعريف اللاعب (%{name}%) وتم حذفه!",
    "ar_sa": "لا يمكن مزامنة الوقت مع ملف تعريف اللاعب (%{name}%) وتم حذفه!",
    "ar_ae": "لا يمكن مزامنة الوقت مع ملف تعريف اللاعب (%{name}%) وتم حذفه!",
    "fi_fi": "Aikaa ei voitu synkronoida pelaajan profiilin (%{name}%) kanssa ja se poistettiin!",
    "sv_se": "Tiden kunde inte synkroniseras med spelarprofilen (%{name}%) och raderades!",
    "ru_ru": "Время не удалось синхронизировать с профилем игрока (%{name}%) и было удалено!",
    "ru_ua": "Время не удалось синхронизировать с профилем игрока (%{name}%) и было удалено!",
    "tr_tr": "Zaman oyuncu profili (%{name}%) ile senkronize edilemedi ve silindi!",
    "fa_ir": "زمان نمی‌توانست با نمایه بازیکن (%{name}%) همگام‌سازی شود و حذف شد!",
    "ps_af": "وخت د لوبغاړي پروفایل (%{name}%) سره همغږي نشو کولی او ړنګ شو!",
    "en_pk": "The time could not be synchronized with the player profile (%{name}%) and got deleted!",
    "ur_pk": "وقت کو کھلاڑی کی پروفائل (%{name}%) کے ساتھ ہم آہنگ نہیں کیا جا سکا اور یہ حذف ہو گیا!",
    "en_in": "The time could not be synchronized with the player profile (%{name}%) and got deleted!",
    "hi_in": "समय को खिलाड़ी प्रोफाइल (%{name}%) के साथ सिंक्रोनाइज़ नहीं किया जा सका और यह हटा दिया गया!",
    "si_lk": "කාලය ක්‍රීඩක පැතිකඩ (%{name}%) සමඟ සමමුහුර්ත කිරීමට නොහැකි වී මකා දමන ලදී!",
    "ta_in": "நேரத்தை வீரர் விவரக்குறிப்பு (%{name}%) உடன் ஒத்திசைக்க முடியவில்லை மற்றும் அது நீக்கப்பட்டது!",
    "ta_lk": "நேரத்தை வீரர் விவரக்குறிப்பு (%{name}%) உடன் ஒத்திசைக்க முடியவில்லை மற்றும் அது நீக்கப்பட்டது!",
    "ne_np": "समय खेलाडी प्रोफाइल (%{name}%) सँग सिंक्रोनाइज गर्न सकिएन र मेटाइयो!",
    "bn_bd": "সময় প্লেয়ার প্রোফাইল (%{name}%) এর সাথে সিঙ্ক্রোনাইজ করা যায়নি এবং মুছে দেওয়া হয়েছে!",
    "en_au": "The time could not be synchronised with the player profile (%{name}%) and got deleted!",
    "th_th": "ไม่สามารถซิงโครไนซ์เวลากับโปรไฟล์ผู้เล่น (%{name}%) และถูกลบแล้ว!",
    "vi_vn": "Không thể đồng bộ thời gian với hồ sơ người chơi (%{name}%) và đã bị xóa!",
    "id_id": "Waktu tidak dapat disinkronisasi dengan profil pemain (%{name}%) dan telah dihapus!",
    "zh_cn": "时间无法与玩家资料 (%{name}%) 同步，已被删除！",
    "en_sg": "The time could not be synchronised with the player profile (%{name}%) and got deleted!",
    "ms_sg": "Masa tidak dapat disegerakkan dengan profil pemain (%{name}%) dan telah dipadam!",
    "ta_sg": "நேரத்தை வீரர் விவரக்குறிப்பு (%{name}%) உடன் ஒத்திசைக்க முடியவில்லை மற்றும் அது நீக்கப்பட்டது!",
    "ja_jp": "時間をプレイヤープロファイル (%{name}%) と同期できず、削除されました！",
    "ko_kr": "시간을 플레이어 프로필 (%{name}%)과 동기화할 수 없어 삭제되었습니다!",
    "en_nz": "The time could not be synchronised with the player profile (%{name}%) and got deleted!",
    "mi_nz": "Kāore i taea te whakarite te taima ki te mata tangata (%{name}%) ā i mukua!",
    "to_to": "Na'e 'ikai lava 'o fakataha 'a e taimi mo e fakamatala 'o e tangata ta'alo (%{name}%) pea na'e holoki!",
    "en_ki": "The time could not be synchronised with the player profile (%{name}%) and got deleted!",
    "gil_ki": "Te taim te aki kona n aoraki ma te profile aomata (%{name}%) ao a bwaitoka!",
    "ty_ty": "Te taima te ore nei i riro i te fa'aohiparau i te mata'i tamaiti (%{name}%) e ua fa'aore ia!"
  },


  "message.body.condition.resume": {
    "en_us": "The timer will resume!",
    "en_uk": "The timer will resume!",
    "de_de": "Der Timer wird fortgesetzt!",
    "de_at": "Der Timer wird fortgesetzt!",
    "de_ch": "Der Timer wird fortgesetzt!",
    "fr_fr": "Le minuteur va reprendre !",
    "fr_be": "Le minuteur va reprendre !",
    "fr_ch": "Le minuteur va reprendre !",
    "fr_ca": "Le minuteur va reprendre !",
    "it_it": "Il timer riprenderà!",
    "es_cl": "¡El temporizador se reanudará!",
    "es_ve": "¡El temporizador se reanudará!",
    "es_ar": "¡El temporizador se reanudará!",
    "es_mx": "¡El temporizador se reanudará!",
    "pt_pt": "O temporizador irá retomar!",
    "pt_br": "O temporizador irá retomar!",
    "is_is": "Tíminn mun halda áfram!",
    "el_gr": "Το χρονόμετρο θα συνεχίσει!",
    "ar_eg": "سيستأنف المؤقت!",
    "ar_sa": "سيستأنف المؤقت!",
    "ar_ae": "سيستأنف المؤقت!",
    "fi_fi": "Ajastin jatkaa!",
    "sv_se": "Timern kommer att återuppta!",
    "ru_ru": "Таймер возобновится!",
    "ru_ua": "Таймер возобновится!",
    "tr_tr": "Zamanlayıcı devam edecek!",
    "fa_ir": "تایمر ادامه خواهد یافت!",
    "ps_af": "ټایمر به دوام ومومي!",
    "en_pk": "The timer will resume!",
    "ur_pk": "ٹائمر دوبارہ شروع ہوگا!",
    "en_in": "The timer will resume!",
    "hi_in": "टाइमर फिर से शुरू होगा!",
    "si_lk": "ටයිමරය නැවත ආරම්භ වේ!",
    "ta_in": "டைமர் மீண்டும் தொடங்கும்!",
    "ta_lk": "டைமர் மீண்டும் தொடங்கும்!",
    "ne_np": "टाइमर पुनः सुरु हुनेछ!",
    "bn_bd": "টাইমার আবার শুরু হবে!",
    "en_au": "The timer will resume!",
    "th_th": "ตัวจับเวลาจะเริ่มต้นใหม่!",
    "vi_vn": "Bộ đếm thời gian sẽ tiếp tục!",
    "id_id": "Timer akan dilanjutkan!",
    "zh_cn": "计时器将恢复！",
    "en_sg": "The timer will resume!",
    "ms_sg": "Pemasa akan disambung semula!",
    "ta_sg": "டைமர் மீண்டும் தொடங்கும்!",
    "ja_jp": "タイマーが再開されます！",
    "ko_kr": "타이머가 재개됩니다!",
    "en_nz": "The timer will resume!",
    "mi_nz": "Ka tīmata anō te taima!",
    "to_to": "ʻE toe kamata ʻa e taimi!",
    "en_ki": "The timer will resume!",
    "gil_ki": "E na karikirake te taimi!",
    "ty_ty": "E hō'ē anō te taimi!"
  },

  "message.body.condition.paused": {
    "en_us": "The timer is paused!",
    "en_uk": "The timer is paused!",
    "de_de": "Der Timer ist pausiert!",
    "de_at": "Der Timer ist pausiert!",
    "de_ch": "Der Timer ist pausiert!",
    "fr_fr": "Le minuteur est en pause !",
    "fr_be": "Le minuteur est en pause !",
    "fr_ch": "Le minuteur est en pause !",
    "fr_ca": "Le minuteur est en pause !",
    "it_it": "Il timer è in pausa!",
    "es_cl": "¡El temporizador está pausado!",
    "es_ve": "¡El temporizador está pausado!",
    "es_ar": "¡El temporizador está pausado!",
    "es_mx": "¡El temporizador está pausado!",
    "pt_pt": "O temporizador está pausado!",
    "pt_br": "O temporizador está pausado!",
    "is_is": "Tíminn er í hlé!",
    "el_gr": "Το χρονόμετρο είναι σε παύση!",
    "ar_eg": "المؤقت متوقف مؤقتاً!",
    "ar_sa": "المؤقت متوقف مؤقتاً!",
    "ar_ae": "المؤقت متوقف مؤقتاً!",
    "fi_fi": "Ajastin on pysäytetty!",
    "sv_se": "Timern är pausad!",
    "ru_ru": "Таймер приостановлен!",
    "ru_ua": "Таймер приостановлен!",
    "tr_tr": "Zamanlayıcı duraklatıldı!",
    "fa_ir": "تایمر متوقف شده است!",
    "ps_af": "ټایمر ودرول شوی!",
    "en_pk": "The timer is paused!",
    "ur_pk": "ٹائمر رک گیا ہے!",
    "en_in": "The timer is paused!",
    "hi_in": "टाइमर रोका गया है!",
    "si_lk": "ටයිමරය නතර කර ඇත!",
    "ta_in": "டைமர் இடைநிறுத்தப்பட்டது!",
    "ta_lk": "டைமர் இடைநிறுத்தப்பட்டது!",
    "ne_np": "टाइमर रोकिएको छ!",
    "bn_bd": "টাইমার বন্ধ করা হয়েছে!",
    "en_au": "The timer is paused!",
    "th_th": "ตัวจับเวลาหยุดชั่วคราว!",
    "vi_vn": "Bộ đếm thời gian đã tạm dừng!",
    "id_id": "Timer dijeda!",
    "zh_cn": "计时器已暂停！",
    "en_sg": "The timer is paused!",
    "ms_sg": "Pemasa telah dijeda!",
    "ta_sg": "டைமர் இடைநிறுத்தப்பட்டது!",
    "ja_jp": "タイマーが一時停止されています！",
    "ko_kr": "타이머가 일시정지되었습니다!",
    "en_nz": "The timer is paused!",
    "mi_nz": "Kua whakatū te taima!",
    "to_to": "Kuo taʻofi ʻa e taimi!",
    "en_ki": "The timer is paused!",
    "gil_ki": "A toki te taimi!",
    "ty_ty": "Ua fa'are'are'a te taimi!"
  },

  "message.body.condition.expired": {
    "en_us": "The timer expired after %{time}% and has been paused",
    "en_uk": "The timer expired after %{time}% and has been paused",
    "de_de": "Der Timer ist nach %{time}% abgelaufen und wurde pausiert",
    "de_at": "Der Timer ist nach %{time}% abgelaufen und wurde pausiert",
    "de_ch": "Der Timer ist nach %{time}% abgelaufen und wurde pausiert",
    "fr_fr": "Le minuteur a expiré après %{time}% et a été mis en pause",
    "fr_be": "Le minuteur a expiré après %{time}% et a été mis en pause",
    "fr_ch": "Le minuteur a expiré après %{time}% et a été mis en pause",
    "fr_ca": "Le minuteur a expiré après %{time}% et a été mis en pause",
    "it_it": "Il timer è scaduto dopo %{time}% ed è stato messo in pausa",
    "es_cl": "El temporizador expiró después de %{time}% y ha sido pausado",
    "es_ve": "El temporizador expiró después de %{time}% y ha sido pausado",
    "es_ar": "El temporizador expiró después de %{time}% y ha sido pausado",
    "es_mx": "El temporizador expiró después de %{time}% y ha sido pausado",
    "pt_pt": "O temporizador expirou após %{time}% e foi pausado",
    "pt_br": "O temporizador expirou após %{time}% e foi pausado",
    "is_is": "Tíminn rann út eftir %{time}% og hefur verið settur í hlé",
    "el_gr": "Το χρονόμετρο έληξε μετά από %{time}% και έχει τεθεί σε παύση",
    "ar_eg": "انتهت صلاحية المؤقت بعد %{time}% وتم إيقافه مؤقتاً",
    "ar_sa": "انتهت صلاحية المؤقت بعد %{time}% وتم إيقافه مؤقتاً",
    "ar_ae": "انتهت صلاحية المؤقت بعد %{time}% وتم إيقافه مؤقتاً",
    "fi_fi": "Ajastin päättyi %{time}% kuluttua ja on pysäytetty",
    "sv_se": "Timern gick ut efter %{time}% och har pausats",
    "ru_ru": "Таймер истек через %{time}% и был приостановлен",
    "ru_ua": "Таймер истек через %{time}% и был приостановлен",
    "tr_tr": "Zamanlayıcı %{time}% sonra sona erdi ve duraklatıldı",
    "fa_ir": "تایمر پس از %{time}% منقضی شد و متوقف شده است",
    "ps_af": "ټایمر د %{time}% وروسته ختم شو او ودرول شو",
    "en_pk": "The timer expired after %{time}% and has been paused",
    "ur_pk": "ٹائمر %{time}% کے بعد ختم ہو گیا اور رک گیا ہے",
    "en_in": "The timer expired after %{time}% and has been paused",
    "hi_in": "टाइमर %{time}% के बाद समाप्त हो गया और रोक दिया गया",
    "si_lk": "ටයිමරය %{time}% පසු අවසන් වී නතර කර ඇත",
    "ta_in": "டைமர் %{time}% க்குப் பிறகு முடிந்து இடைநிறுத்தப்பட்டது",
    "ta_lk": "டைமர் %{time}% க்குப் பிறகு முடிந்து இடைநிறுத்தப்பட்டது",
    "ne_np": "टाइमर %{time}% पछि समाप्त भयो र रोकिएको छ",
    "bn_bd": "টাইমার %{time}% পরে শেষ হয়েছে এবং বন্ধ করা হয়েছে",
    "en_au": "The timer expired after %{time}% and has been paused",
    "th_th": "ตัวจับเวลาหมดอายุหลังจาก %{time}% และถูกหยุดชั่วคราว",
    "vi_vn": "Bộ đếm thời gian đã hết hạn sau %{time}% và đã bị tạm dừng",
    "id_id": "Timer berakhir setelah %{time}% dan telah dijeda",
    "zh_cn": "计时器在 %{time}% 后到期并已暂停",
    "en_sg": "The timer expired after %{time}% and has been paused",
    "ms_sg": "Pemasa tamat tempoh selepas %{time}% dan telah dijeda",
    "ta_sg": "டைமர் %{time}% க்குப் பிறகு முடிந்து இடைநிறுத்தப்பட்டது",
    "ja_jp": "タイマーは %{time}% 後に期限切れになり、一時停止されました",
    "ko_kr": "타이머가 %{time}% 후 만료되어 일시정지되었습니다",
    "en_nz": "The timer expired after %{time}% and has been paused",
    "mi_nz": "I pau te taima i muri i %{time}% ā kua whakatū",
    "to_to": "Naʻe ʻosi ʻa e taimi hili %{time}% pea kuo taʻofi",
    "en_ki": "The timer expired after %{time}% and has been paused",
    "gil_ki": "E a oti te taimi iai %{time}% ao a toki",
    "ty_ty": "Ua pau te taimi i muri i %{time}% e ua fa'are'are'a"
  },

  "message.body.challenge_start": {
    "en_us": "The Challenge starts now!",
    "en_uk": "The Challenge starts now!",
    "de_de": "Die Herausforderung beginnt jetzt!",
    "de_at": "Die Herausforderung beginnt jetzt!",
    "de_ch": "Die Herausforderung beginnt jetzt!",
    "fr_fr": "Le défi commence maintenant !",
    "fr_be": "Le défi commence maintenant !",
    "fr_ch": "Le défi commence maintenant !",
    "fr_ca": "Le défi commence maintenant !",
    "it_it": "La sfida inizia ora!",
    "es_cl": "¡El desafío comienza ahora!",
    "es_ve": "¡El desafío comienza ahora!",
    "es_ar": "¡El desafío comienza ahora!",
    "es_mx": "¡El desafío comienza ahora!",
    "pt_pt": "O desafio começa agora!",
    "pt_br": "O desafio começa agora!",
    "is_is": "Áskorunin hefst núna!",
    "el_gr": "Η πρόκληση ξεκινά τώρα!",
    "ar_eg": "التحدي يبدأ الآن!",
    "ar_sa": "التحدي يبدأ الآن!",
    "ar_ae": "التحدي يبدأ الآن!",
    "fi_fi": "Haaste alkaa nyt!",
    "sv_se": "Utmaningen börjar nu!",
    "ru_ru": "Вызов начинается сейчас!",
    "ru_ua": "Вызов начинается сейчас!",
    "tr_tr": "Meydan okuma şimdi başlıyor!",
    "fa_ir": "چالش اکنون شروع می‌شود!",
    "ps_af": "ننګونه اوس پیل کیږي!",
    "en_pk": "The Challenge starts now!",
    "ur_pk": "چیلنج اب شروع ہوتا ہے!",
    "en_in": "The Challenge starts now!",
    "hi_in": "चुनौती अब शुरू होती है!",
    "si_lk": "අභියෝගය දැන් ආරම්භ වේ!",
    "ta_in": "சவால் இப்போது தொடங்குகிறது!",
    "ta_lk": "சவால் இப்போது தொடங்குகிறது!",
    "ne_np": "चुनौती अब सुरु हुन्छ!",
    "bn_bd": "চ্যালেঞ্জ এখন শুরু হচ্ছে!",
    "en_au": "The Challenge starts now!",
    "th_th": "ความท้าทายเริ่มต้นแล้ว!",
    "vi_vn": "Thử thách bắt đầu ngay bây giờ!",
    "id_id": "Tantangan dimulai sekarang!",
    "zh_cn": "挑战现在开始！",
    "en_sg": "The Challenge starts now!",
    "ms_sg": "Cabaran bermula sekarang!",
    "ta_sg": "சவால் இப்போது தொடங்குகிறது!",
    "ja_jp": "チャレンジが今始まります！",
    "ko_kr": "도전이 지금 시작됩니다!",
    "en_nz": "The Challenge starts now!",
    "mi_nz": "Ka tīmata te Wero ināianei!",
    "to_to": "ʻOku kamata ʻa e fakamalohiʻanga ni!",
    "en_ki": "The Challenge starts now!",
    "gil_ki": "E a tiku te challenge ngkai!",
    "ty_ty": "Ua tīmata nei te fa'aora!"
  },

  "message.body.challenge_start.goal.entity_prefix": {
    "en_us": "Defeat the ",
    "en_uk": "Defeat the ",
    "de_de": "Besiege den ",
    "de_at": "Besiege den ",
    "de_ch": "Besiege den ",
    "fr_fr": "Vaincre le ",
    "fr_be": "Vaincre le ",
    "fr_ch": "Vaincre le ",
    "fr_ca": "Vaincre le ",
    "it_it": "Sconfiggi il ",
    "es_cl": "Derrota al ",
    "es_ve": "Derrota al ",
    "es_ar": "Derrota al ",
    "es_mx": "Derrota al ",
    "pt_pt": "Derrotar o ",
    "pt_br": "Derrotar o ",
    "is_is": "Sigra ",
    "el_gr": "Νίκησε τον ",
    "ar_eg": "اهزم ",
    "ar_sa": "اهزم ",
    "ar_ae": "اهزم ",
    "fi_fi": "Voita ",
    "sv_se": "Besegra ",
    "ru_ru": "Победить ",
    "ru_ua": "Победить ",
    "tr_tr": "Yenin ",
    "fa_ir": "شکست دادن ",
    "ps_af": "ماتې کړه ",
    "en_pk": "Defeat the ",
    "ur_pk": "شکست دو ",
    "en_in": "Defeat the ",
    "hi_in": "हराओ ",
    "si_lk": "පරාජය කරන්න ",
    "ta_in": "தோற்கடிக்கவும் ",
    "ta_lk": "தோற்கடிக்கவும் ",
    "ne_np": "हराउनुहोस् ",
    "bn_bd": "পরাজিত করুন ",
    "en_au": "Defeat the ",
    "th_th": "เอาชนะ ",
    "vi_vn": "Đánh bại ",
    "id_id": "Kalahkan ",
    "zh_cn": "击败 ",
    "en_sg": "Defeat the ",
    "ms_sg": "Kalahkan ",
    "ta_sg": "தோற்கடிக்கவும் ",
    "ja_jp": "倒せ ",
    "ko_kr": "물리쳐라 ",
    "en_nz": "Defeat the ",
    "mi_nz": "Wikitoria a ",
    "to_to": "Tāmate'i ",
    "en_ki": "Defeat the ",
    "gil_ki": "Kamatea ",
    "ty_ty": "Fa'aoti i "
  },


  "message.body.challenge_start.goal.event": {
    "en_us": "Complete the following event: ",
    "en_uk": "Complete the following event: ",
    "de_de": "Erfülle das folgende Ereignis: ",
    "de_at": "Erfülle das folgende Ereignis: ",
    "de_ch": "Erfülle das folgende Ereignis: ",
    "fr_fr": "Complétez l'événement suivant : ",
    "fr_be": "Complétez l'événement suivant : ",
    "fr_ch": "Complétez l'événement suivant : ",
    "fr_ca": "Complétez l'événement suivant : ",
    "it_it": "Completa il seguente evento: ",
    "es_cl": "Completa el siguiente evento: ",
    "es_ve": "Completa el siguiente evento: ",
    "es_ar": "Completá el siguiente evento: ",
    "es_mx": "Completa el siguiente evento: ",
    "pt_pt": "Completa o seguinte evento: ",
    "pt_br": "Complete o seguinte evento: ",
    "is_is": "Ljúktu við eftirfarandi atburð: ",
    "el_gr": "Ολοκληρώστε το ακόλουθο γεγονός: ",
    "ar_eg": "أكمل الحدث التالي: ",
    "ar_sa": "أكمل الحدث التالي: ",
    "ar_ae": "أكمل الحدث التالي: ",
    "fi_fi": "Suorita seuraava tapahtuma: ",
    "sv_se": "Slutför följande händelse: ",
    "ru_ru": "Завершите следующее событие: ",
    "ru_ua": "Завершите следующее событие: ",
    "tr_tr": "Aşağıdaki olayı tamamlayın: ",
    "fa_ir": "رویداد زیر را تکمیل کنید: ",
    "ps_af": "دغه پیښه بشپړه کړئ: ",
    "en_pk": "Complete the following event: ",
    "ur_pk": "مندرجہ ذیل واقعہ مکمل کریں: ",
    "en_in": "Complete the following event: ",
    "hi_in": "निम्नलिखित घटना को पूरा करें: ",
    "si_lk": "පහත සිදුවීම සම්පූර්ණ කරන්න: ",
    "ta_in": "பின்வரும் நிகழ்வை முடிக்கவும்: ",
    "ta_lk": "பின்வரும் நிகழ்வை முடிக்கவும்: ",
    "ne_np": "निम्नलिखित घटना पूरा गर्नुहोस्: ",
    "bn_bd": "নিম্নলিখিত ঘটনা সম্পূর্ণ করুন: ",
    "en_au": "Complete the following event: ",
    "th_th": "ทำเหตุการณ์ต่อไปนี้ให้เสร็จสิ้น: ",
    "vi_vn": "Hoàn thành sự kiện sau: ",
    "id_id": "Selesaikan acara berikut: ",
    "zh_cn": "完成以下事件：",
    "en_sg": "Complete the following event: ",
    "ms_sg": "Lengkapkan acara berikut: ",
    "ta_sg": "பின்வரும் நிகழ்வை முடிக்கவும்: ",
    "ja_jp": "次のイベントを完了してください：",
    "ko_kr": "다음 이벤트를 완료하세요: ",
    "en_nz": "Complete the following event: ",
    "mi_nz": "Whakaotia te takunetanga nei: ",
    "to_to": "Fakaʻosi ʻae meʻa ni: ",
    "en_ki": "Complete the following event: ",
    "gil_ki": "Kabongana te maneaba aei: ",
    "ty_ty": "Faaoti i teie taime: "
  },

  "message.body.challenge_start.goal.event.time": {
    "en_us": "Survive: ",
    "en_uk": "Survive: ",
    "de_de": "Überlebe: ",
    "de_at": "Überlebe: ",
    "de_ch": "Überlebe: ",
    "fr_fr": "Survivez : ",
    "fr_be": "Survivez : ",
    "fr_ch": "Survivez : ",
    "fr_ca": "Survivez : ",
    "it_it": "Sopravvivi: ",
    "es_cl": "Sobrevive: ",
    "es_ve": "Sobrevive: ",
    "es_ar": "Sobreviví: ",
    "es_mx": "Sobrevive: ",
    "pt_pt": "Sobrevive: ",
    "pt_br": "Sobreviva: ",
    "is_is": "Lifðu af: ",
    "el_gr": "Επιβίωσε: ",
    "ar_eg": "انج: ",
    "ar_sa": "انج: ",
    "ar_ae": "انج: ",
    "fi_fi": "Selviä: ",
    "sv_se": "Överlev: ",
    "ru_ru": "Выжить: ",
    "ru_ua": "Выжить: ",
    "tr_tr": "Hayatta kal: ",
    "fa_ir": "زنده بمان: ",
    "ps_af": "ژوندي پاتې شه: ",
    "en_pk": "Survive: ",
    "ur_pk": "زندہ رہیں: ",
    "en_in": "Survive: ",
    "hi_in": "जीवित रहें: ",
    "si_lk": "දිවි ගලවන්න: ",
    "ta_in": "உயிர் பிழைக்கவும்: ",
    "ta_lk": "உயிர் பிழைக்கவும்: ",
    "ne_np": "बाँच्नुहोस्: ",
    "bn_bd": "বেঁচে থাকুন: ",
    "en_au": "Survive: ",
    "th_th": "รอดชีวิต: ",
    "vi_vn": "Sống sót: ",
    "id_id": "Bertahan hidup: ",
    "zh_cn": "生存：",
    "en_sg": "Survive: ",
    "ms_sg": "Bertahan hidup: ",
    "ta_sg": "உயிர் பிழைக்கவும்: ",
    "ja_jp": "生き残る：",
    "ko_kr": "생존: ",
    "en_nz": "Survive: ",
    "mi_nz": "Whakangāwari: ",
    "to_to": "Moʻui: ",
    "en_ki": "Survive: ",
    "gil_ki": "Mauri: ",
    "ty_ty": "Taoto: "
  },

  "message.body.challenge_end.bad": {
    "en_us": "The challenge is over. Time invested: %{time}%. Thanks for playing.",
    "en_uk": "The challenge is over. Time invested: %{time}%. Thanks for playing.",
    "de_de": "Die Herausforderung ist vorbei. Investierte Zeit: %{time}%. Danke fürs Spielen.",
    "de_at": "Die Herausforderung ist vorbei. Investierte Zeit: %{time}%. Danke fürs Spielen.",
    "de_ch": "Die Herausforderung ist vorbei. Investierte Zeit: %{time}%. Danke fürs Spielen.",
    "fr_fr": "Le défi est terminé. Temps investi : %{time}%. Merci d'avoir joué.",
    "fr_be": "Le défi est terminé. Temps investi : %{time}%. Merci d'avoir joué.",
    "fr_ch": "Le défi est terminé. Temps investi : %{time}%. Merci d'avoir joué.",
    "fr_ca": "Le défi est terminé. Temps investi : %{time}%. Merci d'avoir joué.",
    "it_it": "La sfida è finita. Tempo investito: %{time}%. Grazie per aver giocato.",
    "es_cl": "El desafío terminó. Tiempo invertido: %{time}%. Gracias por jugar.",
    "es_ve": "El desafío terminó. Tiempo invertido: %{time}%. Gracias por jugar.",
    "es_ar": "El desafío terminó. Tiempo invertido: %{time}%. Gracias por jugar.",
    "es_mx": "El desafío terminó. Tiempo invertido: %{time}%. Gracias por jugar.",
    "pt_pt": "O desafio acabou. Tempo investido: %{time}%. Obrigado por jogares.",
    "pt_br": "O desafio acabou. Tempo investido: %{time}%. Obrigado por jogar.",
    "is_is": "Áskoruninni er lokið. Tími sem varið var: %{time}%. Takk fyrir að spila.",
    "el_gr": "Η πρόκληση τελείωσε. Χρόνος που επενδύθηκε: %{time}%. Ευχαριστούμε που παίξατε.",
    "ar_eg": "انتهى التحدي. الوقت المستثمر: %{time}%. شكرًا لك على اللعب.",
    "ar_sa": "انتهى التحدي. الوقت المستثمر: %{time}%. شكرًا لك على اللعب.",
    "ar_ae": "انتهى التحدي. الوقت المستثمر: %{time}%. شكرًا لك على اللعب.",
    "fi_fi": "Haaste on ohi. Sijoitettu aika: %{time}%. Kiitos pelaamisesta.",
    "sv_se": "Utmaningen är över. Investerad tid: %{time}%. Tack för att du spelade.",
    "ru_ru": "Вызов окончен. Затраченное время: %{time}%. Спасибо за игру.",
    "ru_ua": "Вызов окончен. Затраченное время: %{time}%. Спасибо за игру.",
    "tr_tr": "Meydan okuma bitti. Yatırılan zaman: %{time}%. Oynadığınız için teşekkürler.",
    "fa_ir": "چالش به پایان رسید. زمان سرمایه‌گذاری شده: %{time}%. متشکرم که بازی کردید.",
    "ps_af": "ننګونه پای ته ورسیده. پانګونه شوی وخت: %{time}%. د لوبې کولو څخه مننه.",
    "en_pk": "The challenge is over. Time invested: %{time}%. Thanks for playing.",
    "ur_pk": "چیلنج ختم ہو گیا۔ لگایا گیا وقت: %{time}%۔ کھیلنے کا شکریہ۔",
    "en_in": "The challenge is over. Time invested: %{time}%. Thanks for playing.",
    "hi_in": "चुनौती खत्म हो गई। लगाया गया समय: %{time}%। खेलने के लिए धन्यवाद।",
    "si_lk": "අභියෝගය අවසන්. ආයෝජනය කළ කාලය: %{time}%. ක්‍රීඩා කිරීම ගැන ස්තූතියි.",
    "ta_in": "சவால் முடிந்தது. முதலீடு செய்த நேரம்: %{time}%. விளையாடியதற்கு நன்றி.",
    "ta_lk": "சவால் முடிந்தது. முதலீடு செய்த நேரம்: %{time}%. விளையாடியதற்கு நன்றி.",
    "ne_np": "चुनौती सकियो। लगानी गरिएको समय: %{time}%। खेलेकोमा धन्यवाद।",
    "bn_bd": "চ্যালেঞ্জ শেষ। বিনিয়োগকৃত সময়: %{time}%। খেলার জন্য ধন্যবাদ।",
    "en_au": "The challenge is over. Time invested: %{time}%. Thanks for playing.",
    "th_th": "ความท้าทายจบลงแล้ว เวลาที่ลงทุน: %{time}% ขอบคุณที่เล่น",
    "vi_vn": "Thử thách đã kết thúc. Thời gian đầu tư: %{time}%. Cảm ơn bạn đã chơi.",
    "id_id": "Tantangan telah berakhir. Waktu yang diinvestasikan: %{time}%. Terima kasih telah bermain.",
    "zh_cn": "挑战结束了。投入时间：%{time}%。感谢您的游戏。",
    "en_sg": "The challenge is over. Time invested: %{time}%. Thanks for playing.",
    "ms_sg": "Cabaran telah berakhir. Masa yang dilaburkan: %{time}%. Terima kasih kerana bermain.",
    "ta_sg": "சவால் முடிந்தது. முதலீடு செய்த நேரம்: %{time}%. விளையாடியதற்கு நன்றி.",
    "ja_jp": "チャレンジは終了しました。投資した時間：%{time}%。プレイしていただきありがとうございました。",
    "ko_kr": "도전이 끝났습니다. 투자한 시간: %{time}%. 플레이해 주셔서 감사합니다.",
    "en_nz": "The challenge is over. Time invested: %{time}%. Thanks for playing.",
    "mi_nz": "Kua mutu te whakataki. Taima whakangao: %{time}%. Ngā mihi mō tō kēmu.",
    "to_to": "Kuo ngata ʻa e faingamālie. Taimi naʻe fakaʻaongaʻi: %{time}%. Malo ʻae taʻalo.",
    "en_ki": "The challenge is over. Time invested: %{time}%. Thanks for playing.",
    "gil_ki": "A tia te kauaman. Taim n tia: %{time}%. Kam rabwa n kanganga.",
    "ty_ty": "Ua pau te tauihaa. Taime i faaohipaahia: %{time}%. Maururu no te pupu."
  },

  "message.body.challenge_end.time.good": {
    "en_us": "You did it! You persevered through the whole time and reached your goal!",
    "en_uk": "You did it! You persevered through the whole time and reached your goal!",
    "de_de": "Du hast es geschafft! Du hast die ganze Zeit durchgehalten und dein Ziel erreicht!",
    "de_at": "Du hast es geschafft! Du hast die ganze Zeit durchgehalten und dein Ziel erreicht!",
    "de_ch": "Du hast es geschafft! Du hast die ganze Zeit durchgehalten und dein Ziel erreicht!",
    "fr_fr": "Vous avez réussi ! Vous avez persévéré tout le temps et atteint votre objectif !",
    "fr_be": "Vous avez réussi ! Vous avez persévéré tout le temps et atteint votre objectif !",
    "fr_ch": "Vous avez réussi ! Vous avez persévéré tout le temps et atteint votre objectif !",
    "fr_ca": "Vous avez réussi ! Vous avez persévéré tout le temps et atteint votre objectif !",
    "it_it": "Ce l'hai fatta! Hai resistito per tutto il tempo e hai raggiunto il tuo obiettivo!",
    "es_cl": "¡Lo lograste! ¡Perseveraste todo el tiempo y alcanzaste tu meta!",
    "es_ve": "¡Lo lograste! ¡Perseveraste todo el tiempo y alcanzaste tu meta!",
    "es_ar": "¡Lo lograste! ¡Perseveraste todo el tiempo y alcanzaste tu meta!",
    "es_mx": "¡Lo lograste! ¡Perseveraste todo el tiempo y alcanzaste tu meta!",
    "pt_pt": "Conseguiste! Perseveraste durante todo o tempo e alcançaste o teu objetivo!",
    "pt_br": "Você conseguiu! Você perseverou durante todo o tempo e alcançou seu objetivo!",
    "is_is": "Þú náðir því! Þú hélst í gegn allan tímann og náðir markmiðinu þínu!",
    "el_gr": "Τα κατάφερες! Επέμεινες όλο τον καιρό και έφτασες στο στόχο σου!",
    "ar_eg": "لقد فعلتها! لقد ثابرت طوال الوقت ووصلت إلى هدفك!",
    "ar_sa": "لقد فعلتها! لقد ثابرت طوال الوقت ووصلت إلى هدفك!",
    "ar_ae": "لقد فعلتها! لقد ثابرت طوال الوقت ووصلت إلى هدفك!",
    "fi_fi": "Teit sen! Kestit koko ajan ja saavutit tavoitteesi!",
    "sv_se": "Du klarade det! Du höll ut hela tiden och nådde ditt mål!",
    "ru_ru": "Вы справились! Вы продержались всё время и достигли своей цели!",
    "ru_ua": "Вы справились! Вы продержались всё время и достигли своей цели!",
    "tr_tr": "Başardınız! Tüm süre boyunce sebat ettiniz ve hedefinize ulaştınız!",
    "fa_ir": "شما موفق شدید! تمام مدت استقامت کردید و به هدفتان رسیدید!",
    "ps_af": "تاسو یې وکړ! تاسو د ټول وخت لپاره دوام ورکړ او خپلې موخې ته ورسیدئ!",
    "en_pk": "You did it! You persevered through the whole time and reached your goal!",
    "ur_pk": "آپ نے کر دکھایا! آپ نے پورے وقت ثابت قدمی دکھائی اور اپنے مقصد تک پہنچے!",
    "en_in": "You did it! You persevered through the whole time and reached your goal!",
    "hi_in": "आपने कर दिया! आपने पूरे समय धैर्य रखा और अपने लक्ष्य तक पहुंच गए!",
    "si_lk": "ඔබ එය කළා! ඔබ මුළු කාලයම නොපසුබට වී ඔබේ ඉලක්කය කරා ළඟා වුණා!",
    "ta_in": "நீங்கள் செய்து முடித்தீர்கள்! நீங்கள் முழு நேரமும் விடாமுயற்சியுடன் இருந்து உங்கள் இலக்கை அடைந்தீர்கள்!",
    "ta_lk": "நீங்கள் செய்து முடித்தீர்கள்! நீங்கள் முழு நேரமும் விடாமுயற்சியுடன் இருந்து உங்கள் இலக்கை அடைந்தீர்கள்!",
    "ne_np": "तपाईंले गर्नुभयो! तपाईंले सम्पूर्ण समय धैर्य राख्नुभयो र आफ्नो लक्ष्य पुग्नुभयो!",
    "bn_bd": "আপনি এটি করেছেন! আপনি সম্পূর্ণ সময় ধৈর্য ধরেছেন এবং আপনার লক্ষ্যে পৌঁছেছেন!",
    "en_au": "You did it! You persevered through the whole time and reached your goal!",
    "th_th": "คุณทำได้! คุณอดทนตลอดเวลาและไปถึงเป้าหมายของคุณ!",
    "vi_vn": "Bạn đã làm được! Bạn đã kiên trì suốt thời gian và đạt được mục tiêu!",
    "id_id": "Anda berhasil! Anda bertahan sepanjang waktu dan mencapai tujuan Anda!",
    "zh_cn": "你做到了！你坚持了整个过程并达到了你的目标！",
    "en_sg": "You did it! You persevered through the whole time and reached your goal!",
    "ms_sg": "Anda berjaya! Anda bertahan sepanjang masa dan mencapai matlamat anda!",
    "ta_sg": "நீங்கள் செய்து முடித்தீர்கள்! நீங்கள் முழு நேரமும் விடாமுயற்சியுடன் இருந்து உங்கள் இலக்கை அடைந்தீர்கள்!",
    "ja_jp": "やりました！最後まで頑張り抜いて目標を達成しました！",
    "ko_kr": "해냈습니다! 끝까지 견디고 목표를 달성했습니다!",
    "en_nz": "You did it! You persevered through the whole time and reached your goal!",
    "mi_nz": "I oti i a koe! I u koe ki roto i nga wa katoa me te eke ki tou whakataki!",
    "to_to": "Naʻa ke fai! Naʻa ke faʻa manavasiʻi ʻi he kuonga kotoa mo ke maʻu ho siosifa!",
    "en_ki": "You did it! You persevered through the whole time and reached your goal!",
    "gil_ki": "A tia e ngkoe! A manei ngkoe n aki ma a tia te aim-am!",
    "ty_ty": "Ua roa oe! Ua faaro oe i te taime atoa e ua tae oe i to e faaohipaahia!"
  },

  "message.body.challenge_end.time.bad": {
    "en_us": "The challenge is over because you went out of time. Thanks for playing.",
    "en_uk": "The challenge is over because you went out of time. Thanks for playing.",
    "de_de": "Die Herausforderung ist vorbei, weil dir die Zeit ausgegangen ist. Danke fürs Spielen.",
    "de_at": "Die Herausforderung ist vorbei, weil dir die Zeit ausgegangen ist. Danke fürs Spielen.",
    "de_ch": "Die Herausforderung ist vorbei, weil dir die Zeit ausgegangen ist. Danke fürs Spielen.",
    "fr_fr": "Le défi est terminé car vous avez manqué de temps. Merci d'avoir joué.",
    "fr_be": "Le défi est terminé car vous avez manqué de temps. Merci d'avoir joué.",
    "fr_ch": "Le défi est terminé car vous avez manqué de temps. Merci d'avoir joué.",
    "fr_ca": "Le défi est terminé car vous avez manqué de temps. Merci d'avoir joué.",
    "it_it": "La sfida è finita perché hai finito il tempo. Grazie per aver giocato.",
    "es_cl": "El desafío terminó porque se te acabó el tiempo. Gracias por jugar.",
    "es_ve": "El desafío terminó porque se te acabó el tiempo. Gracias por jugar.",
    "es_ar": "El desafío terminó porque se te acabó el tiempo. Gracias por jugar.",
    "es_mx": "El desafío terminó porque se te acabó el tiempo. Gracias por jugar.",
    "pt_pt": "O desafio acabou porque ficaste sem tempo. Obrigado por jogares.",
    "pt_br": "O desafio acabou porque você ficou sem tempo. Obrigado por jogar.",
    "is_is": "Áskoruninni er lokið vegna þess að þú fékkst ekki tíma. Takk fyrir að spila.",
    "el_gr": "Η πρόκληση τελείωσε γιατί σου τελείωσε ο χρόνος. Ευχαριστούμε που παίξατε.",
    "ar_eg": "انتهى التحدي لأن وقتك نفد. شكراً لك على اللعب.",
    "ar_sa": "انتهى التحدي لأن وقتك نفد. شكراً لك على اللعب.",
    "ar_ae": "انتهى التحدي لأن وقتك نفد. شكراً لك على اللعب.",
    "fi_fi": "Haaste on ohi, koska aikasi loppui. Kiitos pelaamisesta.",
    "sv_se": "Utmaningen är över eftersom du fick slut på tid. Tack för att du spelade.",
    "ru_ru": "Испытание окончено, потому что у вас закончилось время. Спасибо за игру.",
    "ru_ua": "Испытание окончено, потому что у вас закончилось время. Спасибо за игру.",
    "tr_tr": "Zamanınız dolduğu için meydan okuma sona erdi. Oynadığınız için teşekkürler.",
    "fa_ir": "چالش به پایان رسید چون وقتتان تمام شد. از بازی کردن متشکریم.",
    "ps_af": "ننګونه پای ته ورسیده ځکه چې ستاسو وخت پای ته ورسید. د لوبې کولو څخه مننه.",
    "en_pk": "The challenge is over because you went out of time. Thanks for playing.",
    "ur_pk": "چیلنج ختم ہو گیا کیونکہ آپ کا وقت ختم ہو گیا۔ کھیلنے کا شکریہ۔",
    "en_in": "The challenge is over because you went out of time. Thanks for playing.",
    "hi_in": "चुनौती समाप्त हो गई क्योंकि आपका समय समाप्त हो गया। खेलने के लिए धन्यवाद।",
    "si_lk": "ඔබගේ කාලය අවසන් වී ඇති නිසා අභියෝගය අවසන් වී ඇත. ක්‍රීඩා කිරීම ගැන ස්තූතියි.",
    "ta_in": "நேரம் முடிந்துவிட்டதால் சவால் முடிந்துவிட்டது. விளையாடியதற்கு நன்றி.",
    "ta_lk": "நேரம் முடிந்துவிட்டதால் சவால் முடிந்துவிட்டது. விளையாடியதற்கு நன்றி.",
    "ne_np": "चुनौती समाप्त भयो किनभने तपाईंको समय सकियो। खेल्नुभएकोमा धन्यवाद।",
    "bn_bd": "চ্যালেঞ্জ শেষ হয়ে গেছে কারণ আপনার সময় শেষ হয়ে গেছে। খেলার জন্য ধন্যবাদ।",
    "en_au": "The challenge is over because you went out of time. Thanks for playing.",
    "th_th": "ความท้าทายสิ้นสุดแล้วเพราะคุณหมดเวลา ขอบคุณที่เล่น",
    "vi_vn": "Thử thách đã kết thúc vì bạn đã hết thời gian. Cảm ơn bạn đã chơi.",
    "id_id": "Tantangan berakhir karena waktu Anda habis. Terima kasih telah bermain.",
    "zh_cn": "挑战结束了，因为你的时间用完了。感谢你的游戏。",
    "en_sg": "The challenge is over because you went out of time. Thanks for playing.",
    "ms_sg": "Cabaran telah berakhir kerana masa anda habis. Terima kasih kerana bermain.",
    "ta_sg": "நேரம் முடிந்துவிட்டதால் சவால் முடிந்துவிட்டது. விளையாடியதற்கு நன்றி.",
    "ja_jp": "時間切れのためチャレンジは終了しました。プレイしていただき、ありがとうございました。",
    "ko_kr": "시간이 다 되어서 도전이 끝났습니다. 플레이해 주셔서 감사합니다.",
    "en_nz": "The challenge is over because you went out of time. Thanks for playing.",
    "mi_nz": "Kua mutu te wero nā te mea kua pau tō taima. Ngā mihi mō te takaro.",
    "to_to": "Kuo 'osi 'a e faingamalie he kuo 'osi ho'o taimi. Mālō 'e ta'alo.",
    "en_ki": "The challenge is over because you went out of time. Thanks for playing.",
    "gil_ki": "A bon te kaubokota ngkana a tiku am taimi. Ko rabwa am taekina.",
    "ty_ty": "Ua mea te fenua no te mea ua pau to taimi. Mauruuru no te hamani."
  },

  "message.body.challenge_end.raid": {
    "en_us": "You did it! You prevented the Raid and protected the village like a hero. Good Game!",
    "en_uk": "You did it! You prevented the Raid and protected the village like a hero. Good Game!",
    "de_de": "Du hast es geschafft! Du hast den Überfall verhindert und das Dorf wie ein Held beschützt. Gut gespielt!",
    "de_at": "Du hast es geschafft! Du hast den Überfall verhindert und das Dorf wie ein Held beschützt. Gut gespielt!",
    "de_ch": "Du hast es geschafft! Du hast den Überfall verhindert und das Dorf wie ein Held beschützt. Gut gespielt!",
    "fr_fr": "Vous l'avez fait ! Vous avez empêché le raid et protégé le village comme un héros. Bien joué !",
    "fr_be": "Vous l'avez fait ! Vous avez empêché le raid et protégé le village comme un héros. Bien joué !",
    "fr_ch": "Vous l'avez fait ! Vous avez empêché le raid et protégé le village comme un héros. Bien joué !",
    "fr_ca": "Vous l'avez fait ! Vous avez empêché le raid et protégé le village comme un héros. Bien joué !",
    "it_it": "Ce l'hai fatta! Hai impedito il raid e protetto il villaggio come un eroe. Bella partita!",
    "es_cl": "¡Lo lograste! Evitaste la incursión y protegiste el pueblo como un héroe. ¡Buen juego!",
    "es_ve": "¡Lo lograste! Evitaste la incursión y protegiste el pueblo como un héroe. ¡Buen juego!",
    "es_ar": "¡Lo lograste! Evitaste la incursión y protegiste el pueblo como un héroe. ¡Buen juego!",
    "es_mx": "¡Lo lograste! Evitaste la incursión y protegiste el pueblo como un héroe. ¡Buen juego!",
    "pt_pt": "Conseguiste! Impediste o ataque e protegeste a aldeia como um herói. Bem jogado!",
    "pt_br": "Você conseguiu! Você impediu o ataque e protegeu a aldeia como um herói. Bom jogo!",
    "is_is": "Þér tókst það! Þú hindraðir innrásina og verndaðir þorpið eins og hetja. Vel gert!",
    "el_gr": "Τα κατάφερες! Απέτρεψες την επιδρομή και προστάτευσες το χωριό σαν ήρωας. Καλό παιχνίδι!",
    "ar_eg": "لقد فعلتها! منعت الغارة وحميت القرية كبطل. لعبة جيدة!",
    "ar_sa": "لقد فعلتها! منعت الغارة وحميت القرية كبطل. لعبة جيدة!",
    "ar_ae": "لقد فعلتها! منعت الغارة وحميت القرية كبطل. لعبة جيدة!",
    "fi_fi": "Teit sen! Estit ryöstön ja suojelit kylää kuin sankari. Hyvä peli!",
    "sv_se": "Du gjorde det! Du förhindrade raiden och skyddade byn som en hjälte. Bra spelat!",
    "ru_ru": "Вы сделали это! Вы предотвратили рейд и защитили деревню как герой. Хорошая игра!",
    "ru_ua": "Вы сделали это! Вы предотвратили рейд и защитили деревню как герой. Хорошая игра!",
    "tr_tr": "Başardınız! Baskını önlediniz ve köyü bir kahraman gibi korudunuz. İyi oyun!",
    "fa_ir": "شما موفق شدید! حمله را جلوگیری کردید و روستا را مثل یک قهرمان محافظت کردید. بازی خوب!",
    "ps_af": "تاسو یې وکړه! تاسو د برید مخنیوی وکړ او د کلي څخه د یوه اتل په څیر ساتنه وکړه. ښه لوبه!",
    "en_pk": "You did it! You prevented the Raid and protected the village like a hero. Good Game!",
    "ur_pk": "آپ نے کر دیا! آپ نے حملے کو روکا اور گاؤں کو ایک ہیرو کی طرح محفوظ رکھا۔ اچھا کھیل!",
    "en_in": "You did it! You prevented the Raid and protected the village like a hero. Good Game!",
    "hi_in": "आपने कर दिया! आपने हमले को रोका और गांव को एक नायक की तरह सुरक्षित रखा। अच्छा खेल!",
    "si_lk": "ඔබ එය කළා! ඔබ ප්‍රහාරය වැළැක්වූ අතර ගමේ වීරයෙකු ලෙස ආරක්ෂා කළා. හොඳ ක්‍රීඩාවක්!",
    "ta_in": "நீங்கள் செய்தீர்கள்! நீங்கள் தாக்குதலை தடுத்து கிராமத்தை ஒரு வீரனைப் போல பாதுகாத்தீர்கள். நல்ல விளையாட்டு!",
    "ta_lk": "நீங்கள் செய்தீர்கள்! நீங்கள் தாக்குதலை தடுத்து கிராமத்தை ஒரு வீரனைப் போல பாதுகாத்தீர்கள். நல்ல விளையாட்டு!",
    "ne_np": "तपाईंले गर्नुभयो! तपाईंले आक्रमण रोक्नुभयो र गाउँलाई एक नायक जस्तै सुरक्षित राख्नुभयो। राम्रो खेल!",
    "bn_bd": "আপনি করেছেন! আপনি আক্রমণ ঠেকিয়েছেন এবং গ্রামকে একজন বীরের মতো রক্ষা করেছেন। ভাল খেলা!",
    "en_au": "You did it! You prevented the Raid and protected the village like a hero. Good Game!",
    "th_th": "คุณทำได้! คุณป้องกันการบุกรุกและปกป้องหมู่บ้านเหมือนวีรบุรุษ เกมดี!",
    "vi_vn": "Bạn đã làm được! Bạn đã ngăn chặn cuộc tấn công và bảo vệ ngôi làng như một anh hùng. Trò chơi hay!",
    "id_id": "Anda berhasil! Anda mencegah serangan dan melindungi desa seperti pahlawan. Permainan bagus!",
    "zh_cn": "你做到了！你阻止了袭击并像英雄一样保护了村庄。好游戏！",
    "en_sg": "You did it! You prevented the Raid and protected the village like a hero. Good Game!",
    "ms_sg": "Anda berjaya! Anda menghalang serangan dan melindungi kampung seperti wira. Permainan bagus!",
    "ta_sg": "நீங்கள் செய்தீர்கள்! நீங்கள் தாக்குதலை தடுத்து கிராமத்தை ஒரு வீரனைப் போல பாதுகாத்தீர்கள். நல்ல விளையாட்டு!",
    "ja_jp": "やったね！襲撃を防ぎ、英雄のように村を守りました。グッドゲーム！",
    "ko_kr": "해냈습니다! 습격을 막고 영웅처럼 마을을 보호했습니다. 좋은 게임!",
    "en_nz": "You did it! You prevented the Raid and protected the village like a hero. Good Game!",
    "mi_nz": "I mahia e koe! I aukati koe i te kōkiri me te tiaki i te pā me he toa. Kēmu pai!",
    "to_to": "Na'e fai 'e koe! Na'e tā'ofi 'e koe 'a e tauaki pea fakamālohi 'a e kolo hange ha tangata mālohi. Ta'alo lelei!",
    "en_ki": "You did it! You prevented the Raid and protected the village like a hero. Good Game!",
    "gil_ki": "A kona! A kamara te buaka ao a kamatoa te abwamwakoro me te mwane. Taeka lelei!",
    "ty_ty": "Ua rave oe! Ua taero oe i te taata'i e ua faaora i te nuna'a e ti'a ai te toa. Hamani maita'i!"
  },


  "message.body.challenge_end.player": {
    "en_us": "You guys really did it. Choosing and achieving such a stupid goal that %{name}% had to die for. I'm at a loss for words.",
    "en_uk": "You lot really did it. Choosing and achieving such a daft goal that %{name}% had to die for. I'm at a loss for words.",
    "de_de": "Ihr habt es wirklich geschafft. Ein so dummes Ziel zu wählen und zu erreichen, dass %{name}% dafür sterben musste. Mir fehlen die Worte.",
    "de_at": "Ihr habts wirklich geschafft. So ein blödes Ziel zu wählen und zu erreichen, dass %{name}% dafür sterben musste. Mir fehlen die Worte.",
    "de_ch": "Ihr hend es würklich gschafft. So es dumms Ziel z'wähle und z'erreiche, dass %{name}% defür het müesse sterbe. Mir fehled d'Wort.",
    "fr_fr": "Vous l'avez vraiment fait. Choisir et atteindre un objectif si stupide que %{name}% a dû mourir pour cela. Je suis sans voix.",
    "fr_be": "Vous l'avez vraiment fait. Choisir et atteindre un objectif si bête que %{name}% a dû mourir pour cela. Je suis sans voix.",
    "fr_ch": "Vous l'avez vraiment fait. Choisir et atteindre un objectif si bête que %{name}% a dû mourir pour cela. Je suis sans voix.",
    "fr_ca": "Vous l'avez vraiment fait. Choisir et atteindre un objectif si stupide que %{name}% a dû mourir pour ça. Je suis sans mots.",
    "it_it": "Ce l'avete davvero fatta. Scegliere e raggiungere un obiettivo così stupido che %{name}% doveva morire per questo. Non ho parole.",
    "es_cl": "Realmente lo lograron. Elegir y lograr una meta tan estúpida que %{name}% tuvo que morir por ello. Me quedo sin palabras.",
    "es_ve": "De verdad lo lograron. Elegir y lograr una meta tan estúpida que %{name}% tuvo que morir por eso. Me quedo sin palabras.",
    "es_ar": "Realmente lo lograron. Elegir y lograr una meta tan estúpida que %{name}% tuvo que morir por eso. Me quedo sin palabras.",
    "es_mx": "De verdad lo lograron. Elegir y lograr una meta tan estúpida que %{name}% tuvo que morir por eso. Me quedo sin palabras.",
    "pt_pt": "Vocês conseguiram mesmo. Escolher e alcançar um objetivo tão estúpido que %{name}% teve de morrer por isso. Não tenho palavras.",
    "pt_br": "Vocês realmente conseguiram. Escolher e alcançar um objetivo tão estúpido que %{name}% teve que morrer por isso. Estou sem palavras.",
    "is_is": "Þið náðuð þessu virkilega. Að velja og ná svona heimskulegu markmiði að %{name}% þurfti að deyja fyrir það. Mér vantar orð.",
    "el_gr": "Το καταφέρατε πραγματικά. Να επιλέξετε και να πετύχετε έναν τόσο χαζό στόχο που ο/η %{name}% έπρεπε να πεθάνει για αυτό. Μου λείπουν τα λόγια.",
    "ar_eg": "لقد فعلتموها حقاً. اختيار وتحقيق هدف غبي لدرجة أن %{name}% كان عليه أن يموت من أجله. لا أجد كلمات.",
    "ar_sa": "لقد فعلتموها حقاً. اختيار وتحقيق هدف غبي لدرجة أن %{name}% كان عليه أن يموت من أجله. لا أجد كلمات.",
    "ar_ae": "لقد فعلتموها حقاً. اختيار وتحقيق هدف غبي لدرجة أن %{name}% كان عليه أن يموت من أجله. لا أجد كلمات.",
    "fi_fi": "Te todella teitte sen. Valita ja saavuttaa niin typerä tavoite, että %{name}% joutui kuolemaan sen takia. Minulta loppuvat sanat.",
    "sv_se": "Ni gjorde det verkligen. Att välja och uppnå ett så dumt mål att %{name}% behövde dö för det. Jag saknar ord.",
    "ru_ru": "Вы действительно это сделали. Выбрать и достичь такой глупой цели, что %{name}% пришлось умереть за это. У меня нет слов.",
    "ru_ua": "Вы действительно это сделали. Выбрать и достичь такой глупой цели, что %{name}% пришлось умереть за это. У меня нет слов.",
    "tr_tr": "Gerçekten başardınız. %{name}%'nin bunun için ölmesi gereken kadar aptal bir hedef seçip başarmak. Kelimelerim yok.",
    "fa_ir": "واقعاً این کار را کردید. انتخاب و دستیابی به هدفی اینقدر احمقانه که %{name}% مجبور بود برای آن بمیرد. کلمات برایم کم آورده.",
    "ps_af": "تاسو واقعیا دا وکړل. دومره بې وقوفه هدف غوره کول او ورته رسیدل چې %{name}% ورته مړ شو. زه د خبرو نه پاتې شوم.",
    "en_pk": "You people really did it. Choosing and achieving such a foolish goal that %{name}% had to die for. I'm at a loss for words.",
    "ur_pk": "آپ لوگوں نے واقعی یہ کر دیا۔ اتنا بے وقوفانہ مقصد منتخب کرنا اور حاصل کرنا کہ %{name}% کو اس کے لیے مرنا پڑا۔ میرے پاس الفاظ نہیں ہیں۔",
    "en_in": "You fellows really did it. Choosing and achieving such a foolish goal that %{name}% had to die for. I'm at a loss for words.",
    "hi_in": "आपने वाकई यह कर दिया। इतना बेवकूफाना लक्ष्य चुनना और हासिल करना कि %{name}% को इसके लिए मरना पड़ा। मेरे पास शब्द नहीं हैं।",
    "si_lk": "ඔබ ඇත්තටම එය කළා. %{name}% ඒ සඳහා මැරෙන්නට සිදුවන තරම් මෝඩ ඉලක්කයක් තෝරා ලබා ගන්නවා. මට වචන නැහැ.",
    "ta_in": "நீங்கள் உண்மையில் இதை செய்தீர்கள். %{name}% இதற்காக இறக்க வேண்டிய அளவுக்கு முட்டாள்தனமான இலக்கை தேர்ந்தெடுத்து அடைந்தீர்கள். எனக்கு வார்த்தைகள் இல்லை.",
    "ta_lk": "நீங்கள் உண்மையில் இதை செய்தீர்கள். %{name}% இதற்காக இறக்க வேண்டிய அளவுக்கு முட்டாள்தனமான இலக்கை தேர்ந்தெடுத்து அடைந்தீர்கள். எனக்கு வார்த்தைகள் இல்லை.",
    "ne_np": "तपाईंहरूले साँच्चै यो गर्नुभयो। %{name}% यसको लागि मर्नुपर्ने जति मूर्खतापूर्ण लक्ष्य छनोट गरेर हासिल गर्नुभयो। मसँग शब्दहरू छैनन्।",
    "bn_bd": "আপনারা সত্যিই এটা করেছেন। এমন একটা বোকামি লক্ষ্য বেছে নিয়ে অর্জন করা যে %{name}% এর জন্য মরতে হলো। আমার কথা নেই।",
    "en_au": "You blokes really did it. Choosing and achieving such a stupid goal that %{name}% had to die for. I'm at a loss for words.",
    "th_th": "พวกคุณทำได้จริงๆ การเลือกและบรรลุเป้าหมายที่โง่เง่าจนทำให้ %{name}% ต้องตายเพื่อมัน ฉันไม่มีคำพูด",
    "vi_vn": "Các bạn thực sự đã làm được. Chọn và đạt được một mục tiêu ngu ngốc đến mức %{name}% phải chết vì nó. Tôi không có từ nào để nói.",
    "id_id": "Kalian benar-benar melakukannya. Memilih dan mencapai tujuan yang bodoh sampai %{name}% harus mati karenanya. Saya tidak punya kata-kata.",
    "zh_cn": "你们真的做到了。选择并实现如此愚蠢的目标，以至于%{name}%必须为此而死。我无话可说。",
    "en_sg": "You guys really did it. Choosing and achieving such a foolish goal that %{name}% had to die for. I'm at a loss for words.",
    "ms_sg": "Kamu semua benar-benar berjaya. Memilih dan mencapai matlamat yang bodoh sehingga %{name}% terpaksa mati untuknya. Saya tiada kata-kata.",
    "ta_sg": "நீங்கள் உண்மையில் இதை செய்தீர்கள். %{name}% இதற்காக இறக்க வேண்டிய அளவுக்கு முட்டாள்தனமான இலக்கை தேர்ந்தெடுத்து அடைந்தீர்கள். எனக்கு வார்த்தைகள் இல்லை.",
    "ja_jp": "君たちは本当にやったな。%{name}%がそのために死ななければならないほど愚かな目標を選んで達成するなんて。言葉がないよ。",
    "ko_kr": "정말로 해냈구나. %{name}%가 그것 때문에 죽어야 할 정도로 바보같은 목표를 선택하고 달성하다니. 할 말이 없다.",
    "en_nz": "You guys really did it. Choosing and achieving such a daft goal that %{name}% had to die for. I'm at a loss for words.",
    "mi_nz": "Kua oti rawa i a koutou. Ko te whiringa me te whakatutuki i tetahi whaainga poauau hoki a %{name}% i mate ai. Kare au kupu.",
    "to_to": "Mou fai mo'oni ia. Fili mo ikuna ha sini vale ko ia na'e pekia ai 'a %{name}% ke mate. 'Oku 'ikai ha'aku ngaahi lea.",
    "en_ki": "You people really did it. Choosing and achieving such a foolish goal that %{name}% had to die for. I'm at a loss for words.",
    "gil_ki": "Kam a rawa ngke. Te katei ao te kona te tangiria are %{name}% e a mate iai. I aki bon te taeka.",
    "ty_ty": "Ua ravehi roa outou. Te hiria'a e te fa'aea'a i te faufa'a parau 'ore e %{name}% e mate ai. 'Aita vau parau."
  },

  "message.body.challenge_end.entity_0": {
    "en_us": "You did it! You defeated the ",
    "en_uk": "You did it! You defeated the ",
    "de_de": "Du hast es geschafft! Du hast den/die/das ",
    "de_at": "Du hast es geschafft! Du hast den/die/das ",
    "de_ch": "Du hesch es gschafft! Du hesch de/d'/s ",
    "fr_fr": "Vous l'avez fait ! Vous avez vaincu le/la ",
    "fr_be": "Vous l'avez fait ! Vous avez vaincu le/la ",
    "fr_ch": "Vous l'avez fait ! Vous avez vaincu le/la ",
    "fr_ca": "Vous l'avez fait ! Vous avez vaincu le/la ",
    "it_it": "Ce l'hai fatta! Hai sconfitto il/la ",
    "es_cl": "¡Lo lograste! Derrotaste al/a la ",
    "es_ve": "¡Lo lograste! Derrotaste al/a la ",
    "es_ar": "¡Lo lograste! Derrotaste al/a la ",
    "es_mx": "¡Lo lograste! Derrotaste al/a la ",
    "pt_pt": "Conseguiste! Derrotaste o/a ",
    "pt_br": "Você conseguiu! Você derrotou o/a ",
    "is_is": "Þú náðir því! Þú sigraðir ",
    "el_gr": "Το κατάφερες! Νίκησες τον/την/το ",
    "ar_eg": "لقد فعلتها! لقد هزمت ",
    "ar_sa": "لقد فعلتها! لقد هزمت ",
    "ar_ae": "لقد فعلتها! لقد هزمت ",
    "fi_fi": "Teit sen! Voitit ",
    "sv_se": "Du gjorde det! Du besegrade ",
    "ru_ru": "Ты сделал это! Ты победил ",
    "ru_ua": "Ты сделал это! Ты победил ",
    "tr_tr": "Başardın! Şunu yendin: ",
    "fa_ir": "انجامش دادی! شکست دادی ",
    "ps_af": "تاسو دا وکړل! تاسو ماته ورکړه ",
    "en_pk": "You did it! You defeated the ",
    "ur_pk": "آپ نے یہ کر دیا! آپ نے شکست دی ",
    "en_in": "You did it! You defeated the ",
    "hi_in": "आपने यह कर दिया! आपने हराया ",
    "si_lk": "ඔබ එය කළා! ඔබ පරාජය කළා ",
    "ta_in": "நீங்கள் இதை செய்தீர்கள்! நீங்கள் தோற்கடித்தீர்கள் ",
    "ta_lk": "நீங்கள் இதை செய்தீர்கள்! நீங்கள் தோற்கடித்தீர்கள் ",
    "ne_np": "तपाईंले यो गर्नुभयो! तपाईंले हराउनुभयो ",
    "bn_bd": "আপনি এটা করেছেন! আপনি পরাজিত করেছেন ",
    "en_au": "You did it! You defeated the ",
    "th_th": "คุณทำได้! คุณเอาชนะ ",
    "vi_vn": "Bạn đã làm được! Bạn đã đánh bại ",
    "id_id": "Anda berhasil! Anda mengalahkan ",
    "zh_cn": "你做到了！你击败了",
    "en_sg": "You did it! You defeated the ",
    "ms_sg": "Anda berjaya! Anda mengalahkan ",
    "ta_sg": "நீங்கள் இதை செய்தீர்கள்! நீங்கள் தோற்கடித்தீர்கள் ",
    "ja_jp": "やったな！君は倒した ",
    "ko_kr": "해냈다! 당신이 물리쳤다 ",
    "en_nz": "You did it! You defeated the ",
    "mi_nz": "I rawa i a koe! I tawhiti koe i a ",
    "to_to": "Na'e ke fai! Na'e ke ikuna 'a e ",
    "en_ki": "You did it! You defeated the ",
    "gil_ki": "A rawa ngkoe! A katei ngkoe te ",
    "ty_ty": "Ua ravehi oe! Ua faapohe oe i te "
  },

  "message.body.challenge_end.entity_1": {
    "en_us": " in an epic battle! Good Game!",
    "en_uk": " in an epic battle! Good Game!",
    "de_de": " in einem epischen Kampf besiegt! Gut gespielt!",
    "de_at": " in einem epischen Kampf besiegt! Gut gespielt!",
    "de_ch": " in emne epische Champ besiegt! Guet gspielt!",
    "fr_fr": " dans une bataille épique ! Bien joué !",
    "fr_be": " dans une bataille épique ! Bien joué !",
    "fr_ch": " dans une bataille épique ! Bien joué !",
    "fr_ca": " dans une bataille épique ! Bien joué !",
    "it_it": " in una battaglia epica! Bella partita!",
    "es_cl": " en una batalla épica! ¡Buen juego!",
    "es_ve": " en una batalla épica! ¡Buen juego!",
    "es_ar": " en una batalla épica! ¡Buen juego!",
    "es_mx": " en una batalla épica! ¡Buen juego!",
    "pt_pt": " numa batalha épica! Bom jogo!",
    "pt_br": " numa batalha épica! Bom jogo!",
    "is_is": " í einhverjum frábærum bardaga! Gott leikið!",
    "el_gr": " σε μια επική μάχη! Καλό παιχνίδι!",
    "ar_eg": " في معركة ملحمية! لعبة جيدة!",
    "ar_sa": " في معركة ملحمية! لعبة جيدة!",
    "ar_ae": " في معركة ملحمية! لعبة جيدة!",
    "fi_fi": " eeppisessä taistelussa! Hyvä peli!",
    "sv_se": " i en episk strid! Bra spelat!",
    "ru_ru": " в эпической битве! Хорошая игра!",
    "ru_ua": " в эпической битве! Хорошая игра!",
    "tr_tr": " epik bir savaşta! İyi oyun!",
    "fa_ir": " در یک نبرد حماسی! بازی خوب!",
    "ps_af": " په یوه پیاوړې جګړه کې! ښه لوبه!",
    "en_pk": " in an epic battle! Good Game!",
    "ur_pk": " ایک عظیم جنگ میں! اچھا کھیل!",
    "en_in": " in an epic battle! Good Game!",
    "hi_in": " एक महाकाव्य युद्ध में! अच्छा खेल!",
    "si_lk": " මහත් යුද්ධයකදී! හොඳ ක්‍රීඩාව!",
    "ta_in": " ஒரு பெரிய போரில்! நல்ல ஆட்டம்!",
    "ta_lk": " ஒரு பெரிய போரில்! நல்ல ஆட்டம்!",
    "ne_np": " एक महाकाव्य युद्धमा! राम्रो खेल!",
    "bn_bd": " একটি মহাকাব্যিক যুদ্ধে! ভাল খেলা!",
    "en_au": " in an epic battle! Good Game!",
    "th_th": " ในการต่อสู้ที่ยิ่งใหญ่! เกมดี!",
    "vi_vn": " trong một trận chiến hoành tráng! Chơi hay!",
    "id_id": " dalam pertempuran epik! Permainan bagus!",
    "zh_cn": " 在史诗般的战斗中！好游戏！",
    "en_sg": " in an epic battle! Good Game!",
    "ms_sg": " dalam pertempuran epik! Permainan bagus!",
    "ta_sg": " ஒரு பெரிய போரில்! நல்ல ஆட்டம்!",
    "ja_jp": " を壮大な戦いで！いいゲームだった！",
    "ko_kr": " 을/를 장대한 전투에서! 좋은 게임!",
    "en_nz": " in an epic battle! Good Game!",
    "mi_nz": " i roto i tetahi whawhai nui! He keemu pai!",
    "to_to": " 'i ha tau lahi! Lelei 'a e ta'alo!",
    "en_ki": " in an epic battle! Good Game!",
    "gil_ki": " ni kan reirei te taeka! Bon te kemen!",
    "ty_ty": " i roto i te tauto nui! Maitai te hamani!"
  },


  // Title
  "message.title.condition.expired": {
    "en_us": "Timer expired",
    "en_uk": "Timer expired",
    "de_de": "Timer abgelaufen",
    "de_at": "Timer abgelaufen",
    "de_ch": "Timer abgloffe",
    "fr_fr": "Minuteur expiré",
    "fr_be": "Minuteur expiré",
    "fr_ch": "Minuteur expiré",
    "fr_ca": "Minuteur expiré",
    "it_it": "Timer scaduto",
    "es_cl": "Temporizador expirado",
    "es_ve": "Temporizador expirado",
    "es_ar": "Temporizador expirado",
    "es_mx": "Temporizador expirado",
    "pt_pt": "Temporizador expirado",
    "pt_br": "Temporizador expirado",
    "is_is": "Tíminn rann út",
    "el_gr": "Ο χρονόμετρο έληξε",
    "ar_eg": "انتهت صلاحية المؤقت",
    "ar_sa": "انتهت صلاحية المؤقت",
    "ar_ae": "انتهت صلاحية المؤقت",
    "fi_fi": "Ajastin vanhentunut",
    "sv_se": "Timer har gått ut",
    "ru_ru": "Таймер истек",
    "ru_ua": "Таймер истек",
    "tr_tr": "Zamanlayıcı süresi doldu",
    "fa_ir": "زمان‌سنج منقضی شد",
    "ps_af": "وخت پای ته ورسېد",
    "en_pk": "Timer expired",
    "ur_pk": "ٹائمر ختم ہو گیا",
    "en_in": "Timer expired",
    "hi_in": "टाइमर समाप्त हो गया",
    "si_lk": "ටයිමරය කල් ඉකුත් විය",
    "ta_in": "டைமர் காலாவதியானது",
    "ta_lk": "டைமர் காலாவதியானது",
    "ne_np": "टाइमर समाप्त भयो",
    "bn_bd": "টাইমার শেষ হয়েছে",
    "en_au": "Timer expired",
    "th_th": "ตัวจับเวลาหมดอายุ",
    "vi_vn": "Bộ đếm thời gian đã hết hạn",
    "id_id": "Timer habis",
    "zh_cn": "计时器已过期",
    "en_sg": "Timer expired",
    "ms_sg": "Pemasa tamat tempoh",
    "ta_sg": "டைமர் காலாவதியானது",
    "ja_jp": "タイマーが期限切れ",
    "ko_kr": "타이머 만료",
    "en_nz": "Timer expired",
    "mi_nz": "Kua pau te taima",
    "to_to": "Kuo 'osi 'a e taima",
    "en_ki": "Timer expired",
    "gil_ki": "Taima a kaku",
    "ty_ty": "Ua pau te taima"
  },

  "message.title.challenge_end.good": {
    "en_us": "§aYou Won!",
    "en_uk": "§aYou Won!",
    "de_de": "§aDu hast gewonnen!",
    "de_at": "§aDu hast gewonnen!",
    "de_ch": "§aDu hast gewonnen!",
    "fr_fr": "§aVous avez gagné !",
    "fr_be": "§aVous avez gagné !",
    "fr_ch": "§aVous avez gagné !",
    "fr_ca": "§aVous avez gagné !",
    "it_it": "§aHai vinto!",
    "es_cl": "§a¡Ganaste!",
    "es_ve": "§a¡Ganaste!",
    "es_ar": "§a¡Ganaste!",
    "es_mx": "§a¡Ganaste!",
    "pt_pt": "§aGanhaste!",
    "pt_br": "§aVocê Venceu!",
    "is_is": "§aÞú vannst!",
    "el_gr": "§aΚέρδισες!",
    "ar_eg": "§aلقد فزت!",
    "ar_sa": "§aلقد فزت!",
    "ar_ae": "§aلقد فزت!",
    "fi_fi": "§aSait voiton!",
    "sv_se": "§aDu vann!",
    "ru_ru": "§aВы победили!",
    "ru_ua": "§aВи перемогли!",
    "tr_tr": "§aKazandın!",
    "fa_ir": "§aشما بردید!",
    "ps_af": "§aتاسو وګټئ!",
    "en_pk": "§aYou Won!",
    "ur_pk": "§aآپ جیت گئے!",
    "en_in": "§aYou Won!",
    "hi_in": "§aआप जीत गए!",
    "si_lk": "§aඔබ දිනුවා!",
    "ta_in": "§aநீங்கள் வென்றீர்கள்!",
    "ta_lk": "§aநீங்கள் வென்றீர்கள்!",
    "ne_np": "§aतपाईंले जित्नुभयो!",
    "bn_bd": "§aআপনি জিতেছেন!",
    "en_au": "§aYou Won!",
    "th_th": "§aคุณชนะ!",
    "vi_vn": "§aBạn đã thắng!",
    "id_id": "§aKamu Menang!",
    "zh_cn": "§a你赢了！",
    "en_sg": "§aYou Won!",
    "ms_sg": "§aAnda Menang!",
    "ta_sg": "§aநீங்கள் வென்றீர்கள்!",
    "ja_jp": "§a勝利！",
    "ko_kr": "§a당신이 이겼습니다!",
    "en_nz": "§aYou Won!",
    "mi_nz": "§aKua toa koe!",
    "to_to": "§aNaʻá ke ikuna!",
    "en_ki": "§aYou Won!",
    "gil_ki": "§aTi aobaba!"
  },

  "message.title.challenge_end.bad": {
    "en_us": "§4Challenge has ended!",
    "en_uk": "§4Challenge has ended!",
    "de_de": "§4Herausforderung beendet!",
    "de_at": "§4Herausforderung beendet!",
    "de_ch": "§4Herausforderung beendet!",
    "fr_fr": "§4Le défi est terminé !",
    "fr_be": "§4Le défi est terminé !",
    "fr_ch": "§4Le défi est terminé !",
    "fr_ca": "§4Le défi est terminé !",
    "it_it": "§4La sfida è terminata!",
    "es_cl": "§4¡El desafío ha terminado!",
    "es_ve": "§4¡El desafío ha terminado!",
    "es_ar": "§4¡El desafío ha terminado!",
    "es_mx": "§4¡El desafío ha terminado!",
    "pt_pt": "§4O desafio terminou!",
    "pt_br": "§4O desafio acabou!",
    "is_is": "§4Áskorun lokið!",
    "el_gr": "§4Η πρόκληση έληξε!",
    "ar_eg": "§4انتهى التحدي!",
    "ar_sa": "§4انتهى التحدي!",
    "ar_ae": "§4انتهى التحدي!",
    "fi_fi": "§4Haaste on päättynyt!",
    "sv_se": "§4Utmaningen har avslutats!",
    "ru_ru": "§4Испытание завершено!",
    "ru_ua": "§4Випробування завершено!",
    "tr_tr": "§4Meydan okuma sona erdi!",
    "fa_ir": "§4چالش به پایان رسید!",
    "ps_af": "§4چلنج پای ته ورسید!",
    "en_pk": "§4Challenge has ended!",
    "ur_pk": "§4چیلنج ختم ہو گیا ہے!",
    "en_in": "§4Challenge has ended!",
    "hi_in": "§4चुनौती समाप्त हो गई है!",
    "si_lk": "§4අභියෝගය අවසන් විය!",
    "ta_in": "§4சவால் முடிந்துவிட்டது!",
    "ta_lk": "§4சவால் முடிந்துவிட்டது!",
    "ne_np": "§4चुनौती समाप्त भयो!",
    "bn_bd": "§4চ্যালেঞ্জ শেষ হয়েছে!",
    "en_au": "§4Challenge has ended!",
    "th_th": "§4การท้าทายสิ้นสุดลงแล้ว!",
    "vi_vn": "§4Thử thách đã kết thúc!",
    "id_id": "§4Tantangan telah berakhir!",
    "zh_cn": "§4挑战已结束！",
    "en_sg": "§4Challenge has ended!",
    "ms_sg": "§4Cabaran telah berakhir!",
    "ta_sg": "§4சவால் முடிந்துவிட்டது!",
    "ja_jp": "§4チャレンジ終了！",
    "ko_kr": "§4도전이 종료되었습니다!",
    "en_nz": "§4Challenge has ended!",
    "mi_nz": "§4Kua mutu te wero!",
    "to_to": "§4Kuo ʻosi e feʻauhi!",
    "en_ki": "§4Challenge has ended!",
    "gil_ki": "§4E aera te katamatoa!"
  },

  /*------------------------
      Relative Time
    -------------------------*/

  "menu.relative_time.years": {
    "en_us": "%{time}% years",
    "en_uk": "%{time}% years",
    "de_de": "%{time}% Jahre",
    "de_at": "%{time}% Jahre",
    "de_ch": "%{time}% Jahre",
    "fr_fr": "%{time}% ans",
    "fr_be": "%{time}% ans",
    "fr_ch": "%{time}% ans",
    "fr_ca": "%{time}% ans",
    "it_it": "%{time}% anni",
    "es_cl": "%{time}% años",
    "es_ve": "%{time}% años",
    "es_ar": "%{time}% años",
    "es_mx": "%{time}% años",
    "pt_pt": "%{time}% anos",
    "pt_br": "%{time}% anos",
    "is_is": "%{time}% ár",
    "el_gr": "%{time}% χρόνια",
    "ar_eg": "%{time}% سنوات",
    "ar_sa": "%{time}% سنوات",
    "ar_ae": "%{time}% سنوات",
    "fi_fi": "%{time}% vuotta",
    "sv_se": "%{time}% år",
    "ru_ru": "%{time}% лет",
    "ru_ua": "%{time}% років",
    "tr_tr": "%{time}% yıl",
    "fa_ir": "%{time}% سال",
    "ps_af": "%{time}% کاله",
    "en_pk": "%{time}% years",
    "ur_pk": "%{time}% سال",
    "en_in": "%{time}% years",
    "hi_in": "%{time}% वर्ष",
    "si_lk": "%{time}% වසර",
    "ta_in": "%{time}% ஆண்டுகள்",
    "ta_lk": "%{time}% ஆண்டுகள்",
    "ne_np": "%{time}% वर्ष",
    "bn_bd": "%{time}% বছর",
    "en_au": "%{time}% years",
    "th_th": "%{time}% ปี",
    "vi_vn": "%{time}% năm",
    "id_id": "%{time}% tahun",
    "zh_cn": "%{time}% 年",
    "en_sg": "%{time}% years",
    "ms_sg": "%{time}% tahun",
    "ta_sg": "%{time}% ஆண்டுகள்",
    "ja_jp": "%{time}% 年",
    "ko_kr": "%{time}%년",
    "en_nz": "%{time}% years",
    "mi_nz": "%{time}% tau",
    "to_to": "%{time}% taʻu",
    "en_ki": "%{time}% years",
    "gil_ki": "%{time}% ririki"
  },

  "menu.relative_time.year": {
    "en_us": "about a year",
    "en_uk": "about a year",
    "de_de": "etwa ein Jahr",
    "de_at": "etwa ein Jahr",
    "de_ch": "etwa ein Jahr",
    "fr_fr": "environ un an",
    "fr_be": "environ un an",
    "fr_ch": "environ un an",
    "fr_ca": "environ un an",
    "it_it": "circa un anno",
    "es_cl": "alrededor de un año",
    "es_ve": "alrededor de un año",
    "es_ar": "alrededor de un año",
    "es_mx": "alrededor de un año",
    "pt_pt": "cerca de um ano",
    "pt_br": "cerca de um ano",
    "is_is": "um það bil ár",
    "el_gr": "περίπου ένας χρόνος",
    "ar_eg": "حوالي سنة",
    "ar_sa": "حوالي سنة",
    "ar_ae": "حوالي سنة",
    "fi_fi": "noin vuosi",
    "sv_se": "ungefär ett år",
    "ru_ru": "около года",
    "ru_ua": "близько року",
    "tr_tr": "yaklaşık bir yıl",
    "fa_ir": "حدود یک سال",
    "ps_af": "نږدې یو کال",
    "en_pk": "about a year",
    "ur_pk": "تقریباً ایک سال",
    "en_in": "about a year",
    "hi_in": "लगभग एक साल",
    "si_lk": "අවුරුද්දක් පමණ",
    "ta_in": "சுமார் ஒரு வருடம்",
    "ta_lk": "சுமார் ஒரு வருடம்",
    "ne_np": "लगभग एक वर्ष",
    "bn_bd": "প্রায় এক বছর",
    "en_au": "about a year",
    "th_th": "ประมาณหนึ่งปี",
    "vi_vn": "khoảng một năm",
    "id_id": "sekitar setahun",
    "zh_cn": "大约一年",
    "en_sg": "about a year",
    "ms_sg": "kira-kira setahun",
    "ta_sg": "சுமார் ஒரு வருடம்",
    "ja_jp": "約1年",
    "ko_kr": "약 1년",
    "en_nz": "about a year",
    "mi_nz": "tata ki te tau kotahi",
    "to_to": "ofio hifo ha taʻu ʻe taha",
    "en_ki": "about a year",
    "gil_ki": "aki te ririki teuana"
  },

  "menu.relative_time.months": {
    "en_us": "%{time}% months",
    "en_uk": "%{time}% months",
    "de_de": "%{time}% Monate",
    "de_at": "%{time}% Monate",
    "de_ch": "%{time}% Monate",
    "fr_fr": "%{time}% mois",
    "fr_be": "%{time}% mois",
    "fr_ch": "%{time}% mois",
    "fr_ca": "%{time}% mois",
    "it_it": "%{time}% mesi",
    "es_cl": "%{time}% meses",
    "es_ve": "%{time}% meses",
    "es_ar": "%{time}% meses",
    "es_mx": "%{time}% meses",
    "pt_pt": "%{time}% meses",
    "pt_br": "%{time}% meses",
    "is_is": "%{time}% mánuðir",
    "el_gr": "%{time}% μήνες",
    "ar_eg": "%{time}% أشهر",
    "ar_sa": "%{time}% أشهر",
    "ar_ae": "%{time}% أشهر",
    "fi_fi": "%{time}% kuukautta",
    "sv_se": "%{time}% månader",
    "ru_ru": "%{time}% месяцев",
    "ru_ua": "%{time}% місяців",
    "tr_tr": "%{time}% ay",
    "fa_ir": "%{time}% ماه",
    "ps_af": "%{time}% میاشتې",
    "en_pk": "%{time}% months",
    "ur_pk": "%{time}% مہینے",
    "en_in": "%{time}% months",
    "hi_in": "%{time}% महीने",
    "si_lk": "%{time}% මාස",
    "ta_in": "%{time}% மாதங்கள்",
    "ta_lk": "%{time}% மாதங்கள்",
    "ne_np": "%{time}% महिना",
    "bn_bd": "%{time}% মাস",
    "en_au": "%{time}% months",
    "th_th": "%{time}% เดือน",
    "vi_vn": "%{time}% tháng",
    "id_id": "%{time}% bulan",
    "zh_cn": "%{time}% 个月",
    "en_sg": "%{time}% months",
    "ms_sg": "%{time}% bulan",
    "ta_sg": "%{time}% மாதங்கள்",
    "ja_jp": "%{time}% ヶ月",
    "ko_kr": "%{time}%개월",
    "en_nz": "%{time}% months",
    "mi_nz": "%{time}% marama",
    "to_to": "%{time}% māhina",
    "en_ki": "%{time}% months",
    "gil_ki": "%{time}% namanna"
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
    "en": "Day time",
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

  "menu.settings.label.timer": {
    "en": "Timer",
  },

  "menu.settings.label.your_self": {
    "en": "Your self",
  },

  "menu.settings.label.multiplayer": {
    "en": "Multiplayer",
  },

  "menu.settings.label.features": {
    "en": "Features",
  },

  "menu.settings.label.features": {
    "en": "Features",
  },

  "menu.settings.label.advanced_settings": {
    "en": "Advanced settings",
  },

  "menu.settings.label.version": {
    "en": "Version",
  },

  /*------------------------
    Menu - settings_type_info
  -------------------------*/

  "menu.settings.type_info.title": {
    "en": "Information",
  },

  "menu.settings.type_info.description": {
    "en": "Your %{current_counting_type}% is not paused! If you change now the mode to %{new_counting_type}% it will be paused!",
  },

  "menu.settings.type_info.change_to": {
    "en": "Change to %{new_counting_type}%",
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

  "menu.settings.lang.label.current": {
    "en": "Current language",
  },

  "menu.settings.lang.label.recommendation": {
    "en": "Recommended languages",
  },

  "menu.settings.lang.recommendation": {
    "en": "based on your timezone",
  },

  "menu.settings.lang.show_all": {
    "en": "More languages",
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

  "menu.settings.actionbar.design.preview.description": {
    "en": "Here is a preview of your selected design. It shows all possible variables at once:",
  },

  "menu.settings.actionbar.design.preview.label.screen_saver": {
    "en": "Screen saver"
  },
  "menu.settings.actionbar.design.preview.label.ui": {
    "en": "In the menu"
  },
  "menu.settings.actionbar.design.preview.label.normal": {
    "en": "Normal"
  },
  "menu.settings.actionbar.design.preview.label.paused": {
    "en": "Paused"
  },
  "menu.settings.actionbar.design.preview.label.finished": {
    "en": "Finished (CM only)"
  },
  "menu.settings.actionbar.design.preview.label.day_time": {
    "en": "Day-Time"
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
    str = entry["en_us"];
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

  // Bestimme Zeitzonen-basierte Sprachen
  let timezone_langs = timezone_list.find(zone => zone.utc === save_data[0].utc)?.lang;
  if (!Array.isArray(timezone_langs)) timezone_langs = [];

  const selected = supportedLangs.find(l => l.id === lang);
  const enLang = supportedLangs.find(l => l.id === "en_us");

  // Erstelle Pools: alle außer Englisch und (wenn nicht im Setup) außer der aktuellen Sprache
  let otherLangs = supportedLangs.filter(l => l.id !== "en_us" && (in_setup || l.id !== selected.id));
  const timezoneLangsFiltered = otherLangs
    .filter(l => timezone_langs.includes(l.id))
    .sort((a, b) => a.name.localeCompare(b.name));
  otherLangs = otherLangs
    .filter(l => !timezoneLangsFiltered.some(tz => tz.id === l.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Baue Anzeige-Kategorien
  const displayLangs = [];

  // Aktuelle Sprache nur anzeigen, wenn nicht im Setup
  if (!in_setup) {
    displayLangs.push({
      category: translate_textkeys("menu.settings.lang.label.current", lang),
      items: [{
        ...selected,
        note: "\n" + translate_textkeys("menu.item_selected", lang)
      }]
    });
  }

  // Empfohlene Sprachen (Zeitzone + Englisch)
  const recommendedItems = [];
  if (enLang && enLang.id !== selected.id) {
    const note = timezone_langs.includes(enLang.id)
      ? "\n§5(" + translate_textkeys("menu.settings.lang.recommendation", lang) + ")§r"
      : "";
    recommendedItems.push({ ...enLang, note });
  }
  timezoneLangsFiltered.forEach(l => {
    if (l.id !== selected.id) {
      recommendedItems.push({
        ...l,
        note: "\n§5(" + translate_textkeys("menu.settings.lang.recommendation", lang) + ")§r"
      });
    }
  });

  // Bei Setup: aktuelle Sprache in Empfehlungen vorne hinzufügen
  if (in_setup && !recommendedItems.some(l => l.id === selected.id)) {
    recommendedItems.unshift({
      ...selected,
      note: ""
    });
  }

  if (recommendedItems.length > 0) {
    displayLangs.push({
      category: translate_textkeys("menu.settings.lang.label.recommendation", lang),
      items: recommendedItems
    });
  }

  // Wenn Empfehlungen <2, zeige alle Sprachen (ohne die bereits gelistete aktuelle Sprache)
  if (recommendedItems.length < 2) {
    displayLangs.push({
      category: translate_textkeys("menu.settings.lang.show_all", lang),
      items: otherLangs.map(l => ({ ...l, note: "" }))
    });
  }

  // Baue das Formular auf
  form.title(translate_textkeys("menu.settings.lang.title", lang));
  form.body(translate_textkeys("menu.general.description", lang));

  const actions = [];
  let firstCategory = true;
  displayLangs.forEach(group => {
    if (!firstCategory) form.divider();
    form.label(group.category);
    firstCategory = false;

    let prevStem = null;
    group.items.forEach(l => {
      const stem = l.id.split('_')[0];
      if (prevStem !== null && stem !== prevStem) form.divider();
      form.button(
        l.name + (l.note || ""),
        l.ai ? "textures/ui/servers" : "textures/ui/sidebar_icons/my_characters"
      );
      actions.push(() => {
        if (in_setup) {
          save_data[player_sd_index].lang = l.id;
          save_data[player_sd_index].setup = save_data[player_sd_index].op ? 20 : 50;
          update_save_data(save_data);
          setup_menu(player);
        } else {
          settings_lang_preview(player, l, 1);
        }
      });
      prevStem = stem;
    });
  });

  // Option: Zeige alle, wenn außerhalb Setup oder Release
  if ((!in_setup || version_info.release_type === 0)) {
    form.divider();
    if (recommendedItems.length > 1) {
      form.button(translate_textkeys("menu.settings.lang.show_all", lang));
      actions.push(() => settings_lang_all(player, in_setup));
    }
  }

  // Zurück- oder Skip-Buttons
  if (!in_setup) {
    form.button("");
    actions.push(() => {
      player.playMusic(
        translate_soundkeys("music.menu.settings", player),
        { fade: 0.3, loop: true }
      );
      settings_main(player);
    });
  } else if (version_info.release_type === 0) {
    form.button("Skip Setup", "textures/ui/sprint");
    actions.push(() => {
      save_data[player_sd_index].setup = 100;
      update_save_data(save_data);
      player.playMusic(
        translate_soundkeys("music.menu.main", player),
        { fade: 0.3 }
      );
      return main_menu(player);
    });
  }

  // Formular anzeigen und Aktion ausführen
  form.show(player).then(response => {
    if (response.selection === undefined) {
      if (in_setup) {
        player.sendMessage(
          "§l§6[§e" + translate_textkeys("message.header.help", lang) + "§6]§r " +
          translate_textkeys("message.body.help.setup.closed", lang)
        );
      }
      return player.playMusic(
        translate_soundkeys("menu.close", player),
        { fade: 0.3 }
      );
    }
    const sel = response.selection;
    if (typeof actions[sel] === "function") actions[sel]();
  });
}



function settings_lang_all(player, in_setup) {
  const form = new ActionFormData();
  const save_data = load_save_data();
  const player_sd_index = save_data.findIndex(e => e.id === player.id);
  let lang = save_data[player_sd_index].lang;

  // —–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // 1) genau wie in settings_lang: UTC-abhängige Empfehlungen berechnen
  let timezone_langs = timezone_list.find(zone => zone.utc === save_data[0].utc)?.lang;
  if (!Array.isArray(timezone_langs)) timezone_langs = [];

  const selected     = supportedLangs.find(l => l.id === lang);
  const enLang       = supportedLangs.find(l => l.id === "en_us");

  // Pool ohne selected und ohne en_us (für timezone-Filter)
  let otherLangs = supportedLangs
    .filter(l => l.id !== selected.id && l.id !== "en_us");

  // Erster Teil: Sprachen, die zur Zeitzone passen
  const timezoneLangsFiltered = otherLangs
    .filter(l => timezone_langs.includes(l.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Rest
  otherLangs = otherLangs
    .filter(l => !timezoneLangsFiltered.some(t => t.id === l.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Empfohlene Sprachen (en_us plus timezoneLangsFiltered), inkl. note
  const recommendedItems = [];
  if (enLang && enLang.id !== selected.id) {
    const note = timezone_langs.includes(enLang.id)
      ? "\n§5(" + translate_textkeys("menu.settings.lang.recommendation", lang) + ")§r"
      : "";
    recommendedItems.push({ ...enLang, note });
  }
  timezoneLangsFiltered.forEach(l => {
    recommendedItems.push({
      ...l,
      note: "\n§5(" + translate_textkeys("menu.settings.lang.recommendation", lang) + ")§r"
    });
  });
  // —–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  // 2) Jetzt die komplette Liste alphabetisch, aber mit `note` gefüllt
  const lang_list = supportedLangs
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(l => {
      let note = "";

      // aktuell ausgewählt?
      if (l.id === selected.id) {
        note = in_setup
          ? ""
          : "\n" + translate_textkeys("menu.item_selected", lang);
      }
      // in den Empfehlungen?
      else {
        const rec = recommendedItems.find(r => r.id === l.id);
        if (rec) note = rec.note;
      }

      return { ...l, note };
    });

  // 3) Anzeige wie gehabt, nur benutzen wir jetzt `lang_list` mit notes
  const actions = [];
  form.title(translate_textkeys("menu.settings.lang.title", lang));
  form.body(translate_textkeys("menu.general.description", lang));

  let prevStem = null;
  lang_list.forEach(l => {
    const stem = l.id.split('_')[0];
    if (prevStem !== null && stem !== prevStem) form.divider();

    form.button(
      l.name + (l.note || ""),
      l.ai ? "textures/ui/servers" : "textures/ui/sidebar_icons/my_characters"
    );
    actions.push(() => {
      if (in_setup) {
        save_data[player_sd_index].lang  = l.id;
        save_data[player_sd_index].setup = save_data[player_sd_index].op ? 20 : 50;
        update_save_data(save_data);
        setup_menu(player);
      } else {
        settings_lang_preview(player, l, 1);
      }
    });

    prevStem = stem;
  });

  form.divider();
  form.button("");
  actions.push(() => {
    settings_lang(player, in_setup);
  });

  // Anzeigen
  form.show(player).then(response => {
    if (response.selection === undefined) {
      if (in_setup) {
        player.sendMessage(
          "§l§6[§e" + translate_textkeys("message.header.help", lang) + "§6]§r "
          + translate_textkeys("message.body.help.setup.closed", lang)
        );
      }
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }
    const sel = response.selection;
    if (typeof actions[sel] === "function") actions[sel]();
  });
}


function settings_lang_preview(player, selected_lang, target) {
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
    target == 0? settings_lang(player) : settings_lang_all(player)
  });

}