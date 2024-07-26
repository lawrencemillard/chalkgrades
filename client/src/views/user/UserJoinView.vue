<script setup>
  import { useUserStore } from '@/stores/userStore'
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  const store = useUserStore()
  const router = useRouter()
  const { t } = useI18n()

  const formComponent = ref(null)

  // Layouts
  import UserLayout from '@/layouts/UserLayout.vue'

  // UI elements
  import Button from '@/components/Button.vue'
  import Form from '@/components/Form.vue'

  onMounted(() => {
    store.getData()
    document.title = t('title.UserDashboard')
  })

  const requestData = ref({
    token: localStorage.getItem('token'),
    password: ''
  })

  const requestURLData = ref({
    urn: '',
    work_admin_username: ''
  })

  const requestURL = computed(() => {
    return `/api/work/${requestURLData.value.work_admin_username}/${requestURLData.value.urn}/join.json`
  })

  const error = ref('')
  const success = ref(false)

  function handleResponse(data) {
    error.value = data.error || ''
    success.value = !error.value

    if (success.value) {
      router.push(
        `/${requestURLData.value.work_admin_username}/${requestURLData.value.urn}/members`
      )
    }
  }

  function submitForm() {
    formComponent.value.submitForm()
  }

  const responseData = computed(() => store.responseData)
</script>

<template>
  <UserLayout view="UserJoin" :username="responseData.username" />
  <main>
    <article>
      <h4>{{ $t('text.heading.join-1') }}</h4>
      <p class="subtext">
        {{ $t('text.paragraph.join-1') }}
      </p>
    </article>

    <Form
      :requestURL
      :requestData
      ref="formComponent"
      @submitted="handleResponse"
    >
      <form>
        <!-- Note that this is only here to prevent an error message. -->
        <div class="flex-row justify-between gap-5 xl:flex">
          <div class="w-full xl:w-1/2">
            <p class="mb-2 text-base font-bold">
              {{ $t('inputs.text.work-admin-username') }}
            </p>

            <input
              v-model="requestURLData.work_admin_username"
              :placeholder="$t('inputs.placeholders.work-admin-username')"
              autocomplete="on"
              name="work_admin_username"
            />
          </div>
          <div class="w-full xl:w-1/2">
            <p class="mb-2 text-base font-bold">
              {{ $t('inputs.text.urn') }}
            </p>

            <input
              v-model="requestURLData.urn"
              :placeholder="$t('inputs.placeholders.urn')"
              autocomplete="on"
              name="urn"
            />
          </div>
        </div>

        <p class="mb-2 text-base font-bold">
          {{ $t('inputs.text.password') }}
        </p>

        <input
          v-model="requestData.password"
          :placeholder="$t('inputs.placeholders.password-class')"
          autocomplete="on"
          name="password"
        />
      </form>
      <!-- <form> should end before the error display and the button-row. -->

      <p v-if="error" class="error">{{ $t(`errors.${error}`) }}</p>

      <div class="button-row">
        <Button @click="submitForm" variant="highlighted">
          {{ $t('button.submit') }}
        </Button>
      </div>
    </Form>
  </main>
</template>
