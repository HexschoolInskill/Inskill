<template>
  <div class="">
    <!-- <h1 class="section-title">課程編輯</h1> -->

    <Draggable
      v-if="currentCourse.chapters.length"
      v-model="currentCourse.chapters"
      item-key="id"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element }">
        <div class="flex">
          <div class="handle"></div>
          <div class="chapter">
            <div v-if="!element.title.length" class="flex">
              <input v-model="element.title" type="text" />
              <button>取消</button>
              <button>確定</button>
            </div>

            <div v-else>{{ element.title }}</div>

            <div class="lesson">
              <div v-if="!element.lessons.length">
                <button>新增課程</button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Draggable>

    <div v-else class="px-20 pb-[30vh] pt-[30vh] text-center">
      <div class="relative rounded border border-dotted bg-gray-900 p-5">
        <h1 class="text-3xl font-bold">開始建立章節</h1>
        <p class="">管理您的課程章節與課程內容</p>

        <button
          class="my-4 rounded bg-black px-10 py-1 text-white"
          type="button"
          @click="createNewChapter"
        >
          建立章節
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Draggable from 'vuedraggable'
import { storeToRefs } from 'pinia'
import coursesStore from '~/stores/useCourses'

definePageMeta({
  layout: 'create-courses'
})

const drag = ref(false)

const store: any = storeToRefs(coursesStore())

const { currentCourse } = store

// console.log(currentCourse)

const createNewChapter = () => {
  currentCourse.value.chapters.push({
    title: '',
    description: '',
    sort: currentCourse.value.chapters.length,
    lessons: []
  })

  console.log(currentCourse.value.chapters)
}
</script>
