import type { User } from "~/types";

export const useAuth = () => {
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
  }
}