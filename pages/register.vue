<template>
  <h1 class="my-4 text-3xl font-bold">申請帳號</h1>

  <form v-if="step === 1" class="flex flex-col">
    <label class="text-white" for="userName">使用者名稱</label>
    <input
      v-model="v$.userName.$model"
      type="text"
      class="rounded border p-1"
      :class="{ 'mb-4': !v$.userName.$errors.length }"
      name="userName"
    />
    <div v-for="error of v$.userName.$errors" :key="error.$uid" class="mb-4 text-red-500">
      {{ error.$message }}
    </div>

    <label class="text-white" for="userEmail">信箱</label>
    <input
      v-model="v$.userEmail.$model"
      type="text"
      class="rounded border p-1"
      :class="{ 'mb-4': !v$.userEmail.$errors.length }"
      name="userName"
    />
    <div v-for="error of v$.userEmail.$errors" :key="error.$uid" class="mb-4 text-red-500">
      {{ error.$message }}
    </div>

    <label class="text-white" for="password">密碼</label>
    <input
      v-model="v$.password.$model"
      type="password"
      class="rounded border p-1"
      :class="{ 'mb-4': !v$.password.$errors.length }"
      name="password"
    />

    <div v-for="error of v$.password.$errors" :key="error.$uid" class="mb-4 text-red-500">
    {{ error.$message }}
    </div>

    <label class="text-white" for="confirmPassword">確認密碼</label>
    <input
      v-model="v$.confirmPassword.$model"
      type="password"
      class="rounded border p-1"
      :class="{ 'mb-4': !v$.confirmPassword.$errors.length }"
      name="confirmPassword"
      @keypress.enter="register()"
    />

    <div v-for="error of v$.confirmPassword.$errors" :key="error.$uid" class="mb-4 text-red-500">
    {{ error.$message }}
    </div>

    <label for="agree" class="text-[#6C757D]" :class="{ 'mb-4': !v$.agree.$errors.length }" >
      <input 
        v-model="v$.agree.$model" 
        type="checkbox" 
        name="agree"
      />
      同意
      <span class="cursor-pointer text-sky-400 underline" @click="modalController('user')"
        >使用者條款</span
      >
      和
      <span class="cursor-pointer text-sky-400 underline" @click="modalController('private')"
        >隱私權政策</span
      >

      <div v-for="error of v$.agree.$errors" :key="error.$uid" class="mb-4 text-red-500">
      {{ error.$message }}
      </div>      
    </label>

    <button type="button" class="w-20 rounded border bg-black text-white" @click="register">
      建立帳號
    </button>

    <small class="mt-4 mb-2 text-[#6C757D]">
      已有帳號?
      <NuxtLink to="login" class="text-sky-400 underline">登入</NuxtLink>
    </small>
  </form>

  <div v-else>
    <p class="text-white">恭喜成功註冊 InSkill</p>
    <p class="mt-2 mb-4 text-sm text-[#6C757D]">任何技能，任何課程，任你探索!</p>
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
import useNotification from '~~/stores/useNotification'
import tokenController from '~~/composables/token'

definePageMeta({
  layout: 'login-form'
})

const { notification } = useNotification()

const formFields = reactive({
  userName: '',
  userEmail: '',
  password: '',
  confirmPassword: '',
  agree: false
})

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
  },
  agree: {
    sameAs: helpers.withMessage('請同意條款', sameAs(true))
  }
}

const v$ = useVuelidate(rules, formFields)
const { $api } = useNuxtApp()
const { userProfile } = storeToRefs(useUSer())
const step = ref(1)

const register = async () => {
  if(formFields.agree){
    try {
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

        tokenController.setToken(registration.accessToken)
      } else {
        notification.error(registration.message)
      }   
    } catch (err:any) {
      notification.error(err.message)
    }    
  } else {
    notification.error('請同意使用者條款與政策')
  }
}

const { modalController } = usePolicyStore()
</script>
