import HttpFactory from '../factory'

class CoursesModule extends HttpFactory {
  private RESOURCE = '/courses'

  async getCart() {
    return await this.call(`${this.RESOURCE}/cart`, 'GET')
  }
}

export default CoursesModule
