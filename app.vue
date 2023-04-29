<template>
  <nuxt-layout name="default">
    <template #header>
      <in-header />
    </template>
    <nuxt-page></nuxt-page>
    <template #footer>
      <in-footer />
    </template>
  </nuxt-layout>
</template>
<script setup lang="ts"></script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
