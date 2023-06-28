<template>
  <Title>章節管理 - Inskill</Title>
  <div class="relative">
    <draggable
      v-if="course.chapters.length"
      v-model="course.chapters"
      item-key="_id"
      handle=".chapter-handler"
      @end="sortChapter"
    >
      <template #item="{ element: chapter }">
        <div :data-id="chapter._id" class="chapter mb-5 last:mb-0">
          <in-card border class="flex" :border-radius="4">
            <div class="flex-shrink-0 border-r border-solid border-white/50 px-4">
              <div class="chapter-handler flex h-15 cursor-grab items-center">
                <i class="icon-reorder transition-base text-white/70 hover:text-white"></i>
              </div>
            </div>
            <div class="flex-1">
              <chapter-item
                :id="chapter._id"
                :value="chapter.title"
                @loading-start="isLoading = true"
                @loading-end="isLoading = false"
              />
              <draggable
                v-if="chapter.lessons && chapter.lessons.length !== 0"
                v-model="chapter.lessons"
                item-key="_id"
                handle=".lesson-handler"
                @end="sortLesson($event, chapter._id)"
              >
                <template #item="{ element: lesson }">
                  <lesson-item
                    :id="lesson._id"
                    :chapter-id="chapter._id"
                    :value="lesson.title"
                    :publish="lesson.isPublish"
                    @loading-start="isLoading = true"
                    @loading-end="isLoading = false"
                  />
                </template>
              </draggable>
              <div class="border-t border-solid border-white/50 py-2 text-center">
                <in-btn size="small" ghost @click="showCreatePopup('lesson', chapter._id)"
                  >新增課堂</in-btn
                >
              </div>
            </div>
          </in-card>
        </div>
      </template>
    </draggable>
    <p class="mt-[30vh] text-center text-h3 font-bold opacity-50">尚未創建章節</p>
    <div class="mt-5 text-center">
      <in-btn @click="showCreatePopup('chapter')">新增章節</in-btn>
    </div>
    <in-popup :show="!!currentPopupType" :size="640">
      <in-container>
        <in-card class="w-full p-8">
          <h2 class="text-h2 font-bold text-white">
            {{ currentPopupType === 'chapter' ? '新增章節' : '新增課堂' }}
          </h2>
          <in-input
            v-model="currentItemTitle"
            :disabled="isLoading"
            class="mt-5 text-black"
            :placeholder="currentPopupType === 'chapter' ? '請輸入章節標題' : '請輸入課堂標題'"
          />
          <div class="mt-6 flex items-center justify-end gap-5">
            <in-btn :disabled="isLoading" ghost size="small" @click="closeCreatePopup">取消</in-btn>
            <in-btn
              :disabled="isLoading"
              size="small"
              @click="createItem(currentPopupType, currentItemTitle, currentChapterId)"
            >
              確定
            </in-btn>
          </div>
        </in-card>
      </in-container>
    </in-popup>
  </div>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import { storeToRefs } from 'pinia'
import ChapterItem from './components/chapter-item.vue'
import LessonItem from './components/lesson-item.vue'
import useNotification from '~/stores/useNotification'
import useEditCourse from '~/stores/useEditCourse'

type ItemType = 'chapter' | 'lesson'

const app = useNuxtApp()
const route = useRoute()
const { currentCourse: course, isLoading } = storeToRefs(useEditCourse())
const { notification } = useNotification()

async function sortChapter(event: any) {
  isLoading.value = true
  try {
    const targetId = (event?.item as HTMLDivElement)?.dataset?.id
    if (!targetId) return
    course.value.chapters.forEach((chapter, index) => (chapter.sort = index + 1))
    const targetChapter = course.value.chapters.find((chapter) => chapter._id === targetId)
    if (!targetChapter) return
    await app.$api.course.updateChapter({
      courseId: route.params.courseId as string,
      chapterId: targetChapter._id,
      sort: targetChapter.sort,
      field: 'sort'
    })
    notification.success('更新成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}

async function sortLesson(event: any, chapterId: string) {
  isLoading.value = true
  try {
    const targetId = (event?.item as HTMLDivElement)?.dataset?.id
    if (!targetId) return

    const targetChapter = course.value.chapters.find((chapter) => chapter._id === chapterId)
    if (!targetChapter) return
    targetChapter.lessons.forEach((lesson, index) => (lesson.sort = index + 1))
    const targetLesson = targetChapter.lessons.find((chapter) => chapter._id === targetId)
    if (!targetLesson) return
    const { updatedChapter } = await app.$api.course.updateLesson({
      courseId: route.params.courseId as string,
      chapterId,
      lessonId: targetLesson._id,
      sort: targetLesson.sort,
      field: 'sort'
    })
    course.value.chapters = updatedChapter

    notification.success('更新成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}

const currentPopupType = ref<ItemType | ''>('')
const currentChapterId = ref('')
const currentItemTitle = ref('')

function showCreatePopup(type: ItemType, chapterId = '') {
  if (type === 'lesson' && !chapterId) return
  currentPopupType.value = type
  currentChapterId.value = chapterId
}
function closeCreatePopup() {
  currentPopupType.value = ''
  currentItemTitle.value = ''
  currentChapterId.value = ''
}

async function createItem(type: ItemType | '', title: string, chapterId?: string) {
  if (!type || !title) return
  const courseId = (route.params.courseId as string) ?? ''
  if (!courseId) return
  isLoading.value = true
  try {
    if (type === 'chapter') {
      const { updatedChapter } = await app.$api.course.createChapter(courseId, title)
      course.value.chapters = updatedChapter
    }
    if (chapterId && type === 'lesson') {
      const { updatedChapter } = await app.$api.course.createLesson(courseId, chapterId, title)
      course.value.chapters = updatedChapter
    }
    notification.success('新增成功')
    closeCreatePopup()
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}
</script>
