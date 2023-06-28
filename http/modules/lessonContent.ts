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

interface AddLessonContentPayload {
  contentType: LessonContentType
  lessonId: string
  content: File | string
}

interface UpdateContentPayload {
  contentType: LessonContentType | 'sort'
  lessonId: string
  lessonContentId: string
  content: File | string | number
}

class LessonContentModule extends HttpFactory {
  private RESOURCE = '/lessonContent'

  async addContent({ contentType, content, lessonId }: AddLessonContentPayload) {
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

  async updateContent({ lessonContentId, lessonId, contentType, content }: UpdateContentPayload) {
    const formData = new FormData()

    if (contentType === 'text' || contentType === 'code') {
      formData.append('data', JSON.stringify({ contentType, content }))
    }
    if ((contentType === 'pdf' || contentType === 'video') && content instanceof File) {
      formData.append('data', JSON.stringify({ contentType }))
      formData.append('file', content)
    }
    if (contentType === 'sort' && typeof content === 'number') {
      formData.append('data', JSON.stringify({ contentType, content }))
    }
    return await this.call<{ updatedLessonContent: LessonContent[] }>(
      `${this.RESOURCE}/${lessonId}?lessonContentId=${lessonContentId}`,
      'PATCH',
      formData
    )
  }

  async deleteContent(lessonId: string, lessonContentId: string) {
    return await this.call<{ success: boolean }>(
      `${this.RESOURCE}/${lessonId}?lessonContentId=${lessonContentId}`,
      'DELETE'
    )
  }
}

export default LessonContentModule
