import { defineStore } from 'pinia'

export default defineStore('confirm', () => {
  const isShow = ref(false)
  const title = ref('')
  const description = ref('')

  const confirmResolve = ref<Function | null>(null)
  const confirmReject = ref<Function | null>(null)

  function confirm(confirmTitle: string, confirmDescription: string) {
    isShow.value = true
    title.value = confirmTitle
    description.value = confirmDescription

    return new Promise<boolean>((resolve) => {
      confirmResolve.value = () => resolve(true)
      confirmReject.value = () => resolve(false)
    }).finally(() => {
      isShow.value = false
      confirmResolve.value = null
      confirmReject.value = null
    })
  }

  return {
    isShow,
    title,
    description,
    confirm,
    confirmResolve,
    confirmReject
  }
})
