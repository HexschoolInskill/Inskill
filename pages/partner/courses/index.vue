<template>
  <in-card border :border-radius="4" class="flex flex-col bg-gray-900 p-10 text-white">
    <div class="max-w-lg">
      <section class="mb-10">
        <div class="flex items-center">
          <h2 class="text-h2 font-bold">課程資訊</h2>
          <div class="text-fs-6 ml-4 flex items-center rounded border border-solid px-7 py-2">
            未發布
          </div>
        </div>
      </section>
      <section class="mb-10 border-b border-solid border-white/50">
        <h3 class="mb-2 text-h3 font-bold">發佈與儲存</h3>
        <div class="my-4 flex gap-3">
          <in-btn size="small" @click="publishCourse">發布課程</in-btn>
          <in-btn size="small" @click="saveCourse">儲存</in-btn>
        </div>
      </section>
      <section class="mb-10 border-b border-solid border-white/50 pb-5">
        <h3 class="text-h3 font-bold">課程圖片</h3>
        <label
          class="transition-2 relative mt-5 block cursor-pointer overflow-hidden rounded-6 border border-solid border-white/50 pt-6/10 hover:border-white"
        >
          <input type="file" class="hidden" @change="handleThumbnailChange" />
          <div
            class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center"
          >
            <template v-if="thumbnailPreview">
              <img
                :src="thumbnailPreview"
                alt=""
                class="absolute left-0 top-0 h-full w-full object-cover"
              />
            </template>
            <template v-else>
              <p class="text-fs-6 text-white">課程圖片建議尺寸 1200 * 2000</p>
              <in-btn size="small" ghost class="pointer-events-none mt-5">上傳課程圖片</in-btn>
            </template>
          </div>
        </label>
        <in-btn
          v-if="thumbnailPreview"
          ghost
          type="error"
          size="small"
          class="mt-5 gap-3"
          @click="course.thumbnail = ''"
        >
          <i class="icon-trash"></i>
          <p class="text-fs-6">刪除圖片</p>
        </in-btn>
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
      <section class="mb-10 border-b border-solid border-white/50 pb-5">
        <h3 class="text-h3 font-bold">課程說明</h3>
      </section>
      <section>
        <h3 class="text-h3 font-bold">課程售價</h3>
        <div class="mt-5 flex items-center gap-5">
          <in-btn size="small" :ghost="course.price !== 0" @click="course.price = 0">免費</in-btn>
          <in-btn size="small" :ghost="course.price === 0" @click="course.price = 1"
            >一次性付費</in-btn
          >
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
    </div>
  </in-card>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import useConfirm from '~/stores/useConfirm'

interface ICourse {
  title: string
  price: number
  description: string
  thumbnail: string | File
}

definePageMeta({
  layout: 'create-courses'
})

const { confirm } = useConfirm()

const course = reactive<ICourse>({
  title: '',
  price: 0,
  description: '',
  thumbnail: ''
})

const thumbnailPreview = computed(() => {
  if (course.thumbnail instanceof File) {
    return URL.createObjectURL(course.thumbnail)
  } else {
    return course.thumbnail
  }
})

const rules = {
  title: {
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

const v$ = useVuelidate(rules, course)

function handleThumbnailChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target?.files?.[0]
  if (!file) return
  course.thumbnail = file
}

async function saveCourse() {
  await v$.value.$validate()
}

async function publishCourse() {
  const isConfirm = await confirm(
    '確定發布?',
    `發布後將會對所有學生公開，目前課程售價為 ${course.price || '免費'}`
  )
  if (isConfirm) console.log('course published')
}
</script>

<style lang="scss"></style>
