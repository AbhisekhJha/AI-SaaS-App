export default defineEventHandler(async (event) => {
  try {
    await clearUserSession(event)

    return {
      success: true,
      message: 'Logged out successfully',
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to logout',
    })
  }
})