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
        <div>
          {{ element }}
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
import coursesStore from '~/stores/courses'

definePageMeta({
  layout: 'create-courses'
})

const drag = ref(false)

const store: any = storeToRefs(coursesStore())

const { currentCourse } = store

console.log(currentCourse)

const createNewChapter = () => {
  currentCourse.value.chapters.push({
    title: '新章節',
    description: '',
    sort: currentCourse.value.chapters.length,
    lessons: []
  })

  console.log(currentCourse.value.chapters)
}
</script>
