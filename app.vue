<script setup lang="ts">
defineRobotMeta();

const { t, locale } = useI18n();
const appName = t("app_name");

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${appName}` : appName;
  },
  meta: [
    {
      name: "description",
      content: t("app_description"),
    },
  ],
});
</script>

<template>
  <Html :lang="locale" />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
