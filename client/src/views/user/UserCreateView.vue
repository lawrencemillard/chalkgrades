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
  import DashboardLeft from '@/layouts/UserLayout.vue'

  // UI elements
  import Button from '@/components/Button.vue'
  import Form from '@/components/Form.vue'

  onMounted(() => {
    store.getData()
    document.title = t('title.UserDashboard')
  })

  const requestData = ref({
    access_code: '',
    urn: '',
    token: localStorage.getItem('token'),
    password: '',
    display: ''
  })

  const requestURL = computed(() => {
    return '/api/work/create.json'
  })

  const error = ref('')
  const success = ref(false)

  function handleResponse(data) {
    error.value = data.error || ''
    success.value = !error.value

    if (success.value) {
      router.push(
        `/${requestData.value.work_admin_username}/${requestData.value.urn}/members`
      )
    }
  }

  function submitForm() {
    formComponent.value.submitForm()
  }

  const responseData = computed(() => store.responseData)
</script>

<template>
  <DashboardLeft view="UserCreate" :username="responseData.username" />
  <main>
    <article>
      <h4>{{ $t('text.heading.create-1') }}</h4>
      <p class="subtext">
        {{ $t('text.paragraph.create-1') }}
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
              {{ $t('inputs.text.display-name') }}
            </p>

            <input
              v-model="requestData.display"
              :placeholder="$t('inputs.placeholders.display-name')"
              autocomplete="on"
              name="display-name"
            />
          </div>
          <div class="w-full xl:w-1/2">
            <p class="mb-2 text-base font-bold">
              {{ $t('inputs.text.urn') }}
            </p>

            <input
              v-model="requestData.urn"
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
          type="password"
          name="password"
        />

        <p class="mb-2 text-base font-bold">
          {{ $t('inputs.text.access') }}
        </p>

        <input
          v-model="requestData.access_code"
          :placeholder="$t('inputs.placeholders.access')"
          autocomplete="on"
          name="access"
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
