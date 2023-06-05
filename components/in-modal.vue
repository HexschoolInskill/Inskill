<template>
  <teleport to="body">
    <div class="fixed left-0 top-0 flex h-screen w-screen items-center justify-center"></div>
  </teleport>
</template>
<script lang="ts" setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
</script>
<style lang=""></style>
