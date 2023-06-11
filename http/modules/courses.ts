import HttpFactory from '../factory'

export type CourseSortBy = 'popular' | 'praise' | 'time'
export type CourseCategory = 'normal' | 'stream'
export type CollectCourseType = 'Course' | 'LiveCourse'
export interface LessonContent {
  contentType: string
  content: string
  sort: number
  _id: string
  createdAt: string
  updatedAt: string
  duration?: number
}
export interface LessonQuestion {
  userId: string
  comment: string
  _id: string
  createdAt: string
  updatedAt: string
  replies: any[]
  username: string
}
export interface CourseReview {
  userId: string
  rating: number
  comment: string
  createdAt: string
  _id: string
  username: string
}
export interface CourseLesson {
  title: string
  description: string
  freePreview: boolean
  sort: number
  lessonContent: LessonContent[]
  question: LessonQuestion[]
  _id: string
  createdAt: string
  updatedAt: string
}

export interface CourseChapter {
  title: string
  description: string
  sort: number
  lessons: CourseLesson[]
  _id: string
  createdAt: string
  updatedAt: string
}
export interface Course {
  _id: string
  title: string
  description: string
  price: number
  thumbnail?: string
  teacherId: string
  purchasedCount: number
  teacherName: string
  averageRating: number
}
export interface NormalCourse extends Course {
  isPublic: boolean
  createdAt: string
  scoreCount: number
  course: number
  chapter: number
  chapters: CourseChapter[]
  reviews: CourseReview[]
}
export interface StreamCourse extends Course {
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

  async getCart() {
    return await this.call(`${this.RESOURCE}/cart`, 'GET')
  }

  async createReview(courseId: string) {
    return await this.call(`/star/${courseId}`, 'POST')
  }

  async createDiscuss(courseId: string, lessonIndex: number) {
    return await this.call(`/discuss/${courseId}/${lessonIndex}`, 'POST')
  }

  async fetchCourse(courseId: string) {
    return await this.call<{ success: boolean; course: NormalCourse[] }>(
      `${this.RESOURCE}/${courseId}`,
      'GET'
    )
  }

  async createChapter(courseId: string, title: string) {
    return await this.call<{
      success: boolean
      sort: number
      updatedChapter: CourseChapter[]
    }>(`${this.RESOURCE}/chapter`, 'POST', {
      courseId,
      title
    })
  }

  async deleteChapter(courseId: string, chapterId: string) {
    return await this.call<{
      success: boolean
    }>(`${this.RESOURCE}/chapter?courseId=${courseId}&chapterId=${chapterId}`, 'DELETE')
  }

  async sortChapter(sortPayload: {
    courseId: string
    chapterId: string
    sort: number
    field: string
  }) {
    return await this.call<{ success: boolean }>(`${this.RESOURCE}/chapter`, 'PATCH', sortPayload)
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
