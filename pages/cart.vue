<template>
  <in-container class="2xl:mt-[5vh]">
    <div class="flex h-auto flex-col justify-between py-5 sm:h-[62vh] sm:flex-row">
      <main class="mr-4 w-full rounded bg-white p-5 sm:w-9/12">
        <h2 class="cart_header border-4 border-l-0 border-r-0 border-t-0 border-black text-3xl">
          購物車
        </h2>

        <div
          v-if="cart.length"
          class="cart_content max-h-[350px] border-4 border-l-0 border-r-0 border-t-0 border-black"
          :class="{ 'overflow-y-scroll': cart.length > 3 }"
        >
          <div
            v-for="(item, index) in cart"
            :key="item._id"
            class="cart_item my-4 flex items-center"
          >
            <img class="mr-2 w-[100px] border" :src="item.thumbnail" alt="img" />
            <div class="w-2/12">
              <p class="text-center">{{ item.title }}</p>
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
          class="absolute left-[50%] top-[50%] w-[50%] translate-x-[-50%] translate-y-[-50%] text-center"
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
      <aside class="ml-1 mt-4 flex w-full flex-col rounded bg-white p-5 sm:mt-0 sm:w-3/12">
        <h2
          class="cart_header mb-4 border-4 border-l-0 border-r-0 border-t-0 border-black text-3xl"
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

        <NuxtLink to="/checkout">
          <button
            :class="[cart.length ? 'bg-black' : 'bg-slate-200']"
            class="mt-4 w-full rounded border p-1 text-xl text-white"
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
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import useCourses from '~/stores/useCourses'

// const { $api } = useNuxtApp()
const { cart } = storeToRefs(useCourses())

const { removeCartItem } = useCourses()

const getTotal = computed(() => {
  return cart.value.reduce(
    (accumulator: number, currentItem: any) => accumulator + currentItem.price,
    0
  )
})

onMounted(async () => {
  // const cartData = await $api.course.getCart()
  // console.log('cartData :>>>', cartData)
})
</script>
