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
      realName: { type: String },
      gender: { type: String },
      unit: { type: String },
      phone: { type: String },
      postNumber: { type: Number },
      address: { type: String },
      description: { type: String },
      longDescription: { type: String },
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
  orderCourses: CourseContent[]
  price: number
}
const orderSchema = new Schema<Order>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderCourses: [courseContent],
    price: { type: Number, required: true }
  },
  { timestamps: true }
)

export interface LessonContent extends Document {
  contentType: string
  content: string
  duration?: number
  sort: number
}
const lessonContentSchema = new Schema<LessonContent>(
  {
    contentType: { type: String },
    content: { type: String },
    duration: { type: Number },
    sort: { type: Number }
  },
  { timestamps: true }
)

export interface Reply extends Document {
  userId: Object
  comment: string
}

export interface Question extends Document {
  userId: Object
  comment: string
  replies: Reply[]
}

const replySchema = new Schema<Reply>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String }
  },
  { timestamps: true }
)

const questionSchema = new Schema<Question>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String },
    replies: [replySchema]
  },
  { timestamps: true }
)

export interface Lesson extends Document {
  title: string
  description: string
  freePreview: boolean
  sort: number
  isPublish: boolean
  lessonContent: LessonContent[]
  question: Question[]
}
const lessonSchema = new Schema<Lesson>(
  {
    title: { type: String },
    description: { type: String },
    freePreview: { type: Boolean, default: false },
    sort: { type: Number },
    isPublish: { type: Boolean, default: false },
    lessonContent: [lessonContentSchema],
    question: [questionSchema]
  },
  { timestamps: true }
)

export interface Chapter extends Document {
  title: string
  description: string
  sort: number
  lessons: Lesson[]
}
const chapterSchema = new Schema<Chapter>(
  {
    title: { type: String },
    description: { type: String },
    sort: { type: Number },
    lessons: [lessonSchema]
  },
  { timestamps: true }
)

export interface Review extends Document {
  userId: Object
  rating: number
  comment: string
}
const reviewSchema = new Schema<Review>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number },
    comment: { type: String }
  },
  { timestamps: true }
)

export interface Course extends Document {
  title: string
  description: string
  price: number
  purchasedCount: number
  thumbnail: string
  teacherId: Object
  isPublic: boolean
  chapters: Chapter[]
  reviews: Review[]
}
const courseSchema = new Schema<Course>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    purchasedCount: { type: Number, default: 0 },
    thumbnail: { type: String, default: '' },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublic: { type: Boolean, default: false },
    chapters: [chapterSchema],
    reviews: [reviewSchema]
  },
  { timestamps: true }
)

export interface LiveCourse extends Document {
  title: string
  description: string
  price: number
  purchasedCount: number
  thumbnail: string
  teacherId: Object
  videoUrl: string
  startTime: Date
  endTime: Date
  reviews: Review[]
}
const liveCourseSchema = new Schema<LiveCourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number },
    purchasedCount: { type: Number, default: 0 },
    thumbnail: { type: String, default: '' },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    videoUrl: { type: String, default: '' },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    reviews: [reviewSchema]
  },
  { timestamps: true }
)

export interface ChatMessage extends Document {
  userId: Object
  username: string
  timestamp: Date
  message: string
}
const chatMessageSchema = new Schema<ChatMessage>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    message: { type: String, required: true }
  },
  { timestamps: true }
)

export interface LiveChat extends Document {
  courseId: Object
  messages: ChatMessage[]
}
const liveChatSchema = new Schema<LiveChat>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'LiveCourse', required: true },
    messages: [chatMessageSchema]
  },
  { timestamps: true }
)

export interface CourseCategory extends Document {
  courseCategory: string
}

const courseCategorySchema = new Schema<CourseCategory>(
  {
    courseCategory: { type: String, required: true }
  },
  { timestamps: true }
)

const User = mongoose.model<User>('User', userSchema)
const Order = mongoose.model<Order>('Order', orderSchema)
const Course = mongoose.model<Course>('Course', courseSchema)
const LiveCourse = mongoose.model<LiveCourse>('LiveCourse', liveCourseSchema)
const LiveChat = mongoose.model<LiveChat>('LiveChat', liveChatSchema)
const CourseCategory = mongoose.model<CourseCategory>('CourseCategory', courseCategorySchema)

export default { User, Order, Course, LiveCourse, LiveChat, CourseCategory }
