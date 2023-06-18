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
    averageRating: 0,
    scoreCount: 0,
    isPublic: false,
    chapters: [],
    reviews: [],
    course: 0,
    chapter: 0,
    createdAt: ''
  })
  const currentLesson = ref<CourseLesson | null>(null)
  const currentContents = ref<LessonContent[]>([])

  const isLoading = ref(false)

  return {
    currentCourse,
    currentLesson,
    currentContents,
    isLoading
  }
})
