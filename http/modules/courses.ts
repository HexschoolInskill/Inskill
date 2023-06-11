import HttpFactory from '../factory'

export type CourseSortBy = 'popular' | 'praise' | 'time'
export type CourseCategory = 'normal' | 'stream'
export type CollectCourseType = 'Course' | 'LiveCourse'
interface ICourse {
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
export interface NormalCourse extends ICourse {
  chapter: number
  course: number
  createdAt: string
  scoreCount: number
}
export interface StreamCourse extends ICourse {
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
