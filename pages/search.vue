<template>
  <Title>探索課程 - Inskill</Title>
  <in-container>
    <section class="py-10">
      <h1 class="text-[40px] font-black text-white">
        <template v-if="q">
          <span>有關</span>
          <span class="mx-5">{{ q }}</span>
          <span>的課程</span>
        </template>
      </h1>
    </section>
    <section
      class="transition-base select-none"
      :class="{ 'pointer-events-none opacity-50': isLoading }"
    >
      <div class="whitespace-nowrap border-b border-solid border-[#6C757D]">
        <div
          class="group relative mx-5 inline-block cursor-pointer pb-5 text-[20px] font-bold text-white"
          @click="category = 'normal'"
        >
          <p>一般課程</p>
          <div
            class="transition-base absolute bottom-0 left-0 h-1 w-full scale-x-0 bg-white group-hover:scale-x-100"
            :class="{ '!scale-x-100': category === 'normal' }"
          ></div>
        </div>
        <div
          class="group relative mx-5 inline-block cursor-pointer pb-5 text-[20px] font-bold text-white"
          @click="category = 'stream'"
        >
          <p>直播課程</p>
          <div
            class="transition-base absolute bottom-0 left-0 h-1 w-full scale-x-0 bg-white group-hover:scale-x-100"
            :class="{ '!scale-x-100': category === 'stream' }"
          ></div>
        </div>
      </div>
    </section>
    <section
      class="transition-base select-none py-5"
      :class="{ 'pointer-events-none opacity-50': isLoading }"
    >
      <div class="flex items-center justify-end text-white">
        <div
          class="cursor-pointer underline-offset-2 hover:underline"
          :class="{ underline: sortBy === 'popular' }"
          @click="sortBy = 'popular'"
        >
          依人數
        </div>
        <div class="mx-2 h-4 w-px bg-white"></div>
        <div
          class="cursor-pointer underline-offset-2 hover:underline"
          :class="{ underline: sortBy === 'praise' }"
          @click="sortBy = 'praise'"
        >
          依評價
        </div>
        <div class="mx-2 h-4 w-px bg-white"></div>
        <div
          class="cursor-pointer underline-offset-2 hover:underline"
          :class="{ underline: sortBy === 'time' }"
          @click="sortBy = 'time'"
        >
          依時間
        </div>
      </div>
    </section>
    <section class="mt-10 pb-32">
      <div v-if="isLoading" class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <in-skeleton class="h-[480px]" />
        <in-skeleton class="h-[480px]" />
        <in-skeleton class="h-[480px]" />
        <in-skeleton class="h-[480px]" />
      </div>
      <div
        v-else-if="category === 'normal' && normalCourses.length"
        class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        <in-card
          v-for="item in normalCourses"
          :key="item._id"
          class="group flex cursor-pointer flex-col font-bold text-[#6C757D]"
        >
          <div class="relative flex-shrink-0 overflow-hidden pt-7/10 sm:pt-8/10">
            <img
              :src="item.thumbnail"
              :alt="item.title"
              class="transition-base absolute left-0 top-0 h-full w-full object-cover group-hover:scale-105"
            />
            <div
              class="transition-base absolute right-5 top-5 flex h-12 w-12 -translate-y-1 items-center justify-center rounded-full bg-white text-black opacity-0 hover:text-[#FFC107] group-hover:translate-y-0 group-hover:opacity-100"
            >
              <i class="icon-bookmark-outline -mt-px text-[32px]"></i>
            </div>
          </div>
          <div class="flex-1 p-8 xl:px-6 xl:py-4">
            <h3
              class="transition-base text-[28px] text-blue line-clamp-1 sm:text-[#6C757D] sm:group-hover:text-white"
            >
              {{ item.title }}
            </h3>
            <div class="mt-2 flex gap-3 xl:block">
              <div class="flex gap-3 text-[#DEE2E6]/50">
                <i
                  v-for="score in Math.round(item.averageRating)"
                  :key="score"
                  class="icon-star text-[22px] text-yellow"
                ></i>
                <i
                  v-for="score in 5 - Math.round(item.averageRating)"
                  :key="score"
                  class="icon-star text-[22px]"
                ></i>
              </div>
              <p class="mt-2">{{ item.scoreCount }} 則評價</p>
            </div>
            <div class="mt-6 flex items-center">
              <div class="flex-shrink-0">
                <i class="icon-category text-black sm:text-white"></i>
              </div>
              <div class="flex-1 pl-4">
                <span>章節數量</span>
                <span class="ml-3">{{ formatNumber(item.chapter) }}</span>
                <span>章</span>
                <span>{{ formatNumber(item.course) }}</span>
                <span>節</span>
              </div>
            </div>
            <div class="mt-4 flex items-center">
              <div class="flex-shrink-0">
                <i class="icon-people text-black sm:text-white"></i>
              </div>
              <div class="flex-1 pl-4">
                <span>{{ formatNumber(item.purchasedCount) }}</span>
                <span class="ml-3">人已經加入</span>
              </div>
            </div>
            <div class="mt-6 flex flex-col gap-4">
              <div class="flex items-center gap-3">
                <img
                  class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full object-cover"
                  src="/images/avatar-fallback.svg"
                  alt=""
                />
                <p class="font-bold leading-normal">{{ item.teacherName }}</p>
              </div>
              <p class="flex items-center gap-5 text-2xl">
                <span>NT$</span>
                <span class="text-black sm:text-white">{{ formatNumber(item.price) }}</span>
              </p>
            </div>
          </div>
        </in-card>
      </div>
      <div
        v-else-if="category === 'stream' && streamCourses.length"
        class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        <in-card
          v-for="item in streamCourses"
          :key="item._id"
          class="group flex cursor-pointer flex-col font-bold text-[#6C757D]"
        >
          <div class="relative flex-shrink-0 overflow-hidden pt-7/10 sm:pt-8/10">
            <img
              :src="item.thumbnail"
              :alt="item.title"
              class="transition-base absolute left-0 top-0 h-full w-full object-cover group-hover:scale-105"
            />
            <div
              class="transition-base absolute right-5 top-5 flex h-12 w-12 -translate-y-1 items-center justify-center rounded-full bg-white text-black opacity-0 hover:text-[#FFC107] group-hover:translate-y-0 group-hover:opacity-100"
            >
              <i class="icon-bookmark-outline -mt-px text-[32px]"></i>
            </div>
          </div>
          <div class="flex-1 p-8 xl:px-6 xl:py-4">
            <h3
              class="transition-base text-[28px] text-blue line-clamp-1 sm:text-[#6C757D] sm:group-hover:text-white"
            >
              {{ item.title }}
            </h3>
            <div class="mt-6 flex items-center">
              <div class="flex-shrink-0">
                <i class="icon-time text-black sm:text-inherit"></i>
              </div>
              <p class="pl-4">{{ item.startTime }}</p>
            </div>
            <div class="mt-4 flex items-center">
              <div class="flex-shrink-0">
                <i class="icon-people text-black sm:text-white"></i>
              </div>
              <div class="flex-1 pl-4">
                <span>{{ formatNumber(item.purchasedCount) }}</span>
                <span class="ml-3">人已經加入</span>
              </div>
            </div>
            <div class="mt-6 flex flex-col gap-4">
              <div class="flex items-center gap-3">
                <img
                  class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full object-cover"
                  src="/images/avatar-fallback.svg"
                  alt=""
                />
                <p class="font-bold leading-normal">{{ item.teacherName }}</p>
              </div>
              <p class="flex items-center gap-5 text-2xl">
                <span>NT$</span>
                <span class="text-black sm:text-white">{{ formatNumber(item.price) }}</span>
              </p>
            </div>
          </div>
        </in-card>
      </div>
      <div v-else>
        <h2 class="text-center text-h2 font-bold text-white">沒有相關課程</h2>
      </div>
    </section>
    <!-- <section class="pb-32 select-none transition-base" :class="{ 'opacity-50 pointer-events-none': isLoading }">
      <div class="flex items-center justify-center">
        <in-pagination :page="page" :page-count="pageCount" :page-slot="3">
          <template #prev="{ disabled }">
            <div
              class="transition-base flex h-12 w-12 flex-shrink-0 rotate-90 cursor-pointer items-center justify-center rounded-full bg-white hover:bg-[#6C757D]"
              :class="{
                'pointer-events-none border border-solid border-[#6C757D] !bg-transparent !text-[#6C757D]':
                  disabled
              }">
              <i class="icon-arrow -mt-px text-[24px]"></i>
            </div>
          </template>
          <template #default="{ num, active }">
            <div
              class="transition-base flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-solid border-white font-bold text-white hover:bg-white hover:text-black"
              :class="{ '!bg-white !text-black': active }">
              {{ num }}
            </div>
          </template>
          <template #next="{ disabled }">
            <div
              class="transition-base flex h-12 w-12 flex-shrink-0 -rotate-90 cursor-pointer items-center justify-center rounded-full bg-white hover:bg-[#6C757D]"
              :class="{
                'pointer-events-none border border-solid border-[#6C757D] !bg-transparent !text-[#6C757D]':
                  disabled
              }">
              <i class="icon-arrow -mt-px text-[24px]"></i>
            </div>
          </template>
        </in-pagination>
      </div>
    </section> -->
  </in-container>
