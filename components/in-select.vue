<template>
  <in-dropdown :options="options" size="138px" @select="handleSelect">
    <div
      class="in-select text-fs-6 inline-flex h-10 min-w-[138px] cursor-pointer items-center justify-between gap-3 rounded-1 border border-solid border-white px-4 text-white"
    >
      <p>{{ currentSelect || defaultSelect || placeholder }}</p>
      <i class="icon-arrow"></i>
    </div>
  </in-dropdown>
</template>
<script lang="ts" setup>
import type { Option } from '@/components/in-dropdown.vue'

const props = defineProps({
  options: {
    type: Array as PropType<Option[]>,
    default: () => []
  },
  size: {
    type: String as PropType<'small'>,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '請選擇'
  },
  defaultValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const defaultSelect = computed(
  () => props.options.find((option) => option.value === props.defaultValue)?.label ?? ''
)
const currentSelect = ref(
  props.options.find((option) => option.value === props.modelValue)?.label ?? ''
)

function handleSelect({ label, value }: Option) {
  currentSelect.value = label
  emit('update:modelValue', value)
}
</script>
<style lang="scss" scoped></style>
