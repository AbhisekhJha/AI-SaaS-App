export default defineEventHandler(async (event) => {
  try {
    const { access_token } = await readBody(event)

    if (!access_token) {
      throw createError({
        statusCode: 400,
        message: 'Access token is required',
      })
    }

    const supabase = supabaseClient()
    const { data, error } = await supabase.auth.getUser(access_token)

    if (error || !data.user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid OAuth session',
      })
    }

    const metadata = data.user.user_metadata || {}
    const name =
      metadata.name ||
      metadata.full_name ||
      metadata.user_name ||
      metadata.preferred_username ||
      ''

    await setUserSession(event, {
      user: {
        id: data.user.id,
        email: data.user.email!,
        name,
      },
    })

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name,
      },
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'OAuth login failed',
    })
  }
})

