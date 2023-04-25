<template>
  <div class="flex h-[500px] items-center justify-center">
    <div>
      <h1 class="text-center text-lg font-bold">CONTENT</h1>
      <nuxt-link v-slot="{ navigate }" to="/" custom>
        <my-btn class="mt-5" @click="navigate">BACK TO INDEX</my-btn>
      </nuxt-link>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss"></style>
