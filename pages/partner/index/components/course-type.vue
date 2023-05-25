<template>
  <section class="course-type py-15">
    <in-container>
      <h2 class="text-center text-h2 font-black text-white">選擇最適合你的課程形式</h2>
      <h5 class="mt-4 text-center text-fs-5 text-white">創作屬於你的課程</h5>
      <div class="mt-10 grid gap-10 text-center text-white sm:grid-cols-4 sm:gap-6">
        <div class="flex flex-col items-center">
          <div
            class="flex h-40 w-40 items-center justify-center rounded-full border-2 border-solid border-white bg-gradient-to-r from-[#262B2F] to-black sm:border-none"
          >
            <img class="w-19" src="/images/partner-4.svg" alt="" />
          </div>
          <h4 class="mt-6 text-fs-4 font-bold">線上課程</h4>
          <h6 class="text-fs-6 mt-3">不受空間限制，讓學生能享受到視聽並重的教學方式。</h6>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="flex h-40 w-40 items-center justify-center rounded-full border-2 border-solid border-white bg-gradient-to-r from-[#262B2F] to-black sm:border-none"
          >
            <img class="w-19" src="/images/partner-5.svg" alt="" />
          </div>
          <h4 class="mt-6 text-fs-4 font-bold">恣意編輯</h4>
          <h6 class="text-fs-6 mt-3">使用線上文字編輯器，為你的知識揮灑你的文筆。</h6>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="flex h-40 w-40 items-center justify-center rounded-full border-2 border-solid border-white bg-gradient-to-r from-[#262B2F] to-black sm:border-none"
          >
            <img class="w-19" src="/images/partner-6.svg" alt="" />
          </div>
          <h4 class="mt-6 text-fs-4 font-bold">耳邊說書</h4>
          <h6 class="text-fs-6 mt-3">錄製你的教學節目，方便學生隨時聆聽。</h6>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="flex h-40 w-40 items-center justify-center rounded-full border-2 border-solid border-white bg-gradient-to-r from-[#262B2F] to-black sm:border-none"
          >
            <img class="w-19" src="/images/partner-7.svg" alt="" />
          </div>
          <h4 class="mt-6 text-fs-4 font-bold">課程直播</h4>
          <h6 class="text-fs-6 mt-3">使用直播功能，與學生即時互動。</h6>
        </div>
      </div>
    </in-container>
  </section>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.course-type {
  background: url('/images/comments-bg.png') no-repeat center/cover;
}
</style>
