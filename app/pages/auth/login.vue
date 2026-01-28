<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { useAuth } from "~/composable/useAuth";

const schema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const { login, loginWithProvider, isLoading, errorMessage, clearError } = useAuth();
const toast = useToast();

onMounted(() => {
  clearError();
});


async function onSubmit(event: FormSubmitEvent<Schema>) {
   isLoading.value = true;
  errorMessage.value = "";

  try {

    
    
     await login(event.data.email, event.data.password);
    toast.add({
      title: "Login successful",
      description: "Welcome back!",
      color: "success",
       duration: 2000,
     });
     await navigateTo("/dashboard");
  } catch (error:  any) {
    
    errorMessage.value = error.data?.message || "Failed to login";
  } finally {
    isLoading.value = false;
  }
}

async function signInWithGoogle() {
  await loginWithProvider('google')
}

async function signInWithGithub() {
  await loginWithProvider('github')
}
</script>

<template>
  <div class="min-h-screen bg-black text-white flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 mb-4">
          <UIcon name="i-heroicons-bolt" class="w-6 h-6 text-white" />
        </div>
        <h1 class="text-2xl font-bold mb-2">Welcome back</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Sign in to continue to NuxtAI</p>
      </div>

      <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6">
       
        <UAlert
          v-if="errorMessage"
          color="error"
          variant="soft"
          :title="errorMessage"
          icon="i-heroicons-exclamation-triangle"
          class="mb-4"
        />

       
        <div class="grid grid-cols-2 gap-3 mb-6">
          <UButton
            color="neutral"
            variant="outline"
            icon="i-mdi:google"
            class="justify-center"
            size="lg"
            @click="signInWithGoogle"
          >
            Google
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            icon="i-mdi:github"
            class="justify-center"
            size="lg"
            @click="signInWithGithub"
          >
            GitHub
          </UButton>
        </div>

        
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-3 bg-white dark:bg-gray-800/50 text-gray-500">or continue with email</span>
          </div>
        </div>

        
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Email" name="email" required>
            <UInput
              v-model="state.email"
              placeholder="you@example.com"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Password" name="password" required>
            <UInput
              v-model="state.password"
              type="password"
              placeholder="••••••••"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <UButton
            type="submit"
            block
            size="lg"
            :loading="isLoading"
            class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white mt-2"
          >
            Sign In
          </UButton>
        </UForm>

        
        <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don't have an account?
          <NuxtLink to="/auth/register" class="text-red-500 hover:text-red-600 font-medium">
            Sign up
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
