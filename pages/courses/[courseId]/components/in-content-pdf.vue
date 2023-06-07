<template>
  <div class="m-4">
    <object :data="props.content" type="application/pdf" width="100%" height="500px"></object>
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
