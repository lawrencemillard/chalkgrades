<script setup>
  // Phosphor Icons
  import {
    PhArrowLeft,
    PhUsers,
    PhFolder,
    PhGear,
    PhUser,
    PhPlus
  } from '@phosphor-icons/vue'

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
    'user_role'
  ])
</script>

<template>
  <aside class="left-aside">
    <div>
      <div>
        <AsideButton routePath="/dashboard">
          <PhArrowLeft size="17px" />
          {{ $t('back') }}
        </AsideButton>

        <AsideButton
          :routePath="`/work/${props.work_admin_username}/${props.urn}/members`"
        >
          <PhUsers v-if="props.view == 'members'" weight="fill" size="17px" />
          <PhUsers v-else size="17px" />

          <div :class="{ 'font-bold': props.view == 'members' }">
            {{ $t('button.members') }}
          </div>
        </AsideButton>

        <AsideButton
          :routePath="`/work/${props.work_admin_username}/${props.urn}/exams`"
        >
          <PhFolder v-if="props.view == 'exams'" weight="fill" size="17px" />
          <PhFolder v-else size="17px" />

          <div :class="{ 'font-bold': props.view == 'exams' }">
            {{ $t('button.exams') }}
          </div>
        </AsideButton>
      </div>
      <div v-if="props.user_role == 'work_admin'">
        <AsideButton
          :routePath="`/work/${props.work_admin_username}/${props.urn}/settings`"
        >
          <PhGear
            v-if="props.view == 'work-settings'"
            weight="fill"
            size="17px"
          />
          <PhGear v-else size="17px" />

          <div :class="{ 'font-bold': props.view == 'work-settings' }">
            {{ $t('button.settings') }}
          </div>
        </AsideButton>
        <AsideButton :routePath="`/work/${work_admin_username}/${urn}/create`">
          <PhPlus size="17px" />

          <div :class="{ 'font-bold': props.view == 'work-create' }">
            {{ $t('button.create-exam') }}
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
