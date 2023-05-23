<template>
  <section class="join-form py-24">
    <in-container>
      <div class="mx-auto w-full sm:w-8/12">
        <h2
          class="mb-10 border-b border-solid border-gray pb-10 text-center text-3xl font-black text-white"
        >
          夥伴申請表
        </h2>
        <in-card :xs-white="false" class="p-8">
          <form class="join-form">
            <div class="flex flex-col gap-5 sm:flex-row lg:gap-10">
              <div class="flex justify-center sm:block">
                <div class="h-15 w-15 overflow-hidden rounded-full lg:h-32 lg:w-32">
                  <img
                    v-if="params.avatar"
                    class="h-full w-full object-cover"
                    :src="params.avatar"
                    alt=""
                  />
                  <img
                    v-else
                    class="h-full w-full object-cover"
                    src="/images/avatar-fallback.svg"
                    alt=""
                  />
                </div>
              </div>
              <div class="flex-1">
                <in-input
                  v-model="params.realName"
                  label="姓名*"
                  placeholder="請輸入您的真實姓名"
                  :error="v$.realName.required.$invalid"
                />
                <p
                  class="join-form__notice"
                  :class="{ 'join-form__notice--active': v$.realName.required.$invalid }"
                >
                  必填
                </p>
                <in-input
                  v-model="params.username"
                  disabled
                  class="mt-2"
                  label="要在 Inskill 顯示的名稱*"
                  placeholder="請輸入您要在 Inskill 顯示的名稱"
                />
                <p
                  class="join-form__notice"
                  :class="{ 'join-form__notice--active': v$.username.required.$invalid }"
                >
                  必填
                </p>
              </div>
            </div>
            <in-input
              v-model="params.phone"
              label="連絡電話*"
              placeholder="0912345678"
              :error="v$.phone.required.$invalid"
            />
            <p
              v-if="v$.phone.numeric.$invalid"
              class="join-form__notice"
              :class="{ 'join-form__notice--active': v$.phone.numeric.$invalid }"
            >
              連絡電話必須為數字
            </p>
            <p
              v-else
              class="join-form__notice"
              :class="{ 'join-form__notice--active': v$.phone.required.$invalid }"
            >
              必填
            </p>
            <in-input
              v-model="params.email"
              class="mt-2"
              label="Email(此為您註冊時的Email)"
              disabled
            />
            <div class="mt-5 flex flex-wrap gap-y-2 gap-x-6">
              <div>
                <p class="text-white">性別</p>
                <div class="mt-3 flex gap-3">
                  <label class="block">
                    <input
                      v-model="params.gender"
                      type="radio"
                      class="hidden"
                      name="gender"
                      value="male"
                    />
                    <div
                      class="transition-base cursor-pointer select-none whitespace-nowrap rounded-1 border border-solid border-white px-3 py-2 text-center text-white"
                      :class="{ 'bg-white !text-black': params.gender === 'male' }"
                    >
                      男性
                    </div>
                  </label>
                  <label class="block">
                    <input
                      v-model="params.gender"
                      type="radio"
                      class="hidden"
                      name="gender"
                      value="female"
                    />
                    <div
                      class="transition-base cursor-pointer select-none whitespace-nowrap rounded-1 border border-solid border-white px-3 py-2 text-center text-white"
                      :class="{ 'bg-white !text-black': params.gender === 'female' }"
                    >
                      女性
                    </div>
                  </label>
                  <label class="block">
                    <input
                      v-model="params.gender"
                      type="radio"
                      class="hidden"
                      name="gender"
                      value="other"
                    />
                    <div
                      class="transition-base cursor-pointer select-none whitespace-nowrap rounded-1 border border-solid border-white px-3 py-2 text-center text-white"
                      :class="{ 'bg-white !text-black': params.gender === 'other' }"
                    >
                      多元
                    </div>
                  </label>
                </div>
                <p
                  class="join-form__notice"
                  :class="{ 'join-form__notice--active': v$.gender.required.$invalid }"
                >
                  必填
                </p>
              </div>
              <div>
                <p class="text-white">單位</p>
                <div class="mt-3 flex gap-3">
                  <label class="block">
                    <input
                      v-model="params.unit"
                      type="radio"
                      class="hidden"
                      name="unit"
                      value="personal"
                    />
                    <div
                      class="transition-base cursor-pointer select-none whitespace-nowrap rounded-1 border border-solid border-white px-3 py-2 text-center text-white"
                      :class="{ 'bg-white !text-black': params.unit === 'personal' }"
                    >
                      個人
                    </div>
                  </label>
                  <label class="block">
                    <input
                      v-model="params.unit"
                      type="radio"
                      class="hidden"
                      name="unit"
                      value="company"
                    />
                    <div
                      class="transition-base cursor-pointer select-none whitespace-nowrap rounded-1 border border-solid border-white px-3 py-2 text-center text-white"
                      :class="{ 'bg-white !text-black': params.unit === 'company' }"
                    >
                      企業
                    </div>
                  </label>
                </div>
                <p
                  class="join-form__notice"
                  :class="{ 'join-form__notice--active': v$.unit.required.$invalid }"
                >
                  必填
                </p>
              </div>
            </div>
            <div class="mt-2 flex flex-wrap">
              <div class="w-full sm:w-1/4">
                <in-input
                  v-model="params.postNumber"
                  label="3 碼郵遞區號*"
                  placeholder="請輸入您的郵遞區號"
                  :error="v$.postNumber.required.$invalid"
                />
                <p
                  v-if="
                    v$.postNumber.minLength.$invalid ||
                    v$.postNumber.maxLength.$invalid ||
                    v$.postNumber.numeric.$invalid
                  "
                  class="join-form__notice"
                  :class="{
                    'join-form__notice--active':
                      v$.postNumber.minLength.$invalid ||
                      v$.postNumber.maxLength.$invalid ||
                      v$.postNumber.numeric.$invalid
                  }"
                >
                  郵遞區號為3碼，且必須為數字
                </p>
                <p
                  v-else
                  class="join-form__notice"
                  :class="{ 'join-form__notice--active': v$.postNumber.required.$invalid }"
                >
                  必填
                </p>
              </div>
              <div class="w-full sm:w-3/4 sm:pl-5">
                <in-input
                  v-model="params.address"
                  label="地址*"
                  placeholder="請輸入您的地址"
                  :error="v$.address.required.$invalid"
                />
                <p
                  class="join-form__notice"
                  :class="{ 'join-form__notice--active': v$.address.required.$invalid }"
                >
                  必填
                </p>
              </div>
            </div>
            <div class="mt-2 grid grid-cols-2 gap-6 gap-y-5">
              <in-input
                v-model="params.facebookLink"
                label="Facebook粉絲頁"
                placeholder="請輸入您的Facebook粉絲頁"
              />
              <in-input
                v-model="params.youtubeLink"
                label="Youtube頻道"
                placeholder="請輸入您的 Youtube 頻道"
              />
              <in-input
                v-model="params.socialLink"
                label="個人網站/部落格"
                placeholder="請輸入您的個人網站/部落格"
              />
              <in-input
                v-model="params.githubLink"
                label="Github"
                placeholder="請輸入您的Github倉庫"
              />
            </div>
            <in-input
              v-model="params.selfMedia"
              class="mt-5"
              label="其他個人自媒體"
              placeholder="請簡單描述您經營的個人自媒體"
            />
            <in-input
              v-model="params.description"
              class="mt-2"
              label="請用一句話形容您自己"
              placeholder="請簡單描述(背景/職稱)"
              :error="v$.description.required.$invalid"
            />
            <p
              class="join-form__notice"
              :class="{ 'join-form__notice--active': v$.description.required.$invalid }"
            >
              必填
            </p>
            <in-input
              v-model="params.longDescription"
              class="mt-2"
              type="textarea"
              label="自我介紹"
              placeholder="請告訴我們關於您的學經歷"
              :error="v$.longDescription.required.$invalid"
            />
            <p
              class="join-form__notice"
              :class="{ 'join-form__notice--active': v$.longDescription.required.$invalid }"
            >
              必填
            </p>
            <div class="mt-5 text-center">
              <in-btn @click.prevent="handleSubmit">送出申請</in-btn>
            </div>
          </form>
        </in-card>
      </div>
    </in-container>
  </section>
