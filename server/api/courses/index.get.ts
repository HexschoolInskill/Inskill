import models from '../../model/schema'

export default defineEventHandler(async () => {
  try {
    // const findLessonContentDetail: any = await models.Course.findOne(
    //   { 'chapters.lessons.lessonContent._id': lessonContentId },
    //   { 'chapters.lessons.lessonContent.$': 1 }
    // ) as Course
    // for (const chapter of findLessonContentDetail.chapters) {
    //   for (const lesson of chapter.lessons) {
    //     lesson.lessonContent = lesson.lessonContent
    //       .filter((content: any) => content._id.toString() !== lessonContentId)
    //       .map((content: any, index: number) => ({
    //         ...content,
    //         sort: index + 1
    //       }))
    //   }
    // }
    // const result = await findLessonContentDetail.save() // 可以針對正確的 lessonConent 剃除資料且重排 sort，但無法儲存至正確的 lessonContent

    const lessonContentId = '648eca010412adb32b14de92'
    const findCourse: any = await models.Course.findOne(
      { 'chapters.lessons.lessonContent._id': lessonContentId },
      { teacherId: 1, 'chapters.lessons.$': 1, 'chapters._id': 1 }
    )

    const courseId = findCourse._id
    const chapterId = findCourse.chapters[0]._id
    const lessonId = '648ec4c4e7cd29a73127deeb'
    const result = await models.Course.findOneAndUpdate(
      { _id: courseId },
      {
        $pull: { 'chapters.$[chapter].lessons.$[lesson].lessonContent': { _id: lessonContentId } }
      },
      { new: true, arrayFilters: [{ 'chapter._id': chapterId }, { 'lesson._id': lessonId }] }
    )

    return {
      success: true,
      result
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
