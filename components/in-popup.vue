<template>
  <transition name="popup">
    <div
      v-if="show"
      class="popup fixed left-0 top-0 z-40 flex h-screen w-screen items-center bg-black/50"
    >
      <div class="popup__content mx-auto">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'large'>,
    default: ''
  }
})
</script>
<style lang="scss">
.popup-enter-from,
.popup-leave-to {
  opacity: 0;

  .popup__content {
    transform: scale(0.9);
  }
}

.popup-enter-active,
.popup-leave-active {
  transition: 0.2s ease-in-out;

  .popup__content {
    transition: 0.2s ease-in-out;
  }
}
</style>
