<template>
  <div class="flex gap-10 px-3 py-15 md:px-10">
    <aside class="w-[280px] py-4 text-white">
      <ul class="sticky top-15 grid gap-2">
        <li>
          <nuxt-link
            to="/partner/courses"
            class="transition-base text-fs-6 flex h-13 items-center rounded-1 border border-solid border-white px-7 hover:bg-white hover:text-black"
            >課程資訊
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/partner/courses/chapters"
            class="transition-base text-fs-6 flex h-13 items-center rounded-1 border border-solid border-white px-7 hover:bg-white hover:text-black"
            >章節課程
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/partner/courses/price"
            class="transition-base text-fs-6 flex h-13 items-center rounded-1 border border-solid border-white px-7 hover:bg-white hover:text-black"
            >價格
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/"
            class="transition-base text-fs-6 flex h-13 items-center rounded-1 border border-solid border-white px-7 hover:bg-white hover:text-black"
            >回到我的課程
          </nuxt-link>
        </li>
      </ul>
    </aside>
    <main class="flex-1 py-4 text-white">
      <slot />
    </main>
  </div>
  <slot name="footer"></slot>
</template>

<script lang="ts" setup></script>
