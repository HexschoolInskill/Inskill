<template>
  <div class="p-5 bg-gray-900">
    <h1 class="font-bold text-3xl">價格</h1>
    <ul v-if="!priceType.length">
      <li
      class="rounded-lg overflow-hidden border border-dotted flex items-center my-10 cursor-pointer"
      @click="chooseType('free')">
        <img class="mr-10" src="/images/free.png" alt="free">
        <div class="">
          <h2 class="text-xl">免費</h2>
          <p>免費開放您的內容</p>
        </div>
      </li>
      <li
      class="rounded-lg overflow-hidden border border-dotted flex items-center my-10 cursor-pointer"
      @click="chooseType('payment')">
        <img class="mr-10" src="/images/payment.png" alt="payment">
        <div class="">
          <h2 class="text-xl">一次性收費</h2>
          <p>設定一次性收費</p>
        </div>
      </li>
    </ul>

    <ul v-else>
      <li class="rounded-lg overflow-hidden border border-dotted flex items-center my-10">
        <img 
        class="mr-10" 
        :src="priceType === 'free'? '/images/free.png' : '/images/payment.png'" 
        :alt="priceType === 'free'? 'free' : 'payment'">
        <div class="">
          <h2 class="text-xl">
            {{ priceType === 'free'? '免費' : '一次性收費' }}
          </h2>
          <p>
            {{ priceType === 'free'? '免費開放您的內容': '設定一次性收費' }}
          </p>
        </div>
      </li>
      <li class="border border-dotted rounded-lg p-4">
        <h2 class="text-xl">
          {{ priceType === 'free'? '免費方案' : '一次性收費' }}
        </h2>
        <p>{{ priceType === 'free'? '學生可以通過註冊帳戶來訪問您的課程。此課程無需支付任何費用。' : '學生可以通過支付一次性金額來完全訪問您的課程。' }}</p>

        <div v-if="priceType === 'free'" class="flex flex-col mt-5 w-4/12">
          <label class="mb-2" for="priceTitle">方案名稱</label>
          <input v-model="priceTitle" class="mb-4 rounded p-1 text-black" type="text">

          <label class="mb-2" for="priceDesc">詳細說明</label>
          <in-text-editor v-model="priceDesc" />
        </div>

        <div v-else class="mt-4 flex flex-col w-4/12">
          <label class="mb-2" for="price">價格</label>
          <input v-model="price" class="mb-4 rounded p-1 text-black" type="number">          
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'create-courses'
})

const priceType = ref('')
const priceTitle = ref('')
const priceDesc = ref('')
const price = ref(0)

const chooseType = (type: string) => {
  priceType.value = type
}
</script>
