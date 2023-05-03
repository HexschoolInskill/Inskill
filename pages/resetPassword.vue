<template>
  <h1 class="my-4 text-3xl font-bold">
    {{ step === 1 ? '重設密碼' : '密碼設定成功' }}
  </h1>
  <p v-if="step === 2" class="text-2xl">您的密碼已經更新， 請重新登入</p>

  <div v-if="step === 1" class="flex flex-col">
    <InFormField
      v-model:field="v$.password"
      :custom-error="!v$.password.$model.length ? formFieldErrorMessage : ''"
      name="新密碼"
    ></InFormField>

    <InFormField
      v-model:field="v$.confirmPassword"
      :custom-error="!v$.confirmPassword.$model.length ? formFieldErrorMessage : ''"
      name="確認新密碼"
    ></InFormField>

    <button type="button" class="w-20 rounded border bg-black text-white" @click="resetPassword">
      繼續
    </button>
  </div>

  <div v-else class="my-4 flex flex-col">
    <NuxtLink to="login">
      <button type="button" class="w-20 rounded bg-black text-white">繼續</button>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onBeforeMount } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs, helpers } from '@vuelidate/validators'

definePageMeta({
  layout: 'login-form'
})

const router = useRouter()
const route = useRoute()

const formFields = reactive({
  password: '',
  confirmPassword: ''
})
const formFieldErrorMessage = ref('')

const rules = {
  password: {
    required: helpers.withMessage('請輸入密碼', required)
  },
  confirmPassword: {
    required: helpers.withMessage('請輸入密碼', required),
    sameAs: helpers.withMessage('請輸入相同的密碼', sameAs(computed(() => formFields.password)))
  }
}

const v$ = useVuelidate(rules, formFields)

const step = ref(1)

const resetPassword = async () => {
  //   console.log('hi')

  return await $fetch('/api/user/resetPassword', {
    method: 'POST',
    body: { newPassword: formFields.password }
  })
}

onBeforeMount(() => {
  //   console.log(route.query)

  // 如果沒有攜帶一次性的 token， 返回首頁
  if (!route.query) {
    router.push('/')
  }
})
</script>
