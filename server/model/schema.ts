import mongoose, { Schema, Document } from 'mongoose'

export interface CourseContent extends Document {
  courseId: Object
  courseType: string
}
const courseContent = new Schema<CourseContent>({
  courseId: { type: Schema.Types.ObjectId, required: true },
  courseType: { type: String, required: true }
})

export interface User extends Document {
  username: string
  email: string
  password: string
  expertise: string
  interests: string
  about: string
  isTeacher: boolean
  avatar: string
  facebookLink: string
  youtubeLink: string
  githubLink: string
  socialLink: string
  collectCourses: CourseContent[]
  cartCourses: CourseContent[]
  purchasedCourses: CourseContent[]
  apply: Object
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    expertise: { type: String, default: '' },
    interests: { type: String, default: '' },
    about: { type: String, default: '' },
    isTeacher: { type: Boolean, default: false },
    avatar: { type: String, default: '' },
    facebookLink: { type: String, default: '' },
    youtubeLink: { type: String, default: '' },
    githubLink: { type: String, default: '' },
    socialLink: { type: String, default: '' },
    collectCourses: [courseContent],
    cartCourses: [courseContent],
    purchasedCourses: [courseContent],
    apply: {
      realName: { type: String, required: true },
      gender: { type: String, required: true },
      unit: { type: String, required: true },
      phone: { type: Number, required: true },
      postNumber: { type: Number, required: true },
      address: { type: String, required: true },
      description: { type: String, required: true },
      longDescription: { type: String, required: true },
      facebookLink: { type: String, default: '' },
      youtubeLink: { type: String, default: '' },
      githubLink: { type: String, default: '' },
      socialLink: { type: String, default: '' },
      selfMedia: { type: String, default: '' }
    }
  },
  { timestamps: true }
)

export interface Order extends Document {
  userId: Object
  courseId: Object
  price: number
  orderDate: Date
}

const orderSchema = new Schema<Order>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  price: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
})

export interface Lesson extends Document {
  title: string
  description: string
  contentType: string
  content: string
  duration: number
  sort: number
}

export interface Chapter extends Document {
  title: string
  description: string
  sort: number
  lessons: Lesson[]
}

export interface Review extends Document {
  userId: Object
  rating: number
  comment: string
  createdAt: Date
}

export interface Course extends Document {
  title: string
  description: string
  price: number
  thumbnail: string
  teacherId: Object
  chapters: Chapter[]
  reviews: Review[]
}

const lessonSchema = new Schema<Lesson>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  contentType: { type: String, required: true },
  content: { type: String, default: '' },
  duration: { type: Number, default: 0 },
  sort: { type: Number, required: true }
})

const chapterSchema = new Schema<Chapter>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  sort: { type: Number, required: true },
  lessons: [lessonSchema]
})

const reviewSchema = new Schema<Review>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const courseSchema = new Schema<Course>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, default: '' },
  teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chapters: [chapterSchema],
  reviews: [reviewSchema]
})

export interface LiveCourse extends Document {
  title: string
  description: string
  price: number
  thumbnail: string
  teacherId: Object
  videoUrl: string
  startTime: Date
  endTime: Date
  reviews: Review[]
}

const liveCourseSchema = new Schema<LiveCourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, default: '' },
  teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  videoUrl: { type: String, default: '' },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  reviews: [reviewSchema]
})

export interface ChatMessage extends Document {
  userId: Object
  username: string
  timestamp: Date
  message: string
}

export interface LiveChat extends Document {
  courseId: Object
  messages: ChatMessage[]
}

const chatMessageSchema = new Schema<ChatMessage>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  message: { type: String, required: true }
})

const liveChatSchema = new Schema<LiveChat>({
  courseId: { type: Schema.Types.ObjectId, ref: 'LiveCourse', required: true },
  messages: [chatMessageSchema]
})

const User = mongoose.model<User>('User', userSchema)
const Order = mongoose.model<Order>('Order', orderSchema)
const Course = mongoose.model<Course>('Course', courseSchema)
const LiveCourse = mongoose.model<LiveCourse>('LiveCourse', liveCourseSchema)
const LiveChat = mongoose.model<LiveChat>('LiveChat', liveChatSchema)

export default { User, Order, Course, LiveCourse, LiveChat }
