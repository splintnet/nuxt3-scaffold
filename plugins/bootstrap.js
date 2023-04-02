import dayjs from "dayjs";
import Notifications from "notiwind";

import "dayjs/locale/de";

import customParseFormat from "dayjs/plugin/customParseFormat";

export default defineNuxtPlugin((nuxtApp) => {
  // eslint-disable-next-line import/no-named-as-default-member
  dayjs.locale("de");
  // eslint-disable-next-line import/no-named-as-default-member
  dayjs.extend(customParseFormat);

  nuxtApp.vueApp.use(Notifications);
});
