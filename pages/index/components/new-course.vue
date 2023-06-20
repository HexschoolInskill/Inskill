<template>
  <section class="new-course relative py-15">
    <in-container>
      <h2 class="gsap-slide-up text-center text-[32px] font-black text-white">新上好課</h2>
      <div id="new-course-slider" class="gsap-slide-up new-course__slider mt-10">
        <div class="swiper-wrapper">
          <div v-for="item in courses" :key="item._id" class="swiper-slide">
            <div class="group block cursor-pointer">
              <in-card
                glow
                xs-white
                perspective
                class="flex flex-col font-bold text-gray sm:text-white"
              >
                <div class="relative flex-shrink-0 overflow-hidden pt-7/10 sm:pt-6/10">
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
                <div class="flex-1 p-6 sm:p-8">
                  <h3 class="line-clamp-1 text-[28px] text-blue sm:text-white">
                    {{ item.title }}
                  </h3>
                  <div class="mt-6">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <i class="icon-category text-black sm:text-inherit"></i>
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
                        <i class="icon-people text-black sm:text-inherit"></i>
                      </div>
                      <div class="flex-1 pl-4">
                        <span>{{ formatNumber(item.purchasedCount) }}</span>
                        <span class="ml-3">人已經加入</span>
                      </div>
                    </div>
                    <div
                      class="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
                    >
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
                        <span class="text-gray sm:text-gray-l">NT$</span>
                        <span class="text-black sm:text-inherit">{{
                          formatNumber(item.price)
                        }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </in-card>
            </div>
          </div>
        </div>
      </div>
      <div class="new-course__pagination slider-pagination mt-10"></div>
    </in-container>
  </section>
</template>
<script lang="ts" setup>
import Swiper, { Pagination } from 'swiper'
import formatNumber from '@/utils/formatNumber'
import type { NormalCourse } from '@/http/modules/courses'
Swiper.use([Pagination])

defineProps({
  courses: {
    type: Array as PropType<NormalCourse[]>,
    default: () => []
  }
})

onMounted(() => {
  new Swiper('#new-course-slider', {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.new-course__pagination',
      bulletClass: 'slider-pagination__bullet',
      bulletActiveClass: 'slider-pagination__bullet--active',
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      1280: {
        slidesPerView: 3
      }
    }
  })
})
</script>
<style lang="scss">
.new-course {
  .swiper-slide {
    opacity: 0.5;
    transition: opacity 0.3s ease-in-out;
    &.swiper-slide-prev,
    &.swiper-slide-active,
    &.swiper-slide-next {
      opacity: 1;
    }
  }
}
</style>
