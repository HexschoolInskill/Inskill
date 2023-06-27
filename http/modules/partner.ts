import HttpFactory from '../factory'
import { NormalCourse } from './courses'

interface IApplyFormData {
  realName: string
  username: string
  gender: string
  unit: string
  phone: string
  postNumber: string
  address: string
  facebookLink?: string
  youtubeLink?: string
  socialLink?: string
  githubLink?: string
  selfMedia?: string
  description: string
  longDescription: string
}

export type PartnerCourse = Pick<
  NormalCourse,
  | '_id'
  | 'title'
  | 'price'
  | 'purchasedCount'
  | 'thumbnail'
  | 'teacherAvatar'
  | 'teacherId'
  | 'teacherName'
  | 'isPublic'
>
export type PartnerLiveCourse = PartnerCourse & { videoUrl: string }

class PartnerModule extends HttpFactory {
  private RESOURCE = '/partner'

  async join(applyFormData: IApplyFormData) {
    return await this.call(`${this.RESOURCE}/apply`, 'POST', applyFormData)
  }

  async fetchPartnerNormalCourses() {
    return await this.call<{
      success: boolean
      partnerCourses: PartnerCourse[]
      statusCode: number
    }>(`${this.RESOURCE}/myCourses`, 'GET')
  }

  async fetchPartnerLiveCourses() {
    return await this.call<{
      success: boolean
      partnerLiveCourses: PartnerLiveCourse[]
      statusCode: number
    }>(`${this.RESOURCE}/myLiveCourses`, 'GET')
  }
}

export default PartnerModule
