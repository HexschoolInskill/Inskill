<template>
  <slot name="header"></slot>
  <in-container class="relative">
    <div
      class="border-bottom mb-4 mt-[12vh] flex items-center pb-4 pt-8 text-white max-[1536px]:mt-[15vh]"
      :class="{ hidden: deepDive }"
    >
      <h1 class="mr-auto text-3xl font-bold">{{ currentCourse?.title }}</h1>

      <h2 class="mr-4 text-2xl font-bold">NT$ {{ currentCourse?.price }}</h2>

      <button
        v-if="!purchased && isInCart === -1"
        class="course-header-action"
        type="button"
        @click="addToCart"
      >
        <svg
          class="w-[25px]"
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
              d="M169.6,377.6c-22.882,0-41.6,18.718-41.6,41.601c0,22.882,18.718,41.6,41.6,41.6s41.601-18.718,41.601-41.6
		C211.2,396.317,192.481,377.6,169.6,377.6z M48,51.2v41.6h41.6l74.883,151.682l-31.308,50.954c-3.118,5.2-5.2,12.482-5.2,19.765
		c0,27.85,19.025,41.6,44.825,41.6H416v-40H177.893c-3.118,0-5.2-2.082-5.2-5.2c0-1.036,2.207-5.2,2.207-5.2l20.782-32.8h154.954
		c15.601,0,29.128-8.317,36.4-21.836l74.882-128.8c1.237-2.461,2.082-6.246,2.082-10.399c0-11.446-9.364-19.765-20.8-19.765H135.364
		L115.6,51.2H48z M374.399,377.6c-22.882,0-41.6,18.718-41.6,41.601c0,22.882,18.718,41.6,41.6,41.6S416,442.082,416,419.2
		C416,396.317,397.281,377.6,374.399,377.6z"
            ></path>
          </g>
        </svg>

        <span>加入購物車</span>
      </button>

      <div v-else class="course-header-action">
        <svg
          class="w-[25px]"
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
              d="M169.6,377.6c-22.882,0-41.6,18.718-41.6,41.601c0,22.882,18.718,41.6,41.6,41.6s41.601-18.718,41.601-41.6
		C211.2,396.317,192.481,377.6,169.6,377.6z M48,51.2v41.6h41.6l74.883,151.682l-31.308,50.954c-3.118,5.2-5.2,12.482-5.2,19.765
		c0,27.85,19.025,41.6,44.825,41.6H416v-40H177.893c-3.118,0-5.2-2.082-5.2-5.2c0-1.036,2.207-5.2,2.207-5.2l20.782-32.8h154.954
		c15.601,0,29.128-8.317,36.4-21.836l74.882-128.8c1.237-2.461,2.082-6.246,2.082-10.399c0-11.446-9.364-19.765-20.8-19.765H135.364
		L115.6,51.2H48z M374.399,377.6c-22.882,0-41.6,18.718-41.6,41.601c0,22.882,18.718,41.6,41.6,41.6S416,442.082,416,419.2
		C416,396.317,397.281,377.6,374.399,377.6z"
              fill="#ffc107"
            ></path>
          </g>
        </svg>

        <span>已{{ purchased ? '購買' : '加入購物車' }}</span>
      </div>

      <button class="course-header-action" type="button" @click="collector">
        <svg
          class="mr-1 w-[20px]"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
        >
          <path
            d="M400 480a16 16 0 0 1-10.63-4L256 357.41L122.63 476A16 16 0 0 1 96 464V96a64.07 64.07 0 0 1 64-64h192a64.07 64.07 0 0 1 64 64v368a16 16 0 0 1-16 16z"
            :fill="collected ? '#FFC107' : 'currentColor'"
          ></path>
        </svg>

        <span>{{ collected ? '取消收藏' : '加入收藏' }}</span>
      </button>

      <button
        v-if="userProfile.username.length && purchased"
        class="course-header-action flex items-center"
        type="button"
        @click="
          () => {
            open = !open
          }
        "
      >
        <svg
          class="mr-1 w-[20px]"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 16 16"
        >
          <g fill="none">
            <path
              d="M7.194 2.101a.9.9 0 0 1 1.614 0l1.521 3.082l3.401.495a.9.9 0 0 1 .5 1.535l-2.462 2.399l.581 3.387a.9.9 0 0 1-1.306.949l-3.042-1.6l-3.042 1.6a.9.9 0 0 1-1.306-.949l.58-3.387l-2.46-2.4a.9.9 0 0 1 .499-1.534l3.4-.495l1.522-3.082z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
        <span>評價課程</span>
      </button>
    </div>

    <!-- 評價modal -->
    <in-course-review-modal
      :open="open"
      @update:open="(newValue) => (open = newValue)"
      @submit-review="addReview"
    >
    </in-course-review-modal>

    <div class="flex text-white" :class="{ 'mt-[15vh]': deepDive, hidden: open }">
      <!-- 左邊課程切換列表 -->
      <in-course-chapter-selector
        :deep-dive="deepDive"
        :expand-chapter="expandChapter"
        :current-course="currentCourse"
        :content="content"
        @update:expand-chapter="(newValue) => changeChapter(newValue)"
        @update:content="(newValue) => selectLesson(newValue)"
      >
      </in-course-chapter-selector>

      <!-- 中間課程內容 -->
      <main class="w-10/12 p-4 transition-all duration-200" :class="{ 'w-full': deepDive }">
        <slot />
      </main>

      <!-- 右邊懸浮按鈕 -->
      <in-course-float-button
        v-if="courseType === 'Course'"
        :deep-dive="deepDive"
        :lesson="content.lesson"
        @update:deep-dive="(newValue) => (deepDive = newValue)"
        @move-to-lesson="goToLesson"
      >
      </in-course-float-button>

      <!-- 直播課程聊天室 -->
      <in-course-chat-room
        v-else
        class="w-3/12"
        :chatroom-message="chatroomMessage"
        @update:chatroom-message="addChatroomMessage"
      >
      </in-course-chat-room>
    </div>
  </in-container>
  <slot v-if="courseType === 'Course'" name="footer"></slot>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

