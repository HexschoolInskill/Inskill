<template>
  <teleport to="body">
    <ul class="in-notification fixed left-1/2 top-5 z-50 grid -translate-x-1/2 gap-2">
      <transition-group name="notification">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="in-notification__item"
          :class="{
            'in-notification__item--success': notification.type === 'success',
            'in-notification__item--error': notification.type === 'error'
          }"
        >
          {{ notification.message }}
        </li>
      </transition-group>
    </ul>
  </teleport>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useNotification from '~~/stores/useNotification'
const { notifications } = storeToRefs(useNotification())
</script>
<style lang="scss" scoped>
.in-notification {
  &__item {
    display: flex;
    align-self: start;
    justify-content: center;
    gap: 12px;
    @apply rounded-1 px-4 py-1 text-white;
    &::before {
      content: '';
      display: block;
      width: 24px;
      background-color: #fff;
    }
    &--success {
      @apply bg-green-500;
      &::before {
        mask: url('/images/checkmark-circle.svg') no-repeat center/contain;
      }
    }
    &--error {
      @apply bg-red-600;
      &::before {
        mask: url('/images/close-circle.svg') no-repeat center/contain;
      }
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
