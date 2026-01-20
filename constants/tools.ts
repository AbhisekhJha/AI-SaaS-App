import type { NavigationMenuItem } from '@nuxt/ui';
export const sidebarRoutes: NavigationMenuItem[][] = [
  [
    {
      label: 'Conversation',
      icon: 'i-heroicons-chat-bubble-left-right',
      to: '/dashboard/conversation'
    },
    {
      label: 'Code Generator',
      icon: 'i-heroicons-code-bracket',
      to: '/dashboard/code'
    },
    {
      label: 'AI Article Writer',
      icon: 'i-heroicons-document-text',
      to: '/dashboard/write-article'
    },
    {
      label: 'Blog Title Generator',
      icon: 'i-heroicons-light-bulb',
      to: '/dashboard/generate-blog-title'
    }
  ]
]
