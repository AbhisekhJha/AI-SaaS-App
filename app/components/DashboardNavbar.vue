<script setup lang="ts">
import { sidebarRoutes } from '~~/constants/tools'
import { onMounted, ref } from 'vue'
import { useAiUsage } from '~/composable/useAiUsage'
import { useAuth } from '~/composable/useAuth'

const open = ref(false)
const { user, logout } = useAuth()
const { usage, usagePercent, limitReached, refreshUsage } = useAiUsage()

async function handleLogout() {
  await logout()
}

onMounted(() => {
  refreshUsage()
})
</script>

<template>
  <div
    class="fixed h-16 top-0 right-0 left-0 sm:left-72 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
  >
    <UContainer class="flex h-full items-center justify-between sm:justify-end">
      <UDrawer
        v-model:open="open"
        direction="left"
        :handle="false"
        :ui="{
          header: 'flex items-center justify-between',
          container: 'p-0 w-72 gap-0',
        }"
      >
        <UButton color="neutral" variant="subtle" icon="i-lucide-menu" class="sm:hidden" />
        <template #header>
          <Logo />
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-x"
            @click="open = false"
          />
        </template>

        <template #body>
          <div class="flex flex-col h-full">
            <div class="flex-1 overflow-y-auto">
                    <USeparator />
                    <div class="px-3 py-4">
                        <UNavigationMenu
                            :items="sidebarRoutes"
                            orientation="vertical"
                            class="data-[orientation-vertical]:w-full"
                            :ui="{label: 'py-2.5', link: 'py-3' }"
                        />
                    </div>
                    
                </div>
          </div>
        </template>
      </UDrawer>

    
      <div class="flex items-center gap-2">
        <div v-if="usage && !limitReached" class="hidden sm:flex items-center gap-2 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/60">
          <span class="text-[11px] text-gray-500 dark:text-gray-400">{{ usage.count }}/{{ usage.limit }}</span>
          <div class="w-16 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div class="h-full bg-red-500 transition-all" :style="{ width: `${usagePercent}%` }" />
          </div>
        </div>
        <UButton
          v-else-if="limitReached"
          size="xs"
          color="primary"
          class="hidden sm:inline-flex"
        >
          Upgrade
        </UButton>
        <ThemeToggler />
        
        <UDropdownMenu
          v-if="user"
          :items="[
            [
              {
                label: 'Logout',
                icon: 'i-lucide-log-out',
                onSelect: handleLogout,
              },
            ],
          ]"
        >
          <UButton color="neutral" variant="ghost" class="flex items-center gap-2">
            <UIcon name="i-lucide-user" />
            <span class="hidden sm:inline">{{ user.name || user.email }}</span>
            <UIcon name="i-lucide-chevron-down" class="w-4 h-4" />
          </UButton>
        </UDropdownMenu>
      </div>
    </UContainer>
  </div>
</template>
