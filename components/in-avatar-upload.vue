<template>
  <label
    class="group relative flex min-h-15 min-w-15 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full"
    :class="{ 'pointer-events-none opacity-50': disabled }"
  >
    <input class="hidden" type="file" :disabled="disabled" @change="handleChange" />
    <in-spin v-if="loading" :size="40" color="#fff" />
    <img v-else-if="imagePreview" class="h-full w-full object-cover" :src="imagePreview" />
    <img v-else class="h-full w-full object-cover" src="/images/avatar-fallback.svg" />
    <div
      class="transition-base absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100"
    >
      <i class="icon-upload text-[28px] text-white"></i>
    </div>
  </label>
</template>
<script setup lang="ts">
type ModelValue = File | string | null

const props = defineProps({
  modelValue: {
    type: [Object, String] as PropType<ModelValue>,
    default: ''
  },
  size: {
    type: Number,
    default: 60
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const imagePreview = computed(() => {
  if (props.modelValue) {
    if (props.modelValue instanceof File) {
      return URL.createObjectURL(props.modelValue)
    } else {
      return props.modelValue
    }
  }
  return ''
})

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0] ?? null
  if (file) {
    emit('update:modelValue', file)
    emit('change', file)
  }
}
</script>
<style lang=""></style>
