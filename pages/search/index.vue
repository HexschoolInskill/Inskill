<template>
  <in-container>
    <section class="py-10">
      <h1 class="text-[40px] font-black text-white">
        <template v-if="route.query.q">
          <span>有關</span>
          <span class="mx-5">{{ route.query.q }}</span>
          <span>的課程</span>
        </template>
      </h1>
    </section>
    <section>
      <div class="whitespace-nowrap border-b border-solid border-[#6C757D]">
        <div
          class="group relative mx-5 inline-block cursor-pointer pb-5 text-[20px] font-bold text-white"
          @click="category = 'normal'"
        >
          <p>一般課程</p>
          <div
            class="transition-base absolute left-0 bottom-0 h-1 w-full scale-x-0 bg-white group-hover:scale-x-100"
            :class="{ '!scale-x-100': category === 'normal' }"
          ></div>
        </div>
        <div
          class="group relative mx-5 inline-block cursor-pointer pb-5 text-[20px] font-bold text-white"
          @click="category = 'stream'"
        >
          <p>直播課程</p>
          <div
            class="transition-base absolute left-0 bottom-0 h-1 w-full scale-x-0 bg-white group-hover:scale-x-100"
            :class="{ '!scale-x-100': category === 'stream' }"
          ></div>
        </div>
      </div>
    </section>
    <section class="py-5">
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
    <section class="pb-32">
      <div class="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <in-card
          v-for="item in list"
          :key="item.id"
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
          <div class="flex-1 p-8 xl:py-4 xl:px-6">
            <h3 class="text-[28px] text-blue line-clamp-1 sm:text-[#6C757D]">
              {{ item.title }}
            </h3>
            <div class="mt-2 flex gap-3 xl:block">
              <div class="flex gap-3 text-[#DEE2E6]/50">
                <i
                  v-for="score in item.score.value"
                  :key="score"
                  class="icon-star text-[22px] text-[#FFC107]"
                ></i>
                <i
                  v-for="score in 5 - item.score.value"
                  :key="score"
                  class="icon-star text-[22px]"
                ></i>
              </div>
              <p class="mt-2">{{ item.score.count }} 則評價</p>
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
                <span>{{ formatNumber(item.students) }}</span>
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
                <p class="font-bold leading-normal">{{ item.teacher.name }}</p>
              </div>
              <p class="flex items-center gap-5 text-2xl">
                <span>NT$</span>
                <span class="text-black sm:text-white">{{ formatNumber(item.price) }}</span>
              </p>
            </div>
          </div>
        </in-card>
      </div>
    </section>
    <section class="pb-32">
      <div class="flex items-center justify-center">
        <in-pagination :page="page" :page-count="pageCount" :page-slot="3">
          <template #prev="{ disabled }">
            <div
              class="transition-base flex h-12 w-12 flex-shrink-0 rotate-90 cursor-pointer items-center justify-center rounded-full bg-white hover:bg-[#6C757D]"
              :class="{
                'pointer-events-none border border-solid border-[#6C757D] !bg-transparent !text-[#6C757D]':
                  disabled
              }"
            >
              <i class="icon-arrow -mt-px text-[24px]"></i>
            </div>
          </template>
          <template #default="{ num, active }">
            <div
              class="transition-base flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-solid border-white font-bold text-white hover:bg-white hover:text-black"
              :class="{ '!bg-white !text-black': active }"
            >
              {{ num }}
            </div>
          </template>
          <template #next="{ disabled }">
            <div
              class="transition-base flex h-12 w-12 flex-shrink-0 -rotate-90 cursor-pointer items-center justify-center rounded-full bg-white hover:bg-[#6C757D]"
              :class="{
                'pointer-events-none border border-solid border-[#6C757D] !bg-transparent !text-[#6C757D]':
                  disabled
              }"
            >
              <i class="icon-arrow -mt-px text-[24px]"></i>
            </div>
          </template>
        </in-pagination>
      </div>
    </section>
  </in-container>
</template>
<script lang="ts" setup>
const route = useRoute()

const list = ref([
  {
    id: 1,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-1.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 2,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-2.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 3,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-3.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 4,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-4.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 1,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-1.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 2,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-2.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 3,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-3.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 4,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-4.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 1,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-1.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 2,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-2.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 3,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-3.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 4,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-4.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 1,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-1.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 2,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-2.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 3,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-3.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 4,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-4.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 1,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-1.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 2,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-2.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 3,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-3.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  },
  {
    id: 4,
    title: '好評課程名稱',
    thumbnail: '/images/index-praise-course-4.jpg',
    price: 99999,
    teacher: {
      name: '我是老師'
    },
    score: {
      value: 4,
      count: 99
    },
    chapter: 9,
    course: 99,
    students: 9999
  }
])
const category = ref<'normal' | 'stream'>('normal')
const sortBy = ref<'popular' | 'praise' | 'time'>('popular')
const page = ref(1)
const pageCount = ref(10)
watch([category, sortBy], () => {
  page.value = 1
})
</script>
<style lang="scss"></style>
