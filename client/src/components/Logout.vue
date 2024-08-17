<script setup>
  import { useRouter } from 'vue-router'

  // Phosphor Icons
  import { PhSignOut } from '@phosphor-icons/vue'

  // UI elements
  import AsideButton from '@/components/AsideButton.vue'

  const router = useRouter()

  function logout() {
    localStorage.removeItem('token')

    router.push('/')
  }
</script>

<template>
  <AsideButton @click="logout">
    <PhSignOut size="17px" />
    {{ $t('button.logout') }}
  </AsideButton>
</template>
