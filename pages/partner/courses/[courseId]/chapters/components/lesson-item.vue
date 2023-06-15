<template>
  <div class="flex h-15 w-full items-center border-b border-solid border-white/50 px-6">
    <div class="flex-shrink-0 cursor-grab pr-6">
      <i class="lesson-handler icon-reorder text-white"></i>
    </div>
    <div class="flex-1 text-white">
      <in-input v-if="isEditing" v-model="title" class="text-black" @keyup.enter="handleEdit" />
      <template v-else>
        <nuxt-link
          :to="`/partner/courses/${$route.params.courseId}/chapters/lesson/${id}`"
          class="text-fs-6 group relative inline-block"
        >
          <p class="line-clamp-1">{{ value }}</p>
          <div
            class="transition-base absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white group-hover:scale-x-100"
          ></div>
        </nuxt-link>
      </template>
    </div>
    <div class="flex flex-shrink-0 items-center gap-5 pl-6">
      <template v-if="isEditing">
        <button @click="handleEdit"><i class="icon-check"></i></button>
        <button @click="isEditing = false"><i class="icon-close"></i></button>
      </template>
      <template v-else>
        <in-select v-model="isPublish" :options="publishOptions" />
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

const app = useNuxtApp()
const route = useRoute()
const { confirm } = useConfirm()
const { notification } = useNotification()
const { currentCourse: course } = storeToRefs(useEditCourse())

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  chapterId: {
    type: String,
    required: true
  },
  publish: {
    type: Boolean,
    required: true
  }
})

const title = ref('')
const isEditing = ref(false)
const isPublish = computed({
  get() {
    return props.publish ? 'publish' : 'unpublish'
  },
  set(value) {
    console.log(value)
  }
})
const publishOptions: Option[] = [
  {
    label: '發布',
    value: 'publish'
  },
  {
    label: '未發布',
    value: 'unpublish'
  }
]
const options: Option[] = [
  {
    label: '重新命名',
    value: 'rename'
  },
  {
    label: '刪除課堂',
    value: 'delete'
  }
]

const emit = defineEmits(['updated', 'deleted', 'loadingStart', 'loadingEnd'])

watch(isEditing, (editing) => {
  if (editing) title.value = props.value
})

async function handleEdit() {
  emit('loadingStart')
  try {
    const { updatedChapter } = await app.$api.course.renameLesson(
      route.params.courseId as string,
      props.chapterId,
      props.id,
      title.value
    )
    course.value.chapters = updatedChapter
    isEditing.value = false
    notification.success('更新成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    emit('loadingEnd')
  }
}

async function handleDelete(courseId: string, chapterId: string, lessonId: string) {
  if (!chapterId) return
  const isConfirm = await confirm('刪除課堂', '將連同內容一起刪除')
  if (!isConfirm) return
  try {
    emit('loadingStart')
    const { updatedChapter } = await app.$api.course.deleteLesson(courseId, chapterId, lessonId)
    course.value.chapters = updatedChapter
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
      handleDelete(route.params.courseId as string, props.chapterId, props.id)
      break
    default:
  }
}
</script>
<style lang="scss"></style>
