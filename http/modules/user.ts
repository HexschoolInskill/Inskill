import HttpFactory from '../factory'
import useUser, { IUserProfile } from '~/stores/useUser'
import tokenController from '~~/composables/token'

interface IProfileResponse extends IResponse {
  user?: IUserProfile
}

type IProfilePayload = Partial<IUserProfile>

interface IloginPayload {
  email: string
  password: string
}

interface IregisterPayload {
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface IEmailPayload {
  email: string
}

interface IpasswordPayload {
  password: string
  confirmPassword: string
}

class UserModule extends HttpFactory {
  private RESOURCE = '/user'

  async login(payload: IloginPayload) {
    return await this.call(`${this.RESOURCE}/sign_in`, 'POST', payload)
  }

  logout() {
    // localStorage.removeItem('access_token')

    tokenController.deleteToken()
    const store = useUser()
    store.resetUserProfile()

    navigateTo('/')
  }

  async fetchProfile() {
    const store = useUser()

    if (process.client) {
      // const { data } = await useAsyncData<IProfileResponse>(() =>
      //   this.call(`${this.RESOURCE}/profile`, 'GET')
      // )

      // if (data?.value?.user) {
      //   store.userProfile = data.value.user
      // }

      const res = await this.call<IProfileResponse>(`${this.RESOURCE}/profile`, 'GET')

      if (res?.user) {
        store.userProfile = res.user
      }
    }
  }

  async update(payload: IProfilePayload) {
    try {
      const res = await this.call<IProfileResponse>(`${this.RESOURCE}/profile`, 'POST', payload)

      const store = useUser()

      if (res.user) {
        store.userProfile = res.user
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async isEmailRegister(payload: IEmailPayload) {
    return await this.call(`${this.RESOURCE}/isEmailRegister`, 'POST', payload)
  }

  async registration(payload: IregisterPayload) {
    return await this.call(`${this.RESOURCE}/sign_up`, 'POST', payload)
  }

  async resetPassword(payload: IpasswordPayload) {
    return await this.call(`${this.RESOURCE}/resetPassword`, 'POST', payload)
  }
}

export default UserModule
