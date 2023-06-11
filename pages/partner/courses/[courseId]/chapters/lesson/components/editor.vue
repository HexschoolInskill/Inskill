<template>
  <div class="flex border-b border-solid border-white/50">
    <div class="flex-shrink-0 border-r border-solid border-white/50 px-6 pt-6">
      <i class="lesson-handler icon-reorder text-white"></i>
    </div>
    <div class="flex-1 px-6 pt-6">
      <div class="flex items-center justify-between">
        <p class="text-fs-6 text-white">文字編輯器</p>
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
      <div class="py-4" v-html="content.value"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  content: {
    type: Object as PropType<{
      type: string
      value: string
    }>,
    required: true
  }
})

defineEmits(['edit', 'delete'])
</script>
<style lang="scss"></style>
