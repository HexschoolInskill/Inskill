import HttpFactory from '../factory'

export type LessonContentType = 'text' | 'code' | 'pdf' | 'video'
export interface LessonContent {
  contentType: LessonContentType
  content: string
  sort: number
  _id: string
  createdAt: string
  updatedAt: string
  duration?: number
}

interface addLessonContentPayload {
  contentType: LessonContentType
  lessonId: string
  content: File | String
}

class LessonContentModule extends HttpFactory {
  private RESOURCE = '/lessonContent'

  async addContent({ contentType, content, lessonId }: addLessonContentPayload) {
    const formData = new FormData()

    if (contentType === 'text' || contentType === 'code') {
      formData.append('data', JSON.stringify({ contentType, content }))
    }
    if ((contentType === 'pdf' || contentType === 'video') && content instanceof File) {
      formData.append('data', JSON.stringify({ contentType }))
      formData.append('file', content)
    }

    return await this.call<{
      success: boolean
      updatedLessonContent: LessonContent[]
    }>(`${this.RESOURCE}/${lessonId}`, 'POST', formData)
  }

  // async updateContent(contentType: LessonContentType) {}
}

export default LessonContentModule
