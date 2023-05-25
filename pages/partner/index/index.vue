<template>
  <Title>讓你的知識獲得最大的價值 - Inskill</Title>
  <div>
    <nuxt-layout name="default" :padding-top="false">
      <template #header>
        <in-header />
      </template>
      <banner />
      <advantage />
      <course-type />
      <steps />
      <creator-comments />
      <call-to-action />
      <template #footer>
        <in-footer />
      </template>
    </nuxt-layout>
  </div>
</template>
<script lang="ts" setup>
import Banner from './components/banner.vue'
import Advantage from './components/advantage.vue'
import CourseType from './components/course-type.vue'
import Steps from './components/steps.vue'
import CreatorComments from './components/creator-comments.vue'
import CallToAction from './components/call-to-action.vue'

definePageMeta({
  layout: false
})
</script>
<style lang="scss"></style>
