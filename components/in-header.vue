<template>
  <header class="fixed left-0 top-10 w-screen">
    <in-container>
      <div class="flex h-21 items-center justify-between rounded-6 bg-white py-5 pl-7 pr-6">
        <div class="w-40">
          <nuxt-link to="/" v-slot="{ navigate }">
            <img @click="navigate" src="/images/logo.svg" alt="" />
          </nuxt-link>
        </div>
        <div class=""></div>
        <div class="flex items-center">
          <nuxt-link to="/login" v-slot="{ navigate }">
            <button
              @click="navigate"
              class="mr-6 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-1 bg-black px-6 text-base leading-6 text-white"
            >
              登入
            </button>
          </nuxt-link>
          <nuxt-link to="/sign-up" v-slot="{ navigate }">
            <button
              @click="navigate"
              class="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-1 border border-solid border-black px-6 text-base leading-6 text-black"
            >
              註冊
            </button>
          </nuxt-link>
        </div>
      </div>
    </in-container>
  </header>
</template>
<script setup></script>
<style lang="scss"></style>
