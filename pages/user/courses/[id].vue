<template>
  <div class="flex">
    <!--課程內容展示-->
    <div class="content w-11/12">
      <div class="wrapper gradient rounded-lg p-4 px-6">
        <!-- 有登入 -->
        <div v-if="userProfile.username.length" class="flex items-center">
          <!-- 已購買 -->
          <div v-if="purchased">
            <h1 class="mr-auto text-3xl font-bold">{{ currenChapterLession.title }}</h1>
            <span v-if="currenChapterLession.freePreview" class="mb-10 rounded border px-6 py-1">
              試看
            </span>

            <div v-for="(lession, index) in currenChapterLession.lessionContent" :key="index">
              <in-content-video
                v-if="lession.contentType === 'video'"
                :content="lession.content"
              ></in-content-video>

              <in-content-text
                v-if="lession.contentType === 'text'"
                :content="lession.content"
              ></in-content-text>

              <in-content-pdf
                v-if="lession.contentType === 'pdf'"
                :content="lession.content"
              ></in-content-pdf>
            </div>
          </div>

          <!-- 無購買 -->
          <in-content-desc v-else :current-course="currentCourse"></in-content-desc>
        </div>

        <!-- 無登入 -->
        <in-content-desc v-else :current-course="currentCourse"></in-content-desc>
      </div>

      <div class="gradient my-10 rounded-lg p-4 px-6">
        <h2 class="text-2xl font-bold">授課講師</h2>

        <div class="flex pl-4 pt-4">
          <div class="avatar w-1/6 overflow-hidden rounded-full">
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

          <div class="ml-4 w-full">
            <h2 class="mb-2 text-xl font-bold">講師名稱</h2>
            <p>
              冰而雲黃游抱哪奶校，雨手嗎回小鼻常禾草民「目雞停苦發訴人比」不現今美白寫即世汗根又麼兒候面奶新昌月：女兩後念，兌這條同給圓嗎喜出布。
              巴目包辛正幼戊子來唱都間詞月兩卜貝乙詞：尺空字王音步動爬亭合開放生。
            </p>
          </div>
        </div>
      </div>

      <div class="gradient my-10 rounded-lg p-4 px-6">
        <h2 class="text-2xl font-bold">課程評價</h2>

        <div class="flex">
          <h1 class="mx-8 mt-4 text-4xl font-bold">{{ sumUpReviews }}</h1>

          <div>
            <in-content-star :stars="Math.floor(sumUpReviews)"></in-content-star>
            <p>{{ currentCourse.reviews.length }} 則評價</p>
          </div>
        </div>

        <div v-for="(i, index) in showReviews" :key="index" class="my-4 flex rounded-xl border p-4">
          <in-content-review :review="currentCourse.reviews[i - 1]"></in-content-review>
        </div>

        <div v-if="currentCourse.reviews.length > showReviews" class="mb-8 mt-8 text-center">
          <button
            class="w-[150px] rounded bg-white py-1 text-black"
            type="button"
            @click="getMoreReviews"
          >
            查看更多
          </button>
        </div>
      </div>

      <div class="gradient my-10 rounded-lg p-4 px-6">
        <h2 class="text-2xl font-bold">問與答</h2>

        <div class="my-4 flex flex-col">
          <label for="new_question text-2xl">新增提問</label>
          <textarea
            id="new_question"
            v-model="newQuestion"
            class="mt-4 rounded-lg bg-[#DEE2E6] p-2 text-black"
            name="new_question"
            cols="30"
            rows="5"
            placeholder="喜歡這堂課嗎? 購買課程後可以和大家已起討論囉!"
            :disabled="!purchased"
          >
          </textarea>

          <button
            class="my-2 ml-auto w-[150px] rounded border bg-white text-black"
            :class="{ 'bg-gray': !newQuestion.length }"
            type="button"
            :disabled="!newQuestion.length"
          >
            送出
          </button>
        </div>

        <h2 class="mb-4 text-2xl font-bold">
          全部問答 ({{ currenChapterLession.question.length }})
        </h2>

        <div
          v-for="(question, index) in currenChapterLession.question"
          :key="question.comment"
          class="rounded-lg border p-8"
        >
          <in-content-question
            :question="question"
            @add-reply="($value) => addingReply($value, index)"
          ></in-content-question>
        </div>

        <button type="button">查看更多</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import coursesStore from '~/stores/useCourses'
import useUser from '~/stores/useUser'

const { currentCourse, content } = storeToRefs(coursesStore())
const { userProfile } = storeToRefs(useUser())
// const { setCurrentCourse } = coursesStore()

// const { $api } = useNuxtApp()

definePageMeta({
  layout: 'view-courses'
})

const route = useRoute()

const currenChapterLession = ref(
  currentCourse.value.chapters[content.value.chapter].lessions[content.value.lession]
)
const showReviews = ref(3) // 預設顯示3個評價
const newQuestion = ref('')
const purchased = ref(false)

// 計算平均評價
const sumUpReviews = computed(() => {
  const total = currentCourse.value.reviews.reduce(
    (accumulator, currentReview) => accumulator + currentReview.rating,
    0
  )

  return total / currentCourse.value.reviews.length
})

// 載入更多評價
const getMoreReviews = () => {
  if (currentCourse.value.reviews.length < showReviews.value + 3) {
    showReviews.value = currentCourse.value.reviews.length
  } else {
    showReviews.value = showReviews.value + 3
  }
}

// 新增回復
const addingReply = (value: string, index: number) => {
  currenChapterLession.value.question[index].reply.push({
    userId: '',
    comment: value
  })
}

// onMounted(async () => {
onMounted(() => {
  console.log(route.params)
  // if (route.params.id) {
  // 發動取該課程章節資訊的 api
  // const courseId = String(route.params.id)

  // try {
  //   const currentCourse: any = await $api.course.getCourseContent(courseId)
  //   console.log(currentCourse)

  //  查看是否有購買該課程
  // const courseIndex = userProfile.value.purchasedCourses.findIndex((course) => course === route.params.id)

  // purchased.value = courseIndex > -1
  // } catch (error) {
  //   console.log(error)
  // }

  // setCurrentCourse(currentCourse)
  // }
})
</script>

<style scope>
.gradient {
  background: linear-gradient(90deg, rgb(38, 43, 47), #000);
}
</style>
