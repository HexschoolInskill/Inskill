// @ts-nocheck
/* eslint-disable */
// 老師開始直播課程
import Joi from 'joi'
import models from '../../model/schema'
import { createLive } from '../../services/youtubeApi'
// import { createLive, startLive } from '../../services/youtubeApi'
import { createWebRTCApp, updateWebRTCAppEndPointList } from '../../services/mediaServer'
import { model } from 'mongoose'
const youtubeRTMPEndpoint = 'rtmp://a.rtmp.youtube.com/live2'
export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    courseId: Joi.string().required()
    // chapterId: Joi.string().required(),
    // lessonId: Joi.number().required()
  })
  try {
    const body = await readBody(event)
    const { error, value } = await schema.validate(body, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { userInfo, userID } = event.context.auth

    // check user is the teacher belong to LiveCourse
    const { courseId } = value
    const liveCourse = await models.LiveCourse.findById(courseId)
    if (!liveCourse) {
      return createError({
        statusCode: 400,
        message: 'LiveCourse not found'
      })
    }
    if (liveCourse.teacherId.toString() !== userID) {
      return createError({
        statusCode: 400,
        message: 'User is not the teacher belong to LiveCourse'
      })
    }

    // create a live stream from youtubeApi
    // const { success: liveResponseSuccess, data: liveResponse } = await createLive()
    // if (!liveResponseSuccess) {
    //   return createError({
    //     statusCode: 400,
    //     message: 'Create live stream fail'
    //   })
    // }
    // create new stream in media server with course title
    const courseTitle = liveCourse.title
    const { success: createWebRTCAppResponseSuccess, data: createWebRTCAppResponse } = await createWebRTCApp(courseTitle)
    if (!createWebRTCAppResponseSuccess) {
      return createError({
        statusCode: 400,
        message: 'Create webRTCApp fail'
      })
    }
    const { streamId } = createWebRTCAppResponse
    console.log('streamId', streamId)
    // update streamId into db's video url
    liveCourse.videoUrl = streamId
    await liveCourse.save()
    // update webRTCApp endPointList
    // const {
    //     success: updateWebRTCAppEndPointListResponseSuccess,
    // } = await updateWebRTCAppEndPointList(streamId, `${youtubeRTMPEndpoint}/${liveResponse.id}`)

    // if (!updateWebRTCAppEndPointListResponseSuccess) {
    //     return createError({
    //         statusCode: 400,
    //         message: 'Update webRTCApp endPointList fail'
    //     })
    // }
    return {
      statusCode: 200,
      data: {
        streamId
      }
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
