<template>
  <div class="m-4">
    <pre><code>{{ props.content }}</code></pre>
  </div>
</template>

<script lang="ts" setup>
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

hljs.highlightAll() // highlight 程式碼

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

console.log(props)
</script>
