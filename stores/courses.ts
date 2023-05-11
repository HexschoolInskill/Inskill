import { defineStore } from 'pinia'
import { reactive } from 'vue'

export default defineStore('courses', () => {
  const cart = reactive<any[]>([])

  return {
    cart
  }
})
