<template>
  <h1 class="my-4 text-3xl font-bold">申請帳號</h1>

  <form v-if="step === 1" class="flex flex-col">
    <InFormField
      v-model:field="v$.userName"
      :custom-error="formFieldErrorMessage"
      name="使用者名稱"
    ></InFormField>

    <InFormField
      v-model:field="v$.userEmail"
      :custom-error="formFieldErrorMessage"
      name="信箱"
    ></InFormField>

    <InFormField
      v-model:field="v$.password"
      :custom-error="formFieldErrorMessage"
      name="密碼"
    ></InFormField>

    <InFormField
      v-model:field="v$.confirmPassword"
      :custom-error="formFieldErrorMessage"
      name="確認密碼"
    ></InFormField>

    <label for="agree" class="mb-4">
      <input v-model="formFields.agree" type="checkbox" name="agree" />
      同意
      <span class="cursor-pointer text-sky-400 underline" @click="modalController('user')"
        >使用者條款</span
      >
      和
      <span class="cursor-pointer text-sky-400 underline" @click="modalController('private')"
        >隱私權政策</span
      >
    </label>

    <button type="button" class="w-20 rounded border bg-black text-white" @click="register">
      建立帳號
    </button>

    <small class="mt-4 mb-2">
      已有帳號?
      <NuxtLink to="login" class="text-sky-400 underline">登入</NuxtLink>
    </small>
  </form>

  <div v-else>
    <p>恭喜成功註冊 InSkill</p>
    <p class="mt-2 mb-4 text-sm">任何技能，任何課程，任你探索!</p>
    <NuxtLink to="/">
      <button type="button" class="w-20 rounded bg-black text-white">繼續</button>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, helpers } from '@vuelidate/validators'

import { usePolicyStore } from '@/stores/policyStore'

definePageMeta({
  layout: 'login-form'
})

const formFields = reactive({
  userName: '',
  userEmail: '',
  password: '',
  confirmPassword: '',
  agree: false
})

const formFieldErrorMessage = ref('')

const rules = {
  userName: {
    required: helpers.withMessage('請輸入名稱', required)
  },
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

const register = () => {
  if (
    formFields.userName.length &&
    formFields.userEmail.length &&
    formFields.password.length &&
    formFields.confirmPassword.length &&
    !v$.value.userName.$errors.values.length &&
    !v$.value.userEmail.$errors.values.length &&
    !v$.value.password.$errors.values.length &&
    !v$.value.confirmPassword.$errors.values.length &&
    formFields.agree === true
  ) {
    // 檢查信箱是否使用過
    // const emailExist = await $fetch('/api/user/isEmailRegister', { method: 'POST', body: { email: formFields.userEmail } })
    // console.log(emailExist)

    // 組合表單資料
    // const registerForm = new FormData()
    // registerForm.append('name', formFields.userName)
    // registerForm.append('email', formFields.userEmail)
    // registerForm.append('password', formFields.password)

    // 發送申請帳號表單
    // const registration = await $fetch('/api/user/sign_up', { method: 'POST', body: registerForm })
    // console.log(registration)

    // 往下一步
    // router.push('registrationSuccess')
    // if(registration){
    step.value = 2
    // }
  } else {
    formFieldErrorMessage.value = '請填入資料'
  }
}

const { modalController } = usePolicyStore()
</script>
