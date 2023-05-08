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
    @apply rounded-1 py-1 px-4 text-white;
    &::before {
      content: '';
      display: block;
      width: 24px;
      background-color: #fff;
    }
    &--success {
      @apply bg-green-500;
      &::before {
        mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 512 512'%3E%3Cpath d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32l122.59-145.91a16 16 0 0 1 24.5 20.58z' fill='currentColor'%3E%3C/path%3E%3C/svg%3E%0A")
          no-repeat center/contain;
      }
    }
    &--error {
      @apply bg-red-600;
      &::before {
        mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 512 512'%3E%3Cpath d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 1 1-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 0 1-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0 1 22.62-22.62L256 233.37l52.69-52.68a16 16 0 0 1 22.62 22.62L278.63 256z' fill='currentColor'%3E%3C/path%3E%3C/svg%3E%0A")
          no-repeat center/contain;
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
