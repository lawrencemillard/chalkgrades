<script setup>
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  import { PhHourglass } from '@phosphor-icons/vue'
</script>

<template>
  <div class="center">
    <PhHourglass size="32px" weight="duotone" class="mb-5" />
    <h6>{{ t('loading') }}</h6>
    <p class="subtext">
      {{ t('loading-pls-wait') }}
    </p>
  </div>
</template>

<style scoped>
  .center {
    @apply flex w-full flex-col items-center justify-center px-12 py-8 text-center;
  }
</style>
