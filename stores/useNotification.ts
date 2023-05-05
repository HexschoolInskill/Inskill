import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'
type NotificationType = 'success' | 'error'

export default defineStore('notification', () => {
  interface INotification {
    id: string
    type: NotificationType
    message: string
  }
  const notifications = ref<INotification[]>([])

  function createNotification(type: NotificationType, message: string, time = 5000) {
    const id = uuidv4()

    const notification: INotification = {
      id,
      type,
      message
    }

    notifications.value.push(notification)

    setTimeout(() => {
      notifications.value = notifications.value.filter((notification) => notification.id !== id)
    }, time)
  }

  function success(message: string, time?: number) {
    createNotification('success', message, time)
  }
  function error(message: string, time?: number) {
    createNotification('error', message, time)
  }

  return {
    notifications,
    notification: {
      success,
      error
    }
  }
})
