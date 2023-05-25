import HttpFactory from '../factory'

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
}

export default CoursesModule
