import HttpFactory from '../factory'

class UserModule extends HttpFactory {
  private RESOURCE = '/user'
  async login() {}
  async logout() {}
  async update() {}
}

export default UserModule
