<template>
  <client-only>
    <header
      class="in-header transition-base fixed left-0 top-10 z-10 w-screen"
      :class="{
        '-translate-y-[calc(100%+40px)]': isScrolled
      }"
    >
      <in-container>
        <div
          class="relative flex h-14 items-center justify-between rounded-6 bg-white py-5 pl-7 pr-6 lg:h-21"
        >
          <div class="w-8 lg:hidden" @click="togglePopup('explore')">
            <img src="/images/hamburger.svg" />
          </div>
          <div class="w-22 flex-shrink-0 cursor-pointer sm:w-32 2xl:w-40" @click="navigateTo('/')">
            <img src="/images/logo.svg" alt="Inskill" />
          </div>
          <div class="mx-5 hidden flex-1 items-center gap-5 lg:flex xl:ml-14 xl:mr-0 xl:gap-14">
            <div class="relative">
              <div
                class="flex cursor-pointer select-none items-center"
                @click="togglePopup('explore')"
              >
                <p class="whitespace-nowrap">探索</p>
                <i class="icon-arrow text-[24px]"></i>
              </div>
            </div>
            <nuxt-link class="whitespace-nowrap">直播</nuxt-link>
            <form
              class="transition-base flex h-11 flex-1 rounded-1 border-2 border-solid border-[#DEE2E6] py-2 hover:border-black focus:border-black"
              @submit.prevent="handleSearch"
              @keyup.enter="handleSearch"
            >
              <input
                v-model="searchInput"
                class="flex-1 px-4 outline-none"
                type="text"
                placeholder="開始探索、你的硬技能"
              />
              <button
                class="borders-solid flex w-11 flex-shrink-0 items-center justify-center border-l-2 border-[#DEE2E6]"
              >
                <i class="icon-search text-[20px] text-[#6C757D]"></i>
              </button>
            </form>
            <nuxt-link>合作申請</nuxt-link>
          </div>
          <div class="relative flex flex-shrink-0 items-center" @click="togglePopup('user')">
            <div
              class="h-10 w-10 overflow-hidden rounded-full"
              :class="{ 'lg:hidden': !store.userProfile.username }"
            >
              <img src="/images/avatar-fallback.svg" alt="" />
            </div>
            <p
              v-if="store.userProfile.username"
              class="hidden cursor-pointer select-none text-base font-bold text-black lg:ml-3 lg:block"
            >
              Hi, {{ store.userProfile.username }}
            </p>
            <div v-else class="hidden items-center gap-5 lg:ml-5 lg:flex 2xl:ml-8 2xl:gap-6">
              <nuxt-link v-slot="{ navigate }" to="/login">
                <button
                  class="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-1 bg-black px-6 text-base leading-6 text-white"
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
          <transition name="menu">
            <ul
              v-if="currentPopup === 'user'"
              class="absolute right-0 top-18 grid w-[calc(100vw-24px)] gap-2 rounded-6 bg-white p-4 sm:w-52 lg:top-28"
              :class="{ 'lg:hidden': !store.userProfile.username }"
            >
              <template v-if="!store.userProfile.username">
                <li class="in-header__popup-link">
                  <nuxt-link
                    to="/login"
                    class="block whitespace-nowrap px-3 py-2 text-center"
                    @click="currentPopup = null"
                  >
                    登入
                  </nuxt-link>
                </li>
                <li class="in-header__popup-link">
                  <nuxt-link
                    to="/register"
                    class="block whitespace-nowrap px-3 py-2 text-center"
                    @click="currentPopup = null"
                  >
                    註冊
                  </nuxt-link>
                </li>
              </template>
              <template v-else>
                <li class="in-header__popup-link">
                  <nuxt-link
                    to="/user/profile"
                    class="block whitespace-nowrap px-3 py-2 text-center"
                    @click="currentPopup = null"
                  >
                    會員資料
                  </nuxt-link>
                </li>
                <li class="in-header__popup-link" @click="app.$api.user.logout">
                  <div class="block whitespace-nowrap px-3 py-2 text-center">登出</div>
                </li>
              </template>
            </ul>
          </transition>
          <transition name="menu">
            <ul
              v-if="currentPopup === 'explore'"
              class="absolute left-0 top-18 grid w-[calc(100vw-24px)] gap-2 rounded-6 bg-white p-4 sm:w-[375px] lg:left-20 lg:top-28"
            >
              <li class="in-header__popup-link">
                <nuxt-link class="block whitespace-nowrap px-3 py-2">所有類別課程</nuxt-link>
              </li>
              <li class="in-header__popup-link">
                <nuxt-link class="block whitespace-nowrap px-3 py-2">AI</nuxt-link>
              </li>
              <li class="in-header__popup-link">
                <nuxt-link class="block whitespace-nowrap px-3 py-2">程式設計</nuxt-link>
              </li>
            </ul>
          </transition>
        </div>
      </in-container>
    </header>
  </client-only>
</template>
<script setup lang="ts">
import userUser from '~/stores/useUser'

const app = useNuxtApp()
const store = userUser()

const searchInput = ref('')

function handleSearch() {
  const value = searchInput.value.trim()
  if (value) {
    navigateTo(`/search?q=${value}`)
  }
}

const currentPopup = ref<null | string>(null)

function togglePopup(name: string) {
  if (currentPopup.value === name) {
    currentPopup.value = null
  } else {
    currentPopup.value = name
  }
}

const isScrolled = ref(false)

let prevScrollTop = 0
function handleScroll() {
  const currentScrollTop = document.documentElement.scrollTop
  isScrolled.value = currentScrollTop > prevScrollTop
  prevScrollTop = currentScrollTop
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<style lang="scss">
.in-header {
  &__popup-link {
    cursor: pointer;
    &:not(:last-child) {
      border-bottom: 1px solid #6c757d;
      border-radius: 4px;
    }
  }
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
.menu-enter-active,
.menu-leave-active {
  transition: 0.3s ease-in-out;
}
</style>
