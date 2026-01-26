<script setup lang="ts">

 defineProps<{
  title: string;
  description: string;
  icon: string;
  to: string;
  color?: string;
}>();
</script>

<template>
  <NuxtLink :to="to" class="block p-6 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow">
    <div class="flex items-start gap-4">
      <div :class="[color || 'bg-primary-500', 'p-3 rounded-lg']">
        <UIcon :name="icon" class="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">{{   description }}</p>
      </div>
    </div>
  </NuxtLink>
</template>
