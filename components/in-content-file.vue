<template>
  <div class="border-bottom m-4 flex">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path>
      </g>
    </svg>

    <span class="mr-auto">檔案名稱</span>
    <span>檔案大小</span>

    <a :href="props.content" download>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 48 48"
      >
        <g fill="none">
          <path
            d="M12.25 38.5h23.5a1.75 1.75 0 0 1 .144 3.494L35.75 42h-23.5a1.75 1.75 0 0 1-.143-3.494l.143-.006h23.5h-23.5zM23.607 6.256l.143-.006a1.75 1.75 0 0 1 1.744 1.606L25.5 8v21.333l4.793-4.792a1.75 1.75 0 0 1 2.475 2.475l-7.778 7.778a1.75 1.75 0 0 1-2.475 0l-7.778-7.778a1.75 1.75 0 0 1 2.475-2.475L22 29.329V8a1.75 1.75 0 0 1 1.607-1.744l.143-.006l-.143.006z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    </a>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  content: {
    type: String,
    default: ""
  }
})

console.log(props)
</script>
