<template>
  <nuxt-layout name="default" :padding-top="false">
    <template #header>
      <in-header />
    </template>
    <banner :submitted="isSubmitted" />
    <join-form v-if="!isSubmitted" @submit="isSubmitted = true" />
    <success v-else />
    <template #footer>
      <in-footer />
    </template>
  </nuxt-layout>
</template>
<script lang="ts" setup>
import Banner from './banner.vue'
import JoinForm from './join-form.vue'
import Success from './success.vue'

definePageMeta({
  layout: false,
  auth: true
})

const isSubmitted = ref(false)
</script>
