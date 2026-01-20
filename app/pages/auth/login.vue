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

const { login, isLoading, errorMessage, clearError } = useAuth();
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
       duration: 1000,
     });
     await navigateTo("/dashboard");
  } catch (error:  any) {
    
    errorMessage.value = error.data?.message || "Failed to login";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <UContainer class="flex items-center justify-center sm:p-4 sm:min-w-160">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center mb-4">
          <h2 class="text-xl font-semibold">Welcome to Nuxt AI</h2>
        </div>
      </template>
      <div class="space-y-4">
        
        <UAlert
          v-if="errorMessage"
          color="error"
          variant="soft"
          :title="errorMessage"
          icon="i-heroicons-exclamation-triangle"
        />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <UButton
            color="neutral"
            variant="outline"
            icon="i-mdi:google"
            class="justify-center"
            :loading="false"
            :disabled="false"
          >
            Continue with Google
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            icon="i-mdi:github"
            class="justify-center"
            :loading="false"
            :disabled="false"
          >
            Continue with Github
          </UButton>
        </div>
        <USeparator label="OR" />
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Email" name="email" required>
            <UInput
              v-model="state.email"
              placeholder="Enter your email"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Password" name="password" required>
            <UInput
              v-model="state.password"
              type="password"
              placeholder="Enter your password"
              class="w-full"
            />
          </UFormField>

          <UButton type="submit" color="primary" block :loading="isLoading"> Sign In </UButton>
        </UForm>

        <div class="text-center text-sm">
          Don't have an account?
          <UButton
            variant="link"
            color="primary"
            :disabled="false"
            to="/auth/register"
            class="-ml-2"
          >
            Sign up
          </UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
