<template>
  <section class="py-15">
    <in-container>
      <div class="text-center text-white">
        <h2 class="text-h2 font-black leading-9">我們的平台提供以下優勢</h2>
        <h5 class="mt-4 text-fs-5">讓你的知識流通無阻</h5>
        <div class="mt-10 grid gap-6 md:grid-cols-3 md:gap-10">
          <in-card xs-white perspective>
            <div class="relative pt-6/10">
              <img
                src="/images/partner-1.jpg"
                alt=""
                class="transition-base absolute left-0 top-0 h-full w-full object-cover"
              />
            </div>
            <div class="flex-1 p-8 text-center">
              <h3 class="text-fs-3 font-bold text-blue sm:text-white">立即建立課程</h3>
              <h5 class="mt-6 text-fs-5 text-black sm:text-white">
                只需簡單的步驟，即可與全世界分享你的知識。
              </h5>
            </div>
          </in-card>
          <in-card xs-white perspective>
            <div class="relative pt-6/10">
              <img
                src="/images/partner-2.jpg"
                alt=""
                class="transition-base absolute left-0 top-0 h-full w-full object-cover"
              />
            </div>
            <div class="flex-1 p-8 text-center">
              <h3 class="text-fs-3 font-bold text-blue sm:text-white">多種方式，自由選擇</h3>
              <h5 class="mt-6 text-fs-5 text-black sm:text-white">
                支援多種課程形式，你可以根據 自己的需求製作課程內容。
              </h5>
            </div>
          </in-card>
          <in-card xs-white perspective>
            <div class="relative pt-6/10">
              <img
                src="/images/partner-3.jpg"
                alt=""
                class="transition-base absolute left-0 top-0 h-full w-full object-cover"
              />
            </div>
            <div class="flex-1 p-8 text-center">
              <h3 class="text-fs-3 font-bold text-blue sm:text-white">獲得更高的收益</h3>
              <h5 class="mt-6 text-fs-5 text-black sm:text-white">
                與其他平台相比，我們的平台抽成更低。
              </h5>
            </div>
          </in-card>
        </div>
      </div>
    </in-container>
  </section>
</template>
<script setup lang="ts"></script>
<style lang="scss"></style>
