<script setup lang="ts">
import { sidebarRoutes } from '~~/constants/tools'
import { ref } from 'vue'
import { useAuth } from '~/composable/useAuth'

const open = ref(false)
const { user, logout } = useAuth()

async function handleLogout() {
  await logout()
}
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

      <!-- Right side: Theme toggle & User menu -->
      <div class="flex items-center gap-2">
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
