<script setup>
  import { useUserStore } from '@/stores/userStore'
  import { computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  // Phosphor Icons
  import { PhGraduationCap } from '@phosphor-icons/vue'

  // Layouts
  import UserLayout from '@/layouts/UserLayout.vue'

  // UI elements
  import Button from '@/components/Button.vue'
  import Loading from '@/components/Loading.vue'
  import Divider from '@/components/Divider.vue'

  const store = useUserStore()
  const { t } = useI18n()
  const router = useRouter()

  function navigateToWorkspace(work_admin_username, urn, path) {
    router.push(`${work_admin_username}/${urn}/${path}`)
  }

  onMounted(() => {
    store.getData()
    document.title = t('title.UserDashboard')
  })

  const responseData = computed(() => store.responseData)
  const loading = computed(() => store.loading)
</script>

<template>
  <UserLayout view="UserDashboard" :username="responseData.username" />
  <main>
    <article>
      <h4>{{ t('text.heading.dashboard-1') }}</h4>
      <p class="subtext">
        {{ t('text.paragraph.dashboard-1') }}
      </p>
    </article>

    <Divider />

    <Loading v-if="loading" />

    <div
      class="mb-5 flex select-none flex-row justify-between"
      v-for="workspace in responseData.workspaces"
      v-else
    >
      <div
        class="flex-start flex cursor-pointer items-center justify-center gap-5"
        @click="
          navigateToWorkspace(
            workspace.work_admin_username,
            workspace.urn,
            'members'
          )
        "
      >
        <PhGraduationCap size="20px" weight="bold" />
        <div>
          <p class="mb-0.5 text-small font-bold">
            {{ workspace.display_name }}
          </p>
          <p
            class="mb-0 mr-3 inline text-small text-black text-opacity-55 dark:text-white dark:text-opacity-55"
          >
            {{ workspace.work_admin_username }}
          </p>
          <p
            class="mb-0 inline text-small text-black text-opacity-55 dark:text-white dark:text-opacity-55"
          >
            {{ workspace.urn }}
          </p>
        </div>
      </div>

      <div class="hidden lg:block">
        <div class="button-row">
          <Button
            variant="highlighted"
            @click="
              navigateToWorkspace(
                workspace.work_admin_username,
                workspace.urn,
                'exams'
              )
            "
          >
            {{ t('button.exams') }}
          </Button>
          <Button
            @click="
              navigateToWorkspace(
                workspace.work_admin_username,
                workspace.urn,
                'members'
              )
            "
          >
            {{ t('button.members') }}
          </Button>
        </div>
      </div>
    </div>
  </main>
</template>
