<script setup lang="ts">
const { t } = useI18n();
useHead({
  title: () => {
    return "Home";
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
  <div class="bg-yellow-200 p-5">
    <h1>Home</h1>
    <p>{{ t("app_description") }}</p>

    <Icon name="uil:github" />

    <div class="asd">adasd</div>
  </div>
</template>

<style lang="postcss">
.asd {
  @apply bg-black;

  .x {
    @apply bg-red-500;
  }
}
</style>
