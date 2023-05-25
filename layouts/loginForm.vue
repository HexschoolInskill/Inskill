<template>
  <div>
    <div class="absolute left-[50%] top-[50%] w-1/4 translate-x-[-50%] translate-y-[-50%]">
      <img src="/images/logo-white.svg" alt="logo" />
      <slot />
    </div>

    <div
      v-if="modalOpen"
      class="modalWrapper absolute z-10 h-[100%] w-[100%] bg-black bg-opacity-50"
    >
      <div
        class="modal relative left-[50%] top-[50%] w-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded bg-white"
      >
        <div class="modalHeader border border-l-0 border-r-0 border-t-0 p-2 px-4">
          <button
            type="button"
            class="float-right mt-3 rounded-full bg-slate-400"
            @click="modalController('')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h1 class="p-2 text-center text-3xl">
            {{ policyType === 'user' ? '使用者條款' : '隱私權條款' }}
          </h1>
        </div>
        <div class="modalContent h-[50vh] overflow-auto p-4" style="white-space: break-spaces">
          {{ policyType === 'user' ? userPolicy : privitePolicy }}
        </div>
        <div class="modalFooter w-100 flex justify-center bg-slate-400 p-4">
          <button
            type="button"
            class="w-20 rounded bg-black text-white"
            @click="modalController('')"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePolicyStore } from '@/stores/policyStore'

const policyStore = usePolicyStore()
const { modalOpen, policyType, userPolicy, privitePolicy } = storeToRefs(policyStore)
const { modalController } = usePolicyStore()
</script>
