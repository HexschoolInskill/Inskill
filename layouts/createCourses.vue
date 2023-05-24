<template>
  <!-- <slot name="header"></slot> -->

  <div class="flex">
    <aside class="w-1/12 p-4 text-white">
      <div class="py-5 text-center">{{ currentCourse.title }}</div>
      <ul class="py-4">
        <li class="mb-4">
          <NuxtLink>課程資訊</NuxtLink>
        </li>
        <li class="mb-4">
          <NuxtLink>章節課程</NuxtLink>
        </li>
        <li class="mb-4">
          <NuxtLink>價格</NuxtLink>
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
</script>
