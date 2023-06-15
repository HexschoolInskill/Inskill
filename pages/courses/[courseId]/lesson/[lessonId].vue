<template>
  <!--課程內容展示-->
  <div class="w-11/12">
    <div v-if="purchased || currenChapterLesson.freePreview" class="gradient rounded-lg p-4">
      <div class="flex">
        <h1 class="mr-auto text-3xl font-bold">{{ currenChapterLesson.title }}</h1>
        <span v-if="currenChapterLesson.freePreview" class="mb-10 rounded border px-6 py-1">
          試看
        </span>
      </div>

      <div v-for="(lesson, index) in currenChapterLesson.lessonContent" :key="index">
        <in-content-video
          v-if="lesson.contentType === 'video'"
          :content="lesson.content"
        ></in-content-video>

        <in-content-text
          v-if="lesson.contentType === 'text'"
          :content="lesson.content"
        ></in-content-text>

        <in-content-pdf
          v-if="lesson.contentType === 'pdf'"
          :content="lesson.content"
        ></in-content-pdf>

        <in-content-code
          v-if="lesson.contentType === 'code'"
          :content="lesson.content"
        ></in-content-code>
      </div>
    </div>

    <!-- 未開放試看 -->
    <div v-if="!currenChapterLesson.freePreview" class="gradient h-[410px] rounded-lg p-4">
      <div class="relative">
        <div class="absolute w-full bg-black p-4 py-[110px] text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32"
            class="mx-auto mb-4 w-[100px]"
          >
            <g fill="none">
              <path
                d="M18 20a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm-8-10V8a6 6 0 0 1 12 0v2h1.5a3.5 3.5 0 0 1 3.5 3.5v13a3.5 3.5 0 0 1-3.5 3.5h-15A3.5 3.5 0 0 1 5 26.5v-13A3.5 3.5 0 0 1 8.5 10H10zm2-2v2h8V8a4 4 0 0 0-8 0zm-3.5 4A1.5 1.5 0 0 0 7 13.5v13A1.5 1.5 0 0 0 8.5 28h15a1.5 1.5 0 0 0 1.5-1.5v-13a1.5 1.5 0 0 0-1.5-1.5h-15z"
                fill="currentColor"
              ></path>
            </g>
          </svg>

          <h1 class="text-4xl font-bold">此為付費課堂</h1>
        </div>
      </div>
    </div>

    <in-content-teacher></in-content-teacher>

    <in-content-review :review="currentCourse.reviews"></in-content-review>

    <in-content-question
      :questions="currenChapterLesson?.question || []"
      @add-question="($value: any) => createQuestion({ userId: userProfile._id, chapter: content.chapter, lesson: content.lesson, comment: $value })"
      @add-reply="($value: any) => createReply({ userId: userProfile._id, chapter: content.chapter, lesson: content.lesson, index: $value.index, comment: $value.msg })"
    >
    </in-content-question>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

// components
import inContentVideo from '../components/in-content-video.vue'
import inContentCode from '../components/in-content-code.vue'
import inContentPdf from '../components/in-content-pdf.vue'
import inContentText from '../components/in-content-text.vue'
import inContentTeacher from '../components/in-content-teacher.vue'
import inContentReview from '../components/in-content-review.vue'
import inContentQuestion from '../components/in-content-question.vue'

import useCourse from '~/stores/useCourses'
import useUser from '~/stores/useUser'

definePageMeta({
  layout: 'view-courses'
})

const purchased = ref(false)

const { currentCourse, content } = storeToRefs(useCourse())
const { userProfile } = storeToRefs(useUser())
const { createQuestion, createReply } = useCourse()
const route = useRoute()

const currenChapterLesson = ref(
  currentCourse.value.chapters[content.value.chapter].lessons[content.value.lesson]
)

onMounted(() => {
  console.log(route.params)

  console.log(currenChapterLesson)
})
</script>
