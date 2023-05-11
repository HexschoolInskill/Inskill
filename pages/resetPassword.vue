<template>
  <h1 class="my-4 text-3xl font-bold text-white">
    {{ step === 1 ? '重設密碼' : '密碼設定成功' }}
  </h1>
  <p v-if="step === 2" class="text-2xl text-white">您的密碼已經更新， 請重新登入</p>

  <div v-if="step === 1" class="flex flex-col">
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
      @keypress.enter="resetPassword"
    />

    <div v-for="error of v$.confirmPassword.$errors" :key="error.$uid" class="mb-4 text-red-500">
    {{ error.$message }}
    </div>

    <button
      type="button"
      class="mt-2 w-20 rounded border bg-black text-white"
      @click="resetPassword"
    >
      繼續
    </button>
  </div>

  <div v-else class="my-4 flex flex-col">
    <NuxtLink to="login">
      <button type="button" class="w-20 rounded border bg-black text-white">繼續</button>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onBeforeMount } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs, helpers } from '@vuelidate/validators'
import useNotification from '~~/stores/useNotification'
import tokenController from '~~/composables/token'

definePageMeta({
  layout: 'login-form'
})

const { notification } = useNotification()

const router = useRouter()
const route = useRoute()

const formFields = reactive({
  password: '',
  confirmPassword: ''
})

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
const { $api } = useNuxtApp()

const resetPassword = async () => {
  try {
    const result: any = await $api.user.resetPassword({
      password: formFields.password,
      confirmPassword: formFields.confirmPassword
    })

    console.log('resetPassword :>>>', result)

    if (result.success) {
      step.value = 2
      notification.success(result.message)

      // 清除一次性的 token
      tokenController.deleteToken()
    } else {
      notification.error(result.message)
    }
  } catch (err: any) {
    notification.error(err.message)
  }
}

onBeforeMount(() => {
  console.log(route.query)

  // 如果沒有攜帶一次性的 token， 返回首頁
  if (!route.query.token) {
    router.push('/')
  } else {
    const temporaryToken = String(route.query.token)
    tokenController.setToken(temporaryToken)
  }
})
</script>
