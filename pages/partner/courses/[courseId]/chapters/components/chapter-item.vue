<template>
  <div class="flex h-15 w-full items-center border-b border-solid border-white/50 px-6">
    <div class="flex-1 text-white">
      <in-input v-if="isEditing" v-model="title" class="text-black" @keyup.enter="handleEdit" />
      <h5 v-else class="text-h5 font-bold line-clamp-1">{{ value }}</h5>
    </div>
    <div class="flex flex-shrink-0 items-center gap-5 pl-6">
      <template v-if="isEditing">
        <button @click="handleEdit"><i class="icon-check"></i></button>
        <button @click="isEditing = false"><i class="icon-close"></i></button>
      </template>
      <template v-else>
        <in-dropdown v-slot="{ show }" :options="options" @select="handleOptionSelect">
          <div
            class="transition-base flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full text-white group-hover:bg-gray"
            :class="{ 'bg-gray': show }"
          >
            <svg
              class="w-6"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 16 16"
            >
              <g fill="none">
                <path
                  d="M5.25 8a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zm4 0a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zM12 9.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </div>
        </in-dropdown>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import type { Option } from '@/components/in-dropdown.vue'
import useNotification from '~/stores/useNotification'
import useConfirm from '~/stores/useConfirm'
import useEditCourse from '~/stores/useEditCourse'

const { currentCourse: course } = storeToRefs(useEditCourse())
const route = useRoute()
const app = useNuxtApp()
const { confirm } = useConfirm()
const { notification } = useNotification()

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['updated', 'deleted', 'loadingStart', 'loadingEnd'])

const title = ref('')
const isEditing = ref(false)

const options = [
  {
    label: '重新命名',
    value: 'rename'
  },
  {
    label: '刪除章節',
    value: 'delete'
  }
]

watch(isEditing, (editing) => {
  if (editing) title.value = props.value
})

async function handleEdit() {
  emit('loadingStart')
  try {
    const { updatedChapter } = await app.$api.course.updateChapter({
      courseId: route.params.courseId as string,
      chapterId: props.id,
      title: title.value,
      field: 'title'
    })
    course.value.chapters = updatedChapter
    isEditing.value = false
    notification.success('更新成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    emit('loadingEnd')
  }
}

async function deleteChapter(courseId: string, chapterId: string) {
  if (!chapterId) return
  const isConfirm = await confirm('刪除章節', '將連同所有課堂一起刪除')
  if (!isConfirm) return
  try {
    emit('loadingStart')
    await app.$api.course.deleteChapter(courseId, chapterId)
    course.value.chapters = course.value.chapters.filter((chapter) => chapter._id !== chapterId)
    course.value.chapters.forEach((chapter, index) => (chapter.sort = index + 1))
    notification.success('刪除成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    emit('loadingEnd')
  }
}

function handleOptionSelect(option: Option) {
  const key = option.value
  switch (key) {
    case 'rename':
      isEditing.value = true
      break
    case 'delete':
      deleteChapter(route.params.courseId as string, props.id)
      break
    default:
  }
}
</script>
<style lang="scss"></style>
