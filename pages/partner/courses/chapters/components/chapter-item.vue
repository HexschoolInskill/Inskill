<template>
  <div class="flex h-15 w-full items-center border-b border-solid border-white/50 px-6">
    <div class="flex-shrink-0 pr-6">
      <i class="lesson-handler icon-reorder text-white"></i>
    </div>
    <div class="flex-1 text-white">
      <in-input
        v-if="isEditing"
        v-model="inputValue"
        class="text-black"
        @keyup.enter="handleEdit"
      />
      <h5 v-else class="text-h5 font-bold line-clamp-1">{{ value }}</h5>
    </div>
    <div class="flex flex-shrink-0 items-center gap-5 pl-6">
      <template v-if="isEditing">
        <button @click="handleEdit"><i class="icon-check"></i></button>
        <button @click="isEditing = false"><i class="icon-close"></i></button>
      </template>
      <template v-else>
        <in-dropdown v-slot="{ show }" :options="options" @select="handleOptionSelect">
          <div
            class="transition-base flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full text-white group-hover:bg-gray"
            :class="{ 'bg-gray': show }"
          >
            <svg
              class="w-6"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 16 16"
            >
              <g fill="none">
                <path
                  d="M5.25 8a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zm4 0a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zM12 9.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </div>
        </in-dropdown>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Option } from '@/components/in-dropdown.vue'
import useNotification from '~/stores/useNotification'
import useConfirm from '~/stores/useConfirm'

const { confirm } = useConfirm()
const { notification } = useNotification()

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    required: true
  }
})

const inputValue = ref('')
const isEditing = ref(false)

const options: Option[] = [
  {
    label: '重新命名',
    value: 'rename'
  },
  {
    label: '刪除章節',
    value: 'delete'
  }
]

const emit = defineEmits(['updated', 'deleted', 'loadingStart', 'loadingEnd'])

watch(isEditing, (editing) => {
  if (editing) inputValue.value = props.value
})

function handleEdit() {
  emit('loadingStart')
  setTimeout(() => {
    notification.success('更新成功')
    emit('loadingEnd')
    isEditing.value = false
  }, 300)
}

async function handleDelete() {
  const isConfirm = await confirm('確定刪除?', '將連同章節內的所有課程一起刪除')
  if (isConfirm) notification.success('刪除成功')
}

function handleOptionSelect(option: Option) {
  const key = option.value
  switch (key) {
    case 'rename':
      isEditing.value = true
      break
    case 'delete':
      handleDelete()
      break
    default:
  }
}
</script>
<style lang="scss"></style>
