<script setup>
  // Phosphor Icons
  import {
    PhHouse,
    PhArrowRight,
    PhArrowLeft,
    PhPlus,
    PhUser
  } from '@phosphor-icons/vue'

  // UI elements
  import AsideButton from '@/components/AsideButton.vue'
  import AsideInfo from '@/components/AsideInfo.vue'
  import ChangeLocale from '@/components/ChangeLocale.vue'
  import ToggleTheme from '@/components/ToggleTheme.vue'
  import Logout from '@/components/Logout.vue'

  const props = defineProps(['view', 'username'])
</script>

<template>
  <aside class="left-aside">
    <div>
      <div>
        <AsideButton routePath="/dashboard">
          <PhHouse v-if="props.view == 'dashboard'" weight="fill" size="17px" />
          <PhHouse v-else size="17px" />

          <div :class="{ 'font-bold': props.view == 'dashboard' }">
            {{ $t('button.dashboard') }}
          </div>
        </AsideButton>

        <AsideButton routePath="/dashboard/join">
          <PhArrowRight v-if="props.view == 'join'" size="17px" />
          <PhArrowRight v-else size="17px" />

          <div :class="{ 'font-bold': props.view == 'join' }">
            {{ $t('button.join') }}
          </div>
        </AsideButton>
      </div>
    </div>
    <div>
      <div>
        <ChangeLocale :view="props.view" />
        <ToggleTheme />
      </div>
      <div class="divider my-8" v-if="username"></div>
      <div v-if="username">
        <AsideInfo>
          <PhUser size="17px" />
          {{ username }}
        </AsideInfo>
        <Logout />
      </div>
    </div>
  </aside>
</template>
