<template>
  <section class="success py-24">
    <in-container>
      <div class="mx-auto w-full text-center leading-normal text-white sm:w-8/12">
        <svg width="200" height="200" class="success__svg mx-auto">
          <circle
            class="circle"
            fill="none"
            stroke="#fff"
            stroke-width="16"
            cx="100"
            cy="100"
            r="90"
            transform="rotate(-90 100 100)"
            stroke-linecap="round"
          />
          <polyline
            class="tick"
            fill="none"
            stroke="#fff"
            stroke-width="16"
            points="44,107 86,142 152,69"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h1 class="mt-10 text-3xl font-black">我們已收到您的申請</h1>
        <p class="mt-5 text-gray-l">
          您的申請正在審核中， <br />
          審核作業流程需 5-7 個工作天， <br />
          審核完畢後會有專員與您聯絡。
        </p>
      </div>
      <div class="mt-10 text-center">
        <in-btn @click="navigateTo('/')">回到首頁</in-btn>
      </div>
    </in-container>
  </section>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.circle {
  stroke-dasharray: 1194;
  stroke-dashoffset: 1194;
  animation: circle 1s ease-in-out forwards;
}
.tick {
  stroke-dasharray: 350;
  stroke-dashoffset: 350;
  animation: tick 0.8s ease-out forwards;
  animation-delay: 0.95s;
}

@keyframes circle {
  from {
    stroke-dashoffset: 1194;
  }
  to {
    stroke-dashoffset: 2388;
  }
}

@keyframes tick {
  from {
    stroke-dashoffset: 350;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
