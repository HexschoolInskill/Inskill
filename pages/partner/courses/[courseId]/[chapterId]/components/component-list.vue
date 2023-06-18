<template>
  <in-card border :border-radius="4">
    <div class="flex items-center justify-between border-b border-solid border-white/50 p-5">
      <h4 class="text-fs-4">新增內容</h4>
      <button
        class="transition-base h-10 w-10 flex-shrink-0 rounded-full hover:bg-gray"
        @click="$emit('close')"
      >
        <i class="icon-close text-[24px]"></i>
      </button>
    </div>
    <div class="flex flex-wrap gap-5 p-5">
      <div class="min-w-[100px] flex-shrink-0">
        <div
          class="transition-base relative cursor-pointer rounded-1 border border-solid border-white pt-[100%] text-white hover:bg-white hover:text-black"
          @click="$emit('add', 'text')"
        >
          <div
            class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          >
            <i class="icon-editor text-[24px]"></i>
            <p class="text-fs-6 whitespace-nowrap">文字編輯器</p>
          </div>
        </div>
      </div>
      <div class="min-w-[100px] flex-shrink-0">
        <div
          class="transition-base relative cursor-pointer rounded-1 border border-solid border-white pt-[100%] text-white hover:bg-white hover:text-black"
          @click="$emit('add', 'video')"
        >
          <div
            class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          >
            <i class="icon-video text-[24px]"></i>
            <p class="text-fs-6 whitespace-nowrap">影片</p>
          </div>
        </div>
      </div>
      <div class="min-w-[100px] flex-shrink-0">
        <div
          class="transition-base relative cursor-pointer rounded-1 border border-solid border-white pt-[100%] text-white hover:bg-white hover:text-black"
          @click="$emit('add', 'pdf')"
        >
          <div
            class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          >
            <i class="icon-pdf text-[24px]"></i>
            <p class="text-fs-6 whitespace-nowrap">PDF預覽</p>
          </div>
        </div>
      </div>
      <div class="min-w-[100px] flex-shrink-0">
        <div
          class="transition-base relative cursor-pointer rounded-1 border border-solid border-white pt-[100%] text-white hover:bg-white hover:text-black"
          @click="$emit('add', 'code')"
        >
          <div
            class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          >
            <i class="icon-code text-[24px]"></i>
            <p class="text-fs-6 whitespace-nowrap">程式碼範例</p>
          </div>
        </div>
      </div>
    </div>
  </in-card>
</template>
<script lang="ts" setup>
import { LessonContentType } from '~/http/modules/lessonContent'
defineEmits<{
  add: [type: LessonContentType]
  close: []
}>()
</script>
<style lang="scss"></style>
