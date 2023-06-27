<template>
  <div class="flex gap-5">
    <in-btn size="small" :ghost="currentCategory !== 'normal'" @click="currentCategory = 'normal'"
      >影音課程</in-btn
    >
    <in-btn size="small" :ghost="currentCategory !== 'stream'" @click="currentCategory = 'stream'"
      >直播課程</in-btn
    >
  </div>
  <div class="py-10">
    <div v-if="isLoading" class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <in-skeleton class="h-[370px]" />
      <in-skeleton class="h-[370px]" />
      <in-skeleton class="h-[370px]" />
      <in-skeleton class="h-[370px]" />
    </div>
    <div v-else-if="courses.length" class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <nuxt-link
        v-for="item in courses"
        :key="item._id"
        :to="`/courses/${item._id}?courseType=${currentCategory}`"
      >
        <in-card glow class="group flex cursor-pointer flex-col font-bold text-[#6C757D]">
          <div class="relative flex-shrink-0 overflow-hidden pt-7/10 sm:pt-8/10">
            <img
              v-if="item.thumbnail"
              :src="item.thumbnail"
              :alt="item.title"
              class="transition-base absolute left-0 top-0 h-full w-full object-cover group-hover:scale-105"
            />
            <img v-else class="ml-auto mr-0" src="/images/logo-white.svg" :alt="item.title" />
            <div
              class="absolute left-0 top-0 h-full w-full bg-black/20 transition group-hover:opacity-0"
            ></div>
            <div
              class="transition-base absolute right-5 top-5 flex h-12 w-12 -translate-y-1 items-center justify-center rounded-full bg-white text-black opacity-0 hover:text-purple-600 group-hover:translate-y-0 group-hover:opacity-100"
              @click.stop.prevent="handleCollectCourse(item._id)"
            >
              <i class="icon-bookmark -mt-px text-[32px] text-purple-600"></i>
            </div>
          </div>
          <div class="flex-1 p-8 xl:px-6 xl:py-4">
            <h4
              class="transition-base line-clamp-2 text-h4 leading-[1.5] text-blue sm:text-[#6C757D] sm:group-hover:text-white"
            >
              {{ item.title }}
            </h4>
            <div class="mt-6 flex flex-col gap-4">
              <div class="flex items-center gap-3">
                <img
                  class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full object-cover"
                  src="/images/avatar-fallback.svg"
                  alt=""
                />
                <p class="font-bold leading-normal">
                  {{ item.teacherName }}
                </p>
              </div>
            </div>
          </div>
        </in-card>
      </nuxt-link>
    </div>
    <div v-else>
      <p class="text-center text-fs-4 font-bold text-white opacity-80">沒有已經收藏的課程</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { NormalCourse, StreamCourse } from '@/http/modules/courses'
import useNotification from '~/stores/useNotification'
import useUser from '~/stores/useUser'

const app = useNuxtApp()
const { notification } = useNotification()
const { userProfile: user } = storeToRefs(useUser())
const currentCategory = ref<'normal' | 'stream'>('normal')
const liveCourses = ref<
  Pick<
    StreamCourse,
    '_id' | 'title' | 'thumbnail' | 'teacherId' | 'teacherName' | 'teacherAvatar'
  >[]
>([])
const normalCourses = ref<
  Pick<
    NormalCourse,
    '_id' | 'title' | 'thumbnail' | 'teacherId' | 'teacherName' | 'teacherAvatar'
  >[]
>([])
const isLoading = ref(true)

const courses = computed(() => {
  if (currentCategory.value === 'normal') return normalCourses.value
  if (currentCategory.value === 'stream') return liveCourses.value
  return []
})

await fetchCollectCourses()

async function fetchCollectCourses() {
  isLoading.value = true
  try {
    const { collect } = await app.$api.course.fetchCollectCourses()
    normalCourses.value =
      (collect.find((item) => item.courseType === 'Course')?.courses as NormalCourse[]) ?? []
    liveCourses.value =
      (collect.find((item) => item.courseType === 'LiveCourse')?.courses as StreamCourse[]) ?? []
  } finally {
    isLoading.value = false
  }
}

async function handleCollectCourse(courseId: string) {
  isLoading.value = true
  try {
    const courseType = currentCategory.value === 'normal' ? 'Course' : 'LiveCourse'
    await app.$api.course.collectCourse({ courseId, courseType, isCollect: false })
    notification.success('已取消收藏')
    user.value.collectCourses = user.value.collectCourses.filter(
      (course) => course.courseId !== courseId
    )
    console.log(user.value.collectCourses)
    await fetchCollectCourses()
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}
</script>
<style lang="scss"></style>
