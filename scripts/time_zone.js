import { ActionFormData, ModalFormData, MessageFormData  } from "@minecraft/server-ui"
import { load_save_data, update_save_data, server_utc } from "./helper_function.js";
import { apply_design, design_template  } from "./design.js";
import { translate_soundkeys } from "./sound";
import { translate_textkeys } from "./lang.js";
import { setup_menu, settings_main } from "./menu.js";

export const timezone_list = [
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

export function settings_time_zone(player, viewing_mode=0, in_setup=false) {
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

  const renderZoneButton = (zone, index, switch_to_auto) => {
    const ticks = getTicks(zone.utc);

    const design = typeof player_sd.design === "number"
      ? design_template.find(t => t.id === player_sd.design).content
      : player_sd.design;

    const label = (switch_to_auto? translate_textkeys("menu.settings.time_zone.automatically", player_sd.lang, {zone_short: zone.short}) : zone.name.length > 28 ? zone.short : zone.name) + "\n" + apply_design(design.find(i => i.type === "day"), ticks);

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
      if (switch_to_auto) {
        settings_time_zone_preview(player, zone, viewing_mode, in_setup, true);
      } else if (icon === "textures/ui/realms_slot_check") {
        save_data.forEach(entry => {
          if (entry.time_source === 1) {
            entry.time_source = 0;
          }
        });
        save_data[0].utc = undefined;
        update_save_data(save_data);
        settings_time_zone(player);
      } else {
        settings_time_zone_preview(player, zone, viewing_mode, in_setup, false);
      }
    });
  };

  const navButton = (label, icon, mode) => {
    form.button(label, icon);
    actions.push(() => settings_time_zone(player, mode));
  };

  const autoButton = () => {
    renderZoneButton(timezone_list.find(zone => zone.utc === server_utc), undefined, true)
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
    form.divider();
    for (let i = start; i <= end; i++) renderZoneButton(timezone_list[i], i);
    form.divider();
    if (end < timezone_list.length - 1) navButton(translate_textkeys("menu.settings.time_zone.show_later", player_sd.lang), "textures/ui/down_arrow", 2);
  } else {
    if (server_utc) {autoButton(); form.divider();}
    if (viewing_mode === 1) navButton(translate_textkeys("menu.settings.time_zone.show_less", player_sd.lang), "textures/ui/down_arrow", 0);
    if (viewing_mode === 2 && current_zone_index !== 0) {navButton(navButton(translate_textkeys("menu.settings.time_zone.show_previous", player_sd.lang), "textures/ui/up_arrow", 3)); form.divider();}
    if (viewing_mode === 3 && current_utc !== undefined) {navButton(translate_textkeys("menu.settings.time_zone.show_less", player_sd.lang), "textures/ui/down_arrow", 2);}

    renderZones(i =>
      viewing_mode === 3 ||
      (viewing_mode === 1 && i <= current_zone_index) ||
      (viewing_mode === 2 && i >= current_zone_index)
    );

    if (viewing_mode === 1 && current_zone_index !== timezone_list.length) {form.divider(); navButton(translate_textkeys("menu.settings.time_zone.show_later", player_sd.lang), "textures/ui/down_arrow", 3);}
    if (viewing_mode === 2) {navButton(translate_textkeys("menu.settings.time_zone.show_less", player_sd.lang), "textures/ui/up_arrow", 0)}
    if (viewing_mode === 3 && current_utc !== undefined) {navButton(translate_textkeys("menu.settings.time_zone.show_less", player_sd.lang), "textures/ui/up_arrow", 1)}
    if (viewing_mode === 3 && current_utc == undefined) form.divider();
  }

  if (in_setup) {
    form.button(translate_textkeys("menu.button_skip", player_sd.lang), "textures/ui/sprint");
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
      if (in_setup) player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", player_sd.lang)+"§6]§r "+translate_textkeys("message.body.help.setup.closed", player_sd.lang))
      player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    } else {
      actions[res.selection]?.();
    }
  });
}


export function settings_time_zone_preview(player, zone, viewing_mode, in_setup, switch_to_auto) {
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

  form.body(translate_textkeys(
    "menu.settings.time_zone.preview",
    save_data[player_sd_index].lang,
    {
      name: zone.name,
      utc: zone.utc,
      time: apply_design(design.find(i => i.type === "day"), ticks),
      location: zone.location.join(", "),
      subtitle: save_data[0].utc_auto? translate_textkeys("menu.settings.time_zone.preview.subtitle.auto", save_data[player_sd_index].lang) : translate_textkeys("menu.settings.time_zone.preview.subtitle.manuel", save_data[player_sd_index].lang)
    }

  ))

  form.button1(save_data[0].utc_auto? translate_textkeys("menu.button_manually", save_data[player_sd_index].lang) : translate_textkeys("menu.button_switch", save_data[player_sd_index].lang, {name: zone.short}));
  form.button2("");

  form.show(player).then((response) => {
    if (response.selection == undefined ) {
      if (in_setup) player.sendMessage("§l§6[§e"+translate_textkeys("message.header.help", lang)+"§6]§r "+translate_textkeys("message.body.help.setup.closed", lang))
      return player.playMusic(translate_soundkeys("menu.close", player), { fade: 0.3 });
    }


    if (response.selection == 0) {
      // Disable UTC auto
      if (save_data[0].utc_auto) {
        save_data[0].utc_auto = false
        save_data[0].utc = undefined
        update_save_data(save_data);
        return settings_time_zone(player, 0);

      // Enable UTC auto
      } else if (switch_to_auto) {
        save_data[0].utc_auto = true
        save_data[0].utc = server_utc
        update_save_data(save_data);
        player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
        return settings_main(player);

      } else {
        // Save manuall UTC
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
    }
    if (save_data[0].utc_auto) {
      player.playMusic(translate_soundkeys("music.menu.settings", player), { fade: 0.3, loop: true });
    }
    return save_data[0].utc_auto? settings_main(player) : settings_time_zone(player, viewing_mode)
  });

}