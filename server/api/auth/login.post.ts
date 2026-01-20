export default defineEventHandler(async (event) => {
  try {
   
    const { email, password } = await readBody(event)

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password are required',
      })
    }

    const supabase = supabaseClient()

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      throw createError({
        statusCode: 401,
        message: 'Invalid email or password',
      })
    }

    const name = authData.user.user_metadata?.name || ''

    await setUserSession(event, {
      user:  {
        id: authData.user.id,
        email: authData.user.email!,
        name: name,
      },
    })

    return {
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: name,
      },
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to login',
    })
  }
})