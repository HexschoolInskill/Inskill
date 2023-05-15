<template>
  <Title>Inskill - 做最好的自己，學習最硬的技能</Title>
  <div class="overflow-hidden">
    <banner />
    <new-course />
    <stream-course />
    <comments />
    <popular-course />
    <praise-course />
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

onMounted(() => {
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
<style lang="scss">
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
