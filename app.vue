<template>
  <Head>
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <Link rel="preconnect" href="https://fonts.gstatic.com" />
    <Link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&display=swap"
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
<script setup lang="ts"></script>

<style lang="scss">
.border-bottom {
  @apply border border-l-0 border-r-0 border-t-0;
}
</style>
