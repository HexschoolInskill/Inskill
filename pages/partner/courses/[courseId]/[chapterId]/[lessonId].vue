<template>
  <Title>{{ lesson?.title ?? '課堂內容' }} - Inskill</Title>
  <div class="flex items-start gap-10">
    <div class="flex-1">
      <in-card border :border-radius="4">
        <div
          class="flex items-center justify-between gap-10 border border-solid border-white/50 p-6"
        >
          <h3 class="text-h3 font-bold">{{ lesson?.title }}</h3>
          <div class="flex items-center gap-5">
            <in-btn size="small" @click="isComponentListShow = true">新增內容</in-btn>
            <in-select
              :value="lesson?.isPublish"
              :options="publishOptions"
              @select="handlePublish"
            />
            <in-select
              :value="lesson?.freePreview"
              :options="freePreviewOptions"
              @select="handleFreePreview"
            />
          </div>
        </div>
        <draggable v-model="contents" handle=".content-handler" item-key="_id" @end="sortContent">
          <template #item="{ element: item }">
            <content-item
              :data="item"
              @edit="openEditModal(item)"
              @delete="deleteContent(item._id)"
            />
          </template>
        </draggable>
        <div class="py-5 text-center">
          <in-btn size="small" @click="isComponentListShow = true">新增內容</in-btn>
        </div>
      </in-card>
    </div>
    <div class="sticky top-15 max-w-[400px] flex-1 flex-shrink-0">
      <transition name="slide-up" mode="out-in">
        <component-list
          v-if="isComponentListShow"
          @add="showModal"
          @close="isComponentListShow = false"
        />
      </transition>
    </div>
    <in-popup :show="!!modalType" :size="1280" @click="closeModal">
      <in-card
        class="mx-auto w-full px-4 py-8"
        :class="modalType === 'text' || modalType === 'code' ? 'max-w-[1280px]' : 'max-w-[720px]'"
        @click.stop
      >
        <in-container>
          <h3 class="text-h3 font-bold text-white">
            <span v-if="modalType === 'text'">文字編輯器</span>
            <span v-if="modalType === 'code'">程式碼範例</span>
            <span v-if="modalType === 'video'">影片</span>
            <span v-if="modalType === 'pdf'">PDF預覽</span>
          </h3>
          <div class="mt-5">
            <in-editor
              v-if="modalType === 'text'"
              v-model="currentEditingContent"
              class="w-full"
              :height="480"
            />
            <in-code-editor v-if="modalType === 'code'" v-model="currentEditingContent" />
            <label
              v-if="modalType === 'pdf' || modalType === 'video'"
              class="transition-base group flex h-[320px] cursor-pointer flex-col items-center justify-center rounded-4 border-2 border-solid border-white hover:border-purple-700"
              :class="{ '!border-purple-700': isUploaderDragover }"
              @dragenter.stop.prevent="isUploaderDragover = true"
              @dragover.stop.prevent
              @dragleave.stop.prevent="isUploaderDragover = false"
              @drop.stop.prevent="handleUploaderDrop"
            >
              <input type="file" class="hidden" @change="handleUploaderClick" />
              <template v-if="isLoading">
                <p class="text-whit text-fs-5">檔案上傳中...</p>
              </template>
              <template v-else>
                <i
                  class="icon-upload transition-base text-[32px] group-hover:-translate-y-2"
                  :class="{ '!-translate-y-2': isUploaderDragover }"
                ></i>
                <p class="mt-2 text-fs-5 text-white">檔案數量最多1個，最大100MB</p>
              </template>
            </label>
          </div>
          <div
            v-if="modalType === 'text' || modalType === 'code'"
            class="mt-5 flex items-center justify-end gap-5"
          >
            <in-btn ghost size="small" @click="closeModal">取消</in-btn>
            <in-btn
              v-if="currentContentObj"
              size="small"
              @click="updateContent(currentContentObj._id, modalType, currentEditingContent)"
              >更新</in-btn
            >
            <in-btn v-else size="small" @click="addContent(modalType, currentEditingContent)"
              >儲存</in-btn
            >
          </div>
        </in-container>
      </in-card>
    </in-popup>
  </div>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import { storeToRefs } from 'pinia'
import ComponentList from './components/component-list.vue'
import ContentItem from './components/content-item.vue'
import useNotification from '~/stores/useNotification'
import useConfirm from '~/stores/useConfirm'
import useEditCourse from '~/stores/useEditCourse'
import { LessonContentType, LessonContent } from '@/http/modules/lessonContent'

const app = useNuxtApp()
const route = useRoute()
const courseId = route.params.courseId as string
const chapterId = route.params.chapterId as string
const lessonId = route.params.lessonId as string
const {
  currentCourse: course,
  currentLesson: lesson,
  currentContents: contents,
  isLoading
} = storeToRefs(useEditCourse())
const { notification } = useNotification()
const { confirm } = useConfirm()

lesson.value =
  course.value.chapters
    .find((chapter) => chapter._id === chapterId)
    ?.lessons.find((lesson) => lesson._id === lessonId) ?? null
contents.value = lesson.value?.lessonContent ?? []

watch(
  course,
  (course) => {
    lesson.value =
      course.chapters
        .find((chapter) => chapter._id === chapterId)
        ?.lessons.find((lesson) => lesson._id === lessonId) ?? null
    contents.value = lesson.value?.lessonContent ?? []
  },
  { deep: true }
)

