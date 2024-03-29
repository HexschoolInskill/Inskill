<template>
  <!--課程內容介紹-->
  <div class="flex">
    <div class="w-9/12 max-[1536px]:mt-[4vh]" :class="{ 'w-11/12': currentCourse.chapters }">
      <div class="wrapper gradient rounded-lg p-4 px-6">
        <!-- <in-content-video v-if="currentCourse.videoUrl"></in-content-video> -->

        <div v-if="currentCourse.chapters === undefined" class="courseTitle w-full">
          <span class="mb-2 flex items-center py-1">
            <h1 class="mb-1 mr-auto text-3xl font-bold">{{ currentCourse.title }}</h1>

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
            <span class="">{{ chatRoom.viewer }}人已加入</span>
            <!-- <span v-if="!purchased" class="text-2xl font-bold">NT$ {{ currentCourse.price }}</span> -->
          </span>

          <iframe
            v-if="currentCourse.videoUrl"
            class="h-[55vh] w-full"
            :src="studentPlayUrl"
            frameborder="0"
          >
          </iframe>

          <div v-else class="relative h-[55vh] rounded-lg bg-black text-center text-3xl text-white">
            <span class="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
              >直播尚未開始</span
            >
          </div>
        </div>

        <in-content-desc
          v-if="currentCourse.chapters"
          :current-course="currentCourse"
          :purchased="purchased"
        ></in-content-desc>
      </div>

      <in-content-teacher
        :teacher="{
          name: currentCourse.teacherName,
          thumbnail: currentCourse.thumbnail
        }"
      ></in-content-teacher>

      <in-content-review :review="currentCourse.reviews"></in-content-review>

      <in-content-question
        v-if="route.query.courseType === 'normal'"
        :questions="currenChapterLesson?.question || []"
        @add-question="($value: any) => createQuestion({ userId: userProfile._id, chapter: content.chapter, lesson: content.lesson, comment: $value })"
        @add-reply="($value: any) => createReply({ userId: userProfile._id, chapter: content.chapter, lesson: content.lesson, index: $value.index, comment: $value.msg })"
      ></in-content-question>
    </div>

    <!-- 直播課程聊天室 -->
    <in-course-chat-room
      v-if="route.query.courseType === 'stream'"
      class="w-3/12 max-[1536px]:mt-[4vh]"
      :chatroom-message="chatRoom.message"
      @update:chatroom-message="addChatroomMessage"
    >
    </in-course-chat-room>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

// components
import InCourseChatRoom from '../../../layouts/components/in-course-chatroom.vue'
import inContentDesc from './components/in-content-desc.vue'
import inContentTeacher from './components/in-content-teacher.vue'
import inContentReview from './components/in-content-review.vue'
import inContentQuestion from './components/in-content-question.vue'

import useNotification from '~~/stores/useNotification'
import useCourses from '~/stores/useCourses'
import useUser from '~/stores/useUser'
// import { Thumbs } from 'swiper'

const { currentCourse, content, purchased, chatRoom } = storeToRefs(useCourses())
const { userProfile } = storeToRefs(useUser())
const { notification } = useNotification()
const route = useRoute()

const { createQuestion, createReply, updateChatRoom } = useCourses()

const { chapter, lesson } = content.value
let socketNode: any = null

definePageMeta({
  layout: 'view-courses'
})

const currenChapterLesson: any = computed(() => {
  return route.query.courseType === 'normal'
    ? currentCourse.value?.chapters[chapter].lessons[lesson]
    : {}
})

const studentPlayUrl = computed(() => {
  // 如果是學生身分的話就把這個url 帶進iframe 即可
  return `https://inskillmedia.demoto.me:5443/WebRTCApp/play.html?name=${currentCourse.value.videoUrl}&autoplay=true`
})

onMounted(async () => {
  if (route.query.courseType === 'stream') await getListenKey()
})

const getListenKey = async () => {
  try {
    const response: any = await $fetch(`/api/user/listenkey`, {
      method: 'POST',
      body: JSON.stringify({
        courseId: currentCourse.value._id
      })
    })
    console.log(`response`, response)
    if (response.success) {
      await initSocket(response.data.listenkey)
    }
  } catch (error: any) {
    console.log(error)
    notification.error(error.message)
  }
}

const initSocket = (listenkey: any) => {
  try {
    // socketNode = new WebSocket(`ws://localhost:931/${listenkey}`)
    socketNode = new WebSocket(`wss://inskill.demoto.me:8443/${listenkey}`)
    socketNode.onopen = () => {
      console.log('socket open')
    }

    socketNode.onmessage = (event: any) => {
      console.log(`message`, event.data)

      const { userId, username, text, viewerCount } = JSON.parse(event.data)

      updateChatRoom({
        username,
        comment: text,
        isTeacher: userId === currentCourse.value.teacherId,
        viewerCount
      })
    }

    socketNode.onclose = () => {
      console.log('socket close')
      // getListenKey()
      setTimeout(() => {
        initSocket(listenkey)
      }, 2000)
    }
  } catch (err) {
    console.log(err)
  }
}

const sendMessage = (msg: any) => {
  socketNode.send(
    JSON.stringify({
      text: msg
    })
  )
}

const addChatroomMessage = ($value: any) => {
  updateChatRoom({
    username: userProfile.value.username,
    comment: $value,
    isTeacher: userProfile.value._id === currentCourse.value.teacherId,
    viewerCount: chatRoom.value.viewer
  })
  sendMessage($value)
}
</script>
