<template>
  <section class="comments py-15">
    <in-container>
      <div class="gsap-slide-up text-center text-white">
        <h2 class="text-[32px] font-black">學生好評</h2>
        <p class="mt-4 text-xl">我們的學生都這麼說⋯⋯</p>
      </div>
      <div class="gsap-slide-up mt-10 grid gap-6 xl:grid-cols-3">
        <in-card xs-white perspective class="flex h-full flex-col justify-between p-11">
          <div>
            <i class="icon-quote text-[20px] text-black sm:text-gray"></i>
          </div>
          <div class="flex-1 px-10 py-8 text-gray sm:text-white">
            這是最短的段落，外層高度不變。
          </div>
          <div class="rotate-180">
            <i class="icon-quote text-right text-[20px] text-black sm:text-gray"></i>
          </div>
          <div class="flex items-center gap-3">
            <img
              class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full object-cover"
              src="/images/avatar-fallback.svg"
              alt=""
            />
            <p class="font-bold leading-normal text-gray">我是學生</p>
          </div>
        </in-card>
        <in-card xs-white perspective class="flex h-full flex-col justify-between p-11">
          <div>
            <i class="icon-quote text-[20px] text-black sm:text-gray"></i>
          </div>
          <div class="flex-1 px-10 py-8 text-gray sm:text-white">
            網頁的操作清楚明瞭，介面清爽乾淨，老師的教學也深入淺出，用最簡單的語言講解最困難的概念，而且居然有直播功能，在課堂上直接詢問老師，這是中等長的段落。
          </div>
          <div class="rotate-180">
            <i class="icon-quote text-right text-[20px] text-black sm:text-gray"></i>
          </div>
          <div class="flex items-center gap-3">
            <img
              class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full object-cover"
              src="/images/avatar-fallback.svg"
              alt=""
            />
            <p class="font-bold leading-normal text-gray">我是學生</p>
          </div>
        </in-card>
        <in-card xs-white perspective class="flex h-full flex-col justify-between p-11">
          <div>
            <i class="icon-quote text-[20px] text-black sm:text-gray"></i>
          </div>
          <div class="flex-1 px-10 py-8 text-gray sm:text-white">
            網頁的操作清楚明瞭，介面清爽乾淨，老師的教學也深入淺出，用最簡單的語言講解最困難的概念，而且居然有直播功能，在課堂上直接詢問老師，讓我的學習效率倍增，我不是什麼線上課程評論家，但這聽起來很酷是吧。
          </div>
          <div class="rotate-180">
            <i class="icon-quote text-right text-[20px] text-black sm:text-gray"></i>
          </div>
          <div class="flex items-center gap-3">
            <img
              class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full object-cover"
              src="/images/avatar-fallback.svg"
              alt=""
            />
            <p class="font-bold leading-normal text-gray">我是學生</p>
          </div>
        </in-card>
      </div>
    </in-container>
  </section>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.comments {
  background: url('/images/comments-bg.png') no-repeat center/cover;
}
</style>
