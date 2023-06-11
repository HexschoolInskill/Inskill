import HttpFactory from '../factory'
import useUser, { UserProfile } from '~/stores/useUser'

interface IProfileResponse extends Response {
  user?: UserProfile
}

type ProfilePayload = Partial<UserProfile>

interface LoginPayload {
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

  async login(payload: LoginPayload) {
    return await this.call(`${this.RESOURCE}/sign_in`, 'POST', payload)
  }

  async logout() {
    await this.call(`${this.RESOURCE}/sign_out`, 'POST')
    const userStore = useUser()
    const token = useToken()
    userStore.resetUserProfile()
    token.deleteToken()

    navigateTo('/')
  }

  async fetchProfile() {
    const store = useUser()
    const { data } = await useAsyncData<IProfileResponse>(() =>
      this.call(`${this.RESOURCE}/profile`, 'GET')
    )

    if (data?.value?.user) {
      store.userProfile = data.value.user
    }
  }

  async update(payload: ProfilePayload) {
    const res = await this.call<IProfileResponse>(`${this.RESOURCE}/profile`, 'POST', payload)

    const store = useUser()

    if (res.user) {
      store.userProfile = res.user
    }
  }

  async updateAvatar(avatarFormData: FormData) {
    const res = await this.call<IProfileResponse>(
      `${this.RESOURCE}/profile`,
      'POST',
      avatarFormData,
      {
        'Content-Type': 'multipart/form-data'
      }
    )
    const store = useUser()
    if (res.user) {
      store.userProfile = res.user
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
