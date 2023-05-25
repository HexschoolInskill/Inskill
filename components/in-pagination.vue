<template>
  <div class="flex items-center">
    <div @click="prev">
      <slot name="prev" :disabled="page <= 1"></slot>
    </div>
    <div class="mx-5 flex items-center gap-3">
      <div v-for="num in pagination" :key="num" @click="handleSlotClick(num)">
        <slot :num="num" :active="num === page">
          {{ num }}
        </slot>
      </div>
    </div>
    <div @click="next">
      <slot name="next" :disabled="page >= pageCount"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  pageSlot: {
    default: 1,
    type: Number
  },
  page: {
    default: 1,
    type: Number
  },
  pageCount: {
    default: 1,
    type: Number
  }
})

const emit = defineEmits(['update'])

const pagination = computed(() => {
  if (props.pageCount < props.pageSlot) {
    return Array.from({ length: props.pageCount }, (_, index) => index + 1)
  } else if (props.page - Math.floor(props.pageSlot / 2) < 1) {
    return Array.from({ length: props.pageSlot }, (_, index) => index + 1)
  } else if (props.page > props.pageCount || props.page + props.pageSlot / 2 > props.pageCount) {
    return Array.from(
      { length: props.pageSlot },
      (_, index) => props.pageCount - (props.pageSlot - 1) + index
    )
  } else {
    let offset = 0
    if (props.pageSlot % 2 === 0) {
      offset = 1
    }
    return [
      ...Array.from(
        { length: Math.floor(props.pageSlot / 2) - offset },
        (_, index) => props.page - Math.floor(props.pageSlot / 2) + index + offset
      ),
      props.page,
      ...Array.from(
        { length: Math.floor(props.pageSlot / 2) },
        (_, index) => props.page + index + 1
      )
    ]
  }
})

function prev() {
  if (props.page > 1) {
    emit('update', props.page - 1)
  }
}
function next() {
  if (props.page < props.pageCount) {
    emit('update', props.page + 1)
  }
}

function handleSlotClick(num: number) {
  emit('update', num)
}
</script>
<style lang="scss"></style>
