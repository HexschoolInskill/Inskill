<template>
  <client-only>
    <in-select v-model="currentLang" :options="options" />
    <div
      ref="editorRef"
      class="in-code-editor hljs mt-5"
      :style="{
        height: typeof height === 'string' ? height : `${height}px`
      }"
    ></div>
  </client-only>
</template>
<script lang="ts" setup>
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

const editorRef = ref<HTMLElement | null>(null)
const currentLang = ref<string>('html')
let jar: any

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  height: {
    type: [String, Number],
    default: 400
  }
})
const emit = defineEmits(['update:modelValue'])

if (process.client) {
  onMounted(async () => {
    const { CodeJar } = await import('codejar')
    let position: ReturnType<typeof jar.save>
    function initCodeJar() {
      if (!editorRef.value) return
      jar = CodeJar(editorRef.value, (editor) => {
        const result = hljs.highlight(editor.textContent || '', {
          language: currentLang.value
        }).value
        editor.innerHTML = result
      })
      jar.onUpdate((code: string) => {
        position = jar && jar.save()
        emit('update:modelValue', code)
      })
    }

    initCodeJar()

    watch(currentLang, async () => {
      if (!editorRef.value) return
      await nextTick()
      jar && jar.destroy()
      initCodeJar()
    })

    watch(
      () => props.modelValue,
      (value) => {
        jar && jar.updateCode(value)
        jar && position && jar.restore(position)
      },
      { immediate: true }
    )
  })
  onBeforeUnmount(() => {
    jar && jar.destroy()
  })
}

const options = [
  {
    label: 'HTML',
    value: 'html'
  },
  {
    label: 'CSS',
    value: 'css'
  },
  {
    label: 'Javascript',
    value: 'js'
  },
  {
    label: 'Typescript',
    value: 'ts'
  },
  {
    label: 'Java',
    value: 'java'
  },
  {
    label: 'C++',
    value: 'cpp'
  }
]
</script>
<style lang="scss" scoped>
.in-code-editor {
  border-radius: 4px;
  font-family: 'Source Code Pro', monospace;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 24px;
  padding: 12px;
  tab-size: 4;
  border: 1px solid white;
}
</style>
