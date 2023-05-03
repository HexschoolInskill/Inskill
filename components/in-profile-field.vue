<template>
  <div class="in-profile-field">
    <div v-if="edit">
      <div class="relative">
        <input
          v-model="inputValue"
          type="text"
          class="flex h-8 w-full items-center rounded-1 px-3 outline-none"
          :class="{
            'border-2 border-solid  border-red-600': error,
            'pointer-events-none select-none opacity-50': disabled
          }"
          :placeholder="placeholder"
        />
        <in-spin v-show="loading" class="absolute right-3 top-1/2 -translate-y-1/2" />
      </div>

      <div
        class="mt-3 flex items-center gap-5"
        :class="{
          'pointer-events-none select-none opacity-50': disabled
        }"
      >
        <button
          class="rounded-1 bg-white px-3 font-bold hover:bg-white/80"
          @click="$emit('cancel')"
        >
          取消
        </button>
        <button class="rounded-1 bg-white px-3 font-bold hover:bg-white/80" @click="update">
          儲存
        </button>
      </div>
    </div>
    <div
      v-else
      class="relative flex h-8 w-full items-center border-b border-solid border-white py-1 text-white"
    >
      <p class="flex-1">
        <span class="font-bold">{{ placeholder }}: </span>
        <span>{{ value }}</span>
      </p>
      <div
        class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-white hover:text-black"
        @click="$emit('edit')"
      >
        <i class="icon-pencil"></i>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const inputValue = ref('')

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  edit: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  }
})

watch(
  () => props.edit,
  (isEditing) => {
    if (isEditing) inputValue.value = props.value
  }
)

const emit = defineEmits(['edit', 'update', 'cancel'])

function update() {
  emit('update', inputValue.value)
}
</script>
<style lang="scss"></style>
