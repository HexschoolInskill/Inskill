<template>
  <!-- <nuxt-layout name="default"> -->
  <nuxt-layout>
    <template #header>
      <my-header />
    </template>
    <nuxt-page></nuxt-page>
    <template #footer>
      <my-footer />
    </template>
  </nuxt-layout>
</template>
<script setup lang="ts"></script>
