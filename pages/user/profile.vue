<template>
  <section class="user-profile py-10">
    <in-container>
      <div
        class="mx-auto rounded-6 border border-solid border-gray-500 bg-gray-900 px-8 py-12 md:w-8/12"
      >
        <div class="grid gap-8 md:w-1/2">
          <label class="relative flex h-20 w-20 cursor-pointer items-center justify-center">
            <in-spin v-if="avatar.isLoading" :size="40" color="#fff" />
            <div
              v-else
              class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gray-500"
            >
              <input
                ref="fileInput"
                type="file"
                accept="image/jpeg, image/png"
                class="hidden"
                @change="handleFileChange"
              />
              <img v-if="avatar.data" :src="avatar.data" alt="" />
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
              >
                <defs></defs>
                <path
                  d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24zM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8zM8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div
              class="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-white text-black"
            >
              <svg
                class="w-4"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 16 16"
              >
                <g fill="none">
                  <path
                    d="M3.75 2a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5zm4.78 2.72a.75.75 0 0 0-1.06 0L4.22 7.97a.75.75 0 0 0 1.06 1.06l1.97-1.97v6.19a.75.75 0 0 0 1.5 0V7.06l1.97 1.97a.75.75 0 1 0 1.06-1.06L8.53 4.72z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
          </label>
          <div>
            <in-profile-field
              placeholder="使用者名稱"
              :value="username.data"
              :loading="username.isLoading"
              :disabled="username.isLoading"
              :edit="username.isEditing"
              :error="username.hasError"
              @edit="username.isEditing = true"
              @cancel="handleFieldCancel(username)"
              @update="handleFieldSubmit(username, $event)"
            />
            <p v-if="username.hasError" class="mt-3 text-base text-red-600">使用者名稱為必填</p>
          </div>
          <in-profile-field
            placeholder="專長"
            :value="expertise.data"
            :loading="expertise.isLoading"
            :disabled="expertise.isLoading"
            :edit="expertise.isEditing"
            @edit="expertise.isEditing = true"
            @cancel="handleFieldCancel(expertise)"
            @update="handleFieldSubmit(expertise, $event)"
          />
          <in-profile-field
            placeholder="興趣"
            :value="interests.data"
            :loading="interests.isLoading"
            :disabled="interests.isLoading"
            :edit="interests.isEditing"
            @edit="interests.isEditing = true"
            @cancel="handleFieldCancel(interests)"
            @update="handleFieldSubmit(interests, $event)"
          />
          <div>
            <div
              class="relative flex h-8 w-full items-center border-b border-solid border-white py-1 pb-3 text-white"
            >
              <p class="flex-1">網頁連結</p>
              <div
                v-if="!links.isEditing"
                class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-white hover:text-black"
                @click="links.isEditing = true"
              >
                <i class="icon-pencil"></i>
              </div>
              <in-spin v-if="links.isLoading" :size="16" />
            </div>
            <div class="mt-5">
              <div v-if="links.isEditing">
                <table
                  class="w-full text-base text-white"
                  :class="{ 'pointer-events-none opacity-50': links.isLoading }"
                >
                  <tbody>
                    <tr>
                      <td class="p-2 font-medium">Facebook</td>
                      <td class="p-2">
                        <input
                          v-model="linksInput.facebookLink"
                          type="text"
                          class="h-8 w-full rounded-1 px-3 text-black"
                          :class="{ 'pointer-events-none opacity-50': links.isLoading }"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="p-2 font-medium">Youtube</td>
                      <td class="p-2">
                        <input
                          v-model="linksInput.youtubeLink"
                          type="text"
                          class="h-8 w-full rounded-1 px-3 text-black"
                          :class="{ 'pointer-events-none opacity-50': links.isLoading }"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="p-2 font-medium">個人網頁</td>
                      <td class="p-2">
                        <input
                          v-model="linksInput.socialLink"
                          type="text"
                          class="h-8 w-full rounded-1 px-3 text-black"
                          :class="{ 'pointer-events-none opacity-50': links.isLoading }"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="p-2 font-medium">Github</td>
                      <td class="p-2">
                        <input
                          v-model="linksInput.githubLink"
                          type="text"
                          class="h-8 w-full rounded-1 px-3 text-black"
                          :class="{ 'pointer-events-none opacity-50': links.isLoading }"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="mt-3 flex items-center gap-5">
                  <button
                    class="rounded-1 bg-white px-3 font-bold hover:bg-white/80"
                    @click="links.isEditing = false"
                  >
                    取消
                  </button>
                  <button
                    class="rounded-1 bg-white px-3 font-bold hover:bg-white/80"
                    @click="handleLinksSubmit"
                  >
                    儲存
                  </button>
                </div>
              </div>
              <div v-else class="grid gap-3 text-white">
                <div v-if="links.facebookLink" class="flex items-center">
                  <div class="w-5 flex-shrink-0">
                    <img src="/images/facebook.svg" alt="" />
                  </div>
                  <div class="flex-1 pl-3">
                    <a
                      :href="links.facebookLink"
                      target="_blank"
                      :title="links.facebookLink"
                      class="user-profile__link"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
                <div v-if="links.youtubeLink" class="flex items-center">
                  <div class="w-5 flex-shrink-0">
                    <img src="/images/youtube.svg" alt="" />
                  </div>
                  <div class="flex-1 pl-3">
                    <a
                      :href="links.youtubeLink"
                      target="_blank"
                      :title="links.youtubeLink"
                      class="user-profile__link"
                      >Youtube</a
                    >
                  </div>
                </div>
                <div v-if="links.socialLink" class="flex items-center">
                  <div class="w-5 flex-shrink-0">
                    <img src="/images/home.svg" alt="" />
                  </div>
                  <div class="flex-1 pl-3">
                    <a
                      :href="links.socialLink"
                      target="_blank"
                      :title="links.socialLink"
                      class="user-profile__link"
                      >個人網站</a
                    >
                  </div>
                </div>
                <div v-if="links.githubLink" class="flex items-center">
                  <div class="w-5 flex-shrink-0">
                    <img src="/images/github.svg" alt="" />
                  </div>
                  <div class="flex-1 pl-3">
                    <a
                      :href="links.githubLink"
                      target="_blank"
                      :title="links.githubLink"
                      class="user-profile__link"
                      >Github
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8">
          <div
            class="relative mb-3 flex h-8 w-full items-center border-b border-solid border-white py-1 pb-3 text-white"
          >
            <p class="flex-1 font-bold">關於我</p>
            <div
              v-if="!about.isEditing"
              class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-white hover:text-black"
              @click="about.isEditing = true"
            >
              <i class="icon-pencil"></i>
            </div>
            <in-spin v-if="about.isLoading" :size="24" />
          </div>
          <div v-if="about.isEditing">
            <textarea
              v-model="aboutInput"
              cols="30"
              rows="10"
              class="w-full rounded-1 p-3 text-black"
              :class="{ 'pointer-events-none opacity-50': about.isLoading }"
            ></textarea>
            <div class="mt-3 flex items-center gap-5">
              <button
                class="rounded-1 bg-white px-3 font-bold hover:bg-white/80"
                @click="handleFieldCancel(about)"
              >
                取消
              </button>
              <button
                class="rounded-1 bg-white px-3 font-bold hover:bg-white/80"
                @click="handleFieldSubmit(about, aboutInput)"
              >
                儲存
              </button>
            </div>
          </div>
          <p v-else class="whitespace-pre-line text-base leading-normal text-white">
            {{ about.data }}
          </p>
        </div>
      </div>
    </in-container>
  </section>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import fieldWrapper from '~/utils/fieldWrapper'
