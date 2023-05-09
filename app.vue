<template>
  <Head>
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <Link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap"
      rel="stylesheet"
    />
  </Head>
  <!-- <nuxt-layout name="default"> -->
  <nuxt-layout>
    <template #header>
      <in-header />
    </template>
    <nuxt-page></nuxt-page>
    <template #footer>
      <in-footer />
    </template>
  </nuxt-layout>
  <in-notification />
</template>
<script setup lang="ts">
if (process.client && localStorage.getItem('access_token')) {
  const app = useNuxtApp()
  await app.$api.user.fetchProfile()
}
</script>
