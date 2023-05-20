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
  max-width: 196px;
  padding: 8px 12px;
  @apply inline-flex h-10 w-full cursor-pointer select-none items-center justify-center rounded-1 bg-white text-black hover:bg-gray-l;
}
</style>
