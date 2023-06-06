<template>
  <slot name="header"></slot>
  <in-container>
    <div class="border-bottom mb-4 mt-[10vh] flex items-center pb-4 pt-8 text-white sm:mt-[12vh]">
      <h1 class="mr-auto text-3xl font-bold">課程名稱</h1>

      <h2 class="mr-4 text-2xl font-bold">NT$ {{ currentCourse.price }}</h2>

      <button class="mx-2 rounded border border-white bg-white px-3 py-2 text-black" type="button">
        加入購物車
      </button>
      <button class="mx-2 rounded border border-white bg-white px-3 py-2 text-black" type="button">
        加入收藏
      </button>
    </div>

    <div class="flex text-white">
      <aside class="w-2/12">
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

      <main class="w-10/12 p-4">
        <slot />
      </main>

      <!-- 懸浮按鈕 -->
      <ul class="h-full w-[65px] rounded border border-[#6C757D]">
        <li class="border-bottom py-2">
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
        </li>
        <li class="border-bottom py-2">
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
        </li>
        <li class="border-bottom py-2">
          <svg
            class="mx-auto w-3/6"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
          >
            <path d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z" fill="currentColor"></path>
          </svg>
        </li>
        <li class="py-2">
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
        </li>
      </ul>
    </div>
  </in-container>
  <slot name="footer"></slot>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useCourses from '~/stores/useCourses'

const { currentCourse, expandChapter } = storeToRefs(useCourses())
const { setChapter, setContent } = useCourses()
// const { setCurrentCourse } = coursesStore()
const router = useRouter()

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
</script>
