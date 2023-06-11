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
    background-image: linear-gradient(
      to right,
      transparent 10%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 80%
    );
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

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
