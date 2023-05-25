<template>
  <section class="banner relative flex h-screen w-screen flex-col items-center justify-center">
    <div
      class="absolute left-1/2 top-1/2 h-full w-[120%] max-w-[800px] -translate-x-1/2 -translate-y-1/2 object-contain sm:w-10/12 lg:w-6/12"
    >
      <img class="h-full w-full object-contain" src="/images/index-banner-bg-1.png" alt="" />
    </div>
    <div class="absolute left-0 top-0 h-full w-full bg-black/40"></div>
    <in-container class="relative text-center text-white">
      <h2 class="text-fs-2 font-black">讓你的知識獲得更大的價值</h2>
      <h6 class="mt-4 text-fs-5">專業知識的舞台，為你的才華贏得更大的價值。</h6>
      <!-- TODO: 確認是否已經是老師 如果是 -> 我的課程 不是 -> 申請表單 -->
      <in-btn class="mt-20" @click="navigateTo('/partner/join')">開始創造價值</in-btn>
    </in-container>
  </section>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.banner {
  background: url('/images/index-banner-bg.jpg') no-repeat center/cover;
  &__letter {
    display: inline-block;
  }
}
</style>
