export default defineNuxtRouteMiddleware(async () => {

  const { data, error } = await useFetch('/api/auth/user');

  if (error.value || !data.value?.user) {
    return navigateTo('/auth/login');
  }
});