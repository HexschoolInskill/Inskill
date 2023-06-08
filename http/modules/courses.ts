import HttpFactory from '../factory'

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
}

export default CoursesModule