</template>
<script lang="ts" setup>
import { NormalCourse, StreamCourse, CourseSortBy, CourseCategory } from '@/http/modules/courses'
import useNotification from '~/stores/useNotification'
// import useUser from '~/stores/useUser'
// import { storeToRefs } from 'pinia'

// const userStore = useUser()
// const { userProfile } = storeToRefs(userStore)
const route = useRoute()
const router = useRouter()
const app = useNuxtApp()
const { notification } = useNotification()

const isLoading = ref(false)
const normalCourses = ref<NormalCourse[]>([])
const streamCourses = ref<StreamCourse[]>([])
const q = ref<string>('')
const category = ref<CourseCategory>('normal')
const sortBy = ref<CourseSortBy>('popular')
// const page = ref(1)
// const pageCount = ref(1)

await searchCourseByRouteQuery()

watch([category, sortBy], ([category, sortBy]) => {
  router.push(`/search?q=${q.value}&category=${category}&sortBy=${sortBy}`)
})
watch(
  () => route.query,
  async (query) => {
    // page.value = 1
    // pageCount.value = 1
    if (typeof query.q === 'string') q.value = query.q
    await searchCourse()
  }
)

async function searchCourse() {
  isLoading.value = true
  try {
    const res = await app.$api.course.searchCourse({
      q: q.value,
      category: category.value,
      sortBy: sortBy.value
    })
    if (category.value === 'stream')
      streamCourses.value = (res.searchCourses as StreamCourse[]) ?? []
    if (category.value === 'normal')
      normalCourses.value = (res.searchCourses as NormalCourse[]) ?? []
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}

async function searchCourseByRouteQuery() {
  if (route.query.q !== undefined && typeof route.query.q === 'string') q.value = route.query.q
  if (route.query.category === 'normal' || route.query.category === 'stream')
    category.value = route.query.category
  if (
    route.query.sortBy === 'popular' ||
    route.query.sortBy === 'time' ||
    route.query.sortBy === 'praise'
  )
    sortBy.value = route.query.sortBy
  const { data } = await useAsyncData(() =>
    app.$api.course.searchCourse({ q: q.value, category: category.value, sortBy: sortBy.value })
  )
  if (category.value === 'stream')
    streamCourses.value = (data.value?.searchCourses as StreamCourse[]) ?? []
  if (category.value === 'normal')
    normalCourses.value = (data.value?.searchCourses as NormalCourse[]) ?? []
}

// async function collectCourse() {}
</script>
<style lang="scss"></style>
