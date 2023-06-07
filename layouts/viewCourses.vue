<template>
  <slot name="header"></slot>
  <in-container class="relative">
    <div
    class="border-bottom mb-4 mt-[10vh] flex items-center pb-4 pt-8 text-white sm:mt-[12vh]"
    :class="{'hidden': deepDive}">
      <h1 class="mr-auto text-3xl font-bold">課程名稱</h1>

      <h2 class="mr-4 text-2xl font-bold">NT$ {{ currentCourse.price }}</h2>

      <button v-if="!purchased" class="course-header-action" type="button">
        
        <svg class="w-[25px]" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><path d="M169.6,377.6c-22.882,0-41.6,18.718-41.6,41.601c0,22.882,18.718,41.6,41.6,41.6s41.601-18.718,41.601-41.6
		C211.2,396.317,192.481,377.6,169.6,377.6z M48,51.2v41.6h41.6l74.883,151.682l-31.308,50.954c-3.118,5.2-5.2,12.482-5.2,19.765
		c0,27.85,19.025,41.6,44.825,41.6H416v-40H177.893c-3.118,0-5.2-2.082-5.2-5.2c0-1.036,2.207-5.2,2.207-5.2l20.782-32.8h154.954
		c15.601,0,29.128-8.317,36.4-21.836l74.882-128.8c1.237-2.461,2.082-6.246,2.082-10.399c0-11.446-9.364-19.765-20.8-19.765H135.364
		L115.6,51.2H48z M374.399,377.6c-22.882,0-41.6,18.718-41.6,41.601c0,22.882,18.718,41.6,41.6,41.6S416,442.082,416,419.2
		C416,396.317,397.281,377.6,374.399,377.6z"></path></g></svg>

        <span>加入購物車</span>
      </button>

      <button v-if="!collected" class="course-header-action" type="button">

        <svg class="w-[20px]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M400 480a16 16 0 0 1-10.63-4L256 357.41L122.63 476A16 16 0 0 1 96 464V96a64.07 64.07 0 0 1 64-64h192a64.07 64.07 0 0 1 64 64v368a16 16 0 0 1-16 16z" fill="currentColor"></path></svg>

        <span>加入收藏</span>
      </button>

      <button v-else class="course-header-action" type="button">
        取消收藏
      </button>

      <button v-if="userProfile.username.length && purchased" class="course-header-action" type="button">
        評價課程
      </button>
    </div>

    <div class="flex text-white" :class="{'mt-[15vh]': deepDive}">
      <aside class="w-2/12" :class="{'hidden': deepDive}">
        <h2 class="my-4 text-2xl font-bold">課程介紹</h2>

        <ul>
          <li
            v-for="(chapter, index) in currentCourse.chapters"
            :key="chapter.title"
            class="my-2 cursor-pointer rounded-md border px-4"
            :class="{ 'bg-white text-black': expandChapter === index }"
            @click="expandChapterController(index)"
          >
            <div class="flex items-center">
              <span class="mr-auto">{{ chapter.title }}</span>
              <i
                class="icon-arrow text-[24px]"
                :class="{ 'rotate-180': expandChapter === index }"
              ></i>
            </div>

            <ul v-if="expandChapter === index">
              <li
                v-for="(lession, lessionIndex) in chapter.lessions"
                :key="lession.title"
                class="border-bottom my-2"
                @click.stop="selectLession(lessionIndex)"
              >
                <div class="flex items-center p-1">
                  <span class="mr-auto">{{ lession.title }}</span>
                  <span v-if="lession.freePreview" class="rounded rounded-md border px-2 py-1"
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

      <main class="w-10/12 p-4 transition-all duration-200" :class="{'w-full': deepDive}">
        <slot />
      </main>

      <!-- 懸浮按鈕 -->
      <ul
      class="h-full w-[65px] rounded border border-[#6C757D]"
      :class="{'fixed right-[16.3vw] top-5 h-min': scrollY > 250}">
        <!-- 留言 -->
        <li
        class="right-controller border-bottom" 
        :class="{'!hidden': deepDive}"
        @click="scrollToQuestion">
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
        :class="{'!border-b-0': deepDive}"
        @click="() => { deepDive = !deepDive }">
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

          <span class="toolTip">沉靜模式</span>

        </li>
        <!-- 上一堂課 -->
        <li class="right-controller border-bottom" :class="{'!hidden': deepDive}">
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
        <li class="right-controller" :class="{'!hidden': deepDive}">
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
    </div>
  </in-container>
  <slot name="footer"></slot>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useCourses from '~/stores/useCourses'
import useUser from '~/stores/useUser';

const { currentCourse, expandChapter, purchased, collected } = storeToRefs(useCourses())
const { userProfile } = storeToRefs(useUser())
const { setChapter, setContent, setPurchased, setCollected } = useCourses()
// const { setCurrentCourse } = coursesStore()

// const { $api } = useNuxtApp()

const courseId = useState('courseId')
const scrollY = ref(0)
const router = useRouter()
// const open = ref(false)
const deepDive = ref(false)

// 章節選單的開關
const expandChapterController = (index: number) => {
  if (expandChapter.value === index) {
    setChapter(-1)
  } else {
    setChapter(index)
  }
}

const selectLession = (index: number) => {
  console.log(index)
  setContent(index)
  router.push(
    `/user/courses/${currentCourse.value.chapters[expandChapter.value]._id}/lession/${
      currentCourse.value.chapters[expandChapter.value].lessions[index]._id
    }`
  )
}

// 移動到下方問答區塊
const scrollToQuestion = () => {
  const el = document.getElementById('question')
  el?.scrollIntoView({ behavior: 'smooth' })
}

const fixedBottons = () => {
  if(window.top?.scrollY){
    scrollY.value = window.top.scrollY
  }
}

// try {
//   const currentCourse: any = await $api.course.getCourseContent(courseId)
//   console.log(currentCourse)

// } catch (error) {
//   console.log(error)
// }

//  查看是否有購買/收藏該課程
const coursePurchasedIndex = userProfile.value.purchasedCourses.findIndex((course: any) => course === courseId.value)
const courseCollectedIndex = userProfile.value.collectCourses.findIndex((course: any) => course === courseId.value)
setPurchased(coursePurchasedIndex > -1)
setCollected(courseCollectedIndex > -1)

onMounted(() => {
  window.addEventListener('scroll', fixedBottons)
})
</script>

<style lang="scss" scoped>
.course-header-action {
  @apply mx-2 rounded border border-white bg-white px-3 py-2 text-black flex items-center;
}

.right-controller{
  @apply relative inline-block py-2 cursor-pointer;
  .toolTip{
    @apply absolute invisible bg-white text-black text-center px-[5px] text-sm top-[10px] left-[65px] w-[100px] rounded;
  }  
  &:hover{
    .toolTip{
      @apply visible;
    }  
  }
}

</style>
