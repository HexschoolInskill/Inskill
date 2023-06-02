<template>
  <div class="in-dropdown">
    <div class="relative">
      <div ref="triggerRef" @click="isOptionsShow = !isOptionsShow">
        <slot :show="isOptionsShow"></slot>
      </div>
      <teleport to="body">
        <transition name="dropdown-options">
          <div
            v-if="isOptionsShow"
            ref="optionsRef"
            class="fixed z-10 overflow-hidden rounded-1 bg-white text-black"
            :style="{ left: `${optionsPosition.x}px`, top: `${optionsPosition.y}px` }"
            @click.stop
          >
            <div
              v-for="option in options"
              :key="option.key"
              :label="option.label"
              class="cursor-pointer whitespace-nowrap border-b border-solid border-gray-l px-4 py-2 last:border-0 hover:bg-gray-l"
              @click="handleSelect(option)"
            >
              {{ option.label }}
            </div>
          </div>
        </transition>
      </teleport>
    </div>
  </div>
</template>
<script lang="ts">
export interface Option {
  label: string
  key: string
}
</script>
<script setup lang="ts">
defineProps({
  options: {
    type: Array as PropType<Option[]>,
    default: () => []
  }
})

const emit = defineEmits<{ (e: 'select', option: Option): void }>()

const isOptionsShow = ref(false)
const optionsPosition = reactive({
  x: 0,
  y: 0
})
const triggerRef = ref<HTMLDivElement | null>(null)
const optionsRef = ref<HTMLDivElement | null>(null)

async function calculateOptionsPosition(isOptionsShow: boolean) {
  await nextTick()
  if (!isOptionsShow || !triggerRef.value || !optionsRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const optionsRect = optionsRef.value.getBoundingClientRect()

  const basePositionX = triggerRect.left + triggerRect.width / 2 - optionsRect.width / 2
  if (basePositionX > window.innerWidth) {
    optionsPosition.x = window.innerWidth - optionsRect.width - 40
  } else {
    optionsPosition.x = basePositionX
  }

  optionsPosition.y = triggerRect.top + triggerRect.height + 12
}

watch(isOptionsShow, calculateOptionsPosition)

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
}
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
