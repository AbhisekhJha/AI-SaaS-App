import type { User } from '~/types'

export default defineNuxtRouteMiddleware(async () => {
  const user = useState<User | null>('user', () => null)

  if (user.value) {
    return
  }

  try {
    const $api = useRequestFetch()
    const data = await $api<{ user: User }>('/api/auth/user')

    if (data?.user) {
      user.value = data.user
      return
    }
  } catch {
    
  }

  return navigateTo('/auth/login')
})