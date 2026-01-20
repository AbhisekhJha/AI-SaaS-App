export default defineEventHandler(async (event) => {
  try {
   
    const { name, email, password } = await readBody(event)

   
    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Name, email, and password are required',
      })
    }

   
    const supabase = supabaseClient()

  
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, 
      user_metadata: {
        name, 
      },
    })

    if (authError) {
      throw createError({
        statusCode: 400,
        message: authError.message,
      })
    }

   
    await setUserSession(event, {
      user: {
        id: authData.user.id,
        email: authData.user.email! ,
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
      message: error.message || 'Failed to register user',
    })
  }
})