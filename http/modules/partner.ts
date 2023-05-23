import HttpFactory from '../factory'

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
class PartnerModule extends HttpFactory {
  private RESOURCE = '/partner'

  async join(applyFormData: IApplyFormData) {
    await this.call(`${this.RESOURCE}/apply`, 'POST', applyFormData)
  }
}

export default PartnerModule
