<template>
  <label class="text-white" :for="name">{{ name }}</label>
  <input
    v-model="field.$model"
    :type="name?.includes('密碼') ? 'password' : 'text'"
    class="rounded border p-1"
    :class="{ 'mb-4': !field.$errors.length && !showCustomErrorMessage }"
    :name="name"
    @keydown="hideCustomErrorMessageExist"
  />

  <div v-if="showCustomErrorMessage" class="mb-4 text-red-500">
    {{ customError }}
  </div>
  <div v-for="error of field.$errors" :key="error.$uid" class="mb-4 text-red-500">
    {{ error.$message }}
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  field: {
    type: null,
    default: {}
  },
  customError: {
    type: String,
    default: ''
  }
})

const field = reactive(props.field)

const showCustomErrorMessage = ref(false)

watch(
  () => props.customError,
  (newErrorMessage) => {
    console.log(newErrorMessage)
    if (newErrorMessage?.length) showCustomErrorMessage.value = true
  }
)

const hideCustomErrorMessageExist = () => {
  showCustomErrorMessage.value = false
}

// console.log(props)
</script>
