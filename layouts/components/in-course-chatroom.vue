<template>
  <!-- <div v-if="!showChatRoom" @click="() => (showChatRoom = !showChatRoom)">
    <svg
      class="w-[100px]"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
    >
      <path
        d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
        fill="currentColor"
      ></path>
    </svg>
  </div> -->

  <div>
    <div
      class="relative mb-4 mt-2 h-[60vh] overflow-hidden rounded-lg bg-white p-3 text-black max-[1536px]:h-[55vh]"
    >
      <ul class="absolute bottom-0 h-full w-full overflow-y-scroll">
        <li v-for="msg in props.chatroomMessage" :key="msg" class="mt-auto flex">
          <span
            class="mr-1 text-black"
            :class="{ 'rounded bg-black px-1 text-white': msg.userId === currentCourse.teacherId }"
            >{{ msg.username }}</span
          >
          :
          <span class="ml-1">{{ msg.comment }}</span>
        </li>
      </ul>
    </div>

    <input
      v-model="newChatMessage"
      class="w-full rounded p-1 text-black"
      type="text"
      placeholder="enter 送出文字內容"
      @keypress.enter="submitComment"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useCourses from '~/stores/useCourses'

const props = defineProps({
  chatroomMessage: {
    type: null,
    default: []
  }
})

const emit = defineEmits(['update:chatroomMessage'])

// const showChatRoom = ref(false)
const { currentCourse } = storeToRefs(useCourses())
const newChatMessage = ref('')

const submitComment = () => {
  if (newChatMessage.value.length) {
    emit('update:chatroomMessage', newChatMessage.value)
    newChatMessage.value = ''
  }
}
</script>
