<template>
  <div class="flex justify-between gap-10">
    <div class="flex gap-5">
      <in-btn size="small" :ghost="currentCategory !== 'normal'" @click="currentCategory = 'normal'"
        >影音課程</in-btn
      >
      <in-btn size="small" :ghost="currentCategory !== 'stream'" @click="currentCategory = 'stream'"
        >直播課程</in-btn
      >
    </div>
    <div class="hidden sm:block">
      <in-btn size="small" @click="isModalShow = true">
        <span v-if="currentCategory === 'normal'">新增影音課程</span>
        <span v-if="currentCategory === 'stream'">新增直播課程</span>
      </in-btn>
    </div>
    <div
      class="group fixed bottom-5 right-5 z-10 h-15 w-15 overflow-hidden rounded-full bg-white sm:hidden"
      @click="isModalShow = true"
    >
      <div
        class="absolute left-1/2 top-1/2 h-1 w-5 -translate-x-1/2 -translate-y-1/2 rounded-1 bg-black"
      ></div>
      <div
        class="absolute left-1/2 top-1/2 h-1 w-5 -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-1 bg-black"
      ></div>
      <div
        class="transition-base absolute left-0 top-0 h-full w-full bg-black/50 opacity-0 group-hover:opacity-100"
      ></div>
    </div>
  </div>
  <div class="py-10">
    <div v-if="isLoading" class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <in-skeleton class="h-[370px]" />
      <in-skeleton class="h-[370px]" />
      <in-skeleton class="h-[370px]" />
      <in-skeleton class="h-[370px]" />
    </div>
    <div
      v-else-if="currentCategory === 'normal' && normalCourses.length"
      class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
    >
      <in-card
        v-for="item in normalCourses"
        :key="item._id"
        glow
        class="group relative flex flex-col font-bold text-[#6C757D]"
      >
        <div class="relative flex-shrink-0 overflow-hidden pt-7/10 sm:pt-8/10">
          <img
            v-if="item.thumbnail"
            :src="item.thumbnail"
            :alt="item.title"
            class="transition-base absolute left-0 top-0 h-full w-full object-cover group-hover:scale-105"
          />
          <img v-else class="ml-auto mr-0" src="/images/logo-white.svg" :alt="item.title" />
          <div
            class="absolute left-0 top-0 h-full w-full bg-black/20 transition group-hover:opacity-0"
          ></div>
        </div>
        <div class="flex-1 p-8 xl:px-6 xl:py-4">
          <div class="flex items-center gap-2">
            <nuxt-link
              :to="`/courses/${item._id}?courseType=normal`"
              class="transition-base line-clamp-1 flex-1 text-[28px] text-[#6C757D] sm:group-hover:text-white"
            >
              {{ item.title }}
            </nuxt-link>
            <div
              class="inline-block rounded-1 border border-solid border-white px-3 py-1 text-sm font-normal text-white"
            >
              {{ item.isPublic ? '已發布' : '未發布' }}
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <div class="flex-shrink-0">
              <i class="icon-people text-white"></i>
            </div>
            <div class="flex-1 pl-4">
              <span>{{ formatNumber(item.purchasedCount) }}</span>
              <span class="ml-3">人已經加入</span>
            </div>
          </div>
          <div class="mt-6 flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <img
                class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full object-cover"
                src="/images/avatar-fallback.svg"
                alt=""
              />
              <p class="font-bold leading-normal">
                {{ item.teacherName }}
              </p>
            </div>
            <p class="flex items-center gap-5 text-2xl">
              <span>NT$</span>
              <span v-if="item.price" class="text-white">{{ formatNumber(item.price) }}</span>
              <span v-else class="text-white">免費</span>
            </p>
          </div>
        </div>
        <in-dropdown
          v-slot="{ show }"
          class="z-1 absolute right-2 top-2"
          :options="options"
          @click.stop
          @select="handleOptionSelect(item._id, $event)"
        >
          <div
            class="transition-base flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full text-white hover:bg-gray"
            :class="{ 'bg-gray': show }"
          >
            <svg
              class="w-6"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 16 16"
            >
              <g fill="none">
                <path
                  d="M5.25 8a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zm4 0a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zM12 9.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </div>
        </in-dropdown>
      </in-card>
    </div>
    <div
      v-else-if="currentCategory === 'stream' && liveCourses.length"
      class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
    >
      <in-card
        v-for="item in liveCourses"
        :key="item._id"
        glow
        class="group relative flex flex-col font-bold text-[#6C757D]"
      >
        <div class="relative flex-shrink-0 overflow-hidden pt-7/10 sm:pt-8/10">
          <img
            v-if="item.thumbnail"
            :src="item.thumbnail"
            :alt="item.title"
            class="transition-base absolute left-0 top-0 h-full w-full object-cover group-hover:scale-105"
          />
          <img v-else class="ml-auto mr-0" src="/images/logo-white.svg" :alt="item.title" />
          <div
            class="absolute left-0 top-0 h-full w-full bg-black/20 transition group-hover:opacity-0"
          ></div>
        </div>
        <div class="flex-1 p-8 xl:px-6 xl:py-4">
          <div class="flex items-center gap-2">
            <nuxt-link
              :to="`/courses/${item._id}?courseType=normal`"
              class="transition-base line-clamp-1 flex-1 text-[28px] text-[#6C757D] sm:group-hover:text-white"
            >
              {{ item.title }}
            </nuxt-link>
            <div
              class="inline-block rounded-1 border border-solid border-white px-3 py-1 text-sm font-normal text-white"
            >
              {{ item.isPublic ? '已發布' : '未發布' }}
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <div class="flex-shrink-0">
              <i class="icon-people text-white"></i>
            </div>
            <div class="flex-1 pl-4">
              <span>{{ formatNumber(item.purchasedCount) }}</span>
              <span class="ml-3">人已經加入</span>
            </div>
          </div>
          <div class="mt-6 flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <img
                class="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full object-cover"
                src="/images/avatar-fallback.svg"
                alt=""
              />
              <p class="font-bold leading-normal">
                {{ item.teacherName }}
              </p>
            </div>
            <p class="flex items-center gap-5 text-2xl">
              <span>NT$</span>
              <span v-if="item.price" class="text-white">{{ formatNumber(item.price) }}</span>
              <span v-else class="text-white">免費</span>
            </p>
          </div>
        </div>
        <in-dropdown
          v-slot="{ show }"
          class="z-1 absolute right-2 top-2"
          :options="options"
          @click.stop
          @select="handleOptionSelect(item._id, $event)"
        >
          <div
            class="transition-base flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full text-white hover:bg-gray"
            :class="{ 'bg-gray': show }"
          >
            <svg
              class="w-6"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 16 16"
            >
              <g fill="none">
                <path
                  d="M5.25 8a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zm4 0a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zM12 9.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </div>
        </in-dropdown>
      </in-card>
    </div>
    <div v-else class="py-10">
      <p class="text-center text-fs-4 font-bold text-white opacity-80">沒有已建立的課程</p>
    </div>
  </div>
  <in-popup :show="isModalShow" :size="640">
    <in-container>
      <in-card class="w-full p-8">
        <h2 class="text-h2 font-bold text-white">
          {{ currentCategory === 'normal' ? '新增影音課程' : '新增直播課程' }}
        </h2>
        <in-input
          v-model="courseTitle"
          :disabled="isLoading"
          placeholder="請輸入課程名稱"
          class="mt-6 text-black"
        />
        <div class="mt-6 flex items-center justify-end gap-5">
          <in-btn :disabled="isLoading" ghost size="small" @click="isModalShow = false"
            >取消</in-btn
          >
          <in-btn :disabled="isLoading" size="small" @click="createCourse"> 確定 </in-btn>
        </div>
      </in-card>
    </in-container>
  </in-popup>
