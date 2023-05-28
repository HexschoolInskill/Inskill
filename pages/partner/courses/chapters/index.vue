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
          <in-card border class="flex">
            <div class="flex-shrink-0 border-r border-solid border-white/50 px-4">
              <div class="flex h-15 items-center">
                <i class="chapter-handler icon-reorder text-white"></i>
              </div>
            </div>
            <div class="flex-1">
              <title-input
                :id="chapter.id"
                type="chapter"
                :value="chapter.title"
                class="h-15"
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
                  <title-input
                    :id="lesson.id"
                    class="h-15"
                    type="lesson"
                    :value="lesson.title"
                    @loading-start="isLoading = true"
                    @loading-end="isLoading = false"
                  >
                    <template #handler>
                      <div class="flex-shrink-0 pr-6">
                        <i class="lesson-handler icon-reorder text-white"></i>
                      </div>
                    </template>
                  </title-input>
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
import TitleInput from './components/title-input.vue'
import useNotification from '~/stores/useNotification'

definePageMeta({
  layout: 'create-courses'
})

const { notification } = useNotification()
const isLoading = ref(false)
const courseTree = ref([
  {
    id: 'e8de7d47-2572-422a-8f0c-e5bbad9ea621',
    title:
      'sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam',
    sort: 1,
    lessons: [
      {
        id: 'e70b4b7c-efd4-48b1-9683-8b3df2019121',
        title: 'at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis',
        sort: 1
      },
      {
        id: '6849ac02-3d0e-46df-b419-194b0b1a96b8',
        title: 'ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non',
        sort: 2
      },
      {
        id: '09f6c1bc-4cc2-432a-9c2a-6cfc2c451b6b',
        title: 'mi integer ac neque duis bibendum morbi non quam nec dui luctus',
        sort: 3
      },
      {
        id: 'fe8d3420-fc48-43a3-9b3f-a44153f59161',
        title:
          'vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula',
        sort: 4
      },
      {
        id: '7f381205-c4ee-47ea-945c-50352aefd380',
        title: 'ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo',
        sort: 5
      }
    ]
  },
  {
    id: 'ab3080f6-4358-42a8-be7f-9fa3e0c0a65c',
    title:
      'fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam',
    sort: 2,
    lessons: [
      {
        id: '98e3ebc8-db33-40fd-9c84-69fa683e9f73',
        title: 'dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate',
        sort: 1
      },
      {
        id: '6c643c4c-06f1-452d-96c9-0a834b554b63',
        title:
          'nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis',
        sort: 2
      },
      {
        id: '90e303dc-2717-4fc3-ba59-57ad98fb2349',
        title: 'odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est',
        sort: 3
      },
      {
        id: '9b5e0c5c-7510-4ca3-9919-14dc66cc7154',
        title: 'ligula sit amet eleifend pede libero quis orci nullam molestie',
        sort: 4
      }
    ]
  },
  {
    id: '77d6ffeb-31f7-4d30-a14f-9057f5f4feca',
    title: 'nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede',
    sort: 3,
    lessons: [
      {
        id: '827693cf-23ae-4702-9a4c-9519e3cb3843',
        title:
          'etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia',
        sort: 1
      },
      {
        id: 'e3677f98-594b-422f-b133-40242dd04799',
        title:
          'non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt',
        sort: 2
      },
      {
        id: '713e2e70-b7ff-48b0-a667-63c60955e306',
        title:
          'donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst',
        sort: 3
      },
      {
        id: '1e50852f-04e0-4e7b-80b2-55c6683a8701',
        title: 'felis eu sapien cursus vestibulum proin eu mi nulla ac enim',
        sort: 4
      }
    ]
  },
  {
    id: '30d67b33-2b35-43e1-bf11-5ccb06701b86',
    title: 'purus phasellus in felis donec semper sapien a libero nam dui',
    sort: 4,
    lessons: [
      {
        id: '82082598-9570-4fd8-a171-46b8dffbd0e7',
        title:
          'venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet',
        sort: 1
      },
      {
        id: '900c470b-f593-4593-aba9-188908b3ded8',
        title:
          'in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula',
        sort: 2
      }
    ]
  },
  {
    id: '47d63689-4a02-44ea-b40c-a32314b2090f',
    title:
      'suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes',
    sort: 5,
    lessons: [
      {
        id: 'eef84b06-710c-47a0-8924-dd96dbaad03f',
        title:
          'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec',
        sort: 1
      },
      {
        id: '0daa6cbe-fdac-40fc-840f-bdbe0684fccf',
        title: 'porta volutpat erat quisque erat eros viverra eget congue eget',
        sort: 2
      },
      {
        id: 'f66a62c3-3700-4b96-ace4-94b3b98b9364',
        title:
          'augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst',
        sort: 3
      }
    ]
  },
  {
    id: '16755699-0111-4a16-8d59-96e70df6a520',
    title: 'purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend',
    sort: 6,
    lessons: []
  },
  {
    id: 'b546931f-4fbd-4bcf-8afd-63abf433a957',
    title:
      'id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est',
    sort: 7,
    lessons: [
      {
        id: '6f1f8e9e-5750-462a-9c28-8e30a73dafd0',
        title:
          'nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum',
        sort: 1
      },
      {
        id: '65f34d00-c8b9-477e-808f-e92ed90f088c',
        title:
          'imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum',
        sort: 2
      },
      {
        id: 'b175bcae-42f4-4db8-a153-f6bbd50fbad0',
        title:
          'lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id',
        sort: 3
      },
      {
        id: '3d029bf0-46b5-4fe8-8ee4-0d91a2197074',
        title:
          'id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis',
        sort: 4
      },
      {
        id: 'c0d8fb9c-9d28-41c6-9956-bdde33fa23f8',
        title:
          'tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet',
        sort: 5
      }
    ]
  },
  {
    id: '33dd5088-d59a-4c34-986a-c335b88e0c6f',
    title:
      'dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non',
    sort: 8,
    lessons: []
  },
  {
    id: '8baf0a31-5ed9-459f-8ba7-9e56ed25b605',
    title:
      'scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas',
    sort: 9,
    lessons: []
  },
  {
    id: '9b455815-6999-4a3f-9323-24745a01c861',
    title: 'eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut',
    sort: 10,
    lessons: [
      {
        id: 'bd9d07be-b171-47ff-af30-ce41b931ee2a',
        title:
          'lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio',
        sort: 1
      },
      {
        id: '748ea3e3-512e-41df-9a36-979b8bf3ff45',
        title: 'eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros',
        sort: 2
      },
      {
        id: 'ac363973-419e-4379-86de-693cd683ed77',
        title:
          'mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique',
        sort: 3
      },
      {
        id: 'cf38c0e7-e9b4-4178-ae44-2965ff02b120',
        title: 'sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis',
        sort: 4
      },
      {
        id: 'e6eab52c-d4a3-4f53-8a82-936922f1fb63',
        title:
          'pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean',
        sort: 5
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
