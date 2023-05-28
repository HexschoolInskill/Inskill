import { defineStore } from 'pinia'

export default defineStore('confirm', () => {
  const isShow = ref(false)
  const title = ref('')
  const description = ref('')
  const callback = ref<(() => void) | null>(null)

  function callbackWrapper(callback: Function) {
    return () => {
      callback()
      isShow.value = false
    }
  }

  function confirm<T extends Function>(
    confirmTitle: string,
    confirmDescription: string,
    confirmCallback: T
  ) {
    isShow.value = true
    title.value = confirmTitle
    description.value = confirmDescription
    callback.value = callbackWrapper(confirmCallback)
  }

  return {
    isShow,
    callback,
    title,
    description,
    confirm
  }
})
