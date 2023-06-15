<template>
  <div class="gradient my-10 rounded-lg p-4 px-6">
    <h2 class="text-2xl font-bold">課程評價</h2>

    <div class="flex">
      <h1 class="mx-8 mt-4 text-4xl font-bold">{{ sumUpReviews.toFixed(1) }}</h1>

      <div>
        <in-content-star :stars="Math.floor(sumUpReviews)"></in-content-star>
        <p>{{ review.length }} 則評價</p>
      </div>
    </div>

    <div v-for="(i, index) in showReviews" :key="index" class="my-4 flex rounded-xl border p-4">
      <div class="avatar mr-4 w-1/6">
        <!-- <img src="" alt="avatar" /> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32 32"
        >
          <path
            d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z"
            fill="currentColor"
          ></path>
          <path
            d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z"
            fill="currentColor"
          ></path>
        </svg>
        <p class="text-center">{{ review[i - 1].username || '使用者名稱' }}</p>
      </div>

      <div class="mt-2 w-full">
        <in-content-star :stars="review[i - 1].rating"></in-content-star>

        <p>{{ review[i - 1].comment }}</p>
      </div>
    </div>

    <div v-if="review.length > showReviews" class="mb-8 mt-8 text-center">
      <button
        class="w-[150px] rounded bg-white py-1 text-black"
        type="button"
        @click="getMoreReviews"
      >
        查看更多
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

import inContentStar from './in-content-star.vue'

const props = defineProps({
  review: {
    type: null,
    default: []
  }
})

const showReviews = ref(props.review.length < 3 ? props.review.length : 3)

// 計算平均評價
const sumUpReviews = computed(() => {
  const total = props.review.reduce(
    (accumulator: number, currentReview: any) => accumulator + currentReview.rating,
    0
  )

  return total / props.review.length
})

// 載入更多評價
const getMoreReviews = () => {
  if (props.review.length < showReviews.value + 3) {
    showReviews.value = props.review.length
  } else {
    showReviews.value = showReviews.value + 3
  }
}
</script>
