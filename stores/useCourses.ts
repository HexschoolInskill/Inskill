import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

interface review {
  userId: string
  rating: number
  comments: string
  createAt: Date
}

interface content {
  _id: string
  contentTyoe: string
  content: string
  duration?: number
  sort: number
}

interface lession {
  _id: string
  title: string
  description: string
  freePreview: boolean
  sort: number
  lessionContent: content[]
  comments: []
}

interface chapter {
  _id: string
  title: string
  description: string
  sort: number
  lessions: lession[]
}

interface course {
  _id: string
  teacherId: string
  isPublic: boolean
  title: string
  description: string
  price: number
  thumbnail: string
  chapters: chapter[]
  reviews?: review[]
}

type courseArray = course[]

export default defineStore('courses', () => {
  // 會員購買的課程
  const courseStudent = ref<courseArray>([])
  // 老師開設的課程
  const courseTeacher = ref<courseArray>([])
  // 建立/編輯/觀看的課程
  let currentCourse = reactive<course>({
    _id: '',
    teacherId: '',
    isPublic: false,
    title: '',
    description: '',
    price: 0,
    thumbnail: '',
    theacherId: '',
    chapters: []
  })
  const cart = ref<Object[]>([])

  const setCourse = (type: string, coursesFromBackend: courseArray) => {
    if (type === 'student') {
      courseStudent.value = coursesFromBackend
    } else {
      courseTeacher.value = coursesFromBackend
    }
  }

  const setCart = (cartFromBackend: Object[]) => {
    cart.value = cartFromBackend
  }

  const setCurrentCourse = (course: course) => {
    currentCourse = course
  }

  return {
    courseStudent,
    setCourse,
    courseTeacher,
    currentCourse,
    cart,
    setCart,
    setCurrentCourse
  }
})