// components
import InCourseChapterSelector from './components/in-course-chapter-selector.vue'
import InCourseFloatButton from './components/in-course-float-button.vue'
import InCourseChatRoom from './components/in-course-chatroom.vue'
import InCourseReviewModal from './components/in-course-review-modal.vue'

import useCourses from '~/stores/useCourses'
import useUser from '~/stores/useUser'
import useNotification from '~~/stores/useNotification'

const { notification } = useNotification()
const { currentCourse, content, expandChapter, purchased, collected } = storeToRefs(useCourses())
const { userProfile } = storeToRefs(useUser())
const { setChapter, setContent, setCollected, createReview } = useCourses()

const { $api } = useNuxtApp()

const router = useRouter()
const courseType = computed(() => {
  return currentCourse.value.chapters ? 'Course' : 'LiveCourse'
})

const chatroomMessage: any = ref([])

// 課程是否加入購物車
const isInCart = ref(-1)
isInCart.value = userProfile.value.cartCourses.findIndex(
  (course: any) => course?.courseId === currentCourse.value._id
)

const open = ref(false) // 評價modal 開關

const deepDive = ref(false) // 直播課程時進入沉浸模式
deepDive.value = currentCourse.value.chapters === undefined

// 加入/取消收藏
const collector = async () => {
  try {
    const alterCollection = await $api.course.collectCourse({
      courseId: currentCourse.value._id as string,
      courseType: courseType.value,
      isCollect: !collected.value
    })
    console.log('alterCollection:>>>', alterCollection)

    if (alterCollection.success) {
      setCollected(!collected.value)
      notification.success(`已${collected.value ? '收藏' : '取消收藏'}`)
    }
  } catch (error: any) {
    console.log('error :>>>', error)
    notification.error(error.message)
  }
}

// 章節選單的開關
const changeChapter = (index: number) => {
  if (expandChapter.value === index) {
    setChapter(-1)
  } else {
    setChapter(index)
  }
}

// 切換章節課程
const selectLesson = (index: number) => {
  console.log(index)
  setContent(index)
  router.push(
    `/courses/${currentCourse.value._id}/lesson/${
      currentCourse.value.chapters[expandChapter.value].lessons[index]._id
    }?courseType=${currentCourse.value.chapters ? 'normal' : 'stream'}`
  )
}

// 加入購物車
const addToCart = async () => {
  try {
    const alterCart: any = await $api.course.pushToCart({
      courseId: currentCourse.value._id as string,
      courseType: courseType.value,
      isCart: !purchased.value
    })
    console.log('alterCart:>>>', alterCart)

    if (alterCart.success) notification.success('已加入購物車')
  } catch (error: any) {
    console.log('error :>>>', error)
    notification.error(error.message)
  }
}

// 送出評價
const addReview = ($value: any) => {
  if ($value.comment.length) {
    createReview({ userId: userProfile.value._id, username: userProfile.value.username, ...$value })
    open.value = false
  } else {
    notification.error('請留下評語')
  }
}

// 上、下一堂課
const goToLesson = (index: number) => {
  if (currentCourse.value.chapters[expandChapter.value].lessons[index]) {
    setContent(index)
    router.push(
      `/courses/${currentCourse.value._id}/lesson/${
        currentCourse.value.chapters[expandChapter.value].lessons[index]._id
      }?courseType=${currentCourse.value.chapters ? 'normal' : 'stream'}`
    )
  } else {
    const destination = index < 0 ? expandChapter.value - 1 : expandChapter.value + 1

    if (currentCourse.value.chapters[destination]) {
      setChapter(destination)
      setContent(0)
      router.push(
        `/courses/${currentCourse.value._id}/lesson/${
          currentCourse.value.chapters[destination].lessons[0]._id
        }?courseType=${currentCourse.value.chapters ? 'normal' : 'stream'}`
      )
    } else {
      notification.error(`沒有${index < 0 ? '上個' : '下個'}課程`)
    }
  }
}

const addChatroomMessage = ($value: any) => {
  console.log($value)

  chatroomMessage.value.push({
    userId: userProfile.value._id,
    username: userProfile.value.username,
    isTeacher: userProfile.value.isTeacher,
    comment: $value
  })
}
</script>

<style lang="scss" scoped>
.course-header-action {
  @apply transition-base mx-2 flex items-center rounded bg-white px-3 py-2 text-black hover:bg-gray-l;
}

.course-header-action .tempStar {
  &:hover {
    svg {
      path {
        fill: #ffc107;
      }
    }
  }
}
</style>
