/* eslint-disable */
// 老師開始直播課程
import Joi from 'joi'
import models, { Course } from '../../model/schema'
import { createLive } from '../../services/youtubeApi'
// import { createLive, startLive } from '../../services/youtubeApi'
import {
  getWebRTCAppList,
  createWebRTCApp,
  updateWebRTCAppEndPointList
} from '../../services/mediaServer'
const youtubeRTMPEndpoint = 'rtmp://a.rtmp.youtube.com/live2'
export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    chapterId: Joi.string().required(),
    lessonId: Joi.number().required()
  })

  try {
    const body = await readBody(event)
    const { error, value } = await schema.validate(body, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { userInfo, userID } = event.context.auth

    // check user is the teacher belong to course
    const { courseId, chapterId, lessonId } = value
    const course = (await models.Course.findById(courseId)) as Course // 添加類型斷言為 Course
    if (!course) {
      return createError({
        statusCode: 400,
        message: 'Course not found'
      })
    }
    const { teacherId } = course
    if (teacherId !== userID) {
      return createError({
        statusCode: 400,
        message: 'Permission deined, Only teacher can add lesson'
      })
    }
    // checkout chapter is exist in course
    const chapter = course.chapters.find((chapter) => chapter._id.toString() === chapterId)
    if (!chapter) {
      return createError({
        statusCode: 400,
        message: 'Chapter not found'
      })
    }
    // checkout lesson is exist in chapter
    const lesson = chapter.lessons.find((lesson) => lesson._id === lessonId)
    if (!lesson) {
      return createError({
        statusCode: 400,
        message: 'Lesson not found'
      })
    }
    // checkout lesson is live contentType
    if (lesson.contentType !== 'live') {
      return createError({
        statusCode: 400,
        message: 'Lesson is not live contentType'
      })
    }
    // create a live stream from youtubeApi
    const { success: liveResponseSuccess, data: liveResponse } = await createLive()
    if (!liveResponseSuccess) {
      return createError({
        statusCode: 400,
        message: 'Create live stream fail'
      })
    }
    // checkout which room in media server status is not broadcasting
    const { success: webRTCAppListResponseSuccess, data: webRTCAppListResponse } =
      await getWebRTCAppList()
    if (!webRTCAppListResponseSuccess) {
      return createError({
        statusCode: 400,
        message: 'Get webRTCAppList fail'
      })
    }
    const { data: webRTCAppList } = webRTCAppListResponse
    const webRTCApp = webRTCAppList.find((webRTCApp: any) => webRTCApp.status !== 'broadcasting')
    if (!webRTCApp) {
      // create new room in media server
      const { success: createWebRTCAppResponseSuccess, data: createWebRTCAppResponse } =
        await createWebRTCApp()
      if (!createWebRTCAppResponseSuccess) {
        return createError({
          statusCode: 400,
          message: 'Create webRTCApp fail'
        })
      }
      const { data: createWebRTCApp } = createWebRTCAppResponse
      // get streamId from data
      const { streamId } = createWebRTCApp
      // update webRTCApp endPointList
      const {
        success: updateWebRTCAppEndPointListResponseSuccess,
        data: updateWebRTCAppEndPointListResponse
      } = await updateWebRTCAppEndPointList(streamId, `${youtubeRTMPEndpoint}/${liveResponse.id}`)
      if (!updateWebRTCAppEndPointListResponseSuccess) {
        return createError({
          statusCode: 400,
          message: 'Update webRTCApp endPointList fail'
        })
      }
      // return webRTCApp streamId
      // const { streamId } = webRTCApp // streamId重複定義了 server端會報錯無法 run
      return {
        statusCode: 200,
        data: {
          streamId
        }
      }
    } else {
      // update webRTCApp endPointList
      const {
        success: updateWebRTCAppEndPointListResponseSuccess,
        data: updateWebRTCAppEndPointListResponse
      } = await updateWebRTCAppEndPointList(
        webRTCApp.streamId,
        `${youtubeRTMPEndpoint}/${liveResponse.id}`
      )
      if (!updateWebRTCAppEndPointListResponseSuccess) {
        return createError({
          statusCode: 400,
          message: 'Update webRTCApp endPointList fail'
        })
      }
      // return webRTCApp streamId
      const { streamId } = webRTCApp
      return {
        statusCode: 200,
        data: {
          streamId
        }
      }
    }
    // await startLive("7y0MA5WSVyg")
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
