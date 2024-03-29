import dayjs from "dayjs";
import Notifications from "notiwind";

import "dayjs/locale/de";

import customParseFormat from "dayjs/plugin/customParseFormat";

export default defineNuxtPlugin((nuxtApp) => {
  dayjs.locale("de");

  dayjs.extend(customParseFormat);

  nuxtApp.vueApp.use(Notifications);
});
