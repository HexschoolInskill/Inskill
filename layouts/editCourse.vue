<template>
  <div class="flex gap-10 px-3 py-15 md:px-10">
    <aside class="w-[200px] py-4 text-white">
      <ul class="sticky top-15 grid gap-2">
        <li>
          <nuxt-link
            :to="`/partner/courses/${$route.params.courseId}`"
            class="transition-base text-fs-6 flex h-13 items-center rounded-1 border-2 border-solid border-white/50 px-7 hover:border-purple-700"
            active-class="bg-purple-700 text-white border-transparent"
            >課程資訊
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="`/partner/courses/${$route.params.courseId}/chapters`"
            class="transition-base text-fs-6 flex h-13 items-center rounded-1 border-2 border-solid border-white/50 px-7 hover:border-purple-700"
            active-class="bg-purple-700 text-white border-transparent"
            >章節課程
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/user/courses/partnerCourses"
            class="transition-base text-fs-6 flex h-13 items-center rounded-1 border-2 border-solid border-white/50 px-7 hover:border-purple-700"
            >回到我的課程
          </nuxt-link>
        </li>
      </ul>
    </aside>
    <main class="flex-1 py-4 text-white">
      <slot></slot>
    </main>
  </div>
  <slot name="footer"></slot>
</template>

<script lang="ts" setup></script>
