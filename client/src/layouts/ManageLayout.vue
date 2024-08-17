<script setup>
  // UI elements
  import AsideButton from '@/components/AsideButton.vue'
  import AsideInfo from '@/components/AsideInfo.vue'
  import ChangeLocale from '@/components/ChangeLocale.vue'
  import ToggleTheme from '@/components/ToggleTheme.vue'
  import Logout from '@/components/Logout.vue'

  const props = defineProps([
    'view',
    'username',
    'work_admin_username',
    'urn',
    'exam_id',
    'user_role'
  ])
</script>

<template>
  <aside class="left-aside"></aside>
</template>
