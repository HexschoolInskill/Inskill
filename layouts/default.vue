<template>
  <slot name="header"></slot>
  <slot name="default"></slot>
  <slot name="footer"></slot>
  <in-notification />
</template>
<script setup></script>
<style lang="scss">
body {
  padding-top: 7.75rem;
  @apply bg-black;
}
</style>
