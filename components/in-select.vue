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
  modelValue: {
    type: [String, Boolean, Number],
    default: undefined
  },
  placeholder: {
    type: String,
    default: '請選擇'
  },
  defaultValue: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Boolean, Number],
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue', 'select'])

const defaultSelect = computed(
  () => props.options.find((option) => option.value === props.defaultValue)?.label ?? ''
)
const currentSelect = ref(
  props.value !== undefined
    ? props.options.find((option) => option.value === props.value)?.label ?? ''
    : props.options.find((option) => option.value === props.modelValue)?.label ?? ''
)

watch([() => props.value, () => props.modelValue], ([value, modelValue]) => {
  if (props.value !== undefined) {
    currentSelect.value = props.options.find((option) => option.value === value)?.label ?? ''
  } else {
    currentSelect.value = props.options.find((option) => option.value === modelValue)?.label ?? ''
  }
})

function handleSelect({ value }: Option) {
  emit('update:modelValue', value)
  emit('select', value)
}
</script>
<style lang="scss" scoped></style>
