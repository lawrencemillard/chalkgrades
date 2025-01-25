<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  const router = useRouter()
  const { t } = useI18n()

  const formComponent = ref(null)

  // UI elements
  import Button from '@/components/Button.vue'
  import FormHandler from '@/components/FormHandler.vue'

  onMounted(() => {
    document.title = t('title.signup')

    if (localStorage.getItem('token')) {
      router.push('/dashboard')
    }
  })

  const requestData = ref({
    username: '',
    password: '',
    password_confirm: '',
    access_code: ''
  })

  const requestURL = computed(() => {
    return '/api/logins/signups.json'
  })

  const error = ref('')
  const success = ref(false)

  function handleResponse(data) {
    error.value = data.error || ''
    success.value = !error.value

    if (success.value) {
      localStorage.setItem('token', data.token)
      router.push(`/dashboard`)
    }
  }

  function submitForm() {
    formComponent.value.submitForm()
  }
</script>

<template>
  <main>
    <article>
      <h4>{{ $t('text.heading.signup-1') }}</h4>
      <p class="subtext">
        {{ $t('text.paragraph.signup-1') }}
      </p>
    </article>

    <FormHandler
      :requestURL="requestURL"
      :requestData="requestData"
      ref="formComponent"
      @submitted="handleResponse"
    >
      <form>
        <!-- Note that this is only here to prevent an error message. -->
        <p class="mb-2 text-base font-bold">
          {{ $t('inputs.text.username') }}
        </p>

        <input
          v-model="requestData.username"
          :placeholder="$t('inputs.placeholders.username')"
          name="username"
          type="text"
        />

        <p class="mb-2 text-base font-bold">
          {{ $t('inputs.text.new-password') }}
        </p>

        <input
          v-model="requestData.password"
          :placeholder="$t('inputs.placeholders.new-password')"
          name="new_password"
          type="password"
        />

        <p class="mb-2 text-base font-bold">
          {{ $t('inputs.text.password-confirm') }}
        </p>

        <input
          v-model="requestData.password_confirm"
          :placeholder="$t('inputs.placeholders.password-confirm')"
          name="password_confirm"
          type="password"
        />

        <p class="mb-2 text-base font-bold">
          {{ $t('inputs.text.access') }}
        </p>

        <input
          v-model="requestData.access_code"
          :placeholder="$t('inputs.placeholders.access')"
          name="access"
          type="text"
        />
      </form>
      <!-- <form> should end before the error display and the button-row. -->

      <p v-if="error" class="error">{{ $t(`errors.${error}`) }}</p>

      <div class="button-row">
        <Button @click="submitForm" variant="highlighted">
          {{ $t('button.submit') }}
        </Button>
      </div>
    </FormHandler>
  </main>
</template>
