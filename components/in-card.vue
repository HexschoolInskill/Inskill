<template>
  <div
    ref="cardRef"
    class="in-card"
    :class="{
      'in-card--xs-white': xsWhite,
      'in-card--border': border
    }"
    :style="{
      borderRadius: `${borderRadius}px`
    }"
    @mouseover="handleMouseOver"
    @mouseleave="resetAxis"
  >
    <div
      v-if="glow"
      class="in-card__glow"
      :style="{
        borderRadius: `${borderRadius}px`
      }"
    ></div>
    <div
      class="in-card__wrapper"
      v-bind="$attrs"
      :style="{
        '--x': `${axisRotate.x}deg`,
        '--y': `${axisRotate.y}deg`,
        borderRadius: `${borderRadius}px`
      }"
    >
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
  },
  border: {
    type: Boolean,
    default: false
  },
  borderRadius: {
    type: Number,
    default: 24
  },
  glow: {
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
  position: relative;
  &__wrapper {
    background-image: linear-gradient(90deg, #262b2f, #000);
    will-change: transform;
    transition: transform 0.3s;
    overflow: hidden;
    height: 100%;
  }

  &__glow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transform: scale(0.99);
    @apply transition-base;

    &::before {
      content: '';
      display: block;
      width: 220%;
      height: 220%;
      position: absolute;
      left: 50%;
      top: 50%;
      background-image: linear-gradient(to right top, rgb(147 51 234), rgb(12 24 160));
      transform: translate(-50%, -50%);
      @apply transition-base;
    }
  }

  &:hover {
    .in-card__glow {
      filter: blur(12px);
      transform: scale(1.01);

      &::before {
        animation: glow 2s linear both infinite;

        @keyframes glow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      }
    }
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

  &--border {
    border: 1px solid white;
  }
}
</style>
