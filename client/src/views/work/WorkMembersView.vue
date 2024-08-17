<script setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import axios from 'axios'

  // Phosphor Icons
  import { PhUser } from '@phosphor-icons/vue'

  // UI elements
  import Button from '@/components/Button.vue'
  import Loading from '@/components/Loading.vue'

  const { t } = useI18n()
  const router = useRouter()

  onMounted(() => {
    document.title = t('title.members')
  })

  const props = defineProps([
    'work_admin_username',
    'urn',
    'responseData',
    'loading'
  ])

  async function leaveWorkspace() {
    try {
      const settingsRequestURL = `/api/work/${props.work_admin_username}/${props.urn}/settings.json`

      await axios.post(
        import.meta.env.VITE_REQUEST_LOCATION + settingsRequestURL,
        {
          token: localStorage.getItem('token'),
          action: 'leave',
          value: ''
        }
      )

      router.push('/dashboard')
    } catch (error) {
      if (error.response) {
        if (error.response.data.error === 'invalid-token') {
          localStorage.removeItem('token')
          this.$reset()
          router.push('/login')
        }
      } else {
        console.error(error)
      }
    }
  }

  async function removeMember(user_id) {
    try {
      const settingsRequestURL = `/api/work/${props.work_admin_username}/${props.urn}/settings.json`

      await axios.post(
        import.meta.env.VITE_REQUEST_LOCATION + settingsRequestURL,
        {
          token: localStorage.getItem('token'),
          action: 'remove_member',
          value: user_id
        }
      )

      const foundIndex = props.responseData.members.findIndex(
        (item) => item.selected_user_id == user_id
      )
      if (foundIndex != '-1') {
        props.responseData.members.splice(foundIndex, 1)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.error === 'invalid-token') {
          localStorage.removeItem('token')
          this.$reset()
          router.push('/login')
        }
      } else {
        console.error(error)
      }
    }
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
      v-for="member in props.responseData.members"
      v-else
    >
      <div
        class="flex-start flex cursor-pointer items-center justify-center gap-5"
      >
        <PhUser weight="bold" size="20px" />
        <div>
          <p class="mb-0.5 text-small font-bold">
            {{ member.username }}
          </p>
          <p
            class="mb-0 mr-3 inline text-small text-black text-opacity-55 dark:text-white dark:text-opacity-55"
          >
            {{ $t(`roles.${member.selected_role}`) }}
          </p>
        </div>
      </div>
      <div class="hidden lg:block">
        <div class="button-row">
          <Button
            v-if="
              props.responseData.user_role == 'member' &&
              member.selected_user_id == props.responseData.user_id
            "
            @click="leaveWorkspace()"
          >
            {{ t('button.leave') }}
          </Button>
          <Button
            v-if="
              props.responseData.user_role == 'work_admin' &&
              member.selected_user_id != props.responseData.user_id
            "
            @click="removeMember(member.selected_user_id)"
          >
            {{ t('button.remove-member') }}
          </Button>
        </div>
      </div>
    </div>
  </main>
</template>
