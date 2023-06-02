<template>
  <div class="m-4">
    <video class="w-full" controls>
      <source :src="props.content" />
    </video>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  content: {
    type: String,
    default: ""
  }
})

console.log(props)
</script>
