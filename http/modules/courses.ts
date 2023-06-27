import HttpFactory from '../factory'
import type { LessonContent } from './lessonContent'
import { PartnerCourse } from './partner'

export type CourseSortBy = 'popular' | 'praise' | 'time'
export type CourseCategory = 'normal' | 'stream'
export type CollectCourseType = 'Course' | 'LiveCourse'

interface cart {
  courseId: string
  courseType: CollectCourseType
  isCart: boolean
}

export interface LessonQuestion {
  userId: string
  comment: string
  _id: string
  createdAt?: string
  updatedAt?: string
  replies: any[]
  username: string
}
export interface CourseReview {
  userId: string
  rating: number
  comment: string
  createdAt?: string
  _id: string
  username: string
}
export interface CourseLesson {
  title: string
  description: string
  freePreview: boolean
  sort: number
  isPublish: boolean
  lessonContent: LessonContent[]
  question: LessonQuestion[]
  _id: string
  createdAt?: string
  updatedAt?: string
}

export interface CourseChapter {
  title: string
  description: string
  sort: number
  lessons: CourseLesson[]
  _id: string
  createdAt?: string
  updatedAt?: string
}
export interface Course {
  _id: string
  title: string
  description: string
  price: number
  thumbnail?: string
  teacherId: string
  teacherName: string
  teacherAvatar: string
  purchasedCount: number
  averageRating: number
  reviews: CourseReview[]
}
export interface NormalCourse extends Course {
  isPublic: boolean
  createdAt: string
  scoreCount: number
  course: number
  chapter: number
  chapters: CourseChapter[]
}
export interface StreamCourse extends Course {
  videoUrl: string
  endTime: string
  startTime: string
}

interface SearchCourses<T> extends Response {
  searchCourses: T[]
}
interface IndexCourses extends Response {
  newCourses: NormalCourse[]
  streamCourse: StreamCourse[]
  popularCourses: NormalCourse[]
  praiseCourses: NormalCourse[]
}

interface SearchPayload {
  q?: string
  category: CourseCategory
  sortBy: CourseSortBy
}

interface UpdateLessonPayload {
  courseId: string
  chapterId: string
  lessonId: string
  field: 'title' | 'sort' | 'isPublish' | 'freePreview'
  title?: string
  sort?: number
  isPublish?: boolean
  freePreview?: boolean
}

interface UpdateChapterPayload {
  courseId: string
  chapterId: string
  field: 'title' | 'sort'
  title?: string
  sort?: number
}

interface CollectCoursePayload {
  courseId: string
  courseType: CollectCourseType
  isCollect: boolean
}

export interface CollectCourse {
  _id: string
  courseId: string
  courseType: CollectCourseType
}

interface ChapterAndLessonResponse {
  success: boolean
  updatedChapter: CourseChapter[]
}

class CoursesModule extends HttpFactory {
  private RESOURCE = '/courses'

  async getStudentCourses() {}

  async getTeacherCourses() {
    return await this.call(`${this.RESOURCE}/teacher`, 'GET')
  }

  async getCourseContent(id: string) {
    return await this.call(`${this.RESOURCE}/${id}`, 'GET')
  }

  async createCourseTitle() {
    return await this.call(`${this.RESOURCE}/create`, 'POST')
  }

  async pushToCart(payload: cart) {
    return await this.call(`${this.RESOURCE}/cart`, 'POST', payload)
  }

  async getCart() {
    return await this.call(`${this.RESOURCE}/cart`, 'GET')
  }

  async createReview(courseId: string) {
    return await this.call(`/star/${courseId}`, 'POST')
  }

  async createDiscuss(courseId: string, lessonIndex: number) {
    return await this.call(`/discuss/${courseId}/${lessonIndex}`, 'POST')
  }

