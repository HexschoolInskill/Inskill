<template>
  <section class="popular-course py-15">
    <in-container>
      <div class="gsap-slide-up flex items-center justify-center sm:justify-between">
        <h2 class="text-center text-[32px] font-black text-white">熱門課程</h2>
        <nuxt-link
          to="/search?q=&sortBy=popular?category=normal"
          class="hidden cursor-pointer items-center text-white sm:flex"
        >
          <p>更多熱門課程</p>
          <i class="icon-arrow ml-3 text-[24px] before:-rotate-90"></i>
        </nuxt-link>
      </div>
      <div class="gsap-slide-up mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <in-card
          v-for="item in courses"
          :key="item._id"
          glow
          xs-white
          perspective
          class="group flex cursor-pointer flex-col font-bold text-gray"
        >
          <div class="relative flex-shrink-0 overflow-hidden pt-7/10 sm:pt-8/10">
            <nuxt-link
              :to="`/courses/${item._id}?courseType=normal`"
              class="cursor-pointer items-center text-white sm:flex"
            >
              <img
                :src="item.thumbnail"
                :alt="item.title"
                class="transition-base absolute left-0 top-0 h-full w-full object-cover group-hover:scale-105"
              />
            </nuxt-link>
          </div>
          <div class="flex-1 p-8 xl:px-6 xl:py-4">
            <h3 class="line-clamp-1 text-[28px] text-blue sm:text-gray">
              {{ item.title }}
            </h3>
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
                <p class="font-bold leading-normal">
                  <nuxt-link
                    :to="`/partner/courses/${item._id}`"
                    class="hidden cursor-pointer items-center text-white sm:flex"
                  >
                    {{ item.teacherName }}
                  </nuxt-link>
                </p>
              </div>
              <p class="flex items-center gap-5 text-2xl">
                <span>NT$</span>
                <span class="text-black sm:text-white">{{ formatNumber(item.price) }}</span>
              </p>
            </div>
          </div>
        </in-card>
      </div>
      <nuxt-link
        :to="`/search?sortBy=popular`"
        class="mt-10 flex h-11 w-full cursor-pointer select-none items-center justify-center rounded-1 bg-white text-black sm:hidden"
      >
        <p>更多熱門課程</p>
        <i class="icon-arrow ml-3 text-[24px] before:-rotate-90"></i>
      </nuxt-link>
    </in-container>
  </section>
</template>
<script lang="ts" setup>
import { NormalCourse } from '@/http/modules/courses'
defineProps({
  courses: {
    type: Array as PropType<NormalCourse[]>,
    default: () => []
  }
})
</script>
<style lang="scss"></style>
