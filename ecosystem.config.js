module.exports = {
  apps: [
    {
      name: "nuxt3",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
