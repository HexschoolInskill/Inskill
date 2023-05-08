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
      @form-submit="submitWithEnter"
    ></InFormField>

    <label for="agree" class="mb-4 text-[#6C757D]">
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

    <small class="mb-2 mt-4 text-[#6C757D]">
      已有帳號?
      <NuxtLink to="login" class="text-sky-400 underline">登入</NuxtLink>
    </small>
  </form>

  <div v-else>
    <p class="text-white">恭喜成功註冊 InSkill</p>
    <p class="mb-4 mt-2 text-sm text-[#6C757D]">任何技能，任何課程，任你探索!</p>
    <NuxtLink to="/">
      <button type="button" class="w-20 rounded border bg-black text-white">繼續</button>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, helpers } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'
import useUSer from '~/stores/useUser'
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
const { $api } = useNuxtApp()
const { userProfile } = storeToRefs(useUSer())
const step = ref(1)

const register = async () => {
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
    // 發送申請帳號表單
    const registration: any = await $api.user.registration({
      username: formFields.userName,
      email: formFields.userEmail,
      password: formFields.password,
      confirmPassword: formFields.confirmPassword
    })
    // console.log(registration)

    // 往下一步
    if (registration.success) {
      step.value = 2
      userProfile.value.username = registration.username
      localStorage.setItem('access_token', registration.accessToken)
    }

    if (registration.statusCode === 400) {
      formFieldErrorMessage.value = registration.message
    }

    if (registration.statusCode === 409) {
      formFieldErrorMessage.value = '信箱已經使用'
    }
  } else {
    formFieldErrorMessage.value = '請填入資料'
  }
}

// enter 鍵送出
const submitWithEnter = () => {
  if (
    formFields.userName.length &&
    formFields.userEmail.length &&
    formFields.password.length &&
    formFields.confirmPassword.length
  ) {
    register()
  }
}

const { modalController } = usePolicyStore()
</script>
