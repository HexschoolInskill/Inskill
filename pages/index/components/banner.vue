<template>
  <section class="banner relative flex h-screen w-screen items-center">
    <div
      class="absolute left-1/2 top-1/2 h-full w-[120%] max-w-[800px] -translate-x-1/2 -translate-y-1/2 object-contain sm:w-10/12 lg:w-6/12"
    >
      <img class="h-full w-full object-contain" src="/images/index-banner-bg-1.png" alt="" />
    </div>
    <in-container class="relative">
      <h1 class="text-[40px] font-bold leading-normal text-white">
        <span>做最好的自己，</span>
        <br />
        <span>學習最硬的技能</span>
      </h1>
      <div class="w-full sm:w-8/12 lg:w-5/12">
        <form
          class="transition-base mt-6 flex h-11 w-full flex-1 rounded-1 border-2 border-solid border-gray-l bg-white py-2 hover:border-black focus:border-black"
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
  </section>
</template>
<script lang="ts" setup>
const searchInput = ref('')
function handleSearch() {
  const query = searchInput.value.trim()

  if (query) {
    navigateTo(`/search?q=${query}`)
  }
}
</script>
<style lang="scss">
.banner {
  background: url('/images/index-banner-bg.jpg') no-repeat center/cover;
  &__letter {
    display: inline-block;
  }
}
</style>
