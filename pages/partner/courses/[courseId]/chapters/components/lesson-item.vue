<template>
  <div
    :data-id="id"
    class="transition-base flex h-15 w-full items-center rounded-1 px-6 hover:bg-gray-600/30"
  >
    <div class="flex-shrink-0 cursor-grab pr-6">
      <i class="lesson-handler icon-reorder transition-base text-white/50 hover:text-white"></i>
    </div>
    <div class="flex-1">
      <transition name="fade" mode="out-in">
        <in-input v-if="isEditing" v-model="title" class="text-black" @keyup.enter="handleEdit" />
        <div v-else>
          <nuxt-link
            :to="`/partner/courses/${$route.params.courseId}/${chapterId}/${id}`"
            class="text-fs-6 group relative inline-block"
          >
            <p class="line-clamp-1 text-white hover:text-white/80">{{ value }}</p>
            <div
              class="transition-base absolute bottom-0 left-0 h-2px w-full origin-left scale-x-0 bg-white/80 group-hover:scale-x-100"
            ></div>
          </nuxt-link>
        </div>
      </transition>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="isEditing" class="flex flex-shrink-0 items-center gap-5 pl-6">
        <button
          class="transition-base flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-white/20"
          @click="handleEdit"
        >
          <i class="icon-check"></i>
        </button>
        <button
          class="transition-base flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-white/20"
          @click="isEditing = false"
        >
          <i class="icon-close"></i>
        </button>
      </div>
      <div v-else class="flex flex-shrink-0 items-center gap-5 pl-6">
        <in-select :value="freePreview" :options="freePreviewOptions" @select="handleFreePreview" />
        <in-select :value="publish" :options="publishOptions" @select="handlePublish" />
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
      </div>
    </transition>
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
const { currentCourse: course, isLoading } = storeToRefs(useEditCourse())

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
  },
  freePreview: {
    type: Boolean,
    required: true
  }
})

const title = ref('')
const isEditing = ref(false)
const publishOptions: Option[] = [
  {
    label: '發布',
    value: true
  },
  {
    label: '未發布',
    value: false
  }
]
const freePreviewOptions: Option[] = [
  {
    label: '開放試看',
    value: true
  },
  {
    label: '關閉試看',
    value: false
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
    const { updatedChapter } = await app.$api.course.updateLesson({
      courseId: route.params.courseId as string,
      chapterId: props.chapterId,
      lessonId: props.id,
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

async function handlePublish(isPublish: boolean) {
  const confirmTitle = props.publish ? '取消發布' : '發布課堂'
  const confirmMessage = props.publish ? '所有學生都將看不到該課堂' : '將會把該課堂向所有學生公開'
  const isConfirm = await confirm(confirmTitle, confirmMessage)
  if (!isConfirm) return
  isLoading.value = true
  try {
    const { updatedChapter } = await app.$api.course.updateLesson({
      courseId: route.params.courseId as string,
      chapterId: props.chapterId,
      lessonId: props.id,
      isPublish,
      field: 'isPublish'
    })
    course.value.chapters = updatedChapter
    notification.success('更新成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}
async function handleFreePreview(isFreePreview: boolean) {
  const confirmTitle = props.freePreview ? '關閉試看' : '開放試看'
  const confirmMessage = props.freePreview
    ? '沒有購買的學生都將看不到該課堂'
    : '將會把該課堂向所有學生公開'
  const isConfirm = await confirm(confirmTitle, confirmMessage)
  if (!isConfirm) return
  isLoading.value = true
  try {
    const { updatedChapter } = await app.$api.course.updateLesson({
      courseId: route.params.courseId as string,
      chapterId: props.chapterId,
      lessonId: props.id,
      freePreview: isFreePreview,
      field: 'freePreview'
    })
    course.value.chapters = updatedChapter
    notification.success('更新成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}
</script>
<style lang="scss">
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.1s linear;
}
</style>
