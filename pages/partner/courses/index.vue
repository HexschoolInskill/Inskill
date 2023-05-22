<template>
  <div class="flex flex-col bg-gray-900 text-white">
    <section class="flex">
      <h1 class="text-3xl">課程資訊</h1>
      <span>發布/未發布</span>
      <button type="button" class="ml-auto">儲存</button>
    </section>
    <section class="border-bottom">
      <h1 class="text-3xl">課程資訊</h1>
      <p>發布或取消發布您的課程。查看您的課程對訪客或已註冊學生的展示效果。</p>
      <div class="flex">
        <button type="button" class="ml-auto">發布課程</button>
        <button type="button" class="ml-auto">更多</button>
      </div>
    </section>
    <section class="border-bottom">
      <h1 class="text-3xl">品牌資訊</h1>
      <p>
        通過設置自定義課程圖片為您的課程添加品牌形象。您可以在 iOS
        應用程序上設置不同的圖片(建議使用不同尺寸的圖片)。
      </p>

      <nav class="flex">
        <div class="border-bottom">Web</div>
        <div class="border-bottom">IOS</div>
      </nav>

      <h2 class="text-2xl">課程圖片</h2>

      <div class="rounded border-dotted text-center">
        <p>上傳您的圖片</p>
        <p>建議尺寸 : 3840 x 2160 or 1920 x 1080 pixels</p>
        <p>(PNG or JPG)</p>

        <button type="button" class="border">
          <i class="icon-upload text-[24px]"></i>
          上傳
        </button>

        <input class="hidden" type="file" name="courseCover" />
      </div>
    </section>
    <section class="border-bottom">
      <h1 class="text-3xl">細節資訊</h1>
      <p>編輯關於課程的基本資訊。</p>

      <label for="title">課程標題 <span class="text-red">*</span></label>
      <input type="text" name="title" class="rounded border" />

      <label for="subtitle">課程副標題(選填)</label>
      <input type="text" name="subtitle" class="rounded border" />

      <label for="type">類別</label>
      <select id="type" name="type"></select>

      <label for="title">詳細說明</label>
      <in-text-editor v-model="content" :max-limit="280" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'create-courses'
})

const content = ref('')
</script>

<style lang="scss">
.border-bottom {
  @apply border border-l-0 border-r-0 border-t-0;
}
</style>
