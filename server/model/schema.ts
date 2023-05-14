import mongoose, { Schema, Document } from 'mongoose'

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
  purchasedCourses: string[]
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
    purchasedCourses: [{ type: String }]
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

export interface Course extends Document {
  title: string
  description: string
  price: number
  thumbnail: string
  teacherId: Object
  lessons: string[]
}

const courseSchema = new Schema<Course>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lessons: [{ type: String }]
})

export interface LiveStream extends Document {
  title: string
  description: string
  thumbnail: string
  teacherId: Object
  startTime: Date
  endTime: Date
}

const liveStreamSchema = new Schema<LiveStream>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String },
  teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true }
})

interface ChatMessage {
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
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  messages: [chatMessageSchema]
})

const User = mongoose.model<User>('User', userSchema)
const Order = mongoose.model<Order>('Order', orderSchema)
const Course = mongoose.model<Course>('Course', courseSchema)
const LiveStream = mongoose.model<LiveStream>('LiveStream', liveStreamSchema)
const LiveChat = mongoose.model<LiveChat>('LiveChat', liveChatSchema)

export default { User, Order, Course, LiveStream, LiveChat }
