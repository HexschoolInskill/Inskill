<template>
  <div class="bg-gray-900 p-5">
    <h1 class="text-3xl font-bold">價格</h1>
    <ul v-if="!priceType.length">
      <li
        class="my-10 flex cursor-pointer items-center overflow-hidden rounded-lg border border-dotted"
        @click="chooseType('free')"
      >
        <img class="mr-10" src="/images/free.png" alt="free" />
        <div class="">
          <h2 class="text-xl">免費</h2>
          <p>免費開放您的內容</p>
        </div>
      </li>
      <li
        class="my-10 flex cursor-pointer items-center overflow-hidden rounded-lg border border-dotted"
        @click="chooseType('payment')"
      >
        <img class="mr-10" src="/images/payment.png" alt="payment" />
        <div class="">
          <h2 class="text-xl">一次性收費</h2>
          <p>設定一次性收費</p>
        </div>
      </li>
    </ul>

    <ul v-else>
      <li class="my-10 flex items-center overflow-hidden rounded-lg border border-dotted">
        <img
          class="mr-10"
          :src="priceType === 'free' ? '/images/free.png' : '/images/payment.png'"
          :alt="priceType === 'free' ? 'free' : 'payment'"
        />
        <div class="">
          <h2 class="text-xl">
            {{ priceType === 'free' ? '免費' : '一次性收費' }}
          </h2>
          <p>
            {{ priceType === 'free' ? '免費開放您的內容' : '設定一次性收費' }}
          </p>
        </div>
      </li>
      <li class="rounded-lg border border-dotted p-4">
        <h2 class="text-xl">
          {{ priceType === 'free' ? '免費方案' : '一次性收費' }}
        </h2>
        <p>
          {{
            priceType === 'free'
              ? '學生可以通過註冊帳戶來訪問您的課程。此課程無需支付任何費用。'
              : '學生可以通過支付一次性金額來完全訪問您的課程。'
          }}
        </p>

        <div v-if="priceType === 'free'" class="mt-10 flex w-4/12 flex-col">
          <label class="mb-2" for="priceTitle">方案名稱</label>
          <input v-model="priceTitle" class="mb-4 rounded p-1 text-black" type="text" />

          <label class="mb-2" for="priceDesc">詳細說明</label>
          <in-text-editor v-model="priceDesc" />
        </div>

        <div v-else class="mt-10 flex w-4/12 flex-col">
          <label class="mb-2" for="price">價格</label>
          <input v-model="currentCourse.price" class="mb-4 rounded p-1 text-black" type="number" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import coursesStore from '~/stores/useCourses'
definePageMeta({
  layout: 'create-courses'
})

const store: any = storeToRefs(coursesStore())
const { currentCourse } = store

const priceType = ref('')
const priceTitle = ref('')
const priceDesc = ref('')

const chooseType = (type: string) => {
  priceType.value = type
}
</script>
