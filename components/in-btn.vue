<template>
  <button v-if="href !== null" class="in-btn" v-bind="$attrs">
    <slot></slot>
  </button>
  <a v-else class="in-btn" :href="href" v-bind="$attrs">
    <slot></slot>
  </a>
</template>
<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: null
  }
})
</script>
<style lang="scss" scoped>
.in-btn {
  @apply inline-flex cursor-pointer select-none items-center whitespace-nowrap rounded-sm bg-gray-800 px-3 py-2 text-base text-white hover:bg-gray-900;
}
</style>
