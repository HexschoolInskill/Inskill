<template>
  <component
    :is="href ? 'a' : 'button'"
    class="in-btn"
    :class="{
      'in-btn--small': size === 'small',
      'in-btn--ghost': ghost,
      'in-btn--error': type === 'error',
      'in-btn--primary': type === 'primary',
      'in-btn--disabled': disabled
    }"
    v-bind="$attrs"
  >
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: null
  },
  size: {
    type: String as PropType<'small'>,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  ghost: {
    type: Boolean,
    default: false
  },
  type: {
    type: String as PropType<'error' | 'primary'>,
    default: 'primary'
  }
})
</script>
<style lang="scss" scoped>
.in-btn {
  min-width: 196px;
  @apply transition-base inline-flex h-10 cursor-pointer select-none items-center justify-center rounded-1 px-3;

  &--primary {
    @apply bg-white text-black hover:bg-gray-l;
  }
  &--small {
    min-width: 138px;
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &--ghost {
    @apply border border-solid border-white bg-transparent text-white hover:bg-white hover:text-black;
  }

  &--error {
    &.in-btn {
      &--ghost {
        @apply border-red-500 text-red-500 hover:bg-transparent;
      }
      &--primary {
        @apply bg-red-500 text-white hover:text-red-800;
      }
    }
  }
}
</style>
