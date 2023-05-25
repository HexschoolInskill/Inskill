<template>
  <section class="creator-comments py-15">
    <in-container>
      <div class="text-center text-white">
        <h2 class="text-h2 font-black">創作者推薦</h2>
        <h5 class="mt-4 text-fs-5">為什麼選擇我們的平台</h5>
      </div>
      <div class="gsap-slide-up mt-10 grid gap-6 xl:grid-cols-3">
        <in-card xs-white perspective class="flex h-full flex-col justify-between p-8">
          <div class="flex items-center gap-3">
            <img
              class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full object-cover"
              src="/images/avatar-fallback.svg"
              alt=""
            />
            <div class="text-gray">
              <h6 class="text-fs-6">投資理財</h6>
              <h4 class="mt-3 text-fs-4 font-bold">金融專家</h4>
            </div>
          </div>
          <div class="mt-8">
            <i class="icon-quote text-[20px] text-black sm:text-gray"></i>
          </div>
          <div class="flex-1 px-10 py-8 text-gray sm:text-white">
            平台的操作也非常簡單易懂，我不需要懂得複雜的程式設計就可以建立自己的課程。我強烈推薦這個平台給所有想要分享知識的創作者。
          </div>
          <div class="rotate-180">
            <i class="icon-quote text-right text-[20px] text-black sm:text-gray"></i>
          </div>
        </in-card>
        <in-card xs-white perspective class="flex h-full flex-col justify-between p-8">
          <div class="flex items-center gap-3">
            <img
              class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full object-cover"
              src="/images/avatar-fallback.svg"
              alt=""
            />
            <div class="text-gray">
              <h6 class="text-fs-6">技能職場</h6>
              <h4 class="mt-3 text-fs-4 font-bold">吳旦茹</h4>
            </div>
          </div>
          <div class="mt-8">
            <i class="icon-quote text-[20px] text-black sm:text-gray"></i>
          </div>
          <div class="flex-1 px-10 py-8 text-gray sm:text-white">
            平台的操作也非常簡單易懂，我不需要懂得複雜的程式設計就可以建立自己的課程。我強烈推薦這個平台給所有想要分享知識的創作者。
          </div>
          <div class="rotate-180">
            <i class="icon-quote text-right text-[20px] text-black sm:text-gray"></i>
          </div>
        </in-card>
        <in-card xs-white perspective class="flex h-full flex-col justify-between p-8">
          <div class="flex items-center gap-3">
            <img
              class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full object-cover"
              src="/images/avatar-fallback.svg"
              alt=""
            />
            <div class="text-gray">
              <h6 class="text-fs-6">語言領域</h6>
              <h4 class="mt-3 text-fs-4 font-bold">李維</h4>
            </div>
          </div>
          <div class="mt-8">
            <i class="icon-quote text-[20px] text-black sm:text-gray"></i>
          </div>
          <div class="flex-1 px-10 py-8 text-gray sm:text-white">
            平台的操作也非常簡單易懂，我不需要懂得複雜的程式設計就可以建立自己的課程。我強烈推薦這個平台給所有想要分享知識的創作者。
          </div>
          <div class="rotate-180">
            <i class="icon-quote text-right text-[20px] text-black sm:text-gray"></i>
          </div>
        </in-card>
      </div>
    </in-container>
  </section>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.creator-comments {
  background: url('/images/comments-bg.png') no-repeat center/cover;
}
</style>
