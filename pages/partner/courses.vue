<template>
  <NuxtLayout name="edit-course">
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import useEditCourse from '~/stores/useEditCourse'

definePageMeta({
  layout: false
})

const app = useNuxtApp()
const route = useRoute()
const store = useEditCourse()

const { data } = await useAsyncData(() =>
  app.$api.course.fetchCourse(route.params.courseId as string)
)

Object.assign(store.currentCourse, data.value?.course?.[0] ?? {})
</script>
