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
        class="h-full"
        :to="`/courses/${item._id}?courseType=${currentCategory}`"
      >
        <in-card glow class="group flex h-full cursor-pointer flex-col font-bold text-[#6C757D]">
          <div class="relative flex-shrink-0 overflow-hidden pt-7/10 sm:pt-8/10">
            <img
              v-if="item.thumbnail"
              :src="item.thumbnail"
              :alt="item.title"
              class="transition-base absolute left-0 top-0 h-full w-full object-cover group-hover:scale-105"
            />
            <img
              v-else
              class="absolute bottom-0 right-0 w-[160px] object-contain"
              src="/images/logo-white.svg"
              :alt="item.title"
            />
            <div
              class="absolute left-0 top-0 h-full w-full bg-black/20 opacity-0 transition group-hover:opacity-100"
            ></div>
          </div>
          <div class="flex flex-1 flex-col justify-between p-8 xl:px-6 xl:py-4">
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
    <div v-else class="text-center">
      <p class="text-center text-fs-4 font-bold text-white opacity-80">沒有已經購買的課程</p>
      <in-btn class="mt-5" size="small" @click="navigateTo('/search?q=')">來去逛逛</in-btn>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NormalCourse, StreamCourse } from '@/http/modules/courses'
import useNotification from '~/stores/useNotification'

const app = useNuxtApp()
const { notification } = useNotification()
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

await fetchPurchasedCourses()

async function fetchPurchasedCourses() {
  isLoading.value = true
  try {
    const { purchasedCourses } = await app.$api.course.fetchPurchasedCourses()
    normalCourses.value =
      (purchasedCourses.find((item) => item.courseType === 'Course')?.courses as NormalCourse[]) ??
      []
    liveCourses.value =
      (purchasedCourses.find((item) => item.courseType === 'LiveCourse')
        ?.courses as StreamCourse[]) ?? []
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}
</script>
<style lang="scss"></style>
