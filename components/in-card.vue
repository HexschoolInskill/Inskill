<template>
  <div
    ref="cardRef"
    class="in-card"
    :class="{ 'in-card--perspective': perspective, 'in-card--xs-white': xsWhite }"
    :style="{
      '--x': `${axisRotate.x}deg`,
      '--y': `${axisRotate.y}deg`
    }"
    @mouseover="handleMouseOver"
    @mouseleave="resetAxis"
  >
    <div class="in-card__wrapper" v-bind="$attrs">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script lang="ts" setup>
const props = defineProps({
  perspective: {
    type: Boolean
  },
  xsWhite: {
    type: Boolean,
    default: false
  }
})

const cardRef = ref<HTMLElement | null>(null)

const axisRotate = reactive({
  x: 0,
  y: 0
})
function resetAxis() {
  axisRotate.x = 0
  axisRotate.y = 0
}

function handleMouseOver(event: MouseEvent) {
  if (cardRef.value && props.perspective) {
    const x = event.clientX
    const y = event.clientY

    const rect = cardRef.value.getBoundingClientRect()

    axisRotate.x = ((y - rect.top - rect.height / 2) / rect.height) * -10
    axisRotate.y = ((x - rect.left - rect.width / 2) / rect.width) * -10
  }
}
</script>
<style lang="scss">
.in-card {
  &__wrapper {
    background-image: linear-gradient(90deg, #262b2f, #000);
    border-radius: 24px;
    overflow: hidden;
    will-change: transform;
    transition: transform 0.3s;
    height: 100%;
  }
  &--xs-white {
    .in-card__wrapper {
      background-color: #fff;
      background-image: none;
      @media (min-width: 640px) {
        background-image: linear-gradient(90deg, #262b2f, #000);
      }
    }
  }
  &--perspective {
    perspective: 1000px;
    .in-card__wrapper {
      transform: rotateX(var(--x, 0)) rotateY(var(--y, 0));
    }
  }
}
</style>