  async fetchCollectCourses() {
    return await this.call<{
      success: boolean
      statusCode: number
      collect: {
        courseType: CollectCourseType
        courses: NormalCourse[] | StreamCourse[]
      }[]
    }>(`${this.RESOURCE}/collect`, 'GET')
  }

  async fetchPurchasedCourses() {
    return await this.call<{
      success: boolean
      statusCode: number
      purchasedCourses: {
        courseType: CollectCourseType
        courses: NormalCourse[] | StreamCourse[]
      }[]
    }>(`${this.RESOURCE}/myCourses`, 'GET')
  }

  async fetchCourse(courseId: string) {
    return await this.call<{ success: boolean; course: NormalCourse[] }>(
      `${this.RESOURCE}/${courseId}`,
      'GET'
    )
  }

  async createCourse(title: string) {
    return await this.call<{
      success: boolean
      course: PartnerCourse
    }>(this.RESOURCE, 'POST', {
      title
    })
  }

  async updateCourse({
    courseId,
    ...payload
  }: {
    courseId: string
    title: string
    description: string
    price: number
    isPublic: boolean
  }) {
    return await this.call<{ success: boolean; course: NormalCourse }>(
      `${this.RESOURCE}/${courseId}`,
      'PATCH',
      payload
    )
  }

  async deleteCourse(courseId: string) {
    return await this.call(`${this.RESOURCE}/${courseId}`, 'DELETE')
  }

  async updateThumbnail(courseId: string, image: File) {
    const formData = new FormData()
    formData.append('image', image)
    return await this.call<{ success: boolean; course: NormalCourse }>(
      `${this.RESOURCE}/${courseId}`,
      'PATCH',
      formData
    )
  }

  async createLesson(courseId: string, chapterId: string, title: string) {
    return await this.call<ChapterAndLessonResponse>(`${this.RESOURCE}/lesson`, 'POST', {
      courseId,
      chapterId,
      title
    })
  }

  async deleteLesson(courseId: string, chapterId: string, lessonId: string) {
    return await this.call<ChapterAndLessonResponse>(
      `${this.RESOURCE}/lesson?courseId=${courseId}&chapterId=${chapterId}&lessonId=${lessonId}`,
      'DELETE'
    )
  }

  async updateLesson(payload: UpdateLessonPayload) {
    return await this.call<ChapterAndLessonResponse>(`${this.RESOURCE}/lesson`, 'PATCH', payload)
  }

  async createChapter(courseId: string, title: string) {
    return await this.call<ChapterAndLessonResponse>(`${this.RESOURCE}/chapter`, 'POST', {
      courseId,
      title
    })
  }

  async updateChapter(payload: UpdateChapterPayload) {
    return await this.call<ChapterAndLessonResponse>(`${this.RESOURCE}/chapter`, 'PATCH', payload)
  }

  async deleteChapter(courseId: string, chapterId: string) {
    return await this.call<{
      success: boolean
    }>(`${this.RESOURCE}/chapter?courseId=${courseId}&chapterId=${chapterId}`, 'DELETE')
  }

  searchCourse(): Promise<IndexCourses>
  searchCourse(payload: SearchPayload): Promise<SearchCourses<NormalCourse | StreamCourse>>
  async searchCourse(payload?: SearchPayload) {
    if (payload) {
      const searchQueries = Object.entries(payload)
        .filter((query) => query[1] !== undefined)
        .map((query) => `${query[0]}=${encodeURIComponent(query[1])}`)
        .join('&')
      return await this.call<SearchCourses<NormalCourse | StreamCourse>>(
        `${this.RESOURCE}/search?${searchQueries}`,
        'GET'
      )
    } else {
      return await this.call<IndexCourses>(`${this.RESOURCE}/search`, 'GET')
    }
  }

  async collectCourse(payload: CollectCoursePayload) {
    return await this.call<{ success: boolean; statusCode: number; collect: CollectCourse[] }>(
      `${this.RESOURCE}/collect`,
      'POST',
      payload
    )
  }
}

export default CoursesModule
