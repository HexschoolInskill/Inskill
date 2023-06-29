export default defineEventHandler((event) => {
  return sendRedirect(event, '/user/courses/purchasedCourses', 302)
})
