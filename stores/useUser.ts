import { defineStore } from 'pinia'

export interface IUserProfile {
  _id: string
  username: string
  email: string
  expertise: string
  interests: string
  about: string
  isTeacher: boolean
  avatar: string
  facebookLink: string
  youtubeLink: string
  githubLink: string
  socialLink: string
  purchasedCourses: []
  collectCourses: []
}

export default defineStore('user', () => {
  const userProfile = ref<IUserProfile>({
    _id: '',
    username: '',
    email: '',
    expertise: '',
    interests: '',
    about: '',
    isTeacher: false,
    avatar: '',
    facebookLink: '',
    youtubeLink: '',
    githubLink: '',
    socialLink: '',
    purchasedCourses: [],
    collectCourses: []
  })

  function resetUserProfile() {
    userProfile.value = {
      _id: '',
      username: '',
      email: '',
      expertise: '',
      interests: '',
      about: '',
      isTeacher: false,
      avatar: '',
      facebookLink: '',
      youtubeLink: '',
      githubLink: '',
      socialLink: '',
      purchasedCourses: [],
      collectCourses: []
    }
  }

  return {
    userProfile,
    resetUserProfile
  }
})
