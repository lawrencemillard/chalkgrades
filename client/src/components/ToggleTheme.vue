<script setup>
  // Phosphor Icons
  import { PhPalette } from '@phosphor-icons/vue'

  // UI elements
  import AsideButton from '@/components/AsideButton.vue'

  function toggleTheme() {
    console.log('Toggling theme')

    localStorage.theme = localStorage.theme == 'light' ? 'dark' : 'light'

    if (
      localStorage.theme == 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
</script>

<template>
  <AsideButton @click="toggleTheme()">
    <PhPalette size="17px" />
    {{ $t('button.changetheme') }}
  </AsideButton>
</template>
