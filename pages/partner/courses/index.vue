<template>
  <in-card border class="flex flex-col bg-gray-900 p-10 text-white">
    <section class="mb-10 flex items-center justify-between">
      <div class="flex items-center">
        <h2 class="text-h2 font-bold">課程資訊</h2>
        <div class="text-fs-6 ml-4 flex items-center rounded border border-solid px-7 py-2">
          {{ currentCourse.isPublic ? '發布' : '未發布' }}
        </div>
      </div>
      <in-btn size="small" @click="saveCourseContent">儲存</in-btn>
    </section>
    <section class="mb-10 border-b border-solid border-white/50">
      <h2 class="mb-2 text-h2 font-bold">發佈與預覽</h2>
      <p class="font-light">發布或取消發布您的課程。查看您的課程對訪客或已註冊學生的展示效果。</p>
      <div class="my-4 flex gap-3">
        <in-btn size="small">發布課程</in-btn>
        <in-btn size="small">更多功能</in-btn>
      </div>

      <!-- more options -->
      <ul class="hidden">
        <li>預覽販售頁面</li>
        <li>以學生身分預覽</li>
        <li>複製課程</li>
        <li>刪除課程</li>
      </ul>
    </section>
    <section class="flex w-4/12 flex-col border-b border-solid border-white">
      <h2 class="mb-2 text-h2 font-bold">細節資訊</h2>
      <p class="mb-4 font-light">編輯關於課程的基本資訊。</p>

      <label class="mb-5">
        <p class="text-fs-6 mb-2">課程標題 <span class="text-red-700">*</span></p>
        <in-input
          v-model="currentCourse.title"
          class="text-black"
          name="title"
          placeholder="請輸入課程標題"
        />
      </label>
      <label class="mb-5">
        <p class="text-fs-6 mb-2">課程副標題(選填)</p>
        <in-input
          v-model="courseSubtitle"
          class="text-black"
          name="subtitle"
          placeholder="請輸入課程副標題"
        />
      </label>
      <!-- TODO: 這邊應為選擇類別 暫時隱藏 -->
      <!-- <label for="type" class="mb-1">類別 <span class="text-sm">(按enter新增)</span></label>
      <in-input v-model="currentCourse.title" name="subtitle" /> -->
      <label class="text-fs-6 mb-2">詳細說明</label>
      <in-text-editor v-model="currentCourse.description" :max-limit="280" />
    </section>
  </in-card>
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

const courseSubtitle = ref('')

// course type input
// const coursetype = ref('')
// const typeTips: any = ref([])

// const hiddenUpload: any = ref(null)

const saveCourseContent = () => {
  setCurrentCourse(currentCourse.value)
}

// const initHiddenUploader = () => {
//   hiddenUpload.value.click()
// }

// const getBrandImage = ($event: any) => {
//   console.log('file :>>>', $event)
//   if (brand.value === 'web') {
//     brandImage.value[0].file = $event.target.files
//   } else {
//     brandImage.value[1].file = $event.target.files
//   }
// }

// const addCourseType = () => {
//   if (coursetype.value.length) {
//     typeTips.value.push(coursetype.value)
//     coursetype.value = ''
//   }
// }

// const removeType = (index: number) => {
//   typeTips.value.splice(index, 1)
// }

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

<style lang="scss"></style>
