<template>
  <slot name="header"></slot>
  <in-container class="relative">
    <div
      class="border-bottom mb-4 mt-[12vh] flex items-center pb-4 pt-8 text-white max-[1536px]:mt-[15vh]"
      :class="{ hidden: deepDive }"
    >
      <h1 class="mr-auto text-3xl font-bold">{{ currentCourse.title }}</h1>

      <h2 class="mr-4 text-2xl font-bold">NT$ {{ currentCourse.price }}</h2>

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
    <div class="absolute top-6 h-full w-full bg-black pt-10" :class="{ hidden: !open }">
      <div class="mx-auto w-8/12 rounded-lg bg-white p-10 pb-4 pt-8 text-center text-black">
        <button
          type="button"
          class="fixed right-[26.5vw] top-[19.5vh] w-8"
          @click="
            () => {
              open = !open
            }
          "
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
          @click="submitReview"
        >
          送出
        </button>
      </div>
    </div>

    <div class="flex text-white" :class="{ 'mt-[15vh]': deepDive, hidden: open }">
      <!-- 左邊課程切換列表 -->
      <aside v-if="courseType === 'Course'" class="w-2/12" :class="{ hidden: deepDive }">
        <h2 class="my-4 text-2xl font-bold">課程介紹</h2>

        <ul>
          <li
            v-for="(chapter, index) in currentCourse.chapters"
            :key="chapter.title"
            class="my-2 cursor-pointer rounded-md"
            :class="[expandChapter === index ? 'bg-white text-black' : 'border']"
            @click="expandChapterController(index)"
          >
            <div class="flex items-center px-4 py-2">
              <span class="mr-auto">{{ chapter.title }}</span>
              <i
                class="icon-arrow text-[24px]"
                :class="{ 'rotate-180': expandChapter === index }"
              ></i>
            </div>

            <ul v-if="expandChapter === index">
              <li
                v-for="(lesson, lessonIndex) in chapter.lessons"
                :key="lesson.title"
                class="px-4 py-2"
                :class="{
                  'bg-yellow':
                    lesson._id ===
                    currentCourse.chapters[content.chapter].lessons[content.lesson]._id,
                  'border-bottom': lessonIndex + 1 !== chapter.lessons.length
                }"
                @click.stop="selectLesson(lessonIndex)"
              >
                <div class="flex items-center p-1">
                  <span class="mr-auto">{{ lesson.title }}</span>
                  <span
                    v-if="lesson.freePreview"
                    class="w-[100px] rounded-md border py-1 text-center"
                    >試看</span
                  >

                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 32"
                    class="w-[25px]"
                  >
                    <g fill="none">
                      <path
                        d="M18 20a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm-8-10V8a6 6 0 0 1 12 0v2h1.5a3.5 3.5 0 0 1 3.5 3.5v13a3.5 3.5 0 0 1-3.5 3.5h-15A3.5 3.5 0 0 1 5 26.5v-13A3.5 3.5 0 0 1 8.5 10H10zm2-2v2h8V8a4 4 0 0 0-8 0zm-3.5 4A1.5 1.5 0 0 0 7 13.5v13A1.5 1.5 0 0 0 8.5 28h15a1.5 1.5 0 0 0 1.5-1.5v-13a1.5 1.5 0 0 0-1.5-1.5h-15z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </aside>

      <!-- 中間課程內容 -->
      <main class="w-10/12 p-4 transition-all duration-200" :class="{ 'w-full': deepDive }">
        <slot />
      </main>

      <!-- 右邊懸浮按鈕 -->
      <ul
        v-if="courseType === 'Course'"
        class="fixed right-[16.4%] h-full h-min w-[65px] rounded border border-[#6C757D] max-[1536px]:right-[8%]"
        :class="{ 'top-[150px]': deepDive }"
      >
        <!-- 留言 -->
        <li
          class="right-controller border-bottom"
          :class="{ '!hidden': deepDive }"
          @click="scrollToQuestion"
        >
          <svg
            class="mx-auto w-3/6"
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

          <span class="toolTip">課程討論</span>
        </li>
        <!-- 沉浸模式 -->
        <li
          class="right-controller border-bottom"
          :class="{ '!border-b-0': deepDive }"
          @click="
            () => {
              deepDive = !deepDive
            }
          "
        >
          <svg
            class="mx-auto w-3/6"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 3l2.3 2.3l-2.89 2.87l1.42 1.42L18.7 6.7L21 9V3h-6zM3 9l2.3-2.3l2.87 2.89l1.42-1.42L6.7 5.3L9 3H3v6zm6 12l-2.3-2.3l2.89-2.87l-1.42-1.42L5.3 17.3L3 15v6h6zm12-6l-2.3 2.3l-2.87-2.89l-1.42 1.42l2.89 2.87L15 21h6v-6z"
              fill="currentColor"
            ></path>
          </svg>

          <span class="toolTip">沉浸模式</span>
        </li>
        <!-- 上一堂課 -->
        <li
          class="right-controller border-bottom"
          :class="{ '!hidden': deepDive }"
          @click="goTolesson(content.lesson - 1)"
        >
          <svg
            class="mx-auto w-3/6"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
          >
            <path d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z" fill="currentColor"></path>
          </svg>

          <span class="toolTip">上一堂課</span>
        </li>
        <!-- 下一堂課 -->
        <li
          class="right-controller"
          :class="{ '!hidden': deepDive }"
          @click="goTolesson(content.lesson + 1)"
        >
          <svg
            class="mx-auto w-3/6"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
          >
            <path
              d="M10.02 6L8.61 7.41L13.19 12l-4.58 4.59L10.02 18l6-6l-6-6z"
              fill="currentColor"
            ></path>
          </svg>

          <span class="toolTip">下一堂課</span>
        </li>
      </ul>

      <!-- 直播課程聊天室 -->
      <div v-else>chatroom</div>
    </div>
  </in-container>
  <slot name="footer"></slot>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import useCourses from '~/stores/useCourses'
