<template>
  <!--課程內容介紹-->
  <div class="w-11/12">
    <div class="wrapper gradient rounded-lg p-4 px-6">
      <in-content-desc :current-course="currentCourse" :purchased="purchased"></in-content-desc>
    </div>

    <in-content-teacher :teacher="currentCourse.teacherName"></in-content-teacher>

    <in-content-review :review="currentCourse.reviews"></in-content-review>

    <in-content-question
      v-if="route.query.courseType === 'normal'"
      :questions="currenChapterLesson?.question || []"
      @add-question="($value: any) => addingQuestion({ userId: userProfile._id, chapter: content.chapter, lesson: content.lesson, comment: $value })"
      @add-reply="($value: any) => addingReply({ userId: userProfile._id, chapter: content.chapter, lesson: content.lesson, index: $value.index, comment: $value.msg })"
    ></in-content-question>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
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
const route = useRoute()

const { addingQuestion, addingReply } = useCourses()

const { chapter, lesson } = content.value

definePageMeta({
  layout: 'view-courses'
})

const currenChapterLesson = computed(() => {
  return route.query.courseType === 'normal' ? currentCourse.value?.chapters[chapter].lessons[lesson] : {}
})

</script>

<style scope>
.gradient {
  background: linear-gradient(90deg, rgb(38, 43, 47), #000);
}
</style>
