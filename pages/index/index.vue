<template>
  <Title>Inskill - 做最好的自己，學習最硬的技能</Title>
  <div>
    <nuxt-layout name="default" :padding-top="false">
      <template #header>
        <in-header />
      </template>
      <div class="overflow-hidden">
        <banner />
        <new-course :courses="newCourses" />
        <stream-course :courses="streamCourses" />
        <comments />
        <popular-course :courses="popularCourses" />
        <praise-course :courses="praiseCourses" />
      </div>
      <template #footer>
        <in-footer />
      </template>
    </nuxt-layout>
  </div>
</template>
<script setup lang="ts">
import Rellax from 'rellax'
import 'swiper/css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import NewCourse from './components/new-course.vue'
import Banner from './components/banner.vue'
import StreamCourse from './components/stream-course.vue'
import Comments from './components/comments.vue'
import PopularCourse from './components/popular-course.vue'
import PraiseCourse from './components/praise-course.vue'
import type { NormalCourse, StreamCourse as IStreamCourse } from '@/http/modules/courses'

const app = useNuxtApp()

const newCourses = ref<NormalCourse[]>([])
const praiseCourses = ref<NormalCourse[]>([])
const streamCourses = ref<IStreamCourse[]>([])
const popularCourses = ref<NormalCourse[]>([])

definePageMeta({
  layout: false
})

const { data } = await useAsyncData(() => app.$api.course.searchCourse())
if (data.value) {
  newCourses.value = data.value.newCourses
  streamCourses.value = data.value.streamCourse
  praiseCourses.value = data.value.praiseCourses
  popularCourses.value = data.value.popularCourses
}
onMounted(async () => {
  await nextTick()

  gsap.registerPlugin(ScrollTrigger)

  new Rellax('.rellax', {
    center: true
  })

  const els = document.querySelectorAll('.gsap-slide-up')

  for (const el of els) {
    gsap.from(el, {
      opacity: 0,
      y: '100px',
      scrollTrigger: {
        trigger: el,
        end: 'top center',
        scrub: 1
      }
    })
  }
})
</script>
<style lang="scss" scoped>
.slider-pagination {
  @apply flex flex-wrap items-center justify-center gap-6;

  &__bullet {
    border-radius: 100%;
    @apply transition-base h-4 w-4 bg-white/50 sm:h-2 sm:w-2;

    &--active {
      @apply bg-white;
    }
  }
}
</style>
