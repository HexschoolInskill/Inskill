import HttpFactory from '../factory'
import useUser, { IUserProfile } from '~/stores/useUser'

interface IProfileResponse extends IResponse {
  user?: IUserProfile
}

type IProfilePayload = Partial<IUserProfile>

class UserModule extends HttpFactory {
  private RESOURCE = '/user'
  async fetchProfile() {
    const store = useUser()

    const { data } = await useAsyncData<IProfileResponse>(() =>
      this.call(`${this.RESOURCE}/profile`, 'GET')
    )

    if (data?.value?.user) {
      store.userProfile = data.value.user
    }
  }

  async update(payload: IProfilePayload) {
    const res = await this.call<IProfileResponse>(`${this.RESOURCE}/profile`, 'POST', payload)
    const store = useUser()

    if (res.user) {
      store.userProfile = res.user
    }
  }
}

export default UserModule
