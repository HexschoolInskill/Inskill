<template>
  <in-container>
    <div class="border-bottom mb-4 flex items-center pb-4 pt-8 text-white">
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
                v-for="lession in chapter.lessions"
                :key="lession.title"
                class="border-bottom my-2"
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
        <div class="flex">
          <!--課程內容展示-->
          <div class="content w-11/12">
            <div class="wrapper gradient rounded-lg p-4 px-6">
              <div class="mb-10 flex items-center">
                <h1 class="mr-auto text-3xl font-bold">{{ currenChapterLession.title }}</h1>
                <span v-if="currenChapterLession.freePreview" class="rounded border px-6 py-1"
                  >試看</span
                >
              </div>

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

              <div
                v-for="(i, index) in showReviews"
                :key="index"
                class="my-4 flex rounded-xl border p-4"
              >
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
                  @addReply="($value) => addingReply($value, index)"
                ></in-content-question>
              </div>

              <!-- <button type="button">查看更多</button> -->
            </div>
          </div>

          <ul class="h-full w-1/12 rounded border border-[#6C757D]">
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
      </main>
    </div>
  </in-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
// import { storeToRefs } from 'pinia'
// import coursesStore from '~/stores/useCourses'

// const { currentCourse } = storeToRefs(coursesStore())
// const { setCurrentCourse } = coursesStore()

// const { $api } = useNuxtApp()
const route = useRoute()

const currentCourse = {
  _id: '001',
  teacherId: '002',
  isPublic: false,
  title: 'test01',
  description: 'desc',
  price: '350',
  thumbnail: '',
  chapters: [
    {
      _id: '0001',
      title: 'chapter 1',
      description: 'dfdfsdfsdf',
      sort: 0,
      lessions: [
        {
          _id: '00001',
          title: 'lession 1',
          description: 'dscdsfdsvgs',
          freePreview: true,
          sort: 0,
          lessionContent: [
            {
              _id: '000001',
              contentType: 'video',
              content: '/video/movie.mp4',
              duration: 12000,
              sort: 0
            },
            {
              _id: '000002',
              contentType: 'text',
              content: '章節內容測試',
              sort: 1
            },
            {
              _id: '000003',
              contentType: 'pdf',
              content: '/file/李昆峰.pdf',
              sort: 0
            }
          ],
          question: [
            {
              userId: 'u001',
              comment:
                '村喜夏蝶毛胡星同？裏次己、世我休但停候包息唱色也着法采意方，掃收重千房背着要歌位游老化杯生，掃錯哭兆習他，杯香車過欠由吧加給送快、字回不入雞彩雄瓜母完少枝外弓汁幸反！且少斥土自物都真現浪玉再追瓜春尼。',
              reply: [
                {
                  userId: 'u002',
                  comment:
                    '歌爪加弟步，對重得錯根乙相奶去星圓、干老天雲植少經心。久乍或說美共，愛記棵看松，原眼即裏愛片至穴。太手但帽衣朱馬昔。'
                }
              ]
            }
          ]
        },
        {
          _id: '00001',
          title: 'lession 2',
          description: 'gbkjbljnkjlj',
          freePreview: true,
          sort: 0,
          lessionContent: [
            {
              _id: '000003',
              contentType: 'pdf',
              content: '/video/movie.mp4',
              sort: 0
            }
          ],
          question: []
        }
      ]
    },
    {
      _id: '0002',
      title: 'chapter 2',
      description: 'dfdfsdfsdf',
      sort: 1,
      lessions: []
    },
    {
      _id: '0003',
      title: 'chapter 3',
      description: 'dfdfsdfsdf',
      sort: 2,
      lessions: []
    }
  ],
  reviews: [
    {
      userId: 'u001',
      rating: 5,
      comment:
        '說連戊北唱成語可種呀昌來跳田口，跳何衣連假找昌而，牙亭時工浪是空央黑坡娘且公比夏年完快知「還現快種」少蛋神他視牠。'
    },
    {
      userId: 'u002',
      rating: 1,
      comment:
        '弓眼斗收，買候着東外蝶身自珠麻害眼祖戶，鳥婆兄犬院星去風細但視，圓尾入像愛足幾加勿爪生他足。神高道，口得林寫吉今乞松唱毛貓、歌要至犬好汁，院司安眼冒朱。'
    },
    {
      userId: 'u003',
      rating: 3,
      comment:
        '世各明子，里尼喝旦學教。急兄意知五汗女乾兄抓斥「也英」定節欠麻合路耳祖以花入品兒吃快心戊面問。林送小十京王下不麼休，包了買午尤亮半長兆快。媽步愛。休他去外根六珠。'
    },
    {
      userId: 'u004',
      rating: 5,
      comment:
        '正笑看新笑教筆星每孝書央奶樹汁兆出奶乍，呢男蛋苦哪戶河玉師：隻童打耍記把黃言民鼻校頁，抄故姊風笑上寸兆麼上屋快林向裝火意清，旦福因亭燈。'
    }
  ]
}

const expandChapter = ref(0) // 預設在課程第一章
const currenChapterLession = ref(currentCourse.chapters[0].lessions[0])
const showReviews = ref(3) // 預設顯示3個評價
const newQuestion = ref('')

// 計算平均評價
const sumUpReviews = computed(() => {
  const total = currentCourse.reviews.reduce(
    (accumulator, currentReview) => accumulator + currentReview.rating,
    0
  )

  return total / currentCourse.reviews.length
})

// 章節選單的開關
const expandChapterController = (index: number) => {
  if (expandChapter.value === index) {
    expandChapter.value = -1
  } else {
    expandChapter.value = index
  }
}

// 載入更多評價
const getMoreReviews = () => {
  if (currentCourse.reviews.length < showReviews.value + 3) {
    showReviews.value = currentCourse.reviews.length
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
