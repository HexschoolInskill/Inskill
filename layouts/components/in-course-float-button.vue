<template>
  <ul
    class="fixed right-[16.4%] h-full h-min w-[65px] rounded border border-[#6C757D] max-[1536px]:right-[8%]"
    :class="{ 'top-[150px]': props.deepDive }"
  >
    <!-- 留言 -->
    <li
      class="right-controller border-bottom"
      :class="{ '!hidden': props.deepDive }"
      @click="scrollToQuestion"
    >
      <svg
        class="mx-auto w-3/6"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 16 16"
      >
        <g fill="none">
          <path
            d="M1 4.5A2.5 2.5 0 0 1 3.5 2h9A2.5 2.5 0 0 1 15 4.5v5a2.5 2.5 0 0 1-2.5 2.5H8.688l-3.063 2.68A.98.98 0 0 1 4 13.942V12h-.5A2.5 2.5 0 0 1 1 9.5v-5zM3.5 3A1.5 1.5 0 0 0 2 4.5v5A1.5 1.5 0 0 0 3.5 11H5v2.898L8.312 11H12.5A1.5 1.5 0 0 0 14 9.5v-5A1.5 1.5 0 0 0 12.5 3h-9z"
            fill="currentColor"
          ></path>
        </g>
      </svg>

      <span class="toolTip">課程討論</span>
    </li>
    <!-- 沉浸模式 -->
    <li
      class="right-controller border-bottom"
      :class="{ '!border-b-0': props.deepDive }"
      @click="emit('update:deepDive', !props.deepDive)"
    >
      <svg
        class="mx-auto w-3/6"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
      >
        <path
          d="M15 3l2.3 2.3l-2.89 2.87l1.42 1.42L18.7 6.7L21 9V3h-6zM3 9l2.3-2.3l2.87 2.89l1.42-1.42L6.7 5.3L9 3H3v6zm6 12l-2.3-2.3l2.89-2.87l-1.42-1.42L5.3 17.3L3 15v6h6zm12-6l-2.3 2.3l-2.87-2.89l-1.42 1.42l2.89 2.87L15 21h6v-6z"
          fill="currentColor"
        ></path>
      </svg>

      <span class="toolTip">沉浸模式</span>
    </li>
    <!-- 上一堂課 -->
    <li
      class="right-controller border-bottom"
      :class="{ '!hidden': props.deepDive }"
      @click="emit('moveToLesson', props.lesson - 1)"
    >
      <svg
        class="mx-auto w-3/6"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
      >
        <path d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z" fill="currentColor"></path>
      </svg>

      <span class="toolTip">上一堂課</span>
    </li>
    <!-- 下一堂課 -->
    <li
      class="right-controller"
      :class="{ '!hidden': props.deepDive }"
      @click="emit('moveToLesson', props.lesson + 1)"
    >
      <svg
        class="mx-auto w-3/6"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
      >
        <path
          d="M10.02 6L8.61 7.41L13.19 12l-4.58 4.59L10.02 18l6-6l-6-6z"
          fill="currentColor"
        ></path>
      </svg>

      <span class="toolTip">下一堂課</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps({
  deepDive: {
    type: Boolean,
    default: false
  },
  lesson: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['update:deepDive', 'moveToLesson'])

// 移動到下方問答區塊
const scrollToQuestion = () => {
  const el = document.getElementById('question')
  el?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style lang="scss" scope>
.right-controller {
  @apply relative inline-block cursor-pointer py-2;
  .toolTip {
    @apply invisible absolute left-[65px] top-[10px] ml-1 w-[100px] rounded bg-white px-[5px] text-center text-sm text-black;
  }
  &:hover {
    .toolTip {
      @apply visible;
    }
  }
}
</style>
