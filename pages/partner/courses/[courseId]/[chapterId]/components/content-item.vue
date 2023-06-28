<template>
  <div :data-id="data._id" class="content-item flex border-b border-solid border-white/50">
    <div class="flex-shrink-0 border-r border-solid border-white/50 px-6 pt-6">
      <i class="content-handler icon-reorder text-white"></i>
    </div>
    <div class="flex-1 px-6 pt-6">
      <div class="flex items-center justify-between">
        <p class="text-fs-6 text-white">{{ title }}</p>
        <div class="flex gap-5">
          <button
            class="transition-base flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray"
            @click="$emit('edit')"
          >
            <i class="icon-pencil"></i>
          </button>
          <button
            class="transition-base flex h-8 w-8 items-center justify-center rounded-full text-red-500 hover:bg-gray"
            @click="$emit('delete')"
          >
            <i class="icon-trash"></i>
          </button>
        </div>
      </div>
      <div class="py-4">
        <div
          v-if="data.contentType === 'text'"
          class="content-item__editor"
          v-html="data.content"
        ></div>
        <video v-if="data.contentType === 'video'" controls class="w-full max-w-[960px]">
          <source :src="data.content" />
        </video>
        <iframe
          v-if="data.contentType === 'pdf'"
          :src="data.content"
          frameborder="0"
          class="h-[480px] w-full max-w-[960px]"
        ></iframe>
        <div v-if="data.contentType === 'code'" ref="codeRef" class="content-item__code hljs">
          {{ data.content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import hljs from 'highlight.js'
import { LessonContent } from '@/http/modules/lessonContent'
import 'highlight.js/styles/github-dark.css'

const props = defineProps({
  data: {
    type: Object as PropType<LessonContent>,
    required: true
  }
})
defineEmits(['edit', 'delete'])

const title = computed(() => {
  const map = {
    text: '文字編輯器',
    pdf: 'PDF預覽',
    video: '影片',
    code: '程式碼範例'
  }
  return map[props.data.contentType]
})

const codeRef = ref<HTMLElement | null>(null)

watch(
  () => props.data.content,
  async () => {
    if (props.data.contentType === 'code' && codeRef.value) {
      await nextTick()
      codeRef.value.innerHTML = hljs.highlightAuto(props.data.content).value
    }
  }
)

onMounted(() => {
  if (props.data.contentType === 'code' && codeRef.value) {
    codeRef.value.innerHTML = hljs.highlightAuto(props.data.content).value
  }
})
</script>
<style lang="scss">
.hljs {
  border-radius: 4px;
  font-family: 'Source Code Pro', monospace;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 24px;
  padding: 12px;
  tab-size: 4;
  border: 1px solid white;
  white-space: pre;
}

.content-item__editor {
  border-radius: 4px;
  padding: 12px;
  border: 1px solid white;

  h1 {
    @apply text-h2;
  }

  h2 {
    @apply text-h3;
  }

  h3 {
    @apply text-h4;
  }

  h4 {
    @apply text-h5;
  }

  h5 {
    @apply text-h6;
  }

  h6 {
    @apply text-base;
  }

  line-height: 1.5;
  font-size: 16px;
}
</style>
