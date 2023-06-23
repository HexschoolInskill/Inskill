<template>
  <aside class="w-2/12" :class="{ hidden: props.deepDive }">
    <h2 class="my-4 text-2xl font-bold">課程介紹</h2>

    <ul>
      <li
        v-for="(chapter, index) in props.currentCourse.chapters"
        :key="chapter.title"
        class="my-2 cursor-pointer rounded-md"
        :class="[props.expandChapter === index ? 'bg-white text-black' : 'border']"
        @click="emit('update:expandChapter', index)"
      >
        <div class="flex items-center px-4 py-2">
          <span class="mr-auto">{{ chapter.title }}</span>
          <i class="icon-arrow text-[24px]" :class="{ 'rotate-180': expandChapter === index }"></i>
        </div>

        <ul v-if="props.expandChapter === index">
          <li
            v-for="(lesson, lessonIndex) in chapter.lessons"
            :key="lesson.title"
            class="px-4 py-2"
            :class="{
              'bg-yellow':
                lesson._id === currentCourse.chapters[content.chapter].lessons[content.lesson]._id,
              'border-bottom': lessonIndex + 1 !== chapter.lessons.length
            }"
            @click.stop="emit('update:content', lessonIndex)"
          >
            <div class="flex items-center p-1">
              <span class="mr-auto">{{ lesson.title }}</span>
              <span
                v-if="lesson.freePreview"
                class="w-[100px] rounded-md border py-1 text-center"
                :class="{ hidden: purchased }"
                >試看
              </span>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
                class="w-[25px]"
                :class="{ hidden: purchased }"
              >
                <g fill="none">
                  <path
                    d="M18 20a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm-8-10V8a6 6 0 0 1 12 0v2h1.5a3.5 3.5 0 0 1 3.5 3.5v13a3.5 3.5 0 0 1-3.5 3.5h-15A3.5 3.5 0 0 1 5 26.5v-13A3.5 3.5 0 0 1 8.5 10H10zm2-2v2h8V8a4 4 0 0 0-8 0zm-3.5 4A1.5 1.5 0 0 0 7 13.5v13A1.5 1.5 0 0 0 8.5 28h15a1.5 1.5 0 0 0 1.5-1.5v-13a1.5 1.5 0 0 0-1.5-1.5h-15z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
const props = defineProps({
  deepDive: {
    type: Boolean,
    default: false
  },
  purchased: {
    type: Boolean,
    default: false
  },
  expandChapter: {
    type: Number,
    default: 0
  },
  currentCourse: {
    type: null,
    default: {}
  },
  content: {
    type: null,
    default: {}
  }
})
const emit = defineEmits(['update:expandChapter', 'update:content'])
</script>
