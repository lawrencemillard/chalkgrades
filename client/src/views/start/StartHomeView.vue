<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  const router = useRouter()
  const { t } = useI18n()

  // UI elements
  import Button from '@/components/Button.vue'
  import Divider from '@/components/Divider.vue'

  onMounted(() => {
    document.title = t('title.home')

    if (localStorage.getItem('token')) {
      router.push('/dashboard')
    }
  })
</script>

<template>
  <main>
    <article>
      <h4>{{ $t('text.heading.landing-1') }}</h4>
      <p class="subtext mb-10">{{ $t('text.paragraph.landing-1') }}</p>
    </article>
    <article>
      <div class="button-row">
        <Button routePath="/login" variant="highlighted">
          {{ $t('button.login') }}
        </Button>
        <Button routePath="https://github.com/fortheinternet/chalkgrades">
          {{ $t('button.github') }}
        </Button>
      </div>
    </article>

    <Divider />

    <article>
      <h5>{{ $t('text.heading.latest-updates') }}</h5>
      <p>{{ $t('text.paragraph.latest-changes') }}</p>
    </article>
  </main>
</template>
