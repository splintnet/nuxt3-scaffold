import "vanilla-cookieconsent";
import { createGtm } from "@gtm-support/vue-gtm";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  window.dataLayer = window.dataLayer || [];

  function gtag(...args) {
    window.dataLayer.push(args);
  }

  if (config.public.gtag) {
    nuxtApp.vueApp.use(
      createGtm({
        id: config.public.gtag,
        defer: false,
        compatibility: false,
        enabled: true,
        debug: false,
        loadScript: true,
        vueRouter: useRouter(),
        trackOnNextTick: false,
      })
    );
  }

  const cc = initCookieConsent();

  window.openContactFrom = () => {
    nuxtApp.$router.push("/contact");
    cc.hideSettings();
  };

  window.goToPrivacy = () => {
    nuxtApp.$router.push("/privacy");
    cc.hideSettings();
  };

  cc.run({
    current_lang: "de",
    autoclear_cookies: false, // default: false
    page_scripts: true, // default: false
    force_consent: false,
    hide_from_bots: true,

    onAccept(cookie) {
      gtag("consent", "update", {
        ad_storage: cookie.level.includes("targeting") ? "granted" : "denied",
        analytics_storage: cookie.level.includes("analytics")
          ? "granted"
          : "denied",
      });

      window.dataLayer.push({ event: "consentUpdated" });
    },

    gui_options: {
      consent_modal: {
        layout: "cloud", // box/cloud/bar
        position: "bottom center", // bottom/middle/top + left/right/center
        transition: "slide", // zoom/slide
      },
      settings_modal: {
        layout: "box", // box/bar
        transition: "slide", // zoom/slide
      },
    },
    languages: {
      de: {
        consent_modal: {
          title: "Wir verwenden Cookies 🍪",
          description:
            'Hallo! Diese Website verwendet essentielle Cookies, um ihren ordnungsgemäßen Betrieb zu gewährleisten, und Tracking-Cookies, um zu verstehen, wie Sie mit ihr interagieren. Letztere werden nur nach Zustimmung gesetzt. <button type="button" data-cc="c-settings" class="cc-link">Anpassen</button>',
          primary_btn: {
            text: "Alle akzeptieren",
            role: "accept_all", // 'accept_selected' or 'accept_all'
          },
          secondary_btn: {
            text: "Alle ablehnen",
            role: "accept_necessary", // 'settings' or 'accept_necessary'
          },
        },
        settings_modal: {
          title: "Cookie Einstellungen",
          save_settings_btn: "Einstellungen speichern",
          accept_all_btn: "Alle akzeptieren",
          reject_all_btn: "Alle ablehnen",
          close_btn_label: "Schließen",
          cookie_table_headers: [
            { col1: "Name" },
            { col2: "Domain" },
            { col3: "Ablaufdatum" },
            { col4: "Beschreibung" },
          ],

          blocks: [
            {
              title: "Cookie Verwendung 📢",
              description:
                'Wir verwenden Cookies, um die grundlegenden Funktionen der Website zu gewährleisten und um Ihr Online-Erlebnis zu verbessern. Sie können für jede Kategorie wählen, ob Sie sich an- oder abmelden möchten. Für weitere Einzelheiten zu Cookies und anderen sensiblen Daten lesen Sie bitte die vollständige&nbsp;<a href="javascript:goToPrivacy()" class="cc-link">Datenschutzerklärung</a>.',
            },
            {
              title: "Streng notwendige Cookies",
              description:
                "Diese Cookies sind für das ordnungsgemäße Funktionieren meiner Website unerlässlich. Ohne diese Cookies würde die Website nicht richtig funktionieren",
              toggle: {
                value: "necessary",
                enabled: true,
                readonly: true, // cookie categories with readonly=true are all treated as "necessary cookies"
              },
              cookie_table: [
                // list of all expected cookies
                {
                  col1: "^__csrf_token-", // match all cookies starting with "_ga"
                  col2: ".nuxt3.com",
                  col3: "Session",
                  col4: "Ein CSRF-Token ist ein geheimer, einzigartiger und unvorhersehbarer Wert, den eine serverseitige Anwendung generiert, um anfällige CSRF- Ressourcen zu schützen.",
                  is_regex: true,
                },
                {
                  col1: "x-ua-device",
                  col2: ".nuxt3.com",
                  col3: "Session",
                  col4: "Mit diesem Cookie wird bestimmt, welchen Gerätetyp oder welche Browsersoftware der Besucher verwendet. Auf diese Weise wird die Website korrekt angezeigt.",
                },
                {
                  col1: "SM",
                  col2: ".c.clarity.ms",
                  col3: "Session",
                  col4: "Dies ist ein Microsoft MSN-Cookie eines Erstanbieters, das das ordnungsgemäße Funktionieren der Website sicherstellt.",
                },
                {
                  col1: "SRM_B",
                  col2: ".c.bing.com",
                  col3: "1 Jahr",
                  col4: "Dies ist ein Microsoft MSN-Cookie eines Drittanbieters, das das ordnungsgemäße Funktionieren dieser Website sicherstellt.",
                },
                {
                  col1: "TawkConnectionTime",
                  col2: "nuxt3.com",
                  col3: "Session",
                  col4: "Dieses Cookie wird verwendet, um unsere Chat- Anwendung zu aktivieren. Es ist ein Sitzungscookie von TawkConnectionTime Chat",
                },
              ],
            },
            {
              title: "Leistungs- und Analyse-Cookies",
              description:
                "Diese Cookies ermöglichen es der Website, sich an die von Ihnen in der Vergangenheit getroffenen Auswahlen zu erinnern",
              toggle: {
                value: "analytics", // your cookie category
                enabled: false,
                readonly: false,
              },
              cookie_table: [
                // list of all expected cookies
                {
                  col1: "_clsk",
                  col2: ".nuxt3.com",
                  col3: "1 Tag",
                  col4: "Dieses Cookie verbindet mehrere Seitenaufrufe eines Benutzers zu einer einzigen Clarity-Sitzungsaufzeichnung.",
                },
                {
                  col1: "_ga", // match all cookies starting with "_ga"
                  col2: "google.com",
                  col3: "2 Jahre",
                  col4: "Registriert eine eindeutige ID für einen Website- Besucher, die protokolliert, wie der Besucher die Website verwendet. Die Daten werden für Statistiken verwendet.",
                  is_regex: true,
                },
                {
                  col1: "^_ga_", // match all cookies starting with "_ga"
                  col2: "google.com",
                  col3: "2 Jahre",
                  col4: "Dieses Cookie speichert eine eindeutige ID für einen Website-Besucher und verfolgt, wie der Besucher die Website nutzt. Die Daten werden für Statistiken verwendet.",
                },
                {
                  col1: "_gid",
                  col2: "google.com",
                  col3: "1 Tag",
                  col4: "Registriert eine eindeutige ID, die verwendet wird, um statistische Daten dazu, wie der Besucher die Website nutzt, zu generieren.",
                },
              ],
            },
            {
              title: "Cookies für Werbung und Zielgruppenansprache",
              description:
                "Diese Cookies sammeln Informationen darüber, wie Sie die Website nutzen, welche Seiten Sie besucht und welche Links Sie angeklickt haben. Alle Daten sind anonymisiert und können nicht verwendet werden, um Sie zu identifizieren",
              toggle: {
                value: "targeting",
                enabled: false,
                readonly: false,
              },
              cookie_table: [
                // list of all expected cookies
                {
                  col1: "_clsk",
                  col2: ".nuxt3.com",
                  col3: "1 Jahr",
                  col4: "Dieses Cookie sammelt Daten zur Navigation und zum Verhalten der Besucher auf der Website. Hiermit werden statistische Berichte und Heatmaps für den Websitebesitzer erstellt.",
                },
                {
                  col1: "_fbp",
                  col2: ".nuxt3.com",
                  col3: "3 Monate",
                  col4: "Dieser Cookie wird von Facebook zu Werbezwecken und für das Conversion-Tracking verwendet.",
                },
                {
                  col1: "_gcl_au",
                  col2: ".nuxt3.com",
                  col3: "3 Monate",
                  col4: "Dieses Cookie wird von Google Adsense für Versuche mit websiteübergreifender Werbung gesetzt.",
                },
                {
                  col1: "_hjIncludedInSessionSample",
                  col2: ".nuxt3.com",
                  col3: "2 Minuten",
                  col4: "Dieses Cookie wird in Bezug auf das Hotjar-Tracking gesetzt",
                },
                {
                  col1: "_pin_unauth",
                  col2: ".nuxt3.com",
                  col3: "1 Jahr und 1 Monat",
                  col4: "Dieser Cookie wird in Bezug auf Pinterest Marketing gesetzt",
                },
                {
                  col1: "_uetsid",
                  col2: "",
                  col3: "",
                  col4: "Diese enthält die Sitzungs-ID für eine eindeutige Sitzung auf der Website. Dies wird von Microsoft Advertising verwendet.",
                },
                {
                  col1: "_uetsid_exp",
                  col2: "",
                  col3: "",
                  col4: "Enthält das Ablaufdatum für den lokalen Speicher und Cookie mit entsprechendem Namen.",
                },
                {
                  col1: "_uetvid",
                  col2: ".nuxt3.com",
                  col3: "1 Jahr und 1 Monat",
                  col4: "Dieses Cookie wird von Bing verwendet, um zu bestimmen, welche Anzeigen geschaltet werden, die für den Endbenutzer, der die Website besucht, relevant sein können.",
                },
                {
                  col1: "_uetvid",
                  col2: "",
                  col3: "",
                  col4: "UET weist diese eindeutige, anonymisierte Besucher-ID zu, die einen eindeutigen Besucher darstellt. UET speichert diese Daten in einem Erstanbieter- Cookie und einem lokalen Speicher.",
                },
                {
                  col1: "_uetvid_exp",
                  col2: "",
                  col3: "",
                  col4: "Enthält das Ablaufdatum für das Cookie oder lokale Speicherelement mit entsprechendem Namen.",
                },
                {
                  col1: "ANONCHK",
                  col2: ".c.clarity.ms",
                  col3: "10 Minuten",
                  col4: "Dieses Cookie enthält Informationen darüber, wie der Endbenutzer die Website nutzt, sowie über Werbung, die der Endbenutzer möglicherweise vor dem Besuch dieser Website gesehen hat.",
                },
                {
                  col1: "CLID",
                  col2: "www.clarity.ms",
                  col3: "1 Jahr und 1 Monat",
                  col4: "Dieses Cookie sammelt Daten zur Navigation und zum Verhalten der Besucher auf der Website. Hiermit werden statistische Berichte und Heatmaps für den Websitebesitzer erstellt.",
                },
                {
                  col1: "IDE",
                  col2: ".doubleclick.net",
                  col3: "1 Jahr und 1 Monat",
                  col4: "Cookie von Double Click (Google), mit dem wir unsere Werbekampagnen analysieren und optimieren können.",
                },
                {
                  col1: "MUID",
                  col2: ".clarity.ms",
                  col3: "1 Jahr und 1 Monat",
                  col4: "Dieses Cookie wird von Microsoft häufig als eindeutige Benutzer-ID verwendet. Es kann durch eingebettete Microsoft- Skripte festgelegt werden. Es wird allgemein angenommen, dass die Synchronisierung zwischen vielen verschiedenen Microsoft- Domänen erfolgt, sodass Benutzer nachverfolgt werden können.",
                },
                {
                  col1: "MUID",
                  col2: ".bing.com",
                  col3: "1 Jahr und 1 Monat",
                  col4: "Dieses Cookie wird von Microsoft häufig als eindeutige Benutzer-ID verwendet. Es kann durch eingebettete Microsoft- Skripte festgelegt werden. Es wird allgemein angenommen, dass die Synchronisierung zwischen vielen verschiedenen Microsoft- Domänen erfolgt, sodass Benutzer nachverfolgt werden können.",
                },
                {
                  col1: "test_cookie",
                  col2: ".doubleclick.net",
                  col3: "15 Minuten",
                  col4: "Dieses Cookie wird von DoubleClick (im Besitz von Google) gesetzt, um festzustellen, ob der Browser des Website-Besuchers Cookies unterstützt.",
                },
                {
                  col1: "twk_idm_key",
                  col2: "nuxt3.com",
                  col3: "Session",
                  col4: "Dieses Cookie verwaltet die Besucherverbindung",
                },
              ],
            },
            {
              title: "Mehr Informationen",
              description:
                'Bei Fragen zu unserer Politik in Bezug auf Cookies und Ihre Wahlmöglichkeiten <a class="cc-link" href="javascript:openContactFrom()">wenden Sie sich bitte an uns</a>.',
            },
          ],
        },
      },
    },
  });
});