import useUser from '~/stores/useUser'
import useNotification from '~~/stores/useNotification'

const { notification } = useNotification()
const { currentCourse, content, expandChapter, purchased, collected } = storeToRefs(useCourses())
const { userProfile } = storeToRefs(useUser())
const { setChapter, setContent, setCollected, addingReview } = useCourses()

const { $api } = useNuxtApp()

const router = useRouter('')
const courseType = computed(() => {
  return currentCourse.value.chapters ? 'Course' : 'LiveCourse'
})
const isInCart = ref(() =>
  userProfile.value.cartCourses.findIndex(
    (course: any) => course?.courseId === currentCourse.value._id
  )
)
const open = ref(false) // 評價modal 開關
const newReview = ref({
  star: 0,
  comment: ''
})

// 直播課程時進入沉浸模式
const deepDive = computed(() => {
  return currentCourse.value.chapters === undefined
})

// 加入/取消收藏
const collector = async () => {
  try {
    const alterCollection = await $api.course.collectCourse({
      courseId: currentCourse.value._id,
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
const expandChapterController = (index: number) => {
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
    }?courseType=${courseType.value}`
  )
}

// 加入購物車
const addToCart = async () => {
  try {
    const alterCart = await $api.course.pushToCart({
      courseId: currentCourse.value._id,
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

// 標記評價星星
const setStar = (i: number) => {
  newReview.value.star = i
}

// 送出評價
const submitReview = () => {
  if (newReview.value.comment.length) {
    addingReview({ userId: userProfile.value._id, ...newReview.value })
    open.value = false
  } else {
    notification.error('請留下評語')
  }
}

// 移動到下方問答區塊
const scrollToQuestion = () => {
  const el = document.getElementById('question')
  el?.scrollIntoView({ behavior: 'smooth' })
}

// 上、下一堂課
const goTolesson = (index: number) => {
  if (currentCourse.value.chapters[expandChapter.value].lessons[index]) {
    setContent(index)
    router.push(
      `/courses/${currentCourse.value.chapters[expandChapter.value]._id}/lesson/${
        currentCourse.value.chapters[expandChapter.value].lessons[index]._id
      }`
    )
  } else {
    const destination = index < 0 ? expandChapter.value - 1 : expandChapter.value + 1

    if (currentCourse.value.chapters[destination]) {
      setChapter(destination)
      setContent(0)
      router.push(
        `/courses/${currentCourse.value.chapters[destination]._id}/lesson/${currentCourse.value.chapters[destination].lessons[0]._id}`
      )
    } else {
      notification.error(`沒有${index < 0 ? '上個' : '下個'}課程`)
    }
  }
}
</script>

<style lang="scss" scoped>
.course-header-action {
  @apply mx-2 flex items-center rounded border border-white bg-white px-3 py-2 text-black;
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

.right-controller {
  @apply relative inline-block cursor-pointer py-2;
  .toolTip {
    @apply invisible absolute left-[65px] top-[10px] ml-1 w-[100px] rounded bg-white px-[5px] text-center text-sm text-black;
  }
  &:hover {
    .toolTip {
      @apply visible;
    }
  }
}
</style>
