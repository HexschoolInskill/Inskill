import { v4 as uuidv4 } from 'uuid'

type NotificationType = 'success' | 'error'

export default function () {
  interface INotification {
    id: string
    type: NotificationType
    message: string
  }
  const notifications: INotification[] = []

  function createNotification(type: NotificationType, message: string, time = 5000) {
    const id = uuidv4()

    const notification: INotification = {
      id,
      type,
      message
    }

    notifications.push(notification)

    setTimeout(() => {
      notifications.filter((notification) => notification.id !== id)
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
    success,
    error
  }
}
