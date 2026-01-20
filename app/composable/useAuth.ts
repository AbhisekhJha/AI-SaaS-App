import type { User } from "~/types";

export const useAuth = () => {
  const user = useState<User | null>('user', () => null);
  const isLoading = useState<boolean>('auth-loading', () => false);
  const errorMessage = useState<string>('auth-error-message', () => '');

  const clearError = () => {
    errorMessage.value = '';
  };

  const fetchUser = async () => {
    isLoading.value = true;
    try {
      const { data, error } = await useFetch('/api/auth/user');
      if (! error.value && data.value) {
        user.value = data.value.user;
      } else {
        user.value = null;
      }
    } catch (error: any) {
      user.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  const login = async (email: string, password:  string) => {
    isLoading.value = true;
    errorMessage.value = '';
    
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      await fetchUser();
      return response;
    } catch (error: any) {
      errorMessage.value = error.data?.message || 'Failed to login';
      throw error; 
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    isLoading.value = true;
    errorMessage.value = '';
    
    try {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: { name, email, password },
      });
      await fetchUser();
      return response;
    } catch (error: any) {
      errorMessage.value = error.data?.message || 'Failed to create account';
      throw error; 
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    isLoading.value = true;
    
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST',
      });
      user.value = null;
      await navigateTo('/auth/login');
    } catch (error: any) {
      errorMessage.value = 'Failed to logout';
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    user,
    isLoading,
    errorMessage,
    clearError,
    fetchUser,
    login,
    register,
    logout,
  };
};