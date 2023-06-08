<template>
  <in-popup :show="isShow">
    <in-card class="max-w-[480px] p-8 text-white">
      <h3 class="text-h3 font-bold">{{ title }}</h3>
      <p class="text-fs-6 mt-5">{{ description }}</p>
      <div class="mt-10 flex justify-end gap-5">
        <in-btn size="small" ghost @click="confirmReject?.()">取消</in-btn>
        <in-btn size="small" @click="confirmResolve?.()">確認</in-btn>
      </div>
    </in-card>
  </in-popup>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useConfirm from '~/stores/useConfirm'

const store = useConfirm()
const { title, description, isShow, confirmResolve, confirmReject } = storeToRefs(store)
</script>
<style></style>
