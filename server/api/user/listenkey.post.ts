import Joi from 'joi'
import CryptoJS from 'crypto-js'
import models from '../../model/schema'
export default defineEventHandler(async (event) => {
  const profileSchema = Joi.object({
    courseId: Joi.string().required()
  })
  const body = await readBody(event)
  try {
    const { error, value } = profileSchema.validate(body, { abortEarly: true })
    if (error)
      throw new Error(
        error.details
          .map((e) => {
            return e.message
          })
          .join(', ')
      )

    const { courseId } = value

    const { userInfo, userID } = event.context.auth
    const { purchasedCourses } = userInfo
    // checkout courseId and courseType == LiveCourse
    const purchasedCourse = purchasedCourses.find((course: any) => {
      return course.courseId === courseId && course.courseType === 'LiveCourse'
    })
    // LiveCourse db check whether userId is teacher and courseId is valid
    const isTeacher = await models.LiveCourse.findOne({
      _id: courseId,
      teacherId: userID
    })
    if (!purchasedCourse && !isTeacher) {
      throw new Error('course does not exist')
    }
    // generate listenKey for this courseId and expires set to 3 hours
    const message = {
      timestamp: Date.now(),
      expire: Date.now() + 24 * 60 * 60 * 1000,
      courseId,
      userId: userInfo.id
    }
    const listenkey = CryptoJS.AES.encrypt(JSON.stringify(message), 'socketKey', {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString()

    return {
      success: true,
      statusCode: 200,
      data: {
        listenkey
      }
    }
  } catch (error: any) {
    return {
      success: false,
      statusCode: 400,
      message: error.message
    }
  }
})
