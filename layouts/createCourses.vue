<template>
  <!-- <slot name="header"></slot> -->

  <div class="flex">
    <aside class="w-1/12 whitespace-nowrap p-4 text-white">
      <div class="p-5 text-center">課程名稱</div>
      <ul class="py-4">
        <li class="mb-4">
          <NuxtLink>課程資訊</NuxtLink>
        </li>
        <li class="mb-4">
          <NuxtLink>章節課程</NuxtLink>
        </li>
        <li class="mb-4">
          <NuxtLink>價格</NuxtLink>
        </li>
      </ul>
    </aside>

    <main class="w-11/12">
      <slot />
    </main>
  </div>

  <slot name="footer"></slot>
</template>
