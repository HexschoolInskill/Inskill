<template>
  <h1 class="my-4 text-3xl font-bold text-white">登入</h1>

  <form class="flex flex-col">
    <label class="text-white" for="email">信箱</label>
    <input
      v-model="v$.userEmail.$model"
      type="text"
      class="rounded border p-1"
      :class="{ 'mb-4': !v$.userEmail.$errors.length }"
      name="email"
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
      @keypress.enter="login"
    />

    <div v-for="error of v$.password.$errors" :key="error.$uid" class="mb-4 text-red-500">
      {{ error.$message }}
    </div>

    <button type="button" class="mt-4 w-20 rounded border bg-black text-white" @click="login">
      登入
    </button>

    <small class="mb-2 mt-4 text-sky-400 underline">
      <NuxtLink to="forgetpassword">忘記密碼?</NuxtLink>
    </small>
    <small class="text-gray">
      尚未成為會員?
      <NuxtLink class="text-sky-400 underline" to="register">申請帳號</NuxtLink>
    </small>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import useNotification from '~~/stores/useNotification'

definePageMeta({
  layout: 'login-form'
})

const { notification } = useNotification()

const formFields = reactive({
  userEmail: '',
  password: ''
})

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

const { $api } = useNuxtApp()
const router = useRouter()
const route = useRoute()

const login = async () => {
  try {
    await $api.user.login({
      email: formFields.userEmail,
      password: formFields.password
    })
    await $api.user.fetchProfile()
    if (route.query.redirect) {
      const { redirect, ...query } = route.query
      router.push({
        path: redirect as string,
        query
      })
    } else {
      router.push('/')
    }
  } catch (err: any) {
    formFields.password = ''
    notification.error(err.message)
  }
}
</script>
