import { defineStore } from 'pinia'
import { NormalCourse } from '@/http/modules/courses'

export default defineStore('editCourse', () => {
  const currentCourse = reactive<NormalCourse>({
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

  const isLoading = ref(false)

  return {
    currentCourse,
    isLoading
  }
})
