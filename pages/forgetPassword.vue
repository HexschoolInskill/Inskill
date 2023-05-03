<template>
  <h1 class="my-4 text-3xl font-bold">忘記密碼</h1>

  <form>
    <div v-if="step === 1" class="flex flex-col">
      <InFormField
        v-model:field="v$.userEmail"
        :custom-error="!v$.userEmail.$model.length ? formFieldErrorMessage : ''"
        name="信箱"
      ></InFormField>

      <button
        type="button"
        class="w-20 rounded border bg-black text-white"
        @click="
          ;async () => {
            await nextStep()
          }
        "
      >
        繼續
      </button>
    </div>

    <div v-if="step === 2" class="flex flex-col">
      <p>請至信箱查收重設密碼的連結</p>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, helpers } from '@vuelidate/validators'

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

// 往下一步移動
const nextStep = async () => {
  if (formFields.userEmail.length && !v$.value.userEmail.$errors.values.length) {
    const emailExist = await $fetch('/api/user/isEmailRegister', {
      method: 'POST',
      body: { email: formFields.userEmail }
    })

    if (emailExist) {
      sendVerificationEmail()
      step.value += 1
      formFieldErrorMessage.value = ''
    } else {
      formFieldErrorMessage.value = '查無信箱'
    }
  } else {
    formFieldErrorMessage.value = '請填入信箱'
  }
}

const sendVerificationEmail = async () => {
  // 發送重設密碼的信件
  //   console.log('hi')
}
</script>
