<template>
  <component
    :is="href ? 'a' : 'button'"
    class="in-btn"
    :class="{
      'in-btn--small': size === 'small'
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
  }
})
</script>
<style lang="scss" scoped>
.in-btn {
  min-width: 196px;
  @apply inline-flex h-10 cursor-pointer select-none items-center justify-center rounded-1 bg-white px-3 text-black hover:bg-gray-l;
  &--small {
    min-width: 138px;
  }
  &--disabled {
    opacity: 0.5;
  }
}
</style>
