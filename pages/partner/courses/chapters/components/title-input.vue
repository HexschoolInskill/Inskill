<template>
  <div class="flex w-full items-center border-b border-solid border-white/50 px-6">
    <slot name="handler"></slot>
    <div class="flex-1 text-white">
      <in-input
        v-if="isEditing"
        v-model="inputValue"
        class="text-black"
        @keyup.enter="handleEdit"
      />
      <template v-else>
        <h5 v-if="type === 'chapter'" class="text-h5 font-bold line-clamp-1">{{ value }}</h5>
        <h6 v-if="type === 'lesson'" class="text-fs-6 line-clamp-1">{{ value }}</h6>
      </template>
    </div>
    <div class="flex flex-shrink-0 items-center gap-5 pl-6">
      <template v-if="isEditing">
        <button @click="handleEdit"><i class="icon-check"></i></button>
        <button @click="isEditing = false"><i class="icon-close"></i></button>
      </template>
      <template v-else>
        <button @click="isEditing = true"><i class="icon-pencil"></i></button>
        <button @click="handleDelete"><i class="icon-trash text-red-500"></i></button>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useNotification from '~/stores/useNotification'
import useConfirm from '~/stores/useConfirm'
const { confirm } = useConfirm()
const { notification } = useNotification()

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  type: {
    type: String as PropType<'chapter' | 'lesson'>,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})

const inputValue = ref('')
const isEditing = ref(false)
const isLoading = ref(false)

const emit = defineEmits(['updated', 'deleted', 'loadingStart', 'loadingEnd'])

watch(isEditing, (editing) => {
  if (editing) inputValue.value = props.value
})

watch(isLoading, (loading) => {
  if (loading) {
    emit('loadingStart')
  } else {
    emit('loadingEnd')
  }
})

function handleEdit() {
  isLoading.value = true
  isLoading.value = true
  setTimeout(() => {
    notification.success('更新成功')
    isLoading.value = false
    isEditing.value = false
  }, 300)
}

function handleDelete() {
  const message =
    props.type === 'chapter' ? '將連同章節內的所有課程一起刪除' : '將連同課程的內容一起刪除'

  confirm('確定刪除?', message, () => {
    isLoading.value = true
    setTimeout(() => {
      notification.success('更新成功')
      isLoading.value = false
    }, 300)
  })
}
</script>
<style lang="scss"></style>
