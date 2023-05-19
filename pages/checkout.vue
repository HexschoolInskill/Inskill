<template>
  <in-container class="mt-[11vh] sm:mt-[15vh]">

    <form
    class="flex h-auto flex-col justify-between py-5 sm:h-[62vh] sm:flex-row"
    :action="apiEndpoint"
    method="post">
      <!-- 隱藏表單內容-->
      <input class="hidden" type="text" name="MerchantID" value="MS3129040116" />
      <input class="hidden" type="text" name="TradeSha" :value="order.shaEncrypt" />
      <input
      class="hidden"
      type="text"
      name="TradeInfo"
      :value="order.aesEncrypt"
      />
      <input class="hidden" type="text" name="TimeStamp" :value="order.order.TimeStamp" />
      <input class="hidden" type="text" name="Version" value="1.5" />
      <input class="hidden" type="text" name="MerchantOrderNo" :value="order.order.MerchantOrderNo" />
      <input class="hidden" type="text" name="Amt" :value="order.order.Amt" />
      <input class="hidden" type="text" name="ItemDesc'" :value="order.order.Desc" />
      <input class="hidden" type="email" name="Email" :value="order.order.Email" />
      <input class="hidden" type="text" name="ReturnURL" :value="order.order.ReturnURL" />
      <input class="hidden" type="text" name="NotifyURL" :value="order.order.NotifyURL" />

      <main
        class="relative mr-4 w-full rounded bg-white p-5 sm:w-9/12"
        :class="{ 'overflow-y-scroll': cart.length > 3 }"
      >
        <h2
          class="cart_header mb-4 border-4 border-t-0 border-l-0 border-r-0 border-black text-3xl"
        >
          確認訂單
        </h2>

        <div
          v-if="cart.length"
          class="cart_content border-4 border-t-0 border-l-0 border-r-0 border-black"
        >
          <div v-for="item in cart" :key="item.id" class="cart_item mb-4 flex items-center">
            <img class="mr-2 border" :src="item.img" alt="img" />
            <div class="w-2/12">
              <p class="text-center">{{ item.name }}</p>
            </div>
            <div class="mr-auto">
              <p class="">NT$ {{ item.price }}</p>
            </div>
          </div>
        </div>

        <div class="mt-2">
          <div class="flex">
            <span class="mr-auto">小計</span>
            <span>NT$ {{ getTotal }}</span>
          </div>

          <div class="mt-4 text-right text-3xl font-bold">NT$ {{ getTotal }}</div>
        </div>
      </main>
      <aside class="ml-1 mt-4 flex w-full flex-col rounded bg-white p-5 sm:mt-0 sm:w-3/12">
        <h2
          class="cart_header mb-4 border-4 border-t-0 border-l-0 border-r-0 border-black text-3xl"
        >
          購買人資訊
        </h2>

        <p>名稱: {{ store.userProfile.username }}</p>

        <p class="mb-auto">信箱: {{ store.userProfile.email }}</p>

        <!-- 接後端去藍新金流 -->
        <button
          :class="[cart.length ? 'bg-black' : 'bg-slate-200']"
          class="mb-2 mt-4 w-full rounded border p-1 text-xl text-white"
          type="submit"
          :disabled="!cart.length"
        >
          繼續
        </button>

        <!-- 回購物車 -->
        <NuxtLink to="/cart">
          <button
            :class="[cart.length ? 'bg-slate-400' : 'bg-slate-200']"
            class="w-full rounded border p-1 text-xl text-white"
            type="button"
            :disabled="!cart.length"
          >
            取消
          </button>
        </NuxtLink>
      </aside>
    </form>

  </in-container>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'
// import { storeToRefs } from 'pinia'
// import coursesStore from '~/stores/courses'
import userUser from '~/stores/useUser'

// const { $api } = useNuxtApp()
// let { cart } = storeToRefs(coursesStore())

const store = userUser()

// fake cart
const cart = reactive([
  {
    id: 1,
    img: 'https://fakeimg.pl/100x100/',
    name: 'test',
    price: 100
  },
  {
    id: 1,
    img: 'https://fakeimg.pl/100x100/',
    name: 'test',
    price: 100
  },
  {
    id: 1,
    img: 'https://fakeimg.pl/100x100/',
    name: 'test',
    price: 150
  }
])

const getTotal = computed(() => {
  return cart.reduce((accuulator, currentItem) => accuulator + currentItem.price, 0)
})

// 需要call hello api 來取得上方template 需要的資料
// 定義order data
const order = ref({
  aesEncrypt: '1e2944c682af037c77c15a79b6ab0150c51da6260c5f268748de6936cc3c15189edacc5bffeb1a7324c432a21c4a9e4545f250dcb128021fbd08e1d5b60794cb16913225b56a2647841fbffbab9048e9890eb078175eb64723124c4668ff06067ca0ab4561e5cd5a51f1d0ede74ee78a6d6dd40cd756569b97b51bc62337c693db7ba5ba1097d53e42424b01e68256ca',
  shaEncrypt: '314C80D2794AA3C8EBB53344B6F53F341F62656CCEC0CC422B9D5735A9614A2C',
  order: {
    TimeStamp: Math.floor(Date.now() / 1000),
    MerchantOrderNo: '123',
    Amt: getTotal,
    Desc: 'testing',
    Email: 'senxsen@gmail.com',
    ReturnURL: '', // 前端回課程列表
    NotifyURL: '' // 後端接收付款結果
  }
})

// 定義apiendpoint 如果是 production 就是正式環境 如果是 development 就是開發環境
const apiEndpoint = computed(() => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://core.newebpay.com/MPG/mpg_gateway'
  } else {
    return 'https://ccore.newebpay.com/MPG/mpg_gateway'
  }
})

onMounted(async () => {
  // const cartData = await $api.course.getCart()
  // console.log('cartData :>>>', cartData)
})
</script>
