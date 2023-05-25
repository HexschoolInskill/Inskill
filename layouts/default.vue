<template>
  <div
    class="default-layout"
    :class="{
      'default-layout--padding-top': paddingTop
    }"
  >
    <slot name="header"></slot>
    <slot name="default"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  paddingTop: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss">
.default-layout {
  &--padding-top {
    @apply pt-24 lg:pt-[124px];
  }
}
</style>
