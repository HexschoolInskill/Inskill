// 讀取 收藏課程

import models, { Course, User, LiveStream } from '../../model/schema'

export default defineEventHandler(async (event) => {
    try {
        const {userID, userInfo} = event.context.auth
        return {
            success: true,
            collect : userInfo?.collect || []
        }
    } catch (error : any) {
        return {
            success: false,
            message: error
        }
    }
})