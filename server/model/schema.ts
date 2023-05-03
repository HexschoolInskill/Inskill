import mongoose, { Schema, Document } from 'mongoose'

export interface User extends Document {
  username: string
  email: string
  password: string
  expertise: string
  interests: string
  about: string
  is_teacher: boolean
  facebook_links: string
  youtube_links: string
  github_links: string
  social_links: string
  purchased_courses: string[]
  created_at: Date
  updated_at: Date
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  expertise: { type: String, default: '' },
  interests: { type: String, default: '' },
  about: { type: String, default: '' },
  is_teacher: { type: Boolean, default: false },
  facebook_links: { type: String, default: '' },
  youtube_links: { type: String, default: '' },
  github_links: { type: String, default: '' },
  social_links: { type: String, default: '' },
  purchased_courses: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

export interface Order extends Document {
  user_id: Object
  course_id: Object
  price: number
  order_date: Date
}

const orderSchema = new Schema<Order>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  price: { type: Number, required: true },
  order_date: { type: Date, default: Date.now }
})

export interface Course extends Document {
  title: string
  description: string
  price: number
  thumbnail: string
  teacher_id: Object
  lessons: string[]
}

const courseSchema = new Schema<Course>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  teacher_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lessons: [{ type: String }]
})

export interface LiveStream extends Document {
  title: string
  description: string
  thumbnail: string
  teacher_id: Object
  start_time: Date
  end_time: Date
}

const liveStreamSchema = new Schema<LiveStream>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String },
  teacher_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true }
})

interface ChatMessage {
  user_id: Object
  username: string
  timestamp: Date
  message: string
}

export interface LiveChat extends Document {
  course_id: Object
  messages: ChatMessage[]
}

const chatMessageSchema = new Schema<ChatMessage>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  message: { type: String, required: true }
})

const liveChatSchema = new Schema<LiveChat>({
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  messages: [chatMessageSchema]
})

const User = mongoose.model<User>('User', userSchema)
const Order = mongoose.model<Order>('Order', orderSchema)
const Course = mongoose.model<Course>('Course', courseSchema)
const LiveStream = mongoose.model<LiveStream>('LiveStream', liveStreamSchema)
const LiveChat = mongoose.model<LiveChat>('LiveChat', liveChatSchema)

export default { User, Order, Course, LiveStream, LiveChat }
