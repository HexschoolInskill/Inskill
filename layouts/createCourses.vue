<template>
  <!-- <slot name="header"></slot> -->

  <div class="flex">
    <aside
      class="absolute ml-[-100vw] h-full w-4/12 bg-black text-white sm:relative sm:ml-[unset] sm:w-1/12"
    >
      <h1 class="bg-gray p-4" style="overflow-wrap: break-word">{{ currentCourse.title }}</h1>
      <ul class="p-4">
        <li class="mb-4" :class="{ 'border-bottom': route.path === '/partner/courses' }">
          <NuxtLink to="/partner/courses">課程資訊</NuxtLink>
        </li>
        <li class="mb-4" :class="{ 'border-bottom': route.path === '/partner/courses/chapter' }">
          <NuxtLink to="/partner/courses/chapter">章節課程</NuxtLink>
        </li>
        <li class="mb-4" :class="{ 'border-bottom': route.path === '/partner/courses/price' }">
          <NuxtLink to="/partner/courses/price">價格</NuxtLink>
        </li>
      </ul>
    </aside>

    <main class="w-full text-white sm:w-11/12">
      <slot />
    </main>
  </div>

  <slot name="footer"></slot>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import coursesStore from '~/stores/useCourses'

const { currentCourse } = storeToRefs(coursesStore())
const route = useRoute()
</script>
