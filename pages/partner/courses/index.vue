<template>
  <in-container class="mb-auto mt-[12vh] sm:mt-[15vh]">
    <div v-if="courseTeacher.length" class="flex">
      <h1 class="text-3xl font-bold">課程列表</h1>
      <button type="button" @click="openModal">新增課程</button>
    </div>

    <table v-if="courseTeacher.length">
      <thead>
        <tr>
          <td>縮圖</td>
          <td>名稱</td>
          <td>售價</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courseTeacher" :key="course?._id">
          <td>
            <img :src="course.thumbnail" alt="thumbnail" />
          </td>
          <td>
            <NuxtLink :to="`/manage/${course._id}`">
              {{ course.title }}
            </NuxtLink>
          </td>
          <td>
            {{ course.price }}
          </td>
          <td>
            <button type="button">...</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="bg-gray-900 p-4 text-center text-white">
      <h1 class="text-3xl font-bold">開始建立課程</h1>
      <button class="my-4 rounded bg-black px-5 py-2" type="button" @click="openModal">
        新增課程
      </button>
    </div>
  </in-container>

  <!-- new course modal -->
  <div v-if="showModal" class="absolute top-0 z-10 h-[100%] w-[100%] bg-black bg-opacity-50">
    <div
      class="relative left-[50%] top-[50%] w-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded bg-white p-1"
    >
      <h1 class="text-center text-3xl font-bold">練立課程</h1>
      <button
        class="float-right my-2 mr-2 mt-[-30px] rounded-full border p-1 px-3"
        type="button"
        @click="closeModal"
      >
        X
      </button>

      <div class="mx-auto mt-4 flex w-6/12 flex-col">
        <label for="title" class="mb-1">課程名稱 <span class="text-red-700">*</span></label>
        <input v-model="v$.newCourse.$model" class="border p-1" type="text" name="title" />

        <div v-for="error of v$.newCourse.$errors" :key="error.$uid" class="mb-4 text-red-500">
          {{ error.$message }}
        </div>

        <button
          class="my-4 w-4/12 rounded bg-black px-10 py-1 text-white"
          type="button"
          @click="createNewCourse"
        >
          建立課程
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import coursesStore from '~/stores/courses'
import useNotification from '~~/stores/useNotification'

const { $api } = useNuxtApp()
const router = useRouter()
const { notification } = useNotification()
const { courseTeacher } = storeToRefs(coursesStore())

const formFields = reactive({
  newCourse: ''
})
const showModal = ref(false)

const rules = {
  newCourse: {
    required: helpers.withMessage('請輸入名稱', required)
  }
}

const v$ = useVuelidate(rules, formFields)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const createNewCourse = async () => {
  // 發動建立課程的 api
  if (formFields.newCourse.length) {
    try {
      const newCourse: any = await $api.course.createCourseTitle()
      // 移動到課程編輯頁面
      if (newCourse._id) {
        router.push(`/manage/${newCourse._id}`)
      } else {
        notification.error(newCourse.message)
      }
    } catch (error) {
      console.log('create course error:>>>', error)
    }
  } else {
    notification.error('請輸入名稱')
  }
}

onMounted(() => {
  // 發動取課程的 api
})
</script>
