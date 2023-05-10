<template>
  <client-only>
    <header class="fixed left-0 top-10 z-10 w-screen">
      <in-container>
        <div class="flex h-21 items-center justify-between rounded-6 bg-white py-5 pl-7 pr-6">
          <div class="w-40">
            <nuxt-link v-slot="{ navigate }" to="/">
              <img src="/images/logo.svg" alt="" @click="navigate" />
            </nuxt-link>
          </div>
          <div v-if="store.userProfile.username" class="flex items-center gap-5">
            <p class="text-base font-bold text-black">Hi, {{ store.userProfile.username }}</p>
            <button
              class="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-1 border border-solid border-black px-6 text-base leading-6 text-black"
              @click="navigateTo('/user/profile')"
            >
              會員資料
            </button>
            <button
              class="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-1 border border-solid border-black px-6 text-base leading-6 text-black"
              @click="app.$api.user.logout"
            >
              登出
            </button>
          </div>
          <div v-else class="flex items-center">
            <nuxt-link v-slot="{ navigate }" to="/login">
              <button
                class="mr-6 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-1 bg-black px-6 text-base leading-6 text-white"
                @click="navigate"
              >
                登入
              </button>
            </nuxt-link>
            <nuxt-link v-slot="{ navigate }" to="/register">
              <button
                class="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-1 border border-solid border-black px-6 text-base leading-6 text-black"
                @click="navigate"
              >
                註冊
              </button>
            </nuxt-link>
          </div>
        </div>
      </in-container>
    </header>
  </client-only>
</template>
<script setup>
import userUser from '~/stores/useUser'

const app = useNuxtApp()
const store = userUser()
</script>
<style lang="scss"></style>
