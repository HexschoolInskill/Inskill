<template>
  <div class="m-4">
    <p v-html="props.content"></p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

console.log(props)
</script>
