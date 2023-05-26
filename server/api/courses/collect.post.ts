// 收藏課程 

import models from '../../model/schema'
import Joi from 'joi'

export default defineEventHandler(async (event) => {
    const schema = Joi.object({
        courseId: Joi.string().required(),
        collect : Joi.boolean().required()
    }) 
    try {
        const {userInfo} = event.context.auth
        
        const body = await readBody(event)
        const { error, value } = await schema.validate(body, { abortEarly: true })
        if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
        const { courseId, collect } = value
        // checkout courseId whether exist in userInfo's collect
        const course = await models.Course.findById(courseId)
        if (!course) throw new Error('course not found')
        const collectIndex = userInfo.collect.findIndex((id : string) => id === courseId)
        if (collect && collectIndex === -1) {
            userInfo.collect.push(courseId)
        }
        if (!collect && collectIndex !== -1) {
            userInfo.collect.splice(collectIndex, 1)
        }
        await userInfo.save()
        return {
            success: true,
            collect : userInfo.collect
        }
    } catch (error : any) {
        return {
            success: false,
            message: error
        }
    }
})