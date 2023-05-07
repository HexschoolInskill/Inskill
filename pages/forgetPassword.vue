<template>
  <h1 class="my-4 text-3xl font-bold text-white">忘記密碼</h1>

  <form>
    <div v-if="step === 1" class="flex flex-col">
      <InFormField
        v-model:field="v$.userEmail"
        :custom-error="!v$.userEmail.$model.length ? formFieldErrorMessage : ''"
        name="信箱"
        @form-submit="submitWithEnter"
      ></InFormField>

      <button type="button" class="mt-2 w-20 rounded border bg-black text-white" @click="nextStep">
        繼續
      </button>
    </div>

    <div v-if="step === 2" class="flex flex-col">
      <p class="text-white">以寄送重設密碼的連結，請至信箱查收</p>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

definePageMeta({
  layout: 'login-form'
})

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
  }
}

const v$ = useVuelidate(rules, formFields)

const step = ref(1)
const { $api } = useNuxtApp()
const router = useRouter()

// 往下一步移動
const nextStep = async () => {
  if (formFields.userEmail.length && !v$.value.userEmail.$errors.values.length) {
    const emailExist: any = await $api.user.isEmailRegister({ email: formFields.userEmail })

    if (emailExist.success) {
      // sendVerificationEmail()
      // step.value += 1
      // formFieldErrorMessage.value = ''

      // 尚無寄送信件的 api， 暫時先移動到下一步
      router.push('resetPassword')
    } else {
      formFieldErrorMessage.value = '查無信箱'
    }
  } else {
    formFieldErrorMessage.value = '請填入信箱'
  }
}

// enter 鍵送出
const submitWithEnter = () => {
  if (formFields.userEmail.length) {
    nextStep()
  }
}

// const sendVerificationEmail = async () => {
//   // 發送重設密碼的信件
//   //   console.log('hi')
// }
</script>
