<template>
  <div class="flex gap-5">
    <in-btn size="small" :ghost="currentCategory !== 'normal'" @click="currentCategory = 'normal'"
      >影音課程</in-btn
    >
    <in-btn size="small" :ghost="currentCategory !== 'stream'" @click="currentCategory = 'stream'"
      >直播課程</in-btn
    >
  </div>
  <div class="grid gap-6 py-10 sm:grid-cols-2 xl:grid-cols-4">
    <div v-for="course in courses" :key="course._id"></div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useUser from '@/stores/useUser'

const currentCategory = ref<'normal' | 'stream'>('normal')
const { userProfile: user } = storeToRefs(useUser())
const liveCourses = computed(() =>
  user.value.purchasedCourses.filter((course) => course.courseType === 'LiveCourse')
)
const normalCourses = computed(() =>
  user.value.purchasedCourses.filter((course) => course.courseType === 'Course')
)
const courses = computed(() => {
  if (currentCategory.value === 'normal') return normalCourses.value
  if (currentCategory.value === 'stream') return liveCourses.value
  return []
})
</script>
<style lang="scss"></style>
