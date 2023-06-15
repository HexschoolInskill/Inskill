<template>
  <div class="absolute top-6 h-full w-full bg-black pt-10" :class="{ hidden: !props.open }">
    <div class="mx-auto w-8/12 rounded-lg bg-white p-10 pb-4 pt-8 text-center text-black">
      <button
        type="button"
        class="fixed right-[26.5vw] top-[19.5vh] w-8"
        @click="emit('update:open', !props.open)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32 32"
        >
          <path
            d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
      <h1 class="text-3xl font-bold">評價課程</h1>

      <div class="my-4 flex justify-center">
        <svg
          v-for="i in 5"
          :key="i"
          class="tempStar w-8 cursor-pointer transition-all"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 16 16"
          @mouseover="newReview.star = i"
          @mouseleave="newReview.star = 0"
          @click="setStar(i)"
        >
          <g fill="none">
            <path
              d="M7.194 2.101a.9.9 0 0 1 1.614 0l1.521 3.082l3.401.495a.9.9 0 0 1 .5 1.535l-2.462 2.399l.581 3.387a.9.9 0 0 1-1.306.949l-3.042-1.6l-3.042 1.6a.9.9 0 0 1-1.306-.949l.58-3.387l-2.46-2.4a.9.9 0 0 1 .499-1.534l3.4-.495l1.522-3.082z"
              :fill="i - 1 < newReview.star ? '#FFC107' : '#DEE2E6'"
            ></path>
          </g>
        </svg>
      </div>

      <textarea
        v-model="newReview.comment"
        class="w-full rounded-lg bg-[#DEE2E6] p-2"
        cols="30"
        rows="5"
        placeholder="留下你對課程的評語吧"
      >
      </textarea>

      <button
        class="my-4 w-[100px] rounded bg-black p-1 text-white"
        type="button"
        @click="emit('submitReview', newReview)"
      >
        送出
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:open', 'submitReview'])

const newReview = ref({
  star: 0,
  comment: ''
})

// 標記評價星星
const setStar = (i: number) => {
  newReview.value.star = i
}
</script>
