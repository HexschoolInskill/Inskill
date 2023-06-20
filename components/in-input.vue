<template>
  <label class="in-input relative block w-full">
    <p v-if="label" class="mb-3 text-white">{{ label }}</p>
    <div>
      <input
        v-if="type === 'text'"
        v-model="inputValue"
        type="text"
        class="in-input__input"
        :class="{
          'in-input__input--error': error
        }"
        :disabled="disabled"
        :placeholder="placeholder"
      />
      <textarea
        v-else
        v-model="inputValue"
        cols="30"
        rows="10"
        class="in-input__input"
        :class="{
          'in-input__input--error': error
        }"
        :disabled="disabled"
        :placeholder="placeholder"
      ></textarea>
    </div>
  </label>
</template>
<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String as PropType<'text' | 'textarea'>,
    default: 'text'
  },
  error: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '請輸入文字'
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    return emit('update:modelValue', value)
  }
})
</script>
<style lang="scss" scoped>
.in-input {
  &__input {
    font-family: inherit;
    @apply transition-base block w-full rounded-1 border-2 border-solid border-gray-l bg-gray-l px-5 py-2 outline-none placeholder:text-gray hover:border-purple-600 focus-visible:border-purple-600;

    &:focus-visible {
      box-shadow: 0 0 10px rgb(147 51 234);
    }

    &[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }

    &--error {
      @apply border-2 border-solid border-red-500;

      &:focus-visible {
        outline: none;
      }
    }
  }
}
</style>
