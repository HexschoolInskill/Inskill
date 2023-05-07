<template>
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
