<template>
  <NuxtLayout name="edit-course">
    <NuxtPage />
    <teleport to="body">
      <div
        v-if="isLoading"
        class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50"
      >
        <in-spin :size="48" color="#ffffff"></in-spin>
      </div>
    </teleport>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useEditCourse from '~/stores/useEditCourse'

definePageMeta({
  layout: false
})

const app = useNuxtApp()
const route = useRoute()
const store = useEditCourse()
const { isLoading } = storeToRefs(store)

const { data } = await useAsyncData(() =>
  app.$api.course.fetchCourse(route.params.courseId as string)
)

Object.assign(store.currentCourse, data.value?.course?.[0] ?? {})
</script>
