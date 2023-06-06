<template>
  <div class="flex">
    <!--課程內容展示-->
    <div class="content w-11/12">
      <div class="wrapper gradient rounded-lg p-4 px-6">
        <in-content-desc :current-course="currentCourse" :purchased="purchased"></in-content-desc>
      </div>

      <in-content-teacher></in-content-teacher>

      <in-content-review :review="currentCourse.reviews"></in-content-review>

      <in-content-question
        :questions="currenChapterLession.question"
        @add-question="($value: any) => addingQuestion($value)"
        @add-reply="($value: any) => addingReply($value)"
      ></in-content-question>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

// components
import inContentDesc from './components/in-content-desc.vue'
import inContentTeacher from './components/in-content-teacher.vue'
import inContentReview from './components/in-content-review.vue'
import inContentQuestion from './components/in-content-question.vue'

import coursesStore from '~/stores/useCourses'
//   import useUser from '~/stores/useUser'

const { currentCourse, content } = storeToRefs(coursesStore())
//   const { userProfile } = storeToRefs(useUser())
// const { setCurrentCourse } = coursesStore()

// const { $api } = useNuxtApp()

definePageMeta({
  layout: 'view-courses'
})

const route = useRoute()

const currenChapterLession = ref(
  currentCourse.value.chapters[content.value.chapter].lessions[content.value.lession]
)

const purchased = ref(false)

// 新增提問
const addingQuestion = ($value: any) => {
  currenChapterLession.value.question.push({
    userId: '',
    comment: $value,
    reply: []
  })
}

// 新增回復
const addingReply = ($value: any) => {
  currenChapterLession.value.question[$value.index].reply.push({
    userId: '',
    comment: $value.msg
  })
}

// onMounted(async () => {
onMounted(() => {
  console.log(route.params)
  // if (route.params.id) {
  // 發動取該課程的 api
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
