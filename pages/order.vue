<template>
  <in-container class="mt-[11vh] sm:mt-[15vh]">
    <div class="flex flex-col sm:flex-row h-auto sm:h-[62vh] justify-between py-5">
      <main
        class="relative mr-4 rounded bg-white p-5 w-full sm:w-9/12"
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
      <aside class="ml-1 flex flex-col rounded bg-white p-5 mt-4 sm:mt-0 w-full sm:w-3/12">
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
          class="mb-2 w-full rounded border p-1 text-xl text-white mt-4"
          type="button"
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
    </div>
  </in-container>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed } from 'vue'
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

// 結帳
// const checkOut = (index: number) => {

// }

onMounted(async () => {
  // const cartData = await $api.course.getCart()
  // console.log('cartData :>>>', cartData)
})
</script>
