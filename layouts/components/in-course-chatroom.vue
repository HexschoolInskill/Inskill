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
      class="relative mb-4 mt-2 h-[60vh] overflow-hidden rounded-lg bg-white px-3 text-black max-[1536px]:h-[55vh]"
    >
      <p class="border-bottom relative z-10 py-2 text-center">聊天室</p>
      <!-- TODO: 開始限制長度後，新增訊息時滾動到底端 -->
      <ul
        id="chatroom-box"
        class="absolute bottom-0 max-h-[540px] w-full overflow-y-auto max-[1536px]:max-h-[370px]"
      >
        <li v-for="msg in props.chatroomMessage" :key="msg" class="my-1 flex items-center">
          <span class="mr-1 flex items-center p-1 text-black" :style="{ color: `#${randomColor}` }">
            {{ msg.username }}
            <svg
              v-if="msg.isTeacher"
              class="ml-1 w-[20px]"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              enable-background="new 0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M215.4,145.5c-2.2-1.1-4.6-1.6-6.9-1.6c-3.6,0-7.1,1.2-10,3.5L133.3,200H80.5c-8.8,0-16,7.2-16,16v80c0,8.8,7.2,16,16,16
    h52.8l65.2,52.5c2.9,2.3,6.5,3.5,10,3.5c2.3,0,4.7-0.5,6.9-1.6c5.6-2.7,9.1-8.3,9.1-14.4V160C224.5,153.8,221,148.2,215.4,145.5z"
                  fill="currentColor"
                ></path>
                <path
                  d="M447.5,256c0-59.3-23.2-114.8-65.4-156.5c-4.7-4.7-12.3-4.6-17,0.1c-4.7,4.7-4.6,12.3,0.1,17
    c37.6,37.1,58.2,86.6,58.2,139.4c0,0,0,0,0,0c0,0,0,0,0,0c0,52.8-20.7,102.3-58.2,139.4c-4.7,4.7-4.8,12.3-0.1,17
    c2.3,2.4,5.4,3.6,8.5,3.6c3,0,6.1-1.2,8.4-3.5C424.3,370.9,447.5,315.3,447.5,256C447.5,256,447.5,256,447.5,256
    C447.5,256,447.5,256,447.5,256z"
                  fill="currentColor"
                ></path>
                <path
                  d="M384.9,256C384.9,256,384.9,256,384.9,256c0-43.5-16.6-84.3-46.8-114.9c-4.7-4.7-12.3-4.8-17-0.1c-4.7,4.7-4.8,12.3-0.1,17
    c25.7,26.1,39.9,60.9,39.9,98.1c0,0,0,0,0,0s0,0,0,0c0,37.2-14.2,72-39.9,98.1c-4.7,4.7-4.6,12.3,0.1,17c2.3,2.3,5.4,3.5,8.4,3.5
    c3.1,0,6.2-1.2,8.5-3.6C368.2,340.3,384.9,299.5,384.9,256C384.9,256,384.9,256,384.9,256z"
                  fill="currentColor"
                ></path>
                <path
                  d="M287.5,182.5c-4.7-4.7-12.3-4.8-17-0.1c-4.7,4.7-4.8,12.3-0.1,17c14.8,15,23,35.1,23,56.6c0,0,0,0,0,0s0,0,0,0
    c0,21.4-8.2,41.5-23,56.6c-4.7,4.7-4.6,12.3,0.1,17c2.3,2.3,5.4,3.5,8.4,3.5c3.1,0,6.2-1.2,8.5-3.6c19.3-19.6,29.9-45.6,29.9-73.4
    c0,0,0,0,0,0s0,0,0,0C317.4,228.2,306.8,202.1,287.5,182.5z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </span>
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
import { ref, watch, computed } from 'vue'

const props = defineProps({
  chatroomMessage: {
    type: null,
    default: []
  }
})

const emit = defineEmits(['update:chatroomMessage'])
const newChatMessage = ref('')

watch(
  () => props.chatroomMessage,
  (newMessage: any) => {
    // console.log(newMessage)
    if (newMessage) {
      console.log()
      const chatroomBox: any = document.getElementById('chatroom-box')
      // console.log(chatroomBox.scrollHeight)
      chatroomBox.scroll({ top: chatroomBox.scrollHeight, behavior: 'smooth' })
    }
  },
  { deep: true }
)

const randomColor = computed(() => {
  return Math.floor(Math.random() * 16777215).toString(16)
})

const submitComment = () => {
  if (newChatMessage.value.length) {
    emit('update:chatroomMessage', newChatMessage.value)
    newChatMessage.value = ''
  }
}
</script>
