<template>
  <div class="mb-10">
    <h1 class="mb-4 text-3xl font-bold">{{ currentCourse.title }}</h1>
    <span class="flex items-center py-1">
      <svg
        class="w-[20px]"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 20 20"
      >
        <g fill="none">
          <path
            d="M10 2a8 8 0 1 1 0 16a8 8 0 0 1 0-16zm0 1a7 7 0 1 0 0 14a7 7 0 0 0 0-14zm-.5 2a.5.5 0 0 1 .492.41L10 5.5V10h2.5a.5.5 0 0 1 .09.992L12.5 11h-3a.5.5 0 0 1-.492-.41L9 10.5v-5a.5.5 0 0 1 .5-.5z"
            fill="currentColor"
          ></path>
        </g>
      </svg>

      <span class="mr-auto"
        >章節數量: {{ currentCourse.chapters?.length }}章 {{ getTotalLessons }}節</span
      >
      <span v-if="!purchased" class="text-2xl font-bold">NT$ {{ currentCourse.price }}</span>
    </span>

    <span class="border-bottom mt-1 flex items-center pb-2">
      <svg
        class="mr-4 w-[15px]"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 448 512"
      >
        <path
          d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
          fill="currentColor"
        ></path>
      </svg>

      <span class="mr-auto">{{ currentCourse.purchasedCount }}人已加入</span>

      <button
        v-if="!purchased"
        class="rounded border border-white bg-white px-3 text-black"
        type="button"
      >
        加入購物車
      </button>
    </span>

    <div class="py-4">{{ currentCourse.description }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  currentCourse: {
    type: null,
    default: {}
  },
  purchased: {
    type: Boolean,
    default: false
  }
})

// 計算全部章節的課程總數
const getTotalLessons = computed(() => {
  const total = props.currentCourse.chapters?.reduce(
    (accumulator: number, chapter: any) => accumulator + chapter.lessons.length,
    0
  )

  return total
})
</script>
