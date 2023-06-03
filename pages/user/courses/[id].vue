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
            class="my-2 rounded-md border px-4"
            :class="{'bg-white text-black': expandChapter === index}"
            @click="expandChapterController(index)"
          >
            <div class="flex items-center">
              <span class="mr-auto">{{ chapter.title }}</span>
              <i class="icon-arrow text-[24px]" :class="{'rotate-180': expandChapter === index}"></i>
            </div>

            <ul v-if="expandChapter === index">
              <li 
              v-for="lession in chapter.lessions" 
              :key="lession.title"
              class="my-2 border-bottom">
                <div class="flex p-1 items-center">
                  <span class="mr-auto">{{ lession.title }}</span>
                  <span v-if="lession.freePreview" class="rounded-md border rounded px-2 py-1">試看</span>

                  <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><g fill="none"><path d="M18 20a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm-8-10V8a6 6 0 0 1 12 0v2h1.5a3.5 3.5 0 0 1 3.5 3.5v13a3.5 3.5 0 0 1-3.5 3.5h-15A3.5 3.5 0 0 1 5 26.5v-13A3.5 3.5 0 0 1 8.5 10H10zm2-2v2h8V8a4 4 0 0 0-8 0zm-3.5 4A1.5 1.5 0 0 0 7 13.5v13A1.5 1.5 0 0 0 8.5 28h15a1.5 1.5 0 0 0 1.5-1.5v-13a1.5 1.5 0 0 0-1.5-1.5h-15z" fill="currentColor"></path></g></svg>
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
                  <h3 class="mb-2">講師名稱</h3>
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
                <h1 class="text-4xl font-bold mt-4 mx-8">{{ sumUpReviews }}</h1>

                <div>

                  <div class="star mb-2 flex">
                    <div v-for="star in Math.floor(sumUpReviews)" :key="star" class="w-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 16 16"
                      >
                        <g fill="none">
                          <path
                            d="M7.194 2.101a.9.9 0 0 1 1.614 0l1.521 3.082l3.401.495a.9.9 0 0 1 .5 1.535l-2.462 2.399l.581 3.387a.9.9 0 0 1-1.306.949l-3.042-1.6l-3.042 1.6a.9.9 0 0 1-1.306-.949l.58-3.387l-2.46-2.4a.9.9 0 0 1 .499-1.534l3.4-.495l1.522-3.082z"
                            fill="#FFC107"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>

                  <p>{{ currentCourse.reviews.length }} 則評價</p>
                </div>
              </div>

              <div
                v-for="(i, index) in showReviews"
                :key="index"
                class="my-4 flex rounded-xl border p-4"
              >
                <div class="avatar mr-4 w-1/6">
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
                  <p class="text-center">{{ currentCourse.reviews[i-1].userId }}</p>
                </div>

                <div class="w-full">
                  <div class="star mb-2 flex">
                    <div v-for="star in currentCourse.reviews[i-1].rating" :key="star" class="w-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 16 16"
                      >
                        <g fill="none">
                          <path
                            d="M7.194 2.101a.9.9 0 0 1 1.614 0l1.521 3.082l3.401.495a.9.9 0 0 1 .5 1.535l-2.462 2.399l.581 3.387a.9.9 0 0 1-1.306.949l-3.042-1.6l-3.042 1.6a.9.9 0 0 1-1.306-.949l.58-3.387l-2.46-2.4a.9.9 0 0 1 .499-1.534l3.4-.495l1.522-3.082z"
                            fill="#FFC107"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>

                  <p>{{ currentCourse.reviews[i-1].comment }}</p>
                </div>
              </div>

              <div
              v-if="currentCourse.reviews.length > showReviews"
              class="text-center mt-8 mb-8">
                <button
                class="rounded bg-white text-black w-[150px] py-1"
                type="button"
                @click="getMoreReviews"
                >查看更多</button>                
              </div>
            </div>

            <div class="gradient my-10 rounded-lg p-4 px-6">
              <h2 class="text-2xl font-bold">問與答</h2>

              <div class="flex flex-col my-4">
                <label for="new_question text-2xl">新增提問</label>
                <textarea
                v-model="newQuestion"
                id="new_question"
                class="rounded-lg text-black bg-[#DEE2E6] mt-4 p-2"
                name="new_question"
                cols="30"
                rows="10"
                placeholder="喜歡這堂課嗎? 購買課程後可以和大家已起討論囉!"
                >
                </textarea
                >

                <button
                class="rounded border bg-white text-black w-[150px] ml-auto my-2"
                :class="{'bg-gray': !newQuestion.length}"
                type="button"
                :disabled="!newQuestion.length"
                >
                送出
                </button>                
              </div>


              <h2 class="font-bold text-2xl">全部問答 ({{ currenChapterLession.question.length }})</h2>

              <div v-if="currenChapterLession.question.length" class="flex rounded-lg border">
                <img src="" alt="avatar" />

                <div>
                  <h2>使用者名稱</h2>
                  <p>問答內容</p>

                  <div class="flex">
                    <button type="button">回復</button>
                    <button type="button">共 0 則</button>
                  </div>
                </div>
              </div>

              <!-- <button type="button">查看更多</button> -->
            </div>
          </div>

          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
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
          question: []
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
  const total = currentCourse.reviews.reduce((accumulator, currentReview) => accumulator + currentReview.rating, 0)

  return total / currentCourse.reviews.length
})

// 章節選單的開關
const expandChapterController = (index: number) => {
  if(expandChapter.value === index){
    expandChapter.value = -1
  }else{
    expandChapter.value = index
  }
}

// 載入更多評價
const getMoreReviews = () => {
  if(currentCourse.reviews.length < (showReviews.value + 3)){
    showReviews.value = currentCourse.reviews.length
  }else{
    showReviews.value = showReviews.value + 3
  }
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
