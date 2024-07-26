<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  const router = useRouter()
  const { t } = useI18n()

  const formComponent = ref(null)

  // Layouts
  import StartLayout from '@/layouts/StartLayout.vue'

  // UI elements
  import Button from '@/components/Button.vue'
  import Form from '@/components/Form.vue'

  onMounted(() => {
    document.title = t('title.StartLogin')

    if (localStorage.getItem('token')) {
      router.push('/dashboard')
    }
  })

  const requestData = ref({
    username: '',
    password: ''
  })

  const requestURL = computed(() => {
    return '/api/logins/logins.json'
  })

  const error = ref('')
  const success = ref(false)

  function handleResponse(data) {
    error.value = data.error || ''
    success.value = !error.value

    if (success.value) {
      localStorage.setItem('token', data.token)
      router.push('/dashboard')
    }
  }

  function submitForm() {
    formComponent.value.submitForm()
  }
</script>

<template>
  <StartLayout view="StartLogin" />
  <main>
    <article>
      <h4>{{ $t('text.heading.login-1') }}</h4>
      <p class="subtext">
        {{ $t('text.paragraph.login-1') }}
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
        <p class="mb-2 text-base font-bold">
          {{ $t('inputs.text.username') }}
        </p>

        <input
          v-model="requestData.username"
          :placeholder="$t('inputs.placeholders.username')"
          autocomplete="on"
          name="username"
        />

        <p class="mb-2 text-base font-bold">
          {{ $t('inputs.text.password') }}
        </p>

        <input
          v-model="requestData.password"
          :placeholder="$t('inputs.placeholders.password')"
          type="password"
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
        <Button
          routePath="https://fortheinternet.notion.site/How-to-reset-a-password-b1092586c9fc4893b4d373dd4b94039c?pvs=4"
          variant="ghost"
        >
          {{ $t('button.forgot-password') }}
        </Button>
      </div>
    </Form>

    <article>
      <p class="subtext" v-html="$t('text.paragraph.policies')"></p>
    </article>
  </main>
</template>
