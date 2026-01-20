<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { useAuth } from "~/composable/useAuth";

const schema = z
  .object({
    name: z.string().trim().min(5, "Must be at least 5 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
});

const { register, isLoading, errorMessage, clearError } = useAuth();
 const toast = useToast();
onMounted(() => {
  clearError();
});


async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true;
  errorMessage.value = "";
 

  try {
    
    
      await register(event.data.name, event.data.email, event.data.password);
      toast.add({
        title: "Account created successfully",
        description: "You can now log in with your credentials.",
        color: "success",
        duration: 3000,
      });
      await navigateTo("/auth/login");
  } catch (error: any) {
    errorMessage.value = error.data?.message || "Failed to create account";
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
          <h2 class="text-xl font-semibold">Create your account</h2>
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
        <UFormField label="Name" name="name" required>
            <UInput v-model="state.name" placeholder="Enter your name" class="w-full" />
          </UFormField>

          <UFormField label="Email" name="email"  required>
            <UInput v-model="state.email" placeholder="Enter your email" class="w-full" />
          </UFormField>

          <UFormField label="Password" name="password" required>
            <UInput v-model="state.password" type="password" placeholder="Enter your password" class="w-full" />
          </UFormField>

            <UFormField label="Confirm Password" name="confirmPassword" required>
                <UInput v-model="state.confirmPassword" type="password" placeholder="Confirm your password" class="w-full" />
          </UFormField>

          <UButton type="submit" color="primary" block :loading="isLoading"> Create Account </UButton>
        </UForm>

        <div class="text-center text-sm">
          Already have an account? 
          <UButton
            variant="link"
            color="primary"
            :disabled="false"
            to="/auth/login"
            class="-ml-2"
          >
            Sign in
          </UButton>
      </div>
        </div>
    </UCard>
  </UContainer>
</template>
