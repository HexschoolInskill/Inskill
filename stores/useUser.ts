import { defineStore } from 'pinia'
import { CollectCourse } from '@/http/modules/courses'

interface UserApply {
  realName: string
  gender: string
  unit: string
  phone: string
  postNumber: number
  address: string
  facebookLink: string
  youtubeLink: string
  socialLink: string
  githubLink: string
  selfMedia: string
  description: string
  longDescription: string
}

export interface UserProfile {
  apply: UserApply
  _id: string
  username: string
  email: string
  expertise: string
  interests: string
  about: string
  isTeacher: boolean
  facebookLink: string
  youtubeLink: string
  githubLink: string
  socialLink: string
  purchasedCourses: any[]
  createdAt: string
  updatedAt: string
  avatar: string
  cartCourses: any[]
  collectCourses: CollectCourse[]
}

export default defineStore('user', () => {
  const userProfile = ref<UserProfile>({
    apply: {
      realName: '',
      gender: '',
      unit: '',
      phone: '',
      postNumber: 0,
      address: '',
      facebookLink: '',
      youtubeLink: '',
      socialLink: '',
      githubLink: '',
      selfMedia: '',
      description: '',
      longDescription: ''
    },
    _id: '',
    username: '',
    email: '',
    expertise: '',
    interests: '',
    about: '',
    isTeacher: false,
    facebookLink: '',
    youtubeLink: '',
    githubLink: '',
    socialLink: '',
    purchasedCourses: [],
    createdAt: '',
    updatedAt: '',
    avatar: '',
    cartCourses: [],
    collectCourses: []
  })

  function resetUserProfile() {
    userProfile.value = {
      apply: {
        realName: '',
        gender: '',
        unit: '',
        phone: '',
        postNumber: 0,
        address: '',
        facebookLink: '',
        youtubeLink: '',
        socialLink: '',
        githubLink: '',
        selfMedia: '',
        description: '',
        longDescription: ''
      },
      _id: '',
      username: '',
      email: '',
      expertise: '',
      interests: '',
      about: '',
      isTeacher: false,
      facebookLink: '',
      youtubeLink: '',
      githubLink: '',
      socialLink: '',
      purchasedCourses: [],
      createdAt: '',
      updatedAt: '',
      avatar: '',
      cartCourses: [],
      collectCourses: []
    }
  }

  return {
    userProfile,
    resetUserProfile
  }
})
