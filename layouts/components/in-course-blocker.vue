<template>
  <div
    class="gradient absolute left-[50%] z-10 flex w-screen h-screen translate-x-[-50%] rounded-lg p-10 text-white"
  >
    <div class="w-8/12">
      <img :src="props.currentCourse.thumbnail" alt="thumbnail" />

      <article class="my-4">
        <h1 class="text-3xl font-bold">直播內容介紹</h1>
        <p v-html="props.currentCourse.description"></p>
      </article>
    </div>
    <div class="w-4/12">
      <div class="mb-4">
        <h1 class="text-3xl font-bold">{{ props.currentCourse.title }}</h1>
        <p>開課老師名稱</p>
      </div>
      <div class="mb-4">
        <h2 class="text-3xl font-bold">直播時間</h2>
        <p>{{ props.currentCourse.startTime }}</p>
      </div>
      <div class="mb-4">
        <h2 class="text-3xl font-bold">參加人數</h2>
        <p>{{ props.currentCourse.purchasedCount }} 人已報名</p>
      </div>
      <div class="mb-4">
        <h2 class="text-3xl font-bold">直播售價</h2>
        <p>NT${{ props.currentCourse.price }}</p>
      </div>

      <div class="flex fixed bottom-[40px]">
        <button class="rounded bg-black px-4 py-1 text-white mr-4" type="button" @click="goBack">返回</button>

        <button class="flex rounded bg-black px-4 py-1 text-white" type="button">
          <svg
            class="w-[25px]"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            enable-background="new 0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <path
                d="M169.6,377.6c-22.882,0-41.6,18.718-41.6,41.601c0,22.882,18.718,41.6,41.6,41.6s41.601-18.718,41.601-41.6
                      C211.2,396.317,192.481,377.6,169.6,377.6z M48,51.2v41.6h41.6l74.883,151.682l-31.308,50.954c-3.118,5.2-5.2,12.482-5.2,19.765
                      c0,27.85,19.025,41.6,44.825,41.6H416v-40H177.893c-3.118,0-5.2-2.082-5.2-5.2c0-1.036,2.207-5.2,2.207-5.2l20.782-32.8h154.954
                      c15.601,0,29.128-8.317,36.4-21.836l74.882-128.8c1.237-2.461,2.082-6.246,2.082-10.399c0-11.446-9.364-19.765-20.8-19.765H135.364
                      L115.6,51.2H48z M374.399,377.6c-22.882,0-41.6,18.718-41.6,41.601c0,22.882,18.718,41.6,41.6,41.6S416,442.082,416,419.2
                      C416,396.317,397.281,377.6,374.399,377.6z"
                fill="currentColor"
              ></path>
            </g>
          </svg>

          <span>加入購物車</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  currentCourse: {
    type: null,
    default: {}
  }
})

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>
