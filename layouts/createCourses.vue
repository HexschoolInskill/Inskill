<template>
  <slot name="header"></slot>

  <div class="mt-[15vh] flex">
    <aside>
      <div>課程名稱</div>
      <ul>
        <li>
          <NuxtLink></NuxtLink>
        </li>
        <li>
          <NuxtLink></NuxtLink>
        </li>
        <li>
          <NuxtLink></NuxtLink>
        </li>
      </ul>
    </aside>

    <main>
      <slot />
    </main>
  </div>

  <slot name="footer"></slot>
</template>
