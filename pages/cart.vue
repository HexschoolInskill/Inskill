<template>
  <in-container class="mt-[11vh] sm:mt-[15vh]">
    <div class="flex flex-col sm:flex-row h-auto sm:h-[62vh] justify-between py-5">
      <main class="mr-4 rounded bg-white p-5 w-full sm:w-9/12">
        <h2 class="cart_header border-4 border-t-0 border-l-0 border-r-0 border-black text-3xl">
          購物車
        </h2>

        <div
          v-if="cart.length"
          class="cart_content max-h-[350px] border-4 border-t-0 border-l-0 border-r-0 border-black"
          :class="{ 'overflow-y-scroll': cart.length > 3 }"
        >
          <div
            v-for="(item, index) in cart"
            :key="item.id"
            class="cart_item my-4 flex items-center"
          >
            <img class="mr-2 border" :src="item.img" alt="img" />
            <div class="w-2/12">
              <p class="text-center">{{ item.name }}</p>
            </div>
            <div class="mr-auto">
              <p class="">NT$ {{ item.price }}</p>
            </div>

            <div class="">
              <button
                type="button"
                class="mr-4 rounded border bg-black p-1 text-xl text-white"
                @click="removeCartItem(index)"
              >
                移除
              </button>
            </div>
          </div>
        </div>

        <div
          v-else
          class="absolute top-[50%] left-[50%] w-[50%] translate-x-[-50%] translate-y-[-50%] text-center"
        >
          <img
            class="ml-auto mr-auto w-4/12"
            src="/images/remove_shopping_cart.svg"
            alt="empty_cart"
          />
          <p class="mb-4 text-2xl">毫無反應，是空的購物車</p>
          <NuxtLink to="/courses">
            <button type="button" class="rounded border bg-black p-1 text-xl text-white">
              尋找課程
            </button>
          </NuxtLink>
        </div>
      </main>
      <aside class="ml-1 flex flex-col rounded bg-white p-5 mt-4 sm:mt-0 w-full sm:w-3/12">
        <h2
          class="cart_header mb-4 border-4 border-t-0 border-l-0 border-r-0 border-black text-3xl"
        >
          總計{{ cart.length }}堂課程
        </h2>

        <div class="mb-auto">
          <div v-if="cart.length" class="flex">
            <span class="mr-auto">小計</span>
            <span>NT$ {{ getTotal }}</span>
          </div>

          <div class="mt-4 text-right text-3xl font-bold">NT$ {{ getTotal }}</div>
        </div>

        <NuxtLink to="/order">
          <button
            :class="[cart.length ? 'bg-black' : 'bg-slate-200']"
            class="w-full rounded border p-1 text-xl text-white mt-4"
            type="button"
          >
            前往結帳
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

// const { $api } = useNuxtApp()
// let { cart } = storeToRefs(coursesStore())

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
  // {
  //   id: 1,
  //   img: 'https://fakeimg.pl/100x100/',
  //   name: 'test',
  //   price: 150
  // }
])

const getTotal = computed(() => {
  return cart.reduce((accuulator, currentItem) => accuulator + currentItem.price, 0)
})

const removeCartItem = (index: number) => {
  cart.splice(index, 1)
}

onMounted(async () => {
  // const cartData = await $api.course.getCart()
  // console.log('cartData :>>>', cartData)
})
</script>

<style lang="scss" scoped>
  
</style>
