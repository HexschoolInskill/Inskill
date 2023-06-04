<template>
  <div class="avatar mr-4 w-1/6">
    <!-- <img src="" alt="avatar" /> -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
    >
      <path
        d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z"
        fill="currentColor"
      ></path>
      <path
        d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z"
        fill="currentColor"
      ></path>
    </svg>
    <p class="text-center">{{ props.review.userId }}</p>
  </div>

  <div class="w-full">
    <in-content-star :stars="props.review.rating"></in-content-star>

    <p>{{ props.review.comment }}</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  review: {
    type: null,
    default: []
  }
})
</script>
