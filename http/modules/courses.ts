import HttpFactory from '../factory'

export type CourseSortBy = 'popular' | 'praise' | 'time'
export type CourseCategory = 'normal' | 'stream'
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

interface ISearchCourses<T> extends IResponse {
  searchCourses: T[]
}
interface IIndexCourses extends IResponse {
  newCourses: NormalCourse[]
  streamCourse: StreamCourse[]
  popularCourses: NormalCourse[]
  praiseCourses: NormalCourse[]
}

interface ISearchParams {
  q?: string
  category: CourseCategory
  sortBy: CourseSortBy
}

class CoursesModule extends HttpFactory {
  private RESOURCE = '/courses'

  async getStudentCourses() {}

  async getTeacherCourses() {
    return await this.call(`${this.RESOURCE}/courses/teacher`, 'GET')
  }

  async getCourseContent(id: string) {
    return await this.call(`${this.RESOURCE}/courses/${id}`, 'GET')
  }

  async createCourseTitle() {
    return await this.call(`${this.RESOURCE}/courses/create`, 'POST')
  }

  async getCart() {
    return await this.call(`${this.RESOURCE}/cart`, 'GET')
  }

  searchCourse(): Promise<IIndexCourses>
  searchCourse(params: ISearchParams): Promise<ISearchCourses<NormalCourse | StreamCourse>>
  async searchCourse(params?: ISearchParams) {
    if (params) {
      const searchParams = Object.entries(params)
        .filter((param) => param[1] !== undefined)
        .map((param) => `${param[0]}=${encodeURIComponent(param[1])}`)
        .join('&')
      return await this.call<ISearchCourses<NormalCourse | StreamCourse>>(
        `${this.RESOURCE}/search?${searchParams}`,
        'GET'
      )
    } else {
      return await this.call<IIndexCourses>(`${this.RESOURCE}/search`, 'GET')
    }
  }
}

export default CoursesModule
