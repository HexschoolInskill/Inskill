<template>
  <div class="flex justify-between gap-10">
    <div class="flex gap-5">
      <in-btn size="small" :ghost="currentCategory !== 'normal'" @click="currentCategory = 'normal'"
        >影音課程</in-btn
      >
      <in-btn size="small" :ghost="currentCategory !== 'stream'" @click="currentCategory = 'stream'"
        >直播課程</in-btn
      >
    </div>
    <in-btn size="small" @click="isModalShow = true">
      <span v-if="currentCategory === 'normal'">新增影音課程</span>
      <span v-if="currentCategory === 'stream'">新增直播課程</span>
    </in-btn>
  </div>
  <div v-if="isLoading" class="grid gap-6 py-10 sm:grid-cols-2 xl:grid-cols-4"></div>
  <div
    v-if="currentCategory === 'normal' && normalCourses.length"
    class="grid gap-6 py-10 sm:grid-cols-2 xl:grid-cols-4"
  ></div>
  <div
    v-if="currentCategory === 'stream' && liveCourses.length"
    class="grid gap-6 py-10 sm:grid-cols-2 xl:grid-cols-4"
  ></div>
  <div v-else class="py-10">
    <h5 class="text-center text-fs-4 font-bold text-white opacity-80">沒有已建立的課程</h5>
  </div>
  <in-popup :show="isModalShow" :size="640">
    <in-container>
      <in-card class="w-full p-8">
        <h2 class="text-h2 font-bold text-white">
          {{ currentCategory === 'normal' ? '新增影音課程' : '新增直播課程' }}
        </h2>
        <div class="mt-6 flex items-center justify-end gap-5">
          <in-btn :disabled="isLoading" ghost size="small" @click="isModalShow = false"
            >取消</in-btn
          >
          <in-btn
            :disabled="isLoading"
            size="small"
            @click="currentCategory === 'normal' ? createNormalCourse() : createLiveCourse()"
          >
            確定
          </in-btn>
        </div>
      </in-card>
    </in-container>
  </in-popup>
  <in-loading :show="isLoading" />
</template>
<script lang="ts" setup>
const isLoading = ref(false)
const currentCategory = ref<'normal' | 'stream'>('normal')
const liveCourses = ref([])
const normalCourses = ref([])
const isModalShow = ref(false)

// watch(currentCategory, (current) => {
// })

function createNormalCourse() {}
function createLiveCourse() {}
</script>
<style lang="scss"></style>
