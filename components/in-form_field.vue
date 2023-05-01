<template>
  <label :for="field">{{ name }}</label>
  <input
    :type="name.includes('密碼') ? 'password' : 'text'"
    class="rounded border p-1"
    :class="{ 'mb-4': !field.$errors.length && !customError.length }"
    :name="field"
    v-model="field.$model"
    @keydown="hideCustomErrorMessageExist"
  />

  <div class="mb-4 text-red-500" v-if="showCustomErrorMessage">
    {{ customError }}
  </div>
  <div class="mb-4 text-red-500" v-for="error of field.$errors" :key="error.$uid">
    {{ error.$message }}
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const props = defineProps(['name', 'field', 'customError'])
const showCustomErrorMessage = ref(false)

watch(
  () => props.customError,
  (newErrorMessage) => {
    if (newErrorMessage.length) showCustomErrorMessage.value = true
  }
)

const hideCustomErrorMessageExist = () => {
  showCustomErrorMessage.value = false
}

// console.log(props)
</script>
