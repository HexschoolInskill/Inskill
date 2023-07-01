<template>
  <NuxtLayout name="edit-course">
    <NuxtPage />
    <in-loading :show="isLoading" />
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

<style lang="scss"></style>
