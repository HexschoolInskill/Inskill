<template>
  <section class="stream-course relative py-15">
    <in-container>
      <h2 class="gsap-slide-up text-center text-[32px] font-black text-white">最硬直播</h2>
      <div class="mx-auto lg:w-8/12">
        <div id="stream-course-slider" class="gsap-slide-up new-course__slider mt-10">
          <div class="swiper-wrapper">
            <div v-for="item in courses" :key="item._id" class="swiper-slide">
              <div class="group">
                <in-card xs-white>
                  <div class="relative pt-7/10 sm:pt-5/10">
                    <img
                      :src="item.thumbnail"
                      class="transition-base absolute left-0 top-0 h-full w-full object-cover group-hover:scale-105"
                      :alt="item.title"
                    />
                  </div>
                  <div class="p-6 font-bold text-gray sm:p-12 sm:text-white">
                    <h3 class="text-[28px] text-blue line-clamp-1 sm:text-white">
                      {{ item.title }}
                    </h3>
                    <div class="mt-4 flex flex-col justify-between sm:flex-row">
                      <div>
                        <div class="flex items-center">
                          <div class="flex-shrink-0">
                            <i class="icon-time text-black sm:text-inherit"></i>
                          </div>
                          <div class="flex-1 pl-4">
                            <span>直播時間</span>
                            <span class="ml-3">{{ item.startTime }}</span>
                          </div>
                        </div>
                        <div class="mt-4 flex items-center">
                          <div class="flex-shrink-0">
                            <i class="icon-people text-black sm:text-inherit"></i>
                          </div>
                          <div class="flex-1 pl-4">
                            <span>{{ item.purchasedCount }}</span>
                            <span class="ml-3">人已經加入</span>
                          </div>
                        </div>
                        <div class="mt-6 flex items-center justify-between">
                          <div class="flex items-center gap-3">
                            <img
                              class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full object-cover"
                              src="/images/avatar-fallback.svg"
                              alt=""
                            />
                            <p class="font-bol leading-normal">{{ item.teacherName }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="mt-4 sm:mt-0 sm:self-end">
                        <p class="flex items-center gap-5 text-2xl font-bold sm:justify-between">
                          <span class="text-gray sm:text-gray-l">NT$</span>
                          <span class="text-black sm:text-inherit">{{
                            formatNumber(item.price)
                          }}</span>
                        </p>
                        <div
                          class="transition-base mt-4 inline-flex w-full min-w-[64px] cursor-pointer items-center justify-center whitespace-nowrap rounded-1 border border-solid border-black bg-white px-3 py-2 font-normal leading-normal text-black"
                        >
                          我要預約
                        </div>
                      </div>
                    </div>
                  </div>
                </in-card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stream-course__pagination slider-pagination mt-10"></div>
    </in-container>
  </section>
</template>
<script lang="ts" setup>
import Swiper, { Pagination } from 'swiper'
import { IStreamCourse } from '@/http/modules/courses'

defineProps({
  courses: {
    type: Array as PropType<IStreamCourse[]>,
    default: () => []
  }
})

Swiper.use([Pagination])

onMounted(() => {
  new Swiper('#stream-course-slider', {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.stream-course__pagination',
      bulletClass: 'slider-pagination__bullet',
      bulletActiveClass: 'slider-pagination__bullet--active',
      clickable: true
    }
  })
})
</script>
<style lang="scss">
.stream-course {
  .swiper-slide {
    opacity: 0.5;
    transition: opacity 0.3s ease-in-out;

    &.swiper-slide-active {
      opacity: 1;
    }
  }
}
</style>
