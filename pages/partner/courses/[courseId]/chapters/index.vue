<template>
  <div class="relative">
    <draggable
      v-model="course.chapters"
      item-key="_id"
      handle=".chapter-handler"
      @end="handleSort($event, 'chapter')"
    >
      <template #item="{ element: chapter }">
        <div :data-id="chapter._id" class="chapter">
          <in-card border class="flex" :border-radius="4">
            <div class="flex-shrink-0 border-r border-solid border-white/50 px-4">
              <div class="flex h-15 items-center">
                <i class="chapter-handler icon-reorder text-white"></i>
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
                @end="handleSort($event, 'lesson', chapter.id)"
              >
                <template #item="{ element: lesson }">
                  <lesson-item
                    :id="lesson._id"
                    :value="lesson.title"
                    :publish="lesson.isPublish"
                    @loading-start="isLoading = true"
                    @loading-end="isLoading = false"
                  />
                </template>
              </draggable>
              <div class="py-2 text-center">
                <in-btn size="small" ghost>新增課程</in-btn>
              </div>
            </div>
          </in-card>
        </div>
      </template>
    </draggable>
    <div class="mt-5 text-center">
      <in-btn @click="showCreatePopup('chapter')">新增章節</in-btn>
    </div>
    <transition name="loading">
      <div
        v-if="isLoading"
        class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/80"
      >
        <in-spin :size="40" color="#fff" />
      </div>
    </transition>
    <in-popup :show="!!currentPopupType" :size="640">
      <in-container>
        <in-card class="w-full p-8">
          <h2 class="text-h2 font-bold text-white">
            {{ currentPopupType === 'chapter' ? '新增章節' : '新增課堂' }}
          </h2>
          <in-input
            v-model="currentItemTitle"
            class="mt-5 text-black"
            :placeholder="currentPopupType === 'chapter' ? '請輸入章節標題' : '請輸入課堂標題'"
          />
          <div class="mt-6 flex items-center justify-end gap-5">
            <in-btn ghost size="small" @click="closeCreatePopup">取消</in-btn>
            <in-btn
              size="small"
              @click="createItem(currentPopupType, currentItemTitle, currentChapterId)"
              >確定</in-btn
            >
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
const { currentCourse: course } = storeToRefs(useEditCourse())
const { notification } = useNotification()
const isLoading = ref(false)

async function handleSort(event: any, type: ItemType, chapterId?: string) {
  isLoading.value = true

  try {
    const targetId = (event?.item as HTMLDivElement)?.dataset?.id
    if (!targetId) return

    if (type === 'chapter') {
      const targetChapter = course.value.chapters
        .map((chapter, index) => ({
          chapterId: chapter._id,
          courseId: route.params.courseId as string,
          sort: index + 1,
          field: 'sort'
        }))
        .find((chapter) => chapter.chapterId === targetId)
      if (!targetChapter) return
      await app.$api.course.sortChapter(targetChapter)
      // course.value.chapters.forEach((chapter, index) => (chapter.sort = index + 1)) 前端拖拉後的陣列位置是對的就先不用再跑這段，後端會判斷由前往後 or 由後往前拖拉去更新實際的 sort 值
    }

    if (type === 'lesson') {
      if (!chapterId) return
      const targetChapter = course.value.chapters.find((chapter) => chapter._id === chapterId)
      console.log(
        targetChapter?.lessons.map((lesson, index) => ({
          id: lesson._id,
          sort: index + 1
        }))
      )
    }
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
  try {
    if (type === 'chapter') {
      const { updatedChapter } = await app.$api.course.createChapter(
        route.params.courseId as string,
        title
      )
      course.value.chapters = updatedChapter
    }
    if (chapterId && type === 'lesson') {
      console.log(chapterId)
    }
    notification.success('新增成功')
    closeCreatePopup()
  } catch (error) {
    notification.error((error as Error).message)
  }
}
</script>

<style lang="scss" scoped>
.chapter-handler,
.lesson-handler {
  cursor: grab;
}

.chapter {
  &:not(:last-child) {
    @apply mb-5;
  }
}
</style>
