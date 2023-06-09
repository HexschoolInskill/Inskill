import HttpFactory from '../factory'

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
export interface INormalCourse extends ICourse {
  chapter: number
  course: number
  createdAt: string
  scoreCount: number
}
export interface IStreamCourse extends ICourse {
  endTime: string
  startTime: string
}

interface ISearchCourses<T> extends IResponse {
  searchCourses: T[]
}
interface IIndexCourses extends IResponse {
  newCourses: INormalCourse[]
  streamCourse: IStreamCourse[]
  popularCourses: INormalCourse[]
  praiseCourses: INormalCourse[]
}

interface ISearchParams {
  q?: string
  category: 'stream' | 'normal'
  sortBy: 'popular' | 'praise' | 'time'
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
  searchCourse(params: ISearchParams): Promise<ISearchCourses<INormalCourse>>
  searchCourse(params: ISearchParams): Promise<ISearchCourses<IStreamCourse>>
  async searchCourse(params?: ISearchParams) {
    if (params) {
      const searchParams = Object.entries(params)
        .filter((param) => param[1])
        .map((param) => `${param[0]}=${encodeURIComponent(param[1])}`)
        .join('&')
      if (params.category === 'normal') {
        return await this.call<ISearchCourses<INormalCourse>>(
          `${this.RESOURCE}/search?${searchParams}`,
          'GET'
        )
      }
      if (params.category === 'stream') {
        return await this.call<ISearchCourses<IStreamCourse>>(
          `${this.RESOURCE}/search?${searchParams}`,
          'GET'
        )
      }
    } else {
      return await this.call<IIndexCourses>(`${this.RESOURCE}/search`, 'GET')
    }
  }
}

export default CoursesModule
