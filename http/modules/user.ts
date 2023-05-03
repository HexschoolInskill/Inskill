import HttpFactory from '../factory'

interface IProfilePayload {
  avatar?: File
  username: string
  hobbit?: string
  facebookLink?: string
  youtubeLink?: string
  officialLink?: string
  githubLink?: string
  about?: string
}

class UserModule extends HttpFactory {
  private RESOURCE = '/user'
  async login() {}
  async logout() {}
  async update(payload: IProfilePayload) {
    await this.call(`${this.RESOURCE}`, 'POST', payload)
  }
}

export default UserModule
