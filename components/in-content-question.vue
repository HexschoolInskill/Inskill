<template>
  <div class="border-bottom flex">
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
    </div>

    <div class="w-full">
      <h2>使用者名稱</h2>
      <p>{{ props.question.comment }}</p>

      <div class="my-4 flex">
        <button class="mr-4 flex w-[100px] items-center" type="button" @click="openReplyBox">
          <svg
            class="w-1/6"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 16 16"
          >
            <g fill="none">
              <path
                d="M4.31 8l2.256 2.256a.75.75 0 0 1-.977 1.133l-.084-.073l-3.536-3.535l-.068-.08l-.04-.058l-.05-.095l-.033-.092l-.015-.067l-.01-.062l-.003-.094l.004-.059l.015-.094l.03-.1l.047-.098l.035-.055a.747.747 0 0 1 .088-.107l-.068.079a.753.753 0 0 1 .068-.079l3.536-3.535a.75.75 0 0 1 1.133.976l-.072.084L4.31 6.5H8c3.651 0 6.132 2.077 6.246 5.037l.004.213a.75.75 0 0 1-1.5 0c0-2.128-1.692-3.658-4.493-3.746L8 8H4.31l2.256 2.256L4.31 8z"
                fill="currentColor"
              ></path>
            </g>
          </svg>

          <span class="w-4/6">回復</span>
        </button>
        <button class="flex w-[100px] items-center" type="button">
          <svg
            class="w-1/6"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 16 16"
          >
            <g fill="none">
              <path
                d="M1 4.5A2.5 2.5 0 0 1 3.5 2h9A2.5 2.5 0 0 1 15 4.5v5a2.5 2.5 0 0 1-2.5 2.5H8.688l-3.063 2.68A.98.98 0 0 1 4 13.942V12h-.5A2.5 2.5 0 0 1 1 9.5v-5zM3.5 3A1.5 1.5 0 0 0 2 4.5v5A1.5 1.5 0 0 0 3.5 11H5v2.898L8.312 11H12.5A1.5 1.5 0 0 0 14 9.5v-5A1.5 1.5 0 0 0 12.5 3h-9z"
                fill="currentColor"
              ></path>
            </g>
          </svg>

          <span class="w-4/6">共{{ props.question.reply.length }}則</span>
        </button>
      </div>
    </div>
  </div>

  <div v-if="addReply" class="m-6">
    <textarea
      id="new_question"
      v-model="newReply"
      class="w-full rounded-lg bg-[#DEE2E6] p-2 text-black"
      name="new_question"
      cols="30"
      rows="5"
      placeholder="喜歡這堂課嗎? 購買課程後可以和大家已起討論囉!"
    >
    </textarea>

    <div class="flex">
      <button class="my-2 ml-auto w-[150px] rounded border p-2" type="button" @click="closeReply">
        取消
      </button>
      <button
        class="my-2 ml-2 w-[150px] rounded border bg-white p-2 text-black"
        :class="{ 'bg-gray': !newReply.length }"
        type="button"
        :disabled="!newReply.length"
        @click="emit('addReply', newReply)"
      >
        送出
      </button>
    </div>
  </div>

  <div v-for="reply in props.question.reply" :key="reply.comment" class="flex px-6 pt-4">
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

      <!-- <span>講師</span> -->
    </div>

    <div class="w-full">
      <h2>使用者名稱</h2>
      <p>{{ reply.comment }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  question: {
    type: null,
    default: {}
  }
})

const emit = defineEmits(['addReply'])

const addReply = ref(false)
const newReply = ref('')

// 開啟回復的輸入框
const openReplyBox = () => {
  addReply.value = true
}

// 關閉回復的輸入框
const closeReply = () => {
  addReply.value = false
}
</script>
