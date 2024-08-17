<script setup>
  import { RouterView } from 'vue-router'

  // Layouts
  import StartLayout from '@/layouts/StartLayout.vue'
</script>

<template>
  <StartLayout :view="$route.name" />
  <RouterView />
</template>
