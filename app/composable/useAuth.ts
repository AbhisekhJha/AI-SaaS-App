import { supabaseBrowserClient } from '~/utils/supabase'
import type { User } from "~/types";

export const useAuth = () => {
  const supabase = supabaseBrowserClient()

  const user = useState<User | null>('user', () => null);
  const isLoading = useState<boolean>('auth-loading', () => false);
  const errorMessage = useState<string>('auth-error-message', () => '');

  const isAuthenticated = computed(() => !!user.value)

  const clearError = () => {
    errorMessage.value = '';
  };

  const fetchUser = async () => {
    isLoading.value = true;
    try {
      const data = await $fetch<{ user: User }>('/api/auth/user')
      user.value = data?.user ?? null
    } catch {
      user.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  const login = async (email: string, password:  string) => {
    isLoading.value = true;
    errorMessage.value = '';

    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      })
      await fetchUser()
    } catch (error: any) {
      errorMessage.value = error.data?.message || 'Invalid email or password'
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const register = async (name: string, email: string, password: string) => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: { name, email, password },
      })
      await fetchUser()
    } catch (error: any) {
      errorMessage.value = error.data?.message || 'Failed to create account'
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
      user.value = null
      await navigateTo('/auth/login')
    } catch {
      errorMessage.value = 'Failed to logout'
    } finally {
      isLoading.value = false
    }
  }

  const loginWithProvider = async (provider: 'google' | 'github') => {
    isLoading.value = true
    errorMessage.value = ''
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      errorMessage.value = error?.message || 'Failed to login with provider'
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const completeOAuth = async () => {
    isLoading.value = true
    errorMessage.value = ''
    try {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session?.access_token) {
        throw error || new Error('OAuth session not found')
      }

      await $fetch('/api/auth/oauth', {
        method: 'POST',
        body: { access_token: data.session.access_token },
      })

      await fetchUser()
    } catch (error: any) {
      errorMessage.value = error?.message || 'OAuth login failed'
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    user,
    isLoading,
    errorMessage,
    isAuthenticated,
    // Methods
    clearError,
    fetchUser,
    login,
    register,
    logout,
    loginWithProvider,
    completeOAuth,
  }
}