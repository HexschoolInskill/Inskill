<template>
  <section class="banner relative flex h-screen w-screen items-center overflow-hidden">
    <div
      class="absolute left-1/2 top-1/2 h-full w-[120%] max-w-[800px] -translate-x-1/2 -translate-y-1/2 object-contain sm:w-10/12 lg:w-6/12"
    >
      <img
        class="banner__circle h-full w-full object-contain"
        src="/images/index-banner-bg-1.png"
        alt=""
      />
    </div>
    <in-container class="relative">
      <h1 class="text-fs-1 font-black text-white">
        <div class="overflow-hidden">
          <p class="banner__slogan block">做最好的自己，</p>
        </div>
        <div class="overflow-hidden">
          <span class="banner__slogan block">學習最硬的技能</span>
        </div>
      </h1>
      <div class="w-full sm:w-8/12 lg:w-5/12">
        <form
          class="transition-base mt-6 flex h-11 w-full flex-1 rounded-1 border-2 border-solid border-gray-l bg-white py-2 focus-within:border-purple-600 hover:border-purple-600"
        >
          <input
            v-model="searchInput"
            class="flex-1 px-4 outline-none"
            type="text"
            placeholder="開始探索、你的硬技能"
          />
          <button
            class="borders-solid flex w-11 flex-shrink-0 items-center justify-center border-l-2 border-gray-l"
            @click.prevent="handleSearch"
          >
            <i class="icon-search text-[20px] text-gray"></i>
          </button>
        </form>
      </div>
    </in-container>
    <div class="banner__mask pointer-events-none absolute left-0 top-0 h-full w-full"></div>
  </section>
</template>
<script lang="ts" setup>
import gsap from 'gsap'
const searchInput = ref('')
function handleSearch() {
  const query = searchInput.value.trim()

  if (query) {
    navigateTo(`/search?q=${query}&sortBy=time&category=normal`)
  }
}

onMounted(() => {
  gsap.to('.banner__mask', {
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  })

  gsap.from('.banner__slogan', {
    y: '100%',
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.6
  })
})
</script>
<style lang="scss" scoped>
.banner {
  background: url('/images/index-banner-bg.jpg') no-repeat center/cover;

  &__letter {
    display: inline-block;
  }

  &__mask {
    background-image: linear-gradient(
      to right top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, 1) 20%
    );
  }
}
</style>
