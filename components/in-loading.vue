<template>
  <teleport to="body">
    <div
      v-if="show"
      class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50"
    >
      <in-spin :size="48" color="#ffffff"></in-spin>
    </div>
  </teleport>
</template>
<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
</script>
<style lang="scss"></style>
