<template>
  <div
    ref="triggerRef"
    class="inline-block"
    v-bind="$attrs"
    @click="isOptionsShow = !isOptionsShow"
  >
    <slot :show="isOptionsShow"></slot>
  </div>
  <teleport to="body">
    <transition name="dropdown-options">
      <div
        v-if="isOptionsShow"
        ref="optionsRef"
        class="fixed z-50 overflow-hidden rounded-1 bg-[#1f1f23] p-2 text-white shadow"
        :style="{
          left: `${optionsPosition.x}px`,
          top: `${optionsPosition.y}px`,
          width: optionsSize
        }"
        @click.stop
      >
        <div
          v-for="option in options"
          :key="String(option.value)"
          :label="option.label"
          class="transition-base cursor-pointer whitespace-nowrap rounded-1 px-4 py-2 last:border-0 hover:bg-gray-600"
          @click="handleSelect(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
const OPTIONS_SCALE_RATIO = 0.9

export interface Option {
  label: string
  value: string | number | boolean
}
</script>
<script setup lang="ts">
const props = defineProps({
  options: {
    type: Array as PropType<Option[]>,
    default: () => []
  },
  size: {
    type: [Number, String],
    default: 'auto'
  }
})

const emit = defineEmits<{ (e: 'select', option: Option): void }>()

const isOptionsShow = ref(false)
const optionsSize = computed(() => {
  return typeof props.size === 'number' ? `${props.size}px` : props.size
})
const optionsPosition = reactive({
  x: 0,
  y: 0
})
const triggerRef = ref<HTMLDivElement | null>(null)
const optionsRef = ref<HTMLDivElement | null>(null)

function calculateOptionsStyle(isScrollOrResize = false) {
  if (!triggerRef.value || !optionsRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const optionsRect = optionsRef.value.getBoundingClientRect()
  const basePositionX = isScrollOrResize
    ? triggerRect.left + triggerRect.width / 2 - optionsRect.width / 2
    : triggerRect.left + triggerRect.width / 2 - optionsRect.width / OPTIONS_SCALE_RATIO / 2
  if (basePositionX + optionsRect.width / OPTIONS_SCALE_RATIO > window.innerWidth) {
    optionsPosition.x = window.innerWidth - optionsRect.width - 40
  } else {
    optionsPosition.x = basePositionX
  }

  optionsPosition.y = triggerRect.top + triggerRect.height + 12
}

watch(isOptionsShow, async (current) => {
  if (current) {
    await nextTick()
    calculateOptionsStyle()
  }
})

function handleClickOutside(event: Event) {
  if (!triggerRef.value) return
  const target = event.target as HTMLElement
  const isOutSide = !triggerRef.value.contains(target)
  if (isOutSide) isOptionsShow.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function handleSelect(option: Option) {
  emit('select', option)
  isOptionsShow.value = false
}

function handleScrollAndResize() {
  if (isOptionsShow) calculateOptionsStyle(true)
}

onMounted(() => {
  window.addEventListener('scroll', handleScrollAndResize)
  window.addEventListener('resize', handleScrollAndResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScrollAndResize)
  window.removeEventListener('resize', handleScrollAndResize)
})
</script>
<style lang="scss" scoped>
.dropdown-options-enter-from,
.dropdown-options-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.dropdown-options-enter-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  transform-origin: top center;
}
</style>