</template>
<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, numeric, maxLength, minLength } from '@vuelidate/validators'
import useUser from '~/stores/useUser'
import useNotification from '~/stores/useNotification'

const app = useNuxtApp()
const userStore = useUser()
const { notification } = useNotification()

const emit = defineEmits(['submit'])

const params = reactive({
  avatar: userStore.userProfile.avatar,
  email: userStore.userProfile.email,
  realName: '',
  username: userStore.userProfile.username,
  gender: '',
  unit: '',
  phone: '',
  postNumber: '',
  address: '',
  facebookLink: '',
  youtubeLink: '',
  socialLink: '',
  githubLink: '',
  selfMedia: '',
  description: '',
  longDescription: ''
})

const rules = {
  realName: {
    required,
    $autoDirty: true,
    $lazy: true
  },
  username: {
    required,
    $autoDirty: true,
    $lazy: true
  },
  gender: {
    required,
    $autoDirty: true,
    $lazy: true
  },
  unit: {
    required,
    $autoDirty: true,
    $lazy: true
  },
  phone: {
    required,
    numeric,
    $autoDirty: true,
    $lazy: true
  },
  postNumber: {
    required,
    numeric,
    minLength: minLength(3),
    maxLength: maxLength(3),
    $autoDirty: true,
    $lazy: true
  },
  address: {
    required,
    $autoDirty: true,
    $lazy: true
  },
  description: {
    required,
    $autoDirty: true,
    $lazy: true
  },
  longDescription: {
    required,
    $autoDirty: true,
    $lazy: true
  }
}

const v$ = useVuelidate(rules, params)

async function handleSubmit() {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  try {
    const {
      realName,
      username,
      gender,
      unit,
      phone,
      postNumber,
      address,
      facebookLink,
      youtubeLink,
      socialLink,
      githubLink,
      selfMedia,
      description,
      longDescription
    } = params
    await app.$api.partner.join({
      realName,
      username,
      gender,
      unit,
      phone,
      postNumber,
      address,
      facebookLink,
      youtubeLink,
      socialLink,
      githubLink,
      selfMedia,
      description,
      longDescription
    })
    notification.success('已成功送出申請')
    emit('submit')
  } catch (error) {
    notification.error((error as Error).message)
  }
}
</script>
<style lang="scss" scoped>
.join-form {
  &__notice {
    @apply invisible mt-1 text-sm text-red-500;
    &--active {
      @apply visible;
    }
  }
}
</style>
