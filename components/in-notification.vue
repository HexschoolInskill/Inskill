<template>
  <ul class="in-notification fixed left-1/2 top-10 grid -translate-x-1/2 gap-5">
    <li
      v-for="notification in store.notifications"
      :key="notification.id"
      class="in-notification__item"
      :class="{
        'in-notification__item--success': notification.type === 'success',
        'in-notification__item--error': notification.type === 'error'
      }"
    >
      {{ notification.message }}
    </li>
  </ul>
</template>
<script setup lang="ts">
import useNotification from '~~/stores/useNotification'
const store = useNotification()
</script>
<style lang="scss" scoped>
.in-notification {
  &__item {
    @apply rounded-1 bg-red-600 px-5 py-2 text-white;
    &--success {
    }
    &--error {
    }
  }
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.notification-enter-active,
.notification-leave-active {
  transition: 0.3s ease-in-out;
}
</style>
