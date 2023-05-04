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

interface IloginPayload {
  email: string
  password: string
}

interface IregisterPayload {
  username: string
  email: string
  password: string,
  confirmPassword: string
}

interface IEmailPayload {
  email: string
}

class UserModule extends HttpFactory {
  private RESOURCE = '/user'

  async login(payload: IloginPayload) {
    return await this.call(`${this.RESOURCE}/sign_in`, 'POST', payload)
  }

  async logout() {}

  async update(payload: IProfilePayload) {
    await this.call(`${this.RESOURCE}`, 'POST', payload)
  }

  async isEmailRegister(payload: IEmailPayload){
    return await this.call(`${this.RESOURCE}/isEmailRegister`, 'POST', payload)
  }

  async registration(payload: IregisterPayload) {
    return await this.call(`${this.RESOURCE}/sign_up`, 'POST', payload)
  }
}

export default UserModule
