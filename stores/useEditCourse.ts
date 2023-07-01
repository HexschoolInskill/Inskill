import { defineStore } from 'pinia'
import { NormalCourse, CourseLesson } from '@/http/modules/courses'
import { LessonContent } from '@/http/modules/lessonContent'

export default defineStore('editCourse', () => {
  const currentCourse = ref<NormalCourse>({
    _id: '',
    title: '',
    description: '',
    price: 0,
    thumbnail: '',
    teacherId: '',
    purchasedCount: 0,
    teacherName: '',
    teacherAvatar: '',
    averageRating: 0,
    scoreCount: 0,
    isPublic: false,
    chapters: [],
    reviews: [],
    course: 0,
    chapter: 0,
    createdAt: '',
    teacherAvatar: ''
  })
  const currentLesson = ref<CourseLesson | null>(null)
  const currentContents = ref<LessonContent[]>([])

  let loadingTimer: NodeJS.Timeout | number | undefined
  const delayLoading = ref(false)
  const isLoading = computed({
    get() {
      return delayLoading.value
    },
    set(value) {
      clearTimeout(loadingTimer)
      loadingTimer = setTimeout(() => (delayLoading.value = value), 200)
    }
  })

  return {
    currentCourse,
    currentLesson,
    currentContents,
    isLoading
  }
})
