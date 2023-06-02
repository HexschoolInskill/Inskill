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
          >
            <div class="flex items-center">
              <span class="mr-auto">{{ chapter.title }}</span>
              <i class="icon-arrow text-[24px]"></i>
            </div>

            <ul v-if="expandChapter === index">
              <li v-for="lession in chapter.lessions" :key="lession.title">
                <div class="flex">
                  <span>{{ lession.title }}</span>
                  <span v-if="lession.freePreview" class="rounded-md">試看</span>
                </div>
              </li>
            </ul>
          </li>
          <!-- <li class="flex">
                        <span>章節名稱</span>
                        <i class="icon-arror text-[24px]"></i>
                    </li>
                    <li class="flex">
                        <span>章節名稱</span>
                        <i class="icon-arror text-[24px]"></i>
                    </li>
                    <li class="flex">
                        <span>章節名稱</span>
                        <i class="icon-arror text-[24px]"></i>
                    </li> -->
        </ul>
      </aside>

      <main class="w-10/12 p-4">
        <div class="flex">
          <div
            class="wrapper w-11/12 rounded-lg p-4"
            style="background: linear-gradient(90deg, rgb(38, 43, 47), #000)"
          >
            <div class="mb-10 flex">
              <h1 class="mr-auto text-3xl font-bold">{{ currenChapterLession.title }}</h1>
              <span v-if="currenChapterLession.freePreview" class="rounded border px-6">試看</span>
            </div>

            <div v-for="(content, index) in currenChapterLession.lessionContent" :key="index">
              <in-content-video
                v-if="content.contentType === 'video'"
                :source="content.content"
              ></in-content-video>

              <in-content-text
                v-if="content.contentType === 'text'"
                :source="content.content"
              ></in-content-text>
            </div>

            <div class="rounded-lg">
              <h2>授課講師</h2>

              <div class="flex">
                <img src="" alt="avatar" />

                <div>
                  <h3>講師名稱</h3>
                  <p>講師介紹</p>
                </div>
              </div>
            </div>

            <div class="rounded-lg">
              <h2>課程評價</h2>

              <div class="flex">
                <h1 class="text-3xl font-bold">0</h1>

                <div>
                  <!-- 星星 -->
                </div>
              </div>

              <div class="flex rounded-lg">
                <img src="" alt="avatar" />

                <div>
                  <div>星星</div>
                  <p>評價</p>
                </div>
              </div>

              <!-- <button type="button">查看更多</button> -->
            </div>

            <div class="rounded-lg">
              <h2>問與答</h2>

              <label for="new_question">新增提問</label>
              <textarea
                id="new_question"
                class="rounded-lg"
                name="new_question"
                cols="30"
                rows="10"
                placeholder="喜歡這堂課嗎? 購買課程後可以和大家已起討論囉!"
              >
              </textarea>

              <button type="button">送出</button>

              <p>全部問答 (0)</p>

              <div class="flex rounded-lg">
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
import { ref, onMounted } from 'vue'
// import { storeToRefs } from 'pinia'
// import coursesStore from '~/stores/useCourses'

// const { currentCourse } = storeToRefs(coursesStore())
// const { setCurrentCourse } = coursesStore()

const { $api } = useNuxtApp()
const route = useRoute()

const expandChapter = ref(null)

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
              content: '/video/movie.mp4',
              sort: 0
            }
          ],
          comments: []
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
          comments: []
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
  reviews: []
}

const currenChapterLession = ref(currentCourse.chapters[0].lessions[0])

onMounted(async () => {
  console.log(route.params)
  if (route.params.id) {
    // 發動取該課程章節資訊的 api
    const courseId = String(route.params.id)
    const currentCourse: any = await $api.course.getCourseContent(courseId)
    console.log(currentCourse)
    // setCurrentCourse(currentCourse)
  }
})
</script>
