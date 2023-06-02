<template>
  <div class="flex flex-col bg-gray-900 p-10 text-white">
    <section class="mb-10 flex">
      <h1 class="section-title">課程資訊</h1>
      <span class="item-center ml-4 rounded border border-dotted px-5 pt-1">{{
        currentCourse.isPublic ? '發布' : '未發布'
      }}</span>
      <button
        type="button"
        class="ml-auto rounded border bg-black px-10"
        @click="saveCourseContent"
      >
        儲存
      </button>
    </section>
    <section class="border-bottom mb-10">
      <h1 class="section-title">發佈與預覽</h1>
      <p class="font-light">發布或取消發布您的課程。查看您的課程對訪客或已註冊學生的展示效果。</p>
      <div class="my-4">
        <button type="button" class="mr-2 rounded border bg-black px-5 py-1">發布課程</button>
        <select class="ml-2 rounded border bg-black px-5 py-1">
          <option selected disabled>更多</option>
          <option value="preview_guest">預覽販售頁面</option>
          <option value="preview_student">以學生身分預覽</option>
          <option value="duplicate">複製課程</option>
          <option value="delete">刪除課程</option>
        </select>
      </div>
    </section>
    <section class="border-bottom mb-10">
      <h1 class="section-title">品牌資訊</h1>
      <p class="mb-4 font-light">
        通過設置自定義課程圖片為您的課程添加品牌形象。您可以在 iOS
        應用程序上設置不同的圖片(建議使用不同尺寸的圖片)。
      </p>

      <nav class="mb-4 flex">
        <button
          class="border-bottom p-2"
          :class="[
            brand === 'web'
              ? 'border-emerald-400 shadow-lg shadow-emerald-400/50'
              : 'border-slate-400'
          ]"
          @click="choseBrandType('web')"
        >
          Web
        </button>
        <button
          class="border-bottom p-2"
          :class="[
            brand === 'ios'
              ? 'border-emerald-400 shadow-lg shadow-emerald-400/50'
              : 'border-slate-400'
          ]"
          @click="choseBrandType('ios')"
        >
          IOS
        </button>
      </nav>

      <h2 class="text-xl">課程圖片</h2>

      <div
        v-if="!currentCourse.thumbnail.length"
        class="my-10 w-4/12 cursor-pointer rounded border border-dotted p-5 text-center"
        @click="initHiddenUploader"
      >
        <p class="mb-4 text-xl">上傳您的圖片</p>
        <p>建議尺寸 : 3840 x 2160 or 1920 x 1080 pixels</p>
        <p>(PNG or JPG)</p>

        <button type="button" class="mt-4 border px-10 pb-2">
          <i class="icon-upload text-[24px]"></i>
          上傳
        </button>

        <input
          ref="hiddenUpload"
          class="hidden"
          type="file"
          name="courseCover"
          @change="getBrandImage"
        />
      </div>

      <img v-else :src="currentCourse.thumbnail" alt="thumbnail" />
    </section>
    <section class="border-bottom flex w-4/12 flex-col">
      <h1 class="section-title">細節資訊</h1>
      <p class="mb-4 font-light">編輯關於課程的基本資訊。</p>

      <label for="title" class="mb-1">課程標題 <span class="text-red-700">*</span></label>
      <input
        v-model="currentCourse.title"
        class="mb-4 rounded border p-1 text-black"
        type="text"
        name="title"
      />

      <label for="subtitle" class="mb-1">課程副標題(選填)</label>
      <input
        v-model="courseSubtitle"
        class="mb-4 rounded border p-1 text-black"
        type="text"
        name="subtitle"
      />

      <label for="type" class="mb-1">類別 <span class="text-sm">(按enter新增)</span></label>
      <input
        v-model="coursetype"
        class="mb-4 rounded border p-1 text-black"
        type="text"
        name="type"
        @keyup.enter="addCourseType"
      />

      <ul v-if="typeTips.length" class="mb-4 flex">
        <li
          v-for="(tip, index) in typeTips"
          :key="tip"
          class="mr-2 cursor-pointer rounded-lg bg-slate-400 px-2 pb-1"
          @click="removeType(index)"
        >
          {{ tip }}
          <span class="ml-2">x</span>
        </li>
      </ul>
      <!-- <input class="rounded border" type="text" name="type" v-model="coursetype" @focus="showHiddenTypeOption" @change="getCourseType"/>
        <select id="type" class="rounded mb-4 hidden" name="type">
          <option value="new">新增 {{ coursetype }}</option>
        </select> -->

      <label for="title">詳細說明</label>
      <in-text-editor v-model="currentCourse.description" :max-limit="280" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import coursesStore from '~/stores/useCourses'
import useNotification from '~~/stores/useNotification'

definePageMeta({
  layout: 'create-courses'
})

// const router = useRouter()
const route = useRoute()
const { $api } = useNuxtApp()
const { notification } = useNotification()
const { currentCourse } = storeToRefs(coursesStore())
const { setCurrentCourse } = coursesStore()

// Form fields
const brand = ref('web')
const brandImage = ref([
  { brand: 'web', file: '' },
  { brand: 'ios', file: '' }
]) // { brand: '', file: '' }?

const courseSubtitle = ref('')

// course type input
const coursetype = ref('')
const typeTips: any = ref([])

const hiddenUpload: any = ref(null)

const saveCourseContent = () => {
  setCurrentCourse(currentCourse.value)
}

const choseBrandType = (type: string) => {
  brand.value = type
}

const initHiddenUploader = () => {
  hiddenUpload.value.click()
}

const getBrandImage = ($event: any) => {
  console.log('file :>>>', $event)
  if (brand.value === 'web') {
    brandImage.value[0].file = $event.target.files
  } else {
    brandImage.value[1].file = $event.target.files
  }
}

const addCourseType = () => {
  if (coursetype.value.length) {
    typeTips.value.push(coursetype.value)
    coursetype.value = ''
  }
}

const removeType = (index: number) => {
  typeTips.value.splice(index, 1)
}

onMounted(async () => {
  // 如果有代課程id進來
  if (route.query.id !== undefined) {
    const courseId = String(route.query.id)
    // 發動獲取單一課程資料的 api
    try {
      const courseContent: any = await $api.course.getCourseContent(courseId)

      if (courseContent.success) {
        // 把取得的資料放入對應的欄位
        // setCurrentCourse()
      } else {
        notification.error(courseContent.message)
      }
    } catch (err: any) {
      notification.error(err)
    }
  }
})
</script>

<style lang="scss" scoped>
.section-title {
  @apply text-3xl font-bold;
}
</style>
