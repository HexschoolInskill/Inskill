<template>
  <h1 class="my-4 text-3xl font-bold">
    {{ step === 1 ? '忘記密碼' : step === 2 ? '重設密碼' : '密碼設定成功' }}
  </h1>

  <p v-if="step === 3" class="text-2xl">您的密碼已經更新， 請重新登入</p>

  <form>
    <div v-if="step === 1" class="flex flex-col">
      <InFormField
        name="信箱"
        v-model:field="v$.userEmail"
        :customError="!v$.userEmail.$model.length ? formFieldErrorMessage : ''"
      ></InFormField>

      <button type="button" class="w-20 rounded border bg-black text-white" @click="nextStep">
        繼續
      </button>
    </div>

    <div v-if="step === 2" class="flex flex-col">
      <InFormField
        name="新密碼"
        v-model:field="v$.password"
        :customError="!v$.password.$model.length ? formFieldErrorMessage : ''"
      ></InFormField>

      <InFormField
        name="確認新密碼"
        v-model:field="v$.confirmPassword"
        :customError="!v$.confirmPassword.$model.length ? formFieldErrorMessage : ''"
      ></InFormField>

      <button type="button" class="w-20 rounded border bg-black text-white" @click="nextStep">
        繼續
      </button>
    </div>

    <div v-if="step === 3" class="my-4 flex flex-col">
      <NuxtLink to="login">
        <button type="button" class="w-20 rounded bg-black text-white">繼續</button>
      </NuxtLink>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onBeforeMount } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, helpers } from '@vuelidate/validators'

definePageMeta({
  layout: 'login-form'
})

const router = useRouter()
const route = useRoute()

const formFields = reactive({
  userEmail: '',
  password: '',
  confirmPassword: ''
})
const formFieldErrorMessage = ref('')

const rules = {
  userEmail: {
    required: helpers.withMessage('請輸入信箱', required),
    email: helpers.withMessage('請填入正確的信箱', email)
  },
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
  console.log('hi')

  //  return await $fetch('/api/user/resetPassword', { method: 'POST', body: { newPassword: formFields.password } })
}

// 往下一步移動
const nextStep = async () => {
  switch (step.value) {
    //
    case 1:
      if (formFields.userEmail.length && !v$.value.userEmail.$errors.values.length) {
        // const emailExist = await $fetch('/api/user/isEmailRegister', { method: 'POST', body: { email: formFields.userEmail } })

        // if(emailExist){
        step.value += 1
        formFieldErrorMessage.value = ''
        // }else{
        //     formFieldErrorMessage.value = '查無信箱'
        // }
      } else {
        formFieldErrorMessage.value = '請填入信箱'
      }
      break

    case 2:
      if (
        formFields.password.length &&
        formFields.confirmPassword.length &&
        !v$.value.password.$errors.values.length &&
        !v$.value.confirmPassword.$errors.values.length
      ) {
        const result = await resetPassword()
        console.log(result)

        // 從 API 呼叫結果判斷是否到下一步
        step.value += 1
      }
      break
  }
}

onBeforeMount(() => {
  console.log(route.query)

  // 如果沒有攜帶一次性的 token， 返回首頁
  // if(route.query){
  //     router.push('/')
  // }
})
</script>
