<template>
  <div class="in-skeleton"></div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.in-skeleton {
  @apply relative overflow-hidden rounded-6 bg-[#262b2f];

  &::after {
    content: '';
    display: block;
    animation: skeleton 3s ease-out both infinite;
    @apply absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 via-50% to-transparent to-80%;

    @keyframes skeleton {
      0% {
        transform: translateX(-100%);
      }
      60% {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(100%);
      }
    }
  }
}
</style>