const modalType = ref<LessonContentType | ''>('')
const currentContentObj = ref<LessonContent | null>(null)
const currentEditingContent = ref('')
const isComponentListShow = ref(false)
const isUploaderDragover = ref(false)

const publishOptions = [
  {
    label: '發布',
    value: true
  },
  {
    label: '未發布',
    value: false
  }
]
const freePreviewOptions = [
  {
    label: '開放試看',
    value: true
  },
  {
    label: '關閉試看',
    value: false
  }
]
// const options: Option[] = [
//   {
//     label: '重新命名',
//     value: 'rename'
//   },
//   {
//     label: '刪除課堂',
//     value: 'delete'
//   }
// ]
function showModal(type: LessonContentType) {
  currentEditingContent.value = ''
  modalType.value = type
}

function getEventFile(event: Event): File | undefined {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  return file
}
function checkFileSize(file: File, limit: number) {
  return file.size < limit
}

async function addContent(contentType: LessonContentType, content: string | File) {
  console.log(contentType, content)
  if ((contentType === 'code' || contentType === 'text') && typeof content !== 'string') return
  if ((contentType === 'pdf' || contentType === 'video') && content instanceof File) {
    if (!checkFileSize(content, 100 * 1024 * 1024)) {
      notification.error('檔案最大100MB')
      return
    }
  }

  isLoading.value = true
  try {
    const { updatedLessonContent } = await app.$api.lessonContent.addContent({
      lessonId,
      content,
      contentType
    })
    contents.value = updatedLessonContent
    notification.success('新增成功')
    closeModal()
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}
function openEditModal(content: LessonContent) {
  modalType.value = content.contentType
  currentContentObj.value = content
  if (content.contentType === 'code' || content.contentType === 'text') {
    currentEditingContent.value = content.content
  }
}

async function updateContent(
  contentId: string,
  contentType: LessonContentType | 'sort',
  content: string | File
) {
  if ((contentType === 'code' || contentType === 'text') && typeof content !== 'string') return
  if ((contentType === 'pdf' || contentType === 'video') && content instanceof File) {
    if (!checkFileSize(content, 100 * 1024 * 1024)) {
      notification.error('檔案最大100MB')
      return
    }
  }

  isLoading.value = true
  try {
    const { updatedLessonContent } = await app.$api.lessonContent.updateContent({
      lessonContentId: contentId,
      lessonId,
      contentType,
      content
    })
    contents.value = updatedLessonContent
    notification.success('更新成功')
    closeModal()
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}
async function handlePublish(publish: boolean) {
  if (lesson.value?.isPublish === publish) return
  const confirmTitle = lesson.value?.isPublish ? '取消發布' : '發布課堂'
  const confirmMessage = lesson.value?.isPublish
    ? '所有學生都將看不到該課堂'
    : '將會把該課堂向所有學生公開'
  const isConfirm = await confirm(confirmTitle, confirmMessage)
  if (!isConfirm) return
  isLoading.value = true
  try {
    const { updatedChapter } = await app.$api.course.updateLesson({
      courseId,
      chapterId,
      lessonId,
      isPublish: publish,
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
  if (lesson.value?.freePreview === isFreePreview) return
  const confirmTitle = lesson.value?.freePreview ? '關閉試看' : '開放試看'
  const confirmMessage = lesson.value?.freePreview
    ? '沒有購買的學生都將看不到該課堂'
    : '將會把該課堂向所有學生公開'
  const isConfirm = await confirm(confirmTitle, confirmMessage)
  if (!isConfirm) return
  isLoading.value = true
  try {
    const { updatedChapter } = await app.$api.course.updateLesson({
      courseId: route.params.courseId as string,
      chapterId,
      lessonId,
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

async function sortContent(event: any) {
  const targetId = event.item?.dataset?.id || ''
  if (!targetId) return
  contents.value.forEach((content, index) => {
    content.sort = index + 1
  })
  const sort = contents.value.find((content) => content._id === targetId)?.sort || 0
  if (!sort) return
  isLoading.value = true
  try {
    await app.$api.lessonContent.updateContent({
      lessonContentId: targetId,
      lessonId,
      contentType: 'sort',
      content: sort
    })
    notification.success('更新成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}

async function deleteContent(contentId: string) {
  const isConfirm = await confirm('確定刪除內容?', '將刪除內容')
  if (!isConfirm) return
  isLoading.value = true
  try {
    await app.$api.lessonContent.deleteContent(lessonId, contentId)
    contents.value = contents.value.filter((content) => content._id !== contentId)
    notification.success('刪除成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}
function handleUploaderClick(event: Event) {
  const file = getEventFile(event)
  if (!file) return
  if (currentContentObj.value) {
    const { _id, contentType } = currentContentObj.value
    updateContent(_id, contentType, file)
  } else if (modalType.value) addContent(modalType.value, file)
}
function handleUploaderDrop(event: DragEvent) {
  const file = event.dataTransfer?.files?.[0]
  if (!file) return
  if (currentContentObj.value) {
    const { _id, contentType } = currentContentObj.value
    updateContent(_id, contentType, file)
  } else if (modalType.value) addContent(modalType.value, file)
}

function closeModal() {
  modalType.value = ''
  currentContentObj.value = null
  currentEditingContent.value = ''
}
</script>

<style lang="scss" scoped>
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: 0.3s ease-in-out;
}
</style>
