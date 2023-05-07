<template>
  <h1 class="my-4 text-3xl font-bold text-white">登入</h1>

  <form class="flex flex-col">
    <InFormField
      v-model:field="v$.userEmail"
      :custom-error="formFieldErrorMessage"
      name="信箱"
    ></InFormField>

    <InFormField
      v-model:field="v$.password"
      :custom-error="formFieldErrorMessage"
      name="密碼"
      @form-submit="submitWithEnter"
    ></InFormField>

    <button type="button" class="mt-4 w-20 rounded border bg-black text-white" @click="login">
      登入
    </button>

    <small class="mt-4 mb-2 text-sky-400 underline">
      <NuxtLink to="forgetpassword">忘記密碼?</NuxtLink>
    </small>
    <small class="text-[#6C757D]">
      尚未成為會員?
      <NuxtLink class="text-sky-400 underline" to="register">申請帳號</NuxtLink>
    </small>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'
import useUSer from '~/stores/useUser'

definePageMeta({
  layout: 'login-form'
})

const formFields = reactive({
  userEmail: '',
  password: ''
})

const formFieldErrorMessage = ref('')

const rules = {
  userEmail: {
    required: helpers.withMessage('請輸入信箱', required),
    email: helpers.withMessage('請填入正確的信箱', email)
  },
  password: {
    required: helpers.withMessage('請輸入密碼', required)
  }
}

const v$ = useVuelidate(rules, formFields)

const { userProfile } = storeToRefs(useUSer())

const { $api } = useNuxtApp()
const router = useRouter()

const login = async () => {
  if (
    formFields.userEmail.length &&
    formFields.password.length &&
    !v$.value.userEmail.$errors.values.length &&
    !v$.value.userEmail.$errors.values.length
  ) {
    try {
      const result: any = await $api.user.login({
        email: formFields.userEmail,
        password: formFields.password
      })

      console.log('login success :>>>', result)

      if (result.success) {
        localStorage.setItem('access_token', result.accessToken)

        // 登入成功，回首頁
        router.push('/')

        userProfile.value.username = result.username
      } else {
        formFieldErrorMessage.value = '信箱或密碼錯誤'
        formFields.password = ''
      }
    } catch (error) {
      console.log('failed to login :>>>', error)
    }
  } else {
    formFieldErrorMessage.value = '請填入資料'
    formFields.password = ''
  }
}

// enter 鍵送出
const submitWithEnter = () => {
  if (formFields.userEmail.length && formFields.password.length) {
    login()
  }
}
</script>
