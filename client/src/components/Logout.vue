<script setup>
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/userStore'

  const store = useUserStore()

  // Phosphor Icons
  import { PhSignOut } from '@phosphor-icons/vue'

  // UI elements
  import AsideButton from '@/components/AsideButton.vue'

  const router = useRouter()

  function logout() {
    localStorage.removeItem('token')
    store.$reset()
    router.push('/')
  }
</script>

<template>
  <AsideButton @click="logout">
    <PhSignOut weight="bold" size="17px" />
    {{ $t('button.logout') }}
  </AsideButton>
</template>
