import { locale, extend } from "dayjs";
import Notifications from "notiwind";

import "dayjs/locale/de";

import customParseFormat from "dayjs/plugin/customParseFormat";

export default defineNuxtPlugin((nuxtApp) => {
  locale("de");
  extend(customParseFormat);

  nuxtApp.vueApp.use(Notifications);
});
