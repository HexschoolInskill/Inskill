<template>
  <div class="flex h-[500px] items-center justify-center">
    <div>
      <h1 class="text-center text-lg font-bold">ABOUT</h1>
      <nuxt-link v-slot="{ navigate }" to="/" custom>
        <my-btn class="mt-5" @click="navigate">BACK TO INDEX</my-btn>
      </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss"></style>
