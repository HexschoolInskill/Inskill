<template>
  <!-- <slot name="header"></slot> -->

  <div class="flex">
    <aside class="w-1/12 text-white">
      <h1 class="bg-gray p-4" style="overflow-wrap: break-word">{{ currentCourse.title }}</h1>
      <ul class="p-4">
        <li class="mb-4" :class="{'border-bottom': route.path === '/partner/courses'}">
          <NuxtLink to="/partner/courses">課程資訊</NuxtLink>
        </li>
        <li class="mb-4" :class="{'border-bottom': route.path === '/partner/courses/chapter'}">
          <NuxtLink to="/partner/courses/chapter">章節課程</NuxtLink>
        </li>
        <li class="mb-4" :class="{'border-bottom': route.path === '/partner/courses/price'}">
          <NuxtLink to="/partner/courses/price">價格</NuxtLink>
        </li>
      </ul>
    </aside>

    <main class="w-11/12 text-white">
      <slot />
    </main>
  </div>

  <slot name="footer"></slot>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import coursesStore from '~/stores/courses'

const { currentCourse } = storeToRefs(coursesStore())
const route = useRoute()
</script>
