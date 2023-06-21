<template>
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
            class="in-header__search transition-base flex h-11 flex-1 rounded-1 border-2 border-solid border-gray-l bg-white py-2 focus-within:border-purple-600 hover:border-purple-600"
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
              class="borders-solid flex w-11 flex-shrink-0 items-center justify-center border-l-2"
            >
              <i class="icon-search text-[20px] text-gray"></i>
            </button>
          </form>
          <nuxt-link to="/partner">合作申請</nuxt-link>
        </div>
        <!-- 購物車 -->
        <nuxt-link to="/cart" class="relative mx-6 cursor-pointer">
          <!-- 購物車內有東西的提示 -->
          <svg
            v-if="store.userProfile.cartCourses.length"
            class="absolute right-[-10px] top-[-10px] h-[25px] w-[25px]"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32"
          >
            <circle cx="16" cy="16" r="8" fill="red"></circle>
          </svg>

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
              ></path>
            </g>
          </svg>
        </nuxt-link>
        <div
          class="relative flex flex-shrink-0 items-center lg:ml-5 2xl:ml-2"
          @click="togglePopup('user')"
        >
          <div
            class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full"
            :class="{ 'lg:hidden': !store.userProfile.username }"
          >
            <img
              :src="
                store.userProfile.avatar ? store.userProfile.avatar : '/images/avatar-fallback.svg'
              "
              alt=""
            />
          </div>
          <p
            v-if="store.userProfile.username"
            class="hidden cursor-pointer select-none text-base font-bold text-black lg:ml-3 lg:block"
          >
            Hi, {{ store.userProfile.username }}
          </p>
          <div v-else class="hidden items-center gap-5 lg:flex 2xl:gap-6">
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
            class="absolute right-0 top-18 grid w-[calc(100vw-24px)] gap-2 rounded-6 bg-white p-4 shadow sm:w-52 lg:top-28"
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
                  class="transition-base block whitespace-nowrap px-3 py-2 text-center hover:text-blue"
                  @click="currentPopup = null"
                >
                  會員資料
                </nuxt-link>
              </li>
              <li class="in-header__popup-link">
                <nuxt-link
                  class="transition-base block whitespace-nowrap px-3 py-2 text-center hover:text-blue"
                  @click="currentPopup = null"
                >
                  我的課程
                </nuxt-link>
              </li>
              <li class="in-header__popup-link" @click="app.$api.user.logout">
                <div
                  class="transition-base block whitespace-nowrap px-3 py-2 text-center hover:text-blue"
                >
                  登出
                </div>
              </li>
            </template>
          </ul>
        </transition>
        <transition name="menu">
          <ul
            v-if="currentPopup === 'explore'"
            class="absolute left-0 top-18 grid w-[calc(100vw-24px)] gap-2 rounded-6 bg-white p-4 shadow sm:w-[375px] lg:left-20 lg:top-28"
          >
            <li class="in-header__popup-link">
              <nuxt-link class="block whitespace-nowrap px-3 py-2" to="/search"
                >所有類別課程</nuxt-link
              >
            </li>
            <li class="in-header__popup-link">
              <nuxt-link class="block whitespace-nowrap px-3 py-2" to="/search?q=AI">AI</nuxt-link>
            </li>
            <li class="in-header__popup-link">
              <nuxt-link class="block whitespace-nowrap px-3 py-2" to="/search?q=程式設計">
                程式設計
              </nuxt-link>
            </li>
          </ul>
        </transition>
      </div>
    </in-container>
  </header>
</template>
<script setup lang="ts">
import userUser from '~/stores/useUser'

const app = useNuxtApp()
const store = userUser()

const searchInput = ref('')

function handleSearch() {
  const value = encodeURIComponent(searchInput.value.trim())
  navigateTo(`/search?q=${value}&sortBy=time&category=normal`)
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
