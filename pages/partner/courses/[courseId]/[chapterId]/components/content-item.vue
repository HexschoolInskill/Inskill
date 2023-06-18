<template>
  <div class="flex border-b border-solid border-white/50">
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
        <div v-if="data.contentType === 'text'" v-html="data.content"></div>
        <video v-if="data.contentType === 'video'" controls class="w-full max-w-[960px]">
          <source :src="data.content" />
        </video>
        <iframe
          v-if="data.contentType === 'pdf'"
          :src="data.content"
          frameborder="0"
          class="h-[480px] w-full max-w-[960px]"
        ></iframe>
        <div v-if="data.contentType === 'code'">{{ data.content }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LessonContent } from '@/http/modules/lessonContent'
const props = defineProps({
  data: {
    type: Object as PropType<LessonContent>,
    required: true
  }
})

const title = computed(() => {
  const map = {
    text: '文字編輯器',
    pdf: 'PDF預覽',
    video: '影片',
    code: '程式碼範例'
  }
  return map[props.data.contentType]
})

defineEmits(['edit', 'delete'])
</script>
<style lang="scss"></style>
