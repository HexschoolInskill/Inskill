import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

interface course {
  _id: string
  title: string
  description: string
  price: number
  thumbnail: string
  theacherId: string
  chapters: object[]
  reviews?: object[]
}

type courseArray = course[]

export default defineStore('courses', () => {
  // 會員購買的課程
  const courseStudent = ref<courseArray>([])
  // 老師開設的課程
  const courseTeacher = ref<courseArray>([])
  // 建立/編輯的課程
  let currentCourse = reactive<course>({
    _id: '',
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
