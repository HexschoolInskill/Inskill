<template>
  <section class="banner relative flex min-h-50vh items-end justify-center pt-20">
    <div class="absolute left-0 top-0 h-full w-full bg-black/40"></div>
    <in-container class="relative">
      <h1 class="text-center text-3xl font-black leading-normal text-white">
        現在就加入 InSkill <br />
        開始分享你的硬技能
      </h1>
      <div class="mx-auto w-full max-w-xs translate-y-1/2 rounded-6 bg-white px-15 pb-3 pt-6">
        <div
          class="relative flex items-center justify-between gap-12 border-t-4 border-solid border-black"
        >
          <div
            class="absolute left-0 top-0 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-solid border-black"
            :class="submitted ? 'bg-white' : 'bg-black'"
          ></div>
          <div
            class="absolute right-0 top-0 flex h-5 w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border-4 border-solid border-black"
            :class="submitted ? 'bg-black' : 'bg-white'"
          ></div>
          <p class="mt-5 -translate-x-1/2 font-bold text-black">填寫表單</p>
          <p class="mt-5 translate-x-1/2 font-bold text-black">等待審核</p>
        </div>
      </div>
    </in-container>
  </section>
</template>
<script lang="ts" setup>
defineProps({
  submitted: {
    type: Boolean,
    default: false
  }
})
</script>
<style lang="scss" scoped>
.banner {
  background: url('/images/index-banner-bg-1.png'), url('/images/index-banner-bg.jpg');
  background-repeat: no-repeat;
  background-position: center, center;
  background-size: 120%, cover;
  @media (min-width: 640px) {
    background-size: contain, cover;
  }
}
</style>
