<template>
  <div class="gradient my-10 rounded-lg p-4 px-6">
    <h2 class="text-2xl font-bold">授課講師</h2>

    <div class="flex pl-4 pt-4">
      <div class="avatar w-1/6 overflow-hidden rounded-full">
        <img
          v-if="teacher.thumbnail.length"
          class="h-[100px] w-[150px] object-cover"
          :src="teacher.thumbnail"
          alt="avatar"
        />

        <svg
          v-else
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
      </div>

      <div class="ml-4 w-full">
        <h2 class="mb-2 text-xl font-bold">{{ props.teacher.name }}</h2>
        <!-- <p>
          冰而雲黃游抱哪奶校，雨手嗎回小鼻常禾草民「目雞停苦發訴人比」不現今美白寫即世汗根又麼兒候面奶新昌月：女兩後念，兌這條同給圓嗎喜出布。
          巴目包辛正幼戊子來唱都間詞月兩卜貝乙詞：尺空字王音步動爬亭合開放生。
        </p> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  teacher: {
    type: null,
    default: {
      name: '講師名稱',
      thumbnail: ''
    }
  }
})
</script>
