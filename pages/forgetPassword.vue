<template>
  <h1 class="my-4 text-3xl font-bold text-white">忘記密碼</h1>

  <form>
    <div v-if="step === 1" class="flex flex-col">
      <label class="text-white" for="email">信箱</label>
      <input
        v-model="v$.userEmail.$model"
        type="text"
        class="rounded border p-1"
        :class="{ 'mb-4': !v$.userEmail.$errors.length }"
        name="email"
        @keypress.enter="nextStep"
      />
      <in-spin v-show="isLoading" :size="40" class="absolute right-3 top-[70%] -translate-y-1/2" />
      <div v-for="error of v$.userEmail.$errors" :key="error.$uid" class="mb-4 text-red-500">
        {{ error.$message }}
      </div>

      <button
        type="button"
        :disabled="isLoading"
        class="mt-2 w-20 rounded border bg-black text-white"
        @click="nextStep"
      >
        繼續
      </button>
    </div>

    <div v-if="step === 2" class="flex flex-col">
      <p class="text-white">已寄送重設密碼的連結，請至信箱查收</p>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import useNotification from '~~/stores/useNotification'

definePageMeta({
  layout: 'login-form'
})

const { notification } = useNotification()

const formFields = reactive({
  userEmail: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  userEmail: {
    required: helpers.withMessage('請輸入信箱', required),
    email: helpers.withMessage('請填入正確的信箱', email)
  }
}

const v$ = useVuelidate(rules, formFields)

const step = ref(1)
const { $api } = useNuxtApp()
const isLoading = ref(false)

// 往下一步移動
const nextStep = async () => {
  try {
    isLoading.value = true
    const emailExist: any = await $api.user.isEmailRegister({ email: formFields.userEmail })

    if (emailExist.success) {
      step.value += 1
    } else {
      notification.error(emailExist.message)
    }
  } catch (err: any) {
    notification.error(err.message)
  } finally {
    isLoading.value = false
  }
}
</script>
