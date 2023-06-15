<template>
  <div v-if="!showChatRoom" @click="() => (showChatRoom = !showChatRoom)">
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
  </div>

  <div v-else>
    <div class="mb-4 h-[60vh] rounded-lg bg-white p-4 py-6">
      <ul v-for="msg in props.chatroomMessage" :key="msg">
        <li>{{ msg }}</li>
      </ul>
    </div>

    <input v-model="newChatMessage" class="w-full" type="text" placeholder="enter 送出文字內容" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  chatroomMessage: {
    type: null,
    default: []
  }
})

const showChatRoom = ref(false)
const newChatMessage = ref('')
</script>
