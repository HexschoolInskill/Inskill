<template>
  <div class="flex gap-10">
    <div class="flex-1">
      <in-card border :border-radius="4">
        <div
          class="flex items-center justify-between gap-10 border border-b border-solid border-white/50 p-6"
        >
          <h3 class="text-h3 font-bold">{{ course.title }}</h3>
          <div class="flex items-center gap-5">
            <in-select v-model="isPublish" :options="publishOptions" />
            <!-- <in-dropdown v-slot="{ show }" :options="options">
              <div
                class="transition-base flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full text-white group-hover:bg-gray"
                :class="{ 'bg-gray': show }">
                <svg class="w-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 16 16">
                  <g fill="none">
                    <path
                      d="M5.25 8a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zm4 0a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zM12 9.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5z"
                      fill="currentColor"></path>
                  </g>
                </svg>
              </div>
            </in-dropdown> -->
          </div>
        </div>
        <draggable v-model="course.contents" @end="sortContent">
          <template #item="{ element: content }">
            <editor
              v-if="content.type === 'editor'"
              :content="content"
              @edit="editContent(content)"
              @delete="deleteContent(content.id)"
            />
          </template>
        </draggable>
        <div class="py-5 text-center">
          <in-btn size="small" @click="isComponentListShow = true">新增內容</in-btn>
        </div>
      </in-card>
    </div>
    <div class="w-[400px] flex-shrink-0">
      <transition name="slide-up" mode="out-in">
        <component-list
          v-if="isComponentListShow"
          @add="handleAddComponent"
          @close="isComponentListShow = false"
        />
      </transition>
    </div>
    <in-popup :show="!!modalType" :size="720">
      <in-card class="px-4 py-8">
        <in-container>
          <h3 class="text-h3 font-bold text-white">文字編輯器</h3>
          <div class="mt-5 h-[480px]">
            <in-editor v-model="currentEditorContent" class="w-full" :height="480" />
          </div>
          <div class="mt-5 flex items-center justify-end gap-5">
            <in-btn ghost size="small" @click="closeModal">取消</in-btn>
            <in-btn v-if="currentContentId" size="small" @click="updateContent">儲存</in-btn>
            <in-btn v-else size="small" @click="addContent">儲存</in-btn>
          </div>
        </in-container>
      </in-card>
    </in-popup>
  </div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import Draggable from 'vuedraggable'
import ComponentList from './components/component-list.vue'
import Editor from './components/editor.vue'
import type { Option } from '@/components/in-dropdown.vue'
import useNotification from '~/stores/useNotification'
import useConfirm from '~/stores/useConfirm'

interface IContent {
  id: string
  type: string
  value: string
  sort: number
}

const { notification } = useNotification()
const { confirm } = useConfirm()

const course = reactive({
  title: '課堂名稱',
  isPublish: false,
  contents: [
    {
      type: 'editor',
      id: uuidv4(),
      value: '<h1>Hello world<h1>',
      sort: 1
    }
  ]
})

const modalType = ref<'' | 'editor'>('')
const currentContentId = ref('')
const currentEditorContent = ref('')

const isPublish = computed({
  get() {
    return course.isPublish ? 'publish' : 'unpublish'
  },
  set(value) {
    notification.success('更新成功')
    course.isPublish = value === 'publish'
  }
})

const isComponentListShow = ref(false)

const publishOptions: Option[] = [
  {
    label: '公開',
    value: 'publish'
  },
  {
    label: '不公開',
    value: 'unpublish'
  }
]
// const options: Option[] = [
//   {
//     label: '重新命名',
//     value: 'rename'
//   },
//   {
//     label: '刪除課堂',
//     value: 'delete'
//   }
// ]
function handleAddComponent(type: string) {
  switch (type) {
    case 'editor':
      currentEditorContent.value = ''
      modalType.value = 'editor'
      break
    default:
  }
}
function editContent(content: IContent) {
  switch (content.type) {
    case 'editor':
      currentEditorContent.value = content.value
      currentContentId.value = content.id
      modalType.value = 'editor'
      break
    default:
  }
}
function addContent() {
  switch (modalType.value) {
    case 'editor':
      course.contents.push({
        id: uuidv4(),
        type: 'editor',
        value: currentEditorContent.value,
        sort: course.contents.length + 1
      })

      notification.success('新增成功')

      modalType.value = ''
      currentEditorContent.value = ''

      break
    default:
  }
}
function updateContent() {
  const targetContent = course.contents.find((content) => content.id === currentContentId.value)
  if (!targetContent) return
  targetContent.value = currentEditorContent.value
  notification.success('更新成功')
  modalType.value = ''
  currentContentId.value = ''
  currentEditorContent.value = ''
}

function sortContent() {
  course.contents.forEach((content, index) => {
    content.sort = index + 1
  })
  notification.success('更新成功')
}

async function deleteContent(id: string) {
  const isConfirm = await confirm('確定刪除內容?', '將刪除內容')
  if (!isConfirm) return

  course.contents = course.contents.filter((content) => content.id !== id)

  notification.success('刪除成功')
}

function closeModal() {
  modalType.value = ''
  currentContentId.value = ''
  currentEditorContent.value = ''
}
</script>

<style lang="scss" scoped>
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: 0.3s ease-in-out;
}
</style>
