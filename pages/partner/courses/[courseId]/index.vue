<template>
  <div class="flex items-start">
    <div class="w-7/12 pr-10">
      <in-card border :border-radius="4" class="flex flex-col bg-gray-900 p-10 text-white">
        <section class="mb-10 border-b border-solid border-white/50 pb-5">
          <h3 class="text-h3 font-bold">課程圖片</h3>
          <label
            class="transition-2 group relative mt-5 block cursor-pointer overflow-hidden rounded-6 border border-solid border-white/50 pt-6/10 hover:border-white"
          >
            <input
              type="file"
              class="hidden"
              :accept="acceptImageType.join(',')"
              @change="handleThumbnailChange"
            />
            <div
              class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center"
            >
              <div v-if="isLoading"></div>
              <template v-else-if="course.thumbnail">
                <img
                  :src="course.thumbnail"
                  alt=""
                  class="absolute left-0 top-0 h-full w-full object-cover"
                />
                <div
                  class="transition-base absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100"
                >
                  <in-btn ghost size="small" class="pointer-events-none mt-5">重新選擇圖片</in-btn>
                  <in-btn
                    v-if="course.thumbnail"
                    ghost
                    type="error"
                    size="small"
                    class="mt-5 gap-3"
                  >
                    <i class="icon-trash"></i>
                    <p class="text-fs-6">刪除圖片</p>
                  </in-btn>
                </div>
              </template>
              <template v-else>
                <p class="text-fs-6 text-white">課程圖片建議尺寸 1200 * 2000</p>
                <in-btn size="small" ghost class="pointer-events-none mt-5">上傳課程圖片</in-btn>
              </template>
            </div>
          </label>
        </section>
        <section class="mb-10 border-b border-solid border-white/50 pb-5">
          <h3 class="text-h3 font-bold">課程標題</h3>
          <in-input
            v-model="course.title"
            class="mt-5 text-black"
            :error="v$.title.$invalid"
            placeholder="請輸入課程標題"
          />
          <p v-if="v$.title.required.$invalid" class="mt-2 text-red-500">課程標題為必填</p>
        </section>
        <section class="mb-10">
          <h3 class="text-h3 font-bold">課程說明</h3>
          <div class="mt-5">
            <in-editor v-model="course.description" />
            <p v-if="v$.description.required.$invalid" class="mt-2 text-red-500">課程說明為必填</p>
          </div>
        </section>
      </in-card>
    </div>
    <div class="sticky top-15 w-5/12">
      <in-card border :border-radius="4" class="p-10">
        <section class="mb-10 border-b border-solid border-white/50 pb-5">
          <h3 class="text-h3 font-bold">課程售價</h3>
          <div class="mt-5 flex flex-wrap items-center gap-5">
            <in-btn size="small" :ghost="course.price !== 0" @click="course.price = 0">免費</in-btn>
            <in-btn size="small" :ghost="course.price === 0" @click="course.price = 1">
              一次性付費
            </in-btn>
          </div>
          <in-input
            v-if="course.price !== 0"
            v-model="course.price"
            class="mt-5 text-black"
            placeholder="請輸入課程價格"
            :error="v$.price.$invalid"
          />
          <div class="mt-2">
            <p v-if="v$.price.numeric.$invalid" class="text-red-500">課程售價必須為數字</p>
            <p v-if="v$.price.required.$invalid" class="text-red-500">課程售價為必填</p>
          </div>
        </section>
        <section>
          <h3 class="mb-2 text-h3 font-bold">發佈與儲存</h3>
          <div class="my-4 flex flex-wrap gap-3">
            <in-select :value="course.isPublic" :options="options" @select="handlePublish" />
            <in-btn size="small" @click="saveCourse">儲存</in-btn>
          </div>
        </section>
      </in-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'
import useConfirm from '~/stores/useConfirm'
import useEditCourse from '~/stores/useEditCourse'
import { Option } from '@/components/in-dropdown.vue'
import useNotification from '~/stores/useNotification'

const app = useNuxtApp()
const route = useRoute()
const { currentCourse: course, isLoading } = storeToRefs(useEditCourse())
const { confirm } = useConfirm()
const { notification } = useNotification()
const acceptImageType = ref(['image/png', 'image/jpeg', 'image/wepb'])

const rules = {
  title: {
    required,
    $lazy: true,
    $autoDirty: true
  },
  description: {
    required,
    $lazy: true,
    $autoDirty: true
  },
  price: {
    required,
    numeric,
    $lazy: true,
    $autoDirty: true
  }
}

const options: Option[] = [
  {
    label: '發布',
    value: true
  },
  {
    label: '未發布',
    value: false
  }
]

const v$ = useVuelidate(rules, course)

async function handleThumbnailChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target?.files?.[0]
  if (!file) return
  if (!acceptImageType.value.includes(file.type)) {
    notification.error('不支援的圖片格式')
    return
  }

  isLoading.value = true
  try {
    const { course: response } = await app.$api.course.updateThumbnail(
      route.params.courseId as string,
      file
    )
    Object.assign(course.value, response)
    notification.success('更新成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}

watch(
  course,
  () => {
    console.log('@@')
  },
  { deep: true }
)

async function saveCourse() {
  const isValid = await v$.value.$validate()
  if (!isValid) return
  try {
    isLoading.value = true
    const { course: response } = await app.$api.course.updateCourse({
      courseId: route.params.courseId as string,
      title: course.value.title,
      description: course.value.description,
      isPublic: course.value.isPublic,
      price: course.value.price
    })
    Object.assign(course.value, response)
    notification.success('更新成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}

async function handlePublish(value: boolean) {
  const isConfirm = await confirm(
    value ? '確定發布?' : '取消發布?',
    value
      ? `發布後將會對所有學生公開，目前課程售價為 ${course.value.price || '免費'}`
      : '取消發布後所有學生皆無法看見課程'
  )
  if (isConfirm) {
    const prevPublic = course.value.isPublic
    try {
      course.value.isPublic = value
      await saveCourse()
    } catch (e) {
      course.value.isPublic = prevPublic
    }
  }
}
</script>

<style lang="scss"></style>
