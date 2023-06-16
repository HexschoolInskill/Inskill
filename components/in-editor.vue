<template>
  <editor
    v-model="editorContent"
    api-key="crz90uuiljxyqbv7idhv3597dcafan9m7etkfm2g5ux16wn6"
    :init="init"
  ></editor>
</template>
<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 400
  }
})
const emit = defineEmits(['update:modelValue'])

const init = reactive({
  height: props.height,
  skin: 'oxide-dark',
  content_css: 'dark',
  toolbar: 'undo redo link aligncenter alignjustify alignleft bold fontfamily fontsize forecolor hr'
})

const editorContent = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
<style lang="scss"></style>
