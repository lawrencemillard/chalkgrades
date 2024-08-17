<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  // Phosphor Icons
  import { PhScroll } from '@phosphor-icons/vue'

  // UI elements
  import Button from '@/components/Button.vue'
  import Loading from '@/components/Loading.vue'
  import Divider from '@/components/Divider.vue'

  const { t } = useI18n()
  const router = useRouter()

  onMounted(() => {
    document.title = t('title.exams')
  })

  const props = defineProps([
    'work_admin_username',
    'urn',
    'responseData',
    'loading'
  ])

  function navigateToStart(exam_id) {
    console.log(exam_id)
  }

  function navigateToSessions(exam_id) {
    console.log(exam_id)
  }
</script>

<template>
  <main>
    <article v-if="props.loading">
      <h4>{{ props.urn }}</h4>
      <p class="subtext">
        {{ props.work_admin_username }}
      </p>
    </article>

    <article v-else>
      <h4>{{ props.responseData.display }}</h4>
      <p class="subtext">
        {{ props.work_admin_username + ' / ' + props.urn }}
      </p>
    </article>

    <Loading v-if="props.loading" />

    <div
      class="mb-5 flex select-none flex-row justify-between"
      v-for="exam in props.responseData.exams"
      v-else
    >
      <div
        class="flex-start flex cursor-pointer items-center justify-center gap-5"
      >
        <PhScroll weight="bold" size="20px" />
        <div>
          <p class="mb-0.5 text-small font-bold">
            {{ exam.display_name }}
          </p>
          <p
            class="mb-0 mr-3 inline text-small text-black text-opacity-55 dark:text-white dark:text-opacity-55"
          >
            {{ $t(`visibility.${exam.visibility}`) }}
          </p>
        </div>
      </div>
      <div class="hidden lg:block">
        <div class="button-row">
          <Button
            v-if="props.responseData.user_role == 'member'"
            @click="navigateToStart(exam.exam_id)"
          >
            {{ t('button.start-exam') }}
          </Button>
          <Button
            v-if="props.responseData.user_role == 'work_admin'"
            @click="navigateToSessions(exam.exam_id)"
          >
            {{ t('button.sessions') }}
          </Button>
        </div>
      </div>
    </div>
  </main>
</template>
