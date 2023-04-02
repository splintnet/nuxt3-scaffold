export default defineNuxtPlugin(() => {
  return {
    provide: {
      euro: (value, sign = "€") => {
        const val = (value / 1).toFixed(2).replace(".", ",");
        return `${val
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${sign}`;
      },
    },
  };
});
