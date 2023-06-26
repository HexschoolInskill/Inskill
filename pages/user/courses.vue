<template>
  <nuxt-layout name="default">
    <template #header>
      <in-header />
    </template>
    <section class="py-20">
      <in-container>
        <div class="mx-auto sm:w-10/12">
          <nuxt-link to="/user/profile" class="flex cursor-pointer items-center gap-5">
            <div class="relative h-15 w-15 flex-shrink-0 overflow-hidden rounded-full">
              <img
                v-if="user.avatar"
                class="absolute left-0 top-0 h-full w-full object-cover"
                :src="user.avatar"
                alt=""
              />
              <img
                v-else
                class="absolute left-0 top-0 h-full w-full object-cover"
                src="/images/avatar-fallback.svg"
                alt=""
              />
            </div>
            <div>
              <p class="text-fs-4 font-bold text-white">{{ user.username }}</p>
            </div>
          </nuxt-link>
          <div
            class="mt-10 overflow-x-auto overflow-y-hidden whitespace-nowrap border-b border-solid border-[#6C757D]"
          >
            <nuxt-link
              v-slot="{ isActive }"
              to="/user/courses/myCourses"
              class="text-fs-[20px] group relative mr-10 inline-block cursor-pointer pb-4 font-bold text-white last:mr-0"
            >
              <p :class="{ 'text-purple-600': isActive }">開設的課程</p>
              <div
                class="transition-base absolute bottom-0 left-0 h-1 w-full scale-x-0 rounded-1 bg-white group-hover:scale-x-100"
                :class="{ '!scale-x-100 !bg-purple-600': isActive }"
              ></div>
            </nuxt-link>
            <nuxt-link
              v-slot="{ isActive }"
              to="/user/courses/purchasedCourses"
              class="text-fs-[20px] group relative mr-10 inline-block cursor-pointer pb-4 font-bold text-white last:mr-0"
            >
              <p :class="{ 'text-purple-600': isActive }">購買的課程</p>
              <div
                class="transition-base absolute bottom-0 left-0 h-1 w-full scale-x-0 rounded-1 bg-white group-hover:scale-x-100"
                :class="{ '!scale-x-100 !bg-purple-600': isActive }"
              ></div>
            </nuxt-link>
            <nuxt-link
              v-slot="{ isActive }"
              to="/user/courses/collectCourses"
              class="text-fs-[20px] group relative mr-10 inline-block cursor-pointer pb-4 font-bold text-white last:mr-0"
            >
              <p :class="{ 'text-purple-600': isActive }">收藏的課程</p>
              <div
                class="transition-base absolute bottom-0 left-0 h-1 w-full scale-x-0 rounded-1 bg-white group-hover:scale-x-100"
                :class="{ '!scale-x-100 !bg-purple-600': isActive }"
              ></div>
            </nuxt-link>
          </div>
          <div class="py-8">
            <NuxtPage />
          </div>
        </div>
      </in-container>
    </section>
    <template #footer>
      <in-footer />
    </template>
  </nuxt-layout>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useUser from '@/stores/useUser'

definePageMeta({
  auth: true,
  layout: false
})
const { userProfile: user } = storeToRefs(useUser())
</script>
