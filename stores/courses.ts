import { defineStore } from 'pinia'
import { ref } from 'vue'

interface course {
  _id: string
  title: string
  description: string
  price: number
  thumbnail: string
  theacherId: string
  chapters: object[]
  reviews: object[]
}

type course_object = course[]

export default defineStore('courses', () => {
  // 會員購買的課程
  const courseStudent = ref<course_object>([])
  // 老師開設的課程
  const courseTeacher = ref<course_object>([])
  const cart = ref<Object[]>([])

  const setCourse = (type: string, coursesFromBackend: course_object) => {
    if (type === 'student') {
      courseStudent.value = coursesFromBackend
    } else {
      courseTeacher.value = coursesFromBackend
    }
  }

  const setCart = (cartFromBackend: Object[]) => {
    cart.value = cartFromBackend
  }

  return {
    courseStudent,
    setCourse,
    courseTeacher,
    cart,
    setCart
  }
})
