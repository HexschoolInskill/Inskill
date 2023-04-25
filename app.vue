<template>
  <nuxt-layout name="default">
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