</template>
<script lang="ts" setup>
import useNotification from '~/stores/useNotification'
import { PartnerCourse, PartnerLiveCourse } from '@/http/modules/partner'
import useConfirm from '~/stores/useConfirm'
import { Option } from '@/components/in-dropdown.vue'

const app = useNuxtApp()
const { notification } = useNotification()
const { confirm } = useConfirm()
const isLoading = ref(true)
const currentCategory = ref<'normal' | 'stream'>('normal')
const liveCourses = ref<PartnerLiveCourse[]>([])
const normalCourses = ref<PartnerCourse[]>([])
const isModalShow = ref(false)
const courseTitle = ref('')

definePageMeta({
  partner: true
})

const options = [
  {
    label: '編輯課程',
    value: 'edit'
  },
  {
    label: '刪除課程',
    value: 'delete'
  }
]

watch(
  currentCategory,
  async (category) => {
    if (category === 'normal' && !normalCourses.value.length) await fetchPartnerCourses()
    if (category === 'stream' && !liveCourses.value.length) await fetchPartnerCourses()
  },
  {
    immediate: true
  }
)

async function handleOptionSelect(courseId: string, { value }: Option) {
  if (value === 'delete') await deleteCourse(courseId)
  if (value === 'edit') navigateTo(`/partner/courses/${courseId}`)
}

async function fetchPartnerCourses() {
  isLoading.value = true
  try {
    if (currentCategory.value === 'normal') {
      const { partnerCourses } = await app.$api.partner.fetchPartnerNormalCourses()
      normalCourses.value = partnerCourses
    }
    if (currentCategory.value === 'stream') {
      const { partnerLiveCourses } = await app.$api.partner.fetchPartnerLiveCourses()
      liveCourses.value = partnerLiveCourses
    }
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}
async function createCourse() {
  if (!courseTitle.value) return
  isLoading.value = true
  try {
    if (currentCategory.value === 'normal') {
      const { course } = await app.$api.course.createCourse(courseTitle.value)
      navigateTo(`/partner/courses/${course._id}`)
    }
    if (currentCategory.value === 'stream') {
      const { liveCourse } = await app.$api.liveCourse.createLiveCourse(courseTitle.value)
      liveCourses.value.push(liveCourse)
    }
    notification.success('建立成功')
    isModalShow.value = false
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}
async function deleteCourse(courseId: string) {
  const isConfirm = await confirm('確定刪除', '將會刪除所有內容')
  if (!isConfirm) return
  isLoading.value = true
  try {
    if (currentCategory.value === 'normal') {
      await app.$api.course.deleteCourse(courseId)
      normalCourses.value = normalCourses.value.filter((course) => course._id !== courseId)
    }
    if (currentCategory.value === 'stream') {
      await app.$api.liveCourse.deleteLiveCourse(courseId)
      liveCourses.value = liveCourses.value.filter((course) => course._id !== courseId)
    }
    notification.success('刪除成功')
  } catch (error) {
    notification.error((error as Error).message)
  } finally {
    isLoading.value = false
  }
}
</script>
<style lang="scss"></style>
