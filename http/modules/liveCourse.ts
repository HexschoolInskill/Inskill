import HttpFactory from '../factory'
import { PartnerLiveCourse } from './partner'
class LiveCoursesModule extends HttpFactory {
  private RESOURCE = '/liveCourses'

  // 取得直播課程資料
  async getLiveCourse(courseId: string) {
    return await this.call(`${this.RESOURCE}/${courseId}`, 'GET')
  }

  // 取得我的學習直播課程內容
  async getMyLiveCourse() {
    return await this.call(`${this.RESOURCE}/myLiveCourses/`, 'GET')
  }

  // 取得回放直播課程
  async getLiveCourseVideo(videoId: string) {
    return await this.call(`${this.RESOURCE}/${videoId}/`, 'GET')
  }

  async createLiveCourse(title: string) {
    return await this.call<{
      liveCourse: PartnerLiveCourse
    }>(`${this.RESOURCE}`, 'POST', { title })
  }

  async deleteLiveCourse(courseId: string) {
    return await this.call<{
      liveCourse: PartnerLiveCourse
    }>(`${this.RESOURCE}/${courseId}`, 'DELETE')
  }
}

export default LiveCoursesModule
