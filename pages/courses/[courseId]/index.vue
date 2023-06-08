<template>
  <!--課程內容介紹-->
  <div class="w-11/12">
    <div class="wrapper gradient rounded-lg p-4 px-6">
      <in-content-desc :current-course="currentCourse" :purchased="purchased"></in-content-desc>
    </div>

    <in-content-teacher></in-content-teacher>

    <in-content-review :review="currentCourse.reviews"></in-content-review>

    <in-content-question
      :questions="currenChapterLession.question"
      @add-question="($value: any) => addingQuestion({ userId: userProfile._id, chapter: content.chapter, lesson: content.lesson, comment: $value })"
      @add-reply="($value: any) => addingReply({ userId: userProfile._id, chapter: content.chapter, lesson: content.lesson, index: $value.index, comment: $value.msg })"
    ></in-content-question>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

// components
import inContentDesc from './components/in-content-desc.vue'
import inContentTeacher from './components/in-content-teacher.vue'
import inContentReview from './components/in-content-review.vue'
import inContentQuestion from './components/in-content-question.vue'

import useCourses from '~/stores/useCourses'
import useUser from '~/stores/useUser'

const { currentCourse, content, purchased } = storeToRefs(useCourses())
const { userProfile } = storeToRefs(useUser())

const { addingQuestion, addingReply } = useCourses()

const { chapter, lesson } = content.value

definePageMeta({
  layout: 'view-courses'
})

const currenChapterLession = ref(currentCourse.value?.chapters[chapter].lessons[lesson])
</script>

<style scope>
.gradient {
  background: linear-gradient(90deg, rgb(38, 43, 47), #000);
}
</style>
