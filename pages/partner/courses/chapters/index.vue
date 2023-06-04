<template>
  <div class="relative">
    <draggable
      v-model="courseTree"
      item-key="id"
      handle=".chapter-handler"
      @end="handleSort('chapter')"
    >
      <template #item="{ element: chapter }">
        <div class="chapter">
          <in-card border class="flex" :border-radius="4">
            <div class="flex-shrink-0 border-r border-solid border-white/50 px-4">
              <div class="flex h-15 items-center">
                <i class="chapter-handler icon-reorder text-white"></i>
              </div>
            </div>
            <div class="flex-1">
              <chapter-item
                :id="chapter.id"
                :value="chapter.title"
                @loading-start="isLoading = true"
                @loading-end="isLoading = false"
              />
              <draggable
                v-if="chapter.lessons && chapter.lessons.length !== 0"
                v-model="chapter.lessons"
                item-key="id"
                handle=".lesson-handler"
                @end="handleSort('lesson', chapter.id)"
              >
                <template #item="{ element: lesson }">
                  <lesson-item
                    :id="lesson.id"
                    :value="lesson.title"
                    :publish="lesson.isPublish"
                    @loading-start="isLoading = true"
                    @loading-end="isLoading = false"
                  />
                </template>
              </draggable>
              <div class="py-2 text-center">
                <in-btn size="small" ghost>新增課程</in-btn>
              </div>
            </div>
          </in-card>
        </div>
      </template>
    </draggable>
    <div class="mt-5 text-center">
      <in-btn>新增章節</in-btn>
    </div>
    <transition name="loading">
      <div
        v-if="isLoading"
        class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/80"
      >
        <in-spin :size="40" color="#fff" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import ChapterItem from './components/chapter-item.vue'
import LessonItem from './components/lesson-item.vue'
import useNotification from '~/stores/useNotification'

definePageMeta({
  layout: 'create-courses'
})

const { notification } = useNotification()
const isLoading = ref(false)
const courseTree = ref([
  {
    id: 'dd5d3ffa-63cf-43bb-ba38-9ee5f0419f91',
    title:
      'nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque',
    sort: 1,
    lessons: [
      {
        id: '27355d95-5ccc-43d3-bc59-d4b871d16b7d',
        title: 'tristique est et tempus semper est quam pharetra magna ac consequat',
        sort: 1,
        isPublish: false
      },
      {
        id: 'fb114f16-ed35-4bbb-b5c6-c7c9fec882ed',
        title:
          'nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et',
        sort: 2,
        isPublish: true
      }
    ]
  },
  {
    id: 'b9ec3c2f-eb55-465a-b959-253192e797e3',
    title:
      'dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia',
    sort: 2,
    lessons: [
      {
        id: 'ec4c49ea-9a2b-46f6-96a3-58d739d6b730',
        title:
          'eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a',
        sort: 1,
        isPublish: false
      },
      {
        id: '8a63eb7c-eabd-4a64-8689-a33b04910caa',
        title: 'suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis',
        sort: 2,
        isPublish: false
      },
      {
        id: '97625518-7dc1-480d-925d-2f930c2fa304',
        title:
          'ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa',
        sort: 3,
        isPublish: false
      },
      {
        id: '4f6f2a89-4c74-4412-bd32-3898456ad767',
        title: 'platea dictumst maecenas ut massa quis augue luctus tincidunt nulla',
        sort: 4,
        isPublish: false
      }
    ]
  },
  {
    id: '8eb196bd-e222-42a1-9b38-b97209a39a36',
    title: 'leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede',
    sort: 3,
    lessons: [
      {
        id: '23f07e48-cfae-4f53-9d05-b13285743a3e',
        title:
          'mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem',
        sort: 1,
        isPublish: false
      }
    ]
  },
  {
    id: '83a724ad-8e05-4844-a571-ff6da16d06fe',
    title:
      'ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis',
    sort: 4,
    lessons: [
      {
        id: '8c791c9a-5136-46f9-a7c9-b706752cfb51',
        title:
          'nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus',
        sort: 1,
        isPublish: false
      },
      {
        id: 'cd406b85-5a4b-47f9-8c06-aaa91ed73aa7',
        title:
          'in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin',
        sort: 2,
        isPublish: false
      }
    ]
  },
  {
    id: '7e61ca1a-4837-4088-a7ce-26c5a2cf0339',
    title: 'consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam',
    sort: 5,
    lessons: [
      {
        id: '715d591c-88d3-4dcc-b236-24fa036e9a52',
        title: 'tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut',
        sort: 1,
        isPublish: true
      },
      {
        id: 'd6e6104a-776d-4ed3-8ea1-7988dd9941e9',
        title:
          'nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis',
        sort: 2,
        isPublish: true
      }
    ]
  }
])

function handleSort(type: 'chapter' | 'lesson', chapterId?: string) {
  isLoading.value = true

  if (type === 'chapter') {
    console.log(
      courseTree.value.map((chapter, index) => ({
        id: chapter.id,
        sort: index
      }))
    )
  }

  if (type === 'lesson') {
    if (!chapterId) return
    const targetChapter = courseTree.value.find((chapter) => chapter.id === chapterId)
    console.log(
      targetChapter?.lessons.map((lesson, index) => ({
        id: lesson.id,
        sort: index + 1
      }))
    )
  }

  notification.success('更新成功')

  setTimeout(() => {
    isLoading.value = false
  }, 300)
}
</script>

<style lang="scss" scoped>
.chapter-handler,
.lesson-handler {
  cursor: grab;
}

.chapter {
  &:not(:last-child) {
    @apply mb-5;
  }
}
</style>
