<template>
  <div class="m-4">
    <code>{{ props.content }}</code>
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
