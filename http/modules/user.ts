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

interface loginPayload {
  email: string
  password: string
}

interface registerPayload {
  username: string
  email: string
  password: string
}

class UserModule extends HttpFactory {
  private RESOURCE = '/user'

  async login(payload: loginPayload) {
    return await this.call(`${this.RESOURCE}/login`, 'POST', payload)
  }
  
  async logout() {}

  async update(payload: IProfilePayload) {
    await this.call(`${this.RESOURCE}`, 'POST', payload)
  }

  async registration(payload: registerPayload) {
    return await this.call(`${this.RESOURCE}/login`, 'POST', payload)
  }
}

export default UserModule
