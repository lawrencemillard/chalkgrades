<script setup>
  // Phosphor Icons
  import {
    PhGithubLogo,
    PhCloudCheck,
    PhUser,
    PhHouse,
    PhGraduationCap
  } from '@phosphor-icons/vue'

  // UI elements
  import AsideButton from '@/components/AsideButton.vue'
  import ChangeLocale from '@/components/ChangeLocale.vue'
  import ToggleTheme from '@/components/ToggleTheme.vue'

  const props = defineProps(['view'])
</script>

<template>
  <aside class="left-aside">
    <div>
      <div>
        <AsideButton routePath="/">
          <PhHouse v-if="props.view == 'home'" weight="fill" size="17px" />
          <PhHouse v-else size="17px" />

          <div :class="{ 'font-bold': props.view == 'home' }">
            {{ $t('button.home') }}
          </div>
        </AsideButton>

        <AsideButton routePath="/login">
          <PhUser v-if="props.view == 'login'" weight="fill" size="17px" />
          <PhUser v-else size="17px" />

          <div :class="{ 'font-bold': props.view == 'login' }">
            {{ $t('button.login') }}
          </div>
        </AsideButton>
      </div>
      <div class="divider my-8"></div>
      <div>
        <AsideButton routePath="https://github.com/fortheinternet/chalkgrades">
          <PhGithubLogo size="17px" />
          {{ $t('button.github') }}
        </AsideButton>

        <AsideButton
          routePath="https://fortheinternet.notion.site/API-Documentation-WIP-be3e672768d243aa855209b4f6e475bb?pvs=4"
        >
          <PhCloudCheck size="17px" />
          {{ $t('button.api-docs') }}
        </AsideButton>

        <AsideButton
          routePath="https://fortheinternet.notion.site/Credits-19a5c234927c47179cb89e00a8149201?pvs=4"
        >
          <PhGraduationCap size="17px" />
          {{ $t('button.credits') }}
        </AsideButton>
      </div>
    </div>
    <div>
      <div>
        <ChangeLocale :view="props.view" />
        <ToggleTheme />
      </div>
    </div>
  </aside>
</template>
