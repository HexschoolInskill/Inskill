<template>
  <editor
    v-model="editorContent"
    class="w-full bg-gray"
    api-key="crz90uuiljxyqbv7idhv3597dcafan9m7etkfm2g5ux16wn6"
    :init="init"
  >
  </editor>
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
  toolbar:
    'undo redo | bold italic underline strikethrough | fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | ltr rtl'
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
