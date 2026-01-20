<script setup lang="ts">
 const mode= useColorMode();
 const isDark = computed({
   get: () => mode.value === "dark",
   set: (val: boolean) => {
     mode.value = val ? "dark" : "light";
   },
 });
</script>

<template>
   <UButton
      :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      color="neutral"
      variant="ghost"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      @click="isDark = !isDark"
    />
</template>