import useUSer from '~/stores/useUser'
import useNotification from '~~/stores/useNotification'

definePageMeta({
  auth: true
})

const app = useNuxtApp()

await app.$api.user.fetchProfile()

const { notification } = useNotification()

const { userProfile } = storeToRefs(useUSer())

const avatar = reactive(fieldWrapper<string>(userProfile.value.avatar, 'avatar'))
const username = reactive(fieldWrapper<string>(userProfile.value.username, 'username', true))
const interests = reactive(fieldWrapper<string>(userProfile.value.interests, 'interests'))
const expertise = reactive(fieldWrapper<string>(userProfile.value.expertise, 'expertise'))

const aboutInput = ref('')
const about = reactive(fieldWrapper<string>(userProfile.value.about, 'about'))

watch(
  () => about.isEditing,
  (editing) => {
    if (editing) {
      aboutInput.value = about.data
    }
  }
)

const links = reactive({
  isLoading: false,
  isEditing: false,
  facebookLink: userProfile.value.facebookLink,
  youtubeLink: userProfile.value.youtubeLink,
  socialLink: userProfile.value.socialLink,
  githubLink: userProfile.value.githubLink
})

const linksInput = reactive({
  facebookLink: '',
  youtubeLink: '',
  socialLink: '',
  githubLink: ''
})

watch(
  () => links.isEditing,
  (editing) => {
    if (editing) {
      linksInput.facebookLink = links.facebookLink
      linksInput.youtubeLink = links.youtubeLink
      linksInput.socialLink = links.socialLink
      linksInput.githubLink = links.githubLink
    }
  }
)

watch(userProfile, (profile) => {
  username.data = profile.username
  interests.data = profile.interests
  expertise.data = profile.expertise
  about.data = profile.about
  avatar.data = profile.avatar
  links.facebookLink = profile.facebookLink
  links.youtubeLink = profile.youtubeLink
  links.socialLink = profile.socialLink
  links.githubLink = profile.githubLink
})

type Field<T> = ReturnType<typeof fieldWrapper<T>>

function handleFieldCancel(field: Field<string>) {
  field.isEditing = false
  field.hasError = false
}

async function handleFieldSubmit(field: Field<string>, data: string) {
  if (field.required && !data) {
    field.hasError = true
    return
  } else {
    field.hasError = false
  }

  field.isLoading = true

  try {
    await app.$api.user.update({
      [field.key]: data
    })
    notification.success('更新成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    field.isLoading = false
    field.isEditing = false
  }
}

async function handleLinksSubmit() {
  links.isLoading = true

  try {
    await app.$api.user.update(linksInput)
    notification.success('更新成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    links.isLoading = false
    links.isEditing = false
  }
}

const handleFileChange = async (e: Event) => {
  avatar.isLoading = true
  const inputElement = e.target as HTMLInputElement
  const files = inputElement.files![0]
  const formData = new FormData()
  formData.append('image', files)
  try {
    await app.$api.user.updateAvatar(formData)
    notification.success('更新成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    avatar.isLoading = false
  }
}
</script>
<style lang="scss" scoped>
.user-profile {
  &__link {
    position: relative;
    padding-bottom: 2px;
    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      width: 100%;
      background-color: #fff;
      transform: scaleX(0);
      transform-origin: left;
      transition: 0.2s;
    }
    &:hover::after {
      transform: scaleX(1);
    }
  }
}
</style>
