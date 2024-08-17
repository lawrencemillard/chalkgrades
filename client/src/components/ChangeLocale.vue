<script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  // Phosphor Icons
  import { PhCaretRight, PhCaretDown, PhCheck } from '@phosphor-icons/vue'

  // UI elements
  import AsideButton from '@/components/AsideButton.vue'

  const { t, locale } = useI18n()

  const props = defineProps(['view'])
  const selected = ref(false)

  function changeLocale(newLocale) {
    console.log('Updating locale')

    locale.value = newLocale
    localStorage.setItem('locale', newLocale)

    document.title = t('title.' + props.view)
  }

  function toggleSelected() {
    selected.value = !selected.value
  }
</script>

<template>
  <AsideButton @click="toggleSelected()">
    <PhCaretRight size="17px" v-if="!selected" />
    <PhCaretDown size="17px" v-else />

    {{ $t('button.changelang') }}
  </AsideButton>

  <AsideButton
    v-if="selected"
    v-for="locale in $i18n.availableLocales"
    :key="locale"
    @click="changeLocale(locale)"
  >
    <PhCheck size="17px" v-if="$i18n.locale == locale" />
    <div class="h-[17px] w-[17px]" v-else></div>

    <div :class="{ 'font-bold': $i18n.locale == locale }">
      {{ $t(`languages.${locale}`) }}
    </div>
  </AsideButton>
</template>
